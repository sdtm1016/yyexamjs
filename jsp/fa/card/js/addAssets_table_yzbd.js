
/***
 * 
 * 固定资产卡片 第六个选项卡“原值变动”相关JS代码
 * 
 */


//表格增加新编辑行方法
function table_yzbd_addRow(){
	
	var table_yzbd = document.getElementById("table_yzbd");
	
	var row = table_yzbd.insertRow(table_yzbd.rows.length);

	for(var i=0;i<6;i++){
		var cell = row.insertCell(row.cells.length);
		cell.style.textAlign="center";
		cell.width="92";
		cell.setAttribute("onclick","table_yzbd_cell_click(this);");
	}
	
}

function table_yzbd_cell_click(cell){
	
	if(smark=="0"){
		return;
	}
	
	if(currentEditingElement!=null){
		var inputs = currentEditingElement.getElementsByTagName("input");
		currentEditingElement.innerHTML=inputs[inputs.length-1].value;
		currentEditingElement=null;
		
		var row = cell.parentNode;
		//判断是否增加新行
		if(row.rowIndex==row.parentNode.rows.length-1){
			var existsContent = false;
			for(var i=0;i<row.cells.length;i++){
				if(row.cells[i].innerHTML!=""){
					existsContent = true;
				}
			}
			if(existsContent){
				table_yzbd_addRow();
			}
		}
	}
	if(cell.getElementsByTagName("input").length==0){
		var inputWidth = parseInt(cell.width)-6;
		cell.align="center";
		cell.style.textAlign="center";
		if(cell.cellIndex==1){
			cell.innerHTML="<input type='text'  onclick='WdatePicker();' style='width:"+inputWidth+"px;height:13px;' value='"+cell.innerHTML+"'/>";
			cell.getElementsByTagName("input")[0].select();
			cell.getElementsByTagName("input")[0].click();
		}else{
			cell.innerHTML="<input type='text' style='width:"+inputWidth+"px;height:13px;' value='"+cell.innerHTML+"'/>";
			cell.getElementsByTagName("input")[0].select();
		}
		currentEditingElement=cell;
		sheetlab="5";
		if (event && event.stopPropagation){
			event.stopPropagation();
		}else{
	        window.event.cancelBubble=true;
	    }
	}else{
		cell.getElementsByTagName("input")[0].select();
		cell.getElementsByTagName("input")[0].focus();
	}
}

//单元格失去焦点方法
function table_yzbd_cell_blur(textbox){
	var row = textbox.parentNode.parentNode;
	textbox.parentNode.innerHTML=textbox.value;
	
	//判断是否增加新行
	if(row.rowIndex==row.parentNode.rows.length-1){
		var existsContent = false;
		for(var i=0;i<row.cells.length;i++){
			if(row.cells[i].innerHTML!=""){
				existsContent = true;
			}
		}
		if(existsContent){
			table_yzbd_addRow();
		}
	}
}

//表格加载完初始化
$(document).ready(function(){
	//加载完后默认添加一条空行
	table_yzbd_addRow();
	
});
