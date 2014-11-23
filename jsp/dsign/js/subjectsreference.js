/**
 * 
 * @DESCRIBE   科目参照界面js
 * @AUTHOR     王丙建
 * @DATE       2012-10-18
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */





/**
 * 取得父窗体传来的值
 * 如果要约束节点操作行为，需要在参数中添加treeSetting对象，
 * treeSetting对象包含的属性有：
 * justFinalNode:boolean >> 只能选择末级节点，如无该属性，则按照false执行
 * selectedNodeId:nodeId >> 要初始化选中的节点的id
 */
var parentParam = window.parent.valueMap.get("dsign_subjectsreference");





/**
 *  得到科目绝对值
 */
function getCodeAbsName(ccode) {
	var absCodeName = null;
	  /*$.ajax({
		    url: "code!queryCodeAbsName.action?ccode=" + ccode,
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	absCodeName = data.absCodeName;
		    }
	  });*/
	if(ccode=='1002'){
		absCodeName='银行存款';
	}else if(ccode=='1405'){
		absCodeName='库存商品';
	}
	  return absCodeName;
}

function selSubject() {
	
	
	if (selNode.id=="KMCZ" || selNode.level==1){
		return false;
	}
	
	subjectCode = selNode.id;
	subjectName = selNode.name;  
	
	if (subjectCode.length<4) return false;
	 if (parentParam!=undefined && parentParam!=null && 
		 parentParam.treeSetting!=null && parentParam.treeSetting!=undefined 
		 && parentParam.treeSetting.justFinalNode==true && selNode.isParent==true) {
		  jAlert("只能选择末级科目！","提示");
		  return false;
	 }
	 //科目名称绝对值
	 var absCodeName = getCodeAbsName(subjectCode);
	
	var param = {selKemuCode:subjectCode,selKemuName:absCodeName};
	//将选中的值传给弹出本页面的父窗体
	window.parent.deliverValue('dsign_subjectsreference',param);
	window.parent.closeWindow('dsign_subjectsreference');
	
}

/**
 * 科目过滤事件
 */
function filter() {
	
	subjectFilter.bconst = "0";
	getFilterValue();
	addSubNodes(selNode);
}	

/**
 * 得到过滤条件值
 */
function getFilterValue() {
	var cb1Obj = document.getElementById("cb1");
	var cb2Obj = document.getElementById("cb2");
	var cb3Obj = document.getElementById("cb3");
	var cb4Obj = document.getElementById("cb4");
	var cb5Obj = document.getElementById("cb5");
	var cb6Obj = document.getElementById("cb6");
	var cb7Obj = document.getElementById("cb7");
	var cb8Obj = document.getElementById("cb8");
	var cb9Obj = document.getElementById("cb9");
	var cb10Obj = document.getElementById("cb10");
	
	//个人往来
	if (cb1Obj.checked) 
		subjectFilter.bperson = "1";
	else
		subjectFilter.bperson = "0";
	//供应商往来
	if (cb2Obj.checked) 
		subjectFilter.bsup = "1";
	else
		subjectFilter.bsup = "0";
	//项目核算
	if (cb3Obj.checked) 
		subjectFilter.bitem = "1";
	else
		subjectFilter.bitem = "0";
	//数量核算
	if (cb4Obj.checked) 
		subjectFilter.bnumber = "1";
	else
		subjectFilter.bnumber = "0";
	//日记账
	if (cb5Obj.checked) 
		subjectFilter.br = "1";
	else
		subjectFilter.br = "0";
	//客户往来
	if (cb6Obj.checked) 
		subjectFilter.bcus = "1";
	else
		subjectFilter.bcus = "0";
	//部门核算
	if (cb7Obj.checked) 
		subjectFilter.bdept = "1";
	else
		subjectFilter.bdept = "0";
	//外币核算
	if (cb8Obj.checked) 
		subjectFilter.bwaib = "1";
	else
		subjectFilter.bwaib = "0";
	//末级核算
	if (cb9Obj.checked) 
		subjectFilter.bend = "1";
	else
		subjectFilter.bend = "0";
	//银行账
	if (cb10Obj.checked) 
		subjectFilter.be = "1";
	else
		subjectFilter.be = "0";

}
/**
 * 常用科目
 */

