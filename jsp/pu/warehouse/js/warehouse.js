/**
 * 
 * @DESCRIBE   仓库档案添加界面js
 * @AUTHOR     孙敬行
 * @DATE       2013-7-16
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


function selectWarehouse(){
	$.ajax({
		url : "warehouse!selectWarehouse.action",
		type : 'post',
		dataType : "json",
		async : false,
		success : function(data) {
			var warehosueList=data.warehosueList;
			var trs="";
			for(var i=0;i<warehosueList.length;i++){
				var ware=warehosueList[i];
				if(ware.bwhpos==1){
					ware.bwhpos="是";
				}else{
					ware.bwhpos="否";
				}
				
				trs=trs+"<tr class='tr1' tid='"+strNullProc(ware.id)+"'>" +
						"<td width='80'>"+strNullProc(ware.cwhcode)+"</td>"+
						"<td width='120'>"+strNullProc(ware.cwhname)+"</td>"+
						"<td width='120'>"+strNullProc(ware.cdepcode)+"</td>"+
						"<td width='200'>"+strNullProc(ware.cwhaddress)+"</td>"+
						"<td width='100'>"+strNullProc(ware.cwhphone)+"</td>"+
						"<td width='80'>"+strNullProc(ware.cwhperson)+"</td>"+
						"<td width='100'>"+strNullProc(ware.cwhvaluestyle)+"</td>"+
						"<td width='100'>"+strNullProc(ware.bwhpos)+"</td>"+
						"<td width='80'>"+strNullProc(ware.iwhfundquota)+"</td>"+
						"<td width='120'>"+strNullProc(ware.cwhmemo)+"</td>"+
				"</tr>";
			}
			$("#include").html(trs);
			rowSelection();
		}
	});
}



function deleteWarehouse(){
	if(currentSeletedRow==null){
		jAlert("请选择一行再进行此操作！");
		return;
	}
	var  tid= $(currentSeletedRow).attr("tid");//$("#tid").attr("value");
	warehousecwhname=$(currentSeletedRow).attr("cwhname");
	$("#cwhname").attr("value",$(this).attr("cwhname"));
	$(this).find("td:second").html();
	alert(warehousecwhname);
	//var  warehousecwhname= $(currentSeletedRow).attr("cwhname");//$("#tid").attr("value");
	var warehouse = "warehouse.id=" + tid;
	
	
	if (confirm("真的要删除仓库档案---"+warehousecwhname+"吗？")){
		$.ajax({
			url : "warehouse!Delete.action",
			type : 'post',
			dataType : "json",
			data : warehouse,
			async : false,
			success : function(data) {
				document.location.reload();
			}
		});
		
	}else{	
		return false;
	}
	
}

$(document).ready(function (){
	selectWarehouse();
});
function tableScroll(div){
	$("#tableheader").css("margin-left","-"+parseInt(div.scrollLeft,10));
};



//当前被点击选中的行全局变量
var currentSeletedRow=null;

function rowSelection(){

	var datatable_1 = document.getElementById("include");
	for(var i=0;i<datatable_1.rows.length;i++){

		datatable_1.rows[i].onclick=function(e){
			
			var evt=(window.event || e);//获得事件
			var evtsrc = (evt.srcElement || evt.target);
			if(currentSeletedRow!=null && evtsrc.tagName=="TD"){
				currentSeletedRow.style.backgroundColor="#fff";
				currentSeletedRow.style.color="#000";
			}
			if(evtsrc.tagName=="TD"){
				evtsrc.parentNode.style.backgroundColor="#00f";
				evtsrc.parentNode.style.color="#fff";
				currentSeletedRow=evtsrc.parentNode;
			}
		}
	}


}