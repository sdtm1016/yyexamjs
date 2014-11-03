/**
 * 付款结算页面初始化
 */
//==========全局变量=============
//模块类型
var moduleType = null;
//首付款类型
var vouchType = null;
//单位参照地址
var dwrefurl = "";
//全局变量参照的id值
var queryid = null;
//操作类型
var action = null;
//==========全局变量=============
$(document).ready(function(){
	//设置按钮出事化状态
	setbuttonStyle("unuse");
	$("#transPas").attr("disabled",false);
	//设置相关不可用
	pageUnused();
});
//设置按钮的状态
function setbuttonStyle(type){
	//自动按钮不可用
	$("#autoPas").attr("disabled",true);
	//过滤按钮不可用
	$("#filterPas").attr("disabled",true);
	if(type=="unuse"){
		 $("#addPas").attr("disabled",true);
		 $("#upsPas").attr("disabled",true);
		 $("#delPas").attr("disabled",true);
		 $("#hexiaoPas").attr("disabled",true);
		 $("#hexiaoPas1").attr("disabled",true);
		 $("#daifuPas").attr("disabled",true);
		 $("#yufuPas").attr("disabled",true);
		 $("#savePas").attr("disabled",true);
		 $("#giveupPas").attr("disabled",true);
		 $("#locationPas").attr("disabled",true);
		 $("#firstPas").attr("disabled",true);
		 $("#upPas").attr("disabled",true);
		 $("#downPas").attr("disabled",true);
		 $("#lastPas").attr("disabled",true);
		 $("#refreshPas").attr("disabled",true);
		 $("#transPas").attr("disabled",true);
	}else if(type=="use"){
		 $("#addPas").attr("disabled",false);
		 $("#upsPas").attr("disabled",false);
		 $("#delPas").attr("disabled",false);
		 $("#hexiaoPas").attr("disabled",false);
		 $("#hexiaoPas1").attr("disabled",false);
		 $("#daifuPas").attr("disabled",false);
		 $("#yufuPas").attr("disabled",false);
		 $("#savePas").attr("disabled",false);
		 $("#giveupPas").attr("disabled",false);
		 $("#locationPas").attr("disabled",false);
		 $("#firstPas").attr("disabled",false);
		 $("#upPas").attr("disabled",false);
		 $("#downPas").attr("disabled",false);
		 $("#lastPas").attr("disabled",false);
		 $("#refreshPas").attr("disabled",false);
		 $("#transPas").attr("disabled",false);
	}
}
//切换函数
function transPas(){
	var cVouchType = $("#djtypename").attr("cVouchType");
	if(cVouchType==49){
		$("#djtypename").text("收款单").css("color","#f00");
		$("#djtypename").attr("cVouchType","48");
		$("#djsumname").html("预收合计&nbsp;");
		$("#ordernoTd1").text("");
		$("#ordernoTd2").text("");
		$("#djyfname").text("使用预收");
	}else if(cVouchType==48){
		$("#djtypename").text("付款单").css("color","#00f");
		$("#djtypename").attr("cVouchType","49");
		$("#djsumname").html("预付合计&nbsp;");
		$("#ordernoTd1").html("<label>订单号</label>");
		$("#ordernoTd2").html("<div><input type='text' id='orderno' class='querybox' onclick='queryBoxClick(this)' disabled='disabled' /><input type='button' class='innerfinder' onclick='queryButtonClick(this)'/><div class='floatclear'></div></div>");
		$("#djyfname").text("使用预付");
	}
}
//页面不可操作数据
function pageUnused(){
	//禁用相关文本框
	$("#topTextBoxContainer").find(".querybox").attr("disabled",true);
	$("#bottomTextBoxContainer").find("input").attr("disabled",true);
}
//页面可操作数据
function pageused(){
	//禁用相关文本框
	$("#topTextBoxContainer").find(".querybox").attr("disabled",false);
	$("#bottomTextBoxContainer").find("input").attr("disabled",false);
}
//参照查询
function queryButtonClick(btn){
	queryid = $(btn).parent().find("input:first")[0].id;
	//构建本窗体返回值参数
	var param = {};
	//日期
	if (queryid=="dvouchdate") {
		WdatePicker({
		      el:"dvouchdate",
		      position:{left:100,top:10},
		      onpicking:function(dp){
		         //得到用户选择的日期
		         var newSelectedDate=dp.cal.getNewDateStr();
		      }
		   });
	}else if (queryid=="cdeptcode") {//部门选择
		param.subjectDeptId = "";
		param.subjectDeptName = "";
		window.parent.openWindow('basic_comref_dptref','pu_pas_pas',param);
	}else if (queryid=="cdwcode") {//供应商
		param.subjectBusinessId = "";
		param.subjectBusinessName = "";
		window.parent.openWindow('basic_comref_supref','pu_pas_pas',param);
	}else if (queryid=="ccode") {//结算科目
		param.selKemuCode = "";
		param.selKemuName = "";
		window.parent.openWindow('dsign_subjectsreference','pu_pas_pas',param);
	}else if (queryid=="cperson") {//业务员
		param.subjecPersonId = "";
		param.subjecPersonName = "";
		window.parent.openWindow('basic_comref_personref','pu_pas_pas',param);
	}else if (queryid=="csscode") {//结算方式
		param.ccode = "";
		param.cname = "";
		window.parent.openWindow('basic_comref_settlestyleGridRef','pu_pas_pas',param);
	}else if (queryid=="cexch_name") {//币种
		param.ccode = "";
		param.cname = "";
		window.parent.openWindow('basic_comref_exchref','pu_pas_pas',param);
	}
}
//参照赋值
function deliverValue(valueObject){
	if (queryid=="ccode") {
		//显示名称
		$("#"+queryid).val( valueObject.selKemuCode + " " + valueObject.selKemuName).attr("dbvalue",valueObject.selKemuCode);
	}else if(queryid=="cdwcode") {//选择供应商输入框处理
		//显示名称
		$("#"+queryid).val( valueObject.ccode + " " + valueObject.cname).attr("dbvalue",valueObject.id);
		if (valueObject.ccode!="") {
			//添加按钮设置为可用
			$("#addPas").attr("disabled",false);
			//显示供应商的最后一张付款结算单
			showApBill(null);
		}
	}else {
		//显示名称
		$("#"+queryid).val( valueObject.ccode + " " + valueObject.cname).attr("dbvalue",valueObject.ccode);
	}
}
//根据供应商编码查询付款结算单
function showApBill(apCloseBillId){
	//单据类型:48 收款单  49：付款单
	var cVouchType = $("#djtypename").attr("cVouchType");
	//供应商编码
	var cdwcode = $("#cdwcode").attr("dbvalue");
	var data = "apCloseBill.cvouchtype="+cVouchType;
	data+="&apCloseBill.cdwcode="+cdwcode;
	$.ajax({
		url: "apCloseBill!queryApCloseBillBy.action",
		type: 'post',
		data:data,
		dataType: "json",
		async:false,
		error:function(){
			jAlert("请求失败!");
		},
		success: function(data){
			var apCloseBillList = data.apCloseBillList;
			var apCloseBillList1 = data.apCloseBillList1;
			//赋值
			setData(apCloseBillList,apCloseBillId,apCloseBillList1);
			//分页
			setPaging(apCloseBillList,apCloseBillId);
		}
	});
};
//赋值
function setData(apCloseBillList,apCloseBillId,apCloseBillList1){
	//供应商可用
	$("#cdwcode").attr("disabled",false);
	//预付合计
	var sumPrepay = 0;
	for(var i=0;i<apCloseBillList1.length;i++){
		sumPrepay+=apCloseBillList1[i].iramount;
	}
	if(sumPrepay==0){
		sumPrepay="";
	}
	if(apCloseBillList.length==0){
		//清空数据
		$("#topTextBoxContainer").find(".querybox").val("");
		$("#bottomTextBoxContainer").find("input").val("");
		$("#djtypename").attr("pasId","");
		//设置按钮
		//增加
		$("#addPas").attr("disabled",false);
		//修改
		$("#upsPas").attr("disabled",true);
		//删除
		$("#delPas").attr("disabled",true);
		//核销
		$("#hexiaoPas").attr("disabled",true);
		$("#hexiaoPas1").attr("disabled",true);
		//代付
		$("#daifuPas").attr("disabled",true);
		//预付
		$("#yufuPas").attr("disabled",true);
		//保存
		$("#savePas").attr("disabled",true);
		//放弃
		$("#giveupPas").attr("disabled",true);
		//定位
		$("#locationPas").attr("disabled",true);
		//刷新
		$("#refreshPas").attr("disabled",false);
		//切换
		$("#transPas").attr("disabled",false);
	}else{
		var apCloseBill = null;
		if(apCloseBillId==null){
			apCloseBill = apCloseBillList[apCloseBillList.length-1];
		}else{
			for(var i=0;i<apCloseBillList.length;i++){
				if(apCloseBillId==apCloseBillList[i].id){
					apCloseBill = apCloseBillList[i];
				}
			}
		}
		//当前单据id
		$("#djtypename").attr("pasId",apCloseBill.id);
		//设置按钮状态
		setbuttonStyle("unuse");
		//增加
		$("#addPas").attr("disabled",false);
		//修改
		$("#upsPas").attr("disabled",false);
		//删除
		$("#delPas").attr("disabled",false);
		//核销
		$("#hexiaoPas").attr("disabled",false);
		$("#hexiaoPas1").attr("disabled",false);
		//代付
		$("#daifuPas").attr("disabled",false);
		//预付
		$("#yufuPas").attr("disabled",false);
		
		//填充数据
		//预付合计
		$("#yfheji").val("");
		if(apCloseBill.cvouchtype==48){
			//收款单
		}else{
			//付款单
			$("#orderno").val(strNullProc(apCloseBill.corderno));
		}
		//结算单号
		$("#cvouchid").val(strNullProc(apCloseBill.cvouchid));
		//日期
		$("#dvouchdate").val(getStrDate(apCloseBill.dvouchdate));
		//结算方式 联查名称
		$("#csscode").attr("dbvalue",strNullProc(apCloseBill.csscode)).val(strNullProc(apCloseBill.csscode));
		//结算科目 联查名称
		$("#ccode").attr("dbvalue",strNullProc(apCloseBill.cCode)).val(strNullProc(apCloseBill.cCode));
		//币种
		$("#cexch_name").val(strNullProc(apCloseBill.cexch_name));
		//汇率
		$("#iexchrate").val(strNullProc(apCloseBill.iexchrate));
		//金额
		$("#iamount").val(strNullProc(apCloseBill.iamount));
		//票据号
		$("#cnoteno").val(strNullProc(apCloseBill.cnoteno));
		//银行账号
		$("#cbankaccount").val(strNullProc(apCloseBill.cbankaccount));
		//部门
		$("#cdeptcode").attr("dbvalue",strNullProc(apCloseBill.cdeptcode)).val(strNullProc(apCloseBill.cdeptcode));
		//业务员
		$("#cperson").attr("dbvalue",strNullProc(apCloseBill.cperson)).val(strNullProc(apCloseBill.cperson));
		//摘要
		$("#cdigest").val(strNullProc(apCloseBill.cdigest));
	}
	//预付合计
	$("#yfheji").val(sumPrepay);
	//设置页面不可用
	pageUnused();
	//设置表格数据
	var strHtml = "";
	for(var i=0;i<10;i++){
		strHtml+="<tr apDetailId=''>";
		strHtml+="	<td style='width:70px;'></td>";
		strHtml+="	<td style='width:90px;'></td>";
		strHtml+="	<td style='width:80px;'></td>";
		strHtml+="	<td style='width:60px;'></td>";
		strHtml+="	<td style='width:120px;'></td>";
		strHtml+="	<td style='width:70px;'></td>";
		strHtml+="	<td style='width:80px;'></td>";
		strHtml+="	<td style='width:60px;'></td>";
		strHtml+="	<td style='width:70px;'></td>";
		strHtml+="	<td style='width:80px;'></td>";
		strHtml+="	<td style='width:60px;'></td>";
		strHtml+="</tr>";
	}
	$("#datatable_bodyer").empty().append(strHtml);
	//显示合计信息
	showSumTable();
}
//分页功能
function setPaging(apCloseBillList,apCloseBillId){
	var len = apCloseBillList.length;
	if(len==0||len==1){
		$("#firstPas").attr("disabled",true);
		$("#upPas").attr("disabled",true);
		$("#downPas").attr("disabled",true);
		$("#lastPas").attr("disabled",true);
	}else{
		if(apCloseBillId==null){
			apCloseBillId = apCloseBillList[len-1].id;
		}
		for(var i=0;i<apCloseBillList.length;i++){
			if(apCloseBillList[i].id==apCloseBillId){
				if((i-1)<0){
					$("#firstPas").attr("disabled",true);
					$("#upPas").attr("disabled",true);
				}else{
					$("#firstPas").attr("disabled",false).attr("current",apCloseBillList[0].id);
					$("#upPas").attr("disabled",false).attr("current",apCloseBillList[i-1].id);
				}
				if((i+2)>len){
					$("#downPas").attr("disabled",true);
					$("#lastPas").attr("disabled",true);
				}else{
					$("#downPas").attr("disabled",false).attr("current",apCloseBillList[i+1].id);
					$("#lastPas").attr("disabled",false).attr("current",apCloseBillList[len-1].id);
				}
			}
		}
	}
}

