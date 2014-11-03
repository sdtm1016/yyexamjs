/**
 * 
 * @DESCRIBE   转账生成js
 * @AUTHOR     王丙建
 * @DATE       2012-11-13
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

//选择的年份、会计期间、自定义转账类型
var selyear = ""; 
var selmonth = "";
var selitype = "";

//选择币种id
var selExchid = null;
//选择币种名称
var selExchName = null;


/**
 * 初始化结转月份
 */
function initMonthselector() {
	$("#monthselector").empty();
   //会计期间初始化
	var monthList = getCurAccidPeriod();
	//结转月份
	$("#monthselector").empty();
	$.each(monthList,function(index,month){
		$("#monthselector")[0].options.add(new Option(month,month,false,false));
	});
	//开始月份
	$("#beginmonthselector").empty();
	$.each(monthList,function(index,month){
		$("#beginmonthselector")[0].options.add(new Option(month,month,false,false));
	});
	//结束月份
	$("#endmonthselector").empty();
	$.each(monthList,function(index,month){
		$("#endmonthselector")[0].options.add(new Option(month,month,false,false));
	});
	//得到登录的会计期间
	var curLoginPeriod = getLoginPeriod();
	var curMonth =  curLoginPeriod.iid;
	$('#monthselector')[0].selectedIndex =curMonth*1-1;
	$('#beginmonthselector')[0].selectedIndex =curMonth*1-1;
	$('#endmonthselector')[0].selectedIndex =curMonth*1-1;
	
	//显示自定义列表
	queryUserTranDirGrid();
	
	//显示外币币种
	var curExchList = getCurAccidExchList();
	$("#currencyselector").empty();
	$.each(curExchList,function(index,foreigncurrency){
		var name = foreigncurrency.cexchName + " " + foreigncurrency.cexchCode;
		var value = foreigncurrency.cexchName;
		var exchid = foreigncurrency.id;
		if(value!="人民币"){
			$("#currencyselector")[0].options.add(new Option(name, exchid ,false,false));
		}
	});
	
	
}


/**
 * 得到选择的月份、年份
 */
function getperiod() {
	var month = $("#monthselector").find("option:selected").text();
	selyear = month.substr(0,4);
    selmonth = month.substr(5);
}


/**
 * 显示自定义转账列表
 * @param iyear 年份 
 * @param iperiod 会计期间
 * @param itype  类型
 */
function queryUserTranDirGrid(){

	document.getElementById("toppanel_1").style.display="block";
	document.getElementById("toppanel_2").style.display="none";
	document.getElementById("toppanel_3").style.display="none";
	document.getElementById("toppanel_4").style.display="none";
	document.getElementById("toppanel_5").style.display="none";
	document.getElementById("toppanel_6").style.display="block";

	document.getElementById("datatable_1").style.display="block";
	document.getElementById("datatable_1_other").style.display="block";
	document.getElementById("datatable_2").style.display="none";
	document.getElementById("datatable_3").style.display="none";
	document.getElementById("datatable_4").style.display="none";
	document.getElementById("datatable_5").style.display="none";
	document.getElementById("datatable_6").style.display="none";

	
	getperiod();	
	selitype = "10";
	$("#datatable").html("");
	$.ajax({
		url:"glBautotran!queryUserTranGrid.action?year=" + selyear + "&period=" + selmonth + "&type=" + selitype,		
		type:"post",
		datatype:"json",
  		async:false,
		success:function(data,status){
			var gridList = data.gridList;
			showUserTranDirGrid(gridList);
		}
	});
}



/**
 * 显示自定义转账目录
 * @param userTrandirList
 */
