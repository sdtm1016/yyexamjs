
/**
 * 
 * @DESCRIBE   对应结转转账界面js
 * @AUTHOR     王丙建
 * @DATE       2012-11-27
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


/**
 * 保存对应转账转账设置
 */

//关键字列表
var keyList = null;
//关键字长度
var keyCount = null;

//当前key值
var curKey = 0;

var selBautotranKey = null;


/**
 * 页面初始化
 */
$(document).ready(function(){
	//凭证类别初始化
	$.ajax({
		url: "dsignCategory!queryList",
		type: 'post',
		async:false,
		dataType: "json",
		success: function(data){
			var dsignList =data.dsigns;
			$("#signList").empty();
			$.each(dsignList,function(index,dsign){
				$("#signList")[0].options.add(new Option(dsign.csign + " " + dsign.ctext,dsign.csign,false,false));
			});
		}
	});
	
	//对应结转关键字初始化
	if (paramObject==null) {
		 var curLoginPeriod = getLoginPeriod();
		 var curMonth =  curLoginPeriod.iid;
		 var curYear = curLoginPeriod.iyear;
		
		year = curYear;
		period = curMonth;
		type = "20";
		
	}
	else { 
		year = paramObject.year;
		period = paramObject.month;
		type = paramObject.type;
	}
	selyear = year;
	selmonth = period;
	selitype = type;
	var url = "glCspBautotran!queryCspKeyList?year="+ year + "&period=" + period + "&type=" + type ;
	$.ajax({
		url: url ,
		type: 'post',
		async:false,
		dataType: "json",
		success: function(data){
			keyList =data.keyList;
			keyCount = keyList.length;
		}
	});
	//显示第一个对应结转设置
	if (keyCount>0)  {
		 selBautotranKey = keyList[0];
		 tranid = selBautotranKey.zzbh;
		 queryCspBautotran(year, period, type, tranid);
	}
	
	
});


/**
 * 保存对应结转设置
 */
function saveCspButtoTran() {
	
	//判断单元格编辑是否已结束，否则结束单元格编辑
	if(currentEditCell!=null){
		currentEditCell.innerHTML=currentEditCell.getElementsByTagName("input")[0].value;
		currentEditCell=null;
	}
	
	
	  var data = "";
	  
	  //编号
	  var tb_tranid = $("#tb_tranid").val();
	  if (tb_tranid=="") {
		  jAlert("编号不允许为空！","提示");
		  return;
	  }
	//摘要
	  var cdigest = $("#cdigest").val();
	  if (cdigest=="") {
		  jAlert("摘要不允许为空！","提示");
		  return;
	  }
	  //转出科目编码
	  var zccode =  $("#zccode").val();
	  if (zccode=="") {
		  jAlert("转出科目编码不允许为空！","提示");
		  return;
	  }
	 	 
	  //转出科目辅助项
	  var zcfzx =  $("#zcfzx").val();
	  //辅助项为空时，要清空数据值
	  if (zcfzx=="") {
		  $("#zcfzx").attr("dbValue","");
	  }

	  var glCspBautotranList = getCspRowsValue();
	  if (glCspBautotranList==null){
		  jAlert("转入科目没设置！","提示");		  
		  return;
	  }
	  var length = glCspBautotranList.length;
	
	  var sumjzxs = 0;
	  for (var i = 0; i<length; i++) {
		  var glCspBautotran = glCspBautotranList[i];
		  var zrcode = glCspBautotran.zrcode;
		  if (zrcode=="") {
			  jAlert("转入科目编码不允许为空！","提示");
			  return ;
		  }
		  
		  var czrcodefzxname = glCspBautotran.czrcodefzxname;
		  //转出辅助项不为空时，转入辅助项也不允许为空
		  if (zcfzx!="" && czrcodefzxname=="") {
			  jAlert("转出辅助项不为空时，转入辅助项也不允许为空！","提示");
			  return ; 
		  }
		  var jzxs = glCspBautotran.jzxs;
		  sumjzxs = sumjzxs + jzxs*1;
		  var strTRow = glCspBautotranToStringArray(glCspBautotran,i);
		  data = data + strTRow;
	  }
	  //alert("data:" + data);
	  //结转系数的和等于1的判断暂不增加，2013-06-13
	 
		$.ajax({
			url:"glCspBautotran!saveCspBautotran.action",		
			type:"post",
			data:data,
			async:false,
			datatype:"json",
			success:function(data,status){
				jAlert("保存成功","提示",function(){
					window.parent.closeWindow('gl_transfer_mts');
				});
			}
		});
}


function onWindowClose(){
	
	
	
	
	
	
	try{
		var radio = window.parent.getParentWindow('gl_transfer_mts').document.getElementById("radio_2");
		radio.checked=true;
		radio.onclick();
	}catch(e){}
}



var year = "";
var period = "";
var type = "";
var tranid = "";
var selopbz = "";  

/**
 * 查询编号列表
 * @param iyear
 * @param iperiod
 * @param itype
 */
