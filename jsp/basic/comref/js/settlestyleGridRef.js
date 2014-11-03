/**
 * 
 * @DESCRIBE   结算方式参照列表js
 * @AUTHOR     王丙建
 * @DATE       2013-03-05
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


/**
 * 初始化查找
 */
$(document).ready(function(){
	queryAllLast();
});



/**
*	显示结算方式列表
*/
function queryAllLast(){	
	
	$("#include").html("");
	$.ajax({
		url:"settleStyle!queryLastSettleStyle.action",
		type:"post",
		datatype:"json",
		success:function(data,status){
			var settleStyleList=data.settleStyleList;
			for(var i=0;i<settleStyleList.length;i++){
				$("#include").append('<tr  ondblclick="selected(this);"  id="'+settleStyleList[i].id+'" name="'+settleStyleList[i].cssname+'" bgcolor="#ffffff">'
						+'<td  >'+strNullProc(settleStyleList[i].csscode)+'</td>'
						+'<td >'+strNullProc(settleStyleList[i].cssname)+'</td>'
						+'<td >'+strNullProc(settleStyleList[i].issgrade)+'</td>'
						+'<td >'+showChnLogicValue(settleStyleList[i].bssend)+'</td>'
						+'</tr>');
			}
		}
		
	});
	
	
	
	
}


/**
 * 得到选择行的id、编码、名称
 */
function selected(row){
	var selId = row.id;
	var selCode = row.cells[0].innerHTML;
	var selName= row.cells[1].innerHTML;
	
	var param = {};
	param.cId=selId;
	param.ccode=selCode;
	param.cname=selName;
	

	window.parent.deliverValue("basic_comref_settlestyleGridRef",param);
	window.parent.closeWindow('basic_comref_settlestyleGridRef');

	
}
