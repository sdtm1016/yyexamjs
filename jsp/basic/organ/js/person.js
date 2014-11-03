/**
 * author：陈雪峰
 * 载入页面即可查询所有职员并显示
 * 左边div树的点击，实现部门档案的单条查询
 * 职员档案的增加，添加完成后，点击“保存”，如果没有选择部门，则无法添加；
 * 部门档案的查找 添加职员时，需选择所在部门 
 * 职员档案的删除 在删除职员档案时需要判断此员工是否为部门的负责人，如果是某部门负责人，则无法删除
 * 职员档案的修改，修改完成后，点击“保存”录入成功
 */


var editId=null;
/**
 * 选择的部门id、编码、名称
 */
var selId = null;
var selCode = null;
var selName = null;
var flag=false;
//当前被编辑的行
var currentEditRow = null;

var windowParamTarget = null;

/**
 * 初始化查找
 */
$(document).ready(function(){
		queryAll();
});



/**
 * 显示所有职员列表
 */
function queryAll(){
	$("#include").html("");
	$.ajax({
	 	url:"person!queryPerson.action",
	 	type:"post",
	 	success:function(data,status){
	 		var queryPerson=data.personList;
	    	for(var i=0;i<queryPerson.length;i++){
	    		$("#include").append('<tr id ="'+queryPerson[i].id+'" name="'+queryPerson[i].cpersonname+'" bgcolor="#ffffff">'
	    				+'<td  onclick="selectTd(this)" ondblclick="doubleSelect(this);">'+strNullProc(queryPerson[i].cpersoncode)+'</td>'
	    				+'<td  onclick="selectTd(this)" ondblclick="doubleSelect(this);">'+strNullProc(queryPerson[i].cpersonname)+'</td>'
	    				+'<td  onclick="selectTd(this)" ondblclick="doubleSelect(this);">'+strNullProc(queryPerson[i].cpersonhelp)+'</td>'
	    				+'<td  style="display:none">'+strNullProc(queryPerson[i].cdepcode)+'</td>'
	    				+'<td  onclick="selectTd(this)" id="dept" ondblclick="doubleSelect(this);">'+strNullProc(queryPerson[i].cdepname)+'</td>'
	    				+'<td  onclick="selectTd(this)" ondblclick="doubleSelect(this);">'+strNullProc(queryPerson[i].cpersonprop)+'</td>'
	    				+'</tr >');	
	    	}
	 	},
	 	dataType:"json"
	 });
}

/**
 * 焦点离开事件
 * @param td
 */
function onTextblur(obj) {
	var inputpersonName = $("#cpersonname").val();
	var helpCode = getHelpCode(inputpersonName);
	$("#cpersonhelp").val(helpCode);
}


/**
 * 选择当前所有操作的行，并获取此条数据的主ID
 */
var cstd=null;
var tdstyle=null;
var personId=null;
var personName=null;
var personCode = null;
function selectTd(td){
	if(cstd!=null){
		cstd.style.cssText=tdstyle;
	}
	tdstyle=td.style.cssText;
	td.style.border="1px dashed #666";
	cstd = td;
	personId=td.parentNode.id;
	personName=td.parentNode.cells[1].innerHTML;
	personCode=td.parentNode.cells[0].innerHTML;
	if(td.parentNode.id=="addPerson"){
		flag=true;
	}
}
 
/**
 * 校验录入的职员信息是否符合要求
 */

