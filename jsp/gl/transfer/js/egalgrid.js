/**
 * 
 * @DESCRIBE   汇兑损益试算表界面js
 * @AUTHOR     王丙建
 * @DATE       2013-07-26
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


/**
 * 显示汇兑损益一览表
 */



//汇兑损益试算表列表
var egalTransDataList = null;
function showEgalgrid() {
	var param = valueObject.paramObject;
	//外币科目列表
	var trancodeList = valueObject.trancodeList;
	var exchid = valueObject.exchid;
	
	for (var i = 0; i<trancodeList.length; i++) {
	  var codeParm = "&trancodeList[" + i + "]=" + trancodeList[i];
	  param = param + codeParm;
	}
	$.ajax({
		url: 'glExchBautotran!showExchGridList.action?exchid=' + exchid,
		type: 'post',
		data: param,
		dataType: "json",
		success: function(data){
		  egalTransDataList = data.egalTransDataList;
	      initEgalgridList(egalTransDataList)
		}
	});
}

/**
 * 初始化汇兑损益试算表列表
 * @param egalTransDataList
 */
function initEgalgridList(egalTransDataList) {
	var length = egalTransDataList.length;
	//凭证类字
	$("#csigntext").html(egalTransDataList[0].csigntext);
    //入账科目
	$("#rzCode").html(egalTransDataList[0].rzCode);
	$("#rzCodename").html(egalTransDataList[0].rzCodename);
   
	if (length==0) return ;
	for (var i = 0; i<length; i++) {
		var curegalTransData = egalTransDataList[i];
		//汇兑损益试算表数值显示
		$("#left_table_datarows").append('<tr isAudited="false"  id="' +curegalTransData.exchCode  
				+ '"  style="background-color:#FFFFFF">'
				+'<td width="150" >'+ curegalTransData.exchCode  + '</td>'
				+'</tr>');
		$("#right_table_datarows").append('<tr isAudited="false"  id="'+curegalTransData.exchCode  
				+ '"  style="background-color:#FFFFFF">'
				//科目名称
				+'<td width="150" >'+ strNullProc(curegalTransData.echcCodename) + '</td>'
				//辅助核算
				+'<td width="100" >'+ strNullProc(curegalTransData.addtype  ) + '</td>'
				//辅助核算编码
				+'<td width="150" >'+ strZeroProc(curegalTransData.addCode  ) + '</td>'				
				//辅助核算名称
				+'<td width="150" >'+ strZeroProc(curegalTransData.addCodename  ) + '</td>'				
				//外币余额①
				+'<td width="100" >'+ strZeroProc(curegalTransData.exchQmMoney  ) + '</td>'				
				//本币余额②
				+'<td width="100" >'+ strZeroProc(curegalTransData.qmMoney  ) + '</td>'				
				//月末汇率③
				+'<td width="100" >'+ strZeroProc(curegalTransData.qmRate  ) + '</td>'				
				//调整后本币金额④=1*(/)③
				+'<td width="100" >'+ strZeroProc(curegalTransData.calcQmMoney  ) + '</td>'				
				//差额⑤=④-②
				+'<td width="100" >'+ strZeroProc(curegalTransData.differPrice  ) + '</td>'				
					
				+'</tr>');
	}
}


/**
 * 开始汇兑损益
 */
function beginEgalTrans() {
	
	var sumExchQmMoney = 0;
	var sumDifferPrice = 0;
	var sumQmRate = 0;
	
	for (var i =0; i<egalTransDataList.length; i++) {
		var curData =  egalTransDataList[i];
		//外币余额①
		var exchQmMoney  = curData.exchQmMoney;	
		//月末汇率③
		var qmRate = curData.qmRate;
		//差额⑤=④-②
		var differPrice   = curData.differPrice;
		sumExchQmMoney = sumExchQmMoney + exchQmMoney*1;
		sumDifferPrice = sumDifferPrice + differPrice*1;
		sumQmRate = sumQmRate + qmRate*1;
		

		
	}
	if (sumExchQmMoney==0 ||sumDifferPrice==0 || sumQmRate==0 ) {
		jAlert("不能生成汇兑损益！","提示");
		return ;
	}
	var param = {};
	param.egalTransDataList = egalTransDataList;
	param.paramObject =  valueObject.paramObject;
	param.seltype = valueObject.seltype;
	window.parent.openWindow('dsignBautotran','gl_transfer_egalgrid',param);
	window.parent.closeWindow('gl_transfer_egalgrid');
}