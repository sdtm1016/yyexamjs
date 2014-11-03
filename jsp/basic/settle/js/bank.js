/**
 * 
 * @DESCRIBE   开户银行：js逻辑控制
 * @AUTHOR     王丙建
 * @DATE       2012-12-13
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

$(document).ready(function(){
	queryAllBanks();

});

var flag=true;//判断是添加还是修改

//变色函数-----开始
var highlightcolor='#d5f4fe';
var recoveryColor='#ffffff';
var clickcolor='#51b2f6';
var tempColor='#ffffff';
function changeColor(event){
	if(event.bgColor==recoveryColor){
		event.bgColor=highlightcolor;
	}
}

function recoverColor(event){
	if(event.bgColor==highlightcolor){
		event.bgColor=tempColor;
	}
	
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
	td.style.border="1px dashed #666";
	cstd = td;
	if(td.parentNode.id=="addBank"){
		flag=false;
	}
}

//选择行
var id = "";
var change = false;
var hasSelect = null;
function selectRow(event){
	if(hasSelect!=null){
		$(hasSelect).attr("bgcolor",recoveryColor);
	}
	$(event).attr("bgcolor",clickcolor);
	hasSelect = event;
}

var the_results = function(XMLHttpRequest, textStatus){
	
	if(textStatus == "error"){
	 	msg = "请求出错！";
	 	jAlert(msg);
	}
	else if(textStatus == "timeout"){
	 msg = "请求超时！";
	 jAlert(msg);
	}
	else if(textStatus == "parsererror"){
	 msg = "JSON数据格式有误！";
	 jAlert(msg);
	}else if (textStatus != "success"){
	 msg = "失败";
	 jAlert(msg+textStatus);
	}
}
/**
*	查询所有银行
*/
function queryAllBanks(){	
	$("#include").html("");
	$.ajax({
		url:"bank!queryList.action",
		type:"post",
		datatype:"json",
	    complete:the_results,
		success:function(data,status){
			var bankList=data.banks;
			for(var i=0;i<bankList.length;i++){
				var flag = "否";
				if(bankList[i].bbflag==1){
					flag = "是";
				}
				$("#include").append('<tr id="'+bankList[i].id+'" name="'+bankList[i].cpaycode+'" bgcolor="#ffffff" '
						+'onclick = "selectRow(this)" '
	    			//	+'onmousemove="changeColor(this)" onmouseout="recoverColor(this)">'
						+'>'
						+'<td onclick="selectTd(this)" ondblclick="paySelected(this);" >'+strNullProc(bankList[i].cbcode)+'</td>'
						+'<td onclick="selectTd(this)" ondblclick="paySelected(this);">'+strNullProc(bankList[i].cbname)+'</td>'
						+'<td onclick="selectTd(this)" ondblclick="paySelected(this);">'+strNullProc(bankList[i].cbaccount)+'</td>'
						+'<td onclick="selectTd(this)" ondblclick="editSelect(this);">'+flag+'</td>'
						+'</tr>');
			}
		}
		
	});
}

//退出调用 陈建宇页面方法
function exitWindow(){
	window.parent.closeWindow('bank');
}

var closeflag = false;
//点击叉时关闭窗体
function onWindowClose(){
	if(closeflag){
		return true;
	}else{
		var cpaycode =$("[name='bank.cpaycode']").val();
		var cpayname =$("[name='bank.cpayname']").val();
		var cbaccount =$("[name='bank.cbaccount']").val();
		
		if(cpaycode==""&&cpayname==""&&cbaccount==""){
			closeflag = true;
			window.parent.closeWindow('bank');
		}else{
			jConfirm("是否保存修改的内容！", "确认对话框", function(confirmflag){
				var flag = true;
				if(confirmflag){
					flag = create();
				}
				if(flag||typeof(flag)=="undefined"){
					closeflag = true;
					window.parent.closeWindow('bank');
				}else{
					closeflag = false;
				}
				
			});
		}
		return false;
	}
}
/**
*	添加开户银行
*/
function create(){
	var cpaycode =$("[name='bank.cpaycode']").val();
	var cpayname =$("[name='bank.cpayname']").val();
	var cbaccount =$("[name='bank.cbaccount']").val();
	var bbflag =$("[name='bank.bbflag']").val();
	if(cpaycode==""){
		jAlert("编码不能为空");
		return false;
	}else if(cpayname==""){
		jAlert("开户银行不能为空");
		return false;
	}else if(cbaccount==""){
		jAlert("银行账号不能为空");
		return false;
	} else if (cpaycode.length>3) {
		jAlert("编码长度不能超过3位！");
		return false;
	}	
	var pram ="bank.cbcode="+cpaycode
					+"&bank.cbname="+cpayname
					+"&bank.cbaccount="+cbaccount
					+"&bank.bbflag="+bbflag;
	
	
	
	//判断编码是否唯一
	$.ajax({
		url: "bank!isUniquenessBankByCode.action",
		type: 'post',
		data:pram,
		dataType: "json",
		async : false,
		success: function(data){
		if(data.isuniqueness==false){
				jAlert("该编号已经被使用，请重新输入编号!");
				return false;
			}
		else {
			
			$.ajax({
				url: "bank!isUniquenessBankByCbaccount.action",
				type: 'post',
				data:pram,
				dataType: "json",
				async : false,
				success: function(data){
					if(data.isuniqueness==false){
						jAlert("该银行账号已经被使用，请重新输入银行账号!");
						return false;
					}
					else {
						$.ajax({
							url:"bank!create.action",
							type:"post",
							datatype:"json",
							data:pram,
							async : false,
							complete:the_results,
							success:function(data,status){
								queryAllBanks();
								$("[name='bank.cpaycode']").val("");
								$("[name='bank.cpayname']").val("");
								$("[name='bank.cbaccount']").val("");
								$("[name='bank.bbflag']").val("0");
								return true;
							}
						});	
					}

				}
			 });
		}
		}
	  });
	
	
	
	
	
	
	
	
}

