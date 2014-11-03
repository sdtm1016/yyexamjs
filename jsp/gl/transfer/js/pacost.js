/**
 * 
 * @DESCRIBE   销售收入(计划价)js
 * @AUTHOR     王丙建
 * @DATE       2012-11-29
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

var selyear = "2012"; 
var selmonth = "11";
var selitype = "40";

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
});


/**
 * 查询销售成本（计划价）列表
 * @param iyear
 * @param iperiod
 * @param itype
 */
function querySalePlanBautotran(iyear, iperiod, itype) {
	selyear = iyear; 
	selmonth = iperiod;
	selitype = itype;
	$.ajax({
		url:"glSaleBautotran!querySaleButtonGrid.action?year=" + selyear + "&period=" + selmonth + "&type=" + selitype ,		
		type:"post",
		datatype:"json",
		success:function(data,status){
			var glSaleBautotranList = data.glSaleBautotranList;
			initSalePlanTranidList(glSaleBautotranList);
		}
	});
}

/**
 * 初始化销售成本（计划价）
 * @param glSaleBautotranList
 */
function initSalePlanTranidList(glSaleBautotranList) {
	var glSaleBautotran = glSaleBautotranList[0];
	if (glSaleBautotran==null) return;

	$("#TranList").val(glSaleBautotran.csign);
	$("#kccode").val(glSaleBautotran.kccode);
	//收入科目编码
	$("#srcode").val(glSaleBautotran.srcode);
	//成本科目编码
	$("#cbcode").val(glSaleBautotran.cbcode);
	//差异科目编码
	$("#cycode").val(glSaleBautotran.cycode);


	
};


/**
 * 保存销售成本（计划价）
 */
function saveSalePlanButtoTran() {
	var data = getSalePlanValue();

	  $("#btnConfirm").attr("disabled","disabled");
	$.ajax({
		url:"glSaleBautotran!saveSaleBautotran.action",		
		type:"post",
		data:data,
		datatype:"json",
		success:function(data,status){
			jAlert("保存成功！","提示",function(){
				
				window.parent.closeWindow('gl_transfer_pacost');
				
			});
		}
	});
	
}



function onWindowClose(){
	try{
		
		var radio = window.parent.getParentWindow('gl_transfer_pacost').document.getElementById("radio_4");
		radio.checked=true;
		radio.onclick();
	}catch(e){}
}





/**
 * 得到销售成本（计划价）值
 * @returns {String}
 */
function getSalePlanValue() {
	//凭证类别
	var csign = $("#signList").find("option:selected").text();
	//库存科目编码
	var kccode = $("#kccode").val();
	//收入科目编码
	var srcode = $("#srcode").val();
	//成本科目编码
	var cbcode = $("#cbcode").val();
	//差异科目编码
	var cycode = $("#cycode").val();
	
	//差异额计算方法
	var cejzfs = $("input[name='rg_1']:checked").val();
	
	//月末结转方法
	var ymjzfs = $("input[name='rg_2']:checked").val();
	//差异率技术方法
	var cyjsfs=  $("input[name='rg_3']:checked").val(); 
	
	//编号：
	var ctranid = selmonth + "1";

	var strData = "&glSaleBautotran.csign=" + csign + "&glSaleBautotran.srcode=" + srcode 
	             + "&glSaleBautotran.kccode=" + kccode + "&glSaleBautotran.cbcode=" + cbcode
	             + "&glSaleBautotran.ymjzfs=" + ymjzfs + "&glSaleBautotran.cyjsfs=" + cyjsfs
	             + "&glSaleBautotran.iyear=" + selyear + "&glSaleBautotran.iperiod=" + selmonth
	             + "&glSaleBautotran.ctranid=" + ctranid + "&glSaleBautotran.cycode=" + cycode         
	             + "&glSaleBautotran.cejzfs=" + cejzfs   	             
	             + "&glSaleBautotran.itype=" + selitype +"&glSaleBautotran.inid=" + "1";
	
	return strData;
}