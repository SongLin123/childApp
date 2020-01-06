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
    <div class="formItem">
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
            :before-upload='beforeUpload'
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
        <q-btn style="width:100%;position:fixed;bottom:0;left:0" unelevated rounded color="primary" label="提交" />
     </div>
 </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class FormData extends Vue {
    fileList= []
    text= ''
    show (grid:any) {
      this.$q.bottomSheet({
        message: '请先选择相册吧',
        grid,
        actions: [
          {
            label: '相册',
            icon: 'image',
            id: 'image'
          },
        ]
      }).onOk((action:any) => {
        // console.log('Action chosen:', action.id)
      }).onCancel(() => {
        // console.log('Dismissed')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
    beforeUpload(file: File) {
        console.log(file)
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
    grid-template-rows 150px 50px auto 50px
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