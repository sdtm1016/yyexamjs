
/**
 * 
 * @DESCRIBE   对应结转转账gridjs
 * @AUTHOR     王丙建
 * @DATE       2012-11-27
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


//当前被点击选中的单元格全局变量
var currentEditCell=null;

//当前选择行
var curSelRow =null;

//当前被点击选中的行全局变量
currentSeletedRow = null;

var tb = document.getElementById("datatable_rows");


//选择的年份、会计期间、自定义转账类型
var selyear = ""; 
var selmonth = "";
var selitype = "20";




//定义每行的主键
var trKey = null;
var cellCount = 11;
function initCspRow(cells, key) {
	var row = tb.insertRow(tb.rows.length);	
	row.style.height="18px";
	row.id=key.id;
	row.name=key.ctext;
	row.czrcodefzx = key.czrcodefzx;
	trKey = key;
	//转入科目辅助项数据值
	var czrcodefzx =  key.czrcodefzx;
	//alert("czrcodefzx" + czrcodefzx);
	for (var i = 0; i<4; i++ ) {
		var cell = row.insertCell(i);
		if (cells[i*1+6]==null) cells[i*1+6] = "";
		cell.id = cells[i*1+6];
		cell.innerHTML = cells[i*1+6];
		 if ((i*1+6==8)) {
			 cell.setAttribute("dbValue",czrcodefzx); 
		 }
		
	}
	setEditable();
	setSelectableRow();	
}


/**
 * 得到对应转账表格的数值
 */
function getCspRowsValue() {
	//编号
	var tb_tranid = $("#tb_tranid").val();
	//凭证类别
	//var tb_sign =  $("#signList").find("option:selected").text();
	var tb_sign = $("#signList").val();
	//摘要
	var cdigest = $("#cdigest").val();	
	//转出科目编码
	var zccode =  $("#zccode").val();			
	//转出科目名称
	var zccodeName = $("#zccodeName").val();
	//转出辅助项
	var zcfzx = $("#zcfzx").attr("dbValue");
	//转出辅助项名称
	var zcfzxname = $("#zcfzx").val();
	
	var msg = tb_tranid + "\t" + tb_sign + "\t" + cdigest + "\t" + zccode + "\t" + zccodeName + "\t" + zcfzx;
	var tb = document.getElementById("datatable_rows");
	var length = tb.rows.length;
	var glCspBautotranList = new Array(length);
	for(var i=0;i<length;i++){
		var zrcode = tb.rows[i].cells[0].innerHTML;
		var zrcodeName = tb.rows[i].cells[1].innerHTML;
		//转入辅助项名称
		var zrcodefzxname = tb.rows[i].cells[2].innerHTML;
		//转入辅助项
		var zrcodefzx = tb.rows[i].cells[2].getAttribute("dbValue");
		//alert("zrcodefzx:" + zrcodefzx);
		var jzxs = tb.rows[i].cells[3].innerHTML;
		if(jzxs.replace(/(^\s*)|(\s*$)/g, "")==""||jzxs.replace(/(^\s*)|(\s*$)/g, "")==null){
			jzxs=1;
			tb.rows[i].cells[3].innerHTML=1;
		}
		var curBautoTran = new cspbautoTran();
		curBautoTran.id = tb.rows[i].id;
		curBautoTran.inid = i;
		curBautoTran.ctranid = tb_tranid;
		curBautoTran.csign = tb_sign;
		curBautoTran.cdigest = cdigest;
		curBautoTran.ccode = zccode;
		curBautoTran.ccodename = zccodeName;
		curBautoTran.ccodefzx = zcfzx;
		curBautoTran.ccodefzxname = zcfzxname;
		
		curBautoTran.zrcode = zrcode;
		curBautoTran.zrcodename = zrcodeName;
		curBautoTran.zrcodefzx = zrcodefzx;
		curBautoTran.czrcodefzxname = zrcodefzxname;
		
		curBautoTran.jzxs = jzxs;
		glCspBautotranList[i] = curBautoTran;
	}	
	return glCspBautotranList;
}









/**
 * 增行
 */
function addRow(){
	
	var row = tb.insertRow(tb.rows.length);
	row.style.height="18px";
	for(var i=0;i<4;i++){
		row.insertCell(i);

		setEditable();
		setSelectableRow();
		//var cell =row.insertCell(i);
		//cell.innerHTML="<input type='text'/>";
	}
}


/**
 * 删行
 */
function delRow(){
	if($(currentSeletedRow).parent().children().length==1){
		deleteCspButtoTran();
	}else{
		if(currentSeletedRow!=null && currentSeletedRow.rowIndex>0)
			tb.deleteRow(currentSeletedRow.rowIndex-1);
		else
			jAlert("请选择一行再进行此操作","提示");
	}
	
}



