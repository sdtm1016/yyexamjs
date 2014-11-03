/** * sps.html tab2 相关js代码 ** */
// “公式设置”卡片左侧公式选项表被选项文本变量
var leftListText = "";
// “公式设置”卡片左侧公式选项表被选后：
function leftSelectChange(select) {
	var textarea = document.getElementById("area_1");
	setLeftListTextEmpty(textarea);
	leftListText = select.options[select.selectedIndex].innerHTML;
	textarea.value = leftListText;
}
// “公式设置”卡片右下角四个列表框项选中后：
function bottomSelectChange(select) {
	var textarea = document.getElementById("area_1");
	setLeftListTextEmpty(textarea);
	var selectValue = select.options[select.selectedIndex].innerHTML;
	var areaValue = textarea.value;
	// 获得文本域的焦点位置
	var ss = textarea.selectionStart;
	// 如果文本域是获得了焦点的，说明有可能是要在文本内容之间插入公式
	if (ss > 0) {
		var s1 = areaValue.substr(0, ss);
		var s2 = areaValue.substr(ss, areaValue.length);
		textarea.value = s1 + selectValue + s2;
		textarea.selectionStart = ss + selectValue.length;
	}
	// 否则，则按默认的拼接方式
	else {
		textarea.value = areaValue.substr(0, areaValue.length
				- leftListText.length)
				+ selectValue + leftListText;
	}
}
// “公式设置”卡片左下角公式表达式组织器面板上的小按钮们点击后执行：
function faebc(btn) {

	$("#area_1").insert({
		"text" : btn.value
	});
	
	
	/*var textarea = document.getElementById("area_1");
	setLeftListTextEmpty(textarea);
	var areaValue = textarea.value;
	//获得文本域的焦点位置
	var ss = textarea.selectionStart;
	//如果文本域是获得了焦点的，说明有可能是要在文本内容之间插入公式
	if(ss>0){
		var s1 = areaValue.substr(0,ss);
		var s2 = areaValue.substr(ss,areaValue.length);
		textarea.value = s1 + btn.value + s2;
		textarea.selectionStart = ss + btn.value.length;
	}
	//否则，则按默认的拼接方式
	else{
		textarea.value = areaValue.substr(0,areaValue.length-leftListText.length) + btn.value + leftListText;
	}*/
	 
}
function setLeftListTextEmpty(textarea) {
	var areaValue = textarea.value;
	if (areaValue == "" || areaValue == null) {
		leftListText = "";
		return;
	}
	var lastSomeText = areaValue.substr(areaValue.length - leftListText.length,
			leftListText.length);
	if (lastSomeText != leftListText) {
		leftListText = "";
	}
}
/** *** 选中行代码开始（如果不需要这些功能，直接将下面代码移出即可）****** */

// 当前被点击选中的行全局变量
var tab2_currentSeletedRow = null;
function tab2RowSelection() {
	
	var datatable_1 = document.getElementById("tab2_waitem_table");
	for ( var i = 0; i < datatable_1.rows.length; i++) {

		datatable_1.rows[i].onclick = function(e) {
			/*删除默认选中的样式(2013-8-9 and lyl)*/
			$("#tab2_waitem_table tr:first").removeAttr("style");
			var evt = (window.event || e);// 获得事件
			var evtsrc = (evt.srcElement || evt.target);
			if (tab2_currentSeletedRow != null && evtsrc.tagName == "TD") {
				tab2_currentSeletedRow.style.backgroundColor = "#fff";
				tab2_currentSeletedRow.style.color = "#000";
			}
			if (evtsrc.tagName == "TD") {
				evtsrc.parentNode.style.backgroundColor = "#00f";
				evtsrc.parentNode.style.color = "#fff";
				tab2_currentSeletedRow = evtsrc.parentNode;
			}
			// 如果正在编辑工资项目，则退出程序不让右边textarea获得焦点
			if ((evtsrc.tagName == "TD" && evtsrc
					.getElementsByTagName("select").length > 0)
					|| evtsrc.tagName == "SELECT") {
				return;
			}
			var textarea = document.getElementById("area_1");
			setLeftListTextEmpty(textarea);

			leftListText = tab2_currentSeletedRow.cells[1].innerHTML;

			textarea.value = leftListText;
			$("#title").html(tab2_currentSeletedRow.cells[0].innerHTML);

			$(textarea).focus();
		};
	}
}

/*******************************************************************************
 * *** 选中行代码结束
 * 
 * 
 * 
 * //单元格点击 function tab2RowClick(){ var datatable_1 =
 * document.getElementById("tab2_waitem_table"); for(var i=0;i<datatable_1.rows.length;i++){
 * for(var j=0;j<datatable_1.rows[i].cells.length;j++){
 * datatable_1.rows[i].cells[j].onclick=function(e){ var evt=(window.event ||
 * e);//获得事件 var td = (evt.srcElement || evt.target);
 * 
 * if(td.tagName!="TD"){ td = td.parentNode; }
 * 
 * var textarea = document.getElementById("area_1");
 * setLeftListTextEmpty(textarea); leftListText = td.getAttribute("gs");
 * textarea.value = leftListText;
 * 
 * 
 *  }; } } }
 ******************************************************************************/

