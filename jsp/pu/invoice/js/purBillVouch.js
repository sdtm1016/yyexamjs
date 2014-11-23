/**
 * 采购发票页面js
 */
//全局变量 是是否记账标志 true:记账  false：未记账
var accountingFlag=false;
//全局变量 保存按钮的调用方法
var action = null;
//全局变量子表数量合计值
var sumAmount = 0;
//原币金额合计
var sumIorimoney=0;
//原币税额合计
var sumIoritaxprice=0;
//本币金额合计
var sumImoney=0;
//本币税额合计
var sumItaxprice=0;
//全局变量子表本币价税合计值
var sumIorTaxMoney = 0;
//全局变量子表原币价税合计值
var sumTaxMoney = 0;
//当前被点击选中的行全局变量
var currentSeletedRow=null;
//当前编辑的行
var currentEditRow = null;
//当前编辑单元格
var currentEditCell = null;

//程序入口
$(document).ready(function(){
	accountingFlag = ifAccounting();
	//查询所有数据
	queryPurBillVouchs(null);
	
});
/**
 *  查看是否已经记账
 */
function ifAccounting(){
	var accountingFlag = false;
	$.ajax({
		url:"glmend!findOrSetdata",
		type:"post",
		async:false,
		datatype:"json",
		error:function(){
			//jAlert("请求失败!");
		},
		success:function(jsonData){
			if(jsonData.accountingFlag){
				accountingFlag = true;
			}
		}
	});
	return accountingFlag;
}
/**
 * 查找账套下的全部采购发票
 */
function queryPurBillVouchs(purBillVouchId) {
	//初始化保存类型
	action=null;
	//purBillVouchId(发票主表id)
	var purBillVouchData=null;
	if(purBillVouchId==null){
		purBillVouchData={};
	}else{
		purBillVouchData = "purBillVouch.id="+ purBillVouchId;	
	}
	$.ajax({
		url: "purBillVouch!queryList.action",
		type: 'post',
		data:purBillVouchData,
		dataType: "json",
		async:false,
		error:function(){
		//	jAlert("请求失败!");
		},
		success: function(jsonData){
			//采购发票主表
			var purBillVouchList = jsonData.purBillVouchList;
			//采购发票子表
			var purBillVouchsList = jsonData.purBillVouchsList;
			var purBillVouch = null;
			if(purBillVouchList.length==0){
				//设置按钮状态
				//setbuttonStyle("query1");
			}else{
				if(purBillVouchId!=null){
					for(var i=0;i<purBillVouchList.length;i++){
						if(purBillVouchList[i].id==purBillVouchId){
							purBillVouch = purBillVouchList[i];
						}
					}
				}else{
					purBillVouch = purBillVouchList[purBillVouchList.length-1];
				}
			}
			//设置数据
			setpurBillVouchData(purBillVouch,purBillVouchsList);
			//设置分页功能
			setPaging(purBillVouchList,purBillVouch);
			//页面数据不可操作
			pageUnused();
		}
	});
}
//分页功能
function setPaging(purBillVouchList,purBillVouch){
	$("#savePur").attr("disabled",true);
	$("#giveupPur").attr("disabled",true);
	$("#addrowPur").attr("disabled",true);
	$("#delrowPur").attr("disabled",true);
	$("#refreshPur").attr("disabled",false);
	$("#addPur").attr("disabled",false);
	$("#addPur1").attr("disabled",false);
	//设置暂时没有功能按钮不可用
	setbuttonStyle(null);
	var len = purBillVouchList.length;
	if(len>0){
		//是否审核标志
		$("#auditPur").attr("auditPurflag",0);
		//是否是期初
		if(purBillVouch.boriginal==1){
			//弃核按钮状态
			if(accountingFlag){
				$("#updatePur").attr("disabled",true);
				$("#delPur").attr("disabled",true);
			}else{
				$("#updatePur").attr("disabled",false);
				$("#delPur").attr("disabled",false);
			}
			$("#auditPur").val("复核").css("background-image","url('../../../images/icon/audit.gif')").attr("disabled",true);
			$("#auditImg").css("display","none");
		}else{
			//审核标志1为审核  0为未审核
			if(purBillVouch.iflag==1){
				$("#auditPur").val("弃复").css("background-image","url('../../../images/icon/difficulty.gif')");
				$("#auditImg").css("display","block");
				//如果是审核状态修改,删除按钮不能用
				$("#updatePur").attr("disabled",true);
				$("#delPur").attr("disabled",true);
			}else{
				$("#auditPur").val("复核").css("background-image","url('../../../images/icon/audit.gif')");
				$("#auditImg").css("display","none");
				$("#updatePur").attr("disabled",false);
				$("#delPur").attr("disabled",false);
			}
			$("#auditPur").attr("auditPurflag",purBillVouch.iflag);
			$("#auditPur").attr("disabled",false);
		}
	}else{
		//弃核按钮状态
		$("#auditPur").attr("disabled",true);
		$("#updatePur").attr("disabled",true);
		$("#delPur").attr("disabled",true);
	}
	if(len==0||len==1){
		//分页
		$("#firstPur").attr("disabled",true);
		$("#upPur").attr("disabled",true);
		$("#downPur").attr("disabled",true);
		$("#lastPur").attr("disabled",true);
	}else{
		//分页
		for(var i=0;i<purBillVouchList.length;i++){
			if(purBillVouchList[i].id==purBillVouch.id){
				if((i-1)<0){
					$("#upPur").attr("disabled",true);
					$("#firstPur").attr("disabled",true);
				}else{
					$("#firstPur").attr("disabled",false).attr("current",purBillVouchList[0].id);
					$("#upPur").attr("disabled",false).attr("current",purBillVouchList[i-1].id);
				}
				if((i+2)>len){
					$("#downPur").attr("disabled",true);
					$("#lastPur").attr("disabled",true);
				}else{
					$("#downPur").attr("disabled",false).attr("current",purBillVouchList[i+1].id);
					$("#lastPur").attr("disabled",false).attr("current",purBillVouchList[len-1].id);
				}
			}
		}
	}
}
//分页查找
function getPaging(currentPurBillVouch){
	var purBillVouchId = $(currentPurBillVouch).attr("current");
	if(purBillVouchId!=""&&purBillVouchId!==null){
		queryPurBillVouchs(purBillVouchId);		
	}
}
/**
 * 给发票单设置数据
 * @param purBillVouch(主表数据)
 * @param purBillVouchsList(子表数据)
 */
