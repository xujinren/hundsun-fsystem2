<template>
  <div id="login">
		<div id="login_div">
			<p class = "login_div_p">登录</p>
			<div class="div_">
				<i class="icon-user-line i_left"></i>
				<input id="uname_id" v-on:blur="blur_input_uname" v-model="uname" type="text" class="username_class"  placeholder="username" data-toggle="popover" data-trigger="focus"  title="提示" data-content="用户名由6-18位字母,数字,下划线和美元符号组成,且不能有数字开头"/>
				<p v-show="uname_info_flag == true" class="error_info">{{uname_info}}</p>
			</div>
			<div class="div_">
				<i class="icon-password i_left"></i> 
				<input type="password" id="upassword_id" v-on:blur="blur_input_upassword" class="username_class" v-model="upassword" placeholder="password"  data-toggle="popover" data-trigger="focus"  title="提示" data-content="密码由6-18位字母,数字,下划线和美元符号组成,且不能有数字开头"/>
				<p v-show="upassword_info_flag == true" class="error_info">{{upassword_info}}</p>
			</div>
			
			<div class="div_">
				<span class="sumbit_" v-on:click="sumbit_click">提交</span>
			</div>
		</div>
  </div>
</template>
<script>
	import toastr from 'toastr'
	import './css/toastr_config.css'
	function changeBorder(id, color){
		$("#" + id).css("border-color", color);
	}
	export default{
		data(){
			return{
				uname:"a12345",
				upassword:"a12345",
				uname_info:"",
				upassword_info:"",
				uname_info_flag:false,
				upassword_info_flag:false,
				basicUrl:"/fsystem2/",
			}
		},
		mounted:function(){
			
		},
		methods:{
			 blur_input_uname:function(){
				if(this.uname.trim() == "" || this.uname == null){
					this.uname_info_flag = true;
					this.uname_info = "用户名不能为空";
					changeBorder("uname_id", "#c21d00");
				}else{
						this.uname_info = "";
						changeBorder("uname_id", "rgb(0, 165, 248)");
						this.uname_info_flag = false;
					}
			},
			blur_input_upassword:function(){
				if(this.upassword.trim() == "" || this.upassword == null){
					this.upassword_info_flag = true;
					this.upassword_info="密码不能为空";
					changeBorder("upassword_id", "#c21d00");
				}else{
						this.upassword_info="";
						changeBorder("upassword_id", "rgb(0, 165, 248)");
						this.upassword_info_flag = false;
					}
				},
			//提交按钮的点击
			sumbit_click:function(){
				this.blur_input_uname();
				this.blur_input_upassword();
				//判断校验有没有通过，没有通过则要提示
				if(this.uname_info_flag || this.upassword_info_flag || this.upassword2_info_flag  || this.uemail_info_flag){
					toastr.error("请将信息填写完整");
				}else{
					//发送请求去后台登录
					let this_ = this;
					this.$axios.post(this.basicUrl + 'user/login', 
						this.$qs.stringify({
						u_name:this_.uname,
						u_password:this_.upassword,
						})
					).then(function(response){
						let data = response.data;
						if(data.error_no == 6){
							toastr.error("账号或密码错误");
						}else{
							toastr.success("登录成功！");
							this_.$cookie.set("token", data.data,"0");
							location.href="../userMain/userMain.html";
						}
					});
				}
			}
		},
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "./stylus/icon.stylus"
	#login
		#login_div
			margin:0px auto;
			padding:0px;
			margin-top:100px;
			color: #2c3e50;
			border:1px solid #ccc;
			border-radius :15px;
			width:400px;
			height:300px;
			box-shadow:0 0 15px #ccc;
			.login_div_p
				color:rgb(0, 165, 248);
				font-size:22px;
				margin-left:45%;
			.div_
				width:100%;
				height:30px;
				margin-top:40px;
				.i_left
					margin-left:50px;
					font-size :22px;
					margin-top:2px;
					float:left;
				.username_class
					width:60%;
					margin-left:20px;
					height:100%;
					margin-left:10%;
					border :1px solid rgb(0, 165, 248);
					border-radius :10px;
					padding-left:10px;
					outline:medium;
					background-color :rgba(0,0,0,0);
				.sumbit_
					border:1px solid rgb(0, 165, 248);
					font-size:12px;
					border-radius :8px;
					background-color :white;
					transition: all 0.5s;
					width:40%;
					display :block;
					height:30px;
					text-align :center;
					line-height :30px;
					float:left;
					cursor :pointer;
					margin-left:40%;
					margin-top:10px;
					&:hover
						color:white;
						background-color :rgb(0, 165, 248);
				.error_info
					color:#c21d00;
					font-size:14px;
					font-weight :bold;
					margin-left:110px;
					float:none;
</style>
