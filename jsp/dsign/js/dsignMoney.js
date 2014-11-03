/**
 * 
 * @DESCRIBE   凭证组件借方金额、贷方金额录入子组件界面控制js
 * @AUTHOR     王丙建
 * @DATE       2012-09-10
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */
 
 //单元格对象  
var mcellObj="";
//数据类型
var dataType="";
//参照对象
var dictId="";
//数据库值
var dbValue="";
//显示值
var value ="";  
//单元格所在行
var row ="";

//单元格所在列
var col = "";

//借方金额贷方金额所在列
var mcol ="";

//下一个借方金额单元格id
var mnextMCellId="";

//上一个借方金额单元格id
var mprevMCellId="";

//上一个借方金额单元格单元格id
var mupCellId = "";

//下一个借方金额单元格单元格id
var mdownCellId = "";

var i = 0;

//借方金额输入值
var strdebitMoneyInputValue = "";
 
 
//获取选中单元格的数值
function setMCell(selObj)
 {
	 mcellObj = selObj;
	 //获得借方输入框对应的行元素
	 var trNode = mcellObj.parentNode.parentNode;
	 row = parseInt(trNode.getAttribute("row"),10);
	 col = parseInt(trNode.getAttribute("col"),10);
	 dbValue = trNode.getAttribute("dbValue");
	 mcol = parseInt(mcellObj.getAttribute("mcol"),10);
	 var msg =  "dbValue:" + dbValue + "\n" 
	      + "row:" + row + "\n" 
	     + "col:" + col + "\n" 
	     + "mcol:" + mcol + "\n" ;
	 
	  curSelectRow =  curPage * 5 + row*1; 
	    
 }




//得到下一个元素对象
function getNextFieldObj()
{
	 /***
	  * 回车处理：
	  * 如果在借方金额上：取当前金额值，如果大于0，使第二行摘要输入框获得焦点，否则使同行贷方金额获得焦点
	  * 如果在贷方金额上：取当前金额值，如果大于0，使第二行摘要输入框获得焦点，否则弹出警告：金额不能同时为0.使同行贷方金额获得焦点
	  * 下一行摘要列获得焦点前应判断行数据是否完整，不完整给出提示并取消下一行获得焦点
	  */
	 
	 var dm = getDebitMoney(row);
	 var cm = getCreditMoney(row);
	 //如果是借方金额上敲了回车，如果借方金额值大于0，
	 if(mcol<16){
		 if(dm!=0){
			 if(row<5){
				 //验证当前行数据是否填写完整
				 var flag = rowDataValidation(row);
				 if(flag!=false){
					 document.getElementById("r"+ (row+1) +"_c1").focus();
				 }
			 }else{
				 //如果是在第五行贷方金额上敲了回车，整体向上翻一行
				 scrollUp();
				 document.getElementById("r5_c1").focus();
			 }
		 }else{
			 //贷方金额获得焦点
			 document.getElementById("r" +  row + "_c3_" +28).focus();
		 }
	 }
	 //如果是贷方金额上敲了回车
	 else if(mcol>=16 && mcol<=30){
		 if(cm!=0 || dm!=0){
			 if(row<5){
				//验证当前行数据是否填写完整
				 var flag = rowDataValidation(row);
				 if(flag!=false){
					 document.getElementById("r"+ (row+1) +"_c1").focus();
				 }
			 }else{
				 //如果是在第五行贷方金额上敲了回车，整体向上翻一行
				 scrollUp();
				 document.getElementById("r5_c1").focus();
			 }
		 }else{
			 
			 //借贷方金额不能同时为0
			 jAlert("借贷方金额不能同时为0！","提示",function(){
				 document.getElementById("r" +  row + "_c3_" +28).focus();
			 });
		 }
	 }
	 
	 
	 
	 /*
	 
	  if (mcol <30) {
	    mnextCellId =  "r"+ row +"_c" + col + "_" + (mcol*1+1);
	  }else if(mcol == 30){
		  //跳转到下一行摘要列
		 mnextCellId = "r"+ (row*1+1) +"_c1";
	  }
	 
	    
	  document.getElementById(mnextCellId).focus();
	  */
	}


//得到下一个元素对象
function getNextMCellObj()
{
	 /***
	  * 右键处理：
	  * 如果mcol<15，往后移动一格
	  * 否则如果mcol=15，跳到贷方金额元位
	  * 否则如果mcol>15且<30，往后移动一格
	  * 否则如果mcol=30且row<5，跳到下一行摘要格
	  */
	 
	if(mcol<15){
		 document.getElementById("r" +  row + "_c3_" +(mcol+1)).focus();
	}else if(mcol==15){
		 document.getElementById("r" +  row + "_c3_" +28).focus();
	}else if(mcol>15 && mcol<30){
		 document.getElementById("r" +  row + "_c3_" +(mcol+1)).focus();
	}else if(mcol==30 && row<5){
		 document.getElementById("r"+ (row+1) +"_c1").focus();
	}
	
	 
}




