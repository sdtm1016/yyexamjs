/**
 * 
 * @DESCRIBE   我的账簿明细表参照树：js逻辑控制
 * @AUTHOR     王丙建
 * @DATE       2013-01-22
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

 function loadMyacccountMXBtree() {
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
		url:"ztree!loadMyacccountTree.action?csqlType=ZMX",
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
	  inputcslName = treeNode.name;
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
	  inputcslName = treeNode.name;
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
  			
  		    //按科目范围查询
  			$("#rd_1").val(strNullProc(detailList[0]));
  			
  			//月份综合明细账
  			$("#ccode").val(strNullProc(detailList[1]));
  			//开始科目
  			$("#ccodestart").val(strNullProc(detailList[2]));
  			//结束科目
  			$("#ccodeend").val(strNullProc(detailList[3]));
  			//开始月份
  			$("#monthstart").val(strNullProc(detailList[4]));
  			//结束月份
  			$("#monthend").val(strNullProc(detailList[5]));
  			
  			//是否按对方科目展开  			
  			if (detailList[6]=="1") {
  				$("#cb_1").attr("checked",true); 	
  			}
  			else {
  				$("#cb_1").attr("checked",false); 
  			}
  		    //是否未记账凭证
  			if (detailList[7]=="1") {
  				$("#cb_2").attr("checked",true); 	
  			}
  			else {
  				$("#cb_2").attr("checked",false); 
  			}
  			//按科目排序
  			if (detailList[8]=="1") {
  				$("#cb_3").attr("checked",true); 	
  			}
  			else {
  				$("#cb_3").attr("checked",false); 
  			}

  			
  		}
  		
  	});	
  }
  
  
  
  
  
  