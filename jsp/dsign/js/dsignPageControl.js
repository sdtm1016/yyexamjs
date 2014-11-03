
/**
 * 
 * 
 * @DESCRIBE   凭证组件翻页控制js
 * @AUTHOR     王丙建
 * @DATE       2012-09-24
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */
 
 //总行数
 var titleRow = 0;
 
 //总页数
 var titlePage = 0;
 
 //当前选中行
 var curSelectRow = 0;
 
 //当前页
 var curPage = 0;

 
 //全部行数值
 var dsignRowList = null;
 

 


 
 //放弃标志
 var abortBz = false;
 
 
 /**
  * 记账凭证增加初始化数据
  */
 function getAddDignData() {
	//定义表尾对象
	 tail = new DsignTail("张三","李四","王五","赵六");

	//定义表头对象
	title = new DsignTitle("记&nbsp;账&nbsp;凭&nbsp;证", "记", "0001", "2012.09.06", "3", "附加信息1", "附加信息2");
	
	var zyList = new Array(5);
	
	var kmList = new Array(5);
	
	var dfvalueList = new Array(5);
	var jfvalueList = new Array(5);
	var exchvalueList = new Array(5);
	var ratevalueList = new Array(5);
	
	
	for (var i = 0; i<5; i++) {
	//  zyList[i] = "" + (i*1+1);
	  //kmList[i] = "" + (i*1+1);
	  zyList[i] = "" ;
	  kmList[i] = "" ;	
	  jfvalueList[i] = "";
	  dfvalueList[i] = "";
	  exchvalueList[i] = "";
	  ratevalueList[i] = "";
	}
	
	 
	 //单元格数值
	 var dsignCellList  = null;
	dsignCellList = new Array(30);
	var j = 0;
	for (var i = 0; i<5; i++) {
		//摘要cell
		  var tmpzyCell = new Cell();
		  tmpzyCell.showValue = zyList[i];
		  tmpzyCell.dbValue = zyList[i];
		  tmpzyCell.dataType = "0";
		  tmpzyCell.dictId = "";
		  dsignCellList[j] = tmpzyCell;
		  j++;
			//科目cell
		  var tmpkmCell = new Cell();
		  tmpkmCell.showValue = kmList[i];
		  tmpkmCell.dbValue = kmList[i];
		  tmpkmCell.dataType = "0";
		  tmpkmCell.dictId = "";
		  dsignCellList[j] = tmpkmCell;
		  j++;
		  //借方金额
		  var tmpjfCell = new Cell();
		  tmpjfCell.showValue = jfvalueList[i];
		  tmpjfCell.dbValue = jfvalueList[i];
		  tmpjfCell.dataType = "0";
		  tmpjfCell.dictId = "";
		  dsignCellList[j] = tmpjfCell;
		  j++;
		  //贷方金额
		  
		  var tmpdfCell = new Cell();
		  tmpdfCell.showValue = dfvalueList[i];
		  tmpdfCell.dbValue = dfvalueList[i];
		  tmpdfCell.dataType = "0";
		  tmpdfCell.dictId = "";
		  dsignCellList[j] = tmpdfCell;
		  j++;
		  
         //外币金额
		  
		  var tmpExchCell = new Cell();
		  tmpExchCell.showValue = exchvalueList[i];
		  tmpExchCell.dbValue = exchvalueList[i];
		  tmpExchCell.dataType = "0";
		  tmpExchCell.dictId = "";
		  dsignCellList[j] = tmpExchCell;
		  j++;
		  
         //外币汇率
		  
		  var tmpRateCell = new Cell();
		  tmpRateCell.showValue = ratevalueList[i];
		  tmpRateCell.dbValue = ratevalueList[i];
		  tmpRateCell.dataType = "0";
		  tmpRateCell.dictId = "";
		  dsignCellList[j] = tmpRateCell;
		  j++;
		  
		  
		  
	}
	//全部行数
	dsignRowList = new Array(5);
	for (var i = 0; i<5 ; i++) {
		var tmpRow =  new DsignRow();
		tmpRow.zhaiyao = dsignCellList[i*5];
		tmpRow.kemu = dsignCellList[i*5+1];
		tmpRow.debitMoney = dsignCellList[i*5+2];
		tmpRow.creditMoney = dsignCellList[i*5 +3];
		tmpRow.exchMoney = dsignCellList[i*5 +4];
		dsignRowList[i] = tmpRow;
	}
	
	
	titleRow = 5;
	titlePage = Math.ceil(titleRow/5);

 }

