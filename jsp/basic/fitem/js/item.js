/**
 * 
 * @DESCRIBE   项目大类：js逻辑控制
 * @AUTHOR     王丙建
 * @DATE       2012-12-26
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


//当前页面项目大类
var curFitem = null;
//项目分类编码规则的长度
var cruleLen=0;
//自定义项目目录预存储数据
var fitemssData=null; 
var codeRule=0;//分类编码规则



/**
 * 页面初始化
 */
$(document).ready(function(){

	pageloadedinit();
	queryFitem();
	//分类编码
	$("#gradecode").attr("disabled",true);
	//分类名称
	$("#gradename").attr("disabled",true);
	/**
	 * 核算科目
	 */
	$("#bitemOk").unbind("click").bind("click",function(){
		var codes="";
		var bitemCodes="";
		var fitemClass=$("#itemBigClass").val();
		$("#selectedCode option").each(function(){
			codes+=this.value+"_";
		});
		bitemCodes=codes.substring(0, codes.length-1);
		if(fitemClass==""||fitemClass==null){
			jAlert("没有定义项目大类,不能指定核算科目!");
			return;
		}
		$.ajax({
			url:"fitem!setItem.action?fitemClass=" + fitemClass+"&bitemCodes="+bitemCodes,		
			type:"post",
			datatype:"json",
			success:function(data,status){
				var fitemClass=$("#itemBigClass").val();
				initCodes(fitemClass);
				jAlert("保存成功！");
			}
		});
	});	
	/**
	 * 删除项目大类
	 */
	$("#delFitem").unbind("click").bind("click",function(){
		var fitemClass=$("#itemBigClass").val();
		if(fitemClass==null){jAlert("请选择要删除的项目大类!");return;}
		var codes=$("#selectedCode").html();
		var fitemss=fitemssData;
		if(codes!=""||fitemss!=""){
			jAlert("此项目大类已定义项目目录或核算科目,必须先删除此项目大类下的所有项目,或取消核算科目,再删除此项目大类");
			return;
		}else{
			jConfirm("是否取消本次操作？", "确认对话框", function(confirmflag){
				if(confirmflag){
					//删除
					$.ajax({
						url:"fitem!deleteFitem.action?fitemClass=" + fitemClass,		
						type:"post",
						datatype:"json",
						success:function(data,status){
							  queryFitem();
							  var fitemClass=$("#itemBigClass").val();
							  //alert(fitemClass);
							  if(fitemClass!=null&&fitemClass!=""){
								  initCodes(fitemClass);
								  queryFitemStructure(fitemClass);
								  setCrule(curFitem);
								  loadFitemZtree();
								  queryFitemss(fitemClass);
							  }else{
								  clear();
							  }
							  
							  
						}
					});
				}
			});
		}
		
	});

});

//没有项目大类时清空相关界面数据  add by lval  20131104
function clear(){
	$("#waitSelectCode").empty();
	$("#selectedCode").empty();
	$("#itemStructureTableRows").html("");
	$("#crule").html("");
	$("#fitemTree").html("");
	$("#fitemss thead").empty();
	$("#fitemss thead").html("");
	$("#fitemss tbody").empty();
}


/**
 * 查询项目大类
 */
function queryFitem() {
	$.ajaxSetup({ // 使用同步
		async : false
	});
	$.ajax({
		url:"fitem!queryList.action",		
		type:"post",
		datatype:"json",
		success:function(data,status){
			var fitemList = data.fitems;
			if(fitemList.length>0){
				curFitem = data.fitems;
				initFitem(fitemList);
			}
			if(fitemList.length==0){
				$("#itemBigClass").empty();
				var fitemClass=$("#itemBigClass").val();
				initCodes(fitemClass);
			}
		}
	});
	$.ajaxSetup({ // 恢复
		async : true
	});
	
}


/**
 * 初始化项目大类
 * @param gridList
 */
