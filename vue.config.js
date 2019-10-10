const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.port || process.env.npm_config_port || 8888

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
    host: '0.0.0.0',
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
    // after: require('./mock/mock-server.js')
  }
}