/*
 * 得到分页的全部数据 
 */
function getAllDignData() {
	
	 //定义表尾对象
	 tail = new DsignTail("张三","李四","王五","赵六");

	//定义表头对象
	title = new DsignTitle("记&nbsp;账&nbsp;凭&nbsp;证", "记", "0001", "2012.09.06", "3", "附加信息1", "附加信息2");
	
	var zyList = new Array(20);
	
	var kmList = new Array(20);
	
	var dfvalueList = new Array(20);
	var jfvalueList = new Array(20);
	var exchvalueList = new Array(20);
	
	for (var i = 0; i<20; i++) {
	  zyList[i] = "摘要" + (i*1+1);
	  kmList[i] = "科目" + (i*1+1);
	  jfvalueList[i] = "12345678";
	  dfvalueList[i] = "23456789";
	  exchvalueList[i] = "23456789";
	}
	
	 
	 //单元格数值
	 var dsignCellList  = null;
	dsignCellList = new Array(100);
	var j = 0;
	for (var i = 0; i<20; i++) {
		//摘要cell
		  var tmpzyCell = new Cell();
		  tmpzyCell.showValue = zyList[i];
		  tmpzyCell.dbValue = zyList[i];
		  tmpzyCell.dataType = "0";
		  tmpzyCell.dictId = "";
		  dsignCellList[j] = tmpzyCell;
		  j++;
			//科目cell
		  var tmpkmCell = new Cell();
		  tmpkmCell.showValue = kmList[i];
		  tmpkmCell.dbValue = kmList[i];
		  tmpkmCell.dataType = "0";
		  tmpkmCell.dictId = "";
		  dsignCellList[j] = tmpkmCell;
		  j++;
		  //借方金额
		  var tmpjfCell = new Cell();
		  tmpjfCell.showValue = jfvalueList[i];
		  tmpjfCell.dbValue = jfvalueList[i];
		  tmpjfCell.dataType = "0";
		  tmpjfCell.dictId = "";
		  dsignCellList[j] = tmpjfCell;
		  j++;
		  //贷方金额
		  
		  var tmpdfCell = new Cell();
		  tmpdfCell.showValue = dfvalueList[i];
		  tmpdfCell.dbValue = dfvalueList[i];
		  tmpdfCell.dataType = "0";
		  tmpdfCell.dictId = "";
		  dsignCellList[j] = tmpdfCell;
		  j++;
           //外币金额
		  
		  var tmpExchCell = new Cell();
		  tmpExchCell.showValue = exchvalueList[i];
		  tmpExchCell.dbValue = exchvalueList[i];
		  tmpExchCell.dataType = "0";
		  tmpExchCell.dictId = "";
		  exchvalueList[j] = tmpExchCell;
		  j++;
	}
	//全部行数
	dsignRowList = new Array(25);
	for (var i = 0; i<25 ; i++) {
		var tmpRow =  new DsignRow();
		tmpRow.zhaiyao = dsignCellList[i*5];
		tmpRow.kemu = dsignCellList[i*5+1];
		tmpRow.debitMoney = dsignCellList[i*5+2];
		tmpRow.creditMoney = dsignCellList[i*5 +3];
		tmpRow.exchMoney = dsignCellList[i*5 +4];
		dsignRowList[i] = tmpRow;
	    var msg = tmpRow.zhaiyao.showValue + "\t" + tmpRow.kemu.showValue ;
	}
	
	
	titleRow = 25;
	titlePage = Math.ceil(titleRow/5);
}

