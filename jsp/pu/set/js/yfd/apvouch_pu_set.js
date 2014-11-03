
/**
 * 
 * @DESCRIBE   其他应付单期初数据js
 * @AUTHOR     王丙建
 * @DATE       2013-08-21
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */




var curApDetailId = null;
var formType = "";
var formFx = "";
var moduleType = null;
//单位参照地址
var dwrefurl = "";
//模块标志
var moduleFlag = "AP";
/**
 * 页面初始化
 */
$(document).ready(function(){
	var valueObject = window.parent.valueMap.get("pu_set_apvouchSet");
	formType = valueObject.formType;
	formFx = valueObject.formFx;
	CVOUCHTYPE = formType;
	 //模块类型
	moduleType = valueObject.moduleType  ;
	//alert("moduleType:" + moduleType);
	//销售
	if  (moduleType=="sa") {
		document.getElementById("titlename").innerHTML = "其他应收单";	
		document.getElementById("dwname").innerHTML = "客户";
		dwrefurl = 'basic_comref_cusref';
		moduleFlag = "AR";
	}
	 //采购
	else if (moduleType=="pu") {
		document.getElementById("titlename").innerHTML = "其他应付单";	
		document.getElementById("dwname").innerHTML = "供应商";
		dwrefurl = 'basic_comref_supref';
		moduleFlag = "AP";

	}
	else {
		document.getElementById("titlename").innerHTML = "其他应付单";	
		document.getElementById("dwname").innerHTML = "供应商";
		dwrefurl = 'basic_comref_supref';
		moduleFlag = "AP";
	}
	
	//单据编号
	$("#CVOUCHID").attr("readonly","readonly");
	$("#CVOUCHID").css("background-color","#D4D0C8");
	//项目
	$("#CITEMCODE").attr("readonly","readonly");
	$("#CITEMCODE").css("background-color","#D4D0C8");
	//本币金额
	$("#IDAMOUNT").attr("readonly","readonly");
	$("#IDAMOUNT").css("background-color","#D4D0C8");
	
	//alert("单据类型：" + formType + "\t单据方向：" + formFx);
	queryApDetailList();
	lastApDetail();
	
	
});


/**
 * 保存应付单信息
 */
function saveVouch_pu_set() {
	if (checkSave_pu()==false) {
		return ;
	}
		
	//获取应付单主表信息
	var vouchData = getApDetail_yfk();
	var data = vouchData ;
	//alert(data);
	if (currentAction=="update") {
		data = data + "&apDetail.id=" + curApDetailId;
		alert(data);
		$.ajax({
			url: "apDetail!update.action",
			type: 'post',
			data:data,
			dataType: "json",
			 async:false,
			success: function(data){
				alert("其他应付单修改成功！");	
			}
		  });
	}
	else {
		
		$.ajax({
			url: "apDetail!create.action",
			type: 'post',
			data:data,
			dataType: "json",
			 async:false,
			success: function(data){
				alert("其他应付单保存成功！");	
			}
		  });
	}
	
	//按钮初始化
	//showaddApDetailButton_pu();
	 $("#addApDetail").attr("disabled",false);
	 $("#upsvouch").attr("disabled",false);
	 $("#delvouch").attr("disabled",false);
	 $("#auditvouch").attr("disabled",false);
	 
	 $("#firstvouch").attr("disabled",false);
	 $("#upvouch").attr("disabled",false);
	 $("#downvouch").attr("disabled",false);
	 $("#lastApDetail").attr("disabled",false);
	
}


/**
 * 删除应付单信息
 */
function delVouch_pu_set() {
	if (confirm("真的要删除其他应付单吗？")){
		var data =  getApDetail_yfk();
		data = data + "&apDetail.id=" + curApDetailId;		
		$.ajax({
			url: "apDetail!delete.action",
			type: 'post',
			data:data,
			dataType: "json",
			success: function(data){
				alert("其他应付单删除成功！");	
				queryApDetailList();
				lastApDetail();
			}
		  });
		
	}

}


