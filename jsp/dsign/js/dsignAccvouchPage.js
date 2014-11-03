/**
 * 
 * @DESCRIBE   凭证组件分录行翻页控制
 * @AUTHOR     王丙建
 * @DATE       2013-03-26
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

 //关键字总行数
 var accvouchKeyCount = 0;
 
 //当前关键字列表中的值
 var curaccvouchKeyValue = 0;
 
 //关键字列表对象
 var accvouchKeyList = null;
 
 var curDsignYear = null; //当前凭证组件年份

 var curDsignPeriod = null; //当前凭证组件会计期间
 
 var curDsignType = null; //当前凭证字
 
 var curDsignTypeid = null; //当前凭证字id
 
 var curdsignPzbh = null; //当前凭证编号
 
 var curDsignProducerDate = null; // 当前凭证制单日期
 
 /**
  * 得到凭证分录行的全部关键字列表
  */
 function queryAllAccvouchKey() {
	 $.ajax({
		 	url:"dsignAccvouch!queryAllDsignAccvouchKey.action",
		 	type:"post",
		    async:false,
		 	dataType:"json",
		 	success:function(data,status){
		 		accvouchKeyList = data.accvouchKeyList;
		 		accvouchKeyCount = accvouchKeyList.length;
		 	}
		});

 }
 
 /**
  * 根据凭证关键字查询一张凭证
  */
 function queryOneDsignAccvouchByAccvouchkey(curAccvouchKey) {
	 
	 
	 var data = "accvouchKey.iyear=" + curAccvouchKey.iyear 
	            +"&accvouchKey.iperiod=" + curAccvouchKey.iperiod
	            +"&accvouchKey.attribute380=" + curAccvouchKey.attribute380
	            +"&accvouchKey.csign=" + curAccvouchKey.csign
	            +"&accvouchKey.dbillDate=" + curAccvouchKey.dbillDate
	            +"&accvouchKey.inoId=" + curAccvouchKey.inoId;
	 
	  curDsignYear = curAccvouchKey.iyear; //当前凭证组件年份
	  curDsignPeriod = curAccvouchKey.iperiod; //当前凭证组件会计期间
      curDsignType = curAccvouchKey.csign; //当前凭证字
	  curdsignPzbh = curAccvouchKey.inoId; //当前凭证编号
	  curDsignProducerDate = curAccvouchKey.dbillDate; //当前制单日期
	  
	  
	 $.ajax({
		 	url:"dsignAccvouch!queryOneDsignAccvouchByAccvouchkey.action",
		 	type:"post",
		 	data:data,
		    async:false,
		 	dataType:"json",
		 	success:function(data,status){
		 		

		 		//得到后台查询的凭证组件对象
		 		var dsign = data.dsignGridAccvouch;
		 		
		 		

		 		
		 		dsign_display_status = 1;
		 		
		 		//查询凭证时首先初始化辅助核算显示项目
		 		  //loadCodeAddInitInfo();
		 		queryDsignToAllDignData(dsign);
		 		
		 		
		 	}
		});
 }
 
 
 /**
  * 首张凭证
  */
 function firstAccvouchkey() {
	 if(curaccvouchKeyValue==1){
		 //alert("已经是第一张");
		 return;
	 }
	 
	 queryAllAccvouchKey();
	 if (accvouchKeyCount==0) return ;
	 
	 curaccvouchKeyValue = 1;
	 var  curAccvouchKey = accvouchKeyList[curaccvouchKeyValue-1];  
	 queryOneDsignAccvouchByAccvouchkey(curAccvouchKey);
 }
 
 
 /**
  * 末张凭证
  */
 function lastAccvouchkey() {

	 //queryAllAccvouchKey();
	 if(curaccvouchKeyValue == accvouchKeyCount){
		 //alert("已经是最后一张");
		 return;
	 }
	 
	 if (accvouchKeyList==null) return;
	 
	 if (accvouchKeyCount==0) return ;
	 curaccvouchKeyValue = accvouchKeyCount;	 
	 var  curAccvouchKey = accvouchKeyList[curaccvouchKeyValue-1];  
	 queryOneDsignAccvouchByAccvouchkey(curAccvouchKey);
 }
 
 /**
  * 下一张
  */
 function downAccvouchkey() {

	 ///queryAllAccvouchKey();
	 if(curaccvouchKeyValue == accvouchKeyCount){
		 //alert("已经是最后一张");
		 return;
	 }
	 
	 if (accvouchKeyList==null) return;
	 if (accvouchKeyCount==0) return ;
	 curaccvouchKeyValue++;
	 if (curaccvouchKeyValue>=accvouchKeyCount)
		 curaccvouchKeyValue = accvouchKeyCount;
	 var  curAccvouchKey = accvouchKeyList[curaccvouchKeyValue-1];  		
	 queryOneDsignAccvouchByAccvouchkey(curAccvouchKey);
	 
 }
 
 /**
  * 上一张
  */
 function upAccvouchKey() {

	 //queryAllAccvouchKey();
	 if(curaccvouchKeyValue==1){
		 //alert("已经是第一张");
		 return;
	 }
	 
	 if (accvouchKeyList==null) return;
	 if (accvouchKeyCount==0) return ;
	 curaccvouchKeyValue--;
	 if (curaccvouchKeyValue<=1)
		 curaccvouchKeyValue = 1;
	 var  curAccvouchKey = accvouchKeyList[curaccvouchKeyValue-1];
	 queryOneDsignAccvouchByAccvouchkey(curAccvouchKey);
 }
 
 /**
  * 显示最后增加的凭证
  * 王丙建 2013-06-13
  */
 function showLastDsign() {
	 queryAllAccvouchKey();
	 lastAccvouchkey();
 }
 
 
 
 