# 基于vue+vant搭建H5通用架子

### 项目初衷

开发一个H5的通用架子，让前端同学开箱即用，迅速投入战斗。

----

项目源码跟线上预览地址在文章结尾处，记得查收哦~**

### 主要功能
1. 常用目录别名
2. Vant/Rem适配
3. scss支持、_mixin.scss、_variables.scss
4. 页面切换动画+keepAlive
5. 页面标题
6. 自动注册：自动注册路由表/自动注册Vuex/svg图标引入
7. mock server
8. axios封装、api管理
9. 用户鉴权
10. vuex-loading
11. vo-pages/dayjs/vconsole
12. 生产环境优化

### 常用目录别名
![alias配置](http://img.cixi518.com/alias.png)
### Vant/Rem适配
按照Vant官网推荐自动按需引入组件，同样，Vant官网中也有对Rem适配的推荐配置，按照官网说明的使用。需要注意的是postcss的配置中，autoprefixer下的`browsers`需要替换成`overrideBrowserslist`，否则会有报错信息。具体如图<br>
![postcss配置](http://img.cixi518.com/postcss.png)
### scss支持、_mixin.scss、_variables.scss
选择scss作为css预处理，并对mixin、variables、common.scss作全局引入。
```js
css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: !!IS_PRODUCTION,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    loaderOptions: {
      sass: {
        data: '@import "style/_mixin.scss";@import "style/_variables.scss";@import "style/common.scss";' // 全局引入
      }
    }
  }
```
### 页面切换动画+keepAlive
利用vuex存取/更新页面切换方向，配合vue的transition做页面切换动画，router设置keepAlive判断页面是否需要缓冲。
```js
// vuex中
state: {
  direction: 'forward' // 页面切换方向
},
mutations: {
  // 更新页面切换方向
  updateDirection (state, direction) {
    state.direction = direction
  }
},
// App.vue
<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view class="router"></router-view>
      </keep-alive>
      <router-view class="router" v-else></router-view>
    </transition>
  </div>
</template>
```
### 页面标题
在vue-router页面配置中添加meta的title信息，配合`vue-router`的`beforeEach`注册一个前置守卫用户获取到页面配置的title
```js
// get-page-title.js
import defaultSettings from '@/settings'

const title = defaultSettings.title || 'H5Vue'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
// permission.js
router.beforeEach((to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title)
}
```
### 自动注册

先来了解一下`require.context()`:

> 你可以通过 `require.context()` 函数来创建自己的 context。
>
> 可以给这个函数传入三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。
>
> webpack 会在构建中解析代码中的 `require.context()` 。

上面的是官网原话，可能你跟我一样没太看懂，说白了，他可以用来导入模块。

来看一下如何使用，我的router下的文件结构是这样的：<br>

![router-tree](http://img.cixi518.com/router-tree.png)<br>
```js
// 利用require.context()自动引入article.js和user.js
const routerContext = require.context('./', true, /\.js$/)
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = routes.concat(routerModule.default || routerModule)
})
```
需要额外注意的是，404页面需要在自动引入后向路由数组concat上去，否则会提前匹配到404页面。

对于vuex也同样引入，记得把引入的vuex按照文件名注册为对应的模块中。

### mock server

Mock server部分可直接参看[vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/mock-api.html)的mock方案

### axios封装

axios部分，配置了baseUrl、超时时间，利用拦截器对header添加了用户的Token，方便下一步的用户鉴权，并对错误做了Toast提示。具体错误的code需要视各业务而定，本项目只做为示例参考。

### 用户鉴权
在`vue-router`的`beforeEach`中，添加用户鉴权功能。当用户登录后使用cookie持续化保存用户token，并赋值到vuex，后续可利用token获取用户信息。具体代码如下图：
![permission](http://img.cixi518.com/permission.png)
### vuex-loading
在vuex3.1.0中对[vuex.subscribeAction](https://vuex.vuejs.org/zh/api/#subscribe)做了改动，使其拥有了before/after钩子函数。
```js
// subscribeAction官网示例
store.subscribeAction({
  before: (action, state) => {
    console.log(`before action ${action.type}`)
  },
  after: (action, state) => {
    console.log(`after action ${action.type}`)
  }
})
```
有了它，配合`vuex`的[插件](https://vuex.vuejs.org/zh/guide/plugins.html)功能，实现对应action的状态监听也不再是难题。

[点击查看具体实现代码](https://github.com/Ljhhhhhh/h5vue/blob/master/src/utils/vuex-loading.js)

> 参照自[vue 在移动端体验上的优化解决方案](https://juejin.im/post/5cdd2457f265da034e7eb2f9#heading-2)

```vue
// 使用方法
computed: {
  ...mapState({
    loading: state => state['@@loading'].effects['test/onePlusAction']
  })
}
// 其中 test对应的是vuex中的模块名，onePlusAction对应模块内的actions
```
具体效果：<br>![loading](http://img.cixi518.com/loading.gif)
### 列表页（vo-pages的使用）

列表页这里，使用了本人自己写的组件`vo-pages`，详细使用可查看[一款易用、高可定制的vue翻页组件](https://juejin.im/post/5d81da4551882556ba55e50e)

实现效果：<br>
![vo-pages](http://img.cixi518.com/Kapture%202019-10-27%20at%2013.36.21.gif)

### 生产环境优化
上线前，得优化一下资源了，该项目做了如下几步操作
1. 通用库改用CDN
2. 关闭sourcemap防止源码泄露
3. 丑化html/css/js
4. 生成gzip 
5. 移除掉debugger/console
6. 利用webpack-bundle-analyzer做资源分析，提供进一步优化的数据分析
想对性能、资源了解更多的，推荐[Vue SPA 项目webpack打包优化指南](https://juejin.im/post/5bd2b60e6fb9a05d27794c5e)这篇文章。

### 更多
花了不少时间开发了这个项目，希望能提高您的H5开发效率。也欢迎大家跟我一起交流学习。

### 相关链接
* [源码地址](https://github.com/Ljhhhhhh/h5vue)
* [在线预览](http://h5vue.cixi518.com)

### 文章参考
* [基于vue-cli3.0构建功能完善的移动端架子](https://juejin.im/post/5cbf32bc6fb9a03236393379)
* [Vue SPA 项目webpack打包优化指南](https://juejin.im/post/5bd2b60e6fb9a05d27794c5e)
* [vue 在移动端体验上的优化解决方案](https://juejin.im/post/5cdd2457f265da034e7eb2f9)
* [vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/)
* [手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)
* [一款易用、高可定制的vue翻页组件](https://juejin.im/post/5d81da4551882556ba55e50e)


