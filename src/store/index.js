import Vue from 'vue'
import Vuex from 'vuex'

import Scenarios from 'dir-loader!@/assets/scenarios/scenarios.js' // eslint-disable-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!../assets/js/network' // eslint-disable-line import/no-webpack-loader-syntax

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initialized: false,
    crises: [],
    scenarios: []
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
      console.log('init')
      worker().network({ scenarios: (Object.keys(Scenarios).map(key => ({ hash: key.replace(/\.json$/, ''), ...Scenarios[key].src }))) }).then(({ scenarios, crises }) => {
        console.log('worked')
        commit('set', { scenarios, crises, initialized: true })
      })
    }
  },
  modules: {
  }
})
