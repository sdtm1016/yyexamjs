/**
 * 
 * @DESCRIBE   其他应付单查询界面js
 * @AUTHOR     王丙建
 * @DATE       2013-08-27
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


/**
 * 页面初始化
 */
var queryType  = null;
$(document).ready(function(){
	var valueObject = window.parent.valueMap.get("apVouch_billtype");
	queryType = valueObject.queryType;
	//alert("单据查询类型：" + queryType);
	// 应付单初始化
	if (queryType=="yfd") {
		//单据名称 
		var strDjName="";
		 strDjName+="<option value='yfd'>应付单</option>";
		 $("#name").empty();			
		 $("#name").append(strDjName);
		 //单据类型
		//单据名称 
		var strDjType="";
		strDjType+="<option value='49'>其他应付单</option>";
		 $("#type").empty();			
		 $("#type").append(strDjType);
		 
	}
	else if (queryType=="ysd") {
		//单据名称 
		var strDjName="";
		 strDjName+="<option value='ysd'>应收单</option>";
		 $("#name").empty();			
		 $("#name").append(strDjName);
		 //单据类型
		//单据名称 
		var strDjType="";
		strDjType+="<option value='48'>其他应收单</option>";
		 $("#type").empty();			
		 $("#type").append(strDjType);
	}
	else {
		//单据名称 
		var strDjName="";
		 strDjName+="<option value='yfd'>应付单</option>";
		 $("#name").empty();			
		 $("#name").append(strDjName);
		 //单据类型
		//单据名称 
		var strDjType="";
		strDjType+="<option value='49'>其他应付单</option>";
		 $("#type").empty();			
		 $("#type").append(strDjType);
	}
	
	
});



/**
 * 打开其他应付单
 */
function openApVouch() {
	
	 //名称
	var formName=$("#name").attr("value");
	//类型
	var formType=$("#type").attr("value");
	//方向
	var formFx=$("#direction").attr("value");
	//alert(formName + "\t" + formType + "\t" + formFx);
	var param = {};
	//打开窗体赋值语句
	param.formName = formName;
	param.formType = formType;
	param.formFx = formFx;
	param.queryType = queryType;
	//打开其他应付单
	window.parent.openWindow('ap_qtyfd_apvouch','apVouch_billtype',param);
	window.parent.closeWindow('apVouch_billtype');

	
	
}



/**
 * 退出单据类别
 */
function closeApVouch() {
	window.parent.closeWindow('apVouch_billtype');
}