var result;
var mark=null;
var title_a="0";
var cassItem="";
var C_Input="";
function addass(){
	var mark=$("tr[islast='1']");
	if(mark.length==1){
		tds=mark.children();
		var mar="";
		var initial="accass.ccode="+$("#ass_code").val();
		tds.each(function (){
			if($(this).attr("md")=="0"){
				if($(this).attr("dbvalue")==""||$(this).attr("dbvalue")==null){
					jAlert("所有数据不可以为空");
					mar="1";
					return false;
				}else{
					initial=initial+"&"+$(this).attr("name")+"="+$(this).attr("dbvalue");
					if($(this).attr("name")=="accass.citemId"){
						initial=initial+"&accass.citemClass="+$(this).attr("citemClass");
					}
				}
			}else{
				if($(this).html()==""||$(this).html()==null){
					if($(this).attr("name")!="accass.vouchnum"){
						jAlert("所有数据不可以为空");
						mar="1";
						return false;
					}
				}else{
					if($(this).attr("name")=="accass.me"||$(this).attr("name")=="accass.meF"||$(this).attr("name")=="accass.neS"){
						initial=initial+"&"+$(this).attr("name")+"="+$(this).html().replaceAll(",","");
					}else{
						initial=initial+"&"+$(this).attr("name")+"="+$(this).html();
					}
				}
			}
		});
		if(mar=="1"){
			return;
		}
		$.ajax({
			url: "glInitial!savemidAss",
			type: 'post',
			cache:false,
		    async:false,
			data: initial,
			dataType: "json",
			success: function(data){
				result=data.resultList;
				if(result!=null){
					if(result[0]=="#"){
						jAlert("不可以添加重复数据");
						tds.each(function (index){
							if(index!=tds.length-2){
								$(this).html("");
							}
						});
						mar="1";
					}else{
						mark.attr("islast","0");
						mark.attr("mark","0");
						mark.attr("issave","1");
					}
				}
			},
			error:function(data){
				jAlert("期初辅助核算保存失败！","提示");
				mar="1";
				return;
			}
		});
		if(mar=="1"){
			return;
		}
	}
	var mtd=$("#mtd").clone();
	mtd[0].style.display="";
	mtd.attr("id","");
	mtd.attr("islast","1");
	mtd.attr("mark","1");
	$("#ass_sum").append(mtd);
	
	cellEdition();
}
		

function delAss(){
	var row=$(cstd).parent();
	row.attr("style","color:#fff");
	$(row).find("td").css({"background-color":"blue"});
	
	if(row.attr("issave")!="1"){
		row.remove();
		return;
	}
	
	
	jConfirm("确定要删除吗？","提示",function(f){
		if(f){
			var data="accass.ccode="+$("#ass_code").val();
			$(row).find("td").each(function(){
				var name=$(this).attr("name");
				var val=$(this).attr("dbvalue");
				if(typeof(val)=="undefined"){
					val=$(this).html();
				}
				if(name!=""&&name!=null&&typeof(name)!="undefined"){
					if(name=="accass.me"||name=="accass.meF"||name=="accass.neS"){
						data+="&"+name+"="+val.replaceAll(",","");
					}else{
						data+="&"+name+"="+val;	
					}
				}
			});
			$.ajax({
				url: "glInitial!deletemidAss",
				type: 'post',
				cache:false,
			    async:false,
				data: data,
				dataType: "json",
				success: function(data){
					result=data.resultList;
					if(result!=null){
						//alert("删除成功!");
							row.remove();
						}
					}
			 });
		}else{
			row.attr("style","color:#000");
			$(row).find("td").css({"background-color":"#fff"});
		}
	});
}

function exit(){
	//window.parent.closeWindow('gl_set_midoperat');
	onWindowClose();
}



/**
 * 关闭弹出框
 * @param id
 */
