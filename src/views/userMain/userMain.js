import Vue from 'vue'
import userMain from './userMain.vue'
//导入
 import $ from 'jquery'
// import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

//引入toastr的配置档
import toastrSetup from './js/toastrSetup.js'

//使用函数
toastrSetup();

//引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
//以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。
//引入cookie
import cookie from 'vue-cookie'
// Vue.use(VueCookies)
Vue.prototype.$cookie = cookie;
// this.$cookies.config(expireTimes[,path])  // default: expireTimes = 1d , path=/

//引入图片查看器
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    // "inline": true,  //启动inline模式
    "button": true,  //显示右上角关闭按钮
    "navbar": true,  //显示缩略图导航
    "title": true,  //显示当前图片标题
    "toolbar": true,  //显示工具栏
    "tooltip": true,  //显示缩放百分比
    "movable": true,  //图片是否可以移动
    "zoomable": true,  //图片是否可以缩放
    "rotatable": true,  //图片是否可以旋转
    "scalable": true,  //图片是否可以翻转
    "transition": true,  //使用CSS3过度
    "fullscreen": true,  //播放时是否全屏
    "keyboard": true,  //是否支持键盘
    "url": "data-source" //设置大图片的 url
  }
})

// // @ts-ignore
// import toastr from '@/src/assets/register/js/toastr.js'  
// // @ts-ignore
// import  '@/src/assets/register/css/toastr.css'
import toastr from 'toastr'
import './css/toastr_config.css'


import qs from 'qs'
import axios from 'axios'

axios.defaults.withCredentials = true //设置跨域，处理sessionid不一致，意思是携带cookie信息,保持session的一致性
//设置拦截请求
//请求拦截器
// axios.interceptors.request.use(
// 	config=>{
// 	},
// 	error=>{
// 	}
// );

axios.interceptors.response.use(
	response =>{
		// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
		if(response.status == 200){
			let data = response.data;
			if(data.error_no == 7){//token过期
				//重新发送请求获取token
				axios.post("/fsystem2/user/getNewToken",qs.stringify({
						oldToken:cookie.get("token")
					})).then(function(res){
					let data = res.data;
					cookie.set("token", data.data,'0');
					console.info("token : " + data.data);
					return axios.request(response.config);
				});
			}else if(data.error_no == 20){ //被抢占登录
				document.write(data.data);
			}else{
				return response;
			}
		}
	},
);




//设置全局
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false

new Vue({
  // router,
  // store,
  render: h => h(userMain)
}).$mount('#userMain');