function checkPerson() {
	if ($("#personcode").val()=="") {
		jAlert("职员编号不能为空，请输入！");
		return false;
	}
	if ($("#cpersonname").val()=="") {
		jAlert("职员名称不能为空，请输入！");
		return false;		
	}
	if ($("#cdepname").val()=="") {
		jAlert("所属部门不能为空，请输入！");
		return false;		
	}
	var pattern=/[\&\%\#\@\￥\’\“\<\>\｜\：\/\/\.]/g; 
	if (pattern.test($("#personcode").val())){ 
		jAlert( "职员编码存在非法字符"); 
		return false;
	}
	if (pattern.test($("#cpersonname").val())){ 
		jAlert( "职员名称存在非法字符"); 
		return false;
	}
	return true;
}
/**
 * 添加职员
 */
function add(){
	var person = $("#addPerson").children("td").children("input").serialize();
	
	if (!checkPerson()) return false;
	var depart =$("#cdepcodeId").serialize();
	if(depart=="person.cdepcode="){
		jAlert("所属部门不能为空，请输入！");
		return false;
	}
	
	 //判断编码是否唯一
	$.ajax({
		url: "person!isUniquenessPersonCode.action?personCode=" + $("#personcode").val(),
		type: 'post',
		data:depart,
		dataType: "json",
		async:false,
		success: function(data){	
			if(data.isuniqueness==false){
				jAlert("该职员编码已经被使用，请重新输入职员编码!");
				return false;
			}
			else {
				$.ajax({
				    url: "person!create.action",
				    type: 'post',
				    data: person,
				    dataType: "json",
				    async:false,
				    success: function(data){
				    	$("#addPerson").children("td").children("input").val("");
				    	queryAll();
				    }
				 });
			}
		}
	    
	  });
		
}



/**
 * 添加员工时，弹出和隐藏部门列表
 */
function findDeptToPerson(){
	
	
	if($("#department")[0].style.display=="none"){
		$("#department")[0].style.display="";
	}else{
		$("#department")[0].style.display="none";
	}
	
}	

/**
 * 添加职员时，双击选择部门
 */
function selectDeptToPerson(){
	var deptRows=$("#deptList").rows.length;
	for(var i=0;i<deptRows;i++){
		table.rows[i].ondblclick=departSelected;
	}
}

/**
 * 添加职员时，获得部门对象 将name放到input里
 */
function departSelected(row){
	var rowIndex = row.rowIndex;
	var deptId = row.parentNode.rows[rowIndex].id;
	var deptName= row.parentNode.rows[rowIndex].cells[1].innerHTML;
	$("#cdepcodeId").val(deptId);
	$("#cdepcodeName").val(deptName);
	$("#department")[0].style.display="none";
}

/**
 * 删除职员
 */
function del(){
	var id = personId;
	if(personId=="addPerson"){return;}
	jConfirm("真的要删除职员档案---"+personName+"吗？", "确认对话框", function(confirmflag){
		if(confirmflag){
			//js判断
			var sourceValue = 	id;
			var sourceTable = 	"PERSON";
			var sourceField = 	"ID";
			var isExits = isExitsTableRef(sourceValue, sourceTable, sourceField);
			if (isExits==true) {
				jAlert("该职员档案已经在其他数据表中使用，不能修改或删除！");
			    return false;			
			}
			else if (isExits==false) {
				$.ajax({
						url: "person!delete.action?person.id="+id,
						type: 'post',
						dataType: "json",
						async:false,
						success: function(data){
							if(data.isdelete==true){
							}else{
								jAlert("该职员档案已经在其他数据表中使用，不能修改或删除！");
								return false;
							}
							queryAll();		
						}
		
					  });
			}
		}else{
			return false;
		}
	});
}

var currentEditCell=null;
var changedRowsIds = [];

/**
 * 双击当前td进行修改职员档案
 */
function doubleSelect(cell){
	var inputCount = cell.getElementsByTagName("input").length;
	editId =cell.parentNode.id;
	if(inputCount==0){
		var tempValue = cell.innerHTML;
		if(cell.id=='dept'){
			cell.innerHTML="<input  type='text'  style='width:90px;' value='"+tempValue+"' onfocus=\"dofocustoenter('Department',this,'','','','')\" /><input type='button' class='finder' style='width:15px;height:15px;' onclick='javascript:windowParamTarget=this;window.parent.openWindow(\"basic_grid_departmentGridRef\",\"person\");'/> ";
			currentEditCell = cell;
		}else{
			cell.innerHTML="<input onblur='a(this)' type='text' style='width:100%;' value='"+tempValue+"'/> ";	
		}
		cell.getElementsByTagName("input")[0].focus();
		cell.getElementsByTagName("input")[0].select();
	}
	currentEditRow = cell.parentNode;
}

document.onmousedown = function(event){

	var evt = event || window.event;
	var element = (evt.srcElement || evt.target);
	
	
	if(currentEditCell!=null){
		
		var textbox = currentEditCell.getElementsByTagName("input")[0];
		if(textbox.parentNode != element.parentNode && element.type != "button"){
			textbox.parentNode.innerHTML = textbox.value;
			var row=currentEditRow;
			var person="";
			person ="person.cpersoncode="+row.cells[0].innerHTML
			+"&person.cpersonname="+row.cells[1].innerHTML
			+"&person.cpersonhelp="+row.cells[2].innerHTML
			+"&person.cdepcode="+row.cells[3].innerHTML
			+"&person.cdepname="+row.cells[4].innerHTML
			+"&person.cpersonprop="+row.cells[5].innerHTML;
			$.ajax({
			    url: "person!update.action?person.id="+currentEditRow.id,
			    type: 'post',
			    data: person,
			    dataType: "json",
			    success: function(data){
			    	queryAll();	
			    }
			  });
			currentEditCell=null;
		}
	}
}



/**
 * 失去焦点后返回所修改的值
 */
function a(input){
	var row = input.parentNode.parentNode;
	input.parentNode.innerHTML = input.value;
	
	
	//记录编辑过的行，用于批量修改遍历
	var rowId = row.id;
	var exists = false;
	for(var i=0;i<changedRowsIds.length;i++){
		if(changedRowsIds[i]==rowId){
			exists = true;
			break;
		}
	}
	if(exists==false){
    	changedRowsIds[changedRowsIds.length]=rowId;
	}
	var person="";
	for(var i=0;i<changedRowsIds.length;i++){
		var row = document.getElementById(changedRowsIds[i]);
		person ="person.cpersoncode="+row.cells[0].innerHTML
		+"&person.cpersonname="+row.cells[1].innerHTML
		+"&person.cpersonhelp="+row.cells[2].innerHTML
		+"&person.cdepcode="+row.cells[3].innerHTML
		+"&person.cdepname="+row.cells[4].innerHTML
		+"&person.cpersonprop="+row.cells[5].innerHTML;
	}
	$.ajax({
	    url: "person!update.action?person.id="+rowId,
	    type: 'post',
	    data: person,
	    dataType: "json",
	    success: function(data){
	    	queryAll();	
	    }
	  });
}





//接收弹出窗体返回值函数
function deliverValue(valueObject){
    //selId = valueObject.selId;
    selCode = valueObject.ccode;
    selName = valueObject.cname;
    if(currentEditCell!=null){
    	currentEditCell.getElementsByTagName("input")[0].value=selName;
    	currentEditCell.parentNode.cells[currentEditCell.cellIndex-1].innerHTML=selCode;
    	var rowId = currentEditCell.parentNode.id;
    	var exists = false;
    	for(var i=0;i<changedRowsIds.length;i++){
    		if(changedRowsIds[i]==rowId){
    			exists = true;
    			break;
    		}
    	}
    	if(exists==false){
        	changedRowsIds[changedRowsIds.length]=rowId;
    	}
    }
    else{
    	//最后一行编辑行的情况
    	$("#cdepcode").val(selCode);
    	$("#cdepname").val(selName);
    }
}





function save() {
	var person = $("#addPerson").children("td").children("input").serialize();
	if (!checkPerson()) return false;
	var depart =$("#cdepcodeId").serialize();
	if(depart=="person.cdepcode.id="){
		jAlert("所属部门不能为空，请输入！");
		return false;
	}
	else {
	 //判断编码是否唯一
	$.ajax({
		url: "person!isUniquenessPersonCode.action?personCode=" + $("#personcode").val(),
		type: 'post',
		data:depart,
		dataType: "json",
		success: function(data){	
			if(data.isuniqueness==false){
				jAlert("该职员编码已经被使用，请重新输入职员编码!");
				return false;
			}
			else {
				$.ajax({
				    url: "person!create.action",
				    type: 'post',
				    data: person,
				    dataType: "json",
				    success: function(data){
				    	return true;
				    }
				 });
				return true;
			}
		}
	    
	  });
	  return true;
	}
}
/**
 * 退出
 */
function exit() {
	var count=0;
	$("#addPerson td").each(function(){
		var val=$(this).find("input:eq(0)").val();
		if(val!="")count++;
	
	});
	if(flag&&count>0){
		jConfirm("是否保存对当前记录的修改？", "确认对话框", function(confirmflag){
			if(confirmflag){
				var exitBz = save();
				if (exitBz==true){
					window.parent.closeWindow('person');
				}
				else {
					return false;
				}
			}else {
				window.parent.closeWindow('person');		
			}
		});

	}else{
		window.parent.closeWindow('person');
	}
	
	
}