function getPaging(pas){
	var pasId = $(pas).attr("current");
	if(pasId!=null&&pasId!=""){
		showApBill(pasId);	
	}
}
//刷新功能
function refreshPas(){
	showApBill(null);
}
//增加功能
function addPas(){
	action = "add";
	//===================按钮操作==================================
	//设置按钮不可用
	setbuttonStyle("unuse");
	//添加按钮
	$("#addPas").attr("disabled",false);
	//保存
	$("#savePas").attr("disabled",false);
	//放弃按钮
	$("#giveupPas").attr("disabled",false);
	//===================按钮操作==================================
	//编辑区可用并清空
	$("#topTextBoxContainer").find(".querybox").val("").attr("dbvalue","").attr("disabled",false);
	//结算单号不可用
	$("#cvouchid").attr("disabled",true);
	//汇率不可用
	$("#iexchrate").attr("disabled",true);
	//项目
	$("#citemcode").attr("disabled",true);
	var cVouchType = $("#djtypename").attr("cVouchType");
	//根据单据类型查询最大结算单号
	$.ajax({
		url: "apCloseBill!queryApCloseBillVouchid.action?vouchType="+cVouchType,
		type: 'post',
		async:false,
		dataType: "json",
		error:function(){
			jAlert("请求失败!");
		},
		success: function(data){
			vouchid = data.vouchid;
			//结算单号
			$("#cvouchid").val(vouchid).attr("disabled",true);
		}
	  });
	//日期
	$("#dvouchdate").val(getCookie("operDate"));
	//币种
	$("#cexch_name").val("人民币");
	//汇率
	$("#iexchrate").val("1").attr("disabled",true);
	//根据供应商编码得到供应商信息
	var cdwcode = $("#cdwcode").attr("dbvalue");
	$.ajax({
		url:"vendor!findVendorByCode",
		data:{code:cdwcode},
		type:"post",
		datatype:"json",
		async : false,   
		error: function () {
	           jAlert('请求失败');   
		},
		success:function(data){
			//银行账号
			if(data.vendor && data.vendor.cvenaccount){
				$("#cbankaccount").val(strNullProc(data.vendor.cvenaccount));
			}
			
		}
	});
}
//修改功能
function updatePas(){
	action = "update";
	//===================按钮操作==================================
	//设置按钮不可用
	setbuttonStyle("unuse");
	//添加按钮
	$("#addPas").attr("disabled",false);
	//保存
	$("#savePas").attr("disabled",false);
	//放弃按钮
	$("#giveupPas").attr("disabled",false);
	//===================按钮操作==================================
	//编辑区可用并清空
	$("#topTextBoxContainer").find(".querybox").attr("disabled",false);
	//结算单号不可用
	$("#cvouchid").attr("disabled",true);
	//汇率不可用
	$("#iexchrate").attr("disabled",true);
	//项目
	$("#citemcode").attr("disabled",true);
}
/**
 * 保存付款结算信息
 */
