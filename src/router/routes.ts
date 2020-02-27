/*
 * @Author: your name
 * @Date: 2019-11-14 11:32:35
 * @LastEditTime : 2020-01-16 15:05:33
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mobile-cam\src\router\routes.ts
 */
import { RouteConfig } from 'vue-router'
import Layout from "../layouts/index.vue";
import formData from "../layouts/formData.vue";
import formDetail from "../layouts/formDetail.vue";

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
  },
  {
    path: '/addWarning',
    component:()=>import('@/layouts/addWarning.vue')
  },
  {
    path: '/formData',
    component: formData,
  },
  {
    path: '/datezb',
    component: ()=>import('@/layouts/dateZb.vue'),
  },
  {
    path: '/formDetail/:id',
    component: formData,
  },
  {
    path: '/warningCard',
    component: ()=>import('@/layouts/warningCard.vue'),
  },
  {
    path: '/warningCardList',
    component: ()=>import('@/layouts/warningCardList.vue'),
  },
]

// Always leave this as last one
// if (process.env.MODE !== 'ssr') {
//   routes.push({
//     path: '*',
//     component: () => import('@/pages/Error404.vue')
//   })
// }

export default routes
