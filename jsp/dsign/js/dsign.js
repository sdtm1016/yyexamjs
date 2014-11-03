/**
 * 
 * @DESCRIBE   凭证组件js
 * @AUTHOR     王丙建
 * @DATE       2012-09-10
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */
 var do_seltype=null;
 //单元格对象  
var cellObj="";
//数据类型
var dataType="";    
//参照对象
var dictId="";
//数据库值
var dbValue="";
//显示值
var value ="";  
//单元格所在行
var row =0;

//单元格所在列
var col = 0;

//下一个单元格id
var nextCellId="";

//下一个单元格id
var prevCellId="";

//上一个单元格id
var upCellId = "";

//下一个单元格id
var downCellId = "";

//最大行
var maxRow =5;
 

//当前焦点所在行
var curFouceSelRow = 1; 
//当前焦点输入控件
var currentFocusInputComponent = null;


/***
 * 当前显示的放大镜
 * 陈建宇 2013-04-05
 */
var currentDisplayFinder = null;
var currentFinderTextbox = null;

//选择行标志
var selRowBz = true;

//选择常用摘要返回值及描述
var selBdigestCode = "";
var selBdigestName = "";
var selBdigestId = "";

//选择科目返回值及描述

var selKemuCode = "";
var selKemuName = "";
var selKemuId = "";
//凭证类字id
var curAttribute380="1";

/**
 * 存放当前动作名，用于窗体传值函数根据当前动作执行相应的赋值
 */
var xaction="";

//当前币种名称
var cexchName = "";

//凭证显示状态，0表示填制状态，1表示查询展示状态，此变量用于凭证编辑判定。
var dsign_display_status = 1;



var curCodeObj = null;


//科目辅助核算操作类型（add:设置辅助核算,update:修改辅助核算，弹窗返回值处理函数deliverValue里将根据此值决定光标去向）
var codeOtherInfoOperateType=null;


var rowsHeaderList = new Array();//滚行控制，头部行集合
var rowsFooterList = new Array();//滚行控制，底部行集合


var oiwor=null;//辅助核算窗体弹出参考值，当前凭证如果显示的从数据库查询的信息，则科目列失去焦点时，不弹出辅助核算窗，如果是新增凭证，则弹出，此变量用于dsign.js cellBlur函数内的判断。





//获取选中单元格的数值
function setCell(selObj)
 {
	 cellObj = selObj;
	 //获得输入框对应的行元素
	 var trNode = cellObj.parentNode.parentNode;
	 row = parseInt(trNode.getAttribute("row"));
	 dataType = cellObj.getAttribute("dataType");
	 dictId = cellObj.getAttribute("dictId");
	 dbValue = cellObj.getAttribute("dbValue");
	 value = cellObj.getAttribute("value");
	 col = parseInt(cellObj.getAttribute("col"));
	 
	 var msg = "dataType:" + dataType + "\n" 
	    + "dictId:" + dictId + "\n" 
	    + "dbValue:" + dbValue + "\n" 
	    + "value:" + value + "\n" 
	     + "row:" + row + "\n" 
	     + "col:" + col + "\n" ;
	  curSelectRow =  curPage * 5 + row*1; 
	    
 }

 //得到下一个元素对象
var curRowcodeFoucsclickBz = false;
 function getNextCellObj(selObj)
 {
	 if (col <=1) {
 	    nextCellId = "r"+ row +"_c" + (col*1+1);
 	    document.getElementById(nextCellId).select();
 	    return false;
	 }
	 
	 if (col==2 ) {
		curRowcodeFoucsclickBz = true;
 		 var nextInput = "r" + row + "_c3_13";
 		 document.getElementById(nextInput).focus();
 		 
 		 return false;
		 
	 }
	 
	 
	 
 	
 }

