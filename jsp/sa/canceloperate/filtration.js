//全局变量
//上个页面穿过来的参数
var parentParam=null;
//程序入口
$(document).ready(function(){
	parentParam = window.parent.valueMap.get("sa_canceloperate_filtration");
});

/*
 * 返回值处理
 */
function deliverValue(valueObject){
	if (currentQueryBoxId=="vendor") {//供应商
		$("#"+currentQueryBoxId).val(valueObject.ccode);
		$("#"+currentQueryBoxId).attr("dbValue",valueObject.id);
	}else if(currentQueryBoxId=="bm"){//部门
		$("#"+currentQueryBoxId).val(valueObject.ccode);
		$("#"+currentQueryBoxId).attr("dbValue",valueObject.id);
	}else if(currentQueryBoxId=="ywy"){//人员
		$("#"+currentQueryBoxId).val(valueObject.ccode);
		$("#"+currentQueryBoxId).attr("dbValue",valueObject.id);
	}
}
//确定按钮
function btnConfirm(){
	//操作类型
	var operateType = $("#operateType >option:selected").text();
	var vendor = $.trim($("#vendor").val());
	//cancelOperate search
	var type=parentParam.type;
	var param = {operateType:operateType,vendor:vendor,type:type};
	if(type=="cancelOperate"){
		window.parent.openWindow('sa_canceloperate_view','sa_canceloperate_filtration',param);
	}else{
		var parentwin = window.parent.getParentWindow("sa_canceloperate_filtration");
		parentwin.queryBy(operateType,vendor);
	}
	window.parent.closeWindow('sa_canceloperate_filtration');
}




//窗体关闭时，隐藏日历控件
function onWindowClose(){
	$dp.hide();
}


