<template>
	<div id="header">
		<img  class="header_logo_img" src="../../../../assets/logo.png"/>
		<span class="span_name">鲸腾网盘</span>
		<div class="user_info">
			<span class="user_info_span" v-on:click="signOut">【退出】</span>
		</div>
	</div>
</template>
<script>
	import toastr from 'toastr'
	import '../../css/toastr_config.css'
	
	export default{
		data(){
			return{
				uname:"",
				img_head:"",
				basicUrl:"/fsystem2/",
				returnPath:[] /* 返回上一级目录的栈 */
			}
		},
		mounted:function(){
			// let this_ = this;
			// this.$axios.post(this.basicUrl + "file/getUserInfo",this.$qs.stringify({
			// 	token:this_.$cookie.get("token")
			// })).then(function(response){
			// 	let data = response.data;
			// 	if(data.error_no > 0){
			// 		toastr.error(data.error_info);
			// 	}else{
			// 		this_.uname = data.data.uname;
			// 	}
			// });
		},
		methods:{
			pushHistory:function(url){
				window.history.pushState(null, null, url); 
			},
			
			
			signOut:function(){
				let this_ = this;
				//发请求去后台删除token
				this.$axios.post(this.basicUrl + "user/removeToken",this.$qs.stringify({
					token:this_.$cookie.get("token")
				})).then(function(response){
					let data = response.data;
					if(data.error_no > 0){
						toastr.error(data.error_info);
					}else{
						//删除token
						this_.$cookie.delete("token");
						location.href="../login.html";
					}
				});
			},
			
			
			
		}
	}
	
	
	
</script>
<style lang="stylus" rel="stylesheet/stylus">
		// @import "../../stylus/icon.stylus" 
	#header
		z-index :5
		width:100%
		height:60px
		background-color :white;
		box-shadow:0 0 15px #ccc;
		position :fixed; 
		.span_name
			font-family: SourceHanSansSC-Bold;
			font-size: 24px;
			color: #222222;
			letter-spacing: 0;
			margin-top:1%;
			margin-left:0.6%;
			margin-bottom :1.4%;
			display:inline-block;
			float:left;
		.header_logo_img
			width:33px;
			height:37px;
			float:left;
			margin-left:1.3%;
			margin-top:1.2%;
			margin-bottom :1.1px;
		.user_info
			width:267px;
			height:100%;
			margin:0px auto;
			padding:0px;
			margin-right:20px;
			text-align :center;
			.user_pic
				width:40px;
				height:40%;
				margin-top:25px;
				border-radius :50%;
				float:left;
			.user_info_span
				display :block;
				width:80px;
				height:auto;
				margin-right:10px; 
				float:right;
				margin-top:25px;
				cursor :pointer;
				font-size:14px;
				&:hover
					color:red;
			// .icon_com_x
			// font-size :14px;
</style>