//得到上一个元素对象
 function getPrevmcellObj()
 {
 	 if (mcol >1)
 		 mprevCellId =  "r"+ row +"_c" + col + "_" + (mcol*1-1);
 	  document.getElementById(mprevCellId).focus();
 	}

 
 
 /**
  * 向上键处理
  */
 function getMUpCellObj() {
	 if (row==1) return;
	 	
	 mupCellId = "r" + (row*1-1) + "_c" + col+ "_" + mcol;
	 document.getElementById(mupCellId).focus();
 }
 
 /**
  * 向下键处理
  */
 function getMDownCellObj() {
	 if (row==maxRow) return;
     
	 mdownCellId = "r" + (row*1+1) + "_c" + col+ "_" + mcol;
	 document.getElementById(mdownCellId).focus();
 }
  
  
  

 
 /***
  * 借方金额数字输入处理
  * @param row
  * @param col
  * @param keyValue
  */
 function debitMoneyInput(row,col,keyValue){
	 
	 //1.拼装新的金额值
	 //取第一格到当前输入格位置的值
	 var nmv = "";//新的金额值new money value
	 
	 
	 
	 
	 //角、分录入时直接修改覆盖其值
	 if(col==14 || col==15){
		 $("#r"+row+"_c3_"+col).val(keyValue);
	 }
	 
	//拼装借方金额新值：
	 for(var i=1;i<=15;i++){
		 var v = $("#r"+row+"_c3_"+i).val();
		 if(v=="") v=0;
		 nmv += v;
		 if(i==col && col!=14 && col!=15) nmv += keyValue;
	 }
	 
	 if(col==14){
		 $("#r"+row+"_c3_15").focus();
	 }
	 
	 
	 nmv=parseInt(nmv,10);
	 var symbol = $("#r"+row+"_c3_3").parent().parent().attr("symbol");
	 
	 if(symbol=="-"){
		 nmv = parseInt(symbol+nmv,10);
	 }
	 
	 //2.清空对方方向金额
	 clearCreditMoney(row);
	 
	 //3.重新赋值本方金额
	 setDebitMoney(nmv,row);
	 
	 //4.重新计算本方金额合计值
	 var cdmt = countDebitMoneyTotal();
	 showDebitMoneyTotal(cdmt);//显示贷方合计值

	 //5.重新计算对方金额合计值
	 var ccmt = countCreditMoneyTotal();
	 showCreditMoneyTotal(ccmt);//显示贷方合计值
	 
 }

 

 /***
  * 贷方金额数字输入处理
  * @param row
  * @param col
  * @param keyValue
  */
 function creditMoneyInput(row,col,keyValue){
	 
	 //1.拼装新的金额值
	 //取第一格到当前输入格位置的值
	 var nmv = "";//新的金额值new money value
	 
	 
	 
	//角、分录入时直接修改覆盖其值
	 if(col==29 || col==30){
		 $("#r"+row+"_c3_"+col).val(keyValue);
	 }
	 
	 //拼装新值：
	 for(var i=16;i<=30;i++){
		 var v = $("#r"+row+"_c3_"+i).val();
		 if(v=="") v=0;
		 nmv += v;
		 if(i==col && col!=29 && col!=30) nmv += keyValue;
	 }
	 
	 

	 if(col==29){
		 $("#r"+row+"_c3_30").focus();
	 }
	 
	 
	 
	 nmv=parseInt(nmv,10);
	 var symbol = $("#r"+row+"_c3_19").parent().parent().attr("symbol");
	 if(symbol=="-"){
		 nmv = parseInt(symbol+nmv,10);
	 }
	 
	 //2.清空对方方向金额
	 clearDebitMoney(row);
	 
	 //3.重新赋值本方金额
	 setCreditMoney(nmv,row);
	 
	 //4.重新计算本方金额合计值
	 var ccmt = countCreditMoneyTotal();
	 showCreditMoneyTotal(ccmt);//显示贷方合计值
	 
	 
	 //5.重新计算对方金额合计值
	 var cdmt = countDebitMoneyTotal();
	 showDebitMoneyTotal(cdmt);//显示贷方合计值
	 
 }

 
 
 
 
   /**
   * 借贷方金额onkeyup事件
   * @param e
   * @returns
   */
 //当前输入键的值
  var curinputKeyValue = 0;
  function mcellKeyControl(selObj){
	  
	  if (inputBz==false) return false;
	  
	  //if (dsignOpType=="zhuanzhang") return false;
	  
	  var trNode = selObj.parentNode.parentNode;
	  var curRowNo = parseInt(trNode.getAttribute("row"));
	  //选中金额单元格mcol
	  var curmCol = parseInt(selObj.getAttribute("mcol"));
	  setMCell(selObj);	  
	  

	  
	  
	  
	  selObj.value=selObj.value.replace(/[^0-9-]+/,'');
	  //得到键盘输入值
	  var inKey = event.keyCode;
	  
	  
	  
	  var keyValue = inKey*1-48;
	  curinputKeyValue = keyValue;
	  
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
			  
			  
			  //debitMoneyCellChar(curRowNo, curmCol,keyValue);
			  //如果是借方金额发生了按键
			  if(mcol<16){
				  debitMoneyInput(curRowNo,curmCol,keyValue);
			  }
			//如果是贷方金额发生了按键
			  else{
				  creditMoneyInput(curRowNo,curmCol,keyValue);
			  }
			  
			  
			  return false;
		  }	    	  
		  //回车键 tab键
		  if (inKey==13 || inKey==9)
		  {
			  getNextFieldObj();
		  }
		//右键
		  else if(inKey==39){

			  getNextMCellObj();
		  }
		  //左键
		  else if (inKey==37)
		  {
			  getPrevmcellObj();
		  }
	  		//上键
		  else if (inKey==38)
		  {
			  getMUpCellObj();
		  }	  
	  		//下键
		  else if (inKey==40)
	  		{
			  getMDownCellObj();
	  		}
		  //删除键
		  else if (inKey==46){
			  delKeyProcess(row,mcol); 
		  }
		  //退格键
		  else if (inKey==8){
			  tuigeKeyProcess(row,mcol); 
		  }
		  //“=”等号键
		  else if(inKey==187){
			  
			  //判断借贷方是否平衡，若不平衡执行平衡操作
			  var dmt = getDebitMoneyTotal();//借方金额合计
			  var cmt = getCreditMoneyTotal();//贷方金额合计
			  
			  if(dmt==cmt) return false;
			  
			  //平衡操作步骤：
			  //如果是借方事件
			  if(mcol<16){
				  //1.清空贷方值
				  clearCreditMoney(row);
				  
				  //2.重新计算并显示贷方金额合计值
				  var ccmt = countCreditMoneyTotal();
				  showCreditMoneyTotal(ccmt);//显示贷方合计值
				  
				  //3.设置当前行借方值等于贷方合计值减借方合计值加当前行借方值（如果是负数，设置符号属性为负号且用红色标记金额值）
				  var cdm = getDebitMoney(row);
				  var val = ccmt-dmt+cdm;
				  setDebitMoney(val,row);
				  
				  //4.设置并显示借方合计值为贷方合计值（保持借贷平衡）
				  showDebitMoneyTotal(ccmt);
				  
			  }
			  //如果是贷方事件
			  else{
				  //1.清空借方值
				  clearDebitMoney(row);

				  //2.重新计算并显示借方金额合计值
				  var cdmt = countDebitMoneyTotal();
				  showDebitMoneyTotal(cdmt);//显示借方合计值
				  
				  //3.设置当前行贷方值等于借方合计值减贷方合计值加当前行贷方值（如果是负数，设置符号属性为负号且用红色标记金额值）
				  var ccm = getCreditMoney(row);
				  var val = cdmt-cmt+ccm;
				  setCreditMoney(val,row);
				  //4.设置并显示贷方合计值为借方合计值（保持借贷平衡）
				  showCreditMoneyTotal(cdmt);
				  
			  }

			  return false;
			  
		  }
		//“-”键
		  else if(inKey==189 || inKey==109){
			  /***
			   * 判断流程：如果当前方向金额如果大于0，使变成负数，小于0变成正数，同时修改合计值，如果有数量核算，修改数量值。
			   */
			  
			  
			  
			  //如果是借方金额发生了按键
			  if(mcol<16){
				  var cdm = getDebitMoney(row);
				  if(cdm>0){
					  cdm = parseInt("-"+cdm,10);
				  }else if(cdm<0){
					  cdm = Math.abs(cdm);
				  }
				  
				  
				  if(cdm==0){
					  
					$("#r"+row+"_c3_3").parent().parent().attr("symbol","-");//设置值符号属性
					var color = "#FF0000";//设置文本框显示颜色为红色
					for(var i=1;i<=15;i++){
						$("#r"+row+"_c3_"+i).css("color",color);
					}
				  }else{
					  setDebitMoney(cdm,row);
				  }
				  
				  var cdmt = countDebitMoneyTotal();
				  showDebitMoneyTotal(cdmt);
				  
				  var sp = $("#subjectPrice").val();
				  
				  if(sp!=""){
					  try{
						  var nsn = parseFloat(cdm/100/sp).toFixed(5);
						  $("#subjectNumber").val(nsn);
					  }catch(e){}
				  }
				  
			  }
			  //如果是贷方金额发生了按键
			  else{

				  var ccm = getCreditMoney(row);
				  
				  if(ccm>0){
					  ccm = parseInt("-"+ccm,10);
				  }else if(ccm<0){
					  ccm = Math.abs(ccm);
				  }
				  
				  
				  if(ccm==0){
						$("#r"+row+"_c3_19").parent().parent().attr("symbol","-");//设置值符号属性
						var color = "#FF0000";//设置文本框显示颜色为红色
						for(var i=16;i<=30;i++){
							$("#r"+row+"_c3_"+i).css("color",color);
						}
				  }else{

					  setCreditMoney(ccm,row);
				  }
				  
				  var ccmt = countCreditMoneyTotal();
				  showCreditMoneyTotal(ccmt);
				  
				  var sp = $("#subjectPrice").val();
				  
				  if(sp!=""){
					  try{
						  var nsn = parseFloat(ccm/100/sp).toFixed(5);
						  $("#subjectNumber").val(nsn);
					  }catch(e){}
				  }
				  
			  }

			  return false;
			  
		  }
		//"+"键,使当前金额变为正数，同时计算当前金额合计值
		  else if(inKey==107){
			//如果是借方金额发生了按键
			  if(mcol<16){
				  var cdm = getDebitMoney(row);
				  if(cdm==0){
					  
						$("#r"+row+"_c3_3").parent().parent().removeAttr("symbol");//移除符号属性
						var color = "#000000";//设置文本框显示颜色为黑色
						for(var i=1;i<=15;i++){
							$("#r"+row+"_c3_"+i).css("color",color);
						}
							
				  }else if(cdm<0){
					  cdm = Math.abs(cdm);
					  setDebitMoney(cdm,row);
					  var cdmt = countDebitMoneyTotal();
					  showDebitMoneyTotal(cdmt);
				  }
				  
				  

				  var sp = $("#subjectPrice").val();
				  
				  if(sp!=""){
					  try{
						  var nsn = parseFloat(cdm/100/sp).toFixed(5);
						  $("#subjectNumber").val(nsn);
					  }catch(e){}
				  }
				  

				  
			  }else{

				  var ccm = getCreditMoney(row);
				  if(ccm==0){
						$("#r"+row+"_c3_19").parent().parent().removeAttr("symbol");//移除符号属性
						var color = "#000000";//设置文本框显示颜色为黑色
						for(var i=16;i<=30;i++){
							$("#r"+row+"_c3_"+i).css("color",color);
						}
				  }else if(ccm<0){
					  ccm = Math.abs(ccm);
					  setCreditMoney(ccm,row);
					  var ccmt = countCreditMoneyTotal();
					  showCreditMoneyTotal(ccmt);
				  }
				  
				  

				  var sp = $("#subjectPrice").val();
				  
				  if(sp!=""){
					  try{
						  var nsn = parseFloat(ccm/100/sp).toFixed(5);
						  $("#subjectNumber").val(nsn);
					  }catch(e){}
				  }
				  
				  
				  
			  }

			  return false;
		  }
		//"."小数点键,使光标跳至“角”位输入
		  else if(inKey==110 || inKey==190){
			//如果是借方金额发生了按键
			  if(mcol<16){
				  $("#r"+row+"_c3_14").focus();
			  }else{

				  $("#r"+row+"_c3_29").focus();
			  }

			  return false;
		  }
		  
		  
		//空格键
		  else if(inKey==32){
			  /***
			   * 空格键时，执行借贷方切换。
			   * 步骤：
			   * 1.将本方向金额值赋给对方
			   * 2.重新计算对方合计值
			   * 3.将本方值清0
			   * 4.重新计算本方合计值
			   */

			  var cdm = getDebitMoney(row);
			  var ccm = getCreditMoney(row);
			  if(cdm==0 && ccm==0) return false;
			  
			  setCreditMoney(cdm,row);
			  var ccmt = countCreditMoneyTotal();
			  showCreditMoneyTotal(ccmt);
			  
			  setDebitMoney(ccm,row);
			  var cdmt = countDebitMoneyTotal();
			  showDebitMoneyTotal(cdmt);
			  

			  return false;
		  }
		  else {
			  abortBz = true;
		  }
		  
		  /***
		   * 下面的情况跟C/S版不符，注释以待观察
		   */
		  /*
		  //如果是单价和数量核算，输入值改变时，需要改变单价的值
			 // var selPrice =  document.getElementById("subjectPrice").value ;
			  var selNumber = document.getElementById("subjectNumber").value;
			  
			  if (selNumber!=0) {
				  var changePrice = (strdebitMoneyInputValue/100/selNumber).toFixed(5) ;
				  document.getElementById("subjectPrice").value = changePrice;
				  var curPos = "r" +  curRowNo + "_c2";
				  var curCodedbvalue = document.getElementById(curPos).getAttribute("dbValue");
				  
				  var newDbValue = getCodeAddInputInfo(curCodedbvalue.split("#")[0]);
				  
				  document.getElementById(curPos).setAttribute("dbValue", newDbValue);
			  }
			*/
	  }
	  
	  updateMoneyTotal();

	  return false;
  }
  


  /**
   * 删除键处理
   */
  function delKeyProcess(curRowNo, curmCol){
	  
	  
	  /***
	   * 向后删除
	   * 先往后跳一格，然后执行backspace键调用的函数
	   */
	  
	  if(curmCol!=15 && curmCol!=30){
		  document.getElementById("r" +  curRowNo + "_c3_"+(curmCol+1)).focus();
		  tuigeKeyProcess(curRowNo, curmCol+1);
	  }
	  
	  
	  
	  /*
	  
	  //输入的借方金额数值
	  var value  = strdebitMoneyInputValue;
	  //当前列左边的数值
	  var curDebitMoneyvalue =  getDebitMoneyCellVale(curRowNo, curmCol);
	  //获取字符串长度
	  var length = curDebitMoneyvalue.length ;
	  //当前选择位置左边的值
	  strdebitMoneyInputValue = value;
	  
	  //左边位置清空
	  for (var i = 0; i<curmCol;i++) {
			//得到当前位置
			var curPos = "r" +  curRowNo + "_c3_" + (i*1+1);
			document.getElementById(curPos).value = "";
	  }
	  //输入处理
	  for (var i = 0; i<length*1; i++) {
		//得到当前位置
		var curPos = "r" +  curRowNo + "_c3_" + (curmCol*1-i*1);
		document.getElementById(curPos).value =  curDebitMoneyvalue.substr(length*1-i*1-1,1);
	};
	//最左边位数处理 
	 strdebitMoneyInputValue = strdebitMoneyInputValue.substring(1, strdebitMoneyInputValue.length);
	 document.getElementById( "r" +  curRowNo + "_c3_" + (curmCol*1+1)).focus();
	 document.getElementById( "r" +  curRowNo + "_c3_" + curmCol).focus();
	
	 */
	 
	 
	 
	 
	 
  }
  
  
  
  /**
   * 退格键处理
   */
  function tuigeKeyProcess(curRowNo, curmCol){
	  //输入的借方金额数值
	  var value  = strdebitMoneyInputValue;
	  //当前列左边的数值
	  var curDebitMoneyvalue =  getDebitMoneyCellVale1(curRowNo, curmCol);
	  
	  //获取字符串长度
	  var length = curDebitMoneyvalue.length ;
	  //当前选择位置左边的值
	  strdebitMoneyInputValue = value;
	  
	  //左边位置清空
	  for (var i = 0; i<curmCol;i++) {
			//得到当前位置
			var curPos = "r" +  curRowNo + "_c3_" + (i*1+1);
			document.getElementById(curPos).value = "";
	  }
	  //输入处理
	  for (var i = 0; i<length*1; i++) {
		//得到当前位置
		var curPos = "r" +  curRowNo + "_c3_" + (curmCol*1-i*1);
		document.getElementById(curPos).value =  curDebitMoneyvalue.substr(length*1-i*1-1,1);
	};
	//最左边位数处理 
	 strdebitMoneyInputValue = strdebitMoneyInputValue.substring(1, strdebitMoneyInputValue.length);
	 document.getElementById( "r" +  curRowNo + "_c3_" + (curmCol*1-1)).focus();
	 document.getElementById( "r" +  curRowNo + "_c3_" + curmCol).focus();
	
  }
  
  
  /**
   * 得到借方金额值
   */
  function getDebitMoneyCellVale1(curRowNo,curmCol) {
	  
	  var debitMoneyCellVale = "";
	  for (var i = 0; i<curmCol*1-1; i++) {
		 var curPos = "r" +  curRowNo + "_c3_" + (i*1+1);
		 var tmpValue = document.getElementById(curPos).value;
		 debitMoneyCellVale = debitMoneyCellVale+ tmpValue;
			 
	  };
	  return debitMoneyCellVale;
  }
  
  
  /**
   * 得到借方金额值
   */
  function getDebitMoneyCellVale(curRowNo,curmCol) {
	  
	  var debitMoneyCellVale = "";
	  for (var i = 0; i<curmCol*1; i++) {
		 var curPos = "r" +  curRowNo + "_c3_" + (i*1+1);
		 var tmpValue = document.getElementById(curPos).value;
		 debitMoneyCellVale = debitMoneyCellVale+ tmpValue;
			 
	  };
	  return debitMoneyCellVale;
  }
  
  
  /**
   * 得到借方金额元素对应的数值
   * @param curRowNo 当前行
   * @param nextRowNo 下一行
   * @param curCol 当前列
   */
  function getDocumentValueBydebitMoney(curRow, nextRow,  curCol) {
	  var resultValue= "";
	  
	  /**
	   * 当前行借方金额值 
	   */
	  for (var i = 0; i<15; i++) {
			 var curPos = "r" +  curRow + "_c3_" + (i*1+1);
			 var tmpValue = document.getElementById(curPos).value;
			 resultValue = resultValue +  tmpValue;
	  }
	  
	  document.getElementById("r" +  curRow + "_c3").value = resultValue;
	  
	  //下一行借方金额数值
	  resultValue = "";
	  for (var i = 0; i<15; i++) {
		 var curPos = "r" +  nextRow + "_c3_" + (i*1+1);
		 var tmpValue = document.getElementById(curPos).value;
		 resultValue = resultValue +  tmpValue;
	  }
	  document.getElementById("r" +  nextRow + "_c3").value = resultValue;
	  strdebitMoneyInputValue = resultValue;
	  return resultValue;
  }
  
  /**
   * 获得焦点事件
   */
  //获取焦点的源输入格值
  //如果是外币核算，首先应该把外币录入值和外币税率的乘积显示在借方金额或者贷方金额中
  var sourceCellFocuslValue = "";
  function mcellFocus(selObj) {
	  
		 currentFocusInputComponent=selObj;//设置当前焦点控件
	  
	  if(currentDisplayFinder!=null){
		  currentDisplayFinder.style.display="none";//隐藏当前科目列显示的放大镜
	  }
	  if (inputBz==false) return;
	  if(!checkProducerDate()) return;//如果制单日期为通过验证，则禁止获得焦点禁用控件。
	  
	  
	  

	  
	  
	  
	  
	  setMCell(selObj); 
	  
	  
	  
	  
	  
	  
	  //dataRowClickBiz(row);
	  
	  
	  
	  getGeneratorPzbh();
	  var msg =  " row:" + row + "\n" 
                 + "col:" + col + "\n" 
                 + "mcol:" + mcol + "\n" ;
	  
	  var curPos = "r" +  row + "_c" + col + "_" + mcol;
	  sourceCellFocuslValue =  document.getElementById(curPos).value;
	  
	  
	  
	  
	  
	  /*
	  
	 	  //外币汇率计算值
	  var curRateCalcValue = getExchCalcValue(row);
	  
	  //贷方金额获得焦点，外币输入默认值处理
	  if (mcol>=16) {
		  //当前贷方金额值
		  var curDebitMoneytValue = "";
		  for (var i = 0; i<15; i++) {
				 var curPos = "r" +  row + "_c3_" + (i*1+1+15);
				 var tmpValue = document.getElementById(curPos).value;
				 curDebitMoneytValue = curDebitMoneytValue +  tmpValue;
		  }
		  curDebitMoneytValue = curDebitMoneytValue*1;
		  //计算后值不为0时，把值写入本行的贷方金额输入框中
		  //删除键不处理
		  if (curinputKeyValue==-2) {
			  
		  }
		//退格键不处理
		  else if (curinputKeyValue==-40){
			  
		  }
		  
		  //其他情况才处理,只有外币值改变，借方金额、贷方金额就跟着改变，不管是否原来有值
		  else if (curRateCalcValue!=0 ) {
					
			  //显示贷方金额
			  var tmpKemu = new Cell();
			  tmpKemu.showValue = curRateCalcValue.toString();
			  tmpKemu.dataType = "1";
			  tmpKemu.dbValue = curRateCalcValue.toString();
			  showCreditMoney(tmpKemu,row);
			  //借方金额清空显示
			  showNullDebitMoney(row);
			 
			  updateMoneyTotal();
		  }  
		  
		  
	  }
	  //借方金额获得焦点，外币输入默认值处理
	  else {
		  //当前借方金额值
		  var curDebitMoneytValue = "";
		  for (var i = 0; i<15; i++) {
				 var curPos = "r" +  row + "_c3_" + (i*1+1);
				 var tmpValue = document.getElementById(curPos).value;
				 curDebitMoneytValue = curDebitMoneytValue +  tmpValue;
		  }
		  curDebitMoneytValue = curDebitMoneytValue*1;
		  //计算后值不为0时，把值写入本行的借方金额输入框中
		  //删除键不处理
		  if (curinputKeyValue==-2) {
			  
		  }
		//退格键不处理
		  else if (curinputKeyValue==-40){
			  
		  }
		  
		  //其他情况才处理
		  else if (curRateCalcValue!=0) {
					
			  //借方金额默认值
			  var tmpKemu = new Cell();
			  tmpKemu.showValue = curRateCalcValue.toString();
			  tmpKemu.dataType = "1";
			  tmpKemu.dbValue = curRateCalcValue.toString();
			  showDebitMoney(tmpKemu,row);
			  
			  //贷方金额清空显示
			  showNullCreditMoney(row);
			  updateMoneyTotal();
		  }  
		  
	  } 
	  
	  
	  */
	  
	  
	  
	  
	  
	  
	  
	  
	  var resultValue= "";
	  //贷方金额获取焦点
	  if (mcol>=16) {
		  for (var i = 0; i<15; i++) {
			 var curPos = "r" +  row + "_c3_" + (i*1+1+15);
			 var tmpValue = document.getElementById(curPos).value;
			 resultValue = resultValue +  tmpValue;
		  }
	  }
	  //借方金额获取焦点
	  else {
		  for (var i = 0; i<15; i++) {
			var curPos = "r" +  row + "_c3_" + (i*1+1);
			var tmpValue = document.getElementById(curPos).value;
			resultValue = resultValue +  tmpValue;
		  }
	  }
	  document.getElementById("r" +  row + "_c3").value = resultValue;
	  //空值时显示处理
	  if (resultValue=="") {
		  if (document.getElementById("r" +  row + "_c1").value!="" || document.getElementById("r" +  row + "_c2").value!=""){
			  //贷方
			  if (mcol>=16) {
				  
				  document.getElementById("r" +  row + "_c3_" +28).value = "0";
				  document.getElementById("r" +  row + "_c3_" +29).value = "0";  
				  document.getElementById("r" +  row + "_c3_" +30).value = "0";
				  
				  //for (var i = 1; i<16;i ++) {
					//  document.getElementById("r" +  row + "_c3_" +i).value = "";					   
				  //}
				  
				  document.getElementById("r" +  row + "_c3_" +28).focus();
			  }
			//借方
			  else {
				  document.getElementById("r" +  row + "_c3_" +13).value = "0";
				  document.getElementById("r" +  row + "_c3_" +14).value = "0";  
				  document.getElementById("r" +  row + "_c3_" +15).value = "0";
				  
				  document.getElementById("r" +  row + "_c3_" +13).focus();
				  
				 // for (var i = 16; i<31;i ++) {
				//	  document.getElementById("r" +  row + "_c3_" +i).value = "";					   
				 // }
				  
	
			  }
		  }
		  
	  }
	 
	  

	  
	  
	  strdebitMoneyInputValue = resultValue;
	  //初始化的0再输入值时应清空
	  if (strdebitMoneyInputValue=="000") strdebitMoneyInputValue = "";
	  
	  
	  

	  var temp=selObj.value;
	  selObj.value=temp;
	  
	  
	  
	  try{
		  with(document.selection.createRange()){
			  moveStart("character",temp.length);//更改范围的开始位置
			  collapse();//将插入点移动到当前范围的开始或结尾
			  select();//将当前选择区置为当前对象
		  }
		 
		  
		  selObj.onclick=function(){
			  with(document.selection.createRange()){
				  moveStart("character",temp.length);
				  collapse();
				  select();
			  }
		  };
	  }catch(e){
		  
	  }
	  
	  
	  
	  
	  var abslft=435;
	  var abstop=144;
	  var topoffset=35;
	  var leftoffset=8;
	  //alert(row+"行"+mcol+"列");
	  
	  if(mcol>15){
		  abslft=441;
	  }
	  
	  try{

		  $("#focuser").css("top",(abstop+(topoffset*row))+"px");
		  $("#focuser").css("left",(abslft+(leftoffset*mcol))+"px");
		  $("#focuser").show();
	  }catch(e){}
	  
	  
	  
	  
	  
 } 
 
  /**
   * 失去焦点事件
   * 失去焦点时要计算合计值
   * @param selObj
   */
 function mcellBlur(selObj){
	
	 
	 //失去焦点的时候如果值为0，则清空。
	 
	 if (mcol<16) {
		 var dm = getDebitMoney(row);
		 if(dm==0) clearDebitMoney(row);
	 }else{
		 var cm = getCreditMoney(row);
		 if(cm==0) clearCreditMoney(row);
	 }
	 
	//失去焦点判断如果数量核算不为空，则将数量核算值重新赋值到科目的dbDalue
	 var subjectNumber = $("#subjectNumber").val();
	 
	 if(subjectNumber!=""){
		 var codeDbValue = $("#r"+row+"_c2").attr("dbValue");
		 
		 var li = codeDbValue.lastIndexOf("#");
		 var temp = codeDbValue.substring(0,li);
		 codeDbValue = temp+"#"+subjectNumber;
		 
		 $("#r"+row+"_c2").attr("dbValue",codeDbValue);
		 
	 }
	 
	  
	  
 }
 
 
 
 
 
 
 
 
 
 
 

 /***
  * 根据行号得到借方金额
  * 陈建宇 新增 主要用于凭证金额录入、光标控制、 辅助核算数量单价计算金额 2013-07-10
  * 
  */
 function getDebitMoney(rowNumber){
	 var jfje = "";//借方金额
	 var curPos = null;
	  for (var i = 1; i<=15; i++) {
			 curPos = "r" +  rowNumber + "_c3_" + i;
			 var v = $("#"+curPos).val();
			 jfje = jfje + v;
	  }
	  
	  
	if(jfje!=""){

		  var symbol = $("#"+curPos).parent().parent().attr("symbol");
		  if(symbol=="-"){
			  jfje="-"+jfje;
		  }
		  
	  }else{
		  jfje="0";
	  }
	
	return parseInt(jfje,10);
 }
 
 /***
  * 
  * 根据行号得到贷方金额
  * 陈建宇 新增 主要用于凭证金额录入、光标控制、 辅助核算数量单价计算金额 2013-07-10
  */
 function getCreditMoney(rowNumber){
	 var dfje = "";//贷方金额
	 var curPos = null;
	  for (var i = 16; i<=30; i++) {
		  	curPos = "r" +  rowNumber + "_c3_" + i;
			 var v = $("#"+curPos).val();
			 dfje = dfje + v;
	  }
	  
	if(dfje!=""){
		  var symbol = $("#"+curPos).parent().parent().attr("symbol");
		  if(symbol=="-"){
			  dfje="-"+dfje;
		  }
	  }else{
		  dfje="0";
	  }
	return parseInt(dfje,10);
	  
 }

 /**
  * 得到借方金额合计
  */
 function getDebitMoneyTotal(){
	 var dmt = "";//借方金额
	 var curPos = null;
	  for (var i = 1; i<=15; i++) {
			 curPos = "rhj_c3_" + i;
			 var v = $("#"+curPos).val();
			 dmt = dmt + v;
	  }
	  if(dmt!=""){
		  var symbol = $("#"+curPos).parent().parent().attr("symbol");
		  if(symbol=="-"){
			  dmt="-"+dmt;
		  }
	  }else{
		  dmt="0";
	  }
	  return parseInt(dmt,10);
	  
 }
 

 /**
  * 得到贷方金额合计
  */
 function getCreditMoneyTotal(){
	 var cmt = "";//借方金额
	 var curPos = null;
	  for (var i = 16; i<=30; i++) {
			 curPos = "rhj_c3_" + i;
			 var v = $("#"+curPos).val();
			 cmt = cmt + v;
	  }
	  if(cmt!=""){
		  var symbol = $("#"+curPos).parent().parent().attr("symbol");
		  if(symbol=="-"){
			  cmt="-"+cmt;
		  }
	  }else{
		  cmt="0";
	  }
	  return parseInt(cmt,10);
	  
 }
 

 
 /***
  * 设置借方金额
  * 陈建宇 新增 2013-07-10
  * @param debitMoney 借方金额值
  * @param rowNumber 行号
  */
 function setDebitMoney(debitMoney,rowNumber){
	//清空贷方金额
	 //clearCreditMoney(rowNumber);
	 
	 //清空借方金额
	 clearDebitMoney(rowNumber);
 	
 	//如果借方金额为0，则不再继续执行赋值
 	if(debitMoney==0) return;
 	
 	var color = "#000000";
 	if(debitMoney<0){
 		$("#r"+rowNumber+"_c3_3").parent().parent().attr("symbol","-");//设置值符号属性
 		color = "#FF0000";//设置文本框显示颜色为红色
 		debitMoney=Math.abs(debitMoney);
 	}else{
 		$("#r"+rowNumber+"_c3_3").parent().parent().removeAttr("symbol");//移除金额值符号属性
 	}
 	
 	//借方金额控件赋值
 	var dm = debitMoney.toString();
	var dml = dm.length;
	for(var i=1;i<=(15-dml);i++) $("#r"+rowNumber+"_c3_"+i).css("color",color);
	for(var i=(15-dml);i<15;i++){
		var pos = "#r"+rowNumber+"_c3_"+(i+1);
		$(pos).css("color",color);
		$(pos).val(dm.substr(i-(15-dml),1));
		
	}
 }

 
 /**
  * 设置贷方金额
  * 陈建宇 新增 2013-07-10
  * @param creditMoney
  * @param rowNumber
  */
 function setCreditMoney(creditMoney,rowNumber){

	 //清空借方金额
	 //clearDebitMoney(rowNumber);
 	
	//清空贷方金额
	 clearCreditMoney(rowNumber);
	 
	//如果贷方金额为0，则不再继续执行赋值
	 if(creditMoney==0) return;
	 

 	var color = "#000000";
 	if(creditMoney<0){
 		$("#r"+rowNumber+"_c3_19").parent().parent().attr("symbol","-");//设置值符号属性
 		color = "#FF0000";//设置文本框显示颜色为红色
 		creditMoney=Math.abs(creditMoney);
 	}else{
 		$("#r"+rowNumber+"_c3_19").parent().parent().removeAttr("symbol");//移除金额值符号属性
 	}
	 	
	 
	//贷方金额控件赋值
	 var cm = creditMoney.toString();
	 if(cm.length>15){
		 cm=cm.substr(1);
	 }
	 var cml = cm.length;
	 
	 
	 
	for(var i=15;i<=(30-cml);i++) $("#r"+rowNumber+"_c3_"+i).css("color",color);
	
	 for(var i=(30-cml);i<30;i++){
		 var pos = "#r"+rowNumber+"_c3_"+(i+1);
		
		$(pos).css("color",color);
		$(pos).val(cm.substr(i-(30-cml),1));
	}
 }
 
 
 
 
 
 
 /***
  * 清空借方金额
  */
 function clearDebitMoney(rowNumber){
	 //清空借方金额
 	for(var i=1;i<=15;i++){
 		var pos = "#r"+rowNumber+"_c3_"+i;
 		$(pos).val("");
 		$(pos).css("color","#000000");
 		
 	}
 	$("#r"+rowNumber+"_c3_3").parent().parent().removeAttr("symbol");
 }
 
 
 /**
  * 清空贷方金额
  */
 function clearCreditMoney(rowNumber){

	//清空贷方金额
	 for(var i=16;i<=30;i++){
 		var pos = "#r"+rowNumber+"_c3_"+i;
 		$(pos).val("");
 		$(pos).css("color","#000000");
 	}
	 $("#r"+rowNumber+"_c3_19").parent().parent().removeAttr("symbol");
 }
 
 
 /***
  * 清空rowNumber行的借方金额显示值，不清楚属性和颜色
  * @param rowNumber
  */
