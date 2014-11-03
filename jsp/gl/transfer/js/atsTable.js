/**
 * 
 * @DESCRIBE   月末转账：自定义转账表格
 * @AUTHOR     王丙建
 * @DATE       2012-11-13
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

//当前被点击选中的单元格全局变量
var currentEditCell=null;

//当前被点击选中的行全局变量
currentSeletedRow = null;

var tb = document.getElementById("datatable_rows");

//选择的年份、会计期间、自定义转账类型
var selyear = ""; 
var selmonth = "";
var selitype = "";

//选择的转账序号、转账说明、凭证类别
var selctranid = "";
var selctext = "";
var selcsign = "";



/**
 * 初始化自定义表格
 * @param cells
 * @param key
 */

//定义每行的主键
var trKey = null;
var cellCount = 11;
function initRow(glBautotran, key) {
	var row = tb.insertRow(tb.rows.length);	
	row.style.height="18px";
	row.id=key.id;
	row.name=key.ctext;
	trKey = key;
	
	
	

	var cell1 = row.insertCell(0);
	if(glBautotran.CDIGEST==null){
		glBautotran.CDIGEST="";
	}
	cell1.id=glBautotran.CDIGEST;//摘要
	cell1.innerHTML=glBautotran.CDIGEST;//摘要 
	

	var cell2 = row.insertCell(1);
	if(glBautotran.CCODE==null){
		glBautotran.CCODE="";
	}
	cell2.id=glBautotran.CCODE;//科目编码
	cell2.innerHTML=glBautotran.CCODE;//科目编码 

	var cell3 = row.insertCell(2);
	if(glBautotran.CDEPT_ID==null){
		glBautotran.CDEPT_ID="";
	}
	if(glBautotran.CDEPT_NAME==null){
		glBautotran.CDEPT_NAME="";
	}
	cell3.id=glBautotran.CDEPT_ID;//部门id
	cell3.innerHTML=glBautotran.CDEPT_NAME;//部门名称 

	var cell4 = row.insertCell(3);
	if(glBautotran.CPERSON_ID==null){
		glBautotran.CPERSON_ID="";
	}
	if(glBautotran.CPERSON_NAME==null){
		glBautotran.CPERSON_NAME="";
	}
	cell4.id=glBautotran.CPERSON_ID;//人员id
	cell4.innerHTML=glBautotran.CPERSON_NAME;//人员名称 

	var cell5 = row.insertCell(4);
	if(glBautotran.CCUS_ID==null){
		glBautotran.CCUS_ID="";
	}
	if(glBautotran.CCUS_NAME==null){
		glBautotran.CCUS_NAME="";
	}
	cell5.id=glBautotran.CCUS_ID;//客户id
	cell5.innerHTML=glBautotran.CCUS_NAME;//客户名称 

	var cell6 = row.insertCell(5);
	if(glBautotran.CSUP_ID==null){
		glBautotran.CSUP_ID="";
	}
	if(glBautotran.CSUP_NAME==null){
		glBautotran.CSUP_NAME="";
	}
	cell6.id=glBautotran.CSUP_ID;//客户id
	cell6.innerHTML=glBautotran.CSUP_NAME;//客户名称 

	var cell7 = row.insertCell(6);
	if(glBautotran.CITEM_ID==null){
		glBautotran.CITEM_ID="";
	}
	if(glBautotran.CITEM_NAME==null){
		glBautotran.CITEM_NAME="";
	}
	cell7.id=glBautotran.CITEM_ID;//项目id
	cell7.innerHTML=glBautotran.CITEM_NAME;//项目名称 

	var cell8 = row.insertCell(7);
	var BDC = glBautotran.BD_C;
	cell8.id=BDC;//方向
	cell8.setAttribute("dbvalue",BDC);
	if(BDC==0){
		cell8.innerHTML="贷";
	}else if(BDC==1){
		cell8.innerHTML="借";
	}

	var cell9 = row.insertCell(8);
	if(glBautotran.CFORMULA==null){
		glBautotran.CFORMULA="";
	}
	cell9.id=glBautotran.CFORMULA;//金额公式
	cell9.innerHTML=glBautotran.CFORMULA;

	var cell10 = row.insertCell(9);
	if(glBautotran.CFORMULA_F==null){
		glBautotran.CFORMULA_F="";
	}
	cell10.id=glBautotran.CFORMULA_F;//外币公式
	cell10.innerHTML=glBautotran.CFORMULA_F;

	var cell11 = row.insertCell(10);
	if(glBautotran.CFORMULA_S==null){
		glBautotran.CFORMULA_S="";
	}
	cell11.id=glBautotran.CFORMULA_S;//数量公式
	cell11.innerHTML=glBautotran.CFORMULA_S;

	setEditable();
	setSelectableRow();	
}