function onWindowClose(){
	var mark=$("tr[islast='1']");
	if(mark.length==1){
		tds=mark.children();
		var mar="";
		var initial="accass.ccode="+$("#ass_code").val();
		tds.each(function (){
			if($(this).attr("md")=="0"){
				if($(this).attr("dbvalue")==""||$(this).attr("dbvalue")==null){
					mar="1";
					return false;
				}else{
					initial=initial+"&"+$(this).attr("name")+"="+$(this).attr("dbvalue");
					if($(this).attr("name")=="accass.citemId"){
						initial=initial+"&accass.citemClass="+$(this).attr("citemClass");
					}
				}
			}else{
				if($(this).html()==""||$(this).html()==null){
					if($(this).attr("name")!="accass.vouchnum"){
						mar="1";
						return false;
					}
				}else{
					if($(this).attr("name")=="accass.me"||$(this).attr("name")=="accass.meF"||$(this).attr("name")=="accass.neS"){
						initial=initial+"&"+$(this).attr("name")+"="+$(this).html().replaceAll(",","");
					}else{
						initial=initial+"&"+$(this).attr("name")+"="+$(this).html();
					}
				}
			}
		});
		if(mar!="1"){
			$.ajax({
				url: "glInitial!savemidAss",
				type: 'post',
				cache:false,
			    async:false,
				data: initial,
				dataType: "json",
				success: function(data){
					result=data.resultList;
					if(result!=null){
						if(result[0]=="#"){
							jAlert("不可以添加重复数据");
							tds.each(function (index){
								if(index!=tds.length-2){
									$(this).html("");
								}
							});
							mar="1";
						}else{
							mark.attr("islast","0");
							mark.attr("mark","0");
						}
					}
				},
				error:function(data){
					jAlert("期初辅助核算保存失败！","提示");
					mar="1";
					return;
				}
			});
			if(mar!="1"){
				if(result!=null){
					window.parent.getParentWindow('gl_set_midoperat').setData(result);
				}
				window.parent.justCloseWindow('gl_set_midoperat');
				return true;
			}
		}else{
			jConfirm("有数据未填写完整，确定要退出吗？退出时本条数据将不做保存。","提示",function(f){
				if(f==true){
					if(result!=null){
						window.parent.getParentWindow('gl_set_midoperat').setData(result);
					}
					window.parent.justCloseWindow('gl_set_midoperat');
				}
			});
		}
	}else{
		if(result!=null){
			window.parent.getParentWindow('gl_set_midoperat').setData(result);
		}
		window.parent.justCloseWindow('gl_set_midoperat');
	}
	
	return false;
}
		
		

/**
 * 遇到数值的时候，转换成小数点后两位
 */
function transFloat(value){
	if(value!=null && value!=""){
		value=parseFloat(value).toFixed(2);
	} else if(value==null || value==""||value==undefined){
		value="";
	}
	return value;
}

/**
 * 选择当前所有操作的行，并获取此条数据的主ID
 */
var cstd=null;
var tdstyle=null;
function selectTd(td){
	if(cstd!=null){
		cstd.style.cssText=tdstyle;
	}
	tdstyle=td.style.cssText;
	td.style.border="1px dashed #ccc";
	cstd = td;
}





