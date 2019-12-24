<!--
 * @Author: your name
 * @Date: 2019-11-14 11:09:34
 * @LastEditTime : 2019-12-18 18:43:31
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mobile-cam\src\pages\Index.vue
 -->
<template>
  <q-page class="flex column flex-center">
    <div class="area" style="flex: 0 0 calc(31vh - 0px);">
      <q-card class="container" ref="myvideo">
        <q-btn
          v-show="playing"
          class="close"
          color="primary"
          round
          size="xs"
          @click="relo"
          icon="close"
        />
      </q-card>
    </div>
    <div class="area" style="flex: 0 0 30vh;">
      <amap style="height:30vh" ref="amap"></amap>
    </div>

    <div class="area" style="flex: 0 0 39vh ;overflow-y:scroll">
      <q-scroll-area style="overflow-y:scroll">
        <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
          <q-tab-panel name="cam" style="width:100%;">
            <camList
              ref="cam"
              :platId="platId"
              @showCamsInMap="showCamsInMap"
              @selectCam="selectCam"
              @addcam="addcam"
            ></camList>
          </q-tab-panel>
        </q-tab-panels>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Amap from "../components/map/amap.vue";

import camList from "../components/list/camList.vue";
import { getPlatList } from "../boot/axios";
import videojs from "video.js";

@Component({
  components: { Amap, camList }
})
export default class MainContainer extends Vue {
  private search = "";
  private panel = "";
  private platId: number | null = null;
  private platName = "";
  private player: null | any = null;
  private playing = false;

  private mounted() {
    this.panel = "cam";
  }

  private addcam(channel: any) {
    this.relo();
    this.loadV(channel);
  }

  private relo() {
    if (this.player) {
      this.player.dispose();
      this.player = null;
      this.playing = false;
    }
  }

  // load m3u8视频
  private loadV(channel: number) {
    const base64str = window.btoa((channel as any).url);
    const video = document.createElement("video");
    video.style.width = "100%";
    video.style.height = "100%";
    ((this.$refs.myvideo as any).$el as Element).appendChild(video);
    let str = `rtmp://58.247.128.138:1935/rtsp/${base64str}`;
    str = str!.replace(/rtmp/g, "http");
    str = str.replace(/1935/g, "48088");
    str += ".m3u8";
    this.player = videojs(video);
    this.player.src({
      src: str,
      type: "application/vnd.apple.mpegurl",
      overrideNative: true,
      controls: true,
      autoplay: false,
      preload: "none",
      muted: true
    });
    this.player.play();
    this.playing = true;
  }

  private selectCam(item: any) {
    (this.$refs.amap as Amap).selectCam(item);
  }

  private showCamsInMap(cams: any[]) {
    (this.$refs.amap as Amap).showCams(cams);
  }
}
</script>

<style lang="stylus">
.area {
  width: 100%;
  box-sizing: border-box;
}

.container {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 30vh;

  .close {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 99;
  }

  .video {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
