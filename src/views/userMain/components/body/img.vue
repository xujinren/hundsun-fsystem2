<template>
	<!-- 文件夹的组件 -->
	<div id="img" v-on:contextmenu="comRight_($event)" v-on:click="read_img()" :title="'名称:' + parseName(item.f_path) +'    '
		+ '创建日期:' + item.f_date + '  文件路径：' + item.f_path
	">
		<!-- <i class="icon-download  class_i"></i> -->
		<viewer :images="paths" >
			<img class="img_img" v-for="(item2,index) in paths" :src=" lookUrl + item2" :key="index">
		</viewer>
		<!-- <img  class="img_img"  :src="'http://www.xjren.club/fsystem' + item.f_path"/> -->
		<br/>
		<span class="span_name" v-html="item.f_name"></span>
	</div>
</template>


<script>
	import  {comRight} from  './js/comRight.js'
	import global from './js/staticValue.js'
	export default{
		created:function(){
			this.paths.push(this.item.f_path);
		},
		props:["item"],
		data(){
			return{
				absolutePath:'',
				paths:[],
				// lookUrl:'http://10.26.116.3:8082/fsystem/',
				lookUrl:global.lookUrl,
			}
		},
		methods:{
			parseName:function(str){
				return str.substr(str.lastIndexOf("/") + 1, str.length);
			},
			comRight_:function($event){
				comRight($event,  this, 'menu_right','img');
			},
			read_img:function(){
				let ev1 = event.currentTarget; //在JS中，event.currentTarget获取到的是click事件绑定的DOM对象，
				let ev2 = event.target;    //event.target获取到的为当前所点击的DOM对象。
				
				if(ev1 != ev2){ //阻止事件冒泡
					return ;
				}
				let this_ = this;
				this_.$emit("imgSome", this_.item.f_path);
				this_.absolutePath =this_.item.f_path;
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
			&:hover
				text-overflow:none;
				white-space:none;
		.class_i
			position :relative;
			top:0px;
			right:0px;
			
</style>
