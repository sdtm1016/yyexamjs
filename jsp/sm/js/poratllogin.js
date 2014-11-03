var LOGINED_USERNAME=null;
var LOGINED_USERTYPE=null;
var loginName = null;
var accountList=null;
var uaAccount=null;



//取消登录,关闭窗体
function closeOpen(){
	window.location.href="../exam/index.html";
}
/**
 * 获取当前日期
 */
function getnowdate(){
	var nowdate=new Date();
	var year=nowdate.getFullYear();
	var month=(nowdate.getMonth()+1);
	var day=nowdate.getDate();
	if(month<10){
		month="0"+month;
	}
	if(day<10){
		day="0"+day;
	}
	var dateString = year+"-"+month+"-"+day;
	
	$("#operDate").val(dateString);
	
}









//当为操作员登录时获取账套
function queryAccount() {
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
};


//年度查询
function findAccountYear(){
	var selectedIndex = document.getElementById("accountName").selectedIndex;
	if(accountList!=null){
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
	}else{
		$("#accountYear").html("");
	}
}

//admin或账套主管登录
function doSubmit(){
	var user = $("form").serialize();
	//账套id
	var  accountId = $("#accountName").val();
	//年份
	var  yearName=$("#accountYear").find("option:selected").text();
	//操作日期
	var  operDate = $("#operDate").val();
	var param = "accountId=" + accountId +  "&yearName=" + yearName + "&operDate=" + operDate;
	if(accountId==null){
		return;
	}
	$.ajax({
		url:"login!truelogin?" + param,
		type:"post",
		success:function(data,status){
			if(data.mark=="0"){
				var t_year=data.acc_date.split("-")[0]-0;
				var t_month=data.acc_date.split("-")[1]-0;
				var o_year=operDate.split("-")[0]-0;
				var o_month=operDate.split("-")[1]-0;
				if(t_year==o_year&&o_month>=t_month){
					window.location.href="../portal/index.html";
				}else{
					jAlert("登录日期错误，请选择日期");
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
	 //登陆成功后 由后台已经回写cookie
	 
	
	 
}

/**
 * 设置cookie值(已废弃，改为由后台回写cookie)
 */
function setCookie(data) {
	
	//账套
	  accountId = $("#accountName").val();
	  accountName=$("#accountName").find("option:selected").text();
	  jAlert(accountName);
	  theCookie = "accountName" +"="+accountName ;
	 document.cookie = theCookie;
	
	//年份
	  yearId = $("#accountYear").val();
	  yearName=$("#accountYear").find("option:selected").text();
	 theCookie = "yearName" +"="+yearName ;
	 document.cookie = theCookie;
	 
	 //用户信息
	  userId = data.uaUser.id;
	 theCookie = "userId" +"="+userId ;
	 document.cookie = theCookie;
	 
	  userCode = data.uaUser.cuserId;
	 theCookie = "userCode" +"="+userCode ;
	 document.cookie = theCookie;
	 
	  userName = data.uaUser.cuserName;
	 theCookie = "userName" +"="+userName ;
	 document.cookie = theCookie;
	 
	 //操作日期
	  operDate = $("#operDate").val();
	 theCookie = "operDate" +"="+operDate ;
	 document.cookie = theCookie;
	 jAlert(document.cookie);

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

	
winui.onDOMContentLoaded(function(){
	

	getnowdate();
	
	//获取服务器名
	$.ajax({
		url:"login!computerName.action",
		type:"post",
		success:function(data,status){
			var computerName=data.computerName;
			$("#computer").val(computerName); 
		},
		dataType:"json"
	});
	
	$("#loginName").focus();
	
});

