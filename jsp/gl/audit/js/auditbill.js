
/**
 * 
 * @DESCRIBE   凭证审核界面js
 * @AUTHOR     王丙建
 * @DATE       2012-11-05
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

//审核凭证列表
var auditAccvouchKeyList = null;

//凭证审核查询条件
var auditDts = null;
//凭证制单人、审核人、出纳人id列表
var dsignAccvouchPersonIdList = null;

/**
 * 查询凭证审核列表
 */
function queryAuditBill() {
	auditDts = valueObject.queryDsignData;
	  /* $.ajax({
			
			  url: "data/queryAuditBillList.json",
				type: 'post',
				data: auditDts,
				dataType: "json",
				//async:false,
				success: function(data){
				}
			  });*/
	var data={
			"billList":[
			    		{
			    			"cdbillDate":"2013-01-01",
			    			"cpbzh":"收-0001",
			    			"cdigest":"收到投资",
			    			"sumMd":"30000000",
			    			"sumMc":"30000000"
			    		}
			    	]
			    };
	   initBill(data);	
	
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
function initBill(data) {
	var billList = data.billList;
	billCount = billList.length;
	document.getElementById("billcount").innerHTML="凭证共" + billCount +   "张";
   
    var length = billList.length;
    //审核凭证关键字数组
    auditAccvouchKeyList = new Array(length);
    dsignAccvouchPersonIdList =  new Array(length); 

	for(var i=0;i<length;i++){
		var strCheck = strNullProc(billList[i].ccheck);
		
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
	
		//未审核
		if (strCheck=="") {
			unauditCount++;
			$("#left_table_datarows").append('<tr isAudited="false" onclick="rowSelection(this)" id="' +billList[i].inoId  
					+'" year="' + billList[i].dsighYear
					+'" period="' + billList[i].dsignPeriod
					+'" sumMd="' + billList[i].sumMd
					+'" sumMc="' + billList[i].sumMc
					+'" csign="' + billList[i].csign
					+'" cdbillDate="' + billList[i].cdbillDate
					+'" checkid="' + billList[i].checkid
					+'" cbillid="' + billList[i].cbillid
					
					+ '"  style="background-color:#FFFFFF">'
					+'<td width="70" ondblClick="billSelected(this)">'+ billList[i].cdbillDate + '</td>'
					+'<td width="80" ondblClick="billSelected(this)">'+ billList[i].cpbzh + '</td>'				
					+'</tr>');
			$("#right_table_datarows").append('<tr isAudited="false" onclick="rowSelection(this)" id="'+billList[i].inoId  
					+'" year="' + billList[i].dsighYear
					+'" period="' + billList[i].dsignPeriod
					+'" sumMd="' + billList[i].sumMd
					+'" sumMc="' + billList[i].sumMc
					+'" csign="' + billList[i].csign
					+'" cdbillDate="' + billList[i].cdbillDate
					+'" checkid="' + billList[i].checkid
					+'" cbillid="' + billList[i].cbillid
					+ '"  style="background-color:#FFFFFF">'
					+'<td width="295"  onclick="selectTd(this)" title="'+cdigest+'" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cdigest) + '</td>'
					+'<td width="150"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].sumMd/100) + '</td>'				
					+'<td width="150"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].sumMc/100) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cbill) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].ccheck) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].csystemName) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cmemo) + '</td>'								
					+'</tr>');
		}
		//已审核
		else {
			auditCount ++ ;
			$("#left_table_datarows").append('<tr isAudited="true" onclick="rowSelection(this)" id="' +billList[i].inoId  
					+'" year="' + billList[i].dsighYear
					+'" period="' + billList[i].dsignPeriod
					+'" sumMd="' + billList[i].sumMd/100
					+'" sumMc="' + billList[i].sumMc/100
					+'" csign="' + billList[i].csign
					+'" cdbillDate="' + billList[i].cdbillDate
					+'" checkid="' + billList[i].checkid
					+'" cbillid="' + billList[i].cbillid
					+ '"  style="background-color:#80FFFF">'
					+'<td width="70" ondblClick="billSelected(this)">'+ billList[i].cdbillDate + '</td>'
					+'<td width="80" ondblClick="billSelected(this)">'+ billList[i].cpbzh + '</td>'				
					+'</tr>');
			
			$("#right_table_datarows").append('<tr isAudited="true" onclick="rowSelection(this)" id="'+billList[i].inoId  
					+'" year="' + billList[i].dsighYear
					+'" period="' + billList[i].dsignPeriod
					+'" sumMd="' + billList[i].sumMd/100
					+'" sumMc="' + billList[i].sumMc/100
					+'" csign="' + billList[i].csign
					+'" cdbillDate="' + billList[i].cdbillDate
					+'" checkid="' + billList[i].checkid
					+'" cbillid="' + billList[i].cbillid
					+ '"  style="background-color:#80FFFF">'
					+'<td width="295"  onclick="selectTd(this)"  title="'+cdigest+'" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cdigest) + '</td>'
					+'<td width="150"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].sumMd/100) + '</td>'				
					+'<td width="150"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].sumMc/100) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cbill) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].ccheck) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].csystemName) + '</td>'				
					+'<td width="80"  onclick="selectTd(this)" ondblClick="billSelected(this)">'+ strNullProc(billList[i].cmemo) + '</td>'								
					+'</tr>');
		}
		
		
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
 * 取消审核 
 */
function cancelAuditDsign() {
	
	
	var param = "&accvouchKey.csign=" + csign
    +"&accvouchKey.dbillDate=" + dbillDate
    +"&accvouchKey.inoId=" + inoid;
	var dsignAccvouchList=null;
	$.ajax({
		url: "dsignAccvouch!findGlAccvouchByCommon.action",
		type: 'post',
		data: param,
		async:false,
		dataType: "json",
		success: function(data){
			
			dsignAccvouchList=data.dsignAccvouchList;
			
			
		}
	});
	
	
	if(dsignAccvouchList!=null && dsignAccvouchList!=undefined && dsignAccvouchList.length>0){
		var d = dsignAccvouchList[0];
	
	
		
		if(d.ccheckid==null){
			jAlert("凭证还未审核！");
			return ;
		}
		
	
		//作废的凭证不能审核
		if (d.iflag==1) {
			jAlert("作废的凭证不能取消审核！");
			return ;
		}
		
		//作废的凭证不能审核
		if (d.iflag==2) {
			jAlert("标错的凭证不允许取消审核！");
			return ;
		}
	
		
		if (d.ibook==1) {
			jAlert("已记账的凭证不允许取消审核！");
		    return;
		}
		
		var userid = getCurLoginUserId();
		if (d.ccheckid!=userid) {
			jAlert("取消审核人和原审核人不是同一人！");
			return;
		}

		if (d.cbillid==userid) {
			jAlert("取消审核人和制单人不能为同一个人！");
			return;
		}
		
		
			
		param = 'title.dsignNumber='+ inoid + '&title.dsignType=' + csign 
		+ "&title.dsighYear=" + year + "&title.dsignPeriod=" + period;
		$.ajax({
			url: "dsignAccvouch!cancleAuditDsignAccvouch.action",
			type: 'post',
			data: param,
			async:false,
			dataType: "json",
			success: function(data){
				jAlert("取消审核成功！","提示",function(){
					$("#left_table_datarows").html("");
					$("#right_table_datarows").html("");
					queryAuditBill();
				});	
			}
		});
		
	
	
	
	
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
var dbillDate=null;
var checkid=null;
var cbillid=null;

var currentSelectedRowIndex = null;

function selectTd(td){	
	
	
	inoid = td.parentNode.id;
	csign = td.parentNode.csign;
	year = td.parentNode.year;
	period = td.parentNode.period;
	sumMd = td.parentNode.sumMd;
	sumMc = td.parentNode.sumMc;
	dbillDate=td.parentNode.cdbillDate;
	checkid=td.parentNode.checkid;
	cbillid=td.parentNode.cbillid;
	
	
	
	
	/*
	if(currentSelectedTr != null){
		$(currentSelectedTr).css("background-color","#fff").css("color","#000");
		currentSelectedTr = null;
	}
	$(td.parentNode).css("background-color","#0000ff").css("color","#fff");
	currentSelectedTr = td.parentNode;
	*/
	
}	


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
	dbillDate=row.cdbillDate;
	checkid=row.checkid;
	cbillid=row.cbillid;
	
	
	
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
			billCount:billCount,
			auditCount:auditCount,
			unauditCount:unauditCount,
			inoId:inoid,
			csign:csign,
			year:year,
			period:period,
			sumMd:sumMd,
			sumMc:sumMc,
			auditDts:auditDts
			};
	
	
	window.parent.openWindow("dsignAudit","gl_audit_auditbill",param);
	window.parent.closeWindow("gl_audit_auditbill");

}

/**
 * 确定审核
 */
function beginAudit() {
	
	

	
	if (inoid==null) {
		jAlert("请首先选择凭证审核行后再执行审核操作！","提示");
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
			sumMc:sumMc,
			auditDts:auditDts
			};
	window.parent.openWindow("dsignAudit","gl_audit_auditbill",param);
	window.parent.closeWindow("gl_audit_auditbill");

}



