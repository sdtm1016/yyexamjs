

//此文件和   publicFunction.js 的区别是  去掉了  百度统计的代码，因为加了之后老是提示 "该网页包含未知的安全隐患,是否继续"
// 加载Jquery-Alert控件的相关JS及CSS文件
(function() {
	
	var url = window.location.href + "";
	var temp = "";
	var len = (url.split("yyexamjs/")[1]).split("/");
	for ( var i = 0; i < len.length - 1; i++) {
		temp = temp + "../";
	}
	loadCSS(temp + "js/jquery-alert/jquery.alerts.css");
	loadJS(temp + "js/jquery-alert/jquery.alerts.js");
	
	//百度统计  add by lval 20140112
	//var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	//document.write(unescape("%3Cscript src='http://hm.baidu.com/h.js%3Ff050a593bdadb60e94a03213d7f38e69' type='text/javascript'%3E%3C/script%3E"));
})();


/**
 * 
 * @DESCRIBE 公共函数js处理类
 * @AUTHOR 王丙建
 * @DATE 2012-11-22
 * @COMPANY 畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT EXAM
 * 
 */

// 根据名称得到cookie值
function getCookie(searchName) {
	var strRtn = "";
	var cookie_star = document.cookie.indexOf(searchName);
	var cookie_end = document.cookie.indexOf(";", cookie_star);
	if (cookie_end == -1)
		strRtn = document.cookie.substring(cookie_star + searchName.length + 1);
	else
		strRtn = document.cookie.substring(cookie_star + searchName.length + 1,
				cookie_end);
	strRtn = decodeURI(strRtn);
	// alert(document.cookie);
	return strRtn;
}

/**
 * 返回当前登录用户的id
 * 
 * @returns
 */
function getCurLoginUserId() {
	return getCookie("userId");
}
/**
 * 返回帐套启用年份
 * 
 * @returns
 */
function getAccountYear() {
	return getCookie("accountYear");
}

/**
 * 返回帐套启用月份
 * 
 * @returns
 */
function getAccountMonth() {
	return getCookie("accountMonth");
}

/**
 * 字符串null值处理
 */
function strNullProc(str) {
	if (str == null)
		return "";
	if (str == "null")
		return "";
	return str;
}

/**
 * 字符串0显示处理
 * 
 * @param str
 */
function strZeroProc(str) {
	if (str == null)
		return "";
	if (str == "null")
		return "";
	if (str == "0")
		return "";
	return str;
}

/**
 * 字符串0显示处理
 * 
 * @param str
 */
function strZeroProc1(str, value) {
	if (str == null)
		return value;
	if (str == "null")
		return value;
	if (str == "0")
		return value;
	if (str == "")
		return value;
	if (str == " ")
		return value;

	return str;
}

/**
 * 字符串转换为数值
 * 
 * @param str
 */
function DoubleNullPtoc(str) {
	if (str == null)
		return 0.0;
	if (str == "")
		return 0.0;
	if (str == " ")
		return 0.0;

	return parseFloat(str);
}

/**
 * 返回日期字符串
 * 
 * @param dt
 */
function getStrDate(dt) {
	var strDate = "";
	if (dt == null)
		return "";

	strDate = dt.substr(0, 10);
	return strDate;

}
/**
 * 判断某表单内值的字符长度（一个汉字代表两个字符）
 * 
 * @param temp
 *            表单对象
 * @param max
 *            最大字符长度（若不限制最大值，则设置为-1）
 * @param min
 *            最小字符长度（若不限制最小值，则设置为0）
 */
function judgmentnum(temp, max, min) {
	var length = fucCheckLength(temp.value);
	if (length < min) {
		jAlert("长度不可以小于" + min, "提示信息", function() {
			temp.focus();
		});
		return false;
	}
	if (max != -1) {
		if (length > max) {
			jAlert("长度不可以大于" + max, "提示信息", function() {
				temp.focus();
			});
			return false;
		}
	}
	return true;
}

/**
 * 显示逻辑型汉字值
 * 
 * @param value
 */
function showChnLogicValue(value) {
	if (value == 1)
		return "是";
	else if (value == 0)
		return "否";
	else
		return value;

}
/**
 * 判断某表单内的值是否是数字
 * 
 * @param temp
 *            表单对象,
 */
