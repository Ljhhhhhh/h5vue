import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msg: 'hello vuex',
    loading: false
  },
  getters: {
    loading (state) {
      return state.loading
    }
  },
  mutations: {
    setMsg (state, msg) {
      state.msg = msg
    },
    setLoading (state, val) {
      state.loading = val
    }
  },
  actions: {

  },
  modules: {
    test
  }
})

/*
this.$store.registerModule('d',{

})
*/
