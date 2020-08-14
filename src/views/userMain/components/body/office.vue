<template>
	<!-- 文件夹的组件 -->
	<div id="office" v-on:contextmenu="comRight_($event)" v-on:click.stop.prevent="read_office($event)" :title="'名称:' + parseName(item.f_path) + '    '
		+ '创建日期:' + item.f_date + '  文件路径：' + item.f_path
	">
		<!-- <i class="icon-download class_i"></i> --> 
		<img  class="office_img"  v-if="item.f_type == 'word' || item.f_type == 'doc' || item.f_type == 'docx'" src="../../../../assets/word.png"/>
		<img  class="office_img"  v-else-if="item.f_type == 'ppt' || item.f_type == 'pptx'" src="../../../../assets/ppt.png"/>
		<img  class="office_img"  v-else-if="item.f_type == 'xls' || item.f_type == 'xlsx'" src="../../../../assets/xls.png"/>
		<br/>
		<span class="span_name" v-html="item.f_name"></span>
		
	</div>
</template>
<script>
	import  {comRight} from  './js/comRight.js'
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
				comRight($event,  this, 'menu_right', 'office');
			},
			
			read_office:function(event){
				let this_ = this;
				this_.$emit("officeSome", this_.item.f_path);
				this_.absolutePath =this_.item.f_path;
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	#office
		cursor :pointer;
		width:120px;
		height:120px;
		&:hover
			background: #E6F0FF;
			border-radius: 4px;
		.office_img
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
			&:hover
				text-overflow:none;
				white-space:none;
		.class_i
			position :relative;
			top:0px;
			right:0px;
</style>
