/**
 * @Description 明细账列表显示 subsidiaryLedgers.js
 * @author 李铭浩
 * @Date 2012-11-28
 * @Company	畅捷通信息技术股份有限公司
 * @Department 研发中心培教研发部
 * @Porject  Exam
 */
var valueObject = window.parent.valueMap.get("gl_detailed_subsidiaryLedgers");
/**
 * 页面初始化
 */
var year ="";
$(document).ready(function(){
	codeList();
	amountBalances(1);
	init();
	//科目改变事件
	$("#code").unbind("change").bind("change",function(){
		var text=$(this).find("option:selected").text();
		var i=text.indexOf(" ");
		var t=text.substring(i+1);
		$("#title").html(t+"明细账");
		amountBalances(1);
		
	});;
	
});
/**
 * 遇到数值的时候，转换成小数点后两位
 */
	function transFloat(value){
		if(value!=null && value!=""){
			if((value-0)==0){
				value="";
			}else{
				value=Math.abs(parseFloat(value)).toFixed(2);
			}
		} else if(value==null || value==""||value==undefined){
			value="";
		}
		return value;
	}
	/**
	 * 遇到null的时候，转换""
	 */
		function transString(value){
			 if(value==null || value==""||value==undefined){
				value="";
			}
			return value;
		}
//初始化参数
function init(){
	var text=$("#code").find("option:selected").text();
	var i=text.indexOf(" ");
	var t=text.substring(i+1);
	$("#title").html(t+"明细账");
	var operDate=getCookie("operDate");
	var date=operDate.split('-');
	$("#subsidaryHead").find("tr:eq(0)").find("td:eq(0)").html(date[0]+"年");
	$("#month").html(valueObject.startMonth);
}
//改变列表显示模式
function changeModel(val){
	var value1= val.value;
	//外币
	if (value1 == 2){
		foreignCurrencyAmount(value1);
		//数量
	}else if(value1 == 3){
		quantityAmountBalances(value1);
		//外币数据
	}else if(value1 == 4){
		numberQuantityBlances(value1);
		//金额
	}else{
		amountBalances(value1);
	}
	init();
}
//科目列表
function codeList(){
	var object = {sls:valueObject};
	var codeRange = valueObject.codeRange;
	// 月份综合明细查询
	if (codeRange*1==0) {
		var monthSl = valueObject.monthSl;
		var monthSlName = valueObject.monthSlName;
		$("#code").empty();//清空下拉列表
		$("#code").append("<option value='"+monthSl+"'>"+monthSlName+"</option>");
		$("#code").attr("disabled",true);
		$("#model").empty();
		var str='<option value="1">金额式</option>'
			    +'<option value="2">外币金额式</option>'
				+'<option value="3">数量金额式</option>'
				+'<option value="4">数量外币式</option>';
		$("#model").append(str);
	}
	//按科目范围查询
	else {
		var data = (parseParam(object));
		$.ajax({
			url:"subsidiaryLedgers!codeList.action",
			type:"post",
			async:false,
			data:data,
			success:function(data,status){
				var codeList = data.codeList;
				$("#code").empty();//清空下拉列表
				$.each(codeList,function(index,i){
					$("#code").append("<option value='"+i.ccode+"'>"+i.ccode+" "+i.ccodeName+"</option>");
				});
			},
			dataType:"json"
		});
	}
}
var isOtherSubjects=valueObject.isOtherSubjects;//是否展开对方科目
function isHide(modelValue){
	 /*按科目范围查询时隐藏科目编码,名称*/
	   if(valueObject.codeRange == 1){
			valueObject.monthSl=$("#code").val();
			if(isOtherSubjects==1){//展开
				$("#model").empty();
				var str='<option value="1">金额式</option>'
					    +'<option value="2">外币金额式</option>'
						+'<option value="3">数量金额式</option>'
						+'<option value="4">数量外币式</option>';
				$("#model").append(str);
				$("#model").val(modelValue);
					$("#headCode").html("对方科目");
					$("#headCodeName").css("display","none");
			}else{
				$("#model").empty();
				var str='<option value="1">金额式</option>';
				$("#model").append(str);
				$("#model").val(modelValue);
				$("#headCode").css("display","none");
				$("#headCodeName").css("display","none");
				$("#subsidary tr").each(function(){
					$(this).find("td:eq(3)").hide();
					$(this).find("td:eq(4)").hide();
				});
			}
		}
}
/**
 * 组合科目编码/科目名称
 * ccodeEqual 对方科目编码
 */
