<!--
 * @Author: your name
 * @Date: 2019-12-19 10:24:17
 * @LastEditTime : 2019-12-19 10:49:10
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn-mobile-mbhand\src\App.vue
 -->
<template>
  <div>
    <transition name="router-anim">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  params= {
    accessKey : '',
    timestamp : 0,
    suiteTicket: '',
    signayure: '',
    auth_corpid: ''
  }
  
  created() {
    console.log((window as any).ddconfig)
  }
  private mounted() {
    
  
  }
}
</script>
<style lang="stylus" scoped>
.router-anim-enter
  transform translate3d(100%,0,0)
.router-anim-leave-to
  transform translate3d(-100%,0,0)
  display none
.router-anim-enter-active,.router-anim-leave-active
  transition all 0.4s
</style>
