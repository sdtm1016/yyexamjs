
/***
 * 
 * 固定资产卡片 第五个选项卡“停启用记录”相关JS代码
 * 
 */


//表格增加新编辑行方法
function table_tqyjl_addRow(){
	
	var table_tqyjl = document.getElementById("table_tqyjl");
	
	var row = table_tqyjl.insertRow(table_tqyjl.rows.length);

	for(var i=0;i<6;i++){
		var cell = row.insertCell(row.cells.length);
		cell.style.textAlign="center";
		cell.width="92";
		if(i==3){
			cell.innerHTML="0";
		}
		cell.setAttribute("onclick","table_tqyjl_cell_click(this);");
	}
	
}

function table_tqyjl_cell_click(cell){
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
				table_tqyjl_addRow();
			}
		}
	}
	if(cell.getElementsByTagName("input").length==0){
		var inputWidth = parseInt(cell.width)-6;
		cell.align="center";
		cell.style.textAlign="center";
		if(cell.cellIndex==1||cell.cellIndex==2){
			cell.innerHTML="<input type='text' id='markdate' mark="+cell.cellIndex+" onclick='WdatePicker({onpicked:differenceDay});' style='width:"+inputWidth+"px;height:13px;' value='"+cell.innerHTML+"'/>";
			cell.getElementsByTagName("input")[0].click();
		}else{
			cell.innerHTML="<input type='text' style='width:"+inputWidth+"px;height:13px;' value='"+cell.innerHTML+"'/>";
		}
		var textbox = cell.getElementsByTagName("input")[0];
		if(cell.cellIndex==3){
			textbox.style.backgroundColor = "#ccc";
			textbox.readOnly=true;
		}
		textbox.select();
		textbox.focus();
		currentEditingElement=cell;
		sheetlab="4";
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
function table_tqyjl_cell_blur(textbox){
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
			table_tqyjl_addRow();
		}
	}
}

//表格加载完初始化
$(document).ready(function(){
	//加载完后默认添加一条空行
	table_tqyjl_addRow();
	
});

function differenceDay(){
	
	var val_date=$("#markdate");
	var mark=val_date[0].getAttribute("mark");
	var startDate="";
	var newSelectedDate="";
	if(mark=="1"){
		startDate=val_date.val();
		newSelectedDate=(val_date.parent().parent().children())[2].innerHTML;
	}else if(mark=="2"){
		startDate=(val_date.parent().parent().children())[1].innerHTML;
		newSelectedDate=val_date.val();
	}
	
	if(startDate!=""&&newSelectedDate!=""){
		//进行相减的小日期（来自startDate的转换）
		var smallDate = new Date(startDate.replace(new RegExp("-","gm"),"/"));
				
		//进行相减的大日期（来自newSelectedDate的转换）
		var bigDate = new Date(newSelectedDate.replace(new RegExp("-","gm"),"/"));
				
		//计算被点击结束日期与其起始日期的天数差
		var differenceDay=((bigDate.getTime()-smallDate.getTime())/3600000/24);
		
		(val_date.parent().parent().children())[3].innerHTML=differenceDay;
	}
}
