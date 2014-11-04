/**
 * 
 * @DESCRIBE   凭证组件审核js
 * @AUTHOR     王丙建
 * @DATE       2012-10-31
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */



/**
 * 显示审核的凭证编号 
 */

var sumMd = "";
var sumMc = "";
//审核凭证列表
var auditAccvouchKeyList = null;

//凭证制单人、审核人、出纳人id列表
var dsignAccvouchPersonIdList = null;

//已审核凭证张数
var auditCount = 0;
//未审核凭证张数
var unauditCount = 0;
//凭证总张数
var billCount = 0;

//不能审核的数量（成批审核时计算制单人为当前操作员的凭证的数量）
var invalidCount=0;

//凭证审核查询条件
var auditDts = null; 












/**
 * 查询审核凭证集合
 */
function queryAuditDsigns() {
	var param = valueObject.queryParam;
	var returnObj = null;
	   $.ajax({
			
			  url: "dsignAccvouchAudit!queryAuditBillList.action",
				type: 'post',
				data: param,
				dataType: "json",
				async:false,
				success: function(data){
					
					
					returnObj=data;
					var billList=data.billList;
					returnObj.count=billList.length;//凭证总数
					var userid = getCurLoginUserId();

					var noAuditCount=0;//未审核凭证数量
					var auditCount=0;//已审核凭证数量
					var canAuditCount=0;//可审核的凭证数量（满足制单人不为本人且审核人为空的凭证为本人可审核的凭证）
					var canCancelAuditCount=0;//可取消审核的凭证数量（满足制单人不为本人且审核人为本人的凭证为可取消审核的凭证）
					
					for(var i=0;i<billList.length;i++){
						var ccheck = strNullProc(billList[i].ccheck);
						if(ccheck==""){
							noAuditCount++;
						}else{
							auditCount++;
						}

						var bi=billList[i].cbillid;//制单人id
						var ci=billList[i].checkid;//审核人id

						//可审核情况
						if(bi!=userid && (ci==0 || ci==null || ci=="")){
							canAuditCount++;
						}
						
						//可取消审核情况
						if(bi!=userid && ci==userid){
							canCancelAuditCount++;
						}
						
						
						
						
						
					}

					returnObj.noAuditCount=noAuditCount;
					returnObj.auditCount=auditCount;
					returnObj.canAuditCount=canAuditCount;
					returnObj.canCancelAuditCount=canCancelAuditCount;
					
				}
			  });
	return returnObj;
}