function initFitem(fitemList) {
	var length = fitemList.length;
	$("#itemBigClass").empty();
	signList = new Array(length);
	if(length>0){
		for (var i = 0; i<length; i++) {
			var fitem = fitemList[i];
			$("#itemBigClass").append("<option value='"+fitem.citemClass+"'>"+fitem.citemName+"</option>");
		//	$("#itemBigClass")[0].options.add(new Option(fitem.citemName,fitem.citemClass,false,false));
		}
	}
	var fitemClass=$("#itemBigClass").val();
	initCodes(fitemClass);
	if(fitemClass!=null||fitemClass!=""){
		queryFitemss(fitemClass);
		setCrule(curFitem);	
		loadFitemZtree();
	}
}
/**
 * 初始化核算科目
 * @param codes 核算科目
 * citemClass 项目大类编码
 */
function initCodes(citemClass){
	$.ajax({
		url:"fitem!queryCodes.action",		
		type:"post",
		datatype:"json",
		success:function(data,status){
			var codes=data.codes;
			$("#waitSelectCode").empty();
			$("#selectedCode").empty();
			for(var i=0;i<codes.length;i++){
				var ccode=codes[i].ccode;
				var name=codes[i].ccodeName;
				var cassItem=codes[i].cassItem;//项目大类编码
				var bitem=codes[i].bitem;
					if(cassItem==null&&bitem==1){
						$("#waitSelectCode").append("<option value='"+ccode+"'>"+name+"</option>");
					}else{
						if(citemClass==null||citemClass==""){
							continue;
						}else{
							if(cassItem==citemClass){
								$("#selectedCode").append("<option value='"+ccode+"'>"+name+"</option>");
							}
						}
					}
			}
		}
	});
}
/**
 * 获得项目编码规则、以及长度
 */
function setCrule(curFitem){
	 var index = $('#itemBigClass').get(0).selectedIndex;
	  //得到选择下拉框的索引值
	  var crule=curFitem[index].crule;
	  codeRule=crule;
	  var rule="";
	  var num1=0;
	  for(var i=0;i<crule.length;i++){
		  rule+=crule.substring(i,i+1)+"-";
		  var num=parseInt(crule.substring(i,i+1));
		  num1+=num;
	  }
	  cruleLen=num1;
	  var value=rule.substring(0, rule.length-1);
	  $("#crule").html(value);
}
/**
 * 项目大类改变事件
 * @param obj
 */
function changeItemBigClass(obj) {
  var fitemClass=$("#itemBigClass").val();
  if(fitemClass!=null){
	  initCodes(fitemClass);
	  queryFitemStructure(fitemClass);
	  setCrule(curFitem);
	  loadFitemZtree();
	  queryFitemss(fitemClass);
  }
}
/**
 * 更新项目结构属性值
 * @param curIremClass 项目大类
 * @param curFieldName 项目档案名称
 * @param updateField  更新字段
 * @param updateValue  更新字段值
 */
function updateStruValue(curIremClass,curFieldName,updateField,updateValue) {
	$.ajax({
		url:"fitem!updateFitemStructure.action?fitemClass=" + curIremClass  
		     +"&cfieldName=" + curFieldName + "&updateField=" +updateField + "&updateValue=" + updateValue,		
		type:"post",
		datatype:"json",
		success:function(data,status){
		}
	});
}
/**
 * 查询自定义项目目录数据
 * @param fitemClass
 */
