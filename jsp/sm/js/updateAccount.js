//行业性质，用处同上
var ctradekind=null;
//当前显示的form面板
var CURRENT_SHOWED_PANEL_NAME="panel1";
//当前form面板的输入验证总状态（用于为“下一步”按钮提供执行参考）
var panelValidation=false;
//下一步
function next(){
	if(CURRENT_SHOWED_PANEL_NAME!=null){
		var panelIndex=parseInt(CURRENT_SHOWED_PANEL_NAME.toString().substring(5,6));
		if(panelIndex<4){
			document.getElementById(CURRENT_SHOWED_PANEL_NAME).style.display="none";
			document.getElementById("panel"+(panelIndex+1)).style.display="block";
			CURRENT_SHOWED_PANEL_NAME = "panel"+(panelIndex+1);
			document.getElementById("prevButton").disabled=false;
			if((panelIndex+1)==4){
				//禁用下一步
				document.getElementById("nextButton").disabled=true;
				//启用上一步
				document.getElementById("prevButton").disabled=false;
			}
		}
		disablPanel((panelIndex+1));
	}
}

//上一步
function prev(){
	if(CURRENT_SHOWED_PANEL_NAME!=null){
		var panelIndex=parseInt(CURRENT_SHOWED_PANEL_NAME.toString().substring(5,6));
		if(panelIndex>1){
			document.getElementById(CURRENT_SHOWED_PANEL_NAME).style.display="none";
			document.getElementById("panel"+(panelIndex-1)).style.display="block";
			CURRENT_SHOWED_PANEL_NAME = "panel"+(panelIndex-1);
			document.getElementById("nextButton").disabled=false;
			if((panelIndex-1)==1){
				//禁用上一步
				document.getElementById("prevButton").disabled=true;
				//启用下一步
				document.getElementById("nextButton").disabled=false;
			}
		}
		disablPanel((panelIndex-1));
	}
	
}

