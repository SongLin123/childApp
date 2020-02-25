<template>
    <div class="homePage">
        <div class="homeitem">
            <squared></squared>
        </div>
        <div class="homeitem">
            <div class="tableTitle">
                <span>值班表</span> 
                <span @click="toDatezb">本月>></span>
            </div>
            <div class="tableDate">
                <q-tabs
                    v-model="tab"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                >
                    <q-tab name="mails" label="周一" />
                    <q-tab name="alarms" label="02.16" />
                    <q-tab name="movies" label="02.17" />
                    <q-tab name="photos" label="02.18" />
                    <q-tab name="videos" label="02.19" />
                    <q-tab name="addressbook" label="02.20" />
                    <q-tab name="photos1" label="02.21" />
                    <q-tab name="videos2" label="02.22" />
                    <q-tab name="addressbook3" label="02.23" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel v-for="item in tabList" :name="item" :key="item" class="q-pa-none">
                        <div class="tabContent">
                            <tabzb></tabzb>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </div>
            
        </div>
        <div class="homeitem">
            <div class="tableTitle">
                <span>应急消息</span> 
                <span></span>
            </div>
            <div class="tableDate">
                <q-tabs
                    v-model="tab"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                >
                    <q-tab name="mails" label="全部" />
                    <q-tab name="alarms" label="已发出" />
                    <q-tab name="movies" label="新评论" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel v-for="item in tabList" :name="item" :key="item" class="q-pa-none">
                        <div class="tabContents">
                            <warningcard v-for="item in 9" :key="item" :info='item' @click.native='towarningCard(item)'></warningcard>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
   import { Component, Vue, Prop, Watch } from "vue-property-decorator";
   import squared from "@/components/home/squared.vue";
   import tabzb from "@/components/home/tabzb.vue";
   import warningcard from '@/components/home/warningcard.vue'
   @Component({
       components:{
           squared, tabzb,warningcard
       }
   })
   export default class Index extends Vue{
       tab= 'mails'
       tabList= ['mails','alarms','movies','photos','videos','addressbook','photos1','videos2','addressbook3']
       created(){
           this.$nextTick(()=>{
               console.log(11111)
           })
       }
    //    点击本月跳转
        toDatezb(){
            this.$router.push('/datezb')
        }
        towarningCard(data:any){//跳转到warningCard
            this.$router.push({path:'/warningCard',query:{id:data}})
        }
   }
</script>

<style lang="stylus" scoped>
.homePage
    width 100%
    height 100%
    background-color #F5F6F5
    display grid 
    grid-template-columns 100%
    grid-template-rows 300px 300px auto
    .homeitem
        background white
        margin-bottom 15px
        .tableTitle
            height 50px 
            line-height 50px
            padding 0 20px
            display grid
            grid-template-columns 80% 20%
            grid-template-rows 100%
            border-bottom 1px solid #E9E9E9
        .tableTitle span:first-child
            font-size 17px
            font-weight 800
        .tableTitle span:last-child
            color #7F7F7F
        .tableDate
            height 250px
        .tableContent
            height 200px
    .homeitem:last-child
        margin 0
.tabContent
    width 100%
    height 198px
.tabContents
    width 100%
    height auto
    background #F5F6F5
    padding 1px 15px 0
</style>