//接受会计期间传来数据-----康榕元
var accountPeriod = "";
//T3id，用于弹出的科目预览窗体取值去查询行业预置科目
var sysManagerId=null;
//行业性质，用处同上
var ctradekind=null;

//当前显示的form面板
var CURRENT_SHOWED_PANEL_NAME="panel1";

//当前form面板的输入验证总状态（用于为“下一步”按钮提供执行参考）
var panelValidation=false;

//下一步
function next(){
	if(CURRENT_SHOWED_PANEL_NAME!=null){
		//alert(accountPeriod);
		var panelIndex=parseInt(CURRENT_SHOWED_PANEL_NAME.toString().substring(5,6));
		if(panelIndex==1){
			var i = false;
			var textId = $("#caccId").val();
			if(textId==null||textId==""){
				jAlert("账套号不能为空！");
				return;
			}
			var textName = $("#caccName").val();
			if(textName==null||textName==""){
				jAlert("账套名称不能为空！");
				return;
			}
			var testIyear = $("#iyear").val();
			if(testIyear==null||testIyear==""){
				jAlert("会计年度不能为空！");
				return;
			}
			var testImonth = $("#imonth").val();
			if(testImonth==null||testImonth==""){
				jAlert("月度不能为空！");
				return;
			}
			/*shulei*/
			 if(textId=="201"&&textName=="北京启明科技公司"&&testIyear=="2010"&&testImonth=="1"){
				window.parent.updateScore('1-1',0);
			 }
			

			/*shulei
			
			$.ajax({
				async:false,
				url: "uaAccount!findOneBySysManagerIdAndcaccid",
				type: 'post',
				data:"uaAccount.caccId="+textId,
				dataType: "json",
				success: function(data){
					if(data.uaAccount!=null){
						i = true;
					}
				}
			  });
			  if(i){
				  jAlert("账套号["+textId+"]已存在！"); 
				  return;
			  }
			  //如果没有点会计期间设置时没数据的错误 -- 李铭浩2012-12-05   必须每次都要计算一次否则修改后就会出现老的内容(lichunhui)
			  //if(accountPeriod == null || accountPeriod == ""){
				  var iyear = $("#iyear").val();
				  accountPeriod = buildAccountPeriod(iyear);
			 // }
			 
			 */
		}
		if(panelIndex==2){
			var textCunitname = $("#cunitname").val();
			var textCunitabbre = $("#cunitabbre").val();
			if(textCunitname==null||textCunitname==""){
				jAlert("单位名称不能为空！");
				return;
			}
			if(textCunitabbre==null||textCunitabbre==""){
				jAlert("单位简称不能为空！");
				return;
			}
			
			/*shulei*/
			 if(textCunitname=="北京启明科技公司"&&textCunitabbre=="启明科技"){
				window.parent.updateScore('1-1',1);
			}
		}
		if(panelIndex==3){
			var caccId = $("#caccId").val();
			var iyear = $("#iyear").val();
			$("#accid").html(caccId);
			$("#year").html(iyear);
			
			/*shulei*/
			if($('#ctradekind_s').val()=="2007年新会计准则"&&$('#caccMaster_s').val()=="demo"){
				window.parent.updateScore('1-1',2);
			}
		}
		if(panelIndex<5){
			document.getElementById(CURRENT_SHOWED_PANEL_NAME).style.display="none";
			document.getElementById("panel"+(panelIndex+1)).style.display="block";
			CURRENT_SHOWED_PANEL_NAME = "panel"+(panelIndex+1);
			document.getElementById("prevButton").disabled=false;
			
			if((panelIndex+1)==5){
				//禁用下一步
				document.getElementById("nextButton").disabled=true;
				
				//启用上一步
				document.getElementById("prevButton").disabled=false;
			}
		}
		disablPanel((panelIndex+1));
	}
}
//上一步
function prev(){
	if(CURRENT_SHOWED_PANEL_NAME!=null){
		var panelIndex=parseInt(CURRENT_SHOWED_PANEL_NAME.toString().substring(5,6));
		if(panelIndex>1){
			document.getElementById(CURRENT_SHOWED_PANEL_NAME).style.display="none";
			document.getElementById("panel"+(panelIndex-1)).style.display="block";
			CURRENT_SHOWED_PANEL_NAME = "panel"+(panelIndex-1);
			document.getElementById("nextButton").disabled=false;
			
			if((panelIndex-1)==1){

				//禁用上一步
				document.getElementById("prevButton").disabled=true;
				
				//启用下一步
				document.getElementById("nextButton").disabled=false;
			}
			disablPanel((panelIndex-1));
		}
	}
}

//根据panelIndex值启用和屏蔽完成按钮
function disablPanel(panelIndex){
	if(panelIndex<5){
		//禁用完成按钮
		document.getElementById("finisButton").disabled=true;
	}else{
		//启用完成按钮
		document.getElementById("finisButton").disabled=false;
	}
}
/**
 *建账套提交方法
 */
