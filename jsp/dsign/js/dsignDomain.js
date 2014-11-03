/**
 * 
 * @DESCRIBE   凭证组件：对象定义类
 * @AUTHOR     王丙建
 * @DATE       2012-09-11
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


/**
 * 凭证组件：表尾对象定义
 * @param tmpBookkeeper 记账
 * @param tmpAudit 审核
 * @param tmpCashier 出纳
 * @param tmpProducer 制单
 */
function DsignTail(tmpBookkeeper,tmpAudit,tmpCashier,tmpProducer,tmpDsignFlag, tmpOutDsign
		,tmpProcuderId,tmpAuditId,tmpBookkeeperId,tmpCashierId) {
	
	 
	
	this.bookkeeper = tmpBookkeeper;
	this.audit = tmpAudit;
	this.cashier = tmpCashier;
	this.producer = tmpProducer ;
	this.dsignFlag = tmpDsignFlag;
	this.outDsign = tmpOutDsign;
	//王丙建 2013-07-30增加制单人id、审核人id、记账人id、出纳人id
	//左右：审核凭证、出纳签字时与登录人id比对
	this.producerId = tmpProcuderId;
	this.auditId = tmpAuditId ;
	this.bookkeeperId = tmpBookkeeperId;
	this.cashierId = tmpCashierId;
	
	
	
};

/**
 * 凭证组件：表头对象定义
 * @param tmpDsignName 凭证名称
 * @param tmpDsignType 凭证类型
 * @param tmpDsignNumber 凭证号
 * @param tmpProducerDate 制单日期
 * @param tmpAddNumber 附单据数
 * @param tmpAddInfo1 附加信息1
 * @param tmpAddInfo2 附加信息2
 */
function DsignTitle(tmpDsignName, tmpAttribute380,tmpDsignType,tmpDsignNumber,tmpProducerDate,
		tmpAddNumber,tmpAddInfo1,tmpAddInfo2,coutsysname,coutaccset,doutbilldate,ioutperiod,
		coutsign,coutnoId,doutdate,coutbillsign,coutid,ioutyear,coutsysver){
	this.dsignName  = tmpDsignName;
	this.attribute380 = tmpAttribute380;
	this.dsignType   = tmpDsignType;
	this.dsignNumber  = tmpDsignNumber;
	this.producerDate  = tmpProducerDate;
	this.addNumber  = tmpAddNumber;
	this.addInfo1  = tmpAddInfo1;
	this.addInfo2  = tmpAddInfo2; 
	//<!-- add by lval   外部凭证信息  begin 20130629-->
	this.coutsysname  = coutsysname; 
	this.coutaccset  = coutaccset; 
	this.doutbilldate  = doutbilldate; 
	this.ioutperiod  = ioutperiod; 
	this.coutsign  = coutsign; 
	this.coutnoId  = coutnoId; 
	this.doutdate  = doutdate; 
	this.coutbillsign  = coutbillsign; 
	this.coutid  = coutid; 
	this.ioutyear  = ioutyear; 
	this.coutsysver  = coutsysver; 
	//<!-- add by lval   外部凭证信息  end   20130629 -->	
};
	

/**
 * 科目辅助核算对象
 * @param subjectId 科目id
 * @param ticketNumber 票号
 * @param subjectDate  日期
 * @param subjectPrice 单价
 * @param subjectNumber 数量
 * @param subjecProject  项目
 * @param subjectCustomer 客户
 * @param subjectDept 部门
 * @param subjectBusiness 业务员
 * @param subjecPerson 个人
 * @returns
 */
function DsignSubject(subjectId ,ticketNumber ,subjectDate ,subjectPrice ,subjectNumber
		,subjecProject ,subjectCustomer ,subjectDept ,subjectBusiness ,subjecPerson) {
		
	this.subjectId = subjectId;
	this.ticketNumber  = ticketNumber; 
	this.subjectDate  = subjectDate;
	this.subjectPrice  = subjectPrice;
	this.subjectNumber  = subjectNumber;
	this.subjecProject  = subjecProject;
	this.subjectCustomer  = subjectCustomer;
	this.subjectDept  = subjectDept;
	this.subjectBusiness  = subjectBusiness;
	this.subjecPerson  = subjecPerson;
	
};

