export default {
    state: {
        name: '李寻欢'
    },
    getters: {
        add(state) {
            return  state.name + '--小说人物'
        }
    },
    mutations: {
        changeName(state, data) {
            state.name = data.name
        }
    },
    actions: {
        changeName(context, data) {
            context.commit('changeName', data)
        }
    }
}