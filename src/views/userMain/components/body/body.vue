<template>
	<div id="context">
		<span class="create_dir" v-on:click="create_dir">新建文件夹</span>
		<div class="menu_head">
			<el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb_x">
			  <el-breadcrumb-item :to="{ path: '/' }"><span  v-on:click="getAllRoot">全部文件</span></el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/' }" v-for="item, index_bread in breadData"><span  v-on:click="getFilesByPath(index_bread)">{{item}}</span></el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="file_class add_files_class_div" v-on:click="fileUpload">
			<div class="add_files_class_">
				<div class="v-line"></div>
				<div class="h-line"></div>
			</div>
			<input id="file" multiple hidden="true" type="file" v-on:change="fileUpload_inputChange"/>
		</div>
		<!-- <div class="file_class">
			<el-upload
			  action=""
			  list-type="picture-card"
			  :auto-upload="false"
			  :limit="10"
			  :on-preview="handlePictureCardPreview"
			  :on-remove="handleRemove"
			  :on-change="fileChange"
			  :on-success="file_success"
			  :on-progress="propress"
			  :multiple="true"
			  :on-exceed="exceed"
			  accept="*"
			  name="file_simgle" 
			  :file-list="fileList"
			  >
			  <i class="el-icon-plus"></i>
			</el-upload>
		</div> -->
		<ul>
			<li class="file_class" v-for="item1, index in files" >
					<dir_x  :item="item1" v-if="item1.f_type == 'dir'"  v-on:dirSome = "dirSome" v-on:deleteOk="deleteOk"></dir_x>
					<pdf_x  :item="item1"  v-else-if="item1.f_type == 'pdf'" v-on:pdfSome="pdfSome" v-on:deleteOk="deleteOk"></pdf_x>
					<word_x  :item="item1"  v-else-if="item1.f_type == 'word'" v-on:wordSome="wordSome" v-on:deleteOk="deleteOk"></word_x>
					<ppt_x  :item="item1"  v-else-if="item1.f_type == 'ppt'" v-on:pptSome="pptSome" v-on:deleteOk="deleteOk"></ppt_x>
					<xls_x  :item="item1"  v-else-if="item1.f_type == 'xls'" v-on:xlsSome="xlsSome" v-on:deleteOk="deleteOk"></xls_x>
					<xls_x  :item="item1"  v-else-if="item1.f_type == 'xlsx'" v-on:xlsSome="xlsSome" v-on:deleteOk="deleteOk"></xls_x>
					<img_x  :item="item1"  v-else-if="item1.f_type == 'gif'" v-on:imgSome="imgSome" v-on:deleteOk="deleteOk"></img_x>
					<img_x  :item="item1"  v-else-if="item1.f_type == 'jpeg'" v-on:imgSome="imgSome" v-on:deleteOk="deleteOk"></img_x>
					<img_x  :item="item1"  v-else-if="item1.f_type == 'jpg'" v-on:imgSome="imgSome" v-on:deleteOk="deleteOk"></img_x>
					<img_x  :item="item1"  v-else-if="item1.f_type == 'png'" v-on:imgSome="imgSome" v-on:deleteOk="deleteOk"></img_x>
					<default_file :item="item1" v-else v-on:deleteOk="deleteOk"></default_file>
			</li>
		</ul>
		<!-- <pdf_show :p_path="p_path" v-if="p_path != ''"></pdf_show> -->
		<!-- <div class="show_context" v-if="p_path != ''">
			<iframe :src="'http://www.xjren.club/fsystem/' + p_path" frameborder="0" style="w_pathth: 100%; height: 100%" ></iframe>
		</div> -->
		<iframeShow :path="path_" v-if="path_ != ''" v-on:filePreviewCancel="filePreviewCancel"></iframeShow>
		<!-- <iframeShowPdf id="w_path_" :path="'https://view.officeapps.live.com/op/view.aspx?src=http://www.xjren.club/fsystem/' + w_path" v-if="w_path != ''" v-on:filePreviewCancel="filePreviewCancel"  frameborder="1"  scrolling="no"></iframeShowPdf> -->
		<!-- <iframeShowPdf :path= "'http://www.xjren.club/fsystem/' + t_path" v-if="t_path != ''" v-on:filePreviewCancel="filePreviewCancel"></iframeShowPdf> -->
		<div id="tim">
			<img  class="img_c" src="../../../../assets/timg.gif" v-if="show_loading"/>
		</div>
		
		<div class="menu_rightClick" id="menu_right" v-if="menu_right_show">
			<p>重命名</p>
			<p>删除</p>
			<p>下载</p>
			<p>移动到</p>
		</div>
		
	</div>
