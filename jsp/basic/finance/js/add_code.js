/**
 * 
 * @DESCRIBE   新增会计科目：js逻辑控制
 * @AUTHOR     王丙建
 * @DATE       2012-12-13
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

//当前科目编码规则
var curCodeRule = "";
var blR="";//初始化失算失衡值
var mark=0;
var bcashitem=0;
var bbank=0;
var bcash=0;
var isParent=false;//科目编码是否有上级
$(document).ready(function(){
	initCode();
	curCodeRule = grademarkValue('code');
	//如果不设置科目类别

	/**
	 * 科目类型下拉改变事件
	 * lyl
	 */
	$("#cclass").unbind("change").bind("change",function(){
		var val=$(this).val();
		if(val=="SY"){
			$("#fieldset_pro").find("label[for='debit']").html("支出");
			$("#fieldset_pro").find("label[for='credit']").html("收入");
		}else{
			$("#fieldset_pro").find("label[for='debit']").html("借方");
			$("#fieldset_pro").find("label[for='credit']").html("贷方");
		}
		if(val=="ZC"||val=="GT"||val=="CB"){
			$("#fieldset_pro input[checked='checked']").removeAttr("checked");
			$("#fieldset_pro input[value='0']").attr("checked","checked");
			if(mark==1){blR=1;}
		}else if(val="FZ"||val=="QY"||val=="SY"){
			$("#fieldset_pro input[checked='checked']").removeAttr("checked");
			$("#fieldset_pro input[value='1']").attr("checked","checked");
			if(mark==1){blR=0;}
		}
	});
});


/**
 * 初始化币种
 */
function initCode() {
	//判断是否允许外币核算，如果不允许外币核算，外币种类不能使用
	var isExch = false;
	$.ajax({
	    url: "code!isFrgnCurrencyAcc.action",
	    type: 'post',
	    dataType: "json",
	    cache:false,
	    async:false,
	    success: function(data){
	    	isExch = data.isExch;
		}
	});
    //允许外币核算
	if (isExch) {
		//初始化币种
		$("#cexchName").empty();
		$.ajax({
		    url: "foreigncurrency!queryList.action",
		    type: 'post',
		    dataType: "json",
		    cache:false,
		    async:false,
		    success: function(data){
		    	list = data.foreigncurrencys;
		    	$("#cexchName").append("<option value='' > </option>");
		    	$.each(list,function(index,Foreigncurrency){
		    		var text = Foreigncurrency.cexchName + " " + Foreigncurrency.cexchCode;
		    		var value = Foreigncurrency.cexchName;
		    		if(Foreigncurrency.iotherused!=-1){
		    			$("#cexchName")[0].options.add(new Option(text,value,false,false));
		    		}
		    	});
			}
		});
	}else {
		$("#foreignAccounting").attr("disabled",true);
	}

}
function clearData(){
	
		$("#br").attr("checked",false);
		$("#br").attr("disabled",false);
		
		$("#be").attr("checked",false);
		$("#be").attr("disabled",false);
		
		$("#bdept").attr("checked",false);
		$("#bdept").attr("disabled",false);
		
		$("#bperson").attr("checked",false);
		$("#bperson").attr("disabled",false);
		
		$("#bcus").attr("checked",false);
		$("#bcus").attr("disabled",false);
		
		$("#bsup").attr("checked",false);
		$("#bsup").attr("disabled",false);
		
		$("#bitem").attr("checked",false);
		$("#bitem").attr("disabled",false);
		
		$("#cclass").attr("disabled",false);
}
/**
 * 科目编码失去焦点时判断科目类型
 * lyl
 */
