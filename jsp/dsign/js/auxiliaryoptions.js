
//取得父窗体传来的值
var parentParam = window.parent.valueMap.get("dsign_auxiliaryoptions");
var curcodeAddInfo = parentParam.curcodeAddInfo;


//页面加载完后，如果有传入的值，则填充进表单
$(document).ready(function(){

	//curcodeAddInfo = parentParam.curcodeAddInfo ;


	var trs = document.getElementById("formTable").getElementsByTagName("tr");


	for(var i=0;i<trs.length;i++){
		trs[i].style.display="none";
	}
	
	
	
	//显示填写项:

	//项目核算
	if(curcodeAddInfo[0]==1){
		$("#subjectProjectTr").show();
	}
	
	//部门核算
	if(curcodeAddInfo[1]==1){
		$("#subjectDeptTr").show();
	}
	
	//个人核算
	if(curcodeAddInfo[2]==1){
		$("#subjectPersonTr").show();
		$("#subjectDeptTr").show();
		$("#ticketNumberTr").show();
		$("#subjectDateTr").show();
	}
	
	//客户核算
	if(curcodeAddInfo[3]==1){
		$("#subjectCustomerTr").show();
		$("#subjectBusinessTr").show();
		//$("#subjectJsfsTr").show();
		$("#ticketNumberTr").show();
		$("#subjectDateTr").show();
	}
	
	//供应商核算
	if(curcodeAddInfo[4]==1){
		$("#subjectSupTr").show();
		$("#subjectBusinessTr").show();
		//$("#subjectJsfsTr").show();
		$("#ticketNumberTr").show();
		$("#subjectDateTr").show();
	}
	
	

	//结算方式(银行科目)、银行账
	if(curcodeAddInfo[5]!="" || curcodeAddInfo[8]!=""){
		$("#subjectJsfsTr").show();
		$("#ticketNumberTr").show();
		$("#subjectDateTr").show();
	}
	
	
	//数量核算
	if(curcodeAddInfo[6]!=""){
		$("#subjectNumberTr").show();
		$("#subjectPriceTr").show();
		$("#jldw").html(curcodeAddInfo[6]);
	}
	
	
	
	
	
	
	//如果items为Null，说明为新增，不为修改。不为null时，为修改
	if(parentParam.items!=null){
		
		
		


		//项目
		$("#subjectProject").attr("dbValue",strNullProc(parentParam.items.subjectProjectId));
		$("#subjectProject").val(strNullProc(parentParam.items.subjectProjectName));
		
		//部门
		$("#subjectDept").attr("dbValue",strNullProc(parentParam.items.subjectDeptId));
		$("#subjectDept").val(strNullProc(parentParam.items.subjectDeptName));
	
		//个人
		$("#subjectPerson").attr("dbValue",strNullProc(parentParam.items.subjectPersonId));
		$("#subjectPerson").val(strNullProc(parentParam.items.subjectPersonName));

		

		//客户
		$("#subjectCustomer").attr("dbValue",strNullProc(parentParam.items.subjectCustomerId));
		$("#subjectCustomer").val(strNullProc(parentParam.items.subjectCustomerName));
		
		
		///供应商
		$("#subjectSup").attr("dbValue",strNullProc(parentParam.items.subjectSupId));
		$("#subjectSup").val(strNullProc(parentParam.items.subjectSupName));
		
		
		
		//业务员
		$("#subjectBusiness").attr("dbValue",strNullProc(parentParam.items.subjectBusinessId));
		$("#subjectBusiness").val(strNullProc(parentParam.items.subjectBusinessName));

		//结算方式
		$("#subjectJsfs").attr("dbValue",strNullProc(parentParam.items.subjectJsfsId));
		$("#subjectJsfs").val(strNullProc(parentParam.items.subjectJsfsName));
	
		//票号
		$("#ticketNumber").val(strNullProc(parentParam.items.ticketNumber));

		var dis = document.getElementById("subjectDateTr").style.display;
		var subjectDate=parentParam.items.subjectDate;
		if(subjectDate==""){
			subjectDate=getCookie("operDate");
		}
		if(dis!="none"){
			//发生日期
			$("#subjectDate").val(subjectDate);
		}else{
			$("#subjectDate").val("");
		}

		//单价
		$("#subjectPrice").val(strNullProc(parentParam.items.subjectPrice));
		//数量
		$("#subjectNumber").val(strNullProc(parentParam.items.subjectNumber));
	}
	
	
	
	for(var i=0;i<trs.length;i++){
		var dis = trs[i].style.display;
		if(dis!="none"){
			var ipt = trs[i].getElementsByTagName("input");
			if(ipt.length>0){
				ipt[0].focus();
				break;
			}
		}
		
	}
	
	
	
	
	
	
	
	
});