//得到上一个元素对象
 function getPrevCellObj()
 {
 	 if (col==1) return ;
	 if (col >=1)
 		 prevCellId = "r"+ row +"_c" + (col*1-1);
 	 document.getElementById(prevCellId).select();
 	}

 /**
  * 向上键处理
  */
 function getUpCellObj() {
	 if (row==1) return;
		
	 upCellId = "r" + (row*1-1) + "_c" + col;
	 
	 document.getElementById(upCellId).select();
 }
 
 /**
  * 向下键处理
  */
 function getDownCellObj() {
	 if (row==maxRow) return;
	 downCellId = "r" + (row*1+1) + "_c" + col;
	 document.getElementById(downCellId).select();
 }
 
  /**
   * 键盘控制事件
   * @param e
   * @returns
   */
  function cellKeyControl(selObj){
	  
	  
	  
	  if (inputBz==false) return false;
	  //if (dsignOpType=="zhuanzhang") return false;
		
	  zyBz = true;
	  
	  
	  
	  
	  var inKey = event.keyCode;
	   setCell(selObj);
			
	 
	    //回车键 、右键、tab键
	  if ( inKey==13 || inKey==39 /*|| inKey==9*/)
	  {
		  return getNextCellObj(selObj);
	  }
		  //左键
	  else if (inKey==37)
	  	{
	     getPrevCellObj();
	  		}
	  		//上键
	  else if (inKey==38)
	  	{
		  getUpCellObj();
	  		}
	  		//下键
	   else if (inKey==40)
	  	{
		   getDownCellObj();
	  	}
	   else{
		   abortBz = true;
	   }
	  
	  
  }
  
  

  

  
  
  /**
   * 摘要双击弹窗选择处理函数
   * @param e
   * @returns
   */
 function selZhaiyao(selObj){
	 
	 if (inputBz==false) return;
	 cellObj = selObj;
	 //获得摘要单元格属性
	 dataType = cellObj.getAttribute("dataType");
	 dictId = cellObj.getAttribute("dictId");
	 dbValue = cellObj.getAttribute("dbValue");
	 value = cellObj.getAttribute("value");
	 col = parseInt(cellObj.getAttribute("col"));
	 var trNode = cellObj.parentNode.parentNode;
	 row = parseInt(trNode.getAttribute("row"));
	 var selId = "r" + row + "_c" + col;
	 selBdigestId = selId;
	 
	 //弹出参照窗体
	 window.parent.openWindow("dsign_reference",pageWindowId);
	 
	 
	 
	 
	 //设置事件动作为设置摘要
	 xaction="selZhaiyao";
	
 
}
 
 
 /**
  * 实现窗体传值函数
  * 用于接收子窗体传来的值
  * @param valueObject
  */
 function deliverValue(valueObject){
	 
	 //如果是计算器返回的结果
	 if(xaction=="calculator"){
		//如果是借方事件
		 if(mcol!="" && row!=""){

			 
			 
			 /***
			  * CS版上，计算器四舍五入结果分析
			  * 计算器结果为0.444时，处理结果为0.44
			  * 计算器结果为0.445时，处理结果为0.45
			  * 计算器结果为0.44444445时，处理结果为0.44
			  * 
			  */
			 
			 
			 var money = parseFloat(valueObject).toFixed(2);
			 //四舍五入
			 
			 
			 money = money*100;
			 
			 
			 
			 
			 
			 if(mcol<16){
				 //清空贷方金额
				 clearCreditMoney(row);
				 setDebitMoney(money,row);
				  var ccmt = countCreditMoneyTotal();
				  showCreditMoneyTotal(ccmt);//显示贷方合计值
				  var cdmt = countDebitMoneyTotal();
				  showDebitMoneyTotal(cdmt);//显示借方合计值
				  
				  
				  $("#r"+row+"_c3_13").focus();
				  
			  }else{
				  //清空借方金额
				clearDebitMoney(row);
				  setCreditMoney(money,row);
				  var ccmt = countCreditMoneyTotal();
				  showCreditMoneyTotal(ccmt);//显示贷方合计值
				  var cdmt = countDebitMoneyTotal();
				  showDebitMoneyTotal(cdmt);//显示借方合计值
				  

				  $("#r"+row+"r"+row+"_c3_28").focus();
			  } 
		 }
		  
	 }else if(xaction=="selZhaiyao"){
		 document.getElementById(selBdigestId).value=valueObject.selBdigestName;
		 document.getElementById(selBdigestId).setAttribute("value", valueObject.selBdigestName);
		 document.getElementById(selBdigestId).setAttribute("dbValue", valueObject.selBdigestCode);
	 }
	 else if(xaction=="selKemu"){
		 
		 
		 //如果是选择科目动作，赋相关值并文本域编辑状态设置为选中。
		 
		 
		 selKemuCode = valueObject.selKemuCode;
		 selKemuName = valueObject.selKemuName;
		 var kemuInputBox = document.getElementById(selKemuId);
		 kemuInputBox.value=valueObject.selKemuCode;
		 kemuInputBox.setAttribute("dbValue", valueObject.selKemuCode);
		 kemuInputBox.select();
		 
		 
		 
		 
		 
		//判断科目是否受控  王丙建 2013-05-21
		 /**
	 		var curCsignDbValue =  document.getElementById("dsignType").innerHTML;
	 		var codelimt =  isDsignLimitCode(curCsignDbValue, selKemuCode);
	 		if (codelimt==1) {
	 			 jAlert("你输入的科目编码受限，请重新输入","提示",function(){	 			 
	 			 	document.getElementById(selKemuId).value = "";
	 			 	document.getElementById(selKemuId).setAttribute("dbValue", "");
	 			 });
	 			 return;
	 		 }
		 */
		 
		 
		
 		
 	 }
	 //辅助核算
	 else if(xaction=="editOtherInfo"){
		 //部门
		 var selDeptId=    valueObject.items.subjectDeptId ;
		 var selDeptName =  valueObject.items.subjectDeptName ;
		 //个人
		 var selPersonId  =  valueObject.items.subjectPersonId ;
		 var selPersonName =  valueObject.items.subjectPersonName ;
		 //客户
		 var selCustomerId=  valueObject.items.subjectCustomerId ;
		 var selCustomerName =  valueObject.items.subjectCustomerName ;

		 //供应商
		 var selSupId=  valueObject.items.subjectSupId ;
		 var selSupName =  valueObject.items.subjectSupName ;
		 
		 //业务员
		 var selBusinessId = valueObject.items.subjectBusinessId;
		 var selBusinessName =  valueObject.items.subjectBusinessName ;
		 
		 
        //项目		 
		 var selProjectId = valueObject.items.subjectProjectId ;
		var selProjectName = valueObject.items.subjectProjectName ;

		 //票号
		 var selTicketNumber =  valueObject.items.ticketNumber ;
		//发生日期
		 var selDate =  valueObject.items.subjectDate;
		 
		//单价
		 var selPrice =  valueObject.items.subjectPrice ;
		//数量
		 var selNumber =  valueObject.items.subjectNumber;
		 
		 //结算方式
		 var subjectJsfsId = valueObject.items.subjectJsfsId;
		 var subjectJsfsName = valueObject.items.subjectJsfsName;
		 

		  var rowNumber = valueObject.rowNumber;
		  

		//个人核算1
		 
		 document.getElementById("subjecPerson").value = selPersonName;
		 document.getElementById("subjecPerson").setAttribute("dbValue", selPersonId);
		//部门核算2
		 document.getElementById("subjectDept").value = selDeptName;
		 document.getElementById("subjectDept").setAttribute("dbValue", selDeptId);

		//客户
		 document.getElementById("subjectCustomer").value = selCustomerName;
		 document.getElementById("subjectCustomer").setAttribute("dbValue", selCustomerId);

		//供应商
		 document.getElementById("subjectSup").value = selSupName;
		 document.getElementById("subjectSup").setAttribute("dbValue", selSupId);
				
		//业务员核算4
		 document.getElementById("subjectBusiness").value = selBusinessName;	
		 document.getElementById("subjectBusiness").setAttribute("dbValue", selBusinessId);
		
		//项目核算5
		document.getElementById("subjecProject").value = selProjectName;
		document.getElementById("subjecProject").setAttribute("dbValue", selProjectId);
		
		
		//票号日期核算67
		 // document.getElementById("ticketNumber").value = "-" +  selTicketNumber;
		  document.getElementById("ticketNumber").value =   selTicketNumber;
		  
		  document.getElementById("subjectDate").value = selDate;
		//单价数量核算89
		  
		  if(selPrice!=""){
			  document.getElementById("subjectPrice").value = parseFloat(selPrice).toFixed(5);
		  }

		  var kemuInputBox = document.getElementById("r" + rowNumber + "_c2");
		  var ccode = kemuInputBox.getAttribute("dbValue").split("#")[0];
		  
		  
		  if(selNumber!=""){
			  document.getElementById("subjectNumber").value =parseFloat(selNumber).toFixed(5);
		  	//var ccode = addinfoValue[0];
			//根据输入值匹配科目编码或者名称，如果存在返回科目对象
			 var codeObj = getCurCodeObjByCodeOrName(ccode);
			 var codeAddInfo = getCodAddInfo(codeObj);
			 $("#units").html(codeAddInfo[6]);
			 $("#units").show();//显示单位
			 
		  }
		  //结算方式。都显示票号
		  document.getElementById("subjectJsfs").value = subjectJsfsName;
		  document.getElementById("subjectJsfs").setAttribute("dbValue", subjectJsfsId);
			
	    
		  
		  var newDbValue = getCodeAddInputInfo(ccode);
		  
		  kemuInputBox.setAttribute("dbValue", newDbValue);
		  

		  //判断有无外币
		 var hasForeignCurrency = kemuInputBox.getAttribute("hasForeignCurrency");
		  
		  
		 //如果单价和数量均不为空,初始化单价显示
		  
		  if (selPrice!="" && selNumber!="") {
			  var selCalcValue = Math.round(selPrice*selNumber*100);//金额值取整
			  var money=null;//用于根据借贷方金额乘以或除以汇率反算外币
			  //如果借方金额不为空就更新借方金额
			  var dm = getDebitMoney(rowNumber);
			  if(dm!=0){
				  money=selCalcValue;
				  setDebitMoney(selCalcValue,rowNumber);
				  //重新计算借方合计值
				  var debitMoney = countDebitMoneyTotal();
				  //显示借方金额合计值
				  showDebitMoneyTotal(debitMoney);
			  }
			  
			  //如果贷方金额不为空就更新贷方金额
			  var cm = getCreditMoney(rowNumber);
			  
			  if(cm!=0){
				  money=selCalcValue;
				  setCreditMoney(selCalcValue,rowNumber);
				//重新计算贷方合计值
				  var creditMoney = countCreditMoneyTotal();
				  //显示贷方金额合计值
				  showCreditMoneyTotal(creditMoney);
			  }
			  
			  //如果借方金额和贷方金额都为空，则设置借方金额
			  if(dm==0 && cm==0){
				  setDebitMoney(selCalcValue,rowNumber);
				//重新计算借方合计值
				  money=selCalcValue;
				  var debitMoney = countDebitMoneyTotal();
				  //显示借方金额合计值
				  showDebitMoneyTotal(debitMoney);
			  }
			  
			  /**
			   * 如果有外币，还得修改外币金额，外币=借贷方金额乘以或除以汇率
			   */
			  if(hasForeignCurrency==true || hasForeignCurrency=="true"){

				  
				  var fmdv=$("#r"+rowNumber+"_c5").attr("dbValue").split("#");
				  
					 var cnfrat=fmdv[2];//汇率
					 var bcal=fmdv[3];//折算方式
					 var nerror=fmdv[4];//最大误差
					 
					 
					 var fm = 0;
					 
					 
					 if(bcal==0){
						 fm=Math.round(money/cnfrat);//四舍五入取整
					 }else{
						 fm = Math.round(money*cnfrat);//四舍五入取整
					 }
					 setForeignMoney(fm,rowNumber);
					
					 
			  }
			  
			  
			  
		 }
		  kemuInputBox.setAttribute("hasOtherInfo",true);
		  kemuInputBox.removeAttribute("cancelOtherInfoEditFlag");//填写了信息后，删除是否取消了填写辅助核算属性，以确保在科目框失去焦点时根据情况判定是否弹出辅助核算窗
		  
		//设置确认标记。当科目列失去焦点时如果科目带辅助核算项会判断所有辅助核算项的值，如果都为0会弹出要求填写，但某些辅助核算项可以为空的，比如科目只有数量核算的时候，这种情况时，科目列失去焦点时不必要再次弹出辅助填写窗的。
		  kemuInputBox.setAttribute("confirmOtherInfoEditFlag",true);
		  
		  //如果辅助核算操作类型为添加,让外币列或借方金额列获得焦点
		  if(codeOtherInfoOperateType=="add"){
			 //如果有外币，让外币获得焦点 
			 if(hasForeignCurrency==true || hasForeignCurrency=="true"){
				  document.getElementById("r" + rowNumber + "_c5_13").focus();
			  }
			  //否则让借方金额获得焦点
			  else{
				  document.getElementById("r" + rowNumber + "_c3_13").focus();
			  }
			  
			  
		  }
		  //否则如果为修改，让科目名称内容为选中状态
		  else if(codeOtherInfoOperateType=="update"){
			  kemuInputBox.select();
		  }
		  
		 
		  //显示辅助核算各控件
		  showCodeAddInitInfo();
	}
 }
 


  
  /**
   * 科目选择事件
   * @param e
   * @returns
   */
 function selKemu(selObj,opener){
	 if (inputBz==false) return;
	 cellObj = selObj;
	 //获得科目单元格属性
	 dataType = cellObj.getAttribute("dataType");
	 dictId = cellObj.getAttribute("dictId");
	 dbValue = cellObj.getAttribute("dbValue");
	 value = cellObj.getAttribute("value");
	 col = parseInt(cellObj.getAttribute("col"));
	 var trNode = cellObj.parentNode.parentNode;
	 row = parseInt(trNode.getAttribute("row"));
	 selKemuId = "r" + row + "_c" + col;
	 
	 

	 var param = new Object();
	 param.treeSetting=new Object();
	 param.treeSetting.justFinalNode=true;//限定弹出的科目参照窗体只允许选择末级节点
	 param.treeSetting.selectedNodeId=dbValue;
	 //弹出参照窗体
	 window.parent.openWindow("dsign_subjectsreference",opener,param);
	 xaction="selKemu";
}
 
 /**
  * 得到科目参照值
  */
 /*
 function setSubjectValue() {
     document.getElementById(selKemuId).setAttribute("value", selKemuName);
	 document.getElementById(selKemuId).setAttribute("dbValue", selKemuCode);

 }
 
 */
 
 /**
  * 选择转账的制单日期
  */
 function selZZProducerDate(selDate) {
	 WdatePicker({
	      el:"producerDate",
	      position:{left:100,top:10},
	      onpicking:function(dp){
	         //得到用户选择的日期
	         var newSelectedDate=dp.cal.getNewDateStr();
	      }
	 });
 }
 
 
 /**
  * 显示制单日期的日期选择器
  * 陈建宇 2013/5/15 15:02
  */
 function showProducerDatePicker(){
	 WdatePicker({
	      el:"producerDate",
	      
	      /*
	      onpicking:function(dp){
	    	  var selectedDate = dp.cal.getNewDateStr();
	    	  
	    	  var sd = new Date();
				
				var edy = sd.getFullYear();
				var edm = sd.getMonth()+1;
				var edd = sd.getDate();
				
				//进行相减的小日期（来自startDate的转换）
				var smallDate = new Date(edy+"/"+edm+"/"+edd+"");
				
				//进行相减的大日期（来自newSelectedDate的转换）
				var bigDate = new Date(selectedDate.replace(new RegExp("-","gm"),"/"));
				
				//计算被点击结束日期与其起始日期的天数差
				var differenceDay=bigDate.getTime()-smallDate.getTime();
				if(differenceDay>0){
					jAlert("制单日期不能大于系统日期！","提示");
					return;
				}
				
	    	  document.body.removeChild(document.getElementById("producerDateCover"));
	      }
	 */
	 
	});
	 $("#producerDate")[0].onclick=null;
 }
 
 
 /***
  * 检查制单日期
  * 如果编辑了制单日期，当点击凭证中部表单和右上角块时调用此函数验证日期是否符合条件
  * 陈建宇 2013/5/15 15:02
  */
 function checkProducerDate(){
	 
	 
	 return true;
	 /*
	 var finder_pdf = document.getElementById("finder_pdf");
	 var flag = true;//只要一条不满足，此变量值都为false
	 if(finder_pdf.style.display=="block"){
		 var pdt = document.getElementById("producerDate");
		 var pd = pdt.value;
		 var curPeriod = getPeriodByDate(pd);
		  //从 Cookie中获取帐套启用的年份，月份
		  var curAccountYear = getAccountYear();
		  var curAccountMonth = getAccountMonth();
		  
		  //从选择日期中获取年份、月份
		  var curSelYear = pd.substring(0,4);
		  var curSelMonth = pd.substring(6,7);
		  
		  if (curSelYear<curAccountYear) {
		      flag = false;
			  jAlert("日期不能超前建账日期!","提示",function(){
			      pdt.focus();  
			  });
		  }
		  else if (curSelYear==curAccountYear && curSelMonth<curAccountMonth) {
			  
		      flag = false;
		      jAlert("日期不能超前建账日期!","提示",function(){
			      pdt.focus();  
			  });
		      
		  }
		  
		  else if (curPeriod==null) {
	     	flag = false;
	     	

		      jAlert("你选择的日期找不到对应的会计期间，请重新选择日期!","提示",function(){
			      pdt.focus();  
			  });
	     	
	      }
		  else if (curPeriod.glflag !="0") {
	     	flag = false;
		      jAlert("你选择的日期所在的会计期间已经结账或者记账，不允许填制凭证!","提示",function(){
			      pdt.focus();  
			  });
	      }
	 }
	 if(flag){
		 finder_pdf.style.display="none";
	 }
	 return flag;
	 */
	 
	 
	 
	 
 }
 
 
 
 /**
  * 选择制单日期
  * @param selDate 选择的日期
  */
 function selProducerDate() {
	if (inputBz==false) return;
	 
	 /*
	//显示遮罩层
	var coverdiv = document.createElement("div");
	coverdiv.id="producerDateCover";
	coverdiv.style.cssText="position:absolute;width:660px;height:510px;top:-10px;left:-10px;z-index:3000;background-color:#000;filter:alpha(opacity:0);opacity:0;";
	coverdiv.onclick=showProducerDatePicker;
	document.body.appendChild(coverdiv);
	 */
	showProducerDatePicker();
	
	
	
 }
 
 /***
  * 显示日历控件按钮
  * 
  */
 function showDateFinder(){
	 //只读凭证不显示日历按钮
	 if (inputBz==false) return;
	 
	 document.getElementById('finder_pdf').style.display='block';
 }
 
 
 /**
  * 选择凭证类型
  * @param selObj
  */
 function selDsignType(selObj){
	 if (inputBz==false) return;
	 cellObj = selObj;
	 //获得凭证类型单元格属性
	 dataType = cellObj.getAttribute("dataType");
	 dictId = cellObj.getAttribute("dictId");
	 dbValue = cellObj.getAttribute("dbValue");
	 value = cellObj.getAttribute("value");
	  value = "记";
	  dbValue = "1";
	  document.getElementById("dsignType").setAttribute("value", value);
	  document.getElementById("dsignType").setAttribute("dbValue", dbValue);
	  document.getElementById("dsignType").innerHTML = value;
 }
 
 
 /***
  * 生成凭证号，根据选择的凭证类别和期间查询生成凭证号
  * 此函数从下面getGeneratorPzbh函数中分离出
  */
 function createGeneratorPzbh(){
	 var newSelectedDate=document.getElementById("producerDate").value;
     
     //分隔日期，补全成规则日期
     try{
    	 var dateArray = newSelectedDate.split("-");
    	 var mth = parseInt(dateArray[1],10);
    	 var day = parseInt(dateArray[2],10);
    	 if(mth<10){
        	 dateArray[1]="0"+mth;
         }
    	 
    	 if(day<10){
        	 dateArray[2]="0"+day;
         }
    	 
    	 newSelectedDate = dateArray[0]+"-"+dateArray[1]+"-"+dateArray[2];
    	 
     }catch(e){
    	 
     }
     
     
     
     curAttribute380 = document.getElementById("dsignType").getAttribute('value');
     //根据制单日期得到凭证编号
     $.ajax({
		 	url:"dsignAccvouch!queryInsDsignAccvouchInoId.action?newSelectedDate=" + newSelectedDate + "&attribute380=" + curAttribute380,
		 	type:"post",
		 	dataType:"json",
		 	 async:false,
		 	success:function(data,status){
		 		document.getElementById("dsignNumber").innerHTML = data.title.dsignNumber;
		 	}
		});
 }
 
 
 /**
  * 得到自动产生的凭证编号
  */
 function getGeneratorPzbh() {
	 
	 var curPzbh = document.getElementById("dsignNumber").innerHTML;
	 
	 //如果凭证编号不存在，自动生成凭证编号
	 if (curPzbh=="") {
		 createGeneratorPzbh();
	 }
 }
 
 /***
  * 点击放大镜弹出科目选择窗体
  * 陈建宇 2013-04-05
  * @param finder
  */
 
 function toSelKemu(finder,opener){
	 var textbox = finder.parentNode.getElementsByTagName("textarea")[0];
	 
	 selKemu(textbox,opener);
 }
 
 
 function setFinderHidden(event){
	
	var evt=(window.event || event);
    var evtsrc = (evt.srcElement || evt.target);
    

    if(evtsrc!=currentDisplayFinder && evtsrc!=currentFinderTextbox && currentDisplayFinder!=null){
    	currentDisplayFinder.style.display="none";
    }
    /*
    var finder = null;
    if(evtsrc.tagName=="input"){
    	finder = evtsrc.parentNode.getElementsByTagName("input")[1];
    }
    
    if(finder!=null && currentDisplayFinder!=null && evtsrc!=currentDisplayFinder){
    	currentDisplayFinder.style.display="none";
    }
    
    */
 }

