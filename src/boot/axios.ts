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
export const rtspPush = (par: any) => {
    const parm = qs.stringify(par);
    return axios.post("/ms/start_push", parm).then(res => res.data)
}
export const stopPush = (par: { id: number }) => {
    const parm = qs.stringify(par);
    return axios.post("/ms/stop_push", parm).then(res => res.data)
}
export const getCamlListByRtsp = (par: { rtsp: string }) => {
    return axios.get("/handapi/cam/getCamByRtsp", { params: par }).then(res => res.data)
}
export const getCamlListByPlat = (par: { districtId: number, pageNo: number; pageSize: number }) => {
    return axios.get("/handapi/cam/pageList", { params: par }).then(res => res.data)
}
export const getPlatList = () => {
    return axios.get("/handapi/district/pageList").then(res => res.data)
}