function isnumber(temp) {
	if (temp.value != null && temp.value != "") {
		if ((temp.value - 0) != temp.value) {
			jAlert("内容必须是数字", "提示信息", function() {
				temp.focus();
			});
			return false;
		}
	}
	return true;
}
/**
 * 判断某表单内的值是否符合邮箱格式
 * 
 * @param temp
 *            表单对象,
 */
function isEmail(temp) {
	// var pattern=/^[a-zA-Z\d]+@[a-zA-Z\d]+\.[a-zA-Z\d]+(\.[a-zA-Z\d]+)*$/g;
	if (temp.value != null && temp.value != "") {
		var pattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g;
		if (pattern.test(temp.value)) {
			return true;
		} else {
			jAlert("请输入正确格式的邮箱", "提示信息", function() {
				temp.focus();
			});
			return false;
		}
	} else {
		return true;
	}
}
/**
 * 判断某表单内的值是否包含特殊字符
 * 
 * @param temp
 *            表单对象,
 */
function isSpecialChar(temp) {
	// * & % # @ ￥ ’ “ \ < > ｜ ：// .
	var pattern = /[\&\%\#\@\￥\’\“\<\>\｜\：\/\/\.]/g;
	if (pattern.test(temp.value)) {
		jAlert("存在非法字符", "提示信息", function() {
			temp.focus();
		});
		return false;
	}
	return true;
}
/**
 * 判断某表单内的值是否包含特殊字符
 * 
 * @param temp
 *            表单对象,
 */
function isnull(temp) {
	// * & % # @ ￥ ’ “ \ < > ｜ ：// .
	if (temp.value == null || temp.value == "") {
		jAlert("内容不可以为空", "提示信息", function() {
			temp.focus();
		});
		return false;
	}
	return true;
}
/**
 * 计算字符串内容的字符长度，（中文代表2个字符，）
 * 
 * @param strTemp
 *            要判断的字符串
 * @returns
 */
function fucCheckLength(strTemp) {
	var i, sum;
	sum = 0;
	for (i = 0; i < strTemp.length; i++) {
		if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255)) {
			sum = sum + 1;
		} else {
			sum = sum + 2;
		}
	}
	return sum;
}

/**
 * 返回当前输入框的总长度
 * 
 * @param valueList
 *            级次长度数组
 * @param curGrade
 *            当前级次
 */
function getCurInputLength(valueList, curGrade) {
	var curInputSumLength = 0;
	for ( var i = 0; i <= curGrade * 1; i++) {
		curInputSumLength = curInputSumLength + valueList[i] * 1;
	}
	return curInputSumLength;
}

/**
 * 每个字符串中的字符增加相同的字符
 */
function strAddchar(sourstr, addChar) {
	sourstr = strNullProc(sourstr);
	var textList = sourstr.split("");
	var rtnStr = "";
	for ( var j = 0; j < textList.length; j++) {
		rtnStr = rtnStr + textList[j] + addChar;
	}
	return rtnStr;

}
/*******************************************************************************
 * 格式化时间 使用：new Date().format("yyyy-MM-dd hh:mm:ss");
 * 
 * @param format
 * @returns
 */
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};
/**
 * 格式化数据，给数字加千分符
 * 
 * @param num
 * @returns
 */
function donumswitch(num) {
	if (num != "" && (num - 0) == num) {
		var re = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
		var result = num.replace(re, "$1,");
		return result;
	} else {
		return "";
	}
}

/**
 * 遇到数值的时候，转换成小数点后两位
 */
function transFloat(value) {
	if (value != null && value != "") {
		value = parseFloat(value).toFixed(2);
	} else if (value == null || value == "" || value == undefined
			|| (value - 0) == 0) {
		value = "0.00";
	}
	return value;
}

/*******************************************************************************
 * String 替换所有方法
 * 
 * @param reallyDo
 *            //搜索到的字符
 * @param replaceWith//要替换的字符
 * @param ignoreCase
 * @returns 例子："aaaaaaaaaaa:,:,:,".replaceAll(",","-")将字符串中的","替换成"-";
 */
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
	if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
		return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")),
				replaceWith);
	} else {
		return this.replace(reallyDo, replaceWith);
	}
	;
};

/* 屏蔽快捷键: */function unkey() {
	document.onkeydown = function() {
		var evt = (window.event || event);
		var evtsrc = (evt.srcElement || evt.target);
		if (evt.keyCode == 8) {
			if ((evtsrc.tagName != "INPUT" && evtsrc.tagName != "TEXTAREA")
					|| (evtsrc.tagName == "INPUT" && evtsrc.readOnly == true)) {
				return false;
			}
		}
		
	};
}
unkey();

