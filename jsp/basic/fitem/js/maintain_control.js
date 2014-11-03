$(function() {
	queryFitemss(fitemClass);

});
var fitemData = "";
/**
 * 查询自定义项目目录数据
 * 
 * @param fitemClass
 */
function queryFitemss(fitemClass) {
	$.ajax({
		url : "fitem!findFitemss.action?fitemClass=" + fitemClass,
		type : "post",
		datatype : "json",
		async : false,
		success : function(data, status) {
			var fitemstructureList = data.fitemstructures2;
			var fitemss = data.fitemss;
			fitemssData = null;
			fitemssData = fitemss;
			fitemData = fitemss;
			var str = "<tr isData='-1' id='datatable_1_header'>";
			for ( var i = 0; i < fitemstructureList.length; i++) {
				var f = fitemstructureList[i];
				// var citemSqr=f.citemSqr;//字段顺序号
				// var cfieldName=f.cfieldName;//字段名称 数据对应 column
				var ctext = f.ctext; // 显示文本
				var blist = f.blist;// 是否显示1显示，0否
				var itype = f.itype;
				if (blist == 1) {
					if (itype == 3) {
						str += "<td width='80' typemethod='文本' >" + ctext
								+ "</td>";
					} else if (itype == 4) {
						str += "<td width='80' typemethod='日期' >" + ctext
								+ "</td>";
					} else {
						str += "<td width='80'>" + ctext + "</td>";
					}

				}
			}
			str += "</tr>";
			$("#datatable_1 thead").empty();
			$("#datatable_1 thead").html(str);
			$("#datatable_1 tbody").empty();
			var str1 = "";
			for ( var j = 0; j < fitemss.length; j++) {
				var itemss = fitemss[j];
				var id = itemss.id;
				str1 += "<tr id='" + id + "' isdata='1' bgcolor='#fff'>";
				for ( var i = 0; i < fitemstructureList.length; i++) {
					var f = fitemstructureList[i];
					var citemSqr = f.citemSqr;// 字段顺序号
					var cfieldName = f.cfieldName;// 字段名称 数据对应 column
					var blist = f.blist;// 是否显示1显示，0否
					if (blist == 1) {
						if (citemSqr == 3) {
							if (itemss[cfieldName] == 1) {
								str1 += "<td name='" + cfieldName
										+ "'  style='color:red'>Y</td>";
							} else {
								str1 += "<td name='" + cfieldName + "' ></td>";
							}
						} else {
							var val = itemss[cfieldName];
							if (val == null || val == "") {
								str1 += "<td name='" + cfieldName + "' ></td>";
							} else {
								str1 += "<td name='" + cfieldName + "' >" + val
										+ "</td>";
							}
						}
					}
				}
				str1 += "</tr>";

			}
			$("#datatable_1 tbody").html(str1);

		}
	});
	currentSeletedRow=null;
	cellEdition();
	rowSelection();
	addRow();
}
var mark = 0;
/**
 * 输入验证
 */
function validat() {
	var tr = $("#datatable_1 tbody tr:last");
	var column1 = "";
	var column2 = "";
	var column4 = "";
	tr.find("td").each(function(index) {
		var val = $(this).html();
		if (index == 0) {
			column1 = val;
		}
		if (index == 1) {
			column2 = val;
		}
		if (index == 3) {
			column4 = val;
		}
	});
	if (column1 == "") {
		jAlert("项目编号不为空");
		return;
	}
	var len = $("#datatable_1 tbody").children("tr").length;
	$("#datatable_1 tbody tr").each(function(i) {
		if (i != len - 1) {
			var td = $(this).find("td:eq(0)").html();
			if (td == column1) {
				jAlert("已经存在该项目编码");
				return;
			}
		}
	});

	if (column2 == "") {
		jAlert("项目名称不为空");
		return;
	}
	if (column4 == "") {
		jAlert("所属分类不为空");
		return;
	}
}
/**
 * 添加项目目录数据
 */
