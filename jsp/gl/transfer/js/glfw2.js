/**
 * 
 * @DESCRIBE   公式界面js
 * @AUTHOR     王丙建
 * @DATE       2012-11-16
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

  /**
 * 查询科目辅助核算信息
 * @param iyear 年份 
 * @param iperiod 会计期间
 * @param itype  类型
 */
var cassItem="";//项目大类编码(lyl)
function queryCodeAddInfo(){
   var ccode = strNullProc($("#codeid").attr("dbValue"));
   //输入时处理
   if (ccode=="") {
	   ccode = $("#codeid").val();
   }  
	var codeObj = getCurCodeObj(ccode);
	//辅助核算初始化
	var codeAddInfoList = new Array(5);
	for (var i = 0; i<5; i++) {
		codeAddInfoList[i]="0";
	}
	if (codeObj!=null) {
		//客户
		codeAddInfoList[0] = codeObj.bcus;
		//供应商
		codeAddInfoList[1] = codeObj.bsup;
		//部门
		codeAddInfoList[2] = codeObj.bdept;
		//个人
		codeAddInfoList[3] = codeObj.bperson;
		//项目
		codeAddInfoList[4] = codeObj.bitem;
		cassItem=codeObj.cassItem;//项目大类编码（lyl）
		
	}
	initCodeAddInfo(codeAddInfoList);
	
}

/**
 * 初始化科目辅助信息
 * @param codeAddInfoList
 */
function initCodeAddInfo(codeAddInfoList) {
	//得到客户、供应商、部门、个人、项目标志
	var cusBz = codeAddInfoList[0];
	var supBz = codeAddInfoList[1];
	var deptBz = codeAddInfoList[2];
	var personBz = codeAddInfoList[3];
	var itemBz = codeAddInfoList[4];
	
	
	//add by lval -----没关联的辅助核算背景置灰  begin----
	disable_true("cusid");
	disable_true("cusbtn");
	
    disable_true("cusid");
	disable_true("cusbtn");
	
	disable_true("supid");
	disable_true("supbtn");
	
	disable_true("deptid");
	disable_true("deptbtn");
	
	disable_true("personid");
	disable_true("personbtn");
	
	disable_true("itemid");
	disable_true("itembtn");
	
	if (cusBz==1) {
		disable_false("cusid");
	    disable_false("cusbtn");
	    $("#cusid").attr("editFlag",cusBz);
	}
	$("#cusid").attr("editFlag",cusBz);
	if (supBz==1) {
		disable_false("supid");
	    disable_false("supbtn");
	}
	$("#supid").attr("editFlag",supBz);
	if (deptBz==1) {
		disable_false("deptid");
	    disable_false("deptbtn");
	}
	$("#deptid").attr("editFlag",deptBz);
	if (personBz==1) {
		disable_false("personid");
	    disable_false("personbtn");
	}
	$("#personid").attr("editFlag",personBz);
	if (itemBz==1) {
		disable_false("itemid");
	    disable_false("itembtn");
	} 	
	$("#itemid").attr("editFlag",itemBz);
	//add by lval -----关联的辅助核算背景点亮  end----
}
//禁用控件   传入 控件ID
function disable_true(id){
	$("#"+id).attr("disabled","disabled");
	$("#"+id).css("background-color","#808080");
}
//启用 控件
function disable_false(id){
	$("#"+id).attr("disabled",false);
	$("#"+id).css("background-color","");
}

/**
 * 得到函数字符串
 */
function getFuncString() {
	if($("#cusid").attr("editFlag")==1&&$("#cusid").val()==""){
		jAlert("客户辅助核算不能为空!");
		$("#cusid").focus();
		return;
	}
	if($("#supid").attr("editFlag")==1&&$("#supid").val()==""){
		jAlert("供应商辅助核算不能为空!");
		$("#supid").focus();
		return;
	}
	if($("#deptid").attr("editFlag")==1&&$("#deptid").val()==""){
		jAlert("部门辅助核算不能为空!");
		$("#cusid").focus();
		return;
	}
	if($("#personid").attr("editFlag")==1&&$("#personid").val()==""){
		jAlert("个人辅助核算不能为空!");
		$("#personid").focus();
		return;
	}
	if($("#itemid").attr("editFlag")==1&&$("#itemid").val()==""){
		jAlert("项目辅助核算不能为空!");
		$("#itemid").focus();
		return;
	}
	var pos = selFuncName.indexOf("(");
	var funcName = selFuncName.substr(0,pos) ;
	var selfx = $("#selfx").val();
	var cusid= $("#cusid").attr("dbValue") ;
	var supid= $("#supid").attr("dbValue") ;
	var deptid= $("#deptid").attr("dbValue") ;
	var personid= $("#personid").attr("dbValue") ;
	var itemid= $("#itemid").attr("dbValue") ;
	if (selfx=="") selfx = " ";
	if (cusid=="") cusid = " ";
	if (supid=="") supid = " ";
	if (deptid=="") deptid = " ";
	if (personid=="") personid = " ";
	if (itemid=="") itemid = " ";
	
	
	var strFunction = funcName + "(" + $("#codeid").attr("dbValue") + "," 
	                   + $("#selperiod").val() + ","
	                   + selfx + ","
	                   + deptid + ","
	                   + personid + ","
	                   + cusid + ","
	                   + supid + ","
	                   + itemid + ","
    				   + $("input[name='rd_1']:checked").val() + ")";
	window.parent.getWindow("gl_transfer_ats").deliverValue(strFunction);
	window.parent.closeWindow('gl_transfer_fw2');         
	//return strFunction;
};





