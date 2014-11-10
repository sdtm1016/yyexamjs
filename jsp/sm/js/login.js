var LOGINED_USERNAME=null;
var LOGINED_USERTYPE=null;
var loginName = null;
var accountList=null;
var uaAccount=null;

//取消登录,关闭窗体
function closeOpen(){
	$.ajax({
		url:"login!loginOut.action",
		type:"post",
		success:function(data,status){
			window.parent.closeRegWin();	
		},
		dataType:"json"
	});
}

//获取服务器名
$(document).ready(function(){
	$.ajax({
		url:"login!computerName.action",
		type:"post",
		success:function(data,status){
			var computerName=data.computerName;
			$("#computer").val(computerName); 
		},
		dataType:"json"
	});

//admin与操作员切换
	$("input[name='uaUser.cuserId']").focusout(function() {
		loginName=$(this).attr("value");
	     	 if(loginName=="admin"){
	     		 $("#account").hide();
	     		 $("#year").hide();	
				 $("#click1").show();
	     		 $("#click2").show();
				 $("#click3").show();
				 LOGINED_USERTYPE=1; 		
	     	 }else{
	     		 $("#account").show();
	     		 $("#year").show();
				 $("#click1").hide();
	     		 $("#click2").hide();
				 $("#click3").hide();	
				 LOGINED_USERTYPE=2;
	     	 }
		LOGINED_USERNAME=loginName;
	}); 
	
//当为操作员登录时获取账套
	$("input[name='uaUser.cpassword']").focusout(function() {
		if(loginName=="admin"){
			return false;
		}
		var user = $("form").serialize();
				$("#accountName").html("");
				$.ajax({
					url:"login!login.action",
					type:"post",
					success:function(data,status){
		 			 	if(data.mark=="0"){//登录成功
		 			 		if(data.uaUser!=null&&data.uaUser.cuserId!="admin"){
						 		LOGINED_USERNAME=data.uaUser.cuserName;
						 		LOGINED_USERTYPE=2;
						 	}
			 			 	accountList=data.uaAccountList;
			 			 	if(accountList!=null&&accountList.length!=0){
			 			 		for(var i=0;i<accountList.length;i++){
							 		$("#accountName").append("<option value="+accountList[i].id+">"+"["+accountList[i].caccId+"]"+accountList[i].caccName+"</option>"); 
				 			 	}
			 			 		findAccountYear();
			 			 	}
		 			 		
		 			 	}else if(data.mark=="1"){//登录失败
		 			 		jAlert("账号或密码错误请重新输入");
		 			 	}else if(data.mark=="3"){
		 			 		jAlert("该账号未启用");
		 			 	}		 		
					 },
				 	dataType:"json",
				 	data:user				
				 });
		
	});
});
//年度查询
function findAccountYear(){
												
	var selectedIndex = document.getElementById("accountName").selectedIndex;
	
	uaAccount = accountList[selectedIndex];
	$("#accountYear").html("");
	var year = $("form").serialize();
	var accountId=$("#accountName").val();
	 $.ajax({
	 	url:"login!findAccountYear.action?uaAccount.id="+accountId,
	 	type:"post",
	 	success:function(data,status){
	 		if(data.uaAccountYearList!=null){
	 			for(var j=0;j<data.uaAccountYearList.length;j++){
	 				$("#accountYear").append("<option value="+data.uaAccountYearList[j].id+">"+data.uaAccountYearList[j].caccYear+"</option>");
	 			}
	 		}
	 	},
	 	dataType:"json",
		 	data:year
	 });
	 
}

//admin或账套主管登录
function doSubmit(){
	if(LOGINED_USERNAME=="admin"){
		if($("input[name='uaUser.cpassword']").val()!=null&&$("input[name='uaUser.cpassword']").val()!=""){
			jAlert("密码错误！");
			return;
		}else{
			setCookie();
			window.parent.updateScore('2-1',0);
			window.parent.reg(LOGINED_USERNAME,LOGINED_USERTYPE);
		}
	}else{
		if(LOGINED_USERNAME!=null&&LOGINED_USERNAME!=""){
			var user = $("form").serialize();
			//账套id
			var  accountId = $("#accountName").val();
			//年份
			var  yearName=$("#accountYear").find("option:selected").text();
			var param = "accountId=" + accountId +  "&yearName=" + yearName;
			if(accountId==null){
				return;
			}
			$.ajax({
				url:"login!truelogin?"+param,
				type:"post",
				success:function(data,status){
					if(data.mark=="0"){
						window.parent.reg(LOGINED_USERNAME,LOGINED_USERTYPE);
					}else if(data.mark=="1"){//登录失败
						jAlert("账号或密码错误请重新输入");
	 			 	}else if(data.mark=="3"){
	 			 		jAlert("该账号未启用");
	 			 	}
				},
			 	dataType:"json",
			 	data:user				
			 });
		}
	}
	
}
 
//注销
function loginOut(){
	$.ajax({
		url:"login!loginOut.action",
		type:"post",
		success:function(data,status){
			return true;			
			
		},
		error:function(data,status){
			return false;		
		},
		dataType:"json"
	});
}
/**
 * 设置cookie值
 */
function setCookie() {
	 userCode = $("#loginName").val();
	 theCookie = "userCode" +"="+userCode ;
	 document.cookie = theCookie;
}	



























