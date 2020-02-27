<template>
    <div class="squared">
       <div class="squaredItem" v-for="item in iconList" :key="item.id" @click="toaddPage(item)">
           <img class="imgIcon" :src="item.src" alt="">
           <br>
           <span>{{item.name}}</span>
        </div>
    </div>
</template>

<script lang="ts">
   import { Component, Vue, Prop, Watch } from "vue-property-decorator";
   interface BLOCK {//点击每一项参数
          name: String,
          src: String,
          id: Number
    }
   @Component
   export default class Squared extends Vue{
       iconList=[
           {name:'火灾事故',src:require('../../statics/iconList/火灾.png'),id:1},
           {name:'燃气事故',src:require('../../statics/iconList/燃气事故.png'),id:2},
           {name:'安全生产事故',src:require('../../statics/iconList/安全生产.png'),id:3},
           {name:'大面积停电',src:require('../../statics/iconList/大面积停电.png'),id:4},
           {name:'大面积停水',src:require('../../statics/iconList/大面积停水.png'),id:5},
           {name:'食物中毒',src:require('../../statics/iconList/食品安全.png'),id:6},
           {name:'危险化学品',src:require('../../statics/iconList/危险化学品.png'),id:7},
           {name:'环境事件',src:require('../../statics/iconList/环境.png'),id:8},
           {name:'极端天气',src:require('../../statics/iconList/极端天气.png'),id:9},
           {name:'其他',src:require('../../statics/iconList/其他.png'),id:10},
           {name:'一键电话',src:require('../../statics/iconList/一键电话.png'),id:11},
           {name:'应急预案',src:require('../../statics/iconList/应急预案.png'),id:12},
       ]
       
       created(){
           this.$nextTick(()=>{
              
           })
       }
       toaddPage(item: BLOCK){//或者 item:{name: String, src: String, id: Number}            
        //    
            if(item.id===12){
                this.$router.push({path:'/addWarning', query: {id: item.id} as any})
            }else if(item.id===11){

            }else{
                 this.$router.push('/formData')
            }
           
       }
   }
</script>

<style lang="stylus" scoped>
.squared
    width 100%
    height 100%
    display grid 
    grid-template-columns repeat(4,25%)
    grid-template-rows repeat(3.33.33%)
    .squaredItem
        text-align center
        color #7D6666
        .imgIcon
            padding-top 20px
            height 50px
</style>