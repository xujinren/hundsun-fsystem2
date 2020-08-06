<template>
	<!-- 文件夹的组件 -->
	<div id="img" v-on:contextmenu="comRight_($event)" v-on:click="read_img()" :title="'名称:' + item.f_name + '    '
		+ '创建日期:' + item.f_date
	">
	<div class="menu_rightClick" id="menu_right" v-if="menu_right_show">
		<p  v-on:click.stop="deleteN">删除</p>
	</div>
		<!-- <i class="icon-download  class_i"></i> -->
		<viewer :images="paths" >
			<img class="img_img" v-for="(item2,index) in paths" :src=" lookUrl + item2" :key="index">
		</viewer>
		<!-- <img  class="img_img"  :src="'http://www.xjren.club/fsystem' + item.f_path"/> -->
		<br/>
		<span class="span_name">{{item.f_name}}</span>
	</div>
</template>

<script>
	import  {comRight} from  './js/comRight.js'
	import toastr from 'toastr'
	import '../../css/toastr_config.css'
	export default{
		created:function(){
			this.paths.push(this.item.f_path);
			console.info(this.item);
			console.info("paths :" + this.paths);
		},
		props:["item"],
		data(){
			return{
				basicUrl:"../fsystem2/",
				absolutePath:'',
				paths:[],
				menu_right_show:false,
				lookUrl:'http://localhost:8082/fsystem/',
			}
		},
		methods:{
			//删除
			deleteN:function(){
				this.menu_right_show = false;
				let path = this.item.f_path;
				let this_ = this;
				
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
							this.$axios.post(this_.basicUrl + "file/deleteFile",this.$qs.stringify({
								token:this_.$cookie.get("token"),
								filePath:path
							})).then(function(response){
								let data = response.data;
								if(data.error_no > 0){
									toastr.error(data.error_info);
								}else{
									toastr.success("删除成功！");
									//向父组件传值，请求父组件重刷一遍页面
									let fatherPath = path.substr(0, path.lastIndexOf("/"));
									this_.$emit("deleteOk", fatherPath == "" ? "/" : fatherPath);
								}
							});
				          // toastr.info("删除成功！"); 
				        }).catch(() => {
				          toastr.info("已取消删除");        
				        });
			},
			comRight_:function($event){
				comRight($event,  this, 'menu_right');
			},
			read_img:function(){
				// let this_ = this;
				// this_.$emit("imgSome", id);
				// 发送请求查询绝对路径
				let this_ = this;
				this_.$emit("imgSome", this_.item.f_path);
				this_.absolutePath =this_.item.f_path;
				// this.$axios.post(this_.basicUrl + "file/getAbsolutePathByFid",
				// 	this.$qs.stringify({
				// 		token:this_.$cookie.get("token"),
				// 		fid:id
				// 	})
				// ).then(function(response){
				// 	let data = response.data;
				// 	if(data.error_no > 0){
				// 		toastr.error(data.error_info);
				// 		return ;
				// 	}else{
				// 		this_.$emit("imgSome", data.data);
				// 		this_.absolutePath = data.data;
				// 		// window.open("http://www.xjren.club/fsystem" + this_.absolutePath,"_blank");
				// 	}
				// });
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	#img
		cursor :pointer;
		width:120px;
		height:120px;
		&:hover
			color:blue;
			background: #E6F0FF;
			border-radius: 4px;
		.img_img 
			width:48px;
			height:56px; 
			margin-top:22%; 
			margin-right:30%; 
			margin-left:30%; 
		.span_name 
			cursor :pointer;
			display :block;
			width:100%;
			font-size:14px;
			margin-top:-10px;;
			text-align:center;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		.class_i
			position :relative;
			top:0px;
			right:0px;
		.menu_rightClick
			width:100px;
			height:37px;
			box-shadow:0 0 15px #ccc;
			z-index:9999;
			position:absolute; 
			background-color:white;
			border:1px solid #999; 
			p
				font-size:12px; 
				line-height:37px;
				text-align:center; 
				width:100%;
				height:37px;
				margin-bottom:0px;
				border-bottom:1px solid #999;
				&:hover
					background-color:#c1c1c1;
			
</style>
