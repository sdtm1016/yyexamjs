/**
 * 
 * @DESCRIBE   我的账簿参照树：js逻辑控制
 * @AUTHOR     王丙建
 * @DATE       2013-01-21
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

 // 选中部门参照编码
 var selectCode = "";
 //选中部门参照名称
 var selectName ="";
 
 //选中节点
 var selNode =null;
 
 //选择节点标志
 var selNodeBz = false;

 /**
  * 初始化我的账簿参照一级大类树
  */

 function loadMyacccountYEBtree() {
	//初始化定义节点 
	 $("#datatable_bodyer").html("");
    var setting = {
		data: {
				simpleData: {
					enable: true
				}
		},
		callback: {
			onClick: onClick,
			onDblClick: onDblClick
		},
		view: {
			selectedMulti: false,
			showIcon: true
		}

	};	 
	var treeNodes;   
	var zNodes = [];
	$.ajax({
		 async : false,   
	     cache:false,   
		url:"ztree!loadMyacccountTree.action?csqlType=ZYE",
		type:"post",
		dataType:"json",
		error: function () {//请求失败处理函数   
            jAlert('请求失败',"提示");   
        }, 
		success:function(data,status){
			treeNodes = data.listTree;
            for (var i = 0; i<treeNodes.length; i++) {
            	var nodeObj =  eval('(' + treeNodes[i] + ')') ;
            	zNodes.push(nodeObj);
            	
            }
            
		}
	});	
	$(document).ready(function(){
		$.fn.zTree.init($("#myacccountTree"), setting, zNodes);
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
	  selectCode = treeNode.id;
	  selectName = treeNode.name;
	
	  selNodeBz = true;
	  if (treeNode.pId==null) {
		  currentGrade = 0;
		  return ;
	  }
	  inputcslName =  treeNode.name;
	  
	  //增加下级节点
	//  addSubNodes(treeNode);
	  showNodeInfo(treeNode.id);
	  selNode = treeNode;
	  

 }	
  
 
  
  /**
   * 鼠标双击事件
   * @param event
   * @param treeId
   * @param treeNode
   * @param clickFlag
   */
 function onDblClick(event, treeId, treeNode) {
	  selectCode = treeNode.id;
	  selectName = treeNode.name;
	  if (treeNode.pId==null) {
		  currentGrade = 0;
		  return ;
	  }
	  inputcslName =  treeNode.name;
	  //增加下级节点
	  addSubNodes(treeNode);
	  showNodeInfo(treeNode.id);
	  selNode = treeNode;
	  
		 
 }
 
 
  
  /**
   * 增加子节点
   * @param e
   */
  function addSubNodes(treeNode) {
	  var zTree = $.fn.zTree.getZTreeObj("myacccountTree");  
      var rootNode = "";
      zTree.addNodes(rootNode, treeNode);
      
  }
			
 
  
  /**
   * 查询我的账簿详细信息
   */
  function showNodeInfo(nodeId){
  	$.ajax({
  		url:"myacccount!queryMyAcccountById.action?id="+nodeId,
  		type:"post",
  		dataType:"json",
  		success:function(data,status){
     		var csqlDetail = data.glMyacccount.csqlDetail;
  			var detailList = csqlDetail.split("#");
  			
  			
  		    //开始月份
  			$("#startMonth").val(strNullProc(detailList[0]));
  			//结束月份
  			$("#endMonth").val(strNullProc(detailList[1]));
  			//开始科目
  			$("#startKm").val(strNullProc(detailList[2]));
  			//结束科目
  			$("#endKm").val(strNullProc(detailList[3]));
  			 //末级科目
  			if (detailList[4]=="1") {
  				$("#isMj").attr("checked",true); 	
  			}
  			else {
  				$("#isMj").attr("checked",false); 
  			}
  			
  			//开始级次
  			$("#startJc").val(strNullProc(detailList[5]));
  			//结束级次
  			$("#endJc").val(strNullProc(detailList[6]));
  			//开始余额
  			$("#startYe").val(strNullProc(detailList[7]));
  			//结束余额
  			$("#endYe").val(strNullProc(detailList[8]));
  			//科目类型
  			$("#kmType").val(strNullProc(detailList[9]));
  			//外币名称
  			$("#wbName").val(strNullProc(detailList[10]));
  			
  			
  			
  		  //本期无发生夫余额、累计有发生显示
  			if (detailList[11]=="1") {
  				$("#isWfs").attr("checked",true); 	
  			}
  			else {
  				$("#isWfs").attr("checked",false); 
  			}
  			//包含未记账凭证
  			if (detailList[12]=="1") {
  				$("#isWjz").attr("checked",true); 	
  			}
  			else {
  				$("#isWjz").attr("checked",false); 
  			}
  			
  			
  			
  			
  			
  		}
  		
  	});	
  }
  
  
  
  
  
  