function clearDebitMoneyShowValue(rowNumber){
	
	 for (var i = 0; i<15; i++) {
			 var curPos = "r" +  rowNumber + "_c3_" + (i*1+1);
			 document.getElementById(curPos).value =  "";		
	 }
}

/***
 * 清空rowNumber行的贷方金额显示值，不清楚属性和颜色
 * @param rowNumber
 */
function clearCreditMoneyShowValue(rowNumber){
	
	for (var i = 15; i<30; i++) {
		  var curPos = "r" +  rowNumber + "_c3_" + (i*1+1);
		  document.getElementById(curPos).value =  "";
	}
}

 
 
 
 
 
 


/***
 * 根据行号得到外币金额
 * 新增 主要用于凭证外币录入、光标控制、 辅助核算数量单价计算
 * 陈建宇 2013-8-6
 * 
 */
function getForeignMoney(rowNumber){
	 var fm = "";//借方金额
	 var curPos = null;
	  for (var i = 1; i<=15; i++) {
			 curPos = "r" +  rowNumber + "_c5_" + i;
			 var v = $("#"+curPos).val();
			 fm = fm + v;
	  }
	  
	  
	if(fm!=""){

		  var symbol = $("#"+curPos).parent().parent().attr("symbol");
		  if(symbol=="-"){
			  fm="-"+fm;
		  }
		  
	  }else{
		  fm="0";
	  }
	return parseInt(fm,10);
}






