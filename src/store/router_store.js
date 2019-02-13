export default {
    state: {
        list: []
    },
    getter: {},
    mutations: {
        fillList(state, data) {
            return state.list = data
        }
    },
    actions: {
        fillList(context, data) {
            return context.commit('fillList', data)
        }
    }
}