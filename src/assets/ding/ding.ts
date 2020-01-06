import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
let code = ''
dd.ready(()=> {
(dd.runtime.permission as any).requestAuthCode({
        corpId: 'ding38a65ac3e948dd2135c2f4657eb6378f', // 企业id
        onSuccess(info: any) {
            code = info.code
            console.log(code)
        },
    });
});
axios.get(`security/checkLogin/${code}`).then(res=>{
    console.log(res)
})