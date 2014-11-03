
/**
 * 
 * @DESCRIBE   销售发票js
 * @AUTHOR     王丙建
 * @DATE       2013-03-11
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


/**
 * 销售发票页面初始化
 */

//设置发票类型
var CVOUCHTYPE = "26";
//当前税率默认为17%
var curTaxRate = 17.00;
//发票方向 默认为正，红字为负
var fpfangxiang = 0;
function setCVOUCHTYPE(obj) {
	addSaInvoice();
	CVOUCHTYPE = obj;
	initPage(CVOUCHTYPE);
}

/**
 * 销售发票页面初始化
 */
$(document).ready(function(){
	initPage();
	//初始化单位基本信息
	queryUnitInfo();
	querySaList();
	lastSale();
	// 如果有记录，复核按钮可用
	if (saleBillSize>0) {
		$("#auditSa").attr("disabled",false);	
	}
	else {
		$("#auditSa").attr("disabled",true);	
	}
	
});

/**
 * 查询单位基本信息
 */
function  queryUnitInfo() {
	var unitInfo = null;
	$.ajax({
		url: "saleBill!queryUnitInfo.action",
		type: 'post',
		async:false,
		dataType: "json",
		success: function(data){
			unitInfo = data.unitInfo;
		}
	  });
	//alert(unitInfo.unitBank + "\t" + unitInfo.unitBankZh);
	if (unitInfo!=null) {
		//单位名称
		$("#dwmc").val(unitInfo.unitName);
		
		//单位银行
		$("#khh").val(unitInfo.unitBank);
		
		//单位账户
		$("#dwzh").val(unitInfo.unitBankZh);
		
		//制单人
		$("#zdr").val(unitInfo.operName);
		
	}
}

/**
 * 初始化页面
 */
function initPage(curVouchType) {
	
	if (curVouchType=="37") {
		CVOUCHTYPE = "27";
		$("#putTitleName").html("销售普通发票");
		$("#putTitleName").removeClass("colblack");
		$("#putTitleName").addClass("colred");
		fpfangxiang = 1;
	}
	else if (curVouchType=="36") {
		CVOUCHTYPE = "26";
		$("#putTitleName").html("销售专用发票");
		$("#putTitleName").removeClass("colblack");
		$("#putTitleName").addClass("colred");
		fpfangxiang = 1;

	}
	else if (curVouchType=="27") {
		CVOUCHTYPE = "27";
		$("#putTitleName").html("销售普通发票");
		$("#putTitleName").removeClass("colred");
		$("#putTitleName").addClass("colblack");
		fpfangxiang = 0;

	}
	else if (curVouchType=="26") {
		CVOUCHTYPE = "26";
		$("#putTitleName").html("销售专用发票");
		$("#putTitleName").removeClass("colred");
		$("#putTitleName").addClass("colblack");

	}
	
	//发票号
	var csbvcode = "";
	$.ajax({
		url: "saleBill!querySavouchid.action?cvouchtype=" + curVouchType,
		type: 'post',
		dataType: "json",
		async:false,
		success: function(data){
			csbvcode = data.csbvcode;
		}
	  });
	$("#CSBVCODE").val(csbvcode);
	//开票日期
	//初始化日期选择框为当天日期
	var curDate = new Date();
	var strCurDate = curDate.format("yyyy-MM-dd");
	$("#DDATE").val(strCurDate);
	
	//客户地址
	$("#khdz").attr("readonly","readonly");
	$("#khdz").css("background-color","#D4D0C8");
	//开户银行
	$("#CBCODE").attr("readonly","readonly");
	$("#CBCODE").css("background-color","#D4D0C8");
	//银行账号
	$("#yhzh").attr("readonly","readonly");
	$("#yhzh").css("background-color","#D4D0C8");
	
	//单位名称
	$("#dwmc").attr("readonly","readonly");
	$("#dwmc").css("background-color","#D4D0C8");
	
	//开户银
	$("#khh").attr("readonly","readonly");
	$("#khh").css("background-color","#D4D0C8");
	
	//单位账户
	$("#dwzh").attr("readonly","readonly");
	$("#dwzh").css("background-color","#D4D0C8");
	
	//制单人
	$("#zdr").attr("readonly","readonly");
	$("#zdr").css("background-color","#D4D0C8");
	
	//审核人
	$("#shr").attr("readonly","readonly");
	$("#shr").css("background-color","#D4D0C8");
	
	//复核人
	$("#CCHECKER").attr("readonly","readonly");
	$("#CCHECKER").css("background-color","#D4D0C8");
	
	//审核日期
	$("#shrq").attr("readonly","readonly");
	$("#shrq").css("background-color","#D4D0C8");
	
	//发货单号
	$("#fhdh").attr("readonly","readonly");
	$("#fhdh").css("background-color","#D4D0C8");
	//记账人
	$("#CACCOUNTER").attr("readonly","readonly");
	$("#CACCOUNTER").css("background-color","#D4D0C8");
	
	

}


