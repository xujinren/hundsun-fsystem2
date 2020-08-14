<template>
	<!-- 文件夹的组件 -->
	<div id="pdf" v-on:contextmenu="comRight_($event)"  v-on:click="read_pdf"  :title="'名称:'+ parseName(item.f_path) + '    '
		+ '创建日期:' + item.f_date + '  文件路径：' + item.f_path
	"><!-- -->
		<img  class="pdf_img"  src="../../../../assets/pdf.png"/>
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
				download:"",
			}
		},
		
		methods:{
			
			parseName:function(str){
				return str.substr(str.lastIndexOf("/") + 1, str.length);
			},
			
			
			comRight_:function($event){
				comRight($event,  this, 'menu_right', "pdf");
			},
			read_pdf:function(){
				let this_ = this;
				this_.$emit("pdfSome",this_.item.f_path);
				this_.absolutePath = this_.item.f_path;
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	#pdf
		cursor :pointer;
		width:120px;
		height:120px;
		&:hover
			background: #E6F0FF;
			border-radius: 4px;
			
		.pdf_img
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
</style>
