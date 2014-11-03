var cgzgradenum;
var wa_isWageSets = window.parent.parent.wa_isWageSets;
$.ajaxSetup({
		cache:false
	});

winui.onDOMContentLoaded(function() {
	winui_tab_init();
	// 判断是否已经登录工资模块
	if (window.parent.parent.wa_currentWaAccount.cgzgradenum == "") {
		cgzgradenum = "";
		// 未登录隐藏tab
		winui.tab.setDisplay(1, false);
		// 表格单元格可编辑
		setEditable();
	} else {
		cgzgradenum = window.parent.parent.wa_currentWaAccount.cgzgradenum;
		var flag = 1;
		if (flag == 0) {
			// 已登录禁用tab2
			winui.tab.setDisabled(1, true);
			// 不允许表格单元格编辑
		} else {
			/** *********** tab2 相关初始化代码 ************* */
			// tab2填充数据
			queryFormulaSet(cgzgradenum);
			// 初始化tab2:
			tab2RowSelection();// 公式设置，工资项目
			// tab2RowClick();//单元格点击
		}
	}

	// 填充数据
	queryWageProject(window.parent.parent.wa_wageTypeId, cgzgradenum);

	// 判断工资类别，如果有打开的则隐藏tab1表格下的“重命名”按钮
	if (window.parent.parent.wa_isWageSets == 2) {// 单工资类别
		if (window.parent.parent.wa_currentWaAccount.cgzgradenum != '') {
			$("#renamebtn").hide();
		}
	}
	
	// 表格单元格可编辑
	setEditable();
	setSelectableRow();
	

});
var czList;
function queryWageProject(status, cgzgradenum) {// status工资类别是否打开 1：打开 0:未打开;
												// wa_isWageSets(工资类别0：未建立;1:单工资；2多工资)
	$.ajax({
		url : "wageSetting!queryWageProject.action",
		data : "stauts=" + status + "&waAccount.cgzgradenum=" + cgzgradenum
				+ "&wa_isWageSets=" + wa_isWageSets,
		type : "post",
		dataType : "json",
		async : false,
		success : function(data) {
			// 工资项目
			var gzxmList = data.objList[0];
			// 清空列表
			$("#datatable_bodyer").html("");
			var gzxmStr = "";
			for ( var i = 0; i < gzxmList.length; i++) {
				gzxmStr = '<tr><td>' + gzxmList[i].csetgzitemname + '</td><td>'
						+ gzxmList[i].isetgzitemstyle + '</td><td>'
						+ gzxmList[i].isetgzitemlenth + '</td><td>'
						+ gzxmList[i].idecimal + '</td><td>'
						+ gzxmList[i].isetgzitemprop
						+ '</td><td style="display:none;">' + gzxmList[i].id
						+ '</td><td style="display:none;">'
						+ gzxmList[i].igzitemId + '</td></tr>';
				$("#datatable_bodyer").append(gzxmStr);
			}
			

			// 工资参照
			czList = data.objList[1];
			// 清空列表
			$("#wa_item_1").html("");
			$("#wa_item_1").append('<option></option>');
			var czStr = "";
			for ( var y = 0; y < czList.length; y++) {
				if (window.parent.parent.wa_wageTypeId == 0) {
					czStr = '<option value="' + czList[y].igzitemId + '">'
							+ czList[y].csetgzitemname + '</option>';
					$("#wa_item_1").append(czStr);
				} else {
					czStr = '<option index=' + y + ' value="'
							+ czList[y].igzitemId + '">'
							+ czList[y].csetgzitemname + '</option>';
					$("#wa_item_1").append(czStr);
				}
			}
		}
	});
	setSelectableRow();
	// 表格单元格可编辑
	setEditable();
	// 判断重命名btn是否可用
	if ($("#datatable_bodyer tr").length <= 3) {
		$("#renamebtn").attr("disabled", true);
	}
}
/**
 * 公式设置查询
 */
