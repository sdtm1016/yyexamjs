/**
 * 
 * @DESCRIBE   “基础设置”模块相关导航过滤器
 * @AUTHOR     陈建宇
 * @DATE       2013-03-29
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */
 




/**
 * 是否允许客户分类 供应商分类 等，允许返回true，否则返回false
 * @returns {Boolean}
 */
var isCusCategoryBz = true;
function isCusCategory(obj) {
	$.ajax({
		url:obj,
		type:"post",
		dataType:"json",
		async:false,
		success: function(data){
			isCusCategoryBz = data.isCategory;
		}
	});
}
//基础设置_往来单位_客户分类
function  bs_wldw_khfl_filter(){
	isCusCategory("customer!isCusCategory");
	if(isCusCategoryBz){
		openWindow('customerClass');
	}else{
		jAlert("客户无分类!");
	}
}
//基础设置_往来单位_供应商分类
function bs_wldw_gysfl_filter(){
	isCusCategory("vendor!isSupCategory");
	if(isCusCategoryBz){
		openWindow('vendorClass');
	}else{
		jAlert("供应商无分类!");
	}
}

//基础设置_往来单位_存货分类
function bs_wldw_chfl_filter(){
	isCusCategory("inventory!isInventoryCategory");
	if(isCusCategoryBz){
		openWindow('inventoryClass');
	}else{
		jAlert("存货无分类!");
	}
}


