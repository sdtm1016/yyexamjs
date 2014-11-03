
/**
 * 
 * @DESCRIBE   出纳签字界面js
 * @AUTHOR     王丙建
 * @DATE       2013-04-10
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

//出纳签字凭证列表
var auditAccvouchKeyList = null;

//凭证制单人、审核人、出纳人id列表
var dsignAccvouchPersonIdList = null;

/**
 * 查询出纳签字列表
 */
function queryQzBill() {
	//var queryDsignData = valueObject.queryDsignData;
	var dts = valueObject.queryDsignData;
	
	
	
	   $.ajax({
			
			  url: "dsignAccvouchAudit!queryCashierBillList.action",
				type: 'post',
				data: dts,
				dataType: "json",
				success: function(data){
					initBill(data);	
				}
			  });
	
}

/**
 * 初始化查询出纳签字列表
 * @param data
 */
//已出纳签字凭证张数
var auditCount = 0;
//未出纳签字凭证张数
var unauditCount = 0;
//凭证总张数
var billCount = 0;
function initBill(data) {
	billList = data.billList;
	billCount = billList.length;
	document.getElementById("billcount").innerHTML="凭证共" + billCount +   "张";
   
    var length = billList.length;
    //出纳签字凭证关键字数组
    auditAccvouchKeyList = new Array(length);
    dsignAccvouchPersonIdList =  new Array(length); 
	for(var i=0;i<length;i++){
		var strCheck = strNullProc(billList[i].ccashier);
		
		

		//摘要全称
		var cdigest=billList[i].cdigest;
		if(cdigest.length>10){
			billList[i].cdigest=cdigest.substr(0,10)+"...";
		}
		
		
		
		
		//年份
		var year = billList[i].dsighYear;
		//会计期间
		var period = billList[i].dsignPeriod;
		//凭证类字
		var csign = billList[i].csign;
		//凭证类字编号
		var attribute380 =billList[i].attribute380;
		//制单日期
		var cdbillDate = billList[i].cdbillDate;
		//凭证编号
		var inoId = billList[i].inoId;
		//制单人id
		var cbillid = billList[i].cbillid;
		//审核人id
		var checkid = billList[i].checkid;
		//出纳人id
		var cashierid = billList[i].cashierid;
		
		var curAccvouchKey = new DsignAccvouchKey(year,period,csign,attribute380, cdbillDate,inoId);
		auditAccvouchKeyList[i] = curAccvouchKey;

		var curAccvouchPersonid = new DsignAccvouchPersonId(cbillid,checkid,cashierid);
		dsignAccvouchPersonIdList[i] = curAccvouchPersonid;
		//未出纳签字
		if (strCheck=="") {
			unauditCount++;
			$("#left_table_datarows").append('<tr isAudited="false" onclick="rowSelection(this)" id="' +billList[i].inoId  
					+'" year="' + billList[i].dsighYear
					+'" period="' + billList[i].dsignPeriod
					+'" sumMd="' + billList[i].sumMd/100
					+'" sumMc="' + billList[i].sumMc/100
					+'" csign="' + billList[i].csign + '"  style="background-color:#ffffff">'
					+'<td width="70" onclick="selectTd(this)" ondblClick="billSelected(this)">'+ billList[i].cdbillDate + '</td>'
					+'<td width="80" onclick="selectTd(this)" ondblClick="billSelected(this)">'+ billList[i].cpbzh + '</td>'				
					+'</tr>');
			$("#right_table_datarows").append('<tr isAudited="false" onclick="rowSelection(this)" id="'+billList[i].inoId  
					+'" year="' + billList[i].dsighYear
					+'" period="' + billList[i].dsignPeriod
					+'" sumMd="' + billList[i].sumMd/100
					+'" sumMc="' + billList[i].sumMc/100
					+'" csign="' + billList[i].csign + '"  style="background-color:#ffffff">'
					+'<td width="185"  onclick="selectTd(this)"  title="'+cdigest+'" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cdigest) + '</td>'
					+'<td width="150"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].sumMd/100) + '</td>'				
					+'<td width="150"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].sumMc/100) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cbill) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].ccashier) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].csystemName) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cmemo) + '</td>'								
					+'</tr>');
		}
		//已出纳签字
		else {
			auditCount ++ ;
			$("#left_table_datarows").append('<tr isAudited="true" onclick="rowSelection(this)" id="' +billList[i].inoId  
					+'" year="' + billList[i].dsighYear
					+'" period="' + billList[i].dsignPeriod
					+'" sumMd="' + billList[i].sumMd/100
					+'" sumMc="' + billList[i].sumMc/100
					+'" csign="' + billList[i].csign + '"  style="background-color:#80ffff">'
					+'<td width="70" onclick="selectTd(this)" ondblClick="billSelected(this)">'+ billList[i].cdbillDate + '</td>'
					+'<td width="80" onclick="selectTd(this)" ondblClick="billSelected(this)">'+ billList[i].cpbzh + '</td>'				
					+'</tr>');
			
			$("#right_table_datarows").append('<tr isAudited="true" onclick="rowSelection(this)" id="'+billList[i].inoId  
					+'" year="' + billList[i].dsighYear
					+'" period="' + billList[i].dsignPeriod
					+'" sumMd="' + billList[i].sumMd/100
					+'" sumMc="' + billList[i].sumMc/100
					+'" csign="' + billList[i].csign + '"  style="background-color:#80ffff">'
					+'<td width="185"  onclick="selectTd(this)"  title="'+cdigest+'" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cdigest) + '</td>'
					+'<td width="150"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].sumMd/100) + '</td>'				
					+'<td width="150"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].sumMc/100) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cbill) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].ccashier) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].csystemName) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cmemo) + '</td>'								
					+'</tr>');
		}
		
		
	}
	
	document.getElementById("audited").innerHTML="已签字" + auditCount +   "张";
	document.getElementById("waitaudit").innerHTML="未签字" + unauditCount +   "张";       
	var tb = document.getElementById("right_table_datarows");
	//默认选中第一行
	if (tb.rows.length>0) {
		var firstE = tb.rows[0].cells[0];
		selectTd(firstE);
		rowSelection(tb.rows[0]);
	}
	  
}