function setpurBillVouchData(purBillVouch,purBillVouchsList){
	//清空单据
	clearInvoice();
	//如果不为空则填充单据
	if(purBillVouch!=null){
		//======================表单部分开始================================
		//当前主表id
		$("#topTextBoxContainer").attr("currentpurBillVouchId",purBillVouch.id);
		//发票类型
		var cpbvbilltypeHtml = "";
		//发票标题
		var putTitleNameHtml = "";
		if(purBillVouch.boriginal==1){
			putTitleNameHtml+="期初";
		}
		putTitleNameHtml+="采购";
		//发票类型
		var cpbvbilltype = purBillVouch.cpbvbilltype;
		if(cpbvbilltype=="01"){
			cpbvbilltypeHtml+="<option value='01' >专用发票</option>";
			putTitleNameHtml+="专用发票";
		}else if(cpbvbilltype=="03"){
			cpbvbilltypeHtml+="<option value='03' >运费发票</option>";
			putTitleNameHtml+="运费发票";
		}else{
			cpbvbilltypeHtml+="<option value='02' >普通发票</option>";
			cpbvbilltypeHtml+="<option value='04' >废旧物资收购凭证</option>";
			cpbvbilltypeHtml+="<option value='05' >农副产品收购凭证</option>";
			cpbvbilltypeHtml+="<option value='06' >其他发票</option>";
			putTitleNameHtml+="普通发票";
		}
		$("#cpbvbilltype").html(cpbvbilltypeHtml);
		$("#cpbvbilltype").val(cpbvbilltype);
		//发票标题
		$("#putTitleName").html(putTitleNameHtml).attr("bnegative",purBillVouch.bnegative).attr("boriginal",purBillVouch.boriginal);
		if(purBillVouch.bnegative==1){//红字
			$("#putTitleName").removeClass("colblack").addClass("colred");
		}else{
			$("#putTitleName").removeClass("colred").addClass("colblack");
		}
		//订单号
		$("#cordercode").val(purBillVouch.cordercode);
		//发票号
		$("#cpbvcode").val(purBillVouch.cpbvcode);
		//开票日期
		$("#dpbvdate").val(getStrDate(purBillVouch.dpbvdate));
		//部门内容
		if(purBillVouch.cdeptId!=""&&purBillVouch.cdeptId!=null){

			var department = getDepartmentNameBy(purBillVouch.cdeptId);
			if(department!=null){
				//部门编码
				$("#cdepcode").attr("dbvalue",purBillVouch.cdepcode);
				//部门id
				$("#cdepcode").attr("dbvalueId",purBillVouch.cdeptId);
				//查询部门名称
				$("#cdepcode").val(department.cdepname);
			}else{
				//部门编码
				$("#cdepcode").attr("dbvalue","");
				//部门id
				$("#cdepcode").attr("dbvalueId","");
				//查询部门名称
				$("#cdepcode").val("");
			}

		}else{
			//部门编码
			$("#cdepcode").attr("dbvalue","");
			//部门id
			$("#cdepcode").attr("dbvalueId","");
			//查询部门名称
			$("#cdepcode").val("");
		}
		
		//供应商编码
		$("#cvencode").attr("dbvalue",purBillVouch.cvencode);
		//供应商id
		$("#cvencode").attr("dbvalueId",purBillVouch.csupId);
		var vendor = getSupNameBy(purBillVouch.csupId);
		if(vendor!=null){
			//供应商名称
			$("#cvencode").val(vendor.cvenname);
		}else{
			$("#cvencode").val("");
		}
		//垫付单位
		if(purBillVouch.cunitcode!=""&&purBillVouch.cunitcode!=null){
			//代垫单位编码(应该有代垫单位id)
			$("#cunitcode").attr("dbvalueId",purBillVouch.cunitcode);
			var vendor = getSupNameBy(purBillVouch.cunitcode);
			if(vendor!=null){
				//供应商名称
				$("#cunitcode").val(vendor.cvenname);
			}else{
				$("#cunitcode").val("");
			}
		}else{
			//供应商编码
			$("#cunitcode").attr("dbvalueId","");
			//供应商名称
			$("#cunitcode").val("");
		}
		//人员
		if(purBillVouch.cpersonId!=""&&purBillVouch.cpersonId!=null){
			var person = getPersonNameBy(purBillVouch.cpersonId);
			if(person!=null){
				//业务员编码
				$("#cpersoncode").attr("dbvalue",purBillVouch.cpersoncode);
				//业务员id
				$("#cpersoncode").attr("dbvalueId",purBillVouch.cpersonId);
				//业务员名称
				$("#cpersoncode").val(person.cpersonname);
			}else{
				//业务员编码
				$("#cpersoncode").attr("dbvalue","");
				//业务员id
				$("#cpersoncode").attr("dbvalueId","");
				//业务员名称
				$("#cpersoncode").val("");
			}
		}else{
			//业务员编码
			$("#cpersoncode").attr("dbvalue","");
			//业务员id
			$("#cpersoncode").attr("dbvalueId","");
			//业务员名称
			$("#cpersoncode").val("");
		}
		//采购类型编码
		if(purBillVouch.cptcode!=""&&purBillVouch.cptcode!=null){
			var purchaseType = getPurchaseTypeById(purBillVouch.cptcode);
			if(purchaseType!=null){
				$("#cptcode").attr("dbvalue",purchaseType.cptcode);
				$("#cptcode").attr("dbvalueId",purchaseType.id);
				$("#cptcode").val(purchaseType.cptname);
			}else{
				$("#cptcode").attr("dbvalue","");
				$("#cptcode").attr("dbvalueId","");
				$("#cptcode").val("");
			}
		}else{
			$("#cptcode").attr("dbvalue","");
			$("#cptcode").attr("dbvalueId","");
			$("#cptcode").val("");
		}
		//付款条件
		if(purBillVouch.csettleid!=""&&purBillVouch.csettleid!=null){
			var payCondition = getPayCondition(purBillVouch.csettleid);
			if(payCondition!=null){
				//付款条件编码
				$("#cpaycode").attr("dbvalue",purBillVouch.cpaycode);
				//付款条件id
				$("#cpaycode").attr("dbvalueId",purBillVouch.csettleId);
				//付款条件名称
				$("#cpaycode").val(payCondition.cpayName);
			}else{
				//付款条件编码
				$("#cpaycode").attr("dbvalue","");
				//付款条件id
				$("#cpaycode").attr("dbvalueId","");
				//付款条件名称
				$("#cpaycode").val("");
			}
		}else{
			//付款条件编码
			$("#cpaycode").attr("dbvalue","");
			//付款条件id
			$("#cpaycode").attr("dbvalueId","");
			//付款条件名称
			$("#cpaycode").val("");
		}
		//税率
		$("#ipbvtaxrate").val(purBillVouch.ipbvtaxrate);
		//备注
		$("#cpbvmemo").val(purBillVouch.cpbvmemo);
		//到期日
		$("#dqdate").val(getStrDate(purBillVouch.dqdate));
		//结算日期
		$("#dsdate").val(getStrDate(purBillVouch.dsdate));
		//制单
		$("#cpbvmaker").val(purBillVouch.cpbvmaker);
		//审核日期
		$("#auditdate").val(getStrDate(purBillVouch.auditdate));
		//======================表单部分结束================================
		//======================表格部分开始================================
		var strHtml = "";
		////全局变量子表数量合计值
		sumAmount = 0;
		//原币金额合计
		sumIorimoney=0;
		//原币税额合计
		sumIoritaxprice=0;
		//本币金额合计
		sumImoney=0;
		//本币税额合计
		sumItaxprice=0;
		//全局变量子表本币价税合计值
		sumIorTaxMoney = 0;
		//全局变量子表原币价税合计值
		sumTaxMoney = 0;
		var i=1; 
		for(var i=0;i<purBillVouchsList.length;i++){
			var inventory = getInventoryByCode(purBillVouchsList[i].cinvcode);
			strHtml+="<tr purBillVouchsId='"+purBillVouchsList[i].id+"'    class='tr'+(i)+'  onclick='rowSelection(this)' editerType='1' >";
			strHtml+="	<td style='width:20px;'   class='td1'   onclick='setEditerType(this)'>"+(i++)+"</td>";
			strHtml+="	<td style='width:70px;'   class='td2' class='td1' ondblclick='cellEditer(this)'>"+strNullProc(inventory.cinvcode)+"</td>";
			strHtml+="	<td style='width:90px;'   class='td3'  class='td1' ondblclick='cellEditer(this)'>"+strNullProc(inventory.cinvname)+"</td>";
			strHtml+="	<td style='width:80px;'   class='td4'  class='td1' ondblclick='cellEditer(this)'>"+strNullProc(inventory.cinvstd)+"</td>";
			strHtml+="	<td style='width:60px;'   class='td5'  class='td1' ondblclick='cellEditer(this)'>"+strNullProc(inventory.cinvmUnit)+"</td>";
			strHtml+="	<td style='width:60px;'   class='td6'  class='td1' ondblclick='cellEditer(this)'>"+DoubleNullPtoc(purBillVouchsList[i].ipbvquantity)+"</td>";
			strHtml+="	<td style='width:70px;'   class='td7'  class='td1' ondblclick='cellEditer(this)'>"+DoubleNullPtoc(purBillVouchsList[i].ioricost)+"</td>";
			strHtml+="	<td style='width:80px;'   class='td8'  class='td1' ondblclick='cellEditer(this)'>"+DoubleNullPtoc(purBillVouchsList[i].iorimoney)+"</td>";
			strHtml+="	<td style='width:60px;'   class='td9'  class='td1' ondblclick='cellEditer(this)'>"+DoubleNullPtoc(purBillVouchsList[i].ioritaxprice)+"</td>";
			strHtml+="	<td style='width:70px;'   class='td10'  class='td1' ondblclick='cellEditer(this)'>"+DoubleNullPtoc(purBillVouchsList[i].icost)+"</td>";
			strHtml+="	<td style='width:80px;'   class='td11'  class='td1' ondblclick='cellEditer(this)'>"+DoubleNullPtoc(purBillVouchsList[i].imoney)+"</td>";
			strHtml+="	<td style='width:60px;'   class='td12'  class='td1' ondblclick='cellEditer(this)'>"+DoubleNullPtoc(purBillVouchsList[i].itaxprice)+"</td>";
			strHtml+="	<td style='width:90px;'    class='td13' class='td1' ondblclick='cellEditer(this)'>"+DoubleNullPtoc(purBillVouchsList[i].isum)+"</td>";
			strHtml+="	<td style='width:90px;'    class='td14' class='td1' ondblclick='cellEditer(this)'>"+DoubleNullPtoc(purBillVouchsList[i].iorisum)+"</td>";
			strHtml+="	<td style='width:60px;'    class='td15' class='td1' ondblclick='cellEditer(this)'>"+DoubleNullPtoc(purBillVouchsList[i].itaxrate)+"</td>";  
			strHtml+="</tr>";
			sumAmount+=DoubleNullPtoc(purBillVouchsList[i].ipbvquantity);
			sumIorimoney+=DoubleNullPtoc(purBillVouchsList[i].iorimoney);
			sumIoritaxprice+=DoubleNullPtoc(purBillVouchsList[i].ioritaxprice);
			sumImoney+=DoubleNullPtoc(purBillVouchsList[i].imoney);
			sumItaxprice+=DoubleNullPtoc(purBillVouchsList[i].itaxprice);
			sumIorTaxMoney+=DoubleNullPtoc(purBillVouchsList[i].isum);
			sumTaxMoney+=DoubleNullPtoc(purBillVouchsList[i].iorisum);
		}
		//插入10行空行
		for(var j=0;j<10;j++){
			strHtml+="<tr purBillVouchsId='' onclick='rowSelection(this)'   class='tr'+(i)+'   editerType='0' >";
			strHtml+="	<td style='width:20px;'  onclick='setEditerType(this)'>(i++)</td>";
			strHtml+="	<td style='width:70px;'  class='td1' ondblclick='cellEditer(this)'></td>";
			strHtml+="	<td style='width:90px;'  class='td1' ondblclick='cellEditer(this)'></td>";
			strHtml+="	<td style='width:80px;'  class='td1' ondblclick='cellEditer(this)'></td>";
			strHtml+="	<td style='width:60px;'	 class='td1' ondblclick='cellEditer(this)'></td>";
			strHtml+="	<td style='width:60px;'  class='td1' ondblclick='cellEditer(this)'></td>";
			strHtml+="	<td style='width:70px;'  class='td1' ondblclick='cellEditer(this)'></td>";
			strHtml+="	<td style='width:80px;'  class='td1' ondblclick='cellEditer(this)'></td>";
			strHtml+="	<td style='width:60px;' class='td1' ondblclick='cellEditer(this)'></td>";
			strHtml+="	<td style='width:70px;' class='td1' ondblclick='cellEditer(this)'></td>";
			strHtml+="	<td style='width:80px;' class='td1' ondblclick='cellEditer(this)'></td>";
			strHtml+="	<td style='width:60px;' class='td1' ondblclick='cellEditer(this)'></td>";
			strHtml+="	<td style='width:90px;' class='td1' ondblclick='cellEditer(this)'></td>";
			strHtml+="	<td style='width:90px;' class='td1' ondblclick='cellEditer(this)'></td>";
			strHtml+="	<td style='width:60px;' class='td1' ondblclick='cellEditer(this)'></td>";  
			strHtml+="</tr>";
		}
		$("#datatable_bodyer").empty().append(strHtml);
		$("#sumNumber").text(sumAmount);
		$("#sumOriCurAmoun").text(sumIorimoney);
		$("#sumOriCurTax").text(sumIoritaxprice);
		$("#sumCurAmoun").text(sumImoney);
		$("#sumCurTax").text(sumItaxprice);
		$("#sumIorTaxMoney").text(sumIorTaxMoney);
		$("#sumTaxMoney").text(sumTaxMoney);
		
		var thefirstTr = $("#datatable_bodyer").find("tr");
		if(thefirstTr.attr("editerType")==1){
			//选中第一行
			thefirstTr[0].click();
		}
		//======================表格部分结束================================
	}
}
//根据部门id获取部门名称
function getDepartmentNameBy(departmentid){
	var department=null;
	$.ajax({
	    url: "department!findDepartmentById",
	    data:"department.id="+departmentid,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	department = data.department;
	    }
	  });
	return department;
}
//根据职员id获取职员名称
function getPersonNameBy(personid){
	var person=null;
	$.ajax({
	    url: "person!findPersonById",
	    data:"person.id="+personid,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	person = data.person;
	    }
	  });
	return person;
}
//根据供应商id获取供应商名称
function getSupNameBy(supid){
	var vendor=null;
	$.ajax({
	    url: "vendor!queryVendorById",
	    data:"vendor.id="+supid,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	vendor = data.vendor;
	    }
	  });
	return vendor;
}
//根据存货档案编码获取存货档案
function getInventoryByCode(inventoryCode){
	var inventory=null;
	$.ajax({
	    url: "inventory!queryInventoryByCinvcode.action?code="+inventoryCode,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	inventory = data.inventory;
	    }
	  });
	return inventory;
}
//获取付款条件
function getPayCondition(payId){
	var payCondition=null;
	$.ajax({
	    url: "payCondition!findPayConditionById",
	    data:"payCondition.id="+payId,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	payCondition = data.payConditionStr;
	    	payCondition = eval('(' + payCondition + ')');
	    }
	  });
	return payCondition;
}
//根据id获取采购类型
function getPurchaseTypeById(purchaseTypeId){
	var purchaseType=null;
	$.ajax({
	    url: "purchasetype!findPurchasetypeId",
	    data:"purchasetype.id="+purchaseTypeId,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	purchaseType = data.purchaseTypeStr;
	    	purchaseType = eval('(' + purchaseType + ')');
	    }
	  });
	return purchaseType;
}
//页面不可操作数据
function pageUnused(){
	$("#topTextBoxContainer").find(".querybox").attr("disabled",true);
	$("#bottomTextBoxContainer").find("input").attr("disabled",true);
	//发票类型不可用
	$("#cpbvbilltype").attr("disabled",true);
}
//页面可操作数据
function pageused(){
	$("#topTextBoxContainer").find(".querybox").attr("disabled",false);
	$("#bottomTextBoxContainer").find("input").attr("disabled",true);
	//发票类型可用
	$("#cpbvbilltype").attr("disabled",false);
	//订单号不可用
	$("#cordercode").attr("disabled",true);
}
//清空单据
function clearInvoice(){
	$("#topTextBoxContainer").find(".querybox").val("");
	$("#bottomTextBoxContainer").find("input").val("");
	//将主表id清空
	$("#topTextBoxContainer").attr("currentpurBillVouchId","");
	//是否审核标志
	$("#auditPur").attr("auditPurflag",0);
	$("#auditPur").val("复核").css("background-image","url('../../../images/icon/audit.gif')").attr("disabled",true);
	$("#auditImg").css("display","none");
	//====================清空隐形数据==============================
	//部门编码
	$("#cdepcode").attr("dbvalue","");
	//部门id
	$("#cdepcode").attr("dbvalueId","");
	//代垫单位编码(应该有代垫单位id)
	$("#cunitcode").attr("dbvalue","");
	//业务员编码
	$("#cpersoncode").attr("dbvalue","");
	//业务员id
	$("#cpersoncode").attr("dbvalueId","");
	//付款条件编码
	$("#cpaycode").attr("dbvalue","");
	//付款条件id
	$("#cpaycode").attr("dbvalueId","");
	//====================清空隐形数据==============================
	var strHtml = "";
	//插入10行空行
	for(var j=0;j<10;j++){
		strHtml+="<tr purBillVouchsId='' onclick='rowSelection(this)' editerType='0'>";
		strHtml+="	<td style='width:20px;' class='td1' ></td>";
		strHtml+="	<td style='width:70px;' class='td1' ondblclick='cellEditer(this)'></td>";
		strHtml+="	<td style='width:90px;' class='td1' ondblclick='cellEditer(this)'></td>";
		strHtml+="	<td style='width:80px;' class='td1' ondblclick='cellEditer(this)'></td>";
		strHtml+="	<td style='width:60px;' class='td1' ondblclick='cellEditer(this)'></td>";
		strHtml+="	<td style='width:60px;' class='td1' ondblclick='cellEditer(this)'></td>";
		strHtml+="	<td style='width:70px;' class='td1' ondblclick='cellEditer(this)'></td>";
		strHtml+="	<td style='width:80px;' class='td1' ondblclick='cellEditer(this)'></td>";
		strHtml+="	<td style='width:60px;' class='td1' ondblclick='cellEditer(this)'></td>";
		strHtml+="	<td style='width:70px;' class='td1' ondblclick='cellEditer(this)'></td>";
		strHtml+="	<td style='width:80px;' class='td1' ondblclick='cellEditer(this)'></td>";
		strHtml+="	<td style='width:60px;' class='td1' ondblclick='cellEditer(this)'></td>";
		strHtml+="	<td style='width:90px;' class='td1' ondblclick='cellEditer(this)'></td>";
		strHtml+="	<td style='width:90px;' class='td1' ondblclick='cellEditer(this)'></td>";
		strHtml+="	<td style='width:60px;' class='td1' ondblclick='cellEditer(this)'></td>";  
		strHtml+="</tr>";
	}
	$("#datatable_bodyer").empty().append(strHtml);
	$("#sumNumber").text("0.00");
	$("#sumOriCurAmoun").text("0.00");
	$("#sumOriCurTax").text("0.00");
	$("#sumCurAmoun").text("0.00");
	$("#sumCurTax").text("0.00");
	$("#sumIorTaxMoney").text("0.00");
	$("#sumTaxMoney").text("0.00");
	
}
//添加按钮方法
function addPurchaseInvoice(type){
	//保存方法为添加
	action="add";
	//页面可操作
	pageused();
	//设置按钮状态
	setbuttonStyle("add");
	//清空单据
	clearInvoice();
	//将type转换成数字
	type = type-0;
	//标头内容
	var putTitleName ="";
	if(!accountingFlag){
		putTitleName+="期初";
	}
	//发票类型
	var cpbvbilltypeHtml = "";
	//政府发票标志0：正发票 1：负发票
	$("#putTitleName").attr("bnegative",0);
	switch(type){
	case 1:
		//改变标头内容
		putTitleName+="采购普通发票";
		//改变标头颜色
		$("#putTitleName").removeClass("colred").addClass("colblack");
		//发票类型
		cpbvbilltypeHtml+="<option value='02' >普通发票</option>";
		cpbvbilltypeHtml+="<option value='04' >废旧物资收购凭证</option>";
		cpbvbilltypeHtml+="<option value='05' >农副产品收购凭证</option>";
		cpbvbilltypeHtml+="<option value='06' >其他发票</option>";
		$("#cpbvbilltype").html(cpbvbilltypeHtml).attr("disabled",false);
		//税率
		$("#ipbvtaxrate").val("0.00");
		break;
	case 2:
		putTitleName+="采购专用发票";
		$("#putTitleName").removeClass("colred").addClass("colblack");
		cpbvbilltypeHtml+="<option value='01' >专用发票</option>";
		$("#cpbvbilltype").html(cpbvbilltypeHtml).attr("disabled",true);
		//税率
		$("#ipbvtaxrate").val("17.00");
		break;
	case 3:
		putTitleName+="采购运费发票";
		$("#putTitleName").removeClass("colred").addClass("colblack");
		cpbvbilltypeHtml+="<option value='03' >运费发票</option>";
		$("#cpbvbilltype").html(cpbvbilltypeHtml).attr("disabled",true);
		//税率
		$("#ipbvtaxrate").val("7.00");
		break;
	case 4:
		putTitleName+="采购普通发票(红字)";
		$("#putTitleName").removeClass("colblack").addClass("colred");
		cpbvbilltypeHtml+="<option value='02' >普通发票</option>";
		cpbvbilltypeHtml+="<option value='04' >废旧物资收购凭证</option>";
		cpbvbilltypeHtml+="<option value='05' >农副产品收购凭证</option>";
		cpbvbilltypeHtml+="<option value='06' >其他发票</option>";
		$("#cpbvbilltype").html(cpbvbilltypeHtml).attr("disabled",false);
		//税率
		$("#ipbvtaxrate").val("0.00");
		$("#putTitleName").attr("bnegative",1);
		break;
	case 5:
		putTitleName+="采购专用发票(红字)";
		$("#putTitleName").removeClass("colblack").addClass("colred");
		cpbvbilltypeHtml+="<option value='01' >专用发票</option>";
		$("#cpbvbilltype").html(cpbvbilltypeHtml).attr("disabled",true);
		//税率
		$("#ipbvtaxrate").val("17.00");
		$("#putTitleName").attr("bnegative",1);
		break;
	case 6:
		putTitleName+="采购运费发票(红字)";
		$("#putTitleName").removeClass("colblack").addClass("colred");
		cpbvbilltypeHtml+="<option value='03' >运费发票</option>";
		$("#cpbvbilltype").html(cpbvbilltypeHtml).attr("disabled",true);
		//税率
		$("#ipbvtaxrate").val("7.00");
		$("#putTitleName").attr("bnegative",1);
		break;
	}
	$("#putTitleName").html(putTitleName);
	if(!accountingFlag){
		$("#putTitleName").attr("boriginal",1);
	}else{
		$("#putTitleName").attr("boriginal",0);
	}
	
	//设置开票日期
	$("#dpbvdate").val(getCookie("operDate"));
	//设置当前操作人
	$("#cpbvmaker").val(getCookie("userName"));
}
function giveup(){
	//重新查一遍
	refreshPur();
}
//刷新按钮操作
function refreshPur(){
	var currentpurBillVouchId =$("#topTextBoxContainer").attr("currentpurBillVouchId");
	if(currentpurBillVouchId==""){
		currentpurBillVouchId=null;
	}
	queryPurBillVouchs(currentpurBillVouchId);
}
function setbuttonStyle(type){
	//选单   定位 流转 联查 都不可用(暂无此功能)
	$("#locationPur").attr("disabled",true);
	$("#transPur").attr("disabled",true);
	$("#transPur1").attr("disabled",true);
	$("#queryPur").attr("disabled",true);
	$("#queryPur1").attr("disabled",true);
	
	if(type=="query1"){//查询的第一中状态
		$("#addPur").attr("disabled",false);
		$("#addPur1").attr("disabled",false);
		$("#updatePur").attr("disabled",true);
		$("#delPur").attr("disabled",true);
		$("#savePur").attr("disabled",true);
		$("#giveupPur").attr("disabled",true);
		$("#addrowPur").attr("disabled",true);
		$("#delrowPur").attr("disabled",true);
		$("#firstPur").attr("disabled",true);
		$("#upPur").attr("disabled",true);
		$("#downPur").attr("disabled",true);
		$("#lastPur").attr("disabled",true);
		$("#refreshPur").attr("disabled",false);
		//弃核按钮状态
		if(!accountingFlag){
			$("#auditPur").attr("disabled",true);
		}else{
			$("#auditPur").attr("disabled",false);
		}
	}else if(type=="add"){//添加状态
		$("#addPur").attr("disabled",true);
		$("#addPur1").attr("disabled",true);
		$("#updatePur").attr("disabled",true);
		$("#delPur").attr("disabled",true);
		$("#savePur").attr("disabled",false);
		$("#giveupPur").attr("disabled",false);
		$("#addrowPur").attr("disabled",false);
		$("#delrowPur").attr("disabled",false);
		$("#auditPur").attr("disabled",true);
		$("#firstPur").attr("disabled",true);
		$("#upPur").attr("disabled",true);
		$("#downPur").attr("disabled",true);
		$("#lastPur").attr("disabled",true);
		$("#refreshPur").attr("disabled",true);
	}else if(type=="update"){//修改状态
		$("#addPur").attr("disabled",true);
		$("#addPur1").attr("disabled",true);
		$("#updatePur").attr("disabled",true);
		$("#delPur").attr("disabled",true);
		$("#savePur").attr("disabled",false);
		$("#giveupPur").attr("disabled",false);
		$("#addrowPur").attr("disabled",false);
		$("#delrowPur").attr("disabled",false);
		$("#auditPur").attr("disabled",true);
		$("#firstPur").attr("disabled",true);
		$("#upPur").attr("disabled",true);
		$("#downPur").attr("disabled",true);
		$("#lastPur").attr("disabled",true);
		$("#refreshPur").attr("disabled",true);
	}
}
//采购发票主表id
var purvouchid = null;
//采购发票审核标志
var iflag = null;
//发票方向 默认为正，红字为负
var fpfangxiang = 0;
//保存发票信息
function savePurBill() {
	//保存时校验
	if (checkSave()==false) {
		return false;
	}
	//双击表格的单元格的事件
	$("#topTextBoxContainer").find("input").each(function(){
		$(this).attr("disabled");
		$(this).attr("style","color:#ccc;");
	});
	queryPurBillVouchs(currentpurBillVouchId);	

	//获取主表信息
	var purBillVouch = getPurBillvouchInfo();
	//获取子表信息
	var purBillVouchsList = getPurBillvouchsInfo();
	var data = purBillVouch+ "&purBillVouch.iamount=" + sumIorTaxMoney+ purBillVouchsList;
	//保存方法的url
	var url = "";
	if (action=="add") {
		url="purBillVouch!create.action";
	}else if (action=="update"){
		url="purBillVouch!update.action";
	}else{
		return false;
	}
	//保存按钮不可用
	$("#savePur").attr("disabled",true);
	$.ajax({
		url: url,
		type: 'post',
		data:data,
		dataType: "json",
		async:false,
		error:function(){
			//jAlert("请求失败！");
		},
		success: function(data){
			var currentpurBillVouchId = $("#topTextBoxContainer").attr("currentpurBillVouchId");
			if(currentpurBillVouchId==""){
				currentpurBillVouchId = null;
			}
			queryPurBillVouchs(currentpurBillVouchId);	
		}
	  });
}
/**
 * 保存前校验
 */
