


/*********     顶部下拉菜单相关业务：     **********/

//模拟服务端返回菜单集合数据
function getServerMenuData(){
	
var data = {};
var menuList = [];
var fa_menu_left=0;//固定资产菜单位置
var menu1 = {};
menu1.id="1";
menu1.parentId="-1";
menu1.name="总账系统";
menu1.url="GL.html";
menu1.onclick="";
menu1.module="GL";
menuList[menuList.length]=menu1;
	
	
	var menu2 = {};
	menu2.id="2";
	menu2.parentId="1";
	menu2.name="设置";
	menu2.url="1-1.html";
	menu2.onclick="alert('设置');";
	menuList[menuList.length]=menu2;
	
	
	var menu3 = {};
	menu3.id="3";
	menu3.parentId="1";
	menu3.name="凭证";
	menu3.url="1-2.html";
	menu3.onclick="alert('凭证');";
	menuList[menuList.length]=menu3;
	
		/*
		var menu4 = {};
		menu4.id="4";
		menu4.parentId="3";
		menu4.name="1.2.1";
		menu4.url="1-2-1.html";
		menu4.onclick="alert('1.2.1');";
		menuList[menuList.length]=menu4;
		
		
		var menu5 = {};
		menu5.id="5";
		menu5.parentId="3";
		menu5.name="1.2.2";
		menu5.url="1-2-21-html";
		menu5.onclick="alert('1.2.2');";
		menuList[menuList.length]=menu5;
		*/
	
	var menu6 = {};
	menu6.id="6";
	menu6.parentId="1";
	menu6.name="账薄查询";
	menu6.url="1-3.html";
	menu6.onclick="alert('账薄查询');";
	menuList[menuList.length]=menu6;
	

	var menu7 = {};
	menu7.id="7";
	menu7.parentId="1";
	menu7.name="辅助查询";
	menu7.url="1-4.html";
	menu7.onclick="alert('辅助查询');";
	menuList[menuList.length]=menu7;


var menu8 = {};
menu8.id="8";
menu8.parentId="-1";
menu8.name="工资";
menu8.url="WA.html";
menu8.onclick="";
menu8.module="WA";
menuList[menuList.length]=menu8;


	var menu9 = {};
	menu9.id="9";
	menu9.parentId="8";
	menu9.name="工资级别";
	menu9.url="2-1.html";
	menu9.onclick="alert('工资级别');";
	menuList[menuList.length]=menu9;

	
	var menu10 = {};
	menu10.id="10";
	menu10.parentId="8";
	menu10.name="设置";
	menu10.url="2.2.html";
	menu10.onclick="alert('设置');";
	menuList[menuList.length]=menu10;

	
	var menu11 = {};
	menu11.id="11";
	menu11.parentId="8";
	menu11.name="业务处理";
	menu11.url="2.3.html";
	menu11.onclick="alert('业务处理');";
	menuList[menuList.length]=menu11;

		/*
		var menu12 = {};
		menu12.id="12";
		menu12.parentId="11";
		menu12.name="2.3.1";
		menu12.url="2.3.1.html";
		menu12.onclick="alert('2.3.1');";
		menuList[menuList.length]=menu12;

			
			var menu13 = {};
			menu13.id="13";
			menu13.parentId="12";
			menu13.name="2.3.1.1";
			menu13.url="2.3.1.1.html";
			menu13.onclick="alert('2.3.1.1');";
			menuList[menuList.length]=menu13;
	
				
				var menu14 = {};
				menu14.id="14";
				menu14.parentId="13";
				menu14.name="2.3.1.1.1";
				menu14.url="2.3.1.1.1.html";
				menu14.onclick="alert('2.3.1.1.1');";
				menuList[menuList.length]=menu14;
				
					
					var menu15 = {};
					menu15.id="15";
					menu15.parentId="14";
					menu15.name="2.3.1.1.1.1";
					menu15.url="2.3.1.1.1.1.html";
					menu15.onclick="alert('2.3.1.1.1.1');";
					menuList[menuList.length]=menu15;

					
					var menu16 = {};
					menu16.id="16";
					menu16.parentId="14";
					menu16.name="2.3.1.1.1.2";
					menu16.url="2.3.1.1.1.2.html";
					menu16.onclick="alert('2.3.1.1.1.2');";
					menuList[menuList.length]=menu16;
					
				
				var menu17 = {};
				menu17.id="17";
				menu17.parentId="13";
				menu17.name="2.3.1.1.2";
				menu17.url="2.3.1.1.2.html";
				menu17.onclick="alert('2.3.1.1.2');";
				menuList[menuList.length]=menu17;
*/
	
	var menu18 = {};
	menu18.id="18";
	menu18.parentId="8";
	menu18.name="统计分析";
	menu18.url="2.4.html";
	menu18.onclick="alert('统计分析');";
	menuList[menuList.length]=menu18;
	

var menu19 = {};
menu19.id="19";
menu19.parentId="-1";
menu19.name="采购";
menu19.url="PU.html";
menu19.onclick="";
menu19.module="PU";
menuList[menuList.length]=menu19;

	
	var menu20 = {};
	menu20.id="20";
	menu20.parentId="19";
	menu20.name="期初记账";
	menu20.url="3-1.html";
	menu20.onclick="alert('期初记账');";
	menuList[menuList.length]=menu20;
	
	
	var menu21 = {};
	menu21.id="21";
	menu21.parentId="19";
	menu21.name="采购发票";
	menu21.url="3.2.html";
	menu21.onclick="alert('采购发票');";
	menuList[menuList.length]=menu21;

var menu22 = {};
menu22.id="22";
menu22.parentId="-1";
menu22.name="财务报表";
menu22.url="MR.html";
menu22.onclick="openWindow('MR_report');";
menu22.module="MR";
menuList[menuList.length]=menu22;


var menu23 = {};
menu23.id="23";
menu23.parentId="-1";
menu23.name="销售";
menu23.url="SA.html";
menu23.onclick="";
menu23.module="SA";
menuList[menuList.length]=menu23;


var menu24 = {};
menu24.id="24";
menu24.parentId="-1";
menu24.name="固定资产";
menu24.url="FA.html";
menu24.onclick="";
menu24.module="FA";
menuList[menuList.length]=menu24;




/*
var menu22 = {};
menu22.id="22";
menu22.parentId="-1";
menu22.name="测测测测测";
menu22.url="4.html";
menu22.onclick="";
menu22.module="PU";
menuList[menuList.length]=menu22;

var menu23 = {};
menu23.id="23";
menu23.parentId="-1";
menu23.name="测";
menu23.url="5.html";
menu23.onclick="";
menu23.module="PU";
menuList[menuList.length]=menu23;

var menu24 = {};
menu24.id="24";
menu24.parentId="-1";
menu24.name="测测测";
menu24.url="6.html";
menu24.onclick="";
menu24.module="PU";
menuList[menuList.length]=menu24;


var menu25 = {};
menu25.id="24";
menu25.parentId="-1";
menu25.name="测测测";
menu25.url="7.html";
menu25.onclick="";
menu25.module="PU";
menuList[menuList.length]=menu25;


var menu26 = {};
menu26.id="24";
menu26.parentId="-1";
menu26.name="测测测";
menu26.url="8.html";
menu26.onclick="";
menu26.module="PU";
menuList[menuList.length]=menu26;
		

var menu27 = {};
menu27.id="24";
menu27.parentId="-1";
menu27.name="测测测";
menu27.url="9.html";
menu27.onclick="";
menu27.module="PU";
menuList[menuList.length]=menu27;



var menu28 = {};
menu28.id="24";
menu28.parentId="-1";
menu28.name="测测测";
menu28.url="10.html";
menu28.onclick="";
menu28.module="PU";
menuList[menuList.length]=menu28;

*/

data.menuList=menuList;

return data;
}







