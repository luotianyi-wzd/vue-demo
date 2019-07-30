import {
	login, logout
} from '@/api/user'

export default {
	state: {
		username: '',
		userId: '',
		avatorImgPath: '',
		token: '',
		access: '',
		hasGetInfo: false,
		unreadCount: 0,
		messageUnreadList: [],
		messageTrashList: [],
		messageReadList: [],
		messageContentStore: {}
	},
	getters: {
		messageUnreadCount: state => state.messageUnreadList.length,
		messageReadedCount: state => state.messageReadedList.length,
		messageTrashCount: state => state.messageTrashList.length
	},
	mutations: {
		Set_Role(state, data) {
			state.role = data.role
		},
		setAvator(state, avatorPath) {
			state.avatorImgPath = avatorPath
		},
		setUserId(state, id) {
			state.userId = id
		},
		setUsername(state, name) {
			state.username = name
		},
		setAccess(state, access) {
			state.access = access
		},
		setToken(state, token) {
			state.token = token
		},
		
	},
	actions: {
		setRole({commit}, data) {
			commit('Set_Role', data)
		},
		handleLogin({commit}, {username, password}) {
			username = username.trim()
			return new Promise((resolve, reject) => {
				login({
					password,
					username
				}).then(res => {
					const data = res
					commit('setToken', data.token)
					resolve(data)
				}).catch(err => {
					reject(err)
				})
			})
		},
		handleLogout({state, commit}) {
			return new Promise((resolve, reject) => {
				logout().then(res => {
					commit('setToken', '')
					commit('setAccess', [])
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}