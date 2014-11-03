/** * sps.html tab1 相关js代码 ** */

// 当前被点击选中的行全局变量
var currentSeletedRow = null;
function setSelectableRow() {
	var datatable_1 = document.getElementById("datatable_bodyer");
	for ( var i = 0; i < datatable_1.rows.length; i++) {
		datatable_1.rows[i].onclick = function(e) {
			var evt = (window.event || e);// 获得事件
			var evtsrc = (evt.srcElement || evt.target);
			// 判断当前插入的行是否不是满行（每个单元格都有值）
			if (currentInsertedRow != null
					&& evtsrc.parentNode != currentInsertedRow) {
				if (!isFull(currentInsertedRow)) {
					return false;
				}
			}
			if (currentSeletedRow != null && evtsrc.tagName == "TD") {
				currentSeletedRow.style.backgroundColor = "#fff";
				currentSeletedRow.style.color = "#000";
			}
			if (evtsrc.tagName == "TD") {
				evtsrc.parentNode.style.backgroundColor = "#00f";
				evtsrc.parentNode.style.color = "#fff";
				currentSeletedRow = evtsrc.parentNode;
			}
			var text = currentSeletedRow.cells[0].innerHTML;
			if (text == "应发合计" || text == "扣款合计" || text == "实发合计"||text=="代扣税"||text=="本月扣零"||text=="上月扣零" ) {
				$("#renamebtn").attr("disabled", true);
			} else {
				$("#renamebtn").attr("disabled", false);
			}
		};
	}
}

function isFull(row) {
	var isFull = true;
	for ( var i = 0; i < 5; i++) {
		var content = row.cells[i].innerHTML;
		if (content.length == 0 || content == "") {
			isFull = false;
		}
	}
	if (!isFull) {
		jAlert("请填完整行！");
	}
	return isFull;
}

/** *** 选中行代码结束****** */
/** *** 可编辑列相关代码开始（如果不需要这些功能，直接将下面代码移出即可）****** */
// 当前被编辑的列全局变量
var currentEditCell = null;

