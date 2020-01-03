/*
 * @Author: your name
 * @Date: 2019-11-14 11:32:35
 * @LastEditTime : 2019-12-19 10:18:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mobile-cam\src\router\routes.ts
 */
import { RouteConfig } from 'vue-router'
import Layout from "../layouts/MyLayout.vue";
import formData from "../layouts/formData.vue";

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
  },
  {
    path: '/formData',
    component: formData,
  }
]

// Always leave this as last one
// if (process.env.MODE !== 'ssr') {
//   routes.push({
//     path: '*',
//     component: () => import('@/pages/Error404.vue')
//   })
// }

export default routes
