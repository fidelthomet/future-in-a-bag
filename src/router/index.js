import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
      name: 'home',
      component: Home
    }
  ]
})