/***
 * 根据父菜单ID递归组装子菜单函数
 * 
 * 拼装如下结构(jquery easyui menu)：
 * <span onclick="javascript:$('#menu_setting').menu('show',{left:50,top:25})">
 * 	基础设置
 * </span>
 * <div id="menu_setting" class="easyui-menu" style="width:120px;">
 * 
 * 	<div>
 * 		<span>机构设置</span>
 * 
 * 		<div style="width:150px;">
 * 			<div>
 * 				<span>部门档案</span>
 * 			</div>
 * 			<div>
 * 				<span>职员档案</span>
 * 			</div>
 * 		</div>
 * 
 * 	</div>
 * 
 * </div>
 * 
 * @param menuList
 * @param parentId
 * @returns {String}
 */
function incbuild(menuList,parentId){
	var menuString = "";
	var ml = menuList;
	for(var i=0;i<ml.length;i++){
		if(ml[i].parentId==parentId){
			
			menuString += "\n";
			menuString += "	<div onclick=\""+ml[i].onclick+"\">";
			menuString += "		<span>"+ml[i].name+"</span>";
			
			//如果当前菜单有子菜单则递归调用本函数：
			var hasChild = false;
			for(var j=0;j<ml.length;j++){
				if(ml[j].parentId==ml[i].id){
					hasChild = true;
					break;
				}
			}
			if(hasChild){
				menuString += "		<div>";
				menuString += incbuild(ml,ml[i].id);
				menuString += "		</div>";
			}
			menuString += "	</div>";
			menuString += "\n";
			
		}
	}
	return menuString;
}






	/**
	 * 把cookie值写入html对应位置中
	 */
	function cookieSetHtml() {
		//alert(document.cookie);
		var accountName = getCookie("accountName");
		var userCode = getCookie("userCode");
		var userName = getCookie("userName");
		var operDate = getCookie("operDate");
		var iyear = getCookie("yearName");//账套会计年度
		
		//当前时间处理
		var today = new Date();
		var hr = today.getHours();
		var min = today.getMinutes();
		if (hr<=9) hr = "0" + hr;
		if (min<=9) min = "0" + min;
		var loginTime = hr + ":" + min;
		
		
		document.getElementById("account").innerHTML = "账套：" + accountName;
		document.getElementById("org").innerHTML = "单位名称：" ;		
		document.getElementById("user").innerHTML = "操作员：" + userCode + "(" + userName + ")"; 
		document.getElementById("operDate").innerHTML = "业务日期:" + "[" + operDate + "]"; 
		document.getElementById("loginTime").innerHTML = loginTime; 
	   	
		 //设置全局变量   在variables.js 中   add by lval  20130615  可以通过类似 window.parent.parent.login_iperiod 来使用
		 //--------begin--------
		 login_accid= getCookie("accid");  //当前登陆账套
		 login_iperiod=getCookie("iperiod"); //当前登陆期间
		 login_userid=userCode; //当前登陆操作员
		 login_operdate=operDate;//当前登陆业务操作时间
		 login_iyear = iyear;//当前登陆账套会计年度
		 //--------end--------
		
	}
  
	  
	//命令右侧frame里的页面弹出窗体函数，rfow = Right frame open window
	function rfow(){
		var rhtifr = document.getElementById("rightiframe").contentWindow;
		try{
			if (arguments.length == 1) {
				rhtifr.openWindow(arguments[0]);
			}
			if (arguments.length == 2) {
				rhtifr.openWindow(arguments[0],arguments[1]);
			}
			if (arguments.length == 3) {
				rhtifr.openWindow(arguments[0],arguments[1],arguments[2]);
			}
		}catch(e){}
	}


	//取得右边iframe的window对象
	function getModelFrame(){
		return document.getElementById("rightiframe").contentWindow;
	}







