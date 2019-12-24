/*
 * @Author: your name
 * @Date: 2019-12-18 18:24:31
 * @LastEditTime: 2019-12-19 10:48:31
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn-mobile-mbhand\src\shims-vue.d.ts
 */
declare module '*.vue' {
  import Vue from 'vue'
  import "@types/amap-js-sdk"
  export default Vue
}
declare namespace AMap {
  /**
       * 构造一个鼠标绘制对象
       * @param map 地图对象
       */
    class MouseTool extends EventBindable {
  
      constructor(map: AMap.Map);
      marker(options:MarkerOptions|undefined): void;
      polyline(options:PolylineOptions|undefined): void;
      polygon(options:PolygonOptions|undefined): void;
      rectangle(options:PolygonOptions|undefined): void;
      circle(options:CircleOptions|undefined): void;
      rule(options:PolylineOptions|undefined): void;
      measureArea(options:PolygonOptions|undefined): void;
      rectZoomIn(options:PolygonOptions|undefined): void;
      rectZoomOut(options:PolygonOptions|undefined): void;
      close(options:boolean): void;
  }
  }
  
  declare let $router: any;