/**
 * 格式化数字
 * 
 * @param number
 *            要格式的数字
 * @param fractionDigits
 *            保留小数位数
 */
function numberround(number, fractionDigits) {
	with (Math) {
		return round(number * pow(10, fractionDigits))
				/ pow(10, fractionDigits);
	}
}

/**
 * 休眠等待函数
 * 
 * @param numberMillis
 */
function sleep(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}

/**
 * 
 * @param type("code":会计科目；"FaDepartments":固定资产部门；)
 * @param nowinput
 * @param tid
 * @param tvalue
 * @param tname
 * @param tnamevalue
 */
function dofocustoenter(type, nowinput, tid, tvalue, tname, tnamevalue) {
	if (tid != "" && tvalue != "") {
		eval(tid + "='" + tvalue + "';");
	}
	if (tname != "" && tnamevalue != "") {
		eval(tname + "='" + tnamevalue + "';");
	}
	nowinput.onkeyup = function(e) {
		var evt = (window.event || e);// 获得事件
		if (evt.keyCode == "13") {
			conversioncode(type, nowinput);
		}
	};
	nowinput.onblur = function() {
		conversioncode(type, nowinput);
	};
}

function conversioncode(type, nowinput, executeClearBlur) {

	// 加入取出两侧空格的方法
	var c_val = $.trim($(nowinput).val()).split(",")[0];
	if (c_val == "") {
		return;
	}
	// 如果是收发类别设置预置数据(lichunhui)
	if (type == "RdStyle") {
		$.ajax({
			url:"rdStyle!findRdStyle.action",
			type:"post",
			async:false,
			datatype:"json",
			error:function(){
				jAlert("请求失败!");
			},
			success:function(jsonData){
			}
		});
	}
	$.ajax({
		url : "consulteditAction!findbycodeorname",
		type : 'post',
		dataType : "json",
		cache : false,
		async : false,
		data : "tablename=" + type + "&param=" + c_val,
		success : function(data) {
			var d_result = data.result;
			var param = {};
			var t_message = "";
			if (d_result != "") {

				var ress = d_result.split(":");
				if (ress[0] == "0") {
					if (type == "code") {
						param.selKemuCode = ress[2];
						param.selKemuName = ress[3];
					} else if (type == "FaDepartments") {
						// 取得编码
						param.code = ress[2];
						// 取得名称
						param.name = ress[3];
						// 部门对应这就科目
						param.ssubject = ress[4].replaceAll("null", "");
					} else if (type == "FaAssettypes") {
						param.code = ress[2];
						param.name = ress[3];
					} else if (type == "FaOrigins") {
						param.code = ress[2];
						param.name = ress[3];
					} else if (type == "FaStatus") {
						param.code = ress[2];
						param.name = ress[3];
						param.bneeddepr = ress[4];
					} else if (type == "Department") {
						param.id = ress[1];
						param.ccode = ress[2];
						param.cname = ress[3];
					} else if (type == "Person") {
						param.id = ress[1];
						param.ccode = ress[2];
						param.cname = ress[3];
						param.cdepcode = ress[4];
						param.cdepname = ress[5];
					} else if (type == "Customer") {
						param.id = ress[1];
						param.ccode = ress[2];
						param.cname = ress[3];
						param.ccusabbname = ress[4];
					} else if (type == "Vendor") {
						param.id = ress[1];
						param.ccode = ress[2];
						param.cname = ress[3];
						param.cvenabbname = ress[4];
					} else if (type == "CustomerClass" || type == "VendorClass"
							|| type == "DistrictClass"
							|| type == "InventoryClass") {
						param.selId = ress[1];
						param.selCode = ress[2];
						param.selName = ress[3];
					} else if (type == "Settlestyle") {// 结算方式
						param.cId = ress[1];
						param.ccode = ress[2];
						param.cname = ress[3];
					}else if (type == "RdStyle") {// 收发类别
						param.cId = ress[1];
						param.ccode = ress[2];
						param.cname = ress[3];
					}

				} else {
					if (type == "code") {
						param.selKemuCode = "";
						param.selKemuName = "";
						t_message = "录入科目错误！<br>科目不存在或科目非明细级！";
					} else if (type == "FaDepartments") {
						param.code = "";
						param.name = "";
						param.ssubject = "";
						t_message = "此部门名称或编号在部门设置中不存在或非明细级！";
					} else if (type == "FaAssettypes") {
						param.code = "";
						param.name = "";
						t_message = "此类别名称或编号在类别设置中不存在或非明细级！";
					} else if (type == "FaOrigins") {
						param.code = "";
						param.name = "";
						t_message = "此增减方式在增减方式设置中不存在或非明细级！";
					} else if (type == "FaStatus") {
						param.code = "";
						param.name = "";
						param.bneeddepr = "";
						t_message = "此使用状况在使用状况设置中不存在或非明细级！";
					} else if (type == "Department") {
						param.id = "";
						param.ccode = "";
						param.cname = "";
						t_message = "部门非法！";
					} else if (type == "Person") {
						param.id = "";
						param.ccode = "";
						param.cname = "";
						param.cdepcode = "";
						param.cdepname = "";
						t_message = "职员非法！";
					} else if (type == "Customer") {
						param.id = "";
						param.ccode = "";
						param.cname = "";
						param.ccusabbname = "";
						t_message = "客户非法！";
					} else if (type == "Vendor") {
						param.id = "";
						param.ccode = "";
						param.cname = "";
						param.cvenabbname = "";
						t_message = "供应商非法！";
					} else if (type == "CustomerClass") {
						param.selId = "";
						param.selCode = "";
						param.selName = "";
						t_message = "客户分类非法！";
					} else if (type == "VendorClass") {
						param.selId = "";
						param.selCode = "";
						param.selName = "";
						t_message = "供应商分类非法！";
					} else if (type == "DistrictClass") {
						param.selId = "";
						param.selCode = "";
						param.selName = "";
						t_message = "地区分类非法！";
					} else if (type == "InventoryClass") {
						param.selId = "";
						param.selCode = "";
						param.selName = "";
						t_message = "存货分类非法！";
					} else if (type == "Settlestyle") {// 结算方式
						param.cId = "";
						param.ccode = "";
						param.cname = "";
						t_message = "结算方式非法！";
					}else if (type == "RdStyle") {// 收发类别
						param.cId = "";
						param.ccode = "";
						param.cname = "";
						t_message = "收发类别非法！";
					}
				}
			} else {

				if (type == "code") {
					param.selKemuCode = "";
					param.selKemuName = "";
					t_message = "录入科目错误！<br>科目不存在或科目非明细级！";
				} else if (type == "FaDepartments") {
					param.code = "";
					param.name = "";
					param.ssubject = "";
					t_message = "此部门名称或编号在部门设置中不存在或非明细级！";
				} else if (type == "FaAssettypes") {
					param.code = "";
					param.name = "";
					t_message = "此类别名称或编号在类别设置中不存在或非明细级！";
				} else if (type == "FaOrigins") {
					param.code = "";
					param.name = "";
					t_message = "此增减方式在增减方式设置中不存在或非明细级！";
				} else if (type == "FaStatus") {
					param.code = "";
					param.name = "";
					param.bneeddepr = "";
					t_message = "此使用状况在使用状况设置中不存在或非明细级！";
				} else if (type == "Department") {
					param.id = "";
					param.ccode = "";
					param.cname = "";
					t_message = "部门非法！";
				} else if (type == "Person") {
					param.id = "";
					param.ccode = "";
					param.cname = "";
					param.cdepcode = "";
					param.cdepname = "";
					t_message = "职员非法！";
				} else if (type == "Customer") {
					param.id = "";
					param.ccode = "";
					param.cname = "";
					param.ccusabbname = "";
					t_message = "客户非法！";
				} else if (type == "Vendor") {
					param.id = "";
					param.ccode = "";
					param.cname = "";
					param.cvenabbname = "";
					t_message = "供应商非法！";
				} else if (type == "CustomerClass") {
					param.selId = "";
					param.selCode = "";
					param.selName = "";
					t_message = "客户分类非法！";
				} else if (type == "VendorClass") {
					param.selId = "";
					param.selCode = "";
					param.selName = "";
					t_message = "供应商分类非法！";
				} else if (type == "DistrictClass") {
					param.selId = "";
					param.selCode = "";
					param.selName = "";
					t_message = "地区分类非法！";
				} else if (type == "InventoryClass") {
					param.selId = "";
					param.selCode = "";
					param.selName = "";
					t_message = "存货分类非法！";
				} else if (type == "Settlestyle") {// 结算方式
					param.cId = "";
					param.ccode = "";
					param.cname = "";
					t_message = "结算方式非法！";
				}else if (type == "RdStyle") {// 收发类别
					param.cId = "";
					param.ccode = "";
					param.cname = "";
					t_message = "收发类别非法！";
				}
			}
			deliverValue(param);
			if (t_message != "") {
				jAlert(t_message, "提示信息", function() {
					$(nowinput).val("").focus();
				});
			} else {
				if (executeClearBlur == undefined || executeClearBlur == true) {
					nowinput.onblur = function() {

					};
				}
			}
		}
	});
}