/***
 * 设置外币金额
 * 陈建宇 2013-8-6
 * @param foreignMoney 外币金额值
 * @param rowNumber 行号
 */
function setForeignMoney(foreignMoney,rowNumber){
	 //清空外币金额
	 clearForeignMoney(rowNumber);
	
	//如果外币金额为0，则不再继续执行赋值
	if(foreignMoney==0) return;
	
	var color = "#000000";
	if(foreignMoney<0){
		$("#r"+rowNumber+"_c5_3").parent().parent().attr("symbol","-");//设置值符号属性
		color = "#FF0000";//设置文本框显示颜色为红色
		foreignMoney=Math.abs(foreignMoney);
	}else{
		$("#r"+rowNumber+"_c5_3").parent().parent().removeAttr("symbol");//移除金额值符号属性
	}
	
	//外币金额控件赋值
	var fm = foreignMoney.toString();
	var fml = fm.length;
	for(var i=1;i<=(15-fml);i++) $("#r"+rowNumber+"_c5_"+i).css("color",color);
	for(var i=(15-fml);i<15;i++){
		var pos = "#r"+rowNumber+"_c5_"+(i+1);
		$(pos).css("color",color);
		$(pos).val(fm.substr(i-(15-fml),1));
		
	}
}



/***
 * 清空外币金额
 */
function clearForeignMoney(rowNumber){
	 //清空借方金额
	for(var i=1;i<=15;i++){
		var pos = "#r"+rowNumber+"_c5_"+i;
		$(pos).val("");
		$(pos).css("color","#000000");
	}
	$("#r"+rowNumber+"_c5_3").parent().parent().removeAttr("symbol");
}