//选择凭证类别 选择凭证编码
var selcsign = "";
var selctranid = "";
function showUserTranDirGrid(gridList) {
	 var length = gridList.length;
	for (var i = 0; i<length; i++) {
		var rowValueList = gridList[i];
		if (i==0) {
			selctranid = rowValueList[0];
			selcsign = rowValueList[2];
		}
		$("#datatable").append('<tr id="' +rowValueList[0]  
				    +'" text="' + rowValueList[2]
					+'" csign="' +  rowValueList[3]		
		
				+'"  bgcolor="#ffffff">'
				+'<td width="70" ondblClick="selectTd(this)" >'+ strNullProc(rowValueList[0]) + '</td>'
				+'<td width="70" ondblClick="selectTd(this)">'+ strNullProc(rowValueList[1]) + '</td>'
				+'<td width="70" ondblClick="selectTd(this)">'+ strNullProc(rowValueList[2]) + '</td>'
				+'<td width="80"  ondblClick="selectTd(this)">'+"" + '</td>'				
			+'</tr>');
		
	}
}



/**
 * 显示对应结转转账列表
 * @param iyear 年份 
 * @param iperiod 会计期间
 * @param itype  类型
 */
function queryCspTranDirGrid(){

	document.getElementById("toppanel_1").style.display="block";
	document.getElementById("toppanel_2").style.display="none";
	document.getElementById("toppanel_3").style.display="none";
	document.getElementById("toppanel_4").style.display="none";
	document.getElementById("toppanel_5").style.display="none";
	document.getElementById("toppanel_6").style.display="block";

	document.getElementById("datatable_2").style.display="block";
	document.getElementById("datatable_1_other").style.visibility="hidden";
	document.getElementById("datatable_1").style.display="none";
	document.getElementById("datatable_3").style.display="none";
	document.getElementById("datatable_4").style.display="none";
	document.getElementById("datatable_5").style.display="none";
	document.getElementById("datatable_6").style.display="none";
	getperiod();	
	selitype = "20";
	$("#datatable2").html("");
	$.ajax({
		url:"glCspBautotran!queryCspTranGrid.action?year=" + selyear + "&period=" + selmonth + "&type=" + selitype,		
		type:"post",
		datatype:"json",
  		async:false,
		success:function(data,status){
			var gridList = data.glCspBautotranList;
			showCspTranDirGrid(gridList);
		}
	});
}


/**
 * 显示对应结转转账目录
 * @param userTrandirList
 */
function showCspTranDirGrid(gridList) {
	if (gridList==null) return;
	 var length = gridList.length;
	for (var i = 0; i<length; i++) {
		var glCspBautotran = gridList[i];
		$("#datatable2").append('<tr id="' +glCspBautotran.ccode  
				+'" text="' +  glCspBautotran.cdigest						
				+'" csign="' +  glCspBautotran.csign
				+'" zrcode="' +  glCspBautotran.czrcode						
				+'" zccode="' +  glCspBautotran.ccode						
				+'"  style="background-color:#FFFFFF">'
				+'<td width="70" ondblClick="selectTd(this)">'+ strNullProc(glCspBautotran.ctranid) + '</td>'
				+'<td width="70" ondblClick="selectTd(this)">'+ strNullProc(glCspBautotran.csign) + '</td>'
				+'<td width="70" ondblClick="selectTd(this)">'+ strNullProc(glCspBautotran.cdigest) + '</td>'
				+'<td width="70" ondblClick="selectTd(this)">'+ strNullProc(glCspBautotran.ccode) + '</td>'
				+'<td width="70" ondblClick="selectTd(this)">'+ strNullProc(glCspBautotran.ccodename) + '</td>'
				+'<td width="70" ondblClick="selectTd(this)">'+ strNullProc(glCspBautotran.ccodefzxname) + '</td>'
				+'<td width="70" ondblClick="selectTd(this)">'+ strNullProc(glCspBautotran.czrcode) + '</td>'
				+'<td width="70" ondblClick="selectTd(this)">'+ strNullProc(glCspBautotran.czrcodename) + '</td>'
				+'<td width="70" ondblClick="selectTd(this)">'+ strNullProc(glCspBautotran.czrcodefzxname) + '</td>'
				+'<td width="80"  ondblClick="selectTd(this)">'+"" + '</td>'
				+'<td width="70" ondblClick="selectTd(this)">'+ strNullProc(glCspBautotran.jzxs) + '</td>'
			+'</tr>');
		
	}
}



