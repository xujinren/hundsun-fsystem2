<template>
	<div id="userMain">
		<header_ :uname="uname" class="header"></header_>
		<!-- <left class="left" v-bind:files="files" v-if="files != ''"></left> -->
		<context class="context" :items="files" v-if="files != '1'"></context>
		<div class="foot">
		</div>
	</div>
</template>
<script>
	import toastr from 'toastr'
	import './css/toastr_config.css'
	import header from "./components/header/header.vue"
	// import left from "./components/left/left.vue"
	import context from "./components/body/body.vue"
	
	export default{
		components:{
			header_:header,
			// left:left,
			context:context,
		},
		data(){
			return{
				basicUrl:"/fsystem2/",
				uname:'',
				files:'1'
			}
		},
		created:function(){
			let this_ = this;
			this.$axios.post(this.basicUrl + "file/getRoot", 
				this_.$qs.stringify({
					token:this_.$cookie.get("token")
				})).then(function(response){
					let data = response.data;
					this_.$nextTick(()=>{
						this_.files = data.data;
					})
				})
		},
}
	
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "./stylus/icon.stylus"
	#userMain
		.foot
			width:100%;
			height:200px;
	// background-color :rgb(241, 241, 241);
		.header
			position :fixed;
			top:0px;
		.left
			margin-left:50px;
			margin-top:150px;
			width:15%;
			height:auto;
			float:left;
		.context
			width:80%;
			height:auto;
			margin-top:170px;
			padding:0px;
			margin:0px auto;
			margin-top:150px;
			
</style>
