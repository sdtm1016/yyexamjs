


/**
 * 
 * @DESCRIBE   修改会计科目：js逻辑控制
 * @AUTHOR     王丙建
 * @DATE       2012-12-18
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */
var valueObject = window.parent.valueMap.get("basic_finance_updcode");

$(document).ready(function(){
	oncode();
});

/**
 * 初始化币种
 */
function initCode(currCode) {
	$("#cexchName").empty();
	$("#cexchName")[0].options.add(new Option("","",false,true));
	
	//判断是否允许外币核算，如果不允许外币核算，外币种类不能使用
	var isExch = false;
	$.ajax({
	    url: "code!isFrgnCurrencyAcc.action",
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	isExch = data.isExch;
		}
	});
    //允许外币核算
	if (isExch) {
	    $.ajax({
		    url: "foreigncurrency!queryList.action",
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	list = data.foreigncurrencys;
		    	$.each(list,function(index,Foreigncurrency){
		    		var text = Foreigncurrency.cexchName + " " + Foreigncurrency.cexchCode;
		    		var value = Foreigncurrency.cexchName;
		    		if(Foreigncurrency.iotherused!=-1){//排除本币
		    			if(value==currCode){
			    			$("#cexchName")[0].options.add(new Option(text,value,false,true));
			    		}else{
			    			$("#cexchName")[0].options.add(new Option(text,value,false,false));
			    		}
		    		}
		    		
		    	});
		    	
			}
		});
	}
	else {
		$("#foreignAccounting").attr("disabled",true);
	}
}

/**
 * 初始化信息信息
 */
