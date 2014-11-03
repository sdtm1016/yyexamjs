/**
 * 
 * @DESCRIBE   参照项目控制类
 * @AUTHOR     王丙建
 * @DATE       2012-10-29
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */



/**
 * 初始化参照项目
 */
$(document).ready(function(){
	queryAll();
});



/**
*	显示所有常用摘要
*/
function queryAll(){	
	$("#include").html("");
	$.ajax({
		url:"columnDic!queryListByTableid.action?ckey=exch",
		type:"post",
		datatype:"json",
		success:function(data,status){
			aletr(data);
			columnDicList = data.columnDicList;
			recordCount = columnDicList.length;
			document.getElementById("loadRecord").innerHTML = "已加载" + recordCount + "条记录";
			document.getElementById("selRecord").innerHTML = "已选中1条记录";
			for(var i=0;i<glBdigestList.length;i++){
				$("#include").append('<tr id="'+columnDicList[i].id+'" field="'+columnDicList[i].cfld+'" bgcolor="#ffffff">'
						+'<td id ="col1" onclick="selectTd(this)"  ondblclick="columnDicSelected(this);">'+strNullProc(columnDicList[i].bdisp)+'</td>'
						+'<td id ="col2" onclick="selectTd(this)" ondblclick="columnDicSelected(this);">'+strNullProc(columnDicList[i].bfiexed)+'</td>'
						+'<td id ="col3" onclick="selectTd(this)" ondblclick="columnDicSelected(this);">'+strNullProc(columnDicList[i].ccaption)+'</td>'
						+'<td id ="col4" onclick="selectTd(this)" ondblclick="columnDicSelected(this);">'+strNullProc(columnDicList[i].icolwidth)+'</td>'
						+'<td id ="col5" onclick="selectTd(this)" ondblclick="columnDicSelected(this);">'+strNullProc(columnDicList[i].ialign)+'</td>'
						+'<td id ="col6" onclick="selectTd(this)" ondblclick="columnDicSelected(this);">'+strNullProc(columnDicList[i].corder)+'</td>'
					
						+'</tr>');
			}
		}
		
	});
}



/**
 * 返回定位的常用摘要编码及正文
 */
function find(colPos, inputValue, operator) {
	for(var i = 0;i<glBdigestList.length;i++){
		var c1Value = glBdigestList[i].cid;
		var c2Value = glBdigestList[i].ctext;
		var c3Value = glBdigestList[i].ccode;
		var c4Value = glBdigestList[i].chelp;
		//选择常用摘要编码
		if (colPos=="col1"){
		  	if (compareStr(c1Value, inputValue, operator)) {
		  	//将选择的值赋值给父窗体全局变量
		  	  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.selBdigestCode = c1Value;
		  	  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.selBdigestName = c2Value;
		  	  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.setBdigestValue();  
		  	  //关闭“参照”窗体
		  	  window.parent.closeWindow("dsign_reference");
		  		
		    }
		}
		//选择常用摘要正文
		else if (colPos=="col2") {
		  	if (compareStr(c2Value, inputValue, operator)) {
		  	  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.selBdigestCode = c1Value;
		  	  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.selBdigestName = c2Value;
		  	  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.setBdigestValue();  
		  	  //关闭“参照”窗体
		  	  window.parent.closeWindow("dsign_reference");
		  	
		  		
		    }

			
		}
		//选择相关科目编码
		else if (colPos=="col3") {
		  	if (compareStr(c3Value, inputValue, operator)) {
		  	  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.selBdigestCode = c1Value;
		  	  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.selBdigestName = c2Value;
		  	  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.setBdigestValue();  
		  	  //关闭“参照”窗体
		  	  window.parent.closeWindow("dsign_reference");
		  	
		  		
		    }

			
		}
		//选择常用摘要助记码
		else if (colPos=="col4") {
		  	if (compareStr(c4Value, inputValue, operator)) {
		  	  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.selBdigestCode = c1Value;
		  	  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.selBdigestName = c2Value;
		  	  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.setBdigestValue();  
		  	  //关闭“参照”窗体
		  	  window.parent.closeWindow("dsign_reference");
		  	
		  		
		    }
		}
	}
	
}

