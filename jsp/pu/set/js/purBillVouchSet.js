
/**
 * 
 * @DESCRIBE   采购发票期初设置js
 * @AUTHOR     王丙建
 * @DATE       2013-08-22
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

var curApDetailId = null;

var currentAction = "default";
var formType = "";
var formFx = "";
/**
 * 采购发票页面初始化
 */
$(document).ready(function(){
	var valueObject = window.parent.valueMap.get("pu_set_invoice_set");
	formType = valueObject.formType;
	formFx = valueObject.formFx;
	CVOUCHTYPE = formType;
	//alert("单据类型：" + formType + "\t单据方向：" + formFx);

	pageInit_Set();
	queryPurList();
	lastPur();
	
});

/**
 *  保存采购发票 
 */
function savePurBill_set() {
	if (checkSave()==false) {
		return ;
	}
	//获取采购发票期初数据
	var data = getApDetail_Pur();
	alert(data);
	if (currentAction=="add") {
		$.ajax({
			url: "apDetail!create_pur.action",
			type: 'post',
			data:data,
			dataType: "json",
			success: function(data){
				alert("采购发票期初添加成功！");	
			}
		  });
		}
	else {
		//data = data + "&apDetail.id=" + curApDetailId;
		$.ajax({
			url: "apDetail!update_pur.action",
			type: 'post',
			data:data,
			dataType: "json",
			success: function(data){
				alert("采购发票期初修改成功！");	
			}
		  });
	}
	showAbortPurButton();
}

/**
 * 删除采购发票
 */
function delPurBill_set() {
	if (confirm("真的要删除采购发票吗？")){
		var data =  getApDetail_Pur();
		
		$.ajax({
			url: "apDetail!delete_pur.action",
			type: 'post',
			data:data,
			dataType: "json",
			success: function(data){
				alert("采购发票期初删除成功！");	
				queryPurList();
				lastPur();
			}
		  });
		
	}
}
/**
 * 得到采购发票的期初余额
 */
