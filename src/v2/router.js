import Home from './components/Home.vue'
import Detail from './components/Detail.vue'

import VueRouter from 'vue-router'

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'home',
      path: '/home',
      component: Home
    },
    {
      name: 'detail',
      path: '/detail',
      component: Detail
    }
  ]
})