function comboxCodeName(ccodeEqual,code,codeName){
	var str="";
	if(valueObject.codeRange == 1){//按照科目范围查询
		if(isOtherSubjects==1){//展开
			if(ccodeEqual==""||ccodeEqual==null){
				str += '</td><td >' ;
			}else{
				str += '</td><td >' +'(' + ccodeEqual +')' ;
			}
		}else{
			str += '</td><td >' + code + '</td><td >' + codeName;
		}
	}else{
		str += '</td><td >' + code + '</td><td >' + codeName;
	}
	return str;
}

/**
 * 金额式
 */
function amountBalances(modelValue){
	if(valueObject.codeRange == 1){
		valueObject.monthSl=$("#code").val();
	}
	var object = {sls:valueObject};
	$("#subsidary").html("");//清空
	$("#subsidaryHead").html("");//清空
	var str = "";
	str = '<tr bgcolor="#CCCCFF" bordercolor="#000000"><td colspan="2" width="6%">'+year
		+ '年</td><td rowspan="2" width="12%">凭证号'
		+ '</td><td rowspan="2" id="headCode"  width="12%">科目编码'
		+ '</td><td rowspan="2" id="headCodeName" width="12%">科目名称'
		+ '</td><td rowspan="2" width="30%">摘要'
		+ '</td><td rowspan="2" width="10%">借方'
		+ '</td><td rowspan="2" width="10%">贷方'
		+ '</td><td rowspan="2" width="3%">方向'
		+ '</td><td rowspan="2" width="10%">余额'
		+ '</td><td rowspan="2"></td></tr>';
	$("#subsidaryHead").append(str);
	str = '<tr bgcolor="#CCCCFF" bordercolor="#000000">'
	     +'<td>月</td>'
         +'<td>日</td>'   
	     + '</tr>';
$("#subsidaryHead").append(str);  
   $.ajax({
		url:"subsidiaryLedgers!querySl",
		type:"post",
		async:false,
		data:parseParam(object),
		success:function(data,status){
			var list = data.list;
			$.each(list,function(index,i){
				str="";
					if(i.ibook==0){//未记账凭证颜色变绿色
						str = '<tr style="background-color:#c0ffc0" ><td>' + i.month;
					}else{
						str = '<tr><td>' + i.month;
					}
					str += '</td><td>' + transString(i.day)
						+ '</td><td>' + transString(i.voucherNumber);
					str +=transString(comboxCodeName(i.ccodeEqual,i.ccode,i.ccodeName));
					str +=  '</td><td>' + i.digest
						+ '</td><td>' + transFloat(i.md)
						+ '</td><td>' + transFloat(i.mc)
						+ '</td><td>' + i.begind
						+ '</td><td>' + transFloat(i.me)
						+ '</td><td></td></tr>';
				$("#subsidary").append(str);
			});
		},
		dataType:"json"
	});
   isHide(modelValue);
}
/**
 * 外币金额式
 */
function foreignCurrencyAmount(modelValue){
	if(valueObject.codeRange == 1){
		valueObject.monthSl=$("#code").val();
	}
	var object = {sls:valueObject};
	$("#subsidary").html("");//清空
	$("#subsidaryHead").html("");//清空
	var str = "";
	str = '<tr bgcolor="#CCCCFF" bordercolor="#000000"><td colspan="2" width="6%">'+year
		+ '年</td><td rowspan="2" width="12%">凭证号' 
		+ '</td><td rowspan="2" id="headCode"  width="12%">科目编码'
		+ '</td><td rowspan="2" id="headCodeName" width="12%">科目名称'
		+ '</td><td rowspan="2" width="30%">摘要'
		+ '</td><td rowspan="2" width="10%">汇率'
		
		+ '</td><td colspan="2" width="10%">借方'
		
		+ '</td><td colspan="2" width="10%">贷方'
		
		+ '</td><td rowspan="2" width="3%">方向'
		+ '</td><td colspan="3" width="10%">余额'
		+ '</td></tr>';
	$("#subsidaryHead").append(str);
	str =    '<tr bgcolor="#CCCCFF" bordercolor="#000000">'
	     +'<td>月</td>'
         +'<td>日</td>'
        
	     +'<td>外币</td>'
	     +'<td>金额</td>'
	     
	     +'<td>外币</td>'
	     +'<td>金额</td>'
	     
	     +'<td>外币</td>'
	     +'<td>汇率</td>'
	     +'<td>金额</td>'
	     + '</tr>';
   $("#subsidaryHead").append(str);  
	$.ajax({
		url:"subsidiaryLedgers!queryZMXByExchMoney",
		type:"post",
		async:false,
		data:parseParam(object),
		dataType:"json",
		success:function(data,status){
			var list = data.exchMoneyList;
			$.each(list,function(index,i){
				str="";
					if(i.ibook==0){//未记账凭证颜色变绿色
						str = '<tr style="background-color:#c0ffc0" ><td>' + i.month;
					}else{
						str = '<tr><td>' + i.month;
					}
					str += '</td><td>' + transString(i.day)
						+ '</td><td>' + transString(i.voucherNumber);
					str +=comboxCodeName(i.ccodeEqual,i.ccode,i.ccodeName);
					str +=  '</td><td>' + i.digest//摘要
						+ '</td><td>' + transFloat(i.rate) //汇率
						
						+ '</td><td>' + transFloat(i.exchMoney1)  //  外币借方
						+ '</td><td>' + transFloat(i.money1)  // 借方金额
						
						+ '</td><td>' + transFloat(i.exchMoney2) // 外币贷方
						+ '</td><td>' + transFloat(i.money2)  //  贷方金额
						
						+ '</td><td>' + i.begind
						
						+ '</td><td>' + transFloat(i.exchMoney3) //外币余额
						+ '</td><td>' + transFloat(i.rate) //汇率
						+ '</td><td>' + transFloat(i.money3)  //金额余额
						+ '</td><td></td></tr>';
				
				$("#subsidary").append(str);
			});
		}
	});
	isHide(modelValue);
}
/**
 * 数量金额式
 */