/**
 * 增行
 */
function addRow(){
	var row = tb.insertRow(tb.rows.length);
	row.style.height="18px";
	//row.id=0;
	if (trKey!=null) {
	  row.name=trKey.ctext;
	}
	
	for (var i = 0; i<cellCount; i++ ) {
		var cell = row.insertCell(i);
		cell.innerHTML = "";
		setEditable();
		setSelectableRow();	
	}
	selctext =  $("#TextList").find("option:selected").text();	
	row.cells[0].innerHTML = selctext;
}


/**
 * 删行
 */
function delRow(){
	if (currentSeletedRow==null)
	{
	  jAlert("请首先选择行","提示");
	  return;
	}
	if (currentSeletedRow.rowIndex==-1)
	{
		jAlert("请首先选择行","提示");
	  return;
	}
	var id = $(currentSeletedRow).attr("id");
	if(typeof(id)=="undefined"){
		tb.deleteRow(currentSeletedRow.rowIndex-1);	
	}else{
		jConfirm("确定删除选中的记录？","提示信息",function(flag){
			if(flag){
				$.ajax({
					url:"glBautotran!deleteUserBautotranById.action?id="+id,		
					type:"post",
					datatype:"json",
					async : false,   
					error: function () {
			            jAlert('请求失败'); 
			        }, 
					success:function(data,status){
						tb.deleteRow(currentSeletedRow.rowIndex-1);	
					}
				});
			}
		});
	}
	
}


/**
 * 插入行
 */
function insRow(){
	if (currentSeletedRow==null)
	{
	  jAlert("请首先选择行","提示");
	  return;
	}
	var bautoTran = arrayToBautotran(currentSeletedRow.cells,1);
	if (!checkbautoTran(bautoTran)) 
		return  ;

	var row = tb.insertRow(currentSeletedRow.rowIndex-1);
	row.style.height="18px";
	//row.id=0;
	row.name=trKey.ctext;

	//var cells = glBautotranToArray(new bautoTran(), cellCount);
	for (var i = 0; i<cellCount; i++ ) {
		var cell = row.insertCell(i);
		cell.innerHTML = "";
		setEditable();
		setSelectableRow();	
	}
	row.cells[0].innerHTML = selctext;
}


/**
 * 得到表格的数值
 */
function getRowsValue() {
	
	var tb = document.getElementById("datatable_rows");
	var length = tb.rows.length;
	var glBautotranList = new Array(length);
	for(var i=0;i<length;i++){
		var bautoTran = arrayToAtsBautotran(tb.rows[i].cells,i, tb.rows[i].id);
		if (!checkbautoTran(bautoTran)) 
			return null ;
		glBautotranList[i] = bautoTran;
	}	
	return glBautotranList;
}

/**
 * 校验插入行是否正确， 通过为true， 不通过为false
 * @param bautoTran
 * @returns {Boolean}
 */
function checkbautoTran(bautoTran) {
	var result= true;
	if (bautoTran.ccode=="") {
		jAlert("科目为空时不能保存","提示");
		result = false;
	}
	else if (bautoTran.cformula=="") {
		jAlert("金额公式不能为空","提示");
		result = false;
	}
	else if (strNullProc(bautoTran.bdc)=="") {
		jAlert("借贷方向不允许为空","提示");
		result = false;
	}
	
	
	return result; 
}






/**
 * 可双击编辑单元格
 */
