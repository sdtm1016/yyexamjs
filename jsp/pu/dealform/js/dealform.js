/**
 * 
 * @DESCRIBE   其他应付单制单查询界面js
 * @AUTHOR     王丙建
 * @DATE       2013-03-13
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

/**
 * 增加
 */
function addApVouch() {
	
	//获取单据查询类型 
	var valueObject = window.parent.valueMap.get("pu_dealform_dealform");
	var queryType = valueObject.queryType;
	var param = {};
	param.queryType = queryType;
	//alert("queryType" + queryType);
	//打开其他应付单
	window.parent.openWindow('apVouch_billtype','pu_contacts_beginningbalance',param);
	window.parent.closeWindow('pu_contacts_beginningbalance');
}

/**
 * 全选
 */
function allTableAp() {
	var lefttable = document.getElementById("bodyer_left");
	for(var i=0;i<lefttable.rows.length;i++){
		var row = lefttable.rows[i];
		
		row.cells[0].innerHTML = "Y";
	}
	$("#allSelect").attr("disabled",true);
	$("#unallSelect").attr("disabled",false);
	 
}

/**
 * 全消
 */
function unallTableAp() {
	var lefttable = document.getElementById("bodyer_left");
	for(var i=0;i<lefttable.rows.length;i++){
		var row = lefttable.rows[i];
		
		row.cells[0].innerHTML = "";
	}
	$("#allSelect").attr("disabled",false);
	$("#unallSelect").attr("disabled",true);
}




//表格滚动条处理
function tableScroll(container){

	var scroll_header = document.getElementById("scroll_header");
	var bodyer_left = document.getElementById("bodyer_left");
	
	scroll_header.style.marginLeft = "-"+parseInt(container.scrollLeft)+"px";
	bodyer_left.style.marginTop = "-"+parseInt(container.scrollTop)+"px";
	
}
	
	
function createDataRows(){
	var tbl = document.getElementById("bodyer_left");
	for(var i=1;i<=50;i++){
		var row = tbl.insertRow(tbl.rows.length);

		var cell1 = row.insertCell(row.cells.length);
		cell1.width="66";
		cell1.innerHTML=i+"."+1;

		var cell2 = row.insertCell(row.cells.length);
		cell2.width="54";
		cell2.innerHTML=i+"."+2;

		var cell3 = row.insertCell(row.cells.length);
		cell3.width="106";
		cell3.innerHTML=i+"."+3;

	}
	
	
	var tbr = document.getElementById("bodyer_right");
	for(var i=1;i<=50;i++){
		var row = tbr.insertRow(tbr.rows.length);
		
		var cell4 = row.insertCell(row.cells.length);
		cell4.width="80";
		cell4.innerHTML=i+"."+4;

		var cell5 = row.insertCell(row.cells.length);
		cell5.width="80";
		cell5.innerHTML=i+"."+5;

		var cell6 = row.insertCell(row.cells.length);
		cell6.width="130";
		cell6.innerHTML=i+"."+6;

		var cell7 = row.insertCell(row.cells.length);
		cell7.width="50";
		cell7.innerHTML=i+"."+7;

		var cell8 = row.insertCell(row.cells.length);
		cell8.width="106";
		cell8.innerHTML=i+"."+8;

		var cell9 = row.insertCell(row.cells.length);
		cell9.width="106";
		cell9.innerHTML=i+"."+9;

		var cell10 = row.insertCell(row.cells.length);
		cell10.width="106";
		cell10.innerHTML=i+"."+10;

		var cell11 = row.insertCell(row.cells.length);
		cell11.width="106";
		cell11.innerHTML=i+"."+11;

		var cell12 = row.insertCell(row.cells.length);
		cell12.width="108";
		cell12.innerHTML=i+"."+12;

		var cell13 = row.insertCell(row.cells.length);
		cell13.width="54";
		cell13.innerHTML=i+"."+13;

		var cell14 = row.insertCell(row.cells.length);
		cell14.width="80";
		cell14.innerHTML=i+"."+14;

		var cell15 = row.insertCell(row.cells.length);
		cell15.width="108";
		cell15.innerHTML=i+"."+15;

		var cell16 = row.insertCell(row.cells.length);
		cell16.width="80";
		cell16.innerHTML=i+"."+16;
		
	}
	
}
	
	
	


