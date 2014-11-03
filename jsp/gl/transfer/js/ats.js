
/**
 * 
 * @DESCRIBE   自定义转账界面js
 * @AUTHOR     王丙建
 * @DATE       2012-11-12
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

  
  var year = "";
  var period = "";
  var type = "";
  var tranid = "";
  var selopbz = "";  
  
  function onWindowClose(){
	  /*
	  var f = saveUserButtoTran();
	  if(f){
		  window.parent.justCloseWindow("gl_transfer_ats");
	  }
	  */
	  try{
		  
		  var radio = window.parent.getParentWindow('gl_transfer_ats').document.getElementById("radio_1");
		  radio.checked=true;
		  radio.onclick();
	  }catch(e){}
	  

	  
	  
	  
		  
	    
  }
  
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
  });


/**
 * 查询转账序号、转账说明
 * @param iyear
 * @param iperiod
 * @param itype
 */
function queryUserTran(iyear, iperiod, itype,csign,ctranid) {
	
	
	
	year = iyear;
	period = iperiod;
	type = itype;
	selyear = year;
	selmonth = period;
	selitype = type;
	selcsign = csign;
	selctranid = ctranid;
	$.ajax({
		url:"glBautotran!queryUserTranGrid.action?year=" + year + "&period=" + period + "&type=" + type ,		
		type:"post",
		datatype:"json",
  		async:false,
		success:function(data,status){
			var gridList = data.gridList;
			
			
			
			initUserTran(gridList);
		}
	});
}

/**
 * 初始化转账序号、转账说明
 * @param gridList
 */
var signList = null;

var keyList = null;
var keyCount = null;
var curKey = null;
var selBautotranKey = null;

function initUserTran(gridList) {
	var length = gridList.length;
	keyCount = gridList.length;
	keyList = gridList;
	curKey = 1;
	
	$("#TranList").empty();
	$("#TextList").empty();
	signList = new Array(length);
	if(length>0){//add by lval  20130805
		for (var i = 0; i<length; i++) {
			var rowValueList = gridList[i];
			$("#TranList")[0].options.add(new Option(rowValueList[0],i,false,false));
			$("#TextList")[0].options.add(new Option(strNullProc(rowValueList[1]),i,false,false));
			signList[i] = rowValueList[2];
		}
		tranid = $("#TranList").find("option:selected").text();
		queryUserBautotran(year, period, type, tranid);
	}
	

	
}

/**
 * 改变转账序号选择
 * @param value
 */
function changeTran(value) {
	tranid = $("#TranList").find("option:selected").text();
	selctranid = tranid;
	queryUserBautotran(year, period, type, tranid);
	
	var i = $("#TranList")[0].options.selectedIndex;
	
	$("#TextList")[0].options[i].selected=true;
	
}

/**
 * 改变转账说明选择
 * @param value
 */
function changeText(value) {
	

	var i = $("#TextList")[0].options.selectedIndex;
	
	$("#TranList")[0].options[i].selected=true;
	
	
	tranid = $("#TranList").find("option:selected").text();
	queryUserBautotran(year, period, type, tranid);
}

/**
 * 保存自定义转账设置
 */
function saveUserButtoTran() {
	
	var success = false;

	//如果有其他单元格正处于编辑状态，那么还需要将其他单元格取消编辑状态
	if(currentEditCell!=null){
		currentEditCell.innerHTML=currentEditCell.getElementsByTagName("input")[0].value;
		currentEditCell=null;
	}
	/*
	  if(selopbz==""){
		  
		  return false;
	  }
	  */
	  
	  var data = "";
	  var glBautotranList = getRowsValue();
	  
	  //alert(JSON.stringify(glBautotranList));
	  //return;
	  
	  if (glBautotranList==null) return false;
	  var length = glBautotranList.length;
	  for (var i = 0; i<length; i++) {
		  var glBautotran = glBautotranList[i];
		  var strTRow = glBautotranToStringArray(glBautotran,i);
		  data = data + strTRow;
	  }
	  
	  //alert(data);
	 // return;
	  
	  
	  if (data!=""){
		  $.ajax({
			  url:"glBautotran!saveUserBautotran.action",		
			  type:"post",
			  data:data,
			  datatype:"json",
			  async : false,
			  success:function(data,status){
				  success = true;
				  selopbz="";
				  
				  
				  
				  
				  
				  try{
					  
					  var radio = window.parent.getParentWindow('gl_transfer_ats').document.getElementById("radio_1");
					  radio.checked=true;
					  radio.onclick();
				  }catch(e){}
				  
				  
				  
				  
			  }
		  });
	  }else{
		  return true;
	  }
	
	
	return success;
	
	
}


