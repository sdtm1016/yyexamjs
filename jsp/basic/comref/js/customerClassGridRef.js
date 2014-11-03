/**
 * 
 * @DESCRIBE   客户分类参照列表js
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


var parentParam = window.parent.valueMap.get("basic_comeGo_customerClassGridRef");

$(document).ready(function(){
	queryAllLast();
});



/**
*	显示末级的客户分类列表
*/
function queryAllLast(){	
	$("#include").html("");
	$.ajax({
		url:"customerClass!queryLastCustomerClass.action",
		type:"post",
		datatype:"json",
		success:function(data,status){
			var customerClassName=data.customerClassList;
			if(customerClassName.length>0){
		 		for(var j=0;j<customerClassName.length;j++){
					$("#include").append('<tr ondblclick="selected(this);" id ="'+customerClassName[j].id+'" name="'+customerClassName[j].cccname+'" bgcolor="#fcfcfc">'
							+'<td >'+customerClassName[j].ccccode+'</td>'
							+'<td >'+customerClassName[j].cccname+'</td>'
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
	//window.parent.getParentWindow('basic_grid_customerClassGridRef').setCustomer(param);
	window.parent.deliverValue("basic_grid_customerClassGridRef",param);
	window.parent.closeWindow('basic_grid_customerClassGridRef');
}
