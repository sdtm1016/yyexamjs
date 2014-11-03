/**
 * 
 * @DESCRIBE   期初余额查询界面js
 * @AUTHOR     王丙建
 * @DATE       2013-03-12
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


/**
 * 页面初始化
 */
//应付单 type：pu； 应收单:sa
var moduleType = null;
$(document).ready(function(){
	var valueObject = window.parent.valueMap.get("ap_billtype");
	moduleType = valueObject.moduleType;
	
	//销售
	if  (moduleType=="sa") {
		var strDjName="";
		strDjName+="<option value='1'>销售发票</option>";
		strDjName+="<option value='2'>应收单</option>";
		strDjName+="<option value='3'>预收款</option>";
		$("#name").empty();			
		$("#name").append(strDjName);
	}
    //采购
	else if (moduleType=="pu") {
		var strDjName="";
		strDjName+="<option value='1'>采购发票</option>";
		strDjName+="<option value='2'>应付单</option>";
		strDjName+="<option value='3'>预付款</option>";
		$("#name").empty();			
		$("#name").append(strDjName);
	}
	else {
		var strDjName="";
		strDjName+="<option value='1'>采购发票</option>";
		strDjName+="<option value='2'>应付单</option>";
		strDjName+="<option value='3'>预付款</option>";
		$("#name").empty();			
		$("#name").append(strDjName);
	}
	
	var queryType = valueObject.queryType;
	//alert("单据查询类型：" + queryType);
	// 应付单初始化
	if (queryType=="yfd") {
		//单据名称 
		var strDjName="";
		 strDjName+="<option value='2'>应付单</option>";
		 $("#name").empty();			
		 $("#name").append(strDjName);
		 //单据类型
		//单据名称 
			var strDjType="";
			strDjType+="<option value='2'>其他应付单</option>";
			 $("#type").empty();			
			 $("#type").append(strDjType);
			 //单据类型
		 
	}
	
	
});



/**
 * 打开供应商期初
 */
function openPu() {
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
	 //模块类型
	param.moduleType = moduleType;

	if (formName=="1") {
		
		//销售发票期初
		if (moduleType=="sa") {
			//alert(moduleType);
			window.parent.openWindow('sa_set_invoice_set','ap_billtype',param);
			//window.parent.closeWindow('ap_billtype');
		}
		//采购发票期初
		else if (moduleType=="pu") {
			window.parent.openWindow('pu_set_invoice_set','ap_billtype',param);
			//window.parent.closeWindow('ap_billtype');
		}
		//采购发票期初
		else {
			window.parent.openWindow('pu_set_invoice_set','ap_billtype',param);
			//window.parent.closeWindow('ap_billtype');
		}
	}
	//应付单期初
	else if (formName=="2") {
		window.parent.openWindow('pu_set_apvouchSet','ap_billtype',param);
		//window.parent.closeWindow('ap_billtype');
	}
	//预付款期初
	else if (formName=="3") {
		window.parent.openWindow('pu_set_yfk_vouchSet','ap_billtype',param);
		//window.parent.closeWindow('ap_billtype');
	}
}

/**
 * 退出单据类别
 */
function closePu() {
	window.parent.closeWindow('ap_billtype');
}