//辅助核算信息分隔符
var ubjectSplit= "#$#";
/**
 * 得到科目辅助核算信息对应的值
 * @param curRow
 */
function getDsignSubjectValue(curRow, cursubjectId) {
	
	//票号
	var curticketNumber  = document.getElementById("ticketNumber").value;
	//日期
	var cursubjectDate  = document.getElementById("subjectDate").value;
	//单价
	var cursubjectPrice  = document.getElementById("subjectPrice").value;
	//数量
	var cursubjectNumber  = document.getElementById("subjectNumber").value;
	//项目
	var cursubjecProject  = document.getElementById("subjecProject").value;
	//客户
	var cursubjectCustomer  = document.getElementById("subjectCustomer").value;
	//部门
	var cursubjectDept  = document.getElementById("subjectDept").value;
	//业务员
	var cursubjectBusiness  = document.getElementById("subjectBusiness").value;
	//个人
	var cursubjecPerson  = document.getElementById("subjecPerson").value;
	var strRtn = "";
	strRtn = cursubjectId + ubjectSplit 
			+ curticketNumber + ubjectSplit
			+ cursubjectDate + ubjectSplit
			+ cursubjectPrice + ubjectSplit
			+ cursubjectNumber + ubjectSplit
			+ cursubjecProject + ubjectSplit
			+ cursubjectCustomer + ubjectSplit
			+ cursubjectDept + ubjectSplit
			+ cursubjectBusiness + ubjectSplit
	        + cursubjecPerson + ubjectSplit;
	return strRtn;
}

/**
 * 显示辅助核算信息
 * @param curDsignSubject
 */
function ShowDsignSubjectValue(curDsignSubject) {
	 var tmpDsignSubject = new DsignSubject();
	 tmpDsignSubject = curDsignSubject;
	 if (tmpDsignSubject.ticketNumber==null) tmpDsignSubject.ticketNumber = "";
	 if (tmpDsignSubject.subjectDate==null) tmpDsignSubject.subjectDate = "";
	 if (tmpDsignSubject.subjectPrice==null) tmpDsignSubject.subjectPrice = "";
	 
	 if (tmpDsignSubject.subjectNumber==null) tmpDsignSubject.subjectNumber = "";
	 if (tmpDsignSubject.subjecProject==null) tmpDsignSubject.subjecProject = "";
	 if (tmpDsignSubject.subjectCustomer==null) tmpDsignSubject.subjectCustomer = "";
	 
	 if (tmpDsignSubject.subjectDept==null) tmpDsignSubject.subjectDept = "";
	 if (tmpDsignSubject.subjectBusiness==null) tmpDsignSubject.subjectBusiness = "";
	 if (tmpDsignSubject.subjecPerson==null) tmpDsignSubject.subjecPerson = "";
	 
	 document.getElementById("ticketNumber").value =  tmpDsignSubject.ticketNumber;
	 document.getElementById("subjectDate").value =  tmpDsignSubject.subjectDate;
	 document.getElementById("subjectPrice").value =  tmpDsignSubject.subjectPrice;
	 document.getElementById("subjectNumber").value =  tmpDsignSubject.subjectNumber;
	 document.getElementById("subjecProject").value =  tmpDsignSubject.subjecProject;
	 document.getElementById("subjectCustomer").value =  tmpDsignSubject.subjectCustomer;
	 document.getElementById("subjectDept").value =  tmpDsignSubject.subjectDept;
	 document.getElementById("subjectBusiness").value =  tmpDsignSubject.subjectBusiness;
	 document.getElementById("subjecPerson").value =  tmpDsignSubject.subjecPerson;
}