function oncode(){
	$.ajax({
	    url: "code!findByCodeId.action",
	    type: 'post',
	    dataType: "json",
		data:parseParam(valueObject),
	    complete:the_results,
	    success: function(data,status){
	    	var code1 = data.code1;
	    	if(code1.bclose == 1){
	    		$("#bclose").attr("checked",true);
	    	}else{
	    		$("#bclose").attr("checked",false);
	    	}
	    	if(code1.bdept==1){
	    		$("#bdept").attr("checked",true);
	    		showDept();
	    	}
	    	if(code1.bperson==1){
	    		$("#bperson").attr("checked",true);
	    		showPerson();
	    	}
	    	if(code1.bcus==1){
	    		$("#bcus").attr("checked",true);
	    		showCus();
	    	}
	    	if(code1.bsup==1){
	    		$("#bsup").attr("checked",true);
	    		showSup();
	    	}
	    	if(code1.bitem==1){
	    		$("#bitem").attr("checked",true);
	    		showItem();
	    	}
	    	if(code1.br==1){
	    		$("#br").attr("checked",true);
	    	}else{
	    		$("#br").attr("checked",false);
	    	}
	    	if(code1.be==1){
	    		$("#be").attr("checked",true);
	    	}else{
	    		$("#be").attr("checked",false);
	    	}
	    	if(code1.bproperty==0){
	    		$("#credit").attr("checked",true);
	    	}else{
	    		$("#debit").attr("checked",true);
	    	}
	    	var ccode=code1.ccode;
	    	var firstChar = ccode.substring(0,1);
	    	if(firstChar=="6"){
				$("#fieldset_pro").find("label[for='debit']").html("支出");
				$("#fieldset_pro").find("label[for='credit']").html("收入");
			}else{
				$("#fieldset_pro").find("label[for='debit']").html("借方");
				$("#fieldset_pro").find("label[for='credit']").html("贷方");
			}
	    	
	    	$("#ccode").val(code1.ccode);
	    	$("#ccodeName").val(code1.ccodeName);
	    	$("#ccodeEngl").val(code1.ccodeEngl);
	    	$("#cclass option").each(function(){
	    		var val=$(this).text();
	    		if(val==code1.cclass){
	    			$(this).attr("selected","selected");
	    			$(this).text(code1.cclass);
	    		}
	    	});
	    	$("#cbookType").val(code1.cbookType);
	    	
	    	$("#chelp").val(code1.chelp);
	    	if(code1.cexchName!="null"&&code1.cexchName!=""&&code1.cexchName!=null){
	    		$("#foreignAccounting").attr("checked",true);
	    		$("#cexchName").removeAttr("disabled");
	    		$("#find").removeAttr("disabled");
	    		
	    	}
	    	//外币种类
	    	initCode(code1.cexchName);
	    	if(code1.cmeasure!="null"&&code1.cmeasure!=null&&code1.cmeasure!=""){
	    		$("#quantityAccounting").attr("checked",true);
	    		$("#cmeasure").removeAttr("disabled");
	    	}
	    	$("#cmeasure").val(code1.cmeasure);
	    				 
	    	$("#cother").val(code1.cother);
	    	//不能修改科目编码
	    	$("#ccode").attr("disabled",true);
	    	
	    	//不能修改科目类型
	    	$("#cclass").attr("disabled",true);
	    	
	    	//科目性质不能修改
	    	$("#pro").attr("disabled","disabled");
	    	/*
	    	 * 汇总打印
	    	var num=gradecontrue("code",ccode);
	    	if(num==-2){//一级
	    		
	    	}
	    	*/
	    }
	  });
}
function cancle(){
	window.parent.closeWindow('basic_finance_updcode');
}
function update(){
	if($("#ccode").val()==""){
		jAlert("科目编码不能为空！");
		return;
	}
	if($("#ccodeName").val()==""){
		jAlert("科目名称不能为空！");
		return;
	}
	
	if($("#cmeasure").val()==""&&$("#quantityAccounting").attr("checked")){
		jAlert("计量单位不能为空！");
		return;
	}
	//编码级次 预留
	var code=gradecontrue('code',$("#ccode").val());
	var igrade = 1;
	if(code=="-1"){
		jAlert("科目编码格式错误！","提示信息",function(){
			("#ccode").focus();
		});
		return;
	}else if(code=="-2"){
		igrade = 1;
	}else{
		var str = code.split("*");
		igrade = str[0];
	}
	
	
	var bclose = 0;
	var bdept = 0;
	var bperson = 0;
	var bcus = 0;
	var bsup = 0;
	var bitem = 0;
	var br = 0;
	var be = 0;
	if($("#bclose").attr("checked")){
		bclose = 1;
	}
	if($("#bdept").attr("checked")){
		bdept = 1;
	}
	if($("#bperson").attr("checked")){
		bperson = 1;
	}
	if($("#bcus").attr("checked")){
		bcus = 1;
	}
	if($("#bsup").attr("checked")){
		bsup = 1;
	}
	if($("#bitem").attr("checked")){
		bitem = 1;
	}
	if($("#br").attr("checked")){
		br = 1;
	}
	if($("#be").attr("checked")){
		be = 1;
	}
	var bproperty = $("[name='bproperty']:checked").val();
		var pram = "code.id="+ valueObject.code.id
		 +"&code.ccode="+$("#ccode").val()
		 +"&code.ccodeName="+$("#ccodeName").val()
		 +"&code.ccodeEngl="+$("#ccodeEngl").val()
		 +"&code.cclassEngl="+$("#cclass").val()
		 +"&code.cbookTypeEngl="+$("#cbookType").val()
		 +"&code.chelp="+$("#chelp").val()
		 +"&code.cexchName="+$("#cexchName").val()
		 +"&code.cmeasure="+$("#cmeasure").val()
		 +"&code.igrade="+igrade
		 +"&code.bclose="+bclose
		 +"&code.bproperty="+bproperty
		 +"&code.bdept="+bdept
		 +"&code.bperson="+bperson
		 +"&code.bcus="+bcus
		 +"&code.bsup="+bsup
		 +"&code.bitem="+bitem
		 +"&code.br="+br
		 +"&code.be="+be
		 +"&code.cother="+$("#cother").val();
		$.ajax({
	    url: "code!update.action",
	    type: 'post',
	    dataType: "json",
		data:pram,
	    complete:the_results,
	    success: function(data){
	    	window.parent.closeWindow('basic_finance_updcode');
	    	window.parent.getWindow("finance_code").queryAll();
	    }
	  });
}