$(document).ready(function(){
	
	var param = window.parent.valueMap.get("gl_set_midoperat");
	
	var cell = param.cell;
	var mark = param.mark;
	var iscanupdate=param.iscanupdate;
	if(!iscanupdate){
		$("#delbutton").attr("disabled","disabled");
		$("#addbutton").attr("disabled","disabled");
	}

	//个人往来核算//客户往来核算//供应商往来//部门//项目核算
	var marks=mark.split(":");
	var ccode=$(cell).attr("ccode")+" "+$(cell).attr("name_china");
	var codeid=$(cell.parentNode).attr("tid");
	
	
	$.ajax({
		url:"code!queryCodeByCode?ccode="+$(cell).attr("ccode"),
		type:"post",
		dataType:"json",
		async : false,   
	    cache:false,   
		success:function(data){
			var code=data.code1;
			cassItem=code.cassItem;
		}
	});
	
	
	
	
	var th="<tr id='ths'>";
	var mtd="<tr id='mtd' style='display:none'>";
	var person="";
	var cust="";
	var csup="";
	var dept="";
	var project="";
	var j=0;
	if(marks[0]==1||marks[1]==1||marks[2]==1){
		title_a="1";
		th=th+"<td width='90px'>日期</td>";
		mtd=mtd+"<td md='1' onclick='selectTd(this)' class='mtd' name='accass.bdate'></td>";
		j=j+1;
	}
	if(marks[0]==1){
		th=th+"<td width='90px'>凭证号</td>";
		th=th+"<td width='90px'>个人</td>";
		mtd=mtd+"<td md='1' onclick='selectTd(this)' class='mtd' name='accass.vouchnum'></td>";
		mtd=mtd+"<td md='0' onclick='selectTd(this)' class='mtd' name='accass.cpersonId'></td>";
		person="1";
		j=j+1;
	}
	if(marks[1]==1){
		th=th+"<td width='90px'>凭证号</td>";
		th=th+"<td width='90px'>客户</td>";
		mtd=mtd+"<td md='1' onclick='selectTd(this)' class='mtd' name='accass.vouchnum'></td>";
		mtd=mtd+"<td md='0' onclick='selectTd(this)' class='mtd' name='accass.ccusId'></td>";
		cust="1";
		j=j+1;
	}
	if(marks[2]==1){
		th=th+"<td width='90px'>凭证号</td>";
		th=th+"<td width='90px'>供应商</td>";
		mtd=mtd+"<td md='1' onclick='selectTd(this)' class='mtd' name='accass.vouchnum'></td>";
		mtd=mtd+"<td md='0' onclick='selectTd(this)' class='mtd' name='accass.csupId'></td>";
		csup="1";
		j=j+1;
	}
	if(marks[3]==1){
		th=th+"<td width='90px'>部门</td>";
		mtd=mtd+"<td md='0' onclick='selectTd(this)' class='mtd' name='accass.cdeptId'></td>";
		dept="1";
		j=j+1;
	}
	if(marks[4]==1){
		th=th+"<td width='120px'>项目</td>";
		mtd=mtd+"<td md='0' onclick='selectTd(this)' class='mtd' name='accass.citemId'></td>";
		project="1";
		j=j+1;
	}
	if(marks[0]==1||marks[1]==1||marks[2]==1){
		th=th+"<td width='90px'>摘要</td>";
		mtd=mtd+"<td md='1' onclick='selectTd(this)' class='mtd' name='accass.digest'></td>";
		j=j+1;
	}
	th=th+"<td width='40px'>方向</td><td width='90px'>金额</td>";
	mtd=mtd+"<td md='1' onclick='selectTd(this)' name='accass.cbegindC' class='mtd' style='text-align:center'>"+$(cell).parent().children()[2].innerHTML+"</td><td md='1' name='accass.me' class='mtd' onclick='selectTd(this)' ondblclick='dodoubleclick(this)'></td>";
	var ntype=$(cell).attr("ntyp");
	if(ntype=="1"){
		th=th+"<td width='90px'>外币</td>";
		mtd=mtd+"<td md='1' name='accass.meF' class='mtd' onclick='selectTd(this)' ondblclick='dodoubleclick(this)'></td>";
	}else if(ntype=="2"){
		th=th+"<td width='90px'>数量</td>";
		mtd=mtd+"<td md='1' name='accass.neS' class='mtd' onclick='selectTd(this)' ondblclick='dodoubleclick(this)'></td>";
	}else if(ntype=="3"){
		mtd=mtd+"<td md='1' name='accass.meF' class='mtd' onclick='selectTd(this)' ondblclick='dodoubleclick(this)'></td>";
		mtd=mtd+"<td md='1' name='accass.neS' class='mtd' onclick='selectTd(this)' ondblclick='dodoubleclick(this)'></td>";
		th=th+"<td width='90px'>外币</td>";
		th=th+"<td width='90px'>数量</td>";
	}
	
	th=th+"</tr>";
	mtd=mtd+"</tr>";
	$("#ass_code").html("<option value='"+codeid+"'>"+ccode+"</option>");
	$("#ass_sum").html(th);
	$("#ass_sum").append(mtd);
	$.ajax({
		url: "glInitial!queryAccass",
		type: 'post',
		data: "codeid="+codeid,
		dataType: "json",
		success: function(data){
			var accasslist=data.glacclist;
			if(accasslist!=null){
			   for(var i=0;i<accasslist.length;i++){
				   var temp=accasslist[i];
				   var str="<tr issave='1' mark='0'>";
				   if(person!=""||cust!=""||csup!=""){
					   str=str+"<td onclick='selectTd(this)' class='mtd' name='accass.bdate'>"+temp.bdate+"</td>";
				   }
				   if(temp.vouchnum==null){
					   temp.vouchnum="";
				   }
				   if(person!=""){
					   str=str+"<td onclick='selectTd(this)' class='mtd' dbvalue='"+temp.vouchnum+"' name='accass.vouchnum'>"+temp.vouchnum+"</td>";
					   if(temp.cpersonname==null||temp.cpersonname==""){
						   str=str+"<td onclick='selectTd(this)' class='mtd' dbvalue='"+temp.cpersonId+"' name='accass.cpersonId'></td>";
					   }else{
						   str=str+"<td onclick='selectTd(this)' class='mtd' dbvalue='"+temp.cpersonId+"' name='accass.cpersonId'>"+temp.cpersonname+"</td>";
					   }
				   }
				   if(cust!=""){
					   str=str+"<td onclick='selectTd(this)' class='mtd' dbvalue='"+temp.vouchnum+"' name='accass.vouchnum'>"+temp.vouchnum+"</td>";
					   if(temp.ccusname==null||temp.ccusname==""){
						   str=str+"<td onclick='selectTd(this)' class='mtd' dbvalue='"+temp.ccusId+"' name='accass.ccusId'></td>";
					   }else{
						   str=str+"<td onclick='selectTd(this)' class='mtd' dbvalue='"+temp.ccusId+"' name='accass.ccusId'>"+temp.ccusname+"</td>";   
					   }
					   
				   }
				   if(csup!=""){
					   str=str+"<td onclick='selectTd(this)' class='mtd' dbvalue='"+temp.vouchnum+"' name='accass.vouchnum'>"+temp.vouchnum+"</td>";
					   if(temp.csupname==null||temp.csupname==""){
						   str=str+"<td onclick='selectTd(this)' class='mtd' dbvalue='"+temp.csupId+"' name='accass.csupId'></td>";   
					   }else{
						   str=str+"<td onclick='selectTd(this)' class='mtd' dbvalue='"+temp.csupId+"' name='accass.csupId'>"+temp.csupname+"</td>";
					   }
				   }
				   if(dept!=""){
					   if(temp.cdeptname==""||temp.cdeptname==null){
						   str=str+"<td onclick='selectTd(this)' class='mtd' dbvalue='"+temp.cdeptId+"' name='accass.cdeptId'></td>";
					   }else{
						   str=str+"<td onclick='selectTd(this)' class='mtd' dbvalue='"+temp.cdeptId+"' name='accass.cdeptId'>"+temp.cdeptname+"</td>";   
					   }
					   
				   }
				   if(project!=""){
					   if(temp.citemname==null||temp.citemname==""){
						   str=str+"<td onclick='selectTd(this)' class='mtd' dbvalue='"+temp.citemId+"' name='accass.citemId'></td>";
					   }else{
						   str=str+"<td onclick='selectTd(this)' class='mtd' dbvalue='"+temp.citemId+"' name='accass.citemId'>"+temp.citemname+"</td>";
					   }
					   
				   }
				   if(person!=""||cust!=""||csup!=""){
					   str=str+"<td onclick='selectTd(this)' class='mtd'  name='accass.digest'>"+temp.digest+"</td>";
				   }
				   str=str+"<td onclick='selectTd(this)' class='mtd' style='text-align:center'>"+temp.cbegindC+"</td>";
				   str=str+"<td onclick='selectTd(this)' class='mtd' name='accass.me'>"+donumswitch(transFloat(temp.me))+"</td>";
				   if(ntype=="1"){
					   str=str+"<td onclick='selectTd(this)' class='mtd' name='accass.meF'>"+donumswitch(transFloat(temp.meF))+"</td>";
					}else if(ntype=="2"){
						str=str+"<td onclick='selectTd(this)' class='mtd' name='accass.neS'>"+donumswitch(transFloat(temp.neS))+"</td>";
					}else if(ntype=="3"){
						str=str+"<td onclick='selectTd(this)' class='mtd' name='accass.meF'>"+donumswitch(transFloat(temp.meF))+"</td>";
						str=str+"<td onclick='selectTd(this)' class='mtd' name='accass.neS'>"+donumswitch(transFloat(temp.neS))+"</td>";
					}
				   str=str+"</tr>";
				   $("#ass_sum").append(str);
			   }
		   } 
		}
	});
	
	
});
		
		
































