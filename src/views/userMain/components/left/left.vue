<template>
	<div id="left">
		<el-tabs :tab-position="tabPosition" style="height: 400px;" v-on:tab-click="choose_tab">
		    <el-tab-pane label="我的文件" name="1">我的文件</el-tab-pane>
		    <el-tab-pane label="pdf文件" name = "2">pdf文件</el-tab-pane>
		    <el-tab-pane label="ppt文件" name="3">ppt文件</el-tab-pane>
		    <el-tab-pane label="word文件" name="4">word文件</el-tab-pane>
			<el-tab-pane label="我的收藏" name="5">我的收藏</el-tab-pane>
			<el-tab-pane label="好友分享" name="6">好友分享</el-tab-pane>
			<el-tab-pane label="垃圾箱" name="7">垃圾箱</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import bus from  '../body/eventBus.js'
	export default {
		props:['files'],
	    data() {
	      return {
			 tabPosition: 'left',
	      };
	    },
	    methods: {
	      handleOpen(key, keyPath) {
	      },
	      handleClose(key, keyPath) {
	      },
		  changeAllData(){
			  bus.$emit('myfun',this.files)
		  },
		  choose_tab:function(tab, event){
			 if(tab.name == '1'){
			    this.changeAllData();
			}
		  }
	    },
		created:function(){
			this.changeAllData();
		}
	  }
</script>

<style lang="stylus rel="stylesheet/stylus">
	#left	
		margin-top:300px;
		.el-menu-vertical-demo:not(.el-menu--collapse)
			width: 200px;
			min-height: 400px;
</style>
