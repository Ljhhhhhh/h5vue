// import { INumberState } from './modules/test';
// import Vue from 'vue'
// import Vuex from 'vuex'
// import createLoadingPlugin from '@/utils/vuex-loading'

// Vue.use(Vuex)

// const files = require.context('./modules', false, /\.ts$/)
// const modules = {}

// files.keys().forEach(key => {
//   modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
// })

// export default new Vuex.Store({
//   plugins: [createLoadingPlugin()],
//   state: {
//     direction: 'forward' // 页面切换方向
//   },
//   getters: {
//     userData (state, getters) {
//       return state.user.user
//       // return getters['user/user']
//     }
//     // vuex 全局getters引入局部
//     // token () {
//     //   return store.getters['user/token']
//     // }
//   },
//   mutations: {
//     // 更新页面切换方向
//     updateDirection (state, direction) {
//       state.direction = direction
//     }
//   },
//   actions: {

//   },
//   modules
// })

import Vue from 'vue'
import Vuex from 'vuex'
// import { IAppState } from './modules/app'
import { IUserState } from './modules/user'
import { INumberState } from './modules/test'
// import { ITagsViewState } from './modules/tags-view'
// import { IErrorLogState } from './modules/error-log'
// import { IPermissionState } from './modules/permission'
// import { ISettingsState } from './modules/settings'

Vue.use(Vuex)

export interface IRootState {
  user: IUserState,
  number: INumberState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
