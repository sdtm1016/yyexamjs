/**
 * 
 * @DESCRIBE   部门分类参照列表js
 * @AUTHOR     王丙建
 * @DATE       2012-12-06
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

/**
 * 初始化查找
 */
$(document).ready(function() {
	queryAllLast();
});

/**
 * 显示末级的部门分类列表
 */
function queryAllLast() {
	$("#include").html("");
	$.ajax({
		url : "department!queryListDepartment.action",
		type : "post",
		datatype : "json",
		success : function(data, status) {
			var departmentList = data.departmentList;
			if (departmentList.length > 0) {
				for ( var j = 0; j < departmentList.length; j++) {
					$("#include").append(
							'<tr ondblclick="selected(this);" id ="'
									+ departmentList[j].id + '" name="'
									+ departmentList[j].cdepname
									+ '" bgcolor="#fcfcfc">' + '<td >'
									+ departmentList[j].cdepcode + '</td>'
									+ '<td >' + departmentList[j].cdepname
									+ '</td>' + '<td> </td>' + '</tr>');
				}
			}
		}

	});
}

/**
 * 得到选择行的id、编码、名称
 */
function selected(row) {
	
	var selId = row.id;
	var selCode = row.cells[0].innerHTML;
	var selName = row.cells[1].innerHTML;

	var param = {};
	param.id = selId;
	param.ccode = selCode;
	param.cname = selName;
	// 付返回值
	//window.parent.getParentWindow('basic_grid_departmentGridRef').setCustomer(param);
	window.parent.deliverValue("basic_grid_departmentGridRef",param);
	//关闭本窗体
	window.parent.closeWindow('basic_grid_departmentGridRef');

}
