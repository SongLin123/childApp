<!--
 * @Author: your name
 * @Date: 2019-11-14 11:09:34
 * @LastEditTime : 2019-12-19 10:05:34
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mobile-cam\src\layouts\MyLayout.vue
 -->
<template>
  <div class="layout">
    <q-btn-dropdown style="width:100%;border:none" label="全部">
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Photos</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <div class="infoCard">
      <div class="cardItem">
        <q-icon name="library_books" />
      </div>
      <div class="cardItem">
        应急响应模块测试
         应急响应模块测试
          应急响应模块测试
           应急响应模块测试
            应急响应模块测试
             应急响应模块测试
      </div>
      <div class="cardItem">
        <span style="color:#47478A">{{name}}</span> <span style="color:#D2D5D7">| 昨天 11:53</span>
      </div>
    </div>
    <q-btn class="addBtn" @click="onItemClick" round color="primary" icon="add" />
  </div>
  
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Layout extends Vue {
    name = '我'

    onItemClick() {
      this.$router.push('/formData')
    }
}
</script>

<style lang="stylus" scoped>
.layout
  width 100%
  position relative
  .addBtn
    position fixed
    right 20px 
    bottom 50px
    cursor pointer
  .infoCard
    width 100%
    display grid
    grid-template-columns 25% 75%
    grid-template-rows auto 40px
    border-bottom 1px solid #E3E5E7
    margin-top 10px
    .cardItem:first-child
      grid-column-start 1
      grid-column-end 2
      grid-row-start 1
      grid-row-end 3
      text-align center
      font-size 25px
      color #0D8FFF
      padding-top 10px
    .cardItem:nth-child(2)
      font-size 16px
      padding-top 10px
      padding-left 20px
      padding-right 20px
      color #969CA2
    .cardItem:last-child
      line-height 40px
      padding-left 20px
</style>