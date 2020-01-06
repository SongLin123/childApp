/*
 * @Author: your name
 * @Date: 2019-12-18 18:24:31
 * @LastEditTime : 2019-12-19 11:13:55
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn-mobile-mbhand\src\main.ts
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'


import { Upload } from 'element-ui';
Vue.component(Upload.name, Upload);
Vue.use(Upload);


let instance: any = null;

export async function bootstrap() {
  //   console.log('react app bootstraped');
}

export async function mount() {

  instance = new Vue({
    el:"#app",
    router,
    store,
    render: (h) => h(App),
  })
}

export async function unmount() {
  instance.$destroy();
  instance = null;
}
(window as any).__POWERED_BY_QIANKUN__ ? "" : mount();
