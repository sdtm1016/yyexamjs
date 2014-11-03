/**
 * 采购类型js(lichunhui)
 */
//全局变量
//当前选中的td
var currentSelectTd = null;
//td的样式
var tdstyle = null;
//程序入口
$(document).ready(function(){
	selectPurchasetype();
});
/**
 *查询采购类型
 */
function selectPurchasetype(){
	$.ajax({
		url : "purchasetype!selectPurchasetype.action",
		type :'post',
		dateType :"json",
		async : false,
		success : function(data){
			var purchasetypeList = data.purchasetypeList;
			var strHtml="";
			for(var i=0;i<purchasetypeList.length;i++){
				strHtml+="<tr savetype='update' purchasetypeId='"+purchasetypeList[i].id+"' editerState='0'>";
				strHtml+="	<td  editerType='0' style='height:24px;width:160px;'>"+strNullProc(purchasetypeList[i].cptcode)+"</td>";
				strHtml+="	<td  editerType='0' style='height:24px;width:160px;'>"+strNullProc(purchasetypeList[i].cptname)+"</td>";
				strHtml+="	<td  editerType='1' style='height:24px;width:140px;' crdid='"+strNullProc(purchasetypeList[i].crdid)+"'>"+strNullProc(purchasetypeList[i].crdcode)+"</td>";
				var selectvalue = strNullProc(purchasetypeList[i].bdefault);
				var selecttext="";
				if(selectvalue==0){
					selecttext="是";
				}else{
					selecttext="否";
				}
				strHtml+="	<td  editerType='2' selectvalue='"+selectvalue+"' style='height:24px;width:140px;'>"+selecttext+"</td>";
				strHtml+="</tr>";
			}
			strHtml+="<tr id='addpurchasetypeline' savetype='add' addtype='0' purchasetypeId='-1' editerState='0'>";
			strHtml+="	<td  editerType='0' style='height:24px;width:160px;'></td>";
			strHtml+="	<td  editerType='0' style='height:24px;width:160px;'></td>";
			strHtml+="	<td  editerType='1' style='height:24px;width:140px;' crdid=''></td>";
			strHtml+="	<td  editerType='2' selectvalue='1' style='height:24px;width:140px;'></td>";
			strHtml+="</tr>";
			$("#include").empty().append(strHtml);
			//给内容表格添加单击事件
			$("#include >tr >td").unbind("click").bind("click",function(){
				selectTd(this);
			});
			$("#include >tr >td").unbind("dblclick").bind("dblclick",function(){
				editerTd(this);
			});
			if(currentSelectTd==null){
				//选中最后一行的第一个单元格
				selectTd($("#include >tr[savetype='add'] >td:first")[0]);
			}
		}
	});
}
//若果出出现滚动条则表头跟着滚动
function tableScroll(obj){
	var offset = parseInt(obj.scrollLeft,10);
	$("#tableheader_table").css("margin-left","-"+offset+"px");
}
function selectTd(currentTd){
	//删除按钮设置成是否可用
	if($(currentTd).parent().attr("savetype")=="add"){
		$("#deletepurchasetype").attr("disabled",true);
	}else{
		$("#deletepurchasetype").attr("disabled",false);
	}
	//增加按钮是否可用
	if($("#addpurchasetypeline").attr("addtype")==0){
		$("#addpurchasetype").attr("disabled",true);
	}else{
		$("#addpurchasetype").attr("disabled",false);
	}
	//放弃按钮设置不可用
	if($(currentTd).parent().attr("editerState")==0){
		$("#giveuppurchasetype").attr("disabled",true);	
	}else{
		$("#giveuppurchasetype").attr("disabled",false);
	}
	
	if(currentSelectTd!=null){
		if(currentSelectTd!=currentTd){
			updateInput(currentSelectTd);	
		}
		
		currentSelectTr = $(currentSelectTd).parent();
		currentTr = $(currentTd).parent();
		var cptcode = $.trim(currentSelectTr.find("td:first").text());
		var cptname = $.trim(currentSelectTr.find("td:eq(1)").text());
		var crdcode = $.trim(currentSelectTr.find("td:eq(2)").text());
		var bdefault = $.trim(currentSelectTr.find("td:eq(3)").text());
		if(currentSelectTr.attr("purchasetypeId")!=currentTr.attr("purchasetypeId")){
			if(!(currentSelectTr.attr("savetype")=="add"&&cptcode==""&&cptname==""&&crdcode==""&&bdefault=="")){
				//保存数据(添加或者修改)
				var saveflag = savepurchasetype(currentSelectTd);
				//若果没有保存成功则退出
				if(!saveflag||currentSelectTr.attr("savetype")=="add"){
					return;
				}
			}
		}
		currentSelectTd.style.cssText=tdstyle;
	}
	tdstyle = currentTd.style.cssText;
	$(currentTd).css("border","1px dashed #666");
	currentSelectTd = currentTd;
	$(currentTd).parent().attr("editerState","0");
}
//编辑td
function editerTd(currentTd){
	//修改增加状态
	if($(currentTd).parent().attr("savetype")=="add"){
		$("#addpurchasetypeline").attr("addtype","1");
	}
	//放弃按钮的状态
	$(currentTd).parent().attr("editerState","1");
	var strHtml = "";
	var editerType = $(currentTd).attr("editerType")-0;
	switch(editerType){
	case 0:
		strHtml+="<input type='text' style='margin:0px;width:96%;border:none' value='"+$(currentTd).text()+"' />";
		break;
	case 1:
		strHtml+="<input type='text' style='margin:0px;width:120px;border:none' value='"+$(currentTd).text()+"' onfocus=\"dofocustoenter('RdStyle',this,'','','','')\" /><input type='button' class='finder' style='width:15px;height:15px;'  onclick='window.parent.openWindow(\"pu_purchasetype_lb\",\"pu_purchasetype_item\");' >";
		break;
	case 2:
		strHtml+="<select style='margin:0px;width:96%;' ><option value='0'>是</option><option value='1'>否</option><select>";
		break;
	}
	$(currentTd).empty().append(strHtml);
	if(editerType!=2){
		$(currentTd).find("input")[0].focus();	
	}else{
		var selectvalue = $(currentTd).attr("selectvalue");
		$(currentTd).find("select").val(selectvalue);
	}
	//若果是编辑状态则只能是放弃按钮能用其余按钮不能用
	$("#addpurchasetype").attr("disabled",true);
	$("#deletepurchasetype").attr("disabled",true);
	$("#giveuppurchasetype").attr("disabled",false);
}
//向表格中赋值
function updateInput(obj){
	var editerType = $(obj).attr("editerType")-0;
	switch(editerType){
	case 0:
		$(obj).text($(obj).find("input").val());
		break;
	case 1:
		$(obj).text($(obj).find("input").val());
		break;
	case 2:
		if($(obj).find("select").length>0){
			$(obj).attr("selectvalue",$(obj).find("select").val());
			$(obj).text($(obj).find("select >option:selected").text());
		}
		break;
	}
}
//放弃按钮的功能函数
function giveuppurchasetype(){
	/*
	//增加行设成初始状态
	$("#addpurchasetypeline").attr("addtype","0");
	if(currentSelectTd!=null){
		//选中行行的第一列
		selectTd($(currentSelectTd).parent().find("td:first")[0]);
	}
	*/
	refresh();
}
//是否关闭窗体的标志
var closewindowflag = 0;
//点击叉时关闭窗体
function onWindowClose(){
	updateInput(currentSelectTd);
	if(closewindowflag==1){
		return true;
	}
	var flag = checkClosewindow();
	return flag;
}
//检查是否保存数据
function checkClosewindow(){
	var checkvalue = $.trim($("#addpurchasetypeline >td:first").text());
	if(checkvalue!=""){
		jConfirm("是否保存对当前记录的修改?", '提示!', function(confirmflag){
			if(confirmflag){
				//console.log("保存数据");
				//console.log("请将简历发送至 %c ps_recruiter@baidu.com（ 邮件标题请以“姓名-应聘XX职位-来自console”命名）","color:red");console.log("职位介绍：http://dwz.cn/hr2013");
				var saveflag = savepurchasetype($("#addpurchasetypeline >td:first")[0]);
				if(saveflag){
					closewindowflag = 1;
					window.parent.closeWindow('pu_purchasetype_item');	
				}else{
					closewindowflag = 0;
				}
			}else{
				closewindowflag = 1;
				window.parent.closeWindow('pu_purchasetype_item');
			}
		});
		return false;
	}else{
		return true;
	}
}
//保存采购类型
function savepurchasetype(currentSelectTd){
	var checkflag = savepurchasetypecheck(currentSelectTd);
	if(!checkflag){
		return checkflag;
	}
	var cptid = currentSelectTr.attr("purchasetypeId");
	var cptcode = $.trim(currentSelectTr.find("td:first").text());
	var cptname = $.trim(currentSelectTr.find("td:eq(1)").text());
	var crdcode = $.trim(currentSelectTr.find("td:eq(2)").text());
	var crdid = currentSelectTr.find("td:eq(2)").attr("crdid");
	var bdefault = $.trim(currentSelectTr.find("td:eq(3)").attr("selectvalue"));
	//调用方法的url
	var url="";
	//数据
	var purchasetype ="";
		purchasetype += "purchasetype.cptcode=" + cptcode; 
		purchasetype += "&purchasetype.cptname="+cptname;
		if(crdid!=""){
			purchasetype += "&purchasetype.crdcode="+crdcode;
			purchasetype += "&purchasetype.crdid="+crdid;
		}
		purchasetype += "&purchasetype.bdefault="+bdefault;
	if(currentSelectTr.attr("savetype")=="update"){
		//console.log("更新数据");
		url="purchasetype!update.action";
		purchasetype += "&purchasetype.id="+cptid;
	}else{
		//console.log("添加数据");
		url="purchasetype!create.action";
	}
	//如果检查通过保存数据
	if(checkflag){
		$.ajax({
			url : url,
			type : 'post',
			data : purchasetype,
			dataType : "json",
			async : false,
			error:function(){
				jAlert("请求失败!");
				checkflag = false;
			},
			success : function(data) {
				if(currentSelectTr.attr("savetype")=="add"){
					refresh();
				}
			}
		});
	}
	return checkflag;
}
//保存前检查数据是否可保存
function savepurchasetypecheck(currentSelectTd){
	var checkflag = true;
	currentSelectTr = $(currentSelectTd).parent();
	var td1 = $.trim(currentSelectTr.find("td:first").text());
	var td2 = $.trim(currentSelectTr.find("td:eq(1)").text());
	var td3 = $.trim(currentSelectTr.find("td:eq(2)").text());
	var td4 = $.trim(currentSelectTr.find("td:eq(3)").text());
	if(td1!=""||td2!=""||td3!=""||td4!=""){
		if(td1==""){
			jAlert("采购类型编码不能为空,请输入!","提示信息",function(){
				currentSelectTr.find("td:first").click().dblclick();
			});
			checkflag=false;
		}else if(td2==""){
			jAlert("采购类型名称不能为空,请输入!","提示信息",function(){
				currentSelectTr.find("td:eq(1)").click().dblclick();
			});
			checkflag=false;
		}else{
			checkflag = checkdistinc(currentSelectTr);
		}
	}
	return checkflag;
}
//检查是否有重复数据
function checkdistinc(currentSelectTr){
	var distincflag = true;
	var td1 = $.trim(currentSelectTr.find("td:first").text());
	var td2 = $.trim(currentSelectTr.find("td:eq(1)").text());
	$("#include >tr").each(function(){
		if(currentSelectTr.attr("purchasetypeId")!=$(this).attr("purchasetypeId")){
			var thisT1 = $.trim($(this).find("td:first").text());
			var thisT2 = $.trim($(this).find("td:eq(1)").text());
			if(td1==thisT1){
				jAlert("该采购类型已经存在,不能增加或修改!","提示信息",function(){
					currentSelectTr.find("td:first").click().dblclick();
				});
				distincflag = false;
			}else if(td2==thisT2){
				jAlert("该采购类型已经存在,不能增加或修改!","提示信息",function(){
					currentSelectTr.find("td:eq(1)").click().dblclick();
				});
				distincflag = false;
			}
		}
	});
	return distincflag;
}
//添加按钮的调用方法
function addpurchasetype(){
	//$("#addpurchasetypeline")[0].click();
	var checkflag = true;
	currentSelectTr = $("#addpurchasetypeline");
	var td1 = $.trim(currentSelectTr.find("td:first").text());
	var td2 = $.trim(currentSelectTr.find("td:eq(1)").text());
	if(td1==""){
		jAlert("采购类型编码不能为空,请输入!","提示信息",function(){
			currentSelectTr.find("td:first").click().dblclick();
		});
		checkflag=false;
	}else if(td2==""){
		jAlert("采购类型名称不能为空,请输入!","提示信息",function(){
			currentSelectTr.find("td:eq(1)").click().dblclick();
		});
		checkflag=false;
	}else{
		checkflag = checkdistinc(currentSelectTr);
	}
	
	if(checkflag){
		savepurchasetype($("#addpurchasetypeline >td:first")[0]);	
	}
	
}
//删除按钮的调用方法
function deletepurchasetype(){
	var str = "确实要删除采购类型---"+$.trim($(currentSelectTd).parent().find("td:eq(1)").text())+" 吗?";
	jConfirm(str, '提示信息', function(confirmflag){
		if(confirmflag){
			//数据
			var purchasetype ="purchasetype.id="+$(currentSelectTd).parent().attr("purchasetypeId");;
			$("#deletepurchasetype").attr("disabled",true);
			$.ajax({
				url : "purchasetype!delete.action",
				type : 'post',
				data : purchasetype,
				dataType : "json",
				async : false,
				error:function(){
					jAlert("请求失败!");
					$("#deletepurchasetype").attr("disabled",false);
				},
				success : function(data) {
					refresh();
				}
			});
		}
	});
}
//刷新函数
function refresh(){
	//清空数据
	//当前选中的td
	currentSelectTd = null;
	//td的样式
	tdstyle = null;
	selectPurchasetype();
}
//返回的值
function deliverValue(valueObject){
	$(currentSelectTd).attr("crdid",valueObject.cId).find("input:first").val(valueObject.cname);
}