//发票id
var savouchid = null;
//发票审核标志
var iflag = null;

/**
 * 保存操作
 */
function savesaleBill() {
	if (checkSave()==false) {
		return ;
	}
	//获取主表信息
	var saleBillVouch = getsaleBillvouchInfo();
		//获取子表信息
	var saleBillVouchsList = serializableUpdatedRow();
	var data = saleBillVouch 
		  + "&saleBillVouch.IAMOUNT=" + sumMoney
		  + saleBillVouchsList;
	alert("data:" + data);
	if (currentAction=="add") {
		$.ajax({
			url: "saleBill!create.action",
			type: 'post',
			data:data,
			async:false,
			dataType: "json",
			success: function(data){
				alert("销售发票添加成功！");	
			}
		  });
		}
	else {
		$.ajax({
			url: "saleBill!update.action",
			type: 'post',
			data:data,
			async:false,
			dataType: "json",
			success: function(data){
				alert("销售发票修改成功！");	
			}
		  });
	}
	showAbortSaButton();
	
	
}

/**
 * 保存前校验
 */
function checkSave() {
	if ($("#CSTCODE").val()=="") {
		alert("销售类型不允许为空！");
		return false;
	}
	if ($("#CSBVCODE").val()=="") {
		alert("发票号不允许为空！");
		return false;
	}
	if ($("#DDATE").val()=="") {
		alert("开票日期不允许为空！");
		return false;
	}
	if ($("#CCUSCODE").val()=="") {
		alert("客户名称不允许为空！");
		return false;
	}
	if ($("#CDEPCODE").val()=="") {
		alert("销售部门不允许为空！");
		return false;
	}
	if ($("#DQDATE").val()=="") {
		alert("到期日不允许为空！");
		return false;
	}
	return true;
}




/**
 * 修改销售发票
 */
function updateSaBill() {
	showAddSaButton();
	currentAction=="update";
	//初始化各查询文本框状态
	$("#topTextBoxContainer").find(".querybox").attr("disabled",false);
	$("#CPBVBILLTYPE").attr("disabled",false);
	$("#CORDERCODE").attr("disabled","disabled");

}

/**
 * 删除销售发票
 */
function delSaBill() {
	if (confirm("真的要删除销售发票吗？")){
		var data = getsaleBillvouchInfo();
		$.ajax({
			url: "saleBill!delete.action",
			type: 'post',
			data:data,
			async:false,
			dataType: "json",
			success: function(data){
				alert("销售发票删除成功！");	
			}
		  });
		
	}

}

/**
 * 查找账套下的全部销售发票
 */
//销售发票主表对象列表
var saleBillList;
//销售发票主比哦啊总个数
var saleBillSize;
//发票当前张
var curPurPage ;
function querySaList() {
	$.ajax({
		url: "saleBill!queryList.action",
		type: 'post',
		dataType: "json",
		async:false,
		success: function(data){
			saleBillList = data.saleBillVouchList;
			
			saleBillSize = saleBillList.length;
			
		}
	  });
}

/**
 * 根据发票类型、发票号码查找发票主表
 * @param CPBVBILLTYPE
 * @param CPBVCODE
 */
function querysaleBillByCode(selCVOUCHTYPE, selCSBVCODE) {
	
	$.ajax({
		url: "saleBill!queryListByCode.action?CVOUCHTYPE=" + selCVOUCHTYPE + "&CSBVCODE=" + selCSBVCODE,
		type: 'post',
		dataType: "json",
		async:false,
		success: function(data){
			loadQuyeysaleBill(data);
		}
	  });
}

