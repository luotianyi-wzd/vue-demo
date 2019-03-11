import {request} from './../api/about'

export default {
    state: {
        name: '李寻欢',
        list: []
    },
    getters: {
        add(state) {
            return state.name + '--小说人物'
        }
    },
    mutations: {
        ChangeName(state, data) {
            state.name = data.name
        },
        ChangeList(state, data) {
            state.list = data
        }
    },
    actions: {
        changeName(context, data) {
            context.commit('ChangeName', data)
        },
        changeStatus({ commit }, data) {
            return new Promise((resolve, reject) => {
                request(data.current).then(res => {
                    console.log(res)
                    commit('ChangeList', res.data)
                    resolve()
                }).catch(err => {
                    console.log(err)
                    reject(error)
                })
            })
        }
    }
}
