/**
 * @Description 余额表列表显示 -- balances.js
 * @author 李铭浩
 * @Date 2012-10-23
 * @Company	畅捷通信息技术股份有限公司
 * @Department 研发中心培教研发部
 * @Porject  EXAM
 */
var valueObject = window.parent.valueMap.get("gl_balances_balances");

var startMonth=valueObject.myAccountBean.startMonth;
var endMonth=valueObject.myAccountBean.endMonth;

$(document).ready(function(){
	amountBalances();
	var operDate=getCookie("operDate");
	var year=operDate.split('-');
	var y=year[0]+"年"+year[1]+"月";
	$("#month").html(year[0]+"."+startMonth+"-"+year[0]+"."+endMonth);
});

/**
 * 遇到数值的时候，转换成小数点后两位
 */
	function transFloat(value){
		if(value!=null && value!=""){
			if((value-0)==0){
				value="";
			}else{
				value=Math.abs(parseFloat(value)).toFixed(2);
			}
		} else if(value==null || value==""||value==undefined){
			value="";
		}
		return value;
	}

function changeModel(val){
	var value1= val.value;
	if (value1 == 2){
		foreignCurrencyAmount();
	}else if(value1 == 3){
		quantityAmountBalances();
	}else if(value1 == 4){
		numberQuantityBlances();
	}else{
		amountBalances();
	}
}
/**
 * 金额式
 */
function amountBalances(){
	$("#balance").html("");
	$("#balance").append(
		'<tr bgcolor="#CCCCCC" bordercolor="#000000">'+
			'<td rowspan="2">科目编码</td>'+
			'<td rowspan="2">科目名称</td>'+
			'<td height="20" colspan="2">期初余额</td>'+
			'<td height="20" colspan="2">本期发生</td>'+
			'<td height="20" colspan="2">期末余额</td>'+
		'</tr>'+
		'<tr bgcolor="#CCCCCC" bordercolor="#000000" background="#000000">'+
			'<td height="20">借方</td>'+
			'<td height="20">贷方</td>'+
			'<td height="20">借方</td>'+
			'<td height="20">贷方</td>'+
			'<td height="20">借方</td>'+
			'<td height="20">贷方</td>'+
		'</tr>'
	);
	$.ajax({
		url:"balances!findBalances",
		type:"post",
		data:parseParam(valueObject),
		success:function(data,status){
			var list = data.list;
			var list1 = data.list1;
			var type="";
			var s = 0;	//数组下标
			var mark="";//小计(不包括最后一个)
			var arr=new Array();//小计数组(不包括最后一个)
			//期初、期末、期中余额 合计
			var mbCount=0;
			var sumMb1Count=0;
			var sumMDCount=0;
			var sumMCCount=0;
			var sumMeCount=0;
			var sumMe1Count=0;
			var xjmb=0,xjmb1=0,xjmd=0,xjmc=0,xjme=0,xjme1=0;//小计
			if(list.length==0)return;
			$.each(list,function(index,i){
				var cclass=i.cclass;
				if (type == "") {type = cclass;}
				var str="";
				if(type == cclass){
						var a = i.mb + i.md - i.mc;
							str = "<tr><td>"+ i.ccode+"</td><td>"+ i.ccodeName; 
						if (i.mb>0) {
							str = str + "</td><td>"+ transFloat(i.mb) +"</td><td>"+ "";
							xjmb += i.mb;
						}else if(i.mb<0){
							str = str + "</td><td>"+ "" +"</td><td>"+ transFloat(i.mb);
							xjmb1 += i.mb1;
						}else{
							str = str + "</td><td>"+ "" +"</td><td>"+ "";
						}
						str = str + "</td><td>"+ transFloat(i.md) + "</td><td>"+ transFloat(i.mc);
						if (i.mb+i.md-i.mc> 0) {
							str = str + "</td><td>"+transFloat(a) + "</td><td>"+ "";
							xjme +=a;
						}else if(i.mb+i.md-i.mc< 0){
							str = str + "</td><td>"+ "" + "</td><td>"+ transFloat(a) + "</td></tr>";
							xjme1 +=a;
						}else{
							str = str + "</td><td>"+ "" + "</td><td>"+ "" + "</td></tr>";
						}
						xjmd += i.md;
						xjmc += i.mc;
						$("#balance").append(str);
					}else{
						for( var j=0;j<list1.length;j++){
							var cclass2=list1[j].cclass;
							if(cclass2.substring(0,2)==mark){
								//小计
								str = "";
								str = str + "<tr><td>"+ cclass2 +
								"</td><td>"+ "" +
								"</td><td>"+ transFloat(xjmb) +
								"</td><td>"+ transFloat(xjmb1)+
								"</td><td>"+ transFloat(xjmd)  +
								"</td><td>"+ transFloat(xjmc)  +
								"</td><td>"+ transFloat(xjme) +
								"</td><td>"+ transFloat(xjme1)+
								"</td></tr>";
								//合计
								 mbCount+=xjmb;
								 sumMb1Count+=xjmb1;
								 sumMDCount+=xjmd;
								 sumMCCount+=xjmc;
								 sumMeCount+=xjme;
								 if(xjme1<0){
									 sumMe1Count+=-xjme1;	 
								 }else{
									 sumMe1Count+=xjme1;
								 }
							  xjmb=0,xjmb1=0,xjmd=0,xjmc=0,xjme=0,xjme1=0;//清空小计为0,开始计算下一个小计
					
								var a = i.mb + i.md - i.mc;
								str = str + "<tr><td>"+ i.ccode+"</td><td>"+ i.ccodeName; 
								if (i.mb>0) {
									str = str + "</td><td>"+ transFloat(i.mb) +"</td><td>"+ "";
									xjmb += i.mb;
								}else if(i.mb<0){
									str = str + "</td><td>"+ "" +"</td><td>"+ transFloat(i.mb);
									xjmb1 += i.mb1;
								}else{
									str = str + "</td><td>"+ "" +"</td><td>"+ "";
								}
								str = str + "</td><td>"+ transFloat(i.md) + "</td><td>"+ transFloat(i.mc);
								if (i.mb+i.md-i.mc> 0) {
									str = str + "</td><td>"+ transFloat(a) + "</td><td>"+ "";
									xjme +=a;
								}else if(i.mb+i.md-i.mc< 0){
									str = str + "</td><td>"+ "" + "</td><td>"+ transFloat(a) + "</td></tr>";
									xjme1 +=a;
								}else{
									str = str + "</td><td>"+ "" + "</td><td>"+ "" + "</td></tr>";
								}
								xjmd += i.md;
								xjmc += i.mc;
								$("#balance").append(str);
								type = cclass2;
								arr[s]=mark;
								s = s + 1;
							}
						}
					}
					mark=cclass;
			});
			//最后一个小计
			//alert(JSON.stringify(list1));
				for(var j=0;j<list1.length;j++){
					var cclass1=list1[j].cclass;
					var val=arr[j];
					if(val!=cclass1.substring(0,2)){
						str = "";
						str = str + "<tr><td>"+ cclass1 +
						"</td><td>"+ "" +
						"</td><td>"+ transFloat(xjmb) +
						"</td><td>"+ transFloat(xjmb1)+
						"</td><td>"+ transFloat(xjmd)  +
						"</td><td>"+ transFloat(xjmc)  +
						"</td><td>"+ transFloat(xjme) +
						"</td><td>"+ transFloat(xjme1)+
						"</td></tr>";
						$("#balance").append(str);
						/*最后一个合计*/
						 mbCount+=xjmb;
						 sumMb1Count+=xjmb1;
						 sumMDCount+=xjmd;
						 sumMCCount+=xjmc;
						 sumMeCount+=xjme;
						 if(xjme1<0){
							 sumMe1Count+=-xjme1;	 
						 }else{
							 sumMe1Count+=xjme1;
						 }
						break;
					}
				}
			//合计
			str = "";
			str = str + "<tr><td>合计" +
			"</td><td>"+ "" +
			"</td><td>"+ transFloat(mbCount) +
			"</td><td>"+ transFloat(sumMb1Count) +
			"</td><td>"+ transFloat(sumMDCount)  +
			"</td><td>"+ transFloat(sumMCCount)  +
			"</td><td>"+ transFloat(sumMeCount)  +
			"</td><td>"+ transFloat(sumMe1Count) +
			"</td></tr>";
			if(list.length==0){str="";}
			$("#balance").append(str);
		},
		dataType:"json"
	});
}

