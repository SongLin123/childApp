<!--
 * @Author: your name
 * @Date: 2019-11-14 11:09:34
 * @LastEditTime : 2020-01-17 09:49:25
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mobile-cam\src\layouts\MyLayout.vue
 -->
<template>
  <div class="addForm">
    <div class="companyitem one">
      <div class="formitem">日期</div>
      <div class="formitem">
        <q-input :disable="readOnly" filled v-model="form.setTime">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="form.setTime" :locale="myLocale" mask="YYYY-MM-DD HH:mm:ss" />
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="form.setTime" mask="YYYY-MM-DD HH:mm:ss" format24h />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="formitem">所属居委</div>
      <div class="formitem">
        <q-select
          v-if="!readOnly"
          v-model="form.committeeName"
          :options="committeeOption"
          placeholder
        />
        <q-input v-if="readOnly" :disable="readOnly" v-model="form.committeeName" />
      </div>
      <div class="formitem">地址</div>
      <div class="formitem">
        <q-input :disable="readOnly" v-model="form.address" placeholder="详情地址，如道路、门牌号、楼栋号、单元室等" />
      </div>
      <div class="formitem">突发事件分类</div>
      <div class="formitem">
        <q-select
          v-if="!readOnly"
          :disable="readOnly"
          v-model="form.classification"
          :options="classificationOption"
        />
        <q-input v-if="readOnly" :disable="readOnly" v-model="form.classification" />
      </div>
    </div>

    <div class="companyitem two">
      <div class="formitem">有无人员伤亡</div>
      <div class="formitem">
        <q-toggle :disable="readOnly" v-model="form.whetherCasualties" />
      </div>
      <div class="formitem" v-if="form.whetherCasualties">受伤人数</div>
      <div class="formitem" v-if="form.whetherCasualties">
        <q-input :disable="readOnly" v-model.number="form.injuredNumber" />
      </div>
      <div class="formitem" v-if="form.whetherCasualties">死亡人数</div>
      <div class="formitem" v-if="form.whetherCasualties">
        <q-input
          :disable="readOnly"
          v-if="form.whetherCasualties"
          v-model.number="form.deathNumber"
        />
      </div>
    </div>
    <div class="companyitem">
      <div class="formitem">物损情况</div>
      <div class="formitem">
        <q-input
          :disable="readOnly"
          v-model="form.content"
          placeholder="50字以内"
          filled
          type="textarea"
        />
      </div>
    </div>
    <div class="companyitem">
      <div class="formitem">附件</div>
      <div class="formitem">
        <q-uploader
          style="width:100%"
          :bordered="false"
          color="white"
          text-color="grey-6"
          flat
          multiple
          batch
          v-if="!readOnly"
          :dark="false"
        >
          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
              <q-icon color="black" name="attach_file" />

              <div class="col">
                <div
                  class="q-uploader__subtitle"
                >{{scope.files.length?`已选择${scope.files.length}个文件`:""}}</div>
              </div>
              <q-btn v-if="!readOnly" type="a" icon="add_box" round dense flat>
                <q-uploader-add-trigger />
              </q-btn>
            </div>
          </template>
          <template v-slot:list="scope">
            <q-list separator :factory="readOnly||uploadFun(scope)">
              <q-item v-for="file in (readOnly?scope.attachmentList:scope.files)" :key="file.id">
                <q-item-section>
                  <q-item-label
                    style="color:grey;font-size:16px;text-align:left"
                    class="full-width ellipsis"
                  >
                    <span>{{ file.name||file.fileName }}</span>
                  </q-item-label>
                </q-item-section>
                <q-item-section avatar @click="readOnly||scope.removeFile(file)">
                  <q-icon color="grey-6" name="close" />
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </q-uploader>
        <q-list v-if="readOnly" separator>
          <q-item v-for="file in form.attachmentList" :key="file.id">
            <q-item-section>
              <q-item-label
                style="color:grey;font-size:16px;text-align:left"
                class="full-width ellipsis"
              >
                <span>{{ file.name||file.fileName }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div class="companyitem">
      <div class="formitem">当日值班领导</div>
      <div class="formitem" @click="readOnly||choosePerson('dutyLeader')">
        <div style="overflow:auto">
          <q-avatar
            class="chooseNameavatar"
            color="primary"
            text-color="white"
            v-for="(person,index) in (readOnly?form.dutyLeaderList.slice(0,5):form.dutyLeader.slice(0,5))"
            :key="person.emplId"
          >
            <span class="chooseName" v-if="!person.avatar&&index !== 4">{{person.name}}</span>
            <span class="choosemore" v-if="index === 4">...更多</span>
            <img v-if="person.avatar&&index !== 4" :src="person.avatar" />
          </q-avatar>
        </div>
      </div>
    </div>
    <div class="companyitem">
      <div class="formitem">分管领导</div>
      <div class="formitem" @click="readOnly||choosePerson('leadersInCharge')">
        <div style="overflow:auto">
          <q-avatar
            class="chooseNameavatar"
            color="primary"
            text-color="white"
            v-for="(person,index) in (readOnly?form.leadersInChargeList.slice(0,5):form.leadersInCharge.slice(0,5))"
            :key="person.emplId"
          >
            <span class="chooseName" v-if="!person.avatar&&index !== 4">{{person.name}}</span>
            <span class="choosemore" v-if="index === 4">...更多</span>
            <img v-if="person.avatar&&index !== 4" :src="person.avatar" />
          </q-avatar>
        </div>
      </div>
    </div>
    <div class="companyitem">
      <div class="formitem">主管领导</div>
      <div class="formitem" @click="readOnly||choosePerson('executiveLeader')">
        <div style="overflow:auto">
          <q-avatar
            class="chooseNameavatar"
            color="primary"
            text-color="white"
            v-for="(person,index) in (readOnly?form.executiveLeaderList.slice(0,5):form.executiveLeader.slice(0,5))"
            :key="person.emplId"
          >
            <span class="chooseName" v-if="!person.avatar&&index !== 4">{{person.name}}</span>
            <span class="choosemore" v-if="index === 4">...更多</span>
            <img v-if="person.avatar&&index !== 4" :src="person.avatar" />
          </q-avatar>
        </div>
      </div>
    </div>
    <div class="companyitem">
      <div class="formitem">处置部门</div>
      <div class="formitem" @click="readOnly||choosePerson('disposalDepartment')">
        <div style="overflow:auto">
          <q-avatar
            class="chooseNameavatar"
            color="primary"
            text-color="white"
            v-for="(person,index) in (readOnly?form.disposalDepartmentList.slice(0,5):form.disposalDepartment.slice(0,5))"
            :key="person.emplId"
          >
            <span class="chooseName" v-if="!person.avatar&&index !== 4">{{person.name}}</span>
            <span class="choosemore" v-if="index === 4">...更多</span>
            <img v-if="person.avatar&&index !== 4" :src="person.avatar" />
          </q-avatar>
        </div>
      </div>
    </div>

    <!-- <div class="companyitem three"> -->
    <div class="post fixed-bottom" :v-if="!readOnly">
      <q-btn class="pbutton" style unelevated rounded color="primary" label="提交" @click="submitUp" />
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import * as dd from "dingtalk-jsapi";
// import axios from "axios";
import { APIS, ParamsaddPost } from "@/services/index";
import { compress } from "@/utils/compress";
import Axios from "axios";
@Component
export default class Form extends Vue {
  myLocale = {
    /* starting with Sunday */
    days: "周日_周一_周二_周三_周四_周五_周六".split("_"),
    daysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
    months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
      "_"
    ),
    monthsShort: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
      "_"
    ),
    firstDayOfWeek: 1
  };
  readOnly = false;
  form = {
    // formParams
    /**
     * 设置时间
     */
    setTime: "",
    /**
     * 居委名字
     */
    committeeName: "",
    /**
     * 地址
     */
    address: "",
    /**
     * 事件分类
     */
    classification: "",
    /**
     * 有无人员伤亡（布尔类型）
     */
    whetherCasualties: false,
    /**
     * 受伤人数
     */
    injuredNumber: "",
    /**
     * 死亡人数
     */
    deathNumber: "",
    /**
     * 内容
     */
    content: "",
    /**
     * 当日值班领导（数组）
     */
    dutyLeader: [],
    /**
     * 分管领导（数组）
     */
    leadersInCharge: [],
    /**
     * 主管领导（数组）
     */
    executiveLeader: [],
    /**
     * 处置部门（数组）
     */
    disposalDepartment: [],
    /**
     * 文件（数组）
     */
    file: []
  };
  committeeOption = [];
  classificationOption = [];

  fileList = [];
  text = "";
  resPerson = []; //通讯录选择人
  file: any;

  // context:'',
  // receiver:[],

  // pickedUsers= [] //已选用户
  created() {
    if (this.$route.params.id) {
      this.readOnly = true;
      dd.ready(() => {
        dd.biz.navigation.setTitle({
          title: "DING消息"
        });
      });

      APIS.DefaultApi.singleGet({
        emergencyId: this.$route.params.id as string
      }).then((response: any) => {
        if (response.statusCode === 200) {
          this.form = response.data.data[0];
          console.log(this.form);
        }
      });
    } else {
      dd.ready(() => {
        dd.biz.navigation.setTitle({
          title: "发送DING消息" //控制标题文本，空字符串表示显示默认文本
        });
      });
      APIS.DefaultApi.committeeListGet().then(
        res => (this.committeeOption = (res as any).data.data)
      );
      APIS.DefaultApi.classificationListGet().then(
        res => (this.classificationOption = (res as any).data.data)
      );
    }
  }

  // 附件
  fujian(id: any) {
    this.$q.loading.hide();
    const urls = `${location.origin}/m-tigerprawn-dingmsg/formDetail/${id}`;
    // console.log(location)
    const that = this;
    dd.ready(() => {
      (dd.biz.ding as any).create({
        users: [
          ...that.form.dutyLeader,
          ...that.form.leadersInCharge,
          ...that.form.executiveLeader,
          ...that.form.disposalDepartment
        ].map((item: any) => item.emplId), // 用户列表，工号
        corpId: (window as any).ddconfig.corpId, // 企业id
        type: 2, // 附件类型 1：image  2：link
        alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
        // alertDate: {"format":"yyyy-MM-dd HH:mm","value":"2015-05-09 08:00"},
        attachment: {
          title: that.text,
          text: urls,
          url: urls //附件点击后跳转url
        }, // 附件信息
        text: `${this.form.setTime} ,${this.form.address},发生${
          this.form.classification
        }事件,详情${this.form.content}
            ${
              this.form.whetherCasualties
                ? `死亡人数${this.form.deathNumber},受伤人数${this.form.injuredNumber}`
                : "无人员伤亡"
            }`, // 正文
        bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；

        onSuccess: function(res: any) {
          //onSuccess将在点击发送之后调用

          that.$router.push({ path: "/" });
        },
        onFail: function() {}
      });
    });
  }
  // 通讯录选人
  choosePerson(type: string) {
    const that = this;
    dd.ready(() => {
      (dd.biz.contact as any).complexPicker({
        title: "请选择目标",
        corpId: (window as any).ddconfig.corpId,
        multiple: true,
        limitTips: "超出了", //超过限定人数返回提示
        maxUsers: 1000, //最大可选人数
        pickedUsers: (that.form as any)[type], //已选用户
        pickedDepartments: [], //已选部门
        disabledUsers: [], //不可选用户
        disabledDepartments: [], //不可选部门
        requiredUsers: [], //必选用户（不可取消选中状态）
        requiredDepartments: [], //必选部门（不可取消选中状态）
        appId: (window as any).ddconfig.appid, //微应用的Id
        permissionType: "", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
        responseUserOnly: true, //返回人，或者返回人和部门
        startWithDepartmentId: 0, //仅支持0和-1
        onSuccess: function(result: any) {
          (that.form as any)[type] = result.users;
          console.log(result);
        },
        onFail: function(err: any) {}
      });
    });
  }

  // 上传
  async uploadFun(file: any) {
    this.form.file = await compress(file.files);
    // console.log(file)
  }

  // 上传
  submitUp() {
    this.$q.loading.show({});
    setTimeout(() => {
      this.$q.loading.hide();
    }, 10000);
    const params = new FormData();
    this.resPerson.map((it: any) => {
      params.append(
        "receiver",
        JSON.stringify({ name: it.name, avatar: it.avatar, userid: it.emplId })
      );
    });

    for (const key in this.form) {
      const element = (this.form as any)[key];
      switch (key) {
        case "file":
          this.form.file.map((it: any) => {
            params.append("file", it);
          });
          break;
        case "dutyLeader":
          element.forEach((ele: any) => {
            params.append(
              "dutyLeader",
              JSON.stringify({
                name: ele.name,
                avatar: ele.avatar,
                userid: ele.emplId
              })
            );
          });

          break;
        case "leadersInCharge":
          element.forEach((ele: any) => {
            params.append(
              "leadersInCharge",
              JSON.stringify({
                name: element.name,
                avatar: element.avatar,
                userid: element.emplId
              })
            );
          });
          break;
        case "executiveLeader":
          element.forEach((ele: any) => {
            params.append(
              "executiveLeader",
              JSON.stringify({
                name: element.name,
                avatar: element.avatar,
                userid: element.emplId
              })
            );
          });
          break;
        case "disposalDepartment":
          element.forEach((ele: any) => {
            params.append(
              "disposalDepartment",
              JSON.stringify({
                name: element.name,
                avatar: element.avatar,
                userid: element.emplId
              })
            );
          });
          break;
        default:
          params.append(key, element);
          break;
      }
    }

    if (
      this.form.setTime &&
      this.form.content &&
      (this.form.dutyLeader as any).length
    ) {
      // APIS.DefaultApi.addPost(this.form as any)
      Axios.request({
        url: "/emergency/add",
        method: "post",
        timeout: 2000,
        withCredentials: true,
        headers: {
          userid: (window as any).ddconfig.user.userid,
          token: (window as any).ddconfig.user.token
        },
        data: params
      }).then((res: any) => {
        //  console.log(res.data)
        if (res.data.statusCode === 200) {
          this.fujian(res.data.data.id);
        } else {
          this.$q.notify({
            message: "发送失败请重试",
            color: "warning",
            position: "top",
            timeout: 2000
          });
        }
        this.$q.loading.hide();
      });
    } else {
      this.$q.loading.hide();
      this.$q.notify({
        message: "日期、消息内容、联系人不能为空！",
        color: "warning",
        position: "top",
        timeout: 2000
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
.addForm {
  width: 100%;
  background: #f6f6f6;
  padding-bottom: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-content: space-around;

  .companyitem {
    box-sizing: border-box;
    padding: 15px 0;
    flex: 1;
    display: grid;
    grid-template-columns: 25% 75%;

    .formitem {
      background: white;
      line-height: 4;
      text-align: center;
      color: #555;
      border-bottom: 1px solid #f6f6f6;
    }
  }

  .post {
    width: 100vw;
    padding-left: 50%;

    .pbutton {
      width: 40vw;
      margin: 10px 0 10px -20vw;
    }
  }

  .one {
    flex: 0 calc(56px * 4);
    grid-template-rows: repeat(4, 56px);
  }

  .three {
    grid-template-columns: 100%;
    grid-template-rows: 1fr;
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