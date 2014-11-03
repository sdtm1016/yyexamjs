/**
 * 
 * @DESCRIBE   总账查询条件界面js
 * @AUTHOR     王丙建
 * @DATE       2013-01-21
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

//得到科目的级次信息
	function grademark(){
		var result="";
		$.ajax({
		    url: "gradedefAction!gradedefContrue?keyword=code",
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	if(data.gradedef!=null){
		    		$("#codenum").val(data.gradedef.codingrule.length);
		    	}
		    }
		});
		return result;
	}
     //科目级次下翻按钮操作
	function downcode(temp){
		if(temp=="1"){
			var begin=$("#begin").val()-1;
			var end=$("#end").val();
			if(begin<=end){
				if(begin>=1){
					$("#begin").val(begin);	
				}
			}
		}else if(temp=="2"){
			var begin=$("#begin").val();
			var end=$("#end").val()-1;
			if(begin<=end){
				if(end>=1){
					$("#end").val(end);	
				}
			}
		}
	}
	//科目级次上翻按钮操作
	function upcode(temp){
		var max=$("#codenum").val()-0;
		if(temp=="1"){
			var begin=$("#begin").val()-0+1;
			var end=$("#end").val();
			if(begin<=end){
				if(begin<=max){
					$("#begin").val(begin);	
				}
			}
		}else if(temp=="2"){
			var begin=$("#begin").val();
			var end=$("#end").val()-0+1;
			if(begin<=end){
				if(end<=max){
					$("#end").val(end);	
				}
			}
		}
	}
	//选中末级科目操作
	function lastcode(){
		var last=$("#lastcodebutton");
		if(last.attr("checked")=="checked"){
			$("#def").css("color","#808080");
			$("#beginup").attr("disabled",true);
			$("#begindown").attr("disabled",true);
			$("#enddown").attr("disabled",true);;
			$("#endup").attr("disabled",true);
			$("#begin").attr("disabled",true);
			$("#end").attr("disabled",true);
			$("#end").val("");
			$("#begin").val("");
			$("#islast").val("0");
		}else{
			$("#def").css("color","#000000");
			$("#beginup").attr("disabled",false);
			$("#begindown").attr("disabled",false);
			$("#enddown").attr("disabled",false);;
			$("#endup").attr("disabled",false);
			$("#begin").attr("disabled",false);
			$("#end").attr("disabled",false);
			$("#end").val("1");
			$("#begin").val("1");
			$("#islast").val("1");
		}
	}
	//未记账凭证操作
	function isnoacc(temp){
		var isnoacc=$(temp);
		if(isnoacc.attr("checked")=="checked"){
			$("#isnoacc").val("0");
		}else{
			$("#isnoacc").val("1");
		}
	}
	//确认事件，根据总账科目条件，显示满足条件的总账详细列表信息
	function doselect(){
		var param="";
		var firstcode=$("#firstcode").val();
		if (firstcode=="") firstcode = "1001";
		
		var lastcode=$("#lastcode").val();
		if (lastcode=="") lastcode = "1001";
		
		var begin=$("#begin").val();
		if (begin=="") begin = "null";
		
		var end=$("#end").val();
		if (end=="") end = "null";
		//末级科目
		var islast=null;
		if ($("#lastcodebutton").attr("checked"))
			islast= 1;
		else 
			islast= 0;
		
		//未记账凭证
		var isnoacc =  null;
		if ($("#lastisnoacc").attr("checked"))
			isnoacc= 1;
		else 
			isnoacc= 0;
			
		
		if (firstcode>lastcode) {
			jAlert("起始科目不能大于终止科目！","提示");
			return ;
		}
		
		
		param=firstcode+"#"+lastcode+"#"+begin+"#"+end+"#"+islast+"#"+isnoacc ;
		
		//弹出“总账”窗体（窗体div id为“gl_ledger_ledgerselect”）
		window.parent.openWindow('gl_ledger_ledgerselect','gl_ledger_ledgermanage',param);
		
		
	}

	var action="";
	
	/**
	 *实现传值函数
	 *陈建宇
	 */
	function deliverValue(valueObject){
		$("#"+action).val(valueObject.selKemuCode);
	}
	
	//选择账簿类型
	var selcsqlType="ZZZ";
	//选择账簿名称
	var selcsqlName = "11";
	//输入账簿名称
	var inputcslName = "";
	function addMyacccount() {
		
		inputcslName = prompt("请输入我的账簿名称");
	}
	
	//得到我的账簿查询条件
	function getCsqlDetail() {
	  var strRtn = "";
	  //起始科目
	  var firstcode=$("#firstcode").val();
	  if (firstcode=="") firstcode = "null";
	  //终止科目
	  var lastcode=$("#lastcode").val();
	  if (lastcode=="") lastcode = "null";
	  
	  //开始级次
	  var begin=$("#begin").val();
	  if (begin=="") begin = "null";
	  
	  //结束级次
	  var end=$("#end").val();
	  if (end=="") end = "null";
	
		
	  
	   //末级科目 选择1 否则0
		var islast=null;
		if ($("#lastcodebutton").attr("checked"))
			islast= 1;
		else 
			islast= 0;
		
		//未记账凭证  选择1 否则0
		var isnoacc =  null;
		if ($("#lastisnoacc").attr("checked"))
			isnoacc= 1;
		else 
			isnoacc= 0;
			
	  
		
		
	  strRtn = firstcode+"#"+lastcode+"#"+begin+"#"+end+"#"+islast+"#" + isnoacc;
	  return strRtn;
	}
	
	//保存我的账簿
	function saveMyacccount() {
		var csqlDetail= getCsqlDetail();
		
		if (inputcslName=="") {
			jAlert("名称不允许为空！","提示");
			return;
		}
		var data = "glMyacccount.csqlType=" + selcsqlType 
		          + "&glMyacccount.csqlName=" + inputcslName
                  + "&glMyacccount.csqlDetail=" + csqlDetail;
        var isuniqueness = true;
        
      //判断我的账簿名称是否唯一
        /**
       $.ajax({
			url: "myacccount!isUniquenessMyacccountByName.action",
			type: 'post',
			data:data,
			dataType: "json",
			async:false,
			success: function(data){
				isuniqueness = data.isuniqueness;
				if(data.isuniqueness==false){
					jAlert("该账簿名称经被使用，请重新输入账簿名称!","提示");
					return false;
				}
			}
		  });
		  */
		if (isuniqueness==true) {
	        $.ajax({
	         	url: "myacccount!create",
	          	type: 'post',
	          	data:data,
	          	dataType: "json",
	          	async:false,
	          	success: function(data){
	          		jAlert("我的账簿增加成功！","提示",function(){
	          			
	          			loadMyacccountZZZtree();
	          		});
	          	  }
	        });         
		}
		
	}
	
	//删除我的账簿
	function deleteMyacccount() {
		selcsqlName = selectName;
		var data = "glMyacccount.csqlType=" + selcsqlType 
        + "&glMyacccount.csqlName=" + selcsqlName;
		$.ajax({
			url: "myacccount!delete",
			type: 'post',
			data:data,
			dataType: "json",
			async:false,
			success: function(data){
				jAlert("我的账簿删除成功！","提示",function(){
					
					loadMyacccountZZZtree(); 
				});
			}
		});        
		
	}
