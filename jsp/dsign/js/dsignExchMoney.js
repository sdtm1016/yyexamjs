/**
 * 
 * @DESCRIBE   凭证组件外币金额录入子组件界面控制js
 * @AUTHOR     王丙建
 * @DATE       2012-11-02
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


//单元格所在行
var exchrow ="";

//单元格所在列
var exchcol = "";
var exchmcol ="";
//数据库值
var exchdbValue="";

/**
   * 借方金额键盘控制事件
   * @param e
   * @returns
   */
  function mexchcellKeyControl(selObj){
	  
	  if (cexchName=="") return ;
	  if (cexchName!="") {
	  var trNode = selObj.parentNode.parentNode;
	  var curRowNo = trNode.getAttribute("row");
	  //选中金额单元格mcol
	  var curmCol = selObj.getAttribute("mcol");
	  setMExchCell(selObj);	  
	  
	  selObj.value=selObj.value.replace(/[^0-9-]+/,'');
	  
	  //得到键盘输入值
	  var inKey = event.keyCode;
	  var keyValue = inKey*1-48;	  
	  //小键盘数字处理
	  if (  keyValue==48 || keyValue==49 || keyValue==50 || keyValue==51 ||  keyValue==52
			 ||  keyValue==53 || keyValue==54 || keyValue==55 || keyValue==56 ||  keyValue==57) {
		  keyValue = keyValue*1-48;
	  }
	  //输入处理
	  if (inputBz) {
		  //只允许输入0..9数字 
		  if ( keyValue ==0  ||  keyValue==1 || keyValue==2 || keyValue==3 || keyValue==4||  keyValue==5 
				  || keyValue==6 || keyValue==7 || keyValue==8 ||  keyValue==9 ) {
			  exchMoneyCellChar(curRowNo, curmCol,keyValue);
		  }	    	  
		  //回车键 右键、tab键
		  if (inKey==13 || inKey==9)
		  {
			  getNextMExchCellObj();
		  }
		  //左键
		  else if (inKey==37)
		  {
			  getPrevMExchcellObj();
		  }
	  
		  //右键
		  else if (inKey==39)
		  {
			  getRightMExchcellObj();
		  }
	  		//上键
		  else if (inKey==38)
		  {
			  getMExchUpCellObj();
		  }	  
	  		//下键
		  else if (inKey==40)
	  		{
			  getMExchDownCellObj();
	  		}
		  //删除键
		  else if (inKey==46){
			  delExchKeyProcess(row,mcol); 
		  }
		  
		//退格键
		  else if (inKey==8){
			  tuigeExchKeyProcess(row,mcol); 
		  }
		  else {
			  abortBz = true;
		  }
	  }
	  //审核处理
	  else {
		//只允许输入0..9数字 
		  if ( keyValue ==0  ||  keyValue==1 || keyValue==2 || keyValue==3 || keyValue==4||  keyValue==5 
				  || keyValue==6 || keyValue==7 || keyValue==8 ||  keyValue==9 ) {
			  selObj.value = sourceExchCellFocuslValue;
			  return false;
		
		  }	    	  
		  //回车键 右键、tab键
		  if (inKey==13 || inKey==9)
		  {
			  getNextMExchCellObj();
		  }
		  //左键
		  else if (inKey==37)
		  {
			  getPrevMExchcellObj();
		  }
	  
		  //右键
		  else if (inKey==39)
		  {
			  getRightMExchcellObj();
		  }
	  		//上键
		  else if (inKey==38)
		  {
			  getMExchUpCellObj();
		  }	  
	  		//下键
		  else if (inKey==40)
	  		{
			  getMExchDownCellObj();
	  		}
		  else if (inKey==46){
			  selObj.value = sourceExchCellFocuslValue;
			  return false;
		
		  }
		  else {
			  abortBz = true;
		  }
	 
	  }
	  }
  }
  
  

  function mexchcellKeyControl1(selObj){  	
	  if (cexchName=="") return ;
	  if (cexchName!="") {
	  var trNode = selObj.parentNode.parentNode;
	  var curRowNo = trNode.getAttribute("row");
	  //选中金额单元格mcol
	  var curmCol = selObj.getAttribute("mcol");
	  setMExchCell(selObj);	  
	  
	 // selObj.value=selObj.value.replace(/[^0-9-]+/,'');
	  
	  //得到键盘输入值
	  var inKey = event.keyCode;
	  var keyValue = inKey*1-48;	  
	  //小键盘数字处理
	  if (  keyValue==48 || keyValue==49 || keyValue==50 || keyValue==51 ||  keyValue==52
			 ||  keyValue==53 || keyValue==54 || keyValue==55 || keyValue==56 ||  keyValue==57) {
		  keyValue = keyValue*1-48;
	  }
	  //输入处理
	  if (inputBz) {
		  //只允许输入0..9数字 
		  if ( keyValue ==0  ||  keyValue==1 || keyValue==2 || keyValue==3 || keyValue==4||  keyValue==5 
				  || keyValue==6 || keyValue==7 || keyValue==8 ||  keyValue==9 ) {
			  exchMoneyCellChar(curRowNo, curmCol,keyValue);
		  }	    	  
		  //回车键 右键、tab键
		  if (inKey==13 || inKey==9)
		  {
			  getNextMExchCellObj();
		  }
		  //左键
		  else if (inKey==37)
		  {
			  getPrevMExchcellObj();
		  }
	  
		  //右键
		  else if (inKey==39)
		  {
			  getRightMExchcellObj();
		  }
	  		//上键
		  else if (inKey==38)
		  {
			  getMExchUpCellObj();
		  }	  
	  		//下键
		  else if (inKey==40)
	  		{
			  getMExchDownCellObj();
	  		}
		  else if (inKey==46){
			  delExchKeyProcess(row,mcol); 
		  }
		  else {
			  abortBz = true;
		  }
	  }
	  //审核处理
	  else {
		//只允许输入0..9数字 
		  if ( keyValue ==0  ||  keyValue==1 || keyValue==2 || keyValue==3 || keyValue==4||  keyValue==5 
				  || keyValue==6 || keyValue==7 || keyValue==8 ||  keyValue==9 ) {
			  selObj.value = sourceExchCellFocuslValue;
			  return false;
		
		  }	    	  
		  //回车键 右键、tab键
		  if (inKey==13 || inKey==9)
		  {
			  getNextMExchCellObj();
		  }
		  //左键
		  else if (inKey==37)
		  {
			  getPrevMExchcellObj();
		  }
	  
		  //右键
		  else if (inKey==39)
		  {
			  getRightMExchcellObj();
		  }
	  		//上键
		  else if (inKey==38)
		  {
			  getMExchUpCellObj();
		  }	  
	  		//下键
		  else if (inKey==40)
	  		{
			  getMExchDownCellObj();
	  		}
		  else if (inKey==46){
			  selObj.value = sourceExchCellFocuslValue;
			  return false;
		
		  }
		  else {
			  abortBz = true;
		  }
	 
	  }
	  }
  }
  
  
  
  
  
  
  //得到下一个元素对象
  function getNextMExchCellObj()
  {
  	   if (col==5){
  		 mnextCellId =  "r"+ row +"_c6_2";
  	   }
  	   else {
   		 mnextCellId =  "r"+ row +"_c3_13";
  	   }
	  	 document.getElementById(mnextCellId).focus();
  	}

 //左键处理
  function getPrevMExchcellObj()
  {
	  if (col==5) {
  		 
	  if (mcol >1)
  		 mprevCellId =  "r"+ row +"_c" + col + "_" + (mcol*1-1);
	  else 
  		 mprevCellId =  "r"+ row +"_c2";
		  
  	 }
  	 else {
  		 mprevCellId =  "r"+ row +"_c5_13";
  	 }
  	  document.getElementById(mprevCellId).focus();
  }

  
