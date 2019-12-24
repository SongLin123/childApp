<!--
 * @Author: your name
 * @Date: 2019-11-14 11:09:34
 * @LastEditTime : 2019-12-19 10:05:34
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mobile-cam\src\layouts\MyLayout.vue
 -->
<template>
  <q-layout view="lHh lpr lFf">
    <!-- <q-header elevated>
      <q-toolbar>
      
        <q-toolbar-title>智慧掌控</q-toolbar-title>
      </q-toolbar>
    </q-header> -->

      <!-- <channel-playground ref="drawer"></channel-playground> -->
      
    <q-page-container>
      <router-view @openMenu="$refs.drawer.show()" @addcam="addcam" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Layout extends Vue {


  private addcam() {
    (this.$refs.plus as HTMLElement).style.display = 'block';
    (this.$refs.plus as HTMLElement).style.opacity = '1';
    setTimeout(() => {
      (this.$refs.plus as HTMLElement).style.opacity = '0';
      (this.$refs.plus as HTMLElement).style.display = 'none';
    }, 1000);
  }
}
</script>

<style lang="stylus">
.addcam {
  display: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  opacity: 0;
  background: rgba(255, 0, 0, 1);
  transition: all 0.5s cubic-bezier(1, 0.01, 0.01, 1);
  line-height: 22px;
  text-align: center;
  position: fixed;
  top: 15px;
  left: 18px;
}
</style>