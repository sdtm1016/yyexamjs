/**
 * 
 * @DESCRIBE   应付单查询界面js 
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
$(document).ready(function(){
	var valueObject = window.parent.valueMap.get("pu_goods_vouchQuery");
	moduleType = valueObject.type;
	//alert("type:" + type);
	//采购
	if (moduleType=="pu"){
		//单据名称 
		$("#CVOUCHNAME").empty();
		$("#CVOUCHNAME")[0].options.add(new Option("应付单", "2" ,false,false));
		//单据类型
		$("#CVOUCHTYPE").empty();
		$("#CVOUCHTYPE")[0].options.add(new Option("P0 其他应付单", "P0" ,false,false));
		document.getElementById("dwname").innerHTML = "供&nbsp;应&nbsp;商";
		dwrefurl = 'basic_comref_supref';
	
	}
	//销售
	else if (moduleType=="sa"){
		//单据名称 
		$("#CVOUCHNAME").empty();
		$("#CVOUCHNAME")[0].options.add(new Option("应收单", "2" ,false,false));
		//单据类型
		$("#CVOUCHTYPE").empty();
		$("#CVOUCHTYPE")[0].options.add(new Option("R0 其他应收单", "R0" ,false,false));
		document.getElementById("dwname").innerHTML = "客&nbsp;&nbsp;户";
		dwrefurl = 'basic_comref_cusref';

		
	}
	//默认为采购
	else {
		//单据名称 
		$("#CVOUCHNAME").empty();
		$("#CVOUCHNAME")[0].options.add(new Option("应付单", "2" ,false,false));
		//单据类型
		$("#CVOUCHTYPE").empty();
		$("#CVOUCHTYPE")[0].options.add(new Option("P0 其他应付单", "P0" ,false,false));
		document.getElementById("dwname").innerHTML = "供&nbsp;应&nbsp;商";
		dwrefurl = 'basic_comref_supref';

		
	}
	


});

/**
 * 得到查询条件
 */
function getVouchQueryCond() {
	var data = 
	//单据名称
	  "&vouchQueryData.CVOUCHNAME=" + $("#CVOUCHNAME").val()
	//单据类型
	 + "&vouchQueryData.CVOUCHTYPE=" + $("#CVOUCHTYPE").val()
	//供应商编码
	 + "&vouchQueryData.minCDWCODE=" +$("#minCDWCODE").attr("dbvalue")
	 + "&vouchQueryData.maxCDWCODE=" +$("#maxCDWCODE").attr("dbvalue")
	//部门编码
    + "&vouchQueryData.CDEPTCODE=" +$("#CDEPTCODE").attr("dbvalue")
     //业务员编码
    + "&vouchQueryData.CPERSON=" +$("#CPERSON").attr("dbvalue")
     //单据号
    + "&vouchQueryData.minCVOUCHID=" + $("#minCVOUCHID").val()
    + "&vouchQueryData.maxCVOUCHID=" + $("#maxCVOUCHID").val()
    //单据日期
    + "&vouchQueryData.minDVOUCHDATE=" + $("#minDVOUCHDATE").val()
    + "&vouchQueryData.maxDVOUCHDATE=" + $("#maxDVOUCHDATE").val()
      //到期日
    + "&vouchQueryData.minENDDATE=" + $("#minCDEFINE4").val()
    + "&vouchQueryData.maxENDDATE=" + $("#maxCDEFINE4").val()
    
	//币种
    + "&vouchQueryData.CEXCH_NAME=" + $("#CEXCH_NAME").attr("dbvalue")
    //方向
    + "&vouchQueryData.BD_C=" + $("#BD_C").val()

    
    //原币金额
    + "&vouchQueryData.minIAMOUNT_F=" + $("#minIAMOUNT_F").val()
    + "&vouchQueryData.maxIAMOUNT_F=" + $("#maxIAMOUNT_F").val()
    //本币金额
    + "&vouchQueryData.minIAMOUNT=" + $("#minIAMOUNT").val()
    + "&vouchQueryData.maxIAMOUNT=" + $("#maxIAMOUNT").val();

	
	//未审核标志
	var wsh=""; 
	if ($("#wsh").attr("checked"))
			wsh = "1";
	//已审核标志
	var ysh=""; 
	if ($("#ysh").attr("checked"))
		ysh = "1";
	//alert("未审核标志：" + wsh + "\t已审核标志:" + ysh);
	//选中未审核、已审核
	if (wsh=="1" && ysh=="1") {
		data = data + "&vouchQueryData.shbz=" + "all";
	}
	else if (wsh=="1") {
		data = data + "&vouchQueryData.shbz=" + "wsh";
	}
	else {
		data = data + "&vouchQueryData.shbz=" + "ysh";
	}
	
	
return data;
}

/**
 * 确定
 */

function execVouchQuery() {
	
	var dataQuery = getVouchQueryCond();
//	alert("查询条件：" + dataQuery);
	var param = {};
	param.dataQuery = dataQuery;
	if (moduleType=="pu") {
		//查询类型设置为yfd
		param.queryType="yfd";		
	}
	else if (moduleType=="sa"){
		param.queryType="ysd";	
	}
	else {
		param.queryType="yfd";	
	}
	param.moduleType = moduleType;
   
	//window.parent.openWindow('ap_apvouch','pu_goods_vouchQuery',param);
	//window.parent.closeWindow('pu_goods_vouchQuery');
	
	window.parent.openWindow('pu_dealform_dealform','pu_goods_vouchQuery',param);
	window.parent.closeWindow('pu_goods_vouchQuery');
	
}

/**
 *  取消 
 */
function exitVouchQuery() {
	window.parent.closeWindow('pu_goods_vouchQuery');
}





function deliverValue(valueObject){
	
		//显示名称
		document.getElementById(queryid).value = valueObject.cname;
		//存储代码
		document.getElementById(queryid).setAttribute("dbvalue", valueObject.ccode);
	
}