function queryCspTranidList(iyear, iperiod, itype) {
	year = iyear;
	period = iperiod;
	type = itype;
	selyear = iyear; 
	selmonth = iperiod;
	selitype = itype;
	$.ajax({
		url:"glCspBautotran!queryCspTranidList.action?year=" + year + "&period=" + period + "&type=" + type ,		
		type:"post",
		datatype:"json",
		success:function(data,status){
			var gridList = data.gridList;
			initCspTranidList(gridList);
		}
	});
}

/**
 * 初始化编号
 * @param gridList
 */
// 编号列表
 var tranidList = null;
 //编号总数
 var tranidCount = 0;
function initCspTranidList(gridList) {
	var length = gridList.length;
	tranidCount = length;
	tranidList = new Array(length);
	for (var i = 0; i<length; i++) {
		var rowValueList = gridList[i];
		var curTranid = rowValueList[0];
		tranidList[i] = curTranid;
	}
	tranid = tranidList[0];
	queryCspBautotran(year,period,type,tranid);
}



/**
 * 查询转账列表
 * @param iyear
 * @param iperiod
 * @param itype
 */
function queryCspBautotran(iyear, iperiod, itype, tranid) {
	year = iyear;
	period = iperiod;
	type = itype;
	$.ajax({
		url:"glCspBautotran!queryCspBautotran.action?year=" + year + "&period=" + period + "&type=" + type +"&tranid=" + tranid,			
		type:"post",
		async:false,
		datatype:"json",
		success:function(data,status){
			var glCspBautotranList = data.glCspBautotranList;
			initCspTable(glCspBautotranList);
		}
	});
}




/**
 * 把查出的自定义转账信息显示在列表中
 * @param glBautotranList
 */
function initCspTable(glCspBautotranList) {
	//查不到信息返回
	if (glCspBautotranList.length==0)
		return;
	//首先清空表格
	$("#datatable_rows").html("");
	var length = glCspBautotranList.length;
	//编号
	$("#tb_tranid").val(glCspBautotranList[0].ctranid);
	//凭证类别
	$("#signList").val(glCspBautotranList[0].csign);
	//摘要
	$("#cdigest").val(glCspBautotranList[0].cdigest);
	//转出科目编码
	$("#zccode").val(glCspBautotranList[0].ccode);
	//转出科目名称
	$("#zccodeName").val(glCspBautotranList[0].ccodename);
	//转出辅助项名称
	$("#zcfzx").val(glCspBautotranList[0].ccodefzxname);
	//转出辅助项
	$("#zcfzx").attr("dbValue", glCspBautotranList[0].ccodefzx);
	
	for (var i = 0 ;i<length; i++) {
		var glCspBautotran = glCspBautotranList[i];
		var cells = glCspBautotranToArray(glCspBautotran, length);
		//alert(glCspBautotran.czrcodefzx);
		var key = {id:glCspBautotran.id,csign:glCspBautotran.csign,czrcodefzx:glCspBautotran.czrcodefzx};
		initCspRow(cells, key);
	}
}




/**
 * 校验插入行是否正确， 通过为true， 不通过为false
 * @param bautoTran
 * @returns {Boolean}
 */
function checkCspbautoTran() {
	var result= true;
	//编号
	var tb_tranid = $("#tb_tranid").val();
	if (tb_tranid=="") {
		jAlert("编号不能为空","提示");
		return  false;
	}
	//摘要
	var cdigest = $("#cdigest").val();	
	if (cdigest=="") {
		jAlert("摘要不能为空","提示");
		return  false;
	}
	//转出科目编码
	var zccode =  $("#zccode").val();			
	if (zccode=="") {
		jAlert("转出科目非法","提示");
		return  false;
	}
	var tb = document.getElementById("datatable_rows");
	var length = tb.rows.length;
	if (length==0) {
		if (zccode=="") {
			jAlert("请输入【转入科目】","提示");
			return  false;
		}
	}	
	
	return result; 
}


function cellKeyControl(selObj){
	 var inKey = event.keyCode;
	 //回车键处理
	 if (inKey==13) {
		 var zccode =  $("#zccode").val();
		 var codeObj = getCurCodeObj(zccode);
		 if (codeObj!=null) {			 
		 $("#zccodeName").val(codeObj.ccodeName);
		 }
			 
	 } 	
}

//失去焦点
function cellBlue(selObj) {
	 var zccode =  $("#zccode").val();
	 var codeObj = getCurCodeObj(zccode);
	 if (codeObj!=null) {			 
	 $("#zccodeName").val(codeObj.ccodeName);
	 }
	
}

/**
 * 首张
 */
function firstCsp() {
	if (keyList==null) return;
	 if (curKey==0) return ;
	 curKey = 1;
	 selBautotranKey = keyList[curKey-1];
	 tranid = selBautotranKey.zzbh;
	 queryCspBautotran(year, period, type, tranid);
}



/**
 * 上张
 */
