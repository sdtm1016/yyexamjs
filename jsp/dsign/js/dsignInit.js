/**
 * 

           * @DESCRIBE   凭证组件：对象初始化
 * @AUTHOR     王丙建
 * @DATE       2012-09-11
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

 
/**
 * 变量初始化
 */


var tail = new DsignTail(); //表尾对象
var dsignTail ;
var title = new DsignTitle(); //表头对象
var subject = new DsignSubject(); //科目辅助核算对象
var cell = new Cell();  //单元格对象
var kemuCell = new KemuCell(); //科目单元格对象
var row = new DsignRow(); //分离行对象
var pageGrid = new DsignPageGrid(); //当前页输入表格对象 
var grid = new DsignGrid();   //输入表格对象
var dsign = new Dsign(); //凭证组件对象

//下面为判断凭证关键字的凭证组件全局变量 王丙建 2013-07-30
var curDsignProcuderId = null; //当前凭证制单人id

var curDsignAuditId = null; //当前凭证审核人id

var curDsignBookkeeperId = null; //当前凭证记账人id

var curDsignCashierId = null; //当前凭证出纳人id

var curDsignFlag = null; //当前凭证标志，1：作废凭证，0：未作废凭证
var curOutDsignFlag = null; //外部凭证标志

//凭证组件全局变量结束

//允许保存凭证标志
var saveDsignBz = true;

/***
 * 由于saveDsignByAction()函数在检查数据时如果遇到错误会弹出提示，
 * 同时返回null到上层函数，上层函数接收到null又会弹出“请将数据输入完整”的提示，
 * 但实际上遇到错误的情况两个提示都会弹出，第一个提示几乎无法用肉眼看到，
 * 因为与alert不同，jAlert不会暂停js执行，为了兼容JAlert控件，
 * 特创建此变量，调用saveDsignByAction()函数的地方接收到null值时，
 * 弹出提示内容为tempErrorMassage存储的内容
 */
