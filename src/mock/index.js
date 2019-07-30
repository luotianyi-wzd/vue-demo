const proxy = {
	'GET /api/user': {id: 1, username: 'www', sex: 1},
	
	'GET /api/user/list': [
		{id: 1, username: 'www', sex: 1},
		{id: 2, username: 'aaa', sex: 2}
	],
	
	'POST /api/user/login': (req, res) => {
		const {password, username} = req.body
		if (password === 'qwer1234' && username === 'qwer1234') {
			return res.send({
				status: 200,
				code: 0,
				token: 'akjl;jdl;kwajldkjwal;kdja',
				data: {id: 1, username: 'aaac', sex: 1},
				msg: '登陆成功撒'
			})
		} else {
			return res.send({status: 'error', code: 403, msg: '出错啦，沙雕'})
		}
	},
	'POST /api/user/logout': (req, res) => {
		const {token} = req.body
			return res.send({
				status: 200,
				code: 0,
				data: {id: 1, username: 'aaac', sex: 1},
				msg: '退出成功撒'
			})
		
	},
}


module.exports = proxy