/**
 * 得到其他应付单的期初余额
 */
function getApDetail_yfk() {
	var data =
		//会计期间默认为0
		"&apDetail.IPERIOD=" + 0
		//单据正负标志
		+ "&apDetail.CSIGN=" + formFx
		//是否预收标志
		+ "&apDetail.BPREPAY=" + "0"
		//是否正常标志
		+ "&apDetail.IFLAG=" + "0"
		//应收应付标志 ：预付款为应付模块
		+ "&apDetail.CFLAG=" + moduleFlag
		 
		//单据类型
		+ "&apDetail.CVOUCHTYPE=" + CVOUCHTYPE
			
		//结算单号
			+ "&apDetail.CVOUCHID=" + $("#CVOUCHID").val()
			//结算日期
		      + "&apDetail.DVOUCHDATE=" +$("#DVOUCHDATE").val()
		      //记账日期
		        + "&apDetail.DREGDATE=" +$("#DVOUCHDATE").val()
		    
		      //供应商
		      + "&apDetail.CDWCODE=" +$("#CDWCODE").attr("dbvalue")
		         //部门
		      + "&apDetail.CDEPTCODE=" + $("#CDEPTCODE").attr("dbvalue")
		     //项目
		      + "&apDetail.CITEMCODE=" + $("#CITEMCODE").val()
		     //业务员
		      + "&apDetail.CPERSON=" + $("#CPERSON").attr("dbvalue")
		      //付款条件
		      + "&apDetail.CPAYCODE=" + $("#CPAYCODE").attr("dbvalue")
		   
		      //科目
		      + "&apDetail.CCODE=" +$("#CCODE").attr("dbvalue")
		     // 币种
		      + "&apDetail.CEXCH_NAME=" +$("#CEXCH_NAME").val()
		      
		      //借方金额
		      + "&apDetail.IDAMOUNT=" +$("#IDAMOUNT").val()
		      + "&apDetail.IEXCHRATE=" +"1"
		      
		      
		      //借方本币金额
		      + "&apDetail.IDAMOUNT_F=" + $("#IDAMOUNT_F").val()
		      //数量
		      + "&apDetail.IDAMOUNT_S=" + $("#IDAMOUNT_S").val()
		   
		      
		      //账期管理
		      + "&apDetail.ZQCODE=" + $("#ZQCODE").val()
		     
		      //到期日
		      + "&apDetail.DQDATE=" + $("#DQDATE").val()
		     
		     
		       //摘要
		      + "&apDetail.CDIGEST=" + $("#CDIGEST").val();  
		      if ($("#CEXCH_NAME").val()=="人民币")
		    	  data = data +  + "&apDetail.IEXCHRATE=" + "1";  
		      
		      
	return data;
}


/**
 * 放弃操作
 */
function abortVouch_pu_set() {
	//按钮初始化
	showaddApDetailButton_pu();
	$("#addApDetail").attr("disabled",false);
	$("#savevouch").attr("disabled",true);
	$("#abortvouch").attr("disabled",true);
	
	 $("#firstvouch").attr("disabled",false);
	 $("#upvouch").attr("disabled",false);
	 $("#downvouch").attr("disabled",false);
	 $("#lastApDetail").attr("disabled",false);
	
	$("#topTextBoxContainer").find(".querybox").attr("disabled","disabled");
	$("#topTextBoxContainer").find(".querybox").val("");
	
	queryApDetailList();
	lastApDetail();
	
}


/**
 * 退出
 */
function exitApvouch_pu_set() {
	window.parent.closeWindow('pu_set_apvouchSet');
	
}	
/**
 * 保存前校验
 */
function checkSave_pu() {
	if ($("#CVOUCHID").val()=="") {
		alert("单据编号不允许为空！");
		return false;
	}
	if ($("#DVOUCHDATE").val()=="") {
		alert("单据日期不允许为空！");
		return false;
	}
	if ($("#CDWCODE").val()=="") {
		alert("供应商不允许为空！");
		return false;
	}
	if ($("#CEXCH_NAME").val()=="") {
		alert("币种不允许为空！");
		return false;
	}
	if ($("#DQDATE").val()=="") {
		alert("到期日不允许为空！");
		return false;
	}
	if ($("#IAMOUNT_F").val()=="") {
		alert("金额不允许为空！");
		return false;
	}
	return true;
}



