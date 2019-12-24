<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2017-06-02 10:16:05
 * @LastEditTime : 2019-12-19 11:31:00
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div>
    <div ref="minimap" class="minimap"></div>
  </div>
</template>

<script lang="ts" lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import remoteLoad from "@/utils/remoteLoad";
import * as turf from "@turf/turf";

export interface LngLat {
  lng: number;
  lat: number;
}
@Component
export default class Amap extends Vue {
  public zoom = null as null | number;
  public myOptions = {
    zoom: this.zoom || 16, //级别
    center: [121.57090365886688, 31.113365946637597], //中心点坐标
    viewMode: "3D", //使用3D视图,
    pitch: 60,
    skyColor: "#fff",
    mapStyle: "amap://styles/night"
  };
  public map = null as null | AMap.Map;

  private markerSet: Array<{ id: number; marker: AMap.Marker }> = [];

  private infoWindow: null | AMap.InfoWindow = null;

  public showCams(cams: any[]) {
    if (this.markerSet.length > 0) {
      this.map!.remove(this.markerSet);
      this.markerSet = [];
    }
    if (cams.length !== 0) {
      cams.forEach(it => {
        const lnglat = it.geomType ? it.center : it.geom[0];

        if (lnglat) {
          this.markerSet.push(
            this.drawMarker(
              it.id,
              lnglat.lng,
              lnglat.lat,
              it.name,
              it.url,
              it.ascriptionType
            )
          );
        }
      });
    }
  }

  /**
   * drawMark
   */
  public drawMarker(
    id: number,
    lng: number,
    lat: number,
    title: string,
    videoUrl: string,
    ascriptionType: number
  ) {
    const marker = new AMap.Marker({
      map: this.map!,
      // icon: ascriptionType === 2 ? '/img/map/face.png' : '/img/map/road.png',
      position: new AMap.LngLat(lng, lat),
      zIndex: 20,
      title,
      extData: videoUrl
    });

    return { id, marker };
  }

  /**
   * clean
   */
  public clean() {
    this.markerSet = [];
    this.map!.clearMap();
  }

  /**
   * selectCam
   */
  public selectCam(cam: any) {
    const marker = this.markerSet.find(item => item.id === cam.id);

    this.flyTo(marker!.marker);
    this.infoWindow!.setContent(marker!.marker.getTitle() || "选中");
    this.infoWindow!.open(this.map!, marker!.marker.getPosition());
  }
  /**
   * flyTo
   */
  public flyTo(arg?: any) {
    let pos;
    if (arg) {
      pos = [arg];
      this.map!.setZoom(19);
      (this.map! as any).setPitch(0);
    }

    this.map!.setFitView(pos);
  }

  public init() {
    //初始化map对象
    this.$nextTick(() => {
      this.map = new AMap.Map(
        this.$refs.minimap as Element | any,
        this.myOptions as any
      );
      const infoWindow = new AMap.InfoWindow({
        content: "",
        offset: new AMap.Pixel(0, -30)
      });
      this.infoWindow = infoWindow;
    });
  }

  private async created() {
    this.$q.loading.show();
    await remoteLoad(
      "https://webapi.amap.com/maps?v=1.4.15&key=4dcdc8c288e19164922e5b1539ceb0ba&plugin=AMap.PolyEditor&plugin=AMap.MouseTool&plugin=AMap.Autocomplete,AMap.PlaceSearch，AMap.Heatmap"
    );

    this.init();
    setTimeout(() => {
      this.$q.loading.hide();
    }, 1000);
  }
}
</script>

<style>
.minimap {
  width: 100%;
  height: 100%;
}
.videoDialog {
  z-index: 9999;
}
.infowindow-content {
  width: 200px;
  height: 50px;
  border-radius: 40px;
  position: relative;
  background: hsl(40, 16%, 96%);
  border-radius: 20px;
  text-align: center;
  line-height: 50px;
}
.infowindow-content::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 5%;
  right: 5%;
  bottom: 15%;
  border-radius: 10px;
  background: hsl(48, 100%, 20%);
  transform: translate(0, -15%) rotate(-4deg);
  transform-origin: center center;
  box-shadow: 0 0 20px 15px hsl(48, 100%, 20%);
  z-index: -1;
}
.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
  position: absolute;
  bottom: 7px;
  margin: 0 auto;
}

.info-bottom img {
  position: relative;
  z-index: 104;
}
</style>
