import axios from 'axios'
import qs from 'qs'
import router from "@/router/router"
import {Message} from 'iview'

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
		const options = {
			...config.data,
			...config.params,
		}
		let authToken = window.localStorage.getItem('authToken')
		authToken && (config.headers.authToken = authToken)
		
		if (config.method === 'post') {
			config.data = options
			config.data = qs.stringify(config.data)
		} else if (config.method === 'get') {
			config.params = options
		}
		
		return config
	},
	err => {
		console.log(err) // for debug
		return Promise.reject(err)
	}
)

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
	err => {
		console.log('err' + err)// for debug
		Message.info('出错啦，稍后重试')
		return Promise.reject(err)
	}
)


const fetch = (options) => {
	const {url, data, config, method = 'post'} = options
	return Axios[method](url, data, config)
}

export default fetch
