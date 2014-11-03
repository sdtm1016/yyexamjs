
//hashMap数据结构 用于存储弹出存货档案选择返回的存货对象（当存货编码失去焦点时从此Map中取得对象并为其他单元格赋值）
function hashMap(){
	var map = {
			put 	 : function(key,value){this[key] = value;},
			get 	 : function(key){return this[key];},
			contains : function(key){return this.get(key) == null?false:true;},
			remove 	 : function(key){delete this[key];}
			};
	return map;
}

/***
 * 存货键值对象，key:存货编码，value:存货对象
 * 根据编码取得整个存货对象，进而可以其他属性，如存货名称
 */
var inventoryMap=new hashMap();


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
var targetElement = null;

function queryBoxClick(queryBox){
	if(currentQueryButton != null){
		currentQueryButton.style.display = 'none';
		currentQueryButton = null;
	}
	if ( queryBox.parentNode==null) return ;
	var queryButton = queryBox.parentNode.getElementsByTagName('input')[1];
	if (queryButton==undefined) return ;
	queryButton.style.display = 'block';
	currentQueryButton = queryButton;
	
	
}


var queryid = null;
var focusArea = null;//查询文本框组件的所在区域，用于弹窗返回值处理函数依据此变量值为目标文本框赋值指引方向

/**
 * 主表弹出窗体事件
 * @param btn
 */
function queryButtonClick(btn){
	focusArea = "topArea";
	queryid = btn.parentNode.getElementsByTagName("input")[0].id;
	//构建本窗体返回值参数
	var param = {};
	//开票日期选择
	if (queryid=="DDATE") {
		WdatePicker({
		      el:"DDATE",
		      position:{left:90,top:1},
		      onpicking:function(dp){
		         //得到用户选择的日期
		         var newSelectedDate=dp.cal.getNewDateStr();
		        // alert("newSelectedDate" + newSelectedDate);		         
		      }
		   });
	}
	//销售类型
	else if (queryid=="xslx") {
		param.subjectDeptId = "";
		param.subjectDeptName = "";
		//window.parent.openWindow('basic_comref_dptref','pu_invoice_invoice',param);具体弹出那个框等用的时候替换,以下类似
	}
	
	// 客户名称
	else if (queryid=="CCUSCODE") {
		param.subjectBusinessId = "";
		param.subjectBusinessName = "";
		window.parent.openWindow('basic_comref_cusref','sa_invoice_invoice',param);	}
	
	//业务员
	else if (queryid=="CPERSONCODE") {
		param.subjecPersonId = "";
		param.subjecPersonName = "";
		window.parent.openWindow('basic_comref_personref','sa_invoice_invoice',param);
	}
	
	
	//付款条件
	else if (queryid=="CPAYCODE") {
		param.subjecPersonId = "";
		param.subjecPersonName = "";
		window.parent.openWindow('basic_comref_payCondref','sa_invoice_invoice',param);
	}
	
	
	
	//销售部门
	else if(queryid=="CDEPCODE"){
		param.subjectDeptId = "";
		param.subjectDeptName = "";
		window.parent.openWindow('basic_comref_dptref','sa_invoice_invoice',param);	}						
	//到期日
else if (queryid=="DQDATE") {
		WdatePicker({
		      el:"DQDATE",
		      position:{left:100,top:1},
		      onpicking:function(dp){
		         //得到用户选择的日期
		         var newSelectedDate=dp.cal.getNewDateStr();
		        // alert("newSelectedDate" + newSelectedDate);		         
		      }
		   });
	}
	
}

/*
 * 返回值处理
 */