//右键处理
  function getRightMExchcellObj()
  {
	  if (col==5) {
	  if (mcol <15)
  		 mprevCellId =  "r"+ row +"_c" + col + "_" + (mcol*1+1);
	  else 
  		 mprevCellId =  "r"+ row +"_c6_2";
		  
  	 }
  	 else {
  		 mprevCellId =  "r"+ row +"_c3_11";
  	 }
  	  document.getElementById(mprevCellId).focus();
  }


  /**
   * 向上键处理
   */
  function getMExchUpCellObj() {
 	 if (row==1) return;
 	if (col==5){
 		mupCellId =  "r"+ (row*1-1) +"_c2";
  	   }
  	   else {
  		 mupCellId =  "r"+ row +"_c5_13";
  	   }
  	 document.getElementById(mupCellId).focus(); 	
  }
  
  /**
   * 向下键处理
   */
  function getMExchDownCellObj() {
 	 if (row==maxRow) return;
 	 if (col==5){
 		mdownCellId =  "r"+ row +"_c6_2";
  	   }
  	   else {
  		 mdownCellId =  "r"+ (row*1+1) +"_c2";
  	   }
  	 document.getElementById(mdownCellId).focus(); 
  }
   

  
  
  
//根据传入的输入控件，设置全局变量当前行、当前列的值
  function setMExchCell(selObj)
   {
  	 mcellObj = selObj;
  	 //获得借方输入框对应的行元素
  	 var trNode = mcellObj.parentNode.parentNode;
  	 row = trNode.getAttribute("row");
  	 col = trNode.getAttribute("col");
  	 dbValue = trNode.getAttribute("dbValue");
  	 mcol = mcellObj.getAttribute("mcol");
  	 var msg =  "dbValue:" + exchdbValue + "\n" 
  	      + "row:" + exchrow + "\n" 
  	     + "col:" + exchcol + "\n" 
  	     + "mcol:" + exchmcol + "\n" ;
  	 
  	  curSelectRow =  curPage * 5 + row*1; 
  	    
   }
  
  
  
  /**
   * 外币金额键盘处理
   * @param curmCol 当前位置
   * @param keyValue 按键值
   */
  function exchMoneyCellChar(curRowNo, curmCol, keyValue){
	  
      if (col==6) return;
      if (strdebitMoneyInputValue=="") {    	  
    	  firstInputExchCell(curRowNo, curmCol,keyValue);
    	  return;    	  
      }
      
	  //得到外币金额右边值
	  var rightDebitMoneyValue = "";
	  var leftDebitMoneyValue = "";
	  var rightDebitMoneyLength = 0;
	  var debitMoneyLength = strdebitMoneyInputValue.length;
	  
	// 外币输入值的最左边位置
	  var inputLeftPos = 15-debitMoneyLength*1;
	  //输入的位置大于字符串的最高位
	  if (curmCol<=inputLeftPos) {
		  var pos1 = inputLeftPos-curmCol;
		  var inputLeftValue = keyValue* Math.pow(10,pos1);
		  strdebitMoneyInputValue = inputLeftValue + strdebitMoneyInputValue;
		  debitMoneyLength = strdebitMoneyInputValue.length;
		  //获取字符串长度
		  var length = strdebitMoneyInputValue.length ;
		  //显示前数据全部清空
		  for (var i = 0; i<15; i++) {
				 var curPos = "r" +  curRowNo + "_c5_" + (i*1+1);
				 document.getElementById(curPos).value =  "";		
		  }
		  //显示数据值
		  for (var i = 0; i<15; i++) {
			 if (i<length)
			 {
				 var curPos = "r" +  curRowNo + "_c5_" + (i*1+1+ 15-length);
				 document.getElementById(curPos).value =  strdebitMoneyInputValue.substr(i,1);
			 }
		 }		
	  }else {
	  //外币金额
	    for (var i =curmCol; i<15; i++ ) {
			  var curPos = "r" +  curRowNo + "_c5_" + (i*1+1);
			  var curCellValue =  document.getElementById(curPos).value;
			  rightDebitMoneyValue = rightDebitMoneyValue + curCellValue;
		}
		rightDebitMoneyLength = rightDebitMoneyValue.length;
		//得到外币金额左边值
		leftDebitMoneyValue = strdebitMoneyInputValue.substring(0, (debitMoneyLength-rightDebitMoneyLength));
		leftDebitMoneyValue = parseInt(leftDebitMoneyValue).toString();
		//外币金额输入0..9
		for (var i = 0; i<15; i++) {
				 var curPos = "r" +  curRowNo + "_c5_" + (i*1+1);
				 document.getElementById(curPos).value =  "";
		 }
		//输入值后，值变为左边值+输入值+右边值
		if (leftDebitMoneyValue==0)
		  strdebitMoneyInputValue =  keyValue + rightDebitMoneyValue;
		else
		  strdebitMoneyInputValue = leftDebitMoneyValue + keyValue + rightDebitMoneyValue;
		exchMoneySetCell(curRowNo, curmCol, strdebitMoneyInputValue,keyValue);
	  }

  }

  
  /**
   * 首次输入外币金额时处理，当前列右边全部为0
   * @param curRowNo 当前行
   * @param curmCol  当前列
   */
  function firstInputExchCell(curRowNo, curmCol,keyValue) {
	  document.getElementById("r" +  curRowNo + "_c5_" + curmCol).value = keyValue;
	  strdebitMoneyInputValue = keyValue;
	  //外币金额初始化
     	 for (var i = curmCol; i<15; i++) {
    		 var curPos = "r" +  curRowNo + "_c5_" + (i*1+1);		
    		 document.getElementById(curPos).value =  "0";
    		 strdebitMoneyInputValue = strdebitMoneyInputValue +  document.getElementById(curPos).value;
    	 }
     	 if (curmCol==15) 
     		strdebitMoneyInputValue = strdebitMoneyInputValue.toString();
  }

  /**
   * 把输入的外币金额分别填充到外币金额输入单元格中
   * @param curmCol 当前输入单元格位置
   * @param strdebitMoneyInputValue 借方金额
   */
  function exchMoneySetCell(curRowNo, curmCol, strdebitMoneyInputValue,keyValue){  
	   var value  = strdebitMoneyInputValue;
	   //获取字符串长度
	   var length = value.length ;
	   //显示前数据全部清空
		 for (var i = 0; i<15; i++) {
			 var curPos = "r" +  curRowNo + "_c5_" + (i*1+1);
			 document.getElementById(curPos).value =  "";		
		 }	 
		 //显示数据值
		 for (var i = 0; i<15; i++) {
			 //最高位时初始化
			 if ((i*1+1+ 15-length)<=0) {
				 firstInputExchCell(curRowNo, curmCol,keyValue);
			     return;    	  
			 }
			 //得到当前位置
			 var curPos = "r" +  curRowNo + "_c5_" + (i*1+1);
			
			 if (i<length)
			 {
				 curPos = "r" +  curRowNo + "_c5_" + (i*1+1+ 15-length);
				 document.getElementById(curPos).value =  value.substr(i,1);
			 }
		};
	 
		 
  }
  
  /**
   * 获得焦点事件
   */
