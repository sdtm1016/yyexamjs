var tb = null;//“定义项目栏目”表格的引用变量
var currentSeletedRow = null;//“定义项目栏目”表格的当前被选中的行
var currentEditCell = null;//当前被编辑的单元格


  
  

//递计算框递增函数
function increasing(btn){
	var input = btn.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
	input.value = parseInt(input.value)+1;
}

//递计算框递减函数
function decline(btn){
	var input = btn.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
	input.value = parseInt(input.value)-1;
}


var currentPanelIndex=1;

//上一步
function prevPanel(){
	document.getElementById("z_zj_con_0"+currentPanelIndex).style.display="none";
	currentPanelIndex -= 1;
	document.getElementById("z_zj_con_0"+currentPanelIndex).style.display="block";
	setButtonDisplay(currentPanelIndex);
}

//下一步
function nextPanel(){
	document.getElementById("z_zj_con_0"+currentPanelIndex).style.display="none";
	currentPanelIndex += 1;
	document.getElementById("z_zj_con_0"+currentPanelIndex).style.display="block";
	setButtonDisplay(currentPanelIndex);
	
}
var crule="";
function  getRule() {
	//得到录入的项目每级级次值
	var r1 = $("#level1").val();
	var r2 = $("#level2").val();
	var r3 = $("#level3").val();
	var r4 = $("#level4").val();
	var r5 = $("#level5").val();
	var r6 = $("#level6").val();
	var r7 = $("#level7").val();
	var r8 = $("#level8").val();
	//通过依次判断输入的每级规则值，得到项目分类的级次值，判断依据：从1级开始依次判断值是否为0，为0时终止
	//1级不允许为0
    if (r1*1==0) {
    	jAlert("第1级级次值必须大于0");
    	return false;
    }
    if (r2*1==0) {
    	crule = r1;
    	return true;
    }
    if (r3*1==0) {
    	crule = r1 + r2;
    	return true;
    }
    if (r4*1==0) {
    	crule = r1 + r2+r3;
    	return true;
    }
    if (r5*1==0) {
    	crule = r1 + r2+r3+r4;
    	return true;
    }
    if (r6*1==0) {
    	crule = r1 + r2+r3+r4+r5;
    	return true;
    }
    if (r7*1==0) {
    	crule = r1 + r2+r3+r4+r5+r6;
    	return true;
    }
    if (r8*1==0) {
    	crule = r1 + r2+r3+r4+r5+r6+r7;
    	return true;
    }
    else {
    	crule = r1 + r2+r3+r4+r5+r6+r7+r8;
    	return true;
    }
   }
//完成
function finish(){
	
	//如果点击了第一个面板的完成
	if(currentPanelIndex==1){
		
		var radios = document.getElementsByName("radio2");
		var radioValue = null;
		
		for(var i=0;i<radios.length;i++){
			if(radios[i].checked==true){
				radioValue = radios[i].value;
			}
		}
		
		//如果选择了“使用存货目录定义项目”
		if(radioValue=="radio2_2"){
			
		}
		
		//如果选择了“现金流量项目”
		if(radioValue=="radio2_4"){
			
		}
		
		//如果选择了收支分类科目”
		if(radioValue=="radio2_5"){
			
		}
		
	}
	
	//如果点击了第三个面板的完成
	if(currentPanelIndex==3){
		//项目大类修改说需要数据
		var fitemClass=$("#itemBigClass").val();
		var newItemBigName=$("#newItemBigClass").val();
		getRule();
		//项目结构
		var addParams="";
		addParams+="&fitemClass="+fitemClass
		+"&fitemName="+newItemBigName
		+"&crule="+crule;
		
		$("#itemStructureTableRows tr").each(function(i){
			var id=this.id;
			var citemClass=$(this).find("td:eq(1)").html();
			var type=$(this).find("td").eq(2).html();
			if(type=="文本"){
				$(this).find("td").eq(2).attr("itype",3);
			}
			if(type=="实数"){
				$(this).find("td").eq(2).attr("itype",2);
			}
			if(type=="日期"){
				$(this).find("td").eq(2).attr("itype",4);
			}
			if(type=="整数"){
				$(this).find("td").eq(2).attr("itype",1);
			}
			if(type=="逻辑"){
				$(this).find("td").eq(2).attr("itype",5);
			}
			var itype=$(this).find("td").eq(2).attr("itype");
			var length=$(this).find("td:eq(3)").html();
			
			var num=i+1;
			if(id!=""&&id!=null){
				addParams+="&editItemStructure["+i+"].id="+id
				+"&editItemStructure["+i+"].ctext="+citemClass;
			}else{
				addParams+="&itemStructure["+i+"].ctext="+citemClass
				+"&itemStructure["+i+"].itype="+parseInt(itype)
				+"&itemStructure["+i+"].ilength="+length.substring(length.indexOf(";")+1,length.length)
				+"&itemStructure["+i+"].citemSqr="+parseInt(num);
			}
			
		});
	  	$.ajax({
	  		url:"fitem!updateFitem.action",		
	  		type:"post",
	  		data:addParams,
	  		datatype:"json",
	  		success:function(data,status){
	  			window.parent.getWindow("basic_fitem_item").queryFitem();
	  		}
	  	});
	}
	
	
	
}

