/**
 * 
 * @DESCRIBE   销售成本结转列表界面js
 * @AUTHOR     王丙建
 * @DATE       2013-07-24
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


/**
 * 显示销售成本结转一览表
 */

//销售成本结转对象；
var costTransDataList = null;
function showCostgrid() {
	var param = valueObject.paramObject;	
	$.ajax({
		url: 'glSaleBautotran!showSaleTransGrid.action',
		type: 'post',
		data: param,
		dataType: "json",
		success: function(data){
	      //costTransData = data.costTransData;
	      costTransDataList = data.costTransDataList;
	      initCostgrid(costTransDataList);
		}
	});
}

/**
 * 初始化销售成本一览表
 * @param costTransData
 */
function initCostgrid(costTransDataList) {
	$("#right_table_title").html("");
	var length = costTransDataList.length;
	for (var i = 0; i<length; i++) {
		var costTransData = costTransDataList[i];
		
		//凭证类字
		$("#csigntext").html(costTransData.csigntext);
		if (i==0) {
		    //库存科目
			var curkcCode = costTransData.kcCode;
			curkcCode = curkcCode.substr(0,4);
			var curkcCodeName = getCurCodeObj(curkcCode).ccodeName;
			$("#kcCode").html(curkcCode);
			$("#kcCodename").html(curkcCodeName);
		    
			//收入科目
			var cursrCode = costTransData.srCode;
			cursrCode = cursrCode.substr(0,4);
			var cursrCodeName = getCurCodeObj(cursrCode).ccodeName;
			
			$("#srCode").html(cursrCode);
			$("#srCodename").html(cursrCodeName);
			
			//显示标题
			
			var titleMsg = '<tr  >'
				          + '<td  width="150">成本科目名称</td>'
				          + '<td width="100">计量单位</td>';
			//部门核算
			if (strNullProc(costTransData.deptcode)!="") {
				titleMsg = titleMsg 
				+'<td  width="150">部门编码</td>'
				+'<td width="100">部门名称</td>';
				
			}
			//个人核算
			if (strNullProc(costTransData.personcode)!="") {
				titleMsg = titleMsg 
				+'<td  width="150">个人编码</td>'
				+'<td width="100">个人名称</td>';
			}
			
			
			//客户核算
			if (strNullProc(costTransData.cuscode)!="") {
				titleMsg = titleMsg 
				+'<td  width="150">客户编码</td>'
				+'<td width="100">客户名称</td>';
			}
			//供应商核算
			if (strNullProc(costTransData.supcode)!="") {
				titleMsg = titleMsg 
				+'<td  width="150">供应商编码</td>'
				+'<td width="100">供应商名称</td>';
			}
			
			//项目核算
			if (strNullProc(costTransData.itemcode)!="") {
				titleMsg = titleMsg 
				+'<td  width="150">项目编码</td>'
				+'<td width="100">项目名称</td>';
			}
			titleMsg = titleMsg 
			+'<td width="100">销售数量</td>'
			+'<td width="100" >销售金额</td>'
			+'<td width="100">库存数量</td>'
			+'<td width="100">库存金额</td>'
			+'<td width="100">应转数量</td>'
			+'<td width="100">平均单价</td>'
			+'<td width="100">应转金额</td>'
			+'<td width="150" >库存科目编码</td>'
			+'<td width="150">库存科目名称</td>'
			+'<td width="100">是否结转</td>'
			+ '</tr>';
			$("#right_table_title").append(titleMsg);
			
		}
		
		//销售成本一览表数值显示
		$("#left_table_datarows").append('<tr isAudited="false"  id="' +costTransData.cbCode  
				+ '"  style="background-color:#FFFFFF">'
				+'<td width="150" >'+ costTransData.cbCode  + '</td>'
				+'</tr>');
		
		var datarowsMsg = '<tr isAudited="false"  id="'+costTransData.cbCode  
						+ '"  style="background-color:#FFFFFF">'
						//成本科目名称
						+'<td width="150" ondblClick="selectTd(this)" >'+ strNullProc(costTransData.cbCodename) + '</td>'
						//计量单位
						+'<td width="100" ondblClick="selectTd(this)">'+ strNullProc(costTransData.jlunit  )+ '</td>';
		//部门核算
		if (strNullProc(costTransData.deptcode)!="") {
			
			datarowsMsg = datarowsMsg
			//部门编码
			+'<td width="100" ondblClick="selectTd(this)">'+ strNullProc(costTransData.deptcode  ) + '</td>'
		
			+'<td width="100" ondblClick="selectTd(this)">'+ strNullProc(costTransData.deptname  ) + '</td>';
			
		}
		//个人核算
		if (strNullProc(costTransData.personcode)!="") {
			
			datarowsMsg = datarowsMsg
				//个人编码
			+'<td width="100" ondblClick="selectTd(this)">'+ strNullProc(costTransData.personcode  ) + '</td>'
			//个人名称
			+'<td width="100" ondblClick="selectTd(this)">'+ strNullProc(costTransData.personname  ) + '</td>';
			
		}
		
		
		//客户核算
		if (strNullProc(costTransData.cuscode)!="") {
			
			datarowsMsg = datarowsMsg
			//客户编码
			+'<td width="100" ondblClick="selectTd(this)">'+ strNullProc(costTransData.cuscode  ) + '</td>'
			//客户名称
			+'<td width="100" ondblClick="selectTd(this)">'+ strNullProc(costTransData.cusname  ) + '</td>';
			
		}
		//供应商核算
		if (strNullProc(costTransData.supcode)!="") {
			
			datarowsMsg = datarowsMsg
			//供应商编码
			+'<td width="100" ondblClick="selectTd(this)">'+ strNullProc(costTransData.supcode  ) + '</td>'
			//供应商名称
			+'<td width="100" ondblClick="selectTd(this)">'+ strNullProc(costTransData.supname  ) + '</td>';
		
		}
		
		//项目核算
		if (strNullProc(costTransData.itemcode)!="") {
			
			datarowsMsg = datarowsMsg
			//项目编码
			+'<td width="100" ondblClick="selectTd(this)">'+ strNullProc(costTransData.itemcode  ) + '</td>'
			//项目名称
			+'<td width="100" ondblClick="selectTd(this)">'+ strNullProc(costTransData.itemname  ) + '</td>';
			
		}
		
		datarowsMsg = datarowsMsg 
		//销售数量
		+'<td width="100" ondblClick="selectTd(this)">'+ strZeroProc(costTransData.saleNumber  ) + '</td>'				
		//销售金额
		+'<td width="100" ondblClick="selectTd(this)">'+ strZeroProc(Math.abs(costTransData.saleMoney)  ) + '</td>'				
		//库存数量
		+'<td width="100" ondblClick="selectTd(this)">'+ strZeroProc(costTransData.kcNumber  ) + '</td>'				
		//库存金额
		+'<td width="100" ondblClick="selectTd(this)">'+ strZeroProc(costTransData.kcMoney  ) + '</td>'				
		//应转数量
		+'<td width="100" ondblClick="selectTd(this)">'+ strZeroProc(costTransData.transNumber  ) + '</td>'				
		//平均单价
		+'<td width="100" ondblClick="selectTd(this)">'+ strZeroProc(costTransData.avgPrice  ) + '</td>'				
		//应转金额
		+'<td width="100" ondblClick="selectTd(this)">'+ strZeroProc(costTransData.transMoney  ) + '</td>'				
		//库存科目编码
		+'<td width="150" ondblClick="selectTd(this)">'+ strNullProc(costTransData.kcCode  ) + '</td>'				
		//库存科目名称
		+'<td width="150" ondblClick="selectTd(this)">'+ strNullProc(costTransData.kcCodename  ) + '</td>'				
		//是否结转
		+'<td width="100" ondblClick="selectTd(this)">'+  '</td>'				
		
		+'</tr>';
		
		
		
		$("#right_table_datarows").append(datarowsMsg);
		
		
				
		
				
	}
}


