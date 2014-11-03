
/**
 * 
 * @DESCRIBE   应付单js
 * @AUTHOR     王丙建
 * @DATE       2013-03-07
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

//子表原币金额合计值
var sumSubIAMOUNT_F = 0.0;
//其他应付单主表id
var vouchid = 0;
//其他应付单审核标志
var iflag = null;

//应付单方向
var bd_c = 0;
//应付单类型
var CVOUCHTYPE = "P0";
//供应商客户参照地址
var dwrefurl = null;
//应收应付标志
var cflag = "";

/**
 * 页面初始化
 */
$(document).ready(function(){
	var valueObject = window.parent.valueMap.get("ap_qtyfd_apvouch");
	//单据类型处理
	var queryType = valueObject.queryType;
	if (queryType=="yfd") {
		CVOUCHTYPE = "P0";
		//单据标题
		$("#djtitle").html("其他应付单");
		//单位标签
		$("#dwlabel").html("供应商");
		//供应商客户参照地址
		dwrefurl = 'basic_comref_supref';
		//应付标志
		cflag = "AP";
	}
	else if (queryType=="ysd") {
		CVOUCHTYPE = "R0";
		//单据标题
		$("#djtitle").html("其他应收单");
		//单位标签
		$("#dwlabel").html("客户");
		//供应商客户参照地址
		dwrefurl = 'basic_comref_cusref';
		//应收标志
		cflag = "AR";

	}
	else {
		CVOUCHTYPE = "P0";
		//单据标题
		$("#djtitle").html("其他应付单");
		//单位标签
		$("#dwlabel").html("供应商");
		//供应商客户参照地址
		dwrefurl = 'basic_comref_supref';
		//应付标志
		cflag = "AP";

	}
	
	var CVOUCHFX = valueObject.formFx;
	//单据方向值为正向，主表方向为贷，子表方向为正；否则相反
	if (CVOUCHFX==1) 
		bd_c = 0;
	else 
		bd_c =1;
	
	
	pageInit_pu();
	queryVouchList();
	lastvouch();
	
	
});



/**
 * 修改按钮初始化
 */
function updateVouch_pu() {
	
	//按钮初始化
	 $("#addvouch").attr("disabled",true);
	 $("#upsvouch").attr("disabled",true);
	 $("#delvouch").attr("disabled",true);
	 $("#auditvouch").attr("disabled",true);
	 
	 $("#savevouch").attr("disabled",false);
	 $("#abortvouch").attr("disabled",false);
	 
	 
	 $("#firstvouch").attr("disabled",true);
	 $("#upvouch").attr("disabled",true);
	 $("#downvouch").attr("disabled",true);
	 $("#lastvouch").attr("disabled",true);
	 $("#topTextBoxContainer").find(".querybox").removeAttr("disabled");
}

/**
 * 保存应付单信息
 */
function saveVouch_pu() {
	if (checkSave_pu()==false) {
		return ;
	}
	//子表原币金额合计值清空
	sumSubIAMOUNT_F = 0.0;
	
	//获取应付单主表信息
	var vouchData = getVouch();
	//获取应付单子表信息
	var apVouchsList = serializableUpdatedRow();
	var data = vouchData + apVouchsList;
	   //金额
    var mainIAMOUNT_F = $("#IAMOUNT_F").val();
    if (mainIAMOUNT_F!=sumSubIAMOUNT_F) {
    	jAlert("借贷方不平，不能保存！");
    	return;
    }
	

	if (currentAction=="add") {
		$.ajax({
			url: "vouch!create.action",
			type: 'post',
			data:data,
			dataType: "json",
			success: function(data){
				jAlert("应付单保存成功！");	
			}
		  });
		}
	else {
		$.ajax({
			url: "vouch!update.action?",
			type: 'post',
			data:data,
			dataType: "json",
			success: function(data){
				jAlert("应付单修改成功！");	
			}
		  });
	}
	
	//按钮初始化
	//showAddvouchButton_pu();
	 $("#addvouch").attr("disabled",false);
	 $("#upsvouch").attr("disabled",false);
	 $("#delvouch").attr("disabled",false);
	 $("#auditvouch").attr("disabled",false);
	 
	 $("#firstvouch").attr("disabled",false);
	 $("#upvouch").attr("disabled",false);
	 $("#downvouch").attr("disabled",false);
	 $("#lastvouch").attr("disabled",false);
	
			
	
}