//根据当前面板显示或隐藏底部按钮
function setButtonDisplay(panelIndex){

	var prevButton = document.getElementById("prevButton");
	var nextButton = document.getElementById("nextButton");
	var finishButton = document.getElementById("finishButton");

	//如果是第一个面板
	if(panelIndex==1){
		prevButton.style.display="none";
	}
	//如果是第二个面板
	if(panelIndex==2){
		prevButton.style.display="block";
		nextButton.style.display="block";
		finishButton.style.display="none";
	}

	//如果是第三个面板
	if(panelIndex==3){
		prevButton.style.display="block";
		finishButton.style.display="block";
		nextButton.style.display="none";
	}
	
}

function setDisabeld(radio){
	
	//项目大类文本框
	var itemBigClass = document.getElementById("itemBigClass");
	//现金流项目下拉框
	var cashFlowItemSelect = document.getElementById("cashFlowItemSelect");
	//收支分类科目下拉框
	var classCodeSelect = document.getElementById("classCodeSelect");
	
	var nextButton = document.getElementById("nextButton");
	var finishButton = document.getElementById("finishButton");
	
	if(radio.id=="radio2_1"){
		itemBigClass.value="";
		itemBigClass.disabled=false;
		cashFlowItemSelect.disabled=true;
		classCodeSelect.disabled=true;
		finishButton.style.display="none";
		nextButton.style.display="block";
		
	}

	if(radio.id=="radio2_2"){
		itemBigClass.value="存货核算";
		itemBigClass.disabled=true;
		cashFlowItemSelect.disabled=true;
		classCodeSelect.disabled=true;
		finishButton.style.display="block";
		nextButton.style.display="none";
	}

	if(radio.id=="radio2_3"){
		itemBigClass.value="成本对象";
		itemBigClass.disabled=true;
		cashFlowItemSelect.disabled=true;
		classCodeSelect.disabled=true;
		finishButton.style.display="none";
		nextButton.style.display="block";
	}

	if(radio.id=="radio2_4"){
		itemBigClass.value="现金流量项目";
		itemBigClass.disabled=true;
		cashFlowItemSelect.disabled=false;
		classCodeSelect.disabled=true;
		finishButton.style.display="block";
		nextButton.style.display="none";
	}

	if(radio.id=="radio2_5"){
		itemBigClass.value="收支分离科目";
		itemBigClass.disabled=true;
		cashFlowItemSelect.disabled=true;
		classCodeSelect.disabled=false;
		finishButton.style.display="block";
		nextButton.style.display="none";
	}
	
	
}
  
  
  
  
  
  
  
  /*********************表格编辑相关代码 开始 ***********************/

  
  //标题验证
  function titleValidate(textbox){
	  var value = textbox.value;
	  if(value=="" || value==null){
		  jAlert("标题名称不能为空!");
	  }else{
		  textbox.parentNode.innerHTML=value;
	  }
  }
  
  //长度验证
  function lengthValidate(textbox){
	  var value = textbox.value;
	  if(value=="" || value==null){
		  jAlert("长度不符合规范!");
	  }else{
		  textbox.parentNode.innerHTML=value;
	  }
  }

  //select选择发生改变时修改右边单元格里的值
  function typeChange(select){
	  
	  var typeValue = select.value;
	  var nextCell = select.parentNode.parentNode.cells[3];
	  
	  select.parentNode.innerHTML=typeValue;
	  

	  if(typeValue == "整数"){
		  nextCell.innerHTML="9";
	  }
	  if(typeValue == "实数"){
		  nextCell.innerHTML="16.2";
	  }
	  if(typeValue == "文本"){
		  nextCell.innerHTML="22";
	  }
	  if(typeValue == "日期"){
		  nextCell.innerHTML="10";
	  }
	  
	  
  }
  

  /**
   * 增行
   */
  function addRow(){
  	var row = tb.insertRow(tb.rows.length);	
  	//row.style.height="18px";
  	row.id="";
  	var cell1 = row.insertCell(0);
  	cell1.style.width="14px";
  	cell1.style.backgroundColor="#D4D0C5";
  	cell1.align="center";
  	cell1.innerHTML = tb.rows.length+1;

  	var cell2 = row.insertCell(1);
  	cell2.style.width="180px";
  	cell2.style.backgroundColor="#fff";
  	cell2.align="center";
  	cell2.innerHTML = "<input type='text' style='width:82px;border:none;' onblur=\"titleValidate(this);\"/>";
  	cell2.getElementsByTagName("input")[0].focus();
  	

  	var cell3 = row.insertCell(2);
  	cell3.style.width="46px";
  	cell3.style.backgroundColor="#fff";
  	cell3.align="center";
  	cell3.itype="";
  	cell3.innerHTML = "&nbsp;";

  	var cell4 = row.insertCell(3);
  	cell4.style.width="46px";
  	cell4.style.backgroundColor="#fff";
  	cell4.align="right";
  	cell4.innerHTML = "&nbsp;";
  	
  	setEditable();
  	setSelectableRow();
  	
  }


  /**
   * 删行
   */
  function delRow(){
	  if (currentSeletedRow!=null){
			jConfirm("你确定要删除吗？", "确认对话框", function(confirmflag){
				if(confirmflag){
				  	tb.deleteRow(currentSeletedRow.rowIndex);
				  	currentSeletedRow=null;
				}
			});
	  }
	  else{
	  	  jAlert("请首先选择行！");
	  }
	
  }



  /**
   * 可双击编辑单元格
   */
  function setEditable(){
  	for(var i=0;i<tb.rows.length;i++){
  		for(var j=0;j<tb.rows[i].cells.length;j++){
  			tb.rows[i].cells[j].ondblclick=function(event){
  				var evt=(window.event || event);//获得事件
  				var cell = (evt.srcElement || evt.target);
  				if(cell.bgColor != undefined && cell.bgColor=="#7EFFFF") return;
  				
  				var cellIndex = cell.cellIndex;
  				
  				//如果是第一列，生成文本框
  				if(cellIndex==1){
  					if(cell.getElementsByTagName("input").length==0){
  						var tempValue = cell.innerHTML;
  	  					cell.innerHTML="<input type='text' value='"+tempValue+"' style='width:82px;border:none;line-height:12px;' onblur=\"titleValidate(this);\"/>";
  	  					
  	  					cell.getElementsByTagName("input")[0].select();
  					}
  					
  				}
  				
  				//如果是第二列，生成下拉列表
  				if(cellIndex==2){
  					if(cell.getElementsByTagName("select").length==0){

  	  					var tempValue = cell.innerHTML;
  	  					selectHTML  = "<select value='"+tempValue+"' onchange=\"typeChange(this);\" onblur='this.parentNode.innerHTML=this.value;'/>";
  	  					selectHTML += "<option value='整数'>整数</option>";
  	  					selectHTML += "<option value='实数'>实数</option>";
  	  					selectHTML += "<option value='文本'>文本</option>";
  	  					selectHTML += "<option value='日期'>日期</option>";
  	  					selectHTML += "</select>";
				
  	  					cell.innerHTML=selectHTML;
  	  					
  	  					cell.getElementsByTagName("select")[0].value=tempValue;
  	  					cell.getElementsByTagName("select")[0].focus();
  					}
  					
  				}

  				//如果是第三列
  				if(cellIndex==3){
  					if(cell.getElementsByTagName("input").length==0){
  						var tempValue = cell.innerHTML;
  	  					cell.innerHTML="<input type='text' value='"+tempValue+"' style='width:50px;border:none;line-height:12px;' onblur=\"lengthValidate(this);\"/>";
  	  					
  	  					cell.getElementsByTagName("input")[0].select();
  					}
  					
  				}
  				
  			};
  		}
  		
  		
  	}
  }


  /**
   * 可选中行
   */
  function setSelectableRow(){
  	for(var i=0;i<tb.rows.length;i++){

  		tb.rows[i].onclick=function(event){
  			var evt=(window.event || event);//获得事件
  			var evtsrc = (evt.srcElement || evt.target);
  			if(currentSeletedRow!=null && evtsrc.tagName=="TD"){
  				currentSeletedRow.style.backgroundColor="#fff";
  				currentSeletedRow.style.color="#000";
  			}
  			if(evtsrc.tagName=="TD"){
  				evtsrc.parentNode.style.backgroundColor="#00f";
  				evtsrc.parentNode.style.color="#00f";
  				currentSeletedRow=evtsrc.parentNode;
  			}
  			
  		};
  	}

  }