/**
 * 数量金额式
 */
function quantityAmountBalances(){
	$("#balance").html("");
	$("#balance").append(
		'<tr bgcolor="#CCCCCC" bordercolor="#000000">'+
			'<td rowspan="2">科目编码</td>'+
			'<td rowspan="2">科目名称</td>'+
			'<td rowspan="2">方向</td>'+
			'<td colspan="2">期初余额</td>'+
			'<td height="20" colspan="2">本期借方发生</td>'+
			'<td height="20" colspan="2">本期贷方发生</td>'+
			'<td height="20" rowspan="2">方向</td>'+
			'<td height="20" colspan="2">期末余额</td>'+
		'</tr>'+
		'<tr bgcolor="#CCCCCC" bordercolor="#000000" background="#000000">'+
			'<td height="20">数量</td>'+
			'<td height="20">金额</td>'+
			'<td height="20">数量</td>'+
			'<td height="20">金额</td>'+
			'<td height="20">数量</td>'+
			'<td height="20">金额</td>'+
			'<td height="20">数量</td>'+
			'<td height="20">金额</td>'+
		'</tr>'
	);
	$.ajax({
		url:"balances!findBalances",
		type:"post",
		data:parseParam(valueObject),
		success:function(data,status){
			var list = data.list;
			var list1 = data.list1;
			var str="";
			var type="";
			var s = 0;	//数组下标
			var mark="";//小计(不包括最后一个)
			var arr=new Array();//小计数组(不包括最后一个)
			//期初、期末、期中余额 合计
			var nbsCount=0;
			var mbCount=0;
			var ndsCount=0;
			var sumMDCount=0;
			var ncsCount=0;
			var sumMCCount=0;
			var nesCount=0;
			var sumMeCount=0;
			if(list.length==0)return;
			$.each(list,function(index,i){
				if (type == "") {
					type = i.cclass;
				}
				if(type == i.cclass){
					str = "";
					var neS = i.nbs + i.nds - i.ncs;
					var me = i.mb + i.md - i.mc;
					str = str + "<tr><td>" + i.ccode + 
								"</td><td>" +i.ccodeName ;
								if(i.nbs>=0){
									if(i.mb>0){
										str = str+	"</td><td>" + "借" ;	
									}else if(i.mb==0){
										str = str+	"</td><td>" + "平" ;
									}else{
										str = str+	"</td><td>" + "贷" ;
									}
								}else{
									if(i.mb>0){
										str = str+	"</td><td>" + "贷" ;	
									}else if(i.mb==0){
										str = str+	"</td><td>" + "平" ;
									}else{
										str = str+	"</td><td>" + "借" ;
									}
								}
								//"</td><td>" + i.cbegindc +
					 str = str + "</td><td>" + transFloat(i.nbs) +
								"</td><td>" + transFloat(i.mb) +
								"</td><td>" + transFloat(i.nds) +
								"</td><td>" +transFloat( i.md) +
								"</td><td>" + transFloat(i.ncs) +
								"</td><td>" + transFloat(i.mc) ;
								if(neS>=0){
									if(me>0){
										str = str+	"</td><td>" + "借" ;	
									}else if(me==0){
										str = str+	"</td><td>" + "平" ;
									}else{
										str = str+	"</td><td>" + "贷" ;
									}
								}else {
									if(me>0){
										str = str+	"</td><td>" + "贷" ;	
									}else if(me==0){
										str = str+	"</td><td>" + "平" ;
									}else{
										str = str+	"</td><td>" + "借" ;
									}
								}
								//"</td><td>" + i.cenddc +
					str = str + "</td><td>" + transFloat(neS)+
								"</td><td>" + transFloat(Math.abs(me)) +
								"</td></tr>";
					$("#balance").append(str);
				}else {
					//小计
					for(var j=0;j<list1.length;j++){
						var cclass=list1[j].cclass;
						if(cclass.substring(0,2)==mark){
							str = "";
							str = "<tr><td>" + list1[j].cclass +
								  "</td><td>" + "" ;
							if (list1[s].mb > 0) {
								str = str + "</td><td>" + "借" ;
								 mbCount +=list1[j].mb;
							}else if(list1[s].mb == 0){
								str = str + "</td><td>" + "平" ;
							}else{
								str = str + "</td><td>" + "贷" ;
								 mbCount=mbCount-Math.abs(list1[j].mb);
							}
							str = str + "</td><td>" +transFloat(list1[j].nbs) +
									  "</td><td>" + transFloat(list1[j].mb) +
									  "</td><td>" + transFloat(list1[j].nds) +
									  "</td><td>" + transFloat(list1[j].sumMD) +
									  "</td><td>" + transFloat(list1[j].ncs) +
									  "</td><td>" + transFloat(list1[j].sumMC);
							var ME=list1[s].mb+list1[s].sumMD-list1[j].sumMC;
						    if (ME >0) {
								str = str + "</td><td>" + "借" ;
							}else if(ME==0){
								str = str + "</td><td>" + "平" ;
							}else{
								str = str + "</td><td>" + "贷" ;
							}
						    str = str +  "</td><td>" + transFloat(list1[j].nes)+ 
								  "</td><td>" + transFloat(list1[j].sumMef) + 
								  "</td></tr>";
						    //合计
						     nbsCount +=list1[j].nbs;
							 ndsCount +=list1[j].nds;
							 sumMDCount +=list1[j].sumMD;
							 ncsCount +=list1[j].ncs;
							 sumMCCount +=list1[j].sumMC;
							 nesCount +=list1[j]. nes;
							var neS = i.nbs + i.nds - i.ncs;
							var me = i.mb + i.md - i.mc;
							str = str + "<tr><td>" + i.ccode + 
										"</td><td>" +i.ccodeName ;
							if(i.nbs>=0){
								if(i.mb>0){
									str = str+	"</td><td>" + "借" ;	
								}else if(i.mb==0){
									str = str+	"</td><td>" + "平" ;
								}else{
									str = str+	"</td><td>" + "贷" ;
								}
							}else{
								if(i.mb>0){
									str = str+	"</td><td>" + "贷" ;	
								}else if(i.mb==0){
									str = str+	"</td><td>" + "平" ;
								}else{
									str = str+	"</td><td>" + "借" ;
								}
							}
							//"</td><td>" + i.cbegindc +
							str += "</td><td>" + transFloat(i.nbs) +
										"</td><td>" + transFloat(i.mb) +
										"</td><td>" + transFloat(i.nds) +
										"</td><td>" + transFloat(i.md) +
										"</td><td>" + transFloat(i.ncs) +
										"</td><td>" + transFloat(i.mc) ;
										if(neS>=0){
											if(me>0){
												str = str+	"</td><td>" + "借" ;	
											}else if(me==0){
												str = str+	"</td><td>" + "平" ;
											}else{
												str = str+	"</td><td>" + "贷" ;
											}
										}else {
											if(me>0){
												str = str+	"</td><td>" + "贷" ;	
											}else if(me==0){
												str = str+	"</td><td>" + "平" ;
											}else{
												str = str+	"</td><td>" + "借" ;
											}
										}
							//			"</td><td>" + i.cenddc +
								str +=		"</td><td>" + transFloat(neS) +
										"</td><td>" + transFloat(Math.abs(me)) +
										"</td></tr>";
							$("#balance").append(str);
							type = i.cclass;
							arr[s]=mark;
							s = s + 1;
						}
					}
					
				}
				mark=i.cclass;
			});
			//最后一个小计
			for(var j=0;j<list1.length;j++){
				var cclass=list1[j].cclass;
				var val=arr[j];
				if(val!=cclass.substring(0,2)){
			           str = "";
						str = "<tr><td>" + list1[j].cclass +
							  "</td><td>" + "" ;
						if (list1[j].mb > 0) {
							str = str + "</td><td>" + "借" ;
							mbCount +=list1[j].mb;
						}else if(list1[j].mb == 0){
							str = str + "</td><td>" + "平" ;
						}else{
							str = str + "</td><td>" + "贷" ;
							mbCount=mbCount-Math.abs(list1[j].mb);
						}
						str = str + "</td><td>" + transFloat(list1[j].nbs) +
								  "</td><td>" + transFloat(list1[j].mb) +
								  "</td><td>" + transFloat(list1[j].nds) +
								  "</td><td>" + transFloat(list1[j].sumMD) +
								  "</td><td>" + transFloat(list1[j].ncs) +
								  "</td><td>" + transFloat(list1[j].sumMC);
					    if (list1[j].sumMef > 0) {
							str = str + "</td><td>" + "借" ;
						}else if(list1[j].sumMef == 0){
							str = str + "</td><td>" + "平" ;
						}else{
							str = str + "</td><td>" + "贷" ;
						}
					    str = str +  "</td><td>" + transFloat(list1[j].nes)+ 
							  "</td><td>" + transFloat(list1[j].sumMef) + 
							  "</td></tr>";
					    $("#balance").append(str);
					     nbsCount +=list1[j].nbs;
						 ndsCount +=list1[j].nds;
						 sumMDCount +=list1[j].sumMD;
						 ncsCount +=list1[j].ncs;
						 sumMCCount +=list1[j].sumMC;
						 nesCount +=list1[j]. nes;
					break;
				}
			}
			
		    //合计
		    str = "";
			str = "<tr><td> 合计" +
				  "</td><td>" + "" ;
			if (mbCount>0) {
				str = str + "</td><td>" + "借" ;
			}else if(mbCount==0){
				str = str + "</td><td>" + "平" ;
			}
			else{
				str = str + "</td><td>" + "贷" ;
			}
			str = str + "</td><td>" + transFloat(nbsCount) +
					  "</td><td>" + transFloat(mbCount) +
					  "</td><td>" + transFloat(ndsCount) +
					  "</td><td>" + transFloat(sumMDCount) +
					  "</td><td>" + transFloat(ncsCount) +
					  "</td><td>" + transFloat(sumMCCount);
			 sumMeCount=mbCount+sumMDCount-sumMCCount;//外币期末合计=期初+本期借-本期贷
			    if (sumMeCount>0) {
					str = str + "</td><td>" + "借" ;
				}else if(sumMeCount==0){
					str = str + "</td><td>" + "平" ;
				}else{
					str = str + "</td><td>" + "贷" ;
				}
		    str = str +  "</td><td>" + transFloat(nesCount)+ 
				  "</td><td>" + transFloat(sumMeCount) + 
				  "</td></tr>";
		    if(list.length==0){str="";}
		    $("#balance").append(str);
		    
		},
		dataType:"json"
	});
}

