/**
 * 
 * @DESCRIBE   “工资”模块相关导航过滤器
 * @AUTHOR     陈建宇
 * @DATE       2013-03-29
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */
 





//“工资”模块相关导航过滤器
function wa_navigation_filter(){
	var flag = true;
	/*$.ajax({
		url:'data/queryWageSets.json',
		type:'post',
		dataType:'json',
		async:false,
		success:function(data){}
	});*/
	

	var data={"accountName":"121","isWageSets":"2"};
	wa_isWageSets = data.isWageSets;
	wa_wageTypeId = (wa_wageTypeId == null?loginedModule.get("WA"):wa_wageTypeId);
	var isOpenWa = loginedModule.get("WA"); //工资main页面是否已经打开
	var accountName=data.accountName;//单个工资帐套打开的帐套名称
	//只要工资类别为单个，不管是否已登录都禁用工资类别操作菜单
	if(wa_isWageSets == '1'){ 
		
		
		//隐藏 打开、关闭、新建、删除  工资类别菜单
		var itm = $('#menu_WA').menu('findItem','工资类别').target;
		$('#menu_WA').menu('disableItem',itm);

		//隐藏和显示相关菜单：
		$('#menu_WA').menu('showItem','选项');
		wa_currentWaAccount.cgzgradenum = '001';
		wa_currentWaAccount.cgzgradename=accountName;
	}else{

		
		
		//启用工资类别菜单
		var itm = $('#menu_WA').menu('findItem','工资类别').target;
		$('#menu_WA').menu('enableItem',itm);
		wa_currentWaAccount.cgzgradenum = '001';
		wa_currentWaAccount.cgzgradename=accountName;
		
	}
	//未登录，且是单个工资类别的时候打开流程页面
	if(wa_isWageSets == '1' && isOpenWa == 0){
		toPage('WA','WA.html');
		wa_wageTypeId = 1;
		wa_currentWaAccount.cgzgradenum = '001';
		wa_currentWaAccount.cgzgradename=accountName;
	}
	//未登录，且是多个工资类别的时候弹出工资类别选择窗
	else if(wa_isWageSets == '2' && isOpenWa == 0){
		

		
		/*$.ajax({
			url:'data/queryWageTypes.json',
			type:'post',
			dataType:'json',
			async:false,
			success:function(data){
				var list=data.wageList;
				var flag=0;
				if(list.length==0){
					jAlert("未建立工资类别!","提示",function(){
						flag=0;//是否有工资类别
						//隐藏和显示相关菜单：
						$('#menu_WA').menu('hideItem','打开工资类别');
						$('#menu_WA').menu('hideItem','关闭工资类别');
						$('#menu_WA').menu('showItem','新建工资类别');
						$('#menu_WA').menu('hideItem','删除工资类别');
					});
				}else{
					flag=1;
				}
				var param={};
				param.flag=flag;
				openWindow("wa_wagecategory_wcw","wa_wagecategory_wagewizard",param);
			}
		});
		flag = false;*/
		toPage('WA','WA.html');
	}else if(isOpenWa == 0){
		//第一次进入工资模块时向导
		openWindow('wa_wagecategory_wagewizard');
		flag = false;
	}else if(wa_wageTypeId == 1){
		wa_currentWaAccount.cgzgradenum = '001';
		wa_currentWaAccount.cgzgradename=accountName;
		toPage('WA','WA.html');
	}else{
		toPage('WA','WA.html');
		wa_wageTypeId = 0;
	}

	
	return flag;
	
}



/**
 * 关闭工资类别
 */
function wa_close_wagecategory_filter(){
	wa_wageTypeId=0;
	wa_currentWaAccount.cgzgradenum="";
	wa_currentWaAccount.cgzgradename="";
	
	//隐藏和显示相关菜单：
	$('#menu_WA').menu('showItem','打开工资类别');
	$('#menu_WA').menu('hideItem','关闭工资类别');
	$('#menu_WA').menu('showItem','新建工资类别');
	$('#menu_WA').menu('showItem','删除工资类别');
	
}




/**
 * 新建工资类别完成后菜单设置
 */
function wa_createWagecategoryFinish(){
	
	//隐藏和显示相关菜单：
	$('#menu_WA').menu('showItem','打开工资类别');
	$('#menu_WA').menu('showItem','关闭工资类别');
	$('#menu_WA').menu('hideItem','新建工资类别');
	$('#menu_WA').menu('hideItem','删除工资类别');
	
}






//工资>>设置>>部门选择设置 导航拦截处理器
function wa_setting_dptselection_filter(){
	if (wa_isWageSets == 1) {//单工资类别 （0：未建立；1：单个 ；2：多个）
		openWindow('department');
	}else if(wa_isWageSets == 2){
		//多个工资类别时，判断是否有打开的
		if(wa_currentWaAccount.cgzgradenum!=""){
			rfow('wa_other_department');
		}else{
			openWindow('department');
		}
	}
	
}





//多个工资列别中打开工资类别后隐藏和显示相关菜单：
function wa_openedWageTypeShowMenu(){
	
	
	$('#menu_WA').menu('showItem','打开工资类别');
	$('#menu_WA').menu('showItem','关闭工资类别');
	$('#menu_WA').menu('hideItem','新建工资类别');
	$('#menu_WA').menu('hideItem','删除工资类别');
}


