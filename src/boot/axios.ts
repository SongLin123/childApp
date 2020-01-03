/*
 * @Author: your name
 * @Date: 2019-11-14 11:32:35
 * @LastEditTime : 2019-12-19 10:10:07
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mobile-cam\src\boot\axios.ts
 */
import axios from 'axios'
import * as qs from "qs";


export const getChannelList = () => {
    return axios.post("/ms/channel_list").then(res => res.data)
}


