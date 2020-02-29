/*
 * @Author: your name
 * @Date: 2019-12-18 18:24:31
 * @LastEditTime : 2020-01-15 14:33:54
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn-mobile-mbhand\vue.config.js
 */
const packageName = require('./package.json').name;
const path = require("path")
function resolve(dir) {
  return path.join(__dirname, dir)
}
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
      '/cspace': {
        target: 'https://oapi.dingtalk.com',
        changeOrigin: true,
        pathRewrite:{
          "^/cspace":"/cspace"
        }
      },
      '/security': {
        target: 'http://192.168.63.185:8090',
        changeOrigin: true,
        pathRewrite: {
          '^/security': '/security'
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
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@ajax', resolve('src/WrappedFetch.ts'))

  }
}
