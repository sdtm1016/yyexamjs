/**
 * 
 * @DESCRIBE   采购管理：月末结账界面js
 * @AUTHOR     王丙建
 * @DATE       2013-03-13
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

/**
 * 页面初始化
 */
$(document).ready(function(){
	//会计期间初始化
	queryPuUaPeriods();
	  
	 
});

function queryPuUaPeriods() {
	$("#datatable_bodyer").html("");
	$.ajax({
	    url: "foreigncurrency!queryUaPeriods.action",
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	var uaPeriodList = data.uaPeriods;
	    	showPeriodGrid(uaPeriodList);
	    }
  });
}

/**
 * 会计期间初始化
 * @param periodList 会计期间列表
 */

function showPeriodGrid(periodList) {
	  var length = periodList.length;
	  //帐套启用月份
	  var accountMonth = getCookie("accountMonth");
	  var startMonth = accountMonth*1-1;
	  
	  for (var i = startMonth; i<length; i++) {
			var uaPeriod = periodList[i];
			
			 
			var cyear = uaPeriod.iyear;
			var	ciid = uaPeriod.iid;
			//var strPeriod = cyear + "." + ciid;
			//是否结账标志
			var puFlag = uaPeriod.puFlag;
			//是否结账字符串
			var strPuFlag = "";
			if  (puFlag==0) {
				strPuFlag = "未结账";
			}
			else if (puFlag==2) {
				strPuFlag = "已结账";
			}
			else {
				strPuFlag = "未结账";	
			}
				
			$("#datatable_bodyer").append('<tr id="' +uaPeriod.id  
					    +'" iyear="' + cyear
						+'" iid="' +  ciid					
					+'"  bgcolor="#ffffff">'
					+'<td width="70" >'+ uaPeriod.iid + '</td>'
					+'<td width="70" >'+ getStrDate(uaPeriod.dbegin) + '</td>'
					+'<td width="70" >'+ getStrDate(uaPeriod.dend) + '</td>'
					+'<td width="70" >'+  strPuFlag + '</td>'
					
					+'<td width="80"  ondblClick="selectTd(this)">'+"" + '</td>'				
				+'</tr>');
			
		}
}



//选择id、年份、会计期间
var selId = null;
var selYear =null ;
var selIid = null ;
var clickBz = true; //双击标志
var curPeriod = "";


/**
 * 双击事件
 * @param td
 */
function selectTd(td) {
	  selId = td.parentNode.id;
	  selYear = td.parentNode.iyear;
	  selIid = td.parentNode.iid;
	 
	 if (clickBz) {
		 td.innerHTML="选中";
		 clickBz = false;
	 }
	 else {
		 td.innerHTML=""; 
		  selId = "";
		  selYear = "";
		  selIid = "";
		 clickBz = true;
	 }
}

/**
 * 月末结账
 */
function closeAccount() {
	  if (strNullProc(selYear)=="") {
		  alert("你还没有选择会计期间，不能进行结账！");
		  return ;
	  }
	  var data = "&period.iyear=" + selYear
	           + "&period.iid=" + selIid
	            + "&period.id=" + selId;
	  
	  
	  
	 //  alert(data);	 
	  var count = queryWhxApCloseBillNumber(selYear, selIid);
	  if (count>0) {
		  alert("本月付款单未全部付款核销，点击月结检测按钮查看未处理业务！");
		  return ;
	  }
	  var isuniqueness = true;
	  
	  //判断是否允许结账
	  
	  $.ajax({
		    url: "puCloseAccount!isUniquenessCloseAccount.action",
		    type: 'post',
		    dataType: "json",
		    data:data,
		    async:false,
		    success: function(data){
		    	isuniqueness = data.isuniqueness;
		    	if(isuniqueness==false){
					alert("你选择的上一个期间还没有结账，本期间不允许结账！");
					return false;
				}
		    }
	  });
	  
	  //上月结账成功后，本月才允许结账
      if (isuniqueness==true) {
    	 // alert(data);
    	  $.ajax({
			    url: "puCloseAccount!execPuCloseAccount.action",
			    type: 'post',
			    dataType: "json",
			    data:data,
			    async:false,
			    success: function(data){
			    	jAlert("你选择的月份结账成功！","提示");
			    	queryPuUaPeriods();
			    	
			    }
		  });
    	  
    	  		 
      }
	
}


/**
 * 月结检测
 */
function queryWhxApCloseBillNumber(cyear, cperiod) {
	var count = 0;
	$.ajax({
	    url: "apCloseBill!queryWhxApCloseBill.action?vouchType=49&year=" +cyear + "&cperiod=" +  cperiod,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	var monthJcDataList = data.monthJcDataList;
	    	count = monthJcDataList.length;
	    }
  });
	return count ;
}

/**
 * 取消月末结账
 */
function upcloseAccount() {
	 
	  if (strNullProc(selYear)=="") {
		  alert("你还没有选择会计期间，不能进行取消月末结账！");
		  return ;
	  }

	var data = "&period.iyear=" + selYear
      + "&period.iid=" + selIid
       + "&period.id=" + selId;

	//  alert(data);	 
	$.ajax({
		    url: "puCloseAccount!executeCanclePuCloseAccount.action",
		    type: 'post',
		    dataType: "json",
		    data:data,
		    async:false,
		    success: function(data){
		    	jAlert("你选择的月份取消结账成功！","提示");
		    	queryPuUaPeriods();
		    	
		    }
	  });
}

/**
 * 月结检测
 */
function checkAccount() {
	if (strNullProc(selYear)=="") {
		  alert("你还没有选择会计期间，不能进行月结检测！");
		  return ;
	  }
	  var param = {};
	  //月结年份
	  param.cyear = selYear;
	  //月结会计期间
	  param.cperiod = selIid;
	  
	  window.parent.openWindow('pu_monthend_monthcheck','pu_monthend_monthend',param);
	  window.parent.closeWindow('pu_monthend_monthend');		
}

/**
 * 退出
 */
function exitAccount() {
	window.parent.closeWindow('pu_monthend_monthend');	
}