function onCodeblur() {
	var ccode = $("#ccode").val();
	var num=gradecontrue("code",ccode);
	var lastCode="";
	if(num==-2){
		mark=1;
		var val=$("#cclass").val();
		if(mark==1&&val=="ZC"){
			blR=1;
		}
		lastCode=ccode;
	}else if(num==-1){//如果不符合清空数据
		clearData();
	}
	else {//第几级+"*"+父节点！
		lastCode=num.substring(num.indexOf("*")+1,num.length);//获得上级节点编码
	}
	$.ajax({
		url: "code!queryCodeByCcode.action?ccode=" + lastCode,
		type: 'post',
		dataType: "json",
		cache:false,
	    async:false,
		success: function(data){
			var code=data.code1;
			if(code==null){
				isParent=true;
				return;
			};
			if(code.ccode!="undefined"&&code.ccode!=null&&code.ccode!=""){
				var pro=code.bproperty;
				var ccode=code.ccode;
				var br=code.br;// 日记账
				var be=code.be;//银行账
				var bperson=code.bperson;// 是否个人往来核算
				var bcus=code.bcus;//是否客户往来核算
				var cexchName=code.cexchName;
				var cmeasure=code.cmeasure;//计量单位
				bcashitem=code.bcashitem;
				bcash=code.bcash;
				bbank=code.bbank;
				 // 是否供应商往来核算 
				var bsup=code.bsup;
				 // 是否部门核算 
				var bdept=code.bdept;
				
				 // 是否项目核算 
				var bitem=code.bitem;
				var debit=code.debit;//借方
				var crebit=code.crebit;//贷方
				blR=code.blR;
				var firstChar = ccode.substring(0,1);
				if(firstChar=="6"){
					$("#fieldset_pro").find("label[for='debit']").html("支出");
					$("#fieldset_pro").find("label[for='credit']").html("收入");
				}else{
					$("#fieldset_pro").find("label[for='debit']").html("借方");
					$("#fieldset_pro").find("label[for='credit']").html("贷方");
				}
				$("#fieldset_pro input[checked='checked']").removeAttr("checked");
				$("#fieldset_pro input[value="+pro+"]").attr("checked","checked");
				if(mark!=1){
					$("#pro").attr("disabled","disabled");
				}
				
				//外币
				if(cexchName!=null&&cexchName!=""&&cexchName!="null"){
					$("#foreignAccounting").attr("checked",true);
					$("#cexchName").attr("disabled",false);
					$("#cexchName").val(cexchName);
				}
				//辅助核算
				if(br=="1"){
					$("#br").attr("checked",true);
				}else{
					$("#br").attr("checked",false);
					$("#br").attr("disabled",false);
				}
				if(be=="1"){
					$("#be").attr("checked",true);
				}else{
					$("#be").attr("checked",false);
					$("#be").attr("disabled",false);
				}
				if(bdept==1){
		    		$("#bdept").attr("checked",true);
		    		showDept();
		    	}else{
		    		$("#bdept").attr("checked",false);
		    		$("#bdept").attr("disabled",false);
		    	}
		    	if(bperson==1){
		    		$("#bperson").attr("checked",true);
		    		showPerson();
		    	}else{
		    		$("#bperson").attr("checked",false);
		    		$("#bperson").attr("disabled",false);
		    	}
		    	if(bcus==1){
		    		$("#bcus").attr("checked",true);
		    		showCus();
		    	}else{
		    		$("#bcus").attr("checked",false);
		    		$("#bcus").attr("disabled",false);
		    	}
		    	if(bsup==1){
		    		$("#bsup").attr("checked",true);
		    		showSup();
		    	}else{
		    		$("#bsup").attr("checked",false);
		    		$("#bsup").attr("disabled",false);
		    	}
		    	if(bitem==1){
		    		$("#bitem").attr("checked",true);
		    		showItem();
		    	}else{
		    		$("#bitem").attr("checked",false);
		    		$("#bitem").attr("disabled",false);
		    	}
		    	//计量单位
		    	
		    	if(cmeasure!="null"&&cmeasure!=null&&cmeasure!=""){
		    		$("#quantityAccounting").attr("checked",true);
		    		$("#cmeasure").removeAttr("disabled");
		    		$("#cmeasure").val(cmeasure);
		    	}
		    	
				if (firstChar=="1") {
					$("#cclass").val("ZC");
					$("#cclass").attr("disabled",true);
				}
				else if (firstChar=="2") {
					$("#cclass").val("FZ");
					$("#cclass").attr("disabled",true);
				}
				else if (firstChar=="3") {
					$("#cclass").val("GT");
					$("#cclass").attr("disabled",true);
				}
				else if (firstChar=="4") {
					$("#cclass").val("QY");
					$("#cclass").attr("disabled",true);
				}
				else if (firstChar=="5") {
					$("#cclass").val("CB");
					$("#cclass").attr("disabled",true);
				}
				else if (firstChar=="6") {
					$("#cclass").val("SY");
					$("#cclass").attr("disabled",true);
				}
				else {
				$("#cclass").attr("disabled",false);
				}
			}else{
				$("#pro").removeAttr("disabled");
				$("#cclass").removeAttr("disabled");
				mark=1;
				var val=$("#cclass").val();
				if(mark==1&&val=="ZC"){
					blR=1;
				}
			}
		}
	  });
}
/**
 * 科目中文名称失去焦点时自动获取助记码
 */
