/**
 * 
 * @DESCRIBE   常用摘要编辑界面js
 * @AUTHOR     王丙建
 * @DATE       2012-10-08
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */
/**
 * 图片路径
 */
var imgPath = "../../../../images/buttons/";
/**
 * 当前选择行
 */
var currentEditRow ;

//焦点标志
var fourceBz = false;

/**
 * 初始化编辑
 */

$(document).ready(function(){
	queryAll();
	initButton();
	
	
});


 /**
  * 初始化按钮
  */
 function initButton() {
	 $("#add").attr("disabled",true);
	$("#add").attr("src",imgPath + "disadd.jpg");
		 
	$("#del").attr("disabled",true);
	$("#del").attr("src",imgPath + "disdel.jpg");
	 
	 $("#abort").attr("disabled",true);
	 $("#abort").attr("src",imgPath + "disabandon.jpg");
	 
	 $("#output").attr("src",imgPath + "output.jpg");
	 $("#help").attr("src",imgPath + "help.jpg");
	 $("#exit").attr("src",imgPath + "exit.jpg");
	 
	 
 }


/**
*	显示所有常用摘要
*/
function queryAll(){	
	$("#include").html("");
	$.ajax({
		url:"glBdigest!queryglBdigest.action",
		
		type:"post",
		datatype:"json",
		success:function(data,status){
			var glBdigestList = data.glBdigestList;
			for(var i=0;i<glBdigestList.length;i++){
					$("#include").append('<tr id="'+glBdigestList[i].id+'" name="'+glBdigestList[i].ctext+'" bgcolor="#ffffff">'
							+'<td  onclick="selectTd(this)" ondblClick="bdigestSelected(this)"    >'+ " <input type='text' onblur='bdigestBlue(this)' style='width:80px;border:none;' value='"  + strNullProc(glBdigestList[i].cid)  +"'/>" + '</td>'
							+'<td  onclick="selectTd(this)" ondblClick="bdigestSelected(this)"  >'+ " <input type='text' onblur='bdigestBlue(this)' style='width:80px;border:none;' value='"  +  strNullProc(glBdigestList[i].ctext)  +"'/>" + '</td>'
							+'<td  onclick="selectTd(this)" ondblClick="bdigestSelected(this)"  >'+ " <input type='text' onblur='bdigestBlue(this)' style='width:80px;border:none;' value='"  +  strNullProc(glBdigestList[i].chelp)  +"'/>" + '</td>'
							+'<td  onclick="selectTd(this)" ondblClick="bdigestSelected(this)"  >'+ " <input type='text' onblur='bdigestBlue(this)' style='width:80px;border:none;' value='"  +  strNullProc(glBdigestList[i].ccode)  +"'/>" + '</td>'
							
							+'</tr>');
			}		
			insRow("","","","");
			
		}
		
	});
}

/**
 * 新增一行空的常用摘要
 * @param insId  编码
 * @param insText 正文
 * @param insHelp 助记码
 * @param insCode 科目编码
 */
function insRow(insId,insText,insHelp, insCode) {
	$("#include").append('<tr id="'+insId+'" name="'+insText+'" bgcolor="#ffffff">'
			+'<td  onclick="selectTd(this)" ondblClick="bdigestSelected(this)"   >'+ " <input type='text' onblur='bdigestBlue(this)' style='width:80px;border:none;' value='"  + insId +"'/>" + '</td>'
			+'<td  onclick="selectTd(this)" ondblClick="bdigestSelected(this)"   >'+ " <input type='text' onblur='bdigestBlue(this)' style='width:80px;border:none;' value='"  + insText  +"'/>" + '</td>'
			+'<td  onclick="selectTd(this)" ondblClick="bdigestSelected(this)"   >'+ " <input type='text' onblur='bdigestBlue(this)' style='width:80px;border:none;' value='"  + insHelp  +"'/>" + '</td>'
			+'<td  onclick="selectTd(this)" ondblClick="bdigestSelected(this)"   >'+ " <input type='text' onblur='bdigestBlue(this)' style='width:80px;border:none;' value='"  + insCode  +"'/>" + '</td>'
			
			+'</tr>');
}

/**
 * 删除摘要
 */
function delBdigest(bdigestId) {
	 var data = "glBdigest.cid=" + bdigestId;
	 $.ajax({	
		  url: "glBdigest!deleteBdigest.action",
			type: 'post',
			data: data,
			dataType: "json",
			success: function(data){
				jAlert("删除成功！","提示",function(){
					
					
					queryAll();
					//删除成功后，删除键不可用
					$("#del").attr("disabled",true);
					$("#del").attr("src",imgPath + "disdel.jpg");
					
				});
	
			}
		  });
}


/**
 * 新增常用摘要
 * @param bdigestId  常用摘要编码
 * @param bdigestText 常用摘要正文
 * @param bdigestHelp 常用摘要助记码
 * @param bdigestCode 相关科目编码
 */
function insBdigest(bdigestId,bdigestText,bdigestHelp,bdigestCode) {
	 
	var data  =  "glBdigest.cid="+bdigestId
		         + "&glBdigest.ctext="+bdigestText
		         + "&glBdigest.chelp="+bdigestHelp
                 + "&glBdigest.ccode="+bdigestCode;	

	 $.ajax({	
		  url: "glBdigest!create.action",
			type: 'post',
			data: data,
			dataType: "json",
			success: function(data){
				jAlert("添加成功","提示",function(){
					
					queryAll();
				});
			}
		  });
}