//$(document).ready(function() {
//	
//	
//	/********* 拼装顶部下拉菜单HTML字符串： **********/
//	
//	//模拟请求服务器，取得菜单集合数据
//	var data = getServerMenuData();
//	
//	
//	
//	
//	
//	var ml = data.menuList;
//	
//	//l1ms用于存储所有一级菜单
//	var l1ms = [];//level 1 menus
//	
//	//取出所有一级菜单拼装一级菜单HTML字符串，并调用子菜单拼装函数拼装其子菜单
//	var menuHTMLString = "";
//	
//	//初始left=容器padding-left的值+(“文件”菜单两字的宽度+容器padding-left和padding-right)+(“基础设置”菜单两字的宽度+容器padding-left和padding-right)+4个像素的偏移值
//	var left=16+(12*2+5*2)+(12*4+5*2)+4;
//	
//	for(var i=0;i<ml.length;i++){
//		
//		//如果是一级菜单（一级菜单的父菜单ID为-1）
//		if(ml[i].parentId=="-1"){
//			
//			//将一级菜单添加进一级菜单数组
//			l1ms[l1ms.length]=ml[i];
//			
//			//避开财务报表
//			if(ml[i].module!="MR"){
//				
//				//拼装一级菜单开始HTML字符串(l1ss = level 1 string)
//				var l1s = "";
//				l1s += "<div onclick=\"javascript:$('#menu_"+ml[i].name+"').menu('show',{left:"+left+",top:25});toPage('"+ml[i].module+"','"+ml[i].url+"');"+ml[i].onclick+"\">";
//				l1s += ml[i].name;
//				l1s += "</div>";
//				l1s += "<div id=\"menu_"+ml[i].name+"\" class=\"easyui-menu\">";
//				var childs = incbuild(ml,ml[i].id);//调用递归函数拼装子菜单
//				l1s += childs;
//				l1s += "</div>";
//				
//				//每个菜单字符串拼装后，都修改当前left值为加上刚追加的菜单的宽度
//				left=left+(12*ml[i].name.length+5*2);
//				
//				menuHTMLString+=l1s;
//				
//			}
//			
//		}
//	}
//	
//	/**
//	 * 将“窗口”菜单追加到菜单最后面
//	 * 为什么“文件”、“基础设置”菜单直接放在页面里，而“窗口”菜单却用JS来拼装？
//	 * 因为“文件”、“基础设置”菜单都不需要设置left和top定位，其他菜单都得动态设置其left和top，包括“窗口”菜单
//	 * */
//	menuHTMLString += "<div onclick=\"javascript:$('#menu_window').menu('show',{left:"+left+",top:25})\">";
//	menuHTMLString += "窗口";
//	menuHTMLString += "</div>";
//	menuHTMLString += "<div id=\"menu_window\" class=\"easyui-menu\">";
//	menuHTMLString += "	<div>";
//	menuHTMLString += "		<span>注销</span>";
//
//	//根据查询到的有权限模块将模块的注销菜单填进“窗口”菜单的注销菜单下
//	if(l1ms.length>0){
//		menuHTMLString += "<div>";
//		for(var i=0;i<l1ms.length;i++){
//
//			menuHTMLString += "	<div onclick=\""+l1ms[i].onclick+"\">";
//			menuHTMLString += "		<span>"+l1ms[i].name+"</span>";
//			menuHTMLString += "	</div>";
//		}
//		menuHTMLString += "</div>";
//	}
//	
//	
//
//	menuHTMLString += "	</div>";
//	menuHTMLString += "</div>";
//	
//	//document.write(menuHTMLString);
//	
//	//将生成的JS代码填充进菜单条
//	//var menubar = document.getElementById("header");
//	//menubar.innerHTML=menubar.innerHTML+menuHTMLString;
//
//
//
//
//
//
//
//
//
//	/********* 拼装左侧导航菜单HTML字符串： **********/
//
//
//	//将所有一级菜单拿出来循环显示到左侧容器：
//	//left navigator image string
//	var leftnav = document.getElementById("leftnav");
//	var imgnavstr =""; 
//	for(var i=0;i<l1ms.length;i++){
//		var lnis = "<img id=\""+l1ms[i].module+"\" src=\"../../images/portal/CTree/sysButton/"+l1ms[i].module+".jpg\" style=\"width:159px;height:30px;border:0px;\" onmouseover=\"this.src='../../images/portal/CTree/sysButton/"+l1ms[i].module+"Move.jpg'\" onmouseout=\"this.src='../../images/portal/CTree/sysButton/"+l1ms[i].module+".jpg'\" onclick=\"toPage('"+l1ms[i].module+"','"+l1ms[i].url+"');"+l1ms[i].onclick+"\"/>";
//		imgnavstr += lnis;
//	}
//	
//	leftnav.innerHTML = imgnavstr;
//	//document.write(imgnavstr);
//	
//
//});


	
	
	
$(document).ready(function() {
	
	
	
	$.ajax({
		//url: "login!queryEnableModule.action",
		url: "data/queryEnableModule.json",
		type: 'post',
		dataType: "json",
		success: function(data){
			var ml = data.enableModuleList.toString();
			var left = 112;//“文件”和“基础设置”的宽度和
			//var store = [];//模块按一定展示顺序排序

			/*if(ml.indexOf("GL")!=-1){
				store[store.length] = "GL";	
				store[store.length] = "MR";	
			}

			if(ml.indexOf("WA")!=-1){
				store[store.length] = "WA";	
			}

			if(ml.indexOf("FA")!=-1){
				store[store.length] = "FA";	
			}

			if(ml.indexOf("GX")!=-1){
				store[store.length] = "PU";	
				store[store.length] = "SA";	
			}*/
			
			var store=['GL','MR','WA','FA','PU','SA'];

			var mcec = new hashMap();//Model click excute code map.
			
			for(var i=0;i<store.length;i++){
				var mn = store[i];
				
				$("#"+mn).parent().show();
				
				//IE7兼容解决思路：
				//在循环内为每个模块生成一级菜单点击事件要执行的源码字符串，存放进Map，然后点击后使用eval函数执行字符串。
				var ec="";
				if(mn=="FA"||mn=="MR"){
					ec = ""+mn.toLowerCase()+"_navigation_filter()"+";";
					fa_menu_left=left;
				}else{
					ec = "if("+mn.toLowerCase()+"_navigation_filter())"+"$(\"#menu_"+mn+"\").menu(\"show\",{left:"+left+",top:25});";
				}
				
				mcec.put(mn,ec);
				
				$("#M_"+mn)[0].onclick=function(){
					var mId = $(this).attr("id");
					mId = mId.substring(2,mId.length);
					eval(mcec.get(mId));
				};
				$("#M_"+mn).show();
				
				left = left + $("#M_"+mn).html().length*12+5*2;//名称长度*12像素宽+容器两边padding宽
			}
			
			$("#M_WD")[0].onclick=function(){
				eval("$('#menu_WD').menu('show',{left:" + left + ",top:25});");
			};
			
			
		}
	  });
	
});












