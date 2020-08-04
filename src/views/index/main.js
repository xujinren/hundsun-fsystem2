import Vue from 'vue'
import App from './App.vue'

 import 'bootstrap'
 import  $ from 'jquery'
 import axios from 'axios'
 Vue.prototype.$axios = axios
 Vue.prototype.$ = $
Vue.config.productionTip = false 

new Vue({
  render: h => h(App),
}).$mount('#app')