function upCsp() {
	if (keyList==null) return;
	curKey--;
	 if (curKey<=1)
		 curKey = 1;
	 selBautotranKey = keyList[curKey-1];
	 tranid = selBautotranKey.zzbh;
	 queryCspBautotran(year, period, type, tranid);
}


/**
 * 下张
 */
function downCsp() {
	if (keyList==null) return;
	curKey++;
	 if (curKey>=keyCount)
		 curKey = keyCount;
	
	
	 selBautotranKey = keyList[curKey-1];
	 tranid = selBautotranKey.zzbh;
	 queryCspBautotran(year, period, type, tranid);
}


/**
 * 末张
 */
function lastCsp() {
	if (keyList==null) return;
	 if (curKey==0) return ;
	 curKey = keyCount;	 
	
	 selBautotranKey = keyList[curKey*1-1];
	 tranid = selBautotranKey.zzbh;
	 queryCspBautotran(year, period, type, tranid);
}


/**
 * 增加
 */
function addCspButtoTran(event) {
	
	//首先清空表格
	$("#datatable_rows").html("");
	//编号
	$("#tb_tranid").val("");
	//摘要
	$("#cdigest").val("");
	//转出科目编码
	$("#zccode").val("");
	//转出科目名称
	$("#zccodeName").val("");
	//转出辅助项
	$("#zcfzx").val("");

}



/**
 * 删除
 */
function deleteCspButtoTran() {
	var msg = "确实要删除[" +  tranid + "]吗？";
	
	jConfirm(msg,"提示",function(f){
		if(f){
			$.ajax({
				url:"glCspBautotran!deleteCspBautotran.action?year=" + year + "&period=" + period + "&type=" + type +"&tranid=" + tranid,			
				type:"post",
				async:false,
				datatype:"json",
				success:function(data,status){
					jAlert("删除成功！","提示",function(){
						//首先清空表格
						$("#datatable_rows").html("");
						//编号
						$("#tb_tranid").val("");
						//摘要
						$("#cdigest").val("");
						//转出科目编码
						$("#zccode").val("");
						//转出科目名称
						$("#zccodeName").val("");
						//转出辅助项
						$("#zcfzx").val("");
					});
				}
			});
		}
	});
	
	/*
	if (confirm(msg)) {
		
	}

	*/
}



/**
 * 放弃
 */
function abortCspButtoTran() {
	queryCspBautotran(year, period, type, tranid);
}


/**
 * 打开辅助核算窗体
 * 王丙建 
 * 2013-09-10
 */
function openAddInfoWindow() {
  var ccode = $("#zccode").val();


  //得到科目对象
  var codeObj = getCurCodeObj(ccode);
  //如果科目有辅助核算，弹出辅助核算选择窗体

	//判断该科目是否需要填写辅助核算信息
	var curcodeAddInfo = getCodAddInfo(codeObj);
  
  if (
		 curcodeAddInfo[0]==1 ||
		 curcodeAddInfo[1]==1 ||
		 curcodeAddInfo[2]==1 ||
		 curcodeAddInfo[3]==1 ||
		 curcodeAddInfo[4]==1 ||
		 curcodeAddInfo[5]==1 ||
		 curcodeAddInfo[6]!="" ||
		 curcodeAddInfo[8]==1
		 
	) {
	  
	  

	xaction="editAddInfo";
	  var param = new Object();
	  param.curcodeAddInfo=curcodeAddInfo;
	  param.items=null;
	  
	  
	  
	  window.parent.openWindow('dsign_auxiliaryoptions','gl_transfer_mts',param);
		
		
	 }
  
  
  
}







/**
 * 打开辅助核算窗体
 * 王丙建 
 * 2013-09-10
 */
function tableAddInfoWindow(tr) {
  var ccode = tr.cells[0].innerHTML;
  //得到科目对象
  var codeObj = getCurCodeObj(ccode);
  //如果科目有辅助核算，弹出辅助核算选择窗体

	//判断该科目是否需要填写辅助核算信息
	var curcodeAddInfo = getCodAddInfo(codeObj);
  
  if (
		 curcodeAddInfo[0]==1 ||
		 curcodeAddInfo[1]==1 ||
		 curcodeAddInfo[2]==1 ||
		 curcodeAddInfo[3]==1 ||
		 curcodeAddInfo[4]==1 ||
		 curcodeAddInfo[5]==1 ||
		 curcodeAddInfo[6]!="" ||
		 curcodeAddInfo[8]==1
		 
	) {
	  
	  
	  var param = new Object();
	  param.curcodeAddInfo=curcodeAddInfo;
	  param.items=null;
	  xaction="editAddInfo";
	  window.parent.openWindow('dsign_auxiliaryoptions','gl_transfer_mts',param);
		
		
	 }
  
  
  
}
/**
 * 打开转出参照窗体
 * 王丙建 2013-09-23
 */
function openZccoderef() {
	var param = {};
	var treeSetting = new Object();
	treeSetting.justFinalNode=true;
	param.treeSetting=treeSetting;
	window.parent.openWindow("dsign_subjectsreference","gl_transfer_mts",param);
	xaction='zccode';
}