/**
 * 外币金额式
 */
function foreignCurrencyAmount(){
	$("#balance").html("");
	$("#balance").append(
		'<tr bgcolor="#CCCCCC" bordercolor="#000000">'+
			'<td rowspan="2">科目编码</td>'+
			'<td rowspan="2">科目名称</td>'+
			'<td rowspan="2">方向</td>'+
			'<td colspan="2">期初余额</td>'+
			'<td height="20" colspan="2">本期借方发生</td>'+
			'<td height="20" colspan="2">本期贷方发生</td>'+
			'<td height="20" rowspan="2">方向</td>'+
			'<td height="20" colspan="2">期末余额</td>'+
		'</tr>'+
		'<tr bgcolor="#CCCCCC" bordercolor="#000000" background="#000000">'+
			'<td height="20">外币</td>'+
			'<td height="20">金额</td>'+
			'<td height="20">外币</td>'+
			'<td height="20">金额</td>'+
			'<td height="20">外币</td>'+
			'<td height="20">金额</td>'+
			'<td height="20">外币</td>'+
			'<td height="20">金额</td>'+
		'</tr>'
	);
	$.ajax({
		url:"balances!findBalances",
		type:"post",
		data:parseParam(valueObject),
		success:function(data,status){
			var list = data.list;
			var list1 = data.list1;
			var str = "";
			var type="";
			var s = 0;	//数组下标
			var mark="";//小计(不包括最后一个)
			var arr=new Array();//小计数组(不包括最后一个)
			//期初、期末、期中余额 合计
			var nbsCount=0;
			var mbCount=0;//期初外币金额合计
			var ndsCount=0;
			var sumMDCount=0;//本期外币金额借方合计
			var ncsCount=0;
			var sumMCCount=0;//本期 外币金额贷方合计
			var nesCount=0;
			var sumMeCount=0;//期末外币金额合计
			if(list.length==0)return;
			//alert("list1"+JSON.stringify(list1));
		//	alert("list"+JSON.stringify(list));
			$.each(list,function(index,i){
				if (type == "") {
					type = i.cclass;
				}
				if(type == i.cclass){
					str = "";
					var neS = i.nbs + i.nds - i.ncs;
					var me = i.mb + i.md- i.mc;
					str = str + "<tr><td>" + i.ccode + 
								"</td><td>" +i.ccodeName ;
					if(i.mbF>=0){
						if(i.mb>0){
							str = str+	"</td><td>" + "借" ;	
						}else if(i.mb==0){
							str = str+	"</td><td>" + "平" ;
						}else{
							str = str+	"</td><td>" + "贷" ;
						}
					}else if(i.mbF<0){
						if(i.mb>0){
							str = str+	"</td><td>" + "贷" ;	
						}else if(i.mb==0){
							str = str+	"</td><td>" + "平" ;
						}else{
							str = str+	"</td><td>" + "借" ;
						}
					}
					str = str+ "</td><td>" + transFloat(i.nbs) +
								"</td><td>" + transFloat(i.mb) +
								"</td><td>" + transFloat(i.nds) +
								"</td><td>" + transFloat(i.md) +
								"</td><td>" + transFloat(i.ncs) +
								"</td><td>" + transFloat(i.mc) ;
					 me = i.mb + i.md - i.mc;
					if(i.meF>=0){
						if(me>0){
							str = str+	"</td><td>" + "借" ;	
						}else if(me==0){
							str = str+	"</td><td>" + "平" ;
						}else{
							str = str+	"</td><td>" + "贷" ;
						}
					}else {
						if(me>0){
							str = str+	"</td><td>" + "贷" ;	
						}else if(me==0){
							str = str+	"</td><td>" + "平" ;
						}else{
							str = str+	"</td><td>" + "借" ;
						}
					}
					str =str+"</td><td>" + transFloat(neS) +
								"</td><td>" + transFloat(me) +
								"</td></tr>";
					$("#balance").append(str);
				}else {
					//小计
					for(var j=0;j<list1.length;j++){
						var cclass=list1[j].cclass;
						if(cclass.substring(0,2)==mark){
							str = "";
							str = "<tr><td>" + list1[j].cclass +
								  "</td><td>" + "" ;
							if (list1[j].mb > 0) {
								str = str + "</td><td>" + "借" ;
								 mbCount +=transFloat(list1[j].mb);
							}else if(list1[j].mb == 0){
								str = str + "</td><td>" + "平" ;
							}else{
								str = str + "</td><td>" + "贷" ;
								 mbCount=mbCount-Math.abs(list1[j].mb);
							}
							str = str + "</td><td>" + transFloat(list1[j].nbs) +
									  "</td><td>" + transFloat(list1[j].mb) +
									  "</td><td>" + transFloat(list1[j].nds) +
									  "</td><td>" + transFloat(list1[j].sumMD) +
									  "</td><td>" + transFloat(list1[j].ncs) +
									  "</td><td>" + transFloat(list1[j].sumMC);
							var ME=list1[j].mb+list1[j].sumMD-list1[j].sumMC;
						    if (ME >0) {
								str = str + "</td><td>" + "借" ;
							}else if(ME==0){
								str = str + "</td><td>" + "平" ;
							}else{
								str = str + "</td><td>" + "贷" ;
							}
						    str = str +  "</td><td>" + transFloat(list1[j].nes)+ 
								  "</td><td>" + transFloat(list1[j].sumMef) + 
								  "</td></tr>";
						    //合计
						     nbsCount +=list1[j].nbs;
							 ndsCount +=list1[j].nds;
							 sumMDCount +=list1[j].sumMD;
							 ncsCount +=list1[j].ncs;
							 sumMCCount +=list1[j].sumMC;
							 nesCount +=list1[j].nes;
							 neS = i.nbs + i.nds - i.ncs;
							 me = i.mb + i.md - i.mc;
							 
							str = str + "<tr><td>" + i.ccode + 
										"</td><td>" +i.ccodeName ;
							if(i.mbF>=0){//外币期初方向
								if(i.mb>0){
									str = str+	"</td><td>" + "借" ;	
								}else if(i.mb==0){
									str = str+	"</td><td>" + "平" ;
								}else{
									str = str+	"</td><td>" + "贷" ;
								}
							}else if(i.mbF<0){
								if(i.mb>0){
									str = str+	"</td><td>" + "贷" ;	
								}else if(i.mb==0){
									str = str+	"</td><td>" + "平" ;
								}else{
									str = str+	"</td><td>" + "借" ;
								}
							}
							str = str +	"</td><td>" + transFloat(i.nbs) +
										"</td><td>" + transFloat(i.mb) +
										"</td><td>" + transFloat(i.nds)+
										"</td><td>" + transFloat(i.md) +
										"</td><td>" + transFloat(i.ncs) +
										"</td><td>" + transFloat(i.mc) ;
							if(i.meF>=0){//外币期末方向
								if(me>0){
									str = str+	"</td><td>" + "借" ;	
								}else if(me==0){
									str = str+	"</td><td>" + "平" ;
								}else{
									str = str+	"</td><td>" + "贷" ;
								}
							}else if(i.meF<0){
								if(i.me>0){
									str = str+	"</td><td>" + "贷" ;	
								}else if(me==0){
									str = str+	"</td><td>" + "平" ;
								}else{
									str = str+	"</td><td>" + "借" ;
								}
							}
							str = str + "</td><td>" + transFloat(neS) +
										"</td><td>" + transFloat(me) +
										"</td></tr>";
							$("#balance").append(str);
							type = i.cclass;
							arr[s]=mark;
							s = s + 1;
						}
					}
					
				}
				mark=i.cclass;
			});
			//最后一个小计
			for(var j=0;j<list1.length;j++){
				var cclass=list1[j].cclass;
				var val=arr[j];
				if(val!=cclass.substring(0,2)){
					str = "";
					str = "<tr><td>" + list1[j].cclass +
						  "</td><td>" + "" ;
					if (list1[j].mb > 0) {
						str = str + "</td><td>" + "借" ;
					}else if(list1[j].mb == 0){
						str = str + "</td><td>" + "平" ;
					}
					else{
						str = str + "</td><td>" + "贷" ;
					}
					str = str + "</td><td>" + transFloat(list1[j].nbs) +
							  "</td><td>" + transFloat(list1[j].mb) +
							  "</td><td>" + transFloat(list1[j].nds) +
							  "</td><td>" + transFloat(list1[j].sumMD) +
							  "</td><td>" + transFloat(list1[j].ncs) +
							  "</td><td>" + transFloat(list1[j].sumMC);
				    if (list1[j].sumMef> 0) {
						str = str + "</td><td>" + "借" ;
					}else if(list1[j].sumMef == 0){
						str = str + "</td><td>" + "平" ;
					}else{
						str = str + "</td><td>" + "贷" ;
					}
				    str = str +  "</td><td>" + transFloat(list1[j].nes)+ 
						  "</td><td>" + transFloat(list1[j].sumMef) + 
						  "</td></tr>";
				    $("#balance").append(str);
				    //累加最后一个合计
					if (list1[j].mb >= 0) {
						 mbCount +=transFloat(list1[j].mb);
					}else{
						 mbCount=mbCount-Math.abs(list1[j].mb);
					}
				     nbsCount +=list1[j].nbs;
					 ndsCount +=list1[j].nds;
					 sumMDCount +=list1[j].sumMD;
					 ncsCount +=list1[j].ncs;
					 sumMCCount +=list1[j].sumMC;
					 nesCount +=list1[j].nes;
					break;
				}
			}
			
		    //合计
		    str = "";
			str = "<tr><td> 合计" +
				  "</td><td>" + "" ;
			if (mbCount>0) {
				str = str + "</td><td>" + "借" ;
			}else if(mbCount==0){
				str = str + "</td><td>" + "平" ;
			}
			else{
				str = str + "</td><td>" + "贷" ;
			}
			str = str + "</td><td>" +transFloat(nbsCount) +
					  "</td><td>" + transFloat(mbCount) +
					  "</td><td>" + transFloat(ndsCount) +
					  "</td><td>" + transFloat(sumMDCount) +
					  "</td><td>" + transFloat(ncsCount) +
					  "</td><td>" + transFloat(sumMCCount);
			 sumMeCount=mbCount+sumMDCount-sumMCCount;//外币期末合计=期初+本期借-本期贷
		    if (sumMeCount>0) {
				str = str + "</td><td>" + "借" ;
			}else if(sumMeCount==0){
				str = str + "</td><td>" + "平" ;
			}else{
				str = str + "</td><td>" + "贷" ;
			}
		    str = str +  "</td><td>" + transFloat(nesCount)+ 
				  "</td><td>" + transFloat(sumMeCount) + 
				  "</td></tr>";
		    if(list.length==0){str="";}
		    $("#balance").append(str);
		},
		dataType:"json"
	});
}