/**
 * 双击事件
 * @param td
 */
var clickBz = true; //双击标志
function selectTd(td) {
		if (clickBz) {
			
			 var row = td.parentNode;
			 var celllength = row.cells.length;
			 row.cells[celllength-1].innerHTML = "Y";
			 $(row).css("background-color","#c0ffc0");
			 clickBz = false;
		 }
		 else {
			 var row = td.parentNode;
			 var celllength = row.cells.length;
			 row.cells[celllength-1].innerHTML = "";
			 
			 $(row).css("background-color","#FFFFFF");
			 clickBz = true;
		 } 
	
	
	
	
		 
}


/**
 * 开始销售成本结转
 */
function beginCostTrans() {
	
	if (clickBz==true) {
		jAlert("你还没有选择销售成本！","提示");
		return;
	}
	var sumTransNumber=0;
	var sumTransMoney=0;
	var sumAvgPrice=0;
	//选择销售成本结转数组，只有选择的销售成本才进行结转
	var selectcostTransDataList = new Array();
	var tb = document.getElementById("right_table_datarows");
	//初始化子表数据
	for(var i=0;i<tb.rows.length;i++){
		var row = tb.rows[i];
		var celllength = row.cells.length;
		var selectvalue = row.cells[celllength-1].innerHTML;
		if (selectvalue=="Y") {
			var costTransData = costTransDataList[i];
			var transNumber = costTransData.transNumber;
			var transMoney  = costTransData.transMoney;
			var avgPrice   = costTransData.avgPrice;
			sumTransNumber = sumTransNumber+ transNumber;
			sumTransMoney = sumTransMoney+ transMoney;
			sumAvgPrice = sumAvgPrice+ avgPrice;
			//选择的数组增加一个元素
			selectcostTransDataList.push(costTransData);
		}
	}
	if (sumTransNumber==0 ||sumTransMoney==0 || sumAvgPrice==0 ) {
		jAlert("不能生成销售成本结转！","提示");
		return ;
	}
	var param = {};
	param.costTransDataList = selectcostTransDataList;
	param.paramObject =  valueObject.paramObject;
	param.seltype = valueObject.seltype;

	
	window.parent.openWindow('dsignBautotran','gl_transfer_costgrid',param);
	window.parent.closeWindow('gl_transfer_costgrid');
}