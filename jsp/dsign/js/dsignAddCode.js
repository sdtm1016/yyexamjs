/**
 * 
 * @DESCRIBE   凭证组件：科目辅助核算js
 * @AUTHOR     王丙建
 * @DATE       2013-01-09
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

/**
 * 根据科目辅助核算信息，设置辅助核算的输入控制
 */

var codeAddinfo_split = "#";



/**
 *  增加时首先加载科目辅助核算初始化信息 
 */
function loadCodeAddInitInfo() {
	
	//个人核算
	 document.getElementById("subjecPerson").style.display="none";
	//部门核算
	 document.getElementById("subjectDept").style.display="none";
	 
	//客户核算
	 document.getElementById("customerSpan").style.display="block";
	 document.getElementById("subjectCustomer").style.display="none";

	//供应商
	 document.getElementById("supSpan").style.display="none";
	 document.getElementById("subjectSup").style.display="none";
			 
	//业务员
	 document.getElementById("subjectBusiness").style.display="none";

	 
	//项目核算
	 document.getElementById("subjecProject").style.display="none";
	 
	 //结算方式
	 document.getElementById("subjectJsfs").style.display="none";
	 
	//票号日期核算
	 document.getElementById("ticketNumber").style.display="none";
	 document.getElementById("subjectDate").style.display="none";
 	//单价数量核算
	 document.getElementById("subjectPrice").style.display="none";
	 document.getElementById("subjectNumber").style.display="none";
	 
	 $("#units").hide();//隐藏单位
	
	 //设置辅助核算区域光标样式：

	 $(".z_tab_06").css("cursor","url(images/pen.cur)");
	 $(".z_tab_05_td_1").css("cursor","url(images/pen.cur)");
	 $(".cursor_pen").css("cursor","url(images/pen.cur)");
	 

	 //清楚辅助核算的数据显示
	 
	//个人核算1
	 
	 document.getElementById("subjecPerson").value = "";
	 document.getElementById("subjecPerson").setAttribute("dbValue", "");
	//部门核算2
	 document.getElementById("subjectDept").value = "";
	 document.getElementById("subjectDept").setAttribute("dbValue", "");
	
	//客户核算3
	 document.getElementById("subjectCustomer").value = "";
	 document.getElementById("subjectCustomer").setAttribute("dbValue", "");
	

	//供应商核算4
	 document.getElementById("subjectSup").value = "";	
	 document.getElementById("subjectSup").setAttribute("dbValue", "");
	 
	//业务员核算4
	 document.getElementById("subjectBusiness").value = "";	
	 document.getElementById("subjectBusiness").setAttribute("dbValue", "");
	
	//项目核算5
	document.getElementById("subjecProject").value = "";
	document.getElementById("subjecProject").setAttribute("dbValue", "");
	
	//票号日期核算67
	  document.getElementById("ticketNumber").value = "";
	  document.getElementById("subjectDate").value = "";
	//单价数量核算89
	  document.getElementById("subjectPrice").value = "";
	  document.getElementById("subjectNumber").value ="";
	  
	  //结算方式。都显示票号
	  document.getElementById("subjectJsfs").value = "";
	  document.getElementById("subjectJsfs").setAttribute("dbValue", "");
		
    
	  //隐藏票号日期值之间的小横杠
	document.getElementById("shortLine1").style.display="none";
	 

	 $("#units").html("");//清空单位
	 //如果是IE7还得做点特殊处理
	 if(navigator.appName == "Microsoft Internet Explorer"){
	   if(navigator.appVersion.match(/7./i)=='7.'){
		   $(document.body).append("<div style=\"width:140px;height:1px;border-top:1px solid #000;position:absolute;top:379px;left:170px;\"></div>");
		   $(document.body).append("<div style=\"width:400px;height:1px;border-top:1px solid #000;position:absolute;top:413px;left:100px;\"></div>");
	   }
	 }
	 
}

/**
 * 弹出辅助核算窗体时，显示需要填写的辅助核算项目
 */
