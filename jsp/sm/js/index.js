
	function setSystemConsoleWindowZindex(){
		document.getElementById("system_console").style.zIndex=-100;
		
		setTimeout(setSystemConsoleWindowZindex,10);
	}



	//当点击下拉菜单项时候出发显示窗体的函数
	function showWindow(event,win_id) {
		
		var evt = (window.event || event);//获得事件
		var menu_a = (evt.srcElement || evt.target);

		//判断该菜单是否被禁用，如果没被禁用则显示弹出窗体
		if(menu_a.style.visibility=="visible"){
			
			openWindow(win_id);
			setSystemConsoleWindowZindex();
			
		}
	}
	
	
	
	
	
	//关闭窗体方法  ----康
	function exit(event){
		var item =document.getElementById("注册(R)");
		if(item.style.visibility==""){
			loginOut(event);
		}
		window.location.href="../exam/index.html";
	}

	//登录成功注册函数
	function reg(userName,userType) {


		//关闭窗体：
		//document.getElementById("register").style.display = "none";
		closeWindow("register");
		
		
		//注册信息表里增加一条登录信息
		var lit = document.getElementById("logined_info_table");

		var lrow = lit.insertRow(1);
		lrow.style.backgroundColor="#fff";
		
		var lcell1 = lrow.insertCell(0);
		lcell1.innerHTML = "控制台";
		
		var lcell2 = lrow.insertCell(1);
		
		lcell2.innerHTML = "CAITIANQI";
		
		var lcell3 = lrow.insertCell(2);
		lcell3.innerHTML = "正常(1)";
		
		
		var myDates = new Date();
		var lcell4 = lrow.insertCell(3);
		lcell4.innerHTML =myDates.format("yyyy-MM-dd hh:mm:ss");
		
		//account_info_header
		
		//账套信息表初始化（表头：账套号/年度/操作员/执行功能）
		var aitr = document.getElementById("account_info").rows[0];
		aitr.cells[0].innerHTML="账套号";
		aitr.cells[1].innerHTML="年度";
		aitr.cells[2].innerHTML="操作员";
		aitr.cells[3].innerHTML="执行功能";
		
		//状态栏中括显示相关内容
		var statusbar = document.getElementById("statusbar").rows[0];
		statusbar.cells[0].innerHTML="操作员["+userName+"]";
		$.ajax({
			url:"login!computerName.action",
			type:"post",
			success:function(data,status){
				var computerName=data.computerName;
				statusbar.cells[1].innerHTML="服务器["+computerName+"]";
			},
			dataType:"json"
		});
		
		var myDate = new Date();
		statusbar.cells[2].innerHTML=myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
		
		
		
		//启用和禁用相关菜单项

		//系统管理员
		if (userType == 1) {
			
			enableMenu("系统(S)",true);
				enableMenu("注册(R)",false);
				enableMenu("注销(U)",true);
				enableMenu("退出(X)",true);
			
			enableMenu("账套(A)",true);
				enableMenu("建立(C)",true);
				enableMenu("修改(E)",false);
				enableMenu("启用(S)",false);
				enableMenu("删除账套",true);
			
			enableMenu("权限(O)",true);
				enableMenu("操作员",true);
				enableMenu("权限",true);
			
			enableMenu("视图(V)",true);
				enableMenu("刷新",true);			
		}

		//账套主管
		if (userType == 2) {

			enableMenu("系统(S)",true);
				enableMenu("注册(R)",false);
				enableMenu("注销(U)",true);
				enableMenu("退出(X)",true);
			
			enableMenu("账套(A)",true);
				enableMenu("建立(C)",false);
				enableMenu("修改(E)",true);
				enableMenu("启用(S)",true);
				enableMenu("删除账套",false);
			
			enableMenu("权限(O)",true);
				enableMenu("操作员",false);
				enableMenu("权限",true);
			
			enableMenu("视图(V)",true);
				enableMenu("刷新",true);
			
		}

		

	}

	//关闭注册窗体
	function closeRegWin(){
		//关闭窗体：
		//document.getElementById("register").style.display = "none";
		closeWindow("register");

	}
	

	//关闭注册窗体
	function closeAuthWin(){
		//关闭窗体：
		//document.getElementById("auth").style.display = "none";
		closeWindow("auth");

	}
	
	function menuMouseover(){
		var evt = (window.event || arguments[0]);//获得事件
		var menu_a = (evt.srcElement || evt.target);
		menu_a.style.color="#fff";
		menu_a.style.backgroundColor="#0A246A";
	}
	
	
	function menuMouseout(){
		var evt = (window.event || arguments[0]);//获得事件
		var menu_a = (evt.srcElement || evt.target);
		menu_a.style.color="#000";
		menu_a.style.backgroundColor="#D4D0C8";
	}
	
	
	function enableMenu(text,flag) {
		
		//获得菜单项div
		var item =document.getElementById(text);
		//根据boolean意思启用和禁用菜单项
		if(flag){

			//启用
			item.style.color="#000";
			item.style.visibility="visible";
			
			if(item.parentNode.className=="DreamMenu"){
				item.onmouseover=menuMouseover;
				
				item.onmouseout=menuMouseout;
				
			}
			
		}else{
			
			//禁用
			item.style.color="#888";
			item.style.visibility="";
			
			if(item.parentNode.className=="DreamMenu"){
				item.onmouseover=function(){
					
					var evt = (window.event || arguments[0]);//获得事件
					var menu_a = (evt.srcElement || evt.target);
					menu_a.style.color="#888";
					menu_a.style.backgroundColor="#0A246A";
				};
				
				item.onmouseout=function(){
					
					var evt = (window.event || arguments[0]);//获得事件
					var menu_a = (evt.srcElement || evt.target);
					menu_a.style.color="#888";
					menu_a.style.backgroundColor="#D4D0C8";
				};
			}
			
			
		}
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	

	function init(){

		enableMenu("系统(S)",true);
			enableMenu("注册(R)",true);
			enableMenu("注销(U)",false);
			enableMenu("退出(X)",true);
		
		enableMenu("账套(A)",false);
			enableMenu("建立(C)",false);
			enableMenu("修改(E)",false);
			
		enableMenu("权限(O)",false);
			enableMenu("操作员",false);
			enableMenu("权限",false);
		
		enableMenu("视图(V)",true);
			enableMenu("刷新",true);
			
			//状态栏中括显示相关内容
			var statusbar = document.getElementById("statusbar").rows[0];
			statusbar.cells[0].innerHTML="操作员[]";
			statusbar.cells[1].innerHTML="服务器[]";
			//document.getElementById("logined_info_table").deleteRow(1);
	}
	
	
	
	
	
	
	/*
	
	
	//关闭window div函数，传入windowdiv的id值
	window.closeWindow = function(windowId){
		
		document.getElementById(windowId).style.display="none";
		
	};
	*/
	
	/**
	 *说明：此函数用于点击下拉菜单项后根据被点击项的状态和属性来决定是否隐藏所在菜单表
	 *当菜单项为弹出窗体时，该函数用于执行弹出窗体函数的后面，否则则放在要执行的程序函数的前面
	 *
	 */
	function hiddenMenuList(event){
		
		var evt = (window.event || event);//获得事件
		var menu_a = (evt.srcElement || evt.target);
		//如果不是
		if(menu_a.style.color!="#888" && menu_a.style.visibility!="" && menu_a.tagName=="A"){

			menu_a.parentNode.style.display = "none";
		}
		
		
	}
	
	
	//注销特殊函数
	function loginOut(event){
		var evt = (window.event || event);//获得事件
		var menu_a = (evt.srcElement || evt.target);
		//如果不是
		if(menu_a.style.color!="#888" && menu_a.style.visibility!="" && menu_a.tagName=="A"){
			document.getElementById("logined_info_table").deleteRow(1);
			if(document.getElementById('注册(R)').style.visibility!="visible"){
				document.getElementById('register').getElementsByTagName('iframe')[0].contentWindow.loginOut(event);
			}
			init();
			menu_a.parentNode.style.display = "none";
		}
		
	}
	
	
	
	
	
	
	
	
	
	
	
	//TODO 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	/***
	 *
	 * 菜单点击等效果代码
	 *
	 */

	//当前选中状态的菜单对象
	var CURRENT_SELECTED_MENU = null;
	var CURRENT_MOUSEOVER_MENU = null;
	
	
	
	function set_current_mouseout_menu(obj) {

		if (CURRENT_SELECTED_MENU != obj && CURRENT_MOUSEOVER_MENU != obj) {
			CURRENT_MOUSEOVER_MENU.className = "flms";
		}

		if (CURRENT_MOUSEOVER_MENU != null && CURRENT_SELECTED_MENU != null) {
			CURRENT_MOUSEOVER_MENU.className = "flms";
		}
		CURRENT_MOUSEOVER_MENU = obj;

	}

	function set_current_mouseover_menu(obj) {
		if (CURRENT_MOUSEOVER_MENU != null && CURRENT_SELECTED_MENU != null) {
			CURRENT_MOUSEOVER_MENU.className = "flms";
		}
		CURRENT_MOUSEOVER_MENU = obj;

	}

	function show_menu(obj) {
		
		//alert(obj.style.visibility+"");
		//判断该菜单是否被禁用，如果被禁用则不显示其子菜单列表
		if(obj.style.visibility=="visible"){
			var menu_div = obj.parentNode.getElementsByTagName("div")[0];
			//menu_div.className="DreamMenu";
			//menu_div.style.position="absolute";

			if (CURRENT_SELECTED_MENU != null) {
				CURRENT_SELECTED_MENU.style.display = "none";
				CURRENT_SELECTED_MENU.parentNode.getElementsByTagName("span")[0].className = "flms";
			}
			menu_div.style.marginTop = "0px";
			//menu_div.style.marginLeft = "0px";
			menu_div.style.display = "block";
			CURRENT_SELECTED_MENU = menu_div;
		}
		

		
	}

	function hidden_current_menu() {
		var evt = (window.event || arguments[0]);
		var evtsrc = (evt.srcElement || evt.target);
		try {
			if (CURRENT_SELECTED_MENU != null
					&& evtsrc.parentNode.className != "DreamMenu"
					&& evtsrc.parentNode.getElementsByTagName("div")[0].className != "DreamMenu") {
				CURRENT_SELECTED_MENU.style.display = "none";
				CURRENT_SELECTED_MENU.parentNode.getElementsByTagName("span")[0].className = "flms";
			}
		} catch (e) {
			if (CURRENT_SELECTED_MENU != null) {
				CURRENT_SELECTED_MENU.style.display = "none";
				CURRENT_SELECTED_MENU.parentNode.getElementsByTagName("span")[0].className = "flms";
			}
		}
	}
	
	
	
	
	
	
	
	
	
	//TODO 
	
	
	
	
	

	//初次加载页面时，对页面元素及数据做一些初始化设置：
	onDOMContentLoaded(function(){


		if (window.attachEvent) {
			document.attachEvent("onclick", hidden_current_menu);
		} else if (window.addEventListener) {
			document.addEventListener("click", hidden_current_menu, false);
		} else {
			//...
		}
		
		
		
		
		
		
		
		
		//初始化菜单项：
		var mis = document.getElementById("menubar").getElementsByTagName("a");
		for(var i=0;i<mis.length;i++){
			
			mis[i].href="javascript:;";
			//将菜单文本作为菜单项的id并去掉文本内容左右的空格
			mis[i].id=mis[i].innerHTML.replace(/(^\s*)|(\s*$)/g,"");

			mis[i].onmouseover=menuMouseover;
			
			mis[i].onmouseout=menuMouseout;
			
			
		}
		
		
		
		//设定状态来时间
		var myDate = new Date();
		document.getElementById("statusbar").rows[0].cells[2].innerHTML=myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
		
		
		init();
		//openWindow('system_console');
	});

	

	
	