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
	$.ajax({
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
	});	
	$(document).ready(function(){
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
	  $.ajax({
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
	  });
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
			
 