function showCodeAddInitInfo() {
	//个人核算
	 $("#subjecPerson").show().css("color","blue");
	//部门核算
	 $("#subjectDept").show().css("color","blue");
	
	 //客户核算，判断客户有值就显客户，供应商有值就显供应商
	 var v = $("#subjectCustomer").val();
	 if(v!="" && v!=null && v!="null"){
		 $("#customerSpan").show();
		 $("#subjectCustomer").show().css("color","blue");
		 $("#supSpan").hide();
		 $("#subjectSup").hide();
	 }
	 
	//供应商核算
	 v = $("#subjectSup").val();
	 if(v!="" && v!=null && v!="null"){
		 $("#customerSpan").hide();
		 $("#subjectCustomer").hide();
		 $("#supSpan").show();
		 $("#subjectSup").show().css("color","blue");
	 }
	 
	 
	//业务员核算
	 $("#subjectBusiness").show().css("color","blue");
	//项目核算
	 $("#subjecProject").show().css("color","blue");
	 
	//结算方式subjectJsfs
	 $("#subjectJsfs").show().css("color","blue");
	 
	 
	//票号日期核算
	 v = $("#ticketNumber").val();
	 if(v!="" && v!=null && v!="null"){
		 $("#shortLine1").show();
		 $("#ticketNumber").show().css("color","blue");
	 }
	 
	 
	 
	 $("#subjectDate").show().css("color","blue");
	//单价数量核算
	 $("#subjectPrice").show().css("color","blue");
	 $("#subjectNumber").show().css("color","blue");
	 
	 
	 $("#units").show();//显示单位
	
	 
	 
	 
	 


}



/**
 * 得到输入科目辅助核算的值
 * 为了组装字符串方便，空字符串用0代替
 */
function getCodeAddInputInfo(code) {

	 //个人核算ID
	 var addValue1 = document.getElementById("subjecPerson").getAttribute("dbValue");
	//个人核算名称
	 var addValue2 = document.getElementById("subjecPerson").value;

	 //部门核算ID
	 var addValue3 = document.getElementById("subjectDept").getAttribute("dbValue");
	//部门核算名称
	 var addValue4 = document.getElementById("subjectDept").value;

	 //客户核算ID
	 var addValue5 = document.getElementById("subjectCustomer").getAttribute("dbValue");
	//客户核算名称
	 var addValue6 =  document.getElementById("subjectCustomer").value;	

	 //供应商ID
	 var addValue7 = document.getElementById("subjectSup").getAttribute("dbValue");
	 //供应商名称
	 var addValue8 =  document.getElementById("subjectSup").value;	
	 

	 //业务员核算ID
	 var addValue9 = document.getElementById("subjectBusiness").getAttribute("dbValue");
	//业务员核算名称
	 var addValue10 = document.getElementById("subjectBusiness").value;	

	 //项目核算ID
	 var addValue11 = document.getElementById("subjecProject").getAttribute("dbValue");
	//项目核算名称
	 var addValue12 = document.getElementById("subjecProject").value;
	
	 //结算方式
	 var addValue13 = document.getElementById("subjectJsfs").getAttribute("dbValue");
	 var addValue14 = document.getElementById("subjectJsfs").value;
	 
	//票号日期核算
	 var addValue15 = document.getElementById("ticketNumber").value;
	 var addValue16  = document.getElementById("subjectDate").value;
	 
	//单价数量核算
	 var addValue17 = document.getElementById("subjectPrice").value;
	 var addValue18 = document.getElementById("subjectNumber").value;
	 
		 
		
	 
    
	 if (addValue1=="") addValue1 = "0";
	 if (addValue2=="") addValue2 = "0";
	 if (addValue3=="") addValue3 = "0";
	 if (addValue4=="") addValue4 = "0";
	 if (addValue5=="") addValue5 = "0";
	 if (addValue6=="") addValue6 = "0";
	 if (addValue7=="") addValue7 = "0";
	 if (addValue8=="") addValue8 = "0";
	 if (addValue9=="") addValue9 = "0";
	 if (addValue10=="") addValue10 = "0";
	 if (addValue11=="") addValue11 = "0";
	 if (addValue12=="") addValue12 = "0";
	 if (addValue13=="") addValue13 = "0";
	 if (addValue14=="") addValue14 = "0";
	 if (addValue15=="") addValue15 = "0";
	 if (addValue16=="") addValue16 = "0";
	 if (addValue17=="") addValue17 = "0";
	 if (addValue18=="") addValue18 = "0";
	 
	 
	 var addValue = code + codeAddinfo_split
	               + addValue1 + codeAddinfo_split
	               + addValue2 + codeAddinfo_split
	               + addValue3 + codeAddinfo_split
	               + addValue4 + codeAddinfo_split
	               + addValue5 + codeAddinfo_split
	               + addValue6 + codeAddinfo_split
	               + addValue7 + codeAddinfo_split
	               + addValue8 + codeAddinfo_split
	               + addValue9 + codeAddinfo_split
	               + addValue10 + codeAddinfo_split
	               + addValue11 + codeAddinfo_split
	               + addValue12 + codeAddinfo_split
	               + addValue13 + codeAddinfo_split
	               + addValue14 + codeAddinfo_split
	               + addValue15 + codeAddinfo_split
	               + addValue16 + codeAddinfo_split
	               + addValue17 + codeAddinfo_split
	               + addValue18 ;
	 return addValue;
}



