<template>
	<div id="context">
		<div class="upload_class" v-on:click="fileUpload">
			<i class="icon-localUpload  i_class"></i>
			<span>上传</span>
		</div>
		<input id="file" multiple hidden="true" type="file" v-on:change="fileUpload_inputChange($event)"/>
		<span class="create_dir" v-on:click="create_dir">新建文件夹</span>
		<input class="search_input" v-model="searchText" placeholder="全局搜索您的文件" v-on:keydown="keySearch($event)"/>
		<i class="icon-search search_input_icon" v-on:click="search"></i>
		<br/>
		<br/>
		<div class="menu_head">
			<el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb_x">
			  <el-breadcrumb-item :to="{ path: '/' }"><span  v-on:click="getAllRoot">全部文件</span></el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/' }" v-for="item, index_bread in breadData"><span  v-on:click="getFilesByPath(index_bread)">{{item}}</span></el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- <img  class="noneFile_img" src="../../../../assets/noneFile.png" v-if="noneFile_show"/> -->
		<ul class="ul_class">
			<li class="file_class" v-for="item1, index in files" >
					<dir_x  :item="item1" v-if="item1.f_type == 'dir'"  v-on:dirSome = "dirSome" v-on:deleteOk="deleteOk" v-on:Show_loading="Show_loading" v-on:sendData="reciveData"></dir_x>
					<pdf_x  :item="item1"  v-else-if="item1.f_type == 'pdf'" v-on:pdfSome="pdfSome" v-on:deleteOk="deleteOk" v-on:Show_loading="Show_loading" v-on:hidden_loading="hidden_loading" v-on:sendData="reciveData"></pdf_x>
					<txt_x  :item="item1"  v-else-if="item1.f_type == 'txt'" v-on:txtSome="txtSome" v-on:deleteOk="deleteOk" v-on:sendData="reciveData"></txt_x>
					<img_x  :item="item1"  v-else-if="item1.f_type == 'gif' || item1.f_type == 'jpeg' || item1.f_type == 'jpg' || item1.f_type == 'png' || item1.f_type == 'icon'" v-on:sendData="reciveData" v-on:imgSome="imgSome" v-on:deleteOk="deleteOk"></img_x>
					<office_x  :item="item1"  v-else-if="item1.f_type == 'ppt' ||item1.f_type == 'pptx'||item1.f_type == 'doc' ||item1.f_type == 'docx'  ||item1.f_type == 'xls'||item1.f_type == 'xlsx'  ||item1.f_type == 'word'" v-on:officeSome="officeSome" v-on:deleteOk="deleteOk" v-on:sendData="reciveData"></office_x>
					<default_file :item="item1" v-else v-on:deleteOk="deleteOk" v-on:sendData="reciveData"></default_file>
			</li>
		</ul>
		<iframeShow :path="path_" v-if="path_ != ''" v-on:filePreviewCancel="filePreviewCancel"></iframeShow>
		<div class="menu_rightClick" id="menu_right" v-show="menu_right_show">
			<p  v-on:click.stop="deleteN">删除</p>
			<p  v-on:click.stop="download_" v-show="menu_right_show_delete">下载</p>
		</div>
		<div id="tim"  v-show="show_loading">
			<img class="img_c" src="../../../../assets/loading.gif"/>
		</div>
	</div>