if(window.attachEvent){
	document.attachEvent("onmousedown",setFinderHidden);
	document.attachEvent("onmousedown",function(){
		try{
			$("#focuser").hide();
		}catch(e){}
	});
}else if(window.addEventListener){
	document.addEventListener("mousedown",setFinderHidden,false);
	document.addEventListener("mousedown",function(){
		try{
			$("#focuser").hide();
		}catch(e){}
	},false);
}else{
	  //TODO 其他浏览器类型...
}

 
 /**
  * 摘要失去焦点
  * @param selObj
  */
var zyBz = true;
//失去焦点摘要行
var blueZyRow = 0;
//获取焦点摘要行
var fouceZyRow = 0;

 









/**
 * 获得焦点事件
 */
function cellFocus(selObj) {
	 
	try{
		$("#focuser").hide();
	}catch(e){}

	 var trNode = selObj.parentNode.parentNode;
	 row = parseInt(trNode.getAttribute("row"));
	 
	 //如果科目单元格dbValue无值，则执行清空辅助核算函数
	 var dbv = document.getElementById("r"+row+"_c2").getAttribute("dbValue");
	 if(dbv==""){
		 loadCodeAddInitInfo();
	 }
	 
	 var curCol = parseInt(selObj.getAttribute("col"));
	 fouceZyRow = row ;
	 
	 currentFocusInputComponent=selObj;//设置当前焦点控件
	 
	 if (zyBz==false) return;
	 currentFinderTextbox = selObj;
	 if (inputBz==false) return;//如果非录入情况则退出。
	 if(!checkProducerDate()) return;//如果制单日期为通过验证，则禁止获得焦点并让用户使用控件。

		  
	 
	 if (dsignOpType=="edit") {
	 //显示右边放大镜按钮
		 if(selObj.parentNode.cellIndex==1){
			 var finder = selObj.parentNode.getElementsByTagName("input")[0];
			 if(currentDisplayFinder!=null && currentDisplayFinder!=finder){
				 currentDisplayFinder.style.display="none";
			 }
			 
			 finder.style.display="block";
			 if(navigator.appName == "Microsoft Internet Explorer"){
			   if(navigator.appVersion.match(/7./i)=='7.'){
	
					 finder.style.position="absolute";
			   }
			 }
			 finder.style.marginTop="16px";
			 finder.style.width="18px";
			 currentDisplayFinder=finder;
		 }
	 } 
	 
	 
	 getGeneratorPzbh();
	 
	 
	//第一列获得焦点，如果只不为空，设置编辑模式为选中。
	 if(curCol==1){
		 
		 //从上一行复制摘要值（如果有）
		 if(row>1){

			 var selObjVal = $(selObj).val();
			 if(selObjVal==""){
				 var txt = $("#r"+(row-1)+"_c1").val();
				 $(selObj).val(txt);

				 var dbValue = $("#r"+(row-1)+"_c1").attr("dbValue");
				 $(selObj).attr("dbValue",dbValue);
			 }
		 }
		 
		 if(selObj.value!="") selObj.select();;
	 }
	 
	 
	 //选中科目，显示科目辅助信息
	 if (curCol==2)  {
		 var finder = selObj.parentNode.getElementsByTagName("input")[0];
		 if (finder!=null)
			 finder.style.display="block";
		 var value = selObj.value;
		 var dbvalue = selObj.getAttribute("dbValue");
		 if(value!="" && (dbvalue!=null && dbvalue!="null" && dbvalue!=undefined)){
			 selObj.value=dbvalue.split("#")[0];
			 selObj.select();
		 }

	 }
	 
	 
	 //当前选择行
	 curSelectRow = row;
	 if (curFouceSelRow == row) {
		 selRowBz = true; 
		 return;
	 }
	 
}


 /**
  * 科目失去焦点事件
  */

 function cellBlur(selObj) {

	//if (curRowcodeFoucsclickBz ==true) {
		 //curRowcodeFoucsclickBz = false;
	//	 return ;
	// }
		
	 if (inputBz==false) return;
	 var dataRow = selObj.parentNode.parentNode;
	 
	 var rowNumber = parseInt(selObj.id.substring(1,2),10);
	row = rowNumber;
	 
	 
	 col = parseInt(selObj.getAttribute("col"),10);
	 //失去焦点时选择行为原来行的行值
	 curFouceSelRow = rowNumber;
	 var curPos = "r" + rowNumber + "_c" + col; 

	 if (col==2 ) {

		 var textarea = document.getElementById(curPos);
		 var curValue = textarea.value;
		 
		 
		 /*
		  *判断填写的科目是否为空，若为空弹出警告并使其获得焦点，该判断应该放到各输入框获得焦点时。
		 if(curValue==""){
			 jAlert("科目为空或不是合法科目，请输入科目","提示",function(){			 
			 	textarea.focus();
			 });
			 return;
		 }
		 */
		 //输入的回车键被代替
 		 curValue = curValue.replace(new RegExp("\r\n","gm"),"");
		 dbValue = textarea.getAttribute("dbValue");
		 
		 
		 //如果不是末级科目名称，取末级的科目名称
		 
		 var lastpos = curValue.lastIndexOf("/");
		 if(lastpos>0) {
			 curValue = curValue.substring(lastpos+1,curValue.length);
		 }
		 	
		 //科目非空校验
		 if (curValue!="" && curValue!="null") {
			 
			 //根据输入值匹配科目编码或者名称，如果存在返回科目对象
			 curCodeObj = getCurCodeObjByCodeOrName(curValue);
			 
		 	  if (curCodeObj!=null) {
		 		 
		 		 var bend =  curCodeObj.bend;
		 		 curValue =  curCodeObj.ccode;
		 		 
		 		 var curcodeAbsName = getCodeAbsName(curValue);
		 		 var curcodeName = strNullProc(curcodeAbsName);
		 		 
		 		 //如果非末级科目，清除科目名称，弹出科目选择窗体，要求重新选择
		 		 if (bend==0) {

		 			textarea.setAttribute("dbValue","");
		 			textarea.value = "";
		 			 selKemu(cellObj,pageWindowId);
		 			 return ;
		 		 }
		 		 
		 		
		 		 
		 		 if (curcodeName==""/* && currentDisplayFinder.style.display=="none"*/) {
		 			 
		 			 jAlert("你输入的科目代码不存在，请重新输入！","提示",function(){

				 			//textarea.setAttribute("dbValue","");
				 			textarea.value = curcodeName;

				 			textarea.focus(); 
		 			 });
		 			 
		 			 return ;
		 		 }
		 		 
				//科目是否被修改了变量，用于弹出辅助核算判断，若值已修改且有辅助项则弹出辅助核算录入窗。
				var valueIsChanged=false;
				var ccode = dbValue.split("#")[0];
				
				if(ccode==curValue){
					valueIsChanged=false;
				}else{
					valueIsChanged=true;
					
					//清空各自定义属性
					$("#r"+rowNumber+"_c2").removeAttr("hasOtherInfo");
					$("#r"+rowNumber+"_c2").removeAttr("hasForeignCurrency");
					$("#r"+rowNumber+"_c2").removeAttr("cancelOtherInfoEditFlag");
					$("#r"+rowNumber+"_c2").removeAttr("confirmOtherInfoEditFlag");
					
					textarea.setAttribute("dbValue",curValue);
					
					//为了兼容某些清空下生成的凭证无科目但有辅助核算数据的情况，如果上一次的科目不为空，清空辅助核算，以满足总账填制凭证不同的控制逻辑。
					if(ccode!=""){
						loadCodeAddInitInfo();//清空辅助核算各项值
						textarea.removeAttribute("hasOtherInfo");
					}
					
					
				}
				
				textarea.value = curcodeName;
		 		 

		 		 
		 		 

		 		 /***************     外币业务 开始     **************/
		 		 //判断输入的科目是否是外币核算，如果是外币核算，弹出外币核算输入框
		  		cexchName = strNullProc(curCodeObj.cexchName);
		  		var hasForeignCurrency = textarea.getAttribute("hasForeignCurrency");
		  		//显示外币
		  		if (cexchName!="") {
		  			if(hasForeignCurrency!="true"){
		  			
			  			//得到外币币付，记账汇率
			  			fccd();
			  			var foreigncurrency = getCurAccidForeigncurrencyByExchName(cexchName);
			  			//小数长度，默认为5位
			  			var decLength = 5; 
			  			var cexchCode = "";
			  			if (foreigncurrency!=null) {
			  			 cexchCode = foreigncurrency.cexchCode;
			  			decLength = foreigncurrency.idec;
			  			}
			  			
			  			
			  			 //外币币符位置
			  			 var curExchCodePos = "r" + rowNumber + "_c6_1";
			  			 //外币记账汇率位置
			  			 var curExchRatePos = "r" + rowNumber + "_c6_2";
			  			 var exchRate = getSelRateByDate(document.getElementById("producerDate").value,cexchName);
			  			exchRate = strNullProc(exchRate);
			  			if (exchRate!="")
			  			  exchRate = exchRate.toFixed(decLength);
			  			document.getElementById(curExchCodePos).innerHTML=cexchCode;
			  			document.getElementById(curExchRatePos).value=exchRate;
			  			
			  			var fm = getForeignMoney(rowNumber);
			  			
			  			//外币金额、币符、汇率、折算方式、最大误差
			  			var fmDbValue =fm+"#"+cexchCode+"#"+exchRate+"#"+foreigncurrency.bcal+"#"+foreigncurrency.nerror;
			  			$("#r"+rowNumber+"_c5").attr("dbValue",fmDbValue);
			  			
		  			}
		  			
		  			
		  			

		  			textarea.setAttribute("hasForeignCurrency",true);//为输入框设置有无外币属性
		  			
		  			//外币核算时应该首先输入外币值
		  			//nextInput = "r" + row + "_c5_13";
		  			
		  			//document.getElementById("r" + row + "_c5_13").focus();
		  			/**
		  			 * 说明：上面外币单元格获得焦点的代码在这里会引起其他问题，只要当第二列失去焦点，外币就会获得，需做改进。
		  			 */
		  		}else{
		  			textarea.setAttribute("hasForeignCurrency",false);//为输入框设置有无外币属性
		  			
		  			//判断一至五行的科目是否有外币，如果都没有外币则隐藏外币列
		  			var foreignCurrencyFlag = false;
		  			for(var i=1;i<6;i++){
		  				var kemuCell = document.getElementById("r" + i + "_c2");
		  				var hasForeignCurrency = kemuCell.getAttribute("hasForeignCurrency");
		  				if(hasForeignCurrency!=null && hasForeignCurrency.toString()=="true"){
		  					foreignCurrencyFlag=true;
		  					break;
		  				}
		  				
		  			}
		  			if(!foreignCurrencyFlag){
		  				fcch();//隐藏外币列
		  			}
		  			
		  			
		  		}

		 		 /***************     外币业务 结束     **************/
		 		
		 			
		  		
		  		
		  		
		 		 
		 		 
		 		 /***************     辅助核算项业务 开始     **************/
		  		/**
		  		 * 逻辑：
		  		 * 科目名称单元格失去焦点时，判断当前文本域hasOtherInfo属性值得到有无辅助核算数据，
		  		 * 有则跳出，无则判断该科目是否有辅助核算项，有则说明是第一次录入科目弹出辅助核算窗要求录入辅助核算信息
		  		 */
		  		
		  		//判断是否之前取消过辅助核算填写，如果取消过即便有必填项，也不弹出，在保存或翻行时弹出。
		  		var canceled = textarea.getAttribute("cancelOtherInfoEditFlag");
		  		var confirmed = textarea.getAttribute("confirmOtherInfoEditFlag");
		  		/*
		  		 *如果之前没有取消过辅助核算的填写或者科目发生了改变，判断是否需要填写辅助核算。。。:
		  		 *如果当前科目未取消过和未确认过辅助核算填写或者科目编码已改变，那么就执行辅助核算项填写检查
		  		 */
		  		if(((canceled!='true' && canceled!=true) && (confirmed!=true && confirmed!='true')) || valueIsChanged==true){
		  			
			  		//1.取得条目行hasOtherInfo属性
			  		var hasOtherInfo = textarea.getAttribute("hasOtherInfo");
			  		
			  		
		  			//判断该科目是否需要填写辅助核算信息
		  			var curcodeAddInfo = getCodAddInfo(curCodeObj);
			  		
			  		//如果有辅助核算项还得判断是否录入了，主要为了避免工资、固定资产生成的凭证带辅助核算项的时候hasOtherInfo为true，却实际没有数据的情况。
			  		if(hasOtherInfo==true || hasOtherInfo=='true'){
			  			var hasData = false;
			  			var dbValue = textarea.getAttribute("dbValue");
			  			
			  			
			  			var otherInfo = dbValue.split("#");
			  			
			  			
			  			
			  			/***
			  			 * 下面的代码改为判断必填项是否为空来决定是否弹出辅助核算填写窗体似乎更为恰当，因为即便科目有辅助核算项，但也存在可以为空的情况，为空的情况不表示未填写，所以这种情况不用弹出来强行要求填写辅助核算信息。
			  			 * otherInfo.length在查询出数据的时候就定死为19了，所以没必要判断是否为19.
			  			 * 如果生成的凭证，有辅助核算要求但辅助核算项可以为空时，理应不自动弹出辅助核算窗体，用户可双击辅助核算区域弹出进行修改，
			  			 * 但下面遍历每个辅助核算数据时hasData的值总是为false，总是会弹出辅助核算窗。
			  			 */
			  			
			  			
			  			if(otherInfo.length==19){
			  				
							for(var i=1;i<otherInfo.length;i++){
								
								
								if(otherInfo[i]!="" && otherInfo[i]!=null && otherInfo[i]!="0" && otherInfo[i]!=0){
									
									
									hasData=true;
								}
							}
						}else{
							hasData=false;
						}
			  			
						
			  			
			  			
			  			
			  			//如果是新增凭证才弹，查询的信息不用弹
						if(hasData==false && oiwor=="add"){
							
			  				codeOtherInfoOperateType="add";//设置辅助核算操作类型为添加，用于在返回值处理函数中根据此值决定光标走向
			  				
			  				openOtherInfoWindow(curcodeAddInfo,rowNumber);
			  			}
			  			
			  			
			  		}
			  		
			  		
			  		//2.如果没有hasOtherInfo属性，说明是第一次输入带辅助核算项的科目，弹出辅助核算信息录入窗体。
			  		if(hasOtherInfo==null || hasOtherInfo==undefined || hasOtherInfo=='undefined' || valueIsChanged==true){
			  			
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
							
							codeOtherInfoOperateType="add";//设置辅助核算操作类型为添加，用于在返回值处理函数中根据此值决定光标走向
							openOtherInfoWindow(curcodeAddInfo,rowNumber);
							
							//codeAddInptBz = true;
							
							
						 }
						 //没有辅助核算信息
						 else {
							loadCodeAddInitInfo();//清空辅助核算各项值
							textarea.setAttribute("hasOtherInfo",false);
						 }
						 
						 
			  			
			  		}
		  		}
		  		
		  		
		  		
				 
		 		 

		 		 /***************     辅助核算项业务 结束     **************/
		 		 
		 	  }else{
		 		  jAlert("科目不存在，请重新输入！","提示",function(){

				 		 //textarea.setAttribute("dbValue","");
				 		textarea.value = "";
				 		textarea.focus();
		 		  });
		 		  return ;
		 	  }
		 	  
		 	  
		 }else{
			 //如果科目值为空，则清空dbValue
			 
			 /***
			  * 为了支持无科目但又辅助核算数据的情况
			  */
			 
			 if(pageWindowId=="dsign"){
				 loadCodeAddInitInfo();//清空辅助核算各项值
				 textarea.setAttribute("dbValue","");
			 }
		 }

	 }
	
}
 
 
 
