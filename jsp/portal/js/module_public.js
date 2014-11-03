 //判断是否允许操作
function iscanoprate(){
	var res=false;
	$.ajax({
	    url: "faInitializa!iscansubmit",
	    type: 'post',
	    dataType: "json",
	    cache:false,
	    async:false,
	    success: function(data){
	    	var mark=data.mark;
	    	if(mark=="0"){
	    		res=true;
	    	}else{
	    		res=false;
	    	}
	    }
	 });
	return res;
}
//资产变动菜单
function fa_assetschange_filter(){
	var is=iscanoprate();
	if(!is){
		var len = $("#floatmenu li").length-1;
		$("#floatmenu li").hide().eq(len).show();
	}
	showFloatMenu('floatmenu',{left:'180px',top:'280px',width:'120px'})
}

 function showFloatMenu(floatMenuId,cssStyle){
	var mask = document.body.insertBefore(document.createElement("div"), document.body.childNodes[0]);
	
	with(mask.style){
		zIndex = 100;
		left = top = 0;
		position = "fixed";
		width = height = "100%";
		(document.all) ? filter = "alpha(opacity:0)" : opacity = 0 / 100;
		backgroundColor = "#000"; display = "block";
	}
	mask.onclick=function(e){
		var evt=(window.event || e);//获得事件
		var evtsrc = (evt.srcElement || evt.target);
		evtsrc.style.display="none";
		document.getElementById(floatMenuId).style.display="none";
	};
	var floatMenu = document.getElementById(floatMenuId);
	floatMenu.onclick=function(e){
		document.body.childNodes[0].style.display="none";
		document.getElementById(floatMenuId).style.display="none";
	};
	
	
	
	with(floatMenu.style){
		display="block";
		width=(cssStyle != undefined ? cssStyle.width : "180px");
		position="absolute";
		left=(cssStyle != undefined ? cssStyle.left : "260px");
		top=(cssStyle != undefined ? cssStyle.top : "200px");
		border="2px outset #ccc";
		backgroundColor="#D4D0C8";
		padding="0px";
		cursor="default";
		zIndex="101";
	}
 }

 
 //固定资产，计提折旧，退出清单或分配表时弹出计提折旧完提示对话框
 function showDoneMessage(){
	 var time=new Date().format("yyyy年MM月dd日 hh时mm分ss秒");
		jAlert("计提折旧完成！<br>开始时间："+time+"<br>结束时间："+time);
	 
 }
 
 