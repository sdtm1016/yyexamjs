/**
 * 
 * @DESCRIBE 公式界面js
 * @AUTHOR 王丙建
 * @DATE 2012-11-16
 * @COMPANY 畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT EXAM
 * 
 */

/**
 * 查询科目辅助核算信息
 * 
 * @param iyear
 *            年份
 * @param iperiod
 *            会计期间
 * @param itype
 *            类型
 */

function queryCodeAddInfo() {
	var accid = "1";
	var year = "2010";
	var ccode = "1001";
	$.ajax({
				url : "code!queryCodeAddInfo.action?year=" + year + "&accid="
						+ accid + "&ccode=" + ccode,
				type : "post",
				datatype : "json",
				success : function(data, status) {
					var codeAddInfoList = data.codeAddInfoList;
					initCodeAddInfo(codeAddInfoList);
				}
			});
}

/**
 * 初始化科目辅助信息
 * 
 * @param codeAddInfoList
 */
function initCodeAddInfo(codeAddInfoList) {
	var addInfoList = codeAddInfoList[0];
	// 得到客户、供应商、部门、个人、项目标志
	var cusBz = addInfoList[2];
	var supBz = addInfoList[3];
	var deptBz = addInfoList[4];
	var personBz = addInfoList[5];
	var itemBz = addInfoList[6];
	$("#cusid").attr({
				"readonly" : true
			});
	$("#cusbtn").attr('disabled', true);

	$("#supid").attr({
				"readonly" : true
			});
	$("#supbtn").attr('disabled', true);

	$("#deptid").attr({
				"readonly" : true
			});
	$("#deptbtn").attr('disabled', true);

	$("#personid").attr({
				"readonly" : true
			});
	$("#personbtn").attr('disabled', true);

	$("#itemid").attr({
				"readonly" : true
			});
	$("#itembtn").attr('disabled', true);

	if (cusBz == "1") {
		$("#cusid").removeAttr("readonly");
		$("#cusbtn").attr('disabled', false);

	}
	if (supBz == "1") {
		$("#supid").removeAttr("readonly");
		$("#supbtn").attr('disabled', false);
	}

	if (deptBz == "1") {
		$("#deptid").removeAttr("readonly");
		$("#deptbtn").attr('disabled', false);

	}
	if (personBz == "1") {
		$("#personid").removeAttr("readonly");
		$("#personbtn").attr('disabled', false);

	}
	if (itemBz == "1") {
		$("#itemid").removeAttr("readonly");
		$("#itembtn").attr('disabled', false);

	}
}

/**
 * 得到函数字符串
 */