/**
 * 清空科目辅助核算信息
 */
function clearCodeAddInitInfo() {
	 //个人核算 
	 $("#subjectPerson").val("");
	 $("#subjectPerson").attr("dbValue","");
	 
	//部门核算
	 $("#subjectDept").val("");
	 $("#subjectDept").attr("dbValue","");
	 
	//客户核算
	 $("#subjectCustomer").val("");
	 $("#subjectCustomer").attr("dbValue","");
	 
	//供应商核算
	 $("#subjectSup").val("");
	 $("#subjectSup").attr("dbValue","");
	 
	//业务员核算
	 $("#subjectBusiness").val("");
	 $("#subjectBusiness").attr("dbValue","");
	 
	//项目核算
	 //$("#subjectProject").val("");
	 //$("#subjectProject").attr("dbValue","");
	 
	 //结算方式
	 $("#subjectJsfs").val("");
	 $("#subjectJsfs").attr("dbValue","");
	 
	//票号日期核算
	 $("#ticketNumber").val("");
	 $("#ticketNumber").attr("dbValue","");
	 
	 $("#subjectDate").val("");
	 $("#subjectDate").attr("dbValue","");
	 
	//单价数量核算
	 $("#subjectPrice").val("");
	 $("#subjectPrice").attr("dbValue","");
	 
	 
	 $("#subjectNumber").val("");
	 $("#subjectNumber").attr("dbValue","");
	 $("#units").html("");
	 
}




//本窗体弹窗返回值目的地标记，用在deliverValue函数里的判断
var target = null;






//实现弹窗返回值处理接口
function deliverValue(valueObject){
	switch(target){
	   //如果是“项目”
		case "subjectProject":
			$("#"+target).attr("dbValue",strNullProc(valueObject.citemId+"|"+valueObject.citemClass));
			$("#"+target).val(strNullProc(valueObject.gradename));
		break;
		
		//如果是“部门”
		case "subjectDept":
			$("#"+target).attr("dbValue",strNullProc(valueObject.id));
			$("#"+target).val(strNullProc(valueObject.cname));
		break;
		
		//如果是“个人”
		case "subjectPerson":
			$("#"+target).attr("dbValue",strNullProc(valueObject.id));
			$("#"+target).val(strNullProc(valueObject.cname));
		break;
		
		//如果是“客户”
		case "subjectCustomer":
			
			$("#"+target).attr("dbValue",strNullProc(valueObject.id));
			$("#"+target).val(strNullProc(valueObject.ccusabbname));
		break;
		
		//如果是“供应商”
		case "subjectSup":
			$("#"+target).attr("dbValue",strNullProc(valueObject.id));
			$("#"+target).val(strNullProc(valueObject.cvenabbname));
		break;
	
		
		//如果是“业务员”
		case "subjectBusiness":
			$("#"+target).attr("dbValue",strNullProc(valueObject.id));
			$("#"+target).val(strNullProc(valueObject.cname));
		break;	
			
			//如果是“结算方式”
		case "subjectJsfs":
			$("#"+target).attr("dbValue",strNullProc(valueObject.cId));
			$("#"+target).val(strNullProc(valueObject.ccode));//结算方式显示编码
		
		break;
	}
	
	
}