/**
 * 单元格对象
 * @param showValue 单元格显示值
 * @param dbValue 单元格数据库存储值
 * @param dictId  单元格参照描述
 * @param dataType 单元格数据类型：0：字符；1：参照；2数值；：3：日期
 * @returns
 */
function Cell(showValue ,dbValue ,dictId ,dataType) {
   this.showValue = showValue; 
   this.dbValue = dbValue;
   this.dictId = dictId; 
   this.dataType = dataType; 
};

/**
 * 科目单元格
 * @param kemu 单元格对象
 * @param subject 科目辅助核算
 * @returns
 */
function KemuCell(tmpKemu ,tmpSubject) {
	this.kemu = new Cell();
	this.subject = new DsignSubject();
	this.kemu = tmpKemu;
	this.subject = tmpSubject;
};



/**
 * 凭证组件表格输入：分录行定义
 * @param zyCell 摘要
 * @param kmCell 科目名称
 * @param debitMoneyCell 借方金额
 * @param creditMoneyCell 贷方金额
 * @param exchMoneyCell 外币金额
 */
function DsignRow(zyCell, kmCell, debitMoneyCell, creditMoneyCell,exchMoneyCell ,exchRateCell)
{
    this.zhaiyao = zyCell;
    this.kemu = kmCell;
    this.debitMoney = debitMoneyCell;
    this.creditMoney = creditMoneyCell;
    this.exchMoney = exchMoneyCell;
    this.exchRate = exchRateCell;
};




/**
 * 凭证组件：页面表格录入
 * @param rows 分录输入行集合
 */
function DsignPageGrid(rows){
	this.rowCount = "5";
	this.colCount = "6";
	this.rows = rows;
};


/**
 * 凭证组件输入对象
 * @param pageCount 页总数
 * @param curPage 当前页数
 * @param pageGrids 页数输入对象列表
 */ 
function DsignGrid(pageCount, curPage, curPageGrid, pageGrids){
	 this.pageCount = pageCount;
	 this.curPage = curPage;
	 this.curPageGrid = curPageGrid;
	 this.pageGrids = pageGrids;
 };
 

/**
 * 凭证组件定义
 * @param title 表头
 * @param tail 表尾
 * @param grid 录入区
 * @returns
 */
function Dsign (title, tail,grid) {
  this.title = title; 
  this.tail = tail; 
  this.grid = grid;  
};


/**
 * 表尾显示
 */
function showDsignTail(curTail) {
	 var tmpTail = new DsignTail();
	 tmpTail = curTail;
	 document.getElementById("bookkeeper").innerHTML =  strNullProc(tmpTail.bookkeeper);
	 document.getElementById("audit").innerHTML =  strNullProc(tmpTail.audit);
	 document.getElementById("cashier").innerHTML =  strNullProc(tmpTail.cashier);
	 document.getElementById("producer").innerHTML =  strNullProc(tmpTail.producer);
};






/**
 * 表头显示
 */
