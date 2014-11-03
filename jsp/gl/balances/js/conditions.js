/**
 * @Description 余额表查询条件 -- conditions.js
 * @author 李铭浩
 * @Date 2012-11-02
 * @Company	畅捷通信息技术股份有限公司
 * @Department 研发中心培教研发部
 * @Porject  EXAM
 */
//点击确定后执行此函数
function nextWindow(){
	//模拟要传给弹出窗体的值对象（这里实际要取得各文本框的值拼装成对象）：
	
	var startKm = $("#startKm").val();
	var endKm = $("#endKm").val();
	var startMonth = $("#startMonth").val();
	var endMonth = $("#endMonth").val();
	
	/*if (startKm=="") {
		 jAlert("按科目范围查询：起始科目不能为空！","提示");
		 return;
	}
	
	if (startKm>endKm) {
		jAlert("起始科目不能大于终止科目！","提示");
		return ;
	}*/
	
	if (startMonth>endMonth) {
		jAlert("开始月份不能大于结束月份！","提示");
		return ;
	}
	
	
	 //末级科目
	var isMj =null;
	if ($("#isMj").attr("checked"))
			isMj= 1;
	else 
			isMj= 0;

	
	//本期无发生夫余额、累计有发生显示
	var isWfs =  null;
	if ($("#isWfs").attr("checked"))
		isWfs= 1;
	else 
		isWfs= 0;
	
	//未记账凭证
	var  isWjz =  null;
	if ($("#isWjz").attr("checked"))
		isWjz= 1;
	else 
		isWjz= 0;
	
	var param = {
			myAccountBean:{
				//开始月份
				startMonth:$("#startMonth").val(),
				//结束月份
				endMonth:$("#endMonth").val(),
				//开始科目
				startKm:$("#startKm").val(),
				
				//结束科目
				endKm:$("#endKm").val(),
				//末级科目
				isMj:isMj,
				//开始级次
				startJc:$("#startJc").val(),
				//结束级次
				endJc:$("#endJc").val(),
				//开始余额
				startYe:($("#startYe").val()==null)?"":$("#startYe").val(),
				//结束余额
				endYe:($("#endYe").val()==null)?"":$("#endYe").val(),
				//科目类型
				kmType:$("#kmType").val(),
				//外币名称
				wbName:$("#wbName").val(),
				//本期无发生夫余额、累计有发生显示
				isWfs:isWfs,
				//包含未记账凭证
				isWjz:isWjz
				
			}
		};
	
	
	window.parent.openWindow("gl_balances_balances","gl_balances_blances_conditions",param);
	window.parent.closeWindow("gl_balances_blances_conditions");
}

/**
 *全局变量：记录当前弹窗动作
 *陈建宇
 */
var xaction="";

/**
 *实现其他窗体传入值赋值到本窗体文本框函数
 *陈建宇
 */
function deliverValue(valueObject){
	
	document.getElementById(xaction).value=valueObject.selKemuCode;
	
}




/**
 * 页面初始化 加载月份、科目类型、外币名称
 */
$(document).ready(function(){
	
	//月份初始化
	//TODO 此处有问题--初始值有问题 value 不应该是 ‘2013.5’ 应该为 ‘5’ 
	//应看blances_conditions.html 第64~77行代码数据
	var monthList = getCurAccidPeriod();
	var operDate=getCookie("operDate");
	var year=operDate.split('-');
	var m=parseInt(year[1]);//当前登录月份
	
	$("#startMonth").empty();
	$.each(monthList,function(index,month){
		var val=month.substring(month.indexOf(".")+1,month.length);
		if(val==m){
			$("#startMonth")[0].options.add(new Option(month,val,true,true));	
		}else{
			$("#startMonth")[0].options.add(new Option(month,val,false,false));
		}
		
	});
	$("#endMonth").empty();
	$.each(monthList,function(index,month){
		var val=month.substring(month.indexOf(".")+1,month.length);
		if(val==m){
			$("#endMonth")[0].options.add(new Option(month,val,true,true));			
		}else{
			$("#endMonth")[0].options.add(new Option(month,val,false,false));
		}
	});
	
	//科目类型初始化
	
	
	//币种初始化
	$.ajax({
	    url: "foreigncurrency!queryList.action",
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	var list = data.foreigncurrencys;
	    	$("#wbName").empty();
	    	$("#wbName").append("<option></option>");
	    	$.each(list,function(index,foreigncurrency){
	    		$("#wbName")[0].options.add(new Option(foreigncurrency.cexchName,foreigncurrency.cexchCode,false,false));
	    	});
		}
	});

	
	
});