function saveApClose() {
	var checkFalg = checkSave();
	if (!checkFalg) {
		return false;
	}
	//获取付款结算表信息
	var apCloseBill = getApCloseBill();
	var url = "";
	if(action=="add"){
		url = "apCloseBill!create.action";
	}else if(action=="update"){
		url = "apCloseBill!update.action";
		var pasid = $("#djtypename").attr("pasid");
		apCloseBill+="&apCloseBill.id="+pasid;
	}else if(action="verification"){
		url = "apCloseBill!verification.action";
		var sumTheSettlement = $("#sumTheSettlement").text()-0;
		if(sumTheSettlement==0){
			jAlert("尚未核销任何单据,不能保存!");
			return false;
		}
		apCloseBill = getApDetail(sumTheSettlement);
	}else{
		return false;
	}
	//保存按钮不可用
	$("#btnSave").attr("disabled",true);
	$.ajax({
		url:url,
		type:'post',
		data:apCloseBill,
		dataType: "json",
		async : false,   
		error: function () {
			jAlert('请求失败');   
		},
		success: function(data){
			//刷新页面
			refreshPas();	
		}
	  });
}
/**
 * 保存前校验
 */
function checkSave() {
	if ($("#cvouchid").val()=="") {
		jAlert("结算单号不允许为空！");
		return false;
	}
	if ($("#dvouchdate").val()=="") {
		jAlert("日期不允许为空！");
		return false;
	}
	if ($("#csscode").val()=="") {
		jAlert("结算方式不允许为空！");
		return false;
	}
	if ($("#cexch_name").val()=="") {
		jAlert("币种不允许为空！");
		return false;
	}
	if ($("#iexchrate").val()=="") {
		jAlert("汇率不允许为空！");
		return false;
	}
	if ($("#iamount").val()=="") {
		jAlert("金额不允许为空！");
		return false;
	}
	return true;
}
/**
 * 得到付款单信息
 */
