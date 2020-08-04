const webpack = require('webpack')
module.exports = {
	//处理跨域
	devServer:{
		open:false, //是否自动弹出浏览器页面
		host:"0.0.0.0",
		// port:'8080',
		https:false ,//是否使用https协议
		proxy:{
			'/fsystem2':{
				// target:'http://localhost:8082/fsystem2/', //api的服务器地址
				target:'http://www.xjren.club/fsystem2/',
				changeOrigin:true,
				pathRewrite:{
					'^/fsystem2': ''
				}
			},
			// 'fsystem':{
			// 	target:'http://www.xjren.club/fsystem/',
			// 	changeOrigin:true,
			// 	pathRewrite:{
			// 		'^/fsystem': ''
			// 	}
			// },
		}
	// 	// proxy:"http://localhost:8082/fsystem/",
	// 	// port: 8080
	},
	 // 基本路径
	  configureWebpack: {
		plugins: [
		  new webpack.ProvidePlugin({
			$:"jquery",
			jQuery:"jquery",
			"windows.jQuery":"jquery"
		  })
		],
		// // toastr插件
		// plugins: [
		//     new webpack.ProvidePlugin({
		//         // Automatically loads modules
		//         toastr: 'toastr'
		//      })
		// ]
	  },
	lintOnSave: false, //是否开启eslint
	
	pages:{
		index: {
			entry: "src/views/index/main.js", //配置入口的js文件
			template: "public/index.html",//主页面
			filename: "index.html",//打包后html文件的名称
			title: "主页" //打包后的html文件内<title>标签的文本内容
		},
		register: {
			entry: "src/views/register/register.js", //配置入口的js文件
			template: "src/views/register/register.html",//主页面
			filename: "register.html",//打包后html文件的名称
			title: "注册" //打包后的html文件内<title>标签的文本内容
		},
		login: {
			entry: "src/views/login/login.js", //配置入口的js文件
			template: "src/views/login/login.html",//主页面
			filename: "login.html",//打包后html文件的名称
			title: "登录" //打包后的html文件内<title>标签的文本内容
		},
		userMain: {
			entry: "src/views/userMain/userMain.js", //配置入口的js文件
			template: "src/views/userMain/userMain.html",//主页面
			filename: "userMain.html",//打包后html文件的名称
			title: "主页" //打包后的html文件内<title>标签的文本内容
		},
	}
}