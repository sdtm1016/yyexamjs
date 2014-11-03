
/************ 下滴菜单按钮相关代码 S *************/
var buttonGroupCurrentDropMenu = null;

function buttonGroupDropButtonClick(b){
	
	if(buttonGroupCurrentDropMenu != null){
		buttonGroupCurrentDropMenu.style.display = 'none';
	}
	
	var ul = b.parentNode.parentNode.getElementsByTagName("ul")[0];
	if(ul.style.display == ""){
		ul.style.display = "none";
		buttonGroupCurrentDropMenu = null;
	}else{
		ul.style.display = "";
		buttonGroupCurrentDropMenu = ul;
		ul.onclick = function(e){
			ul.style.display = "none";
			buttonGroupCurrentDropMenu = null;
		};
	}
	
}


function buttonGroupLeftButtonClick(b){
	
	var ul = b.parentNode.parentNode.getElementsByTagName("ul")[0];
	if(ul.style.display == ""){
		ul.style.display = "none";
		buttonGroupCurrentDropMenu = null;
	}
	
}

/************ 下滴菜单按钮相关代码 E *************/
























/************ 查询文本框相关代码 S *************/

var targetElement = null;
var currentQueryButton = null;
var currentEditCellName = null;
var focusArea = null;//查询文本框组件的所在区域，用于弹窗返回值处理函数依据此变量值为目标文本框赋值指引方向
var queryid = null;
function queryBoxClick(queryBox){

	
	if(currentQueryButton != null){
		currentQueryButton.style.display = 'none';
		currentQueryButton = null;
	}
	if (queryBox.parentNode==null) return ;
	var queryButton = queryBox.parentNode.getElementsByTagName('input')[1];
	
	queryButton.style.display = 'block';
	
	currentQueryButton = queryButton;
	
}

/**
 * 表单参照弹出
 * @param btn
 */
function queryButtonClick(btn){
	focusArea = "topArea";
	queryid = btn.parentNode.getElementsByTagName("input")[0].id;
	//构建本窗体返回值参数
	var param = {};
	
	//日期
	if (queryid=="DVOUCHDATE") {
		WdatePicker({
		      el:"DVOUCHDATE",
		      position:{left:100,top:10},
		      onpicking:function(dp){
		         //得到用户选择的日期
		         var newSelectedDate=dp.cal.getNewDateStr();
		        // alert("newSelectedDate" + newSelectedDate);		         
		      }
		   });
	}
	//部门选择
	else if (queryid=="CDEPTCODE") {
		param.subjectDeptId = "";
		param.subjectDeptName = "";
		window.parent.openWindow('basic_comref_dptref','pu_set_apvouchSet',param);
	}
	//供应商或者客户
	else if (queryid=="CDWCODE") {
		param.subjectBusinessId = "";
		param.subjectBusinessName = "";
		window.parent.openWindow(dwrefurl,'pu_set_apvouchSet',param);
	}
	//结算科目
	else if (queryid=="CCODE") {
		param.subjectBusinessId = "";
		param.subjectBusinessName = "";
		window.parent.openWindow('dsign_subjectsreference','pu_set_apvouchSet',param);
	}
	
	//业务员
	else if (queryid=="CPERSON") {
		param.subjecPersonId = "";
		param.subjecPersonName = "";
		window.parent.openWindow('basic_comref_personref','pu_set_apvouchSet',param);
	}
	//付款条件
	else if (queryid=="CPAYCODE") {
		param.subjecPersonId = "";
		param.subjecPersonName = "";
		window.parent.openWindow('basic_comref_payCondref','pu_set_apvouchSet',param);
	}
	//币种
	else if (queryid=="CEXCH_NAME") {
		param.subjecPersonId = "";
		param.subjecPersonName = "";
		window.parent.openWindow('basic_comref_exchref','pu_set_apvouchSet',param);
	}
	
	//到期日期
	else if (queryid=="DQDATE") {
		WdatePicker({
		      el:"DQDATE",
		      position:{left:100,top:10},
		      onpicking:function(dp){
		         //得到用户选择的日期
		         var newSelectedDate=dp.cal.getNewDateStr();
		        // alert("newSelectedDate" + newSelectedDate);		         
		      }
		   });
	}
}



/**
 * 返回值处理
 * @param valueObject
 */

