<template>
	<!-- 文件夹的组件 -->
	<div id="dir" v-on:contextmenu="comRight_($event)" v-on:click="enterFile(item.f_path)" :title="'名称:' + parseName(item.f_path) + '    '
		+ '创建日期:' + item.f_date + '  文件路径：' + item.f_path
		">
		<img  class="dir_img"  src="../../../../assets/dir.png"/> 
		<br/>
		<span class="span_name" v-html="item.f_name"></span>
	</div>
</template>
<script>
	import  {comRight} from  './js/comRight.js'
	import global from './js/staticValue.js'
	import toastr from 'toastr'
	import '../../css/toastr_config.css'
	export default{
		props:["item"],
		data(){
			return{
				basicUrl:global.basicUrl,
				absolutePath:'',
				menu_right_show:false,
			}
		},
		methods:{
			parseName:function(str){
				return str.substr(str.lastIndexOf("/") + 1, str.length);
			},
			comRight_:function($event){
				comRight($event,  this, 'menu_right','dir');
			},
			enterFile:function(path){
				let this_ = this;
				this_.$emit("Show_loading");
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
			&:hover
				text-overflow:none;
				white-space:none;
</style>
