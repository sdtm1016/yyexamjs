//程序入口
$(document).ready(function(){
	queryAll();
});
function queryAll(){	
	$("#include").html("");
	$.ajax({
		url:"payCondition!queryPayCondition.action",
		type:"post",
		datatype:"json",
		error:function(){
			jAlert("请求失败!");
		},
		success:function(data,status){
			payCondList=data.payConditionList;
			for(var i=0;i<payCondList.length;i++){
				$("#include").append('<tr payId="'+payCondList[i].id+'" onclick="selectTr(this);" ondblclick="returnSelected(this);" payCode="'+payCondList[i].cpaycode+'" payName="'+payCondList[i].cpayname+'">'
						+'<td>'+strNullProc(payCondList[i].cpaycode)+'</td>'
						+'<td>'+strNullProc(payCondList[i].cpayname)+'</td>'
						+'<td>'+strNullProc(payCondList[i].ipaycredays)+'</td>'
						+'<td>'+strNullProc(payCondList[i].ipayfadays1)+'</td>'
						+'<td>'+strNullProc(payCondList[i].ipayfarate1)+'</td>'
						+'<td>'+strNullProc(payCondList[i].ipayfadays2)+'</td>'
						+'<td>'+strNullProc(payCondList[i].ipayfarate2)+'</td>'
						+'<td>'+strNullProc(payCondList[i].ipayfadays3)+'</td>'
						+'<td>'+strNullProc(payCondList[i].ipayfarate3)+'</td>'
						+'<td>'+strNullProc(payCondList[i].ipayfadays4)+'</td>'
						+'<td>'+strNullProc(payCondList[i].ipayfarate4)+'</td>'
						+'</tr>');
			}
			//选中第一行第一个单元格
			if(payCondList.length>0){
				selectTr($("#include >tr:first")[0]);
			}
		}
	});
}
//选中行
function selectTr(currentTr){
	$(currentTr).css("background-color","#00f").css("color","#fff").siblings().css("background-color","#fff").css("color","#000");
}
//返回选中的选项
function returnSelected(currentTr){
	var payId = $(currentTr).attr("payId");
	var payCode = $(currentTr).attr("payCode");
	var payName = $(currentTr).attr("payName");
	var param={};
	param.id=payId;
	param.ccode=payCode;
	param.cname=payName;
	window.parent.deliverValue("basic_comref_payCondref",param);
	window.parent.closeWindow("basic_comref_payCondref");
}
//刷新功能
function refresh(){
	queryAll();
}