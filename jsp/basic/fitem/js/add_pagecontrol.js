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
	  var citemName=$("#citemName").val();
	  if(citemName==""){
		  jAlert("请输入新项目大类名称");
	  }else{
		  var param="citem_name="+citemName;
		  $.ajax({
				url: "fitem!isHasFitemByitemName.action" ,
				type: 'post',
				dataType: "json",
				data:param,
				async:false,
				success: function(data){
					if(data.flag){
						jAlert("已存在与您输入的项目大类名称相同，请修改!");
					}else{
						document.getElementById("z_zj_con_0"+currentPanelIndex).style.display="none";
						currentPanelIndex += 1;
						document.getElementById("z_zj_con_0"+currentPanelIndex).style.display="block";
						setButtonDisplay(currentPanelIndex);
					}
				}
			  });
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
  		addFitem();
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
  		$("#itemBigClass").val("");
  		$("#itemBigClass").attr("disabled",false);
  		cashFlowItemSelect.disabled=true;
  		classCodeSelect.disabled=true;
  		finishButton.style.display="none";
  		nextButton.style.display="block";
  		
  	}

  	if(radio.id=="radio2_2"){
  		$("#itemBigClass").val("存货核算");
  		$("#itemBigClass").attr("disabled",true);
  		cashFlowItemSelect.disabled=true;
  		classCodeSelect.disabled=true;
  		finishButton.style.display="block";
  		nextButton.style.display="none";
  	}

  	if(radio.id=="radio2_3"){
  		$("#itemBigClass").val("成本对象");
  		$("#itemBigClass").attr("disabled",true);
  		cashFlowItemSelect.disabled=true;
  		classCodeSelect.disabled=true;
  		finishButton.style.display="none";
  		nextButton.style.display="block";
  	}

  	if(radio.id=="radio2_4"){
  		$("#itemBigClass").val("现金流量项目");
  		$("#itemBigClass").attr("disabled",true);
  		cashFlowItemSelect.disabled=false;
  		classCodeSelect.disabled=true;
  		finishButton.style.display="block";
  		nextButton.style.display="none";
  	}

  	if(radio.id=="radio2_5"){
  		$("#itemBigClass").val("收支分离科目");
  		$("#itemBigClass").attr("disabled",true);
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
		  nextCell.innerHTML="20";
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

  	var cell1 = row.insertCell(0);
  	cell1.style.width="14px";
  	cell1.style.backgroundColor="#D4D0C5";
  	cell1.align="center";
  	cell1.innerHTML = tb.rows.length;

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
  	cell3.innerHTML = "";

  	var cell4 = row.insertCell(3);
  	cell4.style.width="46px";
  	cell4.style.backgroundColor="#fff";
  	cell4.align="right";
  	cell4.innerHTML = "";
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
					  var index=currentSeletedRow.rowIndex-1;
					  	tb.deleteRow(index);
					  	$("#edittable_rows tr").each(function(i){
					  		$(this).find("td:eq(0)").html(i+1);
					  	});
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
  				if(cell.bgColor != undefined && (cell.bgColor=="#7EFFFF" ||cell.bgColor=="#7effff")) return;
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
  	  					selectHTML  = "<select value='"+tempValue+"' onblur=\"typeChange(this);\"/>";
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
  
  /**
   * 初始化列表
   */
  $(document).ready(function(){
	  tb = document.getElementById("edittable_rows");
	  setSelectableRow();
	  setEditable();
	  /*初始化隐藏上一步、完成*/
	  $("#prevButton").hide();
	  $("#finishButton").hide();
	  
  });
  

  /*********************表格编辑相关代码 结束 ***********************/