function getApCloseBill() {
	var data ="";
	//订单号
	data+="apCloseBill.orderno=" + $("#orderno").val();
	//结算单号
	data+="&apCloseBill.cvouchid=" +$("#cvouchid").val();
	//日期
	data+="&apCloseBill.dvouchdate=" +$("#dvouchdate").val();
	//结算方式
	data+="&apCloseBill.csscode=" +$("#csscode").attr("dbvalue");
	//结算科目
	data+="&apCloseBill.ccode=" +$("#ccode").attr("dbvalue");
	//币种
	data+="&apCloseBill.cexch_name=" +$("#cexch_name").val();
	//汇率
	data+="&apCloseBill.iexchrate=" + $("#iexchrate").val();
	//金额
	data+="&apCloseBill.iamount=" +$("#iamount").val();
	data+="&apCloseBill.iamount_f=" +$("#iamount").val();
	data+="&apCloseBill.iramount=" +$("#iamount").val();
	data+="&apCloseBill.iramount_f=" +$("#iamount").val();
	//票据号
	data+="&apCloseBill.cnoteno=" +$("#cnoteno").val();
	data+="&apCloseBill.ccovouchid=" + $("#cnoteno").val();
	//银行账号
	data+="&apCloseBill.cbankaccount=" + $("#cbankaccount").val();
	//部门
	data+="&apCloseBill.cdeptcode=" + $("#cdeptcode").attr("dbvalue");
	//业务员
	data+="&apCloseBill.cperson=" + $("#cperson").attr("dbvalue");
	//项目
	data+="&apCloseBill.citemcode=" + $("#citemcode").val();
	//摘要
	data+="&apCloseBill.cdigest=" + $("#cdigest").val();
	//供应商
	data+="&apCloseBill.cdwcode=" + $("#cdwcode").attr("dbvalue");
	//单据类型为付款单
	data+="&apCloseBill.cvouchtype=" + $("#djtypename").attr("cVouchType");
	return data;
}
//获取字表信息
function getApDetail(sumTheSettlement){
	var data = "";
	//id
	var pasid = $("#djtypename").attr("pasid");
	data+="apCloseBill.id="+pasid;
	//余额
	var iramount = $("#iamount").val()-sumTheSettlement;
	data+="&apCloseBill.iramount="+iramount;
	data+="&apCloseBill.iamount="+$("#iamount").val();
	$("#datatable_bodyer").find("tr").each(function(index){
		var apDetailId = $(this).attr("apDetailId");
		var idamount = $(this).find("td").eq(9).text();
		var cdefine7 = $(this).find("td").eq(8).text()-idamount;
		if(apDetailId!=""&&idamount!=""){
			data+="&apDetailList["+index+"].id="+apDetailId;
			//本次结算
			data+="&apDetailList["+index+"].idamount="+idamount;
			data+="&apDetailList["+index+"].cdefine7="+cdefine7;
		}
	});
	return data;
}
/**
 * 放弃按钮操作
 */
