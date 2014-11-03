
/**
 * 
 * @DESCRIBE   期间损益结转js
 * @AUTHOR     王丙建
 * @DATE       2012-11-30
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

var selyear = "2012"; 
var selmonth = "11";
var selitype = "60";


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
				$("#signList")[0].options.add(new Option(dsign.csign + " " + dsign.ctext,dsign.csign,false,false));
			});
		}
	});
});




/**
 * 查询期间损益结转列表
 * @param iyear
 * @param iperiod
 * @param itype
 */
function queryPeriodBautotran(iyear, iperiod, itype) {
	selyear = iyear; 
	selmonth = iperiod;
	selitype = itype;
	$("#datatable_rows").html("");
	$.ajax({
		url:"glPeriodBautotran!querPeriodButtonGrid.action?year=" + selyear + "&period=" + selmonth + "&type=" + selitype ,		
		type:"post",
		datatype:"json",
		success:function(data,status){
			var glPeriodBautotranList = data.glPeriodBautotranList;
			initPeriodTranidList(glPeriodBautotranList);
		}
	});
}

/**
 * 初始化期间损益结转
 * @param glSaleBautotranList
 */
function initPeriodTranidList(glPeriodBautotranList) {
	var glPeriodBautotran = glPeriodBautotranList[0];
	if (glPeriodBautotran==null) return;
	
	$("#signList").val(glPeriodBautotran.csign);
	//本年利润编码
	$("#yearlrcode").val(glPeriodBautotran.yearlrcode);
	
	for (var i = 0; i<glPeriodBautotranList.length; i++) {
		var glPeriodBautotran = glPeriodBautotranList[i];
		$("#datatable_rows").append('<tr id="' + glPeriodBautotran.id  
			+'" text="' + glPeriodBautotran.yearlrcode
			+'" csign="' +  glPeriodBautotran.csign						
			+'"  bgcolor="#ffffff">'
			+'<td width="70" >'+ strNullProc(glPeriodBautotran.sycode) + '</td>'
			+'<td width="70" >'+ strNullProc(glPeriodBautotran.sycodename) + '</td>'
			+'<td width="70" >'+ strNullProc(glPeriodBautotran.sycodeclass) + '</td>'
			+'<td width="70" >'+ strNullProc(glPeriodBautotran.lrcode) + '</td>'
			+'<td width="70" >'+ strNullProc(glPeriodBautotran.lrcodename) + '</td>'
			+'<td width="70" >'+strNullProc( glPeriodBautotran.lrcodeclass) + '</td>'
			+'<td width="70" style="display:none">'+strNullProc( glPeriodBautotran.sycodetype) + '</td>'
			
			+'</tr>');
	}
	
};


/**
 * 保存期间损益结转
 */
function savePeriodButtoTran() {
	//本年利润编码
	var yearlrcode = $("#yearlrcode").val();
	if (yearlrcode==null) return;
	var queryFlag = true;
   $.ajax({
		url:"code!queryCodeAbsName.action?ccode=" + yearlrcode,		
		type:"post",
		async:false,
		datatype:"json",
		success:function(data,status){
			
			if(data.absCodeName!=""){
				
				var absCodeName = data.absCodeName;
				var tb = document.getElementById("datatable_rows");
				var length = tb.rows.length;
				for(var i=0;i<length;i++){
					tb.rows[i].cells[3].innerHTML = yearlrcode;
					tb.rows[i].cells[4].innerHTML = absCodeName;
					
				}
			}else{
				jAlert("科目不存在，请重新输入！","提示");
				queryFlag = false;
			}
		}
	});
	if(queryFlag==false){
		return false;
	}
	
	
	
	 var data = "";
	  var glPeriodBautotranList = getPeriodValue();
	  if (glPeriodBautotranList==null) return;
	  var length = glPeriodBautotranList.length;
	  
	  
	  
	  for (var i = 0; i<length; i++) {
		  var glPeriodBautotran = glPeriodBautotranList[i];
		  var strTRow = glPeriodBautotranToStringArray(glPeriodBautotran,i);
		  data = data + strTRow;
	  }
	  
	  
	  $("#btnConfirm").attr("disabled","disabled");
	$.ajax({
		url:"glPeriodBautotran!savePeriodBautotran.action",		
		type:"post",
		data:data,
		datatype:"json",
		success:function(data,status){
			jAlert("保存成功！","提示",function(){
				
				
				window.parent.closeWindow('gl_transfer_ppals');
			});
		},
		error:function(data,status){
			jAlert("科目不存在，请重新输入！","提示");
			 $("#btnConfirm").attr("disabled",false);
		}
	});
	
}