/**
 * 显示满足条件的销售发票信息
 * @param data
 */
function loadQuyeysaleBill(data) {
	/**
	 * 显示主表信息
	 */
	var saleBillVouch = data.saleBillList[0];
	
	//发票主表id
	savouchid = saleBillVouch.id;
	//发票审核标志
	iflag = saleBillVouch.iflag;
	//发票方向
	fpfangxiang = saleBillVouch.BRETURNFLAG;

	
	//销售类型
	$("#CSTCODE").val(saleBillVouch.CSTCODE);
	
	//订单号
	$("#CSOCODE").val(saleBillVouch.CSOCODE);
	//发票号
	$("#CSBVCODE").val(saleBillVouch.CSBVCODE);
	//开票日期
	$("#DDATE").val(getStrDate(saleBillVouch.DDATE));
	//客户名称
	var ccusCode = strNullProc(saleBillVouch.CCUSCODE);
	var cusObj = getCustomerByCode(ccusCode);
	if (cusObj!=null) {
		$("#CCUSCODE").val(cusObj.ccusabbname);
		$("#CCUSCODE").attr("dbvalueId",cusObj.id);
		//客户地址
		$("#khdz").val(strNullProc(cusObj.ccusaddress));
		//开户银行
		$("#CBCODE").val(strNullProc(cusObj.ccusbank));
		//银行账号
		$("#yhzh").val(strNullProc(cusObj.ccusaccount));
	}
	$("#CCUSCODE").attr("dbvalue",ccusCode);
	
	//销售部门
	var deptCode = strNullProc(saleBillVouch.CDEPCODE);
	var departmentObj = getDepartmentByCode(deptCode);
	if (departmentObj!=null) {
		$("#CDEPCODE").val(departmentObj.cdepname);
		$("#CDEPCODE").attr("dbvalueId",departmentObj.id);
		
	}
    $("#CDEPCODE").attr("dbvalue",deptCode);
  
	
	//业务员
	var personCode = strNullProc(saleBillVouch.CPERSONCODE);
	var personObj = getPersonByCode(personCode);
	if (personObj!=null) {
		$("#CPERSONCODE").val(personObj.cpersonname);
		$("#CPERSONCODE").attr("dbvalueId",personObj.id);

	}
	$("#CPERSONCODE").attr("dbvalue",personCode);

	
	//付款条件
	var paycontionCode = strNullProc(saleBillVouch.CPAYCODE);
	var paycontionObj = getPayContionByCode(paycontionCode);
	if (paycontionObj!=null) {
		$("#CPAYCODE").val(paycontionObj.cpayname);
		$("#CPAYCODE").attr("dbvalueId",paycontionObj.id);

	}
	$("#CPAYCODE").attr("dbvalue",paycontionCode);
	
	
	//备注
	 $("#CMEMO").val(saleBillVouch.CMEMO);
	 
	//账期管理
	 $("#ZQCODE").val(saleBillVouch.ZQCODE);
	
	 
	//到期日
    $("#DQDATE").val(getStrDate(saleBillVouch.DQDATE));
	
    var curChecker =  strNullProc(saleBillVouch.CVERIFIER);
	//没有复核记录
	if (curChecker=="") {
		document.getElementById("auditImg").style.display = "none";
		$("#auditPur").val("复核");
		showCancelAdutSaButton();
	}
	//复核记录
	else {
		document.getElementById("auditImg").style.display = "block";
		$("#auditPur").val("弃复");
		showAdutSaButton();
	}
	
	
	
	
	//显示子表信息
	var saleBillVouchsList = data.saleBillList[1];
		
	showSaBillVouchs(saleBillVouchsList);
	
}



/**
 * 显示子表信息 
 * @param saleBillVouchsList
 */