//点击确认按钮后
function btnConfirm(){
	
	var curcodeAddInfo = parentParam.curcodeAddInfo;
		
	//取各项值并组装参数对象返回给凭证页面
	
	//构建本窗体返回值参数
	var param = {};
	param.rowNumber=parentParam.rowNumber;
	param.curcodeAddInfo=parentParam.curcodeAddInfo;
	param.selcode=parentParam.selcode;
	param.items=new Object();
	//项目
	param.items.subjectProjectId = strNullProc($("#subjectProject").attr("dbValue"));
	param.items.subjectProjectName = strNullProc($("#subjectProject").val());
	
	//部门
	param.items.subjectDeptId = strNullProc($("#subjectDept").attr("dbValue"));
	param.items.subjectDeptName = strNullProc($("#subjectDept").val());
	
	//个人
	param.items.subjectPersonId = strNullProc($("#subjectPerson").attr("dbValue"));
	param.items.subjectPersonName = strNullProc($("#subjectPerson").val());
	
	//客户
	param.items.subjectCustomerId = strNullProc($("#subjectCustomer").attr("dbValue"));
	param.items.subjectCustomerName = strNullProc($("#subjectCustomer").val());
	
	//供应商
	param.items.subjectSupId = strNullProc($("#subjectSup").attr("dbValue"));
	param.items.subjectSupName = strNullProc($("#subjectSup").val());
	
	
	//业务员
	param.items.subjectBusinessId = strNullProc($("#subjectBusiness").attr("dbValue"));
	param.items.subjectBusinessName = strNullProc($("#subjectBusiness").val());
	
	
	//结算方式
	param.items.subjectJsfsId = strNullProc($("#subjectJsfs").attr("dbValue"));
	param.items.subjectJsfsName = strNullProc($("#subjectJsfs").val());
	
	   
	
	//票号
	param.items.ticketNumber = strNullProc($("#ticketNumber").val());
	//发生日期
	param.items.subjectDate = strNullProc($("#subjectDate").val());
	
	//单价
	param.items.subjectPrice = strNullProc($("#subjectPrice").val());
	//数量
	param.items.subjectNumber = strNullProc($("#subjectNumber").val());
	
	

	//验证必填项:
	
	/*
	if(curcodeAddInfo[0]==1){
		//验证项目value和dbVlue是否已录入
		if(param.items.subjectProjectId=="" || param.items.subjectProjectId=="0"){
		jAlert("项目不能为空！","提示",function(){
				$("#subjectProject").focus();
			});
			
			return false;
		}
	}
	*/
	
	
	if(curcodeAddInfo[1]==1){
		//验证部门value和dbVlue是否已录入
		if(param.items.subjectDeptId=="" || param.items.subjectDeptId=="0"){
			jAlert("部门不能为空！","提示",function(){
				$("#subjectDept").focus();
			});
			return false;
		}
	}
	if(curcodeAddInfo[2]==1){
		//验证个人value和dbVlue是否已录入
		if(param.items.subjectPersonId=="" || param.items.subjectPersonId=="0"){
			jAlert("个人不能为空！","提示",function(){
				$("#subjectPerson").focus();
			});
			return false;
		}
	}
	
	
	if(curcodeAddInfo[3]==1){
		//验证客户value和dbVlue是否已录入
		if(param.items.subjectCustomerId=="" || param.items.subjectCustomerId=="0"){
			jAlert("客户不能为空！","提示",function(){
				$("#subjectCustomer").focus();
			});
			return false;
		}
	}
	
	if(curcodeAddInfo[4]==1){
		//验证供应商value和dbVlue是否已录入
		if(param.items.subjectSupId=="" || param.items.subjectSupId=="0"){
			
			jAlert("供应商不能为空！","提示",function(){
				$("#subjectSup").focus();
			});
			
			return false;
		}
	}
	
	
	
	//调用dsign/index.html窗体里的deliverValue函数，传与选择，填写的值参数
	window.parent.deliverValue("dsign_auxiliaryoptions",param);
	
	//关闭被窗体
	window.parent.closeWindow('dsign_auxiliaryoptions');
	
}



/********* 说明 ********/
//本页面对应的C/S版窗体里的参照文本框是可编辑的，允许用户手动输入名称。
//但本页面每一参照项需要同时记住两个属性值：ID和名称，手动输入的内容将没有ID值，所以禁用了手动输入。
//用户必须点击右边放大镜进行选择。
//目前，参照弹出的窗体返回的值直接存进了param对象里，当点击本页面“确认”后，不会读取各参照文本框的值，而是直接将param返回给凭证页面。
//如果后期要启用允许用户手动输入的话，必须调整该策略。

//弹出项目参照函数
function openFitemref(){
	var param = new Object();
	param.cassItem = curcodeAddInfo[7];
	
	window.parent.openWindow('basic_comref_fitemref','dsign_auxiliaryoptions',param);
	target='subjectProject';
}

/**
 * 当取消辅助核算窗体
 */
function cancel(){
	try{
		window.parent.getParentWindow('dsign_auxiliaryoptions').auxiliaryoptionsCancelAction(parentParam.rowNumber);
	}catch(e){}
	window.parent.closeWindow('dsign_auxiliaryoptions');
}


