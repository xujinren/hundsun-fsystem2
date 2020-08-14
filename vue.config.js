const webpack = require('webpack')
module.exports = {
	publicPath: './',
	    outputDir: 'dist',
	    lintOnSave: true,
	    runtimeCompiler: true, //关键点在这  
	    // 调整内部的 webpack 配置。
	    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
	    chainWebpack: () => {},
	    configureWebpack: () => {},
	    // 配置 webpack-dev-server 行为。
	//处理跨域
	devServer:{
		open:false, //是否自动弹出浏览器页面
		host:"0.0.0.0",
		// port:'8080',
		https:false ,//是否使用https协议
		
		proxy:{
			// http://127.0.0.1:8012/onlinePreview
			'/fsystem2':{
				target:'http://localhost:8082/fsystem2/', //api的服务器地址
				// target:'http://www.xjren.club/fsystem2/',
				changeOrigin:true,
				pathRewrite:{
					'^/fsystem2': ''
				}
			},
		}
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
	  },
	lintOnSave: false, //是否开启eslint
	
	pages:{
		index: {
			entry: "./src/views/index/main.js", //配置入口的js文件
			template: "./public/index.html",//主页面
			filename: "index.html",//打包后html文件的名称
			title: "主页" //打包后的html文件内<title>标签的文本内容
		},
		register: {
			entry: "./src/views/register/register.js", //配置入口的js文件
			template: "./src/views/register/register.html",//主页面
			filename: "register.html",//打包后html文件的名称
			title: "注册" //打包后的html文件内<title>标签的文本内容
		},
		login:{
			entry: "./src/views/login/login.js", //配置入口的js文件
			template: "./public/login.html",//主页面
			filename: "login.html",//打包后html文件的名称
			title: "登录" //打包后的html文件内<title>标签的文本内容
		},
		userMain: {
			entry: "./src/views/userMain/userMain.js", //配置入口的js文件
			template: "./public/userMain.html",//主页面
			filename: "userMain.html",//打包后html文件的名称
			title: "主页" //打包后的html文件内<title>标签的文本内容
		},
	}
}