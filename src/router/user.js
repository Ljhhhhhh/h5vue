export default [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    meta: {
      title: '登录'
      // auth: true,
      // keepAlive: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ 'views/user/Register.vue'),
    meta: {
      title: '注册'
      // auth: true,
      // keepAlive: true
    }
  }
]
