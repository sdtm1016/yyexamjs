//全局变量
//上个页面穿过来的参数
var parentParam=null;
//程序入口
$(document).ready(function(){
	parentParam = window.parent.valueMap.get("pu_canceloperate_qxcztj");
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
		window.parent.openWindow('pu_canceloperate_qxczbg','pu_canceloperate_qxcztj',param);
	}else{
		var parentwin = window.parent.getParentWindow("pu_canceloperate_qxcztj");
		parentwin.queryBy(operateType,vendor);
	}
	window.parent.closeWindow('pu_canceloperate_qxcztj');
}