function subjectConst() {
	var selCode = selNode.id;
	var selCodePid = selNode.pId;
	$.ajax({
		async : false,   
	    cache:false,   
		url:"glMcodeUsed!setConstSubject.action?id=" + selCode + "&pId="+ selCodePid,
		type:"post",
		dataType:"json",
		error: function () {//请求失败处理函数   
            jAlert('请求失败','提示');   
        }, 
		success:function(data,status){
			
			addConstSubject();
			
		}
  });
}

/**
 * 增加常用科目
 */
function addConstSubject() {
	var zTree = $.fn.zTree.getZTreeObj("subjectTree");  
	//选中常用下科目节点从常用表中删除此节点 	
	  if (selNode.pId=="CY") {
		  zTree.removeNode(selNode); 
		  jAlert("常用科目移除成功！");
	  }
	  //增加选择的科目到常用节点下
	  else {
		  var cyNode = zTree.getNodeByParam("id","CY",null);
		  //var newNodeString = '{id:"' + selNode.id + '",pid:"' + 'CY' + '",name:"' + selNode.name + '"}';
		  //var newNode = eval('(' + newNodeString + ')') ;
		  //zTree.addNodes(cyNode,newNode);
		  zTree.addNodes(cyNode,selNode);
		  jAlert("设置常用科目成功！","提示");
	  }
	  
}

/**
 * 科目编辑事件
 */
function subjectEdit() {
	window.parent.parent.openWindow('finance_code');
}

/**
 * 科目取消
 */
function subjectCancel() {
	
	window.parent.closeWindow('dsign_subjectsreference');
}

/**
 * 个人往来
 */
function selCb1() {
	var cb1Obj = document.getElementById("cb1");
	if (cb1Obj.checked) {
		//供应商往来
		document.getElementById("cb2").disabled =true;
		//客户往来
		document.getElementById("cb6").disabled =true;		
		//部门核算
		document.getElementById("cb7").disabled =true;
		
	}
	else {
		//供应商往来
		document.getElementById("cb2").disabled =false;
		//客户往来
		document.getElementById("cb6").disabled =false;		
		//部门核算
		document.getElementById("cb7").disabled =false;
	
		
	}
}


/**
 * 供应商往来
 */
function selCb2() {
	var cb2Obj = document.getElementById("cb2");
	if (cb2Obj.checked) {
		//个人往来
		document.getElementById("cb1").disabled =true;
		//客户往来
		document.getElementById("cb6").disabled =true;		
		
	}
	else {
		//个人
		document.getElementById("cb1").disabled =false;
		//客户往来
		document.getElementById("cb6").disabled =false;		
	}
}


/**
 * 客户往来
 */
function selCb6() {
	var cb6Obj = document.getElementById("cb6");
	if (cb6Obj.checked) {
		//供应商往来
		document.getElementById("cb2").disabled =true;
		//个人往来
		document.getElementById("cb1").disabled =true;		
		
	}
	else {
		//供应商往来
		document.getElementById("cb2").disabled =false;
		//个人往来
		document.getElementById("cb1").disabled =false;		
	
		
	}
}


/**
 * 部门核算
 */
function selCb7() {
	var cb7Obj = document.getElementById("cb7");
	if (cb7Obj.checked) {
		//个人往来
		document.getElementById("cb1").disabled =true;
		
	}
	else {
		//个人往来
		document.getElementById("cb1").disabled =false;
		
	}
}

/**
 * 初始化过滤条件的值为0，表示均为选中
 */
var subjectFilter = new subjectFilter("0","0","0","0","0","0","0","0","0","0","0");


/**
 * 科目参照：过滤条件定义对象
 * @param bperson 个人往来
 * @param bcus 客户往来
 * @param bsup 供应商往来
 * @param bdept 部门核算
 * @param bitem 项目核算
 * @param bwaib 外币核算
 * @param bnumber 数量核算
 * @param bend 末及科目
 * @param br 日记账
 * @param be 银行账
 * @param bconst 银行账
 */

function subjectFilter(bperson,bcus,bsup,bdept,bitem,bwaib,bnumber,bend, br,be, bconst) {
	this.bperson = bperson;
	this.bcus = bcus;
	this.bsup = bsup;
	this.bdept = bdept;
	this.bitem = bitem;
	this.bwaib = bwaib;
	this.bnumber = bnumber;
	this.bend = bend;
	this.br = br;
	this.be = be;
	this.bconst = bconst;
}



