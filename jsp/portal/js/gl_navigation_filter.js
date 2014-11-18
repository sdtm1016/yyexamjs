/**
 * 
 * @DESCRIBE   “总账”模块相关导航过滤器
 * @AUTHOR     陈建宇
 * @DATE       2013-03-29
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */
 

//“总账”模块相关菜单过滤器
function gl_navigation_filter(){
	toPage('GL','GL.html');
	return true;
}



//总账.设置.期初余额
function gl_shezhi_qichuyue_filter(){
	
	//判断是年初还是年中
	$.ajax({
		url:"glInitial!queryIsQyType",
		type:"post",
		dataType:"json",
		async:false,
		success: function(data){
			if(data.type==1){
				//年初启用
				rfow('gl_set_initial');

			}
			else if(data.type==2){
				//年中启用
				rfow('gl_set_midinitial');
			}
		}
	});
	
}


//凭证类别初始化
function gl_pzlb_init_filter(){
	$.post("dsignCategory!findcoutDsignBy",function(jsonData){
		if(jsonData.cout>0){
			openWindow('finance_dsign');
		}else{
			openWindow('finance_preset');
		}
	},"json").error(function(){
		jAlert("请求失败！");
	});
}



//是否有凭证类别判断函数
function hasDsignCategory(){
	var flag = false;
	/*$.ajax({
		url: "data/queryList.json",
		type: 'post',
		async:false,
		dataType: "json",
		success: function(data){
		}
	});*/
	var data={"cout":null,"dsign":null,"dsigns":[{"accid":590134,"csign":"收","ctext":"收款凭证","id":590918,"iotherused":null,"isignseq":0,"itype":1},{"accid":590134,"csign":"付","ctext":"付款凭证","id":590919,"iotherused":null,"isignseq":1,"itype":2},{"accid":590134,"csign":"转","ctext":"转账凭证","id":590920,"iotherused":null,"isignseq":2,"itype":3}],"dsigntype":0,"isdelete":false,"listCode":null,"success":null};
	if (data.dsigns.length>0) {
		flag = true;
	}
	return flag;
}

//填制凭证
function gl_tzpz_filter(){
	var hdc = hasDsignCategory();
	
	if(hdc==true){
		rfow('dsign');
	}else{
		jAlert("没设置凭证类别，请先设置凭证类别");
	}
}


//出纳签字
function gl_qzpz_filter(){
	var hdc = hasDsignCategory();
	
	if(hdc==true){
		rfow('gl_audit_billcashierquery');
	}else{
		jAlert("没设置凭证类别，请先设置凭证类别");
	}
}


//审核凭证
function gl_shpz_filter(){
	var hdc = hasDsignCategory();
	if(hdc==true){
		rfow('gl_audit_billauditquery');
	}else{
		jAlert("没设置凭证类别，请先设置凭证类别");
	}
}


//查询凭证
function gl_cxpz_filter(){
	var hdc = hasDsignCategory();
	if(hdc==true){
		rfow('gl_billquery');
	}else{
		jAlert("没设置凭证类别，请先设置凭证类别");
	}
}

//月末转账
function gl_ymzz_filter(){
	var hdc = hasDsignCategory();
	if(hdc==true){
		rfow('gl_transfer_create');
	}else{
		jAlert("没设置凭证类别，请先设置凭证类别");
	}
}


//记账
function gl_jz_filter(){
	rfow('gl_tally_tally');
}
//反记账
function gl_fjz_filter(){
	$.ajax({
		url: "glTally!backtallyinit",
		type: 'post',
		async:false,
		dataType: "json",
		success: function(data){
			var mark=data.mark;
			if(mark=="#"){
				jAlert("无可恢复的数据");
			}else if(mark=="error"){
				jAlert("请重新登陆系统");
			}else{
				rfow('gl_tally_backtally','GL',{mark:mark});
			}
		}
	});
}