/**
 * 放弃操作
 */
function abortVouch_pu() {
	//按钮初始化
	showAddvouchButton_pu();
	$("#addvouch").attr("disabled",false);
	$("#savevouch").attr("disabled",true);
	$("#abortvouch").attr("disabled",true);
	
	 $("#firstvouch").attr("disabled",false);
	 $("#upvouch").attr("disabled",false);
	 $("#downvouch").attr("disabled",false);
	 $("#lastvouch").attr("disabled",false);
	
	$("#topTextBoxContainer").find(".querybox").attr("disabled","disabled");
	$("#topTextBoxContainer").find(".querybox").val("");
	
	queryVouchList();
	lastvouch();
	
}

/**
 * 审核应付单
 */
function auditApVouch_pu() {
	var vouchType = apVouchList[curPasPage].CVOUCHTYPE;
	var vouchId = apVouchList[curPasPage].CVOUCHID;
	$.ajax({
			url: "vouch!auditAp.action?vouchType=" + vouchType + "&vouchId=" + vouchId,
			type: 'post',
			dataType: "json",
			async:false,    
			success: function(data){
				$("#auditvouch").attr("disabled",true);
				$("#cancelauditvouch").attr("disabled",false);				
				jAlert("审核成功！");
			}
	});	
	
	
}

/**
 * 取消审核应付单
 */
function cancelauditApVouch_pu() {
	var vouchType = apVouchList[curPasPage].CVOUCHTYPE;
	var vouchId = apVouchList[curPasPage].CVOUCHID;
			
		$.ajax({
			url: "vouch!auditCancelAp.action?vouchType=" + vouchType + "&vouchId=" + vouchId,
			type: 'post',
			dataType: "json",
			async:false,
			success: function(data){    
				$("#auditvouch").attr("disabled",false);
				$("#cancelauditvouch").attr("disabled",true);				
				jAlert("弃审成功！");
			}
		  });
	
}


/**
 * 退出
 */
function exitApvouch_pu() {
	window.parent.closeWindow('ap_qtyfd_apvouch');
	
}	
/**
 * 保存前校验
 */
function checkSave_pu() {
	if ($("#CVOUCHID").val()=="") {
		jAlert("单据编号不允许为空！");
		return false;
	}
	if ($("#DVOUCHDATE").val()=="") {
		jAlert("单据日期不允许为空！");
		return false;
	}
	if ($("#CDWCODE").val()=="") {
		jAlert("供应商不允许为空！");
		return false;
	}
	if ($("#CEXCH_NAME").val()=="") {
		jAlert("币种不允许为空！");
		return false;
	}
	if ($("#DQDATE").val()=="") {
		jAlert("到期日不允许为空！");
		return false;
	}
	if ($("#IAMOUNT_F").val()=="") {
		jAlert("金额不允许为空！");
		return false;
	}
	return true;
}








/**
 * 删除应付单信息
 */
function delVouch_pu() {
	if (confirm("真的要删除采购应付单吗？")){
		var data =  getVouch();
		$.ajax({
			url: "vouch!delete.action",
			type: 'post',
			data:data,
			dataType: "json",
			success: function(data){
				jAlert("采购应付单删除成功！","提示",function(){
					
					queryVouchList();
					lastvouch();
				});	
			}
		  });
		
	}

}

/**
 * 查找账套下的全部采购应付单
 */
//应付单主表对象列表
var apVouchList;
//应付单主个数
var apvouchSize;
//应付单当前张
var curPasPage ;

function queryVouchList() {
	$.ajax({
		url: "vouch!queryApVouchListByType.action?CVOUCHTYPE=" + CVOUCHTYPE,
		type: 'post',
		dataType: "json",
		 async:false,
		success: function(data){
			apVouchList = data.apVouchList;
			apvouchSize = apVouchList.length;
		}
	  });
}

/**
 * 根据应付单类型、应付单号码查找应付单主表
 * @param CPBVBILLTYPE
 * @param CPBVCODE
 */