function setEditable(){
	var tb = document.getElementById("datatable_rows");
	for(var i=0;i<tb.rows.length;i++){
		for(var j=0;j<tb.rows[i].cells.length;j++){
			tb.rows[i].cells[j].ondblclick=function(){
				selopbz="do";
				var evt=(window.event || event);//获得事件
				var td = (evt.srcElement || evt.target);
				
				if(td.tagName!="TD"){
					td = td.parentNode;
				}
				
				var headField = document.getElementById("datatable_header").cells[td.cellIndex];
				//如果被双击单元格是“科目名称”列，则不往里面创建文本框和弹窗按钮，退出此函数
				var headText = headField.innerHTML;
				if(headText=="科目名称"){
					return;
				}else if(headText=="摘要"){
					//避免重复双击，重复往TD里添加innerHTML内容产生混乱
					if(td.getElementsByTagName("input").length==0){
						
						//如果有其他单元格正处于编辑状态，那么还需要将其他单元格取消编辑状态
						if(currentEditCell!=null){
							currentEditCell.innerHTML=currentEditCell.getElementsByTagName("input")[0].value;
							currentEditCell=null;
						}
						
						//往单元格TD里添加文本框和放大镜按钮
						var temp = td.innerHTML;
						var component = "<input type='text' value='"+temp+"' style='border:none;height:14px;width:"+(parseInt(headField.style.width)-4)+"px'/>";
						td.innerHTML=component;
						td.getElementsByTagName("input")[0].focus();
						currentEditCell=td;
					}
					return;
				}else if(headText=="方向"){
					//往单元格TD里添加文本框和放大镜按钮
					var component = "<select><option value='1'>借</option><option value='0'>贷</option></select>";
					td.innerHTML=component;
					var dbvalue = td.getAttribute("dbvalue");
					if(dbvalue!=null && dbvalue!=undefined){
						td.getElementsByTagName("select")[0].value=dbvalue;
					}
					td.getElementsByTagName("select")[0].focus();
					currentEditCell=td;
					return;
				}else{
					//避免重复双击，重复往TD里添加innerHTML内容产生混乱
					if(td.getElementsByTagName("input").length==0){
						
						//如果有其他单元格正处于编辑状态，那么还需要将其他单元格取消编辑状态
						if(currentEditCell!=null){
							currentEditCell.innerHTML=currentEditCell.getElementsByTagName("input")[0].value;
							currentEditCell=null;
						}
						
						//往单元格TD里添加文本框和放大镜按钮
						var temp = td.innerHTML;
						var component = "<input type='text' value='"+temp+"' style='border:none;height:14px;width:"+(parseInt(headField.style.width)-24)+"px'/><input type='button' onclick='switchAction(this);' class='finder'/>";
						td.innerHTML=component;
						td.getElementsByTagName("input")[0].focus();
						currentEditCell=td;
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
			
		};
	}

}

//单元失去焦点，执行取消编辑状态动作：
document.onmousedown=function(event){
	
	var evt=(window.event || event);//获得事件
	var evtsrc = (evt.srcElement || evt.target);
	
	if(currentEditCell!=null){
		var inputs = currentEditCell.getElementsByTagName("input");
		if(inputs.length>0 && evtsrc.type!="TEXT" && evtsrc.parentNode.tagName!="TD"){
			currentEditCell.innerHTML=inputs[0].value;
			if(currentEditCell.innerHTML==""){
				currentEditCell.id="";
			}
			currentEditCell=null;
			return;
		}
		
		
		
		var selects = currentEditCell.getElementsByTagName("select");
		if(selects.length>0 && evtsrc!=selects[0]){
			var si = selects[0].options[selects[0].selectedIndex];
			currentEditCell.innerHTML=si.text;
			currentEditCell.setAttribute("dbvalue",si.value);
			currentEditCell=null;
			return;
		}

	}

};

/**
 * 全局变量，存放当前弹出窗体的动作，用于本页返回值处理函数将返回的值根据此值判断赋值到目的控件
 */
var xaction = "";


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
		case "科目编码" :
			//弹出科目编码窗体
			/*只能选中末级科目 lyl */
			var parentParam={};
			parentParam.treeSetting={};
			parentParam.treeSetting.justFinalNode=true;
			/*end */
			window.parent.openWindow("dsign_subjectsreference","gl_transfer_ats",parentParam);
			xaction = "editabledCell";
			break;
			
		case "金额公式":
		case "外币公式":
		case "数量公式":
			//弹出公式向导窗体
			var ccode=td.parentNode.cells[1].innerHTML;
			window.parent.openWindow("gl_transfer_fw1","gl_transfer_ats",ccode);
			xaction = "editabledCell";
			break;
			
		case "部门" :
			window.parent.openWindow("basic_comref_dptref","gl_transfer_ats");
			xaction = "editabledCell";
			//deliverValue("aaa");
			break;

		case "个人" :
			window.parent.openWindow("basic_comref_personref","gl_transfer_ats");
			xaction = "editabledCell";
			//deliverValue("bbb");
			break;

		case "客户" :
			window.parent.openWindow("basic_comref_cusref","gl_transfer_ats");
			xaction = "editabledCell";
			//deliverValue("ccc");
			break;

		case "供应商" :
			window.parent.openWindow("basic_comref_supref","gl_transfer_ats");
			xaction = "editabledCell";
			//deliverValue("ddd");
			break;

		case "项目" :
			
			var selcode = currentSeletedRow.cells[1].innerHTML;
			/*添加项目参照界面 2013-8-26 (lyl)*/
			var bitem="";
			var cassItem="";
			if(selcode==""){
				jAlert("请填写科目编码！","提示");
			}else{
				$.ajax({
					url:"code!queryCodeByCode?ccode="+selcode,
					type:"post",
					dataType:"json",
					async : false,   
				    cache:false,   
					success:function(data){
						var code=data.code1;
						bitem=code.bitem;
						cassItem=code.cassItem;
					}
				});
				if(bitem==1&&cassItem!=null){
					var itemParam = {};
					itemParam.cassItem = cassItem;
					window.parent.openWindow("basic_comref_fitemref","gl_transfer_ats",itemParam);
					xaction = "editabledCell";	
					//deliverValue("eee");
				}else{
					jAlert("此项目核算科目没有指定项目大类!");
				}
			}
			
			/*end */
			break;

		}
		
		
	}
	
}