/**
 * 查找账套下的全部采购应付单
 */
//应付单主表对象列表
var apDetailList;
//应付单主个数
var apDetailSize;
//应付单当前张
var curPasPage ;
//应付单类型
var CVOUCHTYPE = "P0";
function queryApDetailList() {
	$.ajax({
		url: "apDetail!queryList.action?vouchType=" +CVOUCHTYPE,
		type: 'post',
		dataType: "json",
		async:false,
		success: function(data){
			apDetailList = data.apDetailList;
			apDetailSize = apDetailList.length;
		}
	  });
}

/**
 * 根据应付单类型、应付单号码查找应付单主表
 * @param CPBVBILLTYPE
 * @param CPBVCODE
 */
function queryApDetailByCode(CVOUCHTYPE, CVOUCHID) {
	
	$.ajax({
		url: "apDetail!queryListByCode.action?CVOUCHTYPE=" + CVOUCHTYPE + "&CVOUCHID=" + CVOUCHID,
		type: 'post',
		dataType: "json",
		 async:false,
		success: function(data){
			loadQueryApDetail(data);
		}
	  });
}


/**
 * 币种失去焦点事件
 * @param obj
 */
function exchBlur() {
	var curexchName =  $("#CEXCH_NAME").val();
	if (curexchName=="人民币") {
		   $("#IAMOUNT").attr("disabled",true);
	}
	else {
	       $("#IAMOUNT").attr("disabled",false);
	}
}





/**
 * 金额失去焦点
 */
function moneyBlur() {
	var curRate =  1;
	var curMoney =  DoubleNullPtoc($("#IDAMOUNT_F").val());
	
	var benbiMiney = curRate * curMoney;
	$("#IDAMOUNT").val(benbiMiney);
}

/**
 * 显示其他应付单期初数据
 * @param data
 */