/**
 * 更新当前修改摘要摘要行
 */
function updateBdigest(id, bdigestId,bdigestText,bdigestHelp,bdigestCode) {
	var data  =  "glBdigest.cid="+bdigestId
					+ "&glBdigest.ctext="+bdigestText
					+ "&glBdigest.chelp="+bdigestHelp
					+ "&glBdigest.ccode="+bdigestCode;	
	 $.ajax({	
		  url: "glBdigest!updateBdigest.action" ,
			type: 'post',
			data: data,
			dataType: "json",
			success: function(data){
				jAlert("更新成功","提示",function(){
					queryAll();
					
				});
			}
		  });
}

/**
 * 单击常用摘要行
 */
var cstd=null;
var tdstyle=null;
var bdigestId=null;

var selrowId = "";   //主键
var selBdigestId = "";   //编码

var selBdigestText = ""; //正文
var selBdigestHelp = ""; //助记码
var selBdigestCode = ""; //科目编码

function selectTd(td){
	
	//设置增加按钮可用
	$("#add").attr("disabled",false);
	$("#add").attr("src","../../../../images/buttons/add.jpg");
	
	//设置删除按钮可用
	$("#del").attr("disabled",false);
	$("#del").attr("src","../../../../images/buttons/del.jpg");
	
	//设置放弃按钮可用
	$("#abort").attr("disabled",true);
	$("#abort").attr("src",imgPath +"disabandon.jpg");
	
	var inputCount = td.getElementsByTagName("input").length;
	//获得当前选择行
	currentEditRow = td.parentNode;
	selrowId=td.parentNode.id;
	selBdigestId   = currentEditRow.cells[0].innerHTML;
	selBdigestText = currentEditRow.cells[1].innerHTML;;
	selBdigestHelp = currentEditRow.cells[2].innerHTML;;
	selBdigestCode = currentEditRow.cells[3].innerHTML;;
		
	if(cstd!=null){
		cstd.style.cssText=tdstyle;
	}
	tdstyle=td.style.cssText;
	td.style.border="2px dashed #ccc";
	cstd = td;
	bdigestId=td.parentNode.id;
	
}



/**
*	双击常用摘要行，允许进行编辑
*/
function bdigestSelected(cell){
	
	
	  //按钮初始化
	//设置增加按钮可用
	$("#add").attr("disabled",false);
	$("#add").attr("src","../../../../images/buttons/add.jpg");

	
     $("#del").attr("disabled",true);
	 $("#del").attr("src",imgPath + "disdel.jpg");
	 
	 $("#query").attr("disabled",true);
	 $("#query").attr("src",imgPath + "disdel.jpg");
	 $("#filter").attr("disabled",true);
	 $("#filter").attr("src",imgPath + "disdel.jpg");
	 
	 //允许执行失去焦点事件
	 
	//设置放弃按钮可用
	$("#abort").attr("disabled",false);
	$("#abort").attr("src",imgPath +"abandon.jpg");
	
	
	//获得当前选择行
	currentEditRow = cell.parentNode;
	selrowId=cell.parentNode.id;
		
	selBdigestId   = currentEditRow.cells[0].innerHTML;
	selBdigestText = currentEditRow.cells[1].innerHTML;;
	selBdigestHelp = currentEditRow.cells[2].innerHTML;;
	selBdigestCode = currentEditRow.cells[3].innerHTML;;
	
	

}

var rowId = "";   //主键
var insBdigestId = "";   //编码

var insBdigestText = ""; //正文
var insBdigestHelp = ""; //助记码
var insBdigestCode = ""; //科目编码


function bdigestBlue(textbox) {
	
	//文本框焦点事件
	currentEditRow = textbox.parentNode.parentNode;
	rowId=currentEditRow.id;
	textbox.parentNode.innerHTML=textbox.value;
	insBdigestId = currentEditRow.cells[0].innerHTML;
	insBdigestText = currentEditRow.cells[1].innerHTML;
	insBdigestHelp = currentEditRow.cells[2].innerHTML;
	insBdigestCode = currentEditRow.cells[3].innerHTML;
	
	
	
}


/**
 * 设置
 */
function  setup() {

}


/**
 * 打印
 */
function  print() {

}


/**
 * 预览
 */
function  priview() {
	
}


/**
 * 输出
 */
function  output() {
}


/**
 * 增加
 */
function  add() {
	insBdigest(insBdigestId,insBdigestText,insBdigestHelp,insBdigestCode);

}


/**
 * 删除
 */
function  del() {
	
	var msg = "确实要删除常用摘要--" + selBdigestText + "吗？";
	
	jConfirm(msg,"提示",function(f){
		if(f)
		delBdigest(selBdigestId);
	});
    
}


/**
 * 放弃
 */
function  abort() {
	
}


/**
 * 查询
 */
function  query() {
}




/**
 * 过滤
 */
function  filter() {

}


/**
 * 刷新
 */
function  refresh() {
	updateBdigest();
}


/**
 * 帮助
 */
function  help() {
	
}


/**
 * 输出
 */
function  output() {
}





