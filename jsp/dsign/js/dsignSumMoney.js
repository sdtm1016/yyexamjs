/**
 * 
 * @DESCRIBE   凭证组件借方金额、贷方金额合计录入子界面控制js
 * @AUTHOR     陈建宇
 * @DATE       2013-8
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */



  /**
   * 计算并返回借方金额合计
   */
  function countDebitMoneyTotal(){
	  
	  //合计值=rowsHeaderList里的条目的借方金额总和+当前凭证里的条目的借方金额总和+rowsFooterList里的条目的借方金额总和
	  var debitMoney = 0;
	  
	  for(var i=0;i<rowsHeaderList.length;i++){
		  debitMoney = debitMoney+parseInt(rowsHeaderList[i].debitMoney.dbValue,10);
	  }
	  for(var i=1;i<=5;i++){
		  debitMoney = debitMoney+getDebitMoney(i);
	  }
	  for(var i=0;i<rowsFooterList.length;i++){
		  debitMoney = debitMoney+parseInt(rowsFooterList[i].debitMoney.dbValue,10);
	  }
	  return debitMoney;
	  
  }
  

  /**
   * 计算并返回贷方金额合计
   */
  function countCreditMoneyTotal(){

	  //合计值=rowsHeaderList里的条目的借方金额总和+当前凭证里的条目的借方金额总和+rowsFooterList里的条目的借方金额总和
	  var creditMoney = 0;
	  
	  for(var i=0;i<rowsHeaderList.length;i++){
		  creditMoney = creditMoney+parseInt(rowsHeaderList[i].creditMoney.dbValue,10);
	  }
	  for(var i=1;i<=5;i++){
		  creditMoney = creditMoney+getCreditMoney(i);
	  }
	  for(var i=0;i<rowsFooterList.length;i++){
		  creditMoney = creditMoney+parseInt(rowsFooterList[i].creditMoney.dbValue,10);
	  }
	  return creditMoney;
	  
  }
  

  
  
  
  
  
  /**
   * 得到借方金额、贷方金额合计值
   * 计算当前录入行的借方金额和贷方金额汇总值，显示借方金额合计值，贷方金额合计值
   */
  function updateMoneyTotal() {
	  
	  //合计值=rowsHeaderList里的条目的借方金额总和+当前凭证里的条目的借方金额总和+rowsFooterList里的条目的借方金额总和
  
  var debitMoney = countDebitMoneyTotal();
  var creditMoney = countCreditMoneyTotal();
  
  //显示借方金额合计值
  showDebitMoneyTotal(debitMoney);
  //显示贷方金额合计值
  showCreditMoneyTotal(creditMoney);
	  
	  
	  
  }
	
  /**
   * 显示借方金额合计值
   * @param jfSumValue 借方金额合计值
   */
  function showDebitMoneyTotal(jfSumValue) {
	  var curRowNo ="hj";
  //获取字符串长度
  var value = Math.abs(jfSumValue).toString();
  var length = value.length ;
  var color="#000000";
  
  //显示前借方合计数值清空
  for (var i = 0; i<15; i++) {
		 var curPos = "r" +  curRowNo + "_c3_" + (i*1+1);
		 document.getElementById(curPos).value =  "";
		 $("#"+curPos).css("color",color);
  }
  $("#r" +  curRowNo + "_c3_3").parent().parent().removeAttr("symbol");
  if (jfSumValue==0) return ;
  
  if(jfSumValue<0){
	  //如果是负数的话，显示红色
	  color="#FF0000";
	  $("#r" +  curRowNo + "_c3_3").parent().parent().attr("symbol","-");
  }
  
//显示数据值
 for (var i = 0; i<15; i++) {
	 $("#r" +  curRowNo + "_c3_"+(i+1)).css("color",color);
	 if (i<=length)
		 {
			 var curPos = "r" +  curRowNo + "_c3_" + (i*1+1+ 15-length);	
				 document.getElementById(curPos).value =  value.substr(i,1);
			 }
	 };
  }
  
  
  
  /**
   * 显示贷方金额合计值
   * @param dfSumValue 贷方金额合计值
   */
  function showCreditMoneyTotal(dfSumValue) {
	  var curRowNo ="hj";
  //获取字符串长度
  var value = Math.abs(dfSumValue).toString();
  var length = value.length ;
  var color="#000000";
  //显示前数据全部清空
 for (var i = 0; i<15; i++) {
		 var curPos = "r" +  curRowNo + "_c3_" + (i*1+16);
		 document.getElementById(curPos).value =  "";	
		 $("#"+curPos).css("color",color);
 }

  $("#r" +  curRowNo + "_c3_19").parent().parent().removeAttr("symbol");
 if (dfSumValue==0) return ;
 

  if(dfSumValue<0){
	  //如果是负数的话，显示红色
	  color="#FF0000";
	  $("#r" +  curRowNo + "_c3_19").parent().parent().attr("symbol","-");
  }
  
 
 //显示数据值
 for (var i = 0; i<15; i++) {
	 $("#r" +  curRowNo + "_c3_"+(i+16)).css("color",color);
	 if (i<length)
	 {
		 var curPos = "r" +  curRowNo + "_c3_" + (i*1+15 + 16-length);
			 document.getElementById(curPos).value =  value.substr(i,1);
		 }
	 };
  }