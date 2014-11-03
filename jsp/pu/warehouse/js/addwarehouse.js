/**
 * 
 * @DESCRIBE   仓库档案添加界面js
 * @AUTHOR     孙敬行
 * @DATE       2013-7-16
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

/**
 * 增加保存
 */
// 保存部门时检查方法
function saveWarehouse() {
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
		jAlert("仓库编码不允许为空！","提示信息",function(){
			$("#cwhcode").focus();
		});
		return false;
	}
	if ($("#cwhname").val() == "") {
		jAlert("仓库名称不允许为空！","提示信息",function(){
			$("#cwhname").focus();
		});
		return false;
	}
	if ($("#iwhfundquota").val() == "提示信息") {
		jAlert("资金定额为数字！","提示信息",function(){
			$("#iwhfundquota").focus();			
		});
		return false;
	}
	if ($("#cdepcode").val() == "") {
		jAlert("请选择部门！","提示信息",function(){
			$("#cdepcode").focus();			
		});
		return false;
	}
	var	flag = true;
	var warehouse = "warehouse.cwhcode=" + cwhcode + "&warehouse.cwhname="
			+ cwhname + "&warehouse.cwhaddress=" + cwhaddress
			+ "&warehouse.cdepcode=" + cdepcode + "&warehouse.cdepid=" + cdepid
			+ "&warehouse.cwhphone=" + cwhphone + "&warehouse.cwhperson="
			+ cwhperson + "&warehouse.bwhpos=" + bwhpos
			+ "&warehouse.iwhfundquota=" + iwhfundquota + "&warehouse.cwhmemo="
			+ cwhmemo + "&warehouse.cwhvaluestyle=" + cwhvaluestyle;
	$.ajax({
		url : "warehouse!create.action",
		type : 'post',
		data : warehouse,
		dataType : "json",
		async : false,

		error : function() {
			jAlert("请求失败!");
		},
		success : function(data) {
			if(data.warehouse==false){
				jAlert("该仓库编号已经被使用，请重新输入仓库编号!","提示信息",function(){
					$("#cwhcode").focus();
				});
				flag = false;
			}
			window.parent.getParentWindow('pu_warehouse_add').selectWarehouse();
			window.parent.closeWindow('pu_warehouse_add');
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


