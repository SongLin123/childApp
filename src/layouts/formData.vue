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
      <textarea placeholder="请输入消息内容" v-model="text" class="formTextarea"></textarea>
    </div>
    <div class="formItem">
      <q-icon name="person" />
    </div>
    <div class="formItem" @click="choosePerson">
      <div style="width:300px;overflow:auto">
        <span v-if="!resPerson.length">请选择接收人</span>

        <q-avatar
          class="chooseNameavatar"
          color="primary"
          text-color="white"
          v-for="(person,index) in resPerson"
          :key="person.emplId"
        >
          <span class="chooseName" v-if="!person.avatar&&index !== 4">{{person.name}}</span>
          <span class="choosemore" v-if="index === 4">...更多</span>
          <img v-if="person.avatar&&index !== 4" :src="person.avatar" />
        </q-avatar>
      </div>
      <div class="formicon">
        <q-icon name="chevron_right" />
      </div>
    </div>

    <div class="formItem">
        <q-uploader
            style="width:100%"
            :bordered='false'
            color='white'
            text-color="grey-6"
            flat
            multiple
            batch
            :dark="false">
             <template v-slot:header="scope">
                <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                  
                    <q-icon color="black" name="attach_file" />
        
                    <div class="col">
                        <div class="q-uploader__subtitle">已选择{{scope.files.length}}个文件</div>
                    </div>
                    <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                        <q-uploader-add-trigger />
                    </q-btn>
                </div>
            </template>
            <template v-slot:list="scope">
                <q-list separator :factory="uploadFun(scope)">
                    <q-item v-for="file in scope.files" :key="file.name">
                        <q-item-section>
                            <q-item-label style="color:grey;font-size:16px;text-align:left" class="full-width ellipsis">
                                <span>{{ file.name }}</span>
                            </q-item-label>
                        </q-item-section>
                        <q-item-section avatar  @click="scope.removeFile(file)">
                        <q-icon color="grey-6" name="close" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </template>
         </q-uploader>
    </div>
    <div class="formItem">
      <q-btn
        style="width:100%;position:fixed;bottom:15px;left:0;margin-bottom:10px"
        unelevated
        rounded
        color="primary"
        label="提交"
        @click="submitUp"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import * as dd from "dingtalk-jsapi";
import axios from "axios";
@Component
export default class Form extends Vue {
  fileList = [];
  text = "";
  resPerson = []; //通讯录选择人
  file: any;

  // context:'',
  // receiver:[],

  // pickedUsers= [] //已选用户
  created() {
    dd.ready(()=>{
        dd.biz.navigation.setTitle({
            title : '发送DING消息',//控制标题文本，空字符串表示显示默认文本
        });
    })
  }

  // 附件
  fujian(id:any) {
    this.$q.loading.hide()
    const urls = `${location.origin}/m-tigerprawn-dingmsg/formDetail/${id}`
    // console.log(location)
    const that = this;
    dd.ready(() => {
      (dd.biz.ding as any).create({
        users: that.resPerson.map((item: any) => item.emplId), // 用户列表，工号
        corpId: (window as any).ddconfig.corpId, // 企业id
        type: 2, // 附件类型 1：image  2：link
        alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
        // alertDate: {"format":"yyyy-MM-dd HH:mm","value":"2015-05-09 08:00"},
        attachment: {
            title:that.text,
            text:urls,
            url: urls, //附件点击后跳转url
        }, // 附件信息
        text: that.text, // 正文
        bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；

        onSuccess: function(res: any) {
          //onSuccess将在点击发送之后调用

          that.$router.push({path:'/'})
        },
        onFail: function() {}
      });
    });
  }
  // 通讯录选人
  choosePerson() {
    this.$q.dialog({
        title: '注意',
        message: '请直接选择个人(不能直接选择部门)',
        cancel: true,
        persistent: true,
        focus:'确认',
        // cancel:'取消'
      }).onOk(() => {
        // console.log('OK')
        const that = this;
        dd.ready(() => {
        (dd.biz.contact as any).complexPicker({
            title: "请选择目标",
            corpId: (window as any).ddconfig.corpId,
            multiple: true,
            limitTips: "超出了", //超过限定人数返回提示
            maxUsers: 1000, //最大可选人数
            pickedUsers: that.resPerson, //已选用户
            pickedDepartments: [], //已选部门
            disabledUsers: [], //不可选用户
            disabledDepartments: [], //不可选部门
            requiredUsers: [], //必选用户（不可取消选中状态）
            requiredDepartments: [], //必选部门（不可取消选中状态）
            appId: (window as any).ddconfig.appid, //微应用的Id
            permissionType: "", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
            responseUserOnly: false, //返回人，或者返回人和部门
            startWithDepartmentId: 0, //仅支持0和-1
            onSuccess: function(result: any) {
                that.resPerson = result.users;
                // console.log(result)
            },
            onFail: function(err: any) {}
        });
        });
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    
  }

  // 上传
  uploadFun(file: any) {
    this.file = file.files;
    // console.log(file)
  }

  // 上传
  submitUp() {
    this.$q.loading.show()
    const params = new FormData();
    this.resPerson.map((it: any) => {
      params.append(
        "receiver",
        JSON.stringify({ name: it.name, avatar: it.avatar, userid: it.emplId })
      );
    });
    this.file.map((it: any) => {
        params.append("file", it);
    })
    params.append("context", this.text);
    if(this.text&&this.resPerson.length){
      axios.request({
        url: "/emergency/add",
        method: "post",
        data: params,
        headers: {
          "Content-Type": "multipart/form-data",
          userid: (window as any).ddconfig.user.userid,
          token: (window as any).ddconfig.user.token
        }
      })
      .then((res: any) => {
        //  console.log(res.data)
        if(res.data.statusCode === 200){
            this.fujian(res.data.data.id)
        }else{
            this.$q.notify({
            message: '发送失败请重试',
            color: 'warning',
            position: 'top',
            timeout:2000
        })
            
        }
        this.$q.loading.hide()
      });
    }else{
        this.$q.loading.hide()
        this.$q.notify({
            message: '消息内容或联系人不能为空！',
            color: 'warning',
            position: 'top',
            timeout:2000
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.addForm {
  background: #F5F5F5;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: 150px 80px auto 80px;

  .formItem {
    margin-bottom: 10px;
    background: white;

    .formItemchoose {
      width: 100%;
      box-shadow: none;
    }

    .formTextarea {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      padding: 10px;
    }
  }

  .formItem:nth-child(2n-1) {
    text-align: center;
    line-height: 70px;
    font-size: 25px;
    color: #282D33;
  }

  .formItem:nth-child(5) {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  .formItem:last-child {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
    position: relative;
  }

  .formItem:nth-child(4) {
    line-height: 70px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 80% 20%;
    grid-template-rows: 80px;
    color: #AFB1B4;
    .formicon {
      text-align: center;
      font-size: 20px;
    }
  }
}

.chooseNameavatar {
  margin: 0 3px;

  .chooseName {
    font-size: 13px;
  }

  .choosemore {
    font-size: 10px;
  }
}
</style>
<style lang="stylus">
.upload-demo .el-upload__input {
  display: none;
}

.el-icon-close-tip {
  display: none;
}

.el-upload.el-upload--picture {
  outline: none;
}
</style>