function queryVouchByCode(CVOUCHTYPE, CVOUCHID) {
	
	$.ajax({
		url: "vouch!queryListByCode.action?CVOUCHTYPE=" + CVOUCHTYPE + "&CVOUCHID=" + CVOUCHID,
		type: 'post',
		dataType: "json",
		success: function(data){
			loadQueryVouchBill(data);
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
		   //汇率
	       $("#IEXCHRATE").val("1");
	       $("#IEXCHRATE").attr("disabled",true);
	}
	else {
	       $("#IEXCHRATE").val("");
	       $("#IEXCHRATE").attr("disabled",false);
	}
}


/**
 * 汇率失去焦点
 */
function exchRateBlur() {
	var curRate =  DoubleNullPtoc($("#IEXCHRATE").val());
	var curMoney =  DoubleNullPtoc($("#IAMOUNT_F").val());
	
	var benbiMiney = curRate * curMoney;
	$("#IAMOUNT").val(benbiMiney);
}


/**
 * 金额失去焦点
 */
function moneyBlur() {
	var curRate =  DoubleNullPtoc($("#IEXCHRATE").val());
	var curMoney =  DoubleNullPtoc($("#IAMOUNT_F").val());
	
	var benbiMiney = curRate * curMoney;
	$("#IAMOUNT").val(benbiMiney);
}

/**
 * 显示应付单主表信息
 * @param data
 */
function loadQueryVouchBill(data) {
	
	var curVouch = data.vouchList[0];
	//其他应付单主表id
	vouchid = curVouch.id;
	//其他应付单审核标志
	iflag = curVouch.iflag;
	
	//应收应付标志
	cflag = curVouch.CFLAG;
	
	
	
	//单据编号
	$("#CVOUCHID").val(curVouch.CVOUCHID);
	//对应单据     
	$("#CVOUCHID1").val(curVouch.CVOUCHID1);
	//单据日期
    $("#DVOUCHDATE").val(getStrDate(curVouch.DVOUCHDATE));
    //采购模块
    if (cflag=="AP") {
    	  //供应商
    	   var venCode = strNullProc(curVouch.CDWCODE);
    	   var venObj = getVendorByCode(venCode);
    	  	if (venObj!=null) {
    	  		$("#CDWCODE").val(venObj.cvenabbname);
    	  		$("#CDWCODE").attr("dbvalueId",venObj.id);
    	  	    
    	  	}
    	  	$("#CDWCODE").attr("dbvalue",venCode);
    	      
    }
    //销售模块
    else if (cflag=="AR") {
    	  //客户
    	   var venCode = strNullProc(curVouch.CDWCODE);
    	   var cusObj = getCustomerByCode(venCode);
    	  	if (cusObj!=null) {
    	  		$("#CDWCODE").val(cusObj.ccusabbname);
    	  		$("#CDWCODE").attr("dbvalueId",cusObj.id);
    	  	    
    	  	}
    	  	$("#CDWCODE").attr("dbvalue",venCode);
    	      
    }
    else {
    	  //供应商
    	   var venCode = strNullProc(curVouch.CDWCODE);
    	   var venObj = getVendorByCode(venCode);
    	  	if (venObj!=null) {
    	  		$("#CDWCODE").val(venObj.cvenabbname);
    	  		$("#CDWCODE").attr("dbvalueId",venObj.id);
    	  	    
    	  	}
    	  	$("#CDWCODE").attr("dbvalue",venCode);
    	      
    }
  

  	//科目
	var ccode = strNullProc(curVouch.CCODE);
	var codeObj = getCurCodeObj(ccode);
	if (codeObj!=null) {
		$("#CCODE").val(ccode + " " + codeObj.ccodeName);
	}
    $("#CCODE").attr("dbvalue",ccode);
    
     // 币种
    $("#CEXCH_NAME").val(curVouch.CEXCH_NAME);
	$("#CEXCH_NAME").attr("dbvalue",curVouch.CEXCH_NAME);
	
      //汇率
       $("#IEXCHRATE").val(curVouch.IEXCHRATE);
      //金额
      $("#IAMOUNT_F").val(curVouch.IAMOUNT_F);
      //本币金额
      $("#IAMOUNT").val(curVouch.IAMOUNT);
      $("#IAMOUNT").attr("disabled",true);
   
    //付款条件
    var paycontionCode = strNullProc(curVouch.CPAYCODE);
  	var paycontionObj = getPayContionByCode(paycontionCode);
  	if (paycontionObj!=null) {
  		$("#CPAYCODE").val(paycontionObj.cpayname);
  		$("#CPAYCODE").attr("dbvalueId",paycontionObj.id);

  	}
  	$("#CPAYCODE").attr("dbvalue",paycontionCode);
  		
     //部门
    var deptCode = strNullProc(curVouch.CDEPTCODE);
  	var departmentObj = getDepartmentByCode(deptCode);
  	if (departmentObj!=null) {
  		$("#CDEPTCODE").val(departmentObj.cdepname);
  		$("#CDEPTCODE").attr("dbvalueId",departmentObj.id);

  	}
      $("#CDEPTCODE").attr("dbvalue",deptCode);
  	
      
      //项目
       $("#CITEMCODE").val(curVouch.CITEMCODE);
     //数量
     $("#IAMOUNT_S").val(curVouch.IAMOUNT_S);

    //业务员
    var personCode = strNullProc(curVouch.CPERSON);
 	var personObj = getPersonByCode(personCode);
 	if (personObj!=null) {
 		$("#CPERSON").val(personObj.cpersonname);
  		$("#CPERSON").attr("dbvalueId",personObj.id);

 	}
 	$("#CPERSON").attr("dbvalue",personCode);
 		
      //摘要
      $("#CDIGEST").val(curVouch.CDIGEST);  
      //账期管理
     $("#ZQCODE").val(curVouch.ZQCODE)  ;
      
      //到期日
       $("#DQDATE").val(getStrDate(curVouch.DQDATE))  ;
      
      //录入人
       $("#COPERATOR").val(curVouch.COPERATOR); 
      
      //审核人
       $("#CCHECKMAN").val(curVouch.CCHECKMAN) ; //单据类型为付款单

    
     //显示子表信息
       var apVouchsList = data.vouchList[1];
    	showApVouchs(apVouchsList);
	
	
}


/**
 * 显示子表信息 及合计信息
 * @param saleBillVouchsList
 */
function showApVouchs(apVouchsList) {
	$("#datatable_bodyer").html("");
	var length = apVouchsList.length;
	for (var i = 0; i<length; i++) {
		var apVouchs = apVouchsList[i];
		
		//科目
		var ccode = strNullProc(apVouchs.CCODE);
		var codeObj = getCurCodeObj(ccode);
		var codeName = "";
		if (codeObj!=null) 
			codeName = codeObj.ccodeName;
		
		//部门
	    var deptCode = strNullProc(apVouchs.CDEPTCODE);
	    var deptcodeName = "";
	  	var departmentObj = getDepartmentByCode(deptCode);
	  	if (departmentObj!=null) 
	  		deptcodeName = departmentObj.cdepname;
	  
	  	//业务员 
	    var personCode = strNullProc(apVouchs.CPERSON);
	    var personName = "";
	 	var personObj = getPersonByCode(personCode);
	 	if (personObj!=null)
	 	 personName = personObj.cpersonname;
	 	
		$("#datatable_bodyer").append('<tr id="' +apVouchs.id  
			    +'" CLINK="' + apVouchs.CLINK
			+'"  bgcolor="#ffffff">'
			//序号
			+'<td style="width:20px;" >'+ "" + '</td>'
			
			//方向
			
			+'<td style="width:70px;" value=' + apVouchs.BD_C  +   ' >'+ apVouchs.BD_C + '</td>'
			
             //对应科目
			+'<td style="width:90px;" dbvalue=' + apVouchs.CCODE  +   ' >'+ codeName + '</td>'
			
			
			//原币金额
			+'<td style="width:80px;" >'+ DoubleNullPtoc(apVouchs.IAMOUNT_F) + '</td>'
			
			//汇率
			+'<td  style="width:60px;" >'+ DoubleNullPtoc(apVouchs.IEXCHRATE) + '</td>'
			
			//本币金额
			+'<td  style="width:120px;" >'+ DoubleNullPtoc(apVouchs.IAMOUNT)+ '</td>'
			
			//币种
			+'<td  style="width:70px;" dbvalue=' + apVouchs.CEXCH_NAME  +   ' >'+  strNullProc(apVouchs.CEXCH_NAME)+ '</td>'
			
			//部门
			+'<td  style="width:80px;" dbvalue=' + apVouchs.CDEPTCODE  +   ' >'+ deptcodeName + '</td>'
			
			//摘要
			+'<td  style="width:60px;" >'+ strNullProc(apVouchs.CDIGEST) + '</td>'
			
			//业务员
			+'<td  style="width:70px;"  dbvalue=' + apVouchs.CPERSON  +   ' >'+ personName + '</td>'
			
			//项目
			+'<td style="width:80px;" >'+  strNullProc(apVouchs.CITEMCODE) + '</td>'
		+'</tr>');
	 }

		//判断填充的数据行是否至少有7行（看起来是一个完整的表格）
		var tb = document.getElementById("datatable_bodyer");
		var rowLength = tb.rows.length;
		if (rowLength>=1)
			lastEditRow = tb.rows[rowLength*1-1];
		if(rowLength<7){
			for(var i=rowLength;i<7;i++){
				var newRow = tb.insertRow(i);
				for(var j=0;j<12;j++){
					newRow.insertCell(j);
				}
			}
		}
		currentAction = "update";
		cellEdition();
		
	
	//显示合计值
    //showSumTable();
	
}


/**
 * 显示合计值
 * @param sumIPBVQUANTITY 数量合计
 * @param sumIORIMONEY  原币金额合计
 * @param sumIORITAXPRICE 原币税额合计
 * @param sumIMONEY  本币金额合计
 * @param sumITAXPRICE 本币税额合计
 */
function showSumTable() {
	//数量合计
	var sumIPBVQUANTITY = 0.00;
	//原币金额合计
	var sumIORIMONEY = 0.00;
	//原币税额合计
	var sumIORITAXPRICE = 0.00;
	//本币金额合计
	var sumIMONEY = 0.00;
	//本币税额合计
	var sumITAXPRICE = 0.00;
	
	//遍历采购发票子表，得到数量、原币金额、原币税额、本币金额、本币税额合计值
	var tb = document.getElementById("datatable_bodyer");
	for(var i=0;i<tb.rows.length;i++){
		var row = tb.rows[i];
		//数量
		var curSl =  DoubleNullPtoc(row.cells[5].innerHTML);
		sumIPBVQUANTITY = sumIPBVQUANTITY + curSl;
		//原币金额
		var curIORIMONEY =  DoubleNullPtoc(row.cells[7].innerHTML);
		sumIORIMONEY = sumIORIMONEY + curIORIMONEY;
		//原币税额
		var curIORITAXPRICE =  DoubleNullPtoc(row.cells[8].innerHTML);
		sumIORITAXPRICE = sumIORITAXPRICE + curIORITAXPRICE;
		//本币金额
		var curIMONEY =  DoubleNullPtoc(row.cells[10].innerHTML);
		sumIMONEY = sumIMONEY + curIMONEY;
		//本币税额
		var curITAXPRICE =  DoubleNullPtoc(row.cells[11].innerHTML);
		sumITAXPRICE = sumITAXPRICE + curITAXPRICE;
	}
	
	//把合计值写入合计表格中
	var sumTable = document.getElementById("datatable_footer");
	sumTable.rows[0].cells[5].innerHTML  = sumIPBVQUANTITY;
	sumTable.rows[0].cells[7].innerHTML  = sumIORIMONEY;
	sumTable.rows[0].cells[8].innerHTML  = sumIORITAXPRICE;
	sumTable.rows[0].cells[10].innerHTML  = sumIMONEY;
	sumTable.rows[0].cells[11].innerHTML  = sumIMONEY;

}




/**
 * 首张应付单
 */
function firstvouch() {
	if (apvouchSize==0) return ;
	curPasPage = 0;
	var CVOUCHTYPE = apVouchList[curPasPage].CVOUCHTYPE;
	var CVOUCHID = apVouchList[curPasPage].CVOUCHID;
	queryVouchByCode(CVOUCHTYPE, CVOUCHID);
}

/**
 * 末张应付单
 */
function lastvouch() {
	if (apvouchSize==0) return ;

	curPasPage = apvouchSize*1-1;
	
	var CVOUCHTYPE = apVouchList[curPasPage].CVOUCHTYPE;
	var CVOUCHID = apVouchList[curPasPage].CVOUCHID;
	queryVouchByCode(CVOUCHTYPE, CVOUCHID);

	//有其他应付单时按钮状态变化
	if (apvouchSize>0) {
		 $("#addvouch").attr("disabled",false);
		 $("#upsvouch").attr("disabled",false);
		 $("#delvouch").attr("disabled",false);
		 $("#auditvouch").attr("disabled",false);
		 $("#addrowvouch").attr("disabled",false);
		 $("#delrowvouch").attr("disabled",false);
		 
			
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
function upvouch() {
	if (apvouchSize==0) return ;

	curPasPage --;
	//上一页时：当前页最小值为0
	if (curPasPage <= 0) 
		curPasPage = 0;
	var CVOUCHTYPE = apVouchList[curPasPage].CVOUCHTYPE;
	var CVOUCHID = apVouchList[curPasPage].CVOUCHID;
	queryVouchByCode(CVOUCHTYPE, CVOUCHID);

	
}

/**
 * 下张应付单
 */
function downvouch() {
	if (apvouchSize==0) return ;

	curPasPage ++;
	//下一页时：当前页不能大于全部页数
	if (curPasPage>=apvouchSize) 
		curPasPage = apvouchSize-1;
	var CVOUCHTYPE = apVouchList[curPasPage].CVOUCHTYPE;
	var CVOUCHID = apVouchList[curPasPage].CVOUCHID;
	queryVouchByCode(CVOUCHTYPE, CVOUCHID);
}

/**
 * 退出
 */
function exitvouch() {
	window.parent.closeWindow('ap_apvouch');
	
}
/**
 * 得到应付单信息信息
 */
function getVouch() {
	var data = 
		//单据类型
		"&apVouch.CVOUCHTYPE=" + CVOUCHTYPE
		//其他应付单主表id
		
		+ "&apVouch.id=" +  vouchid
		//其他应付单审核标志
		+ "&apVouch.iflag=" + iflag
		
		//应收应付标志
		+ "&apVouch.CFLAG=" + cflag
		
		//是否期初 录入应付单不为期初，值应为0
		+ "&apVouch.BSTARTFLAG=0"  


        //借贷方向
		+ "&apVouch.BD_C=" + bd_c 

			
		//单据编号
			+ "&apVouch.CVOUCHID=" + $("#CVOUCHID").val()
			//对应单据     
			+ "&apVouch.CVOUCHID1=" +$("#CVOUCHID1").val()
			//单据日期
		      + "&apVouch.DVOUCHDATE=" +$("#DVOUCHDATE").val()
		      //供应商
		      + "&apVouch.CDWCODE=" +$("#CDWCODE").attr("dbvalue")
		      + "&apVouch.csupId=" +$("#CDWCODE").attr("dbvalueId")
		      
		      //科目
		      + "&apVouch.CCODE=" +$("#CCODE").attr("dbvalue")
		      
		     // 币种
		      + "&apVouch.CEXCH_NAME=" +$("#CEXCH_NAME").attr("dbvalue")
		      + "&apVouch.cexchNameid=" +$("#CEXCH_NAME").attr("dbvalueId")
		      
		      //汇率
		      + "&apVouch.IEXCHRATE=" + $("#IEXCHRATE").val()
		      //原币金额
		      + "&apVouch.IAMOUNT_F=" +$("#IAMOUNT_F").val()
		      //本币金额
		      + "&apVouch.IAMOUNT=" + $("#IAMOUNT").val()
		      
		      //原币余额
		      + "&apVouch.IRAMOUNT_F=" +$("#IAMOUNT_F").val()
		      //本币余额
		      + "&apVouch.IRAMOUNT=" + $("#IAMOUNT").val()
		      
		      //付款条件
		      + "&apVouch.CPAYCODE=" + $("#CPAYCODE").attr("dbvalue")
		      + "&apVouch.csettleid=" +$("#CPAYCODE").attr("dbvalueId")
		      
		      //部门
		      + "&apVouch.CDEPTCODE=" + $("#CDEPTCODE").attr("dbvalue")
		      + "&apVouch.cdeptId=" +$("#CDEPTCODE").attr("dbvalueId")
		      
		      
		      //项目
		      + "&apVouch.CITEMCODE=" + $("#CITEMCODE").val()
		     //数量
		      + "&apVouch.IAMOUNT_S=" + $("#IAMOUNT_S").val()
		      //业务员
		      + "&apVouch.CPERSON=" + $("#CPERSON").attr("dbvalue")
		      + "&apVouch.cpersonId=" +$("#CPERSON").attr("dbvalueId")
		      
		      //摘要
		      + "&apVouch.CDIGEST=" + $("#CDIGEST").val()  
		      //账期管理
		      + "&apVouch.ZQCODE=" + $("#ZQCODE").val()  
		      
		      //到期日
		      + "&apVouch.DQDATE=" + $("#DQDATE").val()  
		      
		      //录入人
		      + "&apVouch.COPERATOR=" + $("#COPERATOR").val() 
		      
		      //审核人
		      + "&apVouch.CCHECKMAN=" + $("#CCHECKMAN").val() ; //单据类型为付款单
		      
		      
	return data;
}




//序列化更新了的行,获取子表数据
function serializableUpdatedRow(){

	var tb = document.getElementById("datatable_bodyer");
	var serStr = "";
	
	if(lastEditRow!=null){
		var c = 0;
		for(var i=0;i<tb.rows.length;i++){
			var rowStr = "";
			var row = tb.rows[i];
			var hasValue = false;
			for(var j=1;j<row.cells.length;j++){
				if(row.cells[j].innerHTML != "" && row.cells[j].innerHTML != null){
					hasValue = true;
				}
			}
			if(hasValue){
				//子表id
				var subid = row.getAttribute("id");
				if (strNullProc(subid)=="") subid="0";
				//CLINK即主表id
				var CLINK = row.getAttribute("CLINK");
				if (strNullProc(CLINK)=="") CLINK="0";
				
				//子表id
				rowStr += "&apVouchsList["+ c +"].id=" + subid;
				//PBVID即主表id
				rowStr += "&apVouchsList["+ c +"].CLINK=" + CLINK;
				
				
				var curBdc = strNullProc(row.cells[1].getAttribute("value"));
				if (curBdc=="") curBdc = "1";
				
				//原币金额
				sumSubIAMOUNT_F += DoubleNullPtoc(row.cells[3].innerHTML);
				
				
				//借贷方向
				rowStr += "&apVouchsList["+ c +"].BD_C=" + strNullProc(curBdc);
				//对应科目
				rowStr += "&apVouchsList["+ c +"].CCODE=" + row.cells[2].getAttribute("dbvalue");
				//原币金额
				rowStr += "&apVouchsList["+ c +"].IAMOUNT_F=" + DoubleNullPtoc(row.cells[3].innerHTML);
				//汇率
				rowStr += "&apVouchsList["+ c +"].IEXCHRATE=" + DoubleNullPtoc(row.cells[4].innerHTML);
				//本币金额
				rowStr += "&apVouchsList["+ c +"].IAMOUNT=" + DoubleNullPtoc(row.cells[5].innerHTML);
				//币种
				rowStr += "&apVouchsList["+ c +"].CEXCH_NAME=" + strNullProc(row.cells[6].innerHTML);
				//部门
				rowStr += "&apVouchsList["+ c +"].CDEPTCODE=" + strNullProc(row.cells[7].getAttribute("dbvalue"));
				//摘要
				rowStr += "&apVouchsList["+ c +"].CDIGEST=" + strNullProc(row.cells[8].getAttribute("dbvalue"));
				//业务员
				rowStr += "&apVouchsList["+ c +"].CPERSON=" + strNullProc(row.cells[9].getAttribute("dbvalue"));
				//项目
				rowStr += "&apVouchsList["+ c +"].CITEMCODE=" + strNullProc(row.cells[10].innerHTML);
				
				
				
				serStr += rowStr;
				c++;
			}
			
			
		}
		
		
	}
	return serStr;
	
}

/**
 * 修改时按钮初始化
 */
function showUpsvouchButton_pu() {
	$("#addvouch").attr("disabled",true);
	 $("#upsvouch").attr("disabled",true);
	 $("#delvouch").attr("disabled",true);
	 
	 $("#savevouch").attr("disabled",false);
	 $("#abortvouch").attr("disabled",false);
	 $("#auditvouch").attr("disabled",true);
	 $("#cancelauditvouch").attr("disabled",true);
	 
	 $("#addrowvouch").attr("disabled",true);
	 $("#delrowvouch").attr("disabled",true);
	
		
	 $("#firstvouch").attr("disabled",true);
	 $("#upvouch").attr("disabled",true);
	 $("#downvouch").attr("disabled",true);
	 $("#lastvouch").attr("disabled",true);
	 $("#copyvouch").attr("disabled",true);
	 $("#refreshvouch").attr("disabled",true);
		 
	 $("#topTextBoxContainer").find(".querybox").removeAttr("disabled");
}

/**
 * 增加其他应付单
 */
function addVouch() {
	 //结算单初始化
	//获取结算单号
	var vouchid = "";
	$.ajax({
		url: "vouch!queryApouchidByType.action?CVOUCHTYPE=" + CVOUCHTYPE,
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
	//增加时iflag=0
	iflag=0;
	
	
	//其他应付单主表清空
	//对应单据     
	$("#CVOUCHID1").val("");
	//单据日期
    $("#DVOUCHDATE").val("");
      //供应商
    $("#CDWCODE").attr("dbvalue","");
    $("#CDWCODE").attr("dbvalueId","");
    
    $("#CDWCODE").val("");
      //科目
    $("#CCODE").attr("dbvalue","");
    $("#CCODE").val("");
     // 币种
    $("#CEXCH_NAME").attr("dbvalue","");
    $("#CEXCH_NAME").attr("dbvalueId","");
    
    $("#CEXCH_NAME").val("");
      //金额
    $("#IAMOUNT_F").val("");
      //本币金额
    $("#IAMOUNT").val("");
      //付款条件
    $("#CPAYCODE").attr("dbvalue","");
    $("#CPAYCODE").attr("dbvalueId","");
    
    $("#CPAYCODE").val("");
      //部门
    $("#CDEPTCODE").attr("dbvalue","");
    $("#CDEPTCODE").attr("dbvalueId","");
    
    $("#CDEPTCODE").val(""); 
      //项目
    $("#CITEMCODE").val("");
     //数量
    $("#IAMOUNT_S").val("");
      //业务员
    $("#CPERSON").attr("dbvalue","");
    $("#CPERSON").attr("dbvalueId","");
    
    $("#CPERSON").val("");  
      //摘要
    $("#CDIGEST").val("");  
      //账期管理
    $("#ZQCODE").val(""); 
      
      //到期日
     $("#DQDATE").val("")  ;
      
      //录入人
    $("#COPERATOR").val(""); 
      
      //审核人
    $("#CCHECKMAN").val("") ; //单据类型为付款单
	
  //汇率默认为1
	//汇率默认为1，不可修改
	 $("#IEXCHRATE").val("1");
	 $("#IEXCHRATE").attr("disabled",true);
	 
	//子表清空
    //初始化子表信息
	
	var tb = document.getElementById("datatable_bodyer");
	for(var i=0;i<tb.rows.length;i++){
		var row = tb.rows[i];
		for(var j=1;j<row.cells.length;j++){
				row.cells[j].innerHTML = "";
				row.cells[j].setAttribute("dbvalue","0");
			}
	}
    
	
	
		
}

/**
 * 增加时按钮初始化
 */
function showAddvouchButton_pu() {
	
	//按钮初始化
	$("#IEXCHRATE").attr("disabled",true);
	
	 $("#addvouch").attr("disabled",true);
	 $("#upsvouch").attr("disabled",true);
	 $("#delvouch").attr("disabled",true);
	 
	 $("#savevouch").attr("disabled",false);
	 $("#abortvouch").attr("disabled",false);
	 $("#auditvouch").attr("disabled",true);
	 $("#cancelauditvouch").attr("disabled",true);
	 
	 $("#addrowvouch").attr("disabled",false);
	 $("#delrowvouch").attr("disabled",false);
	
		
	 $("#firstvouch").attr("disabled",true);
	 $("#upvouch").attr("disabled",true);
	 $("#downvouch").attr("disabled",true);
	 $("#lastvouch").attr("disabled",true);
	 $("#copyvouch").attr("disabled",true);
	 $("#refreshvouch").attr("disabled",true);
		 
	 $("#topTextBoxContainer").find(".querybox").removeAttr("disabled");
	 addVouch();

}


