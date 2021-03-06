
/**
 * 
 * @DESCRIBE   出纳签字查询条件界面js
 * @AUTHOR     王丙建
 * @DATE       2013-04-10
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */
 

/**
 * 点击确定执行弹出到审核凭证列表窗体
 */
function nextWindow(){
	var queryDsignData = getQueryParamValue();
	var param = {queryDsignData:queryDsignData};
	//模拟要传给弹出窗体的值对象（这里实际要取得各文本框的值拼装成对象）：
	window.parent.openWindow("gl_audit_auditbill","gl_audit_billauditquery",param);
	window.parent.closeWindow("gl_audit_billauditquery");
  
	
}


 /**
  * 查询对象
  */
  
function query(data) {
	var dsignTitleList = data.dsignTitleList;
	var param = null;
	for ( var i = 0; i<dsignTitleList.length; i++) {
		var pzbh = dsignTitleList[i].dsignNumber;
		param = {pzbh:pzbh};
	}
	//模拟要传给弹出窗体的值对象（这里实际要取得各文本框的值拼装成对象）：
	window.parent.openWindow("gl_audit_auditbill","gl_audit_billauditquery",param);
	window.parent.closeWindow("gl_audit_billauditquery");
  
	
 }

/**
 * 得到查询对象的参数值
 */
