/**
 * author：陈雪峰
 * 付款条件的增加，添加完成后，点击“增加”录入成功
 * 付款条件的查找  
 * 付款条件的删除 
 * 付款条件的修改，双击当前所有的表格，修改完成后，点击“修改”录入成功
 */

/**
 * 初始化查找
 */
$(document).ready(function(){
	queryAll();
});
var action = null;
var currentEditRow = null;
/**
*	显示所有付款条件
*/
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
				$("#include").append('<tr id="'+payCondList[i].id+'" name="'+payCondList[i].cpaycode+'" bgcolor="#ffffff">'
						+'<td onclick="selectTd(this)" >'+strNullProc(payCondList[i].cpaycode)+'</td>'
						+'<td onclick="selectTd(this)" readonly="readonly" bgcolor="#cccccc">'+strNullProc(payCondList[i].cpayname)+'</td>'
						+'<td onclick="selectTd(this)" ondblclick="paySelected(this);">'+strNullProc(payCondList[i].ipaycredays)+'</td>'
						+'<td onclick="selectTd(this)" ondblclick="paySelected(this);">'+strNullProc(payCondList[i].ipayfadays1)+'</td>'
						+'<td onclick="selectTd(this)" ondblclick="paySelected(this);">'+strNullProc(payCondList[i].ipayfarate1)+'</td>'
						+'<td onclick="selectTd(this)" ondblclick="paySelected(this);">'+strNullProc(payCondList[i].ipayfadays2)+'</td>'
						+'<td onclick="selectTd(this)" ondblclick="paySelected(this);">'+strNullProc(payCondList[i].ipayfarate2)+'</td>'
						+'<td onclick="selectTd(this)" ondblclick="paySelected(this);">'+strNullProc(payCondList[i].ipayfadays3)+'</td>'
						+'<td onclick="selectTd(this)" ondblclick="paySelected(this);">'+strNullProc(payCondList[i].ipayfarate3)+'</td>'
						+'<td onclick="selectTd(this)" ondblclick="paySelected(this);">'+strNullProc(payCondList[i].ipayfadays4)+'</td>'
						+'<td onclick="selectTd(this)" ondblclick="paySelected(this);">'+strNullProc(payCondList[i].ipayfarate4)+'</td>'
						+'</tr>');
			}
			//设置编辑状态
			setStatus(false);
			//选中第一行第一个单元格
			if(payCondList.length>0){
				selectTd($("#include >tr:first >td").eq(1)[0]);
			}
			
		}
		
	});
}
//设置按钮状态state:true 是编辑专题。state:false 不编辑专题
function setStatus(state){
	if(state){
		//添加,删除,修改按钮置灰
		$("#addPayCondition").attr("disabled",true);
		$("#deletePayCondition").attr("disabled",true);
		$("#updatePayCondition").attr("disabled",true);
		//放弃,保存按钮可操作
		$("#giveupPayCondition").attr("disabled",false);
		$("#savePayCondition").attr("disabled",false);
	}else{
		//添加,删除,修改按钮置灰
		$("#addPayCondition").attr("disabled",false);
		$("#deletePayCondition").attr("disabled",false);
		$("#updatePayCondition").attr("disabled",false);
		//放弃,保存按钮可操作
		$("#giveupPayCondition").attr("disabled",true);
		$("#savePayCondition").attr("disabled",true);
		$("#addPayConditionContent").css("display","none");
		action = null;
		$("#addPayConditionContent").children("td").children("input").val("");
	}
}
//退出调用 陈建宇页面方法
function exitWindow(){
	window.parent.closeWindow('payCondition');
}
/**
*	添加付款条件的输入列
*/
function add(){
	action="add";
	if($("#addPayConditionContent")[0].style.display=="none"){
		$("#addPayConditionContent")[0].style.display="";
		//$("#cpaycode").focus();
	}
	var strHtml = "";
	strHtml+="<td id='cpaycode' onclick='selectTd(this)' ondblclick='paySelected(this);'></td>";
	strHtml+="<td onclick='selectTd(this)' readonly='readonly' bgcolor='#cccccc'></td>";
	strHtml+="<td onclick='selectTd(this)' ondblclick='paySelected(this);'></td>";
	strHtml+="<td onclick='selectTd(this)' ondblclick='paySelected(this);'></td>";
	strHtml+="<td onclick='selectTd(this)' ondblclick='paySelected(this);'></td>";
	strHtml+="<td onclick='selectTd(this)' ondblclick='paySelected(this);'></td>";
	strHtml+="<td onclick='selectTd(this)' ondblclick='paySelected(this);'></td>";
	strHtml+="<td onclick='selectTd(this)' ondblclick='paySelected(this);'></td>";
	strHtml+="<td onclick='selectTd(this)' ondblclick='paySelected(this);'></td>";
	strHtml+="<td onclick='selectTd(this)' ondblclick='paySelected(this);'></td>";
	strHtml+="<td onclick='selectTd(this)' ondblclick='paySelected(this);'></td>";
	$("#addPayConditionContent").empty().append(strHtml);
	$("#addPayConditionContent >td:first")[0].ondblclick();
	setStatus(true);
}
//获取值
function getvalue(obj){
	if(obj.find("input").length>0){
		return obj.find("input").val();
	}else{
		return obj.text();
	}
}
/**
 * 列值比较函数
 * 优惠天数不能大于信用天数
 * 优惠天数应逐级递增
 * 优惠率应逐级递减
 */