function getApDetail_Pur() {
	
	var tb = document.getElementById("datatable_bodyer");
	var serStr = "";
	if(lastEditRow!=null){
		var c = 0;
		//初始化子表数据
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
				//发票子表ID号:发票期初时把此字段写入发票子表
				var IBVID = row.getAttribute("IBVID");
				//IBVID不为空，从id、pbvid属性中获取主表id，子表id，更新此条子表记录；如果为空，新增此条子表记录
				if (strNullProc(IBVID)!="") {
					//子表id
					rowStr += "&apDetailList["+ c +"].id=" + subid;
					//PBVID即主表id
					rowStr += "&apDetailList["+ c +"].IBVID=" + IBVID;
				}
				
				//主表信息
				rowStr +=getApDetailMain(c);
				//存货编码
				rowStr += "&apDetailList["+ c +"].CINVCODE=" + row.cells[1].innerHTML;
				//存货名称
				//rowStr += "&apDetailList["+ c +"].BEXBILL=" + row.cells[2].innerHTML;
				//规格型号
				//rowStr += "&apDetailList["+ c +"].IORICOST=" + row.cells[3].innerHTML;
				//计量单位
				//rowStr += "&apDetailList["+ c +"].CINVCODE=" + row.cells[4].innerHTML;
				//数量
				rowStr += "&apDetailList["+ c +"].IDAMOUNT_S=" + DoubleNullPtoc(row.cells[5].innerHTML);
				//单价
				rowStr += "&apDetailList["+ c +"].IPRICE=" + DoubleNullPtoc(row.cells[6].innerHTML);
				//金额
				rowStr += "&apDetailList["+ c +"].IDAMOUNT=" + DoubleNullPtoc(row.cells[7].innerHTML);
				//税额
				rowStr += "&apDetailList["+ c +"].ITAXPRICE=" + DoubleNullPtoc(row.cells[8].innerHTML);
				//价税合计
				rowStr += "&apDetailList["+ c +"].ISUM=" + DoubleNullPtoc(row.cells[9].innerHTML);
				
				serStr += rowStr;
				c++;
			}
		}
	}
	return serStr;

	
	
}

 /**
  * 返回采购发票主表信息
  * @param c
  */
 function getApDetailMain(c) {
	 var data =
			//会计期间默认为0
		    "&apDetailList["+ c +"].IPERIOD="  + 0
			//单据正负标志
			+ "&apDetailList["+ c +"].CSIGN=" + "Z"
			//是否预收标志
			+ "&apDetailList["+ c +"].BPREPAY=" + "0"
			//是否正常标志
			+ "&apDetailList["+ c +"].IFLAG=" + "0"
			//应收应付标志 ：预付款为应付模块
			+ "&apDetailList["+ c +"].CFLAG=" + "AP"
			//单据类型
			+ "&apDetailList["+ c +"].CVOUCHTYPE=" + CVOUCHTYPE
				
			//发票号
				+ "&apDetailList["+ c +"].CVOUCHID=" + $("#CVOUCHID").val()
				//结算日期
			      + "&apDetailList["+ c +"].DVOUCHDATE=" +$("#DVOUCHDATE").val()
			      //记账日期
			        + "&apDetailList["+ c +"].DREGDATE=" +$("#DVOUCHDATE").val()
			    
			      //供应商
			      + "&apDetailList["+ c +"].CDWCODE=" +$("#CDWCODE").attr("dbvalue")
			         //部门
			      + "&apDetailList["+ c +"].CDEPTCODE=" + $("#CDEPTCODE").attr("dbvalue")
			     //项目
			      + "&apDetailList["+ c +"].CITEMCODE=" + $("#CITEMCODE").val()
			     //业务员
			      + "&apDetailList["+ c +"].CPERSON=" + $("#CPERSON").attr("dbvalue")
			      //付款条件
			      + "&apDetailList["+ c +"].CPAYCODE=" + $("#CPAYCODE").attr("dbvalue")
			   
			      //科目
			      + "&apDetailList["+ c +"].CCODE=" +$("#CCODE").attr("dbvalue")
			     // 币种
			      + "&apDetailList["+ c +"].CEXCH_NAME=" +$("#CEXCH_NAME").val()
			      //汇率
			      + "&apDetailList["+ c +"].IEXCHRATE=" + $("#IEXCHRATE").val()
			       //税率
			      + "&apDetailList["+ c +"].IPBVTAXRATE=" + $("#IPBVTAXRATE").val()
			         //账期管理
			      + "&apDetailList["+ c +"].ZQCODE=" + $("#ZQCODE").val()
			       //到期日
			      + "&apDetailList["+ c +"].DQDATE=" + $("#DQDATE").val()
			       //制单人
			      + "&apDetailList["+ c +"].CPBVMAKER=" + $("#CPBVMAKER").val()
			       //审核人
			      + "&apDetailList["+ c +"].CPBVVERIFIER=" + $("#CPBVVERIFIER").val()
			      
			      //备注
			      + "&apDetailList["+ c +"].CDIGEST=" + $("#CDIGEST").val();
	   //修改、删除时增加主键
	  // if (currentAction!="add") {
		//   data = data + "&apDetailList["+ c +"].id=" + curApDetailId;  
	   //}
		return data;
 }


/**
 * 保存前校验
 */
function checkSave() {
	
	if ($("#CVOUCHID").val()=="") {
		alert("发票号不允许为空！");
		return false;
	}
	if ($("#DVOUCHDATE").val()=="") {
		alert("开票日期不允许为空！");
		return false;
	}
	if ($("#CDWCODE").val()=="") {
		alert("供货单位不允许为空！");
		return false;
	}
	if ($("#DQDATE").val()=="") {
		alert("到期日不允许为空！");
		return false;
	}
	return true;
}

/**
 * 增加采购发票
 */
function addPurBill_set() {
	showAddPurButton();
	currentAction=="add";
	//初始化各查询文本框状态
	$("#topTextBoxContainer").find(".querybox").attr("disabled",false);
	$("#CPBVBILLTYPE").attr("disabled",false);
	$("#CORDERCODE").attr("disabled","disabled");
	addPuInvoice();
	//税率
	$("#IPBVTAXRATE").empty();
	$("#IPBVTAXRATE")[0].options.add(new Option("13.00", "13.00" ,false,false));
	$("#IPBVTAXRATE")[0].options.add(new Option("17.00", "17.00" ,false,false));

} 


/**
 * 初始化采购发票期初录入框
 */
