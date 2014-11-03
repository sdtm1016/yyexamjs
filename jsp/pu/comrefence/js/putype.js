//程序入口
$(document).ready(function(){
	showRdStylesTree(null);
});
//根据入库类别查询采购类型
function queryRdStylesBy(rdStyle){
	var param="";
	if(rdStyle.pId==null){
		param={};
	}else{
		param="purchasetype.crdid="+rdStyle.rdStyleId;
	}
	$.ajax({
		url:"purchasetype!findPurchasetypeBy.action",
		type:"post",
		data:param,
		dataType:"json",
		async : false,   
		error: function () {
            jAlert('请求失败');
        }, 
		success:function(jsonData){
			var purchasetypeList = jsonData.purchasetypeList;
			var strHtml="";
			var len = purchasetypeList.length;
			for(var i=0;i<len;i++){
				strHtml+="<tr onclick='selectTr(this)' ondblclick='checkTr(this)' purchasetypeId='"+strNullProc(purchasetypeList[i].id)+"'>";
				strHtml+="	<td>"+strNullProc(purchasetypeList[i].cptcode)+"</td>";
				strHtml+="	<td>"+strNullProc(purchasetypeList[i].cptname)+"</td>";
				strHtml+="	<td>"+strNullProc(purchasetypeList[i].crdcode)+"</td>";
				var selectvalue = strNullProc(purchasetypeList[i].bdefault);
				var selecttext="";
				if(selectvalue==0){
					selecttext="是";
				}else{
					selecttext="否";
				}
				strHtml+="	<td>"+selecttext+"</td>";
				strHtml+="</tr>";
			}
			$("#include").empty().append(strHtml);
			if(len>0){
				selectTr($("#include >tr:first")[0]);	
			}
		}
	});
}
//查询入库类别树结构
function showRdStylesTree(rdStyleId){
	//ztree配置
	var setting = {
		view: {
			showIcon: false
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			onClick: ZtreeClick
		}
	};
	//ztree加载树节点
	$.ajax({
		url:"rdStyle!findRdStylesBy.action",
		type:"post",
		data:{brdflag:1},
		dataType:"json",
		async : false,   
		error: function () {
            jAlert('请求失败');
        }, 
		success:function(jsonData){
			var listRdStyle = jsonData.listRdStyle;
			var zNodes = [];
			var node = "";
			var nodeObj;
			for(var i=0;i<listRdStyle.length;i++){
				if(listRdStyle[i].brdend==0){
					node = "{" + "id:'" + listRdStyle[i].irdgrade + "'," + "pId:'root',"
					+ "rdStyleId:'" + listRdStyle[i].id + "',"
					+ "name:'"+ listRdStyle[i].crdname + "',open:true}";
				}else{
					node = "{" + "id:'" + listRdStyle[i].irdgrade + "'," + "pId:'1',"
					+ "rdStyleId:'" + listRdStyle[i].id + "',"
					+ "name:'" +listRdStyle[i].crdcode+" "+ listRdStyle[i].crdname + "',open:true}";
				}
				nodeObj =  eval('(' + node + ')') ;
	        	zNodes.push(nodeObj);
			}
			$.fn.zTree.init($("#rdStyle_tree"), setting, zNodes);
			//默认选中节点(根节点)
			var zTree = $.fn.zTree.getZTreeObj("rdStyle_tree");
			var selNode =null;
			if(rdStyleId==null){
				selNode = zTree.getNodes()[0];
			}else{
				selNode = zTree.getNodeByParam("rdStyleId", rdStyleId);	
			}
			zTree.selectNode(selNode);
			//显示详细信息
			queryRdStylesBy(selNode);
		}
	});
}
//点击节点查询此类别下的采购类型
function ZtreeClick(event, treeId, treeNode, clickFlag){
	queryRdStylesBy(treeNode);
}
//刷新功能
function refresh(){
	
}
//选中行
function selectTr(currentTr){
	$(currentTr).css("backgroundColor","#00f").css("color","#fff").siblings().css("backgroundColor","#fff").css("color","#000");
}
//选择当前行
function checkTr(currentTr){
	var selId = $(currentTr).attr("purchasetypeId");
	var selCode = $(currentTr).find("td:first").text();
	var selName= $(currentTr).find("td:eq(1)").text();
	
	var param = {};
	param.id=selId;
	param.ccode=selCode;
	param.cname=selName;
	//付返回值
	window.parent.deliverValue("pu_comrefence_putype",param);
	window.parent.closeWindow('pu_comrefence_putype');
}