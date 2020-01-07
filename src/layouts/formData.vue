<!--
 * @Author: your name
 * @Date: 2019-11-14 11:09:34
 * @LastEditTime : 2019-12-19 10:05:34
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mobile-cam\src\layouts\MyLayout.vue
 -->
<template>
 <div class="addForm">
     <div class="formItem">
        <q-icon name="chat" />
     </div>
     <div class="formItem">
       <textarea placeholder="请输入消息内容" class="formTextarea"></textarea>
     </div>
     <div class="formItem">
         <q-icon name="person" />
     </div>
    <div class="formItem" @click="choosePerson">
        <div>请选择接收人</div>
        <div class="formicon">
            <q-icon name="chevron_right" />
        </div>
    </div>
     <div class="formItem">
         <q-icon name="attach_file" />
     </div>
      <div class="formItem"><!-- @click="show()" -->
       <!-- :on-preview="handlePreview"
            :on-remove="handleRemove" -->
        
        <el-upload
            class="upload-demo"
            :file-list="fileList"
            action=""
            :auto-upload="false"
            list-type="picture">
            <div>附件</div>
        </el-upload>
        <div class="formicon">
            <q-icon name="control_point" />
        </div>
        
     </div>
     <div class="formItem">
        <q-btn style="width:100%;position:fixed;bottom:0;left:0;margin-bottom:10px" unelevated rounded color="primary" label="提交" />
     </div>
 </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as dd from 'dingtalk-jsapi';
@Component
export default class FormData extends Vue {
    fileList= []
    text= ''

    choosePerson() {
        dd.ready(()=>{
           (dd.biz.contact as any).complexPicker({
                title: "测试标题",
                corpId: 'dingeb68041d2ba9538cacaaa37764f94726',
                multiple: true,
                limitTips:"超出了",          //超过限定人数返回提示
                maxUsers:1000,            //最大可选人数
                pickedUsers:[],            //已选用户
                pickedDepartments:[],          //已选部门
                disabledUsers:[],            //不可选用户
                disabledDepartments:[],        //不可选部门
                requiredUsers:[],            //必选用户（不可取消选中状态）
                requiredDepartments:[],        //必选部门（不可取消选中状态）
                appId:343447998,              //微应用的Id
                permissionType:"",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
                responseUserOnly:false,        //返回人，或者返回人和部门
                startWithDepartmentId:0 ,   //仅支持0和-1
                onSuccess: function(result: any) {
                    console.log(result)
                },
                onFail: function(err:any) {}
            }) 
        })
    }
}
</script>

<style lang="stylus" scoped>
.addForm
    background #F5F5F5
    width 100%
    height 100vh
    display grid 
    grid-template-columns 10% 90%
    grid-template-rows 150px 50px auto 70px
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
        font-size 25px
        color #282D33
    .formItem:last-child
        grid-column-start 1 
        grid-column-end 3
        grid-row-start 4
        grid-row-end 5
        position relative
    .formItem:nth-child(4),.formItem:nth-child(6)
        line-height 40px
        padding-left 10px
        display grid
        grid-template-columns 80% 20%
        grid-template-rows 50px 
        color #AFB1B4
        .formicon
            text-align center
            font-size 20px
</style>
<style lang="stylus">
.upload-demo .el-upload__input
    display none
.el-icon-close-tip
    display none
.el-upload.el-upload--picture
    outline none
</style>