function initPu_set() {
	//订单号
	$("#CORDERNO").val("");
	//发票号
	$("#CVOUCHID").val("");
	//开票日期
	$("#DVOUCHDATE").val("");
	//部门
	$("#CDEPTCODE").val("");
	$("#CDEPTCODE").attr("dbvalue","");
	  
	//供货单位
	$("#CDWCODE").val("");
	$("#CDWCODE").attr("dbvalue","");
	  
	//业务员
	$("#CPERSON").val("");
	$("#CPERSON").attr("dbvalue","");
	  
	//备注
	$("#CPBVMEMO").val("");
	//项目
	$("#CITEMCODE").val("");
	$("#CITEMCODE").attr("dbvalue","");
	  
	//税率
	$("#IPBVTAXRATE").val("");

	//付款条件
	$("#CPAYCODE").val("");
	$("#CPAYCODE").attr("dbvalue","");
	  
	//科目编码
	$("#CCODE").val("");
	$("#CCODE").attr("dbvalue","");
	  
	//汇率
	$("#IEXCHRATE").val("");
	//币种
	$("#CEXCH_NAME").val("");
	$("#CEXCH_NAME").attr("dbvalue","");
	
	//账期管理
	$("#ZQCODE").val("");
	//到期日
	$("#DQDATE").val("");
	//结算日期
	$("#DSDATE").val("");
	//制单人
	$("#CPBVMAKER").val("");
	//审核人
	$("#CPBVVERIFIER").val("");

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
	cellEdition_pu();
}


/**
 * 修改采购发票
 */
function updatePurBill_set() {
	showAddPurButton();
	currentAction=="update";
	//初始化各查询文本框状态
	$("#topTextBoxContainer").find(".querybox").attr("disabled",false);
	$("#CPBVBILLTYPE").attr("disabled",false);
	$("#CORDERCODE").attr("disabled","disabled");
	
	
}



/**
 * 查找账套下的全部采购发票
 */