/**
 * 可双击编辑单元格
 */
function setEditable(){
	var tb = document.getElementById("datatable_rows");


	for(var i=0;i<tb.rows.length;i++){
		for(var j=0;j<tb.rows[i].cells.length;j++){
			tb.rows[i].cells[j].ondblclick=function(){
				var evt=(window.event || event);//获得事件
				var td = (evt.srcElement || evt.target);
				
				if(td.tagName!="TD"){
					td = td.parentNode;
				}
				
				//如果被双击单元格是“科目名称”列，则不往里面创建文本框和弹窗按钮，退出此函数
				var headField = document.getElementById("datatable_header").cells[td.cellIndex];
				var headText = headField.innerHTML;
				
				if(headText=="转入科目名称"){
					return false;
				}
				
				
				//避免重复双击，重复往TD里添加innerHTML内容产生混乱
				if(td.getElementsByTagName("input").length==0){
					
					//如果有其他单元格正处于编辑状态，那么还需要将其他单元格取消编辑状态
					if(currentEditCell!=null){
						currentEditCell.innerHTML=currentEditCell.getElementsByTagName("input")[0].value;
						currentEditCell=null;
					}
					
					
					//往单元格TD里添加文本框和放大镜按钮
					var temp = td.innerHTML;
					var	 component = null;
					if (headText=="结转系数") {
						component = "<input type='text' value='"+temp+"' style='border:none;height:14px;width:100%;'/>" ;
					}else {
						
						 component = "<input type='text' id='tempTextBox' readonly='readonly' onfocus=this.blur(); value='"+temp+"' componenttype='querybox' style='border:none;height:14px;width:"+(parseInt(headField.style.width)-14)+"px'/><input type='button' class='finder' style='margin-left:-14px;'; componenttype='querybox' onclick='switchAction(this);'/>";
							
					}
					td.innerHTML=component;
					td.getElementsByTagName("input")[0].focus();
					currentEditCell=td;
				}
				
			}
		}
		
		
	}
}


/**
 * 可选中行
 */
function setSelectableRow(){
	for(var i=0;i<tb.rows.length;i++){

		tb.rows[i].onclick=function(){
			var evt=(window.event || event);//获得事件
			var evtsrc = (evt.srcElement || evt.target);
			if(currentSeletedRow!=null && evtsrc.tagName=="TD"){
				currentSeletedRow.style.backgroundColor="#fff";
				currentSeletedRow.style.color="#000";
			}
			if(evtsrc.tagName=="TD"){
				evtsrc.parentNode.style.backgroundColor="#00f";
				evtsrc.parentNode.style.color="#fff";
				currentSeletedRow=evtsrc.parentNode;
			}
			
		}
	}

}

//单元失去焦点，执行取消编辑状态动作：
document.onmousedown=function(){
	
	var evt=(window.event || event);//获得事件
	var evtsrc = (evt.srcElement || evt.target);
	
	if(currentEditCell!=null){
		
		var inputs = currentEditCell.getElementsByTagName("input");
		
		if(inputs.length>0 && evtsrc.getAttribute('componenttype')!="querybox" ){
			currentEditCell.innerHTML=inputs[0].value;
			currentEditCell=null;
			return;
		}
	}

}



/**
 * 全局变量，存放当前弹出窗体的动作，用于本页返回值处理函数将返回的值根据此值判断赋值到目的控件
 */
var xaction = null;


/**
 * 单元格编辑模式下放大镜按钮弹出目标窗体处理函数
 */
function switchAction(button){
	var td = button.parentNode;
	if(td.tagName!="TD"){
		td = button.parentNode.parentNode;
	}
	
	if(td.tagName=="TD"){
		var cellIndex = td.cellIndex;
		var th = document.getElementById("datatable_header");
		var headText = th.cells[cellIndex].innerHTML;
		switch(headText){
			case "转入科目编码" :
				var param = {};
				var treeSetting = new Object();
				treeSetting.justFinalNode=true;
				param.treeSetting=treeSetting;

				window.parent.openWindow("dsign_subjectsreference","gl_transfer_mts",param);
				
				xaction = "editabledCell";
				break;
				
			case "转入辅助项" :
				tableAddInfoWindow(td.parentNode);
				xaction = "editabledCell";
				break;
				
				
				
				
		}
		
		
		
		
	}
	
}


/**
 * 实现窗体传值接收处理函数
 */