function compare(input){
	if($(input).parent().attr("id")!="cpaycode"){
		if(isNaN($(input).val())){
			jAlert("请输入数字!","提示信息",function(){
				$(input).val("").focus();
			});
			return false;
		}
	}
	var currentTr = $(input).parent().parent();
	var payDays = parseInt(getvalue(currentTr.find("td").eq(2)));
	var days1 = parseInt(getvalue(currentTr.find("td").eq(3)));
	var days2 = parseInt(getvalue(currentTr.find("td").eq(5)));
	var days3 = parseInt(getvalue(currentTr.find("td").eq(7)));
	var days4 = parseInt(getvalue(currentTr.find("td").eq(9)));
	var rate1 = parseFloat(getvalue(currentTr.find("td").eq(4)));
	var rate2 = parseFloat(getvalue(currentTr.find("td").eq(6)));
	var rate3 = parseFloat(getvalue(currentTr.find("td").eq(8)));
	var rate4 = parseFloat(getvalue(currentTr.find("td").eq(10)));
	if(days1>payDays){
		jAlert("优惠天数不能大于信用天数！","提示信息",function(){
			$(input).focus();
			$(input)[0].select();
		});
		return ;
	}
	if(days2>payDays){
		jAlert("优惠天数不能大于信用天数！","提示信息",function(){
			$(input).focus();
			$(input)[0].select();
		});
		return false;
	}
	if(days3>payDays){
		jAlert("优惠天数不能大于信用天数！","提示信息",function(){
			$(input).focus();
			$(input)[0].select();
		});
		return false;
	}
	if(days4>payDays){
		jAlert("优惠天数不能大于信用天数！","提示信息",function(){
			$(input).focus();
			$(input)[0].select();
		});
		return false;
	}
	if(days2<=days1){
		jAlert("优惠天数应逐级递增！","提示信息",function(){
			$(input).focus();
			$(input)[0].select();
		});
		return false;
	}
	if(days3<=days2){
		jAlert("优惠天数应逐级递增！","提示信息",function(){
			$(input).focus();
			$(input)[0].select();
		});
		return false;
	}
	if(days4<=days3){
		jAlert("优惠天数应逐级递增！","提示信息",function(){
			$(input).focus();
			$(input)[0].select();
		});
		return false;
	}
	if(rate2>=rate1){
		jAlert("优惠率应逐级递减！","提示信息",function(){
			$(input).focus();
			$(input)[0].select();
		});
		return false;
	}
	if(rate3>=rate2){
		jAlert("优惠率应逐级递减！","提示信息",function(){
			$(input).focus();
			$(input)[0].select();
		});
		return false;
	}
	if(rate4>=rate3){
		jAlert("优惠率应逐级递减！","提示信息",function(){
			$(input).focus();
			$(input)[0].select();
		});
		return false;
	}
	return true;
}
/**
*	点保存按钮，添加数据
*/
function save(){
	if(action=="add"){
		var currentTr = $("#addPayConditionContent").children("td");
		
		var cpaycode = currentTr.eq(0).text();
		var cpayname = currentTr.eq(2).text();
		var payRate1=currentTr.eq(4).text();
		var payDay1=currentTr.eq(3).text();
		var payRate2=currentTr.eq(6).text();
		var payDay2=currentTr.eq(5).text();
		var payRate3=currentTr.eq(8).text()
		var payDay3=currentTr.eq(7).text();
		var payRate4=currentTr.eq(10).text();
		var payDay4=currentTr.eq(1).text();
		var days=currentTr.eq(2).text();

		
		if (cpaycode=="") {
			jAlert("编码不允许为空！","提示信息",function(){
				currentTr.eq(0)[0].ondblclick();
				$(currentTr.eq(0)).find("input").focus();
			});
			return false;
		}
		if (cpayname=="") {
			jAlert("信用天数不允许为空！","提示信息",function(){
				currentTr.eq(2)[0].ondblclick();
				$(currentTr.eq(2)).find("input").focus();
			});
			return false;
		}
		if(days!=null){
			var strHtml = "";
			if(payRate1!=0&payRate1!=""&payDay1!=0&payDay1!=""){
				strHtml+=payRate1+"/"+payDay1+",";
			}
			if(payRate2!=0&payRate2!=""&payDay2!=0&payDay2!=""){
				strHtml+=payRate2+"/"+payDay2+",";
			}
			if(payRate3!=0&payRate3!=""&payDay3!=0&payDay3!=""){
				strHtml+=payRate3+"/"+payDay3+",";
			}
			if(payRate4!=0&payRate4==""&payDay4!=0&payDay4!=""){
				strHtml+=payRate4+"/"+payDay4+",";
			}
			if(days!=0&days!=""){
				strHtml+="n/"+days;
			}
			cpayname=strHtml;
		}
		var payCon = "payCondition.cpaycode="+cpaycode
		+"&payCondition.cpayname="+cpayname
		+"&payCondition.ipaycredays="+days
		+"&payCondition.ipayfadays1="+payDay1
		+"&payCondition.ipayfarate1="+payRate1
		+"&payCondition.ipayfadays2="+payDay2
		+"&payCondition.ipayfarate2="+payRate2
		+"&payCondition.ipayfadays3="+payDay3
		+"&payCondition.ipayfarate3="+payRate3
		+"&payCondition.ipayfadays4="+payDay4
		+"&payCondition.ipayfarate4="+payRate4
		//判断编码是否唯一
		$.ajax({
			url: "payCondition!isUniquenessPayConditionByCode.action",
			type: 'post',
			data:payCon,
			dataType: "json",
			success: function(data){
			if(data.isuniqueness==false){
					jAlert("该编码已经被使用，请重新输入编码!","提示信息",function(){
						$("#cpaycode").focus();
					});
					return false;
				}
			else {
				$.ajax({
				    url: "payCondition!create.action",
				    type: 'post',
				    data: payCon,
				    dataType: "json",
				    success: function(data){
				    	queryAll();
				    }
				 });
			}
			}
		  });
		  
	}
	if(action=="update"){
		var row = currentEditRow;
		var cpaycode = row.cells[0].innerHTML;
		var cpayname = row.cells[1].innerHTML;
		var ipaycredays = row.cells[2].innerHTML;
		var ipayfadays1 = row.cells[3].innerHTML;
		var ipayfarate1 = row.cells[4].innerHTML;
		var ipayfadays2 = row.cells[5].innerHTML;
		var ipayfarate2 = row.cells[6].innerHTML;
		var ipayfadays3 = row.cells[7].innerHTML;
		var ipayfarate3 = row.cells[8].innerHTML;
		var ipayfadays4 = row.cells[8].innerHTML;
		var ipayfarate4 = row.cells[10].innerHTML;
		var payCon = "";
		if (cpaycode=="") {
			jAlert("编码不允许为空！","提示信息",function(){
				row.cells[0].ondblclick();
				$(row.cells[0]).find("input").focus();
			});
			return false;
		}
		if(ipaycredays==""){
			jAlert("信用天数不允许为空!","提示信息",function(){
				row.cells[2].ondblclick();
				$(row.cells[2]).find("input").focus();
			});
			return false;
		}
		if(ipaycredays!=null){
			var strHtml = "";
			if(ipayfadays1!=0&ipayfadays1!=""&ipayfarate1!=0&ipayfarate1!=""){
				strHtml+=ipayfadays1+"/"+ipayfarate1+",";
			}
			if(ipayfadays2!=0&ipayfadays2!=""&ipayfarate2!=0&ipayfarate2!=""){
				strHtml+=ipayfadays2+"/"+ipayfarate2+",";
			}
			if(ipayfadays3!=0&ipayfadays3!=""&ipayfarate3!=0&ipayfarate3!=""){
				strHtml+=ipayfadays3+"/"+ipayfarate3+",";
			}
			if(ipayfadays4!=0&ipayfadays4==""&ipayfarate4!=0&ipayfarate4!=""){
				strHtml+=ipayfadays4+"/"+ipayfarate4+",";
			}
			if(ipaycredays!=0&ipaycredays!=""){
				strHtml+="n/"+ipaycredays;
			}
			cpayname = strHtml;
		}
		payCon = "payCondition.cpaycode="+cpaycode
		+"&payCondition.cpayname="+cpayname
		+"&payCondition.ipaycredays="+ipaycredays
		+"&payCondition.ipayfadays1="+ipayfadays1
		+"&payCondition.ipayfarate1="+ipayfarate1
		+"&payCondition.ipayfadays2="+ipayfadays2
		+"&payCondition.ipayfarate2="+ipayfarate2
		+"&payCondition.ipayfadays3="+ipayfadays3
		+"&payCondition.ipayfarate3="+ipayfarate3
		+"&payCondition.ipayfadays4="+ipayfadays4
		+"&payCondition.ipayfarate4="+ipayfarate4
		//var payCon = $("#addPayCondition").children("td").children("input").serialize();
		var id=editId;
		$.ajax({
		    url: "payCondition!update.action?payCondition.id="+id,
		    type: 'post',
		    data:payCon,
		    dataType: "json",
		    success: function(data){
		    	//jAlert("修改成功！");
		    	queryAll();	
		    }
		  });
	}	
}

