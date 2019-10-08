const state = {
  number: 1
}
const actions = {
  onePlusAction: async ({ commit }, { val }) => {
    commit('setLoading', true, { root: true })
    // loading状态
    await setTimeout(() => {
      commit('onePlus', val)
      commit('setLoading', false, { root: true })
    }, 1500)
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
