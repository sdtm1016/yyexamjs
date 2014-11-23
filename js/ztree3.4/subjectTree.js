/**
 * 
 * @DESCRIBE   科目参照树：js逻辑控制
 * @AUTHOR     王丙建
 * @DATE       2012-10-17
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

 // 选中科目参照编码
 var subjectCode = "";
 //选中科目参照名称
 var subjectName ="";
 
 //选中节点
 var selNode ="";

 /**
  * 初始化科目参照一级大类树
  */

 function loadSubjectZtree() {
	//初始化定义节点 
    var setting = {
		data: {
				simpleData: {
					enable: true
				}
		},
		callback: {
			onClick: onClick,
			onDblClick: onDblClick
		}
	};	 
	var treeNodes;   
	var zNodes = [];
	/*$.ajax({
		 async : false,   
	     cache:false,   
		url:"ztree!loadSubJectTree.action",
		type:"post",
		dataType:"json",
		error: function () {//请求失败处理函数   
            alert('请求失败');   
        }, 
		success:function(data,status){
			//alert(data.listTree);
			treeNodes = data.listTree;
            for (var i = 0; i<treeNodes.length; i++) {
            	var nodeObj =  eval('(' + treeNodes[i] + ')') ;
            	zNodes.push(nodeObj);
            	
            }
		}
	});	*/
	$(document).ready(function(){
		var zNodes =[  
	        {id:1, pId:0, name:"科目参照", open:true},  
	        {id:2, pId:1, name:"常用"},
	        {id:3, pId:1, name:"资产"},
	        {id:4, pId:1, name:"负债"},
	        {id:5, pId:1, name:"共同"},
	        {id:6, pId:1, name:"权益"},
	        {id:7, pId:1, name:"成本"},
	        {id:8, pId:1, name:"损益"}
 	    ];  
  
        $.fn.zTree.init($("#subjectTree"), setting, zNodes); 
	});
 }
	 
	 
			  
  /**
   * 节点单击事件
   * @param event
   * @param treeId 树id
   * @param treeNode jied
   * @param clickFlag
   */
  function onClick(event, treeId, treeNode, clickFlag) {
	  //alert(treeId + "\t" + treeNode.name + "\t" + treeNode.id +"\t" +  treeNode.pId);
	  selNode = treeNode;
	  //alert(treeNode.pId);
	  if (treeNode.pId == "CY") return;
	  addSubNodes(treeNode);
		
 }		
  /**
   * 鼠标双击事件
   * @param event
   * @param treeId
   * @param treeNode
   * @param clickFlag
   */
 function onDblClick(event, treeId, treeNode) {
	  subjectCode = treeNode.id;
	  subjectName = treeNode.name;
	  //alert("科目编码："+ subjectCode + "\t" +"科目名称：" + subjectName)
	  if (subjectCode.length<4) return;	
	  
	  
	//科目名称绝对值
	var absCodeName = getCodeAbsName(subjectCode);
	var param = {};
      param.selKemuCode=subjectCode;
      param.selKemuName=absCodeName;
	if (window.dialogArguments != null) {
		window.dialogArguments.arg1 = param.selKemuCode;
		window.dialogArguments.arg2 = param.selKemuName;
	}
	window.close();
 }
 

  /**
   * 增加子节点
   * @param e
   */
  function addSubNodes(treeNode) {
	  var subNodes = null;
      var nodeId = treeNode.id;
      //得到过滤条件数据
      var filterData = {};
      filterData.subjectFilter = subjectFilter;
     // alert("filterData：" + filterData);
      
      var dts = $.param(filterData).replace(new RegExp("%5D","gm"),"").replace(new RegExp("%5B","gm"),".");
  	 // alert("dts:" + dts);
      //alert(nodeId);
      //从后台获取子节点信息
	  /*$.ajax({
			async : false,   
		    cache:false,   
			url:"ztree!loadSubJectSubNodes.action?nodeId=" + nodeId,
			type:"post",
			data: dts,			
			dataType:"json",
			error: function () {//请求失败处理函数   
	            alert('请求失败');   
	        }, 
			success:function(data,status){
				//alert(data.subLstTree);
				subNodes = data.subListTree;
	            
			}
	  });*/
      
      if(nodeId=='3'){
    	  subNodes=[
    	            "{id:1001,name:'1001库存现金'}",
    	            "{id:1002,name:'1002银行存款'}",
    	            "{id:1003,name:'1003存放中央银行款项'}",
    	            "{id:1011,name:'1011存放同业'}",
    	            "{id:1012,name:'1012其他货币资金'}",
    	            "{id:1021,name:'1021结算备付金'}",
    	            "{id:1031,name:'1031存出保证金'}",
    	            "{id:1101,name:'1101交易性金融资产'}",
    	            "{id:1111,name:'1111买入返售金融资产'}",
    	            "{id:1121,name:'1121应收票据'}",
    	            "{id:1122,name:'1122应收账款'}",
    	            "{id:1123,name:'1123预付账款'}",
    	            "{id:1131,name:'1131应收股利'}",
    	            "{id:1132,name:'1132应收利息'}",
    	            "{id:1201,name:'1201应收代位追偿款'}",
    	            "{id:1211,name:'1211应收分保账款'}",
    	            "{id:1212,name:'1212应收分保合同准备金'}",
    	            "{id:1221,name:'1221其他应收款'}",
    	            "{id:1231,name:'1231坏账准备'}",
    	            "{id:1301,name:'1301贴现资产'}",
    	            "{id:1302,name:'1302拆出资金'}",
    	            "{id:1303,name:'1303贷款'}",
    	            "{id:1304,name:'1304贷款损失准备'}",
    	            "{id:1311,name:'1311代理兑付证券'}",
    	            "{id:1321,name:'1321代理业务资产'}",
    	            "{id:1401,name:'1401材料采购'}",
    	            "{id:1402,name:'1402在途物资'}",
    	            "{id:1403,name:'1403原材料'}",
    	            "{id:1404,name:'1404材料成本差异'}",
    	            "{id:1405,name:'1405库存商品'}",
    	            "{id:1406,name:'1406发出商品'}",
    	            "{id:1407,name:'1407商品进销差价'}"
    	            ];
      }
      
	  var zTree = $.fn.zTree.getZTreeObj("subjectTree");  
      var nodes = zTree.getSelectedNodes();
      //alert(nodes.length);
      //如果由子节点，先清除原来节点再增加新节点
      if (nodes.length > 0 ) {
    	 // alert("清除子节点后再增加新节点");
    	  zTree.removeChildNodes(treeNode);  
      }
	  for (var i = 0; i<subNodes.length; i++) {
            var subNode =  eval('(' + subNodes[i] + ')') ;
            zTree.addNodes(treeNode, subNode);
            	
       }
  }
			
 