/**
 * 选择当前所有操作的行，并获取此条数据的主ID
 */
var cstd=null;
var tdstyle=null;
var payConditionId=null;
function selectTd(td){
	if(cstd!=null){
		cstd.style.cssText=tdstyle;
	}
	tdstyle=td.style.cssText;
	td.style.border="1px dashed #ccc";
	cstd = td;
	payConditionId=td.parentNode.id;
	
}
/**
*	删除当前选中的付款条件
*/
function del(){
	var id = payConditionId;
	jConfirm("确定要删除选中的记录吗?", '确认对话框', function(confirmflag){
		if(confirmflag){
			//js判断
			var sourceValue = 	id;
			var sourceTable = 	"PAYCONDITION";
			var sourceField = 	"cpaycode";
			var isExits = isExitsTableRef(sourceValue, sourceTable, sourceField);
			if (isExits==true) {
				jAlert("该付款条件已经被使用，不能删除!");
			    return false;			
			}
			else if (isExits==false) {
				$.ajax({
				    url: "payCondition!delete.action?payCondition.id="+id,
				    type: 'post',
				    dataType: "json",
				    error:function(){
				    	jAlert("请求失败!");
				    },
				    success: function(data){
				    	if(data.isdelete==true){
							//jAlert("删除成功！");
						}else{
							jAlert("该付款条件已经被使用，不能删除!");
							return false;
						}
				    	queryAll();
				    }
				 });
			}
		}else{
			return false;
		}
	});
}
/**
 * 修改
 */
