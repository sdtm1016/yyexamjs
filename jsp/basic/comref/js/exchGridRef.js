/**
 * 
 * @DESCRIBE   币种参照列表js
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
*	币种列表
*/
function queryAllLast(){	
	
	$("#include").html("");
	$.ajax({
		url:"foreigncurrency!queryList.action",
		type:"post",
		datatype:"json",
		success:function(data,status){
			var foreigncurrencys=data.foreigncurrencys;
			for(var i=0;i<foreigncurrencys.length;i++){
				$("#include").append('<tr  ondblclick="selected(this);"  id="'+foreigncurrencys[i].id+'" name="'+foreigncurrencys[i].cexchCode+'" bgcolor="#ffffff">'
						+'<td  >'+strNullProc(foreigncurrencys[i].cexchCode)+'</td>'
						+'<td >'+strNullProc(foreigncurrencys[i].cexchName)+'</td>'
						+'<td >'+strNullProc(foreigncurrencys[i].bcal)+'</td>'
						+'<td >'+strNullProc(foreigncurrencys[i].idec)+'</td>'
						+'<td >'+strNullProc(foreigncurrencys[i].nerror)+'</td>'
						
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
	
	window.parent.deliverValue("basic_comref_exchref",param);

	window.parent.closeWindow('basic_comref_exchref');
	
	
	
}