/**
 * 实现窗体传值接收处理函数
 */
function deliverValue(valueObject){
	if(xaction=="editabledCell"){
		//取得列标题名称
		var headText = document.getElementById("datatable_header").cells[currentEditCell.cellIndex].innerHTML;
		var textBox = currentEditCell.getElementsByTagName("input")[0];
		//根据列列标题名称取相应的值将值赋值进当前编辑的单元格内的文本框里
		switch(headText){
			case "科目编码" :
				textBox.value=valueObject.selKemuCode;
				currentEditCell.id=valueObject.selKemuCode;
				break;
				
			case "摘要" :
				textBox.value=valueObject.selBdigestName;
				currentEditCell.id=valueObject.selBdigestCode;
				
				break;

			case "部门" :
				textBox.value=valueObject.cname;
				//currentEditCell.id=valueObject.ccode;
				currentEditCell.id=valueObject.id;
				//alert(valueObject.id);
				break;

			case "个人" :
				textBox.value=valueObject.cname;
				//currentEditCell.id=valueObject.ccode;
				currentEditCell.id=valueObject.id;
				//alert(valueObject.id);
				break;

			case "客户" :
				textBox.value=valueObject.cname;
				//currentEditCell.id=valueObject.ccode;
				currentEditCell.id=valueObject.id;
				//alert(valueObject.id);
				break;

			case "供应商" :
				textBox.value=valueObject.cname;
				//currentEditCell.id=valueObject.ccode;
				currentEditCell.id=valueObject.id;
				//alert(valueObject.id);
				break;

			case "项目" :
				textBox.value=valueObject.gradename;
				currentEditCell.id=valueObject.citemId;//项目id
			//	currentEditCell.gradecode=valueObject.
				
				break;
			case "方向" :
			//	textBox.value=valueObject;
				break;
			case "金额公式":
			case "外币公式":
			case "数量公式":
				textBox.value=valueObject;
				break;
		}
	}else if(xaction=="tb_zzsm"){
		document.getElementById("tb_zzsm").value=valueObject.selBdigestName;
	}
}

setEditable();
setSelectableRow();

