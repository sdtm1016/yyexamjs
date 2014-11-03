/**
 * 
 * @DESCRIBE   期初余额查询界面js
 * @AUTHOR     王丙建
 * @DATE       2013-03-06
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

//应付单 type：pu； 应收单:sa
var moduleType = null;

//单位参照地址
var dwrefurl = "";

/**
 * 供应商（客户）往来期初
 */
$(document).ready(function(){
	var valueObject = window.parent.valueMap.get("pu_goods_qcyeQuery");
	moduleType = valueObject.type;
	//alert("type:" + type);
	//采购
	if (moduleType=="pu"){
		//单据名称 
		$("#CVOUCHNAME").empty();
		$("#CVOUCHNAME")[0].options.add(new Option("所有种类", "0" ,false,false));
		$("#CVOUCHNAME")[0].options.add(new Option("采购发票", "1" ,false,false));
		$("#CVOUCHNAME")[0].options.add(new Option("应付单", "2" ,false,false));
		$("#CVOUCHNAME")[0].options.add(new Option("预付款", "3" ,false,false));
	
		//单据类型
		//$("#CVOUCHTYPE").empty();
		//$("#CVOUCHTYPE")[0].options.add(new Option("P0 其他应付单", "49" ,false,false));
		document.getElementById("dwname").innerHTML = "供&nbsp;应&nbsp;商";
		dwrefurl = 'basic_comref_supref';
	
	}
	//销售
	else if (moduleType=="sa"){
		//单据名称 
		$("#CVOUCHNAME").empty();
		$("#CVOUCHNAME")[0].options.add(new Option("所有种类", "0" ,false,false));
		$("#CVOUCHNAME")[0].options.add(new Option("销售发票", "1" ,false,false));
		$("#CVOUCHNAME")[0].options.add(new Option("应收单", "2" ,false,false));
		$("#CVOUCHNAME")[0].options.add(new Option("预收款", "3" ,false,false));
		
		
		//单据类型
		//$("#CVOUCHTYPE").empty();
		//$("#CVOUCHTYPE")[0].options.add(new Option("R0 其他应收单", "48" ,false,false));
		document.getElementById("dwname").innerHTML = "客&nbsp;&nbsp;户";
		dwrefurl = 'basic_comref_cusref';

		
	}
	//默认为采购
	else {
		//单据名称 
		//$("#CVOUCHNAME").empty();
		//$("#CVOUCHNAME")[0].options.add(new Option("应付单", "2" ,false,false));
		//单据类型
		//$("#CVOUCHTYPE").empty();
		//$("#CVOUCHTYPE")[0].options.add(new Option("P0 其他应付单", "49" ,false,false));
		document.getElementById("dwname").innerHTML = "供&nbsp;应&nbsp;商";
		dwrefurl = 'basic_comref_supref';

		
	}

});


/**
 * 得到查询条件
 */
function getQueryCond() {
	var data = 
	//单据名称
	  "&qcyeQueryData.CVOUCHNAME=" + $("#CVOUCHNAME").val()
	//单据类型
	+ "&qcyeQueryData.CVOUCHTYPE=" + $("#CVOUCHTYPE").val()
	//科目
    + "&qcyeQueryData.CCODE=" + $("#CCODE").attr("dbvalue")
    
	//币种
    + "&qcyeQueryData.CEXCH_NAME=" + $("#CEXCH_NAME").attr("dbvalue")
     //供应商编码
    + "&qcyeQueryData.CDWCODE=" +$("#CDWCODE").attr("dbvalue")
   
    //部门编码
    + "&qcyeQueryData.CDEPTCODE=" +$("#CDEPTCODE").attr("dbvalue")
     //业务员编码
    + "&qcyeQueryData.CPERSON=" +$("#CPERSON").attr("dbvalue")
    //项目
    + "&qcyeQueryData.CITEMCODE=" + $("#CITEMCODE").val()
    //方向
    + "&qcyeQueryData.BD_C=" + $("#BD_C").val()

    //单据编号
    + "&qcyeQueryData.minCVOUCHID=" + $("#minCVOUCHID").val()
    + "&qcyeQueryData.maxCVOUCHID=" + $("#maxCVOUCHID").val()
  
    //单据日期
    + "&qcyeQueryData.minDVOUCHDATE=" + $("#minDVOUCHDATE").val()
    + "&qcyeQueryData.maxDVOUCHDATE=" + $("#maxDVOUCHDATE").val()
    //原币金额
    + "&qcyeQueryData.minIAMOUNT_F=" + $("#minIAMOUNT_F").val()
    + "&qcyeQueryData.maxIAMOUNT_F=" + $("#maxIAMOUNT_F").val()

    //本币金额
    + "&qcyeQueryData.minIAMOUNT=" + $("#minIAMOUNT").val()
    + "&qcyeQueryData.maxIAMOUNT=" + $("#maxIAMOUNT").val()
    //摘要
	 "&qcyeQueryData.CDIGEST=" + $("#CDIGEST").val();
	
return data;
}

/**
 * 确定
 */

function execQcyeQuery() {
	
	var dataQuery = getQueryCond();
	//alert("查询条件：" + dataQuery);
	var djmc = $("#CVOUCHNAME").val();
	var param = {};
	param.djmc = djmc;
	param.dataQuery = dataQuery;
	 //模块类型
	param.moduleType = moduleType;
	
	window.parent.openWindow('pu_contacts_beginningbalance','pu_goods_qcyeQuery',param);
	window.parent.closeWindow('pu_goods_qcyeQuery');
		
}

/**
 *  取消 
 */
function exitqcyeQuery() {
	window.parent.closeWindow('pu_goods_qcyeQuery');
}





function deliverValue(valueObject){
	//科目处理
	if (queryid=="CCODE") {
		//显示名称
		document.getElementById(queryid).value = valueObject.selKemuName;
		//存储代码
		document.getElementById(queryid).setAttribute("dbvalue", valueObject.selKemuCode);
	
	}
	else {
		//显示名称
		document.getElementById(queryid).value = valueObject.cname;
		//存储代码
		document.getElementById(queryid).setAttribute("dbvalue", valueObject.ccode);
	
	}
	
	
}