//模块的登录(login)与注销(logout)：
//1.创建一个map对象记录模块的登录和注销等状态值，初始化都为0未登录
//2.当点击模块导航（左侧导航或顶部一级菜单）执行toPage函数时，修改map里相应模块的登录状态值为1（或其他）已登录，同时赋予该模块导航的右键注销菜单
//3.当右键点击注销时，执行module_logout注销函数，修改map里状态值并判断是否是当前打开的模块，如果是，rightiframe跳转到default.html
//4.
//5.


//hashMap数据结构
function map(){
	var map = {
			put 	 : function(key,value){this[key] = value;},
			get 	 : function(key){return this[key];},
			contains : function(key){return this.get(key) == null?false:true;},
			remove 	 : function(key){delete this[key];}
			};
	return map;
}


var loginedModule = new map();
loginedModule.put("GL",0);
loginedModule.put("WA",0);
loginedModule.put("FA",0);
loginedModule.put("PU",0);
loginedModule.put("SA",0);
loginedModule.put("MR",0);

/***
* 导航函数
* 当头部一级菜单和左侧导航条被点击后执行此函数：
* @param moduleId:模块名字,src:右边iframe跳转去的地址
*/
function toPage(moduleId,src){
	//如果重复点击当前模块则无效
	if(moduleId!=currentModuleId){
		//将当前活动的导航的src改成被点击过的默认图片
		if(currentModuleId!=null){
			var cm = document.getElementById(currentModuleId);
			cm.src="../../images/portal/CTree/sysButton/"+currentModuleId+"Login.jpg";
			//当鼠标移出前活动的模块导航图片时，图片变为已点击过的样式
			cm.onmouseout=function(event){
				//得到事件及事件源
				var evt = event || window.event;
				var img = (evt.srcElement || evt.target);
				img.src = "../../images/portal/CTree/sysButton/"+img.id+"Login.jpg";
			};
		}
		//取得 img dom 对象
		var img = document.getElementById(moduleId);
		img.src="../../images/portal/CTree/sysButton/"+moduleId+"Down.jpg";
		img.onmouseout=function(event){
			//得到事件及事件源
			var evt = event || window.event;
			var img = (evt.srcElement || evt.target);
			img.src = "../../images/portal/CTree/sysButton/"+moduleId+"Down.jpg";
		};
		
		loginedModule.put(moduleId,1);
		//设置右键注销菜单
		img.setAttribute("contextmenu","leftnav_contextmenu");
		//为顶部一级菜单加上右键注销菜单
		if(moduleId!="MR"){
			document.getElementById("M_"+moduleId).setAttribute("contextmenu","leftnav_contextmenu");
		}
		currentModuleId=moduleId;
		document.getElementById("rightiframe").src=src;
					
	}
	
}