function deliverValue(valueObject){
	
	//表单参照
	if(focusArea=="topArea"){
		
		//科目参照
		if (queryid=="CCODE") {
			//显示名称
			document.getElementById(queryid).value = valueObject.selKemuName;
			//存储代码
			document.getElementById(queryid).setAttribute("dbvalue", valueObject.selKemuCode);		
		}
		
		
		//币种
		else if (queryid=="CEXCH_NAME") {
			//显示名称
			document.getElementById(queryid).value =  valueObject.cname;
			//存储代码
			document.getElementById(queryid).setAttribute("dbvalue", valueObject.ccode);
			exchBlur();
				
		}
		else {
			
			//显示名称
			document.getElementById(queryid).value = valueObject.cname;
			//存储代码
			document.getElementById(queryid).setAttribute("dbvalue", valueObject.ccode);
			
			
		}
    //列表参照
	}else if(focusArea=="tableCell"){

		var currentEditCellName = document.getElementById("datatable_header").rows[0].cells[currentEditCell.cellIndex].innerHTML;
		
		switch(currentEditCellName){
		
			case "对应科目":
				//显示名称
				targetElement.value = valueObject.selKemuName;
				//存储代码
				targetElement.parentNode.parentNode.setAttribute("dbvalue", valueObject.selKemuCode);
		
				break;
				
			case "币种":
				//显示名称
				//targetElement.value = valueObject.cname;
				//存储代码
				//targetElement.parentNode.parentNode.setAttribute("dbvalue", valueObject.ccode);
	
				break;
			case "部门":
				
				//显示名称
				targetElement.value = valueObject.cname;
				//存储代码
				targetElement.parentNode.parentNode.setAttribute("dbvalue", valueObject.ccode);
				break;
			
			case "摘要":
				//显示名称
				targetElement.value = valueObject.selBdigestName;
				//存储代码
				targetElement.parentNode.parentNode.setAttribute("dbvalue", valueObject.selBdigestCode);
		
				break;
				
			case "业务员":
				//显示名称
				targetElement.value = valueObject.cname;
				//存储代码
				targetElement.parentNode.parentNode.setAttribute("dbvalue", valueObject.ccode);
		
				break;
		}
		
	}
	

}

/************ 查询文本框相关代码 E *************/





























/****************** 表格组件相关代码 S *******************/

//控制表头横纵向滚动时固定不动
function tableScroll(container){

	document.getElementById('datatable_header').style.marginTop=container.scrollTop+"px";
	document.getElementById('datatable_bodyer').style.marginTop="-"+container.scrollTop+"px";

}







// 选中行方法（如果不需要这些功能，直接将下面代码移出即可）
//当前被点击选中的行全局变量
var currentSeletedRow=null;
function rowSelection(){

var datatable_bodyer = document.getElementById("datatable_bodyer");
for(var i=0;i<datatable_bodyer.rows.length;i++){

	datatable_bodyer.rows[i].onclick=function(event){
		
		var evt=(window.event || event);//获得事件
		var evtsrc = (evt.srcElement || evt.target);
		
		if(evtsrc.tagName=="TD"){
			
			evtsrc = evtsrc.parentNode;
		}
		
		if(currentSeletedRow!=null){
			currentSeletedRow.style.backgroundColor="#fff";
			currentSeletedRow.style.color="#000";
		}
		if(evtsrc.tagName=="TR"){
			evtsrc.style.backgroundColor="#ddd";
			evtsrc.style.color="#fff";
			currentSeletedRow=evtsrc;
		}
	};
}


}	






// 单元格编辑控制方法
var currentEditRow = null;
var currentEditCell = null;

