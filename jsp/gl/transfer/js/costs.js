
/**
 * 
 * @DESCRIBE   销售收入js
 * @AUTHOR     王丙建
 * @DATE       2012-11-28
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

var selyear = "2012"; 
var selmonth = "11";
var selitype = "30";

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
			$("#TranList").empty();
			$.each(dsignList,function(index,dsign){
				$("#TranList")[0].options.add(new Option(dsign.csign + " " + dsign.ctext,dsign.csign,false,false));
			});
		}
	});
});


/**
 * 查询销售成本列表
 * @param iyear
 * @param iperiod
 * @param itype
 */
function querySaleBautotran(iyear, iperiod, itype) {
	selyear = iyear; 
	selmonth = iperiod;
	selitype = itype;
	$.ajax({
		url:"glSaleBautotran!querySaleButtonGrid.action?year=" + selyear + "&period=" + selmonth + "&type=" + selitype ,		
		type:"post",
		datatype:"json",
		success:function(data,status){
			var glSaleBautotranList = data.glSaleBautotranList;
			initSaleTranidList(glSaleBautotranList);
		}
	});
}

/**
 * 初始化销售成本
 * @param glSaleBautotranList
 */
function initSaleTranidList(glSaleBautotranList) {
	var glSaleBautotran = glSaleBautotranList[0];
	 
	if (glSaleBautotran==null) return;

	$("#TranList").val(glSaleBautotran.csign);
	var curKccode = glSaleBautotran.kccode;
	var curSrcode = glSaleBautotran.srcode;
	var curCbcode = glSaleBautotran.cbcode;
	var codelength = glSaleBautotran.codelength; 
	curKccode = curKccode.substr(0,codelength);
	curSrcode = curSrcode.substr(0,codelength);
	curCbcode = curCbcode.substr(0,codelength);
	
	
	$("#kccode").val(curKccode);
	//收入科目编码
	$("#srcode").val(curSrcode);
	//成本科目编码
	$("#cbcode").val(curCbcode);
	

	
};


/**
 * 保存销售成本
 */
function saveSaleButtoTran() {
	var data = getSaleValue();
	if (data!="false") {
		$.ajax({
			url:"glSaleBautotran!saveSaleBautotran.action",		
			type:"post",
			data:data,
			datatype:"json",
			success:function(data,status){
				jAlert("保存成功！","提示",function(){
					
					
					window.parent.closeWindow('gl_transfer_costs');
				});
			}
		});
	}
}

/**
 * 得到销售成本值
 * @returns {String}
 */
function getSaleValue() {
	//凭证类别
	//var tranid = $("#TranList").find("option:selected").text();
	var tranid = $("#TranList").val();
	//库存科目编码
	var kccode = $("#kccode").val();
	//收入科目编码
	var srcode = $("#srcode").val();
	//成本科目编码
	var cbcode = $("#cbcode").val();
	var codelength = kccode.length;
	/*李波调整   2013-11-08*/
	if (kccode=="") {
		jAlert("库存商品科目不能为空！","提示");
		return "false";
	}
	
	if (srcode=="") {
		jAlert("商品销售收入科目不能为空！","提示");
		return  "false";
	}
	
	if (cbcode=="") {   
		jAlert("商品销售成本科目不能为空！","提示");
		return  "false";
	}
	/*调整结束   2013-11-08*/
	if (isEqualsStructCode(kccode,srcode)==false) {
		jAlert("库存商品科目和收入科目结构不一致！","提示");
		return "false";	
	}
	if (isEqualsStructCode(kccode,cbcode)==false) {
		jAlert("库存商品科目和成本科目结构不一致！","提示");
		return "false";	
	}

	if (isEqualsStructCode(srcode,cbcode)==false) {
		jAlert("收入科目和成本科目结构不一致！","提示");
		return "false";	
	}
	
	if (isCodeCmeasure(kccode) ==false) {
		var msg = "库存商品科目(" + kccode + ")定义数量核算！";
		jAlert(msg,"提示");
		return  "false";
	}
	
	if (isCodeCmeasure(srcode) ==false) {
		var msg = "商品销售收入科目(" + srcode + ")定义数量核算！";
		jAlert(msg,"提示");
	   return  "false";
	}
	
	if (isCodeCmeasure(cbcode) ==false) {
		var msg = "商品销售成本科目(" + cbcode + ")定义数量核算！";
		jAlert(msg,"提示");
		return  "false";
	}
	//凭证类别
	var srcode = $("#srcode").val();
	var cbcode = $("#cbcode").val();
	//月末结转方法
	var ymjzfs = $("input[name='rg_1']:checked").val();
	//差异率技术方法
	var cyjsfs="0"; 
	if ($("#cb_1").attr("checked"))
		cyjsfs = "1";
	
	//编号：
	var ctranid = selmonth + "1";

	var strData = "&glSaleBautotran.csign=" + tranid + "&glSaleBautotran.srcode=" + srcode 
	             + "&glSaleBautotran.kccode=" + kccode + "&glSaleBautotran.cbcode=" + cbcode
	             + "&glSaleBautotran.codelength=" + codelength 
		            
	             + "&glSaleBautotran.ymjzfs=" + ymjzfs + "&glSaleBautotran.cyjsfs=" + cyjsfs
	             + "&glSaleBautotran.iyear=" + selyear + "&glSaleBautotran.iperiod=" + selmonth
	             + "&glSaleBautotran.ctranid=" + ctranid 	             
	             + "&glSaleBautotran.itype=" + selitype +"&glSaleBautotran.inid=" + "1";
	
	return strData;
}






function onWindowClose(){
	
	try{
		
		var radio = window.parent.getParentWindow('gl_transfer_costs').document.getElementById("radio_3");
		radio.checked=true;
		radio.onclick();
	}catch(e){}
}