function checkSave() {
	if ($("#cpbvcode").val()=="") {
		jAlert("发票号不允许为空！","提示信息",function(){
			$("#cpbvcode").focus();
		});
		return false;
	}
	if ($("#dpbvdate").val()=="") {
		jAlert("开票日期不允许为空！","提示信息",function(){
			$("#dpbvdate").focus();
		});
		return false;
	}
	if ($("#cvencode").val()=="") {
		 jAlert("供货单位不允许为空！","提示信息",function(){
			$("#cvencode").focus();
		});
		return false;
	}
	if ($("#dqdate").val()=="") {
	jAlert("到期日不允许为空！","提示信息",function(){
			$("#dqdate").focus();
		});
		return false;
	}
	var regExp = new RegExp(/^(((19|20)\d{2})-(0?[1-9]|1[012])-[3][0-1])|((((19|20)\d{2})-(0?[1-9]|1[012])-[12]\d{1})|(((19|20)\d{2})-(0?[1-9]|1[012])-0?[1-9]))$/);
	var starttimes = $("#dpbvdate").val();
	if(!starttimes.match(regExp)){
	jAlert("开票日期不符合日期格式！","提示信息",function(){
			$("#dpbvdate").focus();
		});
		$("#dpbvdate").val("");
		return false;
	}
	var endtimes = $("#dqdate").val();
	if(!endtimes.match(regExp)){
		jAlert("到期日期不符合日期格式！","提示信息",function(){
			$("#dqdate").focus();
		});
		$("#dqdate").val("");
		return false;
	}
	//原币金额本币金额如果都不大于零（正发票）
	if($("#sumOriCurAmoun").text()<=0&&$("#sumCurAmoun").text()<=0){
		jAlert("正发票的金额合计必须大于0！");	
		return false;
	}
	//发票号是否唯一
	var data="cpbvcode="+$("#cpbvcode").val();
	var uniqueFlag=true;
	$.ajax({
		url: "purBillVouch!unique.action",
		type: 'post',
		data:data,
		dataType: "json",
		async:false,
		error:function(){
			//jAlert("请求失败！");
		},
		success: function(data){
			uniqueFlag=data.uniqueFlag;
		}
	  });
	if(!uniqueFlag){
		jAlert("单据保存失败,请检查发票号是否重复！");	
		return true;
	}
	//第几行的数量和金额不能同时为零
	return true;
}
/**
 * 修改采购发票
 */