function addAccount(){
	 jConfirm('可以创建账套了么?', '创建账套', function(r) {
         if(r){
        	 $("#cancelButton").attr("disabled",true);
        	 $("#prevButton").attr("disabled",true);
        	 $("#nextButton").attr("disabled",true);
        	 $("#finisButton").attr("disabled",true);
        	 
        	 var uaAccount = $("#addForm").serialize();
        	 var caccId = $("#caccId").val();
        	 var caccName = $("#caccName").val();
        	 var iyear = $("#iyear").val();
        	 var imonth = $("#imonth").val();
        	 
        	 /*	
	$.ajax({
	 	url:"uaAccount!add.action",
	 	type:"post",
	 	dataType:"json",
	 	async:false,
	 	data:uaAccount+"&"+accountPeriod,
	 	error:function(){
	 		jAlert("请求失败!");
	 	},
	 	success:function(data,status){
	 		var accid = data.accid;
	 		if(data.message=="true"){
	 			var account = {
 					accid:accid,
 					caccId:caccId,
 					caccName:caccName,
 					iyear:iyear,
 					imonth:imonth,
 					action:"add"
	 			};
		 		window.parent.openWindow("addgrade","addAccount",account);
		 		window.parent.closeWindow("addAccount");
	 		}else{
	 			jAlert("创建失败！","提示信息",function(){

	 		 		window.parent.closeWindow("addAccount");
	 			});

	 		}
	 	}

	 });
	 
        	  */
        	 
        	 /*shulei*/
        	 if($('#foreignCurrency').prop('checked')){
        		 window.parent.updateScore('1-1',3);
        	 }
        	 
        	 /*shulei*/
        	 var account = {
        			 accid:4800197,
        			 caccId:caccId,
        			 caccName:caccName,
        			 iyear:iyear,
        			 imonth:imonth,
        			 action:"add"
        	 };
        	 window.parent.openWindow("addgrade","addAccount",account);
        	 window.parent.closeWindow("addAccount");
         }
	 });

	 
}
$(document).ready(function() {
	//假设是sysManagerId为1的考生登录
	//sysManagerId = 1;
	
	//页面加载后根据sysManagerId查询出企业类型、行业性质关联预置数据，以及所有预置已存账套和所有预置操作员
	$.ajax({
	 	//url:"uaAccount!findAboutBySysManagerId.action", //?sysManagerId="+sysManagerId,
		url:'data/findAboutBySysManagerId.json',
	 	type:"get",
	 	success:function(data,status){
	 		
	 		//existed 已存账套
	 		var uaAccountList = data.uaAccountAboutData.uaAccountList;
	 		$("#existed").empty();//清空下拉列表
	 		$.each(uaAccountList,function(index,uaAccount){
	 			
	 			$("#existed")[0].options.add(new Option("["+uaAccount.caccId+"]"+uaAccount.caccName,uaAccount.caccId,false,false));
	 			
	 			//TODO 此处在出现浏览器兼容性问题时，尝试下面的方式
	 			//$("#existed").append("<option>["+uaAccount.caccId+"]"+uaAccount.caccName+"</option>");
	 		});
	 		
	 		//centtype_s 企业类型 centtype
	 		var entTypeList = data.uaAccountAboutData.entTypeList;
	 		$("#centtype_s").empty();//清空下拉列表
	 		$.each(entTypeList,function(index,entType){
	 			
	 			$("#centtype_s")[0].options.add(new Option(entType.entName,entType.entName,false,false));
	 			//TODO 此处在出现浏览器兼容性问题时，尝试下面的方式
	 			//$("#existed").append("<option>["+uaAccount.caccId+"]"+uaAccount.caccName+"</option>");
	 			if(entType.entName=="工业"){
	 				$('#centtype').val(entType.entName);
	 				$('#centtype_s').val(entType.entName);
	 			}
	 		});
	 		
	 		//ctradekind_s 行业性质 ctradekind
	 		var glBtradeList = data.uaAccountAboutData.glBtradeList;
	 		$("#ctradekind_s").empty();//清空下拉列表
	 		$.each(glBtradeList,function(index,glBtrade){
	 			
	 			$("#ctradekind_s")[0].options.add(new Option(glBtrade.ctradeName,glBtrade.ctradeName,false,false));
	 			
	 			//TODO 此处在出现浏览器兼容性问题时，尝试下面的方式
	 			//$("#existed").append("<option>["+uaAccount.caccId+"]"+uaAccount.caccName+"</option>");
	 		});
	 		$("#ctradekind").val(glBtradeList[0].ctradeName);
	 		ctradekind=glBtradeList[0].ctradeName;//默认将下拉表第1项值赋值给全局变量，用于弹出科目预览窗体调用查询
	 		
	 		//caccMaster_s 操作员 caccMaster
	 		var uaUserList = data.uaAccountAboutData.uaUserList;
	 		$("#caccMaster_s").empty();//清空下拉列表
	 		$.each(uaUserList,function(index,uaUser){
	 			
	 			//mod by lval 20130506
	 			//$("#caccMaster_s")[0].options.add(new Option("["+uaUser.cuserId+"]"+uaUser.cuserName,uaUser.cuserName,false,false));  
	 			$("#caccMaster_s")[0].options.add(new Option("["+uaUser.cuserId+"]"+uaUser.cuserName,uaUser.cuserId,false,false)); 
	 			
	 			//TODO 此处在出现浏览器兼容性问题时，尝试下面的方式
	 			//$("#existed").append("<option>["+uaAccount.caccId+"]"+uaAccount.caccName+"</option>");
	 		});
	 		//mod by lval 20130506
	 		//$("#caccMaster").val(uaUserList[0].cuserName);
	 		$("#caccMaster").val(uaUserList[0].cuserId);
	 	},
	 	dataType:"json",
	 	error:function(data,status){
	 		jAlert(data.message);
	 	}
	 });
	var date = ( new Date() || currentDate );
	
	//初始化会计期年
	$("#iyear").val(date.getFullYear());
	
	//初始化会计期月
	$("#imonth").val((date.getMonth()+1));

	//alert($("#centtype_s").val());
	$("#centtype").val($("#centtype_s").eq(0).val());
	$("#ctradekind").val($("#ctradekind_s").eq(0).val());
	$("#caccMaster").val($("#caccMaster_s").eq(0).val());
	/*
	jAlert($("#centtype_s").val());
	jAlert($("#ctradekind_s").val());
	jAlert($("#caccMaster_s").val());
	*/
}); 

