
/**
 * 
 * @DESCRIBE   供应商期初：预付款
 * @AUTHOR     王丙建
 * @DATE       2013-03-07
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

/**
 * 当前预付款id
 */
var curApDetailId = null;

var currentAction = "default";
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
	currentAction=="add";
	var valueObject = window.parent.valueMap.get("pu_set_yfk_vouchSet");
	formType = valueObject.formType;
	formFx = valueObject.formFx;
	CVOUCHTYPE = formType;
	
	 //模块类型
	moduleType = valueObject.moduleType  ;
	//alert("moduleType:" + moduleType);
	//销售
	if  (moduleType=="sa") {
		
		document.getElementById("dwname").innerHTML = "客户";
		dwrefurl = 'basic_comref_cusref';
		moduleFlag = "AR";
	}
	 //采购
	else if (moduleType=="pu") {
		document.getElementById("dwname").innerHTML = "供应商";
		dwrefurl = 'basic_comref_supref';
		moduleFlag = "AP";

	}
	else {
		document.getElementById("dwname").innerHTML = "供应商";
		dwrefurl = 'basic_comref_supref';
		moduleFlag = "AP";
	}
	
	 //预收款
	if (formType=="48") {
		document.getElementById("titlename").innerHTML = "预收款";	
		$("#titlename").removeClass("colred");
		$("#titlename").addClass("colblack");
		
	}
	 //预付款
	else if (formType=="49") {
		document.getElementById("titlename").innerHTML = "预付款";	
		$("#titlename").removeClass("colblack");
		$("#titlename").addClass("colred");
		
	}
	else {
		document.getElementById("titlename").innerHTML = "预收款";	
		$("#titlename").removeClass("colred");
		$("#titlename").addClass("colblack");
		
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
	lastvouch();
	
});





/**
 * 保存预付款信息
 */
function saveVouch_yfk() {
	if (checkSave()==false) {
		return ;
	}
	//得到供应商期初：预付款
	var data = getApDetail_yfk();
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
				alert("预付款修改成功！");	
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
				alert("预付款保存成功！");	
			}
		  });
	}
}

/**
 * 保存前校验
 */
function checkSave() {
	if ($("#CVOUCHID").val()=="") {
		alert("结算单号不允许为空！");
		return false;
	}
	if ($("#DVOUCHDATE").val()=="") {
		alert("结算日期不允许为空！");
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
	if ($("#IAMOUNT_F").val()=="") {
		alert("金额不允许为空！");
		return false;
	}
	
	return true;
}


/**
 * 删除预付款信息
 */
function delVouch_yfk_set() {
	if (confirm("真的要删除采购预付款吗？")){
		var data = getApDetail_yfk();
		data = data + "&apDetail.id=" + curApDetailId;		
		

		$.ajax({
			url: "apDetail!delete.action",
			type: 'post',
			data:data,
			dataType: "json",
			 async:false,
			success: function(data){
				alert("采购预付款删除成功！");	
				queryApDetailList();
				lastvouch();
			}
		  });
		
	}

}

/**
 * 查找账套下的全部采购预付款
 */
//预付款主表对象列表
var apDetailList;
//预付款主个数
var apDetailSize;
//预付款当前张
var curPasPage ;
//预付款类型
var CVOUCHTYPE = "49";
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
 * 根据预付款类型、预付款号码查找预付款主表
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
 * 增加
 */
function addApvouch_yfk_set() {
	//修改动作值
	currentAction = "add";
	//初始化预付款
	//获取结算单号
	var vouchid = "";
	$.ajax({
		url: "apCloseBill!queryApCloseBillVouchid.action",
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
		
		//结算日期
	$("#DVOUCHDATE").val("");
	      //供应商
	$("#CDWCODE").val("");
	$("#CDWCODE").attr("dbvalue","");
	 
	         //部门
	 $("#CDEPTCODE").val("");
	 $("#CDEPTCODE").attr("dbvalue","");
	     //项目
	$("#CITEMCODE").val("");
	$("#CITEMCODE").attr("dbvalue","");
	
	     //业务员
	$("#CPERSON").val("");
	$("#CPERSON").attr("dbvalue","");
	 
	      //结算方式
	 $("#CSSCODE").val("");
	 $("#CSSCODE").attr("dbvalue","");
	 
	   
	      //科目
	 $("#CCODE").val("");
	 $("#CCODE").attr("dbvalue","");
	 
	     // 币种
	 $("#CEXCH_NAME").val("");
	 $("#CEXCH_NAME").attr("dbvalue","");
	 
	      //金额
	 $("#IDAMOUNT_F").val("");
	      //本币金额
	  $("#IDAMOUNT").val("");
	       //摘要
	 $("#CDIGEST").val("");  
}

/**
 * 修改
 */
function updateVouch_yfk_set() {
	
	//修改动作值
	currentAction = "update";
}

/**
 * 初始化预付款信息
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
	 
	      //结算方式
	 var csscode = strNullProc(apDetail.CSSCODE);
		var csscodeObj = getSettleStyleByCode(csscode);
		if (csscodeObj!=null) {
			$("#CSSCODE").val(csscodeObj.cssname);
		}
	    $("#CSSCODE").attr("dbvalue",csscode);
		
	   
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
	 $("#IDAMOUNT_F").val(apDetail.IDAMOUNT_F);
	      //本币金额
	  $("#IDAMOUNT").val(apDetail.IDAMOUNT);
	       //摘要
	 $("#CDIGEST").val(strNullProc(apDetail.CDIGEST));  


	
	
	
}

/**
 * 首张预付款
 */
function firstvouch() {
	if (apDetailSize==0) return ;
	curPasPage = 0;
	var CVOUCHTYPE = apDetailList[curPasPage].CVOUCHTYPE;
	var CVOUCHID = apDetailList[curPasPage].CVOUCHID;
	queryApDetailByCode(CVOUCHTYPE, CVOUCHID);
}

/**
 * 末张预付款
 */
function lastvouch() {
	if (apDetailSize==0) return ;
	curPasPage = apDetailSize*1-1;
	var CVOUCHTYPE = apDetailList[curPasPage].CVOUCHTYPE;
	var CVOUCHID = apDetailList[curPasPage].CVOUCHID;
	queryApDetailByCode(CVOUCHTYPE, CVOUCHID);

}

/**
 * 上张预付款
 */
function upvouch() {
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
 * 下张预付款
 */
function downvouch() {
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
function exitvouch_set() {
	window.parent.closeWindow('pu_set_yfk_vouchSet');
	
}

/**
 * 得到预付款的期初余额
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
		      //结算方式
		      + "&apDetail.CSSCODE=" + $("#CSSCODE").attr("dbvalue")
		   
		      //科目
		      + "&apDetail.CCODE=" +$("#CCODE").attr("dbvalue")
		     // 币种
		      + "&apDetail.CEXCH_NAME=" +$("#CEXCH_NAME").val()
		      
		      //借方原币金额
		      + "&apDetail.IDAMOUNT_F=" +$("#IDAMOUNT_F").val()
		      //借方本币金额
		      + "&apDetail.IDAMOUNT=" + $("#IDAMOUNT").val()
		     
		       //汇率
		      + "&apDetail.IEXCHRATE=" + "1"
		     
		       //摘要
		      + "&apDetail.CDIGEST=" + $("#CDIGEST").val();  
		      if ($("#CEXCH_NAME").val()=="人民币")
		    	  data = data +  + "&apDetail.IEXCHRATE=" + "1";  
		      
		      
	return data;
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





