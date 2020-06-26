import Vue from 'vue'
import Vuex from 'vuex'

import Scenarios from 'dir-loader!@/assets/scenarios/scenarios.js' // eslint-disable-line import/no-webpack-loader-syntax
const scenarios = (Object.keys(Scenarios).map(key => ({ hash: key.replace(/\.json$/, ''), ...Scenarios[key].src })))

const crises = [...new Set(scenarios.map(s => s.crises).flat())]
console.log(crises)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initialized: false,
    crises
  },
  mutations: {
  },
  actions: {
    init () {
      console.log('init')
    }
  },
  modules: {
  }
})