function getQueryParamValue() {
	 var data = "";
	 //得到凭证类别显示名称
	 var dsignItemText=$("#dsignItem").find("option:selected").text();
	 //得到凭证类别显示值
	 var dsignItemValue=$("#dsignItem").val();
	 data = data + "queryDsignData.pzItem=" + dsignItemValue;
	//得到制单人名称
	 var billText=$("#bill").find("option:selected").text();
	 //得到制单人id
	 var billId=$("#bill").val();
	 data = data + "&queryDsignData.cbillid=" + billId;
		
	 
	//得到审核人名称
	 var checkText=$("#check").find("option:selected").text();
	 //得到审核人id
	 var checkId=$("#check").val();
	 data = data + "&queryDsignData.ccheckid=" + checkId;
		
	 
	//得到出纳人名称
	 var cashierText=$("#cashier").find("option:selected").text();
	 //得到出纳入名称
	 var cashierId=$("#cashier").val();
	 data = data + "&queryDsignData.ccashierid=" + cashierId;
		
	 
	//得到数据来源名称
	 var dataSourceText=$("#dataSource").find("option:selected").text();
	 //得到数据来源id
	 var dataSourceId=$("#dataSource").val();
	 data = data + "&queryDsignData.dataSourceid=" + dataSourceId;
		
	 
	 //凭证开始号
	 var firstNum = $("#firstNum").val();
	//凭证结束号
	 var lastNum = $("#lastNum").val();
	 data = data + "&queryDsignData.firstNum=" + firstNum;
	 data = data + "&queryDsignData.lastNum=" + lastNum;
			
	 
				
	 //得到月份
	 var month = $("#monthselector").val();
	 //开始日期、结束日期
	 var firstDate = $("#wdp1").val(); 
	 var lastDate = $("#wdp2").val();
	 data = data + "&queryDsignData.month=" + month;
	 data = data + "&queryDsignData.firstDate=" + firstDate;
	 data = data + "&queryDsignData.lastDate=" + lastDate;
	
	 
	 
	 
	 //得到日期标志，month 月份, day 日期
	 var dateFlag = $("input[name='radiogruop2']:checked").val();
	 data = data + "&queryDsignData.dateFlag=" + dateFlag;
		
	    
	 // 凭证标志 1 全部 2作废 3有错
	 var iflag = $("input[name='radiogruop1']:checked").val();
	 data = data + "&queryDsignData.iflag=" + iflag;
		
	 
	 //现金流量科目
	 
	 var codeBcash = $("#codeBcash:checked").val(); 
	 if (codeBcash=="on")
		 codeBcash = "1";
	 else
		 codeBcash = "0";
	 data = data + "&queryDsignData.codeBcash=" + codeBcash;
		
	 //本版本设置辅助条件查询为暂不处理 王丙建 2013-01-14
		 data = data + "&queryDsignData.addFlag=" + "hide";
	return data;
	 
	 //下面 开始辅助条件查询
	 
	 //得到摘要
	 var cdigest = $("#cdigest").val();
	 data = data + "&queryDsignData.cdigest=" + cdigest;
		
	 
	 //得到科目
	 var ccode = $("#ccode").val();
	 data = data + "&queryDsignData.ccode=" + ccode;
		
	 //得到方向
	 var fangxiang=$("#fangxiang").val();
	 data = data + "&queryDsignData.fangxiang=" + fangxiang;
		
	 
	//金额最小值
	 var minMoney=$("#minMoney").val();
	 data = data + "&queryDsignData.minMoney=" + minMoney;
		
	 
	//金额最大值
	 var maxMoney=$("#maxMoney").val();
	 data = data + "&queryDsignData.maxMoney=" + maxMoney;
		

	//币种
	 var cexchName=$("#cexchName").val();
	 data = data + "&queryDsignData.cexchName=" + cexchName;
		
		//外币金额最小值
	 var minBzMoney=$("#minBzMoney").val();
	 data = data + "&queryDsignData.minBzMoney=" + minBzMoney;
		
	//外币金额最大值
	 var maxBzMoney=$("#maxBzMoney").val();
	 data = data + "&queryDsignData.maxBzMoney=" + maxBzMoney;
		
	 
	//数量最小值
	 var minNumber=$("#minNumber").val();
	 data = data + "&queryDsignData.minNumber=" + minNumber;
		
	//数量最大值
	 var maxNumber=$("#maxNumber").val();
	 data = data + "&queryDsignData.maxNumber=" + maxNumber;
		
	 
	 
	 
	//客户
	 var ccusId=$("#ccusId").val();
	 data = data + "&queryDsignData.ccusId=" + ccusId;
		
	//供应商
	 var csupId=$("#csupId").val();
	 data = data + "&queryDsignData.csupId=" + csupId;
		
	//部门
	 var cdeptId=$("#cdeptId").val();
	 data = data + "&queryDsignData.cdeptId=" + cdeptId;
		
	//个人
	 var cpersonId=$("#cpersonId").val();
	 data = data + "&queryDsignData.cpersonId=" + cpersonId;
		
	 
	//项目大类
	 var citemClass=$("#citemClass").val();
	 data = data + "&queryDsignData.citemClass=" + citemClass;
		
	//项目
	 var citemId=$("#citemId").val();
	 data = data + "&queryDsignData.citemId=" + citemId;
		
	//结算方式
	 var csettleid=$("#csettleid").val();
	 data = data + "&queryDsignData.csettleid=" + csettleid;
		
	//业务员
	 var cname=$("#cname").val();
	 data = data + "&queryDsignData.cname=" + cname;
		
	//票据日期
	 var cDate=$("#cDate").val();
	 data = data + "&queryDsignData.cDate=" + cDate;
		
	 
	//票号最小值
	 var minCnId=$("#minCnId").val();
	 data = data + "&queryDsignData.minCnId=" + minCnId;
		
	//票号最大值
	 var maxCnId=$("#maxCnId").val();
	 data = data + "&queryDsignData.maxCnId=" + maxCnId;
		
	 //辅助条件标志
	 var addFlag = "show";
	 if (isDisplayed)
		 addFlag = "show";
	 else
		 addFlag = "hide";
	 data = data + "&queryDsignData.addFlag=" + addFlag;
    return data;
	 	
}







 /**
  * 得到查询对象的参数值
  */
 function getQueryParamValue_old() {
	 var queryDsignData = {};  
	 //得到凭证类别显示名称
	 var dsignItemText=$("#dsignItem").find("option:selected").text();
	 //得到凭证类别显示值
	 var dsignItemValue=$("#dsignItem").val();
	 queryDsignData.pzItem = dsignItemValue;
	 	 
	//得到制单人名称
	 var billText=$("#bill").find("option:selected").text();
	 //得到制单人id
	 var billId=$("#bill").val();
	 
	 queryDsignData.cbillid = billId;
	 
	//得到审核人名称
	 var checkText=$("#check").find("option:selected").text();
	 //得到审核人id
	 var checkId=$("#check").val();
	 queryDsignData.ccheckid = checkId;
	 
	 
	//得到出纳人名称
	 var cashierText=$("#cashier").find("option:selected").text();
	 //得到出纳入名称
	 var cashierId=$("#cashier").val();
	 queryDsignData.ccashierid = cashierId;
	 
	 
	//得到数据来源名称
	 var dataSourceText=$("#dataSource").find("option:selected").text();
	 //得到数据来源id
	 var dataSourceId=$("#dataSource").val();
	 queryDsignData.dataSourceid = dataSourceId;
	 
	 
	 //凭证开始号
	 var firstNum = $("#firstNum").val();
	//凭证结束号
	 var lastNum = $("#lastNum").val();
	 queryDsignData.firstNum = firstNum;
	 queryDsignData.lastNum = lastNum;
				
	 //得到月份
	 var month = $("#monthselector").val();
	 //开始日期、结束日期
	 var firstDate = $("#wdp1").val(); 
	 var lastDate = $("#wdp2").val();
	 queryDsignData.month = month;
	 queryDsignData.firstDate = firstDate;
	 queryDsignData.lastDate = lastDate;
	 //得到日期标志，month 月份, day 日期
	 var dateFlag = $("input[name='radiogruop2']:checked").val();
	 queryDsignData.dateFlag = dateFlag;
	    
	 // 凭证标志 1 全部 2作废 3有错
	 var iflag = $("input[name='radiogruop1']:checked").val();
	 queryDsignData.iflag = iflag;
	 
	 //审核时辅助条件标志位隐藏，不需要辅助条件
	 queryDsignData.addFlag = "hide";
     return 	queryDsignData;		
	 	
 }
 
 /**
  * 初始化查询组件
  */
 function initAuditBillQuery() {
	 /*$.ajax({
			url:"data/loadQueryInitData.json",
			type:"post",
			datatype:"json",
			success:function(data,status){
			}
		});*/
	 var data={"dsignQueryInitData":{"dsignList":[{"accid":590134,"csign":"收","ctext":"收款凭证","id":590918,"iotherused":null,"isignseq":0,"itype":1},{"accid":590134,"csign":"付","ctext":"付款凭证","id":590919,"iotherused":null,"isignseq":1,"itype":2},{"accid":590134,"csign":"转","ctext":"转账凭证","id":590920,"iotherused":null,"isignseq":2,"itype":3}],"itemClassList":[],"checkList":[{"ccheck":"张强","ccheckid":590132}],"billList":[{"cbill":"demo","cbillid":590131},{"cbill":"张强","cbillid":590132}],"settleList":[],"dataSourceList":[{"cdataSource":"工资系统","dataSourceid":1},{"cdataSource":"固定资产系统","dataSourceid":2},{"cdataSource":"核算系统","dataSourceid":3},{"cdataSource":"应收系统","dataSourceid":4},{"cdataSource":"应付系统","dataSourceid":5},{"cdataSource":"网上银行系统","dataSourceid":6}],"cashierList":[],"exchNameList":[]}};
	 setInitQueryValue(data);
 }
 
 /**
  * 设置查询窗体初始化值
  * @param data
  */
 function setInitQueryValue(data) {

	 //制单人
	 var billList = data.dsignQueryInitData.billList;
	$("#bill").empty();
	$("#bill")[0].options.add(new Option("","all",false,false));
	$.each(billList,function(index,CbillData){
		$("#bill")[0].options.add(new Option(CbillData.cbill,CbillData.cbillid,false,false));
	});
	
    //审核人
	var checkList = data.dsignQueryInitData.checkList;
	$("#check").empty();
	$("#check")[0].options.add(new Option("","all",false,false));
	$("#check")[0].options.add(new Option("已审核凭证","value",false,false));
	$("#check")[0].options.add(new Option("未审核凭证","notValue",false,false));
	
	$.each(checkList,function(index,CcheckData){
		$("#check")[0].options.add(new Option(CcheckData.ccheck,CcheckData.ccheckid,false,false));
	});

    //出纳人
	var cashierList = data.dsignQueryInitData.cashierList;
	$("#cashier").empty();
	$("#cashier")[0].options.add(new Option("","all",false,false));
	$("#cashier")[0].options.add(new Option("已签字凭证","value",false,false));
	$("#cashier")[0].options.add(new Option("未签字凭证","notValue",false,false));
	
	$.each(cashierList,function(index,CcashierData){
		$("#cashier")[0].options.add(new Option(CcashierData.ccashier,CcashierData.ccashierid,false,false));
	});
    //数据来源
	var dataSourceList = data.dsignQueryInitData.dataSourceList;
	$("#dataSource").empty();
	$.each(dataSourceList,function(index,DsignSourceData){
		$("#dataSource")[0].options.add(new Option(DsignSourceData.cdataSource,DsignSourceData.dataSourceid,false,false));
	});
	
	//凭证类别
	var dsignList = data.dsignQueryInitData.dsignList;
	$("#dsignItem").empty();
	$("#dsignItem")[0].options.add(new Option("","",false,false));
	$.each(dsignList,function(index,dsign){
		$("#dsignItem")[0].options.add(new Option(dsign.ctext,dsign.csign,false,false));
	});
	
	//会计期间初始化
	//var monthList = getCurAccidPeriod();
	var monthList=["2013.1"];
	$("#monthselector").empty();
	$.each(monthList,function(index,month){
		$("#monthselector")[0].options.add(new Option(month,month,false,false));
	});
	
	//得到登录的会计期间
	/*shulei
	var curLoginPeriod = getLoginPeriod();
	var curMonth =  curLoginPeriod.iid;
	$('#monthselector')[0].selectedIndex =curMonth*1-1;
	*/
	
	/*shulei*/
	var monthList=["2013.1"];
	$('#monthselector')[0].selectedIndex=0;

	
	
	
		
	
 }
 
 
  
 
 /**
  * 实现窗体传值接口
  */
 function deliverValue(valueObject){
	 $("#cdigest").attr("value",valueObject.selBdigestName);
	 $("#cdigest").attr("code",valueObject.selBdigestCode);
 }
 
 
 