//单元失去焦点，执行取消编辑状态动作：
  document.onclick=function(event){
  	var evt=(window.event || event);//获得事件
  	var evtsrc = (evt.srcElement || evt.target);
  	
  	if(currentEditCell!=null){
  		if(evtsrc.tagName!="INPUT"){
  			currentEditCell.innerHTML=currentEditCell.getElementsByTagName("input")[0].value;
  			currentEditCell=null;
  			
  		}
  		

  	}

  };
  
  var itemBigClass ="";
  $(document).ready(function(){

	  tb = document.getElementById("edittable_rows");
	  setSelectableRow();
	  setEditable();
	  
	  
	  
	  /*************************** 初始化页面数据和元素 开始 *****************************/

	  var param = window.parent.valueMap.get("basic_fitem_update");

	  //1.取得弹出方式，判断并显示默认步骤面板
	  var method = param.flag;

	  if(method=="td"){
	  	document.getElementById("z_zj_con_01").style.display="none";
	  	document.getElementById("z_zj_con_03").style.display="block";
	  	document.getElementById("nextButton").style.display="none";
	  	currentPanelIndex=3;
	  }

	//3.取得传来的项目大类，并让项目大类select选中相应项
	   itemBigClass = param.itemBigClass;
	  document.getElementById("itemBigClass").value=itemBigClass;
	  //2.查询出所有项目大类放进select
	  queryFitem();

	  /*项目大类的改变事件*/
	  $("#itemBigClass").change(function(){
		  var fitemClass=$("#itemBigClass").find("option:selected").text();
		  $("#newItemBigClass").val(fitemClass);
		  $("#newItemBigClass").focus();
	  });

	  

	

	  /************************* 初始化页面数据和元素 结束 *******************************/
	  
	  
	  
  });
  
  /**
   * 查询项目大类
   */
  function queryFitem() {
  	$.ajax({
  		url:"fitem!queryList.action",		
  		type:"post",
  		datatype:"json",
  		success:function(data,status){
  			var fitemList = data.fitems;
  			curFitem = data.fitems;
  			initFitem(fitemList);
  			setCrule(curFitem);
  		}
  	});
  }
  /**
   * 初始化项目大类
   * @param gridList
   */
  function initFitem(fitemList) {
  	var length = fitemList.length;
  	$("#itemBigClass").empty();
  	signList = new Array(length);
  	for (var i = 0; i<length; i++) {
  		var fitem = fitemList[i];
  		if(fitem.citemClass==itemBigClass){
  			$("#itemBigClass")[0].options.add(new Option(fitem.citemName,fitem.citemClass,false,true));
  		}else{
  			$("#itemBigClass")[0].options.add(new Option(fitem.citemName,fitem.citemClass,false,false));
  		}
  	}
  	var fitemClass=$("#itemBigClass").find("option:selected").text();
  	$("#newItemBigClass").val(fitemClass);
  	var fitemClass=$("#itemBigClass").val();
	queryFitemStructure(fitemClass);
  }
  
  /**
   * 获得项目编码规则、以及长度
   */
  function setCrule(curFitem){
  	 var index = $('#itemBigClass').get(0).selectedIndex;
  	  //得到选择下拉框的索引值
  	  var crule=curFitem[index].crule;
  	 // var rule="";
  	  //var num1=0;
  	 for(var i=0;i<crule.length;i++){
  		 var rule=crule.substring(i,i+1);
  		 var num=i+1;
  		 $("#level"+num).attr("disabled",true);
  		 $("#level"+num).val(rule);
  		 $("#btn"+num).find("input").attr("disabled",true);
  		//  num1+=num;
  	  }
  	  //cruleLen=num1;
  	  //var value=rule.substring(0, rule.length-1);
  	  //$("#crule").html(value);
  }
  /**
   * 查询项目结构
   */
  function queryFitemStructure(fitemClass) {
  	$.ajax({
  		url:"fitem!queryFitemStructure.action?fitemClass=" + fitemClass,		
  		type:"post",
  		datatype:"json",
  		async:false,
  		success:function(data,status){
  			var fitemstructureList = data.fitemstructures;
  			initFitemStructure(fitemstructureList);
  		}
  	});
  }

  /**
   * 初始化项目结构
   * @param fitemstructureList 项目结构list
   */
  function initFitemStructure(fitemstructureList) {
  	var length = fitemstructureList.length;
  	$("#titleTable").empty();
  	var tdStr="<tr bgcolor='#7EFFFF' >";
  	for(var i=0;i<length;i++){
  		var f = fitemstructureList[i]; 
  		tdStr+="<td>"+f.ctext+"</td>";
  	}
  	tdStr+="</tr>";
  	$("#titleTable").html(tdStr);
  	$("#itemStructureTableRows").html("");
  	var str="";
  	for (var i = 0 ;i<length; i++) {
  		var fitemstructure = fitemstructureList[i];
  		var num=i+1;
  		var ctext=fitemstructure.ctext;
  		var id=fitemstructure.id;
  		str+="<tr id="+id+">";
  		str+="<td width='14' align='center' bgcolor='#D4D0C5'>"+num+"</td>";
  		if(ctext=="项目编号"||ctext=="是否结算"||ctext=="所属分类码"){
  			str+="<td  bgcolor='#7EFFFF' >"+ctext+"</td>";
  			var cells="";
  			if (fitemstructure.itype=="1") {
  				cells = "整数";
  			}
  			else if (fitemstructure.itype=="2") {
  				cells = "实数";
  			}
  			else if (fitemstructure.itype=="3") {
  				cells = "文本";
  			}
  			else if (fitemstructure.itype=="4") {
  				cells = "日期";
  			}
  			else if (fitemstructure.itype=="5") {
  				cells = "逻辑";
  			}
  			str+="<td itype='"+fitemstructure.itype+"' bgcolor='#7EFFFF' >"+cells+"</td>";
  			str+="<td bgcolor='#7EFFFF'>"+fitemstructure.ilength+"</td>";
  		}else{
  			str+="<td  bgcolor='#ffffff' >"+ctext+"</td>";
  			var cells="";
  			if (fitemstructure.itype=="1") {
  				cells = "整数";
  			}
  			else if (fitemstructure.itype=="2") {
  				cells = "实数";
  			}
  			else if (fitemstructure.itype=="3") {
  				cells = "文本";
  			}
  			else if (fitemstructure.itype=="4") {
  				cells = "日期";
  			}
  			else if (fitemstructure.itype=="5") {
  				cells = "逻辑";
  			}
  			str+="<td bgcolor='#7EFFFF' >"+cells+"</td>";
  			str+="<td bgcolor='#7EFFFF'>"+fitemstructure.ilength+"</td>";

  		}
  		str+="</tr>";
  	}
  	$("#itemStructureTableRows").html(str);
  	setEditable();
  	setSelectableRow();
  	
  }
  /*********************表格编辑相关代码 结束 ***********************/