function showDsignTitle(curTitle) {
	 var tmpTitle = new DsignTitle();
	 tmpTitle = curTitle;
	 document.getElementById("dsignName").innerHTML =  strNullProc(tmpTitle.dsignName);
	 document.getElementById("dsignType").innerHTML =  strNullProc(tmpTitle.dsignType);
	 document.getElementById("dsignNumber").innerHTML =  strNullProc(tmpTitle.dsignNumber);
	 
	 
	 if(tmpTitle.producerDate=="" || tmpTitle.producerDate==null){
		 tmpTitle.producerDate=getCookie("operDate");
	 }
	 
	 
	 document.getElementById("producerDate").value =  strNullProc(tmpTitle.producerDate);
	 document.getElementById("addNumber").value =  strNullProc(tmpTitle.addNumber);
	 document.getElementById("addInfo1").value =  strNullProc(tmpTitle.addInfo1);
	 document.getElementById("addInfo2").value =  strNullProc(tmpTitle.addInfo2);
	 document.getElementById("dsignType").setAttribute("value", tmpTitle.attribute380);
	 
	
	 /**
	  *  <!--add by lval 20130628 外部系统（模块）名称-->
	  */
	 
	 //<!-- add by lval   外部凭证信息  begin 20130629-->	
	 document.getElementById("coutsysname").value =  strNullProc(tmpTitle.coutsysname);
	 document.getElementById("coutaccset").value =  strNullProc(tmpTitle.coutaccset);
	 document.getElementById("doutbilldate").value =  strNullProc(tmpTitle.doutbilldate);
	 document.getElementById("ioutperiod").value =  strNullProc(tmpTitle.ioutperiod);
	 document.getElementById("coutsign").value =  strNullProc(tmpTitle.coutsign);
	 document.getElementById("coutnoId").value =  strNullProc(tmpTitle.coutnoId);
	 document.getElementById("doutdate").value =  strNullProc(tmpTitle.doutdate);
	 document.getElementById("coutbillsign").value =  strNullProc(tmpTitle.coutbillsign);
	 document.getElementById("coutid").value =  strNullProc(tmpTitle.coutid);
	 document.getElementById("ioutyear").value =  strNullProc(tmpTitle.ioutyear);
	 document.getElementById("coutsysver").value =  strNullProc(tmpTitle.coutsysver);
	//<!-- add by lval   外部凭证信息  end   20130629 -->	 
	 
	 curAttribute380 = tmpTitle.attribute380;

};


/**
 * 当前行显示
 * @returns
 *//*
function showDsignRow(curRow, curRowNo){
	var tmpRow = curRow;
	var tmpZhaiyao = tmpRow.zhaiyao;
	var tmpKemu = tmpRow.kemu;
	//获取每分录行单元格数值
	var tmpZhaiyaoPos = "r" + curRowNo + "_c1";
	var tmpKemuPos = "r" + curRowNo + "_c2";
	document.getElementById(tmpZhaiyaoPos).value = strNullProc(tmpZhaiyao.showValue);
	var kemuInputBox = document.getElementById(tmpKemuPos);
	kemuInputBox.value =  strNullProc(tmpKemu.showValue);
	
	kemuInputBox.setAttribute("dbValue", tmpKemu.dbValue);
	
	//设置是否有辅助核算、是否有外币值/
	kemuInputBox.setAttribute("hasOtherInfo",tmpRow.hasOtherInfo);
	kemuInputBox.setAttribute("hasForeignCurrency",tmpRow.hasForeignCurrency);
	
	 //借方金额显示
	 showDebitMoney(tmpRow.debitMoney, curRowNo);
	 //贷方金额显示
	 showCreditMoney(tmpRow.creditMoney, curRowNo);
	 //外币金额显示
	 showExchMoney(tmpRow.exchMoney, curRowNo);
	 
	 
};*/

/**
 * 借方金额空值显示
 */
function showNullDebitMoney(row){
	 var nullMoneyCell = new Cell();
	  nullMoneyCell.showValue = "";
	  nullMoneyCell.dataType = "1";
	  nullMoneyCell.dbValue = "";
	  showDebitMoney(nullMoneyCell,row);	
}


/**
 * 贷方金额空值显示
 */
function showNullCreditMoney(row){
	 var nullMoneyCell = new Cell();
	  nullMoneyCell.showValue = "";
	  nullMoneyCell.dataType = "1";
	  nullMoneyCell.dbValue = "";
	  showCreditMoney(nullMoneyCell,row);	
}



/**
 * 借方金额显示
 * @param tmpDebitMoney 借方金额
 * @param curRowNo 当前行
 */
