var pp = window.parent.valueMap.get("basic_fitem_maintain");//parent parameter 取得来自父窗体传来的值
var fitemClass = pp.fitemClass; // 项目大类编码
var crule = pp.crule; // 项目大类编码规则
var flag=false;//标识是否新增加的行别点击过
function addRow() {
	var tb = document.getElementById("datatable_1_bodyer");
	var cl = document.getElementById("datatable_1_header").cells.length;
	var newRow = tb.insertRow(tb.rows.length);
	for ( var i = 0; i < cl; i++) {
		var cell = newRow.insertCell(i);
		var num = i + 1;
		cell.setAttribute("name", "column" + num);
	}
	newRow.setAttribute("isdata", "0");
	newRow.setAttribute("id", "0");
	rowEdition(newRow);
}
function add() {
	var tr = $("#datatable_1 tbody ").find("tr:last");
	var isData = tr.attr("isdata");
	if (isData == 1 || typeof (isData) == "undefined") {
		addRow();
	} else {
		create();
	}
}
function save() {
	var tr = $("#datatable_1 tbody ").find("tr:last");
	var isData = tr.attr("isdata");
	if (isData == 0) {
		create();
	}
}
/* ********** 查询文本框相关代码 S ************ */
var currentQueryButton = null;
function setCurrentQueryButton(queryBox) {
	if (currentQueryButton != null) {
		currentQueryButton.style.display = 'none';
		currentQueryButton = null;
	}
	var queryButton = queryBox.parentNode.getElementsByTagName('input')[1];
	queryButton.style.display = 'block';
	currentQueryButton = queryButton;
}
var currentSeletedRow = null;// 当前被点击选中的行全局变量
function rowSelection() {

	var datatable_1_bodyer = document.getElementById("datatable_1_bodyer");
	for ( var i = 0; i < datatable_1_bodyer.rows.length; i++) {
		datatable_1_bodyer.rows[i].onclick = function(event) {
			var evt = (window.event || event);// 获得事件
			var evtsrc = (evt.srcElement || evt.target);
			if (currentSeletedRow != null && evtsrc.tagName == "TD") {
				currentSeletedRow.style.backgroundColor = "#fff";
				currentSeletedRow.style.color = "#000";
			}
			if (evtsrc.tagName == "TD") {
				evtsrc.parentNode.style.backgroundColor = "blue";
				evtsrc.parentNode.style.color = "#fff";
				currentSeletedRow = evtsrc.parentNode;
			}
		};
	}
}
var currentEditRow = null;// 单元格编辑控制方法
var currentEditCell = null;
var targetElement = null;
function cellEdition() {
	var datatable_1_bodyer = document.getElementById("datatable_1_bodyer");
	for ( var i = 0; i < datatable_1_bodyer.rows.length; i++) {
		for ( var j = 0; j < datatable_1_bodyer.rows[i].cells.length; j++) {
			rowEdition(datatable_1_bodyer.rows[i]);
		}
	}
}
function rowEdition(row) {
	for ( var j = 0; j < row.cells.length; j++) {
		row.cells[j].ondblclick = function(event) {
			
			/*如果点击的是最后一行,并且是新添加到数据 lyl (2013-9-12)*/
			var tr=$(row);
			var isData = tr.attr("isdata");
			if (isData == 0 && typeof (isData) != "undefined") {
				flag=true;
			}
			/*end*/
			
			var evt = (window.event || event);// 获得事件
			var cell = (evt.srcElement || evt.target);

			if (cell.tagName != "TD") {
				cell = cell.parentNode;
			}
			// 避免重复双击，重复往TD里添加innerHTML内容产生混乱
			if (cell.getElementsByTagName("input").length == 0
					&& cell.getElementsByTagName("select").length == 0) {

				// 如果有其他单元格正处于编辑状态，那么还需要将其他单元格取消编辑状态

				if (currentEditCell != null) {

					var cs = currentEditCell.getElementsByTagName("input");

					if (cs.length != 0) {
						var value = currentEditCell
								.getElementsByTagName("input")[0].value;
						currentEditCell.innerHTML = value;
					}
					cs = currentEditCell.getElementsByTagName("select");
					if (cs.length != 0) {
						var s = currentEditCell.getElementsByTagName("select")[0];
						currentEditCell.innerHTML = s.options[s.selectedIndex].text;
						currentEditCell.setAttribute("fangxiangID",
								s.options[s.selectedIndex].value);
					}
					currentEditCell = null;
				}

				// 字段名
				var title = document.getElementById("datatable_1_header").cells[cell.cellIndex].innerHTML;
				// 类型方式
				var typemethod = document.getElementById("datatable_1_header").cells[cell.cellIndex]
						.getAttribute("typemethod");

				/*
				 * 
				 * 四个固定控件的标题名称： 项目编号、所属分类码：带放大镜编辑框 是否结算：不放控件，双击后直接改变值 方向：下拉列表框
				 * 
				 * 其他的都按 类型进行判定 如果是文本类型就生成文本框 如果是整数，生成文本框并判断输入值是否是数字
				 * 如果是实数，生成文本框并判断输入值是否是数字 如果是日期，生成日期控件
				 * 
				 */
				if (title == "所属分类码") {
					var querybox_htmlstr = "<div><input type=\"text\" class=\"querybox\" style=\"width:90%;border:none;\"/><input type=\"button\" class=\"innerfinder\" style=\"display:block;margin-top:0px;\" onclick=\"tableCellWindowMaper('"
							+ title
							+ "')\"/><div class=\"floatclear\"></div></div>";

					// 往单元格TD里添加查询文本框
					var temp = cell.innerHTML;
					cell.innerHTML = querybox_htmlstr;
					var textbox = cell.getElementsByTagName("input")[0];
					textbox.value = temp;
					textbox.focus();
					setCurrentQueryButton(textbox);
					currentEditCell = cell;
					targetElement = textbox;
				} else if (title == "是否结算") {
					var value = cell.innerHTML;
					cell.style.color = "red";
					if (value == "Y") {
						cell.innerHTML = "";
					} else {
						cell.innerHTML = "Y";
					}
				} else if (title == "方向") {
					var tmpval = cell.innerHTML;
					cell.innerHTML = "<select style=\"width:90%;\" ><option value=\"方向A\">方向A</option><option value=\"方向B\">方向B</option><option value=\"方向C\">方向C</option></select>";
					cell.getElementsByTagName("select")[0].value = tmpval;
					currentEditCell = cell;
				} else {
					switch (typemethod) {
					case "文本":
					case "整数":
					case "实数":
						var temp = cell.innerHTML;
						cell.innerHTML = "<input type=\"text\" style=\"width:90%;border:none;\"/>";
						var textbox = cell.getElementsByTagName("input")[0];
						textbox.value = temp;
						textbox.focus();
						currentEditCell = cell;
						break;

					case "日期":
						var querybox_htmlstr = "<div><input type=\"text\" id=\"datefield\" class=\"querybox\" style=\"width:90%;border:none;\"/><input type=\"button\" class=\"innerfinder\" style=\"display:block;margin-top:0px;\" onclick=\"showDatePicker()\"/><div class=\"floatclear\"></div></div>";
						var temp = cell.innerHTML;
						cell.innerHTML = querybox_htmlstr;
						var textbox = cell.getElementsByTagName("input")[0];
						textbox.value = temp;
						textbox.focus();
						setCurrentQueryButton(textbox);
						currentEditCell = cell;
						break;
					}
				}
			}
		};
	}
}

