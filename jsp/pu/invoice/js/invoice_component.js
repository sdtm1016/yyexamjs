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
/************ 下拉菜单按钮相关代码 E *************/
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
	queryButton.style.display = 'block';
	currentQueryButton = queryButton;
}
//当前选中的编辑窗体的id
var queryid = null;
//查询文本框组件的所在区域，用于弹窗返回值处理函数依据此变量值为目标文本框赋值指引方向
function queryButtonClick(btn){
	queryid = $(btn).parent().find("input:first")[0].id;
	//构建本窗体返回值参数
	var param = {};
	//日期选择
	if (queryid=="dpbvdate") {
		WdatePicker({
		      el:"dpbvdate",
		      position:{left:100,top:10},
		      onpicking:function(dp){
		         //得到用户选择的日期
		         var newSelectedDate=dp.cal.getNewDateStr();
		      }
		   });
	}else if (queryid=="cdepcode") {//部门选择
		param.subjectDeptId = "";
		param.subjectDeptName = "";
 		window.parent.openWindow('basic_comref_dptref','pu_invoice_invoice',param);
	}else if (queryid=="cvencode") {//供货单位
		param.subjectBusinessId = "";
		param.subjectBusinessName = "";
		window.parent.openWindow('basic_comref_supref2','pu_invoice_invoice',param);
	}else if (queryid=="cunitcode") {//贷垫单位
		window.parent.openWindow('basic_comref_supref2','pu_invoice_invoice');
	}else if (queryid=="cpersoncode") {//业务员
		param.subjecPersonId = "";
		param.subjecPersonName = "";
		window.parent.openWindow('basic_comref_personref','pu_invoice_invoice',param);
	}else if (queryid=="cptcode") {//采购类型
		//param.subjecPersonId = "";
		//param.subjecPersonName = "";
		window.parent.openWindow('pu_comrefence_putype','pu_invoice_invoice');
	}
	else if (queryid=="cpaycode") {//付款条件
		param.subjecPersonId = "";
		param.subjecPersonName = "";
		window.parent.openWindow('basic_comref_payCondref','pu_invoice_invoice',param);
	}else if (queryid=="dqdate") {//到期日
		WdatePicker({
		      el:"dqdate",
		      position:{left:100,top:10},
		      onpicking:function(dp){
		         //得到用户选择的日期
		         var newSelectedDate=dp.cal.getNewDateStr();
		      }
		   });
	}
	
}
//返回值写入
function deliverValue(valueObject){
	if(queryid!=null){
		var focusAreaId = $("#"+queryid).parent().parent().parent().parent().parent().parent()[0].id;
		//表单参照
		if(focusAreaId=="topTextBoxContainer"){
			//显示名称
			$("#"+queryid).val(valueObject.cname);
			//存储id
			$("#"+queryid).attr("dbvalueId", valueObject.id);
			//存储代码
			$("#"+queryid).attr("dbvalue", valueObject.ccode);
		}else if(focusAreaId=="datatableContainer"){
			var currentEditCellName = document.getElementById("datatable_header").rows[0].cells[currentEditCell.cellIndex].innerHTML;	
			switch(currentEditCellName){
				case "存货编码":
					//存货编码
					$(currentEditCell).find("input:first").val(valueObject.ccode);
					//存货名称
					$(currentEditCell).parent().find("td").eq(2).text(valueObject.cname);
					//规格型号
					$(currentEditCell).parent().find("td").eq(3).text(valueObject.ctype);
					//计量单位
					$(currentEditCell).parent().find("td").eq(4).text(valueObject.cunit);
					break;
				case "原币单价":
					break;
				case "本币单价":
					break;
			 }
		}
	}
}
/************ 查询文本框相关代码 E *************/

 
//窗体关闭时，隐藏日历控件
function onWindowClose(){
	$dp.hide();
}

/**
 * 验证控件中输入的是否为日期形，否则给出默认值（当前日期）
 * @param obj
 */
function validateDate(obj){
	var value = obj.value;
	if(value){
		var result = value.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
		if(result==null){
			var nowDate = new Date();
			var nowString = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate();
			obj.value = nowString;
		}
	}
}

function limitInputNum(){
    var keyCode = event.keyCode;  
    if ((keyCode >= 48 && keyCode <= 57 || keyCode==45)){  
        event.returnValue = true;  
    } else {  
        event.returnValue = false;  
    }  
	
} 