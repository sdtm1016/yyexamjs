/**
 * 
 * @DESCRIBE   供应商分类参照列表js
 * @AUTHOR     王丙建
 * @DATE       2012-12-06
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
*	显示末级的供应商分类列表
*/
function queryAllLast(){	
	$("#include").html("");
	$.ajax({
		url:"inventoryClass!queryLastInventoryClass.action",
		type:"post",
		datatype:"json",
		success:function(data,status){
			var list=data.inventoryClassList;
			if(list.length>0){
		 		for(var j=0;j<list.length;j++){
					$("#include").append('<tr ondblclick="selected(this);" id ="'+list[j].id+'" name="'+list[j].cinvcname+'" bgcolor="#fcfcfc">'
							+'<td >'+list[j].cinvccode+'</td>'
							+'<td >'+list[j].cinvcname+'</td>'
							+'</tr>');
				}
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
	param.selId=selId;
	param.selCode=selCode;
	param.selName=selName;
	//付返回值
	//window.parent.getParentWindow('basic_grid_inventoryGridRef').setInventoryClass(param);
	window.parent.deliverValue("basic_grid_inventoryGridRef",param);
	window.parent.closeWindow('basic_grid_inventoryGridRef');
	

}
