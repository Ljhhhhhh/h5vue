import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, getInfo, logout } from '@/api/user'
import { Toast } from 'vant'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import store from '@/store'
// import router from '@/router'

// const LOGIN = 'LOGIN'// 获取用户信息
// const SetUserData = 'SetUserData'// 获取用户信息
// const LOGOUT = 'LOGOUT'// 退出登录、清除用户数据
// const USER_DATA = 'userDate'// 用户数据

export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
}

@Module({ dynamic: true, store, name: 'user'})
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public introduction = ''
  public roles: string[] = []
  public email = ''

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email
  }

  @Action
  public async Login(params: {username: string, password: string, $route: any, $router: any}) {
    let {username, password} = params
    username = username.trim()
    const { data } = await login({username, password})
    setToken(data.accessToken)
    this.SET_TOKEN(data.accessToken)
    Toast({
      message: '登录成功',
      position: 'middle',
      duration: 1500
    })
    setTimeout(() => {
      const redirect = params.$route.query.redirect || '/'
      params.$router.replace({
        path: redirect
      })
    }, 1500)
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getInfo()
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { roles, name, avatar, introduction, email } = data.user
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    this.SET_ROLES(roles)
    this.SET_NAME(name)
    this.SET_AVATAR(avatar)
    this.SET_INTRODUCTION(introduction)
    this.SET_EMAIL(email)
  }

  // @Action
  // public async ChangeRoles(role: string) {
  //   // Dynamically modify permissions
  //   const token = role + '-token'
  //   this.SET_TOKEN(token)
  //   setToken(token)
  //   await this.GetUserInfo()
  //   resetRouter()
  //   // Generate dynamic accessible routes based on roles
  //   PermissionModule.GenerateRoutes(this.roles)
  //   // Add generated routes
  //   router.addRoutes(PermissionModule.dynamicRoutes)
  //   // Reset visited views and cached views
  //   TagsViewModule.delAllViews()
  // }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    resetRouter()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
}

export const UserModule = getModule(User)

// export default {
//   namespaced: true,
//   state: {
//     token: getToken() || '',
//     user: JSON.parse(localStorage.getItem(USER_DATA) || null)
//   },
//   mutations: {

//     [LOGIN] (state, data) {
//       let userToken = data.data.accessToken
//       state.token = userToken
//       setToken(userToken)
//     },

//     [SetUserData] (state, userData = {}) {
//       state.user = userData
//       localStorage.setItem(USER_DATA, JSON.stringify(userData))
//     },
//     [LOGOUT] (state) {
//       state.user = null
//       state.token = null
//       removeToken()
//       localStorage.removeItem(USER_DATA)
//       resetRouter()
//     }

//   },
//   actions: {
//     async login (state, data) {
//       try {
//         let res = await login({
//           username: data.username,
//           password: data.password
//         })
//         state.commit(LOGIN, res)
//         Toast({
//           message: '登录成功',
//           position: 'middle',
//           duration: 1500
//         })
//         setTimeout(() => {
//           const redirect = data.$route.query.redirect || '/'
//           data.$router.replace({
//             path: redirect
//           })
//         }, 1500)
//       } catch (error) {
//         console.log(error, 'error')
//       }
//     },
//     // get user info
//     getInfo ({ commit, state }) {
//       return new Promise((resolve, reject) => {
//         getInfo(state.token).then(response => {
//           const { data } = response

//           if (!data) {
//             // eslint-disable-next-line
//             reject('Verification failed, please Login again.')
//           }
//           commit(SetUserData, data)
//           resolve(data)
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     }
//   },
//   getters: {
//     token (state) {
//       return state.token
//     },
//     user (state) {
//       return state.user
//     }
//   }
// }