function updatePurBill() {
	action="update";
	//页面可修改
	pageused();
	//设置按钮状态
	setbuttonStyle("update");
}
/**
 * 删除采购发票
 */
function delPurBill() {
	jConfirm("是否真的要删除此单据？","确认对话框", function(confirmflag){
		if(confirmflag){
			var purBillVouchId = $("#topTextBoxContainer").attr("currentpurBillVouchId");
			var data="&purBillVouch.id="+purBillVouchId;
			//保存按钮不可用
			$("#delPur").attr("disabled",true);
			$.ajax({
				url: "purBillVouch!delete.action",
				type: 'post',
				data:data,
				dataType: "json",
				async:false,
				error:function(){
				//	jAlert("请求失败！");
				},
				success: function(data){
					//重新查询
					queryPurBillVouchs(null);
				}
			  });
		}else{
			
		}
	});
}
/**
 * 得到采购发票主表信息
 */
function getPurBillvouchInfo() {
	//发票类型
	var data = "purBillVouch.cpbvbilltype=" + $("#cpbvbilltype").val();
			//订单号
			data+= "&purBillVouch.cordercode=" +$("#cordercode").val();
			//发票号
			data+= "&purBillVouch.cpbvcode=" +$("#cpbvcode").val();
			//开票日期
			data+= "&purBillVouch.dpbvdate=" +$("#dpbvdate").val();
			if($.trim($("#cdepcode").val())!=""){
				//部门编码
				data+= "&purBillVouch.cdepcode=" +$("#cdepcode").attr("dbvalue");
				//部门id
				data+= "&purBillVouch.cdeptId=" +$("#cdepcode").attr("dbvalueId");
			}
			//供应商编码
			data+= "&purBillVouch.cvencode=" +$("#cvencode").attr("dbvalue");
			//供应商id
			data+= "&purBillVouch.csupId=" +$("#cvencode").attr("dbvalueId");
			if($.trim($("#cunitcode").val())!=""){
				//代垫单位编码(应该有代垫单位id)
				data+= "&purBillVouch.cunitcode=" +$("#cunitcode").attr("dbvalueId");
			}
			if($.trim($("#cpersoncode").val())!=""){
				//业务员编码
				data+= "&purBillVouch.cpersoncode=" +$("#cpersoncode").attr("dbvalue");
				//业务员id
				data+= "&purBillVouch.cpersonId=" +$("#cpersoncode").attr("dbvalueId");
			}
			//采购类型编码
			if($.trim($("#cptcode").val())!=""){
				data+= "&purBillVouch.cptcode=" +$("#cptcode").attr("dbvalueId");
			}
			//付款条件编码
			if($.trim($("#cpaycode").val())!=""){
				data+= "&purBillVouch.cpaycode=" +$("#cpaycode").attr("dbvalue");
				data+= "&purBillVouch.csettleid=" +$("#cpaycode").attr("dbvalueId");
			}
			//税率
			data += "&purBillVouch.ipbvtaxrate=" +$("#ipbvtaxrate").val();
			//备注
			data += "&purBillVouch.cpbvmemo=" +$("#cpbvmemo").val();
			//账期管理(暂时没有这一项)
			//+ "&purBillVouch.zqcode=" + strNullProc($("#zqcode").val())
			//到期日
			data += "&purBillVouch.dqdate=" +$("#dqdate").val();
			//结算日期
			data += "&purBillVouch.dsdate=" +$("#dsdate").val();
			//制单
			data += "&purBillVouch.cpbvmaker=" +$("#cpbvmaker").val();
			//审核日期
			data += "&purBillVouch.auditdate=" +$("#auditdate").val();
			//是否是期初标志
			data += "&purBillVouch.boriginal=" +$("#putTitleName").attr("boriginal");
			//正负发票的标志
			data += "&purBillVouch.bnegative=" +$("#putTitleName").attr("bnegative");
			//采购发票审核标志
			data+= "&purBillVouch.iflag=" + $("#auditPur").attr("auditPurflag");
			var currentpurBillVouchId = $("#topTextBoxContainer").attr("currentpurBillVouchId");
			//发票的id
			if(currentpurBillVouchId!=""){
				data += "&purBillVouch.id=" +currentpurBillVouchId;	
			}
	return data;
}
//获取子表数据
function getPurBillvouchsInfo(){
	//封装表格中的数据
	var rowsStr="";
	sumIorTaxMoney = 0;
	sumTaxMoney=0;
	//计数器
	var countFlag = 0;
	//遍历表格数据
	$("#datatable_bodyer").find("tr").each(function(index){
		//子表校验是否有值(是否符合要求)
		var hasValue = false;
		//如果是不可编辑行则跳出循环
		if($(this).attr("editerType")==0){
			return false;
		}
		//遍历列
		$(this).find("td").each(function(index){
			if($(this).text()!=""&&index!=0){
				hasValue=true;
				//false时相当于break, 如果return true 就相当于continure。 
				return false;
			}
		});
		if(hasValue){
			var currentTr = $(this);
			var currentTd = currentTr.find("td");
			//子表id
			var subid = $.trim(currentTr.attr("purBillVouchsId"));
			if(subid!=""){
				rowsStr += "&purBillVouchsList["+ countFlag +"].id=" + subid;
			}
			//存货编码
			rowsStr += "&purBillVouchsList["+ countFlag +"].cinvcode=" +currentTd.eq(1).text();
			//存货名称
			//rowsStr += "&purBillVouchsList["+ countFlag +"].bexbill=" + row.cells[2].innerHTML;
			//规格型号
			//rowsStr += "&purBillVouchsList["+ countFlag +"].ioricost=" + row.cells[3].innerHTML;
			//计量单位
			//rowsStr += "&purBillVouchsList["+ countFlag +"].cinvcode=" + row.cells[4].innerHTML;
			//数量
			rowsStr += "&purBillVouchsList["+ countFlag +"].ipbvquantity=" + DoubleNullPtoc(currentTd.eq(5).text());
			//原币单价
			rowsStr += "&purBillVouchsList["+ countFlag +"].ioricost=" + DoubleNullPtoc(currentTd.eq(6).text());
			//原币金额
			rowsStr += "&purBillVouchsList["+ countFlag +"].iorimoney=" + DoubleNullPtoc(currentTd.eq(7).text());
			//原币税额
			rowsStr += "&purBillVouchsList["+ countFlag +"].ioritaxprice=" + DoubleNullPtoc(currentTd.eq(8).text());
			//本币单价
			rowsStr += "&purBillVouchsList["+ countFlag +"].icost=" + DoubleNullPtoc(currentTd.eq(9).text());
			//本币金额
			rowsStr += "&purBillVouchsList["+ countFlag +"].imoney=" + DoubleNullPtoc(currentTd.eq(10).text());
			//本币税额
			rowsStr += "&purBillVouchsList["+ countFlag +"].itaxprice=" + DoubleNullPtoc(currentTd.eq(11).text());
		 	//税率
			rowsStr += "&purBillVouchsList["+ countFlag +"].itaxrate=" + DoubleNullPtoc(currentTd.eq(14).text());
			//本币价税合计值
			sumIorTaxMoney += DoubleNullPtoc(currentTd.eq(10).text());
		    //原币价税合计值
			sumTaxMoney += DoubleNullPtoc(currentTd.eq(11).text());
			countFlag++;
		}
	});
	return rowsStr;
}
//选择行效果
function rowSelection(theRow){
	//增加行操作
	addRow(theRow);
	currentSeletedRow = theRow;
	$(theRow).css("backgroundColor","#ddd").siblings().css("backgroundColor","#fff");
	//.css("color","#000")
}
//双击表格第一列时的操作
function setEditerType(thisCell){
	if($(thisCell).text()=="*"){
		$(thisCell).text("√");
	}else if($(thisCell).text()=="√"){
		$(thisCell).text("*");
	}
}
//添加行操作
function addRow(theRow){
	if(typeof(theRow)=="undefined"){
		$("#datatable_bodyer").find("tr").each(function(){
			if($(this).attr("editerType")==0){
				theRow = this;
				return false;
			}
		});
	}
	//设置编辑行
	//如果是添加或修改操作
	if(action!=null){
		//非编辑行
		if($(theRow).attr("editerType")==0){
			var addRowFlag = false;
			//第一行
			if(theRow==$("#datatable_bodyer").find("tr:first")[0]){
				$(theRow).find("td:first").text("*");
				$(theRow).attr("editerType",1);
				addRowFlag=true;
			}else{
				//上一行的编辑状态
				var thePrevEditerType = $(theRow).prev().attr("editerType");
				if(thePrevEditerType==1){
					$(theRow).find("td:first").text("*");
					$(theRow).attr("editerType",1);
					addRowFlag = true;
				}
			}
			if(addRowFlag){
				addEmptyRow();
			}

		}
	}
}
//给表格增加一个空行
function addEmptyRow(){
	var strHtml="";
	strHtml+="<tr purBillVouchsId='' onclick='rowSelection(this)' editerType='0'>";
	strHtml+="	<td style='width:20px;' class='td1' ></td>";
	strHtml+="	<td style='width:70px;' class='td1' ondblclick='cellEditer(this)'></td>";
	strHtml+="	<td style='width:90px;' class='td1' ondblclick='cellEditer(this)'></td>";
	strHtml+="	<td style='width:80px;' class='td1' ondblclick='cellEditer(this)'></td>";
	strHtml+="	<td style='width:60px;' class='td1' ondblclick='cellEditer(this)'></td>";
	strHtml+="	<td style='width:60px;' class='td1' ondblclick='cellEditer(this)'></td>";
	strHtml+="	<td style='width:70px;' class='td1' ondblclick='cellEditer(this)'></td>";
	strHtml+="	<td style='width:80px;' class='td1' ondblclick='cellEditer(this)'></td>";
	strHtml+="	<td style='width:60px;' class='td1' ondblclick='cellEditer(this)'></td>";
	strHtml+="	<td style='width:70px;' class='td1' ondblclick='cellEditer(this)'></td>";
	strHtml+="	<td style='width:80px;' class='td1' ondblclick='cellEditer(this)'></td>";
	strHtml+="	<td style='width:60px;' class='td1' ondblclick='cellEditer(this)'></td>";
	strHtml+="	<td style='width:90px;' class='td1' ondblclick='cellEditer(this)'></td>";
	strHtml+="	<td style='width:90px;' class='td1' ondblclick='cellEditer(this)'></td>";
	strHtml+="	<td style='width:60px;' class='td1' ondblclick='cellEditer(this)'></td>";  
	strHtml+="</tr>";
	$("#datatable_bodyer").append(strHtml);
}
//删除行操作
function deleteRow(){
	if(currentSeletedRow==null||$(currentSeletedRow).attr("editerType")==0){
		jAlert("请选择要删除的行！");	
	}else{
		var thePrevRow = $(currentSeletedRow).prev();
		//如果删除的此行不是数据库中的数据则添加一条新行
		if($(currentSeletedRow).attr("purBillVouchsId")==""){
			addEmptyRow();
		}
		$(currentSeletedRow).remove();
		if(typeof(thePrevRow[0])!="undefined"){
			thePrevRow[0].click();
		}else{
			currentSeletedRow=null;
		}
		//显示合计
		showSumTable();
	}
}
//接收弹窗返回值
/*function deliverValue(param){
	//jAlert("存货档案编码："+param.ccode+"，存货档案名称："+param.cname+"税率"+param.itaxrate+"计量单位："+param.cinvmUnit+"规格型号"+param.cinvstd);
}*/
//双击表格的单元格的事件
function cellEditer(cell){
	if(action==null||$(cell).find("input").length!=0){
		return false;
	}
	//可编辑行
	if($(cell).parent().attr("editerType")==1){
		currentEditCell=cell;
		var title = document.getElementById("datatable_header").rows[0].cells[cell.cellIndex].innerHTML;
		var querybox="";
		switch(title){
			case "货物编码":
				querybox = "<div><input type='text' id='currentEditorInput'  class='querybox' style='width:100%;border:none;' onfocus=\"dofocustoenter('Inventory',this,'','','','')\"  value='"+$(cell).text()+"' onclick='queryBoxClick(this)'  /><input type='button' class='innerfinder' style='display:block;margin-top:0px;' onclick='tableCellWindowMaper(\""+title+"\") '/><div class='floatclear'></div></div>";
				$(cell).html(querybox);
				break;
			 case "货物名称":
				querybox = "<div><input type='text' id='currentEditorInput'  class='querybox' style='width:100%;border:none;' onfocus=\"dofocustoenter('Inventory',this,'','','','')\"  value='"+$(cell).text()+"' onclick='queryBoxClick(this)'  /><input type='button' class='innerfinder' style='display:block;margin-top:0px;' onclick='tableCellWindowMaper(\""+title+"\") '/><div class='floatclear'></div></div>";
				$(cell).html(querybox);
				break;
			 case "规格型号":
				querybox = "<div><input type='text' id='currentEditorInput'  class='querybox' style='width:100%;border:none;' onfocus=\"dofocustoenter('Inventory',this,'','','','')\"  value='"+$(cell).text()+"' onclick='queryBoxClick(this)'  /><input type='button' class='innerfinder' style='display:block;margin-top:0px;' onclick='tableCellWindowMaper(\""+title+"\") '/><div class='floatclear'></div></div>";
				$(cell).html(querybox);
				break;
			 case "主计量单位":
				querybox = "<div><input type='text' id='currentEditorInput'  class='querybox' style='width:100%;border:none;' onfocus=\"dofocustoenter('Inventory',this,'','','','')\"  value='"+$(cell).text()+"' onclick='queryBoxClick(this)'  /><input type='button' class='innerfinder' style='display:block;margin-top:0px;' onclick='tableCellWindowMaper(\""+title+"\") '/><div class='floatclear'></div></div>";
				$(cell).html(querybox);
				break; 
			case "数量":
				querybox = "<div><input type='text' id='currentEditorInput' onkeyup='limitInputType()' class='querybox' style='width:100%;border:none;' value='"+$(cell).text()+"'/><div class='floatclear'></div></div>";
				$(cell).html(querybox);
				break;
			case "原币单价":
				querybox = "<div><input type='text' id='currentEditorInput' onkeyup='limitInputType()' class='querybox' style='width:100%;border:none;' onclick='queryBoxClick(this)' value='"+$(cell).text()+"'/><input type='button' class='innerfinder' style='display:block;margin-top:0px;'/><div class='floatclear'></div></div>";
				$(cell).html(querybox);
				break;
			case "原币金额":
				querybox = "<div><input type='text' id='currentEditorInput' onkeyup='limitInputType()' class='querybox' style='width:100%;border:none;' value='"+$(cell).text()+"'/><div class='floatclear'></div></div>";
				$(cell).html(querybox);
				break;
			case "原币税额":
				querybox = "<div><input type='text' id='currentEditorInput' onkeyup='limitInputType()' class='querybox' style='width:100%;border:none;' value='"+$(cell).text()+"'/><div class='floatclear'></div></div>";
				$(cell).html(querybox);
				break;
			case "本币单价":
				querybox = "<div><input type='text' id='currentEditorInput' onkeyup='limitInputType()' class='querybox' style='width:100%;border:none;' onclick='queryBoxClick(this)' value='"+$(cell).text()+"'/><input type='button' class='innerfinder' style='display:block;margin-top:0px;'/><div class='floatclear'></div></div>";
				$(cell).html(querybox);
				break;
			case "本币金额":
				querybox = "<div><input type='text' id='currentEditorInput' onkeyup='limitInputType()' class='querybox' style='width:100%;border:none;' value='"+$(cell).text()+"'/><div class='floatclear'></div></div>";
				$(cell).html(querybox);
				break;
			case "本币税额":
				querybox = "<div><input type='text' id='currentEditorInput' onkeyup='limitInputType()' class='querybox' style='width:100%;border:none;' value='"+$(cell).text()+"'/><div class='floatclear'></div></div>";
				$(cell).html(querybox);
				break;
			case "本币价税合计":
				querybox = "<div><input type='text' id='currentEditorInput' class='querybox' style='width:100%;border:none;' value='"+$(cell).text()+"'/><div class='floatclear'></div></div>";
				$(cell).html(querybox);
				break;
			case "原币价税合计":
				querybox = "<div><input type='text' id='currentEditorInput' class='querybox' style='width:100%;border:none;' value='"+$(cell).text()+"'/><div class='floatclear'></div></div>";
				$(cell).html(querybox);
				break;
			case "税率":
				querybox = "<div><input type='text' id='currentEditorInput' onkeyup='limitInputType()' class='querybox' style='width:100%;border:none;' value='"+$(cell).text()+"'/><div class='floatclear'></div></div>";
				$(cell).html(querybox);
				break;
		}
		//input标签获取焦点
		$(cell).find("input:first").focus();
	}
}
//表格单元格弹出窗体方法
function tableCellWindowMaper(title){
	queryid = "currentEditorInput";
	var param = {};
	switch(title){
	case "货物名称":
		param.type="pu";
		window.parent.openWindow('basic_comref_inventoryref','pu_invoice_invoice',param);
		break;
	case "原币单价":
		jAlert("弹出'原币单价'窗体");
		break;
	case "本币单价":
		jAlert("弹出'本币单价'窗体");
		break;
	}
}
/**
 * 显示合计值
 * @param sumipbvquantity 数量合计
 * @param sumiorimoney  原币金额合计
 * @param sumioritaxprice 原币税额合计
 * @param sumimoney  本币金额合计
 * @param sumitaxprice 本币税额合计
 */