function queryFitemss(fitemClass){
	$.ajax({
		url:"fitem!findFitemss.action?fitemClass=" + fitemClass,		
		type:"post",
		datatype:"json",
		async:false,
		success:function(data,status){
			var fitemstructureList = data.fitemstructures2;
			var fitemss=data.fitemss;
			fitemssData=null;
			fitemssData=fitemss;
			var str="<tr  >";
			for(var i=0;i<fitemstructureList.length;i++){
				var f=fitemstructureList[i];
				//var citemSqr=f.citemSqr;//字段顺序号
				//var cfieldName=f.cfieldName;//字段名称 数据对应 column
				var ctext=f.ctext; //显示文本
				var blist=f.blist;//是否显示1显示，0否
				if(blist==1){
					str+="<td width=100>"+ctext+"</td>";
				}
			}
			str+="</tr>";
			$("#fitemss thead").empty();
			$("#fitemss thead").html(str);
			$("#fitemss tbody").empty();
			var str1="";
			for(var j=0;j<fitemss.length;j++){
				var itemss=fitemss[j];
				 str1+="<tr bgcolor='#ffffff'>";
				for(var i=0;i<fitemstructureList.length;i++){
					var f=fitemstructureList[i];
					var citemSqr=f.citemSqr;//字段顺序号
					var cfieldName=f.cfieldName;//字段名称 数据对应 column
					var blist=f.blist;//是否显示1显示，0否
					if(blist==1){
						if(citemSqr==3){
							if(itemss[cfieldName]==1){
								str1+="<td style='color:red;'>Y</td>";
							}else{
								str1+="<td ></td>";
							}
						}else{
							var val=itemss[cfieldName];
							if(val==null||val==""){
								str1+="<td ></td>";	
							}else{
								str1+="<td >"+val+"</td>";
							}
						}
					}
				}
				str1+="</tr>";
				
			}
			$("#fitemss tbody").html(str1);

		}
	});
}
/**
 * 查询项目结构
 */
function queryFitemStructure(fitemClass) {
	$.ajax({
		url:"fitem!queryFitemStructure.action?fitemClass=" + fitemClass,		
		type:"post",
		datatype:"json",
		async:false,
		success:function(data,status){
			var fitemstructureList = data.fitemstructures;
			initFitemStructure(fitemstructureList);
		}
	});
}

/**
 * 初始化项目结构
 * @param fitemstructureList 项目结构list
 */
function initFitemStructure(fitemstructureList) {
	var length = fitemstructureList.length;
	$("#itemStructureTableRows").html("");
	for (var i = 0 ;i<length; i++) {
		var fitemstructure = fitemstructureList[i];
		var cells = fitemStruToArray(fitemstructure, 6);
		var key = {ciremClass:fitemstructure.citemClass,cfieldName:fitemstructure.cfieldName};
		initRow(cells, key);
	}
	addClickToTable();
}



var flag=0;//项目分类添加修改标志
var oldGradeCode=null;
/**
 * 增加项目分类
 */
function addfitem() {
	$("#gradecode").val("");
	$("#gradename").val("");
	$("#gradecode").attr("disabled",false);
	$("#gradename").attr("disabled",false);
	/*删除 确定按钮不可用 */
	$("#okFitemGradeCode").attr("disabled",true);
	$("#delFitemGradeCode").attr("disabled",true);
	$("#gradecode").unbind("focus");
	$("#gradename").unbind("focus");
	flag=1;
	$("#gradecode").focus();
} 

/**
 * 删除项目分类
 */
function delFitemGradeCode(){
	var gradeCode=$("#gradecode").val();
	var fitemClass=$("#itemBigClass").val();
	jConfirm("是否取消本次操作？", "确认对话框", function(confirmflag){
		if(confirmflag){
			
			var sourceValue = gradeCode;
			var sourceTable = "FITEMSSCLASS";
			var sourceField = "GRADECODE";
			var isExits = isExitsTableRef(sourceValue, sourceTable, sourceField);
			if (isExits == true) {
				jAlert("该项目分类已经被使用，不能删除!");
				return;
			}
			$.ajax({
				url:"fitem!deleteFitemGradeMode.action?fitemClass="+fitemClass+"&gradeCode="+gradeCode,		
				type:"post",
				datatype:"json",
				success:function(data,status){
					loadFitemZtree();
					$("#okFitemGradeCode").attr("disabled",true);
				}
			});
		}
	});
}
/**
 * 保存项目分类
 */
