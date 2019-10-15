import Vue from 'vue'
import Vuex from 'vuex'
// import test from './modules/test'
// import user from './modules/user'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

// const store = new Vuex.Store({
//   modules
// })

export default new Vuex.Store({
  state: {
    msg: 'hello vuex',
    loading: false,
    direction: 'forward'
  },
  getters: {
    loading (state) {
      return state.loading
    },
    userData (state, getters) {
      return state.user.user
      // return getters['user/user']
    }
    // vuex 全局getters引入局部
    // token () {
    //   return store.getters['user/token']
    // }
  },
  mutations: {
    setMsg (state, msg) {
      state.msg = msg
    },
    setLoading (state, val) {
      state.loading = val
    },
    updateDirection (state, direction) {
      state.direction = direction
    }
  },
  actions: {

  },
  modules
})

/*
this.$store.registerModule('d',{

})
*/
