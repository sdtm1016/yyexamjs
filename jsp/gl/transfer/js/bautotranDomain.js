/**
 * 
 * @DESCRIBE   月末转账：自定义转账对象
 * @AUTHOR     王丙建
 * @DATE       2012-11-13
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


/**
 * 自定义转账关键字
 */
function bautoTranKey(accid, iyear, iperiod, itype, ctranid) {
	this.accid = accid;
	this.iyear = iyear;
	this.iperiod = iperiod; 
	this.itype  = itype;
	this.ctranid = ctranid;
}

/**
 * 
 * @param id 主键
 * @param ctranid 转账序号
 * @param ctext 转账说明
 * @param csign 凭证类别
 * @param inid 行号
 * @param cdigest 摘要
 * @param ccode 科目编码
 * @param cdeptId 部门id
 * @param cpersonId 个人id
 * @param ccusId 客户id
 * @param csupId 供应商id
 * @param citemId 项目id
 * @param bdc  借贷方向
 * @param cformula  金额公式
 * @param cformulaf 外币公式
 * @param cformulas 数量公式
 * @param opstyle  操作方式 ins update query
 * @returns
 */
function bautoTran(id, iyear, iperiod, itype, ctranid, ctext, csign, inid, cdigest, ccode, cdeptId, cpersonId, ccusId, csupId,citemId,
		bdc,cformula,cformulaf,cformulas) {
	this.id = id;
	this.iyear = iyear;
	this.iperiod = iperiod; 
	this.itype  = itype;
	this.ctranid = ctranid;
	this.ctext = ctext; 
	this.csign  = csign;
	this.inid = inid;
	this.cdigest = cdigest; 
	this.ccode  = ccode;
	this.cdeptId = cdeptId;
	this.cpersonId = cpersonId;
	this.ccusId = ccusId;
	this.csupId = csupId; 
	this.citemId = citemId;
	this.bdc  = bdc;
	this.cformula = cformula;
	this.cformulaf  = cformulaf;
	this.cformulas = cformulas;
}


/**
 * 把自定义转账对象内容存储到数组中
 * @param glBautotran
 * @param length
 */
function glBautotranToArray(glBautotran, length) {
	var cells = new Array(length);
	cells[0] = glBautotran.cdigest;
	cells[1] = glBautotran.ccode;
	cells[2] = glBautotran.cdeptId;
	cells[3] = glBautotran.cpersonId;
	cells[4] = glBautotran.ccusId;
	cells[5] = glBautotran.csupId;
	cells[6] = glBautotran.citemId;
	cells[7] = glBautotran.bdc;
	cells[8] = glBautotran.cformula;
	cells[9] = glBautotran.cformulaf;
	cells[10] = glBautotran.cformulas;
	return cells;
}

/**
 * 把对象值转换成字符串数组
 * @param glBautotran
 */
function glBautotranToStringArray(glBautotran, rowno) {
	selctext=$("#TextList").find("option:selected").html();
	var strRtn = "";
	var id = "glBautotranList[" + rowno + "].id="  +glBautotran.id ;	
	var iyear = "&glBautotranList[" + rowno + "].iyear="  +selyear ;
	var iperiod = "&glBautotranList[" + rowno + "].iperiod="  +selmonth ;
	var itype = "&glBautotranList[" + rowno + "].itype="  +selitype ;
	var ctranid = "&glBautotranList[" + rowno + "].ctranid="  + selctranid;
	var ctext = "&glBautotranList[" + rowno + "].ctext="  +selctext ;
	var csign = "&glBautotranList[" + rowno + "].csign="  +selcsign ;
	var inid = "&glBautotranList[" + rowno + "].inid="  +rowno ;
	var cdigest = "&glBautotranList[" + rowno + "].cdigest="  + glBautotran.cdigest ;
	var ccode = "&glBautotranList[" + rowno + "].ccode="  + glBautotran.ccode ;
	var cdeptId = "&glBautotranList[" + rowno + "].cdeptId="  + glBautotran.cdeptId ;
	var cpersonId = "&glBautotranList[" + rowno + "].cpersonId="  + glBautotran.cpersonId ;
	var ccusId = "&glBautotranList[" + rowno + "].ccusId="  + glBautotran.ccusId ;
	var csupId = "&glBautotranList[" + rowno + "].csupId="  + glBautotran.csupId ;
	
	
	var citemId = "&glBautotranList[" + rowno + "].citemId="  + glBautotran.citemId ;
	var bdc = "&glBautotranList[" + rowno + "].bdc="  + glBautotran.bdc ;
	var cformula = "&glBautotranList[" + rowno + "].cformula="  + glBautotran.cformula ;
	var cformulaf = "&glBautotranList[" + rowno + "].cformulaf="  + glBautotran.cformulaf ;
	var cformulas = "&glBautotranList[" + rowno + "].cformulas="  + glBautotran.cformulas ;
	strRtn = id +  iyear +iperiod +  itype +  csign + ctext + inid + ctranid +ccode + cdigest + cdeptId + cpersonId + ccusId + csupId 
	+ citemId+ bdc + cformula + cformulaf + cformulas;
	//alert(strRtn);
	return strRtn;
}


/**
 * 把数组转换成Bautotran对象
 * @param cells
 */
function arrayToAtsBautotran(cells, rowno, id) {
	var curBautoTran = new bautoTran();
	//行号
	curBautoTran.id = id;
	curBautoTran.inid = rowno;
	curBautoTran.cdigest = cells[0].innerHTML;
	curBautoTran.ccode = cells[1].innerHTML;
	/**
	curBautoTran.cdeptId = cells[2].innerHTML;
	curBautoTran.cpersonId = cells[3].innerHTML;
	curBautoTran.ccusId = cells[4].innerHTML;
	curBautoTran.csupId = cells[5].innerHTML;
	curBautoTran.citemId = cells[6].innerHTML;
	*/
	//部门、个人、客户、供应商、项目取id值
	curBautoTran.cdeptId = cells[2].id;
	curBautoTran.cpersonId = cells[3].id;
	curBautoTran.ccusId = cells[4].id;
	curBautoTran.csupId = cells[5].id;
	curBautoTran.citemId = cells[6].id;
	
	//借贷方向
	curBautoTran.bdc = cells[7].getAttribute("dbvalue");
	curBautoTran.cformula = cells[8].innerHTML;
	curBautoTran.cformulaf = cells[9].innerHTML;
	curBautoTran.cformulas = cells[10].innerHTML;
	return curBautoTran;
	
}