/**
 * 显示销售成本结转转账列表
 * @param iyear 年份 
 * @param iperiod 会计期间
 * @param itype  类型
 */
function querySaleTranDirGrid(){

	document.getElementById("toppanel_1").style.display="none";
	document.getElementById("toppanel_2").style.display="block";
	document.getElementById("toppanel_3").style.display="block";
	document.getElementById("toppanel_4").style.display="none";
	document.getElementById("toppanel_5").style.display="none";
	document.getElementById("toppanel_6").style.display="none";

	document.getElementById("datatable_3").style.display="block";
	document.getElementById("datatable_1_other").style.visibility="hidden";
	document.getElementById("datatable_1").style.display="none";
	document.getElementById("datatable_2").style.display="none";
	document.getElementById("datatable_4").style.display="none";
	document.getElementById("datatable_5").style.display="none";
	document.getElementById("datatable_6").style.display="none";
	getperiod();	
	selitype = "30";
	$("#datatable3").html("");
	$.ajax({
		url:"glSaleBautotran!querySaleDir.action?year=" + selyear + "&period=" + selmonth + "&type=" + selitype,		
		type:"post",
		datatype:"json",
  		async:false,
		success:function(data,status){
			var gridList = data.gridList;
			showSaleTranDirGrid(gridList);
		}
	});
}


/**
 * 显示销售成本转账目录
 * @param userTrandirList
 */
function showSaleTranDirGrid(gridList) {
	if (gridList==null) return;
	 var length = gridList.length;
	for (var i = 0; i<length; i++) {
		var rowValueList = gridList[i];
		$("#datatable3").append('<tr id="' +rowValueList[0]  
				+'" text="' +  rowValueList[2]						
				+'" csign="' + rowValueList[1]						
				+'"  bgcolor="#ffffff">'
				+'<td width="70" >'+ strNullProc(rowValueList[1]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[2]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[3]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[4]) + '</td>'
					
			+'</tr>');
		
	}
}

/**
 * 显示销售成本(计划价)结转转账列表
 * @param iyear 年份 
 * @param iperiod 会计期间
 * @param itype  类型
 */
function querySalePlanTranDirGrid(){

	document.getElementById("toppanel_1").style.display="none";
	document.getElementById("toppanel_2").style.display="block";
	document.getElementById("toppanel_3").style.display="block";
	document.getElementById("toppanel_4").style.display="none";
	document.getElementById("toppanel_5").style.display="none";
	document.getElementById("toppanel_6").style.display="none";

	document.getElementById("datatable_4").style.display="block";
	document.getElementById("datatable_1_other").style.visibility="hidden";
	document.getElementById("datatable_1").style.display="none";
	document.getElementById("datatable_2").style.display="none";
	document.getElementById("datatable_3").style.display="none";
	document.getElementById("datatable_5").style.display="none";
	document.getElementById("datatable_6").style.display="none";
	getperiod();	
	selitype = "40";
	$("#datatable4").html("");
	$.ajax({
		url:"glSaleBautotran!querySaleDir.action?year=" + selyear + "&period=" + selmonth + "&type=" + selitype,		
		type:"post",
		datatype:"json",
  		async:false,
		success:function(data,status){
			var gridList = data.gridList;
			showSalePlanTranDirGrid(gridList);
		}
	});
}


/**
 * 显示销售成本（计划价）转账目录
 * @param userTrandirList
 */
function showSalePlanTranDirGrid(gridList) {
	if (gridList==null) return;
	 var length = gridList.length;
	for (var i = 0; i<length; i++) {
		var rowValueList = gridList[i];
		$("#datatable4").append('<tr id="' +rowValueList[0]  
				+'" text="' +  rowValueList[2]						
				+'" csign="' + rowValueList[1]						
				+'"  bgcolor="#ffffff">'
				+'<td width="70" >'+ strNullProc(rowValueList[1]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[2]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[3]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[4]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[5]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[6]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[7]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[8]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[9]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[10]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[11]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[12]) + '</td>'
				+'<td width="70" >'+ strNullProc(rowValueList[13]) + '</td>'
			+'</tr>');
		
	}
}