function savefitem() {
	//项目大类名称
	var fitemClass=$("#itemBigClass").val();
	 
	//分类编码
	var citemCode = $("#gradecode").val();
	//分类名称
	var citemName = $("#gradename").val();
	//分类级次
	var iitemgrade =  $("#iitemgrade").val();
	//是否末级
	var bitemend = 0;
	
	if(flag==1){//添加
		if(citemCode==""||citemCode==null){
			jAlert("请输入编码!");
			return;
		}
		if(citemName==""||citemName==null){
			jAlert("请输入名称!");
			return;
		}
		var id=selNode.id;
		if(selNode.pId!=null&&iitemgrade!=1&&iitemgrade!=0){
			var index=id.indexOf("_");
			var code=id.substring(0,index);
			var grade=id.substring(index+1,id.length);	
			if(citemCode.substring(0,grade)!=code){
				jAlert("分类编码不正确，请重新输入!","提示信息",function(){
					$("#gradecode").focus();
				});
				return;
			}
		}
		
		
		for(var i=0;i<codeRule.length;i++){
			var s=codeRule.substring(i,i+1);
			var first=codeRule.substring(0,1);
			if(iitemgrade==0){
				break;
			}else{


				if(iitemgrade==1&&citemCode.length==first){
					iitemgrade=0;
					break;
				}
				if(iitemgrade==i){
					var num=parseInt(s);
						if(citemCode.length==num||citemCode.length<num){
							jAlert("分类编码与设定不符合,请重输!","提示信息",function(){
								$("#gradecode").focus();
							});
							return;
						}	
					break;
				}	
				
			}
			
		}
		if(citemCode.length>cruleLen){
			jAlert("分类编码长度过长,请重输!","提示信息",function(){
				$("#gradecode").focus();
			});
			return;
		}
		var fitemGradeMode = "fitemGradeMode.citemcode=" + fitemClass  
       	+ "&fitemGradeMode.gradecode=" +citemCode 
		+ "&fitemGradeMode.gradename=" +citemName 
		+ "&fitemGradeMode.iitemgrade=" +iitemgrade
		+ "&fitemGradeMode.bitemend="+bitemend 
		+"&parentId="+parentId;
		$("#okFitemGradeCode").attr("disabled",true);
		$.ajax({
			url:"fitem!isExistFitemGtadeMode.action?fitemClass="+fitemClass+"&gradeCode="+citemCode,		
			type:"post",
			datatype:"json",
			async:false,
			success:function(data,status){
				if(data.flag){
					jAlert("此项目分类已存在,请重输!");
					return;
				}else{
					$.ajax({
						url:"fitem!CreateFitemDir.action",		
						type:"post",
						data:fitemGradeMode,
						datatype:"json",
						success:function(data,status){
							$("#okFitemGradeCode").attr("disabled",false);
							loadFitemZtree();
							//分类编码
							$("#gradecode").attr("disabled",true);
							//分类名称
							$("#gradename").attr("disabled",true);
						}
					});	
				}
			}
		});	
	}else if(flag==2){//修改
		var fitemGradeMode = "fitemGradeMode.citemcode=" + fitemClass  
       	+ "&fitemGradeMode.gradecode=" +citemCode 
		+ "&fitemGradeMode.gradename=" +citemName 
		+ "&fitemGradeMode.iitemgrade=" +iitemgrade
		+ "&fitemGradeMode.bitemend="+bitemend ;
		$.ajax({
			url:"fitem!udateFitemGradeMode.action?fitemClass="+fitemClass+"&gradeCode="+oldGradeCode,		
			type:"post",
			data:fitemGradeMode,
			datatype:"json",
			success:function(data,status){
				$("#okFitemGradeCode").attr("disabled",false);
				loadFitemZtree();
			}
		});	
	}
} 

function moveUp(){
	var waitSelectCode = document.getElementById("waitSelectCode");
	var selectedCode = document.getElementById("selectedCode");

	if(selectedCode.selectedIndex==-1)return;
	var opt = selectedCode.options[selectedCode.selectedIndex];
	waitSelectCode.options.add(new Option(opt.text,opt.value));
	selectedCode.options.remove(selectedCode.selectedIndex);
}


