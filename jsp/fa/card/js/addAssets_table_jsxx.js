
/***
 * 
 * 固定资产卡片 第七个选项卡“减少信息”相关JS代码
 * 
 */


//表格增加新编辑行方法
function table_jsxx_addRow(){
	
	var table_jsxx = document.getElementById("table_jsxx");
	
	var row = table_jsxx.insertRow(table_jsxx.rows.length);

	for(var i=0;i<7;i++){
		var cell = row.insertCell(row.cells.length);
		cell.style.textAlign="center";
		cell.width="78";
		cell.setAttribute("onclick","table_jsxx_cell_click(this);");
	}
	
}

function table_jsxx_cell_click(cell){
	
	if(smark=="0"){
		return;
	}
	
	if(cell.getElementsByTagName("input").length==0){
		var inputWidth = parseInt(cell.width)-6;
		cell.align="center";
		cell.style.textAlign="center";
		cell.innerHTML="<input type='text' style='width:"+inputWidth+"px;height:13px;background-color:#ccc;' value='"+cell.innerHTML+"' readonly='readonly' onblur='table_jsxx_cell_blur(this);'/>";
		cell.getElementsByTagName("input")[0].select();
		cell.getElementsByTagName("input")[0].focus();
	}
}

//单元格失去焦点方法
function table_jsxx_cell_blur(textbox){
	
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
			table_jsxx_addRow();
		}
	}
}

//表格加载完初始化
$(document).ready(function(){
	//加载完后默认添加一条空行
	table_jsxx_addRow();
});
