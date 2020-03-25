const state = {
  number: 1
}
const actions = {
  onePlusAsync: ({ commit }, { val }) => {
    // commit('setLoading', true, { root: true }) // 调用全局vuex的setLoading方法
    // 需要使用promise用来配合loading
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('onePlus', val)
        resolve()
      // commit('setLoading', false, { root: true })
      }, 1500)
    })
  }
}
const mutations = {
  onePlus (state, val = 1) {
    state.number = state.number + val
  }
}
const getters = {

}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