/**
 * 显示汇兑损益结转转账列表
 * @param iyear 年份 
 * @param iperiod 会计期间
 * @param itype  类型
 */
function queryExchTranDirGrid(){
	
	document.getElementById("toppanel_1").style.display="block";
	document.getElementById("toppanel_2").style.display="none";
	document.getElementById("toppanel_3").style.display="none";
	document.getElementById("toppanel_4").style.display="block";
	document.getElementById("toppanel_5").style.display="none";
	document.getElementById("toppanel_6").style.display="block";

	document.getElementById("datatable_5").style.display="block";
	document.getElementById("datatable_1_other").style.visibility="hidden";
	document.getElementById("datatable_1").style.display="none";
	document.getElementById("datatable_2").style.display="none";
	document.getElementById("datatable_3").style.display="none";
	document.getElementById("datatable_4").style.display="none";
	document.getElementById("datatable_6").style.display="none";
	
	var exchId = $("#currencyselector").val();
	getperiod();	
	selitype = "50";
	$("#datatable5").html("");
	$.ajax({
		url:"glExchBautotran!queryExchDir.action?year=" + selyear + "&period=" + selmonth 
		   + "&type=" + selitype + "&exchId=" + exchId,		
		type:"post",
		datatype:"json",
  		async:false,
		success:function(data,status){
			var gridList = data.gridList;
			showExchTranDirGrid(gridList);
		}
	});
}


/**
 * 显示汇兑损益目录
 * @param userTrandirList
 */
function showExchTranDirGrid(gridList) {
	if (gridList==null) return;
	 var length = gridList.length;
	for (var i = 0; i<length; i++) {
		var rowValueList = gridList[i];
		if (i==0) {
			selExchId = rowValueList[6];
			selExchName = rowValueList[3];
		}
		$("#datatable5").append('<tr id="' +rowValueList[0]  
				+'" text="' +  rowValueList[2]						
				+'" sycode="' +  rowValueList[1]
				+'" exchid="' +  rowValueList[6]						
				+'" exchname="' +  rowValueList[3]						
		
				+'" csign="' + rowValueList[5]						
				+'"  bgcolor="#ffffff">'
				+'<td width="60" ondblClick="selectTd(this)">'+ strNullProc(rowValueList[1]) + '</td>'
				+'<td width="60" ondblClick="selectTd(this)">'+ strNullProc(rowValueList[2]) + '</td>'
				+'<td width="60" ondblClick="selectTd(this)">'+ strNullProc(rowValueList[3]) + '</td>'
				+'<td width="60"  ondblClick="selectTd(this)">'+"" + '</td>'
			+'</tr>');
		
	}
}



/**
 * 显示期间损益结转转账列表
 * @param iyear 年份 
 * @param iperiod 会计期间
 * @param itype  类型
 */
function queryPeriodTranDirGrid(codetype){
	
	
	
	
	document.getElementById("toppanel_1").style.display="block";
	document.getElementById("toppanel_2").style.display="none";
	document.getElementById("toppanel_3").style.display="none";
	document.getElementById("toppanel_4").style.display="none";
	document.getElementById("toppanel_5").style.display="block";
	document.getElementById("toppanel_6").style.display="block";

	document.getElementById("datatable_6").style.display="block";
	document.getElementById("datatable_1_other").style.visibility="hidden";
	document.getElementById("datatable_1").style.display="none";
	document.getElementById("datatable_2").style.display="none";
	document.getElementById("datatable_3").style.display="none";
	document.getElementById("datatable_4").style.display="none";
	document.getElementById("datatable_5").style.display="none";
	getperiod();	
	selitype = "60";
	$("#datatable6").html("");
	
	//alert(selyear+"\r\n"+selmonth+"\r\n"+selitype+"\r\n["+codetype);
	//return;
	
	$.ajax({
		url:"glPeriodBautotran!queryPeriodDir.action?year=" + selyear + "&period=" + selmonth + "&type=" + selitype+ "&codetype=" + codetype,		
		type:"post",
		datatype:"json",
  		async:false,
		success:function(data,status){
			var gridList = data.gridList;
			showPeriodTranDirGrid(gridList);
		}
	});
	
	
	
}