//根据panelIndex值启用和屏蔽完成按钮
function disablPanel(panelIndex){
	if(panelIndex<4){
		//禁用完成按钮
		document.getElementById("finisButton").disabled=true;
	}else{
		//启用完成按钮
		document.getElementById("finisButton").disabled=false;
	}
}
var currentLoginedUaAccount;
$(document).ready(function() {
	currentLoginedUaAccount = window.parent.document.getElementById("register").getElementsByTagName("iframe")[0].contentWindow.uaAccount;
	//根据当前登录操作员当前应用账套的id查询账套信息
	ctradekind = currentLoginedUaAccount.ctradekind;
	//取得账套号caccid 根据sysmanagerid和账套号查询账套信息
	var caccid = currentLoginedUaAccount.caccId;
	$.ajax({
	 	url:"uaAccount!findAboutBySysManagerId.action",
	 	type:"post",
	 	/* ifModified:true, */
	 	/* cache:false, */
	 	success:function(data,status){
	 		//existed 已存账套
	 		var uaAccountList = data.uaAccountAboutData.uaAccountList;
	 		$("#existed").empty();//清空下拉列表
//	 		$.each(uaAccountList,function(index,uaAccount){
//	 			$("#existed")[0].options.add(new Option("["+uaAccount.caccId+"]"+uaAccount.caccName,uaAccount.caccId,false,false));
//	 		});
	 		//centtype_s 企业类型 centtype
	 		var entTypeList = data.uaAccountAboutData.entTypeList;
	 		$("#centtype_s").empty();//清空下拉列表
	 		$.each(entTypeList,function(index,entType){
	 			$("#centtype_s")[0].options.add(new Option(entType.entName,entType.entName,false,false));
	 			//TODO 此处在出现浏览器兼容性问题时，尝试下面的方式
	 			//$("#existed").append("<option>["+uaAccount.caccId+"]"+uaAccount.caccName+"</option>");
	 		});
	 		$("#centtype").val(entTypeList[0].entName);
	 		//ctradekind_s 行业性质 ctradekind
	 		var glBtradeList = data.uaAccountAboutData.glBtradeList;
	 		$("#ctradekind_s").empty();//清空下拉列表
	 		$.each(glBtradeList,function(index,glBtrade){
	 			$("#ctradekind_s")[0].options.add(new Option(glBtrade.ctradeName,glBtrade.ctradeName,false,false));
	 			//TODO 此处在出现浏览器兼容性问题时，尝试下面的方式
	 			//$("#existed").append("<option>["+uaAccount.caccId+"]"+uaAccount.caccName+"</option>");
	 		});
	 		$("#ctradekind").val(glBtradeList[0].ctradeName);
	 		//caccMaster_s 操作员 caccMaster
	 		var uaUserList = data.uaAccountAboutData.uaUserList;
	 		$("#caccMaster_s").empty();//清空下拉列表
	 		$.each(uaUserList,function(index,uaUser){
	 			
	 			$("#caccMaster_s")[0].options.add(new Option("["+uaUser.cuserId+"]"+uaUser.cuserName,uaUser.cuserName,false,false));
	 			
	 			//TODO 此处在出现浏览器兼容性问题时，尝试下面的方式
	 			//$("#existed").append("<option>["+uaAccount.caccId+"]"+uaAccount.caccName+"</option>");
	 		});
	 		$("#caccMaster").val(uaUserList[0].cuserName);
			 $.ajax({
			 	url:"uaAccount!findOneBySysManagerIdAndcaccid.action",
			 	data:"uaAccount.caccId="+caccid,
			 	type:"post",
			 	success:function(data,status){
			 		
			 		var uaAccount = data.uaAccount;
			 		
			 		//为各输入控件赋值：
			 		$("#id").val(uaAccount.id);//id标识
			 		
			 		$("#caccId").val(uaAccount.caccId);//账套号
			 		//禁用账套号文本框
			 		//document.getElementById("caccId").disabled=true;
			 		
			 		$("#caccName").val(uaAccount.caccName);//账套名称
			 		//$("#caccPath").val(uaAccount.caccPath);//账套路径
			 		
			 		$("#iyear").val(uaAccount.iyear);//启用会计期年
			 		//禁用启用会计期年文本框
			 		//document.getElementById("iyear").disabled=true;
			 		
			 		//禁用会计期间设置按钮
			 		//document.getElementById("dateSetButton").disabled=true;
			 		
			 		
			 		$("#imonth").val(uaAccount.imonth);//启用会计期月
			 		$("#cunitname").val(uaAccount.cunitname);//单位名称
			 		$("#cunitabbre").val(uaAccount.cunitabbre);//单位简称
			 		$("#cunitaddr").val(uaAccount.cunitaddr);//单位地址
			 		$("#cunitlp").val(uaAccount.cunitlp);//法人代表
			 		$("#cunitzap").val(uaAccount.cunitzap);//邮编
			 		$("#cunittel").val(uaAccount.cunittel);//联系电话
			 		$("#cunitfax").val(uaAccount.cunitfax);//传真
			 		$("#cunitemail").val(uaAccount.cunitemail);//email
			 		$("#cunittaxno").val(uaAccount.cunittaxno);//税号
			 		$("#cfinkind").val(uaAccount.cfinkind);//备注一
			 		$("#cfintype").val(uaAccount.cfintype);//备注二
			 		
			 		$("#ccurcode").val(uaAccount.ccurcode);//本币代码
			 		//禁用本币代码文本框
			 		//document.getElementById("ccurcode").disabled=true;
			 		
			 		$("#ccurname").val(uaAccount.ccurname);//本币名称
			 		//禁用本币名称文本框
			 		//document.getElementById("ccurname").disabled=true;
			 		
			 		$("#centtype").val(uaAccount.centtype);//企业类型
			 		$("#centtype_s").val(uaAccount.centtype);//设置企业类型下拉项
			 		//禁用企业类型下拉列表
			 		//document.getElementById("centtype_s").disabled=true;
			 		
			 		$("#ctradekind").val(uaAccount.ctradekind);//行业性质
			 		$("#ctradekind_s").val(uaAccount.ctradekind);//设置行业性质下拉项
			 		
			 		$("#caccMaster").val(uaAccount.caccMaster);//默认账套主管
			 		$("#caccMaster_s").val(uaAccount.caccMaster);//设置默认账套主管下拉项
			 		//禁用企业类型下拉列表
			 		//document.getElementById("caccMaster_s").disabled=true;
			 		
			 	},
			 	error:function(data,status){
			 		jAlert(data.message);
			 	},
			 	dataType:"json"
			 });
	 	},
	 	dataType:"json",
	 	error:function(data,status){
	 		jAlert(data.message);
	 	}
	 });
	$.ajax({
		url:"uaAccount!findAccountBean.action",
		type:"post",
		success:function(data,status){
			var accountBean = data.accountBean;
			if (accountBean.inventoryclass == 'TRUE') {
				$("#inventory").attr("checked",true);
				$("#inventory").attr("disabled",true);
			}
			if(accountBean.customerclass == 'TRUE'){
				$("#client").attr("checked",true);
				$("#client").attr("disabled",true);
			}
			if (accountBean.vendorclass == 'TRUE') {
				$("#supplier").attr("checked",true);
				$("#supplier").attr("disabled",true);
			}
			if (accountBean.foreignCurrency == 'TRUE') {
				$("#foreignCurrency").attr("checked",true);
				$("#foreignCurrency").attr("disabled",true);
			}
		},
		dataType:"json",
		data:"accid="+currentLoginedUaAccount.id
	});
}); 

/**
 *修改账套提交函数
 */
function updateAccount(){
	var uaAccount = $("#updateForm").serialize();
	 $.ajax({
	 	url:"uaAccount!updateById.action",
	 	type:"post",
	 	success:function(data,status){
	 		if(data.message=="1"){
	 			var account = {
 					accid:currentLoginedUaAccount.id,
 					caccId:currentLoginedUaAccount.caccId,
 					caccName:currentLoginedUaAccount.caccName,
 					action:"upd"
	 			};
		 		window.parent.openWindow("addgrade","updateAccount",account);
	 		}else{

	 			jAlert("修改失败","提示信息",function(){

		 			window.parent.closeWindow("updateAccount");
	 			});

	 		}
	 	},
	 	dataType:"json",
	 	data:uaAccount+"&uaAccount.id="+currentLoginedUaAccount.id
	 });
	
	
}

//当行业性质下拉列表改变时：
function setCtradekindChange(){
	$('#ctradekind').val($('#ctradekind_s').val());
	ctradekind=$('#ctradekind_s').val();
	$('#glDprecodeCheckbox').attr('disabled',false);
	$('#glDprecodeSpan').attr('disabled',false);
}

	