function update() {
	action="update";
	setStatus(true);
}
//放弃按钮 的操作
function giveup(){
	setStatus(false);
}
/**
*	修改当前选中的付款条件
*/
function paySelected(cell){
	if(action=="update"){
		var inputCount = cell.getElementsByTagName("input").length;
		if(inputCount==0){
			var tempValue = cell.innerHTML;
			cell.innerHTML="<input onblur='a(this)' type='text' style='border:0;background:transparent;width:50px;' value='"+tempValue+"'/>";
			cell.getElementsByTagName("input")[0].focus();
		}
		currentEditRow = cell.parentNode;
		editId=cell.parentNode.id;
	}else if(action=="add"){
		if($(cell).parent().attr("id")=="addPayConditionContent"){
			var inputCount = cell.getElementsByTagName("input").length;
			if(inputCount==0){
				var tempValue = cell.innerHTML;
				cell.innerHTML="<input onblur='a(this)' type='text' style='border:0;background:transparent;width:50px;' value='"+tempValue+"'/>";
				cell.getElementsByTagName("input")[0].focus();
			}
			currentEditRow = cell.parentNode;
			editId=cell.parentNode.id;
		}
	}
}
function a(input){
	var flag = compare(input);
	if(flag){
		var tempValue = input.value;
		input.parentNode.innerHTML=tempValue;
	}
}