/**
 * 显示期间损益转账目录
 * @param userTrandirList
 */
function showPeriodTranDirGrid(gridList) {
	if (gridList==null) return;
	 var length = gridList.length;
	 
	 
	for (var i = 0; i<length; i++) {
		var rowValueList = gridList[i];
		$("#datatable6").append('<tr id="' +rowValueList[0]  
				+'" sycode="' +  rowValueList[1]						
				+'" csign="' + rowValueList[7]						
				+'"  bgcolor="#ffffff">'
				+'<td width="170" ondblClick="selectTd(this)">'+ strNullProc(rowValueList[1]) + '</td>'
				+'<td width="170" ondblClick="selectTd(this)">'+ strNullProc(rowValueList[2]) + '</td>'
				+'<td width="170" ondblClick="selectTd(this)">'+ strNullProc(rowValueList[3]) + '</td>'
				+'<td width="170" ondblClick="selectTd(this)">'+ strNullProc(rowValueList[4]) + '</td>'
				+'<td width="170" ondblClick="selectTd(this)">'+ strNullProc(rowValueList[5]) + '</td>'
				+'<td width="170" ondblClick="selectTd(this)">'+ strNullProc(rowValueList[6]) + '</td>'
				+'<td width="80"  ondblClick="selectTd(this)">'+"" + '</td>'
			+'</tr>');
		
	}
}





/**
 * 打开自定义转账设置窗体
 */
function openUserTran() {
	selitype = "10";
	//年份、月份、类型、凭证类型、凭证编号
	var param = {year:selyear,month:selmonth,type:selitype,csign:selcsign,ctranid:selctranid};
	window.parent.openWindow('gl_transfer_ats','gl_transfer_create',param);
}



/**
 * 打开对应结转转账设置窗体
 */
function openCspTran() {
	selitype = "20";
	var param = {year:selyear,month:selmonth,type:selitype};
	window.parent.openWindow('gl_transfer_mts','gl_transfer_create',param);
}

/**
 * 打开销售成本转账设置窗体
 */
function openSaleTran() {
	selitype = "30";
	var param = {year:selyear,month:selmonth,type:selitype};
	window.parent.openWindow('gl_transfer_costs','gl_transfer_create',param);
}

/**
 * 打开销售成本转账设置窗体
 */
function openSalePlanTran() {
	selitype = "40";
	var param = {year:selyear,month:selmonth,type:selitype};
	window.parent.openWindow('gl_transfer_pacost','gl_transfer_create',param);
}


/**
 * 打开汇兑损益转账设置窗体
 */
function openExchTran() {
	selitype = "50";
	var param = {year:selyear,month:selmonth,type:selitype};
	window.parent.openWindow('gl_transfer_egals','gl_transfer_create',param);
}

/**
 * 打开期间损益转账设置窗体
 */
function openPeriodTran() {
	selitype = "60";
	var param = {year:selyear,month:selmonth,type:selitype};
	window.parent.openWindow('gl_transfer_ppals','gl_transfer_create',param);
}

//选择编号、说明、凭证类别
var selBh = "";
var selText = "";
var selSign = "";
var clickBz = true; //双击标志
/**
 * 双击事件
 * @param td
 */