/**
 * 显示“外币”列函数
 * fccd = Foreign currency cell display
 */
function fccd(){

	//alert("显示外币列");
	document.getElementById("header").rows[0].cells[2].style.display="block";
	var gt = document.getElementById("gridtable");
	for(var i=0;i<gt.rows.length;i++){
		var cell = gt.rows[i].cells[2];
		if(cell!=null && cell!=undefined){
			cell.style.display="block";
		}else{
			gt.rows[i].cells[0].style.display="block";
		}
	}

	header.rows[0].cells[0].style.width="99px";
	header.rows[0].cells[1].style.width="187px";
	header.rows[0].cells[2].style.height="100%";
	

	gt.rows[0].cells[0].style.width="70px";
	
	for(var i=0;i<gt.rows.length;i++){

		gt.rows[i].cells[1].getElementsByTagName("textarea")[0].style.width="164px";
		gt.rows[i].cells[1].style.width="184px";
		
		i++;
	}
	
}

/**
 * 隐藏“外币”列
 * fccd = Foreign currency cell hidden
 */
function fcch(){

	//alert("隐藏外币列");
	var header = document.getElementById("header");
	header.rows[0].cells[2].style.display="none";
	var gt = document.getElementById("gridtable");
	for(var i=0;i<gt.rows.length;i++){
		var cell = gt.rows[i].cells[2];
		if(cell!=null && cell!=undefined){
			cell.style.display="none";
		}else{
			gt.rows[i].cells[0].style.display="none";
		}
	}
	header.rows[0].cells[0].style.width="153px";
	header.rows[0].cells[1].style.width="254px";

	gt.rows[0].cells[1].style.width="250px";
	gt.rows[0].cells[0].style.width="150px";

	

	
	for(var i=0;i<gt.rows.length;i++){

		gt.rows[i].cells[1].style.width="250px";
		gt.rows[i].cells[1].getElementsByTagName("textarea")[0].style.width="228px";
		
		i++;
	}
	
	
	
}



