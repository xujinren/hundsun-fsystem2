 function comRight(ev, this_, id){
	console.info(this_);
	//兼容性写法示例：
	var ev = ev || event;//或（||）书写顺序有讲究，不能随意换
	this_.menu_right_show = true;
	//阻止默认行为
	ev.preventDefault();
	// this_.$forceUpdate();
	this_.$nextTick(function(){
	let x = ev.clientX;
	let y = ev.clientY;
	let menu_right_ = document.getElementById(id);			
	menu_right_.style.left = x + 'px';
	menu_right_.style.top = y + 'px'; 
	}, 20);
	//记录当前的坐标(x轴和y轴)
				
	// 	menu_right_.style.display = 'block';
	// console.info(menu_right_.style.display);
	//关闭右键
	document.onclick = function(){
	// menu_right_.style.display = 'none';//再次点击时隐藏菜单框
		this_.menu_right_show = false;
		}
	};
export{
	comRight
}
			