function deliverValue(valueObject){
	//取得列标题名称
	
	
	
	if(xaction=="editabledCell"){
		if(currentEditCell==null) return;
		var headText = document.getElementById("datatable_header").cells[currentEditCell.cellIndex].innerHTML;
		var textBox = currentEditCell.getElementsByTagName("input")[0];
		//根据列列标题名称取相应的值将值赋值进当前编辑的单元格内的文本框里
		switch(headText){
			case "转入科目编码" :
				textBox.value=valueObject.selKemuCode;
				currentSeletedRow.cells[1].innerHTML = valueObject.selKemuName;
				
				break;

			case "转入辅助项" :
				
				// 项目核算特殊处理
				//项目id
				var citemid = 0;
				//项目大类id
				var citemclass = 0;
				
				var strItemValue = strZeroProc1(valueObject.items.subjectProjectId,0);
				 if (strItemValue!="0") {
					 var itemList = strItemValue.split("|");
					 citemid = itemList[0];
					 citemclass = itemList[1];
				 }
				
				
				var dbValue = "CDEPT_ID=" + strZeroProc1(valueObject.items.subjectDeptId,0) + ";"
	              + "CPERSON_ID="+ strZeroProc1(valueObject.items.subjectPersonId,0) + ";"
	              + "CCUS_ID="+ strZeroProc1(valueObject.items.subjectCustomerId,0) + ";"
	              + "CSUP_ID="+ strZeroProc1(valueObject.items.subjectSupId,0) + ";"
	              + "CITEM_CLASS="+ citemclass + ";"
	              + "CITEM_ID="+ citemid + ";";
				
				
				var valueList = new Array();
				//部门
				if (strZeroProc1(valueObject.items.subjectDeptId,0)!="0")
					valueList.push(valueObject.items.subjectDeptName);
				//个人
				if (strZeroProc1(valueObject.items.subjectPersonId,0)!="0")
					valueList.push(valueObject.items.subjectPersonName);
				//客户
				if (strZeroProc1(valueObject.items.subjectCustomerId,0)!="0")
					valueList.push(valueObject.items.subjectCustomerName);
				//供应商
				if (strZeroProc1(valueObject.items.subjectSupId,0)!="0")
					valueList.push(valueObject.items.subjectSupName);
				//项目
				if (strZeroProc1(valueObject.items.subjectProjectId,0)!="0")
					valueList.push(valueObject.items.subjectProjectName);
				
				var value = valueList.toString();
			

				textBox.value = value;
				currentSeletedRow.cells[2].setAttribute("dbValue",dbValue);
				//textBox.value=JSON.stringify(valueObject.items);
				break;
					
				
		}

	}
	//转出辅助项 
	else if (xaction=="editAddInfo"){
		
		// 项目核算特殊处理
		//项目id
		var citemid = 0;
		//项目大类id
		var citemclass = 0;
		
		var strItemValue = strZeroProc1(valueObject.items.subjectProjectId,0);
		 if (strItemValue!="0") {
			 var itemList = strItemValue.split("|");
			 citemid = itemList[0];
			 citemclass = itemList[1];
		 }
		
		var dbValue = "CDEPT_ID=" + strZeroProc1(valueObject.items.subjectDeptId,0) + ";"
		              + "CPERSON_ID="+ strZeroProc1(valueObject.items.subjectPersonId,0) + ";"
		              + "CCUS_ID="+ strZeroProc1(valueObject.items.subjectCustomerId,0) + ";"
		              + "CSUP_ID="+ strZeroProc1(valueObject.items.subjectSupId,0) + ";"
		              + "CITEM_CLASS="+ citemclass + ";"
		              + "CITEM_ID="+ citemid + ";";
		
		var valueList = new Array();
		//部门
		if (strZeroProc1(valueObject.items.subjectDeptId,0)!="0")
			valueList.push(valueObject.items.subjectDeptName);
		//个人
		if (strZeroProc1(valueObject.items.subjectPersonId,0)!="0")
			valueList.push(valueObject.items.subjectPersonName);
		//客户
		if (strZeroProc1(valueObject.items.subjectCustomerId,0)!="0")
			valueList.push(valueObject.items.subjectCustomerName);
		//供应商
		if (strZeroProc1(valueObject.items.subjectSupId,0)!="0")
			valueList.push(valueObject.items.subjectSupName);
		//项目
		if (strZeroProc1(valueObject.items.subjectProjectId,0)!="0")
			valueList.push(valueObject.items.subjectProjectName);
		
		var value = valueList.toString();
		
		//alert("辅助项名称：" + value+ "\t辅助项值" + dbValue);
		
		$("#zcfzx").val(value);
		$("#zcfzx").attr("dbValue",dbValue);
		//$("#zcfzx").val(JSON.stringify(valueObject.items));
	}
	
	else if (xaction!=null){
		document.getElementById(xaction).value=valueObject.selKemuCode;
		document.getElementById("zccodeName").value=valueObject.selKemuName;
		
		xaction=null;
	} 
	
	
}

setEditable();
setSelectableRow();

