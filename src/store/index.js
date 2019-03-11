import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import page1_store from './page1_store'
import router_store from  './router_store'
import user from  './user'

export default new Vuex.Store({
    modules: {
        page1_store: page1_store,
        router_store,
        user,
    }
})