//获取外币焦点的源输入格值
  var sourceExchCellFocuslValue = "";
  function mexchcellFocus(selObj) {

	  try{
			$("#focuser").hide();
		}catch(e){}
	  
		 currentFocusInputComponent=selObj;//设置当前焦点控件
	  
	  
	  if (cexchName=="") return ;
	  if (cexchName!="") {
		  setMExchCell(selObj); 
		  var msg =  " row:" + row + "\n" 
	                 + "col:" + col + "\n" 
	                 + "mcol:" + mcol + "\n" ;
		  var curPos = "r" +  row + "_c" + col + "_" + mcol;
		  sourceExchCellFocuslValue =  document.getElementById(curPos).value;
		
		  var resultValue= "";
		 
		 	  for (var i = 0; i<15; i++) {
				var curPos = "r" +  row + "_c5_" + (i*1+1);
				var tmpValue = document.getElementById(curPos).value;
				resultValue = resultValue +  tmpValue;
			  }
		  if (resultValue=="") {
			  document.getElementById("r" +  row + "_c5_" +13).value = "0";
			  document.getElementById("r" +  row + "_c5_" +14).value = "0";  
			  document.getElementById("r" +  row + "_c5_" +15).value = "0";
			  document.getElementById("r" +  row + "_c5_" +13).focus();
			 
		  } 
		 	  
		  document.getElementById("r" +  row + "_c5").value = resultValue;
		  strdebitMoneyInputValue = resultValue;
	  }
 } 
 
  /**
   * 外币失去焦点事件
   * @param selObj
   */
 function mexchcellBlur(selObj){
	 setMExchCell(selObj);
	 
	 /**
	  * 修改外币金额失去焦点时，如果借贷方为0，设置借方值=外币金额*汇率，如果借贷方值不为0，
	  * 判断并提示误差（金额-外币*汇率>0），如果有误差，不做任何动作。
	  */
	 var fmdv=$("#r"+row+"_c5").attr("dbValue").split("#");
	 var cnfrat=fmdv[2];//汇率
	 var bcal=fmdv[3];//折算方式
	 var nerror=fmdv[4];//最大误差
	 
	 var fm = getForeignMoney(row);//外币金额
	 var dm = getDebitMoney(row);//借方金额
	 var cm = getCreditMoney(row);//贷方金额
	 
	 
	 
	 if(fm!=0 && cnfrat!=""){
		 if(dm==0 && cm==0){
			 if(bcal==0){
				 dm = Math.round(fm*cnfrat);//四舍五入取整
			 }else{
				 dm = Math.round(fm/cnfrat);//四舍五入取整
			 }

			 setDebitMoney(dm,row);
			 
			 var cdmt = countDebitMoneyTotal();
			 showDebitMoneyTotal(cdmt);
		 }
		 /*
		 else if(dm!=0){
			 setDebitMoney(dm,row);
		 }else if(cm!=0){
			 setCreditMoney(cm,row);
		 }
		 */
		 
		 
		 
		 else{
			 //TODO ... 弹出误差提示小窗
			 /*jAlert(
				"[金额 - 外币*汇率]超出误差,是否确认?<br>[3465.00-5.00*6.800000]<br><br>",
				"提示",
				function(){
				 //...
			 });*/
		 } 
	 }
	 
	 
	 
	 
	 /*
	  var resultValue= "";
	  
	  
		  resultValue = "";
		  for (var i = 0; i<15; i++) {
				 var curPos = "r" +  row + "_c5_" + (i*1+1);
				 var tmpValue = document.getElementById(curPos).value;
				 resultValue = resultValue +  tmpValue;
		  }
		  
		  if (resultValue=="") return;
		  //借方金额单元格
		  var tmpCell = new Cell();
		  tmpCell.showValue = resultValue;			 
		  tmpCell.dbValue = resultValue;
		  tmpCell.dataType = "0";
		  tmpCell.dictId = "0";
		  dsignRowList[curSelectRow*1-1].exchMoney = tmpCell;
		 */
 }

 /**
  * 删除键处理
  */
 function delExchKeyProcess(curRowNo, curmCol){
	  
	  var value  = strdebitMoneyInputValue;
	  
	  var curDebitMoneyvalue =  getExchMoneyCellVale(curRowNo, curmCol);
	  //获取字符串长度
	  var length = curDebitMoneyvalue.length ;
	  curDebitMoneyvalue = curDebitMoneyvalue.substring(0, length*1-1);
	  length = curDebitMoneyvalue.length ;
	  strdebitMoneyInputValue = value;
	//左边位置清空
	  for (var i = 0; i<curmCol;i++) {
			//得到当前位置
			var curPos = "r" +  curRowNo + "_c5_" + (i*1+1);
			document.getElementById(curPos).value = "";
	  }
	  //输入处理
	  for (var i = 0; i<length*1; i++) {
		//得到当前位置
		var curPos = "r" +  curRowNo + "_c5_" + (curmCol*1-i*1);
		document.getElementById(curPos).value =  curDebitMoneyvalue.substr(length*1-i*1-1,1);
	};
	//最左边位数处理 
	//var leftPos = "r" + curRowNo + "_c5_" + (curmCol*1-length*1);
	 //document.getElementById(leftPos).value = "";	 
	 strdebitMoneyInputValue = strdebitMoneyInputValue.substring(1, strdebitMoneyInputValue.length);
	 document.getElementById( "r" +  curRowNo + "_c5_" + (curmCol*1-1)).focus();
	 document.getElementById( "r" +  curRowNo + "_c5_" + curmCol).focus();
 }
 
 
 
 
 
 /**
  * 退格键处理
  */
 function tuigeExchKeyProcess(curRowNo, curmCol){
	  //输入的借方金额数值
	  var value  = strdebitMoneyInputValue;
	  //当前列左边的数值
	  var curDebitMoneyvalue =  getExchMoneyLeftCellVale(curRowNo, curmCol);
	  
	  //获取字符串长度
	  var length = curDebitMoneyvalue.length ;
	  //当前选择位置左边的值
	  strdebitMoneyInputValue = value;
	  
	  //左边位置清空
	  for (var i = 0; i<curmCol;i++) {
			//得到当前位置
			var curPos = "r" +  curRowNo + "_c5_" + (i*1+1);
			document.getElementById(curPos).value = "";
	  }
	  //输入处理
	  for (var i = 0; i<length*1; i++) {
		//得到当前位置
		var curPos = "r" +  curRowNo + "_c5_" + (curmCol*1-i*1);
		document.getElementById(curPos).value =  curDebitMoneyvalue.substr(length*1-i*1-1,1);
	};
	//最左边位数处理 
	 strdebitMoneyInputValue = strdebitMoneyInputValue.substring(1, strdebitMoneyInputValue.length);
	 document.getElementById( "r" +  curRowNo + "_c5_" + (curmCol*1-1)).focus();
	 document.getElementById( "r" +  curRowNo + "_c5_" + curmCol).focus();
	
 }

 
 
 
 

 /**
  * 得到外币金额值
  */
 function getExchMoneyCellVale(curRowNo,curmCol) {
	  
	  var debitMoneyCellVale = "";
	  for (var i = 0; i<curmCol*1; i++) {
		 var curPos = "r" +  curRowNo + "_c5_" + (i*1+1);
		 var tmpValue = document.getElementById(curPos).value;
		 debitMoneyCellVale = debitMoneyCellVale+ tmpValue;
			 
	  };
	  return debitMoneyCellVale;
 }
 
 
 
 /**
  * 得到外币左边的金额值
  */
 function getExchMoneyLeftCellVale(curRowNo,curmCol) {
	  
	  var debitMoneyCellVale = "";
	  for (var i = 0; i<curmCol*1-1; i++) {
		 var curPos = "r" +  curRowNo + "_c5_" + (i*1+1);
		 var tmpValue = document.getElementById(curPos).value;
		 debitMoneyCellVale = debitMoneyCellVale+ tmpValue;
			 
	  };
	  return debitMoneyCellVale;
 }
 
 
 /**
  * 根据汇率得到当前行转换后的本币值
  * 王丙建 2013-06-05
  * @param curRowNo
  */
 function getExchCalcValue(row) {
	 var curExchRatePos = "r" + row + "_c6_2";
	 //当前行汇率
	 var curRowRate = document.getElementById(curExchRatePos).value;
	 //计算当前行外币输入值
	 var curexchValue= "";
	  for (var i = 0; i<15; i++) {
				 var curPos = "r" +  row + "_c5_" + (i*1+1);
				 var tmpValue = document.getElementById(curPos).value;
				 curexchValue = curexchValue +  tmpValue;
	  }
	 if (curexchValue=="") curexchValue = 0;
	 //外币计算的值应该四舍五入到分，王丙建 2013-06-18
	 var curRateCalcValue = Math.round(curRowRate * (curexchValue*1));
	 return curRateCalcValue;
		  
 }
 
 
 /***
  * 外币汇率得到焦点事件处理函数
  * @param selObj
  */
  function exchangeRateFocus(selObj){
	  currentFocusInputComponent=selObj;//设置当前焦点控件
 	 //TODO 
  }
  
  
  /***
   * 外币汇率失去焦点事件处理函数
   * @param selObj
   */
   function exchangeRateBlur(selObj){
  	 //TODO 
  	 
   }
   
 