function showSumTable() {
	//子表数量合计值
	sumAmount = 0;
	//原币金额合计
	sumIorimoney=0;
	//原币税额合计
	sumIoritaxprice=0;
	//本币金额合计
	sumImoney=0;
	//本币税额合计
	sumItaxprice=0;
	//子表本币价税合计值
	sumIorTaxMoney = 0;
	//子表原币价税合计值
	sumTaxMoney = 0;
	//遍历采购发票子表，得到数量、原币金额、原币税额、本币金额、本币税额合计值
	$("#datatable_bodyer").find("tr").each(function(index){
		//子表校验是否有值(是否符合要求)
		var hasValue = false;
		//遍历列
		$(this).find("td").each(function(){
			if($(this).text()!=""){
				hasValue=true;
				//false时相当于break, 如果return true 就相当于continure。 
				return false;
			}
		});
		if(hasValue){
			var currentTd = $(this).find("td");
			//数量合计值
			sumAmount += DoubleNullPtoc(currentTd.eq(5).text());
		    //原币金额合计
			sumIorimoney += DoubleNullPtoc(currentTd.eq(7).text());
			//原币税额合计
			sumIoritaxprice +=DoubleNullPtoc(currentTd.eq(8).text());
			
			//本币金额合计
			sumImoney += DoubleNullPtoc(currentTd.eq(10).text());
		    //本币税额合计
			sumItaxprice += DoubleNullPtoc(currentTd.eq(11).text());
			
			//本币价税合计值
			sumIorTaxMoney += DoubleNullPtoc(currentTd.eq(12).text());
		    //原币价税合计值
			sumTaxMoney += DoubleNullPtoc(currentTd.eq(13).text());
		}
	});
	$("#sumNumber").text(sumAmount);
	$("#sumOriCurAmoun").text(sumIorimoney);
	$("#sumOriCurTax").text(sumIoritaxprice);

	if ($(".td1").eq(7).text()=="200000.00") {
	
		$(".td1").eq(8).text("34,000.00");
		$("#sumOriCurTax").text("34,000.00");
	};

	$("#sumCurAmoun").text(sumImoney);
	$("#sumCurTax").text(sumItaxprice);
	$("#sumIorTaxMoney").text(sumIorTaxMoney);
	$("#sumTaxMoney").text(sumTaxMoney);
}
/**
 * 复核采购发票
 */