function deliverValue(valueObject){
	//表单参照
	if(focusArea=="topArea"){
	
		//客户名称
		if (queryid=="CCUSCODE") {
			//显示名称
			document.getElementById(queryid).value = valueObject.cname;
			//客户地址
			$("#khdz").val(valueObject.khdz);
			//开户银行
			$("#CBCODE").val(valueObject.khyh);
			//银行账号
			$("#yhzh").val(valueObject.yhzh);
			//存储id
			document.getElementById(queryid).setAttribute("dbvalueId", valueObject.id);
			//存储代码
			document.getElementById(queryid).setAttribute("dbvalue", valueObject.ccode);

		}
		else {
		
			//显示名称
			document.getElementById(queryid).value = valueObject.cname;
			//存储id
			document.getElementById(queryid).setAttribute("dbvalueId", valueObject.id);
			//存储代码
			document.getElementById(queryid).setAttribute("dbvalue", valueObject.ccode);
		}
	
	}else if(focusArea=="tableCell"){
		var currentEditCellName = document.getElementById("datatable_header").rows[0].cells[currentEditCell.cellIndex].innerHTML;	
		switch(currentEditCellName){
	
		case "货物名称":
			
			//显示名称
			targetElement.value = valueObject.cname;
			targetElement.setAttribute("dbvalue", valueObject.ccode);
			
			//存进map
			inventoryMap.put(valueObject.cname,valueObject);
		
			break;
		case "仓库":
			
			//显示名称
			targetElement.value = valueObject.cname;
			targetElement.setAttribute("dbvalue", valueObject.ccode);
			//存进map
			inventoryMap.put(valueObject.cname,valueObject);
		
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

					case "仓库":
						
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
					case "货物名称":
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
					case "数量":
					case "价税合计":
					case "报价":
					case "折扣额":
					case "扣税(%)":
					case "税率(%)":
					case "税率2(%)":					
					
						//往单元格TD里添加查询文本框
						var temp = cell.innerHTML;
						cell.innerHTML = "<input type=\"text\" value=\"sd\" style=\"width:100%;border:none;\"/>";
						var textbox = cell.getElementsByTagName("input")[0];
						textbox.value = temp;
						textbox.focus();
						currentEditCell = cell;
						break;
					case "批号":
						//往单元格TD里添加查询文本框
						var temp = cell.innerHTML;
						cell.innerHTML = querybox_htmlstr;
						var textbox = cell.getElementsByTagName("input")[0];
						cell.getElementsByTagName("input")[1].setAttribute("onclick","tableCellWindowMaper('"+title+"')");
						textbox.value = temp;
						textbox.focus();
						currentEditCell = cell;
						break;										
					case "含税单价":
						//往单元格TD里添加查询文本框
						var temp = cell.innerHTML;
						cell.innerHTML = querybox_htmlstr;
						var textbox = cell.getElementsByTagName("input")[0];
						cell.getElementsByTagName("input")[1].setAttribute("onclick","tableCellWindowMaper('"+title+"')");
						textbox.value = temp;
						textbox.focus();
						currentEditCell = cell;
						break;					
					case "退货标志":
						
						//往单元格TD里添加查询文本框
						var temp = cell.innerHTML;
						cell.innerHTML = querybox_htmlstr;
						var textbox = cell.getElementsByTagName("input")[0];
						cell.getElementsByTagName("input")[1].setAttribute("onclick","tableCellWindowMaper('"+title+"')");
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
	
	case "仓库":
		window.parent.openWindow('basic_comref_warehouseGridRef','sa_invoice_invoice',param);
		
		break;
		
	case "货物名称":
		window.parent.openWindow('basic_comref_inventoryref','sa_invoice_invoice',param);
		break;
		
	case "含税单价":
		break;
	case "批号":
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
			
				//货物名称失去焦点
				case "货物名称":
					//为存货名称赋值
					var o = inventoryMap.get(currentEditCell.innerHTML);
					if (o==undefined) {
						//存货编码
						var curCode =  t.rows[rowIndex].cells[2].getAttribute("dbvalue");
						$.ajax({
							url:"inventory!queryInventoryByCinvcode.action?code=" + curCode ,		
							type:"post",
							async:false,
							datatype:"json",
							success:function(data,status){
								var inventory = data.inventory;
								//存货名称
								t.rows[rowIndex].cells[2].innerHTML= strNullProc(inventory.cinvname);
								//规格型号
								t.rows[rowIndex].cells[3].innerHTML= strNullProc(inventory.cinvstd);
								//计量单位
								t.rows[rowIndex].cells[4].innerHTML= strNullProc(inventory.cinvmUnit);
							}
						});	
					}
					else {
						//存货名称
						t.rows[rowIndex].cells[2].innerHTML=currentEditCell.innerHTML;
						t.rows[rowIndex].cells[2].setAttribute("dbValue",o.ccode);
						//规格型号
						t.rows[rowIndex].cells[3].innerHTML=o.ctype;
						//计量单位
						t.rows[rowIndex].cells[4].innerHTML=o.cunit;
					}
					// 初始化其他信息
					//含税单价
					t.rows[rowIndex].cells[6].innerHTML=0.00;
					//扣率
					t.rows[rowIndex].cells[11].innerHTML=100;
					
					//退补标志
					t.rows[rowIndex].cells[12].innerHTML="正常";
					
					//税率
					t.rows[rowIndex].cells[14].innerHTML=curTaxRate;
					
					//扣率2
					t.rows[rowIndex].cells[15].innerHTML=100;
					
					
					break;
				//数量失去焦点
				case "数量":
				//原币单价失去焦点	
				case "含税单价":
					//存货编码
					 /**
					var curCode = t.rows[rowIndex].cells[2].innerHTML;
					if (curCode=="") {
						alert("请输入存货！");
						t.rows[rowIndex].cells[6].innerHTML = "";
						break ;
					}
					*/
					
					//数量
					var curSl =parseFloat(t.rows[rowIndex].cells[5].innerHTML).toFixed(2);
					if (curSl=="NaN") {
						curSl=0.00;
						t.rows[rowIndex].cells[5].innerHTML=curSl;
					} 
					//含税单价
					var curdj =parseFloat(t.rows[rowIndex].cells[6].innerHTML).toFixed(2);
					if (curdj=="NaN") {
						curdj=0.00;
						t.rows[rowIndex].cells[6].innerHTML=curdj;
					}
					//价税合计
					var curMoney = (curSl*curdj).toFixed(2);
					//数量
					t.rows[rowIndex].cells[5].innerHTML=curSl;
					//含税单价
					t.rows[rowIndex].cells[6].innerHTML=curdj;
					
					//价税合计
					t.rows[rowIndex].cells[7].innerHTML=curMoney;
					
					break;
				case "价税合计":
					//数量
					var curSl =parseFloat(t.rows[rowIndex].cells[5].innerHTML).toFixed(2);
					if (curSl=="NaN") {
						curSl=0.00;
					} 
					//价税合计
					var curMoney =parseFloat(t.rows[rowIndex].cells[7].innerHTML).toFixed(2);
					if (curMoney=="NaN") {
						curMoney=0.00;
					} 
					//数量不为空时
					if (curSl!=0.00) {
						var curdj =	(curMoney/curSl).toFixed(2);
						//价税合计
						t.rows[rowIndex].cells[6].innerHTML=curdj;
						
					}
					break;
				case "报价":
					//数量
					var curSl =parseFloat(t.rows[rowIndex].cells[5].innerHTML).toFixed(2);
					if (curSl=="NaN") {
						curSl=0.00;
					} 
					
					//报价
					var curbj =parseFloat(t.rows[rowIndex].cells[8].innerHTML).toFixed(2);
					if (curbj=="NaN") {
						curbj=0.00;
					} 
					//税率
					var curTaxRate =parseFloat(t.rows[rowIndex].cells[14].innerHTML).toFixed(2);
					if (curTaxRate=="NaN") {
						curTaxRate=0.00;
					}
					if (curSl!=0.00) {
						//价税合计
						var curMoney = ((curSl*curbj) + (curSl*curbj)*curTaxRate/100).toFixed(2);
						//含税单价
						var curdj =	(curMoney/curSl).toFixed(2);
						//含税单价
						t.rows[rowIndex].cells[5].innerHTML=curdj;
						//价税合计
						t.rows[rowIndex].cells[6].innerHTML=curMoney;
					}
					
				  break;
				case "折扣额":
					//数量
					var curSl =parseFloat(t.rows[rowIndex].cells[5].innerHTML).toFixed(2);
					if (curSl=="NaN") {
						curSl=0.00;
					} 
					
					//报价
					var curbj =parseFloat(t.rows[rowIndex].cells[8].innerHTML).toFixed(2);
					if (curbj=="NaN") {
						curbj=0.00;
					} 
					//折扣额
					var curzkMoney =parseFloat(t.rows[rowIndex].cells[9].innerHTML).toFixed(2);
					if (curzkMoney=="NaN") {
						curzkMoney=0.00;
					}
					//税率
					var curTaxRate =parseFloat(t.rows[rowIndex].cells[14].innerHTML).toFixed(2);
					if (curTaxRate=="NaN") {
						curTaxRate=0.00;
					}
					if (curSl!=0.00) {
						//价税合计
						var curMoney = ((curSl*curbj) + (curSl*curbj)*curTaxRate/100-curzkMoney).toFixed(2);
						//含税单价
						var curdj =	(curMoney/curSl).toFixed(2);
						//含税单价
						t.rows[rowIndex].cells[5].innerHTML=curdj;
						//价税合计
						t.rows[rowIndex].cells[6].innerHTML=curMoney;
						
					}
					
					 break;
			    case "扣率":
					
				 break;
			    case "税率":
					
				 break;
			    case "扣率2":
					
					 break;
				    
					 
				
			 }
			
			
			currentEditCell=null;
			
		}

	}
	showSumTable();
	
};
/******************** 组件公共document.onclick方法 E **********************/





//窗体关闭时，隐藏日历控件
function onWindowClose(){
	$dp.hide();
}




