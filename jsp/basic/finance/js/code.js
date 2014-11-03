/**
 * 
 * @DESCRIBE   会计科目：js逻辑控制
 * @AUTHOR     王丙建
 * @DATE       2012-12-13
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

$(document).ready(function(){
	queryAll();
	//得到科目的编码规则
	var codingRuleValue = grademarkValue('code');
	var codeValueList = codingRuleValue.split("");
	var length = codeValueList.length;
	var codingRule = "";
	
	if (length==1) {
		codingRule = codingRuleValue;
	}
	else {
		for (var i= 0;i<codeValueList.length-1; i++) {
			var value = codeValueList[i];
			codingRule = codingRule + value + "-";
		}
		codingRule = codingRule + codeValueList[length-1];
	    
    }
    $("#allCodeRule").html(codingRule);
	$("#zcCodeRule").html(codingRule);
	$("#fzCodeRule").html(codingRule);
	$("#gtCodeRule").html(codingRule);
	$("#qyCodeRule").html(codingRule);
	$("#syCodeRule").html(codingRule);
	$("#cbCodeRule").html(codingRule);
});
/*打开add增加科目窗口 add lyl */
function openAdd(){
	window.parent.openWindow('basic_finance_addcode','finance_code');
}

/**
 * 返回科目的辅助核算信息
 * @param icode
 */