function quantityAmountBalances(modelValue){
	if(valueObject.codeRange == 1){
		valueObject.monthSl=$("#code").val();
	}
	var object = {sls:valueObject};
	
	$("#subsidary").html("");//清空
	$("#subsidaryHead").html("");//清空
	var str = "";
	str = '<tr bgcolor="#CCCCFF" bordercolor="#000000"><td colspan="2" width="6%">'+year
		+ '年</td><td rowspan="2" width="12%">凭证号' 
		+ '</td><td rowspan="2" id="headCode"  width="10%">科目编码'
		+ '</td><td rowspan="2" id="headCodeName" width="10%">科目名称'
		+ '</td><td rowspan="2" width="30%">摘要'
		+ '</td><td rowspan="2" width="10%">单价'
		+ '</td>'+'<td colspan="2">借方 </td>'
		+ '</td><td colspan="2">贷方'
		+ '</td><td rowspan="2" width="3%">方向'
		+ '</td><td colspan="3" width="20%">余额'
		+ '</td></tr>';
	$("#subsidaryHead").append(str);
	str =    '<tr bgcolor="#CCCCFF" bordercolor="#000000">'
		     +'<td>月</td>'
	         +'<td>日</td>'
	        
		     +'<td>数量</td>'
		     +'<td>金额</td>'
		     +'<td>数量</td>'
		     +'<td>金额</td>'
		     +'<td>数量</td>'
		     +'<td>单价</td>'
		     +'<td>金额</td>'
		     + '</tr>';
	$("#subsidaryHead").append(str);  
	$.ajax({
		url:"subsidiaryLedgers!queryZMXByNumber",
		type:"post",
		async:false,
		data:parseParam(object),
		dataType:"json",
		success:function(data,status){
			var list = data.numberMoneyList;
			$.each(list,function(index,i){
					str="";
				if(i.ibook==0){//未记账凭证颜色变绿色
					str = '<tr style="background-color:#c0ffc0" ><td>' + i.month;
				}else{
					str = '<tr><td>' + i.month;
				}
					str += '</td><td>' + transString(i.day)
						+ '</td><td>' + transString(i.voucherNumber);
					str +=comboxCodeName(i.ccodeEqual,i.ccode,i.ccodeName);
					str +=  '</td><td>' + i.digest//摘要
						+ '</td><td>' + transFloat(i.price1)  //单价
						+ '</td><td>' + transFloat(i.number1)  //借方数量
						+ '</td><td>' + transFloat(i.money1)  //借方金额
						+ '</td><td>' + transFloat(i.number2)  //贷方数量
						+ '</td><td>' + transFloat(i.money2)  //贷方金额
						+ '</td><td>' + i.begind //方向
						+ '</td><td>' + transFloat(i.number3)  //余额数量
						+ '</td><td>' + transFloat(i.price1)  //余额单价
						+ '</td><td>' + transFloat(i.money3)  //数量余额
						+ '</td><td></td></tr>';
				
				$("#subsidary").append(str);
			});
		}
	});
	isHide(modelValue);
}
/**
 * 数量外币式
 */