var gzxmczList;
function queryFormulaSet(cgzgradenum) {
	$.ajax({
		url : "wageSetting!queryFormulaSet.action",
		type : "post",
		dataType : "json",
		async : false,
		cache:false,
		data : "waAccount.cgzgradenum=" + cgzgradenum,
		success : function(data) {
			var gzxmList = data.objList[0];
			gzxmczList = data.objList[1];
			var deptList = data.objList[2];
			var gradeList = data.objList[3];

			// 工资项目
			$("#datatable_1_bodyer").html("");
			var gzxmStr = "";
			for ( var i = 0; i < gzxmList.length; i++) {
				// <tr><td>基本工资</td></tr>
				gzxmStr = '<tr><td>'
						+ gzxmList[i].csetgzitemname
						+ '</td><td style="display:none;">'
						+ (gzxmList[i].cgzitemformula == null ? ""
								: gzxmList[i].cgzitemformula)
						+ '</td><td style="display:none;">' + gzxmList[i].id
						+ '</td><td style="display:none;">'
						+ gzxmList[i].igzitemId + '</td></tr>';
				$("#datatable_1_bodyer").append(gzxmStr);
			}
			/*添加默认选中的默认工资项目、公式（2013-8-9）add by  lyl start*/
			$("#datatable_1_bodyer tr:first").css({"color":"#fff","backgroundColor":"#00f"});
			$("#area_1").val((gzxmList[0].cgzitemformula == null ? "": gzxmList[0].cgzitemformula));
			/*  end  */
			// 公式参照--填充工资项目
			$("#wage_project").html("");
			var gzxmczStr = "";
			for ( var i = 0; i < gzxmczList.length; i++) {
				gzxmczStr = '<option>' + gzxmczList[i].csetgzitemname
						+ '</option>';
				$("#wage_project").append(gzxmczStr);
			}
			// 填充部门
			$("#dept").html("");
			$("#dept").append('<option>部门</option>');
			var deptStr = "";
			for ( var i = 0; i < deptList.length; i++) {
				deptStr = '<option>' + deptList[i].cdepname + '</option>';
				$("#dept").append(deptStr);
			}
			// 人员类别
			$("#grade").html("");
			$("#grade").append('<option>人员类别</option>');
			var gradeStr = "";
			for ( var i = 0; i < gradeList.length; i++) {
				gradeStr = '<option>' + gradeList[i].cpsngrd + '</option>';
				$("#grade").append(gradeStr);
			}
		}
	});
	/* 公式设置工资项目可用(2013-7-29) */
	tab2RowSelection();
}
/**
 * 添加点击公式设置时将光标定位在文本框内、
 * tab2_currentSeletedRow 赋值
 * 2013-8-20 
 * add lyl
 */
