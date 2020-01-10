<template>
    <div class="formDetail">
        <div class="formItem">
            <q-icon name="chat" />
        </div>
        <div class="formItem">
            <textarea readonly placeholder="请输入消息内容" v-model="text" class="formTextarea"></textarea>
        </div>
        <div class="formItem">
            <q-icon name="person" />
        </div>
        <div class="formItem">
            <div style="width:300px;overflow:auto">
                <span v-if="!resPerson.length">接收人</span>    
                <q-avatar class="chooseNameavatar" color="primary" text-color="white" v-for="person in resPerson" :key="person.emplId">
                    <span class="chooseName" v-if="!person.avatar">{{person.name}}</span>
                    <img v-if="person.avatar" :src="person.avatar">
                </q-avatar>
            </div>
        </div>
        <div class="formItem">
            <q-icon name="attach_file" />
            <span class="spans" style="font-size:16px;padding-left:10px">附件</span>
            <q-list separator>
                <q-item v-for="file in contents.attachmentList" :key="file.id">
                    <q-item-section @click="gotoFile(file.filePath)" class="full-width ellipsis">
                        <q-item-label style="color:grey;font-size:16px;text-align:left">
                            <span>{{ file.fileName }}</span>
                        </q-item-label>
                    </q-item-section>

                </q-item>
            </q-list>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import * as dd from "dingtalk-jsapi";
    import { emergencysingle } from '@/boot/axios'
    @Component
    export default class Formdetail extends Vue {
        resPerson= []
        text= ''
        contents = {}
        single(id :any) {
            emergencysingle({emergencyId:id}).then((res:any)=> {
                const response = res
                if(response.statusCode ===200){
                    this.contents = res.data.data[0]
                    this.text = (this.contents as any).content
                    this.resPerson = (this.contents as any).receiverList
                }
            })
        }


        gotoFile(path:any) {
            dd.ready(()=>{
                (dd.biz.util as any).openLink({
                url:`${location.origin}${path}`,//要打开链接的地址
                onSuccess(result:any) {
                    /**/
                },
                    onFail : function(err:any) {}
                })
            })
        }

        created(){
            this.single(this.$route.params.id)
            dd.ready(()=>{
                dd.biz.navigation.setTitle({
                    title : 'DING消息详情',//控制标题文本，空字符串表示显示默认文本
                });
            })
        }

    }
</script>

<style lang="stylus" scoped>
.formDetail
    width 100%
    height 100vh
    background #F5F5F5
    width 100%
    height 100vh
    display grid 
    grid-template-columns 10% 90%
    grid-template-rows 150px auto auto
    .formItem
        margin-top 10px
        background white
        .formItemchoose
            width 100%
            box-shadow none
        .formTextarea
            width 100%
            height 100%
            border none
            outline none
            padding 10px
    .formItem:nth-child(2n-1)
        text-align center
        line-height 70px
        font-size 25px
        color #282D33
    .formItem:nth-child(5)
        text-align left
        padding-left 10px
        grid-column-start 1
        grid-column-end 3
        grid-row-start 3
        grid-row-end 4
        .span 
            font-size 10px

    .formItem:nth-child(4)
        line-height 70px
        padding-left 10px
        display grid
        color #AFB1B4
.chooseNameavatar
    margin 0 3px
    .chooseName
        font-size 13px
</style>
