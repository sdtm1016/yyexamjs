
/****
 * 发票界面动作控制相关代码
 */







/**
 * 当前行为，包含：默认（default）、增加（add）、修改（update）等等
 * 用于页面表格等控件的初始化和编辑的控制
 * 当顶部某些按钮被点击时将改变此变量的值
 */
var currentAction = "default";

/*放弃按钮点击事件*/
function giveUpInvoice(){
	//初始化各查询文本框状态
	$("#topTextBoxContainer").find(".querybox").attr("disabled",false);
	$("#CPBVBILLTYPE").attr("disabled","disabled");
	$("#btnGiveUp").attr("disabled","disabled");
	$("#CORDERCODE").val();
	$("#khh").val("");
	$("#dwmc").val("");
	$("#zdr").val("");
	$("#CORDERCODE").val("");
	$("#CORDERCODE").attr("disabled","disabled");
	$("#DPBVDATE").val("");
	$("#DPBVDATE").attr("disabled","disabled");	
	$("#xslx").val("");
	$("#xslx").attr("disabled","disabled");	
	$("#ddh").val("");
	$("#ddh").attr("disabled","disabled");			
	$("#khlx").val("");
	$("#khlx").attr("disabled","disabled");		
	$("#xsbm").val("");
	$("#ywy").attr("disabled","disabled");	
	$("#fktj").val("");
	$("#fktj").attr("disabled","disabled");		
	$("#bz").val("");
	$("#bz").attr("disabled","disabled");	
	
	$("#yhzh").val("");
	$("#yhzh").attr("disabled","disabled");	
	$("#khdz").val("");
	$("#khdz").attr("disabled","disabled");	
	$("#khmc").val("");
	$("#khmc").attr("disabled","disabled");	
	$("#khyh").val("");
	$("#khyh").attr("disabled","disabled");	
	$("#xsbm").val("");
	$("#xsbm").attr("disabled","disabled");		
	
		
	$("#zqgl").val("");
	$("#zqgl").attr("disabled","disabled");	
	$("#CDEFINE4").val("");
	$("#CDEFINE4").attr("disabled","disabled");			
	
	
	
	$("#fhdh").attr("disabled","disabled");	
	}


/****************************** 页面控制业务方法 S ********************************/
var lastEditRow = null;


//添加发票
function addSaInvoice(){
	
	
	//修改动作值
	currentAction = "add";

	//初始化各查询文本框状态
	$("#topTextBoxContainer").find(".querybox").attr("disabled",false);
	
	
	
	
	
	
	//初始化行编辑控制
	var datatable_bodyer = document.getElementById("datatable_bodyer");
	for(var i=0;i<datatable_bodyer.rows.length;i++){

		datatable_bodyer.rows[i].onclick=function(event){
			
			var evt=(window.event || event);//获得事件
			var evtsrc = (evt.srcElement || evt.target);
			
			var tr = null;
			if(evtsrc.tagName=="TD"){
				
				//如果事件源
				if(evtsrc.cellIndex == 0 && lastEditRow != null){
					if(evtsrc.innerHTML=="*"){
						evtsrc.innerHTML = "√";
					}else{
						evtsrc.innerHTML = "*";
					}
				}
				
				tr = evtsrc.parentNode;
			}else{
				tr = evtsrc;
			}
			
			if(currentSeletedRow!=null){
				currentSeletedRow.style.backgroundColor="#fff";
				currentSeletedRow.style.color="#000";
				
				tr.style.backgroundColor="#ddd";
				tr.style.color="#fff";
				currentSeletedRow=tr;
			}
			
			
			//判断是否存在最后一个编辑行（第一列值带*号的行）
			if(lastEditRow == null){
				
				//判断是否点击了第一行
				if(tr.rowIndex==0){
					
					tr.cells[0].innerHTML = "*";
					lastEditRow = tr;
				}
			}else{
				//判断当前点击的行是否是当前最后一个编辑行的下一行（rowIndex是否=lastEditRow.rowIndex+1）
				if(tr.rowIndex == (lastEditRow.rowIndex+1)){
					tr.cells[0].innerHTML = "*";
					lastEditRow = tr;
				}
			}
			
		};
	}
	

	
//	cellEdition();
	//TODO...
	
	initSa();
	initPage("27");
}



//添加发票
function updateInvoice(){
	
	//修改动作值
	currentAction = "update";
	
	//TODO...
}



function addRow(){
	
	var tb = document.getElementById("datatable_bodyer");
	
	//如果存在最后一个编辑行（lastEditRow != null），
	if(lastEditRow != null){
		
		//则判断其下面是否存在一个空行，如果存在，则设置最后一个编辑行为其下一行、设置下面行的第一个单元格值为“*”
		var nextRow = tb.rows[lastEditRow.rowIndex+1];
		
		if(nextRow != null && nextRow != undefined){
			nextRow.cells[0].innerHTML="*";
			lastEditRow = nextRow;
		}
		//如果其下面不存在空行，则在下面新增一个空行并修改“最后一个编辑行”为新增的行，设置第一个单元格的值为“*”
		else{
			var newRow = tb.insertRow(lastEditRow.rowIndex);
			for(var i=0;i<lastEditRow.cells.length;i++){
				newRow.insertCell(i);
			}
			newRow.cells[0].innerHTML="*";
			lastEditRow = newRow;
		}
		
	}
	//如果不存在最后一个编辑行
	else{
		//将表格第一行设置为编辑行
		tb.rows[0].cells[0].innerHTML="*";
		lastEditRow = tb.rows[0];
	}
	
	
		
	
}












/****************************** 页面控制业务方法 E ********************************/
















//页面初始化函数，页面加载完后执行
function pageInit(){
	
	$("#topTextBoxContainer").find(".querybox").attr("disabled","disabled");
	$("#bottomTextBoxContainer").find("input").attr("disabled","disabled");
	$("#invoiceType").attr("disabled","disabled");

	$("#bottomTextBoxContainer").find("input").css("height","12px");
	
	rowSelection();

}
	
	


