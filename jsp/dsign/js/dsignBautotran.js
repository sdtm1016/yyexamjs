/**
 * 
 * @DESCRIBE   凭证组件月末转账js
 * @AUTHOR     王丙建
 * @DATE       2012-11-20
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */



/**
 * 显示月末结账的凭证编号 
 */
function showBautotran() {
	
	var param = valueObject.paramObject;	
	var selType = valueObject.seltype;
	curDsignYear = valueObject.iyear;
	curDsignPeriod = valueObject.iperiod;
	curDsignType = valueObject.csign; //当前凭证字
	curdsignPzbh = valueObject.pzbh; //当前凭证编号
	var url = "";
	//自定义结转
	if (selType=="10") {
		var trancodeList = valueObject.trancodeList;
		for (var i = 0; i<trancodeList.length; i++) {
		  var codeParm = "&trancodeList[" + i + "]=" + trancodeList[i];
		  param = param + codeParm;
		}
		url = "glBautotran!execUserBautotran.action";
			
	}
	//对应结转
	else if  (selType=="20") {
		var trancodeList = valueObject.trancodeList;
		for (var i = 0; i<trancodeList.length; i++) {
		  var codeParm = "&trancodeList[" + i + "]=" + 	trancodeList[i];
		  param = param +   codeParm;
		}
		url = "glCspBautotran!execCspBautotran.action";
		
	}
	//销售成本
	else if  (selType=="30") {
		/**
		var trancodeList = valueObject.trancodeList;
		for (var i = 0; i<trancodeList.length; i++) {
		  var codeParm = "&trancodeList[" + i + "]=" + 	trancodeList[i];
		  param = param +   codeParm;
		}
		*/
		//销售成本一览表
		//var costTransData = valueObject.costTransData;
		
		var costTransDataList = valueObject.costTransDataList;
		for (var i = 0; i<costTransDataList.length; i++) {
			//库存科目
			var costParam = "&costTransDataList[" + i+ "].kcCode=" + costTransDataList[i].kcCode
			//成本科目    
			+ "&costTransDataList[" + i+ "].cbCode=" + costTransDataList[i].cbCode
			//收入科目
			+ "&costTransDataList[" + i+ "].srCode=" + costTransDataList[i].srCode
			//平均单价
			+ "&costTransDataList[" + i+ "].avgPrice=" + costTransDataList[i].avgPrice
			//应转数量
			+ "&costTransDataList[" + i+ "].transNumber=" + costTransDataList[i].transNumber
			//应转金额
			+ "&costTransDataList[" + i+ "].transMoney=" + costTransDataList[i].transMoney
			// 帐套id
			+ "&costTransDataList[" + i + "].accid=" + costTransDataList[i].accid
		
			// 年份
			+ "&costTransDataList[" + i+ "].iyear=" + costTransDataList[i].iyear
			//会计期间
			+ "&costTransDataList[" + i+ "].iperiod=" + costTransDataList[i].iperiod
			
			//部门id
			+ "&costTransDataList[" + i+ "].deptid=" + strZeroProc(costTransDataList[i].deptid)
			//个人id
			+ "&costTransDataList[" + i+ "].personid=" + strZeroProc(costTransDataList[i].personid)
			//供应商id
			+ "&costTransDataList[" + i+ "].supid=" + strZeroProc(costTransDataList[i].supid)
			//客户id
			+ "&costTransDataList[" + i+ "].cusid=" + strZeroProc(costTransDataList[i].cusid)
			//项目大类id
			+ "&costTransDataList[" + i+ "].itemclasstid=" + strZeroProc(costTransDataList[i].itemclasstid)
			//项目id
			+ "&costTransDataList[" + i+ "].itemid=" + strZeroProc(costTransDataList[i].itemid)

			
			//凭证类别
			+ "&costTransDataList[" + i+ "].csign=" + costTransDataList[i].csign
			//凭证类别描述
			+ "&costTransDataList[" + i+ "].csigntext=" + costTransDataList[i].csigntext
			//凭证类别id
			+ "&costTransDataList[" + i+ "].signid=" + costTransDataList[i].signid;
			param =  param + costParam;
		}
		
		//alert(param);
		
		url = "glSaleBautotran!execSaleBautotranBycostgrid.action";
		
	}
	else if  (selType=="40") {
		url = "glSaleBautotran!execSalePlanBautotran.action";
		
	}
	//汇兑损益
	else if  (selType=="50") {
		
		
		/**
		var trancodeList = valueObject.trancodeList;
		for (var i = 0; i<trancodeList.length; i++) {
		  var codeParm = "&trancodeList[" + i + "]=" + 	trancodeList[i];
		  param = param +   codeParm;
		}
		url = "glExchBautotran!execExchBautotran.action";
		*/
		
		
		//汇兑损益
		var egalTransDataList = valueObject.egalTransDataList;
		
		for (var i = 0; i<egalTransDataList.length; i++) {
			//入账科目编码
			var costParam  = "&egalTransDataList[" + i + "].rzCode=" + egalTransDataList[i].rzCode
			//入账科目id
			+ "&egalTransDataList[" + i + "].rzCodeid=" + egalTransDataList[i].rzCodeid
			
			//损益科目 编码   
			+ "&egalTransDataList[" + i + "].exchCode=" + egalTransDataList[i].exchCode
			//损益科目id    
			+ "&egalTransDataList[" + i + "].exchCodeid=" + egalTransDataList[i].exchCodeid
			
			//辅助核算类型
			+ "&egalTransDataList[" + i + "].addtype=" + egalTransDataList[i].addtype
			//辅助核算编码
			+ "&egalTransDataList[" + i + "].addCode=" + egalTransDataList[i].addCode
			//辅助核算名称
			+ "&egalTransDataList[" + i + "].addCodename=" + egalTransDataList[i].addCodename
			//损益科目辅助项
			+ "&egalTransDataList[" + i + "].exchCodeFzx=" + egalTransDataList[i].exchCodeFzx
			
			//外币余额①
			+ "&egalTransDataList[" + i + "].exchQmMoney=" + egalTransDataList[i].exchQmMoney
			//本币余额②
			+ "&egalTransDataList[" + i + "].qmMoney=" + egalTransDataList[i].qmMoney
			//月末汇率③
			+ "&egalTransDataList[" + i + "].qmRate=" + egalTransDataList[i].qmRate
			//调整后本币金额④=1*(/)③
			+ "&egalTransDataList[" + i + "].calcQmMoney=" + egalTransDataList[i].calcQmMoney
			//差额⑤=④-②
			+ "&egalTransDataList[" + i + "].differPrice=" + egalTransDataList[i].differPrice
			// 币种id
			+ "&egalTransDataList[" + i + "].exchid=" + egalTransDataList[i].exchid
			// 币种名称
			+ "&egalTransDataList[" + i + "].exchname=" + egalTransDataList[i].exchname
		
			// 帐套id
			+ "&egalTransDataList[" + i + "].accid=" + egalTransDataList[i].accid
		
			// 年份
			+ "&egalTransDataList[" + i + "].iyear=" + egalTransDataList[i].iyear
			//会计期间
			+ "&egalTransDataList[" + i + "].iperiod=" + egalTransDataList[i].iperiod
			
			//凭证类别
			+ "&egalTransDataList[" + i + "].csign=" + egalTransDataList[i].csign
			//凭证类别描述
			+ "&egalTransDataList[" + i + "].csigntext=" + egalTransDataList[i].csigntext
			//凭证类别id
			+ "&egalTransDataList[" + i + "].signid=" + egalTransDataList[i].signid;
			
			param =  param + costParam;
		}
		
		
		
		url = "glExchBautotran!execExchBautotranByexchgridList.action";
		
		
		
	}
	//期间损益结转
	else if  (selType=="60") {
		var trancodeList = valueObject.trancodeList;
		for (var i = 0; i<trancodeList.length; i++) {
		  var codeParm = "&trancodeList[" + i + "]=" + 	trancodeList[i];
		  param = param +   codeParm;
		}
		url = "glPeriodBautotran!execPeriodBautotran.action";
	    //期间损益执行新方法
		//url = "glPeriodBautotran!execPeriodBautotranToDsignAccvouchTmp.action";
		
		//alert("param:"+param);
		
	}
	else {
		url = "glBautotran!execUserBautotran.action";
		
	}
	 //初始化凭证类别状态
	dsign_display_status=0;
	$.ajax({
		url: url,
		type: 'post',
		data: param,
		dataType: "json",
		success: function(data){
			var dsign ;
			//add by lval 20130711   处理凭证集合------
			if(selType=="10"){
				//自定义转账   返回凭证集合
				dsign = data.accvouchList[0];
				//凭证上张下张功能待扩展-------add by lval--20130711-----
			}else{
				//其它类型期末结转
		 		 dsign = data.dsignGridAccvouch;
			}
			
			if (dsign.jfSum==0) {
		 		  jAlert("月末转账金额为0，不能生成转账凭证！","提示",function(){

				 		//queryDsignToAllDignData(dsign);
		 		  });
		 	}else{
		 		queryDsignToAllDignData(dsign);
		 	}
	 		
		}
	});
	
}