</template>
<script>
	import toastr from 'toastr'
	import '../../css/toastr_config.css'
	import dir_x from "./dir.vue" 
	// import bus from  './eventBus.js'
	import pdf_x from './pdf.vue'
	// import pdf_show from './pdf_show.vue'
	import word_x from './word.vue'
	import iframeShow from "./iframeShow.vue"
	import ppt_x from './ppt.vue'
	import default_file from './default_file.vue'
	import img_x from './img.vue'
	import xls_x from './xls.vue'
	import   './js/comRight.js'
	export default{
		props:['items'], 
		components:{
			dir_x:dir_x, 
			pdf_x:pdf_x,
			// pdf_show:pdf_show, 
			iframeShow:iframeShow,
			word_x:word_x,
			ppt_x:ppt_x,
			default_file:default_file,
			img_x:img_x,
			xls_x:xls_x,
		},
		data(){
			return{
				files:'',
				basicUrl:"/fsystem2/",
				absolutePath:'',
				p_path:'',
				w_path:'',
				t_path:'',
				i_path:'',
				x_path:'',
				path_:'',
				breadData:[],
				dialogImageUrl: '',
				dialogVisible: false,
				fileList:[],
				file:'',
				show_loading:false,
				menu_right_show:false,
				// img_src:'',
				// returnPath:[]
			}
		},
		created:function(){
			let this_ = this;
			
			
			//鼠标右击事件
			document.oncontextmenu = function(ev){
				//兼容写法
				var ev = ev || event;//或（||）书写顺序有讲究，不能随意换
				ev.preventDefault();
			}
			
			this.files = this.items;
			this.pushHistory("#");
			window.addEventListener("popstate", function(e){ 
				// alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能 
				if(this_.breadData.length <= 0){
					this_.pushHistory("#");
				}else{
					this_.pushHistory("#");
					this_.breadData.pop();
					let url = "/" + this_.breadData.join("/");
					this_.getFileInfoByPath(url);
					// this_.pushHistory("#");
				}
			}, false);
		},
		methods:{
			//删除成功后的方法回调
			deleteOk:function(fatherPath){
				let this_ = this;
				this_.getFileInfoByPath(fatherPath);
			},
			//创建新的文件夹
			create_dir:function(){
				let path = this.absolutePath ;
				 this.$prompt('请输入文件名', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
						   // beforeClose:(action, instance, done) => {
							  //  if (action === 'confirm') {
								 //    instance.confirmButtonLoading = true;
								 //    instance.confirmButtonText = '执行中...';
							  //  }
						   // }
				        }).then(({ value }) => {
							//发送请求去后台创建文件夹
							let this_ = this;
							this.$axios.post(this.basicUrl + "file/createDir",this_.$qs.stringify({
								token:this_.$cookie.get("token"),
								fatherPath:path,
								dirName:value
							})).then(function(response){
								let data = response.data;
								if(data.error_no  > 0){
									toastr.error(data.error_info);
								}else{
									toastr.success("创建成功！");
									this_.getFileInfoByPath(path);
								}
							});
				        }).catch(() => {
							// toastr.error("创建失败！");
				        });
				
			},
			//文件选择事件打开
			fileUpload_inputChange:function(){
				let fileLists = document.getElementById("file").files;
				if(fileLists.length <= 0){
					toastr.error("请至少选择一个文件！");
					return ;
				}
				//上传中....
				
				//发送请求去存文件
				let this_ = this;
				let param = new FormData();
				for(let i = 0, len_ = fileLists.length; i < len_; i ++){
					param.append("fileLists", fileLists[i]);
				}
				this_.show_loading = true;
				param.append("path", this.absolutePath == ''? '/' : this.absolutePath);
				param.append("token", this.$cookie.get("token"));
				this.$axios({
					url:this_.basicUrl + 'file/Upload',
					method:'post',
					data:param,
					headers:{'Content-Type': 'multipart/form-data'}
				}).then(function(res){
					let data = res.data;
					if(data.error_no > 0){
						toastr.error(data.error_info);
					}else{
						this_.getFileInfoByPath(this_.absolutePath == ''? '/' : this_.absolutePath);
						toastr.success("上传成功！");
						this_.show_loading = false;
					}
				});
			},
				
			//文件上传
			fileUpload:function(){
				console.info(this.absolutePath);
				document.getElementById("file").click();
			},
			pushHistory:function(url){
				window.history.pushState(null,null,url);
			},
			imgSome:function(data){
				this.i_path = data;
				// this.path_ ="http://www.xjren.club/fsystem/" +  this.i_path;
				// this.img_src=["http://www.xjren.club/fsystem/" +  this.i_path];
				console.info(data);
			},
			pdfSome:function(data){
				this.p_path = data;
				this.path_ ="http://www.xjren.club/fsystem/" +  this.p_path;
				console.info(data);
			},
			wordSome:function(data){
				// document.getElementById("w_path_").designMode="on";
				this.w_path = data;
				this.path_ = 'https://view.officeapps.live.com/op/view.aspx?src=http://www.xjren.club/fsystem/' + this.w_path;
				console.info(data);
				
			},
			pptSome:function(data){
				this.t_path = data;
				this.path_ ='https://view.officeapps.live.com/op/view.aspx?src=http://www.xjren.club/fsystem/' +  this.t_path;
				console.info(data);
			},
			xlsSome:function(data){
				this.x_path = data;
				this.path_ ='https://view.officeapps.live.com/op/view.aspx?src=http://www.xjren.club/fsystem/' +  this.x_path;
				console.info(data);
			},
			dirSome:function(data){
				console.info(data);
				let temp = data;
				this.files = temp.data;
				//要将文件夹的相对路径传过来
				let pre_temp = temp.preData;
				let this_ = this;
				// 发送请求查询绝对路径
				this_.absolutePath = pre_temp.f_path;
				this_.breadData = [];
				let arrs = this_.absolutePath.split("/");
				for(let i = 1, len = arrs.length;i< len; i ++){
					this_.breadData.push(arrs[i]);
				}
			},
			filePreviewCancel:function(data){
				this.p_path = data;
				this.w_path = data;
				this.t_path = data;
				this.path_ = data;
				// this.img_src = data;
			},
			getAllRoot:function(){
				let this_ = this;
				this.$axios.post(this.basicUrl + "file/getRoot", 
					this_.$qs.stringify({
						token:this_.$cookie.get("token")
					})).then(function(response){
						let data = response.data;
						this_.$nextTick(()=>{
							this_.files = data.data;
							this_.breadData = [];
							this_.absolutePath = '';
						})
					})
			},
			getFilesByPath:function(index_bread){
				let this_ = this;
				let path = "";
				for(let i = 0; i <= index_bread;i ++){
					path = path  + "/" + this_.breadData[i];
				}
				console.info(path);
				//根据具体的路径去查询数据库中的数据
				this_.getFileInfoByPath(path);
				
			},
			
			getFileInfoByPath:function(path){
				let this_ = this;
				this.$axios.post(this.basicUrl + "file/getFileInfoByPath",this.$qs.stringify({
					token:this_.$cookie.get("token"),
					path:path
				})).then(function(response){
					let data = response.data;
					if(data.error_no > 0){
						toastr.error(data.error_info);
					}else{
						this_.files = data.data;
						//同时改变面包屑
						this_.breadData = [];
						this_.absolutePath = path;
						let arrs = path.split("/");
						for(let i = 1, len = arrs.length;i< len; i ++){
							this_.breadData.push(arrs[i]);
						}
					}
				});
			}
		}
	}