/**
 * 显示科目辅助核算信息
 */

function showCodeAddinfo(dbValue) {
	
	
	var addinfoValue = dbValue.split(codeAddinfo_split);
	
	
	
	//显示辅助核算信息
	if (addinfoValue.length==19) {

		
		
		//个人ID
		 document.getElementById("subjecPerson").setAttribute("dbValue", strNullProc(addinfoValue[1]));
		//个人名称
		 document.getElementById("subjecPerson").value = strZeroProc(addinfoValue[2]);
		 
		//部门ID
		 document.getElementById("subjectDept").setAttribute("dbValue", strNullProc(addinfoValue[3]));
		//部门名称
		 document.getElementById("subjectDept").value =  strZeroProc(addinfoValue[4]);
		 
		//客户ID
		 document.getElementById("subjectCustomer").setAttribute("dbValue", strNullProc(addinfoValue[5]));
		//客户名称
		 document.getElementById("subjectCustomer").value =  strZeroProc(addinfoValue[6]);

		//供应商ID
		 document.getElementById("subjectSup").setAttribute("dbValue", strZeroProc(addinfoValue[7]));
		//供应商名称
		 document.getElementById("subjectSup").value =  strZeroProc(addinfoValue[8]);
		 
		//业务员id13
		 document.getElementById("subjectBusiness").setAttribute("dbValue", strNullProc(addinfoValue[9]));
		 //业务员名称
		 document.getElementById("subjectBusiness").value =  strZeroProc(addinfoValue[10]);
		 
		//项目id14
		 document.getElementById("subjecProject").setAttribute("dbValue", strNullProc(addinfoValue[11]));
		 //项目名称
		 document.getElementById("subjecProject").value =  strZeroProc(addinfoValue[12]);
		 
		//结算方式
		 document.getElementById("subjectJsfs").setAttribute("dbValue", strNullProc(addinfoValue[13]));
		 document.getElementById("subjectJsfs").value = strZeroProc(addinfoValue[14]);
		 
		 
		//票号日期核算
		 document.getElementById("ticketNumber").value =  strZeroProc(addinfoValue[15]);
		 
		 if(strZeroProc(addinfoValue[15])!=""){
			 document.getElementById("shortLine1").style.display="block";
		 }else{
			 document.getElementById("shortLine1").style.display="none";
		 }
		 
		 
		 document.getElementById("subjectDate").value =  strZeroProc(addinfoValue[16]);
		
		 //如果数量有值
		 if(addinfoValue[18]!="" && addinfoValue[18]!="0" && addinfoValue[18]!=0){
			//单价数量核算，单价=金额/数量
			 var sl = parseFloat(strZeroProc(addinfoValue[18])).toFixed(5);//数量
			 
			 var jfje = getDebitMoney(row);//借方金额
			  
			 var dfje = getCreditMoney(row);//贷方金额
			  
			 //alert("jfje:"+jfje+"\r\ndfje:"+dfje);
			  var danjia = 0;
			  if(jfje!=0){
				  danjia = parseFloat(jfje/sl/100).toFixed(5);//单价=借方金额/100/数量
			  }else if(dfje!=0){
				  danjia = parseFloat(dfje/sl/100).toFixed(5);//单价=贷方金额/100/数量
			  }
			  
			  try{
				  var tmpdj = parseInt(danjia,10);
				  if(tmpdj<0){
					  danjia = Math.abs(tmpdj);
				  }
				  var tmpsl = parseInt(sl,10);
				  if(tmpsl<0){
					  sl = Math.abs(tmpsl);
				  }
				  
			  }catch(e){
				  
			  }
			  
			  
			 document.getElementById("subjectPrice").value =  danjia;//strZeroProc(addinfoValue[17]);
			 document.getElementById("subjectNumber").value =  sl;
			 
			 var ccode = addinfoValue[0];
			//根据输入值匹配科目编码或者名称，如果存在返回科目对象
			 var codeObj = getCurCodeObjByCodeOrName(ccode);
			 var codeAddInfo = getCodAddInfo(codeObj);
			 $("#units").html(codeAddInfo[6]);
			 $("#units").show();//显示单位
			   
		}
		 showCodeAddInitInfo();
					 
	}
	//辅助核算信息清空
	else {
		loadCodeAddInitInfo();
	}
   
}