/**
 * 字符串比较
 * @param str1 字符串1
 * @param str2 字符串2
 * @param operator 运算符
 */
function compareStr(str1, str2, operator){
	//等于
	if (operator=="1") {
		if (str1==str2)
			return true;
		else
			return false;
	}
	//右
	else if (operator=="2") {
		var length1 = str2.length;
		
		if (str1.substr(length1-1)==str2)
			return true;
		else
			return false;
		
	}
	//包含
	else if (operator=="3") {
		if (str1.match(str2)!=null)
			return true;
		else
			return false;
		
	}	
	//左
	else if (operator=="4") {
		var length = str2.length;
		if (str1.substr(0,length)==str2)
			return true;
		else
			return false;
		
	}	
	//默认等于
	else  {
		if (str1==str2)
			return true;
		else
			return false;
		
	}	
	
}

/**
 * 单击常用摘要行
 */
var cstd=null;
var tdstyle=null;
var bdigestId=null;
//选择列
var selectColumn ;
//选择列代码
var selectColumnValue;

function selectTd(td){
	
	//获得当前选择行
	var currentEditRow = td.parentNode;
	var bdigestCode = currentEditRow.cells[0].innerHTML;
	var bdigestName = currentEditRow.cells[1].innerHTML;

	
	
	var inputCount = td.getElementsByTagName("input").length;
	//选择列
  	var id = td.getAttribute("id");
  	selectColumn = id;
	//获得当前选择行
	currentEditRow = td.parentNode;
	if(cstd!=null){
		cstd.style.cssText=tdstyle;
	}
	tdstyle=td.style.cssText;
	td.style.border="2px dashed #ccc";
	cstd = td;
	bdigestId=td.parentNode.id;
	if (id=="col1") {
		document.getElementById("selColumn").innerHTML = "常用摘要编码";
		selectColumnValue = currentEditRow.cells[0].innerHTML;
		
	}
	else if (id=="col2") {
		document.getElementById("selColumn").innerHTML = "常用摘要正文";
		selectColumnValue = currentEditRow.cells[1].innerHTML;
		
	}
	else if (id=="col3") {
		document.getElementById("selColumn").innerHTML = "相关科目编码";
		selectColumnValue = currentEditRow.cells[2].innerHTML;

	}
	else if (id=="col4") {
		document.getElementById("selColumn").innerHTML = "常用摘要助记码";
		selectColumnValue = currentEditRow.cells[3].innerHTML;

	}
	else  {
		document.getElementById("selColumn").innerHTML = "常用摘要编码";
		selectColumnValue = currentEditRow.cells[0].innerHTML;

	}


	
	
	
}




/**
*	双击常用摘要行
*/
function columnDicSelected(cell){
	//获得当前选择行
	var currentEditRow = cell.parentNode;
	var bdigestCode = currentEditRow.cells[0].innerHTML;
	var bdigestName = currentEditRow.cells[1].innerHTML;
	
		

  //将选择的值赋值给父窗体全局变量
  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.selBdigestCode = bdigestCode;
  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.selBdigestName = bdigestName;
  window.parent.document.getElementById("dsign").getElementsByTagName("iframe")[0].contentWindow.setBdigestValue();  
  //关闭“参照”窗体
  window.parent.closeWindow("dsign_reference");
}



/**
 * 定位查询
 * @param selObj
 */
function cellKeyControl(selObj){
	
	//得到定位运算符的值 
	var inKey = event.keyCode;
	 //回车键处理
	 if ( inKey==13 ){
		 var inputValue = $("#inputvalue").val();
		 var operator = $("input[name='radio']:checked").val();
		 find(selectColumn, inputValue, operator);
	 }
		 
}

/**
 * 栏目
 */
function  lanmu() {

}


/**
 * 编辑
 */
function  edit() {

}


/**
 * 栏目
 */
function  allLoad() {
	
}


/**
 * 刷新
 */
function  refresh() {
}