// tab2 table 行向上移动
function tab2TableRowMoveUp() {
	var table = document.getElementById("tab2_waitem_table");
	if (tab2_currentSeletedRow != null && tab2_currentSeletedRow.rowIndex > 0) {
		tab2_currentSeletedRow.parentNode.insertBefore(tab2_currentSeletedRow,
				table.rows[tab2_currentSeletedRow.rowIndex - 1]);
	}
}

// tab2 table 行向下移动
function tab2TableRowMoveDown() {
	var table = document.getElementById("tab2_waitem_table");
	if (tab2_currentSeletedRow != null
			&& tab2_currentSeletedRow.rowIndex < table.rows.length - 1) {
		tab2_currentSeletedRow.parentNode.insertBefore(
				table.rows[tab2_currentSeletedRow.rowIndex + 1],
				tab2_currentSeletedRow);
	}
}

var tab2_currentInsertedRow = null;

// 添加行
function tab2AddWaItem() {
	/*删除默认选中的样式(2013-8-20 and lyl)*/
	$("#tab2_waitem_table tr:first").removeAttr("style");
	var tb = document.getElementById("tab2_waitem_table");
	var rowIndex = 0;
	if (tab2_currentSeletedRow != null) {
		rowIndex = tab2_currentSeletedRow.rowIndex;
	}
	var row = tb.insertRow(rowIndex);
	row.style.height = "18px";
	var cell = row.insertCell(0);
	row.insertCell(1);
	row.insertCell(2);
	row.insertCell(3);

	row.cells[1].style.display = "none";
	row.cells[2].style.display = "none";
	row.cells[3].style.display = "none";
	// gzxmczList
	var gzxmczStr = "<select id='gzitem2' onblur='this.parentNode.parentNode.cells[3].innerHTML=this.value;this.parentNode.innerHTML=this.options[this.selectedIndex].text;' onchange='this.blur();' style='height:20px;margin:0px;'>";
	for ( var i = 0; i < gzxmczList.length; i++) {
		gzxmczStr += '<option value="' + gzxmczList[i].igzitemId + '">'
				+ gzxmczList[i].csetgzitemname + '</option>';
	}
	gzxmczStr += "</select>";

	cell.innerHTML = gzxmczStr;
	cell.getElementsByTagName("select")[0].focus();

	tab2_currentInsertedRow = row;
	if (tab2_currentSeletedRow != null) {
		tab2_currentSeletedRow.style.backgroundColor = "#fff";
		tab2_currentSeletedRow.style.color = "#000";
	}
	tab2_currentInsertedRow.style.backgroundColor = "#00f";
	tab2_currentInsertedRow.style.color = "#fff";
	tab2_currentSeletedRow = tab2_currentInsertedRow;
	tab2RowSelection();
	$("#area_1").val("");// 当新增加的时候右边公式清空
}

/**
 * 公式确认
 */
function gsqr() {
	var value = document.getElementById("area_1").value;
	if (tab2_currentSeletedRow == null)
		return;
	tab2_currentSeletedRow.cells[1].innerHTML = value;
}

/*******************************************************************************
 * 根据id删除工资项目
 */
var tab2waIds = "";
function tab2deleteIds(id) {
	tab2waIds = tab2waIds + id + ",";
}

/**
 * 删行
 */
function tab2DelRow() {
	/* 解决当tab2_currentSeletedRow为空时的异常 (2013-7-10)lyl */
	if (tab2_currentSeletedRow == null)
		return;
	jConfirm('你确实要删除工资项目吗?', '提示', function(r) {
		if (r) {
			var datatable_2 = document.getElementById("tab2_waitem_table");
			// update by lval 20130627-----------解决无法删除公式项目问题-----begin-----
			// var id = tab2_currentSeletedRow.cells[0].getAttribute("id");
			var id = tab2_currentSeletedRow.cells[2].innerHTML;

			// update by lval 20130627-----------解决无法删除公式项目问题-----end-----
			if (id != null || id != "") {
				tab2deleteIds(id);
			}
			datatable_2.deleteRow(tab2_currentSeletedRow.rowIndex);

			// 删除行时判断要删除的行是否是当前插入的行，如果是的话，则两个变量都置空
			if (tab2_currentInsertedRow == tab2_currentSeletedRow) {
				tab2_currentInsertedRow = null;
			}
			tab2_currentSeletedRow = null;
			$("#area_1").val("");

		}
	});
}
