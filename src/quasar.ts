/*
 * @Author: your name
 * @Date: 2019-12-18 18:24:31
 * @LastEditTime : 2019-12-19 10:28:08
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
import { Quasar, QScrollArea, QExpansionItem, Notify, BottomSheet, Loading } from 'quasar'

Vue.use(Quasar, {
  config: { Loading },
  components: {
    QScrollArea, QExpansionItem
  },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: { Notify, BottomSheet, Loading }
})