/**
 *  //调用：
 *  var obj={name:'tom','class':{className:'class1'},classMates:[{name:'lily'}]};
 *  parseParam(obj);
 *  结果："name=tom&class.className=class1&classMates[0].name=lily" 
 *  parseParam(obj,'stu');
 *  结果："stu.name=tom&stu.class.className=class1&stu.classMates[0].name=lily" 
 */
var parseParam=function(param, key){
	var paramStr="";
	if(param instanceof String||param instanceof Number||param instanceof Boolean){
		paramStr+="&"+key+"="+encodeURIComponent(param);
	}else{
		$.each(param,function(i){
			var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
			paramStr+='&'+parseParam(this, k);
		});
	}
	return paramStr.substr(1);
};

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

/**
 * 受控系统选择事件
 */
function onCotherChange() {
	var selValue = $("#cother").val();
	//应收判断：客户往来必须选中
	if (selValue=="AR") {
		if (!($("#bcus").attr("checked"))) {
			$("#cother").val("");
		}
	}
	//应付判断：供应商往来必须选中
	if (selValue=="AP") {
		if (!($("#bsup").attr("checked"))) {
			$("#cother").val("");
		}
	}

	//核算判断：辅助核算必须选中一项
	if (selValue=="IA") {
		if ( !($("#bsup").attr("checked")) ||   !($("#bcus").attr("checked")) 
				||   !($("#bperson").attr("checked")) ||   !($("#bdept").attr("checked"))
				||   !($("#bitem").attr("checked"))) {
			$("#cother").val("");
		}
	}
	
	
}



/**
 * 选择外币判断
 * @param obj
 */
function showExchName(obj) {
	//外币标志
	var flag="0"; 
	if ($("#foreignAccounting").attr("checked"))
		flag = "1";
	//设置可以选择币种
	if (flag=="1")  {
		$("#cexchName").attr("disabled", false);
		$("#fieldset_1").css("color","#000000");
		$("#find").attr("disabled", false);
	}
	//币种不可以选择
	else{
		$("#cexchName").attr("disabled", true);
		$("#fieldset_1").css("color","#999999");
		$("#find").attr("disabled", true);
		$("#cexchName").val("");
	}
	
}


/**
 * 选择数量核算
 * @param obj
 */
function showMeasure(obj) {
	//标志
	var flag="0"; 
	if ($("#quantityAccounting").attr("checked"))
		flag = "1";
	//设置可以选择
	if (flag=="1")  {
		$("#cmeasure").attr("disabled", false);
	}
	//不可以选择
	else {
		$("#cmeasure").val("");
		$("#cmeasure").attr("disabled", true);
	}
}


/**
 * 设置辅助核算按钮都不可用
 */

function setAddBtnDisabled() {
	 //选择部门核算按钮不可用	
	$("#btnDept").attr("disabled", true);
	 //选择个人核算按钮不可用	
	$("#btnPerson").attr("disabled", true);
	 //选择客户核算按钮不可用	
	$("#btnCus").attr("disabled", true);
	 //选择供应商核算按钮不可用	
	$("#btnSup").attr("disabled", true);
	 //选择项目核算按钮不可用	
	$("#btnItem").attr("disabled", true);
}

/**
 * 选择部门核算
 * @param obj
 */
