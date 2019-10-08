module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
/*
'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    } */