//选择账簿类型
var selcsqlType="ZYE";
//选择账簿名称
var selcsqlName = "11";
//输入账簿名称
var inputcslName = "";
function addMyacccount() {
	
	inputcslName = prompt("请输入我的账簿名称");
	
}

//得到我的账簿查询条件
function getCsqlDetail() {
  var strRtn = "";
    //开始月份
	var startMonth =$("#startMonth").val();
	if (startMonth=="") startMonth = "null";
		
	//结束月份
	var endMonth=$("#endMonth").val();
	if (endMonth=="") endMonth = "null";
		
	//开始科目
	var startKm=$("#startKm").val();
	if (startKm=="") startKm = "null";
		
	//结束月份
	var endKm=$("#endKm").val();
	if (endKm=="") endKm = "null";
		
	//开始级次
	var startJc=$("#startJc").val();
	if (startJc=="") startJc = "null";
		
	//结束级次
	 var endJc=$("#endJc").val();
	 if (endJc=="") endJc = "null";
	 
	 //末级科目
	var isMj =null;
	if ($("#isMj").attr("checked"))
			isMj= 1;
	else 
			isMj= 0;
	
	

	//开始余额
	var startYe=$("#startYe").val();
	if (startYe=="") startYe = "null";
		
	//结束余额
	var endYe=$("#endYe").val();
	if (endYe=="") endYe = "null";
		
	//科目类型
	var kmType=$("#kmType").val();
	if (kmType=="") kmType = "null";
		
	//外币名称
	var wbName=$("#wbName").val();
	if (wbName=="") wbName = "null";
	
	
	//本期无发生夫余额、累计有发生显示
	var isWfs =  null;
	if ($("#isWfs").attr("checked"))
		isWfs= 1;
	else 
		isWfs= 0;
	
	//未记账凭证
	var  isWjz =  null;
	if ($("#isWjz").attr("checked"))
		isWjz= 1;
	else 
		isWjz= 0;
	
	
		
	
  strRtn = startMonth+"#"+endMonth+"#"+startKm+"#"+endKm+"#"+isMj + "#" + startJc+"#" + endJc
            +"#"+startYe+"#"+endYe+"#"+kmType+"#"+wbName+"#" + isWfs+"#" + isWjz ;
  return strRtn;
}

//保存我的账簿
function saveMyacccount() {
	var csqlDetail= getCsqlDetail();
	
	if (inputcslName=="") {
		jAlert("名称不允许为空","提示");
		return;
	}
	var data = "glMyacccount.csqlType=" + selcsqlType 
	          + "&glMyacccount.csqlName=" + inputcslName
              + "&glMyacccount.csqlDetail=" + csqlDetail;
    var isuniqueness = true;
    
  //判断我的账簿名称是否唯一
    /**
	$.ajax({
		url: "myacccount!isUniquenessMyacccountByName.action",
		type: 'post',
		data:data,
		dataType: "json",
		async:false,
		success: function(data){
			isuniqueness = data.isuniqueness;
			if(data.isuniqueness==false){
				jAlert("该账簿名称经被使用，请重新输入账簿名称!","提示");
				return false;
			}
		}
	  });
	  */
	if (isuniqueness==true) {
        $.ajax({
         	url: "myacccount!create",
          	type: 'post',
          	data:data,
          	dataType: "json",
          	async:false,
          	success: function(data){
          		jAlert("我的账簿增加成功！","提示",function(){
          			
          			loadMyacccountYEBtree();
          		});
          	  }
        });         
	}
	
}

//删除我的账簿
function deleteMyacccount() {
	selcsqlName = selectName;
	var data = "glMyacccount.csqlType=" + selcsqlType 
    + "&glMyacccount.csqlName=" + selcsqlName;
	$.ajax({
		url: "myacccount!delete",
		type: 'post',
		data:data,
		dataType: "json",
		async:false,
		success: function(data){
			jAlert("我的账簿删除成功！","提示",function(){
				
				loadMyacccountYEBtree(); 
			});
		}
	});        
	
}


