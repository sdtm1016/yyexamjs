/**
 * 
 * @DESCRIBE   凭证组件出纳签字js
 * @AUTHOR     王丙建
 * @DATE       2012-10-31
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */



/**
 * 显示出纳签字的凭证编号 
 */
var sumMd = "";
var sumMc = "";
//出纳签字凭证列表
var auditAccvouchKeyList = null;

//凭证制单人、审核人、出纳人id列表
var dsignAccvouchPersonIdList = null;




var valueObject = window.parent.valueMap.get("dsignCashier");









function showCashierbill() {
	sumMd = valueObject.sumMd;
	sumMc = valueObject.sumMc;
	auditAccvouchKeyList = valueObject.auditAccvouchKeyList;
	dsignAccvouchPersonIdList = valueObject.dsignAccvouchPersonIdList;
	accvouchKeyCount = auditAccvouchKeyList.length;
	 
	  curDsignYear = valueObject.year; //当前凭证组件年份

	  curDsignPeriod = valueObject.period; //当前凭证组件会计期间
	  
	  curDsignType = valueObject.csign; //当前凭证字
	  
	  curdsignPzbh = valueObject.inoId; //当前凭证编号

	 
	var param = 'title.dsignNumber='+ curdsignPzbh + '&title.dsignType=' + curDsignType 
	+ "&title.dsighYear=" + curDsignYear + "&title.dsignPeriod=" + curDsignPeriod;
	
	$.ajax({
		url:"dsignAccvouch!querySimpleCashierDsignAccvouch.action",
	 	type:'post',
	 	data:param,
	 	async:false,
	    complete:the_results,
		dataType:"json",
		success: function(data){
			//得到后台查询的凭证组件对象
	 		var dsign = data.dsignGridAccvouch;
	 		
	 		queryDsignToAllDignData(dsign);

		}
	});
}


/**
 * 得到全部出纳签字列表的制单人id
 * 王丙建 2013-08-05
 */
function getAllCbillidList() {
	var length = dsignAccvouchPersonIdList.length;
	var billidList = new Array(length);
	for (var i = 0; i<length; i++) {
		var curpersonId = dsignAccvouchPersonIdList[i];
		var curbillid = curpersonId.cbillid;
		billidList[i] = curbillid;
		
	}
	return billidList;
}


/**
 * 得到全部出纳签字的数据
 */
function getAuditAllDsignData() {
	var length = auditAccvouchKeyList.length;
	var data = "";
	for (var i = 0; i<length; i++) {
		var curKey = auditAccvouchKeyList[i];
		var rowMsg = "&accvouchKeyList[" + i + "].iyear=" + curKey.iyear
		           + "&accvouchKeyList[" + i + "].iperiod=" + curKey.iperiod
		           + "&accvouchKeyList[" + i + "].csign=" + curKey.csign
		           + "&accvouchKeyList[" + i + "].dbillDate=" + curKey.dbillDate
		           + "&accvouchKeyList[" + i + "].inoId=" + curKey.inoId;
		
		data = data + rowMsg;
	}
	return data;
}


/***
 * 查询出纳签字凭证集合（银行账科目的凭证）
 */
function queryCashierDsigns() {
	
		var param = valueObject.queryParam;
		var returnObj = null;
	   $.ajax({
			
			  url: "dsignAccvouchAudit!queryCashierBillList.action",
				type: 'post',
				data: param,
				async:false,
				dataType: "json",
				success: function(data){
					returnObj=data;
					var billList=data.billList;
					returnObj.count=billList.length;//凭证总数
					var userid = getCurLoginUserId();
					
					var noCashierCount=0;//未签字凭证数量
					var cashierCount=0;//已签字凭证数量
					var canSignatureCout=0;//可签字的凭证数量（满足制单人不为本人且出纳人为空的凭证为当前操作员可签字的凭证）
					var canCancelSignatureCout=0;//可取消签字的凭证数量（满足制单人不为本人且出纳人为本人的凭证为可取消签字的凭证）
					
					for(var i=0;i<billList.length;i++){
						var ccashier = strNullProc(billList[i].ccashier);//出纳人
						if(ccashier==""){
							noCashierCount++;
						}else{
							cashierCount++;
						}
						
						var bi=billList[i].cbillid;//制单人id
						var ci=billList[i].cashierid;//出纳人id
						var iflag = billList[i].iflag;
						//可签字情况
						if(bi!=userid && iflag!=1 && (ci==0 || ci==null || ci=="")){
							canSignatureCout++;
						}
						
						//可取消签字情况
						if(bi!=userid && iflag!=1 && ci==userid){
							canCancelSignatureCout++;
						}
						
					}
					returnObj.noCashierCount=noCashierCount;
					returnObj.cashierCount=cashierCount;
					returnObj.canSignatureCout=canSignatureCout;
					returnObj.canCancelSignatureCout=canCancelSignatureCout;
					
				}
			  });
	return returnObj;
}