function setEditable() {
	var datatable_1 = document.getElementById("datatable_bodyer");
	for ( var i = 0; i < datatable_1.rows.length; i++) {
		for ( var j = 0; j < datatable_1.rows[i].cells.length; j++) {
			datatable_1.rows[i].cells[j].ondblclick = function(e) {
				var evt = (window.event || e);// 获得事件
				var cell = (evt.srcElement || evt.target);
				if (cell.tagName != "TD") {
					cell = cell.parentNode;
				}
				var content = cell.innerHTML;
				var index=cell.cellIndex;
				if (content != "") {
					if (content == "应发合计" || content == "扣款合计"
							|| content == "实发合计" || content == "本月扣零"
							|| content == "上月扣零" || content == "代扣税" ) {
						jAlert("系统项目不得修改!");
						return;	
					} else {
						if (index == 0) {
							jAlert("项目名称，请通过<重命名>修改!");
							return;
						}
						// 如果不是手动添加的不能修改，否则可以
						/*
						 * var mark=$(cell).attr("mark"); if(mark!=1){
						 * jAlert("项目名称，请通过<重命名>修改!"); return; }
						 */
					}
				}
		/*对系统预置的工资项目不得修改 (2013-9-28)*/
			if(index==1||index==3||index==4){
						var tr=$(cell.parentNode);
						var text= tr.find("td:eq(0)").html();
						if (text == "应发合计" || text == "扣款合计"
							|| text == "实发合计" || text == "本月扣零"
							|| text == "上月扣零" || text == "代扣税" ) {
						jAlert("系统项目不得修改!");
						return;	
						} 
			}
		/*end*/
				var selstr = "";
				switch (cell.cellIndex) {
				case 0:
					selstr = "<input type='text' onblur='zeroBlur(this)' style='width:96%'/>";
					cell.innerHTML = selstr;
					cell.getElementsByTagName("input")[0].value = content;
					cell.getElementsByTagName("input")[0].focus();
					break;
				case 1:
					selstr = "<select onblur='this.parentNode.innerHTML=this.value;' onchange='this.blur();' style='height:20px;margin:0px;'>"
							+ "<option selected='selected' value='数字'>数字</option>"
							+ "<option value='字符'>字符</option>" + "</select>";
					cell.innerHTML = selstr;
					cell.getElementsByTagName("select")[0].focus();
					cell.getElementsByTagName("select")[0].value = content;
					break;
				case 2:
					selstr = "<select onblur='this.parentNode.innerHTML=this.value;' onchange='this.blur();' style='height:20px;margin:0px;'>"
							+ "<option value='1'>1</option>"
							+ "<option value='2'>2</option>"
							+ "<option value='3'>3</option>"
							+ "<option value='4'>4</option>"
							+ "<option value='5'>5</option>"
							+ "<option value='6'>6</option>"
							+ "<option value='7'>7</option>"
							+ "<option value='8'>8</option>"
							+ "<option value='9'>9</option>"
							+ "<option value='10'>10</option>" + "</select>";
					cell.innerHTML = selstr;
					cell.getElementsByTagName("select")[0].focus();
					cell.getElementsByTagName("select")[0].value = content;
					break;
				case 3:
					selstr = "<select onblur='this.parentNode.innerHTML=this.value;' onchange='this.blur();' style='height:20px;margin:0px;'>"
							+ "<option value='1'>1</option>"
							+ "<option value='2'>2</option>"
							+ "<option value='3'>3</option>"
							+ "<option value='4'>4</option>"
							+ "<option value='5'>5</option>"
							+ "<option value='6'>6</option>"
							+ "<option value='7'>7</option>"
							+ "<option value='8'>8</option>"
							+ "<option value='9'>9</option>"
							+ "<option value='10'>10</option>" + "</select>";
					cell.innerHTML = selstr;
					cell.getElementsByTagName("select")[0].focus();
					cell.getElementsByTagName("select")[0].value = content;
					break;
				case 4:
					selstr = "<select onblur='this.parentNode.innerHTML=this.value;' onchange='this.blur();' style='height:20px;margin:0px;'>"
							+ "<option value='增项'>增项</option>"
							+ "<option value='减项'>减项</option>"
							+ "<option value='其它'>其它</option>" + "</select>";
					cell.innerHTML = selstr;
					cell.getElementsByTagName("select")[0].focus();
					cell.getElementsByTagName("select")[0].value = content;
					break;
				}
			};
		}
	}
}
var arr = new Array();
var s = 0;
function zeroBlur(input) {
	var val = input.value;
	var td = $(input).parent();
	/* td添加手动增加的标志 */
	$(td).attr("mark", "1");
	/* /标志是否可添加(1:(工资项目相同);0:可添加) */
	var flag = 0;
	var mark = false;
	var len = currentSeletedRow.rowIndex;
	$("#datatable_bodyer").find("tr").each(function(i) {
		var name = $(this).find("td:eq(0)").html();
		if (i != len - 1) {
			if (val == name) {
				flag = 1;
				return false;
			}
		}
	});
	/* 防止重复添加到公式设置：公式项目里 */
	$("#wage_project").find("option").each(function() {
		var text = $(this).text();
		if (val != null && val != "") {
			if (val == text) {
				mark = true;
				return false;
			}
		}
	});
	if (flag == 0 && !mark) {
		$("#wage_project").append("<option >" + val + "</option>");
		arr[s] = val;
		s++;
		// $("#gzitem2").append("<option>"+val+"</option>");

	} else if (flag == 1) {
		jAlert("不能输入相同的工资项目名称!");
		val="";
	}
	input.parentNode.innerHTML = val;
}
// 单元失去焦点，执行单元格取消编辑状态动作：
/*
 * document.onclick=function(e){ var evt=(window.event || e);//获得事件 var evtsrc =
 * (evt.srcElement || evt.target); if(currentEditCell!=null){
 * //jAlert(evtsrc.tagName); if(evtsrc.tagName!="INPUT"){
 * currentEditCell.innerHTML=currentEditCell.getElementsByTagName("input")[0].value;
 * currentEditCell=null; } } }
 */