/**
 * 根据凭证的科目编码判断外币列是否允许显示
 * 王丙建 2013-06-14
 */
function isShowExchCell() {
	  var length = dsignRowList.length;
	  var curCodeDbValueList = new Array(length);
	  for (var i = 0; i<length; i++) {
		  var curPos = "r" + (i+1) + "_c2";
		  var codeDbValue = document.getElementById(curPos).getAttribute("dbValue");
		  var pos = codeDbValue.indexOf("#");
		  if (pos>=0) {
			  codeDbValue = codeDbValue.substring(0, pos);
		  }
          //alert("当前行" + (i+1)+"\t当前列科目数据库值：" + codeDbValue);
          curCodeDbValueList[i] = codeDbValue;
	  }
	  var isExch = isShowExchCellByCodeList(curCodeDbValueList);
	  //alert("isExch:" + isExch);
	  //如果科目中有一个外币，显示外币
	  if (isExch)
		  fccd();
	  //否则隐藏外币
	  else 
		  fcch();
		  
}
















//窗体关闭前执行的函数
function onWindowClose(){
	$dp.hide();
}
 

/***
 * 行是否可编辑设置
 * @param rowNumber
 * @param flag
 */
function rowEditSet(rowNumber,flag){
	
	//内部函数
	function setDisplay(id,value){
		document.getElementById(id).style.display=value;
	}
	
	
	var display="none";
	if(flag==true) display="block";

	setDisplay("r"+rowNumber+"_c1",display);//摘要
	setDisplay("r"+rowNumber+"_c2",display);//科目

	for(var i=1;i<=30;i++){
		setDisplay("r"+rowNumber+"_c3_"+i,display);//借方金额和贷方金额
	}

	for(var i=1;i<=15;i++){
		setDisplay("r"+rowNumber+"_c5_"+i,display);//外币
	}
	
	setDisplay("r"+rowNumber+"_c6_2",display);//外币汇率
	
}






/**
 * 数据行点击事件处理函数
 * 陈建宇 2013-05-26 11:22
 * @param row
 */
