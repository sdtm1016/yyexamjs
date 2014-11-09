/**
 * 
 * @DESCRIBE   “固定资产”模块相关导航过滤器
 * @AUTHOR     陈建宇
 * @DATE       2013-03-29
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */
 
var fa_mess="";//固定资产提信息
//“固定资产”模块相关导航过滤器
function fa_navigation_filter(){
	var evt=(window.event || e);//获得事件
	var evtsrc = (evt.srcElement || evt.target);
	if(evtsrc.tagName!="IMG"){
		$("#menu_FA").menu("show",{left:fa_menu_left,top:25});
	}
	toPage('FA','FA.html');
	return;
	
	var res=true;
	$.ajax({
	    url: "faInitializa!isfirst",
	    type: 'post',
	    dataType: "json",
	    cache:false,
	    async:false,
	    success: function(data){
	    	var mark=data.mark;
	    	if(mark=="2"){
	    		jAlert("现在还不是固定资产启用日期");
	    		return false;
	    	}
	    	if(mark=="0"){
	    		jConfirm("这是第一次打开此账套，还未进行过初始化，是否进行初始化？", "确认对话框", function(confirmflag){
	    			if(confirmflag){
	    				openWindow('fa_basic_Initialization');
	    				res=false;
	    			}
	    		});
	    	}else{
	    		var is=iscansubmit();
	    		var evt=(window.event || e);//获得事件
	    		var evtsrc = (evt.srcElement || evt.target);
	    		if(is){
	    			if(evtsrc.tagName!="IMG"){
	    				$("#menu_FA").menu("show",{left:fa_menu_left,top:25});
	    			}
	    			toPage('FA','FA.html');
		    		res=true;
	    		}else{
	    			if(fa_mess!=""){
	    				jConfirm(fa_mess, "确认对话框", function(confirmflag){
			    			if(confirmflag){
			    				if(evtsrc.tagName!="IMG"){
				    				$("#menu_FA").menu("show",{left:fa_menu_left,top:25});
				    			}
				    			toPage('FA','FA.html');
			    				res=true;
			    			}else{
			    				res=false;
			    			}
			    		});
	    			}
	    		}
	    	}
	    }
	 });
	return res;
}


function iscansubmit(){
	var	operDate=getCookie("operDate");//登录时间
	var res=false;
	$.ajax({
	    url: "faInitializa!iscansubmit",
	    type: 'post',
	    dataType: "json",
	    cache:false,
	    async:false,
	    success: function(data){
	    	var mark=data.mark;
	    	if(mark=="-1"){
	    		jAlert("没有可做账日期","提示信息",function(){
	    			res=false;
	    		});
	    	}else if(mark=="0"){
	    		res=true;
	    	}else{
	    		var re=mark.split(",");
	    		var iid=re[0];
	    		var begin=re[1].split(" ")[0];
	    		//var end=re[2].split(" ")[0];
	    		fa_mess="登录日期:"+operDate+"不属于最新可修改的月份:"+begin.split("-")[0]+"."+iid+"!<br>"+"以此日期登录，将不能进行任何对本账套的修改操作，是否继续？<br>"+"本账套最新可修改日期："+begin;
	    	}
	    }
	 });
	return res;
}