//当行业性质下拉列表改变时：
function setCtradekindChange(){
	$('#ctradekind').val($('#ctradekind_s').val());
	ctradekind=$('#ctradekind_s').val();
	//$('#ctradekind_s').val()
	//jAlert(ctradekind);
}
//判断'启用会计期'里的年月是不是为空--不为空则弹出会计期间--李铭浩2012-12-04
//解决年月为空时,会计期间报错
function periodIsNull(){
	var iyear = $("#iyear").val();
	var imonth = $("#imonth").val();
	if (iyear == "" || iyear == null) {
		
		jAlert(str,"年度不能为空",function(){
			$("#iyear").focus();
		});

		
		return;
	}else if (imonth == "" || imonth == null) {
		
		

		jAlert(str,"月份不能为空",function(){
			$("#imonth").focus();
		});

		return;
	} else {
		accountPeriodClick();
	}
}
//弹出会计期间 ---康榕元
function accountPeriodClick(){
	window.parent.openWindow('accountPeriod');
	window.parent.document.getElementById("accountPeriod").getElementsByTagName("iframe")[0].contentWindow.document.getElementById("year").value = $("#iyear").val();
	window.parent.document.getElementById("accountPeriod").getElementsByTagName("iframe")[0].contentWindow.document.getElementById("month").value = $("#imonth").val();
	window.parent.document.getElementById("accountPeriod").getElementsByTagName("iframe")[0].contentWindow.refresh();
}

/**
 *构建会计期间
 */
function buildAccountPeriod(year){
	//要拼接的会计期间参数字符串
	var accountPeriod = "";
	
	/*默认填充12个期间的日期区间，每个月一个期间。*/
	//循环为日期表格填充行，每行代表一个月度
	for(var i=1;i<=12;i++){
		//填充日期需要知道三个值：年、月、月末日期，年已经有了，月需要转换成2位格式，月末日期需要通过判断年、月来获得
		
		//1.得到当前月(i)的最后一天的日期值(月末日期)
		var monthLastDay = null;
		if(i<8){
			//如果为2月
			if(i==2){
				//再判断平闰年
				//如果是闰年，2月份的天数为29天
				if(year%4==0 && year%100!=0 || year%400==0){
					monthLastDay=29;
				}else{
					monthLastDay=28;
				}
			}else{
				//判断是偶数月还是奇数月
				if(i%2==0){
					monthLastDay=30;
				}else{
					monthLastDay=31;
				}
			}
		}else{
			//8-12月份的奇数月是31天，偶数月是30天，与1-7月恰好相反
			if(i%2==0){
				monthLastDay=31;
			}else{
				monthLastDay=30;
			}
		}
		//格式化月到2位数
		var month = i.toString().length==1?"0"+i:i;

		var myStartDate = year+"-"+month+"-01";
		var myEndDate = year+"-"+month+"-"+monthLastDay;
		//var accountPeriod = "iid=01&dbegin=2012-02-01&dend=2012-02-29&";
		accountPeriod += "iid="+month+"&dbegin="+myStartDate+"&dend="+myEndDate+"&";
	}
	return accountPeriod;
}
function monthFunction(obj){
	var v=obj.value - 0;
	if(v>12 ||v < 0 || v != obj.value){
		jAlert("请输入正确月份");
	}
}