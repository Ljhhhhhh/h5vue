import { login, getInfo } from 'api/user'
import { Toast } from 'vant'
import { getToken, setToken } from '@/utils/auth'

const LOGIN = 'LOGIN'// 获取用户信息
const SetUserData = 'SetUserData'// 获取用户信息

export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    user: JSON.parse(localStorage.getItem('userDate')) || {}
  },
  mutations: {

    [LOGIN] (state, data) {
      let userDate = data.data
      state.token = userDate.token
      // state.user = userDate
      setToken(userDate.token)
      // localStorage.setItem('token', userDate.token)
      // localStorage.setItem('userDate', JSON.stringify(userDate))
    },
    [SetUserData] (state, data) {
      let userDate = data.data
      state.user = userDate
      localStorage.setItem('userDate', JSON.stringify(userDate))
    }

  },
  actions: {
    async login (state, data) {
      try {
        let res = await login({
          phoneNumber: data.phoneNumber,
          password: data.password
        })
        state.commit(LOGIN, res)
        Toast({
          message: '登录成功',
          position: 'middle',
          duration: 2000
        })
        setTimeout(() => {
          const redirect = data.$route.query.redirect || '/'
          data.$router.replace({
            path: redirect
          })
        }, 3000)
      } catch (error) {
      }
    },
    // get user info
    getInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const { data } = response

          if (!data) {
            // eslint-disable-next-line
            reject('Verification failed, please Login again.')
          }

          // const { roles, name, avatar, introduction } = data

          // // roles must be a non-empty array
          // if (!roles || roles.length <= 0) {
          //   // eslint-disable-next-line
          //   reject('getInfo: roles must be a non-null array!')
          // }

          // commit('SET_ROLES', roles)
          // commit('SET_NAME', name)
          // commit('SET_AVATAR', avatar)
          // commit('SET_INTRODUCTION', introduction)
          commit(SetUserData, data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  getters: {
    token (state) {
      return state.token
    },
    user (state) {
      console.log('state', state)
      return state.user
    }
  }
}
