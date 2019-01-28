import Vue from 'vue'
import App from './App.vue'
import 'babel-polyfill'
import router from './router'
import store from './store/index'
import iview from 'iview'
import './my-theme/index.less'
import mixin from '@/mixin'
import fetch from '@/axios'
Vue.config.productionTip = false
Vue.use(iview)
Vue.mixin(mixin)
Vue.prototype.$fetch = fetch
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
