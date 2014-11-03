/**
 * 
 * @DESCRIBE   指定科目界面js
 * @AUTHOR     王丙建
 * @DATE       2013-03-19
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 * 
 * 待选科目{
 * select_1 (现金总账科目、银行总账科目)
 * select_1_1 (现金流量科目)
 * }
 * 
 * 已选科目{
 * select_2 (现金总账科目)
 * select_2_1 (银行总账科目)
 * select_2_2 (现金流量科目)
 * }
 * 
 */

/**
 * 页面初始化
 */

var flag=0;//  (0/1 : 现金总账科目 ；2：银行总账科目 ；3： 现金流量科目) 
var mark=0;//现金总账科目
var mark2=0; //银行总账科目
var mark3=0; //现金流量科目
var arr = new Array();// 现金、银行总账
var arr2 =new Array(); //现金流量

function doinit(){
	initCode();
	checkBcash();
}
/**
 * 初始化待选科目
 */
function initCode(){
	$.ajax({
	    url: "code!queryList.action",
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	showCode(data.codes);
		}
	});
}
/**
 * 显示待选科目
 * @param codeList
 */
function showCode(codeList) {
	var str="";
	var length = codeList.length;
	if(flag==3){
		$("#select_1_2").html("");			
	}else{
		$("#select_1").html("");			
	}
	if(flag==3){
		for (var i = 0; i<length; i++) {
			var code = codeList[i];
			var ccode = code.ccode;
			var ccodename = code.ccodeName;
			var bend=code.bend;//是否末级1是,0否
			if(bend==1){
				str="<option value='" + ccode +   "'>" + ccode + " " +  ccodename + "</option>";
				$("#select_1_2").append(str);	
			}
		}
	}else{
		for (var i = 0; i<length; i++) {
			var code = codeList[i];
			var ccode = code.ccode;
			var ccodename = code.ccodeName;
			var num=gradecontrue("code",ccode);
			var bbank=code.bbank;
			if(num==-2){
				if(bbank!=1){//如果是初次加载，去除现金科目
					str="<option value='" + ccode +   "'>" + ccode + " " +  ccodename + "</option>";
					$("#select_1").append(str);
				}
			}
		}
	}
}


/**
 * 确定按钮点击事件
 */
function setCode() {
	var	sel1=document.getElementById("select_2");
	var	sel2=document.getElementById("select_2_1");
	var	sel3=document.getElementById("select_2_2");
	/*现金*/
	   var str1 = "";
	   for(var i=0;i<sel1.options.length;i++){
		   var ccode = sel1.options[i].value;
		   str1 = str1 + "&setCodeList["  +i + "]=" + ccode;
	   }
	   var bcash=str1.substring(1);
	   if(str1!=null&&str1!=""){
		   $.ajax({
			    url: "code!setCodeBcash.action",
			    type: 'post',
			    dataType: "json",
			    data:bcash,
			    async:false,
			    success: function(data){		    	
				}
			}); 
	  }else{
		   $.ajax({
			    url: "code!executeUnSetCodeProperty.action?property=bcash",
			    type: 'post',
			    dataType: "json",
			    async:false,
			    success: function(data){
				}
			});
	  }
	  /*银行*/
	   var str2 = "";
	   for(var i=0;i<sel2.options.length;i++){
		   var ccode = sel2.options[i].value;
		   str2 = str2 + "&setCodeList["  +i + "]=" + ccode;
	   }
	   var bbank=str2.substring(1);
	   if(str2!=null&&str2!=""){
		   $.ajax({
			    url: "code!setCodeBbank.action",
			    type: 'post',
			    dataType: "json",
			    data:bbank,
			    async:false,
			    success: function(data){		    	
			    	//("银行总账科目设置成功！");
				}
			});
	   }else{
		   $.ajax({
			    url: "code!executeUnSetCodeProperty.action?property=bbank",
			    type: 'post',
			    dataType: "json",
			    async:false,
			    success: function(data){	
				}
			});
	   }
	  /*现金流量*/
	   var str3 = "";
	   for(var i=0;i<sel3.options.length;i++){
		   var ccode = sel3.options[i].value;
		   str3 = str3 + "&setCodeList["  +i + "]=" + ccode;
	   }
	   var bcashItem=str3.substring(1);
	   if(str3!=null&&str3!=""){
		   $.ajax({
			    url: "code!setCodeBcashItem.action",
			    type: 'post',
			    dataType: "json",
			    data:bcashItem,
			    async:false,
			    success: function(data){		    	
				}
			});
	  }else{
		   $.ajax({
			    url: "code!executeUnSetCodeProperty.action?property=bcashitem",
			    type: 'post',
			    dataType: "json",
			    async:false,
			    success: function(data){	
				}
			});
	  }
	   window.parent.closeWindow('finance_specify');
}