/************ 查询文本框相关代码 S *************/

var currentQueryButton = null;
var targetElement = null;


function queryBoxClick(queryBox){
	var queryButton = queryBox.parentNode.getElementsByTagName('input')[1];
	currentQueryButton = queryButton;
}




function queryButtonClick(btn){
	
	var cell = btn.parentNode.parentNode;
	var title = cell.parentNode.parentNode.rows[0].cells[cell.cellIndex].innerHTML;

	switch(title){
	case "部门":
		window.parent.openWindow('basic_comref_dptref','gl_set_midoperat');
		break;
	case "个人":
		window.parent.openWindow('basic_comref_personref','gl_set_midoperat');
		break;
	case "客户":
		window.parent.openWindow('basic_comref_cusref','gl_set_midoperat');
		break;
	case "供应商":
		window.parent.openWindow('basic_comref_supref','gl_set_midoperat');
		break;
	case "业务员":
		window.parent.openWindow('basic_comref_personref','gl_set_midoperat');
		break;
	case "项目":
		if(cassItem!=null){
			var itemParam = {};
			itemParam.cassItem = cassItem;
			window.parent.openWindow("basic_comref_fitemref","gl_set_midoperat",itemParam);
			//deliverValue("eee");
		}else{
			jAlert("此项目核算科目没有指定项目大类!");
		}
		break;

	case "日期":
	case "票据日期":
		WdatePicker({
		      el:"datefield",
		      position:{left:100,top:10}
		   });
		break;
	case "凭证号":	
		donumshow();
		break;
		
	}
	
	
}


