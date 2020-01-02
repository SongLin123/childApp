/*
 * @Author: your name
 * @Date: 2019-11-14 11:32:35
 * @LastEditTime : 2020-01-02 17:18:43
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mobile-cam\src\router\index.ts
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default  new VueRouter({
    base: (window as any).__POWERED_BY_QIANKUN__ ? '/m-tigerprawn-dingmsg/' : '/childApp/m-tigerprawn-dingmsg/',
    mode: 'history',
    routes,
  })

