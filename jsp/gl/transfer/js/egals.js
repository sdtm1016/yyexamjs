
/**
 * 
 * @DESCRIBE   js
 * @AUTHOR     王丙建
 * @DATE       2012-11-30
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

var selyear = ""; 
var selmonth = "";
var selitype = "50";

/**
 * 页面初始化
 */
$(document).ready(function(){
	//凭证类别初始化
	$.ajax({
		url: "dsignCategory!queryList",
		type: 'post',
		async:false,
		dataType: "json",
		success: function(data){
			var dsignList =data.dsigns;
			$("#signList").empty();
			$.each(dsignList,function(index,dsign){
				$("#signList")[0].options.add(new Option(dsign.ctext,dsign.csign,false,false));
			});
		}
	});
	
	//外币科目类别初始化
	/**
	$("#datatable_rows").html("");
	$.ajax({
		url: "code!queryCodeListByExch?exchName=cexchName",
		type: 'post',
		async:false,
		dataType: "json",
		success: function(data){
			var exchcodeList =data.codes;
			initexchCodeList(exchcodeList);
		}
	});
	*/
	
	
});

/**
 * 初始化外币科目列表
 * @param codeList
 */
function initexchCodeList(codeList) {
	var length =  codeList.length;
    for (var i = 0; i<length; i++) {
		var exchCode = codeList[i];
		$("#datatable_rows").append('<tr id="' + exchCode.id  
			+'" text="' + exchCode.ccodeName
			+'" csign="' +  exchCode.ccode						
			+'"  bgcolor="#ffffff">'
			+'<td width="70" >'+ strNullProc(exchCode.ccode) + '</td>'
			+'<td width="70" >'+ strNullProc(exchCode.ccodeName) + '</td>'
			+'<td width="70" >'+ strNullProc(exchCode.cexchName) + '</td>'
			+'<td width="80"  ondblClick="selectTd(this)">'+"" + '</td>'	
			+'</tr>');
	}
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
	 if (clickBz) {
		 td.innerHTML="Y";
		 clickBz = false;
	 }
	 else {
		 td.innerHTML=""; 
		 clickBz = true;
	 } 
		 
}
/**
 * 查询汇兑损益列表
 * @param iyear
 * @param iperiod
 * @param itype
 */
function queryExchBautotran(iyear, iperiod, itype) {
	selyear = iyear; 
	selmonth = iperiod;
	selitype = itype;
	//alert (selyear + "\t" + selmonth + "\t" + selitype);
	$("#datatable_rows").html("");
	$.ajax({
		url:"glExchBautotran!queryExchButtonGrid.action?year=" + selyear + "&period=" + selmonth + "&type=" + selitype ,		
		type:"post",
		datatype:"json",
		success:function(data,status){
			var glExchBautotranList = data.glExchBautotranList;
			initExchTranidList(glExchBautotranList);
		}
	});
}

/**
 * 初始化汇兑损益
 * @param glSaleBautotranList
 */
function initExchTranidList(glExchBautotranList) {
    if (glExchBautotranList.length==0)
    	return;
	$("#signList").val(glExchBautotranList[0].csign);
	//汇兑损益入账科目
	$("#rzcode").val(glExchBautotranList[0].rzcode);

	for (var i = 0; i<glExchBautotranList.length; i++) {
		var glExchBautotran = glExchBautotranList[i];
		$("#datatable_rows").append('<tr id="' + glExchBautotran.id  
			+'" text="' + glExchBautotran.exchcodename
			+'" csign="' +  glExchBautotran.csign						
			+'"  bgcolor="#ffffff">'
			+'<td width="70" >'+ strNullProc(glExchBautotran.exchcode) + '</td>'
			+'<td width="70" >'+ strNullProc(glExchBautotran.exchcodename) + '</td>'
			+'<td width="70" >'+ strNullProc(glExchBautotran.exchcodebz) + '</td>'
			+'<td width="80"  ondblClick="selectTd(this)">'+ strNullProc(glExchBautotran.exchcodeflag) + '</td>'				
			+'</tr>');
		
		
	}
		
};


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
	 if (clickBz) {
		 td.innerHTML="Y";
		 clickBz = false;
	 }
	 else {
		 td.innerHTML=""; 
		 clickBz = true;
	 } 
		 
}


/**
 * 保存汇兑损益
 */
function saveExchButtoTran() {
	
	
	var rzcode = $("#rzcode").val();
	if (rzcode==null || rzcode=="") return;
	var queryFlag = true;
   $.ajax({
		url:"code!queryCodeAbsName.action?ccode=" + rzcode,		
		type:"post",
		async:false,
		datatype:"json",
		success:function(data,status){
			
			if(data.absCodeName==""){
				jAlert("科目不存在，请重新输入！","提示");
				queryFlag = false;
			}
		}
	});
	if(queryFlag==false){
		return false;
	}
	
	
	
	
	
	 var data = "";
	  var glExchBautotranList = getExchValue();
	  if (glExchBautotranList==null) return;
	  var length = glExchBautotranList.length;
	  for (var i = 0; i<length; i++) {
		  var glExchBautotran = glExchBautotranList[i];
		  var strTRow = glExchBautotranToStringArray(glExchBautotran,i);
		  data = data + strTRow;
	  }
		

	  if(data==""){
		jAlert("无外币科目！");
		return false;
	  }
	  
	  
	  $("#btnConfirm").attr("disabled","disabled");
	$.ajax({
		url:"glExchBautotran!saveExchBautotran.action",		
		type:"post",
		data:data,
		datatype:"json",
		success:function(data,status){
			jAlert("保存成功！","提示",function(){
				
			
				
				window.parent.closeWindow('gl_transfer_egals');
			});
		},
		error:function(data,status){
			jAlert("科目错误！","提示");
			 $("#btnConfirm").attr("disabled",false);
		}
	});
	
}



function onWindowClose(){
	try{
		var radio = window.parent.getParentWindow('gl_transfer_egals').document.getElementById("radio_5");
		radio.checked=true;
		radio.onclick();
	}catch(e){}
}




/**
 * 得到汇兑损益值
 * @returns {String}
 */
function getExchValue() {
	
	
	//凭证类别
	var csign = $("#signList").val();
	//汇兑损益入账科目
	var rzcode = $("#rzcode").val();
	var tb = document.getElementById("datatable_rows");
	var length = tb.rows.length;
	var glExchBautotranList = new Array(length);
	for(var i=0;i<length;i++){
		var exchcode = tb.rows[i].cells[0].innerHTML;
		var exchcodename = tb.rows[i].cells[1].innerHTML;
		var exchcodebz = tb.rows[i].cells[2].innerHTML;
		var exchcodeflag = tb.rows[i].cells[3].innerHTML;
		var curExchBautoTran = new exchbautoTran();
		curExchBautoTran.iyear = selyear;
		curExchBautoTran.iperiod = selmonth;
		curExchBautoTran.itype = selitype;
		curExchBautoTran.ctranid = selmonth+i;
		
		curExchBautoTran.inid = i;
		curExchBautoTran.csign = csign;
		curExchBautoTran.rzcode = rzcode;
		
		curExchBautoTran.exchcode = exchcode;
		curExchBautoTran.exchcodename = exchcodename;
		curExchBautoTran.exchcodebz = exchcodebz;
		curExchBautoTran.exchcodeflag = exchcodeflag;
		
		glExchBautotranList[i] = curExchBautoTran;
	}	
		
	return glExchBautotranList;
}