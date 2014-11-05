/**
 * 
 * @DESCRIBE   函数列表js
 * @AUTHOR     王丙建
 * @DATE       2012-11-19
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


/**
 * 显示函数列表
 * @param iyear 年份 
 * @param iperiod 会计期间
 * @param itype  类型
 */
function queryFunctionGrid(){
	//var year = "2012";
	//var accid = "1";
	$.ajax({
		url:"reportFunManageAction!getAllFunction.action",
		type:"post",
		datatype:"json",
		success:function(data,status){
			var functionList = data.rfmList;
			showFunctionGrid(functionList);
		}
	});
}


/**
 * 初始化函数名称、函数列表
 * @param userTrandirList
 */
function showFunctionGrid(functionList) {
	$("#left_select").empty();
	$("#right_select").empty();
	var length = functionList.length;
	for (var i = 0; i<length; i++) {
		var aaFunction = functionList[i];
		var funcDesc = aaFunction.funcdesc;
		var funcName = aaFunction.funcname;
		$("#left_select")[0].options.add(new Option(funcDesc,i,false,false));
		$("#right_select")[0].options.add(new Option(funcName,i,false,false));
	}	
}
