
/**
 * 
 * @DESCRIBE   凭证查询界面js
 * @AUTHOR     王丙建
 * @DATE       2013-01-14
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


/**
 * 查询凭证审核列表
 */
function queryShowBill() {
	//var queryDsignData = valueObject.queryDsignData;
	var dts = valueObject.queryDsignData;
	
	   $.ajax({
			
			  url: "dsignAccvouchQuery!queryShowBillList.action",
				type: 'post',
				data: dts,
				dataType: "json",
				success: function(data){
					initShowBill(data);	
				}
			  });
	
}

/**
 * 初始化查询审核列表
 * @param data
 */
//已审核凭证张数
var auditCount = 0;
//未审核凭证张数
var unauditCount = 0;
//凭证总张数
var billCount = 0;

//查询凭证列表
var auditAccvouchKeyList = null;
function initShowBill(data) {
	var billList = data.billList;
	   var length = billList.length;
	    //查询凭证关键字数组
	   auditAccvouchKeyList = new Array(length);
	 
	document.getElementById("billcount").innerHTML="凭证共" + length +   "张";
	for(var i=0;i<length;i++){
		
		
		var strCheck = strNullProc(billList[i].ccheck);
		
		

		//摘要全称
		var cdigest=billList[i].cdigest;
		if(cdigest.length>10){
			billList[i].cdigest=cdigest.substr(0,10)+"...";
		}
		
		
		
		
		if (strCheck=="") {
			unauditCount++;

			$("#left_table_datarows").append('<tr isAudited="false" onclick="rowSelection(this)" id="' +billList[i].inoId  
					+'" year="' + billList[i].dsighYear
					+'" period="' + billList[i].dsignPeriod
					+'" sumMd="' + billList[i].sumMd
					+'" sumMc="' + billList[i].sumMc
					+'" csign="' + billList[i].csign + '"  style="background-color:#ffffff">'
					+'<td width="70" onclick="selectTd(this)" ondblClick="billSelected(this)">'+ billList[i].cdbillDate + '</td>'
					+'<td width="80" onclick="selectTd(this)" ondblClick="billSelected(this)">'+ billList[i].cpbzh + '</td>'				
					+'</tr>');
			$("#right_table_datarows").append('<tr isAudited="false" onclick="rowSelection(this)" id="'+billList[i].inoId  
					+'" year="' + billList[i].dsighYear
					+'" period="' + billList[i].dsignPeriod
					+'" sumMd="' + billList[i].sumMd
					+'" sumMc="' + billList[i].sumMc
					+'" csign="' + billList[i].csign + '" style="background-color:#ffffff">'
					+'<td width="185"  onclick="selectTd(this)"  title="'+cdigest+'"  ondblClick="billSelected(this)">'+ strNullProc(billList[i].cdigest) + '</td>'
					+'<td width="90"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].sumMd/100) + '</td>'				
					+'<td width="90"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].sumMc/100) + '</td>'				
					+'<td width="60"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cbill) + '</td>'				
					+'<td width="60"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].ccheck) + '</td>'				
					+'<td width="70"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].csystemName) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cmemo) + '</td>'								
					+'</tr>');
		}
		else {
			auditCount ++ ;

			$("#left_table_datarows").append('<tr isAudited="true" onclick="rowSelection(this)" id="' +billList[i].inoId  
					+'" year="' + billList[i].dsighYear
					+'" period="' + billList[i].dsignPeriod
					+'" sumMd="' + billList[i].sumMd
					+'" sumMc="' + billList[i].sumMc
					+'" csign="' + billList[i].csign + '"  style="background-color:#80ffff">'
					+'<td width="70" onclick="selectTd(this)" ondblClick="billSelected(this)">'+ billList[i].cdbillDate + '</td>'
					+'<td width="80" onclick="selectTd(this)" ondblClick="billSelected(this)">'+ billList[i].cpbzh + '</td>'				
					+'</tr>');
			$("#right_table_datarows").append('<tr isAudited="true" onclick="rowSelection(this)" id="'+billList[i].inoId  
					+'" year="' + billList[i].dsighYear
					+'" period="' + billList[i].dsignPeriod
					+'" sumMd="' + billList[i].sumMd
					+'" sumMc="' + billList[i].sumMc
					+'" csign="' + billList[i].csign + '"  style="background-color:#80ffff">'
					+'<td width="185"  onclick="selectTd(this)"  title="'+cdigest+'"  ondblClick="billSelected(this)">'+ strNullProc(billList[i].cdigest) + '</td>'
					+'<td width="90"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].sumMd/100) + '</td>'				
					+'<td width="90"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].sumMc/100) + '</td>'				
					+'<td width="60"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cbill) + '</td>'				
					+'<td width="60"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].ccheck) + '</td>'				
					+'<td width="70"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].csystemName) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cmemo) + '</td>'								
					+'</tr>');
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
		var curAccvouchKey = new DsignAccvouchKey(year,period,csign,attribute380, cdbillDate,inoId);
		auditAccvouchKeyList[i] = curAccvouchKey;
	
		
		
		
		
	}
	document.getElementById("audited").innerHTML="已审核" + auditCount +   "张";
	document.getElementById("waitaudit").innerHTML="未审核" + unauditCount +   "张";
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



/**
*	双击行
*/
function billSelected(td){
	inoid = td.parentNode.id;
	csign = td.parentNode.csign;
	year = td.parentNode.year;
	period = td.parentNode.period;
	sumMd = td.parentNode.sumMd;
	sumMc = td.parentNode.sumMc;
	//参数以json对象进行传递
	//var param = {inoId:inoid,csign:csign};
	var param = {auditAccvouchKeyList:auditAccvouchKeyList,inoId:inoid,csign:csign,year:year,period:period,sumMd:sumMd,sumMc:sumMc};
	
	window.parent.openWindow("dsignShow","dsign_query_showbill",param);
	window.parent.closeWindow("dsign_query_showbill");

}

/**
 * 确定查询
 */
function beginQuery() {
	if (inoid==null) {
		jAlert("请首先选择凭证审核行后再执行审核操作！","提示");
		return;
	}
	//参数以json对象进行传递
	var param = {auditAccvouchKeyList:auditAccvouchKeyList,inoId:inoid,csign:csign,year:year,period:period,sumMd:sumMd,sumMc:sumMc};
	window.parent.openWindow("dsignShow","dsign_query_showbill",param);
	window.parent.closeWindow("dsign_query_showbill");

}


var currentSelectedRowIndex = null;
//行选中函数
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
	
	currentSelectedRowIndex = row.rowIndex-1;
	
}