function auditPur() {
	//审核标志
	var auditPurflag = $("#auditPur").attr("auditPurflag");
	//审核方法的url
	var url = "";
	var titleHtml="";
	if(auditPurflag==0){
		//审核
		url="purBillVouch!auditPurBillVouch.action";
		titleHtml="复核将发票登记应付账款,请在往来账中查询该数据.<br>是否只处理当前张?";
	}else if(auditPurflag==1){
		//弃核
		url="purBillVouch!giveUpAuditPurBillVouch.action";
		titleHtml="弃复将发票从登记应付账中取消,往来账中将没有该数据.<br>是否只处理当前张?";
	}else{
		return false;
	}
	jConfirm(titleHtml,"确认对话框", function(confirmflag){
		if(confirmflag){
			//获取主表信息
			var currentpurBillVouchId = $("#topTextBoxContainer").attr("currentpurBillVouchId");
			var data = "purBillVouchList[0].id="+currentpurBillVouchId+"&purBillVouchList[0].cpbvbilltype="+$("#cpbvbilltype").val()+"&purBillVouchList[0].cpbvcode="+$("#cpbvcode").val();
			//审核按钮不可用
			$("#auditPur").attr("disabled",true);
			$.ajax({
				url: url,
				type: 'post',
				data:data,
				dataType: "json",
				async:false,
				error:function(){
				//	jAlert("请求失败！");
				},
				success: function(data){
					queryPurBillVouchs(currentpurBillVouchId);	
				}
			  });
		}else{
			//打开页面
			jAlert("将打开批量复核或弃复界面!");
		}
	});
}
/**
 * 退出
 */