//月末结账控制处理函数
function fa_jtbyzj_filter(){
	var is=iscanoprate();
	if(!is){
		jAlert("由于互斥功能正在运行或者系统相关设置步骤未完成，此功能暂时不可用");
		return;
	}
	$.ajax({
	    url: "faCardDepreciation!isTrueDepreciations",
	    type: 'post',
	    dataType: "json",
	    async:false,
	    error:function(data){
	    	jAlert("请求失败!");
	    },
	    success: function(data){
	    	var strHtml="";
	    	if(!data.depreciationsFlag){
	    		strHtml="不能进行月末结账,可能由于以下原因之一 	:";
	    		strHtml+="<br> 1.本月还未进行过折旧计提";
	    		strHtml+="<br> 2.在最后一次折旧计提之后对账套数据或折旧选项进行过修改!";
	    		strHtml+="<br> 请进行正确的'折旧计提'之后再进行'月末结账'!";
	    		jAlert(strHtml);
	    	}else{
	    		//制单业务是否完成
	    		$.ajax({
	    		    url: "faZwvouchers!findFaZwvouchersList",
	    		    type: 'post',
	    		    dataType: "json",
	    		    async:false,
	    		    error:function(data){
	    		    	jAlert("请求失败!");
	    		    },
	    		    success: function(data){
	    		    	var strHtml="";
	    		    	if(data.listFaZwvouchers.length>0){
	    		    		strHtml="制单业务未完成,不能进行此项操作!";
	    		    		jAlert(strHtml);
	    		    	}else{
	    		    		//弹出月末结账
	    		    		rfow('fa_operate_endMonthAccount','FA');
	    		    	}
	    		    }
	    		});
	    	}
	    }
	});
}
//批量制单处理函数
function fa_batchCreateBills_filter(){
	var is=iscanoprate();
	if(!is){
		jAlert("由于互斥功能正在运行或者系统相关设置步骤未完成，此功能暂时不可用");
		return;
	}
	//right frame open window
	rfow('fa_operate_batchCreateBills','FA');
}
//判断是否允许操作
function iscanoprate(){
	var res=false;
	$.ajax({
	    url: "faInitializa!iscansubmit",
	    type: 'post',
	    dataType: "json",
	    cache:false,
	    async:false,
	    success: function(data){
	    	var mark=data.mark;
	    	if(mark=="0"){
	    		res=true;
	    	}else{
	    		res=false;
	    	}
	    }
	 });
	return res;
}
//点击折旧分配表时看是否正确折旧
function fa_zjfpb_filter(){
	var is=iscanoprate();
	if(!is){
		jAlert("由于互斥功能正在运行或者系统相关设置步骤未完成，此功能暂时不可用");
		return;
	}
	$.ajax({
	    url: "faCardDepreciation!isTrueDepreciations",
	    type: 'post',
	    dataType: "json",
	    async:false,
	    error:function(data){
	    	jAlert("请求失败!");
	    },
	    success: function(data){
	    	var strHtml="";
	    	if(!data.depreciationsFlag){
	    		strHtml="本期这就分配表数据可能不正确,需要重新计提折旧并冲新分配折旧,";
	    		strHtml+="可能由于以下原因之一 	:";
	    		strHtml+="<br> 1.本月还未进行过折旧计提";
	    		strHtml+="<br> 2.在最后一次折旧计提之后对账套数据或折旧选项进行过修改!";
	    		strHtml+="是否继续?";
	    		jConfirm(strHtml, "确认对话框", function(confirmflag){
	    			if(confirmflag){
	    				rfow('fa_operate_allotdepre');
	    			}
	    		});
	    	}else{
	    		rfow('fa_operate_allotdepre');
	    	}
	    }
	});
}

/**
 * 
 * 原始卡片录入和新增资产进入前判断
 * 李波
 */
function to_card(mar){
	var is=iscanoprate();
	if(!is){
		jAlert("由于互斥功能正在运行或者系统相关设置步骤未完成，此功能暂时不可用");
		return;
	}
	rfow('fa_basic_ref_t_acr','fa',{mark:mar});
}

/**
 * 固定资产反结账
 */
function fa_gdzcfjz_filter(){
	$.ajax({
	    url: "faCardDepreciation!isbackmonthacount",
	    type: 'post',
	    dataType: "json",
	    cache:false,
	    async:false,
	    success: function(data){
	    	var mark=data.mark;
	    	if(mark=="a"){
	    		var str="没有可以反结账的期间。可能理由：<br>";
	    		str=str+"1，想要反结账的期间还没有结账；<br>";
	    		str=str+"2，想要反结账的期间总账已结账；<br>";
	    		jAlert(str);
	    		return;
	    	}else{
	    		var marks=mark.split(":");
	    		if(marks[0]=="b"){
	    			var str="当前可反结账的日期为"+marks[1]+"年"+marks[2]+"月，确定要进行反结账吗？";
	    			jConfirm(str, "确认对话框", function(confirmflag){
		    			if(confirmflag){
		    				backfaendmonth(marks[1],marks[2]);
		    			}
		    		});
	    		}else if(marks[0]=="c"){
	    			var str="当前可反结账的日期为"+marks[1]+"年"+marks[2]+"月，<br>" +
	    					"但因"+marks[1]+"年"+(marks[2]-0+1)+"月已进行账务业务，请先清除"+(marks[2]-0+1)+"月的账务。";
	    			jAlert(str);
		    		return;
	    		}
	    	}
	    }
	 });
}
function backfaendmonth(year,month){
	var param="iyear="+year+"&iid="+month;
	$.ajax({
	    url: "faCardDepreciation!backfaendmonth",
	    type: 'post',
	    dataType: "json",
	    cache:false,
	    async:false,
	    data:param,
	    success: function(data){
	    	if(data.mark=="1"){
	    		jAlert(year+"年"+month+"月已反结账成功");
		    	return;
	    	}
	    }
	 });
}