//当前被点击选中的行全局变量
var currentSeletedRow=null;
function rowSelection(){
	var datatable_1 = document.getElementById("bodyer_right");
	for(var i=0;i<datatable_1.rows.length;i++){
	
		datatable_1.rows[i].onclick=function(e){
			
			var evt=(window.event || e);//获得事件
			var evtsrc = (evt.srcElement || evt.target);
			if(currentSeletedRow!=null && evtsrc.tagName=="TD"){
				currentSeletedRow.style.backgroundColor="#fff";
				currentSeletedRow.style.color="#000";
			}
			if(evtsrc.tagName=="TD"){
				evtsrc.parentNode.style.backgroundColor="#00f";
				evtsrc.parentNode.style.color="#fff";
				currentSeletedRow=evtsrc.parentNode;
			}
		}
	}
}

function leftTableRowClick(){
	var datatable_1 = document.getElementById("bodyer_left");
	for(var i=0;i<datatable_1.rows.length;i++){
	
		datatable_1.rows[i].onclick=function(e){
			
			var evt=(window.event || e);//获得事件
			var evtsrc = (evt.srcElement || evt.target);
			
			if(evtsrc.tagName=="TD"){
				
				var rowIndex = evtsrc.parentNode.rowIndex;
				var rightTableRow = document.getElementById("bodyer_right").rows[rowIndex];
				
				if(currentSeletedRow!=null && evtsrc.tagName=="TD"){
					currentSeletedRow.style.backgroundColor="#fff";
					currentSeletedRow.style.color="#000";
				}
				rightTableRow.style.backgroundColor="#00f";
				rightTableRow.style.color="#fff";
				currentSeletedRow=rightTableRow;
			}
			
		};
	}
}

/**
 * 页面初始化
 */
