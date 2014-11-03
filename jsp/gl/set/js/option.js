/**
 * 
 * @DESCRIBE   参数设置js
 * @AUTHOR     王丙建
 * @DATE       2013-1-06
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

//模块id
var moduleid = "GL";



/**
 * 得到参数值
 */
function getParamValue() {
	
	
	
	var data = "";
	//声明参数设置数组
	var length = 38;
	var keyList = new Array(length);
	//制单序时控制
	keyList[0] = "bMakShtSort";
	//支票控制
	keyList[1] = "bCheque";
	//资金及来往赤字控制
	keyList[2] = "bCurRed";
	//制单权限控制到科目
	keyList[3] = "bVouchCode";
	//允许修改、作废他人填制的凭证
	keyList[4] = "bProofModify";
	//允许查看他人填制的凭证
	keyList[5] = "bQueryOtherPz";
	//可以使用其他系统受控科目
	keyList[6] = "bOthCtlSubj";
	//现金流量项目必录
	keyList[7] = "bCashFluxItem";
	//打印凭证页脚姓名
	keyList[8] = "bProofFoldNote";
	//凭证审核控制到操作员
	keyList[9] = "bProofVert";
	//出纳凭证必须经由出纳签字
	keyList[10] = "bProofSign";
	
	//未审核的凭证允许记账
	keyList[11] = "bNotCheckJz";
	//打印醒目核算凭证时,显示项目分类编码
	keyList[12] = "bPrintItemCCode";
	//打印摘要小数位数及宽度
	keyList[13] = "iBreifWdth";
	//打印外币小数位数及宽度
	keyList[14] = "iFgnCurDgt";
	//打印数量小数位数及宽度
	keyList[15] = "iQuanDgt";
	//打印金额小数位数及宽度
	keyList[16] = "iMnyDgt";
	//打印汇率小数位数及宽度
	keyList[17] = "iExchLength";
	//打印单价小数位数及宽度
	keyList[18] = "iPriceLength";
	//明细账查询权限控制到科目
	keyList[19] = "bQryCtlSubj";
	//金额式明细账
	keyList[20] = "iMnyPrtLn";
	
	//外币金额式明细账
	keyList[21] = "iFgnCurPrnLn";
	//数量金额式明细账
	keyList[22] = "iQuanMnyPrnLn";
	//外币数量式明细账
	keyList[23] = "iQuanFgnCurPrnLn";
	//金额式日记账
	keyList[24] = "iMnyDryPrnLn";
	//外币金额式日记账
	keyList[25] = "iFgnCurDryPrnLn";
	//数量金额式日记账
	keyList[26] = "iQuanMnyDryPrnLn";
	//外币数量式日记账
	keyList[27] = "iQuanFgnDryPrnLn";
	//金额式多栏账
	keyList[28] = "iMnyMulPrnLn";
	//外币金额式多栏账
	keyList[29] = "iFgnMnyPrnLn";
	//数量金额式多栏账
	keyList[30] = "iQuanMnyMulPrnLn";
	
	//外币数量式多栏账
	keyList[31] = "iQuanFgnMulPrnLn";
	//凭证
	keyList[32] = "iMnyDgt";
	//启用日期
	keyList[33] = "dGLStartDate";
	//数量小数位
	keyList[34] = "iQuanDecDgt";
	//单价小数位
	keyList[35] = "iPriceDecDgt";
	//本位币精度
	keyList[36] = "dGLStartDate";
	
	//新增凭证时，自动带入的凭证日期
	keyList[37] = "bNewPzDateDefaultValue";
	
	
	//通过遍历参数设置数组，得到每个设置的参数值
	//alert($("input[name='bCashFluxItem']:checked").val());
	 
	
	for (var i = 0; i<length; i++) {
		var key = keyList[i];
		var value = "";
		
		var type = "";
		
		try{
			type = $("#"+key)[0].type;
		}catch(e){
			type = $("input[name='" + key + "']")[0].type;
		}
		//文本框取值
		if(type == "text"){
			value = $("#" + key).val();
		}
		//checkbox取值
		else if(type == "checkbox"){
			value = $("input[name='" + key + "']:checked").val();
			if (value=="on") {
				value = "TRUE";
			}else{
				value = "FALSE";
			}
		}
		//radio取值
		else if(type == "radio"){
			value = $("input[name='" + key + "']:checked").val();
			
		}
		
		
		//启用日期不能修改
		if (key=="dGLStartDate") {
			value = $("#dGLStartDate").val();
		}
		
		var paramKey  = moduleid + "_" + key;
		var curData =  "&paramDataList["+ i + "].paramKey=" + paramKey 
		           + "&paramDataList[" + i + "].paramValue=" + value;
		data = data + curData;
	}
	//外币核算 汇率方式
	//keyList[41] = "iXchgRateStl";
	 var iXchgRateStl = $("input[name='iXchgRateStl']:checked").val();
	 var data38 =  "&paramDataList[38].paramKey=" + "GL" +  "_" +"iXchgRateStl"  
     + "&paramDataList[38].paramValue=" + iXchgRateStl;
	 data = data + data38;
	
	
	//增加radio类型取值
	 /**
	//部门排序方式37
	 var iDepSrtStl = $("input[name='iDepSrtStl']:checked").val();
	 var data37 =  "&paramDataList[37].paramKey=" + "GL_iDepSrtStl"  
       + "&paramDataList[37].paramValue=" + iDepSrtStl;
	 data = data + data37;
	
	//个人排序方式38
	 var iPerSrtStl = $("input[name='iPerSrtStl']:checked").val();
	 var data38 =  "&paramDataList[38].paramKey=" + "GL_iPerSrtStl"  
     + "&paramDataList[38].paramValue=" + iPerSrtStl;
	 data = data + data38;
	
		
	//项目排序方式39
	 var iItmSrtStl = $("input[name='iItmSrtStl']:checked").val();
	 var data39 =  "&paramDataList[39].paramKey=" + "GL" +  "_" + "iItmSrtStl"  
     + "&paramDataList[39].paramValue=" + iItmSrtStl;
	 data = data + data39;
	
		
	
	//凭证编号方式
	keyList[40] = "";
	
	
		
	
	//预算控制
	keyList[15] = "";
	//新增凭证时，自动带入的凭证日期
	keyList[16] = "";
	//合并凭证显示、打印
	keyList[17] = "";
	//明细账(日记账，多栏账)打印方式
	keyList[25] = "";
	//凭证、账簿套打1
	keyList[26] = "";
	//凭证、账簿套打2
	keyList[27] = "";
	//启用会计年度
	keyList[41] = "";

	//开始日期
	keyList[43] = "";
	//结束日期
	keyList[44] = "";
	//账套名称
	keyList[45] = "";
	//单位名称
	keyList[46] = "";
	//账套路径
	keyList[47] = "";
	//行业性质
	keyList[48] = "";
	//科目级长
	keyList[49] = "";

	//币符
	keyList[56] = "";
	//币名
	keyList[57] = "";
*/
	return data;
}

