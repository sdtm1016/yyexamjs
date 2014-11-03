//全局变量
//上个页面穿过来的参数
var parentParam=null;
//程序入口
$(document).ready(function(){
	parentParam = window.parent.valueMap.get("pu_gb_gbQuery");
	//设置币种
	$.ajax({
	    url: "foreigncurrency!queryList.action",
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	var foreigncurrencys = data.foreigncurrencys;
	    	var strHtml="<option value='-1'>所有币种</option>";
	    	for(var i=0;i<foreigncurrencys.length;i++){
	    		strHtml+="<option value='"+strNullProc(foreigncurrencys[i].id)+"'>"+strNullProc(foreigncurrencys[i].cexchName)+"</option>";
	    	}
	    	//设置币种
	    	$("#currencyType").empty().append(strHtml);
	    }
	});
	//记账日期设置为当前日期
	$("#maxDvouchdate").val(getCookie("operDate"));
	//选中第一个多选框
	$("input[type=checkbox]:first")[0].click();
});
//得到查询条件
function getQueryCond(){
	var data = "";
	//币种
    data+= "&gbQueryData.cexch_name=" + $("#cexch_name").attr("dbvalue");
    //部门编码
    data+= "&gbQueryData.cdeptcode=" +$("#cdeptcode").attr("dbvalue");
    //供应商编码
    data+= "&gbQueryData.cdwcode=" +$("#cdwcode").attr("dbvalue");
     //业务员编码
    data+= "&gbQueryData.cperson=" +$("#cperson").attr("dbvalue");
    //结算方式编码
    data+= "&gbQueryData.csscode=" + $("#csscode").attr("dbvalue");
    //单据号
    data+= "&gbQueryData.minCvouchid=" + $("#minCvouchid").val();
    data+= "&gbQueryData.maxCvouchid=" + $("#maxCvouchid").val();
    //记账日期
    data+= "&gbQueryData.minDvouchdate=" + $("#minDvouchdate").val();
    data+= "&gbQueryData.maxDvouchdate=" + $("#maxDvouchdate").val();
    //金额
    data+= "&gbQueryData.minAmount=" + $("#minAmount").val();
    data+= "&gbQueryData.maxAmount=" + $("#maxAmount").val();
	return data;
}
//选中制单类型
function checkTouchingType(currentCheckBox){
	$(currentCheckBox).parent().siblings().addClass("bgColor").find("span").addClass("fontColor");
	/*查找该li的兄弟节点*/
	var li=$(currentCheckBox).parent().parent().siblings();
	li.each(function(){
		$(this).find("div[class^=div2]").removeClass('bgColor').find("span").removeClass("fontColor");
		//控制单选
		$(this).find("input").removeAttr("checked");
	});
}
//确定按钮查询
function execQuery() {
	queryType=parentParam.type;
	var param={};
	//制单类型
	var touchingType = $("input[type='checkbox']:checked").val();
	//查询条件
	var queryConditions = getQueryCond();
	//制单类型
	queryConditions+="&gbQueryData.cvouchtype="+touchingType;
	touchingType = $("input[type='checkbox']:checked").parent().siblings().find("span").text();
	param.touchingType=touchingType;
	param.queryConditions = queryConditions;
	if(queryType=="pu"){
		window.parent.openWindow('pu_gb_tableview','pu_gb_gbQuery',param);
	}else if(queryType=="search"){
		var parentwin = window.parent.getParentWindow("pu_gb_gbQuery");
		parentwin.queryBy(queryConditions,touchingType,null);
	}
	window.parent.closeWindow('pu_gb_gbQuery');
}
//参照赋值
function deliverValue(valueObject){
	$("#"+queryid).val(valueObject.cname).attr("dbvalue", valueObject.ccode);
}
//取消按钮关闭窗体
function exitgbQuery() {
	window.parent.closeWindow('pu_gb_gbQuery');
}