function getFuncString() {
	var strFunction = "";
	var code01 = "";// 辅助核算项 编码1
	var code02 = "";// 辅助核算项 编码2
	var i = 0;
	// var pos = $("#funcName").val().indexOf("(");
	// 函数名称
	// var funcName = $("#funcName").val().substr(0,pos) ;

	var funcName = $("#funcName").val();
		funcName=funcName.toUpperCase();
	// jAlert(funcName);
	// 会计年度
	var selyear = $("#selyear").val();
	if (selyear != "") {
		selyear = "\"" + selyear + "\"";
	}
	// 科目编码
	var codeid = $("#codeid").val();
	if (codeid != "") {
		codeid = "\"" + codeid + "\"";
	}
	
	//对方科目编码
	var dfcodeid = $("#dfcodeid").val();
	if (dfcodeid != "") {
		dfcodeid = "\"" + dfcodeid + "\"";
	}
	
	//摘要
	var digest = $("#digest").val();
	if (digest != "") {
		digest = "\"" + digest + "\"";
	}
	
	//摘要匹配方式
	var ppfs = $("#ppfs").val();
	if (ppfs != "") {
		ppfs = "\"" + ppfs + "\"";
	}
	
	// 币种
	var bz = $("#bz").val();
	if (bz != "") {
		bz = "\"" + bz + "\"";
	}
	
	// 汇率类型
	var hllx = $("#hllx").val();
	if (hllx != "") {
		hllx = "\"" + hllx + "\"";
	}
	
	//jAlert(codeid);
	// 会计期间
	var selperiod = $("#selperiod").val();
	if (selperiod != "") {
		selperiod = "\"" + selperiod + "\"";
	}
	// 方向
	var selfx = $("#selfx").val();
	if (selfx != "") {
		selfx = "\"" + selfx + "\"";
	}
	
	// 起始日期
	var beginDate = $("#beginDate").val();
	if (beginDate != "") {
		beginDate = "\"" + beginDate + "\"";
	}
	
	// 截止日期
	var endDate = $("#endDate").val();
	if (endDate != "") {
		endDate = "\"" + endDate + "\"";
	}
	
	// 包含未记账凭证
	var isInclude = $("#isInclude").val();
	if (isInclude != "") {
		isInclude = "\"" + isInclude + "\"";
	}
	// 个人
	var personid = $("#personid").val();
	if (personid != "") {
		personid = "\"" + personid + "\"";
	}
	// 客户
	var cusid = $("#cusid").val();
	if (cusid != "") {
		cusid = "\"" + cusid + "\"";
	}
	// 供应商
	var supid = $("#supid").val();
	if (supid != "") {
		supid = "\"" + supid + "\"";
	}
	// 部门
	var deptid = $("#deptid").val();
	if (deptid != "") {
		deptid = "\"" + deptid + "\"";
	}
	// 项目
	var itemid = $("#itemid").val();//项目code
	//var itemid = $("#citemid").val(); //项目id
	
	if (itemid != "") {
		itemid = "\"" + itemid + "\"";
	}

	if ($("#personid").attr("disabled") != "disabled") {
		code01 = personid;
		i = 1;
	}

	if ($("#cusid").attr("disabled") != "disabled") {
		switch (i) {
			case 0 :
				code01 = cusid;
				i = 1;
				break;
			case 1 :
				code02 = cusid;
				i = 2;
				break;
			default :
				jAlert("科目辅助核算项不能超过2个。");
		}
	}

	if ($("#supid").attr("disabled") != "disabled") {
		switch (i) {
			case 0 :
				code01 = supid;
				i = 1;
				break;
			case 1 :
				code02 = supid;
				i = 2;
				break;
			default :
				jAlert("科目辅助核算项不能超过2个。");
		}
	}
	if ($("#deptid").attr("disabled") != "disabled") {
		switch (i) {
			case 0 :
				code01 = deptid;
				i = 1;
				break;
			case 1 :
				code02 = deptid;
				i = 2;
				break;
			default :
				jAlert("科目辅助核算项不能超过2个。");
		}
	}
	if ($("#itemid").attr("disabled") != "disabled") {
		switch (i) {
			case 0 :
				code01 = itemid;
				i = 1;
				break;
			case 1 :
				code02 = itemid;
				i = 2;
				break;
			default :
				jAlert("科目辅助核算项不能超过2个。");
		}
	}

	switch (funcName) {
		case "QC" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "SQC" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "WQC" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "QM" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "SQM" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "WQM" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "FS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "SFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "WFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "DFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}
			
			if (dfcodeid == "") {
				jAlert("对方科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					//对方科目编码
					+ dfcodeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向					
					+ selfx + ","
					// 摘要					
					+ digest + ","
					// 匹配方式					
					+ ppfs + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "SDFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}
			
			if (dfcodeid == "") {
				jAlert("对方科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					//对方科目编码
					+ dfcodeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向					
					+ selfx + ","
					// 摘要					
					+ digest + ","
					// 匹配方式					
					+ ppfs + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "WDFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}
			
			if (dfcodeid == "") {
				jAlert("对方科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					//对方科目编码
					+ dfcodeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向					
					+ selfx + ","
					// 摘要					
					+ digest + ","
					// 匹配方式					
					+ ppfs + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "TFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					
					// 摘要					
					+ digest + ","
					// 匹配方式					
					+ ppfs + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "STFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					
					// 摘要					
					+ digest + ","
					// 匹配方式					
					+ ppfs + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "WTFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					
					// 摘要					
					+ digest + ","
					// 匹配方式					
					+ ppfs + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "LFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "SLFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "WLFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "JE" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "SJE" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;

		case "WJE" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "HL" :
			

			strFunction = funcName + "("
					// 币种
					+ bz + ","
					// 会计期间
					+ selperiod + ","
					
					// 汇率类型
					+ hllx + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ") ";
			break;
		case "XJLL" :
			if(selperiod!="" && (beginDate!="" || endDate!="")){
				jAlert("期间和  起始|截至日期不能同时输入！");
				return;
			}
            if(itemid==""){
            	jAlert("项目编码不能为空！");
            	return;
            }
			strFunction = funcName + "("
					// 起始日期
					+ beginDate + ","
					// 截止日期
					+ endDate + ","
					// 项目编码
					+ itemid + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 是否包含未记账凭证
					+ isInclude + ","
					// 会计期间
					+ selperiod + ")";
			break;
		default :
			jAlert(funcName + "函数暂时不支持。");
	}

	window.dialogArguments.arg1 = strFunction;
	window.close();
	// var param = {};
	// param.funStr = strFunction;
	// window.parent.closeWindow("mr_FuncGuide_fw2");
	// jAlert(strFunction);
	// CellWeb1.SetCellString (CellWeb1.GetCurrentCol,CellWeb1.GetCurrentRow,
	// CellWeb1.GetCurSheet,strFunction) ;
}