/**
 * 出纳签字全部
 */
function cashierAlldsign() {
	/*
	var curBookkeper = document.getElementById("bookkeeper").innerHTML;
	if (curBookkeeper!="") {
		jAlert("已记账的凭证不允许全部出纳签字！");
	    return;
	}*/
	
	var retObj = queryCashierDsigns();
	
	
	var param = getAuditAllDsignData();
	
	$.ajax({
		url:"dsignAccvouch!cashierDsignAllAccvouch.action",
		type:'post',
		data:param,
		async:false,
		dataType:"json",
		success: function(data){
			
			window.parent.openWindow("gl_dsign_cpqzjgb","dsignCashier",retObj);
			
			showCashierbill();
			
		}
	});
	
	
	
}

/**
 * 取消出纳签字全部
 */

function uncashierAlldsign() {

	/*
	var curBookkeeper = document.getElementById("bookkeeper").innerHTML;
	if (curBookkeeper!="") {
		jAlert("已记账的凭证不允许取消全部出纳签字！");
	    return;
	}
	*/

	var retObj = queryCashierDsigns();
	
	var param = getAuditAllDsignData();
	
	
	
	
	$.ajax({
		url:"dsignAccvouch!cancleCashierDsignAllAccvouch.action",
		type:'post',
		data:param,
		async:false,
		dataType:"json",
		success: function(data){
			
			window.parent.openWindow("gl_dsign_cpqxqzjgb","dsignCashier",retObj);
			
			showCashierbill();
		}
	});
	
	
	
	
	
	
}

/**
 * 凭证出纳签字 
 */
function cashierDsign() {
	if (curDsignFlag==1) {
		jAlert("作废的凭证不允许出纳签字！");
		return ;
	}
	
	if (curDsignFlag==2) {
		jAlert("标错的凭证不允许出纳签字！");
		return ;
	}

	var curBookkeeper = document.getElementById("bookkeeper").innerHTML;
	if (curBookkeeper!="") {
		jAlert("已记账的凭证不允许出纳签字！");
	    return;
	}
	
	var curCashier = document.getElementById("cashier").innerHTML;
	if (curCashier!="") {
		jAlert("已签字的凭证无需再次签字！");
	    return;
	}
	
	var userid = getCurLoginUserId();
	if (userid==curDsignProcuderId) {
		jAlert("出纳人和制单人不能是同一人！");
		return ;
		
	}
	
	var param = 'title.dsignNumber='+ curdsignPzbh + '&title.dsignType=' + curDsignType 
	+ "&title.dsighYear=" + curDsignYear + "&title.dsignPeriod=" + curDsignPeriod;

	$.ajax({
		url:"dsignAccvouch!cashierDsignAccvouch.action",
		type:'post',
		data:param,
		async:false,
		dataType:"json",
		success: function(data){
			jAlert("出纳签字成功！","提示",function(){
				
				queryOneDsign(curDsignYear,curDsignPeriod,curDsignTypeid,curDsignType,curDsignProducerDate,curdsignPzbh);
			});
			
			/**
			showCashierbill();
			if (curaccvouchKeyValue<=1) curaccvouchKeyValue = 1;
			var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];
			 queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
			 */
		}
	});
}




/**
 * 取消出纳签字 
 */
function cancelcashierDsign() {
	
	if (curDsignFlag==1) {
		jAlert("作废的凭证不允许取消出纳签字！");
		return ;
	}
	if (curDsignFlag==2) {
		jAlert("标错的凭证不允许取消出纳签字！");
		return ;
	}

	var curBookkeeper = document.getElementById("bookkeeper").innerHTML;
	if (curBookkeeper!="") {
		jAlert("已记账的凭证不允许取消出纳签字！");
	    return;
	}
	
	var curCashier = document.getElementById("cashier").innerHTML;
	if (curCashier=="") {
		jAlert("此凭证没签字！");
	    return;
	}
	
	var userid = getCurLoginUserId();
	if (userid!=curDsignCashierId) {
		jAlert("取消出纳签字必须由本人取消！");
		return ;
		
	}
	var param = 'title.dsignNumber='+ curdsignPzbh + '&title.dsignType=' + curDsignType 
	+ "&title.dsighYear=" + curDsignYear + "&title.dsignPeriod=" + curDsignPeriod;

	$.ajax({
		url: "dsignAccvouch!cancleCashierDsignAccvouch.action",
		type: 'post',
		data: param,
		async:false,
		dataType: "json",
		success: function(data){
			jAlert("取消出纳签字成功！","提示",function(){
				
				queryOneDsign(curDsignYear,curDsignPeriod,curDsignTypeid,curDsignType,curDsignProducerDate,curdsignPzbh);
			});	
			/**
			showCashierbill();
			if (curaccvouchKeyValue<=1) curaccvouchKeyValue = 1;
			
			var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];  
			 queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
			 */
		}
	});
}