/*******************************************************************************
 * 动态加载JS（文件） 陈建宇 2013-07-23
 * 
 * @param 需要传入文件路径或Url
 * @returns
 */
function loadJS(url) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.language = 'javascript';
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

/**
 * 根据传入的年份和月份得到该月的天数 平年闰年2月份的天数是不同的
 */
function getDaysByYearAndMoth(year, month) {
	var days = null;
	if (month < 8) {
		// 如果为2月
		if (month == 2) {
			// 再判断平闰年
			// 如果是闰年，2月份的天数为29天
			if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
				days = 29;
			} else {
				days = 28;
			}
		} else {
			// 判断是偶数月还是奇数月
			if (month % 2 == 0) {
				days = 30;
			} else {
				days = 31;
			}
		}
	} else {
		// 8-12月份的奇数月是31天，偶数月是30天，与1-7月恰好相反
		if (month % 2 == 0) {
			days = 31;
		} else {
			days = 30;
		}
	}

	return days;
}

/*******************************************************************************
 * 动态加载CSS（文件） 陈建宇 2013-07-23
 * 
 * @param 需要传入文件路径或Url
 * @returns
 */
function loadCSS(url) {
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.media = 'screen';
	link.href = url;
	document.getElementsByTagName('head')[0].appendChild(link);
}

