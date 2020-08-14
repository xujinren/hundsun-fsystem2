 function comRight(ev, this_, id, rootid){
	//兼容性写法示例：
	var ev = ev || event;//或（||）书写顺序有讲究，不能随意换
	//阻止默认行为
	ev.preventDefault();
	// this_.$forceUpdate();
	//右键时，传f_path到父级，传鼠标的坐标过去，
	let x = ev.clientX;
	let y = ev.clientY;
	
	let data = {};
	data.f_path = this_.item.f_path;
	data.x = x + 'px';
	data.y = y + 'px';
	data.f_type = this_.item.f_type;
	
	this_.$emit("sendData", data);
};
	
function down(this_, toastr){
	
	// 发送请求去后台，查询权限，获取文件路径的前面一部分
	this_.$axios({
		method:'post',
		url:this_.basicUrl + "file/getPathToDownload",
		params:{
			token:this_.$cookie.get("token"),
			path:this_.ex_path
		},
		responseType:'blob'
	}).then(function(response){
			let blob_ = response.data;
			// let blob_ = new Blob[data.data];
			let reader = new FileReader();
			reader.readAsText(blob_);
			// reader.readAsDataURL(blob_);
			reader.onload = (e) => {
				if(reader.result == '权限不足'){
					//要求隐藏加载中的图片
					this_.show_loading = false;
					toastr.error("您没有权限下载原格式文件");
				}else{
					let readerDown = new FileReader();
					readerDown.readAsDataURL(blob_);
					readerDown.onload = (e2) => {
						let a = document.createElement('a');
						let f_name = this_.ex_path.substr(this_.ex_path.lastIndexOf("/") + 1);
						a.download = f_name;
						a.href = e2.target.result;
						document.body.appendChild(a);
						a.click();
						//要求隐藏加载中的图片
						this_.show_loading = false;
						document.body.removeChild(a);
					}
				}
		}
	});
};
function delete_(this_, toastr){
	
	let path = this_.ex_path;
	this_.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
				this_.show_loading = true;
				this_.$axios.post(this_.basicUrl + "file/deleteFile",this_.$qs.stringify({
					token:this_.$cookie.get("token"),
					filePath:path
				})).then(function(response){
					this_.show_loading = false;
					let data = response.data;
					if(data.error_no > 0){
						toastr.error(data.error_info);
					}else{
						toastr.success("删除成功！");
						//向父组件传值，请求父组件重刷一遍页面
						let fatherPath = path.substr(0, path.lastIndexOf("/"));
						this_.getFileInfoByPath(fatherPath);
						
					}
				});
	          // toastr.info("删除成功！"); 
	        }).catch(() => {
	          toastr.info("已取消删除");        
	        });
	};

export{
	comRight,
	down,
	delete_
}
			