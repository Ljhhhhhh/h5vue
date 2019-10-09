export default [
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ 'views/About.vue'),
    meta: {
      // auth: true,
      keepAlive: true
    }
  }
]