function selectTd(td) {
	selBh = td.parentNode.id;
	selText = td.parentNode.text;
	selSign = td.parentNode.csign;
	
	//对应结转
	if (selitype =="20") {
		var selBz = ""; 
		if (clickBz) {
			selBz="Y";
			 clickBz = false;
		 }
		 else {
			 selBz=""; 
			 clickBz = true;
		 }
		
		//转出科目编码
		var zccode = td.parentNode.zccode;
		
		var table = document.getElementById("datatable2");
		for(var i=0;i<table.rows.length;i++){
			var row = table.rows[i];
			//选择行转出code
			var selrowzccode = row.cells[3].innerHTML;
			//每次设置的对应结转都选中或者都不选中
			if (zccode==selrowzccode) {
				if(clickBz==true){

					$(row).css("background-color","#FFFFFF");
				}else{
					$(row).css("background-color","#c0ffc0");
				}
				row.cells[9].innerHTML=selBz;
			}
			
		}		
	}
	//汇兑损益结转
	else if (selitype =="50") {
		if (clickBz) {
			
			 var row = td.parentNode;
			 row.cells[3].innerHTML = "Y";
			 $(row).css("background-color","#c0ffc0");
			 clickBz = false;
		 }
		 else {
			 var row = td.parentNode;
			 row.cells[3].innerHTML = "";
			 
			 $(row).css("background-color","#FFFFFF");
			 clickBz = true;
		 } 
	}
	//期间损益结转
	else if (selitype =="60") {
		if (clickBz) {
			
			 var row = td.parentNode;
			 row.cells[6].innerHTML = "Y";
			 $(row).css("background-color","#c0ffc0");
			 clickBz = false;
		 }
		 else {
			 var row = td.parentNode;
			 row.cells[6].innerHTML = "";
			 
			 $(row).css("background-color","#FFFFFF");
			 clickBz = true;
		 } 
	}
	//自定义结转
	else if (selitype =="10") {
		if (clickBz) {
			
			 var row = td.parentNode;
			 row.cells[3].innerHTML = "Y";
			 $(row).css("background-color","#c0ffc0");
			 clickBz = false;
		 }
		 else {
			 var row = td.parentNode;
			 row.cells[3].innerHTML = "";
			 
			 $(row).css("background-color","#FFFFFF");
			 clickBz = true;
		 } 
	}
	
	
		 
}



//点击左边单选按钮右边显示相应的表格控制函数
function showtable(table_id){
	
	var ts = document.getElementById("table_container").getElementsByTagName("table");
	
	for(var i=0;i<ts.length;i++){
		if(ts[i].id!=table_id){
			ts[i].style.display="none";
		}else{
			ts[i].style.display="block";
		}
	}

	//如果点击“自定义转账”，还要把下面两个单选按钮显示出来
	if(table_id=="datatable_1"){
		document.getElementById("datatable_1_other").style.visibility="visible";
	}else{
		document.getElementById("datatable_1_other").style.visibility="hidden";
	}
	
}

/**
 * 得到期间损益转账设置的科目
 */
//转账科目列表：期间损益结账科目设置数组


function getSetPeriodCode() {
	//期间损益，第一个数组为利润科目，后面的数组为损益科目
	

	var trancodeList = [];
	var table = document.getElementById("datatable6");
	if (table.rows.length==0) {
		jAlert("请选择结转列后再进行月末结账！","提示");
		return null;
	}
	var lrkm = table.rows[0].getAttribute("id");
	trancodeList[0] = lrkm;
	for(var i=0;i<table.rows.length;i++){
		var row = table.rows[i];
		var mark = row.cells[6].innerHTML;
		if(mark == "Y"){
			trancodeList[trancodeList.length] = row.getAttribute("sycode");
		}
		
	}
	
	
    return trancodeList;
    
}

/**
 * 汇兑损益转账科目列表
 * @returns {Array}
 */
function getSetExchCode() {
//期间损益，第一个数组为利润科目，后面的数组为损益科目
	

	var trancodeList = [];
	var table = document.getElementById("datatable5");
	if (table.rows.length==0) {
		jAlert("请选择结转列后再进行月末结账！","提示");
		return null;
	}
	var lrkm = table.rows[0].getAttribute("id");
	trancodeList[0] = lrkm;
	for(var i=0;i<table.rows.length;i++){
		var row = table.rows[i];
		var mark = row.cells[3].innerHTML;
		if(mark == "Y"){
			trancodeList[trancodeList.length] = row.getAttribute("sycode");
		}
		
	}
	
	
    return trancodeList;
}