/**
 * 删除自定义转账设置
 */
function deleteUserButtoTran() {
	
	jConfirm("确定想删除该凭证？","提示",function(f){
		if(f){
			tranid = $("#TranList").find("option:selected").text();
			
			var data = "year="+year+"&period="+period+"&type="+type+"&tranid="+tranid;
			
			$.ajax({
				url:"glBautotran!deleteUserBautotran.action",		
				type:"post",
				datatype:"json",
				data:data,
		  		async:false,
				success:function(data,status){
					jAlert("删除凭证成功！","提示");
					$("#datatable_rows").html("");
					$("#TranList").find("option:selected").remove();
					$("#TextList").find("option:selected").remove();
					changeTran($("#TranList").val());
					selopbz="";
					
					
					  
					
					  try{
						  
						  var radio = window.parent.getParentWindow('gl_transfer_ats').document.getElementById("radio_1");
						  radio.checked=true;
						  radio.onclick();
					  }catch(e){}
					  
					  
					
				}
			});
		}
	});
	/*
	if(confirm("确定想删除该凭证？"))   {  
		
	}
	*/
}

/**
 * 增加自定义转账设置
 */
function addUserButtoTran() {
	var sel=$("#TranList :selected");
	
	var val = "";
	
	if(sel.html()!=null){
		val = $("#TranList :selected").html().replace(/(^\s*)|(\s*$)/g, "");
	}
	
	
	
	if(val==""){

		//清空数据
		$("#tb_tranid").val("");
		$("#tb_zzsm").val("");
		//document.getElementById('zzml').style.display='block';
		openWindow('zzml');
		selopbz = "add";
	}else{
		
		
		var flag = saveUserButtoTran();
		if(flag==true){
			
			//清空数据
			$("#tb_tranid").val("");
			$("#tb_zzsm").val("");
			//document.getElementById('zzml').style.display='block';
			openWindow('zzml');
			selopbz = "add";
		}
	}
}

/**
 * 更新自定义转账设置
 */

//更新前的转账序号、转账说明、转账凭证类别
var sourceTranid = "";
var sourceText = "";
var sourceSign = "";	
function updateUserButtoTran() {
	
	
	
	saveUserButtoTran();
	//document.getElementById('zzml').style.display='block';
	openWindow('zzml');
	var seltranid = $("#TranList").find("option:selected").text();
	var seltext = $("#TextList").find("option:selected").text();
	$("#tb_tranid").val(seltranid);
	$("#tb_zzsm").val (seltext);
	sourceTranid = seltranid;
	sourceText = seltext;
	selopbz = "update";	
}


/**
 * 放弃操作
 */
function abortUserButtoTran() {
	queryUserBautotran(year, period, type, tranid);
}

/**
 * 查询自定义转账列表
 * @param iyear 年份 
 * @param iperiod 会计期间
 * @param itype  类型
 * @param tranid  转账序号
 */
function queryUserBautotran(year, period, type, tranid){
	$("#datatable_rows").html("");
	
	//alert(year+" "+period+" "+type+" "+tranid);
	
	$.ajax({
		url:"glBautotran!findGlBautotranMapList?year="+ year + "&period=" + period + "&type=" + type+"&tranid=" + tranid,		
		type:"post",
		datatype:"json",
		success:function(data,status){
			
			var glBautotranMapList = data.glBautotranMapList;
			
			//alert(glBautotranMapList[1].CITEM_NAME);
			
			initTable(glBautotranMapList);		
		}
	});
	
}



/**
 * 把查出的自定义转账信息显示在列表中
 * @param glBautotranList
 */
function initTable(glBautotranList) {
	//首先清空表格
	$("#datatable_rows").html("");
	var length = glBautotranList.length;
	if(length>0){
		document.getElementById("csign").innerHTML=strNullProc(glBautotranList[0].CSIGN);
		for (var i = 0 ;i<length; i++) {
			var glBautotran = glBautotranList[i];
			
			
			
			//var cells = glBautotranToArray(glBautotran, length);
			
			var key = {id:glBautotran.ID,ctext:glBautotran.IYEAR};
			initRow(glBautotran, key);
		}
	}
	
}

/**
 * 增加转账目录
 */
