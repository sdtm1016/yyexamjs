/**
 * 
 * @DESCRIBE  会计期间选择js
 * @AUTHOR     王丙建
 * @DATE       2013-06-26
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

  /**
   * 页面初始化
   */
  $(document).ready(function(){
	  
	  //会计期间初始化
	 var monthList = getCurAccidPeriod();
	 $("#betweenDate").empty();
	 $.each(monthList,function(index,month){
			$("#betweenDate")[0].options.add(new Option(month,month,false,false));
	 });
	 //得到登录的会计期间
	 var curLoginPeriod = getLoginPeriod();
	 var curMonth =  curLoginPeriod.iid;
	 $("#betweenDate")[0].selectedIndex =curMonth*1-1;
	  
  });
  
  
  /**
   * 整理凭证方法
   */
  function btnConfirm(){
	  
	  
	  
	  
	  
  	var selectedDate = $("#betweenDate").find("option:selected").text();
  	
  	
	  window.parent.openWindow('gl_dsign_zfpzb','dsign_kjqjxz',selectedDate);

	window.parent.closeWindow('dsign_kjqjxz');
	  
  }