var tempErrorMassage="";//保存凭证时，数据检查错误提示信息变量。
var tempErrorDom=null;//发生错误的控件，弹出提示后让其获得焦点。




 /**
  * 保存查询对象
  */
 function saveDsignByAction() {
	
	 
	 

	//判断日期是否符合要求
	 var operDate = getCookie("operDate");
     
     
     var producerDate = $("#producerDate").val();
     var reg = /^\d{4}-\d{1,2}-\d{1,2}$/;
     if(!reg.test(producerDate)){
    	 jAlert("日期或日期格式不合法！");
    	 return false;
     }
     var pda = producerDate.split("-");
     var pdy = parseInt(pda[0],10);
     var pdm = parseInt(pda[1],10);
     var pdd = parseInt(pda[2],10);

     if(pdy==0){
    	 jAlert("日期或日期格式不合法！");
    	 return false;
     }
     if(pdm==0 || pdm>12){
    	 jAlert("日期或日期格式不合法！");
    	 return false;
     }
     if(pdd==0 || pdd>31){
    	 jAlert("日期或日期格式不合法！");
    	 return false;
     }
     
     //比较当前月份天数是否正确
	 var ygts = getDaysByYearAndMoth(pdy, pdm);
	 if(pdd>ygts){
		 jAlert("日期或日期格式不合法！");
		 return false;
	 }
     
     
     if(pdm<10){
    	 pdm="0"+pdm;
     }
     
     if(pdd<10){
    	 pdd="0"+pdd;
     }
     
     
     

     
     
     var ody = parseInt(operDate.split("-")[0],10);//登录系统的日期的年份

     /*制单日期判断仅考虑了年份，所以只要年份不等，则不在会计年度内，不能制单。*/
     if(pdy<ody){
		 jAlert("日期不能超前建账日期！");
		 return false;
     }
     
	  	var sd = new Date();
		var edy = sd.getFullYear();
		var edm = sd.getMonth()+1;
		var edd = sd.getDate();
		//进行相减的小日期（来自startDate的转换）
		var smallDate = new Date(edy+"/"+edm+"/"+edd);
		
		//进行相减的大日期（来自newSelectedDate的转换）
		var bigDate = new Date(pdy+"/"+pdm+"/"+pdd);
		
		//计算被点击结束日期与其起始日期的天数差
		var differenceDay=bigDate.getTime()-smallDate.getTime();
		if(differenceDay>0){
			jAlert("日期不能滞后系统日期！");
			return false;
		}
		
     
     //如果制单日期不等于操作日期
     if(pdy!=ody){
		jAlert("日期必须在当前会计年度内！");
		return false;
	}
     
     
     
     //日期合法，重新按完整格式赋值到控件
     $("#producerDate").val(pdy+"-"+pdm+"-"+pdd);
     
     
     
     
	 //表格值转换为字符串传递到后台
	 var curTail = getDsignTail();
	 var curTitle = getDsignTitle();
	 var valueList = getDsignAllCellValue();
	 
	 
	 if (valueList==null || valueList.length==0) {
		 return null;
	 }
	 
	 
	 

     var curPeriod = getLoginPeriod();
     
     if (curPeriod==null) {
    	 jAlert("你选择的日期找不到对应的会计期间，请重新选择日期!","提示");
    	 return false;
     }
     
     if (curPeriod.glflag !="0") {
    	 jAlert("你选择的日期所在的会计期间已经结账或者记账，不允许填制凭证!","提示");
    	 return false;
     }
     
	 var curBookkeeper = document.getElementById("bookkeeper").innerHTML;
	if (curBookkeeper!="") {
		jAlert("已记账的凭证不允许保存！","提示");
		    return false;
	 }
	
	var curaudit = document.getElementById("audit").innerHTML;
		if (curaudit!="") {
			jAlert("已审核的凭证不允许保存！","提示");
		    return false;
	 }
	if(pageWindowId=="dsign"){
		
		//转账凭证和外部凭证不允许修改
		var curDsignSelectedDate=document.getElementById("producerDate").value;
	      var curAtt380 = document.getElementById("dsignType").getAttribute("value");
	      var curDsginPzbh = document.getElementById("dsignNumber").innerHTML;
	      var isoutsign = false;
	      var isoutsignurl = "dsignAccvouch!isOutDsignAccvouch.action?curAtt380=" + curAtt380 
	     + "&selectedDate=" + curDsignSelectedDate + "&pzbh=" + curDsginPzbh;
	     
	     $.ajax({
		  		url: isoutsignurl,
		  		type: 'post',
		  		async:false,
		  		dataType: "json",
		  		success: function(data){
		  			isoutsign = data.isoutsign;
		  		}
		  	});
	     
	     if (isoutsign==true) {
		    	 jAlert("外部凭证不允许修改！","提示");
		    	 return false;
		  }
		

	}
	 
	 


		 
		 var strValue = valueList.toString();
		 var data = {};
		 data.tail=curTail;
		 data.title = curTitle;
		 data.strDsignValue = strValue;
		 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 /*
	 if (getJfSumValueStr()==""){
		 jAlert("借贷方金额为0，不允许保存！","提示");
		 return false;
	 }
	 */
		 
	 //借方金额合计
	 var jfhj = getJfSumValue();
	 //贷方金额合计
	 var dfhj = getDfSumValue();
	 
	 /*
	 if (jfhj==0) {
		 jAlert("凭证金额为0，不允许保存！","提示");
		 return false;
	 }
	 */
	 
	 if (jfhj!=dfhj) {
		 jAlert("你输入的凭证借贷不平衡，不允许保存！","提示");
		 return false;
				 
	 }
	 //保证输入的最后一行值存入全局行值数组中
	 //王丙建 2013-06-26
	 if (saveDsignBz==false)
		 return false;
	 //王丙建 2013-05-21 保存凭证时判断输入的科目是否符合规则要求,任何类型生成的凭证都受科目限制
	 //if (dsignOpType=="edit") {
		 if (1==1) {
		 var curSelCsign =  document.getElementById("dsignType").innerHTML;
		 if (curSelCsign=="") {
			 jAlert("凭证类别字不允许为空！","提示");
			 return false;
		 }
		 var curSelDsignCategory = getDsignCategoryByCsign(curSelCsign);
		 if (curSelDsignCategory==null) {
			 jAlert("你选择的凭证类别不存在","提示");
			 return false;
		 }
		 var curSelDsignNumber =  document.getElementById("dsignNumber").innerHTML;
		 if (curSelDsignNumber=="") {
			 jAlert("凭证编号不允许为空！","提示");
			 return false; 
		 }
			
		 var type = curSelDsignCategory.itype;
		 var strlimitCode = getDsignsByCsign(curSelCsign);
		 //借方必有
		 if (type==1) {
			 var resultValue = comparelimitType1(strlimitCode);
			 if (resultValue==false) {
				 var msg = "你输入的借方科目必须至少包含一个受控的科目!" + "\n"
				        +"受控科目为：" + strlimitCode;
				 msg = "不满足借方必有条件";
				 jAlert(msg,"提示");
				 return false;
			 }
		 }
		 //贷方必有
		 else if (type==2) {
			 var resultValue = comparelimitType2(strlimitCode);
			 if (resultValue==false) {
				 var msg = "你输入的借方科目必须至少包含一个受控的科目!" + "\n"
				        +"受控科目为：" + strlimitCode;
				 msg = "不满足贷方必有条件";
				 jAlert(msg,"提示");
				 return false;
			 }
		 }
		 //凭证必无
		 else if (type==3) {
			 var resultValue = comparelimitType3(strlimitCode);
			 
			 if (resultValue==true) {
				 var msg = "你输入的借方科目必须至少包含一个受控的科目!" + "\n"
				        +"受控科目为：" + strlimitCode;
				 msg = "不满足凭证必无条件";
				 jAlert(msg,"提示");
				 return false;
			 }
		 }
		
		 //凭证必有
		 else if (type==4) {
			 var resultValue = comparelimitType4(strlimitCode);
			 if (resultValue==false) {
				 var msg = "你输入的借方科目必须至少包含一个受控的科目!" + "\n"
				        +"受控科目为：" + strlimitCode;
				 msg = "不满足凭证必有条件";
				 jAlert(msg,"提示");
				 return false;
			 }
		 }
		 //借方必无
		 else if (type==5) {
			 var resultValue = comparelimitType5(strlimitCode);
			 
				
			 if (resultValue==true) {
				 var msg = "你输入的借方科目必须至少包含一个受控的科目!" + "\n"
				        +"受控科目为：" + strlimitCode;
				 msg = "不满足借方必无条件";
				 jAlert(msg,"提示");
				 return false;
			 } 
		 }
		 //贷方必无
		 else if (type==6) {
			 var resultValue = comparelimitType6(strlimitCode);
			 if (resultValue==true) {
				 var msg = "你输入的借方科目必须至少包含一个受控的科目!" + "\n"
				        +"受控科目为：" + strlimitCode;
				 msg = "不满足贷方必无条件";
				 jAlert(msg,"提示");
				 return false;
			 } 
		 }
	 }

	 
	 return data;
	 	
 }
 
 
  
 
 /**
  * 增加凭证组件
  */
 function addDsignInfo(firstDsign) {
	 //增加表尾
	 //从cookie中获取指定人名称
	 //增加时首先隐藏外币列
	 fcch();
	var producerName = getCookie("userName");
		
	 var tmpTail = new DsignTail("","","",producerName);
	 showDsignTail(tmpTail);
	 //初始化凭证类别
	document.getElementById("dsignType").setAttribute("value", firstDsign.id);
	//增加表头
	//var tmpTitle = new DsignTitle("记&nbsp;账&nbsp;凭&nbsp;证", firstDsign.id, firstDsign.csign , "", getCurDate(), "", "", "");
	var tmpTitle = new DsignTitle(strAddchar(firstDsign.ctext,"&nbsp;"), firstDsign.id, firstDsign.csign , "", getCurDate(), "", "", "");
	
	showDsignTitle(tmpTitle);
	
	// 增加凭证时，初始化js全局变量值
	//王丙建 2013-06-27
	curFouceSelRow = 1;  
	curDsignFlag = 0;//设置凭证作废状态为未作废
 	document.getElementById("zuofeiDsignimg").style.display = "none";
 	document.getElementById("yishengchengDsignimg").style.display = "none";
 	document.getElementById("errorDsignimg").style.display = "none";
 	/*
	//增加表内容	
	for (var i = 0; i< 5; i++) {
	   var cells = new Array(5);	
	   for (var j =0 ;j<5; j++) {
		 var tmpCell = new Cell();
		 tmpCell.showValue = "";
		 tmpCell.dbValue = "";
		 tmpCell.dictId = "";
		 tmpCell.dataType = "0";
		 cells[j] = tmpCell;
	   };
	   var tmpRow = new DsignRow(cells[0],cells[1],cells[2],cells[3],cells[4]);
	   //showDsignRow(tmpRow, (i*1 +1) );
	   setRowData((i*1 +1),tmpRow);
	};
	*/
	
	for (var i = 1; i<6; i++) {
		clearRowData(i);
	}
	
	
	//合计初始化
	 for (var i = 0; i<30; i++) {
		 var curPos = "#rhj" +  "_c3_" + (i*1+1);
		 $(curPos).val("");
		 $(curPos).css("color","#000000");
	 }	
	 $("#rhj_c3_3").parent().parent().removeAttr("symbol");
	 $("#rhj_c3_19").parent().parent().removeAttr("symbol");
	 
	 
	 document.getElementById("rhj_c3").value =  "";	
	 document.getElementById("rhj_c4").value =  "";	
		
	
	
	 //科目辅助核算初始化
	 loadCodeAddInitInfo();
	 
	 //增加默认为5行
	 //getAddDignData();
	

	 /******下面两行代码从上面被注释的getAddDignData方法中拷贝的，getAddDignData方法好像是多余的，没有意义的，或许可以删除。*******/
	titleRow = 5;
	
	titlePage = Math.ceil(titleRow/5);
	/*******************************************************************************************************************/
	 
 };
 
  
 /**
  * 得到当前日期 
  * 格式yyyy.mm.dd
  */
 function getCurDate() {
	 return getCookie("operDate");
	 /**
	  var myDate = new Date();
	  //年份
	  var strYear =  myDate.getFullYear();
	  // 月份
	  var strMonth =  myDate.getMonth()+1;
	  if (strMonth<10) 
		  strMonth = "0" + strMonth;
	  //日期
	  var strDay = myDate.getDate();
	  return strYear + "-" + strMonth + "-" + strDay;
	  */
 };
 
 


 /**
  * 后台查询的对象写入到界面的全部凭证对象中
  * @param curDsign 查询dsign对象
  */
 function queryDsignToAllDignData(curDsign){
	 
	 
	 
	 
	 oiwor="show";
	 
	 
	 //显示表头
	 title = new DsignTitle(strAddchar(curDsign.dsignTitle.dsignName,"&nbsp;"), curDsign.dsignTitle.attribute380, curDsign.dsignTitle.dsignType
				,curDsign.dsignTitle.dsignNumber ,curDsign.dsignTitle.producerDate
				,curDsign.dsignTitle.addNumber ,curDsign.dsignTitle.addInfo1
				,curDsign.dsignTitle.addInfo2
				
			//<!-- add by lval   外部凭证信息  begin 20130629-->	
				,curDsign.dsignTitle.coutsysname
				,curDsign.dsignTitle.coutaccset
				,curDsign.dsignTitle.doutbilldate
				,curDsign.dsignTitle.ioutperiod
				,curDsign.dsignTitle.coutsign
				,curDsign.dsignTitle.coutnoId
				,curDsign.dsignTitle.doutdate
				,curDsign.dsignTitle.coutbillsign
				,curDsign.dsignTitle.coutid
				,curDsign.dsignTitle.ioutyear
				,curDsign.dsignTitle.coutsysver
			//<!-- add by lval   外部凭证信息  end   20130629 -->	
				);
	 
		showDsignTitle(title);
	//是否显示外币;
	 curDsignProducerDate = curDsign.dsignTitle.producerDate;
	 curdsignPzbh = curDsign.dsignTitle.dsignNumber;
	 curDsignType = curDsign.dsignTitle.dsignType;
	 curDsignTypeid = curDsign.dsignTitle.attribute380;
	 
	 
	 var exchParam = 'title.dsignNumber='+ curdsignPzbh + '&title.dsignType=' + curDsignType + "&title.dsighYear=" + curDsignYear 
	                + "&title.dsignPeriod=" + curDsignPeriod + '&title.producerDate=' +curDsignProducerDate ;
		
	 
	 $.ajax({
			url:"code!isShowAccvouchExch.action",
		 	type:'post',
			data:exchParam,
		 	async:false,
		    complete:the_results,
			dataType:"json",
			success: function(data){
				//得到后台查询的凭证组件对象
		 		var isExchCode = data.isExchCode;
		 		if (isExchCode==true){
		 			fccd();
		 		}
		 		else{
		 			fcch();
		 		}
			}
		});

	 
	 
	 
	 
		tail = new DsignTail(curDsign.dsignTail.bookkeeper ,curDsign.dsignTail.audit
				 ,curDsign.dsignTail.cashier ,curDsign.dsignTail.producer
				 ,curDsign.dsignTail.dsignFlag,curDsign.dsignTail.outDsign
				 ,curDsign.dsignTail.producerId,curDsign.dsignTail.auditId
				 ,curDsign.dsignTail.bookkeeperId,curDsign.dsignTail.cashierId);
		
		 curDsignProcuderId = curDsign.dsignTail.producerId; //当前凭证制单人id
		 curDsignAuditId = curDsign.dsignTail.auditId; //当前凭证审核人id
		 curDsignBookkeeperId = curDsign.dsignTail.bookkeeperId; //当前凭证记账人id
		 curDsignCashierId = curDsign.dsignTail.cashierId; //当前凭证出纳人id

		//当前凭证标志
		curDsignFlag = curDsign.dsignTail.dsignFlag;
		curOutDsignFlag = strNullProc(curDsign.dsignTail.outDsign);
		

		//如果审核人、记账人、出纳人有一个不为空；作废标志为1，则此张凭证只能看，不能改  王丙建 2013-07-30
		if(pageWindowId=="wa_operate_dsign"){
			inputBz = true;
		}
		else{
			if (
					
					strNullProc(curDsignAuditId)!="" 
					|| strNullProc(curDsignBookkeeperId)!="" 
					||strNullProc(curDsignCashierId)!=""
					/*	已被（curDsign.dsignTitle.coutnoId != null）下面行代码代替
					|| strNullProc(curOutDsignFlag)!=""
					|| curDsignFlag==1
					*/
					|| curDsign.dsignTitle.coutnoId != null
					
			
			) {
				
				inputBz = false;
			}
			else {
	
				inputBz = true;
			}
		
		}
		

		$("#yishengchengDsignimg").hide();
		$("#zuofeiDsignimg").hide();
		$("#errorDsignimg").hide();
		
		
		//外部凭证标志,outSign不为空时显示
		if (curOutDsignFlag=="") {
			$("#yishengchengDsignimg").hide();
			$("#zuofeiDsignimg").hide();
			$("#errorDsignimg").hide();
		}
		else {
			if(pageWindowId!="dsign")//固定资产、工资生成凭证时显示已生成，总账查询显示时不用显示
			$("#yishengchengDsignimg").show();
		}
		//王丙建 增加查询凭证时作废、整理标志 2013-06-29
		//已作废，iflag=1
		if (curDsignFlag==1) {
			$("#zuofeiDsignimg").show();
			$("#yishengchengDsignimg").hide();
			$("#errorDsignimg").hide();
		}
		else {
			$("#zuofeiDsignimg").hide();	
		}
		//有错凭证
		if (curDsignFlag==2) {
			$("#errorDsignimg").show();
			$("#zuofeiDsignimg").hide();
			$("#yishengchengDsignimg").hide();
		}
		else {
			$("#errorDsignimg").hide();	
		}
		curDsignProcuderId = curDsign.dsignTail.producerId;
		showDsignTail(tail);
		//得到后台的表头对象
		
		
		//显示合计值
		if (curDsign.jfSum!=null) {
			
			var debitMoney=curDsign.jfSum+"";//将借方金额转换成字符串
			if(debitMoney=="" || debitMoney=="0"){
				debitMoney=0;
			}
				
				
		
		  //显示借方金额合计值
		  showDebitMoneyTotal(debitMoney);
		  

			var creditMoney=curDsign.dfSum+"";//将借方金额转换成字符串
			if(creditMoney=="" || creditMoney=="0"){
				creditMoney=0;
			}
				
		  
		  
		  //显示贷方金额合计值
		  showCreditMoneyTotal(creditMoney);
		
			
		}
		else{
			
			showSum();
		}
		
		
		
		
		//得到后台的凭证组件表格单元格对象
		var cellList = curDsign.cells;
		
		var length = cellList.length;
		
		//后台查询的数据转换为界面的cell单元格对象
		var cells = new Array(length);
		 for (var i = 0; i<length; i++)
		 {
			 var cellData = cellList[i];			 
			 var tmpCell = new Cell();
			 if (cellData.cellValue=="0") cellData.cellValue = "";
			 tmpCell.showValue = cellData.cellValue;			 
			 tmpCell.dbValue = cellData.cellDbValue;
			 tmpCell.dataType = cellData.dataType;
			 tmpCell.dictId = cellData.dictid;
			 cells[i] = tmpCell;
		 };
		 
	 
		//总行数=总单元格/6
		titleRow = length/6;
		

		dsignRowList = new Array(titleRow);//创建条目集合
		

		rowsHeaderList = new Array();//初始化滚行控制的头部行集合
		rowsFooterList = new Array();//初始化滚行控制的底部行集合
		
		
		
		
		
		
		
		//如果数据库查询到的记录小于5条，初始化为5条，否则根据数据库的记录生成条数
		if (titleRow<5) {
			
			//循环遍历全部查询单元格，把单元格数组转换行数组
			for (var i = 0; i<titleRow ; i++) {
				var tmpRow =  new DsignRow();
				//摘要
				tmpRow.zhaiyao = cells[i*6];
				//科目
				tmpRow.kemu = cells[i*6+1];
				//借方金额
				tmpRow.debitMoney = cells[i*6+2];
				//贷方金额
				tmpRow.creditMoney = cells[i*6 +3];
				//外币金额
				tmpRow.exchMoney = cells[i*6 +4];
				
				//行唯一ID
				tmpRow.dataId = cells[i*6 +5];
				
				
				/******** 陈建宇 2013-06-26 19:35   **********/
			
				
				

				
				var kemuDbvalue = tmpRow.kemu.dbValue;//取得科目相关值
				//为了防止后台来的数据不完整，判断长度且验证是否已存在辅助核算数据，如果还未录入，就拼装一个完整的空数据。
				var hasData = false;
				if(kemuDbvalue==null){
					kemuDbvalue="";
				}
	  			var otherInfo = kemuDbvalue.split("#");
	  			if(otherInfo.length==19){
					for(var j=1;j<otherInfo.length;j++){
						if(otherInfo[j]!="" && otherInfo[j]!=null && otherInfo[j]!="0" && otherInfo[j]!=0){
							hasData=true;
							break;
						}
					}
				}
	  			if(hasData==false){
	  				tmpRow.kemu.dbValue = otherInfo[0]+"#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0";
	  			}
				
				
				
				
				
				
				
				
				//固定资产模块，立即制单传入的查询凭证的参数中有可能会有空值。
				if(kemuDbvalue==null){
					dsignRowList[i] = tmpRow;
					continue;
				}
				
				
				
				
				

				var kemuCode = kemuDbvalue.split("#")[0];//分割后的数组第一个元素是科目编码，不应作为判断依据
				
				
				
				
				//有科目编码可能为空的情况，比如固定资产、采购销售在某些情况下生成的凭证带辅助核算，但无科目。
				if(kemuCode!="" && (kemuCode+"")!="null"){
					
				
					var codeObj = getCurCodeObjByCodeOrName(kemuCode);//查询科目对象
					//判断该科目是否需要填写辅助核算信息
		  			var curcodeAddInfo = getCodAddInfo(codeObj);
					 if (
						 curcodeAddInfo[0]==1 ||
						 curcodeAddInfo[1]==1 ||
						 curcodeAddInfo[2]==1 ||
						 curcodeAddInfo[3]==1 ||
						 curcodeAddInfo[4]==1 ||
						 curcodeAddInfo[5]==1 ||
						 curcodeAddInfo[6]!="" ||
						 //curcodeAddInfo[7]!="" ||//项目大类不参与辅助核算判断
						 curcodeAddInfo[8]==1
					) {
						//有辅助核算
						tmpRow.kemu.hasOtherInfo=true;
					 }
					 //否则，如果没有辅助核算信息的话清空查询出来的辅助核算的值
					 else{
						 tmpRow.kemu.dbValue=kemuCode;
					 }

				}
				 

				var exchMoneyDbvalue = tmpRow.exchMoney.dbValue;//取得外币数据
				if(exchMoneyDbvalue!=undefined && exchMoneyDbvalue!=null){
					var sign = exchMoneyDbvalue.split("#")[1];//获得币符
					if(sign!=undefined && sign!=null && sign!=""){

						//有外币
						tmpRow.kemu.hasForeignCurrency=true;
					}
				}
				/********************************************/
				
				
				
				
				
				dsignRowList[i] = tmpRow;

			}
			//首页补空行
			for (var i = titleRow; i<5; i++) {
				var tmpRow =  new DsignRow();
				//摘要
				var tmpzyCell = new Cell();
				tmpzyCell.showValue = "";			 
				tmpzyCell.dbValue = "";
				tmpzyCell.dataType = "0";
				tmpzyCell.dictId = "";
				tmpRow.zhaiyao = tmpzyCell;
				//科目
				var tmpcodeCell = new Cell();
				tmpcodeCell.showValue = "";			 
				tmpcodeCell.dbValue = "";
				tmpcodeCell.dataType = "0";
				tmpcodeCell.dictId = "";
				tmpRow.kemu = tmpcodeCell;

				//借方金额
				var tmpjfjeCell = new Cell();
				tmpjfjeCell.showValue = "";			 
				tmpjfjeCell.dbValue = "";
				tmpjfjeCell.dataType = "1";
				tmpjfjeCell.dictId = "";
				tmpRow.debitMoney = tmpjfjeCell;

				//贷方金额
				var tmpdfjeCell = new Cell();
				tmpdfjeCell.showValue = "";			 
				tmpdfjeCell.dbValue = "";
				tmpdfjeCell.dataType = "1";
				tmpdfjeCell.dictId = "";
				tmpRow.creditMoney = tmpdfjeCell;

				//外币金额
				var tmpexchCell = new Cell();
				tmpexchCell.showValue = "";			 
				tmpexchCell.dbValue = "";
				tmpexchCell.dataType = "1";
				tmpexchCell.dictId = "";
				tmpRow.exchMoney = tmpexchCell;

				//数据行唯一ID
				var dataIdCell = new Cell();
				dataIdCell.showValue = "";			 
				dataIdCell.dbValue = "";
				dataIdCell.dataType = "1";
				dataIdCell.dictId = "";
				tmpRow.dataId = dataIdCell;
				
				
				

				dsignRowList[i] = tmpRow;
			}
			titleRow = 5; 
			
			
		}
		else {

			//循环遍历全部查询单元格，把单元格数组转换行数组
			for (var i = 0; i<titleRow ; i++) {
				var tmpRow =  new DsignRow();
				//摘要
				tmpRow.zhaiyao = cells[i*6];
				//科目
				tmpRow.kemu = cells[i*6+1];
				//借方金额
				tmpRow.debitMoney = cells[i*6+2];
				//贷方金额
				tmpRow.creditMoney = cells[i*6 +3];
				//外币金额
				tmpRow.exchMoney = cells[i*6 +4];
				//行唯一ID
				tmpRow.dataId = cells[i*6 +5];
				
				
				
				
				

				var kemuDbvalue = tmpRow.kemu.dbValue;//取得科目相关值
				
				
				//为了防止后台来的数据不完整，判断长度且验证是否已存在辅助核算数据，如果还未录入，就拼装一个完整的空数据。
				var hasData = false;
	  			var otherInfo = kemuDbvalue.split("#");
	  			if(otherInfo.length==19){
					for(var j=1;j<otherInfo.length;j++){
						if(otherInfo[j]!="" && otherInfo[j]!=null && otherInfo[j]!="0" && otherInfo[j]!=0){
							hasData=true;
						}
					}
				}
	  			if(hasData==false){
	  				tmpRow.kemu.dbValue = otherInfo[0]+"#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0";
	  			}
				

	  			
				
	  			
	  			
				/******** 陈建宇 2013-06-26 19:35   **********/
				
				var kemuCode = kemuDbvalue.split("#")[0];//分割后的数组第一个元素是科目编码，不应作为判断依据
				
				
				//有科目编码可能为空的情况，比如固定资产、采购销售在某些情况下生成的凭证带辅助核算，但无科目。
				if(kemuCode!="" && (kemuCode+"")!="null"){
					
				
					var codeObj = getCurCodeObjByCodeOrName(kemuCode);//查询科目对象
					//判断该科目是否需要填写辅助核算信息
		  			var curcodeAddInfo = getCodAddInfo(codeObj);
					 if (
						 curcodeAddInfo[0]==1 ||
						 curcodeAddInfo[1]==1 ||
						 curcodeAddInfo[2]==1 ||
						 curcodeAddInfo[3]==1 ||
						 curcodeAddInfo[4]==1 ||
						 curcodeAddInfo[5]==1 ||
						 curcodeAddInfo[6]!="" ||
						 //curcodeAddInfo[7]!="" ||//项目大类不参与辅助核算判断
						 curcodeAddInfo[8]==1
					) {
						//有辅助核算
						tmpRow.kemu.hasOtherInfo=true;
					 }
					 //否则，如果没有辅助核算信息的话清空查询出来的辅助核算的值
					 else{
						 tmpRow.kemu.dbValue=kemuCode;
					 }

				}

				var exchMoneyDbvalue = tmpRow.exchMoney.dbValue;//取得外币数据
				if(exchMoneyDbvalue!=undefined && exchMoneyDbvalue!=null){
					var sign = exchMoneyDbvalue.split("#")[1];//获得币符
					if(sign!=undefined && sign!=null && sign!=""){

						//有外币
						tmpRow.kemu.hasForeignCurrency=true;
					}
				}
				
				
				//如果超过五条，则将不立刻显示的数据放进rowsFooterList，在滚行时显示出来
				if(i>4){
					rowsFooterList.push(tmpRow);
				}
				
				
				/********************************************/
				
				
				
				
				
				
				
				
				dsignRowList[i] = tmpRow;
				
				
				
				
				
				
				
			}
			
		}
		
		
		
		
		
		  /**
		   * 如果是对应结转、工资、固定资产生成的凭证，借方行排前显示，贷方行排后显示
		   */
		if(curOutDsignFlag!="" || pageWindowId=="dsignBautotran" || pageWindowId=="wa_operate_dsign"  || pageWindowId=="fa_operate_dsign"){

			
			  var debitArray = new Array();
			  var creditArray  = new Array();
			  var otherArray = new Array();
			  
			  for(var j=0;j<dsignRowList.length;j++){
				  
				  
				  var dm = dsignRowList[j].debitMoney.dbValue;
				  var cm = dsignRowList[j].creditMoney.dbValue;
				  
				  if(dm!="0" && dm!=""){
					  debitArray.push(dsignRowList[j]);
				  }else if(cm!="0" && cm!=""){
					  creditArray.push(dsignRowList[j]);
				  }else{
					  otherArray.push(dsignRowList[j]);
				  }
			  }
			  
			  
			  
			  dsignRowList=debitArray.concat(creditArray,otherArray);

			  
			  

			  rowsFooterList=new Array();
			for(var k=5;k<dsignRowList.length;k++){
				rowsFooterList.push(dsignRowList[k]);
			}
			  
			  
			  

			  
			  
		}
		  
		
		
		//总页数
		curPage = 0; 
		titlePage = Math.ceil(titleRow/5);//页数=条目数除以5，结果可能为小树，所以取整。

		initPageRows();
		//初始化辅助核算信息
		//initCodeAddinfo();
		
 }
 
 

 
 
 
 
 
 
 /**
  * 得到表格对象全部值
  */
 function getDsignAllCellValue() {
	 
	 
	 /** 合并rowsHeaderList、rowsBodyerList、rowsFooterList数组到dsignRowList **/
	  
	  var rowsBodyerList = new Array();
	  
	  //如果已向下翻行，保存时凭证条目行不允许有空行
	  if(rowsFooterList.length>0){
		  
		  for(var i=1;i<=5;i++){
			  
			  var row = rowDataValidation(i);
			  
			  if(row!=false){
				  rowsBodyerList.push(row);
			  }else{
				  

				  if(tempErrorMassage!=""){
		  				jAlert(tempErrorMassage,"提示",function(){
	  						if(tempErrorDom!=null){
	  							tempErrorDom.focus();
	  						}
	  					});
	  				}
				  
				  
				  return null;
			  }
		  }
		  
	  }
	  //还未向下翻行（如新增凭证），可能有多个空行
	  else{
		  for(var i=1;i<=5;i++){
			  var row = getRowData(i);
			  var zy = row.zhaiyao.dbValue;//摘要值
			  var km = row.kemu.showValue;//科目相关属性值
			  //var km = row.kemu.dbValue;//科目相关属性值 << 说明：这里的判断应该用showValue较为妥当
			  var jj = row.debitMoney.dbValue;//借方金额
			  var dj = row.creditMoney.dbValue;//贷方金额
			  
			  if(zy!="" && km!="" && (jj!="0" || dj!="0")){
				  
				  var row = rowDataValidation(i);//这里主要为了验证科目被修改后判断是否录入了辅助核算数据

				  if(row!=false){
					  
					  rowsBodyerList.push(row);
				  }else{
					  
					  
					  if(tempErrorMassage!=""){
			  				jAlert(tempErrorMassage,"提示",function(){
		  						if(tempErrorDom!=null){
		  							tempErrorDom.focus();
		  						}
		  					});
		  				}
					  
					  
					  
					  return null;
				  }
			  }else if(zy!="" || km!="" || jj!="0" || dj!="0"){
				  
				  var flag = rowDataValidation(i);

				  if(flag==false){

					  if(tempErrorMassage!=""){
			  				jAlert(tempErrorMassage,"提示",function(){
		  						if(tempErrorDom!=null){
		  							tempErrorDom.focus();
		  						}
		  					});
		  				}
					  
					  return null;
				  }
			  }
		  }
		  
	  }
	  
	  dsignRowList=rowsHeaderList.concat(rowsBodyerList,rowsFooterList);
	  
	 /************************************************/
	 
	 
	 var valueList = new Array();
	 // 之前的代码为：for (var i = 0; i<titleRow; i++) {
	 for (var i = 0; i<dsignRowList.length; i++) {
		 var tmpRow =  new DsignRow();
		  tmpRow = dsignRowList[i];
		 
		 //摘要值
		 var curZhaiyao = tmpRow.zhaiyao.showValue;
		 
		 
		 //科目值
		 var curKemu =  tmpRow.kemu.dbValue;
		 
		//借方金额值
		 var durCreditMoney = tmpRow.debitMoney.dbValue;
		 
		 //贷方金额值
		 var curDebitMoney = tmpRow.creditMoney.dbValue;
		//外币金额值
		 var exchMoney = tmpRow.exchMoney.dbValue;
		 if (curDebitMoney=="") curDebitMoney = "0";
		 if (durCreditMoney=="") durCreditMoney = "0";
		 if (exchMoney=="") exchMoney = "0";
			
		 
		 if (curZhaiyao=="" && (durCreditMoney=="" || curDebitMoney=="")) {
			 tempErrorMassage="你输入的摘要中包括空值，不允许保存！";
			 //jAlert("你输入的摘要中包括空值，不允许保存！","提示");
			 return null;
		 }
		if (curKemu==""&& (durCreditMoney=="" || curDebitMoney=="")) {
			tempErrorMassage="输入的科目中包括空值，不允许保存！";
			//jAlert("你输入的科目中包括空值，不允许保存！","提示");
				 return null;

			}
		
		//如果外币未设置汇率，则不能保存
		if((tmpRow.kemu.hasForeignCurrency+"")=="true"){
			 var huilv = exchMoney.split("#")[2];
			
			//判断汇率是否为空
			if(huilv==""){
				tempErrorMassage="此凭证有外币未设置汇率，请先设置汇率再填制凭证！";
				return null;
			}
		}
		
		
		
		
		
		
		var dataId = tmpRow.dataId.dbValue;
		if(dataId=="") dataId="null";
		
		
		//替换摘要中的半角逗号，避免后台通过逗号分隔时产生混乱
		curZhaiyao = curZhaiyao.replace(new RegExp(",","gm"),"8b7xg20v8vwe9g");
		valueList.push(curZhaiyao);
		valueList.push(curKemu);
		valueList.push(durCreditMoney);
		valueList.push(curDebitMoney);
		valueList.push(exchMoney);
		valueList.push(dataId);
		
		
	 }
	 
	 
	 
	 return valueList;	
 }
 
 
 
 //显示合计值
 function showSum() {
	 var curRowNo ="hj";
	 //借方金额合计
	  var mdValue = sumMd.toString() + "00";
	  var length = mdValue.length ;
	 //显示前数据全部清空
	 for (var i = 0; i<15; i++) {
		 var curPos = "r" +  curRowNo + "_c3_" + (i*1+1);
		 document.getElementById(curPos).value =  "";		
	 }	
	//显示数据值
	 for (var i = 0; i<15; i++) {
		 if (i<=length)
		 {
			 var curPos = "r" +  curRowNo + "_c3_" + (i*1+1+ 15-length);	
			 document.getElementById(curPos).value =  mdValue.substr(i,1);
		 }
	 }
	 
	 //贷方金额合计
	 var mcValue = sumMc.toString()+ "00";
	  var length = mcValue.length ;
	 //显示前数据全部清空
	 for (var i = 0; i<15; i++) {
		 var curPos = "r" +  curRowNo + "_c3_" + (i*1+1+15);
		 document.getElementById(curPos).value =  "";		
	 }	
	//显示数据值
	 for (var i = 0; i<15; i++) {
		 if (i<length)
		 {
			 var curPos = "r" +  curRowNo + "_c3_" + (i*1+16 + 15-length);	
			 document.getElementById(curPos).value =  mcValue.substr(i,1);
		 }
	 }
 }
 
 /**
  * 初始化辅助核算信息为空
  */
 function initCodeAddinfo() {
	 document.getElementById("ticketNumber").value =  "";
	 document.getElementById("subjectDate").value =  "";
	 document.getElementById("subjectPrice").value =  "";
	 document.getElementById("subjectNumber").value =  "";
	 document.getElementById("subjecProject").value =  "";
	 document.getElementById("subjectCustomer").value =  "";
	 document.getElementById("subjectDept").value =  "";
	 document.getElementById("subjectBusiness").value = "";
	 document.getElementById("subjecPerson").value =  "";
	 
	 document.getElementById("subjecProject").setAttribute("dbValue", "");
	 document.getElementById("subjectCustomer").setAttribute("dbValue", "");
	 document.getElementById("subjectDept").setAttribute("dbValue", "");
	 document.getElementById("subjectBusiness").setAttribute("dbValue", "");
	 document.getElementById("subjecPerson").setAttribute("dbValue", "");

 }
 
 
 /**
  * 下面开始保存凭证时的科目类型控制 
  * 王丙建 2013-05-21
  */
  
  /**
   * 科目控制类型1 ,借方必有
   * 借方必有：填写的所有科目里，只要有一个科目满足借方必有即可，循环遍历所有行取得科目，如果有一个科目在限制里，返回true。
   */
  function comparelimitType1(strLimitcode) {
	  
	  
	  
	  //限制科目转换为数组，为了保证科目完全相等再进行判断
	  var limitcodeList = strLimitcode.split(",");
	
	  for (var i = 0; i<dsignRowList.length; i++) {
		 var tmpRow =  new DsignRow();
		 tmpRow = dsignRowList[i];
		 //科目值
		 var curKemu =  tmpRow.kemu.dbValue;
		 //辅助核算项目时
		 var pos =  curKemu.indexOf("#");
		 if (pos>1) {
			 curKemu = curKemu.substring(0,pos); 
		 }
		 else {
			 var pos1 =  curKemu.indexOf(",");
			 if (pos1>1) {
				 curKemu = curKemu.substring(0,pos1); 
			 } 
		 }
		 if (curKemu=="") continue;
		//借方金额值
		 var durDebitMoney = tmpRow.debitMoney.dbValue;
		 
		 for (var j = 0; j<limitcodeList.length; j++) {
			 

			 var tmplimitcode = limitcodeList[j].toString();
			 if(tmplimitcode=="") continue;//防止对空串进行比较
			 /* 
			  * 判断录入的科目名称对应编码是否属于被限制的科目。
			  * 基于一个科目受限制，其子科目也受限制的逻辑，只要录入的科目的编码的前几位等于受限科目编码，则说明是其子科目，满足受限条件。
			  */
			 var tlcl = tmplimitcode.toString().length;
			 if (curKemu.toString().substring(0,tlcl)==tmplimitcode && durDebitMoney*1!=0 ) {
				 return true;
			 }
		 }
		 
		
	  }
	  
	  return false;
  }
 
  /**
   * 科目控制类型2 ,贷方必有
   * 贷方必有：填写的所有科目里，只要有一个科目满足贷方必有即可，循环遍历所有行取得科目，如果有一个科目在限制里，返回true。
   */
  function comparelimitType2(strLimitcode) {
	  //限制科目转换为数组，为了保证科目完全相等再进行判断
	  var limitcodeList = strLimitcode.split(",");
	
	  for (var i = 0; i<dsignRowList.length; i++) {
		 var tmpRow =  new DsignRow();
		 tmpRow = dsignRowList[i];
		 //科目值
		 var curKemu =  tmpRow.kemu.dbValue;
		 //辅助核算项目时
		 var pos =  curKemu.indexOf("#");
		 if (pos>1) {
			 curKemu = curKemu.substring(0,pos); 
		 }
		 else {
			 var pos1 =  curKemu.indexOf(",");
			 if (pos1>1) {
				 curKemu = curKemu.substring(0,pos1); 
			 } 
		 }
		 if (curKemu=="") continue;
		 
		 //贷方金额值
		 var curDebitMoney = tmpRow.creditMoney.dbValue;
		 
		 for (var j = 0; j<limitcodeList.length; j++) {
			
			 var tmplimitcode = limitcodeList[j].toString();
			 if(tmplimitcode=="") continue;//防止对空串进行比较
			 /* 
			  * 判断录入的科目名称对应编码是否属于被限制的科目。
			  * 基于一个科目受限制，其子科目也受限制的逻辑，只要录入的科目的编码的前几位等于受限科目编码，则说明是其子科目，满足受限条件。
			  */
			 var tlcl = tmplimitcode.toString().length;
			 if (curKemu.toString().substring(0,tlcl)==tmplimitcode && curDebitMoney*1!=0 ) {
				 return true;
			 }
		 }
		
	  }
	  return false;
  }
 
  /**
   * 科目控制类型3 ,凭证必无 如果包含一个科目，返回true
   */
  function comparelimitType3(strLimitcode) {
	  //限制科目转换为数组，为了保证科目完全相等再进行判断
	  var limitcodeList = strLimitcode.split(",");
	  for (var i = 0; i<dsignRowList.length; i++) {
		 var tmpRow =  new DsignRow();
		 tmpRow = dsignRowList[i];
		 //科目值
		 var curKemu =  tmpRow.kemu.dbValue;
		 //辅助核算项目时
		 var pos =  curKemu.indexOf("#");
		 if (pos>1) {
			 curKemu = curKemu.substring(0,pos); 
		 }
		 else {
			 var pos1 =  curKemu.indexOf(",");
			 if (pos1>1) {
				 curKemu = curKemu.substring(0,pos1); 
			 } 
		 }
		 if (curKemu=="") continue;
		
		 for (var j = 0; j<limitcodeList.length; j++) {
			 
			 
			 var tmplimitcode = limitcodeList[j].toString();
			 if(tmplimitcode=="") continue;//防止对空串进行比较
			 /* 
			  * 判断录入的科目名称对应编码是否属于被限制的科目。
			  * 基于一个科目受限制，其子科目也受限制的逻辑，只要录入的科目的编码的前几位等于受限科目编码，则说明是其子科目，满足受限条件。
			  */
			 var tlcl = tmplimitcode.toString().length;
			 if (curKemu.toString().substring(0,tlcl)==tmplimitcode) {
				 return true;
			 }
			 
		 }
		
	  }
	  return false;
  }
  
  
  /**
   * 科目控制类型4 ,凭证必有
   * 凭证必有时，录入的科目中必须包含受限科目中其中一个。
   * 实现思路：
   * 循环所有录入的科目，判断科目编码是否存在于受限科目中或属于受限科目中的其中一个科目的子科目，如果是则达到条件要求。
   */
  function comparelimitType4(strLimitcode) {
	  //限制科目转换为数组，为了保证科目完全相等再进行判断
	  var limitcodeList = strLimitcode.split(",");
	  for (var i = 0; i<dsignRowList.length; i++) {
		 var tmpRow =  new DsignRow();
		 tmpRow = dsignRowList[i];
		 //科目值
		 var curKemu =  tmpRow.kemu.dbValue;
		 //辅助核算项目时
		 var pos =  curKemu.indexOf("#");
		 if (pos>1) {
			 curKemu = curKemu.substring(0,pos); 
		 }
		 else {
			 var pos1 =  curKemu.indexOf(",");
			 if (pos1>1) {
				 curKemu = curKemu.substring(0,pos1); 
			 } 
		 }
		 if (curKemu=="") continue;

		 for (var j = 0; j<limitcodeList.length; j++) {
			 
			 var tmplimitcode = limitcodeList[j].toString();
			 if(tmplimitcode=="") continue;//防止对空串进行比较
			 /* 
			  * 判断录入的科目名称对应编码是否属于被限制的科目。
			  * 基于一个科目受限制，其子科目也受限制的逻辑，只要录入的科目的编码的前几位等于受限科目编码，则说明是其子科目，满足受限条件。
			  */
			 var tlcl = tmplimitcode.toString().length;
			 if (curKemu.toString().substring(0,tlcl)==tmplimitcode) {
				 return true;
			 }
		 }
		
	  }
	  return false;
  }
 
  
 
  /**
   * 科目控制类型5 ,借方必无
   */
  function comparelimitType5(strLimitcode) {
	  //限制科目转换为数组，为了保证科目完全相等再进行判断
	  var limitcodeList = strLimitcode.split(",");
	
	  for (var i = 0; i<dsignRowList.length; i++) {
		 var tmpRow =  new DsignRow();
		 tmpRow = dsignRowList[i];
		 //科目值
		 var curKemu =  tmpRow.kemu.dbValue;
		 //辅助核算项目时
		 var pos =  curKemu.indexOf("#");
		 if (pos>1) {
			 curKemu = curKemu.substring(0,pos); 
		 }
		 else {
			 var pos1 =  curKemu.indexOf(",");
			 if (pos1>1) {
				 curKemu = curKemu.substring(0,pos1); 
			 } 
		 }
		 if (curKemu=="") continue;
		//借方金额值
		 var durCreditMoney = tmpRow.debitMoney.dbValue;
		 
		 for (var j = 0; j<limitcodeList.length; j++) {
			 
			 var tmplimitcode = limitcodeList[j].toString();
			 if(tmplimitcode=="") continue;//防止对空串进行比较
			 /* 
			  * 判断录入的科目名称对应编码是否属于被限制的科目。
			  * 基于一个科目受限制，其子科目也受限制的逻辑，只要录入的科目的编码的前几位等于受限科目编码，则说明是其子科目，满足受限条件。
			  */
			 var tlcl = tmplimitcode.toString().length;
			 if (curKemu.toString().substring(0,tlcl)==tmplimitcode && durCreditMoney*1!=0) {
				 return true;
			 }
			 
			 
			 
		 }
		
	  }
	  return false;
  }
 
  /**
   * 科目控制类型6 ,贷方必无
   */
  function comparelimitType6(strLimitcode) {
	  //限制科目转换为数组，为了保证科目完全相等再进行判断
	  var limitcodeList = strLimitcode.split(",");
	
	  for (var i = 0; i<dsignRowList.length; i++) {
		 var tmpRow =  new DsignRow();
		 tmpRow = dsignRowList[i];
		 //科目值
		 var curKemu =  tmpRow.kemu.dbValue;
		 //辅助核算项目时
		 var pos =  curKemu.indexOf("#");
		 if (pos>1) {
			 curKemu = curKemu.substring(0,pos); 
		 }
		 else {
			 var pos1 =  curKemu.indexOf(",");
			 if (pos1>1) {
				 curKemu = curKemu.substring(0,pos1); 
			 } 
		 }
		 if (curKemu=="") continue;
		
		 //贷方金额值
		 var curDebitMoney = tmpRow.creditMoney.dbValue;
		 
		 for (var j = 0; j<limitcodeList.length; j++) {
			 

			 var tmplimitcode = limitcodeList[j].toString();
			 if(tmplimitcode=="") continue;//防止对空串进行比较
			 /* 
			  * 判断录入的科目名称对应编码是否属于被限制的科目。
			  * 基于一个科目受限制，其子科目也受限制的逻辑，只要录入的科目的编码的前几位等于受限科目编码，则说明是其子科目，满足受限条件。
			  */
			 var tlcl = tmplimitcode.toString().length;
			 if (curKemu.toString().substring(0,tlcl)==tmplimitcode && curDebitMoney*1!=0) {
				 return true;
			 }
			 
		 }
	  }
	  return false;
  }



