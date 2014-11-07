/**
 * 
 * @DESCRIBE   凭证组件和后台交互js
 * @AUTHOR     王丙建
 * @DATE       2012-09-17
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


  
  /**
   * 增加凭证
   * @param selObj
   */

var inputBz = null;//凭证录入状态，true或false，录入包括增加和修改，仅查询显示时如果凭证为不允许修改的，此值为false

//凭证操作类型
var dsignOpType = "";
var btnAddDsignClicked=false;//如果新增按钮被点击了的，说明是新增的凭证，则调用新增凭证action，否则调用修改凭证action，新增按钮状态将在查询凭证和保存凭证成功以及放弃凭证后赋值为false，即表示不是新增凭证




function addDsign(){
	
	
	  strdebitMoneyInputValue = "";

		rowsHeaderList = new Array();//初始化翻行控制的头部行集合
		rowsFooterList = new Array();//初始化翻行控制的底部行集合
		
	  var firstDsign = null;
	//凭证类别初始化
		$.ajax({
			url: "data/queryList.json",
			type: 'post',
			async:false,
			dataType: "json",
			success: function(data){
				dsignList =data.dsigns;
				if (dsignList.length==0) {
					jAlert("请首先初始化凭证类别！","提示");
					return ;
				}else{
					firstDsign = dsignList[0];
				}
			}
		});  
		
	  dsign_display_status = 0;
	  addDsignInfo(firstDsign);
	  curDsignFlag=0;
    inputBz = true;
    btnAddDsignClicked=true;//新增按钮被点击后btnAddDsignClicked值应为true
    oiwor = "add";
	 
	  
	  //!!!下面代码临时注释，请勿删除
	  /*
	  //使凭证科目录入各行不可编辑，有需要时才逐行启用
	  rowEditSet(2,false);
	  rowEditSet(3,false);
	  rowEditSet(4,false);
	  rowEditSet(5,false);
	  */
  }
  
  
  /**
   * 增加凭证页面初始化
   */
  function initInputAddDsign() {
	  inputBz = true;
	  //默认辅助核算都不可以用
     loadCodeAddInitInfo();
     //默认显示最后增加的一张凭证

     //初始化凭证显示
	 addDsign();
     

     
     
  }
  
  

  /**
   * 查询凭证
   * @param selObj
   */
  function queryDsign(){
	  
	  
	  

		$.ajax({
			url: "dsignCategory!queryList",
			type: 'post',
			async:false,
			dataType: "json",
			success: function(data){
				if (data.dsigns.length>0) {
					  //弹出凭证查询的窗体：
					  window.parent.openWindow('gl_billquery');
					
				}else{
					jAlert("没设置凭证类别，请先设置凭证类别");
				}
			}
		});

	  
	  
	  
/*
	  $.ajax({
		 	url:"dsignAccvouch!queryDsignAccvouch.action",
		 	type:"post",
		    async:false,
			
		 	dataType:"json",
		 	success:function(data,status){
		 		//得到后台查询的凭证组件对象
		 		var dsign = data.dsignGridAccvouch;
		 		queryDsignToAllDignData(dsign);
		 		
		 	}
		});
*/
	 
	  
	  
	  
	
  }
  
  
  

  /***
   * 增加凭证按钮
   */
  function btnAddDsign(){

	  tempErrorMassage="";
	  tempErrorDom=null;
  	var saveFlag = true;
  	//如果当前凭证为不允许修改的：
  	if(inputBz==false){
  		addDsign();
  	}else{
  		//如果新增按钮被点击了的，说明是新增的凭证，则调用新增凭证action，否则调用修改凭证action，新增按钮状态将在查询凭证和保存凭证成功以及放弃凭证后赋值为false，即表示不是新增凭证
  		if(btnAddDsignClicked==true || pageWindowId!="dsign"){
  			//调用saveDsignAccvouch,新增凭证。
  			saveFlag = addDsignAccvouch(null,"add");
  				if(tempErrorMassage!=""){
  					jAlert(tempErrorMassage,"提示",function(){
  						if(tempErrorDom!=null){
  							tempErrorDom.focus();
  						}
  					});
  	  				return;
  				}

  		}
  		
  		//调用updateDsignAccvouch，修改凭证
  		else{
  			
  			 //判断制单人与修改人是否是同一个人
  			 var producer = document.getElementById("producer").innerHTML;
  			 var clo = getCookie("userName");
  			 
  			 if(clo!=producer){
  				 jConfirm("你正在修改他人填制的凭证，确定要保存吗？","提示",function(flag){
  					 if(flag){

  			  			saveFlag = updateDsignAccvouch();
  			  			if(tempErrorMassage!=""){
  								jAlert(tempErrorMassage,"提示",function(){
  									if(tempErrorDom!=null){
  										tempErrorDom.focus();
  									}
  								});
  				  				//return;
  						}
  			  			
  			  			
  					 }else{
  						addDsign();
  					 }
  				 });
  				 
  				 return;
  				 
  				 
  				 
  			 }else{
  				 
  				 

  	  			saveFlag = updateDsignAccvouch();
  	  			if(tempErrorMassage!=""){
  						jAlert(tempErrorMassage,"提示",function(){
  							if(tempErrorDom!=null){
  								tempErrorDom.focus();
  							}
  						});
  		  				return;
  					}
  				 
  			 }

  			
  		}
  	}
  	
  	//如果保存成功，或者无分录行数据（返回null），则执行新增初始化
  	if(saveFlag==true || saveFlag==null){
  		
  		addDsign();
  	}
  	

  	
  }

  
  /**
   * 保存凭证按钮
   */
  function saveDsignAccvouch(pzlx){
	  window.parent.parent.updateScore('1-5',2);
	  jAlert("已完成计提工资的凭证保存工作！","计提工资",function(){
		  window.parent.closeWindow("wa_operate_dsign");
	  });
	  return;
	  
	  tempErrorMassage="";
	  tempErrorDom=null;
	  if(inputBz==false){
		 jAlert("当前凭证不允许修改","提示");
	  }else{
		  //如果新增按钮已被按下或不是总账凭证(当前窗体ID不是总账的凭证的ID)，那么调用addDsignAccvouch()
		  if(btnAddDsignClicked==true || pageWindowId!="dsign"){
		  		//调用saveDsignAccvouch,新增凭证。

				 var saveFlag = addDsignAccvouch(pzlx,"save");
	  			if(saveFlag==null){
	  				if(tempErrorMassage!=""){
		  				jAlert(tempErrorMassage,"提示",function(){
	  						if(tempErrorDom!=null){
	  							tempErrorDom.focus();
	  						}
	  					});
	  				}else{
	  					jAlert("请将凭证数据录入完整再保存！","提示");
	  				}
	  			}
	  			
	  		}
	  		
	  		//调用updateDsignAccvouch，修改凭证
	  		else{

	  			 //判断制单人与修改人是否是同一个人
	  			 var producer = document.getElementById("producer").innerHTML;
	  			 var clo = getCookie("userName");
	  			 

	  			 if(clo!=producer){
	  				 jConfirm("你正在修改他人填制的凭证，确定要保存吗？","提示",function(flag){
	  					 if(flag){
	  						 
	  						 

	  			  			var saveFlag = updateDsignAccvouch();
	  			  			if(saveFlag==null){
	  			  				
	  			  				if(tempErrorMassage!=""){
	  				  				jAlert(tempErrorMassage,"提示",function(){
	  			  						if(tempErrorDom!=null){
	  			  							tempErrorDom.focus();
	  			  						}
	  			  					});
	  			  				}else{
	  			  					jAlert("请将凭证数据录入完整再保存！","提示");
	  			  				}
	  			  			}

	  						 
	  						 
	  					 }
	  				 });
	  			 }else{
	  				 
	  				 

	 	  			var saveFlag = updateDsignAccvouch();
	 	  			if(saveFlag==null){
	 	  				
	 	  				if(tempErrorMassage!=""){
	 		  				jAlert(tempErrorMassage,"提示",function(){
	 	  						if(tempErrorDom!=null){
	 	  							tempErrorDom.focus();
	 	  						}
	 	  					});
	 	  				}else{
	 	  					jAlert("请将凭证数据录入完整再保存！","提示");
	 	  				}
	 	  			}

	  				 
	  				 
	  			 }

	  			
	  			
	  			
	  		}
	  }
	  
	  
	  
  }
  
  
  
  
  
  /***
   * 数据库新增凭证
   */
  function addDsignAccvouch(pzlx,action){
	  var saveFlag=false;

	  var data = saveDsignByAction(); 
	  
	  //如果没有分录行数据则返回null用于新增按钮判断是否需要初始化新增动作。
	  if(data==null){
		  return null;
	  }
	  if (data==undefined || data==false){
		  return false;
	  }
	  
	  
	  var dts = $.param(data).replace(new RegExp("%5D","gm"),"").replace(new RegExp("%5B","gm"),".");
		 $.ajax({
			  url: "dsignAccvouch!createDsignAccvouch.action",
				type: 'post',
				data: dts,
   			    async:false,
   			    setRequestHeader:"'Content-Type','application/x-www-form-urlencoded'", 
   			    complete:the_results,
				dataType: "json",
				success: function(data){
					if(data.flag=="1"){
						jAlert("保存成功！","提示",function(){
							
							if(action=="save"){
								
								//添加成功后重新查询一下添加的凭证，以确保修改时可以取得分录行id
								var curAccvouchKey=new Object();
								curAccvouchKey.iyear = getCookie("yearName");
								curAccvouchKey.iperiod = getCookie("iperiod");
								curAttribute380 = document.getElementById("dsignType").getAttribute('value');
								curAccvouchKey.attribute380 = curAttribute380;
								curAccvouchKey.csign = document.getElementById("dsignType").innerHTML;
								curAccvouchKey.inoId = document.getElementById("dsignNumber").innerHTML;
								curAccvouchKey.dbillDate =  document.getElementById("producerDate").value;
								
								queryOneDsignAccvouchByAccvouchkey(curAccvouchKey);
								
							}
						});

						btnAddDsignClicked=false;//新增成功后再点保存就应该执行修改，故设此变量意为非点了新增按钮。
						
						saveFlag = true;

						//如果是转账,工资分摊的凭证，显示已生成
						if (pzlx=="zzpz"||pzlx=="txpz") {
							document.getElementById("yishengchengDsignimg").style.display = "block";
						}

						dsign_display_status = 1;
					}else{
						jAlert("无法保存凭证，请检查填制内容是否完整和正确！","提示");
						saveFlag = false;
					}
					
					
				}
			  });
		 return saveFlag;
  }
  
  
  /***
   * 修改凭证方法，点击新增按钮时调用此方法，如果是查询出来的凭证，正好，如果是新增的凭证
   */
  function updateDsignAccvouch(){
	  var saveFlag=false;
	  var data = saveDsignByAction(); 

	  //如果没有分录行数据则返回null用于新增按钮判断是否需要初始化新增动作。
	  if(data==null){
		  return null;
	  }
	  if (data==undefined || data==false){
		  return false;
	  }
	  
	  var dts = $.param(data).replace(new RegExp("%5D","gm"),"").replace(new RegExp("%5B","gm"),".");
		 
	 $.ajax({
		  url: "dsignAccvouch!updateDsignAccvouch.action",
			type: 'post',
			data: dts,
		    async:false,
		    setRequestHeader:"'Content-Type','application/x-www-form-urlencoded'", 
		    complete:the_results,
			dataType: "json",
			success: function(data){

			     //显示最后增加的凭证
			     //showLastDsign();
				saveFlag = true;
				var clo = getCookie("userName");
				document.getElementById("producer").innerHTML=clo;
			},
			error:function(data){
				jAlert("凭证修改失败！","提示");
				saveFlag = false;
			}
		  });
			 
	  return saveFlag;
	  
  }
  
  
  
  
  
  
  
  
  
  //出错处理
  var the_results = function(XMLHttpRequest, textStatus){
		
		if(textStatus == "error"){
			
		 	msg = "请求出错！";
		 	jAlert(msg,"提示");
		}
		else if(textStatus == "timeout"){
		 msg = "请求超时！";
		 jAlert(msg,"提示");
		}
		else if(textStatus == "parsererror"){
		 msg = "JSON数据格式有误！";
		 jAlert(msg,"提示");
		}else if (textStatus != "success"){
		 msg = "失败";
		 jAlert(msg+textStatus,"提示");
		}
  };
  
  
  /**
   * 凭证字选择判断函数
   * 陈建宇 2013-6-3
   */
  function dsignTypeSelect(s){
	  if(s.selectedIndex<0){
		  jAlert('请选择凭证字',"提示",function(){
			  
			  s.focus();
		  });
		  return false;
	}
	  s.parentNode.setAttribute("value",s.value);
	  s.parentNode.innerHTML=s.options[s.selectedIndex].text;
  }

  /**
   * 双击凭证字，改变凭证类别
   * 陈建宇 2013-1-15
   */
  var dsignList = null;
  
  function changeDsignType(e){
	  //如果凭证处于查询显示状态，则不允许修改凭证字
	  if(dsign_display_status==1)return false;

	var evt=(window.event || e);//获得事件
	var evtsrc = (evt.srcElement || evt.target);
	if(evtsrc.tagName != "SPAN"){
		return false;
	}
	  var target = document.getElementById("dsignType");
	  var tempValue = target.innerHTML;
	  
	  selectHTML  = "<select   onchange='dsignChange();'  value='"+tempValue+"' onblur='dsignTypeSelect(this);' style='height:18px;border:none;width:36px;margin-left:-5px;'/>";
	
	//凭证类别初始化
		$.ajax({
			url: "dsignCategory!queryList",
			type: 'post',
			async:false,
			dataType: "json",
			success: function(data){
				dsignList =data.dsigns;
				$.each(dsignList,function(index,dsign){
					//$("#signList")[0].options.add(new Option(dsign.ctext,dsign.csign,false,false));
					selectHTML += "<option value='" + dsign.id + "'>" + dsign.csign + "</option>";
					
				});
			}
		});  
	selectHTML += "</select>";
	target.innerHTML=selectHTML;
	target.getElementsByTagName("select")[0].value=tempValue;
	target.getElementsByTagName("select")[0].focus();
	
  }
  
  /**
   * 凭证类别改变事件
   */
  function dsignChange() {
	var tempValue = document.getElementById("dsignType").getElementsByTagName("select")[0].value;
	 
	//记&nbsp;账&nbsp;凭&nbsp;证
	for (var i = 0; i<dsignList.length; i++) {
		var dsign = dsignList[i];
		if (dsign.id==tempValue) {
			//把凭证名称拆分为字符数组，每个字符之间增加空格
			var textList = dsign.ctext.split("");
			var selDsignName = "";
			for (var j= 0; j<textList.length; j++) {
				selDsignName = selDsignName + textList[j] + "&nbsp;";
			}
			document.getElementById("dsignName").innerHTML = selDsignName;
		};
	} ;
	   
	//获取凭证编号
	newSelectedDate = document.getElementById("producerDate").value;
	   $.ajax({
		 	url:"dsignAccvouch!queryInsDsignAccvouchInoId.action?newSelectedDate=" + newSelectedDate + "&attribute380=" + tempValue,
		 	type:"post",
		 	dataType:"json",
		 	success:function(data,status){
		 		document.getElementById("dsignNumber").innerHTML = data.title.dsignNumber;
		 	}
		});
        
	
  }
  
  /**
   * 弹出辅助核算窗体
   */
  function openOtherInfoWindow(curcodeAddInfo,rowNumber) {
	  
	  
	  //如果有项目核算，检查是否已指定项目大类
	  if(curcodeAddInfo[0]==1 && (curcodeAddInfo[7]==null || curcodeAddInfo[7]=="")){
		  jAlert("此项目核算科目没有指定项目大类");
		  return false;
	  }
	  
	  
	  var param = {};
	    // 科目的辅助核算信息
	    param.rowNumber=rowNumber;
		param.curcodeAddInfo = curcodeAddInfo;
		param.selcode = null;//curcodeAddInfo[7];
		
		//param.items = null;
		
		
		param.items=new Object();
		
		//项目
		param.items.subjectProjectId = document.getElementById("subjecProject").getAttribute("dbValue");
		param.items.subjectProjectName = document.getElementById("subjecProject").value;
		
		//部门
		param.items.subjectDeptId = document.getElementById("subjectDept").getAttribute("dbValue");
		param.items.subjectDeptName = document.getElementById("subjectDept").value;
		
		//个人
		param.items.subjectPersonId = document.getElementById("subjecPerson").getAttribute("dbValue");
		param.items.subjectPersonName = document.getElementById("subjecPerson").value;

		//客户
		param.items.subjectCustomerId = document.getElementById("subjectCustomer").getAttribute("dbValue");
		param.items.subjectCustomerName = document.getElementById("subjectCustomer").value;
	

		//供应商
		param.items.subjectSupId = document.getElementById("subjectSup").getAttribute("dbValue");
		param.items.subjectSupName = document.getElementById("subjectSup").value;
	
		
		//业务员
		param.items.subjectBusinessId = document.getElementById("subjectBusiness").getAttribute("dbValue");
		param.items.subjectBusinessName = document.getElementById("subjectBusiness").value;
		
	
		//结算方式
		param.items.subjectJsfsId = document.getElementById("subjectJsfs").getAttribute("dbValue");
		param.items.subjectJsfsName = document.getElementById("subjectJsfs").value;
		
		
		//票号
		param.items.ticketNumber = document.getElementById("ticketNumber").value;
		//发生日期
		param.items.subjectDate = document.getElementById("subjectDate").value;
		
		
		//单价
		param.items.subjectPrice = document.getElementById("subjectPrice").value;
		//数量
		param.items.subjectNumber = document.getElementById("subjectNumber").value;
		
		
		
		
		
		
		
		
		
		window.parent.openWindow('dsign_auxiliaryoptions',pageWindowId,param);
		
		
		 xaction="editOtherInfo";
		 
		 

  }
  
  
  /**
   * 双击票号、日期、项目、部门、个人、客户、业务员时，弹出编辑窗体。
   * 如果科目已取消过辅助核算录入，双击核算区各控件时以add方式弹出辅助填写窗，
   * 如果未取消过，则当作是修改，以update方式弹出辅助填写窗
   * 陈建宇 2013-1-15
   */
  function editOtherInfo(){
	  
	  if(inputBz == false) return false;
	//判断如果该科目没有辅助核算，则不需要弹出辅助核算窗退出函数。
	var kemuInputBox = document.getElementById("r"+row+"_c2");
	var hasOtherInfo = null;
	
	try{
		hasOtherInfo = kemuInputBox.getAttribute("hasOtherInfo");
	}catch(e){
		hasOtherInfo = null;
	}
	
	var cancelOtherInfoEditFlag = null;
	try{
		cancelOtherInfoEditFlag = kemuInputBox.getAttribute("cancelOtherInfoEditFlag");
	}catch(e){
		cancelOtherInfoEditFlag = null;
	}
	
	
	//如果如果科目已取消过辅助核算录入，hasOtherInfo=true，以弹出窗体填写辅助核算信息
	if(cancelOtherInfoEditFlag==true || cancelOtherInfoEditFlag=='true'){
		hasOtherInfo=true;
	}
	
	if(hasOtherInfo==null || hasOtherInfo==undefined) return;
	
	if(hasOtherInfo==true || hasOtherInfo=="true"){

		
		var param = {};
		param.rowNumber = row;
		
		var code = $("#r"+row+"_c2").attr("dbValue").split("#")[0];
		if(code!="" && code!="null"){
			
			curCodeObj=getCurCodeObjByCodeOrName(code);//防止查询完凭证后直接双击底部辅助核算区curCodeObj为Null的情况。
		}
		
		param.curcodeAddInfo=getCodAddInfo(curCodeObj);;
		param.selcode=null;
		param.items=new Object();
		
		//项目
		param.items.subjectProjectId = document.getElementById("subjecProject").getAttribute("dbValue");
		param.items.subjectProjectName = document.getElementById("subjecProject").value;
		
		//部门
		param.items.subjectDeptId = document.getElementById("subjectDept").getAttribute("dbValue");
		param.items.subjectDeptName = document.getElementById("subjectDept").value;
		
		//个人
		param.items.subjectPersonId = document.getElementById("subjecPerson").getAttribute("dbValue");
		param.items.subjectPersonName = document.getElementById("subjecPerson").value;

		//客户
		param.items.subjectCustomerId = document.getElementById("subjectCustomer").getAttribute("dbValue");
		param.items.subjectCustomerName = document.getElementById("subjectCustomer").value;
	

		//供应商
		param.items.subjectSupId = document.getElementById("subjectSup").getAttribute("dbValue");
		param.items.subjectSupName = document.getElementById("subjectSup").value;
	
		
		//业务员
		param.items.subjectBusinessId = document.getElementById("subjectBusiness").getAttribute("dbValue");
		param.items.subjectBusinessName = document.getElementById("subjectBusiness").value;
		
	
		//结算方式
		param.items.subjectJsfsId = document.getElementById("subjectJsfs").getAttribute("dbValue");
		param.items.subjectJsfsName = document.getElementById("subjectJsfs").value;
		
		
		//票号
		param.items.ticketNumber = document.getElementById("ticketNumber").value;
		//发生日期
		param.items.subjectDate = document.getElementById("subjectDate").value;
		
		
		//单价
		param.items.subjectPrice = document.getElementById("subjectPrice").value;
		//数量
		param.items.subjectNumber = document.getElementById("subjectNumber").value;
		
		
		
		//弹出辅助核算窗体，进行修改。
		window.parent.openWindow('dsign_auxiliaryoptions',pageWindowId,param);
		
		
		if(cancelOtherInfoEditFlag==true || cancelOtherInfoEditFlag=='true'){
			codeOtherInfoOperateType="add";//设置辅助核算操作类型为添加，用于在返回值处理函数中根据此值决定光标走向
		}else{
			codeOtherInfoOperateType="update";//设置辅助核算操作类型为修改，用于在返回值处理函数中根据此值决定光标走向
		}
		
		 xaction="editOtherInfo";
	
	}
	
  }

  /**
   * 作废/恢复当前凭证
   * 王丙建 2013-06-14
   */
  function zuofeiDsignAccvouch() {
	  
	  
	  
	  
	  /***
	   * 以下业务存在缺陷：
	   * C/S版中如果制单人不为本人，作废和恢复时应给出提示，根据用户决定是否执行作废和恢复，若执行，同时修改凭证制单人为本人。
	   */
	  
	  var curDsignSelectedDate=document.getElementById("producerDate").value;
      var curAtt380 = document.getElementById("dsignType").getAttribute("value");
      var curDsginPzbh = document.getElementById("dsignNumber").innerHTML;
      
      
      
      var url = "dsignAccvouch!zuofeiDsignAccvouch.action?curAtt380=" + curAtt380 
                + "&selectedDate=" + curDsignSelectedDate + "&pzbh=" + curDsginPzbh;
      
      var isoutsignurl = "dsignAccvouch!isOutDsignAccvouch.action?curAtt380=" + curAtt380 
     + "&selectedDate=" + curDsignSelectedDate + "&pzbh=" + curDsginPzbh;
     
      
      //已复核、已出纳签字、已记账的凭证不能作废 
      if(strNullProc(curDsignAuditId)!=""){
    	  jAlert("已审核的凭证，不允许作废！","提示");
    	  return;
      }
      
      if(strNullProc(curDsignBookkeeperId)!=""){
    	  jAlert("已记账的凭证，不允许作废！","提示");
    	  return;
      }
      
	 if(strNullProc(curDsignCashierId)!=""){
		 jAlert("已出纳签字的凭证，不允许作废！","提示");
   	  	return;
	 }
	/* 
	 if(curDsignFlag==1){
		 jAlert("已作废的凭证，不能再次作废！","提示");
	   	  	return;
	}
	 */
     $.ajax({
	  		url: isoutsignurl,
	  		type: 'post',
	  		async:false,
	  		dataType: "json",
	  		success: function(data){
	  			var isoutsign = data.isoutsign;
	  			if (isoutsign==true) {
	  		    	 jAlert("外部凭证不允许作废/恢复！");
	  		    	 return;
	  		     }
	  		     else {
	  			  	if (curDsignFlag!=1) {

	  				      $.ajax({
	  				  		url: url,
	  				  		type: 'post',
	  				  		async:false,
	  				  		dataType: "json",
	  				  		success: function(data){
	  				  		curDsignFlag=1;
	  				  		document.getElementById("zuofeiDsignimg").style.display = "block";

	  				  		}
	  				  	});
	  			  	}
	  			  	else {
	  			  		cancelzuofeiDsignAccvouch();	
	  			  	}
	  			  }
	  		}
	  	});
     
     
     
	    
  }
  
  
  /**
   * 取消作废凭证
   */
  function cancelzuofeiDsignAccvouch() {
	  var curDsignSelectedDate=document.getElementById("producerDate").value;
      var curAtt380 = document.getElementById("dsignType").getAttribute("value");
      var curDsginPzbh = document.getElementById("dsignNumber").innerHTML;
      var url = "dsignAccvouch!cancelZuofeiDsignAccvouch.action?curAtt380=" + curAtt380 
                + "&selectedDate=" + curDsignSelectedDate + "&pzbh=" + curDsginPzbh;
  	$.ajax({
  		url: url,
  		type: 'post',
  		async:false,
  		dataType: "json",
  		success: function(data){

  			curDsignFlag = 0;//设置凭证作废状态为未作废
  			document.getElementById("zuofeiDsignimg").style.display = "none";
  			
  		}
  	});
  }

  
  /**
   * 整理凭证
   * 王丙建 2013-06-14
   */
  function zhengliDsignAccvouch() {
	  
	  //弹出整理凭证窗体：
	  window.parent.openWindow('dsign_kjqjxz');
  
  }
  