function dataRowClickBiz(dataRow){
	try{
		$("#finder_pdf").hide();
	}catch(e){}
	
	if(dataRow!=null)
	row = dataRow.getAttribute("row");
	
	var selObj = document.getElementById("r"+row+"_c2");
	if (selObj==null) return ;
	//点击行时判断是否有辅助核算信息，如果有则显示，没有则清空辅助核算各控件的值
	 //var hasOtherInfo = selObj.getAttribute("hasOtherInfo");
	 
	//清空辅助核算各项值
	 loadCodeAddInitInfo();
	//if(hasOtherInfo==true || hasOtherInfo=="true"){
		
	 var dbValue = selObj.getAttribute("dbValue");
	 
	 showCodeAddinfo(dbValue);
	//}
	
	
	
	/***
	 * 以下代码与addDsign函数里被注释的代码一道构成行数据验证功能，由于引起了BUG，暂时不执行。
	 */
	/*
	var rowNumber = row;
	
	//如果是凭证录入（增加或修改时），点击行时，如果上一行数据填写不完整，则不允许编辑当前行
	if(inputBz==true){
		
		//排除第一行，因为录入凭证是从第一行开始的
		if(rowNumber>1){
			//判断上一行数据是否填写完整
			var validateRowNumber = rowNumber-1;
			var validate = rowDataValidation(validateRowNumber);
			if(validate==true){
				//验证通过，当前行显示各输入框控件，并让摘要列获得焦点
				rowEditSet(rowNumber,true);//设置当前点击的行可编辑
				document.getElementById("r"+rowNumber+"_c1").focus();
			}
		}
	}
	*/
}





/***
 * 行数据验证，检查数据是否已经填写完整和正确
 * 注意：验证失败返回false，验证成功返回获得的行
 * 陈建宇2013-05-26 21:37
 */
function rowDataValidation(rowNumber){
	
	rowNumber=parseInt(rowNumber,10);
	row=rowNumber;
	
	var tmpRow = getRowData(rowNumber);
	
	
	  
	var zyValue = tmpRow.zhaiyao.dbValue;//摘要值
	var kmValue = tmpRow.kemu.dbValue;//科目相关属性值
	var curDebitMoneyValue = tmpRow.debitMoney.dbValue;//借方金额
	var durCreditMoneyValue = tmpRow.creditMoney.dbValue;//贷方金额

	
	 
	if (zyValue=="") {

		tempErrorMassage="摘要不能为空";
		tempErrorDom=document.getElementById("r"+rowNumber+"_c1");
//		jAlert("摘要不能为空","提示",function(){
//
//			document.getElementById("r"+rowNumber+"_c1").focus();
//		});
		return false;
	}
	
	//alert("第"+rowNumber+"行科目："+kmValue);
	
	
	if (kmValue==""){
		tempErrorMassage="科目不能为空！";
		tempErrorDom=document.getElementById("r"+rowNumber+"_c2");
//		jAlert("科目不能为空！","提示",function(){
//			document.getElementById("r"+rowNumber+"_c2").focus();
//		});
		return false;
	}else{

		var ccode=kmValue.split("#")[0];
		if(ccode=="" || ccode=='null'){
			tempErrorMassage="科目不能为空！";
			tempErrorDom=document.getElementById("r"+rowNumber+"_c2");
//			jAlert("科目不能为空！","提示",function(){
//				document.getElementById("r"+rowNumber+"_c2").focus();
//			});
			return false;
		}
			
			
	}
	
	var hasOtherInfo = tmpRow.kemu.hasOtherInfo;
	
	//alert("第"+rowNumber+"行hasOtherInfo:"+hasOtherInfo);
	

	//判断有无辅助核算项
	var codeObj = getCurCodeObjByCodeOrName(kmValue.split("#")[0]);
	//判断该科目是否需要填写辅助核算信息
	var curcodeAddInfo = getCodAddInfo(codeObj);

	var dbValue = tmpRow.kemu.dbValue;
	var otherInfo = dbValue.split("#");
		//如果有辅助核算项还得判断是否录入了，主要为了避免工资、固定资产生成的凭证带辅助核算项的时候hasOtherInfo为true，却实际没有数据的情况。
	
	
	if(hasOtherInfo==true || hasOtherInfo=='true'){
		
		
		
			var hasData = false;
			if(otherInfo.length==19){
				for(var i=1;i<otherInfo.length;i++){
					if(otherInfo[i]!="" && otherInfo[i]!=null && otherInfo[i]!="0" && otherInfo[i]!=0){
						hasData=true;
					}
				}
			}else{
				hasData=false;
			}
			
			if(hasData==false){
				
				if(curcodeAddInfo[0]==1){
					//验证项目value和dbVlue是否已录入
					if(otherInfo[11]=="" || otherInfo[11]=="0" || typeof otherInfo[11]=="undefined"){
						tempErrorMassage="项目不能为空！";
						return false;
					}
				}
				if(curcodeAddInfo[1]==1){
					//验证部门value和dbVlue是否已录入
					if(otherInfo[3]=="" || otherInfo[3]=="0" || typeof otherInfo[3]=="undefined"){
						tempErrorMassage="部门不能为空！";
						return false;
					}
				}
				if(curcodeAddInfo[2]==1){
					//验证个人value和dbVlue是否已录入
					if(otherInfo[1]=="" || otherInfo[1]=="0" || typeof otherInfo[1]=="undefined"){
						tempErrorMassage="个人不能为空！";
						return false;
					}
				}
				
				
				if(curcodeAddInfo[3]==1){
					//验证客户value和dbVlue是否已录入
					if(otherInfo[5]=="" || otherInfo[5]=="0" || typeof otherInfo[5]=="undefined"){
						tempErrorMassage="客户不能为空！";
						return false;
					}
				}
				
				if(curcodeAddInfo[4]==1){
					//验证供应商value和dbVlue是否已录入
					if(otherInfo[7]=="" || otherInfo[7]=="0" || typeof otherInfo[7]=="undefined"){
						tempErrorMassage="供应商不能为空！";
						return false;
					}
				}
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				/*
				//必填项才弹出，有些不用填的情况就不弹出
				if(
					 curcodeAddInfo[0]==1 ||
					 curcodeAddInfo[1]==1 ||
					 curcodeAddInfo[2]==1 ||
					 curcodeAddInfo[3]==1 ||
					 curcodeAddInfo[4]==1 //||
					 //curcodeAddInfo[8]==1
				 ){
					codeOtherInfoOperateType="add";//设置辅助核算操作类型为添加，用于在返回值处理函数中根据此值决定光标走向
					

					tempErrorMassage="请录入第"+rowNumber+"行的辅助核算项";

					
					return false;
				}
				*/
				
				
				
				
				
				
				
				
				
				
				
			}
			
			
		}
		
	
	
	
	
	
	
	
	
	
	//alert("第"+rowNumber+"行hasOtherInfo:"+tmpRow.kemu.hasOtherInfo);
	if( typeof hasOtherInfo=="undefined" || hasOtherInfo==null || hasOtherInfo=="null"){
		
		if(curcodeAddInfo[0]==1){
			//验证项目value和dbVlue是否已录入
			if(otherInfo[11]=="" || otherInfo[11]=="0" || typeof otherInfo[11]=="undefined"){
				tempErrorMassage="项目不能为空！";
				return false;
			}
		}
		if(curcodeAddInfo[1]==1){
			//验证部门value和dbVlue是否已录入
			if(otherInfo[3]=="" || otherInfo[3]=="0" || typeof otherInfo[3]=="undefined"){
				tempErrorMassage="部门不能为空！";
				return false;
			}
		}
		if(curcodeAddInfo[2]==1){
			//验证个人value和dbVlue是否已录入
			if(otherInfo[1]=="" || otherInfo[1]=="0" || typeof otherInfo[1]=="undefined"){
				tempErrorMassage="个人不能为空！";
				return false;
			}
		}
		
		
		if(curcodeAddInfo[3]==1){
			//验证客户value和dbVlue是否已录入
			if(otherInfo[5]=="" || otherInfo[5]=="0" || typeof otherInfo[5]=="undefined"){
				tempErrorMassage="客户不能为空！";
				return false;
			}
		}
		
		if(curcodeAddInfo[4]==1){
			//验证供应商value和dbVlue是否已录入
			if(otherInfo[7]=="" || otherInfo[7]=="0" || typeof otherInfo[7]=="undefined"){
				tempErrorMassage="供应商不能为空！";
				return false;
			}
		}
		
		
		

		//row=rowNumber;
		
		
		
		
		
		
/*
		
		//只要必填项为空都弹出
		 if (
			 curcodeAddInfo[0]==1 ||
			 curcodeAddInfo[1]==1 ||
			 curcodeAddInfo[2]==1 ||
			 curcodeAddInfo[3]==1 ||
			 curcodeAddInfo[4]==1 //||
			 //curcodeAddInfo[5]==1 ||
			 //curcodeAddInfo[6]!="" ||
			 //curcodeAddInfo[7]!="" ||
			 //curcodeAddInfo[8]==1//
		) {
			 
			row=rowNumber;
			tempErrorMassage="请录入第"+rowNumber+"行的辅助核算项";
			return false;
		 }
		 //没有辅助核算信息
		 else {
			 tmpRow.kemu.hasOtherInfo=false;
		 }
		 
		 
		*/
		
		
		
		
		 if (
			 curcodeAddInfo[0]!=1 &&
			 curcodeAddInfo[1]!=1 &&
			 curcodeAddInfo[2]!=1 &&
			 curcodeAddInfo[3]!=1 &&
			 curcodeAddInfo[4]!=1 //&&
			 //curcodeAddInfo[5]!=1 &&
			 //curcodeAddInfo[6]=="" &&
			 //curcodeAddInfo[7]=="" &&
			 //curcodeAddInfo[8]!=1//
		){
			 tmpRow.kemu.hasOtherInfo=false;
		 }
		 
		 
	}
	
	
	
	if (curDebitMoneyValue=="0" && durCreditMoneyValue=="0") {

		tempErrorMassage="借方金额和贷方金额不能同时为0或不为0";
		tempErrorDom=document.getElementById("r"+rowNumber+"_c3_13");
//		jAlert("借方金额和贷方金额不能同时为0或不为0","提示",function(){
//			document.getElementById("r"+rowNumber+"_c3_13").focus();
//		});
		return false;
	}

	
	return tmpRow;
}





