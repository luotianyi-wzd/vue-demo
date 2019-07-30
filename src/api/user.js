import fetch from '@/axios'

const login = ({username, password}) => {
	const data = {username, password}
	return fetch({
		data,
		url: '/api/user/login',
	})
}


const logout = () => {
	return fetch({
		url: '/api/user/logout',
	})
}
export {login, logout}