function getCodeAddInfo(iCode) {
	var str = "";
	//个人核算
	var bperson = iCode.bperson;
	if (bperson==1 ) {
		str = str + "个人核算" ;
	}
	//客户核算
	var bcus = iCode.bcus;
	if (bcus==1 ) {
		if (str=="") {
			str = str + "客户核算" ;
		}
		else {
			str = str + "," + "客户核算";
		}
		
	}
	
	//供应商核算
	var bsup = iCode.bsup;
	if (bsup==1 ) {
		if (str=="") {
			str = str + "供应商核算" ;
		}
		else {
			str = str + "," + "供应商核算";
		}
	}
	//部门核算
	var bdept = iCode.bdept;
	if (bdept==1 ) {
		if (str=="") {
			str = str + "部门核算" ;
		}
		else {
			str = str + "," + "部门核算";
		}
	}
	//项目核算
	var bitem  = iCode.bitem;
	if (bitem==1 ) {
		if (str=="") {
			str = str + "项目核算" ;
		}
		else {
			str = str + "," + "项目核算";
		}
	}
	//现金科目
	var bcash = iCode.bcash;
	//银行科目
	var bbank= iCode.bbank;
	//现金流量科目
	var bcashitem = iCode.bcashitem;
	return  str;
}
function queryAll(){
	$("#allPage").html("");
	$("#zcPage").html("");
	$("#fzPage").html("");
	$("#gtPage").html("");
	$("#qyPage").html("");
	$("#cbPage").html("");
	$("#syPage").html("");
	
	$.ajax({
	    url: "code!queryAllCodes.action",
	    type: 'post',
	    dataType: "json",
	    complete:the_results,
	    success: function(data){
			first = true;
			//资产
			var iAssets = 0;
			//负债
			var iLiabilities = 0;
			//共同
			var iCommon = 0;
			//权益
			var iRights = 0;
			//成本
			var iCost = 0;
			//损益
			var iGal = 0;
			var list = data.codes;
	    	$.each(list,function(index,iCode){
				
	    	//for(var i = 0;i<list.length;i++){
				var grade = "";
				if(iCode.igrade!=1){
					for(var j = 1;j<iCode.igrade;j++){
						grade = grade+"&nbsp;&nbsp;";
					}
				}
				
				//得到科目辅助核算信息
				var strAddinfo = getCodeAddInfo(iCode); 
				$("#allPage").append('<tr id ="'+ iCode.id 
	    				+'" onclick = "selectRow(this)" ondblclick="changeCode(this)" '
	    				+'onmouseover="changeColor(this)" onmouseout="recoverColor(this)" ccode="'+iCode.ccode+'" ccodeName="'+iCode.ccodeName+'">'
	    				+'<td height="15" width="20" class="z_td_01">'+strNullProc(iCode.igrade)+'</td>'
						+'<td width="105" class="z_td_04">'+strNullProc(grade+iCode.ccode)+'</td>'
	    				+'<td width="197" class="z_td_04">'+strNullProc(grade+iCode.ccodeName)+'</td>'
	    				+'<td width="70" class="z_td_04">'+strNullProc(iCode.cexchName)+'</td>'
	    				+'<td width="77" class="z_td_07">'+strNullProc(strAddinfo)+'</td>'
	    				+'<td style="display:none">'+iCode.bend+'</td>'
	    				+'</tr >');
						
				if(iCode.cclass=="资产"){
					iAssets++;
					$("#zcPage").append('<tr id ="'+ iCode.id
	    				+'" onclick = "selectRow(this)" ondblclick="changeCode(this)" '
	    				+'onmouseover="changeColor(this)" onmouseout="recoverColor(this)" ccode="'+iCode.ccode+'" ccodeName="'+iCode.ccodeName+'">'
	    				+'<td height="15" width="20" class="z_td_01">'+strNullProc(iCode.igrade)+'</td>'
						+'<td width="105" class="z_td_04">'+strNullProc(grade+iCode.ccode)+'</td>'
	    				+'<td width="197" class="z_td_04">'+strNullProc(grade+iCode.ccodeName)+'</td>'
	    				+'<td width="70" class="z_td_04">'+strNullProc(iCode.cexchName)+'</td>'
	    				+'<td width="77" class="z_td_07">'+strNullProc(strAddinfo)+'</td>'
	    				+'<td style="display:none">'+iCode.bend+'</td>'
	    				+'</tr >');
				}else if(iCode.cclass=="负债"){
					iLiabilities++;
					$("#fzPage").append('<tr id ="'+ iCode.id
	    				+'" onclick = "selectRow(this)" ondblclick="changeCode(this)" '
	    				+'onmouseover="changeColor(this)" onmouseout="recoverColor(this)" ccode="'+iCode.ccode+'" ccodeName="'+iCode.ccodeName+'">'
	    				+'<td height="15" width="20" class="z_td_01">'+strNullProc(iCode.igrade)+'</td>'
						+'<td width="105" class="z_td_04">'+strNullProc(grade+iCode.ccode)+'</td>'
	    				+'<td width="197" class="z_td_04">'+strNullProc(grade+iCode.ccodeName)+'</td>'
	    				+'<td width="70" class="z_td_04">'+strNullProc(iCode.cexchName)+'</td>'
	    				+'<td width="77" class="z_td_07">'+strNullProc(strAddinfo)+'</td>'
	    				+'<td style="display:none">'+iCode.bend+'</td>'
	    					+'</tr >');
				}else if(iCode.cclass=="共同"){
					iCommon++;
					$("#gtPage").append('<tr id ="'+ iCode.id
	    				+'" onclick = "selectRow(this)" ondblclick="changeCode(this)" '
	    				+'onmouseover="changeColor(this)" onmouseout="recoverColor(this)" ccode="'+iCode.ccode+'" ccodeName="'+iCode.ccodeName+'">'
	    				+'<td height="15" width="20" class="z_td_01">'+strNullProc(iCode.igrade)+'</td>'
						+'<td width="105" class="z_td_04">'+strNullProc(grade+iCode.ccode)+'</td>'
	    				+'<td width="197" class="z_td_04">'+strNullProc(grade+iCode.ccodeName)+'</td>'
	    				+'<td width="70" class="z_td_04">'+strNullProc(iCode.cexchName)+'</td>'
	    				+'<td width="77" class="z_td_07">'+strNullProc(strAddinfo)+'</td>'
	    				+'<td style="display:none">'+iCode.bend+'</td>'
	    					+'</tr >');
				}else if(iCode.cclass=="权益"){
					iRights++;
					$("#qyPage").append('<tr id ="'+ iCode.id
	    				+'" onclick = "selectRow(this)" ondblclick="changeCode(this)" '
	    				+'onmouseover="changeColor(this)" onmouseout="recoverColor(this)" ccode="'+iCode.ccode+'" ccodeName="'+iCode.ccodeName+'">'
	    				+'<td height="15" width="20" class="z_td_01">'+strNullProc(iCode.igrade)+'</td>'
						+'<td width="105" class="z_td_04">'+strNullProc(grade+iCode.ccode)+'</td>'
	    				+'<td width="197" class="z_td_04">'+strNullProc(grade+iCode.ccodeName)+'</td>'
	    				+'<td width="70" class="z_td_04">'+strNullProc(iCode.cexchName)+'</td>'
	    				+'<td width="77" class="z_td_07">'+strNullProc(strAddinfo)+'</td>'
	    				+'<td style="display:none">'+iCode.bend+'</td>'
	    				+'</tr >');
				}else if(iCode.cclass=="成本"){
					iCost++;
					$("#cbPage").append('<tr id ="'+ iCode.id
	    				+'" onclick="selectRow(this)" ondblclick="changeCode(this)" '
	    				+'onmouseover="changeColor(this)" onmouseout="recoverColor(this)" ccode="'+iCode.ccode+'" ccodeName="'+iCode.ccodeName+'">'
	    				+'<td height="15" width="20" class="z_td_01">'+strNullProc(iCode.igrade)+'</td>'
						+'<td width="105" class="z_td_04">'+strNullProc(grade+iCode.ccode)+'</td>'
	    				+'<td width="197" class="z_td_04">'+strNullProc(grade+iCode.ccodeName)+'</td>'
	    				+'<td width="70" class="z_td_04">'+strNullProc(iCode.cexchName)+'</td>'
	    				+'<td width="77" class="z_td_07">'+strNullProc(strAddinfo)+'</td>'
	    				+'<td style="display:none">'+iCode.bend+'</td>'
	    					+'</tr >');
				}else if(iCode.cclass=="损益"){
					iGal++;
					$("#syPage").append('<tr id ="'+ iCode.id
	    				+'" onclick = "selectRow(this)" ondblclick="changeCode(this)" '
	    				+'onmouseover="changeColor(this)" onmouseout="recoverColor(this)" ccode="'+iCode.ccode+'" ccodeName="'+iCode.ccodeName+'">'
	    				+'<td height="15" width="20" class="z_td_01">'+strNullProc(iCode.igrade)+'</td>'
						+'<td width="105" class="z_td_04">'+strNullProc(grade+iCode.ccode)+'</td>'
	    				+'<td width="197" class="z_td_04">'+strNullProc(grade+iCode.ccodeName)+'</td>'
	    				+'<td width="70" class="z_td_04">'+strNullProc(iCode.cexchName)+'</td>'
	    				+'<td width="77" class="z_td_07">'+strNullProc(strAddinfo)+'</td>'
	    				+'<td style="display:none">'+iCode.bend+'</td>'
	    				+'</tr >');
				}
	    	
	    });
	    	$("#allLabel").html(list.length);
			$("#assetsLabel").html(iAssets);
			$("#liabilitiesLabel").html(iLiabilities);
			$("#commonLabel").html(iCommon);
			$("#rightsLabel").html(iRights);
			$("#costLabel").html(iCost);
			$("#galLabel").html(iGal);
	    	hasSelect = null;
	    	
	    }
	  });
}