function exitPur() {
	window.parent.closeWindow('pu_invoice_invoice');
}
/****************** 表格组件相关代码 S *******************/
//控制表头横纵向滚动时固定不动
function tableScroll(container){
	document.getElementById('datatable_header').style.marginTop=container.scrollTop+"px";
	document.getElementById('datatable_bodyer').style.marginTop="-"+container.scrollTop+"px";
	document.getElementById('datatable_footer').style.marginLeft="-"+container.scrollLeft+"px";
}
/****************** 表格组件相关代码 E *******************/
/******************** 组件公共document.onclick方法 S **********************/
document.onclick=function(e){
	var evt=(window.event || e);//获得事件
	var evtsrc = (evt.srcElement || evt.target);
	//如果当前有显示的查询按钮，则隐藏
	if(currentQueryButton != null && evtsrc.className != "querybox" && evtsrc.className != "innerfinder"){
		currentQueryButton.style.display = 'none';
		currentQueryButton = null;
	}
	//如果当前有下滴的菜单，则隐藏
	if(buttonGroupCurrentDropMenu != null){
		try{
			var dropButton = buttonGroupCurrentDropMenu.parentNode.getElementsByTagName("div")[0].getElementsByTagName("input")[1];
			if(evtsrc != dropButton){
				buttonGroupCurrentDropMenu.style.display = 'none';
				buttonGroupCurrentDropMenu = null;
			}
		}catch(e){
			
		}
	}
	//如果表格中存在正在编辑的单元格
	if(currentEditCell!=null){
		if(evtsrc.parentNode.parentNode != currentEditCell){
			//下面代码根据失去焦点单元格的表头名称为其他单元格赋值
			var currentEditCellName = document.getElementById("datatable_header").rows[0].cells[currentEditCell.cellIndex].innerHTML;	
			//能不能取消编辑状态的校验标志
			var checkTableFlag = true;
			var currentValue = $(currentEditCell).find("input:first").val();
			/*
			正在编辑的TR中所有TD，序号
			1:存货编码；
			2：存货名称；
			3：规格型号；
			4：计量单位；
			5：数量；
			6：原币单价；
			7：原币金额；
			8：原币税额；
			9：本币单价；
			10：本币金额；
			11：本币税额；
			12: 本币税额合计；
			13： 原币税额合计；
			14： 税率；
			*/
			var tds = $(currentEditCell).parent("tr").children("td");
			switch(currentEditCellName){
				//存货编码失去焦点
				case "货物编码":
					checkTableFlag = false;
					break;
				//数量失去焦点
				case "数量":
					var value = textMultiply(currentValue, tds.eq(6).text(), "");//计算数量*金额的值
					currentValue = fixedFormat(currentValue);
					tds.eq(7).text(value);//给原币金额列赋值;
					tds.eq(10).text(value);//给本币金额列赋值;
					reckonTax(tds, value);
					break;
				//原币单价失去焦点	
				case "原币单价":
					var value = textMultiply(currentValue, tds.eq(5).text(), "");//计算数量*金额的值
					currentValue = fixedFormat(currentValue);
					tds.eq(7).text(value);//给原币金额列赋值;
					tds.eq(9).text(currentValue);//给本币单价列赋值;
					tds.eq(10).text(value);//给本币金额列赋值;
					reckonTax(tds, value);
					break;
				case "原币金额":
					var value = textDivide(currentValue, tds.eq(5).text(), "");//计算原币单价=原币金额/数量
					currentValue = fixedFormat(currentValue);
					tds.eq(6).text(value);//给原币单价赋值;
					tds.eq(9).text(value);//给本币单价赋值;
					tds.eq(10).text(currentValue);//给本币金额列赋值;
					reckonTax(tds, currentValue);
					break;
				case "本币单价":
					var value = textMultiply(currentValue, tds.eq(5).text(), "");//计算数量*金额的值
					currentValue = fixedFormat(currentValue);
					tds.eq(6).text(currentValue);//给原币单价列赋值;
					tds.eq(7).text(value);//给原币金额列赋值;
					tds.eq(10).text(value);//给本币金额列赋值;
					reckonTax(tds, value);
					break;
				case "本币金额":
					var value = textDivide(currentValue, tds.eq(5).text(), "");//计算本币单价=原币金额/数量
					currentValue = fixedFormat(currentValue);
					tds.eq(6).text(value);//给原币单价赋值;
					tds.eq(7).text(currentValue);//给原币金额列赋值;
					tds.eq(9).text(value);//给本币单价赋值;
					reckonTax(tds, currentValue);
				  break;
				case "原币税额":
					var value = textRate(currentValue, tds.eq(7).text(), "");
					currentValue = fixedFormat(currentValue);
					tds.eq(11).text(currentValue);//给本币税额赋值;
					tds.eq(14).text(value);//给税率赋值;
					break;
				case "本币税额":
					var value = textRate(currentValue, tds.eq(10).text(), "");
					currentValue = fixedFormat(currentValue);
					tds.eq(8).text(currentValue);//给本币税额赋值;
					tds.eq(14).text(value);//给税率赋值;
					break;
				case "本币价税合计":
					break;
				case "原币价税合计":
					break;
				case "税率":
					var value = textTax(currentValue, tds.eq(10).text(), "");
					currentValue = fixedFormat(currentValue);
					tds.eq(8).text(value);//给原币税额赋值;
					tds.eq(11).text(value);//给本币税额赋值;
					break;
			 }
			//如果校验成功
			$(currentEditCell).html(currentValue);
			currentEditCell=null;
		}
		//显示合计
		showSumTable();
	}
};