</template>
<script>
	import  {delete_, down} from  './js/comRight.js'
	import toastr from 'toastr'
	import '../../css/toastr_config.css'
	import dir_x from "./dir.vue" 
	// import bus from  './eventBus.js'
	import pdf_x from './pdf.vue'
	// import pdf_show from './pdf_show.vue'
	import iframeShow from "./iframeShow.vue"
	import default_file from './default_file.vue'
	import img_x from './img.vue'
	import txt_x from './txt.vue'
	import office_x from './office.vue'
	import   './js/comRight.js'
	
	import global from './js/staticValue.js'
	export default{
		props:['items'], 
		components:{
			dir_x:dir_x, 
			pdf_x:pdf_x,
			// pdf_show:pdf_show, 
			iframeShow:iframeShow,
			default_file:default_file,
			img_x:img_x,
			txt_x:txt_x,
			office_x:office_x,
		},
		data(){
			return{
				files:'',
				basicUrl:global.basicUrl,
				absolutePath:'',
				p_path:'',
				w_path:'',
				t_path:'',
				i_path:'',
				x_path:'',
				office_path:'',
				txt_path:'',
				path_:'',
				breadData:[],
				dialogImageUrl: '',
				dialogVisible: false,
				fileList:[],
				file:'',
				show_loading:false,
				menu_right_show:false,
				menu_right_show_delete:true,
				searchText:'',
				// lookUrl:'http://10.26.116.3:8082/fsystem/',
				lookUrl:global.lookUrl,
				// lookOffice:'http://192.168.43.112:8082/file_temp/',
				// lookOffice:'http://10.26.116.3:8082/file_temp/',
				// lookOffice:'http://192.168.43.112:8082/file_temp/',
				// officeUrl:'https://view.officeapps.live.com/op/view.aspx?src=',
				// officeUrl:'http://127.0.0.1:8012/onlinePreview?url=',
				zip_path:'',
				noneFile_show:false,
				ex_path:'', //右键点击组件时传过来保存
				// img_src:'',
				// returnPath:[]
			}
		},
		created:function(){
			let this_ = this;
			
			document.onclick = function(){
				this_.menu_right_show = false;
			}
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
			deleteN:function(){
				this.menu_right_show = false;
				delete_(this, toastr);
			},
			download_:function(){
				this.menu_right_show = false;
				this.show_loading = true;
				down(this, toastr);
			},
			reciveData:function(data){
				this.ex_path = data.f_path;
				this.menu_right_show = true;
				if(data.f_type == 'dir'){
					this.menu_right_show_delete = false;
				}else{
					this.menu_right_show_delete = true;
				}
				this.$nextTick(function(){
				let menu_ = document.getElementById("menu_right");
				menu_.style.left = data.x;	
				menu_.style.top = data.y;
				},20);
			},
			hidden_loading:function(){
				this.show_loading = false;
			},
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
			fileUpload_inputChange:function(event_){
				let fileLists = document.getElementById("file").files;
				if(fileLists.length <= 0){
					toastr.error("请至少选择一个文件！");
					return ;
				}
				
				//上传中....
				//发送请求去存文件
				let this_ = this;
				let param = new FormData();
				let M_B = 1024 * 1024;
				let temp_mb = 0;
				for(let i = 0, len_ = fileLists.length; i < len_; i ++){
					console.info(fileLists[i].size * 1.0 / M_B);
					temp_mb = temp_mb +  fileLists[i].size * 1.0 / M_B ;
					param.append("fileLists", fileLists[i]);
				}
				if(temp_mb > 200){
					document.getElementById("file").value= '';
					toastr.error("文件一次性最多上传200M, 此次上传大小一共" +temp_mb.toFixed(2)  + "M, 上传失败！");
					return ;
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
					
					document.getElementById("file").value= '';
					let data = res.data;
					if(data.error_no > 0){
						this_.show_loading = false;
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
				document.getElementById("file").click();
			},
			
			pushHistory:function(url){
				window.history.pushState(null,null,url);
			},
			
			txtSome:function(data){
				this.txt_path = data;
				let pa  =(this.lookUrl +  this.txt_path);
				this.path_ = pa;
			},
			
			imgSome:function(data){
				this.i_path = data.replace(" ","");
				// this.path_ ="http://www.xjren.club/fsystem/" +  this.i_path;
				// this.img_src=["http://www.xjren.club/fsystem/" +  this.i_path];
			},
			
			pdfSome:function(data){
				this.p_path = data;
				this.path_ =(this.lookUrl +  this.p_path);
			},
			
			officeSome:function(data){
				this.office_path = data;
				let this_ = this;
				this_.show_loading = true;
				// this.path_ =this.officeUrl + encodeURIComponent( this.lookUrl +  this.office_path);
				this.$axios.post(this.basicUrl + "file/getPath",this_.$qs.stringify({
					token:this_.$cookie.get("token"),
					filePath:this_.office_path
				})).then(function(response){
					this_.show_loading = false;
					let data = response.data;
					if(data.error_no > 0){
						toastr.error(data.error_info);
					}else{
						let temp  = data.data;
						
						this_.path_ = temp;
						
					}
				});
			// 	var originUrl = 'http://localhost:8082/fsystem2/getPath?token='+this_.$cookie.get("token")+'&filePath=' + this.office_path; //要预览文件的访问地址
			// 	var previewUrl = originUrl + '&fullfilename=' + this.office_path.substr(this.office_path.lastIndexOf("/") + 1) ;
			
			// 	this.path_ = 'http://127.0.0.1:8012/onlinePreview?url='+ encodeURIComponent(previewUrl);
			},
			Show_loading:function(){
				this.show_loading = true;
			},
			dirSome:function(data){
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
				this.show_loading = false;
			},
			filePreviewCancel:function(data){
				this.p_path = data;
				this.zip_path = data;
				this.w_path = data;
				this.t_path = data;
				this.path_ = data;
				// this.img_src = data;
			},
			getAllRoot:function(){
				let this_ = this;
				this.show_loading = true;
				this.menu_right_show = false;
				this.$axios.post(this.basicUrl + "file/getRoot", 
					this_.$qs.stringify({
						token:this_.$cookie.get("token")
					})).then(function(response){
						this_.show_loading = false;
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
				//根据具体的路径去查询数据库中的数据
				this_.getFileInfoByPath(path);
				
			},
			keySearch:function(e){
				if(e.keyCode == 13){
					this.search();
				}
			},	
			//搜索的方法
			search:function(){
				if(this.searchText == ''){
					toastr.error("搜索的内容不能为空！");
					return ;
				}
				let this_ = this;
				this_.show_loading = true;
				this.$axios.post(this.basicUrl + "file/search", this.$qs.stringify({
					token:this_.$cookie.get("token"),
					keyWord:this_.searchText
				})).then(function(response){
					this_.show_loading = false;
					if(response.data.error_no > 0){
						toastr.error(response.data.error_info);
					}else{
						let data = response.data;
						let files_temp  = data.data;
						if(files_temp == null || files_temp.length <= 0){
							toastr.info("抱歉，没有与关键词相匹配的相关文件信息");
							return ;
						}
						this_.breadData = [];
						this_.files = files_temp;
					}
				});
			},
			
			getFileInfoByPath:function(path){
				let this_ = this;
				this.show_loading = true;
				this.menu_right_show = false;
				this.$axios.post(this.basicUrl + "file/getFileInfoByPath",this.$qs.stringify({
					token:this_.$cookie.get("token"),
					path:path
				})).then(function(response){
					this_.show_loading = false;
					let data = response.data;
					if(data.error_no > 0){
						toastr.error(data.error_info);
					}else{
						this_.files = data.data;
						if(this_.files == null || this_.files.length <= 0){
							this_.noneFile_show = true;
						} 
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
	@import "./stylus/icon.stylus"
		#context
			height:auto; 
			font-family: PingFangSC-Regular;
			letter-spacing: 0;
			.noneFile_img
				position:relative;
				top:100px;
				left:400px;
				
			.ul_class
				margin-top:30px;
			.upload_class
				display:block;
				float:left; 
				width:100px; 
				height:38px;
				margin-left:29px;
				border-radius:4px;
				background-color:#0470FF;
				color:white; 
				line-height:38px;
				cursor:pointer;
				text-align:center;
				font-size: 14px; 
				color: #FFFFFF;
				letter-spacing: 0;
				.i_class
					font-size:18px;
			.create_dir
				display:block;
				float:left;
				width:100px;
				height:38px;
				background-color:white;
				border-radius:4px;
				color:#0470FF;
				text-align:center;
				line-height:38px;
				cursor:pointer;
				font-size:14px;
				margin-left:2.3%;
				border:1px solid #A1A8B3;
			.search_input
				width:210px;
				height:38px;
				float:right;
				border-radius:19px;
				padding-right:40px;
				border:0px;
				outline:medium;
				font-size:14px;
				padding-left:15px;
				background-color:#F0F1F2;
			.search_input_icon
				float: right;
				position: relative;
				font-size: 24px;
				right: -200px;
				top: 8px; 
				cursor:pointer;
				&:hover
					color:rgb(4,112,255);
			.menu_head
				height:30px;
				width:100%;
			.menu_rightClick
				width:100px;
				height:auto;
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
			#tim
				position:fixed;
				top:0;
				left:0;
				width:100%;
				height:100%;
				opacity:0.3;
				z-index:9999999;
				background-color:black;
				.img_c
					width:100%;
					height:100%;
			.file_class
				float:left;
				list-style:none;
				width:120px;
				height:120px;
			.show_context
				position:absolute;
				top:0;
				left:0;
				width:100%;
				height:100%;
				background-color:rgb(0,0,0,0.4);
				position: absolute;
				left:0px;
			.breadcrumb_x
				border-bottom: 1px solid #e7e7e7;
				line-height:38px;
				margin-left:2.3%;
				.span_name
					cursor :pointer;
					display :block;
					width:100%;
					text-align:center;
					text-overflow: ellipsis;
						
					
</style>