//新建工资类别菜单拦截判断函数
function wa_newWageType(){
	$.ajax({
		url:"department!queryDepartment.action",
		type:"post",
		dataType:"json",
		success:function(data){
			var list=data.departmentList;
			if(list.length==0){
				jAlert("未建立部门,请先建立部门");
			}else{
				rfow('wa_wagecategory_cwc');
			}
		}
	});
	
	
}


//是否有工资类别判断函数
function wa_hasWageType(){
	$.ajax({
		url:'wageCategories!queryWageTypes.action',
		type:'post',
		dataType:'json',
		async:false,
		success:function(data){
			var list=data.wageList;
			if(list.length==0){
				//隐藏和显示相关菜单：
				$('#menu_WA').menu('hideItem','打开工资类别');
				$('#menu_WA').menu('hideItem','关闭工资类别');
				$('#menu_WA').menu('showItem','新建工资类别');
				$('#menu_WA').menu('hideItem','删除工资类别');
			}else{
				//隐藏和显示相关菜单：
				$('#menu_WA').menu('showItem','打开工资类别');
				$('#menu_WA').menu('hideItem','关闭工资类别');
				$('#menu_WA').menu('showItem','新建工资类别');
				$('#menu_WA').menu('showItem','删除工资类别');
			}
		}
	});
}
//反结账
function wa_anti_filter(){
	/*添加小于启动日期、1月份 、等于当前启动月 不能进行反结账处理 2013-8-15 lyl  start*/
	if(wa_isWageSets==1){
		$.ajax({
			url:"wageBusiness!queryReverseCgzgradenumList.action",
			data:{},
			type:"post",
			dataType:"json",
			async:false,
			success:function(data){
					/*工资帐套信息*/
					var waAccount=data.waAccount;
					var dstartTime=waAccount.dstartTime;//启动日期
					dstartTime=dstartTime.substring(0,dstartTime.indexOf("T"));
					var start=dstartTime.split('-');
					var operDate=getCookie("operDate");//当前登录日期
					var year=operDate.split('-');
					if(dstartTime==operDate||year[1]==1||start[1]>year[1]){
						jAlert("当前月份数据不能进行反结账处理!");
					}else{
						var p = {};
						p.cgzgradenum = wa_currentWaAccount.cgzgradenum;
						p.cgzgradename = wa_currentWaAccount.cgzgradename;
						rfow('wa_checkout_anti2','wa_wagecategory_wagewizard',p);
					}
				}
			});
		
	}else if(wa_isWageSets==2){
		rfow('wa_checkout_anti1');
	}
}
/*扣缴个人所得税*/
function wa_columnchoose_filter(){
	if(wa_currentWaAccount.cgzgradenum!=""){
		rfow('wa_tax_columnchoose');
	}else{
		jAlert("请先打开一个工资类别!");
	}
	
}
/*工资变动*/
function wa_change_filter(){
	if(wa_currentWaAccount.cgzgradenum!=""){
		rfow('wa_change_main');
	}else{
		jAlert("请先打开一个工资类别!");
	}
}
/*工资分摊*/
function wa_first_filter(){
	if(wa_currentWaAccount.cgzgradenum!=""){
		rfow('wa_wageallocation_first');
	}else{
		jAlert("请先打开一个工资类别!");
	}
}
/*月末处理*/
function wa_endproccess_filter(){
	if(wa_currentWaAccount.cgzgradenum!=""){
		//判断是否有人员档案
		var flag = ifHasPersonRecord();
		if(!flag){
			return;
		}
		//判断是否还有没有走完的业务(工资是否正确分摊了)
		$.ajax({
			url:"wagesSharing!findWaGzftList",
		    type: 'post',
		    dataType: "json",
		    async:false,
		    error:function(data){
		    	jAlert("请求失败!");
		    },
		    success: function(data){
		    	var strHtml="";
		    	if(data.flag==1){
		    		strHtml="您还没有进行工资分摊,不能进行此项操作!";
		    		jAlert(strHtml);
		    	}else if(data.flag==2){
		    		strHtml="制单业务未完成,不能进行此项操作!";
		    		jAlert(strHtml);
		    	}else{
		    		//弹出月末结账
		    		rfow('wa_checkout_endproccess');
		    	}
		    }
		});
		
	}else{
		jAlert("请先打开一个工资类别!");
	}
}
//判断是否有人员档案
function ifHasPersonRecord(){
	var flag = true;
	$.ajax({
		url:"wageSetting!findWaPsns",
	    type: 'post',
	    dataType: "json",
	    async:false,
	    error:function(data){
	    	jAlert("请求失败!");
	    },
	    success: function(data){
	    	if(data.psnList.length==0){
	    		flag=false;
	    		jAlert("没有人员档案,请先添加人员档案!");
	    	}
	    }
	});
	return flag;
}






/**
 * 启用工资类别菜单，
 * 用于修改工资类别单个到多个后，启用工资类别菜单
 */
function wa_enableWageType(){

	//启用工资类别菜单
	var itm = $('#menu_WA').menu('findItem','工资类别').target;
	$('#menu_WA').menu('enableItem',itm);
	
	
}


