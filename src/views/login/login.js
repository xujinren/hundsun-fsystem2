import Vue from 'vue'
import login from './login.vue'
//导入
 import $ from 'jquery'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.js'
import qs from 'qs'
import axios from 'axios'
//引入toastr的配置档
import toastrSetup from './js/toastrSetup.js'

//使用函数 
toastrSetup();
// // @ts-ignore
// import toastr from '@/src/assets/register/js/toastr.js'  
// // @ts-ignore
// import  '@/src/assets/register/css/toastr.css'
//设置全局
Vue.prototype.$axios = axios

axios.defaults.withCredentials = true; //设置跨域，处理sessionid不一致，意思是携带cookie信息,保持session的一致性
Vue.prototype.$qs = qs


//引入cookie
import cookie from 'vue-cookie'
// Vue.use(cookies)
Vue.prototype.$cookie = cookie;

Vue.config.productionTip = false

new Vue({
  // router,
  // store,
  render: h => h(login)
}).$mount('#login')