/**
*	删除当前选中的银行
*/
function del(){
	if(hasSelect==null){
		jAlert("请选择一行再进行操作！");
		return;
	}
	var id = $(hasSelect).attr("id");
	jConfirm("确定删除吗?", "确认对话框", function(confirmflag){
		if(confirmflag){
			//js判断
			var sourceValue = 	id;
			var sourceTable = 	"BANK";
			var sourceField = 	"cbaccount";
			var isExits = isExitsTableRef(sourceValue, sourceTable, sourceField);
			if (isExits==true) {
				jAlert("该银行账户已经被使用，不能删除!");
			    return false;			
			}
			else {
				$.ajax({
				    url: "bank!delete.action?bank.id="+id,
				    type: 'post',
				    dataType: "json",
				    success: function(data){
				    	if(data.isdelete==true){
							//jAlert("删除成功！");
						}else{
							jAlert("该银行账户已经被使用，不能删除!");
							return false;
						}
				    	
				    	queryAllBanks();
				    }
				 });
			}
		}
	});
}


/**
*	双击表格可编辑
*/
function paySelected(even){
	if(even.getElementsByTagName("input").length==0){
		//id = $(hasSelect).attr("id");
		var inputText =$(even).html();
		$(even).html("<input onblur='updateInput(this)' type='text' style='width:99%;height:12px;border:none;sfont-size:14px;' value='"+inputText+"'/>");
		even.getElementsByTagName("input")[0].focus();
		change = true;
	}
}
/**
*	双击表格可编辑（暂封标志）
*/
var iseditSelect=false;

function editSelect(even){
	if(even.getElementsByTagName("select").length==0){
		var inputText =$(even).html();
		var no = "";
		var yes = "";
		if(inputText=="否"){
			no ="selected";
		}else{
			yes ="selected";
		}
		$(even).html('<select onblur="updateInput(this)" name="select" id="select" style="width:99%;height:18px;">'
					+'<option value="否" '+no+'>否</option>'
					+'<option value="是" '+yes+'>是</option>'
					+'</select>');
		even.getElementsByTagName("select")[0].focus();
		change = true;
		iseditSelect=true;


	}
}

/**
*	修改表格数据
*/
function updateInput(even){
	var temp = $(even).val();
	$(even).parent().html(temp);
	if(iseditSelect){
		var count=0;
		$("#include tr").each(function(){
			var td=$(this).find("td:last");
			if(td.html()==="否"){count++;}
			
		});
		if(count+1==1){//判断是否开户银行都未暂封标志
			jAlert("本系统不允许将全部银行暂封");
			var row=$(hasSelect);
			row.find("td:last").html("否");
			return;
		}else{
			if(flag){
				update();
			}
		}
	}else{
		if(flag){
			update();
		}
	}

}

/**
*	修改表格数据
*/
function update(){
	if(change){
		var flag = 0;
		if($(hasSelect).children().eq(3).html()=="是"){
			flag = 1;
		}
		var pram = "bank.id="+$(hasSelect).attr("id")
					+"&bank.cbcode="+$(hasSelect).children().eq(0).html()
					+"&bank.cbname="+$(hasSelect).children().eq(1).html()
					+"&bank.cbaccount="+$(hasSelect).children().eq(2).html()
					+"&bank.bbflag="+flag;
		$.ajax({
			url:"bank!update.action",
			type:"post",
			datatype:"json",
			data:pram,
			
			complete:the_results,
			success:function(data,status){
				change = false;	
			}
		});	
	}

}