//关键字总行数
var accvouchKeyCount = 0;

//当前关键字列表中的值
var curaccvouchKeyValue = 1;


/**
* 根据凭证关键字查询一张转账凭证
*/
function queryOneDsignButtotranAccvouchByAccvouchkey(curAccvouchKey) {
	inoId = curAccvouchKey.inoId;
	csign = valueObject.csign;
	year = curAccvouchKey.iyear;
	period =  curAccvouchKey.iperiod;

	
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
* 首张转账凭证
*/
function firstButtotranAccvouchkey() {
	return;
	 if (accvouchKeyCount==0) return ;
	 curaccvouchKeyValue = 1;
	 var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];  
	 queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
}




/**
* 末张转账凭证
*/
function lastButtotranAccvouchkey() {
	return;
	 if (auditAccvouchKeyList==null) return;
	 
	 if (accvouchKeyCount==0) return ;
	 curaccvouchKeyValue = accvouchKeyCount;	 
	 var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];  
	 queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
}

/**
* 下一张转账
*/
function downButtotranAccvouchkey() {
	  return;
	 if (auditAccvouchKeyList==null) return;
	 curaccvouchKeyValue++;
	 if (curaccvouchKeyValue>=accvouchKeyCount)
		 curaccvouchKeyValue = accvouchKeyCount;
	 var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];  		
	 queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
	 
}

/**
* 上一张转账
*/
function upButtotranAccvouchKey() {
	return;
	 if (auditAccvouchKeyList==null) return;
	 
	 curaccvouchKeyValue--;
	 if (curaccvouchKeyValue<=1)
		 curaccvouchKeyValue = 1;
	 var  curAccvouchKey = auditAccvouchKeyList[curaccvouchKeyValue-1];  		
	 queryOneDsignAuditAccvouchByAccvouchkey(curAccvouchKey);
}