/**
 * 根据凭证关键字查询一张凭证
 * @param tmpiyear  年份
 * @param tmpiperiod 会计期间
 * @param tmpattribute380 凭证类字id
 * @param tmpcsign 凭证类字
 * @param tmpdbillDate 制单日期
 */
function queryOneDsign(tmpiyear,tmpiperiod,tmpattribute380,tmpcsign,tmpdbillDate,tmpinoId) {

	 var data = "accvouchKey.iyear=" + tmpiyear
	            +"&accvouchKey.iperiod=" + tmpiperiod
	            +"&accvouchKey.attribute380=" + tmpattribute380
	            +"&accvouchKey.csign=" + tmpcsign
	            +"&accvouchKey.dbillDate=" + tmpdbillDate
	            +"&accvouchKey.inoId=" + tmpinoId;
	 $.ajax({
		 	url:"dsignAccvouch!queryOneDsignAccvouchByAccvouchkey.action",
		 	type:"post",
		 	data:data,
		    async:false,
		 	dataType:"json",
		 	success:function(data,status){
		 		//得到后台查询的凭证组件对象
		 		var dsign = data.dsignGridAccvouch;
		 		queryDsignToAllDignData(dsign);
		 	}
		});
}


//出错处理
var the_results = function(XMLHttpRequest, textStatus){
		
		if(textStatus == "error"){
		 	msg = "请求出错！";
		 	jAlert(msg);
		}
		else if(textStatus == "timeout"){
		 msg = "请求超时！";
		 jAlert(msg);
		}
		else if(textStatus == "parsererror"){
		 msg = "JSON数据格式有误！";
		 jAlert(msg);
		}else if (textStatus != "success"){
		 msg = "失败";
		 jAlert(msg+textStatus);
		}
};


//关键字总行数
var accvouchKeyCount = 0;

//当前关键字列表中的值
var curaccvouchKeyValue = 1;


/**
 * 根据凭证关键字查询一张出纳签字凭证
 */
function queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey) {
	
	 curDsignYear = curAccvouchKey.iyear; //当前凭证组件年份

	 curDsignPeriod = curAccvouchKey.iperiod; //当前凭证组件会计期间
	  
	 curDsignType = curAccvouchKey.csign; //当前凭证字
	  
	 curdsignPzbh =  curAccvouchKey.inoId; //当前凭证编号

	
	 var data = "accvouchKey.iyear=" + curAccvouchKey.iyear 
	            +"&accvouchKey.iperiod=" + curAccvouchKey.iperiod
	            +"&accvouchKey.attribute380=" + curAccvouchKey.attribute380
	            +"&accvouchKey.csign=" + curAccvouchKey.csign
	            +"&accvouchKey.dbillDate=" + curAccvouchKey.dbillDate
	            +"&accvouchKey.inoId=" + curAccvouchKey.inoId;
	 $.ajax({
		 	url:"dsignAccvouch!queryOneDsignAccvouchByAccvouchkey.action",
		 	type:"post",
		 	data:data,
		    async:false,
		 	dataType:"json",
		 	success:function(data,status){
		 		//得到后台查询的凭证组件对象
		 		var dsign = data.dsignGridAccvouch;
		 		
		 		queryDsignToAllDignData(dsign);
		 	}
		});
}



/**
 * 首张出纳签字凭证
 */
function firstAuditAccvouchkey() {
	 if (accvouchKeyCount==0) return ;
	 curaccvouchKeyValue = 1;
	 var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];  
	 queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
}




/**
 * 末张出纳签字凭证
 */
function lastAuditAccvouchkey() {
	 if (auditAccvouchKeyList==null) return;
	 
	 if (accvouchKeyCount==0) return ;
	 curaccvouchKeyValue = accvouchKeyCount;	 
	 var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];  
	 queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
}

/**
 * 下一张出纳签字
 */
function downAuditAccvouchkey() {
	 if (auditAccvouchKeyList==null) return;
	 curaccvouchKeyValue++;
	 if (curaccvouchKeyValue>=accvouchKeyCount)
		 curaccvouchKeyValue = accvouchKeyCount;
	 var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];  		
	 queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
	 
}

/**
 * 上一张出纳签字
 */
function upAuditAccvouchKey() {
	 if (auditAccvouchKeyList==null) return;
	 
	 curaccvouchKeyValue--;
	 if (curaccvouchKeyValue<=1)
		 curaccvouchKeyValue = 1;
	 var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];  		
	 queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
}






