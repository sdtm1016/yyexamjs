//程序入口
$(document).ready(function(){
	//凭证类别初始化
	$.ajax({
		url: "dsignCategory!queryList",
		type: 'post',
		async:false,
		dataType: "json",
		error:function(){
			jAlert("请求失败!");
		},
		success: function(data){
			var dsignList =data.dsigns;
			$("#signList").empty();
			if(dsignList.length==0){
				jAlert("请首先初始化凭证类别！","提示信息",function(){
					//关闭当前窗体
					window.parent.closeWindow('pu_gb_tableview');
				});
			}else{
				var strHtml="";
				$.each(dsignList,function(index,dsign){
					strHtml+="<option value="+dsign.id+">"+strNullProc(dsign.ctext)+"</option>";
				});	
				$("#signList").empty().append(strHtml);
			}
		}
	});
	parentParam = window.parent.valueMap.get("pu_gb_tableview");
	//查询数据
	queryBy(parentParam.queryConditions,parentParam.touchingType,null);
});
//根据条件查询数据
function queryBy(queryConditions,touchingType,currentapDetailList){
	
	$("#title").html(touchingType);
	//制单日期设置为当前登陆日期
	$("#madeDate").val(getCookie("operDate"));
	var apDetailList = null;
	if(currentapDetailList==null){
		//查询制单数据
		$.ajax({
			url:"apDetail!queryTouchingBy.action",
			type:"post",
			data:queryConditions,
			async:false,
			dataType: "json",
			error:function(){
				jAlert("请求失败!");
			},
			success:function(data){
				apDetailList = data.apDetailList;
			}
		});
	}else{
		apDetailList = currentapDetailList;
	}
	if(apDetailList!=null){
		var strHtml="";
		var sign = $("#signList >option:selected").text();
		var len = apDetailList.length;
		for(var i=0;i<len;i++){
			//供应商id
			var vendorId = strNullProc(apDetailList[i].cdwcode);
			//供应商名称
			var cvenname="";
			//部门id
			var departmentId = strNullProc(apDetailList[i].cdeptcode);
			//部门名称
			var departmentName = "";
			
			//人员id
			var personId = strNullProc(apDetailList[i].cperson);
			//人员名称
			var personName = "";
			if(vendorId!=""){
				var vendor = getSupNameBy(vendorId);
				if(vendor!=null){
					cvenname=vendor.cvenname;
				}
			}
			if(departmentId!=""){
				var department = getDepartmentNameBy(departmentId);
				if(department!=null){
					departmentName=department.cdepname;
				}
			}
			if(personId!=""){
				var person = getPersonNameBy(personId);
				if(person!=null){
					personName=person.cpersonname;
				}
			}
			strHtml+="<tr ondblclick='checked(this);' onclick='selected(this);' >";
			strHtml+="	<td width='60'></td>";
			strHtml+="	<td width='74'>"+strNullProc(sign)+"</td>";
			strHtml+="	<td width='74' cvouchtype='"+apDetailList[i].cvouchtype+"'>"+changeBillType(apDetailList[i].cvouchtype)+"</td>";
			strHtml+="	<td width='86'>"+strNullProc(apDetailList[i].cvouchid)+"</td>";
			strHtml+="	<td width='76'>"+getStrDate(apDetailList[i].dregdate)+"</td>";
			strHtml+="	<td width='130'>"+cvenname+"</td>";
			strHtml+="	<td width='94'>"+departmentName+"</td>";
			strHtml+="	<td width='80'>"+personName+"</td>";
			strHtml+="	<td width='100'>"+strNullProc(apDetailList[i].icamount)+"</td>";
			strHtml+="</tr>";
		}
		$("#datarows").empty().append(strHtml);
		$("#dataCount").text(len);
	}else{
		$("#datarows").empty();
		$("#dataCount").text(0);
	}
	
}
//凭证类别转换功能
function signchange(){
	var sign = $("#signList >option:selected").text();
	//修改凭证类别
	$("#datarows").find("tr").each(function(){
		$(this).find("td:eq(1)").text(sign);
	});
}
//表格滚动条处理
function tableScroll(container){
	var table_header = document.getElementById("table_header");
	table_header.style.marginLeft = "-"+parseInt(container.scrollLeft)+"px";
}
//选中所有行
function checkAll(){
	$("#datarows").find("tr").each(function(index){
		$(this).find("td:first").text((index+1));
	});
}
//取消选中所有行
function cancelAll(){
	$("#datarows").find("tr").each(function(){
		$(this).find("td:first").text("");
	});	
}
//合并功能
function merge(){
	$("#datarows").find("tr").each(function(){
		var td1 = $(this).find("td:first").text();
		if(td1!=""){
			$(this).find("td:first").text(1);	
		}
	});
}
//双击选中
function checked(currentTr){
	var currentText=$(currentTr).find("td:first").text();
	if(currentText!=""){
		$(currentTr).find("td:first").text("");
	}else{
		//兄弟tr
		var siblingTr = $(currentTr).siblings();
		currentText=0;
		siblingTr.each(function(){
			var td1 = $(this).find("td:first").text();
			if(td1!=""){
				td1 = td1-0;
				if(td1>currentText){
					currentText = td1;
				}
			}
		});
		currentText++;
		$(currentTr).find("td:first").text(currentText);
	}
}
//选中行
function selected(currentTr){
	$(currentTr).css("backgroundColor","#00f").css("color","#fff").siblings().css("backgroundColor","#fff").css("color","#000");
}
//制单功能
function makeAccountingVoucher(){
	//允许制单标志
	var flag = false;
	$("#datarows").find("tr").each(function(){
		var td1 = $(this).find("td:first").text();
		if(td1!=""){
			flag=true;	
		}
	});
	if(!flag){
		jAlert("请选择要制单的数据！");
	}else{
		//批量制单时判断合并选项
		var coutnoIds=new Array();
		$("#datarows").find("tr").each(function(){
			//合并标志
			var td1 = $(this).find("td:first").text();
			if(td1!=""){
				//单据类型
				var td2 =  $(this).find("td:eq(2)").attr("cvouchtype");
				//单据号
				var td3 =  $(this).find("td:eq(3)").text();
				//凭证类别
				var signId = $("#signList").val();
				//制单日期
				var madeDate = $("#madeDate").val();
				//制单类型
				var touchingType = $("#title").text();
				coutnoIds.push({mergeFlag:td1,cvouchtype:td2,cvouchId:td3,signId:signId,madeDate:madeDate,touchingType:touchingType});
			}
		});
		window.parent.openWindow('pu_operate_dsign','pu_gb_tableview',{coutnoIds:coutnoIds});
	}
}
function changeBillType(cvouchtype){
	var returnData = "";
	switch(cvouchtype){
		case "01":
			returnData = "专用发票";
			break;
		case "02":
			returnData = "普通发票";
			break;
		case "03":
			returnData = "运费发票";
			break;
		case "04":
			returnData = "废旧物资收购凭证";
			break;
		case "05":
			returnData = "农副产品收购凭证";
			break;
		case "06":
			returnData = "其他发票";
			break;
		case "48":
			returnData = "核销";
			break;
		case "49":
			returnData = "核销";
			break;
	}
	return returnData;
}
//根据部门id获取部门名称
function getDepartmentNameBy(departmentid){
	var department=null;
	$.ajax({
	    url: "department!findDepartmentById",
	    data:"department.id="+departmentid,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	department = data.department;
	    }
	  });
	return department;
}
//根据供应商id获取供应商名称
function getSupNameBy(supid){
	var vendor=null;
	$.ajax({
	    url: "vendor!queryVendorById",
	    data:"vendor.id="+supid,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	vendor = data.vendor;
	    }
	  });
	return vendor;
}
//根据职员id获取职员名称
function getPersonNameBy(personid){
	var person=null;
	$.ajax({
	    url: "person!findPersonById",
	    data:"person.id="+personid,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	person = data.person;
	    }
	  });
	return person;
}
