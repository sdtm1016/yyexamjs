/**
 * 
 * @DESCRIBE   人员部门参照树：js逻辑控制
 * @AUTHOR     王丙建
 * @DATE       2012-11-19
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
 var selNode ="";

 /**
  * 初始化部门参照一级大类树
  */
 function loadDeptPersonZtree() {
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
	var data="fitemClass="+fitemClass+"&crule="+crule;
	$.ajax({
		 async : false,   
	     cache:false,   
		url:"ztree!loadFitemGradeModeTree.action",
		type:"post",
		data:data,
		dataType:"json",
		error: function () {//请求失败处理函数   
            jAlert('请求失败');   
        }, 
		success:function(data,status){
			treeNodes = data.listTree;
            for (var i = 0; i<treeNodes.length; i++) {
            	var nodeObj =  eval('(' + treeNodes[i] + ')') ;
            	zNodes.push(nodeObj);
            	
            }
            var fitemGradeModes=data.fitemGradeModes;
            $("#datatable_bodyer").empty();
            var str="";
            for(var i=0;i<fitemGradeModes.length;i++){
            	 str+="<tr ondblclick='returnSelected(this)'>";
            	var f=fitemGradeModes[i];
            	var iitemgrade=f.iitemgrade;
            	var bitemend=f.bitemend;
            	var gradecodef=f.gradecode;
            	var gradename=f.gradename;
            	str+="<td>"+gradecodef+"</td>";
            	str+="<td>"+gradename+"</td>";
            	str+="<td>"+iitemgrade+"</td>";
            	if(bitemend==1){
            		str+="<td>否</td>";	
            	}else{
            		str+="<td>是</td>";
            	}
            	str+="</tr>";
            }
            $("#datatable_bodyer").html(str);
            document.getElementById("loadRecord").innerHTML = "已加载" + fitemGradeModes.length + "条记录";
		}
	});	
	$(document).ready(function(){
		$.fn.zTree.init($("#deptTree"), setting, zNodes);
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
	//调部门公共列表
	//  queryDeptInfo(treeNode.id);
	  jAlert("请选择列表上分类信息字段!");

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
 }
 
 /**
  * 查询部门详细信息
  * @param deptCode
  */
  function queryDeptInfo(nodeId) {
	  var pos = nodeId.indexOf("_");
	  var deptCode = nodeId.substr(0,pos);

	  $.ajax({
			url:"person!queryPersonByDeptcode.action?deptCode=" + deptCode ,		
			type:"post",
			datatype:"json",
			success:function(data,status){
				var personList = data.personList;
				initPersonGrid(personList);
			}
		});
  }
  
  /**
   * 初始化部门人员列表
   * @param departmentList
   */
  function initPersonGrid(personList) {
	  $("#datatable_bodyer").html("");
	  var length = personList.length;
	  for (var i = 0; i<length; i++) {
		  $("#datatable_bodyer").append('<tr id="'+personList[i].id  
					+'" deptcode="' + personList[i].cpersoncode
					+'" deptname="' + personList[i].cpersonname + '"    ondblclick="returnSelected(this);"  bgcolor="#ffffff">'
					+'<td >'+ strNullProc(personList[i].cpersoncode) + '</td>'
					+'<td >'+ strNullProc(personList[i].cpersonname) + '</td>'
					+'<td >'+ strNullProc(personList[i].cpersonhelp) + '</td>'
					+'<td >'+ strNullProc(personList[i].cdepcode.cdepcode) + '</td>'
					+'<td >'+ strNullProc(personList[i].cpersonprop) + '</td>'
					+'</tr>');
		  
		  
		  
	  }
	  document.getElementById("loadRecord").innerHTML = "已加载" + length + "条记录";
	 // document.getElementById("loadRecord").innerHTML = "已加载" + length + "条记录";
  }