/** *** 可编辑列相关代码结束 ****** */

// 向上移动
function upward() {
	var table = document.getElementById("datatable");
	if (currentSeletedRow != null && currentSeletedRow.rowIndex > 1) {
		currentSeletedRow.parentNode.insertBefore(currentSeletedRow,
				table.rows[currentSeletedRow.rowIndex - 1]);
	}
}
// 向下移动
function downward() {
	var table = document.getElementById("datatable");
	if (currentSeletedRow != null
			&& currentSeletedRow.rowIndex < table.rows.length - 1) {
		currentSeletedRow.parentNode.insertBefore(
				table.rows[currentSeletedRow.rowIndex + 1], currentSeletedRow);
	}
}

/** *** 增、插、删行代码开始 ****** */
/**
 * 工资项目是否被公式引用
 */
function isExist(itemName,cgzitemformula){
	if(cgzitemformula!=null&&cgzitemformula!=""){
		var reg=/\+|\-|\*|\/|\(|\)/;
		var arr=cgzitemformula.split(reg);
		for(var i=0;i<arr.length;i++){
			if(arr[i]==itemName){return true;}
			else{
				return false;
			}
		}
	}
}

/**
 * 删行
 */
function delRow() {
	var mark=false;
	if (currentSeletedRow != null) {
		var text = currentSeletedRow.cells[0].innerHTML;
		if (text == "应发合计" || text == "扣款合计" || text == "实发合计"|| text=="代扣税"||text=="本月扣零"||text=="上月扣零") {
			jAlert("系统固定项目,不能删除!");
			return;
		}
		/*当公式中被引用不得删除工资项目 lyl*/
		var igzitemId=currentSeletedRow.cells[6].innerHTML;
		var itemName=text;
		$.ajax({
			url : "wageSetting!queryWaFormula.action",
			data : "waFormula.cgzgradenum=" + cgzgradenum
					+ "&waFormula.igzitemId=" + igzitemId+"&itemName="+itemName,
			type : "post",
			dataType : "json",
			async : false,
			success : function(data) {
				var waFormulas=data.waFormulas;
				for(var i=0;i<waFormulas.length;i++){
					var f=waFormulas[i];
					if(f.igzitemId==igzitemId||isExist(itemName,f.cgzitemformula)){
						mark=true;
						return ;
					}
				}
			}
		});
		if(mark){
			jAlert("该工资项目已被公式使用，不能删除!");
			return;
		}
	} else {
		jAlert("请选择要删除的项目!");
		return;
	}
	del();

}

function del(){
	jConfirm('你确实要删除工资项目吗?', '提示', function(r) {
		if (r) {
			var datatable_1 = document.getElementById("datatable_bodyer");
			var id = currentSeletedRow.cells[5].innerHTML;
			var igzitemId = currentSeletedRow.cells[6].innerHTML;
			if (id != null || id != "") {
				deleteIds(id);
				deleteIgzitemIds(igzitemId);
			}
			// 删除成功后将公式设置里的对应的工资项目删除
			var text = currentSeletedRow.cells[0].innerHTML;
			datatable_1.deleteRow(currentSeletedRow.rowIndex - 1);
			$("#wage_project option").each(function() {
				var t = $(this).text();
				if (text == t) {
					$(this).remove();
				}
			});
			// 删除行时判断要删除的行是否是当前插入的行，如果是的话，则两个变量都置空
			if (currentInsertedRow == currentSeletedRow) {
				currentInsertedRow = null;
			}
			currentSeletedRow = null;
			// 判断重命名btn是否可用
			if ($("#datatable_bodyer tr").length > 3) {
				$("#renamebtn").attr("disabled", false);
			} else {
				$("#renamebtn").attr("disabled", true);
			}
		}
	});
}
/*******************************************************************************
 * 根据id删除工资项目
 */
