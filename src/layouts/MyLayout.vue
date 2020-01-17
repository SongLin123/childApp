<!--
 * @Author: your name
 * @Date: 2019-11-14 11:09:34
 * @LastEditTime : 2020-01-17 09:49:14
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mobile-cam\src\layouts\MyLayout.vue
 -->
<template>
  <div class="layout">
    <q-btn-dropdown
      style="width:100%;border:none;position:fixed;top:0;background:white;z-index:9999;border-bottom:1px solid #f3f3f3"
      :label="checkName"
    >
      <q-list>
        <q-item
          clickable
          v-close-popup
          v-for="(item, index) in choose"
          :key="index"
          @click="checkedItem(item)"
        >
          <q-item-section>
            <q-item-label>
              {{item.value}}
              <q-icon v-show="item.show" name="check" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <div class="infoCardBox">
      <q-infinite-scroll @load="onLoad" :offset="250" ref="uploadScroll" :debounce="500">
        <div class="infoCard" v-for="item in list" :key="item.id" @click="toDetail(item)">
          <div class="cardItem">
            <q-icon style="vertical-align: middle" name="library_books" />
          </div>
          <div class="cardItem">
            {{item.setTime}} ,{{item.address}},发生{{item.classification}}事件,详情{{item.content}}
            {{item.whetherCasualties?`死亡人数${item.deathNumber},受伤人数${item.injuredNumber}`:"无人员伤亡"}}
          </div>
          <div class="cardItem">
            <!-- <span style="color:#47478A" v-for="it in item.receiverList.slice(0,2)" :key="it.emergencyId"> -->
            <q-avatar
              class="chooseNameavatar"
              color="primary"
              text-color="white"
              v-for="(person,index) in item.dutyLeaderList.slice(0,3)"
              :key="person.receivedUserId"
            >
              <span
                class="chooseName"
                v-if="!person.avatar&&index !== 2"
              >{{person.name.substr(person.name.length-2,2)}}</span>
              <span class="choosemore" v-if="index === 2">...</span>
              <img v-if="person.avatar&&index !== 2" :src="person.avatar" />
            </q-avatar>
            <!-- {{it.name}}
            </span>-->
            <span style="color:#D2D5D7">| {{item.createdTime}}</span>
          </div>
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" v-if="uploadshow" />
            <span v-if="!uploadshow">已经到底了</span>
          </div>
        </template>
      </q-infinite-scroll>
    </div>
    <q-btn class="addBtn" @click="onItemClick" round color="primary" icon="add" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
// import axios from "axios"
import * as dd from "dingtalk-jsapi";
// import { emergencyList } from "@/boot/axios";
import { APIS, ParamslistGet } from "@/services/index";
@Component
export default class Layout extends Vue {
  // ding消息列表
  list: any[] = [];
  uploadshow = true;
  params = {
    pageNo: 0,
    pageSize: 10,
    type: 0
  };

  timer: any;

  choose = [
    { value: "全部", show: true, type: 0 },
    { value: "我发起的", show: false, type: 1 },
    { value: "我接收的", show: false, type: 2 }
  ];

  checkName = this.choose[0].value;

  onItemClick() {
    this.$router.push("/formData");
  }

  checkedItem(item: any) {
    this.params.pageNo = 0;
    this.list = [];
    this.params.type = item.type;

    // this.$refs['uploadScroll'].updateScrollTarget()
    (this.$refs["uploadScroll"] as any).resume();
    this.checkName = item.value;

    // this.fetchList(item.type, "load");
    this.choose.map((res: any) => {
      res.show = item.value === res.value;
    });
    // this.fetchList()
  }

  toDetail(data: any) {
    this.$router.push(`/formDetail/${data.id}`);
  }

  async fetchList() {
    this.params.pageNo++;

    return await APIS.DefaultApi.listGet(this.params as any).then((res: any) => {
      if (res.statusCode === 200) {
        console.log(res.data.data)
        this.list.push(...(res.data.data as any[]));

        return res.data.data.length < 10;
      } else {
        this.$q.notify({
          message: "请求失败",
          color: "warning",
          position: "top",
          timeout: 2000
        });
      }
    });
  }

  // 无限滚动
  async onLoad(index: any, done: any) {
    const stat = await this.fetchList();
    done(stat);
  }

  created() {
    this.$nextTick(() => {
      dd.ready(() => {
        dd.biz.navigation.setTitle({
          title: "应急响应" //控制标题文本，空字符串表示显示默认文本
        });
      });

      // this.fetchList(0,'unload')
    });
  }
}
</script>

<style lang="stylus" scoped>
.layout {
  width: 100%;
  position: relative;

  .addBtn {
    position: fixed;
    right: 20px;
    bottom: 50px;
    cursor: pointer;
  }

  .infoCardBox {
    position: absolute;
    top: 40px;
    width: 100%;
    max-height: calc(100vh - 40px);
    overflow: auto;

    .infoCard {
      width: 100%;
      height: 100px;
      display: grid;
      grid-template-columns: 15% 85%;
      grid-template-rows: auto 40px;
      border-bottom: 1px solid #E3E5E7;
      margin-top: 10px;

      .cardItem:first-child {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 3;
        text-align: center;
        font-size: 25px;
        color: #0D8FFF;
      }

      .cardItem:nth-child(2) {
        font-size: 16px;
        padding-top: 10px;
        padding-left: 20px;
        padding-right: 20px;
        color: #969CA2;
      }

      .cardItem:last-child {
        line-height: 40px;
        padding-left: 20px;
      }
    }
  }
}

.chooseNameavatar {
  margin: 0 2px;
  width: 20px;
  height: 20px;

  .chooseName {
    font-size: 5px;
  }

  .choosemore {
    font-size: 10px;
  }
}
</style>
<style lang="stylus">
.layout .q-btn__wrapper:before {
  box-shadow: none;
}

.q-menu {
  border-radius: none;
  text-align: center;
}
</style>