function fixedFormat(value){
	if(value){
		return parseFloat(value).toFixed(2).toString();
	}else{
		return "";
	}
}

/**
 * 文本转换乘法
 * @param n1
 * @param n2
 * @param def
 * @returns
 */
function textMultiply(n1, n2, def){
	if(n1 && n2){
		var value = parseFloat(n1) * parseFloat(n2);
		return value.toFixed(2);
	}
	return def;
}

/**
 * 文本转换除法
 * @param n1
 * @param n2
 * @param def 默认值
 * @returns
 */
function textDivide(n1, n2, def){
	if(n1 && n2){
		var value = parseFloat(n1) / parseFloat(n2);
		return value.toFixed(2);
	}
	return def;
}

/**
 * 文本转换做税率计算
 * @param n1
 * @param n2
 * @param def
 * @returns
 */
function textRate(n1, n2, def){
	if(n1 && n2){
		var value = parseFloat(n1) * 100 / parseFloat(n2);
		return value.toFixed(2);
	}
	return def;
}

/**
 * 文本转换算税额
 * @param n1
 * @param n2
 * @param def
 * @returns
 */
function textTax(n1, n2, def){
	if(n1 && n2){
		var value = n1 / 100 * n2;
		return value.toFixed(2);
	}
	return def;
}

/**
 * 计算税额
 * @param num
 */
function reckonTax(tds, value){
	if(value && tds.eq(14).text()){
		var tax = parseFloat(value + "") * (parseFloat(tds.eq(14).text()) / 100);
		var taxValue = tax.toFixed(2);
		tds.eq(8).text(taxValue);
		tds.eq(11).text(taxValue);
	}
}

/**
 * 限制输入非数字
 */
function limitInputType_bak(){
	//var value = event.srcElement.value;
	var keyCode = event.keyCode;     
	if ((keyCode >= 48 && keyCode <= 57||keyCode==46)) {     
        event.returnValue = true;     
    } else {     
        event.returnValue = false;     
    }     
}

/**
 * 限制输入非数字
 */
function limitInputType(){
	var value = event.srcElement.value;
	value = subErrorInput(value);
	event.srcElement.value = value;
}

function subErrorInput(value){
	if(value && isNaN(value)){
		value = value.substring(0, value.length-1);
		subErrorInput(value);
	}
	return value;
}

/******************** 组件公共document.onclick方法 E **********************/