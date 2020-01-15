/*
 * @Author: your name
 * @Date: 2020-01-09 16:06:53
 * @LastEditTime : 2020-01-15 18:15:13
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \m-tigerprawn-hand\src\WrappedFetch.ts
 */
import axios, { AxiosError } from 'axios';
import qs from 'qs';

const inst = axios.create({
    timeout: 2000,
    withCredentials: true,
    headers: {}
});

// @cc: 检测 axios 响应状态
function onStatusError(error: AxiosError | Error) {
    const err =
        'response' in error && error.response
            ? {
                statusCode: error.response.status,
                message: error.response.statusText
            }
            : { statusCode: 10001, msg: error.message };
    if (err.statusCode === 401 || err.statusCode === 403) {
        // @todo 未登录未授权
        // EventCenter.emit('common.user.status', err);
    }
    return err;
}

export type AjaxPromise<R> = Promise<R>;

export interface ExtraFetchParams {
    data?: any; // post json
    form?: any; // post form
    multipart?: any;
    query?: any;
    header?: any;
    path?: any;
    extra?: any;
}

export interface WrappedFetchParams extends ExtraFetchParams {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH' | 'HEAD';
    url: string;

}

export class WrappedFetch {
    /**
     * @description ajax 方法
     */
    public ajax(
        { method, url, data, form, query, header, extra, multipart }: WrappedFetchParams,
        path?: string,
        basePath?: string
    ) {
        let config = {
            ...extra,
            method: method.toLocaleLowerCase(),
            headers: { ...header }
        };
        // json
        if (data) {
            config = {
                ...config,
                headers: {
                    ...config.headers,
                    'Content-Type': 'application/json'
                },
                data
            };
        }
        // form
        if (form) {
            config = {
                ...config,
                headers: {
                    ...config.headers,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify(form)
            };
        }
        if (multipart) {
            config = {
                ...config,
                headers: {
                    ...config.headers,
                    'Content-Type': 'multipart/form-data'
                },
                data: multipart
            };
        }
        return inst
            .request({ ...config, url, params: query })
            .then(res => res.data)
            .catch(onStatusError);
    }

    /**
     * @description 接口传参校验
     */
    public check<V>(value: V, name: string) {
        if (value === null || value === undefined) {
            const msg = `[ERROR PARAMS]: ${name} can't be null or undefined`;
            // 非生产环境，直接抛出错误
            // if (process.env.NODE_ENV === 'development') {
            //     throw Error(msg);
            // }
            return msg
        }
    }
}

export default new WrappedFetch();