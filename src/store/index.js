import Vue from 'vue'
import Vuex from 'vuex'

import Scenarios from 'dir-loader!@/assets/scenarios/scenarios.js' // eslint-disable-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!../assets/js/network' // eslint-disable-line import/no-webpack-loader-syntax

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
// import { resolve, reject } from 'core-js/fn/promise'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initialized: false,
    crises: [],
    scenarios: [],
    links: []
  },
  mutations: {
    set (state, props) {
      Object.keys(props).forEach(p => {
        state[p] = props[p]
      })
    }
  },
  actions: {
    init ({ commit }) {
      worker().network({ scenarios: (Object.keys(Scenarios).map(key => ({ hash: key.replace(/\.json$/, ''), ...Scenarios[key].src }))) }).then(({ scenarios, crises, links }) => {
        const loader = new GLTFLoader()
        const promises = scenarios.map(s => {
          const models = ['smart', 'dumb'].map(cat => {
            return new Promise((resolve, reject) => {
              loader.load(`./models/${s[cat].model}`, gltf => {
                console.log(gltf)
                const model = gltf.scene
                const sign = cat === 'smart' ? -1 : 1
                model.rotateX(Math.PI / 2 * sign)
                var box = new THREE.Box3().setFromObject(gltf.scene)
                const size = box.getSize(new THREE.Vector3())
                const scale = 125 / ((size.x + size.y + size.z * 0.5) / 2.5)
                model.scale.set(scale, scale, scale)
                const x = (box.max.x + box.min.x) / 2 * -scale
                const y = (box.max.y + box.min.y) / 2 * -scale
                if (cat === 'smart') {
                  model.position.set(x, y, box.max.z * -scale)
                } else {
                  model.position.set(x, y, box.min.z * -scale)
                }
                resolve(model)
              }, undefined, function (error) {
                reject(error)
              })
            })
          })
          return new Promise((resolve, reject) => {
            Promise.all(models).then(m => {
              resolve({
                ...s,
                models: {
                  smart: m[0],
                  dumb: m[1]
                }
              })
            }).catch(error => {
              reject(error)
            })
          })
        })
        Promise.all(promises).then(d => {
          commit('set', { scenarios: d, crises, links, initialized: true })
        })
      })
    }
  },
  modules: {
  }
})