function showDebitMoney(curDebitMoney, curRowNo){
	 
	document.getElementById("r" +  curRowNo + "_c3").value =  "";	
	var tmpDebitMoney = new Cell();
	 tmpDebitMoney = curDebitMoney;
	 var value  = strNullProc(tmpDebitMoney.showValue);
	 //获取字符串长度
	 var length = value.length ;
	 
	 //显示前数据全部清空
	 for (var i = 0; i<15; i++) {
		 var curPos = "r" +  curRowNo + "_c3_" + (i*1+1);
		 document.getElementById(curPos).value =  "";		
	 }
	 
	 //显示数据值
	 for (var i = 0; i<15; i++) {
		 //得到当前位置
		 var curPos = "r" +  curRowNo + "_c3_" + (i*1+1);
		 if (i<=length)
		 {
			 
			 curPos = "r" +  curRowNo + "_c3_" + (i*1+1+ 15-length);
			 
			 document.getElementById(curPos).value =  value.substr(i,1);
		 }
		 else
		 {
			// document.getElementById(curPos).value =  "";				 
		 }
	 };		
};

/**
 * 贷方金额显示
 * @param curCreditMoney 贷方方金额
 * @param curRowNo 当前行
 */
function showCreditMoney(curCreditMoney, curRowNo){
	document.getElementById("r" +  curRowNo + "_c4").value =  "";	
	
	 var tmpCreditMoney = new Cell();
	 tmpCreditMoney = curCreditMoney;
	 var value  = strNullProc(tmpCreditMoney.showValue);
	 //获取字符串长度
	 var length = value.length ;
	 //显示前数据全部清空
	 for (var i = 0; i<15; i++) {
		 var curPos = "r" +  curRowNo + "_c3_" + (i*1+1+15);
		 document.getElementById(curPos).value =  "";		
	 }
	 
	 if (length==0) return;
	 for (var i = 0; i<15; i++) {
		 //得到当前位置
		 var curPos = "r" +  curRowNo + "_c3_" + (i*1+16);
		 if (i<length)
		 {
			 curPos = "r" +  curRowNo + "_c3_" + (i*1+15 + 16-length);
			 document.getElementById(curPos).value =  value.substr(i,1);
		 }
		 else
		 {
			 //document.getElementById(curPos).value =  "";				 
		 }
	 };		
};



/**
 * 外币金额显示
 * @param curExchMoney 外币金额
 * @param curRowNo 当前行
 */
function showExchMoney(curExchMoney, curRowNo){
	 
	document.getElementById("r" +  curRowNo + "_c5").value =  "";
	document.getElementById("r" +  curRowNo + "_c6").value =  "";	
	
	var tmpExchMoney = new Cell();
	tmpExchMoney = curExchMoney;
	 var value  = tmpExchMoney.showValue;
	 var exchdbValue = tmpExchMoney.dbValue;
	 if (value==null) value = "";
	 var curExchRate = "";
	 var curExchCode = "";
	 
	 if (strNullProc(exchdbValue)!="") {
		 var exchdbValueList = exchdbValue.split("#");
		  value = exchdbValueList[0];
		  curExchCode = exchdbValueList[1];
		  curExchRate = exchdbValueList[2];
		 
		 
	 }
	 //外币币符
	 document.getElementById("r" +  curRowNo + "_c6" + "_1").innerHTML =  strNullProc(curExchCode);	

	 //显示外币汇率
	 document.getElementById("r" +  curRowNo + "_c6" + "_2").value =  strNullProc(curExchRate);
			 
	 var length = value.length;	 
	 //显示前数据全部清空
	 for (var i = 0; i<15; i++) {
		 var curPos = "r" +  curRowNo + "_c5_" + (i*1+1);
		 document.getElementById(curPos).value =  "";		
	 };
	 
	 
	//显示数据值
	 if ( value!="") {
		 if (value*1 !=0 ) {
			 for (var i = 0; i<length; i++) {
				 //得到当前位置
					 curPos = "r" +  curRowNo + "_c5_" + (i*1+1+15-length);
					 document.getElementById(curPos).value =  value.substr(i,1);
			 };		
		 }
	 }
};






/**
 * 下面开始返回后台获取的凭证对象
 */


/**
 * 得到表尾对象
 * @returns {DsignTail}
 */