function onTextblur() {
	var  codeName = $("#ccodeName").val();
	var helpCode = getHelpCode(codeName);
	$("#chelp").val(helpCode);
}

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
 * 增加科目编码
 */

function add(){
	if($("#ccode").val()==""){
		jAlert("科目编码不能为空！","提示信息",function(){
			$("#ccode").focus();
		});
		return;
	}
	if($("#ccodeName").val()=="" && ($("#ccodeEngl").val()=="")){
		jAlert("科目名称和科目英文名称不能为同时空！","提示信息",function(){
			$("#ccodeName").focus();
		});
		return;
	}
	if($("#cmeasure").val().replace(/(^\s*)|(\s*$)/g, "")==""&&$("#quantityAccounting").attr("checked")){
		jAlert("计量单位不能为空！","提示信息",function(){
			$("#cmeasure").focus();
		});
		return;
	}
	//得到科目的编码规则
	var codingRule = grademarkValue('code');
	var code=gradecontrue('code',$("#ccode").val());
	//编码级次 预留
	var igrade = 1;
	var parentCode="";
	if(code=="-1"){
		var codemsg = "不符合编码规则" + "\n" + "当前科目编码规则为：" + curCodeRule;
		jAlert(codemsg,"提示信息",function(){
			$("#ccode").focus();
		});
		return;
	}else if(code=="-2"){
		igrade = 1;
	}else{
		var str = code.split("*");
		igrade = str[0];
		parentCode=str[1];
	}
	/*判断同一个科目下名称是否唯一*/
	var ccodeName=$("#ccodeName").val();
	var nameFlag=false;
	$.ajax({
		url: "code!isUniquencessCodeByCodeName.action?parentCode=" + parentCode,
		type: 'post',
		dataType: "json",
		cache:false,
	    async:false,
		success: function(data){
			var codes=data.codes;
				for(var i=0;i<codes.length;i++){
					var code=codes[i];
					var name=code.ccodeName;
					if(ccodeName==name){
						nameFlag=true;
						break;
					}
				}
			}
		});
	if(nameFlag){
		jAlert("科目名称不唯一!");
		return;
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
	var dcexchName="";
	if($("#cexchName").val()!=null&&$("#cexchName").val()!="null"){
		dcexchName=$("#cexchName").val().replace(/(^\s*)|(\s*$)/g, "");
	}
	var dcmeasure="";
	if($("#cmeasure").val()!=null&&$("#cmeasure").val()!="null"){
		dcmeasure=$("#cmeasure").val().replace(/(^\s*)|(\s*$)/g, "");
	}
	/*李波新增   2013-11-08*/
	var cc_val=$("#cclass").val();
	if(cc_val=="ZC"||cc_val=="GT"||cc_val=="CB"){
		blR=1;
	}else if(cc_val="FZ"||cc_val=="QY"||cc_val=="SY"){
		blR=0;
	}
	/*结束  2013-11-08*/
	var pram = "code.ccode="+$("#ccode").val()
				 +"&code.ccodeName="+$("#ccodeName").val()
				 +"&code.ccodeEngl="+$("#ccodeEngl").val()
				 +"&code.cclassEngl="+$("#cclass").val()
				 +"&code.cbookTypeEngl="+$("#cbookType").val()
				 +"&code.chelp="+$("#chelp").val()
				 
				 +"&code.cexchName="+dcexchName
				 +"&code.cmeasure="+dcmeasure
				 
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
				 +"&code.blR="+blR
				 +"&code.bcashitem="+bcashitem
				 +"&code.bcash="+bcash
				 +"&code.bbank="+bbank
				 +"&code.cother="+$("#cother").val();
	  //保存前判断科目编码必须唯一
	//判断编码是否唯一
	$.ajax({
		url: "code!isUniquenessCodeByCode.action?ccode=" + $("#ccode").val(),
		type: 'post',
		data:pram,
		dataType: "json",
		cache:false,
	    async:false,
		success: function(data){
		if(data.isuniqueness==false){
				jAlert("该科目编码已经被使用，请重新输入科目编码!");
				return false;
			}else if(isParent==true&&igrade!=1){
				isParent=false;
				jAlert("必须先定义科目编码的上级!");
				return false;
			}else {
				$.ajax({
			    url: "code!create?codingRule=" + codingRule+"&parentCode="+parentCode,
			    type: 'post',
			    dataType: "json",
				data:pram,
			    complete:the_results,
			    cache:false,
			    async:false,
			    success: function(data){
			    	/*将值清空,把科目编码加1 lyl (2013-9-4)*/
			    	$("#ccode").val(parseInt($("#ccode").val())+1);
			    	$("#ccodeName").val("");
			    	$("#ccodeEngl").val("");
			    	$("#cbookType").val("JES");
			    	$("#chelp").val("");
			    	//计量单位
			    	$("#quantityAccounting").attr("checked",false);
		    		$("#cmeasure").attr("disabled",true);
		    		$("#cmeasure").val("");
		    		//外币核算
		    		$("#foreignAccounting").attr("checked",false);
					$("#cexchName").attr("disabled",true);
					$("#cexchName").val("");
					//汇总打印
					$("#cgatherCheck").attr("checked",false);
					$("#cgather").attr("disabled",true);
					$("#cgather").val("");
					$("#cother").val("");
					
			    	/*end*/
			    	/*window.parent.closeWindow('basic_finance_addcode');
			    	window.parent.getWindow("finance_code").openAdd();*/
			    	window.parent.getWindow("finance_code").queryAll();
			         }
			     });
		}
		}
	  });
	
	
	
	
}
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
		$("#btnExch").attr("disabled", false);
		$("#fieldset_1").css("color","#000000");
	}
	//币种不可以选择
	else {
		$("#cexchName").attr("disabled", true);
		$("#btnExch").attr("disabled", true);

		$("#fieldset_1").css("color","#999999");
	}
}


/**
 * 选择汇总打印
 * @param obj
 */
function showPrint(obj) {
	//打印标志
	var flag="0"; 
	if ($("#cgatherCheck").attr("checked"))
		flag = "1";
	//设置可以选择币种
	if (flag=="1")  {
		$("#cgather").attr("disabled", false);
	}
	//币种不可以选择
	else {
		$("#cgather").attr("disabled", true);
	
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
 * 弹出外币设置窗体
 */
function exchClick() {
	  window.parent.openWindow("foreignCurrency","basic_finance_addcode");
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
	  //var param = 11;
	  //window.parent.openWindow("","basic_finance_addcode",param);
  }
  
  
/**
 * 选择事件
 * @param obj
 */
function showcomponent(obj) {
	
}