/**
 * 更新参数设置值
 */
function updateParam() {
	var data = getParamValue();
	
	//alert(data);
	  $.ajax({
			url: "paramSet!updateParam.action" ,
			type: 'post',
			data:data,
			dataType: "json",
			success: function(data){
				jAlert("参数设置成功！","提示",function(){
					
					window.parent.closeWindow('gl_set_option');
				});
			}
		  });
}


/**
 * 初始化参数
 */
function queryParam(moduleid) {
	$.ajax({
		url: "paramSet!queryParam.action?moduleid=" +  moduleid,
		type: 'post',
		dataType: "json",
		success: function(data){
			initParam(data.paramDataList);
		}
	  });
	  
}

/**
 * 初始化参数
 */
function initParam(paramDataList) {
	//alert("参数个数" + paramDataList.length);
	for (var i = 0; i<paramDataList.length; i++) {
		var paramData = paramDataList[i];
		var paramKey = paramData.paramKey;
		var paramType = paramData.paramType;
		var paramValue = paramData.paramValue;
			
		//布尔型初始值计算
		if (paramType=="Boolean") {
			//alert("paramValue" + paramValue);
			if (paramValue=="TRUE")
				$("#" + paramKey).attr("checked", true);
			else
				$("#" + paramKey).attr("checked", false);
			//外币核算汇率方式
			if (paramKey=="iXchgRateStl" ) {
				$("input[name=iXchgRateStl][value="+paramValue+"]").attr("checked",true);
				
			}
			
			//新增凭证时，自动带入的凭证日期
			if (paramKey=="bNewPzDateDefaultValue" ) {
				$("input[name=bNewPzDateDefaultValue][value="+paramValue+"]").attr("checked",true);
				
			}
			
		}
		else if (paramType=="Text") {
			$("#" + paramKey).val(paramValue);		
		}
		else if (paramType=="sString") {
			$("#" + paramKey).val(paramValue);		
		}
		else if (paramType=="iInteger") {
			$("#" + paramKey).val(paramValue);		
		}
		else if (paramType=="Integer") {
			$("#" + paramKey).val(paramValue);		
		}
		else if (paramType=="Long") {
			$("#" + paramKey).val(paramValue);		
		}
		else if (paramType=="tinyint") {
			$("#" + paramKey).val(paramValue);		
		}	
		else if (paramType=="dDate") {
			$("#" + paramKey).val(paramValue);		
		}
	};
	
	
	
}

/**
 * 帮助
 */
function help() {
	
}
/**
 * 放弃
 */
function abort() {
	window.parent.closeWindow('gl_set_option');
}
