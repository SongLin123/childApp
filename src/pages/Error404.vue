<!--
 * @Author: your name
 * @Date: 2019-12-19 10:24:17
 * @LastEditTime: 2019-12-19 10:45:05
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn-mobile-mbhand\src\pages\Error404.vue
 -->
<template>
  <div class="fixed-center text-center">
    <p>
      <img
        :src="require('@/assets/sad.svg')"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">Sorry, nothing here...<strong>(404)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      to="/"
      label="Go back"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Error404'
})
</script>
