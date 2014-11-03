
/**
 * 仓库档案修改界面js
 * @AUTHOR     孙敬行
 * @DATE       2013-7-16
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 * 
 */

$(document).ready(function (){
	
	
	
});



function updateWarehouse() {
	var id =  $("#id").val();
	var cwhcode = $("#cwhcode").val();
	var cwhname = $("#cwhname").val();
	var cwhaddress = $("#cwhaddress").val();
	var cdepcode = $("#cdepcode").attr("cdepcode");
	var cdepid = $("#cdepcode").attr("cdepid");
	var cwhvaluestyle = $("#cwhvaluestyle").val();
	var cwhphone = $("#cwhphone").val();
	var cwhperson = $("#cwhperson").val();
	var bwhpos = $("#bwhpos").val();
	var iwhfundquota = $("#iwhfundquota").val();
	var cwhmemo = $("#cwhmemo").val();

	if ($("#cwhcode").val() == "") {
		jAlert("仓库编码不允许为空！");
		$("#cwhcode").focus();
		return false;
	}
	if ($("#cwhname").val() == "") {
		jAlert("仓库名称不允许为空！");
		$("#cwhname").focus();
		return false;
	}


	

	var warehouse = "warehouse.id="+id+"&warehouse.cwhcode=" + cwhcode + "&warehouse.cwhname="
			+ cwhname + "&warehouse.cwhaddress=" + cwhaddress
			+ "&warehouse.cdepcode=" + cdepcode + "&warehouse.cdepid=" + cdepid

			+ "&warehouse.cwhphone=" + cwhphone + "&warehouse.cwhperson="
			+ cwhperson + "&warehouse.bwhpos=" + bwhpos
			+ "&warehouse.iwhfundquota=" + iwhfundquota + "&warehouse.cwhmemo="
			+ cwhmemo + "&warehouse.cwhvaluestyle=" + cwhvaluestyle;
	$.ajax({
		url : "warehouse!Update.action",
		type : 'post',
		data : warehouse,
		dataType : "json",
		async : false,

		error : function() {
			jAlert("请求失败!");
		},
		success : function(data) {
			window.parent.getParentWindow('pu_warehouse_update').selectWarehouse();
			window.parent.closeWindow('pu_warehouse_update');
		}
	});
}


// 接收弹出窗体返回值函数
function deliverValue(valueObject) {
//	alert("!!!!!!!!!!!!!!!!");
	selId = valueObject.id;
	selCode = valueObject.ccode;
	selName = valueObject.cname;
	$("#cdepcode").val(selName);
	$("#cdepcode").attr("cdepid", selId);
	$("#cdepcode").attr("cdepcode", selCode);
}