function showSaBillVouchs(saleBillVouchsList) {
	$("#datatable_bodyer").html("");
	var length = saleBillVouchsList.length;
	for (var i = 0; i<length; i++) {
		var curBillVouchs = saleBillVouchsList[i];
		
		//根据存货编码获取存货的名称、规格型号、计量单位
		//存货编码
		var curCode = curBillVouchs.CINVCODE;
		
		//存货名称
		var curName = "";
		//规格型号
		var curType = "";
		//计量单位
		var curUnit = "";
		var inventory = getInventoryByCode(curCode);
		if (inventory!=null) {
			//存货名称
			curName= strNullProc(inventory.cinvname);
			//规格型号
			curType= strNullProc(inventory.cinvstd);
			//计量单位
			curUnit= strNullProc(inventory.cinvmUnit);
		}
		$("#datatable_bodyer").append('<tr id="' +curBillVouchs.id  
			    +'" SBVID="' + curBillVouchs.SBVID
			+'"  bgcolor="#ffffff">'
			//序号
			+'<td style="width:20px;" >'+ "" + '</td>'
			
			//仓库编码
			//增加弹出选择属性
			+'<td style="width:70px;" dbvalue=' + curCode  +   ' >'+ curBillVouchs.CWHCODE + '</td>'
			
			//货物名称
			+'<td style="width:90px;" dbvalue=' + curCode  +   '>'+ curName+ '</td>'
			//规格型号
			+'<td style="width:80px;" >'+ curType+ '</td>'
			//计量单位
			+'<td style="width:60px;" >'+ curUnit+ '</td>'
			
			//数量
			+'<td style="width:60px;" >'+ curBillVouchs.IQUANTITY + '</td>'
			
			//含税单价
			+'<td  style="width:70px;" >'+ curBillVouchs.ITAXUNITPRICE + '</td>'
			
			//价税合计
			+'<td  style="width:80px;" >'+ curBillVouchs.ISUM+ '</td>'
			
			//报价
			+'<td  style="width:60px;" >'+ curBillVouchs.IQUOTEDPRICE+ '</td>'
			
			//报价
			+'<td  style="width:60px;" >'+ curBillVouchs.IQUOTEDPRICE+ '</td>'
		
			
			//折扣额
			+'<td  style="width:70px;">'+ curBillVouchs.IDISCOUNT + '</td>'
			
			//扣率
			+'<td  style="width:80px;" >'+ curBillVouchs.KL + '</td>'
			
			//退补标志
			+'<td  style="width:60px;" >'+ curBillVouchs.ITB + '</td>'
			
			//失效日期
			+'<td  style="width:60px;" >'+ getStrDate(curBillVouchs.DVDATE) + '</td>'
			//税率
			+'<td  style="width:60px;" >'+ curBillVouchs.ITAXRATE + '</td>'
			//扣率2
			+'<td style="width:60px;" >'+  curBillVouchs.KL2 + '</td>'
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
			for(var j=0;j<16;j++){
				newRow.insertCell(j);
			}
		}
	}
	currentAction = "update";
	cellEdition();
	//显示合计值
	showSumTable();
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
 * 初始化销售发票录入框
 */
function initSa() {
	
	//增加按钮初始化
	showAddSaButton();
	
	//销售类型
	$("#CSTCODE").val("");
	
	//订单号
	$("#CSOCODE").val("");
	//发票号
	$("#CSBVCODE").val("");
	//开票日期
	$("#DDATE").val("");
	//客户名称
	$("#CCUSCODE").val("");
	$("#CDEPCODE").attr("dbvalueId","");
	
	//客户地址
	$("#khdz").val("");
	//开户银行
	$("#CBCODE").val("");
	//银行账号
	$("#yhzh").val("");

	
	//销售部门
	$("#CDEPCODE").val("");
	$("#CDEPCODE").attr("dbvalue","");
	$("#CDEPCODE").attr("dbvalueId","");
	
	//业务员
	$("#CPERSONCODE").val("");
	$("#CPERSONCODE").attr("dbvalue","");
	$("#CPERSONCODE").attr("dbvalueId","");
	
	//付款条件
	$("#CPAYCODE").val("");
	$("#CPAYCODE").attr("dbvalue","");
	$("#CPAYCODE").attr("dbvalueId","");
	
	//备注
	 $("#CMEMO").val("");
	//到期日
    $("#DQDATE").val("");
  //账期管理
	$("#ZQCODE").val("");
	

	
	//初始化子表信息
	
	var tb = document.getElementById("datatable_bodyer");
	for(var i=0;i<tb.rows.length;i++){
		var row = tb.rows[i];
		for(var j=1;j<row.cells.length;j++){
				row.cells[j].innerHTML = "";
				row.cells[j].setAttribute("dbvalue","0");
			}
	}
	
	currentAction = "add";
	cellEdition();
}






/**
 * 首张发票
 */
function firstSale() {
	if (saleBillList.length==0) return;
	curPurPage = 0;
	var CVOUCHTYPE = saleBillList[curPurPage].CVOUCHTYPE;
	var CSBVCODE = saleBillList[curPurPage].CSBVCODE;
	querysaleBillByCode(CVOUCHTYPE, CSBVCODE);
}

/**
 * 末张发票
 */
function lastSale() {
	if (saleBillList.length==0) return;
	curPurPage = saleBillSize-1*1;
	var CVOUCHTYPE = saleBillList[curPurPage].CVOUCHTYPE;
	var CSBVCODE = saleBillList[curPurPage].CSBVCODE;
	querysaleBillByCode(CVOUCHTYPE, CSBVCODE);

}

/**
 * 上张发票
 */
function upSale() {
	if (saleBillList.length==0) return;
	curPurPage --;
	//上一页时：当前页最小值为0
	if (curPurPage <= 0) 
		curPurPage = 0;
	
	var CVOUCHTYPE = saleBillList[curPurPage].CVOUCHTYPE;
	var CSBVCODE = saleBillList[curPurPage].CSBVCODE;
	querysaleBillByCode(CVOUCHTYPE, CSBVCODE);
	
}

/**
 * 下张发票
 */
function downSale() {
	if (saleBillList.length==0) return;
	curPurPage ++;
	//下一页时：当前页不能大于全部页数
	if (curPurPage>=saleBillSize) 
		curPurPage = saleBillSize-1*1;
	
	var CVOUCHTYPE = saleBillList[curPurPage].CVOUCHTYPE;
	var CSBVCODE = saleBillList[curPurPage].CSBVCODE;
	querysaleBillByCode(CVOUCHTYPE, CSBVCODE);
}

/**
 * 复核采购发票
 */
function auditSa() {
	var CVOUCHTYPE = saleBillList[curPurPage].CVOUCHTYPE;
	var CSBVCODE = saleBillList[curPurPage].CSBVCODE;
	var auditName = $("#auditSa").val();
	//复核
	if (auditName=="复核") {
		
		$.ajax({
			url: "saleBill!auditSa.action?cvouchtype=" + CVOUCHTYPE + "&csbvcode=" + CSBVCODE,
			type: 'post',
			dataType: "json",
			async:false,    
			success: function(data){
				document.getElementById("auditImg").style.display = "block";
				$("#auditSa").val("弃复");
			}
		  });	
	}
	//弃复
	else {
		var CVOUCHTYPE = saleBillList[curPurPage].CVOUCHTYPE;
		var CSBVCODE = saleBillList[curPurPage].CSBVCODE;
		
		$.ajax({
			url: "saleBill!auditCancelSa.action?cvouchtype=" + CVOUCHTYPE + "&csbvcode=" + CSBVCODE,
			type: 'post',
			dataType: "json",
			async:false,
			success: function(data){    
			
				document.getElementById("auditImg").style.display = "none";
				$("#auditSa").val("复核");
			}
		  });
	}
	
}





/**
 * 退出
 */
function exitSale() {
	window.parent.closeWindow('sa_invoice_invoice');
	
}
/**
 * 得到销售发票信息
 */
function getsaleBillvouchInfo() {
	//销售类型
	var data = "saleBillVouch.CSTCODE=" + $("#CSTCODE").val()
	 //发票 类型
	+ "&saleBillVouch.CVOUCHTYPE=" + CVOUCHTYPE
	
	 //发票 类型
	+ "&saleBillVouch.BRETURNFLAG=" + fpfangxiang

	
	//订单号
	+ "&saleBillVouch.CSOCODE=" +$("#CSOCODE").val()
	//发票号
	+ "&saleBillVouch.CSBVCODE=" +$("#CSBVCODE").val()
	//开票日期
	+ "&saleBillVouch.DDATE=" +getStrDate($("#DDATE").val())
	//客户名称
	+ "&saleBillVouch.CCUSCODE=" +$("#CCUSCODE").attr("dbvalue")
	+ "&saleBillVouch.ccusId=" +$("#CCUSCODE").attr("dbvalueId")
		      
	 //销售部门
	+ "&saleBillVouch.CDEPCODE=" + $("#CDEPCODE").attr("dbvalue")
	+ "&saleBillVouch.cdeptId=" +$("#CDEPCODE").attr("dbvalueId")
		      
	//业务员
	+ "&saleBillVouch.CPERSONCODE=" + $("#CPERSONCODE").attr("dbvalue")
	+ "&saleBillVouch.cpersonId=" +$("#CCUSCODE").attr("dbvalueId")
		      
	 //付款条件
	 + "&saleBillVouch.CPAYCODE=" + $("#CPAYCODE").attr("dbvalue")
	 + "&saleBillVouch.csettleid=" +$("#CPAYCODE").attr("dbvalueId")
		      
	  //备注
	 + "&saleBillVouch.CMEMO=" + $("#CMEMO").val()
	 //账期管理
	 + "&saleBillVouch.ZQCODE=" + $("#ZQCODE").val()
	//到期日
    + "&saleBillVouch.DQDATE=" + $("#DQDATE").val();

		      
	return data;
}




//序列化更新了的行,获取子表数据
//子表金额合计值
var sumMoney = 0;
//子表税额合计值
var sumTaxMoney = 0;
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
				//PBVID即主表id
				var SBVID = row.getAttribute("SBVID");
				//pbvid不为空，从id、pbvid属性中获取主表id，子表id，更新此条子表记录；如果为空，新增此条子表记录
				if (strNullProc(SBVID)!="") {
					//子表id
					rowStr += "&saleBillVouchsList["+ c +"].id=" + subid;
					//PBVID即主表id
					rowStr += "&saleBillVouchsList["+ c +"].SBVID=" + SBVID;
				}
				
				//本币金额合计值
				sumMoney = sumMoney + DoubleNullPtoc(row.cells[10].innerHTML);
			    //本币税额合计值
				sumTaxMoney = sumTaxMoney + DoubleNullPtoc(row.cells[11].innerHTML);
				
				//仓库
				rowStr += "&saleBillVouchsList["+ c +"].CWHCODE=" + row.cells[1].innerHTML;
				//货物编码
				
				rowStr += "&saleBillVouchsList["+ c +"].CINVCODE=" + row.cells[2].getAttribute("dbValue");
				//规格型号
				//rowStr += "&saleBillVouchsList["+ c +"].IORICOST=" + row.cells[3].innerHTML;
				//计量单位
				//rowStr += "&saleBillVouchsList["+ c +"].CINVCODE=" + row.cells[4].innerHTML;
				//数量
				rowStr += "&saleBillVouchsList["+ c +"].IQUANTITY=" + DoubleNullPtoc(row.cells[5].innerHTML);
				//含税单价
				rowStr += "&saleBillVouchsList["+ c +"].ITAXUNITPRICE=" + DoubleNullPtoc(row.cells[6].innerHTML);
				//价税合计
				rowStr += "&saleBillVouchsList["+ c +"].ISUM=" + DoubleNullPtoc(row.cells[7].innerHTML);
				//报价
				rowStr += "&saleBillVouchsList["+ c +"].IQUOTEDPRICE=" + DoubleNullPtoc(row.cells[8].innerHTML);
				//折扣额
				rowStr += "&saleBillVouchsList["+ c +"].IDISCOUNT=" + DoubleNullPtoc(row.cells[9].innerHTML);
				//批号
				rowStr += "&saleBillVouchsList["+ c +"].CBATCH=" + DoubleNullPtoc(row.cells[10].innerHTML);
				//扣率
				rowStr += "&saleBillVouchsList["+ c +"].KL=" + DoubleNullPtoc(row.cells[11].innerHTML);
			 	//退补标志
				rowStr += "&saleBillVouchsList["+ c +"].ITB=" + DoubleNullPtoc(row.cells[12].innerHTML);
			 	//失效日期
				rowStr += "&saleBillVouchsList["+ c +"].DVDATE=" + getStrDate(row.cells[13].innerHTML);
			 	//税率
				rowStr += "&saleBillVouchsList["+ c +"].ITAXRATE=" + DoubleNullPtoc(row.cells[14].innerHTML);
			 	//扣率2
				rowStr += "&saleBillVouchsList["+ c +"].KL2=" + DoubleNullPtoc(row.cells[15].innerHTML);
				
				serStr += rowStr;
				c++;
			}
			
			
		}
		
		
	}
	return serStr;
	
}