/**
 * 向上滚行
 * 陈建宇 2013-06-27 10:29
 */
function scrollUp(){
	
	/**
	 * 向上滚行时：
	 * 1.第一行数据移动到rowsHeaderList里末尾（末尾多一条数据）；
	 * 2.rowsBodyerList的2-5行依次向上平移一行（平移数据时先删除上一行上的所有数据）；
	 * 3.清空第五行所有值，如果rowsFooterList中有数据，取第一条数据放到第五行里
	 */
	
	loadCodeAddInitInfo();//不显示辅助核算

	//判断第一行和第五行内容是否都已填写整
	var row1 = rowDataValidation(1);
	
	if(row1==false) return;
	
	//如果rowsFooterList里没有数据，不允许向上滚行
	if(rowsFooterList.length==0){
		var row5 = rowDataValidation(5);
		if(row5==false) return;
	}
	
	rowsHeaderList.push(row1);
	
	
	var tmpRow = null;
	for(var i=2;i<=5;i++){
		clearRowData(i-1);//清空上一行的数据
		tmpRow=getRowData(i);//得到要移动的行
		setRowData(i-1,tmpRow);//移动到上一行
	}
	
	clearRowData(5);
	if(rowsFooterList.length>0){
		setRowData(5,rowsFooterList[0]);
		rowsFooterList.splice(0,1);//从0下标开始删除1个元素（删除第一个元素）
	}
	loadCodeAddInitInfo();//不显示辅助核算
}

/**
 * 向下滚行
 * 陈建宇 2013-06-27 10:29
 */
function scrollDown(){

	/**
	 * 向下滚行时：
	 * 判断rowsHeaderList是否有数据，有数据才允许向下翻，无数据退出程序。有数据的情况下：
	 * 1.第五行数据移动到rowsFooterList里作为第一条（多一条数据）；
	 * 2.rowsBodyerList的1-4行依次向下平移一行（平移数据时先删除下一行上的所有数据）；
	 * 3.从rowsHeaderList中取末尾一条数据放到rowsBodyerList里第一行
	 */

	
	loadCodeAddInitInfo();//不显示辅助核算
	if(rowsHeaderList.length==0){
		jAlert("已经是第一行！");
		return;
	}
	
	//如果第5行值全为空，可以翻行，但不存进rowsFooterList。
	var row5 = getRowData(5);
	
	var zy = row5.zhaiyao.dbValue;//摘要值
	var km = row5.kemu.dbValue;//科目相关属性值
	var jj = row5.debitMoney.dbValue;//借方金额
	var dj = row5.creditMoney.dbValue;//贷方金额
	  
	  
	if (zy!="" && km!="" && (jj!="0" || dj!="0")) {
		rowsFooterList.unshift(row5);
	}
	  
	
	var tmpRow = null;
	for(var i=4;i>=1;i--){
		clearRowData(i+1);//清空下一行的数据
		tmpRow=getRowData(i);//得到要移动的行
		setRowData(i+1,tmpRow);//移动到下一行
	}
	clearRowData(1);
	setRowData(1,rowsHeaderList[rowsHeaderList.length-1]);
	rowsHeaderList.splice(rowsHeaderList.length-1,1);
	loadCodeAddInitInfo();//不显示辅助核算
}



/**
 * 插分
 * 陈建宇 2013-06-27 21:01
 */
function dsignInsertRow(){
	/**
	 * 1.将rowsBodyerList第五行数据移动至rowsFooterList里作为第一条；
	 * 2.将选择行至第四行依次向下平移一行；
	 * 3.清空选择行数据。
	 */


	if(inputBz==false) return false;
	
	
	
	loadCodeAddInitInfo();//不显示辅助核算
	
	//验证第五行数据是否填写完整
	
	
	//如果第五行是一个空行，则不往rowsFooterList里填充，如果不为空则验证填写完整后往rowsFooterList填充
	
	
	  var rd = getRowData(5);
	  var zy = rd.zhaiyao.dbValue;//摘要值
	  var km = rd.kemu.dbValue;//科目相关属性值
	  var jj = rd.debitMoney.dbValue;//借方金额
	  var dj = rd.creditMoney.dbValue;//贷方金额
	  
	  if(zy!="" && km!="" && (jj!="0" || dj!="0")){
		  var row5 = rowDataValidation(5);//这里主要为了验证科目被修改后判断是否录入了辅助核算数据
		  if(row5!=false){
			  rowsFooterList.unshift(row5);
		  }else{
			  return;
		  }
	  }else if(zy!="" || km!="" || jj!="0" || dj!="0"){
		  var flag = rowDataValidation(5);
		  if(flag==false) return null;
	  }
	
	
	
	
	
	var tmpRow = null;
	for(var i=4;i>=row;i--){
		clearRowData(i+1);//清空下一行的数据
		tmpRow=getRowData(i);//得到要移动的行
		setRowData(i+1,tmpRow);//移动到下一行
	}
	clearRowData(row);
	
}



/**
 * 删分
 * 陈建宇 2013-06-27 21:04
 */
function dsignDeleteRow(){
	/**
	 * 1.删除选择行的所有数据；
	 * 2.从选择行的下一行至第5行依次向上平移一行；
	 * 3.从rowsFooterList里取第一行移动至rowsBoyderList第五行。
	 */
	
	if(inputBz==false) return false;
	
	
	var tmpRow = null;
	
	

	row=parseInt(row,10);
	
	
	for(var i=row;i<=4;i++){
		clearRowData(i);//清空上一行的数据
		tmpRow=getRowData(i+1);//得到要移动的行
		setRowData(i,tmpRow);//移动到上一行
	}
	
	clearRowData(5);
	if(rowsFooterList.length>0){
		setRowData(5,rowsFooterList[0]);
		rowsFooterList.splice(0,1);//从0下标开始删除1个元素（删除第一个元素）
	}
	
	//重新计算合计值
	updateMoneyTotal();
	
}







/**
 * 根据行号得到行的数据
 * 数据用DsignRow进行封装
 * @param rowNumber
 */
function getRowData(rowNumber){
	

	rowNumber=parseInt(rowNumber,10);
	
	var zhaiyaoPos = "r" + rowNumber + "_c1";
	var kemuPos = "r" + rowNumber + "_c2";
	//外币汇率
	var ratePos = "r" + rowNumber + "_c6_2";
	
	
	
	//摘要值
	var curZhaiyao = document.getElementById(zhaiyaoPos).value;
	
	//定义摘要单元格 王丙建2013-01-10
	var curZyCell = new Cell();
	curZyCell.dataType = "0";
	curZyCell.dictId = "";
	curZyCell.dbValue = curZhaiyao;
	curZyCell.showValue = curZhaiyao;
	
	//科目值
	var kemuInputBox = document.getElementById(kemuPos);
	var curKemu =  kemuInputBox.value;
    var curKemuDbValue = kemuInputBox.getAttribute("dbValue");
    
    
    //定义科目单元格 王丙建2013-01-10
	var curKemuCell = new Cell();
	curKemuCell.dataType = "1";
	curKemuCell.dictId = "code";
	curKemuCell.dbValue = curKemuDbValue;
	curKemuCell.showValue = curKemu;
	curKemuCell.hasOtherInfo=kemuInputBox.getAttribute("hasOtherInfo");//有无辅助核算信息，true或false
	curKemuCell.hasForeignCurrency=kemuInputBox.getAttribute("hasForeignCurrency");//有无外币，true或false
	curKemuCell.cancelOtherInfoEditFlag=kemuInputBox.getAttribute("cancelOtherInfoEditFlag");//是否已取消辅助核算项填写，用于在添加辅助核算时点击取消按钮暂时，使科目单元格失去焦点不再弹出辅助核算窗。
	curKemuCell.confirmOtherInfoEditFlag=kemuInputBox.getAttribute("confirmOtherInfoEditFlag");//是否已确认辅助核算填写，用于科目列失去焦点时判断是否弹出辅助核算窗
	
	//外币汇率
	var curRate =  document.getElementById(ratePos).value;
	
	//定义外币汇率单元格 王丙建2013-01-10
	var curRateCell = new Cell();
	curRateCell.dataType = "1";
	curRateCell.dictId = "";
	curRateCell.dbValue = curRate;
	curRateCell.showValue = curRate;

	

	
	var curDebitMoney = getDebitMoney(rowNumber);
	
	
	
	//定义借方金额单元格 王丙建2013-01-10
	var curDebitMoneyCell = new Cell();
	curDebitMoneyCell.dataType = "2";
	curDebitMoneyCell.dictId = "";
	curDebitMoneyCell.dbValue = curDebitMoney;
	curDebitMoneyCell.showValue = curDebitMoney;

	
	

	var curCreditMoney = getCreditMoney(rowNumber);
	
	//定义贷方金额单元格 王丙建2013-01-10
	var curCreditMoneyCell = new Cell();
	curCreditMoneyCell.dataType = "2";
	curCreditMoneyCell.dictId = "";
	curCreditMoneyCell.dbValue = curCreditMoney;
	curCreditMoneyCell.showValue = curCreditMoney;
    
	
	
	//外币金额值
	var curExchMoney = getForeignMoney(rowNumber);
	 
	 //取得外币币符：
	 var sign = document.getElementById("r" +  rowNumber + "_c6" + "_1").innerHTML;
	//取得外币汇率
	 var rate = document.getElementById("r" +  rowNumber + "_c6" + "_2").value;
	 
	 var fmdv=$("#r"+rowNumber+"_c5").attr("dbValue");
	 
	 
	 var va = fmdv.split("#");

	 //var cnfrat=null;//汇率
	 var bcal=null;//折算方式
	 var nerror=null;//最大误差
	  if(va.length>1){
		  
		  //cnfrat=va[2];//汇率
		  bcal=va[3];//折算方式
		  nerror=va[4];//最大误差
	  }
		 
	 
	 var exchMoneyDbValue=curExchMoney+"#"+sign+"#"+rate+"#"+bcal+"#"+nerror;//还应加上折算方式和最大误差属性和值
	 
	 
	 
	 
	 
	 
	//定义外币金额单元格 王丙建2013-01-10
		var curExchMoneyCell = new Cell();
		curExchMoneyCell.dataType = "2";
		curExchMoneyCell.dictId = "";
		curExchMoneyCell.dbValue = exchMoneyDbValue;
		curExchMoneyCell.showValue = curExchMoney;

	if (curDebitMoney=="") curDebitMoneyCell.dbValue = "0";
	if (curCreditMoney=="") curCreditMoneyCell.dbValue = "0";
	
	
	

	 /***
	  * 获取行数据唯一ID
	  */

	 var dataId = $("#r" + rowNumber + "_c1").parent().parent().attr("dataId");
	 if(dataId==undefined || dataId==null) dataId="";
	var dataIdCell = new Cell();
	dataIdCell.dataType = "1";
	dataIdCell.dictId = "";
	dataIdCell.dbValue = dataId;
	dataIdCell.showValue = dataId;
	
	
	
	
	  var tmpRow =  new DsignRow();
	  tmpRow.zhaiyao = curZyCell;
	  tmpRow.kemu = curKemuCell;
	  tmpRow.debitMoney = curDebitMoneyCell;
	  tmpRow.creditMoney = curCreditMoneyCell;
	  tmpRow.exchMoney = curExchMoneyCell;
	  tmpRow.exchRate = curRateCell;
	  tmpRow.dataId = dataIdCell;
	  
	  
		return tmpRow;
	
	
	
}