/**
 * 单击行
 */
var inoid=null;
var csign = null;
var year = null;
var period = null;
var sumMd = "";
var sumMc = "";
function selectTd(td){	
	inoid = td.parentNode.id;
	csign = td.parentNode.csign;
	year = td.parentNode.year;
	period = td.parentNode.period;
	sumMd = td.parentNode.sumMd;
	sumMc = td.parentNode.sumMc;
}	



var currentSelectedRowIndex = null;
function rowSelection(row){
	
	if(currentSelectedRowIndex != null){
		var leftRow = $("#left_table_datarows").find("tr").eq(currentSelectedRowIndex);
		var rightRow = $("#right_table_datarows").find("tr").eq(currentSelectedRowIndex);
		var isAudited = leftRow.attr("isAudited");
		if(isAudited=="true" || isAudited==true){
			leftRow.css("background-color","#80FFFF").css("color","#000000");
			rightRow.css("background-color","#80FFFF").css("color","#000000");
		}else{
			leftRow.css("background-color","#FFFFFF").css("color","#000000");
			rightRow.css("background-color","#FFFFFF").css("color","#000000");
		}
		currentSelectedRowIndex = null;
	}
	$("#left_table_datarows").find("tr").eq(row.rowIndex-1).css("background-color","#0000FF").css("color","#FFFFFF");
	$("#right_table_datarows").find("tr").eq(row.rowIndex-1).css("background-color","#0000FF").css("color","#FFFFFF");
	
	

	inoid = row.id;
	csign = row.csign;
	year = row.year;
	period = row.period;
	sumMd = row.sumMd;
	sumMc = row.sumMc;
	
	currentSelectedRowIndex = row.rowIndex-1;
	
}



/**
*	双击行
*/
function billSelected(td){
	inoid = td.parentNode.id;
	csign = td.parentNode.getAttribute("csign");
	year = td.parentNode.getAttribute("year");
	period = td.parentNode.getAttribute("period");
	sumMd = td.parentNode.getAttribute("sumMd");
	sumMc = td.parentNode.getAttribute("sumMc");
	var param = {
			queryParam:valueObject.queryDsignData,
			auditAccvouchKeyList:auditAccvouchKeyList,
			dsignAccvouchPersonIdList:dsignAccvouchPersonIdList,
			DsignAccvouchPersonIdListbillCount:billCount,
			auditCount:auditCount,
			unauditCount:unauditCount,
			inoId:inoid,
			csign:csign,
			year:year,
			period:period,
			sumMd:sumMd,
			sumMc:sumMc
			};
	
	
	window.parent.openWindow("dsignCashier","gl_audit_cashierbill",param);
	window.parent.closeWindow("gl_audit_cashierbill");

}

/**
 * 确定出纳签字
 */
function beginCashier() {
	if (inoid==null) {
		jAlert("请首先选择出纳签字行后再执行出纳签字操作！","提示");
		return;
	}
	//参数以json对象进行传递

	var param = {
			queryParam:valueObject.queryDsignData,
			auditAccvouchKeyList:auditAccvouchKeyList,
			dsignAccvouchPersonIdList:dsignAccvouchPersonIdList,
			billCount:billCount,
			auditCount:auditCount,
			unauditCount:unauditCount,
			inoId:inoid,
			csign:csign,
			year:year,
			period:period,
			sumMd:sumMd,
			sumMc:sumMc
			};
	window.parent.openWindow("dsignCashier","gl_audit_cashierbill",param);
	window.parent.closeWindow("gl_audit_cashierbill");

}

/**
 * 取消出纳签字
 */
function cancelCashier() {
	if (inoid==null) {
		jAlert("请首先选择出纳签字行后再执行取消出纳签字操作！","提示");
		return;
	}
	var pram = "inoId=1"  + "&csign=记";
	$.ajax({
		url: "dsign!cancleAuditDsign.action",
		type: 'post',
		data: pram,
		dataType: "json",
		success: function(data){
			jAlert("取消出纳签字成功！","提示");	
		}
	});
}


