import Vue from 'vue'
import App from './App.vue'
import 'babel-polyfill'

import router from './router/router'

import store from './store/index'

import iview from 'iview'
import './my-theme/index.less'
import mixin from '@/mixin'

import fetch from '@/axios'
Vue.prototype.$fetch = fetch

import VueLazyload from './directives/lazyload'
Vue.use(VueLazyload)

Vue.config.productionTip = false
Vue.use(iview)
Vue.mixin(mixin)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