function moveDown(){

	var waitSelectCode = document.getElementById("waitSelectCode");
	var selectedCode = document.getElementById("selectedCode");
	
	if(waitSelectCode.selectedIndex==-1)return;
	var opt = waitSelectCode.options[waitSelectCode.selectedIndex];
	selectedCode.options.add(new Option(opt.text,opt.value));
	waitSelectCode.options.remove(waitSelectCode.selectedIndex);
	
}


function allMoveUp(){

	var waitSelectCode = document.getElementById("waitSelectCode");
	var selectedCode = document.getElementById("selectedCode");

	while(selectedCode.options.length>0){
		waitSelectCode.options.add(new Option(selectedCode.options[0].text,selectedCode.options[0].value));
		selectedCode.options.remove(0);
	}
	
	
}


function allMoveDown(){

	var waitSelectCode = document.getElementById("waitSelectCode");
	var selectedCode = document.getElementById("selectedCode");

	while(waitSelectCode.options.length>0){
		
		selectedCode.options.add(new Option(waitSelectCode.options[0].text,waitSelectCode.options[0].value));
		waitSelectCode.options.remove(0);
	}
	
	
}



function updateAction(method){
	//取得select中当前选中的项作为参数传递给修改窗体
	var itemBigClass = $("#itemBigClass").val();
	if(itemBigClass==null){jAlert("请选择要修改的项目大类！");return;}
	var param = {};
	param.itemBigClass = itemBigClass;
	
	//将触发方式告知修改页面，以判定默认显示目标步骤面板（如果是点击修改按钮弹出的话，则修改页面显示第一个步骤面板；如果是点击表格弹出的话，则默认显示最后一步面板）
	param.flag = method;
	window.parent.openWindow('basic_fitem_update','basic_fitem_item',param);
}


//项目目录维护
function toMaintain(){
	var param = new Object();
	var itemBigClass = $("#itemBigClass").val();
	param.fitemClass = itemBigClass;
	var crule=$("#crule").html();
	param.crule=crule;
	window.parent.openWindow('basic_fitem_maintain','basic_fitem_item',param);
}




			
function pageloadedinit(){
var ist = document.getElementById("itemStructureTable");
for(var i=0;i<ist.rows.length;i++){
	for(var j=0;j<ist.rows[i].cells.length;j++){
		ist.rows[i].cells[j].ondblclick=function(event){
			var evt = (window.event || event);
			var td = (evt.srcElement || evt.target);
			switch(td.cellIndex){
			case 0 :
			case 1 :
			case 2 :
				updateAction("td");
				break;

			case 3 :
			case 5 :
				
				var innerHTML = td.innerHTML;
				if(innerHTML=="Y" && td.getAttribute("isBeforeValue")=="true"){
					
					jAlert("之前的值不能修改");
				}else{
					if(innerHTML=="Y"){
						td.innerHTML="";
					}else{
						td.innerHTML="Y";
					}
				}
				
				break;

			case 4 :
				jAlert("此单元格等待编程……");
				break;

			
			}
		};
	}
}

}



function  tab(x){
	
	for(var i=1;i<5;i++){
		document.getElementById("step"+i).style.display="none";
	}
	document.getElementById("step"+x).style.display="block";
	var fitemClass=$("#itemBigClass").val();
	    if(x*1==1){
	    	if(fitemClass==""||fitemClass==null){
	    		return;
	    	}
	    	initCodes(fitemClass);
	    }
		if (x*1==2 ) {
			if(fitemClass==""||fitemClass==null){
	    		return;
	    	}
			 queryFitemStructure(fitemClass);
		}
		if ( x*1==3) {
			//queryFitem();
			if(fitemClass==""||fitemClass==null){
	    		return;
	    	}
			loadFitemZtree();  
		}
		if(x*1==4){
			//项目目录 数据加载
			if(fitemClass==""||fitemClass==null){
	    		return;
	    	}
			queryFitemss(fitemClass);
		}
}