//开始按钮操作

/**
 * 复核时功能按钮初始化
 */
function showAdutSaButton() {
	 $("#upsSa").attr("disabled",true);
	 $("#delSa").attr("disabled",true);
	 $("#saveSa").attr("disabled",true);
	 $("#abortSa").attr("disabled",true);
	 $("#addrowSa").attr("disabled",true);
	 $("#delrowSa").attr("disabled",true);
	 
	 $("#locationSa").attr("disabled",false);
	 $("#firstSa").attr("disabled",false);
	 $("#upSa").attr("disabled",false);
	 $("#downSa").attr("disabled",false);
	 $("#lastSa").attr("disabled",false);
	 $("#refreshSa").attr("disabled",false);
		 
	 $("#transSa").attr("disabled",false);
	 $("#transSa1").attr("disabled",false);
	 $("#querySa").attr("disabled",false);
	 $("#querySa1").attr("disabled",false);
}



/**
 * 复核时功能按钮初始化
 */
function showCancelAdutSaButton() {
	 $("#upsSa").attr("disabled",false);
	 $("#delSa").attr("disabled",false);
	 $("#saveSa").attr("disabled",true);
	 $("#abortSa").attr("disabled",true);
	 $("#addrowSa").attr("disabled",true);
	 $("#delrowSa").attr("disabled",true);
	 
	 $("#locationSa").attr("disabled",false);
	 $("#firstSa").attr("disabled",false);
	 $("#upSa").attr("disabled",false);
	 $("#downSa").attr("disabled",false);
	 $("#lastSa").attr("disabled",false);
	 $("#refreshSa").attr("disabled",false);
		 
	 $("#transSa").attr("disabled",false);
	 $("#transSa1").attr("disabled",false);
	 $("#querySa").attr("disabled",false);
	 $("#querySa1").attr("disabled",false);
}