function cellEdition(){

var datatable_bodyer = document.getElementById("datatable_bodyer");
for(var i=0;i<datatable_bodyer.rows.length;i++){
	for(var j=0;j<datatable_bodyer.rows[i].cells.length;j++){
		datatable_bodyer.rows[i].cells[j].ondblclick=function(event){
			
			var evt=(window.event || event);//获得事件
			var cell = (evt.srcElement || evt.target);
			
			if(cell.tagName!="TD"){
				cell = cell.parentNode;
			}
			//alert("lastEditRow.rowIndex" + lastEditRow);
			//如果当前动作为增加发票并且当前被点击行为编辑行（rowIndex值<=lastEditRow.rowIndex）
			if((currentAction == "add" || currentAction == "update" ) && (lastEditRow!=null) && cell.parentNode.rowIndex <= lastEditRow.rowIndex){

				//避免重复双击，重复往TD里添加innerHTML内容产生混乱
				if(cell.getElementsByTagName("input").length==0){
					
					//如果有其他单元格正处于编辑状态，那么还需要将其他单元格取消编辑状态
					if(currentEditCell!=null){
						currentEditCell.innerHTML=currentEditCell.getElementsByTagName("input")[0].value;
						currentEditCell=null;
					}
					
					var title = document.getElementById("datatable_header").rows[0].cells[cell.cellIndex].innerHTML;
					
					var querybox_htmlstr = "<div><input type=\"text\" class=\"querybox\" style=\"width:100%;border:none;\" onclick=\"queryBoxClick(this)\"/><input type=\"button\" class=\"innerfinder\" style=\"display:block;margin-top:0px;\"/><div class=\"floatclear\"></div></div>";
					
					switch(title){

					case "方向":
						if(cell.getElementsByTagName("select").length>0){
							return false;
						}
						var temp = cell.innerHTML;
						if(temp.length==0 || temp==""){
							temp="借";
						}
						cell.innerHTML = "<select onchange='this.blur();' onblur='this.parentNode.innerHTML=this.value;'><option value='1'>借</option><option value='0'>贷</option></select>";
						cell.getElementsByTagName("select")[0].value=temp;
						cell.getElementsByTagName("select")[0].focus();
						break;
					case "对应科目":
					case "部门":
					case "币种":	
					case "业务员":
						
						//往单元格TD里添加查询文本框
						var temp = cell.innerHTML;
						cell.innerHTML = querybox_htmlstr;
						var textbox = cell.getElementsByTagName("input")[0];
						cell.getElementsByTagName("input")[1].setAttribute("onclick","tableCellWindowMaper('"+title+"')");
						textbox.value = temp;
						textbox.focus();
						targetElement = textbox;
						currentEditCell = cell;
						focusArea = "tableCell";//焦点所在区域（用于弹出返回值处理函数获取目标文本框做参考）
						break;
					
						
						
						

					case "原币金额":
					case "汇率":
					case "摘要":
						
						
						//往单元格TD里添加查询文本框
						var temp = cell.innerHTML;
						cell.innerHTML = "<input type=\"text\" style=\"width:100%;border:none;\"/>";
						var textbox = cell.getElementsByTagName("input")[0];
						textbox.value = temp;
						textbox.focus();
						currentEditCell = cell;
						break;
					
						
					}
					
					
				}
				
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		};
	}
	
}


}


//表格单元格弹出窗体方法
function tableCellWindowMaper(title){

	var param = {};
	switch(title){
	
	case "对应科目":
		param.subjectBusinessId = "";
		param.subjectBusinessName = "";
		window.parent.openWindow('dsign_subjectsreference','pu_set_apvouchSet',param);
	
		break;
		
	case "币种":
		param.subjectBusinessId = "";
		param.subjectBusinessName = "";
		window.parent.openWindow('basic_comref_exchref','pu_set_apvouchSet',param);
	
		break;	
		
	case "部门":
		param.subjectDeptId = "";
		param.subjectDeptName = "";
		window.parent.openWindow('basic_comref_dptref','pu_set_apvouchSet',param);
		
		break;

	
		
	case "业务员":
		param.subjecPersonId = "";
		param.subjecPersonName = "";
		window.parent.openWindow('basic_comref_personref','pu_set_apvouchSet',param);

		break;
	}
	
}


/****************** 表格组件相关代码 E *******************/























/******************** 组件公共document.onclick方法 S **********************/
document.onclick=function(e){
	
	var evt=(window.event || e);//获得事件
	var evtsrc = (evt.srcElement || evt.target);
	
	
	
	
	//如果当前有显示的查询按钮，则隐藏
	if(currentQueryButton != null && evtsrc.className != "querybox" && evtsrc.className != "innerfinder"){
		currentQueryButton.style.display = 'none';
		currentQueryButton = null;
	}
	
	
	
	
	
	//如果当前有下滴的菜单，则隐藏
	if(buttonGroupCurrentDropMenu != null){

		try{
			var dropButton = buttonGroupCurrentDropMenu.parentNode.getElementsByTagName("div")[0].getElementsByTagName("input")[1];
			if(evtsrc != dropButton){
				buttonGroupCurrentDropMenu.style.display = 'none';
				buttonGroupCurrentDropMenu = null;
			}
		}catch(e){
			
		}
	}
	
	
	
	
	//如果表格中存在正在编辑的单元格
	if(currentEditCell!=null){
		if(evtsrc.parentNode.parentNode != currentEditCell){
			currentEditCell.innerHTML=currentEditCell.getElementsByTagName("input")[0].value;
			
			
			var t = document.getElementById("datatable_bodyer");
			var rowIndex = currentEditCell.parentNode.rowIndex;
			//下面代码根据失去焦点单元格的表头名称为其他单元格赋值
			var currentEditCellName = document.getElementById("datatable_header").rows[0].cells[currentEditCell.cellIndex].innerHTML;	
			switch(currentEditCellName){
			
			case "方向":
				//汇率默认为1
				t.rows[rowIndex].cells[4].innerHTML = "1";
				//币种默认为人民币
				t.rows[rowIndex].cells[6].innerHTML = "人民币";
				break;
			//原币金额失去焦点
			case "原币金额":
				//原币金额
				var ybMoney = t.rows[rowIndex].cells[3].innerHTML;
				//本币金额
				t.rows[rowIndex].cells[5].innerHTML = ybMoney;
				
				//汇率默认为1
				t.rows[rowIndex].cells[4].innerHTML = "1";
				//币种默认为人民币
				t.rows[rowIndex].cells[6].innerHTML = "人民币";
				break;
			}
			currentEditCell=null;
		}

	}
	
	
};
/******************** 组件公共document.onclick方法 E **********************/

