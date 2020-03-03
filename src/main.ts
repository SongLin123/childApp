/*
 * @Author: your name
 * @Date: 2019-12-18 18:24:31
 * @LastEditTime: 2020-02-29 19:59:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn-mobile-mbhand\src\main.ts
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import '@/assets/ding/ding'


let instance: any = null;

export async function bootstrap() {
  //   console.log('react app bootstraped');
}

export async function mount() {
console.log(1111111111111111)
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
