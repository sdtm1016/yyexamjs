/**
 * 
 * @DESCRIBE   “报表”模块相关导航过滤器
 * @AUTHOR     陈建宇
 * @DATE       2013-03-29
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */
 





//“财务报表”模块相关导航过滤器
function mr_navigation_filter(){
	//山东高考不使用报表
	//return false;
	
	toPage('MR','default.html');
	//openWindow('mr_eSReport_eReport');
	openWindow('mr_shulei_eReport');
	return true;
}

