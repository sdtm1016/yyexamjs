/**
 * 
 * @DESCRIBE   项目大类参照树：js逻辑控制
 * @AUTHOR     王丙建
 * @DATE       2012-12-27
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

 // 选中部门参照编码
 var selectCode = "";
 //选中参照名称
 var selectName ="";
 
 //选中节点
 var selNode ="";
 //父节点id
 var parentId="";

 /**
  * 初始化参照一级大类树
  */

 function loadFitemZtree() {
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
    
    var fitemClass=$("#itemBigClass").val();
    var crule=$("#crule").html();
	var treeNodes;   
	var zNodes = [];
	var param="fitemClass=" + fitemClass+"&crule="+crule;
	$.ajax({
		 async : false,   
	     cache:false,   
		url:"ztree!loadFitemTree.action",
		type:"post",
		data:param,
		dataType:"json",
		error: function () {//请求失败处理函数   
            jAlert('请求失败');   
        }, 
		success:function(data,status){
			if(data.listTree==null){return;}
			treeNodes = data.listTree;
            for (var i = 0; i<treeNodes.length; i++) {
            	var nodeObj =  eval('(' + treeNodes[i] + ')') ;
            	zNodes.push(nodeObj);
            	
            }
		}
	});	
	$("#gradecode").val("");
	$("#gradename").val("");
	$(document).ready(function(){
		$.fn.zTree.init($("#fitemTree"), setting, zNodes);
		zTree = $.fn.zTree.getZTreeObj("fitemTree");
		zTree.selectNode(zTree.getNodes()[0]);
		$("#iitemgrade").val("0");
		flag=1;
		
		/**
		 * 项目分类名称失去焦点事件blur
		 */
		$("#gradename").unbind("keyup").bind("keyup",function(){
			$("#okFitemGradeCode").attr("disabled",false);
			$("#delFitemGradeCode").attr("disabled",true);
		});
		$("#gradecode").unbind("keyup").bind("keyup",function(){
			$("#okFitemGradeCode").attr("disabled",false);
			$("#delFitemGradeCode").attr("disabled",true);
		});
		/**
		 * 项目分类名称获得焦点事件
		 */
		$("#gradename").unbind("focus").bind("focus",function(){
			var gradeName=$("#gradename").val();
			if(gradeName!=""){
				$("#delFitemGradeCode").attr("disabled",true);
				oldGradeCode=$("#gradecode").val();
				flag=2;
			}
		});
		/**
		 * 项目分类编码获得焦点事件 
		 */
		$("#gradecode").unbind("focus").bind("focus",function(){
			var gradeCode=$("#gradecode").val();
			if(gradeCode!=""){
				$("#delFitemGradeCode").attr("disabled",true);
				oldGradeCode=gradeCode;
				flag=2;
			}
		});
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
	  if (treeNode.pId==null) {
		  currentGrade = 0;
		  $("#iitemgrade").val(0);
		  $("#gradecode").val("");
		  $("#gradename").val("");
		  parentId=-1;
		//分类编码
			$("#gradecode").attr("disabled",true);
			//分类名称
			$("#gradename").attr("disabled",true);
			flag=2;
		  return ;
	  }else{
		  var grade=$("#iitemgrade").val();
		  $("#iitemgrade").val(grade+1);
			 showNodeInfo(treeNode);
			 $("#okFitemGradeCode").attr("disabled",true);
			 $("#delFitemGradeCode").attr("disabled",false);
		  selNode = treeNode;
		  parentId=selNode.id;
		//分类编码
			$("#gradecode").attr("disabled",true);
			//分类名称
			$("#gradename").attr("disabled",false);
			flag=2;
	  }
		
	  //增加下级节点
	 // addSubNodes(treeNode);
	
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
	  //增加下级节点
	  selNode = treeNode;
 }
 
 
  
  /**
   * 增加子节点
   * @param e
   */
  function addSubNodes(treeNode) {
	  var subNodes = null;
      var nodeId = treeNode.id;
      var fitemClass=$("#itemBigClass").val();
     $.ajax({
			async : false,   
		    cache:false,   
			url:"ztree!loadSubFitemTreeNodes.action?nodeId=" + nodeId + "&fitemClass=" + fitemClass,
			type:"post",
			dataType:"json",
			error: function () {//请求失败处理函数   
	            jAlert('请求失败');   
	        }, 
			success:function(data,status){
				subNodes = data.subListTree;
	            
			}
	  });
	  var zTree = $.fn.zTree.getZTreeObj("fitemTree");  
      var nodes = zTree.getSelectedNodes();
      //如果由子节点，先清除原来节点再增加新节点
      if (nodes.length > 0 ) {
    	  zTree.removeChildNodes(treeNode);  
      }
	  for (var i = 0; i<subNodes.length; i++) {
            var subNode =  eval('(' + subNodes[i] + ')') ;
            zTree.addNodes(treeNode, subNode);
            	
       }
  }
			
 
  
  /**
   * 查询项目分类详情
   */
  function showNodeInfo(treeNode){
	  var id=treeNode.id;
	  var index=id.indexOf("_");
	  var gradeName=treeNode.name;
	  var name=gradeName.substring(gradeName.indexOf(")")+1,gradeName.length);
	  var grade=id.substring(index+1,id.length);
	  $("#gradename").val(name);
	  $("#gradecode").val(id.substring(0,index));
	  $("#iitemgrade").val(grade);
	  
  }
  
  
  
  
  
  