import axios from 'axios'
import qs from 'qs'
import router from "../router"
import {Message} from 'iview';

const Axios = axios.create({
    baseURL: '/',
    timeout: 10000,
    // responseType: 'json',
    withCredentials: true,
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    // }
})

// 请求前置拦截器
Axios.interceptors.request.use(
    config => {
        if (config.headers['Content-Type'] == 'multipart/form-data') {
            return config;
        }
        if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
            // 序列化
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error);
    }
);

// 返回响应拦截器
Axios.interceptors.response.use(
    res => {
        if (res.status === 200) {
            if (res.data.code == 0 && res.data.msg == '请登录') {
                router.push({path: '/login'})
                return Promise.reject(res)
            } else {
                return res.data
            }
        }
    },
    error => {
        console.log('err' + error)// for debug
        Message.info('出错啦，稍后重试')
        return Promise.reject(error)
    }
);

const fetch = (url, params, method, config) => {
    return new Promise((resolve, reject) => {
        Axios[method](url, params, config).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export default fetch