/**
 * 显示已选 科目
 * @param codeList
 */
function showSetCode(codeList) {
	var str="";
	var length = codeList.length;
	var sel="";
	if(flag==3){
		sel="select_1_2";
	}else{
		sel="select_1";
	}
	for (var i = 0; i<length; i++) {
		var code = codeList[i];
		var ccode = code.ccode;
		var ccodename = code.ccodeName;
		var bend=code.bend;
		var num=gradecontrue("code",ccode);
		if(flag==3){
			if(bend==1){
				str+="<option value='" + ccode +   "'>" + ccode + " " +  ccodename + "</option>";
			}else{
				continue;
			}
		}else {
			if(num==-2){
				str+="<option value='" + ccode +   "'>" + ccode + " " +  ccodename + "</option>";
			}else{
				continue;
			}
		}
		$("#"+sel+" option[value='"+ccode+"']").remove();
	}
	if(flag==0){
		$("#select_2").empty();			
		$("#select_2").append(str);
	}else if(flag==1){
		$("#select_2").append(str);
	}else if(flag==2){
		$("#select_2_1").append(str);
	}else if(flag==3){
		$("#select_2_2").append(str);
	}
}

/**
 * 选中现金总账科目
 */
function  checkBcash() {
	flag=1;
	mark++;
	$("#select_2_1").hide();
	$("#select_2_2").hide();
	$("#select_2").show();
	$("#select_1").show();
	$("#select_1_2").hide();
	if(mark==1){
		$.ajax({
		    url: "code!querySetCodeList.action?property=bcash",
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){    	
		    	showSetCode(data.codes);
			}
		});
	}
}
/**
 * 选中银行总账科目
 */
function  checkBbank() {
	flag=2;
	mark2++;
	$("#select_2").hide();
	$("#select_2_2").hide();
	$("#select_2_1").show();
	$("#select_1").show();
	$("#select_1_2").hide();
	if(mark2==1){
		$.ajax({
		    url: "code!querySetCodeList.action?property=bbank",
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){ 
		    	showSetCode(data.codes);
			}
		});
	}

}

/**
 * 选中现金流量科目
 */
function  checkBcashitem() {
	flag=3;
	mark3++;
	$("#select_2_1").hide();
	$("#select_2").hide();
	$("#select_2_2").show();
	$("#select_1").hide();
	$("#select_1_2").show();
	if(mark3==1){
		initCode();
		$.ajax({
		    url: "code!querySetCodeList.action?property=bcashitem",
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){    	
		    	showSetCode(data.codes);
			}
		});
	}
}