/**
 * 对应结转转账科目列表
 * @returns {Array}
 */
function getSetCspCode() {
//期间损益，第一个数组为利润科目，后面的数组为损益科目
	

	var trancodeList = [];
	var table = document.getElementById("datatable2");
	if (table.rows.length==0) {
		jAlert("请选择结转列后再进行月末结账！","提示");
		return null;
	}
	//var zckm = table.rows[0].getAttribute("id");
	//trancodeList[0] = zckm;
	for(var i=0;i<table.rows.length;i++){
		var row = table.rows[i];
		var zckm = row.getAttribute("id");
		var mark = row.cells[9].innerHTML;
		if(mark == "Y"){
			trancodeList[0] = zckm;
			trancodeList[trancodeList.length] = row.getAttribute("zrcode");
		}
		
	}
	
	
    return trancodeList;
}


/**
 * 自定义转账
 * @returns {Array}
 */
function getSetUserCode() {

	var trancodeList = [];
	var table = document.getElementById("datatable");
	if (table.rows.length==0) {
		jAlert("请选择结转列后再进行月末结账！","提示");
		return null;
	}
	//add by lval 20130710
	for(var i=0;i< table.rows.length;i++){
		var color = $(table.rows[i]).css("background-color");
		
		if(color=="#c0ffc0"){

		    trancodeList.push(table.rows[i].getAttribute("id"));
		}
	}
	
    return trancodeList;
}

/**
 * 销售成本转账科目列表
 * @returns {Array}
 */
function getSetSaleCode() {
//期间损益，第一个数组为利润科目，后面的数组为损益科目
	

	var trancodeList = [];
	var table = document.getElementById("datatable3");
	if (table.rows.length==0) {
		jAlert("请选择结转列后再进行月末结账！","提示");
		return null;
	}
	var cbkm = table.rows[0].getAttribute("id");
	trancodeList[0] = cbkm;
	
    return trancodeList;
}

/**
 * 执行月末转账
 */
function execBautoTran() {
	//辅助项目结转类型
	var addjzType = $("input[name='radiogroup_2']:checked").val();
	//记账凭证标志
	var jzpzFlag="1"; 
		if ($("#bhwjzpz").attr("checked"))
			jzpzFlag = "0";
		
	var exchName = $("#currencyselector").val();
	var paramObject = "baututranKey.iyear="  + selyear 
	          + "&baututranKey.iperiod=" + selmonth
	          + "&baututranKey.itype=" + selitype
	          + "&baututranKey.zzbh=" + selBh
	          + "&baututranKey.ctext=" + selText
	          +"&baututranKey.csign=" + selSign
	          +"&baututranKey.exchName=" + exchName
	          
	          + "&baututranKey.addjzType=" + addjzType
	          + "&baututranKey.jzpzFlag=" + jzpzFlag;
	var trancodeList = null;
	
	/**
	 * 初始化对应转账打开窗体
	 */
	var dsignBautotranUri = 'dsignBautotran';
	//自定义结转
	if (selitype == "10") {
		trancodeList = getSetUserCode();
		if (trancodeList==null) return;
		
		if(trancodeList.length==0){
			jAlert("请选择凭证！","提示");
			return;
		}
		
		
		
	}
	
	
	//对应结转
	if (selitype == "20") {
		trancodeList = getSetCspCode();
		if (trancodeList==null) return;
		if (trancodeList.length==0) {
			jAlert("请选择是否结转的科目后，再进行对应结转！","提示");
			return ;
		}
		if (trancodeList.length==1) {
			jAlert("请选择是否结转的科目后，再进行对应结转！","提示");
			return ;
		}
	}
	
	//销售成本结转
	if (selitype == "30") {
		trancodeList = getSetSaleCode();
		if (trancodeList==null) return;
		dsignBautotranUri = "gl_transfer_costgrid";
	}
	
	//汇兑损益
	if (selitype == "50") {
		trancodeList = getSetExchCode();
		if (trancodeList==null) return;
		dsignBautotranUri = "gl_transfer_egalgrid";
		if (trancodeList.length==1) {
			jAlert("请选择是否结转的汇兑损益科目后，再进行汇兑损益结转！","提示");
			return ;
		}
	}
	//期间损益
	if (selitype == "60") {
		trancodeList = getSetPeriodCode();
		if (trancodeList==null) return;
		if (trancodeList.length==1) {
			jAlert("请选择是否结转的期间损益科目后，再进行期间损益结转！","提示");
			return ;
		}
		
	}
	
	if (trancodeList==null) return;
	var param = {};
	param.paramObject = paramObject;
	param.seltype = selitype ;
	
	param.iyear = selyear ;
	param.iperiod = selmonth ;
	param.csign = selSign ;
	param.pzbh = selBh ;
	//汇兑损益
	if (selitype == "50") {
		param.exchid = selExchId;
		param.exchname = selExchName;
		
	}
	param.trancodeList = trancodeList;
	window.parent.openWindow(dsignBautotranUri,'gl_transfer_create',param);
	window.parent.closeWindow('gl_transfer_create');
}

