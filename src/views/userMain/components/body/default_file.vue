<template>
	<!-- 文件夹的组件 -->
	<div id="default_file" v-on:contextmenu="comRight_($event)"   v-on:click="read_default_file"  :title="'名称:'+ parseName(item.f_path) + '    '
		+ '创建日期:' + item.f_date + '  文件路径：' + item.f_path
	"><!-- -->
		<img  class="default_file_img"  src="../../../../assets/default_file.png"/>
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
				absolutePath:'',
			}
		},
		methods:{
			parseName:function(str){
				return str.substr(str.lastIndexOf("/") + 1, str.length);
			},
			
			comRight_:function($event){
				comRight($event,  this, 'menu_right','default_file');
			},
			read_default_file:function(){
				toastr.info("抱歉，暂不支持该文件类型，请期待下一个版本");
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	#default_file
		cursor :pointer;
		width:120px;
		height:120px;
		&:hover
			background: #E6F0FF;
			border-radius: 4px;
		.default_file_img
			width:40%;
			height:46.6%;
			margin-top:22%;
			margin-right:30%;
			margin-left:30%;
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
</style>
