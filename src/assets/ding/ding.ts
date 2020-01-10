// import * as dd from 'dingtalk-jsapi';
// // import axios from 'axios';
// import { userId } from '@/boot/axios'

// dd.ready(()=> {
//     (dd.runtime.permission as any).requestAuthCode({
//         corpId: 'ding38a65ac3e948dd2135c2f4657eb6378f', // 企业id
//         onSuccess(info: any) {
//             // 获取授权码
//             let code = info.code 
//             console.log(code)
//             // 获取access_token
//             userId({code: code}).then((res)=>{
//                 console.log(res)
//             })
//         },
//     });
// })
