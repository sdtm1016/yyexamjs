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
var currentQueryButton = null;
function queryBoxClick(queryBox){
	if(currentQueryButton != null){
		currentQueryButton.style.display = 'none';
		currentQueryButton = null;
	}
	if ( queryBox.parentNode==null) return ;
	var queryButton = queryBox.parentNode.getElementsByTagName('input')[1];
	queryButton.style.display = 'block';
	currentQueryButton = queryButton;
}
/************ 查询文本框相关代码 E *************/
/****************** 表格组件相关代码 S *******************/
//控制表头横纵向滚动时固定不动
function tableScroll(container){
	document.getElementById('datatable_header').style.marginTop=container.scrollTop+"px";
	document.getElementById('datatable_bodyer').style.marginTop="-"+container.scrollTop+"px";
	document.getElementById('datatable_footer').style.marginLeft="-"+container.scrollLeft+"px";
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
		if(currentSeletedRow!=null && evtsrc.tagName=="TD"){
			currentSeletedRow.style.backgroundColor="#fff";
			currentSeletedRow.style.color="#000";
		}
		if(evtsrc.tagName=="TD"){
			evtsrc.parentNode.style.backgroundColor="#ddd";
			evtsrc.parentNode.style.color="#fff";
			currentSeletedRow=evtsrc.parentNode;
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
			//如果当前动作为增加发票并且当前被点击行为编辑行（rowIndex值<=lastEditRow.rowIndex）
			if(currentAction == "add" && cell.parentNode.rowIndex <= lastEditRow.rowIndex){
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
					case "存货编码":
					case "原币单价":
					case "本币单价":
						
						//往单元格TD里添加查询文本框
						var temp = cell.innerHTML;
						cell.innerHTML = querybox_htmlstr;
						var textbox = cell.getElementsByTagName("input")[0];
						cell.getElementsByTagName("input")[1].setAttribute("onclick","tableCellWindowMaper('"+title+"')");
						textbox.value = temp;
						textbox.focus();
						currentEditCell = cell;
						break;
					case "数量":
					case "原币金额":
					case "原币税额":
					case "本币金额":
					case "本币税额":
					case "税率":
						//往单元格TD里添加查询文本框
						var temp = cell.innerHTML;
						cell.innerHTML = "<input type=\"text\" value=\"sd\" style=\"width:100%;border:none;\"/>";
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
	switch(title){
	case "存货编码":
		alert("弹出'存货编码'窗体");
		break;
	case "原币单价":
		alert("弹出'原币单价'窗体");
		break;
	case "本币单价":
		alert("弹出'本币单价'窗体");
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
			currentEditCell=null;
		}
	}
};
/******************** 组件公共document.onclick方法 E **********************/






//窗体关闭时，隐藏日历控件
function onWindowClose(){
	$dp.hide();
}



