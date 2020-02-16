import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './v2/App'
import router from './v2/router'

import '@mdi/font/scss/materialdesignicons.scss'

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