var waIds = "";
function deleteIds(id) {
	waIds = waIds + id + ",";
}
var waIgzitemIds = "";
function deleteIgzitemIds(igzitemId) {
	waIgzitemIds = waIgzitemIds + igzitemId + ",";
}
var currentInsertedRow = null;

/**
 * 插入行
 */
function insRow() {

	// 判断当前插入的行是否不是满行（每个单元格都有值）
	if (currentInsertedRow != null) {
		if (!isFull(currentInsertedRow)) {
			return false;
		}
	}
	// 判断是否已经登录固定资产模块
	// 如果未登录：可新增行，且新增的行单元格可编辑，第2、3、4、5列的内容从上一行复制。
	if (window.parent.parent.wa_wageTypeId == 0) {
		var tb = document.getElementById("datatable_bodyer");
		var index = tb.rows.length;
		if (currentSeletedRow != null) {
			index = currentSeletedRow.rowIndex;
		}
		var row = tb.insertRow(index);
		row.style.height = "18px";
		row.insertCell(0);
		for ( var i = 1; i < 7; i++) {
			var cell = row.insertCell(i);
			if (i < 5) {
				cell.innerHTML = tb.rows[index - 1].cells[i].innerHTML;
			}
		}
		row.cells[5].style.display = "none";
		row.cells[6].style.display = "none";
		currentInsertedRow = row;
		if (currentSeletedRow != null) {
			currentSeletedRow.style.backgroundColor = "#fff";
			currentSeletedRow.style.color = "#000";
		}
		currentInsertedRow.style.backgroundColor = "#00f";
		currentInsertedRow.style.color = "#fff";
		currentSeletedRow = currentInsertedRow;
		// 表格单元格可编辑
		setEditable();
		setSelectableRow();

	}
	// 如果已登录：可新增行，行各单元格内容来自右侧select项，单元格不可编辑。
	else {

		if (window.parent.parent.wa_isWageSets == 1) {// 单工资类别
			var tb = document.getElementById("datatable_bodyer");
			var index = tb.rows.length;
			if (currentSeletedRow != null) {
				index = currentSeletedRow.rowIndex;
			}
			var row = tb.insertRow(index);
			row.style.height = "18px";
			row.insertCell(0);
			for ( var i = 1; i < 7; i++) {
				var cell = row.insertCell(i);
				if (i < 5) {
					cell.innerHTML = tb.rows[index - 1].cells[i].innerHTML;
				}
			}
			row.cells[5].style.display = "none";
			row.cells[6].style.display = "none";
			currentInsertedRow = row;
			if (currentSeletedRow != null) {
				currentSeletedRow.style.backgroundColor = "#fff";
				currentSeletedRow.style.color = "#000";
			}
			currentInsertedRow.style.backgroundColor = "#00f";
			currentInsertedRow.style.color = "#fff";
			currentSeletedRow = currentInsertedRow;
			// 表格单元格可编辑
			setEditable();
			setSelectableRow();
		} else {// 多工资类别
			var tb = document.getElementById("datatable_bodyer");
			var index = tb.rows.length;
			if (currentSeletedRow != null) {
				index = currentSeletedRow.rowIndex;
			}
			var row = tb.insertRow(index);
			row.style.height = "18px";
			for ( var i = 0; i < 7; i++) {
				row.insertCell(i);
			}
			row.cells[5].style.display = "none";
			row.cells[6].style.display = "none";
			currentInsertedRow = row;
			if (currentSeletedRow != null) {
				currentSeletedRow.style.backgroundColor = "#fff";
				currentSeletedRow.style.color = "#000";
			}
			currentInsertedRow.style.backgroundColor = "#00f";
			currentInsertedRow.style.color = "#fff";
			currentSeletedRow = currentInsertedRow;
			setSelectableRow();
			// 判断重命名btn是否可用
			if ($("#datatable_bodyer tr").length > 3) {
				$("#renamebtn").attr("disabled", false);
			}
		}
	//	currentSeletedRow=null;
	}
	
}