/**
 * 数量外币式
 */
function numberQuantityBlances(){
	$("#balance").html("");
	$("#balance").append(
		'<tr bgcolor="#CCCCCC" bordercolor="#000000">'+
			'<td rowspan="2">科目编码</td>'+
			'<td rowspan="2">科目名称</td>'+
			'<td rowspan="2">方向</td>'+
			'<td colspan="3">期初余额</td>'+
			'<td height="20" colspan="3">本期借方发生</td>'+
			'<td height="20" colspan="3">本期贷方发生</td>'+
			'<td height="20" rowspan="2">方向</td>'+
			'<td height="20" colspan="3">期末余额</td>'+
		'</tr>'+
		'<tr bgcolor="#CCCCCC" bordercolor="#000000" background="#000000">'+
			'<td height="20">外币</td>'+
			'<td height="20">数量</td>'+
			'<td height="20">金额</td>'+
			'<td height="20">外币</td>'+
			'<td height="20">数量</td>'+
			'<td height="20">金额</td>'+
			'<td height="20">外币</td>'+
			'<td height="20">数量</td>'+
			'<td height="20">金额</td>'+
			'<td height="20">外币</td>'+
			'<td height="20">数量</td>'+
			'<td height="20">金额</td>'+
		'</tr>'
	);
	$.ajax({
		url:"balances!findBalances",
		type:"post",
		data:parseParam(valueObject),
		success:function(data,status){
			var list = data.list;
			var list1 = data.list1;
			var str = "";
			var type="";
			var s = 0;	//数组下标
			var mark="";//小计(不包括最后一个)
			var arr=new Array();//小计数组(不包括最后一个)
			//期初、期末、期中余额 合计
			var nbsCount=0;
			var mbCount=0;
			var ndsCount=0;
			var sumMDCount=0;
			var ncsCount=0;
			var sumMCCount=0;
			var nesCount=0;
			var sumMeCount=0;
			var mbfCount=0;
			var mdfCount=0;
			var mcfCount=0;
			var mefCount=0;
			if(list.length==0)return;
			$.each(list,function(index,i){
				if (type == "") {
					type = i.cclass;
				}
				if(type == i.cclass){
					str = "";
					var neS = i.nbs + i.nds - i.ncs;
					var me = i.mb + i.md - i.mc;
					var meF = i.mbF + i.mdF -i.mcF;
					str = str + "<tr><td>" + i.ccode + 
					"</td><td>" +i.ccodeName ;
					if(i.mb>0){
						str += 	"</td><td>" + "借" ;	
					}else if(i.mb==0){
						str += 	"</td><td>" + "平" ;
					}else{
						str += "</td><td>" + "贷" ;
					}
					//"</td><td>" + i.cbegindc +
				str +="</td><td>" + transFloat(i.mbF) +
					"</td><td>" + transFloat(i.nbs) +
					"</td><td>" + transFloat(i.mb) +
					"</td><td>" + transFloat(i.mdF) +
					"</td><td>" + transFloat(i.nds) +
					"</td><td>" + transFloat(i.md) +
					"</td><td>" + transFloat(i.mcF) +
					"</td><td>" + transFloat(i.ncs) +
					"</td><td>" + transFloat(i.mc) ;
					if(transFloat(i.md)!=""){
						str += 	"</td><td>" + "借" ;
					}else{
						str += 	"</td><td>" + "贷" ;
					}
					//"</td><td>" + i.cenddc +
			        str += "</td><td>" + transFloat(meF) +
					"</td><td>" + transFloat(neS) +
					"</td><td>" + transFloat(me) +
					"</td></tr>";
					$("#balance").append(str);
				}else {
					//小计
					for(var j=0;j<list1.length;j++){
						var cclass=list1[j].cclass;
						if(cclass.substring(0,2)==mark){
							str = "";
							str = "<tr><td>" + list1[j].cclass +
								  "</td><td>" + "" ;
							if (list1[j].mb > 0) {
								str = str + "</td><td>" + "借" ;
								 mbCount +=list1[j].mb;
							}else if(list1[j].mb == 0){
								str = str + "</td><td>" + "平" ;
							}else{
								str = str + "</td><td>" + "贷" ;
								 mbCount=mbCount-Math.abs(list1[j].mb);
							}
							var mef = list1[j].mbf+ list1[j].mdf -list1[j].mcf;
							str = str + "</td><td>" + transFloat(list1[j].mbf) +
									  "</td><td>" + transFloat(list1[j].nbs) +
									  "</td><td>" + transFloat(list1[j].mb) +
									  "</td><td>" + transFloat(list1[j].mdf) +
									  "</td><td>" + transFloat(list1[j].nds) +
									  "</td><td>" + transFloat(list1[j].sumMD) +
									  "</td><td>" + transFloat(list1[j].mcf) +
									  "</td><td>" + transFloat(list1[j].ncs) +
									  "</td><td>" + transFloat(list1[j].sumMC);
									  "</td><td>" + transFloat(mef);
							
									  var ME=list1[j].mb+list1[j].sumMD-list1[j].sumMC;
									    if (ME >0) {
											str = str + "</td><td>" + "借" ;
										}else if(ME==0){
											str = str + "</td><td>" + "平" ;
										}else{
											str = str + "</td><td>" + "贷" ;
										}
						    str = str + "</td><td>" + transFloat(mef)+ "</td><td>" + transFloat(list1[j].nes)+ 
								  "</td><td>" + transFloat(list1[j].sumMef) + 
								  "</td></tr>";
						    //合计
						     mefCount +=mef;
						     nbsCount +=list1[j].nbs;
							 ndsCount +=list1[j].nds;
							 sumMDCount +=list1[j].sumMD;
							 ncsCount +=list1[j].ncs;
							 sumMCCount +=list1[j].sumMC;
							 nesCount +=list1[j].nes;
							 mbfCount +=list1[j].mbf;
							 mdfCount +=list1[j].mdf;
							 mcfCount +=list1[j].mcf;
							var neS = i.nbs + i.nds - i.ncs;
							var me = i.mb + i.md - i.mc;
							var meF = i.mbF + i.mdF -i.mcF;
							str = str + "<tr><td>" + i.ccode + 
							"</td><td>" +i.ccodeName ;
							if(i.mb>0){
								str += 	"</td><td>" + "借" ;	
							}else if(i.mb==0){
								str += 	"</td><td>" + "平" ;
							}else{
								str += "</td><td>" + "贷" ;
							}
					 str +="</td><td>" + transFloat(i.mbF) +
							"</td><td>" + transFloat(i.nbs) +
							"</td><td>" + transFloat(i.mb) +
							"</td><td>" + transFloat(i.mdF) +
							"</td><td>" + transFloat(i.nds) +
							"</td><td>" + transFloat(i.md) +
							"</td><td>" + transFloat(i.mcF) +
							"</td><td>" + transFloat(i.ncs) +
							"</td><td>" + transFloat(i.mc) ;
						    if(transFloat(i.md)!=""){
								str += 	"</td><td>" + "借" ;
							}else{
								str += 	"</td><td>" + "贷" ;
							}
							str += "</td><td>" + transFloat(meF) +
							"</td><td>" + transFloat(neS) +
							"</td><td>" + transFloat(me) +
							"</td></tr>";
							$("#balance").append(str);
							type = i.cclass;
							arr[s]=mark;
							s = s + 1;
							
						}
					}
					
				}
				mark=i.cclass;
			});
			//最后一个小计
			for(var j=0;j<list1.length;j++){
				var cclass=list1[j].cclass;
				var val=arr[j];
				if(val!=cclass.substring(0,2)){
					str = "";
					str = "<tr><td>" + list1[j].cclass +
						  "</td><td>" + "" ;
					if (list1[j].mb > 0) {
						str = str + "</td><td>" + "借" ;
						mbCount +=list1[j].mb;
					}else if(list1[j].mb == 0){
						str = str + "</td><td>" + "平" ;
					}else{
						str = str + "</td><td>" + "贷" ;
						mbCount=mbCount-Math.abs(list1[j].mb);
					}
					var mef = list1[j].mbf+ list1[j].mdf -list1[j].mcf;
					str = str + "</td><td>" + transFloat(list1[j].mbf) +
							  "</td><td>" + transFloat(list1[j].nbs) +
							  "</td><td>" + transFloat(list1[j].mb) +
							  "</td><td>" + transFloat(list1[j].mdf) +
							  "</td><td>" + transFloat(list1[j].nds) +
							  "</td><td>" + transFloat(list1[j].sumMD) +
							  "</td><td>" + transFloat(list1[j].mcf) +
							  "</td><td>" + transFloat(list1[j].ncs) +
							  "</td><td>" + transFloat(list1[j].sumMC);
							  
					  var ME=list1[j].mb+list1[j].sumMD-list1[j].sumMC;
					    if (ME >0) {
					    	str += "</td><td>" + "借" ;
						}else if(ME==0){
							str += "</td><td>" + "平" ;
						}else{
							str += "</td><td>" + "贷" ;
						}
				    str = str + "</td><td>" + transFloat(mef)+ "</td><td>" + transFloat(list1[j].nes)+ 
						  "</td><td>" + transFloat(list1[j].sumMef) + 
						  "</td></tr>";
				    $("#balance").append(str);
				    //最后一个合计
				     mefCount +=mef;
				     nbsCount +=list1[j].nbs;
					 ndsCount +=list1[j].nds;
					 sumMDCount +=list1[j].sumMD;
					 ncsCount +=list1[j].ncs;
					 sumMCCount +=list1[j].sumMC;
					 nesCount +=list1[j].nes;
					 mbfCount +=list1[j].mbf;
					 mdfCount +=list1[j].mdf;
					 mcfCount +=list1[j].mcf;
				    break;
				}
			}
		    //合计
		    str = "";
			str = "<tr><td> 合计" +
				  "</td><td>" + "" ;
			if (mbCount>0) {
				str = str + "</td><td>" + "借" ;
			}else if(mbCount==0){
				str = str + "</td><td>" + "平" ;
			}
			else{
				str = str + "</td><td>" + "贷" ;
			}
			str = str + "</td><td>" + transFloat(mbfCount) + 
					 "</td><td>" + transFloat(nbsCount) +
					  "</td><td>" + transFloat(mbCount) +
					  "</td><td>" + transFloat(mdfCount) +
					  "</td><td>" + transFloat(ndsCount) +
					  "</td><td>" + transFloat(sumMDCount) +
					  "</td><td>" + transFloat(mcfCount) +
					  "</td><td>" + transFloat(ncsCount) +
					  "</td><td>" + transFloat(sumMCCount);
			sumMeCount=mbCount+sumMDCount-sumMCCount;
		    if (sumMeCount>0) {
				str = str + "</td><td>" + "借" ;
			}else if(sumMeCount==0){
				str = str + "</td><td>" + "平" ;
			}else{
				str = str + "</td><td>" + "贷" ;
			}
		    str = str + "</td><td>" + transFloat(mefCount)+
		    	  "</td><td>" + transFloat(nesCount)+ 
				  "</td><td>" + transFloat(sumMeCount) + 
				  "</td></tr>";
		    if(list.length==0){str="";}
		    $("#balance").append(str);
		},
		dataType:"json"
	});
}
/**
 *  //调用：
 *  var obj={name:'tom','class':{className:'class1'},classMates:[{name:'lily'}]};
 *  parseParam(obj);
 *  结果："name=tom&class.className=class1&classMates[0].name=lily" 
 *  parseParam(obj,'stu');
 *  结果："stu.name=tom&stu.class.className=class1&stu.classMates[0].name=lily" 
 */
var parseParam=function(param, key){
	var paramStr="";
	if(param instanceof String||param instanceof Number||param instanceof Boolean){
		paramStr+="&"+key+"="+encodeURIComponent(param);
	}else{
		$.each(param,function(i){
			var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
			paramStr+='&'+parseParam(this, k);
		});
	}
	return paramStr.substr(1);
};

