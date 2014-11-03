/**
 * 
 * @DESCRIBE   采购管理：月结检测js
 * @AUTHOR     王丙建
 * @DATE       2013-08-28
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

/**
 * 页面初始化
 */
$(document).ready(function(){
	
	//查询没有核销的预付款
	queryWhxApCloseBill();
	  
	 
});


/**
 * 查询未记账凭证
 */
function queryWjzDsign() {
	$("#datatable_bodyer").html("");
}
/**
 * 月结检测
 */
function queryWhxApCloseBill() {
	var valueObject = window.parent.valueMap.get("pu_monthend_monthcheck");
	var cyear  = valueObject.cyear;
	var cperiod  = valueObject.cperiod;
	
	
	$("#datatable_bodyer").html("");
	$.ajax({
	    url: "apCloseBill!queryWhxApCloseBill.action?vouchType=49&year=" +cyear + "&cperiod=" +  cperiod,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	var monthJcDataList = data.monthJcDataList;
	    	showWhxApCloseBill(monthJcDataList);
	    }
  });
}

/**
 * 显示月结检测数据
 * @param periodList 会计期间列表
 */

function showWhxApCloseBill(monthJcDataList) {
	  var length = monthJcDataList.length;
	  
	  for (var i = 0; i<length; i++) {
			var jcdata = monthJcDataList[i];
			
			var vouchTypeName = "付款单";
			
				
			$("#datatable_bodyer").append('<tr id="' +jcdata.vouchid  
					    +'" vouchType="' + jcdata.vouchType 
					+'"  bgcolor="#ffffff">'
					+'<td width="70" >'+ vouchTypeName + '</td>'
					+'<td width="70" >'+ jcdata.vouchid + '</td>'
					+'<td width="70" >'+ getStrDate(jcdata.vouchDate) + '</td>'
					+'<td width="70" >'+  jcdata.dwcode + " " + jcdata.dwcodeName + '</td>'
					
				+'</tr>');
			
		}
}

/**
 * 检测类型
 */
function jictypechange() {
	var jctype = $("#jctypeList").val();
	if (jctype=="2") {
		queryWhxApCloseBill();
	}
	else if (jctype=="1"){
		queryWjzDsign();	
	}
	else {
		queryWhxApCloseBill();
	}
	
	  
}


