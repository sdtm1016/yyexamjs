/**
 * @Description 报表js Base
 * @author 吕奥林
 * @Date 2013-7-24
 * @Company 畅捷通信息技术股份有限公司
 * @Department 研发中心培教研发部
 * @Porject Exam
 */

(function() {

	var global = this;
	if (typeof ReportJs === 'undefined') {
		global.ReportJs = {
			Base : {},
			Util : {},
			Functions : {},
			Score : {}
		};
	}
	ReportJs.CreateNameSpace = function(path) {
		var arr = path.split(".");
		var ns = "";
		for (var i = 0; i < arr.length; i++) {
			if (i > 0)
				ns += ".";
			ns += arr[i];
			eval("if(typeof(" + ns + ") == 'undefined') " + ns
					+ " = new Object();");
		}
	}
	var filenameout = ""; // 当前打开报表文件的唯一名称 ，为空时表示新建的报表文件
	var filename = "";// 报表中文名称 重要 和判分相关
	
    //报表页签内容是否改变标志   0无改变 1 有改变   
	//由于页签切换事件不能正确判断内容是否修改，故添加了此标志。
	//一个页签内判断内容是否改变使用     CellWeb1.IsModified()
	//由格式页签改变到数据页签时判断格式是否改动过使用 ReportJs.getChangeFlag() ---add by lval 20130904
	//这两种方式的原理都是：捕获单元格内容改变事件，设置标志来实现
    var changeFlag="0";
    
    var saveFlag="0";
    
    ReportJs.getSaveFlag = function() {
		return saveFlag;
	}

	ReportJs.setSaveFlag = function(name) {
		saveFlag = name;
	}
    
    
	ReportJs.getChangeFlag = function() {
		return changeFlag;
	}

	ReportJs.setChangeFlag = function(name) {
		changeFlag = name;
	}
    
	ReportJs.getFileNameOut = function() {
		return filenameout;
	}

	ReportJs.setFileNameOut = function(name) {
		filenameout = name;
	}
	ReportJs.getFileName = function() {
		return filename;
	}

	ReportJs.setFileName = function(name) {
		filename = name;
	}
	
	ReportJs.GetCurrentTime = function(flag) {
		var currentTime = "";
		var myDate = new Date();
		var year = myDate.getFullYear();
		var month = parseInt(myDate.getMonth().toString()) + 1; // month是从0开始计数的，因此要
		// + 1
		if (month < 10) {
			month = "0" + month.toString();
		}
		var date = myDate.getDate();
		if (date < 10) {
			date = "0" + date.toString();
		}
		var hour = myDate.getHours();
		if (hour < 10) {
			hour = "0" + hour.toString();
		}
		var minute = myDate.getMinutes();
		if (minute < 10) {
			minute = "0" + minute.toString();
		}
		var second = myDate.getSeconds();
		if (second < 10) {
			second = "0" + second.toString();
		}
		if (flag == "0") {
			currentTime = year.toString() + month.toString() + date.toString()
					+ hour.toString() + minute.toString() + second.toString(); // 返回时间的数字组合
		} else if (flag == "1") {
			currentTime = year.toString() + "/" + month.toString() + "/"
					+ date.toString() + " " + hour.toString() + ":"
					+ minute.toString() + ":" + second.toString(); // 以时间格式返回
		}
		return currentTime;
	}

	ReportJs.Base.window_onload = function() {
		// 初始化cell插件
		this.initWebCell();
		// 初始化页签
		this.initSheet();
		// 下载报表模板 add by lval 20130709
		this.downLoadReportTemplet();
	}
	ReportJs.Base.window_onresize = function() {
		/*var lWidth = document.body.offsetWidth;
		if (lWidth <= 0)
			lWidth = 1;
		CellWeb1.style.width = lWidth;
		Menu1.style.width = lWidth;

		var lHeight = document.body.offsetHeight - parseInt(CellWeb1.style.top);

		if (lHeight <= 0)
			lHeight = 1;
		CellWeb1.style.height = lHeight;*/
		var lWidth = document.body.offsetWidth;
		if (lWidth <= 0)
			lWidth = 1;
		CellWeb1.style.width = lWidth;
		Menu1.style.width = lWidth;
		// var lHeight = document.body.offsetHeight -
		// parseInt(CellWeb1.style.top);// 修改alter 陈建宇---------
		var lHeight = document.documentElement.clientHeight - parseInt(CellWeb1.style.top);
		if (lHeight <= 0){
			lHeight = 1;
		}
		CellWeb1.style.height = lHeight;
	}
	// 初始化cell插件 （加载页面插件后执行一次）
	ReportJs.Base.initWebCell = function() {
		// add by lval ---begin---
		// 注册
		this.RegisterCell(CellWeb1);
		// add by lval ---end---
		Menu1.style.left = 0;
		Menu1.style.top = 0;
		CellWeb1.EnableUndo(true);
		CellWeb1.Mergecell = true;
		CellWeb1.border = 0;
		CellWeb1.style.left = 0;
		// CellWeb1.style.top = idTBDesign.offsetTop + idTBDesign.offsetHeight;
		CellWeb1.style.top = formulaBar.offsetTop + formulaBar.offsetHeight;// add
																			// by
																			// lval
																			// 新增公式栏

		var lWidth = document.body.offsetWidth;
		if (lWidth <= 0)
			lWidth = 1;
		CellWeb1.style.width = lWidth;
		Menu1.style.width = lWidth;
		// var lHeight = document.body.offsetHeight -
		// parseInt(CellWeb1.style.top);// 修改alter 陈建宇---------
		var lHeight = document.documentElement.clientHeight - parseInt(CellWeb1.style.top);
		if (lHeight <= 0){
			lHeight = 1;
		}
		CellWeb1.style.height = lHeight;
		
		
		
		
		
		// 远程获取菜单 add by lval 20130220------begin----
		var href = window.location.href;
		href = unescape(href);
		start = 0;
		end = href.lastIndexOf("/");
		href = href.substring(start, end + 1);
		href = href + "emenu.clm";
		Menu1.ReadMenuFromRemoteFile(href);
		// 远程获取菜单 add by lval 20130220------end----
		CellWeb1.style.display = "";
		ReportJs.Base.InitFontname();
		ReportJs.Functions.setFunctions();

		CellWeb1.InputFormulaInCell(true); // 双击不弹出 自带公式输入栏，直接在单元格中输入公式
		CellWeb1.AllowDragdrop = false;// 不允许拖拽操作

	}
	ReportJs.Base.InitFontname = function() {
		strFontnames = CellWeb1.GetDisplayFontnames();
		var arrFontname = strFontnames.split('|');
		arrFontname.sort();
		var i;
		var sysFont;
		if (CellWeb1.GetSysLangID() == 2052)
			sysFont = "宋体";
		else
			sysFont = "Arial";

		for (i = 0; i < arrFontname.length; i++) {
			var oOption = document.createElement("OPTION");
			FontNameSelect.options.add(oOption);
			//oOption
			oOption.innerText = arrFontname[i];
			oOption.value = arrFontname[i];
			if (arrFontname[i] == sysFont)
				oOption.selected = true;
		}
	}
	// 注册cell插件
	ReportJs.Base.RegisterCell = function(CellObj) {
		/*if (CellObj.Login("用友软件", "", "13100104565", "6260-0560-0063-3005") == 0) {
			jAlert("Cell组件注册失败，请联系软件厂商");
			return false;
		}
		*/
		CellObj.LocalizeControl(0x804);
		return true;
	}
	// 初始化页签----新建报表都需要执行------
	ReportJs.Base.initSheet = function() {
		// 模拟“格式”“数据”按钮
		CellWeb1.SetSheetLabel(0, '数据');

		// Cell.InsertSheet 0，1 在第一页前面插入一页。
		// Cell.InsertSheet 1，1 在第一页后面插入一页。
		CellWeb1.InsertSheet(0, 1);
		CellWeb1.SetSheetLabel(0, '格式');

		// 清除上张报表关键字信息
		ReportJs.Base.clearKeyInfor();

		CellWeb1.SetModified(0);// 内容是否改变标志 0表示内容 未改变

	}

	// 下载报表模板
	ReportJs.Base.downLoadReportTemplet = function() {
		$.ajax({
					url : 'reportManageAction!downLoadReportTemplet',
					dataType : 'json',
					success : function(data) {
						var status = data.status;
					}
				});
     //当点击财务报表时，将报表模板界面同时打开(2013-9-25)lyl
		ReportJs.Base.mnuFileNew_click();
	}

	
	//控制两种状态下 菜单的显示
	ReportJs.Base.menuChange = function(model) {
		if(model=="数据"){
			//$("#cmdFormulaInput").attr("disabled", "disabled");
			ReportJs.Util.disable_true("cmdFormulaInput");
			ReportJs.Util.disable_true("cmdFormulaInput3");
			ReportJs.Util.disable_true("cmdFormulaInput4");
			
			//$("#idTBGeneral").hide();
			$("#idTBFormat").hide();
			$("#idTBDesign").hide();
			
			
			
			CellWeb1.style.top=70;
			var lHeight = document.documentElement.clientHeight - parseInt(CellWeb1.style.top);
			if (lHeight <= 0){
				lHeight = 1;
			}
			CellWeb1.style.height = lHeight;
			
			
			
		}else{
			
			

			
			//$("#cmdFormulaInput").attr("disabled", false);
			ReportJs.Util.disable_false("cmdFormulaInput");
			ReportJs.Util.disable_false("cmdFormulaInput3");
			ReportJs.Util.disable_false("cmdFormulaInput4");
			//$("#idTBGeneral").show();
			$("#idTBFormat").show();
			$("#idTBDesign").show();
			
			
			
			var top= $("#idTBGeneral").height()+$("#idTBFormat").height()+$("#idTBDesign").height();

			CellWeb1.style.top=top+50;
			var lHeight = document.documentElement.clientHeight - parseInt(CellWeb1.style.top);
			if (lHeight <= 0){
				lHeight = 1;
			}
			CellWeb1.style.height = lHeight;
			
			
		}
		
	}
	
	/**
	 * 格式数据页签切换事件处理函数
	 * 
	 * @param {}
	 *            oldsheet
	 * @param {}
	 *            newsheet
	 */
	ReportJs.Base.CellWeb1_SheetChanged = function(oldsheet, newsheet) {

		var oldsheetName = CellWeb1.GetSheetLabel(oldsheet);
		var newsheetName = CellWeb1.GetSheetLabel(newsheet);
		if (oldsheetName == "格式" && newsheetName == "数据") {
			
			//控制菜单的有效性
			ReportJs.Base.menuChange("数据");
			
			// 将“格式”页签内容 复制 到“数据” 页签中
			CellWeb1.CopySheet(1, 0);
			// 网格线隐藏
			CellWeb1.ShowGridLine(0, CellWeb1.GetCurSheet());
			// 将数据页签 置为只读状态
			CellWeb1.WorkbookReadonly = true;
			// 同时改变菜单,关键字只能录入

			// 公式单元格设置为显示计算结果
			CellWeb1.SetShowFormula(0);
			// 展示关键字信息
			ReportJs.Base.showKeyInfor("数据");
			
			
			//如果有改动，则提示全表重算  add by  lval 20130904
			if (ReportJs.getChangeFlag()) { 
				if(ReportJs.getSaveFlag()=="1"){//如果正在保存状态下不再提示全表重算。。。
							mnuFormulaReCalc_click();
				}else{
					jConfirm("是否确定全表重算?", "确认对话框", function(confirmflag) {
						if (confirmflag) {
							mnuFormulaReCalc_click();
						}
					});
				}
				
				//mnuFormulaReCalc_click();
			}
			
		} else {
			// 展示关键字信息
			ReportJs.Base.showKeyInfor("格式");
			//控制菜单的有效性
			ReportJs.Base.menuChange("格式");
			// 将格式页签置为可编辑状态
			CellWeb1.WorkbookReadonly = false;
			// 同时改变菜单,关键字只能设置

			// 公式单元格设置为显示公式
			CellWeb1.SetShowFormula(1);
            //修改标志重置   ---add by lval 20130904
			CellWeb1.SetModified(0);
			ReportJs.setChangeFlag(0);
		}

	}

	// 在数据页签下展示关键字信息
	ReportJs.Base.showKeyInfor = function(type) {
		var year = getStringVar("year");// 原值

		if (year != "") {
			// jAlert(year);
			var arr = year.split("@");
			// 单元格展示
			// 坐标arr[0] 值arr[1]+arr[2]
			var pos = arr[0].split(",");
			var value="";
			if(type=="格式"){
				value="XXXX";
			}else{
				value = arr[1];
			}
			ReportJs.Base.setKeyToSheet(pos[0], pos[1], value + "  年");
		}

		var month = getStringVar("month");
		if (month != "") {
			var arr = month.split("@");
			// 单元格展示
			// 坐标arr[0] 值arr[1]+arr[2]
			var pos = arr[0].split(",");
			var value="";
			if(type=="格式"){
				value="XXXX";
			}else{
				value = arr[1];
			}
			ReportJs.Base.setKeyToSheet(pos[0], pos[1], value + "  月");
		}
		var day = getStringVar("day");
		if (day != "") {
			var arr = day.split("@");
			// 单元格展示
			// 坐标arr[0] 值arr[1]+arr[2]
			var pos = arr[0].split(",");
			var value="";
			if(type=="格式"){
				value="XXXX";
			}else{
				value = arr[1];
			}
			ReportJs.Base.setKeyToSheet(pos[0], pos[1], value + "  日");
		}
		var season = getStringVar("season");
		if (season != "") {
			var arr = season.split("@");
			// 单元格展示
			// 坐标arr[0] 值arr[1]+arr[2]
			var pos = arr[0].split(",");
			var value="";
			if(type=="格式"){
				value="XXXX";
			}else{
				value = arr[1];
			}
			ReportJs.Base.setKeyToSheet(pos[0], pos[1], "第" + value + "季度");
		}
		var companyname = getStringVar("companyname");
		if (companyname != "") {
			var arr = companyname.split("@");
			// 单元格展示
			// 坐标arr[0] 值arr[1]+arr[2]
			var pos = arr[0].split(",");
			var value="";
			if(type=="格式"){
				value="XXXX";
			}else{
				value = arr[1];
			}
			ReportJs.Base.setKeyToSheet(pos[0], pos[1], "单位名称:" + value);
		}
		var companyid = getStringVar("companyid");
		if (companyid != "") {
			var arr = companyid.split("@");
			// 单元格展示
			// 坐标arr[0] 值arr[1]+arr[2]
			var pos = arr[0].split(",");
			var value="";
			if(type=="格式"){
				value="XXXX";
			}else{
				value = arr[1];
			}
			ReportJs.Base.setKeyToSheet(pos[0], pos[1], "单位编码:" + value);
		}
	}

	// 清除关键字信息
	ReportJs.Base.clearKeyInfor = function() {
		CellWeb1.DeleteVar(CellWeb1.GetIndex("year"));
		CellWeb1.DeleteVar(CellWeb1.GetIndex("month"));
		CellWeb1.DeleteVar(CellWeb1.GetIndex("day"));
		CellWeb1.DeleteVar(CellWeb1.GetIndex("season"));
		CellWeb1.DeleteVar(CellWeb1.GetIndex("companyname"));
		CellWeb1.DeleteVar(CellWeb1.GetIndex("companyid"));
	}

	// 设置关键字
	ReportJs.Base.DataKeyWordSet = function() {
		var dialogWidth = 300;
		var dialogHeight = 250;
		var args = new Object();
		args.year = "";
		args.month = "";
		args.day = "";
		args.season = "";
		args.companyname = "";
		args.companyid = "";
		args.selfDefinedName = "";
		args.selfDefinedValue = "";

		var left = (window.screen.width - dialogWidth) / 2;
		var top = (window.screen.height - dialogHeight) / 2;
		var returnValue = window.showModalDialog("keyWordSet.html", args,
				"dialogTop:" + top + ";dialogLeft:" + left + ";dialogHeight:"
						+ dialogHeight + "px;dialogWidth:" + dialogWidth
						+ "px;center:no;status:yes;resizable:yes;scroll:yes;");

		if (args.year != "") {
			// 定义关键字year变量 值格式 col,row,value,年
			CellWeb1.DefineStringVar("year", CellWeb1.GetCurrentCol + ","
							+ CellWeb1.GetCurrentRow + "@@ 年");
			// 格式状态 展示关键字
			ReportJs.Base.setKeyToSheet(CellWeb1.GetCurrentCol,
					CellWeb1.GetCurrentRow, "XXXX 年");
		}
		if (args.month != "") {
			CellWeb1.DefineStringVar("month", CellWeb1.GetCurrentCol + ","
							+ CellWeb1.GetCurrentRow + "@@ 月");
			ReportJs.Base.setKeyToSheet(CellWeb1.GetCurrentCol,
					CellWeb1.GetCurrentRow, "XX 月");
		}
		if (args.day != "") {
			CellWeb1.DefineStringVar("day", CellWeb1.GetCurrentCol + ","
							+ CellWeb1.GetCurrentRow + "@@ 日");
			ReportJs.Base.setKeyToSheet(CellWeb1.GetCurrentCol,
					CellWeb1.GetCurrentRow, "XX 日");
		}
		if (args.season != "") {
			CellWeb1.DefineStringVar("season", CellWeb1.GetCurrentCol + ","
							+ CellWeb1.GetCurrentRow + "@@ 季度");
			ReportJs.Base.setKeyToSheet(CellWeb1.GetCurrentCol,
					CellWeb1.GetCurrentRow, "第 X 季度");
		}
		if (args.companyname != "") {
			CellWeb1.DefineStringVar("companyname", CellWeb1.GetCurrentCol
							+ "," + CellWeb1.GetCurrentRow + "@@单位名称");
			ReportJs.Base.setKeyToSheet(CellWeb1.GetCurrentCol,
					CellWeb1.GetCurrentRow, "单位名称：XXXXXXXXXX");
		}
		if (args.companyid != "") {
			CellWeb1.DefineStringVar("companyid", CellWeb1.GetCurrentCol + ","
							+ CellWeb1.GetCurrentRow + "@@单位编码");
			ReportJs.Base.setKeyToSheet(CellWeb1.GetCurrentCol,
					CellWeb1.GetCurrentRow, "单位编码：XXXXXXXXXX");
		}

		if (args.selfDefinedName != "" && args.selfDefinedValue != "") {
			// CellWeb1.SetCellTextColor(CellWeb1.GetCurrentCol,CellWeb1.GetCurrentRow,
			// CellWeb1.GetCurSheet,CellWeb1.FindColorIndex(0xFF0000,1));
			// CellWeb1.SetCellString
			// (CellWeb1.GetCurrentCol,CellWeb1.GetCurrentRow,
			// CellWeb1.GetCurSheet,args.selfDefinedValue+"
			// "+args.selfDefinedName) ; //向单元格设置公式
		}
	}

	// 关键字录入
	ReportJs.Base.DataKeyWordInput = function() {
		var dialogWidth = 400;
		var dialogHeight = 250;
		var args = new Object();

		// 带入已录入的关键字
		args.year = getStringVar("year").split("@")[1];
		args.month = getStringVar("month").split("@")[1];
		args.day = getStringVar("day").split("@")[1];
		args.season = getStringVar("season").split("@")[1];
		args.companyname = getStringVar("companyname").split("@")[1];
		args.companyid = getStringVar("companyid").split("@")[1];
		args.selfDefinedName = getStringVar("selfDefinedName").split("@")[1];
		args.selfDefinedValue = getStringVar("selfDefinedValue").split("@")[1];
		//变量
		args.year1 = getStringVar("year");
		args.month1 = getStringVar("month");
		args.day1 = getStringVar("day");
		args.season1 = getStringVar("season");
		args.companyname1 = getStringVar("companyname");
		args.companyid1 = getStringVar("companyid");
		args.selfDefinedName1 = getStringVar("selfDefinedName");
		args.selfDefinedValue1 = getStringVar("selfDefinedValue");
		var left = (window.screen.width - dialogWidth) / 2;
		var top = (window.screen.height - dialogHeight) / 2;
		var returnValue = window.showModalDialog("keyWordInput.html", args,
				"dialogTop:" + top + ";dialogLeft:" + left + ";dialogHeight:"
						+ dialogHeight + "px;dialogWidth:" + dialogWidth
						+ "px;center:no;status:yes;resizable:yes;scroll:yes;");
		
		// 获取关键字year变量 的值，格式 col,row,value,年 将其中的？替换
		// CellWeb1.DefineStringVar("year",CellWeb1.GetCurrentCol+","+CellWeb1.GetCurrentRow+"@?
		// 年");
		var year = getStringVar("year");// 原值
		if (year != "") {
			var arr = year.split("@");
			year = arr[0] + "@" + args.year + "@" + arr[2];
			CellWeb1.DefineStringVar("year", year);// 更新

			// 单元格展示
			// 坐标arr[0] 值arr[1]+arr[2]
			var pos = arr[0].split(",");
			ReportJs.Base.setKeyToSheet(pos[0], pos[1], args.year + arr[2]);
		}

		var month = getStringVar("month");
		if (month != "") {
			var arr = month.split("@");
			month = arr[0] + "@" + args.month + "@" + arr[2];
			CellWeb1.DefineStringVar("month", month);// 更新

			// 单元格展示
			// 坐标arr[0] 值arr[1]+arr[2]
			var pos = arr[0].split(",");
			ReportJs.Base.setKeyToSheet(pos[0], pos[1], args.month + arr[2]);
		}
		var day = getStringVar("day");
		if (day != "") {
			var arr = day.split("@");
			day = arr[0] + "@" + args.day + "@" + arr[2];
			CellWeb1.DefineStringVar("day", day);// 更新

			// 单元格展示
			// 坐标arr[0] 值arr[1]+arr[2]
			var pos = arr[0].split(",");
			ReportJs.Base.setKeyToSheet(pos[0], pos[1], args.day + arr[2]);
		}
		var season = getStringVar("season");
		if (season != "") {
			var arr = season.split("@");
			season = arr[0] + "@" + args.season + "@" + arr[2];
			CellWeb1.DefineStringVar("season", season);// 更新

			// 单元格展示
			// 坐标arr[0] 值arr[1]+arr[2]
			var pos = arr[0].split(",");
			ReportJs.Base.setKeyToSheet(pos[0], pos[1], "第" + args.season
							+ "季度");
		}
		var companyname = getStringVar("companyname");
		if (companyname != "") {
			var arr = companyname.split("@");
			companyname = arr[0] + "@" + args.companyname + "@" + arr[2];
			CellWeb1.DefineStringVar("companyname", companyname);// 更新

			// 单元格展示
			// 坐标arr[0] 值arr[1]+arr[2]
			var pos = arr[0].split(",");
			ReportJs.Base.setKeyToSheet(pos[0], pos[1], "单位名称:"
							+ args.companyname);
		}
		var companyid = getStringVar("companyid");
		if (companyid != "") {
			var arr = companyid.split("@");
			companyid = arr[0] + "@" + args.companyid + "@" + arr[2];
			CellWeb1.DefineStringVar("companyid", companyid);// 更新

			// 单元格展示
			// 坐标arr[0] 值arr[1]+arr[2]
			var pos = arr[0].split(",");
			ReportJs.Base.setKeyToSheet(pos[0], pos[1], "单位编码:"
							+ args.companyid);
		}

		jConfirm("是否整表重算?", "确认对话框", function(confirmflag) {
					if (confirmflag) {
						showCover();
						mnuFormulaReCalc_click();
						hiddenCover();
					}
				});

	}
	// 取消关键字 lyl
	ReportJs.Base.DataKeyWordCancel = function() {
		var dialogWidth = 320;
		var dialogHeight = 200;
		var args = new Object();

		// 带入已录入的关键字
		args.year = getStringVar("year").split("@")[2];
		args.month = getStringVar("month").split("@")[2];
		args.day = getStringVar("day").split("@")[2];
		args.season = getStringVar("season").split("@")[2];
		args.companyname = getStringVar("companyname").split("@")[2];
		args.companyid = getStringVar("companyid").split("@")[2];
		args.selfDefinedName = getStringVar("selfDefinedName").split("@")[2];
		args.selfDefinedValue = getStringVar("selfDefinedValue").split("@")[2];

		var left = (window.screen.width - dialogWidth) / 2;
		var top = (window.screen.height - dialogHeight) / 2;
		var returnValue = window.showModalDialog("keyWordCancel.html", args,
				"dialogTop:" + top + ";dialogLeft:" + left + ";dialogHeight:"
						+ dialogHeight + "px;dialogWidth:" + dialogWidth
						+ "px;center:no;status:yes;resizable:yes;scroll:yes;");
		if (typeof(returnValue) == "undefined") {
			return;
		}
		//取消关键字两步走：1。清除相应单元格的内容 2。删除关键字变量
		
		var year = getStringVar("year");// 原值
		if (returnValue.year == 1 && typeof(returnValue.year) != "undefined") {
			var arr = year.split("@");
			var pos = arr[0].split(",");
			ReportJs.Base.clearKeyToSheet(pos[0], pos[1]);
			
			CellWeb1.DeleteVar(CellWeb1.GetIndex("year"));//删除关键字变量
		}

		var month = getStringVar("month");
		if (returnValue.month == 1 && typeof(returnValue.month) != "undefined") {
			var arr = month.split("@");
			var pos = arr[0].split(",");
			ReportJs.Base.clearKeyToSheet(pos[0], pos[1]);
			CellWeb1.DeleteVar(CellWeb1.GetIndex("month"));//删除关键字变量
		}
		var day = getStringVar("day");
		if (returnValue.day == 1 && typeof(returnValue.day) != "undefined") {
			var arr = day.split("@");
			var pos = arr[0].split(",");
			ReportJs.Base.clearKeyToSheet(pos[0], pos[1]);
			CellWeb1.DeleteVar(CellWeb1.GetIndex("day"));//删除关键字变量
		}
		var season = getStringVar("season");
		if (returnValue.season == 1
				&& typeof(returnValue.season) != "undefined") {
			var arr = season.split("@");
			var pos = arr[0].split(",");
			ReportJs.Base.clearKeyToSheet(pos[0], pos[1]);
			CellWeb1.DeleteVar(CellWeb1.GetIndex("season"));//删除关键字变量
		}
		var companyname = getStringVar("companyname");
		if (returnValue.companyname == 1
				&& typeof(returnValue.companyname) != "undefined") {
			var arr = companyname.split("@");
			var pos = arr[0].split(",");
			ReportJs.Base.clearKeyToSheet(pos[0], pos[1]);
			CellWeb1.DeleteVar(CellWeb1.GetIndex("companyname"));//删除关键字变量
		}
		var companyid = getStringVar("companyid");
		if (returnValue.companyid == 1
				&& typeof(returnValue.companyid) != "undefined") {
			var arr = companyid.split("@");
			companyid = arr[0] + "@" + args.companyid + "@" + arr[2];
			var pos = arr[0].split(",");
			ReportJs.Base.clearKeyToSheet(pos[0], pos[1]);
			CellWeb1.DeleteVar(CellWeb1.GetIndex("companyid"));//删除关键字变量
		}

	}
	// 页签上展示关键字
	ReportJs.Base.setKeyToSheet = function(col, row, value) {
		CellWeb1.SetCellInput(col, row, CellWeb1.GetCurSheet, 5); // 单元格设置为只读
		CellWeb1.SetCellTextColor(col, row, CellWeb1.GetCurSheet, CellWeb1.FindColorIndex(0x0000FF, 1)); // sunjh
		CellWeb1.SetCellString(col, row, CellWeb1.GetCurSheet, value);

	}
	// 页签上清除关键字
	ReportJs.Base.clearKeyToSheet = function(col, row) {
		
		//1 清除格式页签上关键字
		CellWeb1.SetCellInput(col, row, 0, 1); // 单元格设置可编辑
		CellWeb1.SetCellTextColor(col, row, 0, CellWeb1.FindColorIndex(-1, 1));
		CellWeb1.SetCellString(col, row, 0, "");
		
		//2 清除数据页签 上关键字
		CellWeb1.SetCellInput(col, row, 1, 1); // 单元格设置可编辑
		CellWeb1.SetCellTextColor(col, row, 1, CellWeb1.FindColorIndex(-1, 1));
		CellWeb1.SetCellString(col, row, 1, "");

	}

	/**
	 * @author 孙敬行
	 * @date 2013-8-22
	 */
	// 组合单元
	ReportJs.Base.Formula_mergecell_click = function() {
		var obj1 = {}; // 输入参数对象
		var obj2 = ReportJs.Util.openWindow("./formula/formula_mergecell.html",
				350, 170, obj1);
		if (obj2.arg1 == 1) {
			mnuFormatMergeCell_click();
		} else if (obj2.arg1 == 2) {
			mnuFormatUnMergeCell_click();
		} else if (obj2.arg1 == 3) {
			cmdMergeRow_click();
		} else if (obj2.arg1 == 4) {
			cmdMergeCol_click();
		} else if (obj2.arg1 == 5) {
			window.close();
		}
	}

	// --end--孙敬行-----------

	// 输入公式
	ReportJs.Base.mnuFormulaInput_click = function(oldFormula) {
		// CellWeb1.FormulaWizard
		// (CellWeb1.GetCurrentCol,CellWeb1.GetCurrentRow);
		//alert('aaa');
		var obj1 = {}; // 输入参数对象
		obj1.arg0 = oldFormula;
		var obj2 = ReportJs.Util.openWindow("./formula/define_formula.html",
				500, 200, obj1);
		// obj2.arg1//输出参数对象
		CellWeb1.CalcManaually = true;
		
		
		if (obj2.arg1.formula != ""  && obj2.arg1.formula!="undefined" && obj2.arg1.formula!=undefined) {
			//alert(obj2.arg1.formula);
			//先清空 再修改
			CellWeb1.SetCellString(CellWeb1.GetCurrentCol,CellWeb1.GetCurrentRow, CellWeb1.GetCurSheet, "");
			CellWeb1.Clear(2);//数字2是清楚公式
			
			CellWeb1.SetShowFormula(1);// 公式单元格显示公式
			CellWeb1.SetFormula(CellWeb1.GetCurrentCol, CellWeb1.GetCurrentRow,
					CellWeb1.GetCurSheet, obj2.arg1.formula);
			/*if (CellWeb1.isFormulaCell(CellWeb1.GetCurrentCol,
					CellWeb1.GetCurrentRow, CellWeb1.GetCurSheet)) {
				CellWeb1.SetCellString(CellWeb1.GetCurrentCol,
						CellWeb1.GetCurrentRow, CellWeb1.GetCurSheet, "公式单元");
			}*/
			//alert(1111);
		}
		
		if(obj2.arg1.formula=="" ){
				CellWeb1.SetCellString(CellWeb1.GetCurrentCol,CellWeb1.GetCurrentRow, CellWeb1.GetCurSheet, "");
				CellWeb1.Clear(2);
		}
		
		CellWeb1.SetModified(1);// 提示重新计算
		ReportJs.setChangeFlag("1");
	}
	//公式栏输入公式     确认 按钮
	ReportJs.Base.inputgongshi = function() {
		var obj2={};
		obj2.arg1={};
		obj2.arg1.formula=$("#formulaTextId").val();
		//alert(CellWeb1.GetCurrentCol+"@@"+obj2.arg1.formula);
		CellWeb1.CalcManaually = true;
		if (obj2.arg1.formula != "") {
			if(obj2.arg1.formula.charAt(0)=="="){
				//公式单元格
				CellWeb1.SetShowFormula(1);// 公式单元格显示公式
				CellWeb1.SetFormula(CellWeb1.GetCurrentCol, CellWeb1.GetCurrentRow,
						CellWeb1.GetCurSheet, obj2.arg1.formula.substring(1));//设置公式时要把等号去掉
			}else{
				//普通单元格
				CellWeb1.SetCellString(CellWeb1.GetCurrentCol,
						CellWeb1.GetCurrentRow, CellWeb1.GetCurSheet, obj2.arg1.formula);
			}
			
		} else {
			CellWeb1.SetCellString(CellWeb1.GetCurrentCol,
					CellWeb1.GetCurrentRow, CellWeb1.GetCurSheet, "");
			//CellWeb1.Clear(32);
		}
		CellWeb1.SetModified(1);// 提示重新计算
		ReportJs.setChangeFlag("1");
	}
	

	// 鼠标左键单击单元格
	ReportJs.Base.CellWeb1_MouseLClick = function(col, row, updn) {
		if (CellWeb1.isFormulaCell(CellWeb1.GetCurrentCol,
				CellWeb1.GetCurrentRow, CellWeb1.GetCurSheet)) {
			
			//公式单元格的展示必须加等号“=”  用来和普通单元格区别    20131009
			$("#formulaTextId").attr(
					"value",
					"="+CellWeb1.GetFormula(CellWeb1.GetCurrentCol,
							CellWeb1.GetCurrentRow, CellWeb1.GetCurSheet));
		} else {
			$("#formulaTextId").attr(
					"value",
					CellWeb1.GetCellString(CellWeb1.GetCurrentCol,
							CellWeb1.GetCurrentRow, CellWeb1.GetCurSheet));
		}
		if (CellWeb1.GetSheetLabel(CellWeb1.GetCurSheet) == "格式") {
			// 格式状态下 可编辑
			ReportJs.Util.disable_false("formulaTextId");
		} else {
			// 数据状态 下 只读
			ReportJs.Util.disable_true("formulaTextId", "#d4d0c8");
		}

	}
	// 鼠标左键双击单元格
	ReportJs.Base.CellWeb1_MouseDClick = function(col, row) {
		if (CellWeb1.isFormulaCell(CellWeb1.GetCurrentCol,
				CellWeb1.GetCurrentRow, CellWeb1.GetCurSheet)) {
			var oldFormula = CellWeb1.GetFormula(CellWeb1.GetCurrentCol,
					CellWeb1.GetCurrentRow, CellWeb1.GetCurSheet);
			$("#formulaTextId").attr("value", "="+oldFormula);
			if (!CellWeb1.WorkbookReadonly) {// 只有非只读的状态下才启动公式向导
				ReportJs.Base.mnuFormulaInput_click(oldFormula);
			}

		} else {
			$("#formulaTextId").attr(
					"value",
					CellWeb1.GetCellString(CellWeb1.GetCurrentCol,
							CellWeb1.GetCurrentRow, CellWeb1.GetCurSheet));
		}
		if (CellWeb1.GetSheetLabel(CellWeb1.GetCurSheet) == "格式") {
			// 格式状态下 可编辑
			ReportJs.Util.disable_false("formulaTextId");
		} else {
			// 数据状态 下 只读
			ReportJs.Util.disable_true("formulaTextId", "#d4d0c8");
		}

	}
	// '**************************************************
	// ' 文件菜单
	// '**************************************************
	// '新建
	ReportJs.Base.mnuFileNew_click = function() {
		// return;
		if (CellWeb1.IsModified()) { // '文档已经被更改
			jConfirm("文档已被更改，是否保存？", "确认信息", function(flag) {
						if (flag == true) {
							ReportJs.Base.mnuFileSave_click();
						}
						ReportJs.Util.openModel();
						
					});
			// 清除上张报表关键字信息 lyl 2014-1-20
			ReportJs.Base.clearKeyInfor();
		} else {
			ReportJs.Util.openModel();
		}
		
	}
	
	ReportJs.Util.openModel = function (){
		var obj = ReportJs.Util.openWindow("openModel.html", 650, 400);

		if (obj.arg1 == "empty_report") {// 空报表
			CellWeb1.ResetContent();
			ReportJs.Base.initSheet();
			ReportJs.setFileNameOut("");

		} else {
			if (obj.arg1 == "") {
				return;
			}
			ReportJs.Util.createCllFileOnServer(obj.arg1,1);
			ReportJs.setFileNameOut("");
			ReportJs.setFileName("");
			// 如果打开时数据页签处于点亮状态
			if (CellWeb1.GetSheetLabel(CellWeb1.GetCurSheet()) == '数据') {
				ReportJs.Base.CellWeb1_SheetChanged(0, 1);
			}
			//mnuFormulaReCalc_click();
		}
		CellWeb1.SetModified(0);// 内容是否改变标志 0表示初始状态 未改变
	}
	
	
	
	/**
	 * 得分相关函数
	 */

	ReportJs.CreateNameSpace("ReportJs.Score");

	// 输入公式
	/*
	 * function mnuFormulaInput_click(){
	 * 
	 * 
	 * 
	 * var obj1 =openWindow("./FuncGuide/fw1.html",500,400); var obj2
	 * =openWindow("./FuncGuide/fw2.html",500,400,obj1);
	 * //CellWeb1.SetCellShowExpr(CellWeb1.GetCurrentCol,CellWeb1.GetCurrentRow,
	 * CellWeb1.GetCurSheet); // CellWeb1.SetCellString
	 * (CellWeb1.GetCurrentCol,CellWeb1.GetCurrentRow,
	 * CellWeb1.GetCurSheet,obj2.arg1) ; alert(obj2.arg1);
	 * //CellWeb1.StartFormulaEdit(CellWeb1.GetCurrentCol,CellWeb1.GetCurrentRow) ;
	 * CellWeb1.SetFormula (CellWeb1.GetCurrentCol,CellWeb1.GetCurrentRow,
	 * CellWeb1.GetCurSheet,obj2.arg1) ;
	 * //CellWeb1.EndFormulaEdit(CellWeb1.GetCurrentCol,CellWeb1.GetCurrentRow,true) ; }
	 */

	// 输入公式
	ReportJs.Functions.userDefinedFuncGuide = function(name) {
		var obj1 = new Object();
		switch (name) {
			case "QC" :
				// var obj1 =openWindow("./FuncGuide/fw1.html",500,400);
				obj1.arg1 = "期初";
				obj1.arg2 = "QC";
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "sQC" :
				// var obj1 =openWindow("./FuncGuide/fw1.html",500,400);
				obj1.arg1 = "数量期初";
				obj1.arg2 = "sQC";
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "wQC" :
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				obj1.arg1 = "外币期初";
				obj1.arg2 = "wQC";
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "QM" :
				obj1.arg1 = "期末";
				obj1.arg2 = "QM";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "sQM" :
				obj1.arg1 = "数量期末";
				obj1.arg2 = "sQM";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;

			case "wQM" :
				obj1.arg1 = "外币期末";
				obj1.arg2 = "wQM";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "FS" :
				obj1.arg1 = "发生";
				obj1.arg2 = "FS";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "sFS" :
				obj1.arg1 = "数量发生";
				obj1.arg2 = "sFS";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "wFS" :
				obj1.arg1 = "外币发生";
				obj1.arg2 = "wFS";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;

			case "DFS" :
				obj1.arg1 = "对方发生";
				obj1.arg2 = "DFS";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "sDFS" :
				obj1.arg1 = "数量对方发生";
				obj1.arg2 = "sDFS";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "wDFS" :
				obj1.arg1 = "外币对方发生";
				obj1.arg2 = "wDFS";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;

			case "LFS" :
				obj1.arg1 = "累计发生";
				obj1.arg2 = "LFS";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "sLFS" :
				obj1.arg1 = "数量累计发生";
				obj1.arg2 = "sLFS";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;

			case "wLFS" :
				obj1.arg1 = "外币累计发生";
				obj1.arg2 = "wLFS";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;

			case "TFS" :
				obj1.arg1 = "条件发生";
				obj1.arg2 = "TFS";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "sTFS" :
				obj1.arg1 = "数量条件发生";
				obj1.arg2 = "sTFS";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "wTFS" :
				obj1.arg1 = "外币条件发生";
				obj1.arg2 = "wTFS";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "JE" :
				obj1.arg1 = "净额";
				obj1.arg2 = "JE";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "sJE" :
				obj1.arg1 = "数量净额";
				obj1.arg2 = "sJE";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "wJE" :
				obj1.arg1 = "外币净额";
				obj1.arg2 = "wJE";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "HL" :
				obj1.arg1 = "汇率";
				obj1.arg2 = "HL";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			case "XJLL" :
				obj1.arg1 = "现金流量";
				obj1.arg2 = "XJLL";
				// var obj1
				// =ReportJs.Util.openWindow("./FuncGuide/fw1.html",500,400);
				var obj2 = ReportJs.Util.openWindow("./FuncGuide/fw2.html",
						350, 400, obj1);
				return obj2.arg1;
				break;
			default :
				//alert("暂时没有该函数的向导。");
			    jAlert("暂时没有该函数的向导。");
		}
	}

	// 打开本地文件时 打开对话框 @孙敬行
	ReportJs.Base.listReport_open = function() {
		var obj1 = ReportJs.Util.openWindow("listReport.html", 400, 430);
		if (obj1.arg1 != "") {
			ReportJs.Util.createCllFileOnServer(obj1.arg1,0);
			ReportJs.setFileNameOut(obj1.arg1);
			ReportJs.setFileName(obj1.arg2);
			// 如果打开时数据页签处于点亮状态
			if (CellWeb1.GetSheetLabel(CellWeb1.GetCurSheet()) == '数据') {
				ReportJs.Base.CellWeb1_SheetChanged(0, 1);
			}

		}
		CellWeb1.SetModified(0);
	}

	ReportJs.Base.listReport = function() {
		// var obj1 = ReportJs.Util.openWindow("listReport.html", 400, 430);
		// if (obj1.arg1 != "") {
		// ReportJs.Util.createCllFileOnServer(obj1.arg1);
		// ReportJs.setFileNameOut(obj1.arg1);
		// ReportJs.setFileName(obj1.arg2);
		// //如果打开时数据页签处于点亮状态
		// if(CellWeb1.GetSheetLabel(CellWeb1.GetCurSheet())=='数据'){
		// ReportJs.Base.CellWeb1_SheetChanged(0,1);
		// }
		// CellWeb1.SetModified(0);
		// }
		//
		// }

		// 孙敬行 2013-8-27
		// 打开本地文件时是否保存
		if (CellWeb1.IsModified()) { // '文档已经被更改
			jConfirm("文档已被更改，是否保存？", "确认信息", function(flag) {
						if (flag == true) {
							ReportJs.Base.mnuFileSave_click();
							ReportJs.Base.listReport_open();
						} else {
							ReportJs.Base.listReport_open();
						}

					});

		} else {
			ReportJs.Base.listReport_open();
		}

	}

	// 保存
	ReportJs.Base.mnuFileSave_click = function() {
		ReportJs.setSaveFlag("1");//正在保存标志
		if(CellWeb1.GetCurSheet()== 0){
			CellWeb1.SetCurSheet(1);
		}
		
		var filename = ReportJs.getFileName();// 文件名称 中文描述
		var filename_temp = filename; // 编码前
		var filenameout = ReportJs.getFileNameOut();// 文件外部名称，生成cll文件时的账套ID+当前时间组成
		if (filenameout == "" || typeof(filenameout) == "undefined") {
			filename = "";
			var obj = ReportJs.Util.openWindow("prompt.html", 200, 200);
			filename = obj.arg1;
			if (filename == "" || filename == null) {
				//alert("请输入文件名称");
				//jAlert("请输入文件名称");
				return;
			}
			filenameout = ReportJs.Util.getFileNameOut();// 新建文件 保存 生成
															// 唯一名称（当前登录账套ID+服务器时间）
		}
		filename_temp = encodeURI(encodeURI(filename));// 文件名称可能为中文 编码处理
		var url = ReportJs.Score.getUrl();
		var result = CellWeb1.UploadFile(url
				+ "/reportManageAction!saveReportOnLine.action?filename="
				+ filename_temp + "&filenameout=" + filenameout);

		if (filenameout != "") {
			ReportJs.setFileNameOut(filenameout);
			ReportJs.setFileName(filename);
		}
		/*
		 * 测试环境 if (result == 1) { var score = getScore(); saveScore(score); }
		 */

		// 生产环境 判分---
		ReportJs.Score.saveResult(ReportJs.Score.getResult(filename));
		ReportJs.setSaveFlag("0");//取消正在保存标志
	}

	ReportJs.Score.getUrl = function() {
		var href;
		var start;
		var end1;
		href = window.location.href;
		href = unescape(href);
		start = 0;
		end1 = href.lastIndexOf("/");
		href = href.substr(start, end1);
	}

	// 获取标准答案
	ReportJs.Score.getAnswers = function(reportname) {
		var answerList;
		$.ajaxSetup({ // 使用同步
			async : false
		});
		$.post("studentLogin!queryReportAnswers.action", {
					'reportname' : reportname
				},

				function(data) {
					answerList = data.answerList;
				});
		$.ajaxSetup({ // 恢复异步
			async : true
		});
		return answerList;
	}
	// 判题 只判断对错
	ReportJs.Score.getResult = function(reportname) {
		var resultList = new Array();
		// var list = ReportJs.Score.getAnswers("货币资金表");
		var list = ReportJs.Score.getAnswers(reportname);
		if(list.length==0){
			//alert("没有获取到报表判分标准答案！");
			return 0;
		}
		for (var i = 0; i < list.length; i++) {
			var answer = list[i];
			var result = {};
			result.fscoreid = answer.scoreid;
			result.answernum = answer.answernum;
			result.istrue = ReportJs.Score.isRight(answer.sexpression,
					answer.param, answer.trueanswer);
			resultList[i] = result;

		}

		return resultList;
	}

	var parseParam = function(param, key) {
		var paramStr = "";
		if (param instanceof String || param instanceof Number
				|| param instanceof Boolean) {
			paramStr += "&" + key + "=" + encodeURIComponent(param);
		} else {
			$.each(param, function(i) {
						var k = key == null ? i : key
								+ (param instanceof Array ? "[" + i + "]" : "."
										+ i);
						paramStr += '&' + parseParam(this, k);
					});
		}
		return paramStr.substr(1);
	};

	ReportJs.Score.saveResult = function(resultList) {

		if(resultList==0){
			return;
		}
		// 孙敬行 2013-8-27
		// 保存时 报表打开保存同步弹对话框
		$.ajax({
					url : "studentLogin!updateReportAnswerResult.action?"
							+ parseParam(resultList, "resultList"),
					type : 'post',
					async : false,
					dataType : "json",
					success : function(data) {
						jAlert("保存成功!");
						//alert("保存成功！");
					}
				});

		/*
		 * $.post("studentLogin!updateReportAnswerResult.action?" +
		 * parseParam(resultList, "resultList"), function(data) {
		 * alert("保存成功！");
		 * 
		 * });
		 */
	}
	// 计算对错
	ReportJs.Score.isRight = function(sexpression, param, trueanswer) {
		var CurSheet = 1;// 判分页签

		switch (ReportJs.Util.trim(sexpression)) {
			case "IsExistsFile" :
				/*
				 * alert("IsExistsFile" + "\n" + trueanswer + "\n" +
				 * IsExistsFile(param, CurSheet));
				 */
				if (trueanswer == ReportJs.Score.IsExistsFile(param, CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;
			case "GetReportName" :
				/*
				 * alert("GetReportName" + "\n" + trueanswer + "\n" +
				 * GetReportName(param.split(",")[0], param.split(",")[1],
				 * CurSheet));
				 */
				if (trueanswer == ReportJs.Score.GetReportName(
						param.split(",")[0], param.split(",")[1], CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;
			case "GetMaxRow" :
				/*
				 * alert("GetMaxRow" + "\n" + trueanswer + "\n" +
				 * GetMaxRow(CurSheet));
				 */
				if (trueanswer == ReportJs.Score.GetMaxRow(CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;
			case "GetMaxCol" :

				/*
				 * alert("GetMaxCol" + "\n" + trueanswer + "\n" +
				 * GetMaxCol(CurSheet));
				 */

				if (trueanswer == ReportJs.Score.GetMaxCol(CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;
			case "GetCombineCell" :
				/*
				 * alert("GetCombineCell" + "\n" + trueanswer + "\n" +
				 * GetCombineCell(param.split(",")[0],
				 * param.split(",")[1],param.split(",")[2],
				 * param.split(",")[3],CurSheet));
				 */
				if (trueanswer == ReportJs.Score.GetCombineCell(param
								.split(",")[0], param.split(",")[1], param
								.split(",")[2], param.split(",")[3], CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;

			case "GetCellFontName" :
				
				if (trueanswer == ReportJs.Score.GetCellFontName(param,
						CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;
			case "GetCellFontSize" :
				
				if (trueanswer == ReportJs.Score.GetCellFontSize(param
								.split(",")[0], param.split(",")[1], CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;
			case "GetCellFontStyle" :
				
				if (trueanswer == ReportJs.Score.GetCellFontStyle(param,
						CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;
			case "GetFontStyle" :
				
				if (trueanswer == ReportJs.Score.GetFontStyle(param, CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;
			case "GetCellAlign" :
				
				if (trueanswer == ReportJs.Score.GetCellAlign(
						param.split(",")[0], param.split(",")[1], CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;
			case "GetRowHeight" :
				
				if (trueanswer == ReportJs.Score.GetRowHeight(0, param,
						CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;
			case "GetColWidth" :
				
				if (trueanswer == ReportJs.Score
						.GetColWidth(0, param, CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;
			case "GetCellBorder" :
				
				if (trueanswer == ReportJs.Score.hasCellBorder(
						param.split(",")[0], param.split(",")[1], CurSheet)
						&& trueanswer == ReportJs.Score.hasCellBorder(param
										.split(",")[2], param.split(",")[3],
								CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;

			case "GetCellCompare" :
				
				if (trueanswer == ReportJs.Score.GetCellCompare(param
								.split(",")[0], param.split(",")[1], param
								.split(",")[2], param.split(",")[3], CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;
			case "GetCellFormula" :
				if (trueanswer == ReportJs.Score.GetCellFormula(param
								.split(",")[0], param.split(",")[1], CurSheet,
						param.split(",")[2], param.split(",")[3])) {
					return 1;
				} else {
					return 0;
				}
				break;
			case "GetCellData" :
				if (trueanswer == ReportJs.Score.GetCellData(
						param.split(",")[0], param.split(",")[1], CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;
			case "GetCellKeyWord" :
				
				if (trueanswer == ReportJs.Score.GetCellKeyWord(param
								.split(",")[0], param.split(",")[1], param
								.split(",")[2], CurSheet)) {
					return 1;
				} else {
					return 0;
				}
				break;
			default :
				return 1;
		}
	}

	// 获取关键字 年
	ReportJs.Score.GetCellKeyWord = function(col, row, key, sheet) {
		var str = CellWeb1.GetCellString2(col, row, sheet);
		str = str.toLowerCase();
		if (str.indexOf(key.toLowerCase()) != -1) {
			return "TRUE";
		} else {
			return "FALSE";
		}
	}

	// 获得单元格内容
	ReportJs.Score.GetCellData = function(col, row, sheet) {
		return CellWeb1.GetCellString2(col, row, sheet);
	}

	/**
	 * 判断 单元格公式是否正确， 只判断公式名称和科目值
	 * 
	 * @param {}
	 *            col
	 * @param {}
	 *            row
	 * @param {}
	 *            sheet
	 * @param {}
	 *            formulaName 公式名称
	 * @param {}
	 *            code 科目编码
	 * @return {Boolean}
	 */
	ReportJs.Score.GetCellFormula = function(col, row, sheet, formulaName, code) {
		var str = ReportJs.Score.GetFormula(col, row, sheet);
		str = str.toLowerCase();
		if (str.indexOf(formulaName.toLowerCase()) != -1
				&& str.indexOf(code) != -1) {
			return "TRUE";
		} else {

			return "FALSE";
		}
	}

	// 计算得分
	ReportJs.Score.getScore = function() {

		var score = 0;
		var str = "";
		var str = CellWeb1.GetCellString2(1, 1, CellWeb1.GetCurSheet);
		if (str == "应收账款明细表") {
			score = score + 3;
		}
		str = "";
		str = CellWeb1.GetCellString2(2, 2, CellWeb1.GetCurSheet);
		if (ReportJs.Util.trimAll(str) == "2012年") {
			score = score + 1;
		}
		str = "";
		str = CellWeb1.GetCellString2(3, 2, CellWeb1.GetCurSheet);
		if (ReportJs.Util.trimAll(str) == "1月") {
			score = score + 1;
		}
		str = "";
		str = CellWeb1.GetFormula(2, 4, CellWeb1.GetCurSheet);
		if (str.indexOf("QC") != -1 && str.indexOf("1122") != -1) {
			score = score + 1.5;
		}
		str = "";
		str = CellWeb1.GetFormula(2, 5, CellWeb1.GetCurSheet);
		if (str.indexOf("QC") != -1 && str.indexOf("1122") != -1) {
			score = score + 1;
		}
		str = "";
		str = CellWeb1.GetFormula(3, 4, CellWeb1.GetCurSheet);
		if (str.indexOf("FS") != -1 && str.indexOf("1122") != -1
				&& str.indexOf("借") != -1) {
			score = score + 1;
		}
		str = "";
		str = CellWeb1.GetFormula(3, 5, CellWeb1.GetCurSheet);
		if (str.indexOf("FS") != -1 && str.indexOf("1122") != -1
				&& str.indexOf("借") != -1) {
			score = score + 1.5;
		}
		str = "";
		str = CellWeb1.GetFormula(4, 4, CellWeb1.GetCurSheet);
		if (str.indexOf("FS") != -1 && str.indexOf("1022") != -1
				&& str.indexOf("贷") != -1) {
			score = score + 1.5;
		}
		str = "";
		str = CellWeb1.GetFormula(4, 5, CellWeb1.GetCurSheet);
		if (str.indexOf("FS") != -1 && str.indexOf("1022") != -1
				&& str.indexOf("贷") != -1) {
			score = score + 1;
		}
		str = "";
		str = CellWeb1.GetFormula(5, 4, CellWeb1.GetCurSheet);
		if (str.indexOf("QM") != -1 && str.indexOf("1022") != -1) {
			score = score + 1;
		}
		str = "";
		str = CellWeb1.GetFormula(5, 5, CellWeb1.GetCurSheet);
		if (str.indexOf("QM") != -1 && str.indexOf("1022") != -1) {
			score = score + 1.5;
		}

		return score;
	}

	// 保存得分
	ReportJs.Score.saveScore = function(score) {
		$.post("studentLogin!saveReportScores", {
					'reportScore' : score
				},

				function(data) {
					if (data.mark == "1") {
						// 保存成功
						return true;
					} else {
						// 保存失败
						jAlert("保存得分失败");
						return false;
					}

				});
	}
	/**
	 * 显示函数向导帮助
	 */
	ReportJs.Score.showReportHelp = function() {
		if (getCookie("isNotShowHelp") != "1") {
			openWindow("help.html", 400, 350);
		}

	}

	ReportJs.Score.window_close = function() {
		// window.parent.parent.close();
	}

	// ------------------报表判分函数---------begin--------
	/**
	 * sheet 参数大多数情况下是 CellWeb1.GetCurSheet
	 * 
	 */

	// 报表是否存在
	ReportJs.Score.IsExistsFile = function() {
		return "TRUE";
	}
	// 报表名称
	ReportJs.Score.getReportName = function(col, row, sheet) {
		return GetCellData(col, row, sheet);
	}

	// 报表最大行数
	ReportJs.Score.GetMaxRow = function(sheet) {
		return CellWeb1.GetRows(sheet) - 1;
	}
	// 报表最大列数
	ReportJs.Score.GetMaxCol = function(sheet) {
		return CellWeb1.GetCols(sheet) - 1;
	}

	/**
	 * 判断 单元格区域 是否合并
	 * 
	 * @param {}
	 *            startCol
	 * @param {}
	 *            startRow
	 * @param {}
	 *            endCol
	 * @param {}
	 *            endRow
	 * @return {Boolean}
	 */
	ReportJs.Score.GetCombineCell = function(startCol, startRow, endCol,
			endRow, sheet) {
		if (startCol == null || startRow == null || endCol == null
				|| endRow == null) {
			return "FALSE";
		}
		// 获得表格中一个选择区域的起始行列号和结束行列号。
		// 如果返回值是 0，说明 col, row, sheet
		// 所在的单元格不是一个合并的单元格；如果返回值是其他值，则为合并单元格区域的起始行列或者结束行列，依靠参数 tagside
		// 的值，详细信息参考参数说明。
		// tagside 取值
		// 0 返回合并单元格区域的起始列号
		// 1 返回合并单元格区域的起始行号
		// 2 返回合并单元格区域的结束列号
		// 3 返回合并单元格区域的结束行号
		var flag1 = CellWeb1.GetMergeRangeJ(startCol, startRow, sheet, 0);
		var flag2 = CellWeb1.GetMergeRangeJ(startCol, startRow, sheet, 1);
		var flag3 = CellWeb1.GetMergeRangeJ(startCol, startRow, sheet, 2);
		var flag4 = CellWeb1.GetMergeRangeJ(startCol, startRow, sheet, 3);
		if (flag1 == startCol && flag2 == startRow && flag3 == endCol
				&& flag4 == endRow) {
			return "TRUE";
		} else {
			return "FALSE";
		}

	}

	// 获得单元格字体名称
	ReportJs.Score.GetCellFontName = function(col, row, sheet) {
		var index = CellWeb1.GetCellFont(col, row, sheet);// 得到字体索引号
		var fontname = CellWeb1.GetFontName(index);// 转换为字体名称
		return fontname;
	}
	// 获得单元格字体大小
	ReportJs.Score.GetCellFontSize = function(col, row, sheet) {
		if (CellWeb1.GetCellFontSize(col, row, sheet) == 0) {
			return 10;
		}
		return CellWeb1.GetCellFontSize(col, row, sheet);
	}

	/**
	 * 返回单元格字体的风格，可以为下面任意值的组合。 para 字体风格 0 缺省值 BIT1(即：2) 粗体 BIT2(即：4) 斜体
	 * BIT3(即：8) 下划线 BIT4(即：16) 删除线
	 * 
	 * @param {}
	 *            col
	 * @param {}
	 *            row
	 * @param {}
	 *            sheet
	 */
	ReportJs.Score.GetCellFontStyle = function(col, row, sheet) {

		var style = "";
		switch (CellWeb1.GetCellFontStyle(col, row, sheet)) {
			case 0 :
				style = "缺省值";
				break;
			case 2 : // --------
				style = "粗体";
				break;
			case 4 : // -------
				style = "斜体";
				break;
			case 6 :
				style = "粗体斜体";
				break;
			case 8 : // --------
				style = "下划线";
				break;
			case 10 :
				style = "粗体下划线";
				break;
			case 12 :
				style = "斜体下划线";
				break;
			case 16 : // --------
				style = "删除线";
				break;
			case 18 :
				style = "粗体删除线";
				break;
			case 20 :
				style = "斜体删除线";
				break;
			case 24 :
				style = "下划线删除线";
				break;
			default :
		}
		return style;
	}

	/**
	 * 获得字体样式串: 字体名称,字体大小,字体风格
	 * 
	 * @param {}
	 *            col
	 * @param {}
	 *            row
	 * @param {}
	 *            sheet
	 * @return {}
	 */
	ReportJs.Score.GetFontStyle = function(col, row, sheet) {
		var fontName = GetCellFontName(col, row, sheet);
		var fontSize = GetCellFontSize(col, row, sheet);
		var fontStyle = GetCellFontStyle(col, row, sheet);
		return fontName + "," + fontSize + "," + fontStyle;
	}

	// 获得单元格对齐方式
	/**
	 * 返回值 1 为左对齐； 2 为右对齐； 4 为水平居中； 8 为居上对齐； 16 为居下对齐； 32 为垂直居中。
	 * 各种对齐方式的数值可以累加，即：32＋4为水平居中加垂直居中。
	 * 
	 * @param {}
	 *            col
	 * @param {}
	 *            row
	 * @param {}
	 *            sheet
	 * @return {}
	 */
	ReportJs.Score.GetCellAlign = function(col, row, sheet) {
		var align = "";

		switch (CellWeb1.GetCellAlign(col, row, sheet)) {
			case 0 :
				align = "左对齐";
				break;
			case 1 :
				align = "左对齐";
				break;
			case 2 :
				align = "右对齐";
				break;
			case 4 :
				align = "水平居中";
				break;

			case 8 :
				align = "居上对齐";
				break;
			case 16 :
				align = "居下对齐";
				break;
			case 32 :
				align = "垂直居中";
				break;
			// -----------------------------------------------------

			case 9 :
				align = "左对齐居上对齐";
				break;
			case 17 :
				align = "左对齐居下对齐";
				break;
			case 33 :
				align = "左对齐垂直居中";
				break;
			case 10 :
				align = "右对齐居上对齐";
				break;
			case 18 :
				align = "右对齐居下对齐";
				break;
			case 34 :
				align = "右对齐垂直居中";
				break;
			case 12 :
				align = "水平居中居上对齐";
				break;
			case 20 :
				align = "水平居中居下对齐";
				break;
			case 36 :
				align = "水平居中垂直居中";
				break;
			default :
		}
		return align;
	}

	// 获得指定行行高
	/**
	 * 参数 type 显示单位 0表示逻辑值(1个逻辑单位为1/10mm) 1表示屏幕像素值
	 * 
	 * row 行号 sheet 页号 注释 得到指定行的行高。
	 */

	ReportJs.Score.GetRowHeight = function(type, row, sheet) {
		var height = CellWeb1.GetRowHeight(type, row, sheet);
		return height / 2.5;
	}

	/**
	 * 获得指定列列宽
	 * 
	 * @param {}
	 *            type 显示单位 0表示逻辑值(1个逻辑单位为1/10mm) 1表示屏幕像素值 实验证明 需要除以2.5
	 *            才能和设置的数字一致
	 * @param {}
	 *            row
	 * @param {}
	 *            sheet
	 */
	ReportJs.Score.GetColWidth = function(type, col, sheet) {
		var width = CellWeb1.GetColWidth(type, col, sheet);
		return width / 2.5;
	}

	// 获得单元格网格线类型
	/**
	 * 返回值 = 0 缺省值 1 无线 2 细线3 中线4 粗线 5 划线； 6 点线； 7 点划线； 8 点点划线； 9 粗划线； 10 粗点线；11
	 * 粗点划线； 12 粗点点划线。
	 * 
	 * pos 边框参数 0 左边框线 1 上边框线 2 右边框线 3 下边框线
	 * 
	 * 注释 获得指定单元格的指定边框线的线形。
	 * 
	 * 
	 * @param {}
	 *            col
	 * @param {}
	 *            row
	 * @param {}
	 *            sheet
	 * @param {}
	 *            pos
	 */
	ReportJs.Score.GetCellBorder = function(col, row, sheet, pos) {
		return CellWeb1.GetCellBorder(col, row, sheet, pos);
	}

	/**
	 * 指定单元格是否存在边线 算法：判断4条边线是否都存在边线
	 * 
	 * @param {}
	 *            col
	 * @param {}
	 *            row
	 * @param {}
	 *            sheet
	 * @return {Boolean}
	 */
	ReportJs.Score.hasCellBorder = function(col, row, sheet) {
		if (ReportJs.Score.GetCellBorder(col, row, sheet, 0) != "0"
				&& ReportJs.Score.GetCellBorder(col, row, sheet, 0) != "1"
				&& ReportJs.Score.GetCellBorder(col, row, sheet, 1) != "0"
				&& ReportJs.Score.GetCellBorder(col, row, sheet, 1) != "1"
				&& ReportJs.Score.GetCellBorder(col, row, sheet, 2) != "0"
				&& ReportJs.Score.GetCellBorder(col, row, sheet, 2) != "1"
				&& ReportJs.Score.GetCellBorder(col, row, sheet, 3) != "0"
				&& ReportJs.Score.GetCellBorder(col, row, sheet, 3) != "1") {
			return "TRUE";
		} else {
			return "FALSE";
		}

	}

	// 比较两个单元格值是否相等
	ReportJs.Score.GetCellCompare = function(col1, row1, col2, row2, sheet) {
		var cell1 = CellWeb1.GetCellString2(col1, row1, sheet);
		var cell2 = CellWeb1.GetCellString2(col2, row2, sheet);
		if (cell1 == cell2) {
			return "TRUE";
		} else {
			return "FALSE";
		}
	}

	// 获得单元格公式串
	ReportJs.Score.GetFormula = function(col, row, sheet) {
		return CellWeb1.GetFormula(col, row, sheet);
	}

	// ------------------报表判分函数---------end--------

	ReportJs.CreateNameSpace("ReportJs.Functions");

	/**
	 * @Description 自定义的函数都写到这里---
	 * @author 吕奥林
	 * @Date 2013-2-27
	 * @Company 畅捷通信息技术股份有限公司
	 * @Department 研发中心培教研发部
	 * @Porject Exam
	 */

	// -->
	// 插件加载时调用，将自定义函数注册到报表系统
	// 函数串 格式： 函数分类，函数返回值类别，函数名称，函数参数，函数帮助说明（必须位于BEGIN_HELP，END_HELP之间）
	ReportJs.Functions.setFunctions = function() {
		var funcStr;
		funcStr = "'总账函数' Double QC(String p1, [String p2],[String p3],[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：返回某一会计科目某会计期间的期初余额'
				+ '\r\n'
				+ '\r\n 举例：QC("1001", "1","借","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：QC(〈科目编码〉,[〈会计期间〉],[〈方向〉],[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------

		funcStr = "'总账函数' Double sQC(String p1, [String p2],[String p3],[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：数量期初'
				+ '\r\n'
				+ '\r\n 举例：sQC("1001", "1","借","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：sQC(〈科目编码〉,[〈会计期间〉],[〈方向〉],[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------

		funcStr = "'总账函数' Double wQC(String p1, [String p2],[String p3],[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：外币期初'
				+ '\r\n'
				+ '\r\n 举例：wQC("1001", "1","借","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：wQC(〈科目编码〉,[〈会计期间〉],[〈方向〉],[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double QM(String p1, [String p2],[String p3],[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：返回某一会计科目某会计期间的期末余额'
				+ '\r\n'
				+ '\r\n 举例：QM("1001", "1","借","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：QM(〈科目编码〉,[〈会计期间〉],[〈方向〉],[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double sQM(String p1, [String p2],[String p3],[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：数量期末'
				+ '\r\n'
				+ '\r\n 举例：sQM("1001","1","借","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：sQM(〈科目编码〉,[〈会计期间〉],[〈方向〉],[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double wQM(String p1, [String p2],[String p3],[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：外币期末'
				+ '\r\n'
				+ '\r\n 举例：wQM("1001", "1","借","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：wQM(〈科目编码〉,[〈会计期间〉],[〈方向〉],[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double FS(String p1, String p2,String p3,[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：发生额'
				+ '\r\n'
				+ '\r\n 举例：FS("1001", "1","借","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：FS(〈科目编码〉,〈会计期间〉,〈方向〉,[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double sFS(String p1, String p2,String p3,[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：数量发生额'
				+ '\r\n'
				+ '\r\n 举例：sFS("1001", "1","借","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：sFS(〈科目编码〉,〈会计期间〉,〈方向〉,[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double wFS(String p1, String p2,String p3,[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：外币发生额'
				+ '\r\n'
				+ '\r\n 举例：wFS("1001", "1","借","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：wFS(〈科目编码〉,〈会计期间〉,〈方向〉,[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double LFS(String p1, String p2,String p3,[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：累计发生额'
				+ '\r\n'
				+ '\r\n 举例：LFS("1001", "1","借","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：LFS(〈科目编码〉,〈会计期间〉,〈方向〉,[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double sLFS(String p1, String p2,String p3,[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：数量累计发生额'
				+ '\r\n'
				+ '\r\n 举例：sLFS("1001", "1","借","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：sLFS(〈科目编码〉,〈会计期间〉,〈方向〉,[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double wLFS(String p1, String p2,String p3,[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：外币累计发生额'
				+ '\r\n'
				+ '\r\n 举例：wLFS("1001", "1","借","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：wLFS(〈科目编码〉,[〈会计期间〉],[〈方向〉],[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double TFS(String p1, String p2,String p3,[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11],[String p12],[String p13])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：条件发生额'
				+ '\r\n'
				+ '\r\n 举例：TFS("1001", "1","借","摘要","=","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：TFS(〈科目编码〉,〈会计期间〉,〈方向〉,[<摘要>],[<摘要匹配方式>],[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double sTFS(String p1, String p2,String p3,[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11],[String p12],[String p13])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：数量条件发生额'
				+ '\r\n'
				+ '\r\n 举例：sTFS("1001", "1","借","摘要","=","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：sTFS(〈科目编码〉,〈会计期间〉,〈方向〉,[<摘要>],[<摘要匹配方式>],[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double wTFS(String p1,  String p2,String p3,[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11],[String p12],[String p13])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：外币条件发生额'
				+ '\r\n'
				+ '\r\n 举例：wTFS("1001", "1","借","摘要","=","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：wTFS(〈科目编码〉,〈会计期间〉,〈方向〉,[<摘要>],[<摘要匹配方式>],[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double DFS(String p1, String p2,String p3,String p4,[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11],[String p12],[String p13],[String p14])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：对方科目发生额'
				+ '\r\n'
				+ '\r\n 举例：DFS("1001","1002","1","借","摘要","=","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：DFS(〈科目编码〉,〈对方科目〉,〈会计期间〉,〈方向〉,[<摘要>],[<摘要匹配方式>],[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double sDFS(String p1, String p2,String p3,String p4,[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11],[String p12],[String p13],[String p14])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：对方科目数量发生额'
				+ '\r\n'
				+ '\r\n 举例：sDFS("1001","1002","1","借","摘要","=","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：sDFS(〈科目编码〉,〈对方科目〉,〈会计期间〉,〈方向〉,[<摘要>],[<摘要匹配方式>],[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double wDFS(String p1, String p2,String p3,String p4,[String p5],[String p6],[String p7],[String p8],[String p9],[String p10],[String p11],[String p12],[String p13],[String p14])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：对方科目外币发生额'
				+ '\r\n'
				+ '\r\n 举例：wDFS("1001","1002","1","借","摘要","=","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：wDFS(〈科目编码〉,〈对方科目〉,〈会计期间〉,〈方向〉,[<摘要>],[<摘要匹配方式>],[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double JE(String p1, String p2,[String p3],[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：净额'
				+ '\r\n'
				+ '\r\n 举例：JE("1001", "1","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：JE(〈科目编码〉,〈会计期间〉,[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double sJE(String p1, String p2,[String p3],[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：数量净额'
				+ '\r\n'
				+ '\r\n 举例：sJE("1001", "1","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：sJE(〈科目编码〉,〈会计期间〉,[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double wJE(String p1, String p2,[String p3],[String p4],[String p5],[String p6],[String p7],[String p8],[String p9],[String p10])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：外币净额'
				+ '\r\n'
				+ '\r\n 举例：wJE("1001", "1","001","2013","001",'
				+ '\r\n      "002","2013-1-31","是","否","否") '
				+ '\r\n'
				+ '\r\n 参数含义：wJE(〈科目编码〉,〈会计期间〉,[〈账套号〉],[〈会计年度〉],[〈编码1〉],[〈编码2〉],[〈截止日期〉],[〈是否包含未记账〉],[〈编码1汇总〉],[〈编码2汇总〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double HL(String p1, String p2,String p3,[String p4],[String p5])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：返回某日某币种汇率'
				+ '\r\n'
				+ '\r\n 举例：HL("美圆", "5/29/1998", "fd", "001","1998"); 返回001套账1998年5月29日美圆币当日浮动汇率8.189'
				+ '\r\n 汇率类型:"浮动"、"fd"、"固定"、"gd"、"调整"、"tz" ; 若是“浮动”，则〈期间〉必须为〈日期字符串〉 '
				+ '\r\n 币种: 可以是币名或币符 '
				+ '\r\n'
				+ '\r\n 参数含义：HL(〈币种〉,〈期间〉|〈日期字符串〉,〈汇率类型〉,[〈账套号〉],[〈会计年度〉])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------
		funcStr = "'总账函数' Double XJLL([String p1], [String p2],String p3,String p4,[String p5],[String p6],[String p7],[String p8])"
				+ '\n BEGIN_HELP'
				+ '\r\n 函数用途：返回某一时间段内某一现金流量项目的发生额合计数。'
				+ '\r\n'
				+ '\r\n 举例：XJLL("2013-1-1", "2013-1-31","001","借","101","2013","是","1") :注意：会计期间参数和起始日期参数是不能同时录入的 '
				+ '\r\n'
				+ '\r\n 参数含义：XJLL([<起始日期>]，[<截止日期>]，<项目编码>，<方向>，[<账套号>]，[<会计年度>]，[<是否包含未记账>]，[<会计期间>])'
				+ '\n END_HELP';
		CellWeb1.DefineFunctions(funcStr);

		// ----------------------------------------------------------------------------------------------------------

		// ----------------------------------------------------------------------------------------------------------

	}

	// 取期初余额
	ReportJs.Functions.QC = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11) {
		$.ajaxSetup({ // 使用同步
			async : false
		});
		$.post('reportFunManageAction!getCellValue.action', {
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "QC",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5,
					"fpvo.assP1" : p6,
					"fpvo.assP2" : p7,
					"fpvo.endDate" : p8,
					"fpvo.isInclude" : p9,
					"fpvo.assSort1" : p10,
					"fpvo.assSort2" : p11

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 取数量期初余额
	ReportJs.Functions.sQC = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "sQC",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5,
					"fpvo.assP1" : p6,
					"fpvo.assP2" : p7,
					"fpvo.endDate" : p8,
					"fpvo.isInclude" : p9,
					"fpvo.assSort1" : p10,
					"fpvo.assSort2" : p11

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 取外币期初余额
	ReportJs.Functions.wQC = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "wQC",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5,
					"fpvo.assP1" : p6,
					"fpvo.assP2" : p7,
					"fpvo.endDate" : p8,
					"fpvo.isInclude" : p9,
					"fpvo.assSort1" : p10,
					"fpvo.assSort2" : p11

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 期末
	ReportJs.Functions.QM = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "QM",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5,
					"fpvo.assP1" : p6,
					"fpvo.assP2" : p7,
					"fpvo.endDate" : p8,
					"fpvo.isInclude" : p9,
					"fpvo.assSort1" : p10,
					"fpvo.assSort2" : p11

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 数量期末
	ReportJs.Functions.sQM = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "sQM",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5,
					"fpvo.assP1" : p6,
					"fpvo.assP2" : p7,
					"fpvo.endDate" : p8,
					"fpvo.isInclude" : p9,
					"fpvo.assSort1" : p10,
					"fpvo.assSort2" : p11

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 外币期末
	ReportJs.Functions.wQM = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "wQM",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5,
					"fpvo.assP1" : p6,
					"fpvo.assP2" : p7,
					"fpvo.endDate" : p8,
					"fpvo.isInclude" : p9,
					"fpvo.assSort1" : p10,
					"fpvo.assSort2" : p11

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 发生额
	ReportJs.Functions.FS = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) {
		$.ajaxSetup({ // 使用同步
			async : false
		});
		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "FS",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5,
					"fpvo.assP1" : p6,
					"fpvo.assP2" : p7,
					"fpvo.isInclude" : p8,
					"fpvo.assSort1" : p9,
					"fpvo.assSort2" : p10

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 数量发生额
	ReportJs.Functions.sFS = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "sFS",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5,
					"fpvo.assP1" : p6,
					"fpvo.assP2" : p7,

					"fpvo.isInclude" : p8,
					"fpvo.assSort1" : p9,
					"fpvo.assSort2" : p10

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 外币发生额
	ReportJs.Functions.wFS = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "wFS",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5,
					"fpvo.assP1" : p6,
					"fpvo.assP2" : p7,

					"fpvo.isInclude" : p8,
					"fpvo.assSort1" : p9,
					"fpvo.assSort2" : p10

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 累计发生额
	ReportJs.Functions.LFS = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "LFS",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5,
					"fpvo.assP1" : p6,
					"fpvo.assP2" : p7,
					"fpvo.endDate" : p8,
					"fpvo.isInclude" : p9,
					"fpvo.assSort1" : p10,
					"fpvo.assSort2" : p11

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 数量累计发生额
	ReportJs.Functions.sLFS = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "sLFS",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5,
					"fpvo.assP1" : p6,
					"fpvo.assP2" : p7,
					"fpvo.endDate" : p8,
					"fpvo.isInclude" : p9,
					"fpvo.assSort1" : p10,
					"fpvo.assSort2" : p11

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 外币累计发生额
	ReportJs.Functions.wLFS = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "wLFS",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5,
					"fpvo.assP1" : p6,
					"fpvo.assP2" : p7,
					"fpvo.endDate" : p8,
					"fpvo.isInclude" : p9,
					"fpvo.assSort1" : p10,
					"fpvo.assSort2" : p11

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 条件发生额
	ReportJs.Functions.TFS = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11, p12, p13) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "TFS",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.digest" : p4, // 摘要
					"fpvo.digestMatchType" : p5, // 摘要匹配方式
					"fpvo.account" : p6,
					"fpvo.year" : p7,
					"fpvo.assP1" : p8,
					"fpvo.assP2" : p9,
					"fpvo.endDate" : p10,
					"fpvo.isInclude" : p11,
					"fpvo.assSort1" : p12,
					"fpvo.assSort2" : p13

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 数量条件发生额
	ReportJs.Functions.sTFS = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11, p12, p13) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "sTFS",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.digest" : p4, // 摘要
					"fpvo.digestMatchType" : p5, // 摘要匹配方式
					"fpvo.account" : p6,
					"fpvo.year" : p7,
					"fpvo.assP1" : p8,
					"fpvo.assP2" : p9,
					"fpvo.endDate" : p10,
					"fpvo.isInclude" : p11,
					"fpvo.assSort1" : p12,
					"fpvo.assSort2" : p13

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 外币条件发生额
	ReportJs.Functions.wTFS = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11, p12, p13) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "wTFS",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.digest" : p4, // 摘要
					"fpvo.digestMatchType" : p5, // 摘要匹配方式
					"fpvo.account" : p6,
					"fpvo.year" : p7,
					"fpvo.assP1" : p8,
					"fpvo.assP2" : p9,
					"fpvo.endDate" : p10,
					"fpvo.isInclude" : p11,
					"fpvo.assSort1" : p12,
					"fpvo.assSort2" : p13

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 对方科目发生额
	ReportJs.Functions.DFS = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11, p12, p13, p14) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "DFS",
					"fpvo.kmcode" : p1,
					"fpvo.ccode_equal" : p2,// 对方科目编码
					"fpvo.period" : p3,
					"fpvo.DC" : p4,
					"fpvo.digest" : p5, // 摘要
					"fpvo.digestMatchType" : p6, // 摘要匹配方式
					"fpvo.account" : p7,
					"fpvo.year" : p8,
					"fpvo.assP1" : p9,
					"fpvo.assP2" : p10,
					"fpvo.endDate" : p11,
					"fpvo.isInclude" : p12,
					"fpvo.assSort1" : p13,
					"fpvo.assSort2" : p14

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 数量对方科目发生额
	ReportJs.Functions.sDFS = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11, p12, p13, p14) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "sDFS",
					"fpvo.kmcode" : p1,
					"fpvo.ccode_equal" : p2,// 对方科目编码
					"fpvo.period" : p3,
					"fpvo.DC" : p4,
					"fpvo.digest" : p5, // 摘要
					"fpvo.digestMatchType" : p6, // 摘要匹配方式
					"fpvo.account" : p7,
					"fpvo.year" : p8,
					"fpvo.assP1" : p9,
					"fpvo.assP2" : p10,
					"fpvo.endDate" : p11,
					"fpvo.isInclude" : p12,
					"fpvo.assSort1" : p13,
					"fpvo.assSort2" : p14

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 外币对方科目发生额
	ReportJs.Functions.wDFS = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11, p12, p13, p14) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "wDFS",
					"fpvo.kmcode" : p1,
					"fpvo.ccode_equal" : p2, // 对方科目编码
					"fpvo.period" : p3,
					"fpvo.DC" : p4,
					"fpvo.digest" : p5, // 摘要
					"fpvo.digestMatchType" : p6, // 摘要匹配方式
					"fpvo.account" : p7,
					"fpvo.year" : p8,
					"fpvo.assP1" : p9,
					"fpvo.assP2" : p10,
					"fpvo.endDate" : p11,
					"fpvo.isInclude" : p12,
					"fpvo.assSort1" : p13,
					"fpvo.assSort2" : p14

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 净额
	ReportJs.Functions.JE = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "JE",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.account" : p3,
					"fpvo.year" : p4,
					"fpvo.assP1" : p5,
					"fpvo.assP2" : p6,
					"fpvo.endDate" : p7,
					"fpvo.isInclude" : p8,
					"fpvo.assSort1" : p9,
					"fpvo.assSort2" : p10

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 数量净额
	ReportJs.Functions.sJE = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "sJE",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5,
					"fpvo.assP1" : p6,
					"fpvo.assP2" : p7,
					"fpvo.endDate" : p8,
					"fpvo.isInclude" : p9,
					"fpvo.assSort1" : p10,
					"fpvo.assSort2" : p11

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 外币净额
	ReportJs.Functions.wJE = function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "wJE",
					"fpvo.kmcode" : p1,
					"fpvo.period" : p2,
					"fpvo.DC" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5,
					"fpvo.assP1" : p6,
					"fpvo.assP2" : p7,
					"fpvo.endDate" : p8,
					"fpvo.isInclude" : p9,
					"fpvo.assSort1" : p10,
					"fpvo.assSort2" : p11

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 汇率
	ReportJs.Functions.HL = function(p1, p2, p3, p4, p5) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action',

		{
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "HL",
					"fpvo.cexch_name" : p1,
					"fpvo.period" : p2,
					"fpvo.exch_itype" : p3,
					"fpvo.account" : p4,
					"fpvo.year" : p5

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	// 现金流量
	ReportJs.Functions.XJLL = function(p1, p2, p3, p4, p5, p6, p7, p8) {
		$.ajaxSetup({ // 使用同步
			async : false
		});

		$.post('reportFunManageAction!getCellValue.action', {
					"fpvo.fileNameOut" : filenameout,
					"fpvo.funName" : "XJLL",
					"fpvo.dbill_date_begin" : p1,
					"fpvo.dbill_date_end" : p2,
					"fpvo.cashItem" : p3,
					"fpvo.DC" : p4,
					"fpvo.account" : p5,
					"fpvo.year" : p6,
					"fpvo.isInclude" : p7,
					"fpvo.period" : p8

				}, function(r) {
					if (r.status) {
						result = r.result;
						return r.result;
					} else {
						//alert("取数失败！");
						return 0;
					}
				}, "json");
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}

	ReportJs.CreateNameSpace("ReportJs.Util");

	// 禁用控件 传入 控件ID
	ReportJs.Util.disable_true = function(id, color) {
		$("#" + id).attr("disabled", "disabled");
		if (typeof(color) == "undefined") {
			$("#" + id).css("background-color", "#808080");
		} else {
			$("#" + id).css("background-color", color);
		}
	}
	// 启用 控件
	ReportJs.Util.disable_false = function(id) {
		$("#" + id).attr("disabled", false);
		$("#" + id).css("background-color", "");
	}

	/**
	 * 添加一个cookie
	 * 
	 * @param {}
	 *            name
	 * @param {}
	 *            value
	 * @param {}
	 *            expiresHours
	 */
	ReportJs.Util.addCookie = function(name, value, expiresHours) {
		var cookieString = name + "=" + escape(value);
		// 判断是否设置过期时间
		if (expiresHours > 0) {
			var date = new Date();
			date.setTime(date.getTime() + expiresHours * 3600 * 1000);
			cookieString = cookieString + "; expires=" + date.toGMTString();
			// cookieString=cookieString
		}
		document.cookie = cookieString;
	}
	/**
	 * 获取指定名称的cookie值
	 * 
	 * @param {}
	 *            name
	 * @return {String}
	 */
	ReportJs.Util.getCookie = function(name) {
		var strCookie = document.cookie;
		var arrCookie = strCookie.split("; ");
		for (var i = 0; i < arrCookie.length; i++) {
			var arr = arrCookie[i].split("=");
			if (arr[0] == name)
				return arr[1];
		}
		return "";
	}
	/**
	 * 删除指定名称的cookie
	 * 
	 * @param {}
	 *            name
	 */
	ReportJs.Util.deleteCookie = function(name) {
		var date = new Date();
		date.setTime(date.getTime() - 10000);
		document.cookie = name + "=v; expires=" + date.toGMTString();
	}

	/**
	 * @author 吕奥林
	 * @param {}
	 *            htmlFile
	 * @param {}
	 *            dialogWidth
	 * @param {}
	 *            dialogHeight
	 * @return {}
	 */

	// 在服务器特定目录下生成CLL文件（如果不存在）
	ReportJs.Util.createCllFileOnServer = function(remotefilenameout,flag) {
		$.ajaxSetup({ // 使用同步
			async : false
		});
		$.post("reportManageAction!createCllFile", {
					"filenameout" : remotefilenameout,
					"flag":flag
				}, function(data) {
					if (!data.status) {
						// return;
					}
					if (data.remote_url != "") {
						CellWeb1.OpenFile(data.remote_url, "");
					}
                    //alert(data.remote_url);
				});
		$.ajaxSetup({ // 恢复异步
			async : true
		});
	}
	// 保存成功后 回写一下 fileoutname
	ReportJs.Util.setFileOutName = function(filename) {

		ReportJs.setFileNameOut(data.accid + filename + ".cll");
		/*
		 * $.post("reportManageAction!getLoginAccid",function(data){ //打开远程CLL文件
		 * if(data.accid!=""){
		 * ReportJs.setFileNameOut(data.accid+filename+".cll");
		 * //alert(ReportJs.getFileNameOut()); }
		 * 
		 * });
		 */
	}

	// 获取账套ID
	ReportJs.Util.getAccid = function() {
		$.post("reportManageAction!getLoginAccid", function(data) {
					// 打开远程CLL文件
					if (data.accid != "") {
						return data.accid;
					} else {
						alter("会话已过期，需要重新登陆。");
					}

				});
	}

	// 获取 后台自动生成的文件名称
	ReportJs.Util.getFileNameOut = function() {
		var temp = "";
		$.ajaxSetup({ // 使用同步
			async : false
		});
		$.post("reportManageAction!getFileNameOut", function(data) {
					if (data.uniqueFileName != "") {
						temp = data.uniqueFileName + ".cll";
					} else {
						alter("会话已过期，需要重新登陆。");
					}

				});

		$.ajaxSetup({ // 恢复异步
			async : true
		});
		return temp;
	}

	// 打开窗口通用方法
	ReportJs.Util.openWindow = function(htmlFile, dialogWidth, dialogHeight,
			params) {
		var obj = new Object();
		obj.arg0 = params; // 传入 参数
		obj.arg1 = "";
		obj.arg2 = "";
		obj.arg3 = "";
		obj.arg4 = "";
		obj.arg5 = "";
		var left = (window.screen.width - dialogWidth) / 2;
		var top = (window.screen.height - dialogHeight) / 2 + 100;
		var returnValue = window.showModalDialog(htmlFile, obj, "dialogTop:"
						+ top + ";dialogLeft:" + left + ";dialogHeight:"
						+ dialogHeight + "px;dialogWidth:" + dialogWidth
						+ "px;center:no;status:yes;resizable:yes;scroll:yes;");
		return obj;
	}

	// 获取url中的参数
	ReportJs.Util.GetArgsFromHref = function(sHref, sArgName) {
		var retval = "";
		var args = sHref.split("?");

		if (args[0] == sHref) /* 参数为空 */
		{
			return retval; /* 无需做任何处理 */
		}
		var str = args[1];
		args = str.split("&");
		for (var i = 0; i < args.length; i++) {
			str = args[i];
			var arg = str.split("=");
			if (arg.length <= 1)
				continue;
			if (arg[0] == sArgName)
				retval = arg[1];
		}

		return retval;
	}

	ReportJs.Util.trimAll = function(str) { // 删除所有位置的空格
		return str.replace(/\s/g, "");
	}
	ReportJs.Util.trim = function(str) { // 删除左右两端的空格
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	ReportJs.Util.ltrim = function(str) { // 删除左边的空格
		return str.replace(/(^\s*)/g, "");
	}
	ReportJs.Util.rtrim = function(str) { // 删除右边的空格
		return str.replace(/(\s*$)/g, "");
	}

})();