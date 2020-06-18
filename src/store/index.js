import Vue from 'vue'
import Vuex from 'vuex'

import scenarios from 'dir-loader!@/assets/scenarios/scenarios.js' // eslint-disable-line import/no-webpack-loader-syntax
console.log(Object.keys(scenarios).map(key => ({ hash: key.replace(/\.json$/, ''), ...scenarios[key].src })))

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
