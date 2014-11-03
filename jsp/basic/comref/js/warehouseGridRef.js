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
		url:"warehouse!selectWarehouse.action",
		type:"post",
		datatype:"json",
		success:function(data,status){
			var warehosueList=data.warehosueList;
			for(var i=0;i<warehosueList.length;i++){
				$("#include").append('<tr  ondblclick="selected(this);"  id="'+warehosueList[i].id+'" name="'+warehosueList[i].cwhname+'" bgcolor="#ffffff">'
						+'<td  >'+strNullProc(warehosueList[i].cwhcode)+'</td>'
						+'<td >'+strNullProc(warehosueList[i].cwhname)+'</td>'
						+'<td >'+strNullProc(warehosueList[i].cwhvaluestyle)+'</td>'
						+'<td >'+strNullProc(warehosueList[i].cdepcode)+'</td>'
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
	param.id=selId;
	param.ccode=selCode;
	param.cname=selName;
	

	window.parent.deliverValue("basic_comref_warehouseGridRef",param);
	window.parent.closeWindow('basic_comref_warehouseGridRef');

	
}