/**
 * 期间损益类型选择事件
 */
function selectCodeType() {
	var value = $("#codetypeselector").val();
	queryPeriodTranDirGrid(value);
	
}

/**
 * 列表全选
 */
function allSelectGrid() {
	
	//期间损益结转
	if (selitype==60) {
		var table = document.getElementById("datatable6");
		for(var i=0;i<table.rows.length;i++){
			var row = table.rows[i];
			if (i==0) {
				selSign = row.getAttribute("csign");
			}
			$(row).css("background-color","#c0ffc0");
			row.cells[6].innerHTML = "Y";
		}
	}
	
	//汇兑损益结转
	if (selitype==50) {
		var table = document.getElementById("datatable5");
		for(var i=0;i<table.rows.length;i++){
			var row = table.rows[i];
			if (i==0) {
				selSign = row.getAttribute("csign");
			}
			$(row).css("background-color","#c0ffc0");

			row.cells[3].innerHTML = "Y";
		}
	}
	
	//对应结转
	if (selitype==20) {
		var table = document.getElementById("datatable2");
		for(var i=0;i<table.rows.length;i++){
			var row = table.rows[i];
			if (i==0) {
				selSign = row.getAttribute("csign");
			}
			$(row).css("background-color","#c0ffc0");

			row.cells[9].innerHTML = "Y";
		}
	}
	
	//自定义结转
	if (selitype==10) {
		var table = document.getElementById("datatable");
		for(var i=0;i<table.rows.length;i++){
			var row = table.rows[i];
			if (i==0) {
				selSign = row.getAttribute("csign");
			}
			$(row).css("background-color","#c0ffc0");

			row.cells[3].innerHTML = "Y";
		}
	}

}

/**
 * 列表全消
 */
function allcancelSelectGrid() {
	//期间损益结转
	if (selitype==60) {
		var table = document.getElementById("datatable6");
		for(var i=0;i<table.rows.length;i++){
			var row = table.rows[i];
			$(row).css("background-color","#FFFFFF");
			row.cells[6].innerHTML = "";
		}
	}
	
	//汇兑损益结转
	if (selitype==50) {
		var table = document.getElementById("datatable5");
		for(var i=0;i<table.rows.length;i++){
			var row = table.rows[i];
			$(row).css("background-color","#FFFFFF");
			row.cells[3].innerHTML = "";
		}
	}
	
	//对应结转
	if (selitype==20) {
		var table = document.getElementById("datatable2");
		for(var i=0;i<table.rows.length;i++){
			var row = table.rows[i];
			$(row).css("background-color","#FFFFFF");
			row.cells[9].innerHTML = "";
		}
	}
	
	//自定义结转
	if (selitype==10) {
		var table = document.getElementById("datatable");
		for(var i=0;i<table.rows.length;i++){
			var row = table.rows[i];
			$(row).css("background-color","#FFFFFF");
			row.cells[3].innerHTML = "";
		}
	}
}

