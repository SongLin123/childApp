/*
 * @Author: your name
 * @Date: 2019-12-18 18:24:31
 * @LastEditTime : 2020-01-16 15:58:29
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn-mobile-mbhand\src\quasar.ts
 */
import Vue from 'vue'

import './styles/quasar.styl'
import './styles/video-js.min.css';
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import {
  Quasar, QScrollArea, QExpansionItem, Notify, BottomSheet, Loading, QUploader, QList, QItem,
  QItemSection, Dialog, QCircularProgress, QInfiniteScroll
} from 'quasar'

Vue.use(Quasar, {
  // lang: require("quasar/lang/zh-hans.js"),
  config: { Loading, Notify },
  components: {
    QScrollArea, QExpansionItem, QUploader, QList, QItem, QItemSection, QCircularProgress, QInfiniteScroll
  },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: { Notify, BottomSheet, Loading, Dialog }
})