import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, getInfo, logout } from '@/api/user'
import { Toast } from 'vant'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import store from '@/store'
export interface INumberState {
  number: number
}

@Module({ dynamic: true, store, name: 'user'})
class Number extends VuexModule implements INumberState {
  public number = 1;

  @Mutation
  public onePlus() {
    this.number++
  }

  @Action
  public onePlusAsync() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.onePlus()
        resolve()
      // commit('setLoading', false, { root: true })
      }, 1500)
    })
  }
}

export const NumberModule = getModule(Number)

// const state = {
//   number: 1
// }
// const actions = {
//   onePlusAsync: ({ commit }, { val }) => {
//     // commit('setLoading', true, { root: true }) // 调用全局vuex的setLoading方法
//     // 需要使用promise用来配合loading
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         commit('onePlus', val)
//         resolve()
//       // commit('setLoading', false, { root: true })
//       }, 1500)
//     })
//   }
// }
// const mutations = {
//   onePlus (state, val = 1) {
//     state.number = state.number + val
//   }
// }
// const getters = {

// }
// export default {
//   namespaced: true,
//   state,
//   actions,
//   mutations,
//   getters
// }
