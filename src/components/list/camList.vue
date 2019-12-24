<!--
 * @Author: your name
 * @Date: 2019-11-13 16:03:45
 * @LastEditTime : 2019-12-18 18:50:13
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mobile-cams\src\components\HelloWorld.vue
 -->
<template>
  <div style="width:100%;">
    <q-list bordered separator>
      <q-expansion-item
        v-for=" item in this.platList"
        :key="item.id"
        group="somegroup"
        expand-separator
        icon="account_balance"
        @show="loadList(item.id)"
        :label="item.name"
        :caption="item.place"
      >
        <q-list bordered separator>
          <q-item
            clickable
            v-ripple
            v-for="(item) in camsData"
            v-if="!item.type"
            :key="item.id"
            @click="selectCam(item)"
            :active="active===item.id"
            active-class="bg-teal-1 text-blue-8"
          >
            <q-item-section>{{item.name||"摄像头"}}</q-item-section>
            <q-item-section side @click="toggle(item,$event)">
              <q-btn round push :color="'teal'" icon="local_see" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<style lang="stylus">
.ball-outer {
  position: fixed;
  z-index: 1999;
  transition: all 1s cubic-bezier(1, 0.01, 0.01, 1);
}

.inner {
  width: 20px;
  height: 20px;
  line-height: 50px;
  border-radius: 50%;
  background-color: #09BE03;
  transition: all 1s linear;
  color: #ffffff;
  text-align: center;
  font-size: 0.7rem;
}
</style>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import {
  getCamlListByPlat,
  rtspPush,
  getChannelList,
  getPlatList
} from '../../boot/axios';

@Component
export default class CamList extends Vue {
  @Prop(Number) public readonly platId: number | undefined;
  private camsData: any[] = [];
  private active: number | null = null;
  private playing: any[] = [];
  private page = {
    pageNo: 1,
    pageSize: 20
  };
  private platList: any[] = [];
  /**
   * selectCam
   */
  public selectCam(item: any) {
    this.active = item.id;
    this.$emit('selectCam', item);
  }

  public async loadList(id: number) {
    this.camsData = [];
    await getCamlListByPlat({
      districtId: id,
      pageNo: 1,
      pageSize: 100
    }).then((res: any) => {
      this.camsData.push(...res.data.pageContent);

      this.$emit('showCamsInMap', this.camsData);
    });
  }

  private toggle(item: any, event: MouseEvent) {
    const position = { x: event.x, y: event.y };

    this.addToList(item, position, event.srcElement!);
  }

  private async addToList(
    item: any,
    position: { x: number; y: number },
    target: EventTarget
  ) {
    await this.flyBall(position, target as HTMLElement);
    this.$emit('addcam', item);
  }

  private async flyBall(position: any, target: HTMLElement) {
    const outer = document.createElement('div');
    outer.className = 'ball-outer';

    const inner = document.createElement('div');
    inner.className = 'inner';

    outer.appendChild(inner);
    (target as HTMLElement).after(outer);
    outer.style.top = position.y + 'px';
    outer.style.left = position.x + 'px';
    await new Promise(res => {
      setTimeout(() => {
        outer.style.top = '0';
        outer.style.left = '0';
        setTimeout(() => {
          outer.remove();
          res();
        }, 700);
      }, 200);
    });
  }

  /**
   * created
   */
  private created() {
    getPlatList().then(res => {
      this.platList = res.data.pageContent;
      this.platList.map(it => {
        return Object.assign(it, { expanded: false });
      });
    });
  }
}
</script>
