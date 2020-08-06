<template>
	<!-- 文件夹的组件 -->
	<div id="dir" v-on:contextmenu="comRight_($event)" v-on:click="enterFile(item.f_path)" :title="'名称:' + item.f_name + '    '
		+ '创建日期:' + item.f_date + '  文件路径：' + item.f_path
		">
		<div class="menu_rightClick" id="menu_right" v-if="menu_right_show">
			<p  v-on:click.stop="deleteN">删除</p>
		</div>
		<img  class="dir_img"  src="../../../../assets/dir.png"/>
		<br/>
		<span class="span_name" v-html="item.f_name"></span>
	</div>
</template>
<script>
	import  {comRight} from  './js/comRight.js'
	import toastr from 'toastr'
	import '../../css/toastr_config.css'
	export default{
		props:["item"],
		data(){
			return{
				basicUrl:"/fsystem2/",
				absolutePath:'',
				menu_right_show:false,
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
			enterFile:function(path){
				let this_ = this;
				this_.$emit("dirShow_loading");
				
				this.$axios.post(this_.basicUrl + "file/getFiles",this_.$qs.stringify({
					token:this_.$cookie.get("token"),
					f_path:path
				})).then(function(response){
					let data = response.data;
					if(data.error_no > 0){
						toastr.error(data.error_info);
						return ;
					}else{
						//向父组件传值
						let temp = {};
						temp.data = data.data;
						temp.preData = {
							f_path:path
						}
						this_.$emit("dirSome", temp);
						// this_.files = data.data;
					}
				});
			},
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	#dir
		cursor :pointer;
		width:120px;
		height:120px;
		&:hover
			color:blue;
			background: #E6F0FF;
			border-radius: 4px;
		.dir_img
			width:53.3%;
			height:46.6%;
			margin-top:22%;
			margin-right:23.35%;
			margin-left:23.35%;
		.span_name
			cursor :pointer;
			display :block;
			width:100%;
			font-size:14px;
			margin-top:10px;;
			text-align:center;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
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
