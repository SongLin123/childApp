/*
 * @Author: your name
 * @Date: 2019-12-18 18:24:31
 * @LastEditTime : 2019-12-18 18:26:57
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn-mobile-mbhand\vue.config.js
 */
const packageName = require('./package.json').name;
const path = require("path")

module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port: '8089',
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/ms': {
        target: 'http://192.168.63.249:8080',
        changeOrigin: true,

      },
      '/handapi': {
        target: 'http://192.168.25.54:10086',
        changeOrigin: true,
        pathRewrite:{
          "^/handapi":"/api"
        }
      },
      '/service': {
        target: 'https://oapi.dingtalk.com',
        changeOrigin: true,
        pathRewrite:{
          "^/service":"/service"
        }
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  publicPath: `/childApp/${packageName}/`,
  outputDir: `${packageName}`,

  // 自定义webpack配置
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
}
