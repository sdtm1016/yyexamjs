/**
 * @Description 明细账查询条件 detailed.js
 * @author 李铭浩
 * @Date 2012-11-28
 * @Company	畅捷通信息技术股份有限公司
 * @Department 研发中心培教研发部
 * @Porject  Exam
 */


 /**
   * 页面初始化
   */
  $(document).ready(function(){
  	//凭证类别初始化
  	$.ajax({
  		url: "code!queryList",
  		type: 'post',
  		async:false,
  		dataType: "json",
  		success: function(data){
  			var codeList =data.codes;
  			$("#ccode").empty();
  			$.each(codeList,function(index,code){
  				$("#ccode")[0].options.add(new Option(code.ccode+code.ccodeName,code.ccode,false,false));
  			});
  		}
  	});
  });




/**
 * 获取 Id 对象
 */
function gbi(id){
	return document.getElementById(id);
}
/**
 * 获取 Name 对象
 */
function gbn(name){
	return document.getElementsByName(name);
}
/**
 * 获取选中的 redio 的 value
 */
function getValueByName(obj){
	for(var i=0;i<obj.length;i++){
        if(obj[i].checked){
            return obj[i].value;            
        }
    }
}

/**
 * 去“明细账”窗体
 */
function nextWindow(){
	
	// 开始科目
	var startKm = $("#ccodestart").val();
	//结束科目
	var endKm = $("#ccodeend").val();
	//开始月份
	var startMonth = $("#monthstart").val();
	// 结束月份
	var endMonth = $("#monthend").val();
	//按月份综合明细
	if($("#rd_1_2").attr("checked")=="checked"){
		var ccode=$("#ccode").val();
		if(startKm!=""||endKm!=""){
			if(endKm!=startKm||startKm!=ccode||endKm!=ccode){
				jAlert("查询月份综合明细时,所选科目必须属于用一个一级科目","提示");
				return;
			}	
		}
	}
	//按科目范围
	var codeRanage = getValueByName(gbn("rd_1"));
	if(startKm==""&&endKm==""){
		$("#ccodestart").val("1001");
		$("#ccodeend").val("1001");
	}
	if(startKm!=""&&endKm==""){
		$("#ccodeend").val($("#ccodestart").val());
	}
	if (codeRanage*1==1) {
		if( startKm==""&&endKm==""){
			$("#ccodestart").val("1001");
			$("#ccodeend").val("6901");
		}
		if(startKm!=""&&endKm==""){
			$("#ccodeend").val("6901");
		}
		if( startKm==""&&endKm!=""){
			$("#ccodestart").val("1001");
		}
	  
	}
	if (startMonth>endMonth) {
		jAlert("开始月份不能大于结束月份！","提示");
		return ;
	}
	
	//是否按对方科目展开
	var  isOtherSubjects =  null;
	if ($("#cb_1").attr("checked"))
		isOtherSubjects= 1;
	else 
		isOtherSubjects= 0;

		
	//未记账凭证
	var  isWjz =  null;
	if ($("#cb_2").attr("checked"))
		isWjz= 1;
	else 
		isWjz= 0;
			
	//按科目排序	
	var  orderByCode =  null;
	if ($("#cb_3").attr("checked"))
		orderByCode= 1;
	else 
		orderByCode= 0;


	
	
	var sls={};
	// 按科目范围查询
	sls.codeRange=getValueByName(gbn("rd_1"));
	
	//月份综合明细账
	sls.monthSl=gbi("ccode").value;
	sls.monthSlName=$("#ccode").find('option:selected').text();
	//开始科目
	sls.startKm=gbi("ccodestart").value;
	//结束科目
	sls.endKm=gbi("ccodeend").value;
	//开始月份
	sls.startMonth=gbi("monthstart").value;
	//结束月份
	sls.endMonth=gbi("monthend").value;
	
	//是否按对方科目展开
	sls.isOtherSubjects=isOtherSubjects;
	//未记账凭证
	sls.isWjz=isWjz;
	//按科目排序
	sls.orderByCode=orderByCode;
	
	window.parent.openWindow("gl_detailed_subsidiaryLedgers","gl_detailed_detailed",sls);
	window.parent.closeWindow("gl_detailed_detailed");
}
/**
 * 修改checkbox的值如是checked Value：1;否则Value:0
 * @param cb
 */
function changeValue(cb){
	if(cb.checked==true){
		cb.value=1;
	}else{
		cb.value=0;
	}
}



//“月份综合明细账”单选按钮选中事件处理函数：禁用和启用相关控件，cdbm=change diabled by month
function cdbm(radio){
	if(radio.checked==true){
		
		document.getElementById('ccode').disabled=false;
		document.getElementById('cb_1').checked=false;
		document.getElementById('cb_1').disabled=true;
		document.getElementById('cb_1_l').style.color="#888";
		document.getElementById('cb_3').disabled=true;
		document.getElementById('cb_3_l').style.color="#888";
		document.getElementById('rd_2_1').disabled=true;
		document.getElementById('rd_2_1_l').style.color="#888";
		document.getElementById('rd_2_2').disabled=true;
		document.getElementById('rd_2_2_l').style.color="#888";
		
	}
}