function onWindowClose(){
	try{
		
		var radio = window.parent.getParentWindow('gl_transfer_ppals').document.getElementById("radio_6");
		radio.checked=true;
		radio.onclick();
	}catch(e){
		
	}
}





/**
 * 得到期间损益结转值
 * @returns {String}
 */
function getPeriodValue() {
	//凭证类别
	//var csign = $("#signList").find("option:selected").text();
	 var csign = $("#signList ").val();
	//本年利润编码
	var yearlrcode = $("#yearlrcode").val();
	var tb = document.getElementById("datatable_rows");
	var length = tb.rows.length;
	var glPeriodBautotranList = new Array(length);
	for(var i=0;i<length;i++){
		var sycode = tb.rows[i].cells[0].innerHTML;
		var sycodename = tb.rows[i].cells[1].innerHTML;
		var sycodeclass = tb.rows[i].cells[2].innerHTML;
		var lrcode = tb.rows[i].cells[3].innerHTML;
		var lrcodename = tb.rows[i].cells[4].innerHTML;
		var lrcodeclass = tb.rows[i].cells[5].innerHTML;
		var sycodetype = tb.rows[i].cells[6].innerHTML;
		//var lrcodetype = tb.rows[i].cells[6].innerHTML;
		var lrcodetype = "QY";
		var curPeriodBautoTran = new periodbautoTran();
		curPeriodBautoTran.iyear = selyear;
		curPeriodBautoTran.iperiod = selmonth;
		curPeriodBautoTran.itype = selitype;
		curPeriodBautoTran.ctranid = selmonth+i;
		
		curPeriodBautoTran.inid = i;
		curPeriodBautoTran.csign = csign;
		curPeriodBautoTran.yearlrcode = yearlrcode;
		
		curPeriodBautoTran.sycode = sycode;
		curPeriodBautoTran.sycodename = sycodename;
		curPeriodBautoTran.sycodeclass = sycodeclass;
		curPeriodBautoTran.sycodetype = sycodetype;
		
		curPeriodBautoTran.lrcode = lrcode;
		curPeriodBautoTran.lrcodename = lrcodename;
	
		curPeriodBautoTran.lrcodetype = lrcodetype;
		curPeriodBautoTran.lrcodeclass = lrcodeclass;
		
		glPeriodBautotranList[i] = curPeriodBautoTran;
	}	
		
	return glPeriodBautotranList;
	
}


function yearlrcodeBlur(obj) {
	//本年利润编码
	var yearlrcode = $("#yearlrcode").val();
	if (yearlrcode==null) return;
   $.ajax({
		url:"code!queryCodeAbsName.action?ccode=" + yearlrcode,		
		type:"post",
		async:false,
		datatype:"json",
		success:function(data,status){
			
			if(data.absCodeName!=""){
				
				var absCodeName = data.absCodeName;
				var tb = document.getElementById("datatable_rows");
				var length = tb.rows.length;
				for(var i=0;i<length;i++){
					tb.rows[i].cells[3].innerHTML = yearlrcode;
					tb.rows[i].cells[4].innerHTML = absCodeName;
					
				}
			}else{
				jAlert("科目不存在，请重新输入！","提示");
				
			}
		}
	});
	
}


//取消函数：
function cancel(){
	
	//window.parent.getWindow('gl_transfer_create').queryPeriodTranDirGrid("");
	window.parent.closeWindow('gl_transfer_ppals');
}