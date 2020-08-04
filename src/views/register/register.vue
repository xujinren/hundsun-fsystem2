<template>
  <div id="register">
		<div id="register_div">
			<p class = "register_div_p">注册</p>
			<div class="div_">
				<i class="icon-user-line i_left"></i>
				<input id="uname_id" v-model="uname" v-on:blur="blur_input_uname" type="text" class="username_class"  placeholder="username" data-toggle="popover" data-trigger="focus"  title="提示" data-content="用户名由6-18位字母,数字,下划线和美元符号组成,且不能有数字开头"/>
				<p v-show="uname_info_flag == true" class="error_info">{{uname_info}}</p>
			</div>
			
			<div class="div_">
				<i class="icon-password i_left"></i> 
				<input type="password" id="upassword_id" v-on:blur="blur_input_upassword" class="username_class" v-model="upassword" placeholder="password"  data-toggle="popover" data-trigger="focus"  title="提示" data-content="密码由6-18位字母,数字,下划线和美元符号组成,且不能有数字开头"/>
				<p v-show="upassword_info_flag == true" class="error_info">{{upassword_info}}</p>
			</div>
			
			<div class="div_">
				<i class="icon-password i_left"></i>
				<input type="password"  id="upassword2_id" v-on:blur="blur_input_upassword2" class="username_class" v-model="upassword2" placeholder="password"/>
				<p v-show="upassword2_info_flag == true" class="error_info">{{upassword2_info}}</p>
			</div>
			<div class="div_">
				<i class="icon-email i_left"></i>
				<input type="email"  id="uemail_id" v-on:blur="blur_input_uemail" class="username_class email_class" v-model="uemail" placeholder="email"/>
				<span class="email_send" v-on:click="sendCodeEmail">{{code_text}}</span>
				<span class="error_info" v-show="uemail_info_flag == true">{{uemail_info}}</span>
			</div>
			<div class="div_">
				<span class="i_left code_span">验证码：</span>
				<input type="text" id="code_id" v-on:blur="blur_input_code"  class="username_class code_input" v-model="code" placeholder="code"/>
				<p v-show="code_info_flag == true" class="error_info">{{code_info}}</p>
				
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
	
	//激活弹出框
	$(function () {
	  $('[data-toggle="popover"]').popover();
	})
	export default{
		data(){
			return{
				uname:"",
				upassword:"",
				upassword2:"",
				uemail:"",
				code:"",
				uname_info:"",
				upassword_info:"",
				upassword2_info:"",
				uemail_info:"",
				code_info:"",
				uname_info_flag:false,
				upassword_info_flag:false,
				upassword2_info_flag:false,
				uemail_info_flag:false,
				code_info_flag:false,
				basicUrl:"/fsystem2/",
				code_text:"获取验证码"
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
					let regex = /^[a-zA-Z]\w{5,17}$/g;
					let group = this.uname.match(regex);
					if(group == null || group.length <= 0){
						this.uname_info_flag = true;
						changeBorder("uname_id", "#c21d00");
						this.uname_info = "用户名格式不对";
					}else{
						//发送请求去后台查询用户名是否重复
						let this_ = this;
						this.$axios.post(this_.basicUrl + "user/hasAcc",
							this.$qs.stringify({
								uname:this_.uname,
								}
							)
						).then(function(response){
							let data = response.data;
							if(data.error_no > 0){
								this_.uname_info = "用户名已被注册";
								changeBorder("uname_id", "#c21d00");
								this_.uname_info_flag = true;
							}else{
								this_.uname_info = "";
								changeBorder("uname_id", "rgb(0, 165, 248)");
								this_.uname_info_flag = false;
							}
						})
					}
				}
			},
			blur_input_upassword:function(){
				if(this.upassword.trim() == "" || this.upassword == null){
					this.upassword_info_flag = true;
					this.upassword_info="密码不能为空";
					changeBorder("upassword_id", "#c21d00");
				}else{
					let regex = /^[a-zA-Z]\w{5,17}$/g;
					let group = this.upassword.match(regex);
					if(group == null || group.length <= 0){
						this.upassword_info_flag = true;
						this.upassword_info="密码格式不对";
						changeBorder("upassword_id", "#c21d00");
					}else{ 
						this.upassword_info="";
						changeBorder("upassword_id", "rgb(0, 165, 248)");
						this.upassword_info_flag = false;
					}
				}
			},
			blur_input_upassword2:function(){
				if(this.upassword == this.upassword2){
					changeBorder("upassword2_id", "rgb(0, 165, 248)");
					this.upassword2_info_flag = false;
					this.upassword2_info = "";
				}else{
					this.upassword2_info_flag = true;
					changeBorder("upassword2_id", "#c21d00");
					this.upassword2_info = "两次密码不一致";
				}
			},
			blur_input_uemail:function(){
				if(this.uemail.trim() == "" || this.uemail == null){
					this.uemail_info = "邮箱不能为空";
					this.uemail_info_flag = true;
					changeBorder("uemail_id", "#c21d00");
				}else{
					let regex = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
					let group = this.uemail.match(regex);
					if(group == null || group.length <= 0){
						this.uemail_info = "邮箱格式不对";
						this.uemail_info_flag = true;
						changeBorder("uemail_id", "#c21d00");
					}else{
						//发送请求去后台查询邮箱是否重复
						var this_ = this;
						this.$axios.post(this_.basicUrl + "user/hasEmail",
							this.$qs.stringify({
								email:this_.uemail
							})
						).then(function(response){
							let data = response.data;
							if(data.error_no > 0){
								this_.uemail_info = "邮箱已被注册";
								this_.uemail_info_flag = true;
								changeBorder("uemail_id", "#c21d00");
							}else{
								this_.uemail_info = "";
								this_.uemail_info_flag = false;
								changeBorder("uemail_id", "rgb(0, 165, 248)");
							}
						});
					}
				}
			},
			//发送邮箱验证码
			sendCodeEmail:function(){
				if(this.code_text > 0){
					toastr.info("请勿重复发送邮件！");
					return ;
				}
				if(this.uemail_info_flag == true){//说明校验没过
					toastr.error("请输入正确可用的邮箱地址");
				}else{
					//开启倒计时
					let this_ = this;
					let timeDel = setInterval(function(){
						if(this_.code_text == "获取验证码"){
							this_.code_text = 60;
						}else{
							if(this_.code_text > 0){
								this_.code_text = this_.code_text - 1;
							}else{
								this_.code_text = '获取验证码';
								clearInterval(timeDel);
							}
						}
					}, 1000);
					
					//发送邮件，并且倒计时
					this.$axios.post(this_.basicUrl + "user/sendEmail",
						this.$qs.stringify({
							email:this_.uemail
						})
					).then(function(response){
						let data = response.data;
						if(data.error_no > 0){ //说明邮箱发送失败！
							toastr.error("验证码发送失败！请稍候再试");
						}
					});
				}
			},
			//验证码的对错
			blur_input_code:function(){
				if(this.code == ""){
					this.code_info = "验证码不能为空";
					this.code_info_flag = true;
					changeBorder("code_id", "#c21d00");
				}
			},
			//提交按钮的点击
			sumbit_click:function(){
				this.blur_input_uname();
				this.blur_input_upassword();
				this.blur_input_upassword2();
				this.blur_input_uemail();
				//判断校验有没有通过，没有通过则要提示
				if(this.uname_info_flag || this.upassword_info_flag || this.upassword2_info_flag  || this.uemail_info_flag){
					toastr.error("请将信息正确的填写完整");
				}else{
					//发送请求去后台登录
					let this_ = this;
					this.$axios.post(this.basicUrl + 'user/register', 
						this.$qs.stringify({
						uname:this_.uname,
						upassword:this_.upassword,
						uemail:this_.uemail,
						code:this_.code
						})
					).then(function(response){
						let data = response.data;
						if(data.error_no == 5){
							this_.code_info = "验证码错误";
							this_.code_info_flag = true;
							changeBorder("code_id", "#c21d00");
						}else if(data.error == 4){
							toastr.error("注册失败！请稍候再试~");
						}else{
							// toastr.success("注册成功！");
							location.href="../login/login.html";
						}
					});
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "./stylus/icon.stylus"
	#register
		#register_div
			margin:0px auto;
			padding:0px;
			margin-top:100px;
			color: #2c3e50;
			border:1px solid #ccc;
			border-radius :15px;
			width:400px;
			height:450px;
			box-shadow:0 0 15px #ccc;
			.register_div_p
				color:rgb(0, 165, 248);
				font-size:22px;
				margin-left:45%;
				margin-top:20px;
			.div_
				width:100%;
				height:30px;
				margin-top:30px;
				.i_left
					margin-left:50px;
					font-size :22px;
					margin-top:2px;
					float:left;
				.code_span
					font-size:16px;
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
				.code_input
					width:49%;
				.email_send
					border:1px solid rgb(0, 165, 248);
					font-size:12px;
					border-radius :8px;
					background-color :white;
					width:80px;
					display :block;
					height:30px;
					text-align :center;
					line-height :30px;
					float:left;
					cursor :pointer;
					border-top-left-radius :0px;
					border-bottom-left-radius :0px;
					&:hover
						color:white;
						background-color :rgb(0, 165, 248);
				.email_class
					width:40%;
					float:left;
					border-top-right-radius :0px;
					border-bottom-right-radius :0px;
				.sumbit_
					border:1px solid rgb(0, 165, 248);
					font-size:12px;
					border-radius :8px;
					background-color :white;
					transition: all 0.5s;
					width:80%;
					display :block;
					height:30px;
					text-align :center;
					line-height :30px;
					float:left;
					cursor :pointer;
					margin-left:10%;
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
