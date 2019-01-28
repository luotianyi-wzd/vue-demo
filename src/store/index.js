import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import page1_store from './page1_store'
import page2_store from  './page2_store'
export default new Vuex.Store({
    modules: {
        page1_store: page1_store,
        page2_store: page2_store
    }
})