/**
 * 增加时按钮初始化
 */
function showAddSaButton() {
	 $("#addSa").attr("disabled",true);
	 $("#addSa1").attr("disabled",true);
	 $("#upsSa").attr("disabled",true);
	 $("#delSa").attr("disabled",true);
	 
	 $("#saveSa").attr("disabled",false);
	 $("#abortSa").attr("disabled",false);
	 $("#addrowSa").attr("disabled",false);
	 $("#delrowSa").attr("disabled",false);
	
	 $("#auditSa").attr("disabled",true);
	 $("#auditSa").val("复核");
    document.getElementById("auditImg").style.display = "none";
		
	 $("#locationSa").attr("disabled",true);
	 $("#firstSa").attr("disabled",true);
	 $("#upSa").attr("disabled",true);
	 $("#downSa").attr("disabled",true);
	 $("#lastSa").attr("disabled",true);
	 $("#refreshSa").attr("disabled",true);
		 
	 $("#transSa").attr("disabled",true);
	 $("#transSa1").attr("disabled",true);
	 $("#querySa").attr("disabled",true);
	 $("#querySa1").attr("disabled",true);
}


/**
 * 放弃时按钮初始化
 */
function showAbortSaButton() {
	 $("#addSa").attr("disabled",false);
	 $("#addSa1").attr("disabled",false);
	 $("#upsSa").attr("disabled",false);
	 $("#delSa").attr("disabled",false);
	 
	 $("#saveSa").attr("disabled",true);
	 $("#abortSa").attr("disabled",true);
	 $("#addrowSa").attr("disabled",true);
	 $("#delrowSa").attr("disabled",true);
	
	 $("#auditSa").attr("disabled",false);
	 
	 $("#locationSa").attr("disabled",false);
	 $("#firstSa").attr("disabled",false);
	 $("#upSa").attr("disabled",false);
	 $("#downSa").attr("disabled",false);
	 $("#lastSa").attr("disabled",false);
	 $("#refreshSa").attr("disabled",false);
		 
	 $("#transSa").attr("disabled",false);
	 $("#transSa1").attr("disabled",false);
	 $("#querySa").attr("disabled",false);
	 $("#querySa1").attr("disabled",false);
}

/**
 * 放弃操作
 */
function abortSaBill() {
	
	 showAbortSaButton();
}



