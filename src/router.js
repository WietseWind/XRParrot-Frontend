import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Sendxrp from './views/Sendxrp.vue'
import Faq from './views/Faq.vue'
import Support from './views/Support.vue'

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
      component: Sendxrp
    },
    {
      path: '/faq',
      name: 'faq',
      component: Faq
    },
    {
      path: '/support',
      name: 'support',
      component: Support
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