function showDept(obj) {
	//标志
	var flag="0"; 
	if ($("#bdept").attr("checked"))
		flag = "1";
	//设置可以选择
	if (flag=="1")  { 
	    //选择部门核算按钮可用	
		$("#btnDept").attr("disabled", false);
		$("#bperson").attr("disabled", true);
		
		if($("#bsup").attr("checked")){
			$("#bitem").attr("disabled", true);
		}
	}
	//不可以选择
	else {
		setAddBtnDisabled();
		$("#bperson").attr("disabled", false);
		if($("#bsup").attr("checked")){
			$("#bitem").attr("disabled", false);
		}
		
	}

	
}

/**
 * 选择个人核算
 * @param obj
 */
function showPerson(obj) {
	//标志
	var flag="0"; 
	if ($("#bperson").attr("checked"))
		flag = "1";
	//设置可以选择
	if (flag=="1")  {
		//个人核算按钮可用
		$("#btnPerson").attr("disabled", false);
		$("#bcus").attr("disabled", true);
		$("#bsup").attr("disabled", true);
		$("#bdept").attr("disabled", true);
	}
	//不可以选择
	else {
		setAddBtnDisabled();
		$("#bcus").attr("disabled", false);
		$("#bsup").attr("disabled", false);
		$("#bdept").attr("disabled", false);
		
	}
}

/**
 * 选择客户核算
 * @param obj
 */
function showCus(obj) {
	//标志
	var flag="0"; 
	if ($("#bcus").attr("checked"))
		flag = "1";
	//设置可以选择
	if (flag=="1")  {
		//客户核算按钮可用
		$("#btnCus").attr("disabled", false);
		$("#bsup").attr("disabled", true);
		$("#bperson").attr("disabled", true);
		//设置受控系统为应收
		$("#cother").val("AR");
	}
	//不可以选择
	else  {
		setAddBtnDisabled();
		$("#cother").val("");
		$("#bsup").attr("disabled", false);
		$("#bperson").attr("disabled", false);
		
	}

}

/**
 * 选择供应商核算
 * @param obj
 */
function showSup(obj) {
	//标志
	var flag="0"; 
	if ($("#bsup").attr("checked"))
		flag = "1";
	//设置可以选择
	if (flag=="1")  {
		//供应商选择按钮可用
		$("#btnSup").attr("disabled", false);
		$("#bperson").attr("disabled", true);
		$("#bcus").attr("disabled", true);
		//设置受控系统为应付
		$("#cother").val("AP");

	}
	//不可以选择
	else {
		setAddBtnDisabled();
		$("#cother").val("");
		$("#bperson").attr("disabled", false);
		$("#bcus").attr("disabled", false);
	}
	
}
/**
 * 选择项目核算
 * @param obj
 */
function showItem(obj) {
	//标志
	var flag="0"; 
	if ($("#bitem").attr("checked"))
		flag = "1";
	//设置可以选择
	if (flag=="1")  {
		$("#btnItem").attr("disabled", false);
		if($("#bsup").attr("checked")){
			$("#bdept").attr("disabled", true);
		}
	}
	//不可以选择
	else {
		setAddBtnDisabled();
		if($("#bsup").attr("checked")){
			$("#bdept").attr("disabled", false);
		}
	}
	
}

  /**
   * 弹出部门核算窗体
   */
  function deptClick() {
	  var param = 11;
	  window.parent.openWindow("basic_comref_dptref","basic_finance_addcode",param);
  }

  /**
   * 弹出个人核算窗体
   */
  function personClick() {
	  var param = 11;
	  window.parent.openWindow("basic_comref_personref","basic_finance_addcode",param);
  }
  /**
   * 弹出客户核算窗体
   */
  function cusClick() {
	  var param = 11;
	  window.parent.openWindow("basic_comref_cusref","basic_finance_addcode",param);
  }
  /**
   * 弹出供应商核算窗体
   */
  function supClick() {
	  var param = 11;
	  window.parent.openWindow("basic_comref_supref","basic_finance_addcode",param);
  }
  /**
   * 弹出项目核算窗体
   */
  function itemClick() {
	  var param = 11;
	  window.parent.openWindow("basic_comref_dptref","basic_finance_addcode",param);
  }
  