function showDatePicker() {
	WdatePicker({
		el : "datefield",
		position : {
			left : 100,
			top : 1
		},
		onpicking : function(dp) {
		}
	});
}
// 表格单元格弹出窗体方法
function tableCellWindowMaper(title) {
	var param = {};
	param.fitemClass = fitemClass;
	param.crule = crule;
	switch (title) {
	case "所属分类码":
		window.parent.openWindow('basic_comref_fitemgrademodeGridRef',
				'basic_fitem_maintain', param);
		break;
	}
}
/** **************** 表格组件相关代码 E ****************** */
function deliverValue(valueObject) {
	var currentEditCellName = document.getElementById("datatable_header").rows[0].cells[currentEditCell.cellIndex].innerHTML;
	switch (currentEditCellName) {
	case "所属分类码":
		// 显示名称
		targetElement.value = valueObject.gradecode;
		// 存储代码
		// targetElement.parentNode.parentNode.setAttribute("dbvalue",
		// valueObject.selCode);
		break;

	}
}

/* ****************** 组件公共document.onclick方法 S ********************* */
document.onmousedown = function(e) {
	var d = $("#popup_overlay").css("display");
	if(d=="block"){
		return false;
	}
	var evt = (window.event || e);// 获得事件
	var evtsrc = (evt.srcElement || evt.target);
	if (currentQueryButton != null && evtsrc.className != "querybox"// 如果当前有显示的查询按钮，则隐藏
			&& evtsrc.className != "innerfinder") {
		currentQueryButton.style.display = 'none';
		currentQueryButton = null;
	}
	if (currentEditCell != null) {	// 如果表格中存在正在编辑的单元格
		if (evtsrc.parentNode.parentNode != currentEditCell
				&& evtsrc.parentNode != currentEditCell) {
			var index = currentEditCell.cellIndex;
			var title = document.getElementById("datatable_1_header").cells[currentEditCell.cellIndex].innerHTML;// 字段名
			var typemethod = document.getElementById("datatable_1_header").cells[currentEditCell.cellIndex]// 根据表头字段类型校验输入值是否符合条件
					.getAttribute("typemethod");
			if (title == "项目编号" || title == "所属分类码" || title == "是否结算") {
				var value = currentEditCell.getElementsByTagName("input")[0].value;
				var isEisxt = false;
				if (index == 0) {
					var len = $("#datatable_1 tbody").children("tr").length;
					$("#datatable_1 tbody tr").each(function(i) {
						if (i != len - 1) {
							var td = $(this).find("td:eq(0)").html();
							if (td == value) {
								isEisxt = true;
								return false;
							}
						}
					});
					if (isEisxt) {
						jAlert("有相同的编码,请重输!");
						return false;
					}
				} else if (index == 3) {
					var len = $("#datatable_1 tbody").children("tr").length;
					$("#datatable_1 tbody tr").each(
							function(i) {
								if (i != len - 1) {
									var name = $(this).find("td:eq(1)").html();
									var gradecode = $(this).find("td:eq(3)")
											.html();
									var tr = currentEditCell.parentNode;
									if (gradecode == value
											&& name == $(tr).find("td:eq(1)")
													.html()) {
										isEisxt = true;
										return false;
									}
								}
							});
					if (isEisxt) {
						jAlert("项目名称相同则项目分类编码不能相同,请重输!");
						return false;
					}
				}
				currentEditCell.innerHTML = value;
			} else if (title == "方向") {
				var s = currentEditCell.getElementsByTagName("select")[0];

				if (s.selectedIndex == -1) {
					jAlert("请选择方向");
					return false;
				} else {
					currentEditCell.innerHTML = s.options[s.selectedIndex].text;
					currentEditCell.setAttribute("fangxiangID",
							s.options[s.selectedIndex].value);
				}
			} else {
				var txtval = currentEditCell.getElementsByTagName("input")[0].value;
				switch (typemethod) {
				case "文本":
					currentEditCell.innerHTML = txtval;
					break;
				case "整数":  // 判断是否是整数
					currentEditCell.innerHTML = txtval;
					break;
				case "实数":  // 判断是否是实数
					currentEditCell.innerHTML = txtval;
					break;
				case "日期":  // 判断是否是日期
					currentEditCell.innerHTML = txtval;
					break;
				}
			}
			
			
			var tr = currentEditCell.parentNode;
			var $_tr = $(tr);
			var isdata = $_tr.attr("isdata");
			if (isdata == 1) {// 如果是已经存在的数据==修改
				update();
			}
			currentEditCell = null;
		}

	}

};
/******************** 组件公共document.onclick方法 E **********************/

$(function() {
	cellEdition();
});
