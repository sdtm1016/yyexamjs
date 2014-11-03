/**
 * 
 * @DESCRIBE   月末转账：对应结转转账对象
 * @AUTHOR     王丙建
 * @DATE       2012-11-27
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
 * @param ctranid 编号
 * @param csign 凭证类别
 * @param inid 行号
 * @param cdigest 摘要
 * @param ccode 转出科目编码
 * @param ccodename 转出科目名称
 * @param ccodefzx 转出辅助项
 * @param zrcode 转入科目编码
 * @param zrcodename 转入科目名称
 * @param zrcodefzx 转入辅助项
 * @param jzxs 结转系数
 * @param ccodefzxname 转出辅助项名称
 * @param zrcodefzxname 转入辅助项名称

 * @returns
 */
function cspbautoTran(id, iyear, iperiod, itype, ctranid, csign, inid, cdigest, ccode, ccodename,ccodefzx,
		zrcode,zrcodename,zrcodefzx,jzxs, ccodefzxname, czrcodefzxname) {
	this.id = id;
	this.iyear = iyear;
	this.iperiod = iperiod; 
	this.itype  = itype;
	this.ctranid = ctranid;
	this.csign  = csign;
	this.inid = inid;
	this.cdigest = cdigest; 
	this.ccode  = ccode;
	this.ccodename = ccodename;
	this.ccodefzx = ccodefzx;
	this.zrcode = zrcode;
	this.zrcodename = zrcodename; 
	this.zrcodefzx = zrcodefzx;
	this.jzxs  = jzxs;
	this.ccodefzxname = ccodefzxname;
	this.czrcodefzxname  = czrcodefzxname;

}


/**
 * 把对应转账对象内容存储到数组中
 * @param glBautotran
 * @param length
 */
function glCspBautotranToArray(glCspBautotran, length) {
	var cells = new Array(length);
	cells[0] = glCspBautotran.ctranid;
	cells[1] = glCspBautotran.csign;
	cells[2] = glCspBautotran.cdigest;
	cells[3] = glCspBautotran.ccode;
	cells[4] = glCspBautotran.ccodename;
	//转入辅助项    显示值
	cells[5] = glCspBautotran.ccodefzxname;
	cells[6] = glCspBautotran.czrcode;
	cells[7] = glCspBautotran.czrcodename;
	//转出辅助项  显示值
	cells[8] = glCspBautotran.czrcodefzxname;
	cells[9] = glCspBautotran.jzxs;
	//转入辅助项    数据值
	cells[10] = glCspBautotran.ccodefzx;
	//转出辅助项数据值
	cells[11] = glCspBautotran.czrcodefzx;
	
	return cells;
}

/**
 * 把对象值转换成字符串数组
 * @param glBautotran
 */
function glCspBautotranToStringArray(glCspBautotran, rowno) {
	var strRtn = "";
	var id = "&glCspBautotranList[" + rowno + "].id="  +glCspBautotran.id ;	
	var iyear = "&glCspBautotranList[" + rowno + "].iyear="  +selyear ;
	var iperiod = "&glCspBautotranList[" + rowno + "].iperiod="  +selmonth ;
	var itype = "&glCspBautotranList[" + rowno + "].itype="  +selitype ;
	var ctranid = "&glCspBautotranList[" + rowno + "].ctranid="  + glCspBautotran.ctranid;
	var csign = "&glCspBautotranList[" + rowno + "].csign="  +glCspBautotran.csign ;
	var cdigest = "&glCspBautotranList[" + rowno + "].cdigest="  + glCspBautotran.cdigest;
	var ccode = "&glCspBautotranList[" + rowno + "].ccode="  + glCspBautotran.ccode ;
	var ccodename = "&glCspBautotranList[" + rowno + "].ccodename="  + glCspBautotran.ccodename ;
	var ccodefzx = "&glCspBautotranList[" + rowno + "].ccodefzx="  + glCspBautotran.ccodefzx ;
	
	var inid = "&glCspBautotranList[" + rowno + "].inid="  +rowno ;
	var czrcode = "&glCspBautotranList[" + rowno + "].czrcode="  + glCspBautotran.zrcode ;
	var czrcodename = "&glCspBautotranList[" + rowno + "].czrcodename="  + glCspBautotran.zrcodename ;
	var czrcodefzx = "&glCspBautotranList[" + rowno + "].czrcodefzx="  + glCspBautotran.zrcodefzx ;
	
	var jzxs = "&glCspBautotranList[" + rowno + "].jzxs="  + glCspBautotran.jzxs;
	var ccodefzxname = "&glCspBautotranList[" + rowno + "].ccodefzxname="  + glCspBautotran.ccodefzxname ;
	var czrcodefzxname = "&glCspBautotranList[" + rowno + "].czrcodefzxname="  + glCspBautotran.czrcodefzxname ;
	
	strRtn = id +  iyear +iperiod +  itype + ctranid +  csign +  cdigest + ccode + ccodename + ccodefzx
	+ inid  + czrcode + czrcodename + czrcodefzx + jzxs + ccodefzxname + czrcodefzxname; 
	return strRtn;
}


/**
 * 把数组转换成Bautotran对象
 * @param cells
 */
function arrayToBautotran(cells, rowno, id) {
	var curBautoTran = new cspbautoTran();
	//行号
	curBautoTran.id = id;
	curBautoTran.inid = rowno;
	
	//凭证信息
	curBautoTran.ctranid = cells[2].id;
	curBautoTran.cdigest = cells[0].innerHTML;
	curBautoTran.csign = cells[3].id;
	
	//转出科目信息
	curBautoTran.code = cells[4].id;
	curBautoTran.codename = cells[5].id;
	curBautoTran.codefzx = cells[6].innerHTML;
	curBautoTran.codefzxname = cells[10].innerHTML;
	
	
	//转入科目信息
	curBautoTran.zrcode = cells[7].innerHTML;
	curBautoTran.zrcodename = cells[8].innerHTML;
	curBautoTran.zrcodefzx = cells[9].innerHTML;
	
	curBautoTran.jzxs = cells[10].innerHTML;
	curBautoTran.zrcodefzxname = cells[11].innerHTML;
	
	
	return curBautoTran;
	
}