function itemNameRepeatedChecked(selValue) {
	// 判断是否已存在同名项
	var tb = document.getElementById("datatable_bodyer");
	for ( var i = 0; i < tb.rows.length; i++) {
		var value = tb.rows[i].cells[0].innerHTML;
		// var value = tb.rows[i].cells[6].innerHTML;
		if (value == selValue) {
			return true;
		}
	}
	return false;
}

// 工资名称参照下拉列表选项改变处理
function itemNameChange(sel) {
	if (currentSeletedRow != null && currentInsertedRow == currentSeletedRow) {
		// 如果未登录，将右侧select的文本填入到当前新增行的第一列单元格
		if (window.parent.parent.wa_wageTypeId == 0) {
			if (itemNameRepeatedChecked(sel.options[sel.selectedIndex].text) == true) {
				jAlert("不能输入相同的工资项目名称");
			} else {
				currentInsertedRow.cells[0].innerHTML = sel.options[sel.selectedIndex].text;
			}
		} else {

			if (window.parent.parent.wa_isWageSets == 1) {// 单工资类别
				if (itemNameRepeatedChecked(sel.options[sel.selectedIndex].text) == true) {
					jAlert("不能输入相同的工资项目名称");
				} else {
					currentInsertedRow.cells[0].innerHTML = sel.options[sel.selectedIndex].text;
					$("#wage_project").append(
							"<option>" + currentInsertedRow.cells[0].innerHTML
									+ "</option>");
				}
			} else {// 多工资类别
				// 如果已登录，就将右侧select的整条信息放到当前新增行的每一个单元格
				if (itemNameRepeatedChecked(sel.options[sel.selectedIndex].text) == true) {
					jAlert("不能输入相同的工资项目名称");
				} else {
					var tempIndex = sel.options[sel.selectedIndex]
							.getAttribute("index");
					currentInsertedRow.cells[1].innerHTML = czList[tempIndex].isetgzitemstyle;
					currentInsertedRow.cells[2].innerHTML = czList[tempIndex].isetgzitemlenth;
					currentInsertedRow.cells[3].innerHTML = czList[tempIndex].idecimal;
					currentInsertedRow.cells[4].innerHTML = czList[tempIndex].isetgzitemprop;
					currentInsertedRow.cells[5].innerHTML = czList[tempIndex].id;

					currentInsertedRow.cells[0].innerHTML = sel.options[sel.selectedIndex].text;
					if (window.parent.parent.wa_wageTypeId == 0) {
						currentInsertedRow.cells[6].innerHTML = "";
					} else {
						currentInsertedRow.cells[6].innerHTML = sel.value;
					}
					$("#wage_project").append(
							"<option>" + currentInsertedRow.cells[0].innerHTML
									+ "</option>");
					currentInsertedRow = null;
				}

			}

		}
	}
}

// 项目重命名函数
function itemrename() {
	// 获得当前选中的行,组装参数
	var param = {};
	if (currentSeletedRow != null) {
		param.name = currentSeletedRow.cells[0].innerHTML;
		param.id = currentSeletedRow.cells[5].innerHTML;
		param.filed3 = currentSeletedRow.cells[6].innerHTML;
	} else {
		var tr = $("#datatable_bodyer tr:last");
		param.name = tr.find("td:eq(0)").html();
		param.id = tr.find("td:eq(5)").html();
		param.filed3 = tr.find("td:eq(6)").html();
	}
	//弹出窗体，将参数传递过去
	window.parent.openWindow('wa_other_itemrename', 'wa_other_sps', param);
	
	
}





/***
 * 
 * @param child
 * @param valueObject
 * 重命名 2013-10-11 lyl
 */
function setval(v){
	var newName=v;//修改的项目名称
	if (currentSeletedRow != null) {
		currentSeletedRow.cells[0].innerHTML=newName;
	} else {
		var tr = $("#datatable_bodyer tr:last");
		 tr.find("td:eq(0)").html(newName);
	}
}



