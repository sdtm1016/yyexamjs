/**
 * 
 * @DESCRIBE   项目目录：js数据对象
 * @AUTHOR     王丙建
 * @DATE       2012-12-26
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


//定义表格
var tb = null;
//定义每行的主键
var trKey = null;
var cellCount = 11;
function initRow(cells, key) {
	tb = document.getElementById("itemStructureTableRows");
	
	var row = tb.insertRow(tb.rows.length);	
	row.style.backgroundColor="#ffffff";
	row.style.height="18px";
	row.style.textAlign="center";	
	row.id=key.ciremClass;
	row.name=key.cfieldName;
	
	trKey = key;
	for (var i = 0; i<cells.length; i++ ) {
		var cell = row.insertCell(i);
		
		if (cells[i]==null) cells[i] = "";
		cell.id = cells[i];
		cell.innerHTML = cells[i];
		
	}
	
	//设置每行每列的样式
	for(var i=0;i<tb.rows.length;i++){
		tb.rows[i].cells[0].style.width="140px";
		tb.rows[i].cells[0].style.color="#000";
		tb.rows[i].cells[0].style.textAlign="center";

		tb.rows[i].cells[2].style.textAlign="right";

		tb.rows[i].cells[3].style.color="#f00";
		tb.rows[i].cells[3].style.textAlign="center";

		tb.rows[i].cells[4].style.color="#f00";
		tb.rows[i].cells[4].style.textAlign="center";
		
		tb.rows[i].cells[5].style.color="#f00";
		tb.rows[i].cells[5].style.textAlign="center";
		
	}
	
	
}

/**
 * 为表格增加事件
 */
function addClickToTable() {
	tb = document.getElementById("itemStructureTableRows");
	for(var i=0;i<tb.rows.length;i++){
		for(var j=0;j<tb.rows[i].cells.length;j++){
			tb.rows[i].cells[j].ondblclick=function(event){
						var evt = (window.event || event);
						var td = (evt.srcElement || evt.target);
							
						switch(td.cellIndex){
						case 0 :
						case 1 :
						case 2 :
							updateAction("td");
							break;
						case 3 :
						case 4 :
						case 5 :
							var innerHTML = td.innerHTML;
							if(innerHTML=="Y" && td.getAttribute("isBeforeValue")=="true"){
								
								jAlert("之前的值不能修改");
							}else{
								//更加单元格不同的索引值，确定是修改哪个属性值
								var updateFiled = null;	
								if (td.cellIndex==3) {
							    	updateFiled = "blist";
							    } 
							    else if (td.cellIndex==4) {
							    	updateFiled = "bsum";
							    }
							    else if (td.cellIndex==5) {
							    	updateFiled = "bref";
							    }
								if(innerHTML=="Y"){
									 
									td.innerHTML="";
									updateStruValue(td.parentNode.id,td.parentNode.name,updateFiled,"0");
								}else{
									td.innerHTML="Y";
									updateStruValue(td.parentNode.id,td.parentNode.name,updateFiled,"1");
								}
							}
							break;
						}
					};
		}
	}

}




/**
 * 项目档案定义
 * @param citemClass  项目大类
 * @param citemSqr  项目顺序
 * @param cfieldName  字段名称
 * @param ctext  字段中文描述
 * @param imode
 * @param itype  字段类型
 * @param ilength 数据长度
 * @param iscale 小数长度
 * @param blist 是否显示
 * @param bsum 是否合计
 * @param bref 是否参照
 * @returns
 */
function fitemStru(citemClass, citemSqr, cfieldName, ctext, imode, itype, ilength, iscale, blist,
		bsum, bref) {
	this.citemClass = citemClass;
	this.citemSqr = citemSqr;
	this.cfieldName = cfieldName; 
	this.ctext  = ctext;
	this.imode = imode;
	this.itype = itype; 
	this.ilength  = ilength;
	this.iscale = iscale;
	this.blist = blist; 
	this.bsum  = bsum;
	this.bref = bref;
}





/**
 * 把项目档案对象内容存储到数组中
 * @param glBautotran
 * @param length
 */
function fitemStruToArray(fitemstructure, length) {
	var cells = new Array(length);
	cells[0] = fitemstructure.ctext;
	if (fitemstructure.itype=="1") {
		cells[1] = "整数";
		cells[2] = fitemstructure.ilength ;
	}
	else if (fitemstructure.itype=="2") {
		cells[1] = "实数";
		cells[2] = fitemstructure.ilength + "." + fitemstructure.iscale;		
	}
	else if (fitemstructure.itype=="3") {
		cells[1] = "文本";
		cells[2] = fitemstructure.ilength ;
	}
	else if (fitemstructure.itype=="4") {
		cells[1] = "日期";
		cells[2] = fitemstructure.ilength ;
	}
	else if (fitemstructure.itype=="5") {
		cells[1] = "逻辑";
		cells[2] = fitemstructure.ilength ;
	}
	if (fitemstructure.blist==1) {
		cells[3] = "Y";
	}
	else {
		cells[3] = "";
	}
	if (fitemstructure.bsum==1) {
		cells[4] = "Y";
	}
	else {
		cells[4] = "";
	}
	if (fitemstructure.bref==1) {
		cells[5] = "Y";
	}
	else {
		cells[5] = "";
	}
	return cells;
}





