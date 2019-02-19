export default {
    state: {
        list: [],
        username: localStorage.getItem('username')
    },
    getter: {},
    mutations: {
        fillList(state, data) {
            return state.list = data
        },
        LOGIN_IN(state, username) {
            return state.username = username
        },
        LOGIN_OUT(state) {
            return state.username = ''
        }
    },
    actions: {
        fillList(context, data) {
            return context.commit('fillList', data)
        }
    }
}