//选择行
var hasSelect = null;
function selectRow(event){
	if(hasSelect!=null){
		$(hasSelect).attr("bgcolor",recoveryColor);
		$(hasSelect).css("color",temp2Color);
	}
	$(event).attr("bgcolor",clickcolor);
	$(event).css("color",recoveryColor);
	hasSelect = event;
}

//弹出修改窗口
function changeCode(){
	if(hasSelect==null){return;}
	cordId = hasSelect.id;
	var param={
			code:{id:cordId}
	};
	window.parent.openWindow('basic_finance_updcode','finance_code',param);
}

//变色函数-----开始
var highlightcolor='#ffffff';
var recoveryColor='#ffffff';
var clickcolor='#0000ff';
var tempColor='#ffffff';
var temp2Color='#000000';
function changeColor(event){
	if(event.bgColor==recoveryColor){
		event.bgColor=highlightcolor;
	}
}

function recoverColor(event){
	if(event.bgColor==highlightcolor){
		event.bgColor=tempColor;
	}
	
}

function del(){
	var str = "记录删除后不能修复！真的删除此记录吗?";
	if(hasSelect==null){
		jAlert("请选择要删除的科目!");
		return;
	}
	jConfirm(str, "确认对话框", function(confirmflag){
		if(confirmflag){
			var sourceValue = 	hasSelect.id;
			var sourceTable = 	"CODE";
			var sourceField = 	"ID";
			var bend=$(hasSelect).find("td:last").html();
			if(bend==0){//1是末级，0否
				jAlert("该科目有子科目，请先删除子科目!");
				return;
			}
			
			var isExits = isExitsTableRef(sourceValue, sourceTable, sourceField);
			var sourceValue1 = 	hasSelect.cells[1].innerHTML.replaceAll("&nbsp;","");
			var sourceTable1 = 	"CODE";
			var sourceField1 = 	"CCODE";
			var isExits1 = isExitsTableRef(sourceValue1, sourceTable1, sourceField1);
			if (isExits==true||isExits1==true) {
				jAlert("你选择的科目代码已经被引用，不允许删除！");
			    return ;			
			}
			else {
				$.ajax({
				    url: "code!delete?code.id="+hasSelect.id+"&code.igrade="+hasSelect.cells[0].innerHTML+"&code.ccode="+hasSelect.cells[1].innerHTML.replaceAll("&nbsp;",""),
				    type: 'post',
				    dataType: "json",
				    complete:the_results,
				    async:false,
				    success: function(data){
				    	if(data.isdelete==true){
							jAlert("删除成功！");
						}else{
							jAlert("删除失败!");
							return false;
						}
				    	queryAll();
				    }
				  });
			}
		}
	});
}

var the_results = function(XMLHttpRequest, textStatus){
	
	if(textStatus == "error"){
	 	msg = "请求出错！";
	 	jAlert(msg);
	}
	else if(textStatus == "timeout"){
	 msg = "请求超时！";
	 jAlert(msg);
	}
	else if(textStatus == "parsererror"){
	 msg = "JSON数据格式有误！";
	 jAlert(msg);
	}else if (textStatus != "success"){
	 msg = "失败";
	 jAlert(msg+textStatus);
	}
};