function saveBautotran() {
	
	if($("#tb_tranid").val().replace(/(^\s*)|(\s*$)/g, "")==""){
		closeWindow('zzml');
		return false;
	}
	
	if (selopbz=="update") {
		var tb_tranid = $("#tb_tranid").val();
		var tb_zzsm = $("#tb_zzsm").val();
		//var tb_sign_text =  $("#signList").find("option:selected").text();
		var tb_sign_text =  $("#signList").val();			
		
		 selyear = year; 
		 selmonth = period;
		 selitype = type;
		
		 selctranid = tb_tranid;
		 selcsign = tb_sign_text;
		 selctext = tb_zzsm;
		var param = "&baututranKey.iyear=" + year
		    +"&baututranKey.iperiod=" + period
		    +"&baututranKey.itype=" + type
		    +"&baututranKey.zzbh=" + tb_tranid
		    +"&baututranKey.ctext=" + tb_zzsm
		    +"&baututranKey.csign=" + tb_sign_text;	
		$.ajax({
			url:"glBautotran!updateUserBautotran.action?sourceTranid="+ sourceTranid,		
			type:"post",
			datatype:"json",
			data:param,
	  		async:false,
			success:function(data,status){
				jAlert("更新凭证成功！","提示",function(){
					
					queryUserTran(year, period, type);
					//document.getElementById('zzml').style.display='none';
					closeWindow('zzml');
					selopbz="";
				});
			}
		});  
	}else {
		var tb_tranid = $("#tb_tranid").val();
		var tb_zzsm = $("#tb_zzsm").val();
		
		var opts = $("#TranList")[0].options;
		
		
		for(var i=0;i<opts.length;i++){
			var t = opts[i].text;
			if(t==tb_tranid){
				jAlert("转账序号"+tb_tranid+"已存在！","提示",function(){
					$("#tb_tranid").select();
				});
				return false;
			}
		}
		
		
		
		//var tb_sign_text =  $("#signList").find("option:selected").text();	
		var tb_sign_text =  $("#signList").val();
		
		
		
			var length=0;
			length=signList.length;
			
		
			
			//var length = signList.length;
			var oldSignList = signList; 
			
			
			
			$("#TranList")[0].options.add(new Option(tb_tranid,length,false,true));
			$("#TextList")[0].options.add(new Option(tb_zzsm,length,false,true));
			
			signList.push(oldSignList);
			signList[length*1] = tb_sign_text;
			
			
		//document.getElementById('zzml').style.display='none';	
			closeWindow('zzml');
			
		$("#datatable_rows").html("");
		 selyear = year; 
		 selmonth = period;
		 selitype = type;
		
		 selctranid = tb_tranid;
		 selcsign = tb_sign_text;
		 selctext = tb_zzsm;
		 document.getElementById("csign").innerHTML=tb_sign_text;
	//	 var msg = selyear + "\t" + selmonth + "\t" + selmonth + "\t" + selctranid + "\t" + selcsign + "\t" +selctext;
		 addRow();
	}
	
}



/**
 * 首张
 */
function firstUser() {
	if (keyList==null) return;
	 if (curKey==0) return ;
	 curKey = 1;
	$('#TextList')[0].selectedIndex = curKey*1-1;
	$('#TranList')[0].selectedIndex = curKey*1-1;

	tranid = $("#TranList").find("option:selected").text();
	document.getElementById("csign").innerHTML = strNullProc(signList[curKey*1-1]);
	selctranid = tranid;
	queryUserBautotran(year, period, type, tranid);
	 
}



/**
 * 上张
 */
function upUser() {
	if (keyList==null) return;
	curKey--;
	 if (curKey<=1)
		 curKey = 1;
	$('#TextList')[0].selectedIndex = curKey*1-1;
	$('#TranList')[0].selectedIndex = curKey*1-1;

	tranid = $("#TranList").find("option:selected").text();
	document.getElementById("csign").innerHTML = strNullProc(signList[curKey*1-1]);
	selctranid = tranid;
	queryUserBautotran(year, period, type, tranid);
}


/**
 * 下张
 */
function downUser() {
	if (keyList==null) return;
	curKey++;
	if (curKey>=keyCount)
		 curKey = keyCount;
	$('#TextList')[0].selectedIndex = curKey*1-1;
	$('#TranList')[0].selectedIndex = curKey*1-1;

	tranid = $("#TranList").find("option:selected").text();
	document.getElementById("csign").innerHTML =strNullProc(signList[curKey*1-1]);
	selctranid = tranid;
	queryUserBautotran(year, period, type, tranid);
}


/**
 * 末张
 */
function lastUser() {
	if (keyList==null) return;
	if (curKey==0) return ;
	 curKey = keyCount;	  
	$('#TextList')[0].selectedIndex = curKey*1-1;
	$('#TranList')[0].selectedIndex = curKey*1-1;

	tranid = $("#TranList").find("option:selected").text();
	document.getElementById("csign").innerHTML = strNullProc(signList[curKey*1-1]);
	selctranid = tranid;
	queryUserBautotran(year, period, type, tranid);
}