//初始化审核界面
function initshowAuditbill() {
	
	//凭证审核查询条件
	auditDts = valueObject.auditDts;
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
		url:"dsignAccvouch!querySimpleAuditDsignAccvouch.action",
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
 * 操作后显示数据
 */
function showAuditbill() {
	
	//凭证审核查询条件
	auditDts = valueObject.auditDts;
	sumMd = valueObject.sumMd;
	sumMc = valueObject.sumMc;
	auditAccvouchKeyList = valueObject.auditAccvouchKeyList;
	
	accvouchKeyCount = auditAccvouchKeyList.length;
	
	  curDsignYear = valueObject.year; //当前凭证组件年份

	  curDsignPeriod = valueObject.period; //当前凭证组件会计期间
	  
	  curDsignType = document.getElementById("dsignType").innerHTML;; //当前凭证字
	  
	  curdsignPzbh = document.getElementById("dsignNumber").innerHTML;; //当前凭证编号
	
	 
	var param = 'title.dsignNumber='+ curdsignPzbh + '&title.dsignType=' + curDsignType 
	 + "&title.dsighYear=" + curDsignYear + "&title.dsignPeriod=" + curDsignPeriod;
	
	$.ajax({
		url:"dsignAccvouch!querySimpleAuditDsignAccvouch.action",
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
 * 判断是否允许出纳签字
 */
function getCnqz() {
	var result = true;
	$.ajax({
		url:"glAccInformation!queryAccinformationByName.action?cname=" + "bProofSign&csysid="+ "GL",
	 	type:'post',
	 	async:false,
	    dataType:"json",
		success: function(data){
			//得到后台查询的凭证组件对象
	 		var accInformation = data.accInformation;
	 		var cvalue = accInformation.cvalue;
	 		if (cvalue=="TRUE") {
	 			//凭证编号
	 			curdsignPzbh = valueObject.inoId;
	 			//凭证类字
	 			curDsignType = valueObject.csign;
	 			//年份
	 			curDsignYear = valueObject.year;
	 			
	 			//会计期间
	 			curDsignPeriod = valueObject.period;

	 			var param = 'title.dsignNumber='+ curdsignPzbh + '&title.dsignType=' + curDsignType 
	 			+ "&title.dsighYear=" + curDsignYear + "&title.dsignPeriod=" + curDsignPeriod;
	 			$.ajax({
	 				url:"dsignAccvouch!queryIsCashierDsignAccvouch.action",
	 			 	type:'post',
	 			 	data:param,
	 			 	async:false,
	 			    complete:the_results,
	 				dataType:"json",
	 				success: function(data){
	 					//得到后台查询的凭证组件对象
	 			 		var cashier = data.checker;
	 			 		if (strNullProc(cashier)=="") {
	 			 		result = false;
  			 		}
	 			 		
	 				}
	 			});
	 			
	 		}
	 		
		}
	});
	return result;
}


/**
 * 得到全部审核的数据
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




/**
 * 审核全部
 */
function auditAlldsign() {
	
	
	
	var retObj = queryAuditDsigns();
	var param = getAuditAllDsignData();
	

	$.ajax({
		url:"dsignAccvouch!auditDsignAllAccvouch.action",
		type:'post',
		data:param,
		async:false,
		dataType:"json",
		success: function(data){
			
			
			window.parent.openWindow("gl_dsign_cpshjgb","dsignAudit",retObj);
			showAuditbill();
		}
	});
	
	
	
	
	
	
	
}




/**
 * 取消审核全部
 */

function unauditAlldsign() {
	
	
	
	

	var retObj = queryAuditDsigns();
	var param = getAuditAllDsignData();
		
		
		
	
	$.ajax({
		url:"dsignAccvouch!cancleAuditDsignAllAccvouch.action",
		type:'post',
		data:param,
		async:false,
		dataType:"json",
		success: function(data){
			
		
			
			window.parent.openWindow("gl_dsign_cpqxshjgb","dsignAudit",retObj);
			showAuditbill();

		}
	});
	
	
	
	
}

/**
 * 凭证审核 
 */
function auditDsign() {
	/*shulei*/
	window.parent.parent.updateScore(2,0);
	jAlert("审核成功！","提示",function(){
	});
	return;
	
	var curBookkeeper = document.getElementById("bookkeeper").innerHTML;
	//作废的凭证不能审核
	if (curDsignFlag==1) {
		jAlert("作废的凭证不允许审核！");
		return ;
	}
	
	//作废的凭证不能审核
	if (curDsignFlag==2) {
		jAlert("标错的凭证不允许审核！");
		return ;
	}

	if (curBookkeeper!="") {
		jAlert("已记账的凭证不允许审核！");
	    return;
	}
	
	if (getCurLoginUserId()==curDsignProcuderId) {
		jAlert("审核人和制单人不能为同一个人！");
		return;
	}
	var curAudit = document.getElementById("audit").innerHTML;
	if (curAudit!="") {
		jAlert("已审核的凭证无需再次审核！");
	    return;
	}
	var cnqzBz = getCnqz();
	if (cnqzBz==false) {
		jAlert("请首先进行出纳签字，然后再审核凭证！");
		 return;
	}
	else {
		//凭证编号
		curdsignPzbh = document.getElementById("dsignNumber").innerHTML;
		//凭证类字
		curDsignType = document.getElementById("dsignType").innerHTML;

		var param = 'title.dsignNumber='+ curdsignPzbh + '&title.dsignType=' + curDsignType 
		+ "&title.dsighYear=" + curDsignYear + "&title.dsignPeriod=" + curDsignPeriod;
		
		$.ajax({
			url:"dsignAccvouch!auditDsignAccvouch.action",
			type:'post',
			data:param,
			async:false,
			dataType:"json",
			success: function(data){
				jAlert("审核成功！","提示",function(){
					
					queryOneDsign(curDsignYear,curDsignPeriod,curDsignTypeid,curDsignType,curDsignProducerDate,curdsignPzbh);
				});
				/**
				showAuditbill();
				if (curaccvouchKeyValue<=1) curaccvouchKeyValue = 1;
				var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];  
				queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
				*/
			}
		});
	}
}




/**
 * 取消审核 
 */
function cancelAuditDsign() {
	
	
	
	
	//查询凭证
	
	
	//作废的凭证不能审核
	if (curDsignFlag==1) {
		jAlert("作废的凭证不允许取消审核！");
		return ;
	}
	
	//作废的凭证不能审核
	if (curDsignFlag==2) {
		jAlert("标错的凭证不允许取消审核！");
		return ;
	}

	
	var curBookkeeper = document.getElementById("bookkeeper").innerHTML;
	if (curBookkeeper!="") {
		jAlert("已记账的凭证不允许取消审核！");
	    return;
	}
	var userid = getCurLoginUserId();
	if (userid==curDsignProcuderId) {
		jAlert("取消审核人和制单人不能为同一个人！");
		return;
	}
	var curAudit = document.getElementById("audit").innerHTML;
	if (curAudit=="") {
		jAlert("此凭证没复核！");
	    return;
	}
	if(userid!=curDsignAuditId){
		jAlert("取消审核人和原审核人不是同一人！");
	    return;
	}
	
	
	/*
	var cnqzBz = getCnqz();
	if (cnqzBz==false) {
		jAlert("请首先进行出纳签字，然后再取消审核凭证！");
		 return;
	}
	*/
	else {
		//凭证编号
		curdsignPzbh = document.getElementById("dsignNumber").innerHTML;
		//凭证类字
		curDsignType = document.getElementById("dsignType").innerHTML;

		var param = 'title.dsignNumber='+ curdsignPzbh + '&title.dsignType=' + curDsignType 
		+ "&title.dsighYear=" + curDsignYear + "&title.dsignPeriod=" + curDsignPeriod;
		$.ajax({
			url: "dsignAccvouch!cancleAuditDsignAccvouch.action",
			type: 'post',
			data: param,
			async:false,
			dataType: "json",
			success: function(data){
				jAlert("取消审核成功！","提示",function(){
					
					queryOneDsign(curDsignYear,curDsignPeriod,curDsignTypeid,curDsignType,curDsignProducerDate,curdsignPzbh);
				});	
				/**
				showAuditbill();
				if (curaccvouchKeyValue<=1) curaccvouchKeyValue = 1;
				var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];  
				queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
				*/
			}
		});
	}
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

/**
 * 凭证标错
 */
var errorBz= true;
function errorDsign() {
	//作废的凭证不能审核
	if (curDsignFlag==1) {
		jAlert("作废的凭证不允许标错！");
		return ;
	}
	
	
	var curBookkeeper = document.getElementById("bookkeeper").innerHTML;
	if (curBookkeeper!="") {
		jAlert("已记账的凭证不允许凭证标错！");
	    return;
	}
	
	//凭证编号
	curdsignPzbh = document.getElementById("dsignNumber").innerHTML;
	//凭证类字
	curDsignType = document.getElementById("dsignType").innerHTML;

	var param = 'title.dsignNumber='+ curdsignPzbh + '&title.dsignType=' + curDsignType 
	+ "&title.dsighYear=" + curDsignYear + "&title.dsignPeriod=" + curDsignPeriod;
	
	
	if (errorBz) {
	$.ajax({
		url: "dsignAccvouch!errorDsignAccvouch.action",
		type: 'post',
		data: param,
		async:false,
		dataType: "json",
		success: function(data){
			errorBz = false;
			$("#yishengchengDsignimg").hide();
			$("#zuofeiDsignimg").hide();
			$("#errorDsignimg").show();
		}
	});
	
	
	}
	else {
		CancelErrorDsign();
	}
}

/**
 * 取消凭证标错
 */
function CancelErrorDsign() {
	var curBookkeeper = document.getElementById("bookkeeper").innerHTML;
	if (curBookkeeper!="") {
	    return;
	}
	//凭证编号
	curdsignPzbh = document.getElementById("dsignNumber").innerHTML;
	//凭证类字
	curDsignType = document.getElementById("dsignType").innerHTML;

	var param = 'title.dsignNumber='+ curdsignPzbh + '&title.dsignType=' + curDsignType 
	+ "&title.dsighYear=" + curDsignYear + "&title.dsignPeriod=" + curDsignPeriod;
	//alert("审核参数：" + param);
	$.ajax({
		url: "dsignAccvouch!cancelErrorDsignAccvouch.action",
		type: 'post',
		data: param,
		async:false,
		dataType: "json",
		success: function(data){
			errorBz = true;
			document.getElementById("errorDsignimg").style.display = "none";
			
		}
	});
}


//出错处理
var the_results = function(XMLHttpRequest, textStatus){
		
		if(textStatus == "error"){
		 	msg = "请求出错！";
		 	jAlert(msg,"提示");
		}
		else if(textStatus == "timeout"){
		 msg = "请求超时！";
		 	jAlert(msg,"提示");
		}
		else if(textStatus == "parsererror"){
		 msg = "JSON数据格式有误！";
		 	jAlert(msg,"提示");
		}else if (textStatus != "success"){
		 msg = "失败";

		 	jAlert(msg+textStatus,"提示");
		}
};


//关键字总行数
var accvouchKeyCount = 0;

//当前关键字列表中的值
var curaccvouchKeyValue = 1;


/**
 * 根据凭证关键字查询一张审核凭证
 */
function queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey) {
	
	
	 curDsignYear = curAccvouchKey.iyear; //当前凭证组件年份

	 curDsignPeriod = curAccvouchKey.iperiod; //当前凭证组件会计期间
	  
	 curDsignType = curAccvouchKey.csign; //当前凭证字
	  
	 curdsignPzbh = curAccvouchKey.inoId; //当前凭证编号

	
	
	
	
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
 * 首张审核凭证
 */
function firstAuditAccvouchkey() {
	 if (accvouchKeyCount==0) return ;
	 curaccvouchKeyValue = 1;
	 var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];  
	 queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
}




/**
 * 末张审核凭证
 */
function lastAuditAccvouchkey() {
	 if (auditAccvouchKeyList==null) return;
	 if (accvouchKeyCount==0) return ;
	 curaccvouchKeyValue = accvouchKeyCount;	 
	 var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];  
	 queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
}

/**
 * 下一张审核
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
 * 上一张审核
 */
function upAuditAccvouchKey() {
	 if (auditAccvouchKeyList==null) return;
	 
	 curaccvouchKeyValue--;
	 if (curaccvouchKeyValue<=1)
		 curaccvouchKeyValue = 1;
	 var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];  		
	 queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
}






