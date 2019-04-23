import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FourOFour from './views/404.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sendxrp',
      name: 'sendxrp',
      component: () => import(/* webpackChunkName: "sendxrp" */ './views/Sendxrp.vue')
    },
    {
      path: '/refer/:token/:account/:tag',
      name: 'refer',
      component: () => import(/* webpackChunkName: "sendxrp" */ './views/Refer.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import(/* webpackChunkName: "faq" */ './views/Faq.vue')
    },
    {
      path: '/support',
      name: 'support',
      component: () => import(/* webpackChunkName: "support" */ './views/Support.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '*',
      name: '404',
      component: FourOFour
    }
  ]
})