function create() {
	var tr = $("#datatable_1 tbody tr:last");
	var column1 = "";
	var column2 = "";
	var column4 = "";
	tr.find("td").each(function(index) {
		var val = $(this).html();
		if (index == 0) {
			column1 = val;
		}
		if (index == 1) {
			column2 = val;
		}
		if (index == 3) {
			column4 = val;
		}
	});
	if (column1 == "") {
		jAlert("项目编号不为空");
		return;
	}

	if (column2 == "") {
		jAlert("项目名称不为空");
		return;
	}
	if (column4 == "") {
		jAlert("所属分类不为空");
		return;
	}
	var param = "";
	tr.find("td").each(function(index) {
		var name = $(this).attr("name");
		var val = $(this).html();
		if (name == "column3") {
			if (val == "Y") {
				param += "&fitemss2." + name + "=" + 1;
			} else {
				param += "&fitemss2." + name + "=" + 0;
			}
		} else {
			param += "&fitemss2." + name + "=" + val;
		}

	});
	$.ajax({
		url : "fitem!addFitemss.action?fitemClass=" + fitemClass,
		type : "post",
		datatype : "json",
		data : param,
		success : function(data, status) {
			// jAlert("添加成功！");
			// $("#datatable_1 tbody tr:last()").attr("isdata","1");
			queryFitemss(fitemClass);
			window.parent.getWindow("basic_fitem_item")
					.queryFitemss(fitemClass);
		}
	});
}
/**
 * 修改
 */
function update() {
	if (currentSeletedRow == null) {
		return;
	}
	var id = currentSeletedRow.id;
	var tr = $("#datatable_1 tbody tr[id=" + id + "]");
	var column1 = "";
	var column2 = "";
	var column4 = "";
	tr.find("td").each(function(index) {
		var val = $(this).html();
		if (index == 0) {
			column1 = val;
		}
		if (index == 1) {
			column2 = val;
		}
		if (index == 3) {
			column4 = val;
		}
	});
	if (column1 == "") {
		jAlert("项目编号不为空");
		return;
	}
	if (column2 == "") {
		jAlert("项目名称不为空");
		return;
	}
	if (column4 == "") {
		jAlert("所属分类不为空");
		return;
	}
	var param = "fitemss2.id=" + id;
	tr.find("td").each(function(index) {
		var name = $(this).attr("name");
		var val = $(this).html();
		if (name == "column3") {
			if (val == "Y") {
				param += "&fitemss2." + name + "=" + 1;
			} else {
				param += "&fitemss2." + name + "=" + 0;
			}
		} else {
			param += "&fitemss2." + name + "=" + val;
		}
	});
	$.ajax({
		url : "fitem!updateFitemss.action?fitemClass=" + fitemClass,
		type : "post",
		datatype : "json",
		data : param,
		success : function(data, status) {
			queryFitemss(fitemClass);
			window.parent.getWindow("basic_fitem_item")
					.queryFitemss(fitemClass);
		}
	});

}
/**
 * 删除项目目录数据
 */
function del() {
	if (currentSeletedRow == null) {
		jAlert("请选中要删除的行");
		return;
	} else {
		var id = currentSeletedRow.id;
		jConfirm("确定要删除此项目吗", "确认对话框", function(confirmflag) {
			if (confirmflag) {
				
				var sourceValue = id;
				var sourceTable = "FITEMSS";
				var sourceField = "ID";
				var isExits = isExitsTableRef(sourceValue, sourceTable, sourceField);
				var code=$(currentSeletedRow).find("td:eq(0)").html();
				sourceValue = code+"";
				sourceTable = "FITEMSS";
				sourceField = "COLUMN1";
				var isExits1 = isExitsTableRef(sourceValue, sourceTable, sourceField);
				
				if (isExits == true||isExits1==true) {
					jAlert("该项目已经被使用，不能删除!");
					return;
				}
				$.ajax({
					url : "fitem!deleteFitemss.action?fitemssId=" + id,
					type : "post",
					datatype : "json",
					success : function(data, status) {
						currentSeletedRow=null;
						queryFitemss(fitemClass);
						window.parent.getWindow("basic_fitem_item")
								.queryFitemss(fitemClass);
					}
				});
			}
		});
	}
}
// 退出调用 陈建宇页面方法
function exitWindow() {
	/*推出前是否保存(2013-9-12) lyl */
	var count = 0;
	var tr = $("#datatable_1 tbody ").find("tr:last");
	var isData = tr.attr("isdata");
	if (isData == 0 && typeof (isData) != "undefined") {
		$(tr).find("td").each(function() {
			var val = $(this).html();
			if (val != "")
				count++;

		});
	}
	if (flag&&count > 0) {
		jConfirm("是否保存对当前记录的修改？", "确认对话框", function(confirmflag) {
			if (confirmflag) {
				create();
				window.parent.closeWindow('basic_fitem_maintain');

			} else {
				window.parent.closeWindow('basic_fitem_maintain');
			}
		});

	} else {
		window.parent.closeWindow('basic_fitem_maintain');
	}
}