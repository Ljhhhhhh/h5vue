import Vue from 'vue'
import 'lib-flexible'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import FastClick from 'fastclick'
import 'utils/permission'
import SvgIcon from 'components/SvgIcon'
import '@/icons' // icon
import '@/style/common.scss'
import { Lazyload } from 'vant'
import defaultSettings from '@/settings'
// import * as Sentry from '@sentry/browser'
// import * as Integrations from '@sentry/integrations'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Raven.config('https://3a79cdaad04f491d9ff7e64001fb2b66@sentry.io/1802126', {
  release: process.env.RELEASE_VERSION // 版本号与vue.config.js的一致
})
  .addPlugin(RavenVue, Vue)
  .install()
// Sentry.init({
//   dsn: 'https://3a79cdaad04f491d9ff7e64001fb2b66@sentry.io/1802126',
//   integrations: [
//     new Integrations.Vue({
//       Vue,
//       attachProps: true
//     }),
//     new Integrations.RewriteFrames()
//   ],
//   release: 'game-center-html@prod'
// })

FastClick.attach(document.body)

// options 为可选参数，无则不传
Vue.use(Lazyload)

Vue.component('svg-icon', SvgIcon)

if (process.env.NODE_ENV === 'development' && defaultSettings.vconsole) {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  const my_console = new VConsole()
}
// var vConsole = new VConsole(option)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
