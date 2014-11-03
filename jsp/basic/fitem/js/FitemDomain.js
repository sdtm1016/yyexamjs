/**
 * 
 * @DESCRIBE   项目目录：js数据对象
 * @AUTHOR     王丙建
 * @DATE       2012-12-24
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

/**
 * 项目结构对象
 */
function  fitemData(citemName, citemText, crule, ctext, imode, itype, ilength, iscale
		,blist ,bsum, bref, citemSqr) {
	this.citemName = citemName;
	this.citemText = citemText;
	this.crule = crule;
	this.ctext = ctext;
	this.imode = imode;
	
	this.itype = itype;
	this.ilength = ilength;
	this.iscale = iscale;
	this.blist = blist;
	this.bsum = bsum;
	
	this.bref = bref;
	this.citemSqr = citemSqr;
} 


/**
* 把项目档案对象内容存储到数组中
* @param fitemData 项目档案对象
* @param length
*/
function fitemDataToArray(fitemData, length) {
	var cells = new Array(length);
	cells[0] = fitemData.citemName;
	cells[1] = fitemData.citemText;
	cells[2] = fitemData.crule;
	cells[3] = fitemData.ctext;
	cells[4] = fitemData.imode;
	cells[5] = fitemData.itype;
	cells[6] = fitemData.ilength;
	cells[7] = fitemData.iscale;
	cells[8] = fitemData.blist;
	cells[9] = fitemData.bsum;
	cells[10] = fitemData.bref;
	cells[11] = fitemData.citemSqr;
	return cells;
}

/**
* 把对象值转换成字符串数组
* @param glBautotran
*/
function fitemDataToStringArray(fitemData, rowno) {
	var strRtn = "";
	var citemName = "&fitemDataList[" + rowno + "].citemName="  +fitemData.citemName ;	
	var citemText = "&fitemDataList[" + rowno + "].citemText="  +fitemData.citemText ;
	var crule = "&fitemDataList[" + rowno + "].crule="  +fitemData.crule ;
	var ctext = "&fitemDataList[" + rowno + "].ctext="  +fitemData.ctext ;
	var imode = "&fitemDataList[" + rowno + "].imode="  + fitemData.imode;
	
	var itype = "&fitemDataList[" + rowno + "].itype="  +fitemData.itype ;
	var ilength = "&fitemDataList[" + rowno + "].ilength="  +fitemData.ilength ;
	var iscale = "&fitemDataList[" + rowno + "].iscale="  +fitemData.iscale ;
	var blist = "&fitemDataList[" + rowno + "].blist="  + fitemData.blist ;
	var bsum = "&fitemDataList[" + rowno + "].bsum="  + fitemData.bsum ;
	var bref = "&fitemDataList[" + rowno + "].bref="  + fitemData.bref ;
	var citemSqr = "&fitemDataList[" + rowno + "].citemSqr="  + fitemData.citemSqr ;
	strRtn = citemName +  citemText +crule +  ctext +  imode + itype + ilength + iscale +blist
	+ bsum + bref + citemSqr ;
	return strRtn;
}


/**
* 把数组转换成Bautotran对象
* @param cells
*/
function arrayToFitemData(cells) {
	var curFitemData = new fitemData();
	
	curFitemData.citemName = cells[0];
	curFitemData.citemText = cells[1];
	curFitemData.crule = cells[2];
	curFitemData.ctext = cells[3];
	curFitemData.imode = cells[4];
	
	curFitemData.itype = cells[5];
	curFitemData.ilength = cells[6];
	curFitemData.iscale = cells[7];
	curFitemData.blist = cells[8];
	curFitemData.bsum = cells[9];
	
	curFitemData.bref = cells[10];
	curFitemData.citemSqr = cells[11];
	return curFitemData;
	
}








