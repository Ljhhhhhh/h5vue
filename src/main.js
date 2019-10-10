import Vue from 'vue'
import 'lib-flexible'
import App from './App.vue'
import router from './router'
import store from './store'
import { mockXHR } from '../mock'
import '@/style/common.scss'

if (process.env.NODE_ENV === 'development') {
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
