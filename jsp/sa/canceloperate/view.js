//全局变量
//上个页面穿过来的参数
var parentParam=null;
var currentoperateType="";
var currentvendor="";
//程序入口
$(document).ready(function(){
	parentParam = window.parent.valueMap.get("sa_canceloperate_view");
	var type=parentParam.type;
	
	var operateType = parentParam.operateType;
	var vendor = parentParam.vendor;
	if(type=="cancelOperate"){
		queryBy(operateType,vendor);
	}
});
function queryBy(operateType,vendor){
	currentoperateType = operateType;
	currentvendor = vendor;
	$("#operateType").text(operateType);
	if(vendor==""){
		$("#vendor").text("全部");
	}else{
		$("#vendor").text(vendor);
	}
	var data = {};
	data.operateType = operateType;
	data.vendor = vendor;
	if(operateType=="核销"){
		//查询可以取消的单据
		$.ajax({
			url:"apCloseBill!queryCancelData",
			data:data,
			type:"post",
			datatype:"json",
			async : false,   
			error: function () {
		           jAlert('请求失败');   
			},
			success:function(data){
				var apDetailList = data.apDetailList;
				if(apDetailList==null){
					$("#cancleApDetailData").empty();			
				}else{
					var strHtml = "";
					for(var i=0;i<apDetailList.length;i++){
						strHtml +="<tr apDetailId='"+strNullProc(apDetailList[i].id)+"'>";
						strHtml +="	<td ondblclick='checked(this);'></td>";
						strHtml +="	<td>"+strNullProc(apDetailList[i].cvouchtype)+"</td>";
						strHtml +="	<td>"+strNullProc(apDetailList[i].cvouchid)+"</td>";
						strHtml +="	<td>"+getStrDate(apDetailList[i].dregdate)+"</td>";
						strHtml +="	<td>"+strNullProc(apDetailList[i].cdwcode)+"</td>";
						strHtml +="	<td>"+strNullProc(apDetailList[i].icamount)+"</td>";
						strHtml +="	<td>"+strNullProc(apDetailList[i].cdeptcode)+"</td>";
						strHtml +="	<td>"+strNullProc(apDetailList[i].cperson)+"</td>";
						strHtml +="</tr>";
					}
					$("#cancleApDetailData").empty().append(strHtml);
				}
			}
		});
	}else{
		$("#cancleApDetailData").empty();
	}
	//确定按钮可用
	$("#sureCancel").attr("disabled",false);
}
//选中行
function checked(td){
	if($(td).text()=="Y"){
		$(td).text("");
	}else{
		$(td).text("Y");
	}
}
//选中所有行
function checkAll(){
	$("#cancleApDetailData >tr").each(function(){
		$(this).find("td:first").text("Y");
	});
}
//取消选中所有行
function cancelAll(){
	$("#cancleApDetailData >tr").each(function(){
		$(this).find("td:first").text("");
	});	
}
//确定取消
function sureCancel(){
	var checkflag = false;
	var data = "";
	var indexflag = 0;
	$("#cancleApDetailData >tr").each(function(){
		var td1 = $(this).find("td:first").text();
		var apDetailId = $(this).attr("apDetailId");
		if(td1=="Y"){
			checkflag=true;
			data+="&apDetailList["+indexflag+"].id="+apDetailId;
			indexflag++;
		}
	});
	if(checkflag){
		data=data.substring(1);
		$("#sureCancel").attr("disabled",true);
		$.ajax({
			url: "apCloseBill!sureCancel.action",
			type: 'post',
			data:data,
			dataType: "json",
			async:false,
			error:function(){
				jAlert("请求失败!");
			},
			success: function(data){
				queryBy(currentoperateType,currentvendor);
			}
		});
	}else{
		jAlert("请选中取消的单据!");
	}
}