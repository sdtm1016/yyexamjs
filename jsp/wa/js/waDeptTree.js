function loadWaDeptTree(){
	 $("#dpt_tree").html("");
	/*** 树构建代码 开始 ***/
	var setting = {	
			check: {
				enable: true,
				chkStyle: "checkbox"
			},
			view:{
				showIcon: true
			},
			data: {
				simpleData: {
					enable: true
				}
			}
	};
	var cgzgradename = $("#cgzgradename").val();
	var treeNodes;   
	var zNodes = [];
	$.ajax({
		async : false,   
	    cache:false,   
		url:"ztree!loadWaDeptTree.action",
		type:"post",
		data:"cgzgradename=" + cgzgradename,
		dataType:"json",
		error: function () {//请求失败处理函数   
            jAlert('请求失败');   
        }, 
		success:function(data,status){
			treeNodes = data.listTree;
			//add by lval  提示 基础设置中添加部门
			if(treeNodes.length==0){
				jAlert("在基础设置中添加部门。");
				return;
			}
            for (var i = 0; i<treeNodes.length; i++) {
            	var nodeObj =  eval('(' + treeNodes[i] + ')') ;
            	zNodes.push(nodeObj);
            	
            }
		}
	});	

	$.fn.zTree.init($("#dpt_tree"), setting, zNodes);
	/*** 树构建代码 结束 ***/
}