function getDsignTail() {
	var tmpTail = new DsignTail();
	tmpTail.bookkeeper = document.getElementById("bookkeeper").innerHTML;
	tmpTail.audit = document.getElementById("audit").innerHTML;
	tmpTail.cashier = document.getElementById("audit").innerHTML;;
	tmpTail.producer = document.getElementById("producer").innerHTML;
	tmpTail.auditId = 0;
	tmpTail.bookkeeperId = 0;
	tmpTail.producerId = 0;
	tmpTail.cashierId = 0;
	 //var tmpTail = new DsignTail(document.getElementById("bookkeeper").innerHTML
		//	 ,document.getElementById("audit").innerHTML
			// ,document.getElementById("cashier").innerHTML
			 //,document.getElementById("producer").innerHTML);
	 return tmpTail; 	
}

/**
 * 得到表头
 * @returns {___tmpTitle0}
 */
function getDsignTitle() {
  var tmpTitle = new DsignTitle();
  tmpTitle.dsignName = document.getElementById("dsignName").innerHTML   ;
  curAttribute380 = document.getElementById("dsignType").getAttribute('value');
  tmpTitle.attribute380 = curAttribute380;
  tmpTitle.dsignType =	 document.getElementById("dsignType").innerHTML  ;
  tmpTitle.dsignNumber = document.getElementById("dsignNumber").innerHTML   ;
  tmpTitle.producerDate =  document.getElementById("producerDate").value  ;
  tmpTitle.addNumber = 	 document.getElementById("addNumber").value   ;
  tmpTitle.addInfo1 =  document.getElementById("addInfo1").value   ;
  tmpTitle.addInfo2 =  document.getElementById("addInfo2").value   ;
  
 
   //<!-- add by lval   外部凭证信息  begin 20130629-->	
	  tmpTitle.coutsysname =  document.getElementById("coutsysname").value   ;
	  tmpTitle.coutaccset =  document.getElementById("coutaccset").value   ;
	  tmpTitle.doutbilldate =  document.getElementById("doutbilldate").value   ;
	  tmpTitle.ioutperiod =  document.getElementById("ioutperiod").value   ;
	  tmpTitle.coutsign =  document.getElementById("coutsign").value   ;
	  tmpTitle.coutnoId =  document.getElementById("coutnoId").value   ;
	  tmpTitle.doutdate =  document.getElementById("doutdate").value   ;
	  tmpTitle.coutbillsign =  document.getElementById("coutbillsign").value   ;
	  tmpTitle.coutid =  document.getElementById("coutid").value   ;
	  tmpTitle.ioutyear =  document.getElementById("ioutyear").value   ;
	  tmpTitle.coutsysver =  document.getElementById("coutsysver").value   ;
	//<!-- add by lval   外部凭证信息  end   20130629 -->	 
  
  
  
  var seltyp="";
  if(do_seltype!=null&&do_seltype!="null"&&do_seltype!=undefined&&do_seltype!="undefined"&&do_seltype!=""){
	  if(do_seltype=="10"){
		  seltyp="自定义";
	  }else if(do_seltype=="20"){
		  seltyp="对应结转";
	  }else if(do_seltype=="30"){
		  seltyp="销售成本";
	  }else if(do_seltype=="40"){
		  seltyp="销售成本";
	  }else if(do_seltype=="50"){
		  seltyp="汇兑损益"; 
	  }else if(do_seltype=="60"){
		  seltyp="期间损益"; 
	  }
	   
	   //tmpTitle.outtype=seltyp;
	   tmpTitle.coutsign=seltyp;  //update by lval 20130701
  }
 
  return tmpTitle;
}

/**
 * 得到表格的行值
 * @param rowCount
 */