//采购发票主表对象列表
var apDetailList;
//采购发票主比哦啊总个数
var apDetailSize;
//发票当前张
var curPurPage ;
//采购发票类型
var CVOUCHTYPE = "01";
function queryPurList() {
	
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
 * 根据发票类型、发票号码查找发票主表
 * @param CPBVBILLTYPE
 * @param CPBVCODE
 */
function queryPurBillByCode(CVOUCHTYPE, CVOUCHID) {
	$.ajax({
		url: "apDetail!queryPurListByCode.action?CVOUCHTYPE=" + CVOUCHTYPE + "&CVOUCHID=" + CVOUCHID,
		type: 'post',
		dataType: "json",
		async:false,
		success: function(data){
			loadQuyeyPurBill(data);
		}
	  });
}

/**
 * 显示满足条件的采购发票信息
 * @param data
 */
function loadQuyeyPurBill(data) {
	
	var purDetailList = data.apDetailList;
	var length = purDetailList.length;
	if (length>0) {
		var apDetail = purDetailList[0];
		//显示主表信息
		showPurMainDetail(apDetail);
	}
	//显示子表信息
	
	showPurBillVouchs(purDetailList);
}

/**
 * 显示采购发票主表信息
 * @param apDetail
 */
function showPurMainDetail(apDetail) {
	//当前采购发票id
	curApDetailId = apDetail.id;
	//发票号
	$("#CVOUCHID").val(apDetail.CVOUCHID);
	//开票日期
	$("#DVOUCHDATE").val(getStrDate(apDetail.DVOUCHDATE));
	//订单号
	$("#CORDERNO").val(apDetail.CORDERNO);
	//供货单位
    var venCode = strNullProc(apDetail.CDWCODE);
	var venObj = getVendorByCode(venCode);
	
	if (venObj!=null) {
		$("#CDWCODE").val(venObj.cvenabbname);
	}
	$("#CDWCODE").attr("dbvalue",venCode);

	//部门名称
	var deptCode = strNullProc(apDetail.CDEPTCODE);
	var departmentObj = getDepartmentByCode(deptCode);
	if (departmentObj!=null) {
		$("#CDEPTCODE").val(departmentObj.cdepname);
	}
    $("#CDEPTCODE").attr("dbvalue",deptCode);
		
	//业务员
	var personCode = strNullProc(apDetail.CPERSON);
	var personObj = getPersonByCode(personCode);
	if (personObj!=null) {
		$("#CPERSON").val(personObj.cpersonname);
	}
	$("#CPERSON").attr("dbvalue",personCode);
	//备注
	$("#CDIGEST").val(apDetail.CDIGEST);
	//项目
	$("#CITEMCODE").val(apDetail.CITEMCODE);
	//税率
	$("#IPBVTAXRATE").val(apDetail.IPBVTAXRATE);
	
		
	//付款条件
	var paycontionCode = strNullProc(apDetail.CPAYCODE);
	var paycontionObj = getPayContionByCode(paycontionCode);
	if (paycontionObj!=null) {
		$("#CPAYCODE").val(paycontionObj.cpayname);
	}
	$("#CPAYCODE").attr("dbvalue",paycontionCode);
		
	//科目编号
	var ccode = strNullProc(apDetail.CCODE);
	var codeObj = getCurCodeObj(ccode);
	if (codeObj!=null) {
		$("#CCODE").val(codeObj.ccodeName);
	}
	$("#CCODE").attr("dbvalue",ccode);

    
	//汇率
     $("#IEXCHRATE").val(apDetail.IEXCHRATE);
	
	//币种
     $("#CEXCH_NAME").val(apDetail.CEXCH_NAME);
	
	//账期管理
	$("#ZQCODE").val(apDetail.ZQCODE);
	//到期日
	$("#DQDATE").val(getStrDate(apDetail.DQDATE));
	//制单人
	$("#CPBVMAKER").val(apDetail.CPBVMAKER);
	//审核人
	$("#CPBVVERIFIER").val(getStrDate(apDetail.CPBVVERIFIER));
}

/**
 * 显示子表信息 及合计信息
 * @param saleBillVouchsList
 */
function showPurBillVouchs(purDetailList) {
	$("#datatable_bodyer").html("");
	var length = purDetailList.length;
	for (var i = 0; i<length; i++) {
		var curApDetail = purDetailList[i];
		//根据存货编码获取存货的名称、规格型号、计量单位
		//存货编码
		var curCode = curApDetail.CINVCODE;
		
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
		
		$("#datatable_bodyer").append('<tr id="' +curApDetail.id
				//发票子表ID号:发票期初时把此字段写入发票子表
			    +'" IBVID="' + curApDetail.IBVID 
			    
			+'"  bgcolor="#ffffff">'
			//序号
			+'<td style="width:20px;" >'+ "" + '</td>'
			
			//存货编码
			//增加弹出选择属性
			+'<td style="width:70px;" dbvalue=' + curApDetail.PBVID  +   ' >'+ curApDetail.CINVCODE + '</td>'
			
			//存货名称
			+'<td style="width:90px;" >'+ curName+ '</td>'
			//规格型号
			+'<td style="width:80px;" >'+ curType+ '</td>'
			//计量单位
			+'<td style="width:60px;" >'+ curUnit+ '</td>'
			
			//数量
			+'<td style="width:60px;" >'+ curApDetail.IDAMOUNT_S + '</td>'
			
			//单价
			+'<td  style="width:70px;" >'+ curApDetail.IPRICE + '</td>'
			
			//金额
			+'<td  style="width:80px;" >'+ curApDetail.IDAMOUNT+ '</td>'
			
			//税额
			+'<td  style="width:60px;" >'+ curApDetail.ITAXPRICE+ '</td>'
			
			//价税合计
			+'<td  style="width:70px;">'+ curApDetail.ISUM + '</td>'
			
			
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
				for(var j=0;j<10;j++){
					newRow.insertCell(j);
				}
			}
		}
		currentAction = "update";
		cellEdition_pu();
		
	
	//显示合计值
	showSumPurTable();
	
}


/**
 * 显示合计值
 * @param sumIPBVQUANTITY 数量合计
 * @param sumIORIMONEY  原币金额合计
 * @param sumITAXPRICE 原币税额合计
 * @param sumIMONEY  本币金额合计
 * @param sumITAXPRICE 本币税额合计
 */
function showSumPurTable() {
	//数量合计
	var sumIPBVQUANTITY = 0.00;
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
		//金额
		var curIMONEY =  DoubleNullPtoc(row.cells[7].innerHTML);
		sumIMONEY = sumIMONEY + curIMONEY;
		//税额
		var curITAXPRICE =  DoubleNullPtoc(row.cells[8].innerHTML);
		sumITAXPRICE = sumITAXPRICE + curITAXPRICE;
	}
	
	//把合计值写入合计表格中
	var sumTable = document.getElementById("datatable_footer");
	sumTable.rows[0].cells[5].innerHTML  = sumIPBVQUANTITY;
	sumTable.rows[0].cells[7].innerHTML  = sumIMONEY;
	sumTable.rows[0].cells[8].innerHTML  = sumITAXPRICE;

}

 


 
 /**
  * 增加时按钮初始化
  */
 function showAddPurButton() {
	 $("#addPur").attr("disabled",true);
	 $("#upsPur").attr("disabled",true);
	 $("#delPur").attr("disabled",true);
	 
	 $("#savePur").attr("disabled",false);
	 $("#abortPur").attr("disabled",false);
	 $("#addrowPur").attr("disabled",false);
	 $("#delrowPur").attr("disabled",false);
	
		
	 $("#firstPur").attr("disabled",true);
	 $("#upPur").attr("disabled",true);
	 $("#downPur").attr("disabled",true);
	 $("#lastPur").attr("disabled",true);
	 $("#refreshPur").attr("disabled",true);
		 
 }
 
 
 /**
  * 放弃时按钮初始化
  */
 function showAbortPurButton() {
	 $("#addPur").attr("disabled",false);
	 $("#upsPur").attr("disabled",false);
	 $("#delPur").attr("disabled",false);
	 
	 $("#savePur").attr("disabled",true);
	 $("#abortPur").attr("disabled",true);
	 $("#addrowPur").attr("disabled",true);
	 $("#delrowPur").attr("disabled",true);
	
	 
	 $("#upPur").attr("disabled",false);
	 $("#downPur").attr("disabled",false);
	 $("#lastPur").attr("disabled",false);
	 $("#refreshPur").attr("disabled",false);
		 
 }
 
 /**
  * 放弃操作
  */
 function abortPurBill_set() {
	
	 $("#addPur").attr("disabled",false);
	 $("#upsPur").attr("disabled",false);
	 $("#delPur").attr("disabled",false);
	 
	 $("#savePur").attr("disabled",true);
	 $("#abortPur").attr("disabled",true);
	 $("#addrowPur").attr("disabled",true);
	 $("#delrowPur").attr("disabled",true);
	
	 
	 $("#upPur").attr("disabled",false);
	 $("#downPur").attr("disabled",false);
	 $("#lastPur").attr("disabled",false);
	 $("#refreshPur").attr("disabled",false);
 }
 