function deliverValue(valueObject){
	
	var currentEditCellName = document.getElementById("ass_sum").rows[0].cells[currentEditCell.cellIndex].innerHTML;	
	switch(currentEditCellName){
	

		case "部门":
			//显示名称
			targetElement.value = valueObject.cname;
			//存储代码
			targetElement.parentNode.parentNode.setAttribute("dbvalue", valueObject.id);
		case "个人":
			//显示名称
			targetElement.value = valueObject.cname;
			//存储代码
			targetElement.parentNode.parentNode.setAttribute("dbvalue", valueObject.id);
			break;
		case "客户":
			//显示名称
			targetElement.value = valueObject.ccusabbname;
			//存储代码
			targetElement.parentNode.parentNode.setAttribute("dbvalue", valueObject.id);
			break;
		case "供应商":
			//显示名称
			targetElement.value = valueObject.cvenabbname;
			//存储代码
			targetElement.parentNode.parentNode.setAttribute("dbvalue", valueObject.id);
			break;
		case "业务员":
			//显示名称
			targetElement.value = valueObject.cname;
			//存储代码
			targetElement.parentNode.parentNode.setAttribute("dbvalue", valueObject.id);
			break;
			
		case "项目":
			//显示名称
			targetElement.value = valueObject.gradename;
			//存储代码
			targetElement.parentNode.parentNode.setAttribute("dbvalue", valueObject.citemId);
			targetElement.parentNode.parentNode.setAttribute("citemClass", valueObject.citemClass);
			break;

			
		
	 }

		
}
	 


/************ 查询文本框相关代码 E *************/






























/****************** 表格组件相关代码 S *******************/







// 选中行方法（如果不需要这些功能，直接将下面代码移出即可）
//当前被点击选中的行全局变量
var currentSeletedRow=null;
function rowSelection(){

var datatable_bodyer = document.getElementById("ass_sum");
for(var i=1;i<datatable_bodyer.rows.length;i++){

	datatable_bodyer.rows[i].onclick=function(event){
		
		var evt=(window.event || event);//获得事件
		var evtsrc = (evt.srcElement || evt.target);
		if(currentSeletedRow!=null && evtsrc.tagName=="TD"){
			currentSeletedRow.style.backgroundColor="#fff";
			currentSeletedRow.style.color="#000";
		}
		if(evtsrc.tagName=="TD"){
			evtsrc.parentNode.style.backgroundColor="#ddd";
			evtsrc.parentNode.style.color="#fff";
			currentSeletedRow=evtsrc.parentNode;
		}
	};
}


}	






// 单元格编辑控制方法
var currentEditRow = null;
var currentEditCell = null;

function cellEdition(){

	//仅最后一行可编辑
	var datatable_bodyer = document.getElementById("ass_sum");
	for(var i=1;i<datatable_bodyer.rows.length-1;i++){
		for(var j=0;j<datatable_bodyer.rows[i].cells.length;j++){
			datatable_bodyer.rows[i].cells[j].ondblclick=function(event){return false;};
		}
		
	}
	
	var lastRow = datatable_bodyer.rows[datatable_bodyer.rows.length-1];
	for(var j=0;j<lastRow.cells.length;j++){
		
		lastRow.cells[j].ondblclick=function(event){
			
			var evt=(window.event || event);//获得事件
			var cell = (evt.srcElement || evt.target);
			
			if(cell.tagName!="TD"){
				cell = cell.parentNode;
			}
			cellEditer(cell);
		};
		
	}




}