function numberQuantityBlances(modelValue){
	if(valueObject.codeRange == 1){
		valueObject.monthSl=$("#code").val();
	}
	var object = {sls:valueObject};

	$("#subsidary").html("");//清空
	$("#subsidaryHead").html("");//清空
	var str = "";
	str = '<tr bgcolor="#CCCCFF" bordercolor="#000000"><td colspan="2" width="6%">'+year
		+'年</td><td rowspan="2" width="12%">凭证号' 
		+ '</td><td rowspan="2" id="headCode"  width="10%">科目编码'
		+ '</td><td rowspan="2" id="headCodeName" width="10%">科目名称'
		+ '</td><td rowspan="2" width="30%">摘要'
		+ '</td><td rowspan="2" width="10%">单价'
		+ '</td><td rowspan="2" width="10%">汇率'
		
		+ '</td><td colspan="3" width="10%">借方'
		
		+ '</td><td colspan="3" width="10%">贷方'
		
		+ '</td><td rowspan="2" width="3%">方向'
		
		+ '</td><td colspan="5" width="10%">数量余额'
		+ '</td></tr>';
	$("#subsidaryHead").append(str);
	str =    '<tr bgcolor="#CCCCFF" bordercolor="#000000">'
	     +'<td>月</td>'
        +'<td>日</td>'
        
        +'<td>外币</td>'
	     +'<td>数量</td>'
	     +'<td>金额</td>'
	     
	     +'<td>外币</td>'
	     +'<td>数量</td>'
	     +'<td>金额</td>'
	     
	     +'<td>外币</td>'
	     +'<td>数量</td>'
	     +'<td>单价</td>'
	     +'<td>汇率</td>'
	     +'<td>金额</td>'
	     + '</tr>';
     $("#subsidaryHead").append(str);  
	$.ajax({
		url:"subsidiaryLedgers!queryZMXByExchNumber",
		type:"post",
		async:false,
		data:parseParam(object),
		dataType:"json",
		success:function(data,status){
			var list = data.exchNumberMoneyList;
			$.each(list,function(index,i){
				str="";
				if(i.ibook==0){//未记账凭证颜色变绿色
					str = '<tr style="background-color:#c0ffc0" ><td>' + i.month;
				}else{
					str = '<tr><td>' + i.month;
				}
					str += '</td><td>' + transString(i.day)  //日
						+ '</td><td>' + transString(i.voucherNumber); //凭证号
					str +=comboxCodeName(i.ccodeEqual,i.ccode,i.ccodeName);
					str +=  '</td><td>' + i.digest//摘要
						+ '</td><td>' + transFloat(i.price1)  //单价
						+ '</td><td>' + transFloat(i.rate1)  //汇率
						
						+ '</td><td>' + transFloat(i.number1) //借方数量
						+ '</td><td>' + transFloat(i.exchMoney1)//借方外币
						+ '</td><td>' + transFloat(i.money1)  //借方数量
						
						+ '</td><td>' + transFloat(i.number2)  //贷方数量
						+ '</td><td>' +  transFloat(i.exchMoney2) //贷方外币
						+ '</td><td>' + transFloat(i.money2)  //贷方金额
						
						+ '</td><td>' + i.begind //方向
						
						+ '</td><td>' + transFloat(i.number3)  //余额数量
						+ '</td><td>' + transFloat(i.price2)  //余额单价
						+ '</td><td>' + transFloat(i.exchMoney3)  //余额外币
						+ '</td><td>' + transFloat(i.rate2)  //余额汇率
						
						+ '</td><td>' + transFloat(i.money3)  //数量余额
						+ '</td><td></td></tr>';
				
				$("#subsidary").append(str);
			});
		}
	});
	isHide(modelValue);
}
/**
 *  //调用：
 *  var obj={name:'tom','class':{className:'class1'},classMates:[{name:'lily'}]};
 *  parseParam(obj);
 *  结果："name=tom&class.className=class1&classMates[0].name=lily" 
 *  parseParam(obj,'stu');
 *  结果："stu.name=tom&stu.class.className=class1&stu.classMates[0].name=lily" 
 */
var parseParam=function(param, key){
	var paramStr="";
	if(param instanceof String||param instanceof Number||param instanceof Boolean){
		paramStr+="&"+key+"="+encodeURIComponent(param);
	}else{
		$.each(param,function(i){
			var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
			paramStr+='&'+parseParam(this, k);
		});
	}
	return paramStr.substr(1);
};