function moveUp(){
	//var s2 = document.getElementById("select_2");
	var s2 ="";
	var s1 = "";
	var index=0;
	if(flag==3){
		s1=document.getElementById("select_1_2");
	}else{
		s1=document.getElementById("select_1");
	}
	
	if(flag==0||flag==1){
		s2 = document.getElementById("select_2");
	}else if(flag==2){
		s2 = document.getElementById("select_2_1");
	}else if(flag==3){
		s2 = document.getElementById("select_2_2");
	}
	
	try{
		var so = s2.options[s2.selectedIndex];
		if(flag==3){
			index=arr2[so.value];	
		}else{
			index=arr[so.value];
		}
		s1.options.add(new Option(so.text,so.value));
		SortD(s1);
		//s1.options[index]=new Option(so.text,so.value);
		s2.remove(s2.selectedIndex);
	}catch(e){}
}
/**
 * 将待选科目排序
 * (2013-8-26) 
 * lyl
 * */
function SortD(box)   {
	var temp_opts = new Array();
	var temp = new Object();
	for(var i=0; i<box.options.length; i++)   {
	temp_opts[i] = box.options[i];
	}

	for(var x=0; x<temp_opts.length-1; x++)   {
	   for(var y=(x+1); y<temp_opts.length; y++)   {
	     if(temp_opts[x].text > temp_opts[y].text)   {
	      temp = temp_opts[x].text;
	      temp_opts[x].text = temp_opts[y].text;
	      temp_opts[y].text = temp;
	      temp = temp_opts[x].value;
	      temp_opts[x].value = temp_opts[y].value;
	      temp_opts[y].value = temp;
	         }
	       }
	}

	for(var i=0; i<box.options.length; i++)   {
	box.options[i].value = temp_opts[i].value;
	box.options[i].text = temp_opts[i].text;
	     }
	}

function sel_1_change(e){
	var checkIndex=$("#select_1 ").get(0).selectedIndex;
	var val=$("#select_1 ").val();
	arr[val]=checkIndex;
}
function moveDown(){

	//var s1 = document.getElementById("select_1");
	var s2 ="";
	var s1 = "";
	if(flag==3){
		s1=document.getElementById("select_1_2");
		//将选中的下标记录在arr里
		var index=s1.selectedIndex;
		var val=s1.options[index].value;
		arr2[val]=index;
	}else{
		s1=document.getElementById("select_1");
		//将选中的下标记录在arr里
		var index=s1.selectedIndex;
		var val=s1.options[index].value;
		arr[val]=index;
	}
	if(flag==0||flag==1){
		s2 = document.getElementById("select_2");
	}else if(flag==2){
		s2 = document.getElementById("select_2_1");
	}else if(flag==3){
		s2 = document.getElementById("select_2_2");
	}
	
	try{
		var so = s1.options[s1.selectedIndex];
		s2.options.add(new Option(so.text,so.value));
		s1.remove(s1.selectedIndex);
	}catch(e){}
}


function allMoveUp(){

	//var s1 = document.getElementById("select_1");
	//var s2 = document.getElementById("select_2");
	var s2 ="";
	var s1 = "";
	if(flag==3){
		s1=document.getElementById("select_1_2");
	}else{
		s1=document.getElementById("select_1");
	}
	if(flag==0||flag==1){
		s2 = document.getElementById("select_2");
	}else if(flag==2){
		s2 = document.getElementById("select_2_1");
	}else if(flag==3){
		s2 = document.getElementById("select_2_2");
	}
	
	try{
		while(s2.options.length>0){
			s1.options.add(new Option(s2.options[0].text,s2.options[0].value));
			s2.remove(0);
		}
	}catch(e){}
	
}


function allMoveDown(){

	//var s1 = document.getElementById("select_1");
	//var s2 = document.getElementById("select_2");
	var s2 ="";
	var s1 = "";
	if(flag==3){
		s1=document.getElementById("select_1_2");
	}else{
		s1=document.getElementById("select_1");
	}
	if(flag==0||flag==1){
		s2 = document.getElementById("select_2");
	}else if(flag==2){
		s2 = document.getElementById("select_2_1");
	}else if(flag==3){
		s2 = document.getElementById("select_2_2");
	}
	try{
		while(s1.options.length>0){
			s2.options.add(new Option(s1.options[0].text,s1.options[0].value));
			s1.remove(0);
		}
	}catch(e){}
	
}