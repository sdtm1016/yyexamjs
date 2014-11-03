
/**
 * 
 * @DESCRIBE   月末转账：期间损益转账对象
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
 * @param yearlrcode 本年利润科目
 * @param sycode 损益科目编码
 * @param sycodename 损益科目名称
 * @param sycodeclass 损益科目账类
 * @param lrcode 利润科目编码
 * @param lrcodename 利润科目名称
 * @param lrcodeclass 利润科目账类
 * @param lrcodetype 利润科目大类
 * @returns
 */
function periodbautoTran(id, iyear, iperiod, itype, ctranid,  csign, inid, yearlrcode, sycode, sycodename,
		sycodeclass, sycodetype,lrcode,lrcodename,lrcodeclass,lrcodetype) {
	this.id = id;
	this.iyear = iyear;
	this.iperiod = iperiod; 
	this.itype  = itype;
	this.ctranid = ctranid;
	this.csign  = csign;
	this.inid = inid;
	this.yearlrcode  = yearlrcode;
	this.sycode  = sycode;
	this.sycodename  = sycodename;
	this.sycodeclass  = sycodeclass;
	this.sycodetype = sycodetype;
	this.lrcode  = lrcode;
	this.lrcodename  = lrcodename;
	this.lrcodeclass  = lrcodeclass;
	this.lrcodetype  = lrcodetype;
}


/**
 * 把对象值转换成字符串数组
 * @param glBautotran
 */
function glPeriodBautotranToStringArray(glPeriodBautotran, rowno) {
	var strRtn = "";
	var id = "&glPeriodBautotranList[" + rowno + "].id="  + rowno ;	
	var iyear = "&glPeriodBautotranList[" + rowno + "].iyear="  +selyear ;
	var iperiod = "&glPeriodBautotranList[" + rowno + "].iperiod="  +selmonth ;
	var itype = "&glPeriodBautotranList[" + rowno + "].itype="  +selitype ;
	var ctranid = "&glPeriodBautotranList[" + rowno + "].ctranid="  + glPeriodBautotran.ctranid;
	var csign = "&glPeriodBautotranList[" + rowno + "].csign="  +glPeriodBautotran.csign ;
	var inid = "&glPeriodBautotranList[" + rowno + "].inid="  +rowno ;
	var yearlrcode = "&glPeriodBautotranList[" + rowno + "].yearlrcode="  + glPeriodBautotran.yearlrcode ;
	var sycode = "&glPeriodBautotranList[" + rowno + "].sycode="  + glPeriodBautotran.sycode ;
	var sycodename = "&glPeriodBautotranList[" + rowno + "].sycodename="  + glPeriodBautotran.sycodename ;
	var sycodeclass = "&glPeriodBautotranList[" + rowno + "].sycodeclass="  + glPeriodBautotran.sycodeclass ;
	var sycodetype = "&glPeriodBautotranList[" + rowno + "].sycodetype="  + glPeriodBautotran.sycodetype ;
	
	var lrcode = "&glPeriodBautotranList[" + rowno + "].lrcode="  + glPeriodBautotran.lrcode ;
	var lrcodename = "&glPeriodBautotranList[" + rowno + "].lrcodename="  + glPeriodBautotran.lrcodename ;
	var lrcodeclass = "&glPeriodBautotranList[" + rowno + "].lrcodeclass="  + glPeriodBautotran.lrcodeclass ;
	var lrcodetype = "&glPeriodBautotranList[" + rowno + "].lrcodetype="  + glPeriodBautotran.lrcodetype ;
	strRtn = id +  iyear +iperiod +  itype +  csign + ctranid + inid 
	         + yearlrcode + sycode + sycodename + sycodeclass + sycodetype + lrcode+ lrcodename + lrcodeclass + lrcodetype;
	return strRtn;
}
