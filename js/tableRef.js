/**
 * 
 * @DESCRIBE   表间引用js处理类
 * @AUTHOR     王丙建
 * @DATE       2012-12-18
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

 /**
  * 是否存在表间引用，存在返回true
  */ 
 function isExitsTableRef(sourceValue, sourceTable, sourceField) {
	  var isExits = false;
	  var param = "tableRef.sourceValue="+sourceValue 
	              + "&tableRef.sourceTable=" + sourceTable
                  + "&tableRef.sourceField=" + sourceField;

	  $.ajax({
		    url: "tableRef!isUsed",
		    type: 'post',
		    data:param,
		    dataType: "json",
		    async:false,
		    cache:false,
		    success: function(data){
		    	isExits = data.isExitsTableRef;
		    }
		  });
	  return isExits;
  };
  
  /**
   * 根据账套id获得会计期间
   * @param accid
   */
  function getPeriodByAccid(accid) {
	  var periodList = new Array(12);
	  periodList[0] = "2013.01";
	  periodList[1] = "2013.02";
	  periodList[2] = "2013.03";
	  periodList[3] = "2013.04";
	  periodList[4] = "2013.05";
	  periodList[5] = "2013.06";
	  periodList[6] = "2013.07";
	  periodList[7] = "2013.08";
	  periodList[8] = "2013.09";
	  periodList[9] = "2013.10";
	  periodList[10] = "2013.11";
	  periodList[11] = "2013.12";
      return periodList;	  
  }
  /**
   * 返回当前账套的会计期间
   */
  function getCurAccidPeriod() {
	  var uaPeriodList = null;
	  $.ajax({
		    url: "/yyexamjs/data/queryUaPeriods.json",
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	uaPeriodList = data.uaPeriods;
		    }
	  });
	  var periodList = new Array(12);
	  for (var i = 0; i<uaPeriodList.length; i++) {
		  var UaPeriod = uaPeriodList[i];
		  var iyear = UaPeriod.iyear;
		  var iid = UaPeriod.iid;
		  periodList[i] = iyear + "." + iid;
	  }
	  return periodList;
  }
  
  /**
   * 根据选择的会计期间返回会计期间对象
   * @param year
   * @param period
   */
  function getPeriodByperiod(year, period) {
	  var uaPeriod = null;
	  $.ajax({
		    url: "foreigncurrency!queryUaPeriods.action?year=" + year + "&period=" + period,
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	uaPeriod = data.uaPeriod;
		    }
	  });
	  return uaPeriod;
  }
  
  //返回当前帐套的外币币种
  function getCurAccidExchList() {
	  var exchList = null;
	  $.ajax({
		    url: "foreigncurrency!queryList.action",
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	exchList = data.foreigncurrencys;
		    }
	  });
	 
	  return exchList;
  }
  
  /**
   * 获取凭证类别根据选择的凭证字
   * @param curCsign
   */
  function getDsignCategoryByCsign(curCsign) {
	 var result = null;
	 var param = "dsign.csign=" + curCsign ;
	
	  $.ajax({
		    url: "dsignCategory!queryDsignCategoryByCsign.action",
		    type: 'post',
		    data:param,
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	result = data.dsign;
		    }
	  });
	 
	
	 return result;
  }
  
  /**
   * 根据凭证字获取受控科目
   * @param curCsign
   */
  function getDsignsByCsign(curCsign) {
	  var dsignsList = null;
		 var param = "dsigns.csign=" + curCsign ;
		 // alert(param);	
		  $.ajax({
			    url: "dsignsCode!queryList.action",
			    type: 'post',
			    data:param,
			    dataType: "json",
			    async:false,
			    success: function(data){
			    	dsignsList = data.dsignsList;
			    }
		  });
		 var length = dsignsList.length;
		 var strlimitCode  = "";
			
		 for (var i= 0; i<length; i++) {
			 strlimitCode = strlimitCode + dsignsList[i].ccode + ",";	 
		 }
		// alert("受限科目：" + strlimitCode);
		 return strlimitCode;
  }
  
  //判断选择的科目是否受凭证类别控制
  function isDsignLimitCode(curCsign, curCode) {
	  var codelimit = null;
	  var param = "dsigns.csign=" + curCsign + "&dsigns.ccode=" + curCode;
	  //alert(param);	
	  $.ajax({
		    url: "dsignsCode!codeisLimit.action",
		    type: 'post',
		    data:param,
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	codelimit = data.codelimit;
		    }
	  });
	 
	  return codelimit;
  }
  
  /**
   * 根据币种名称得到币种对象
   * @param exchName  币种名称
   */
  function getCurAccidForeigncurrencyByExchName(exchName) {
	  var foreigncurrency = null;
	  var param = "foreigncurrency.cexchName=" + exchName;
	 // alert("param" + param);
	  $.ajax({
		    url: "foreigncurrency!queryForeigncurrencyByExchName.action",
		    type: 'post',
		    data:param,
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	foreigncurrency = data.foreigncurrency;
		    }
	  }); 
	  return foreigncurrency;
  }
  
  /**
   * 得到登录的会计期间
   */
  function getLoginPeriod() {
	  var curPeriod = null;
	  $.ajax({
		    url: "foreigncurrency!queryLoginUaPeriod.action",
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	curPeriod = data.uaPeriod;
		    }
	  });  
	  return curPeriod;
  }
  
  /**
   * 根据选择的日期得到登录的会计期间
   * 
   */
  function getPeriodByDate(selDate) {
	  var curPeriod = null;
	  $.ajax({
		    url: "foreigncurrency!queryUaPeriodByDate.action?operDate=" + selDate,
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	curPeriod = data.uaPeriod;
		    }
	  });  
	  return curPeriod;
  }
  
  /**
   * 根据选择的日期得到外币汇率
   * @param selDate
   */
  function getSelRateByDate(selDate) {
	  var exch = null;
	  var param = "foreigncurrency.cexchName=" + cexchName+ "&foreigncurrency.cexchCode=" + selDate;
	  //alert(param);
	
	  $.ajax({
		    url: "foreigncurrency!queryRateByDate.action?operDate=" + selDate,
		    type: 'post',
		    data:param,
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	exch = data.exch;
		    }
	  });  
	  return exch.nflat;
  }
  
  /**
   * 根据代码返回代码对象
   * @param ccode  科目编码
   */
  function getCurCodeObjByCodeOrName(inputValue) {
	  var rtnCode = null;
	  var param = "codeOrName=" + inputValue;
	  $.ajax({
		    url: "code!queryCodeByCodeOrName.action" ,
		    type: 'post',
		    data:param,
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	rtnCode = data.code1;
		    }
	  });
	  return rtnCode;
	  
  }
  
  
  /**
  * 根据代码返回代码对象
  * @param ccode  科目编码
  */
 function getCurCodeObj(ccode) {
	  var rtnCode = null;
	  $.ajax({
		    url: "code!queryCodeByCcode.action?ccode=" + ccode,
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	rtnCode = data.code1;
		    }
	  });
	  return rtnCode;
	  
 }
 
 
 
 /**
  * 科目及其包含的子科目是否包含数量核算科目
  * 王丙建 2013-09-16
  * 是，返回true，否则返回false
  * @param ccode  科目编码
  */
 function isCodeCmeasure(ccode) {
	  var codeList = null;
	  $.ajax({
		    url: "code!queryEndCodeList.action?ccode=" + ccode,
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	codeList = data.codes;
		    }
	  });
	  var length = codeList.length;
	  
	  if (length==0) return false;
	  for (var i = 0; i<length; i++) {
		  var curObj = codeList[i];
		  var cmeasure = curObj.cmeasure;
		  if (strNullProc(cmeasure) !="") 
			  return true;
	  }
	  return false;
	  
 }
 
 
 /**
  * 科目及其包含的子科目是否包含数量核算科目
  * 王丙建 2013-09-16
  * 是，返回true，否则返回false
  * @param ccode  科目编码
  */
 function isEqualsStructCode(ccode1, ccode2) {
	  var isuniqueness = true;
	  $.ajax({
		    url: "code!isEqualsStructCode.action?ccode1=" + ccode1 + "&ccode2=" + ccode2,
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	isuniqueness = data.isuniqueness;
		    }
	  });
	  
	  return isuniqueness;
	  
 }
 
 
  
  /**
   * 根据科目列表判断外币列是否允许显示
   * 王丙建 2013-06-14
   * @param codeList 科目列表
   */
  function isShowExchCellByCodeList(codeList) {
	  var isExch = false;
	  var length = codeList.length;
	  var param = "";
	  for (var i = 0; i<length; i++) {
		  var curCode = codeList[i];
		  param = param +  "&setCodeList[" + i +  "]=" +  curCode;
	  }
	//  alert(param);	 
	  $.ajax({
		    url: "code!isShowExchCellByCodeList.action",
		    type: 'post',
		    data:param,
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	isExch = data.isExch;
		    }
	  }); 
	  return isExch;
  }
  
  
  
  /**
   *  得到科目绝对值
   */
  function getCodeAbsName(ccode) {
  	var absCodeName = null;
  	  $.ajax({
  		    url: "code!queryCodeAbsName.action?ccode=" + ccode,
  		    type: 'post',
  		    dataType: "json",
  		    async:false,
  		    success: function(data){
  		    	absCodeName = data.absCodeName;
  		    }
  	  });
  	  return absCodeName;
  }
  
  /**
   * 得到科目是否有辅助核算信息
   * @param code
   */
  function getCodAddInfo(code) {
	  
	  //alert(JSON.stringify(code));
	  
	  var codeAddInfoList = new Array(7);
	  //1项目
	  codeAddInfoList[0] = code.bitem;
	  //2部门
	  codeAddInfoList[1] = code.bdept;
	   //3个人
	  codeAddInfoList[2] = code.bperson;
	  //4客户
	  codeAddInfoList[3] = code.bcus;
     //5供应商
	  codeAddInfoList[4] = code.bsup;
	  
	  //结算方式 (是否银行科目)
	  codeAddInfoList[5] = code.bbank;
	
	  //数量单位
	  codeAddInfoList[6] = strNullProc(code.cmeasure);
		  
	//项目大类编码
	  codeAddInfoList[7] = strNullProc(code.cassItem);
	  
	  //是否是银行账
	  codeAddInfoList[8] = code.be;
	  
	  
	  return codeAddInfoList;
	  
  }
  
  /**
   * 根据基础档案编码获取参照对象开始
   * 王丙建 2013-07-23
   */
  
  /**
   * 根据部门编码返回部门对象
   */
  function getDepartmentByCode(curcode) {
	  var departmentObj = null;
	  $.ajax({
			url : "department!findDepartmentByCode.action?deptCode=" +curcode ,
			type : 'post',
			async : false,
			dataType : "json",
			success : function(data) {
				departmentObj = data.department;

			}
		});
	  return departmentObj;
  }
  
  
  /**
   * 根据职员编码返回职员对象
   */
  function getPersonByCode(curcode) {
	  var personObj = null;
	  $.ajax({
			url : "person!findPersonByCode.action?personCode=" +curcode ,
			type : 'post',
			async : false,
			dataType : "json",
			success : function(data) {
				personObj = data.person;

			}
		});
	  return personObj;
  }
  
  /**
   * 根据客户编码返回客户对象
   */
  function getCustomerByCode(curcode) {
	  var customerObj = null;
	  $.ajax({
			url : "customer!findCustomerByCode.action?code=" +curcode ,
			type : 'post',
			async : false,
			dataType : "json",
			success : function(data) {
				customerObj = data.customer;

			}
		});
	  return customerObj; 
  }
  
  
  /**
   * 根据供应商编码返回供应商对象
   */
  function getVendorByCode(curcode) {
	  var vendorObj = null;
	  $.ajax({
			url : "vendor!findVendorByCode.action?code=" +curcode ,
			type : 'post',
			async : false,
			dataType : "json",
			success : function(data) {
				vendorObj = data.vendor;

			}
		});
	  return vendorObj;
  }
  
  /**
   * 根据存货编码返回存货对象
   */
  function getInventoryByCode(curcode) {
	  var inventoryObj = null;
	  $.ajax({
			url : "inventory!queryInventoryByCinvcode.action?code=" +curcode ,
			type : 'post',
			async : false,
			dataType : "json",
			success : function(data) {
				inventoryObj = data.inventory;

			}
		});
	  return inventoryObj;
  }
  
  
  /**
   * 根据付款条件编码返回付款条件对象
   */
  function getPayContionByCode(curcode) {
	  var payConditionObj = null;
	  $.ajax({
			url : "payCondition!findPayConditionByCode.action?code=" +curcode ,
			type : 'post',
			async : false,
			dataType : "json",
			success : function(data) {
				payConditionObj = data.payCondition;

			}
		});
	  return payConditionObj;
  }
  
  /**
   * 根据银行编码返回银行对象
   */
  function getBankByCode(curcode) {
	  var bankObj = null;
	  $.ajax({
			url : "bank!findBankByCode.action?code=" +curcode ,
			type : 'post',
			async : false,
			dataType : "json",
			success : function(data) {
				bankObj = data.bank;

			}
		});
	  return bankObj; 
  }
  
  
  
  /**
   * 根据结算方式编码返回结算方式对象
   */
  function getSettleStyleByCode(curcode) {
	  var csscodeObj = null;
	  $.ajax({
			url : "settleStyle!findSettleStyleByCode.action?code=" +curcode,
			type : 'post',
			async : false,
			dataType : "json",
			success : function(data) {
				csscodeObj = data.settleStyle;

			}
		});
	  return csscodeObj; 
  }
  
  
  /**
   * 根据基础档案编码获取成那种对象结束
   * 王丙建 2013-07-23
   */
  
  