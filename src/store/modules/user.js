import { login } from 'api/user'
import { Toast } from 'vant'
import { getToken, setToken } from '@/utils/auth'

const LOGIN = 'LOGIN'// 获取用户信息

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
      state.user = userDate
      setToken(userDate.token)
      // localStorage.setItem('token', userDate.token)
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