/**
 * 首张
 */
function firstPageDsign() {
	
	//getAllDignData();
	curPage = 0;
	initPageRows();
}


/**
 * 下张
 */
function downPageDsign() {
	curPage ++;
	//下一页时：当前页不能大于全部页数
	if (curPage>=(titlePage*1-1)) 
		 curPage = (titlePage*1-1);
	initPageRows();
	
}


/**
 * 上张
 */
function upPageDsign() {
	curPage --;
	//上一页时：当前页最小值为0
	if (curPage <= 0) 
		 curPage = 0;
	
	initPageRows();
}
/**
 * 末张
 */
function lastPageDsign() {
	//最后一页时，当前页等于页总数
	curPage = titlePage*1-1;
	
	initPageRows();
}

/**
 * 返回一个空值的行
 */
function getNullValueRow() {
	//得到一个空行
	var tmpRow =  new DsignRow();
	var zhaiyaoCell = new Cell("","","","");
	var kemuCell = new Cell("","","","");
	var creditMoneyCell = new Cell("","","","");
	var debitMoneyCell = new Cell("","","","");
	var exchMoneyCell = new Cell("","","","");
	
	tmpRow.zhaiyao = zhaiyaoCell;
	tmpRow.kemu = kemuCell;
	tmpRow.creditMoney = creditMoneyCell;
	tmpRow.debitMoney = debitMoneyCell;
	tmpRow.exchMoney = exchMoneyCell;
	return tmpRow;
}


/**
 * 初始化当前页行数
 */
function initPageRows() {
	 //初始化行数
	 var rows =  new Array(5);
	 for ( var i = 0; i<5; i++) {
		var tmpRow =  new DsignRow();
		tmpRow = dsignRowList[i + curPage*5];
		
		
		
		
		if ((i + curPage*5)<titleRow){
			
			rows[i] = tmpRow;
		}
		else {
			rows[i] = getNullValueRow();
		}
			
	 };
	 
	 
	 
	//增加表内容	
	for (var i = 0; i< 5; i++) {
	   //showDsignRow(rows[i], (i*1+1) );
		setRowData((i*1+1),rows[i]);
		
		
	};
	
	
	//默认显示第一行的辅助核算信息
	row=1;
	dataRowClickBiz(null);
	var code = $("#r1_c2").attr("dbValue").split("#")[0];
	if(code!="" && code!="null"){
		
		curCodeObj=getCurCodeObjByCodeOrName(code);//防止查询完凭证后直接双击底部辅助核算区curCodeObj为Null的情况。
	}
	btnAddDsignClicked=false;//打开凭证时会执行新增按钮的方法初始化凭证，在查询完数据后，将新增按钮点击状态值改为false
	
}

/**
 * 显示帮助
 */
function showHelp() {
	return;
}


/**
 * 显示流量
 */
function showCashFlow() {
	jAlert("现金流量大类没有预制，请你预制！","提示");
	return;

}



/**
 * 显示打印
 */
function print() {
	auditDsign();
	
	return;
}


/**
 * 显示预览
 */
function preview() {
	cancelAuditDsign();
	return;

}


/**
 * 显示输出
 */
function output() {
	return;
}


/**
 * 显示放弃
 */
function abort() {
	
	
	if (inputBz==true) {
		
		jConfirm("确实要放弃当前修改的凭证吗？","提示",function(f){
			if(f){
				
				window.location.reload();
				
				//window.parent.closeWindow(pageWindowId);
				
			   //addDsign();
			   //btnAddDsignClicked=false;//如果新增按钮被点击了的，说明是新增的凭证，则调用新增凭证action，否则调用修改凭证action，新增按钮状态将在查询凭证和保存凭证成功以及放弃凭证后赋值为false，即表示不是新增凭证
			}
		});
		
	}

}

/**
 * 显示余额
 */
function showBalance() {
	return;

}