</script>
<style lang = "stylus" rel="stylesheet/stylus">
	@import "./stylus/stylus.styl"
		#context
			height:auto;
			.create_dir
				display:block;
				float:left;
				width:80px;
				height:30px;
				background-color:#51c1f5;
				color:white;
				text-align:center;
				line-height:30px;
				cursor:pointer;
				font-size:14px;
			.menu_head
				height:30px;
				width:90%;
			.tim
				position:absolute;
				top:0;
				left:0;
				width:10%;
				height:100%;
				opacity:0.5;
				z-index:999; 
				background-color:black;
				.img_c
					margin-top:-120px;
			.file_class
				float:left;
				list-style:none;
			.show_context
				w_pathth:1366px;
				height:768px;
				background-color:rgb(0,0,0,0.4);
				position: absolute;
				left:0px;
			.breadcrumb_x
				border-bottom: 1px solid #e7e7e7;
				padding-bottom:6px;
			
			.add_files_class_div
				width:100px;
				height:122px;
				margin-top:20px;
				cursor: pointer;
				&:hover
					cursor: pointer;
					color:blue;
				.add_files_class_
					width:90%;
					margin:15% 5%;
					height:58%;
					border:1px dashed #ccc;
					border-color:#ccc;
					&:hover
						border:1px dashed blue;
						border-color:blue;
					.v-line
						width:40px;
						height:1px;
						border:1px dashed;
						margin-top:38%;
						margin-left:28%;
					.h-line
						width:41px;
						height:1px;
						border:1px dashed ;
						margin-left:28%;
						transform:rotate(90deg);
						
				.span_name
					cursor :pointer;
					display :block;
					width:100%;
					text-align:center;
					text-overflow: ellipsis;
					
					
</style>