function cellEditer(cell){

	//避免重复双击，重复往TD里添加innerHTML内容产生混乱
	if(cell.getElementsByTagName("input").length==0){
		
		//如果有其他单元格正处于编辑状态，那么还需要将其他单元格取消编辑状态
		if(currentEditCell!=null){
			
			if(currentEditCell.getElementsByTagName("input").length>0){

				currentEditCell.innerHTML=currentEditCell.getElementsByTagName("input")[0].value;
			}

			if(currentEditCell.getElementsByTagName("select").length>0){

				currentEditCell.innerHTML=currentEditCell.getElementsByTagName("select")[0].value;
			}
			
			
			currentEditCell=null;
		}
		
		var title = document.getElementById("ass_sum").rows[0].cells[cell.cellIndex].innerHTML;
		
		var querybox_htmlstr = "<div><input type=\"text\" class=\"querybox\" style=\"width:100%;border:none;\" /><input type=\"button\" onclick=\"queryButtonClick(this);\" class=\"innerfinder\" style=\"display:block;margin-top:0px;\"/><div class=\"floatclear\"></div></div>";
		
		switch(title){

		case "部门":
			var temp = cell.innerHTML;
			cell.innerHTML = querybox_htmlstr;
			var textbox = cell.getElementsByTagName("input")[0];
			$(textbox).attr("onfocus","dofocustoenter('Department',this,'','','','')");
			textbox.value = temp;
			textbox.focus();
			targetElement = textbox;
			currentEditCell = cell;
			currentQueryButton=cell.getElementsByTagName("input")[1];
			break;
		case "个人":
			var temp = cell.innerHTML;
			cell.innerHTML = querybox_htmlstr;
			var textbox = cell.getElementsByTagName("input")[0];
			$(textbox).attr("onfocus","dofocustoenter('Person',this,'','','','')");
			textbox.value = temp;
			textbox.focus();
			targetElement = textbox;
			currentEditCell = cell;
			currentQueryButton=cell.getElementsByTagName("input")[1];
			break;
		case "客户":
			var temp = cell.innerHTML;
			cell.innerHTML = querybox_htmlstr;
			var textbox = cell.getElementsByTagName("input")[0];
			$(textbox).attr("onfocus","dofocustoenter('Customer',this,'','','','')");
			textbox.value = temp;
			textbox.focus();
			targetElement = textbox;
			currentEditCell = cell;
			currentQueryButton=cell.getElementsByTagName("input")[1];
			break;
		case "供应商":
			var temp = cell.innerHTML;
			cell.innerHTML = querybox_htmlstr;
			var textbox = cell.getElementsByTagName("input")[0];
			$(textbox).attr("onfocus","dofocustoenter('Vendor',this,'','','','')");
			textbox.value = temp;
			textbox.focus();
			targetElement = textbox;
			currentEditCell = cell;
			currentQueryButton=cell.getElementsByTagName("input")[1];
			break;
		case "业务员":
			var temp = cell.innerHTML;
			cell.innerHTML = querybox_htmlstr;
			var textbox = cell.getElementsByTagName("input")[0];
			$(textbox).attr("onfocus","dofocustoenter('Person',this,'','','','')");
			textbox.value = temp;
			textbox.focus();
			targetElement = textbox;
			currentEditCell = cell;
			currentQueryButton=cell.getElementsByTagName("input")[1];
			break;
		case "项目":
			querybox_htmlstr = "<div><input type=\"text\" readonly=\"readonly\" class=\"querybox\" style=\"width:100%;border:none;\" /><input type=\"button\" onclick=\"queryButtonClick(this);\" class=\"innerfinder\" style=\"display:block;margin-top:0px;\"/><div class=\"floatclear\"></div></div>";
			var temp = cell.innerHTML;
			cell.innerHTML = querybox_htmlstr;
			var textbox = cell.getElementsByTagName("input")[0];
			textbox.value = temp;
			textbox.focus();
			targetElement = textbox;
			currentEditCell = cell;			
			break;
			

		case "日期":
			
			//获得当前操作日期
			var operDate = getCookie("operDate");
			var da = operDate.split("-");
			
			var yer=da[0];
			var mth= da[1];
			mth=parseInt(mth,10);
			if(mth==1){
				mth=12;//如果操作日期是1月，那么上个月就是12月
				yer=yer-1;
			}else{
				mth=mth-1;
			}
			if(mth<10){
				mth="0"+mth;
			}
			var days = getDaysByYearAndMoth(yer,mth);
			
			var newDate=yer+"-"+mth+"-"+days;
			
			
			
			//往单元格TD里添加查询文本框
			var temp = cell.innerHTML;
			if(temp==""){
				temp=newDate;
			}
			
			cell.innerHTML = querybox_htmlstr;
			var textbox = cell.getElementsByTagName("input")[0];
			textbox.id = "datefield";
			textbox.value = temp;
			textbox.focus();
			targetElement = textbox;
			currentEditCell = cell;
			C_Input=cell;
			break;
		case "票据日期":
		case "凭证号":	
			//往单元格TD里添加查询文本框
			var temp = cell.innerHTML;
			cell.innerHTML = querybox_htmlstr;
			var textbox = cell.getElementsByTagName("input")[0];
			textbox.id = "datefield";
			textbox.value = temp;
			textbox.focus();
			targetElement = textbox;
			currentEditCell = cell;
			C_Input=cell;
			break;


		case "金额":
		case "外币":
		case "数量":	
			//往单元格TD里添加查询文本框
			var temp = cell.innerHTML.replaceAll(",","");
			var cellWidth = parseInt(cell.offsetWidth)-2;
			cell.innerHTML = "<input type=\"text\" onblur=\"this.parentNode.innerHTML=donumswitch(transFloat(this.value));\" style=\"width:"+cellWidth+"px;border:none;\"/>";
			var textbox = cell.getElementsByTagName("input")[0];
			textbox.value = temp;
			textbox.focus();
			currentEditCell = cell;
			break;
			
		case "票号":
		case "摘要":
			//往单元格TD里添加查询文本框
			var temp = cell.innerHTML;
			var cellWidth = parseInt(cell.offsetWidth)-2;
			cell.innerHTML = "<input type=\"text\" style=\"width:"+cellWidth+"px;border:none;\"/>";
			var textbox = cell.getElementsByTagName("input")[0];
			textbox.value = temp;
			textbox.focus();
			currentEditCell = cell;
			break;

		case "方向":
			if(title_a=="0"){
				break;
			}
			var temp = cell.innerHTML;
			var htmlstr = "<select onchange='this.parentNode.innerHTML=this.value;'><option value='借'>借</option><option value='贷'>贷</option></select>";
			cell.innerHTML = htmlstr;
			var slct = cell.getElementsByTagName("select")[0];
			slct.value = temp;
			currentEditCell = cell;
			break;
		}
		
		
	}
	
}