//模块注销函数
function module_logout(){
	var cce = currentContextmenuElement;
	var cce_id = cce.id;
	
	if(cce.id.length >2){
		cce_id = cce_id.substring(2);
	}
	
	if(cce != null){
		
		switch(cce_id){

		case "GL":
			break;

		case "WA":
			wa_currentWaAccount.cgzgradenum="";
			wa_currentWaAccount.cgzgradename="";
			break;

		case "FA":
			break;

		case "PU":
			break;

		case "SA":
			break;

		case "MR":
			break;
			
		}
		
		loginedModule.put(cce_id,0);

		document.getElementById(cce_id).setAttribute("contextmenu",false);
		if(cce_id!="MR"){
			document.getElementById("M_"+cce_id).setAttribute("contextmenu",false);
		}
		
		
		var img = document.getElementById(cce_id);
		//if(cce.tagName == "IMG"){
			
		img.src="../../images/portal/CTree/sysButton/"+img.id+".jpg";
			//当鼠标移出前活动的模块导航图片时，图片变为已点击过的样式
		img.onmouseout=function(event){
				//得到事件及事件源
				var evt = event || window.event;
				var img = (evt.srcElement || evt.target);
				img.src = "../../images/portal/CTree/sysButton/"+img.id+".jpg";
			};
		//}
		
	}
	
	if(cce_id == currentModuleId){
		document.getElementById("rightiframe").src = "default.html";
		currentModuleId = null;
	}
}







//显示遮罩层
function showCover(){
	$("#cover_1").show();
	$("#cover_2").show();
	$("#cover_3").show();
}

//隐藏遮罩层
function hiddenCover(){
	$("#cover_1").hide();
	$("#cover_2").hide();
	$("#cover_3").hide();

}

