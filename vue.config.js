const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  chainWebpack: config => {
    // 设置目录别名alias
    config.resolve.alias
      .set('assets', '@/assets')
      .set('components', '@/components')
      .set('views', '@/views')
      .set('style', '@/style')
      .set('api', '@/api')
      .set('store', '@/store')
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: !!isProduction,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    loaderOptions: {
      sass: {
        data: '@import "style/_mixin.scss";@import "style/_variables.scss";' // 全局引入
      }
    }
  },
  lintOnSave: true, // default false
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    host: '127.0.0.1',
    port: 8088, // 服务端口
    https: false,
    hotOnly: false,
    // 设置代理，用来解决本地开发跨域问题，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    proxy: 'https://easy-mock.com/' // 设置代理
  }
}