/***
 * 设置行数据
 * 陈建宇 2013-06-27
 * @param rowNumber
 */
function setRowData(rowNumber,tmpRow){
	var tmpZhaiyao = tmpRow.zhaiyao;
	var tmpKemu = tmpRow.kemu;
	
	//获取每分录行单元格数值
	var tmpZhaiyaoPos = "r" + rowNumber + "_c1";
	var tmpKemuPos = "r" + rowNumber + "_c2";
	
	
	document.getElementById(tmpZhaiyaoPos).value = strNullProc(tmpZhaiyao.showValue);
	var kemuInputBox = document.getElementById(tmpKemuPos);
	kemuInputBox.value =  strNullProc(tmpKemu.showValue);
	
	
	kemuInputBox.setAttribute("dbValue", tmpKemu.dbValue);
	//alert("tmpKemu.dbValue:"+tmpKemu.dbValue);
	
	/************ 设置是否有辅助核算、是否有外币值 ************/
	var hasOtherInfo = tmpRow.kemu.hasOtherInfo;
	
	if(hasOtherInfo==true || hasOtherInfo=="true"){
		//清空辅助核算各项值
		loadCodeAddInitInfo();
		//显示辅助核算信息
		showCodeAddinfo(tmpKemu.dbValue);
	}
	kemuInputBox.setAttribute("hasOtherInfo",tmpKemu.hasOtherInfo);
	kemuInputBox.setAttribute("hasForeignCurrency",tmpKemu.hasForeignCurrency);
	kemuInputBox.setAttribute("cancelOtherInfoEditFlag",tmpKemu.cancelOtherInfoEditFlag);
	kemuInputBox.setAttribute("confirmOtherInfoEditFlag",tmpKemu.confirmOtherInfoEditFlag);//是否已确认辅助核算填写，用于科目列失去焦点时判断是否弹出辅助核算窗
	
	
	
	
	

	
	 /**借方金额显示**/
	var debitMoney  = tmpRow.debitMoney.showValue;
	setDebitMoney(debitMoney,rowNumber);
	
	
	
	
	 /**贷方金额**/
	 var creditMoney = tmpRow.creditMoney.showValue;
	 setCreditMoney(creditMoney,rowNumber);
	 
	 
	 //alert("第"+rowNumber+"行\r\n借方金额："+debitMoney+"\r\n贷方金额："+creditMoney);
	 
	 
	 
	 /**外币金额**/
	 var exchMoneyvalue  = tmpRow.exchMoney.showValue;
	 
	 
	 var exchdbValue = tmpRow.exchMoney.dbValue;
	 
	 $("#r" + rowNumber + "_c5").attr("dbValue",exchdbValue);
	 
	 
	 var curExchRate = "";
	 var curExchCode = "";
	 
	 
	 
	 if (strNullProc(exchdbValue)!="") {
		 var exchdbValueList = exchdbValue.split("#");
		  curExchCode = exchdbValueList[1];
		  curExchRate = exchdbValueList[2];
	 }
	 if(curExchRate=="0") curExchRate="";
	 
	 //外币币符
	 document.getElementById("r" +  rowNumber + "_c6" + "_1").innerHTML =  strNullProc(curExchCode);
	 //显示外币汇率
	 document.getElementById("r" +  rowNumber + "_c6" + "_2").value =  strNullProc(curExchRate);
	 
	 if(exchMoneyvalue==""){
		 exchMoneyvalue=0;
	 }else{
		 exchMoneyvalue=parseInt(exchMoneyvalue,10);
	 }
	 
	 setForeignMoney(exchMoneyvalue,rowNumber);
	 if(curExchCode != "" && curExchCode != undefined && curExchCode != null){
		 fccd();//显示外币列
	 }
	 
	 
	 
	 /***
	  * 设置行数据唯一ID
	  */
	 var dataId = tmpRow.dataId.dbValue;
	 $("#r" + rowNumber + "_c1").parent().parent().attr("dataId",dataId);
	 
	 
	 
	 
		 
}


/***
 * 根据行号清除行数据
 * 陈建宇 2013-06-25
 */
function clearRowData(rowNumber){


	rowNumber=parseInt(rowNumber,10);
	
	document.getElementById("r"+rowNumber+"_c1").value="";//摘要
	
	document.getElementById("r"+rowNumber+"_c2").value="";//科目

	document.getElementById("r"+rowNumber+"_c2").setAttribute("dbValue","");
	document.getElementById("r"+rowNumber+"_c2").removeAttribute("hasOtherInfo");
	document.getElementById("r"+rowNumber+"_c2").removeAttribute("hasForeignCurrency");

	document.getElementById("r"+rowNumber+"_c2").removeAttribute("cancelOtherInfoEditFlag");
	document.getElementById("r"+rowNumber+"_c2").removeAttribute("confirmOtherInfoEditFlag");
	
	
	for(var i=1;i<=30;i++){
		document.getElementById("r"+rowNumber+"_c3_"+i).value="";//借方金额和贷方金额
		$("#r"+rowNumber+"_c3_"+i).css("color","#000000");
	}
	$("#r"+rowNumber+"_c3_3").parent().parent().removeAttr("symbol");//移除借方金额值符号属性
	$("#r"+rowNumber+"_c3_19").parent().parent().removeAttr("symbol");//移除贷方金额值符号属性
	$("#r"+rowNumber+"_c5").removeAttr("symbol");//移除外币列金额值负号属性

	for(var i=1;i<=15;i++){
		document.getElementById("r"+rowNumber+"_c5_"+i).value="";//外币
	}
	//外币币符
	document.getElementById("r"+rowNumber+"_c6_1").innerHTML="";
	document.getElementById("r"+rowNumber+"_c6_2").value="";//外币汇率
	

	 $("#r" + rowNumber + "_c1").parent().parent().removeAttr("dataId");//删除数据航唯一ID属性
	 
}


/***
 * 辅助核算窗体取消时调用的函数
 * 函数将根据codeOtherInfoOperateType值判断是初次填写辅助核算还是修改辅助核算，初次则取消后保存凭证或翻行时应对科目进行辅助核算检查，确保数据完整。
 * 陈建宇　2013-07-12
 */
function auxiliaryoptionsCancelAction(rowNumber){

	rowNumber=parseInt(rowNumber,10);

	var curPos = "r" + rowNumber + "_c2"; 
	if(codeOtherInfoOperateType=="add"){
		document.getElementById(curPos).removeAttribute("hasOtherInfo");
		
		document.getElementById(curPos).setAttribute("cancelOtherInfoEditFlag",true);//设置取消标记值，用于防止科目列失去焦点再次弹出辅助信息填写窗
	}
	//点取消时，删除“已确定”标记
	document.getElementById(curPos).removeAttribute("confirmOtherInfoEditFlag");
	
}




function addInfo1KeyDown(obj){
	if(inputBz==false) return false;
}

function addInfo2KeyDown(obj){
	if(inputBz==false) return false;
}


