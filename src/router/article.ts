export default [
  {
    path: '/article',
    name: 'Article',
    component: () => import(/* webpackChunkName: "article" */ 'views/Article.vue'),
    meta: {
      auth: true,
      title: '文章',
      keepAlive: true
    }
  }
]