function giveupPas() {
	showApBill(null);
}
/**
 * 删除付款结算信息
 */
function delApClose() {
	jConfirm("结算单删除后不能恢复,是否继续!","确认对话框",function(confirmflag){
		if(confirmflag){
			var pasId = $("#djtypename").attr("pasId");
			var apCloseBill = "apCloseBill.id=" + pasId;
			$.ajax({
				url: "apCloseBill!delete.action",
				type: 'post',
				data:apCloseBill,
				dataType: "json",
				async : false,   
				error: function () {
			           jAlert('请求失败');   
				},
				success: function(data){
					showApBill(null);
				}
			  });
		}
	});
}
//同币种核算
function showHesuanByDwcode(){
	action = "verification";
	//设置成不可用
	setbuttonStyle("unuse");
	//供应商不可用
	$("#cdwcode").attr("disabled",true);
	$("#savePas").attr("disabled",false);
	$("#giveupPas").attr("disabled",false);
	//供应商编码
	var cdwcode = $("#cdwcode").attr("dbvalue");
	if(cdwcode==""||cdwcode==null){
		return false;
	}
	$.ajax({
		url: "apCloseBill!showHesuanByDwcode.action?dwcode=" + cdwcode,
		type: 'post',
		dataType: "json",
		async : false,   
		error: function () {
	           jAlert('请求失败');   
		},
		success: function(data){
			var apDetailList = data.apDetailList;
			//设置表格数据
			var strHtml = "";
			for(var i=0;i<apDetailList.length;i++){
				strHtml+="<tr apDetailId='"+apDetailList[i].id+"'>";
				strHtml+="	<td style='width:70px;'>"+strNullProc(apDetailList[i].cvouchtype)+"</td>";
				strHtml+="	<td style='width:90px;'>"+strNullProc(apDetailList[i].cvouchid)+"</td>";
				strHtml+="	<td style='width:80px;'>"+strNullProc(apDetailList[i].cdeptcode)+"</td>";
				strHtml+="	<td style='width:60px;'>"+strNullProc(apDetailList[i].cperson)+"</td>";
				strHtml+="	<td style='width:120px;'>"+strNullProc(apDetailList[i].cdigest)+"</td>";
				strHtml+="	<td style='width:70px;'>"+getStrDate(apDetailList[i].dvouchdate)+"</td>";
				strHtml+="	<td style='width:80px;'>"+strNullProc(apDetailList[i].cpaycode)+"</td>";
				strHtml+="	<td style='width:60px;'>"+strNullProc(apDetailList[i].icamount)+"</td>";
				strHtml+="	<td style='width:70px;'>"+strNullProc(apDetailList[i].cdefine7)+"</td>";
				strHtml+="	<td style='width:80px;' ondblclick='dbclick(this)' ></td>";
				strHtml+="	<td style='width:60px;'>"+getStrDate(apDetailList[i].dqdate)+"</td>";
				strHtml+="</tr>";
			}
			for(var j=0;j<10;j++){
				strHtml+="<tr apDetailId=''>";
				strHtml+="	<td style='width:70px;'></td>";
				strHtml+="	<td style='width:90px;'></td>";
				strHtml+="	<td style='width:80px;'></td>";
				strHtml+="	<td style='width:60px;'></td>";
				strHtml+="	<td style='width:120px;'></td>";
				strHtml+="	<td style='width:70px;'></td>";
				strHtml+="	<td style='width:80px;'></td>";
				strHtml+="	<td style='width:60px;'></td>";
				strHtml+="	<td style='width:70px;'></td>";
				strHtml+="	<td style='width:80px;'></td>";
				strHtml+="	<td style='width:60px;'></td>";
				strHtml+="</tr>";
			}
			$("#datatable_bodyer").empty().append(strHtml);
			//显示合计信息
			showSumTable();
		}
	  });
}
//异币种核算
function exchHesuan(){
	showHesuanByDwcode();
}
//设置成编辑状态
function dbclick(td){
	//设成编辑状态
	if($(td).find("input").length==0){
		var strHtml="<div><input type='text' id='currentEditorInput' style='width:100%;border:none;' value='"+$(td).text()+"' onblur='updateInput(this)' /><div class='floatclear'></div></div>";
		$(td).html(strHtml);
		$("#currentEditorInput").focus();
	}
}
//给表格中的td赋值
function updateInput(input){
	var thePrevValue = $(input).parent().parent().prev().text()-0;
	var currentValue = $(input).val()-0;
	if(currentValue>thePrevValue){
		jAlert("本次结算金额大于单据余额,请重新输入。","提示信息",function(){
			$(input).focus().val("");
		});
		return false;
	}else if(isNaN(currentValue)){
		jAlert("本次结算请输入数字。","提示信息",function(){
			$(input).focus().val("");
		});
		return false;
	}else{
		$(input).parent().parent().html($(input).val());
		//显示合计信息
		showSumTable();
	}
}
//显示合计值
function showSumTable(){
	//金额
	var sumMoney=0;
	//余额
	var sumBalance=0;
	//本次结算
	var sumTheSettlement=0;
	//遍历表格
	$("#datatable_bodyer").find("tr").each(function(){
		//当前td
		var currentTd = $(this).find("td");
		sumMoney += DoubleNullPtoc(currentTd.eq(7).text());
		sumBalance+=DoubleNullPtoc(currentTd.eq(8).text());
		sumTheSettlement+=DoubleNullPtoc(currentTd.eq(9).text());
	});
	$("#sumMoney").text(sumMoney);
	$("#sumBalance").text(sumBalance);
	$("#sumTheSettlement").text(sumTheSettlement);
}
/**
 * 退出
 */
function exitPas() {
	window.parent.closeWindow('pu_pas_pas');
}
