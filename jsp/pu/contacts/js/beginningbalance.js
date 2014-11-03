/**
 * 
 * @DESCRIBE   期初余额明细表查询界面js
 * @AUTHOR     王丙建
 * @DATE       2013-03-12
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


/**
 * 页面初始化
 */
//应付单 type：pu； 应收单:sa
var moduleType = null;
$(document).ready(function(){
	//表头初始化
	var param = window.parent.valueMap.get("pu_contacts_beginningbalance");
	moduleType = param.moduleType;
	var tb = document.getElementById("scroll_header");
	if (moduleType=="pu") {
		tb.rows[0].cells[1].innerHTML = "供应商编码";
		tb.rows[0].cells[2].innerHTML = "供应商";
	}
	else if(moduleType=="sa")   {
		tb.rows[0].cells[1].innerHTML = "客户编码";
		tb.rows[0].cells[2].innerHTML = "客户";
	}
	else {
		tb.rows[0].cells[1].innerHTML = "供应商编码";
		tb.rows[0].cells[2].innerHTML = "供应商";
	}

	queryData();
	//createDataRows();
	rowSelection();
	leftTableRowClick();
	
});

/**
 * 增加
 */
function add() {
	var param = {};
	 //模块类型
	param.moduleType = moduleType;

	window.parent.openWindow('ap_billtype','pu_contacts_beginningbalance',param);
	window.parent.closeWindow('pu_contacts_beginningbalance');
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
		cell1.width="106";
		cell1.innerHTML=i+"."+1;

		var cell2 = row.insertCell(row.cells.length);
		cell2.width="106";
		cell2.innerHTML=i+"."+2;

	}
	
	
	var tbr = document.getElementById("bodyer_right");
	for(var i=1;i<=50;i++){
		var row = tbr.insertRow(tbr.rows.length);
		
		var cell3 = row.insertCell(row.cells.length);
		cell3.width="80";
		cell3.innerHTML=i+"."+3;

		var cell4 = row.insertCell(row.cells.length);
		cell4.width="80";
		cell4.innerHTML=i+"."+4;

		var cell5 = row.insertCell(row.cells.length);
		cell5.width="130";
		cell5.innerHTML=i+"."+5;

		var cell6 = row.insertCell(row.cells.length);
		cell6.width="100";
		cell6.innerHTML=i+"."+6;

		var cell7 = row.insertCell(row.cells.length);
		cell7.width="50";
		cell7.innerHTML=i+"."+7;

		var cell8 = row.insertCell(row.cells.length);
		cell8.width="200";
		cell8.innerHTML=i+"."+8;

		var cell9 = row.insertCell(row.cells.length);
		cell9.width="60";
		cell9.innerHTML=i+"."+9;

		var cell10 = row.insertCell(row.cells.length);
		cell10.width="106";
		cell10.innerHTML=i+"."+10;

		var cell11 = row.insertCell(row.cells.length);
		cell11.width="106";
		cell11.innerHTML=i+"."+11;

		var cell12 = row.insertCell(row.cells.length);
		cell12.width="80";
		cell12.innerHTML=i+"."+12;

		var cell13 = row.insertCell(row.cells.length);
		cell13.width="80";
		cell13.innerHTML=i+"."+13;

		var cell14 = row.insertCell(row.cells.length);
		cell14.width="80";
		cell14.innerHTML=i+"."+14;

		var cell15 = row.insertCell(row.cells.length);
		cell15.width="80";
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
 * 查询数据
 */
function queryData() {
   var param = window.parent.valueMap.get("pu_contacts_beginningbalance");
   var dataQuery = param.dataQuery;
  // alert("dataQuery:" + dataQuery);
   // 0： 全部；1 采购发票；2应付单；3：预付款
	var djbh = param.djmc;
	$.ajax({
				url: "apDetail!queryListByDealform.action?djbh=" + djbh,
				type: 'post',
				data:dataQuery,
				dataType: "json",
				success: function(data){
					showListApDetail(data.apDetailList);
				}
			  });
   }
	 
/**
 * 应收应付明细列表
 * @param apDetailList
 */	 
function showListApDetail(apDetailList) {
   var length = apDetailList.length;
   $("#bodyer_left").html("");
   $("#bodyer_right").html("");
   var sumMoney = 0;
   for (var i = 0; i<length; i++) {
	   var curapDetail = apDetailList[i];
       //单据类型处理
		 var curVouchType = strNullProc( curapDetail.CVOUCHTYPE);
		 var curVouchName = "";
		 if (curVouchType=="49")
			 curVouchName = "付款单";
		 else if (curVouchType=="48")
			 curVouchName = "收款单";
		 else if (curVouchType=="P0")
			 curVouchName = "其他应付单";
		 else if (curVouchType=="R0")
			 curVouchName = "其他应收单";
		 else if (curVouchType=="01")
			 curVouchName = "采购发票";
		 else
			 curVouchName = curVouchType;
		 //供应商
		  var curVenCode = strNullProc(curapDetail.CDWCODE);
		  var curVenName = "";
		  var venObj = getVendorByCode(curVenCode);
		  	if (venObj!=null) {
		  		curVenName = venObj.cvenabbname;
		  	}
		 
		 //币种
			
		 //部门
		 var curDeptCode = strNullProc(curapDetail.CDEPTCODE);
		 var curDeptName = ""; 
		 var departmentObj = getDepartmentByCode(curDeptCode);
		if (departmentObj!=null) {
		 		curDeptName = departmentObj.cdepname;
		 	}
			  	
	   //业务员
      var curPersonCode = strNullProc(curapDetail.CPERSON);
      var curPersonName = "";
	var personObj = getPersonByCode(curPersonCode);
	if (personObj!=null) {
			curPersonName = personObj.cpersonname;
		 }
	      //科目
	 var ccode = strNullProc(curapDetail.CCODE);
	 var ccodeName = "";
	 var codeObj = getCurCodeObj(ccode);
		if (codeObj!=null) {
			ccodeName = codeObj.ccodeName;
			}
		var curMoney = DoubleNullPtoc(curapDetail.IDAMOUNT);
		sumMoney = sumMoney + curMoney;
		   
	 //左表
		 $("#bodyer_left").append('<tr id="' +curapDetail.id  
				    +'" CVOUCHID="' + curapDetail.CVOUCHID
				    +'" CVOUCHTYPE="' + curapDetail.CVOUCHTYPE
				+'"  bgcolor="#ffffff">'
				//单据类型
				+'<td style="width:106px;" dbvalue= '+ strNullProc(curapDetail.CVOUCHTYPE)  +  ' >'+ strNullProc(curVouchName)+ '</td>'
				//单据编号
				+'<td style="width:106px;" dbvalue=' + strNullProc(curapDetail.CVOUCHID)  +   ' >'+ strNullProc(curapDetail.CVOUCHID) + '</td>'
			+'</tr>');
		 //右表
		 $("#bodyer_right").append('<tr id="' +curapDetail.id  
				    +'" CVOUCHID="' + curapDetail.CVOUCHID
				    +'" CVOUCHTYPE="' + curapDetail.CVOUCHTYPE
				+'"  bgcolor="#ffffff">'
				//单据日期
				+'<td style="width:80px;" dbvalue=' + getStrDate(curapDetail.DVOUCHDATE)  +   ' >'+ getStrDate(curapDetail.DVOUCHDATE) + '</td>'
				//供应商编号
				+'<td style="width:80px;" dbvalue=' + curVenCode +   ' >'+strNullProc(curVenCode) + '</td>'
				//供应商
				+'<td style="width:130px;" dbvalue=' + curVenCode  +   ' >'+strNullProc( curVenName) + '</td>'
				//科目
				+'<td style="width:130px;" dbvalue=' + ccode  +   ' >'+strNullProc(ccodeName) + '</td>'
				//币种
				+'<td style="width:50px;" dbvalue=' + curapDetail.CEXCH_NAME  +   ' >'+ strNullProc(curapDetail.CEXCH_NAME) + '</td>'
				//摘要
				+'<td style="width:200px;" dbvalue=' + strNullProc(curapDetail.CDIGEST)  +   ' >'+ strNullProc(curapDetail.CDIGEST)  + '</td>'
				//方向
				+'<td style="width:60px;" dbvalue=' + strNullProc(curapDetail.CSIGN)   +   ' >'+ strNullProc(curapDetail.CSIGN) + '</td>'
				
				//原币金额
				+'<td style="width:106px;" dbvalue=' + strNullProc(curapDetail.IDAMOUNT_F)  +   ' >'+ strNullProc(curapDetail.IDAMOUNT_F) + '</td>'
				//本币金额
				+'<td style="width:106px;" dbvalue=' + strNullProc(curapDetail.IDAMOUNT)   +   ' >'+ strNullProc(curapDetail.IDAMOUNT) + '</td>'
				//部门
				+'<td style="width:80px;" dbvalue=' + curDeptCode +   ' >'+ strNullProc(curDeptName) + '</td>'
				//项目
				+'<td style="width:80px;" dbvalue=' + strNullProc(curapDetail.CITEMCODE)  +   ' >'+ strNullProc(curapDetail.CITEMCODE) + '</td>'
				
				//业务员
				+'<td style="width:80px;" dbvalue=' + curPersonCode  +   ' >'+ strNullProc(curPersonName) + '</td>'
				//账期管理
				+'<td style="width:80px;" dbvalue=' + strNullProc(curapDetail.ZQCODE)  +   ' >'+ strNullProc(curapDetail.ZQCODE) + '</td>'
				//到期日
				+'<td style="width:80px;" dbvalue=' + getStrDate(curapDetail.DQDATE)  +   ' >'+ getStrDate(curapDetail.DQDATE) + '</td>'
				
			+'</tr>');
   }
   //本币合计
   $("#sumMoney").val(sumMoney);
  
}
	
 
	 
	 

 