/**
 * 首张发票
 */
function firstPur() {
	if (apDetailList.length==0) return;
	curPurPage = 0;
	var CVOUCHTYPE = apDetailList[curPurPage].CVOUCHTYPE;
	var CVOUCHID = apDetailList[curPurPage].CVOUCHID;
	queryPurBillByCode(CVOUCHTYPE, CVOUCHID);
}

/**
 * 末张发票
 */
function lastPur() {
	if (apDetailList.length==0) return;
	curPurPage = apDetailSize-1*1;
	
	var CVOUCHTYPE = apDetailList[curPurPage].CVOUCHTYPE;
	var CVOUCHID = apDetailList[curPurPage].CVOUCHID;
	queryPurBillByCode(CVOUCHTYPE, CVOUCHID);

}

/**
 * 上张发票
 */
function upPur() {
	if (apDetailList.length==0) return;
	curPurPage --;
	//上一页时：当前页最小值为0
	if (curPurPage <= 0) 
		curPurPage = 0;
	
	var CVOUCHTYPE = apDetailList[curPurPage].CVOUCHTYPE;
	var CVOUCHID = apDetailList[curPurPage].CVOUCHID;
	
	queryPurBillByCode(CVOUCHTYPE, CVOUCHID);

	
}

/**
 * 下张发票
 */
function downPur() {
	if (apDetailList.length==0) return;
	curPurPage ++;
	//下一页时：当前页不能大于全部页数
	if (curPurPage>=apDetailSize) 
		curPurPage = apDetailSize-1*1;
	
	var CVOUCHTYPE = apDetailList[curPurPage].CVOUCHTYPE;
	var CVOUCHID = apDetailList[curPurPage].CVOUCHID;
	
	queryPurBillByCode(CVOUCHTYPE, CVOUCHID);
}




/**
 * 退出
 */
function exitPur() {
	window.parent.closeWindow('pu_set_invoice_set');
	
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