/****************** 表格组件相关代码 E *******************/






/******************** 组件公共document.onclick方法 S **********************/

document.onmouseup=function(e){
	
	var evt=(window.event || e);//获得事件
	var evtsrc = (evt.srcElement || evt.target);
	
	
	
	
	//如果当前有显示的查询按钮，则隐藏
	if(currentQueryButton != null && evtsrc.className != "querybox" && evtsrc.className != "innerfinder"){
		currentQueryButton.style.display = 'none';
		currentQueryButton = null;
	}
	
	
	
	
	//如果表格中存在正在编辑的单元格
	if(currentEditCell!=null){
		if(evtsrc != currentEditCell && evtsrc.parentNode != currentEditCell && evtsrc.parentNode.parentNode != currentEditCell){
			
			if(currentEditCell.getElementsByTagName("input").length>0){
				var title = document.getElementById("ass_sum").rows[0].cells[currentEditCell.cellIndex].innerHTML;
				if(title=="金额"||title=="外币"||title=="数量"){
					currentEditCell.innerHTML=donumswitch(transFloat(currentEditCell.getElementsByTagName("input")[0].value));
				}else{
					currentEditCell.innerHTML=currentEditCell.getElementsByTagName("input")[0].value;
				}
			}

			if(currentEditCell.getElementsByTagName("select").length>0){

				currentEditCell.innerHTML=currentEditCell.getElementsByTagName("select")[0].value;
			}
			
			currentEditCell=null;
			
		}

	}
	
	
};

/******************** 组件公共document.onclick方法 E **********************/