//查询单据类型
var queryFormType = "";
$(document).ready(function(){
	
	//createDataRows();
	//表头初始化
	var param = window.parent.valueMap.get("pu_dealform_dealform");
	queryFormType = param.queryType;
	var tb = document.getElementById("scroll_header");
	if (queryFormType=="yfd") {
		tb.rows[0].cells[2].innerHTML = "供应商";
	}
	else if(queryFormType=="ysd")   {
		tb.rows[0].cells[2].innerHTML = "客户";
	}
	else {
		tb.rows[0].cells[2].innerHTML = "供应商";
	}
	
	queryData();
	rowSelection();
	leftTableRowClick();
	
	
});
 
 /**
  * 查询数据
  */
 function queryData() {
    var param = window.parent.valueMap.get("pu_dealform_dealform");
	 var dataQuery = param.dataQuery;
	 //alert("应付单查询条件：" + dataQuery);
		$.ajax({
			url: "vouch!queryListByDealform.action",
			type: 'post',
			data:dataQuery,
			dataType: "json",
			success: function(data){
				showListVouch(data.apVouchList);
			}
		  });
 }
 
 /**
  * 显示应付单列表信息
  * @param apVouchList
  */
 function showListVouch(apVouchList) {
	 var length = apVouchList.length;
	 $("#vouchCount").val(length);
	 
	 $("#bodyer_left").html("");
	 $("#bodyer_right").html("");
	 for (var i= 0; i<length; i++) {
		 var curVouch = apVouchList[i];
		 //单据类型处理
		 var curVouchType = strNullProc( curVouch.CVOUCHTYPE);
		 var curVouchName = curVouchType;
		 if (curVouchType=="P0")
			 curVouchName = "其他应付单";
		 else if (curVouchType=="R0") 
			 curVouchName = "其他应收单";
		 else
			 curVouchName = "其他应付单";
		 
		 //供应商
		  var curVenCode = strNullProc(curVouch.CDWCODE);
		  var curVenName = "";
		  var venObj = getVendorByCode(curVenCode);
		  	if (venObj!=null) {
		  		curVenName = venObj.cvenabbname;
		  	}
		      
		 
		 //币种
			
		 //部门
		 var curDeptCode = strNullProc(curVouch.CDEPTCODE);
		 var curDeptName = ""; 
		 var departmentObj = getDepartmentByCode(curDeptCode);
		if (departmentObj!=null) {
		 		curDeptName = departmentObj.cdepname;
		 	}
			  	
	    //业务员
        var curPersonCode = strNullProc(curVouch.CPERSON);
        var curPersonName = "";
		var personObj = getPersonByCode(curPersonCode);
		if (personObj!=null) {
			curPersonName = personObj.cpersonname;
		 }
		 
         //左边列表
		 $("#bodyer_left").append('<tr id="' +curVouch.id  
				    +'" CVOUCHID="' + curVouch.CVOUCHID
				    +'" CVOUCHTYPE="' + curVouch.CVOUCHTYPE
				+'"  bgcolor="#ffffff">'
				
				//选择标志
				+'<td style="width:80px;"  >'+ "" + '</td>'
				//审核人
				+'<td style="width:80px;" >'+ getStrDate(curVouch.CCHECKMAN) + '</td>'
				//单据类型
				+'<td style="width:130px;" dbvalue=' + curVouchType  +   ' >'+curVouchName + '</td>'
				
			+'</tr>');
		 
		 //右边列表
		
		 $("#bodyer_right").append('<tr id="' +curVouch.id  
				    +'" CVOUCHID="' + curVouch.CVOUCHID
				    +'" CVOUCHTYPE="' + curVouch.CVOUCHTYPE
				+'"  bgcolor="#ffffff">'
				
				//单据编号
				+'<td style="width:80px;" dbvalue=' + strNullProc(curVouch.CVOUCHID)  +   ' >'+ strNullProc(curVouch.CVOUCHID) + '</td>'
				//单据日期
				+'<td style="width:80px;" dbvalue=' + getStrDate(curVouch.DVOUCHDATE)  +   ' >'+ getStrDate(curVouch.DVOUCHDATE) + '</td>'
				//客户商
				+'<td style="width:130px;" dbvalue=' + curVenCode  +   ' >'+strNullProc( curVenName) + '</td>'
				//币种
				+'<td style="width:50px;" dbvalue=' + strNullProc(curVouch.CEXCH_NAME)  +   ' >'+ strNullProc(curVouch.CEXCH_NAME) + '</td>'
				//原币金额
				+'<td style="width:106px;" dbvalue=' + strNullProc(curVouch.IAMOUNT_F)  +   ' >'+ strNullProc(curVouch.IAMOUNT_F) + '</td>'
				//本币金额
				+'<td style="width:106px;" dbvalue=' + strNullProc(curVouch.IAMOUNT)  +   ' >'+ strNullProc(curVouch.IAMOUNT) + '</td>'
				//原币余额
				+'<td style="width:106px;" dbvalue=' + strNullProc(curVouch.IRAMOUNT_F)  +   ' >'+ strNullProc(curVouch.IRAMOUNT_F) + '</td>'
				//本币余额
				+'<td style="width:106px;" dbvalue=' + strNullProc(curVouch.IRAMOUNT)   +   ' >'+ strNullProc(curVouch.IRAMOUNT)  + '</td>'
				//部门
				+'<td style="width:108px;" dbvalue=' + curDeptCode  +   ' >'+ strNullProc(curDeptName) + '</td>'
				
				//业务员
				+'<td style="width:54px;" dbvalue=' + curPersonCode + ' >'+ strNullProc(curPersonName) + '</td>'
				//到期日
				+'<td style="width:80px;" dbvalue=' + getStrDate(curVouch.DQDATE)  +   ' >'+ getStrDate(curVouch.DQDATE) + '</td>'
				//账期管理
				+'<td style="width:108px;" dbvalue=' + strNullProc(curVouch.ZQCODE)  +   ' >'+ strNullProc(curVouch.ZQCODE) + '</td>'
				//报销日期
				+'<td style="width:80px;" dbvalue=' + ""  +   ' >'+ "" + '</td>'
				
			+'</tr>');

			 
	 }
 }
 