function loadQueryApDetail(data) {
	var apDetail = data.apDetail;
	//当前预付款id
	curApDetailId = apDetail.id;
	//单据类型
	 CVOUCHTYPE = apDetail.CVOUCHTYPE;
		
	//结算单号
    $("#CVOUCHID").val(apDetail.CVOUCHID);
  		//结算日期
	$("#DVOUCHDATE").val(getStrDate(apDetail.DVOUCHDATE));
	      //供应商
	
	
	  //客户
	if (moduleType=="sa") {
		//客户
 	   var venCode = strNullProc(apDetail.CDWCODE);
 	   var cusObj = getCustomerByCode(venCode);
 	  	if (cusObj!=null) {
 	  		$("#CDWCODE").val(cusObj.ccusabbname);
 	  		$("#CDWCODE").attr("dbvalueId",cusObj.id);
 	  	    
 	  	}
 	  	$("#CDWCODE").attr("dbvalue",venCode);
		
	}
	//供应商
	else if (moduleType=="pu") {
		var venCode = strNullProc(apDetail.CDWCODE);
	    var venObj = getVendorByCode(venCode);
	  	if (venObj!=null) {
	  		$("#CDWCODE").val(venObj.cvenabbname);
	  	}
	  	$("#CDWCODE").attr("dbvalue",venCode);
	}
	else {
		var venCode = strNullProc(apDetail.CDWCODE);
	    var venObj = getVendorByCode(venCode);
	  	if (venObj!=null) {
	  		$("#CDWCODE").val(venObj.cvenabbname);
	  	}
	  	$("#CDWCODE").attr("dbvalue",venCode);
	}
	

 
	 //部门
	 var deptCode = strNullProc(apDetail.CDEPTCODE);
		var departmentObj = getDepartmentByCode(deptCode);
	  	if (departmentObj!=null) {
	  		$("#CDEPTCODE").val(departmentObj.cdepname);
	  	}
	      $("#CDEPTCODE").attr("dbvalue",deptCode);
	  
	     //项目
	$("#CITEMCODE").val(apDetail.CITEMCODE);
	     //业务员
	 var personCode = strNullProc(apDetail.CPERSON);
	 	var personObj = getPersonByCode(personCode);
	 	if (personObj!=null) {
	 		$("#CPERSON").val(personObj.cpersonname);
	 	}
	 	$("#CPERSON").attr("dbvalue",personCode);
	 
	      //付款条件
	 var paycode = strNullProc(apDetail.CPAYCODE);
	  var paycodeObj = getPayContionByCode(paycode);
		if (paycodeObj!=null) {
			$("#CPAYCODE").val(paycodeObj.cpayname);
		}
	    $("#CPAYCODE").attr("dbvalue",paycode);
		
	   
	      //科目
	 var ccode = strNullProc(apDetail.CCODE);
	 var codeObj = getCurCodeObj(ccode);
	if (codeObj!=null) {
			$("#CCODE").val(codeObj.ccodeName);
		}
	   $("#CCODE").attr("dbvalue",ccode);
	     // 币种
	 $("#CEXCH_NAME").val(apDetail.CEXCH_NAME);
	 
	      //金额
	 $("#IDAMOUNT").val(apDetail.IDAMOUNT);
	      //本币金额
	  $("#IDAMOUNT_F").val(apDetail.IDAMOUNT_F);
	  //数量
	  $("#IDAMOUNT_S").val(apDetail.IDAMOUNT_S);
	  
	  //账期管理
	  $("#ZQCODE").val(apDetail.ZQCODE);
	  //到期日
	  $("#DQDATE").val(getStrDate(apDetail.DQDATE));
	       //摘要
	 $("#CDIGEST").val(strNullProc(apDetail.CDIGEST));
	 


}


/**
 * 首张应付单
 */
function firstApDetail() {
	if (apDetailSize==0) return ;
	curPasPage = 0;
	var CVOUCHTYPE = apDetailList[curPasPage].CVOUCHTYPE;
	var CVOUCHID = apDetailList[curPasPage].CVOUCHID;
	queryApDetailByCode(CVOUCHTYPE, CVOUCHID);
}

/**
 * 末张应付单
 */
function lastApDetail() {
	if (apDetailSize==0) return ;

	curPasPage = apDetailSize*1-1;
	
	var CVOUCHTYPE = apDetailList[curPasPage].CVOUCHTYPE;
	var CVOUCHID = apDetailList[curPasPage].CVOUCHID;
	queryApDetailByCode(CVOUCHTYPE, CVOUCHID);

	//有其他应付单时按钮状态变化
	if (apDetailSize>0) {
		 $("#addApDetail").attr("disabled",false);
		 $("#upsvouch").attr("disabled",false);
		 $("#delvouch").attr("disabled",false);
		 
			
		 $("#firstvouch").attr("disabled",false);
		 $("#upvouch").attr("disabled",false);
		 $("#downvouch").attr("disabled",false);
		 $("#lastvouch").attr("disabled",false);
		 $("#copyvouch").attr("disabled",false);
		 $("#refreshvouch").attr("disabled",false);
			
	}
	else {
		 $("#addrowvouch").attr("disabled",true);
		 $("#delrowvouch").attr("disabled",true);
		
	}
}

/**
 * 上张应付单
 */
function upApDetail() {
	if (apDetailSize==0) return ;

	curPasPage --;
	//上一页时：当前页最小值为0
	if (curPasPage <= 0) 
		curPasPage = 0;
	var CVOUCHTYPE = apDetailList[curPasPage].CVOUCHTYPE;
	var CVOUCHID = apDetailList[curPasPage].CVOUCHID;
	queryApDetailByCode(CVOUCHTYPE, CVOUCHID);
}

/**
 * 下张应付单
 */