function getDsignCellValue(rowCount) {
	
	var valueList = new Array();
	for ( var i = 0; i<rowCount; i++) {
		var zhaiyaoPos = "r" + (i*1+1) + "_c1";
		var kemuPos = "r" + (i*1+1) + "_c2";
		
		//外币汇率
		var ratePos = "r" + (i*1+1) + "_c6_c2";
		
		//alert ("位置：" + zhaiyaoPos + "\t" + kemuPos );
		//摘要值
		var curZhaiyao = document.getElementById(zhaiyaoPos).value;
		//科目值
		var curKemu =  document.getElementById(kemuPos).value;
		//外币汇率
		var curRate =  document.getElementById(ratePos).value;
		
		//借方金额值
		var curDebitMoney = "";
		 for (var j = 0; j<15; j++) {
				var curPos = "r" +  (i*1+1) + "_c3_" + (j*1+1);
				var tmpValue = document.getElementById(curPos).value;
				curDebitMoney = curDebitMoney +  tmpValue;
		}
		
		
		//贷方金额值
		var durCreditMoney = "";
		 for (var j = 0; j<15; j++) {
				var curPos = "r" +  (i*1+1) + "_c3_" + (j*1+1+15);
				var tmpValue = document.getElementById(curPos).value;
				durCreditMoney = durCreditMoney +  tmpValue;
		}
		 
		//外币金额值
			var curExchMoney = "";
			 for (var j = 0; j<15; j++) {
					var curPos = "r" +  (i*1+1) + "_c5_" + (j*1+1);
					var tmpValue = document.getElementById(curPos).value;
					curExchMoney = curExchMoney +  tmpValue;
			}
		
		//alert ("数值：" + curZhaiyao + "\t" + curKemu + "\t" + curDebitMoney + "\t" + durCreditMoney);
		
		//var CurDebitMoney = "12345678";
		//var CurCreditMoney = "12345678";
		if (curZhaiyao=="") curZhaiyao = " ";
		if (curKemu=="") curKemu = " ";
		if (curDebitMoney=="") curDebitMoney = "0";
		if (durCreditMoney=="") durCreditMoney = "0";
		if (curExchMoney=="") curExchMoney = "0";
		if (curRate=="") curRate = "";
		
		valueList.push(curZhaiyao);
		valueList.push(curKemu);
		valueList.push(curDebitMoney);
		valueList.push(durCreditMoney);
		valueList.push(curExchMoney);
		valueList.push(curRate);

		
	}
	return valueList;	
}





/**
 * 得到输入的借方金额合计值
 * 王丙建 2013-01-11
 */
function getJfSumValue() {
	var curPos = "";
	//借方金额合计值
	var sumMoney  = "";
	for (var j = 0; j<15; j++) {
		curPos = "r" +  "hj" + "_c3_" + (j*1+1);
		var tmpValue = document.getElementById(curPos).value;
		sumMoney = sumMoney +  tmpValue;
	}
	
	if(sumMoney!=""){

		  var symbol = $("#"+curPos).parent().parent().attr("symbol");
		  if(symbol=="-"){
			  sumMoney="-"+sumMoney;
		  }
		  
	  }else{
		  sumMoney="0";
	  }
	return parseInt(sumMoney,10);
	
	
}






/**
 * 得到输入的贷方金额合计值
 * 王丙建 2013-01-11
 */
function getDfSumValue() {
	
	var curPos = "";
	//贷方金额合计值
	var sumMoney  = "";
	for (var j = 0; j<15; j++) {
		curPos = "r" +  "hj" + "_c3_" + (j*1+1+15);
		var tmpValue = document.getElementById(curPos).value;
		sumMoney = sumMoney +  tmpValue;
	}
	
	  
	if(sumMoney!=""){
		  var symbol = $("#"+curPos).parent().parent().attr("symbol");
		  if(symbol=="-"){
			  sumMoney="-"+sumMoney;
		  }
		  
	  }else{
		  sumMoney="0";
	  }
	return parseInt(sumMoney,10);
	
	
	
}









/**
 * 得到输入的借方金额合计值
 * 王丙建 2013-01-11
 */
function getJfSumValueStr() {
	
	//借方金额合计值
	var sumMoney  = "";
	for (var j = 0; j<15; j++) {
		var curPos = "r" +  "hj" + "_c3_" + (j*1+1);
		var tmpValue = document.getElementById(curPos).value;
		sumMoney = sumMoney +  tmpValue;
	}
	return sumMoney;
}