/*******************************************************************************
 * 将传入的js对象转换成URL参数字符串
 * 
 * @param param
 * @param key
 *            后台封装java对象的变量名
 * @returns
 */
function toUrlParam(param, key) {
	var paramStr = "";
	if (param instanceof String || param instanceof Number
			|| param instanceof Boolean) {
		paramStr += "&" + key + "=" + encodeURIComponent(param);
	} else {
		$.each(param, function(i) {
			var k = key == null ? i : key
					+ (param instanceof Array ? "[" + i + "]" : "." + i);
			paramStr += '&' + toUrlParam(this, k);
		});
	}
	return paramStr.substr(1);
};
// ie浏览器下文本框选中鼠标脚垫在最后
function cursorToEnd(textObject) {
	// ie下
	if ($.browser.msie) {
		var r = textObject.createTextRange();
		r.collapse(false);
		r.select();
	}
}



/**
 * 根据科目编码或名称查询科目对象 若不存在则返回null
 * 
 * @param ccode
 *            科目编码
 */
function getCurCodeObjByCodeOrName(inputValue) {
	var rtnCode = null;
	var param = "&codeOrName=" + inputValue;
	$.ajax({
		url : "code!queryCodeByCodeOrName.action",
		type : 'post',
		data : param,
		dataType : "json",
		async : false,
		success : function(data) {
			rtnCode = data.code1;
		}
	});
	return rtnCode;

}

/*******************************************************************************
 * 五舍六入函数 sixInto(2.135,2)=2.13; sixInto(2.136,2)=2.14;
 * 
 * @param x
 * @param n
 * @returns
 */
function sixInto(x, n) {
	n = n || 2;
	if (isNaN(parseFloat(x)) || isNaN(parseInt(n))) {
		return false;
	}
	var num = '10';
	for ( var i = 0; i < n; i++) {
		num += '0';
	}
	var y = Math.floor((x * parseInt(num))).toString();
	var z = new Array();
	for ( var i = 0, j = y.length; i < j; i++) {
		z[i] = y.substring(i, i + 1);
	}
	z[y.length - 2] = z[y.length - 1] <= 5 ? z[y.length - 2]
			: parseInt(z[y.length - 2]) + 1;
	z.pop();
	if (x.toString().indexOf('.') == -1) {
		z[z.length] = z[x.toString().length];
		z[x.toString().length] = '.';
	} else {

		z[z.length] = z[x.toString().indexOf('.')];
		z[x.toString().indexOf('.')] = '.';
		for ( var i = 0, j = z.length - x.toString().indexOf('.') - 1; i < j; i++) {
			var temp = z[x.toString().indexOf('.') + 1 + i];
			z[x.toString().indexOf('.') + 1 + i] = z[z.length - 1];
			z[z.length - 1] = temp;

		}
	}
	var str = '';
	for ( var i = 0, j = z.length; i < j; i++) {
		str += z[i];
	}
	return str;
}