function downApDetail() {
	if (apDetailSize==0) return ;

	curPasPage ++;
	//下一页时：当前页不能大于全部页数
	if (curPasPage>=apDetailSize) 
		curPasPage = apDetailSize-1;
	var CVOUCHTYPE = apDetailList[curPasPage].CVOUCHTYPE;
	var CVOUCHID = apDetailList[curPasPage].CVOUCHID;
	queryApDetailByCode(CVOUCHTYPE, CVOUCHID);
}

/**
 * 退出
 */
function exitApDetail() {
	window.parent.closeWindow('ap_apvouch');
	
}

var currentAction = "default";
//增加 
function addApvouch_pu_set(){
	
	//修改动作值
	currentAction = "add";
	//按钮初始化
	
	 $("#addApDetail").attr("disabled",true);
	 $("#upsvouch").attr("disabled",true);
	 $("#delvouch").attr("disabled",true);
	 
	 $("#savevouch").attr("disabled",false);
	 $("#abortvouch").attr("disabled",false);
	
		
	 $("#firstvouch").attr("disabled",true);
	 $("#upvouch").attr("disabled",true);
	 $("#downvouch").attr("disabled",true);
	 $("#lastvouch").attr("disabled",true);
	 $("#copyvouch").attr("disabled",true);
	 $("#refreshvouch").attr("disabled",true);
		 
	 $("#topTextBoxContainer").find(".querybox").removeAttr("disabled");
	 addApDetail();
}


/**
 * 增加其他应付单期初数据
 */
function addApDetail() {
	//获取结算单号：期初数据结算单号也从应收应付主表中获取
	var vouchid = "";
	$.ajax({
		url: "vouch!queryApouchid.action",
		type: 'post',
		 async:false,
		dataType: "json",
		success: function(data){
			vouchid = data.vouchid;
		}
	  });
	$("#ORDERNO").val("");
	
	//结算单号
	$("#CVOUCHID").val(vouchid);
	$("#CVOUCHID").attr("disabled",true);
	
	
	//其他应付单主表清空
	//对应单据     
	$("#CVOUCHID1").val("");
	//单据日期
    $("#DVOUCHDATE").val("");
      //供应商
    $("#CDWCODE").attr("dbvalue","");
    $("#CDWCODE").val("");
      //科目
    $("#CCODE").attr("dbvalue","");
    $("#CCODE").val("");
     // 币种
    $("#CEXCH_NAME").attr("dbvalue","");
    $("#CEXCH_NAME").val("");
      //金额
    $("#IDAMOUNT_F").val("");
      //本币金额
    $("#IDAMOUNT").val("");
    //数量
    $("#IDAMOUNT_S").val("");
    
      //付款条件
    $("#CPAYCODE").attr("dbvalue","");
    $("#CPAYCODE").val("");
      //部门
    $("#CDEPTCODE").attr("dbvalue","");
    $("#CDEPTCODE").val(""); 
      //项目
    $("#CITEMCODE").val("");
     //数量
    $("#IAMOUNT_S").val("");
      //业务员
    $("#CPERSON").attr("dbvalue","");
    $("#CPERSON").val("");  
      //摘要
    $("#CDIGEST").val("");  
      //账期管理
    $("#ZQCODE").val(""); 
      
      //到期日
     $("#DQDATE").val("")  ;
 }

//修改
function upsApvouch_pu_set(){
	
	//修改动作值
	currentAction = "update";
	//按钮初始化
	 $("#addApDetail").attr("disabled",true);
	 $("#upsvouch").attr("disabled",true);
	 $("#delvouch").attr("disabled",true);
	 $("#auditvouch").attr("disabled",true);
	 
	 $("#savevouch").attr("disabled",false);
	 $("#abortvouch").attr("disabled",false);
	 
	 
	 $("#firstvouch").attr("disabled",true);
	 $("#upvouch").attr("disabled",true);
	 $("#downvouch").attr("disabled",true);
	 $("#lastApDetail").attr("disabled",true);
	 $("#topTextBoxContainer").find(".querybox").removeAttr("disabled");
}

