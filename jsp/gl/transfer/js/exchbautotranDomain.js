
/**
 * 
 * @DESCRIBE   月末转账：汇兑损益转账对象
 * @AUTHOR     王丙建
 * @DATE       2012-11-30
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

/**
 * 
 * @param id 主键
 * @param ctranid 转账序号
 * @param csign 凭证类别
 * @param inid 行号
 * @param rzcode 汇兑损益入账科目编码
 * @param exchcode 外币科目编码
 * @param exchcodename 外币科目名称
 * @param exchcodebz 外币科目币种
 * @param exchcodeflag 是否计算汇兑损益
 * @returns
 */
function exchbautoTran(id, iyear, iperiod, itype, ctranid,  csign, inid, rzcode, exchcode, exchcodename,
		exchcodebz, exchcodeflag) {
	this.id = id;
	this.iyear = iyear;
	this.iperiod = iperiod; 
	this.itype  = itype;
	this.ctranid = ctranid;
	this.csign  = csign;
	this.inid = inid;
	this.rzcode  = rzcode;
	this.exchcode  = exchcode;
	this.exchcodename  = exchcodename;
	this.exchcodebz  = exchcodebz;
	this.exchcodeflag  = exchcodeflag;
}


/**
 * 把对象值转换成字符串数组
 * @param glBautotran
 */
function glExchBautotranToStringArray(glExchBautotran, rowno) {
	var strRtn = "";
	var id = "&glExchBautotranList[" + rowno + "].id="  + rowno ;	
	var iyear = "&glExchBautotranList[" + rowno + "].iyear="  +selyear ;
	var iperiod = "&glExchBautotranList[" + rowno + "].iperiod="  +selmonth ;
	var itype = "&glExchBautotranList[" + rowno + "].itype="  +selitype ;
	var ctranid = "&glExchBautotranList[" + rowno + "].ctranid="  + glExchBautotran.ctranid;
	var csign = "&glExchBautotranList[" + rowno + "].csign="  +glExchBautotran.csign ;
	var inid = "&glExchBautotranList[" + rowno + "].inid="  +rowno ;
	var rzcode = "&glExchBautotranList[" + rowno + "].rzcode="  + glExchBautotran.rzcode ;
	var exchcode = "&glExchBautotranList[" + rowno + "].exchcode="  + glExchBautotran.exchcode ;
	var exchcodename = "&glExchBautotranList[" + rowno + "].exchcodename="  + glExchBautotran.exchcodename ;
	var exchcodebz = "&glExchBautotranList[" + rowno + "].exchcodebz="  + glExchBautotran.exchcodebz ;
	var exchcodeflag = "&glExchBautotranList[" + rowno + "].exchcodeflag="  + glExchBautotran.exchcodeflag ;
	strRtn = id +  iyear +iperiod +  itype +  csign + ctranid + inid + rzcode + exchcode + exchcodename + exchcodebz + exchcodeflag;
	return strRtn;
}