/**
 * 初始化处理函数
 * 本函数相当于IE的window.onload，Firefox的onDOMContentLoaded，与JQuery的document.ready(function(){...});同理。
 * 即页面载入完后执行一些初始化动作，如遍历DOM设置样式、注册事件、初始化数据等
 * 此方法主要为了禁止F5刷新按键而定义，此方法将在所有jquery的ready()函数执行完后执行，也就是始终最后一个执行的函数。
 * winui.js里有同类函数，此函数名带有2用于区别
 * onready:传入要执行的函数名
 * config:一些配置信息
 */
function onDOMContentLoaded2(onready,config){
	
	//浏览器检测相关对象
    var ua = navigator.userAgent.toLowerCase();//获得浏览器信息
    var browser = {
      ie: /msie/.test(ua) && !/opera/.test(ua),//匹配IE浏览器
      opera: /opera/.test(ua),//匹配Opera浏览器
      safari: /version.*safari/.test(ua),//匹配Safari浏览器
      chrome: /chrome/.test(ua),//匹配Chrome浏览器
      firefox: /gecko/.test(ua) && !/webkit/.test(ua)//匹配Firefox浏览器
    };
    //设置是否在FF下使用DOMContentLoaded（在FF2下的特定场景有Bug）
    this.conf = {enableMozDOMReady:true};  
    if( config )  
    for( var p in config)  
        this.conf[p] = config[p];  
  
    var isReady = false;  
    function doReady(){  
        if( isReady ) return;  
        //确保onready只执行一次  
        isReady = true;  
        onready();  
    }  
    //IE
    if( browser.ie ){  
    	/*
        (function(){  
            if ( isReady ) return;  
            try {  
                document.documentElement.doScroll("left");  
            } catch( error ) {  
                setTimeout( arguments.callee, 0 );  
                return;  
            }  
            doReady();  
        })();  
        */
        window.attachEvent('onload',doReady);  
    }  
    //Webkit
    else if ((browser.opera || browser.safari || browser.chrome) && browser.version < 525){  
        (function(){  
            if( isReady ) return;  
            if (/loaded|complete/.test(document.readyState))  
                doReady();  
            else  
                setTimeout( arguments.callee, 0 );  
        })();  
        window.addEventListener('load',doReady,false);  
    }  
    //FF Opera 高版webkit 其他 
    else{  
        if( browser.ff || browser.version != 2 || this.conf.enableMozDOMReady)  
            document.addEventListener( "DOMContentLoaded", function(){  
                document.removeEventListener( "DOMContentLoaded", arguments.callee, false );  
                doReady();  
            }, false );  
        window.addEventListener('load',doReady,false);  
    }  
	
};


















//禁止浏览器“后退”操作
window.history.forward();



//禁止按F5键刷新和右键菜单
onDOMContentLoaded2(function(){
	/* 临时注释，在版本正式发布后解开注释

	//禁止F5键
	$(document).keydown(function(e){
		if (e.keyCode == 116) {
			window.event.keyCode = 0;
			return false;
		}
	});

	//禁止鼠标右键
	$(document).bind("contextmenu",function(){
		return false;
	});
	
	//禁止F5键
	$(document).mousedown(function(){
		try{
			window.parent.document.getElementById("leftnav_contextmenu").style.display='none';
		}catch(e){
			
		}
		return true;
	});

	*/
	
	/* 以下是只在兼容IE8的老的代码，上面的代码用来代替本段
	document.attachEvent("onkeydown",function(){
		if (window.event.keyCode == 116) {
			window.event.keyCode = 0;
			return false;
		}
	});

	document.attachEvent("oncontextmenu",function(){
			return false;
	});
	
	//点击模块区域时隐藏平台模块注销右键菜单
	document.attachEvent("onmousedown",function(){
			try{
				window.parent.document.getElementById("leftnav_contextmenu").style.display='none';
			}catch(e){
				
			}
			return true;
	});
	*/
	
});



function fileLoaded(fun){
	var ivl = setInterval(function(){
		fun();
		clearInterval(ivl);
	},200);
}




