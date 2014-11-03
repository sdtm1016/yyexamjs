/**
 * 
 * @DESCRIBE   凭证组件行关键字数据对象
 * @AUTHOR     王丙建
 * @DATE       2013-03-26
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

/**
 * 定义凭证关键字对象
 */
 function DsignAccvouchKey(iyear,iperiod,csign,attribute380, dbillDate,inoId) {
   this.iyear = iyear;
   this.iperiod = iperiod;
   this.csign = csign;
   this.attribute380 = attribute380;
   this.dbillDate = dbillDate;
   this.inoId = inoId;
   
  };
  
  
  /**
   * 定义凭证制单人id,审核人id， 记账人id
   * 王丙建 2013-08-05 
   */
  function DsignAccvouchPersonId(cbillid,checkid,cashierid) {
	  this.cbillid = cbillid;
	  this.checkid = checkid;
	  this.cashierid = cashierid;
  }
  
  