//“按科目范围查询”单选按钮选中事件处理函数：禁用和启用相关控件，cdbs=change diabled by scope
function cdbs(radio){
	if(radio.checked==true){
		
		document.getElementById('ccode').disabled=true;
		document.getElementById('cb_1').checked=false;
		document.getElementById('cb_1').disabled=false;
		document.getElementById('cb_1_l').style.color="#000";
		document.getElementById('cb_3').disabled=false;
		document.getElementById('cb_3_l').style.color="#000";
		document.getElementById('rd_2_1').disabled=true;
		document.getElementById('rd_2_1_l').style.color="#888";
		document.getElementById('rd_2_2').disabled=true;
		document.getElementById('rd_2_2_l').style.color="#888";
		
	}
}
/**
 * 获取选中的redio的Value并把它赋值给checkbox
 */
function setOtherSubjects(){
	gbi("cb_1").value=getValueByName(gbn("rd_2"));
}

//“是否按对方科目展开”复选按钮选中事件处理函数：禁用和启用相关控件，cdbo=change diabled by opposite
function cdbo(){
	var cb =  document.getElementById('cb_1');
	if(cb.checked==true){
		setOtherSubjects();
		document.getElementById('rd_2_1').disabled=false;
		document.getElementById('rd_2_1_l').style.color="#000";
		document.getElementById('rd_2_2').disabled=false;
		document.getElementById('rd_2_2_l').style.color="#000";
	}else{
		cb.value=0;
		document.getElementById('rd_2_1').disabled=true;
		document.getElementById('rd_2_1_l').style.color="#888";
		document.getElementById('rd_2_2').disabled=true;
		document.getElementById('rd_2_2_l').style.color="#888";
	}
}

var target=null;

/**
 * 实现窗体传值接收处理函数
 */
function deliverValue(valueObject){
	document.getElementById(target).value=valueObject.selKemuCode;
	document.getElementById(target).setAttribute("kemuname",valueObject.selKemuName);
}



/**
 * 页面初始化 加载月份、科目类型、外币名称
 */
$(document).ready(function(){
	
	//月份初始化
	var monthList = getCurAccidPeriod();
	var operDate=getCookie("operDate");
	var year=operDate.split('-');
	var m=parseInt(year[1]);//当前登录月份
	$("#monthstart").empty();
	$.each(monthList,function(index,month){
		var val=month.substring(month.indexOf(".")+1,month.length);
		if(val==m){
			$("#monthstart")[0].options.add(new Option(month,month,true,true));	
		}else{
			$("#monthstart")[0].options.add(new Option(month,month,false,false));
		}
	});
	$("#monthend").empty();
	$.each(monthList,function(index,month){
		var val=month.substring(month.indexOf(".")+1,month.length);
		if(val==m){
			$("#monthend")[0].options.add(new Option(month,month,true,true));			
		}else{
			$("#monthend")[0].options.add(new Option(month,month,false,false));
		}
	});
	
	
	
	
});






//选择账簿类型
var selcsqlType="ZMX";
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
  
    //按科目范围查询
	 var codeRange = $("input[name='rd_1']:checked").val();
	 if (codeRange=="") codeRange = "null";
		
		
	//月份综合明细账
	var monthSl=$("#ccode").val();
	if (monthSl=="") monthSl = "null";
		
	//开始科目
	var startKm=$("#ccodestart").val();
	if (startKm=="") startKm = "null";
		
	//结束科目
	var endKm=$("#ccodeend").val();
	if (endKm=="") endKm = "null";
		
	//开始月份
	var startMonth=$("#monthstart").val();
	if (startMonth=="") startMonth = "null";
		
	//结束月份
	var endMonth=$("#monthend").val();
	if (endMonth=="") endMonth = "null";
		
	
	//是否按对方科目展开
	var  isOtherSubjects =  null;
	if ($("#cb_1").attr("checked"))
		isOtherSubjects= 1;
	else 
		isOtherSubjects= 0;

		
	//未记账凭证
	var  isWjz =  null;
	if ($("#cb_2").attr("checked"))
		isWjz= 1;
	else 
		isWjz= 0;
			
	//按科目排序	
	var  orderByCode =  null;
	if ($("#cb_3").attr("checked"))
		orderByCode= 1;
	else 
		orderByCode= 0;

		

 	
  strRtn = codeRange+"#"+monthSl+"#"+startKm+"#"+endKm+"#"+startMonth+"#" + endMonth
         +"#"+isOtherSubjects + "#" + isWjz + "#" +orderByCode  ;
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
          			
          			loadMyacccountMXBtree();  
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
				
				loadMyacccountMXBtree(); 
			});
		}
	});        
	
}