function initTab(){
	$('#area_1').focus();
	tab2_currentSeletedRow=document.getElementById("tab2_waitem_table").rows[0];
}
function openTab2(){
	// 判断当前插入的行是否不是满行（每个单元格都有值）（2013-8-20 add lyl）
	if (currentInsertedRow != null) {
		if (!isFull(currentInsertedRow)) {
				jAlert("请填完整行");
				return false;
		}else{
			doSubmit(2);
			return true;
		}
	}
		doSubmit(2);	
		
}
// 确认
function doSubmit(mark) {
	var tblsetList = [];
	if (window.parent.parent.wa_wageTypeId == 1) {//（1：已登录，0：未登录）
		var wa_isWageSets = 0;// (0:未建立;1:单工资；2：多工资)
		if (window.parent.parent.wa_isWageSets == 1) {// 单工资类别
			wa_isWageSets = 1;
			// 已登录 单工资类别
			var datatable = document.getElementById("datatable_bodyer");
			for ( var i = 0; i < datatable.rows.length; i++) {
				var row = datatable.rows[i];
				var gztblset = {};
				gztblset.csetgzitemname = row.cells[0].innerHTML;
				gztblset.isetgzitemstyle = row.cells[1].innerHTML == "数字" ? 0
						: 1;
				gztblset.isetgzitemlenth = row.cells[2].innerHTML;
				gztblset.idecimal = row.cells[3].innerHTML;
				gztblset.isetgzitemprop = isetgzitemprop(row.cells[4].innerHTML);
				gztblset.id = row.cells[5].innerHTML;
				gztblset.igzitemId = row.cells[6].innerHTML;
				gztblset.igznum = i + 1;
				tblsetList[tblsetList.length] = gztblset;
			}
			var datatable_1_bodyer = document
					.getElementById("datatable_1_bodyer");
			var formulaList = [];
			for ( var i = 0; i < datatable_1_bodyer.rows.length; i++) {
				var row = datatable_1_bodyer.rows[i];
				var formula = {};
				formula.cgzitemformula = row.cells[1].innerHTML;
				formula.id = row.cells[2].innerHTML;
				formula.igzitemId = row.cells[3].innerHTML;
				formula.cgzgradenum = cgzgradenum;
				formula.iformulanum = i + 1;
				formulaList[formulaList.length] = formula;
			}
			$.ajax({
				url : "wageSetting!saveWageProject.action",
				type : "post",
				dataType : "json",
				async : false,
				cache : false,
				data : parseParam(tblsetList, "tblsetList") + "&delIds="
						+ waIds + "&waIgzitemIds=" + waIgzitemIds + "&"
						+ parseParam(formulaList, "formulaList")
						+ "&formulaIds=" + tab2waIds + "&wa_isWageSets="
						+ wa_isWageSets + "&cgzgradenum=" + cgzgradenum,
				success : function(data) {
				}
			});
		} else {
			// 已经登录 多工资类别
			var datatable = document.getElementById("datatable_bodyer");
			for ( var i = 0; i < datatable.rows.length; i++) {
				var row = datatable.rows[i];
				var gzitem = {};
				gzitem.cgzgradenum = cgzgradenum;
				gzitem.id = row.cells[5].innerHTML;
				gzitem.igzitemId = row.cells[6].innerHTML;
				gzitem.iorder = i + 1;
				tblsetList[tblsetList.length] = gzitem;
			}
			var datatable_1_bodyer = document
					.getElementById("datatable_1_bodyer");
			var formulaList = [];
			for ( var i = 0; i < datatable_1_bodyer.rows.length; i++) {
				var row = datatable_1_bodyer.rows[i];
				var formula = {};
				formula.cgzitemformula = row.cells[1].innerHTML;
				formula.id = row.cells[2].innerHTML;
				formula.igzitemId = row.cells[3].innerHTML;
				formula.cgzgradenum = cgzgradenum;
				formula.iformulanum = i + 1;
				formulaList[formulaList.length] = formula;
			}
			$.ajax({
				url : "wageSetting!saveWageProjectHasLanded.action",
				type : "post",
				dataType : "json",
				async : false,
				cache : false,
				data : parseParam(tblsetList, "itemList") + "&delIds=" + waIds
						+ "&" + parseParam(formulaList, "formulaList")
						+ "&formulaIds=" + tab2waIds,
				success : function(data) {
				}
			});
		}
		// 填充数据
		queryWageProject(window.parent.parent.wa_wageTypeId, cgzgradenum);
		queryFormulaSet(cgzgradenum);
		//将工资项目设置所选中的行 清除(2013-8-20 and lyl)
		currentSeletedRow = null;
	} else {
		wa_isWageSets = -1;
		// 未登录
		var datatable = document.getElementById("datatable_bodyer");
		for ( var i = 0; i < datatable.rows.length; i++) {
			var row = datatable.rows[i];
			var gztblset = {};
			gztblset.csetgzitemname = row.cells[0].innerHTML;
			gztblset.isetgzitemstyle = row.cells[1].innerHTML == "数字" ? 0 : 1;
			gztblset.isetgzitemlenth = row.cells[2].innerHTML;
			gztblset.idecimal = row.cells[3].innerHTML;
			gztblset.isetgzitemprop = isetgzitemprop(row.cells[4].innerHTML);
			gztblset.id = row.cells[5].innerHTML;
			gztblset.igzitemId = row.cells[6].innerHTML;
			gztblset.igznum = i + 1;
			tblsetList[tblsetList.length] = gztblset;
		}
		$.ajax({
			url : "wageSetting!saveWageProject.action",
			type : "post",
			dataType : "json",
			async : false,
			cache : false,
			data : parseParam(tblsetList, "tblsetList") + "&delIds=" + waIds
					+ "&waIgzitemIds=" + waIgzitemIds + "&wa_isWageSets="
					+ wa_isWageSets + "&cgzgradenum=" + cgzgradenum,
			success : function(data) {

			}
		});
	}
	/* 如果mark==1是“确认”按钮,触发的事件,否则是"点击公式设置"触发的2013-7-29 */
	if (mark == 1) {
		window.parent.closeWindow("wa_other_sps");
	}
	//将删除变量清空 2013-10-8 lyl
	waIds="";
	waIgzitemIds="";
	tab2waIds="";
	var con=$("#tab2_waitem_table tr:first").find("td:eq(0)").html();
	$("#title").html(con);
	
}
// 判断是什么类型
var isetgzitemprop = function(data) {
	if (data == "增项") {
		return 0;
	} else if (data == "减项") {
		return 1;
	} else {
		return 2;
	}
};
var parseParam = function(param, key) {
	var paramStr = "";
	if (param instanceof String || param instanceof Number
			|| param instanceof Boolean) {
		paramStr += "&" + key + "=" + encodeURIComponent(param);
	} else {
		$.each(param, function(i) {
			var k = key == null ? i : key
					+ (param instanceof Array ? "[" + i + "]" : "." + i);
			paramStr += '&' + parseParam(this, k);
		});
	}
	return paramStr.substr(1);
};