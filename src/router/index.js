import Vue from 'vue'
import VueRouter from 'vue-router'
import Network from '../views/Network.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    // {
    //   path: '/about',
    //   name: 'About',
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // },
    {
      path: '/:scenario?',
      name: 'Network',
      component: Network
    }
  ]
})
