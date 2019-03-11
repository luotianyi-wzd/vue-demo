
export default {
    state: {
       role: 0
    },
    getters: {
        change(state) {
            return state.role
        }
    },
    mutations: {
        Set_Role(state, data) {
            state.role = data.role
        }
    },
    actions: {
        setRole({commit}, data) {
            commit('Set_Role', data)
        }
    }
}
