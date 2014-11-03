/**
 * 总账下的期初余额 
 * 各个功能按钮弹出的页面
 */
//页面初始化
var initvalue=0.00;
var result;
var iscanupdate=true;


document.onkeyup=function(e){//回车事件
	var evt=(window.event || e);//获得事件
	if(evt.keyCode=="13"){
		if($(document).find("input:text[id!='findcode']").length==1){
			$(document).find("input:text[id!='findcode']")[0].blur();
		}
	}
};


$(document).ready(function(){
	$.ajax({
		url:"glInitial!istally",
		type:"post",
		datatype:"json",
		async:false,
		cache:false,
		success:function(data){
			var mark=data.mark;
			if(mark=="1"){
				iscanupdate=false;
			}
		}
	});
	queryAccsum();
});


var editId=null;
var glAccsumList=null;
var codes=null;
var mark=null;
var type=null;

/*
 * 填充值函数，用于弹出的期初设置窗体关闭退出时刷新本页面数据
 * 陈建宇 2013-04-02 14:30 加
 */
function setData(result){
	for(var j=0;j<result.length;j++){
		var tempre=result[j].split(":");
		if(type=="0"){
			$("td[ccode='"+tempre[0]+"mb'][mar='0']").html(donumswitch(transFloat(tempre[1])));
			$("td[ccode='"+tempre[0]+"'][mar='0']").html(donumswitch(transFloat(tempre[2])));
		}else if(type=="1"){
			$("td[ccode='"+tempre[0]+"mb'][mar='0']").html(donumswitch(transFloat(tempre[1])));
			$("td[ccode='"+tempre[0]+"'][mar='0']").html(donumswitch(transFloat(tempre[2])));
			$("td[ccode='"+tempre[0]+"mbF'][mar='1']").html(donumswitch(transFloat(tempre[3])));
			$("td[ccode='"+tempre[0]+"'][mar='1']").html(donumswitch(transFloat(tempre[4])));
		}else if(type=="2"){
			$("td[ccode='"+tempre[0]+"mb'][mar='0']").html(donumswitch(transFloat(tempre[1])));
			$("td[ccode='"+tempre[0]+"'][mar='0']").html(donumswitch(transFloat(tempre[2])));
			$("td[ccode='"+tempre[0]+"nbS'][mar='2']").html(donumswitch(transFloat(tempre[5])));
			$("td[ccode='"+tempre[0]+"'][mar='2']").html(donumswitch(transFloat(tempre[6])));
		}else if(type=="3"){
			$("td[ccode='"+tempre[0]+"mb'][mar='0']").html(donumswitch(transFloat(tempre[1])));
			$("td[ccode='"+tempre[0]+"'][mar='0']").html(donumswitch(transFloat(tempre[2])));
			$("td[ccode='"+tempre[0]+"mbF'][mar='1']").html(donumswitch(transFloat(tempre[3])));
			$("td[ccode='"+tempre[0]+"'][mar='1']").html(donumswitch(transFloat(tempre[4])));
			$("td[ccode='"+tempre[0]+"nbS'][mar='2']").html(donumswitch(transFloat(tempre[5])));
			$("td[ccode='"+tempre[0]+"'][mar='2']").html(donumswitch(transFloat(tempre[6])));
		}
	}
}



/**
 * 如果是“1”显示“借”，“0”显示“贷”
 * @param value
 * @returns {String}
 */
function bpropertyShow(value){
	if(value==1){
		return "借";
	}else if(value==0){
		return "贷";
	}
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
 * 选择行
 */
var hasSelect = null;
function selectRow(event){
	if(hasSelect!=null){
		$(hasSelect).attr("bgcolor",recoveryColor);
	}
	$(event).attr("bgcolor",clickcolor);
	hasSelect = event;

}



/**
 * 变色函数-----开始
 */
var highlightcolor='#d5f4fe';
var recoveryColor='#ffffff';
var clickcolor='#e6e6f2';
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
	td.style.border="1px dashed #ccc";
	cstd = td;
	if(td.style.backgroundColor!="#fffbca"&&td.style.backgroundColor!="#80ffff"){
		doubleSelect(td);
	}
}

/**
 * 查询当前账套的所有科目
 */
function queryCodes(){
	$.ajax({
		url:"glInitial!queryList.action",
		type:"post",
		datatype:"json",
		cache:false,
	    async:false,
		success:function(data,status){
			codes=data.codes;
			if(codes.length>0){
				for(var i=0;i<codes.length;i++){
					var id=codes[i].id;
					var bproperty=codes[i].bproperty;
					var me=null;
					var md=null;
					var mc=null;
					var mb=null;
					
					var meF=null;
					var mdF=null;
					var mcF=null;
					var mbF=null;
					
					var neS=null;
					var ndS=null;
					var ncS=null;
					var nbS=null;
					var grade = "";
					if(codes[i].igrade!=1){
						for(var k = 1;k<codes[i].igrade;k++){
							grade = grade+"&nbsp;&nbsp;";
						}
					}
					for(var j=0;j<glAccsumList.length;j++){
						if(glAccsumList[j].ccode.id==id){
							mb=glAccsumList[j].mb;
							me=glAccsumList[j].me;
							mc=glAccsumList[j].mc;
							md=glAccsumList[j].md;
							
							mbF=glAccsumList[j].mbF;
							meF=glAccsumList[j].meF;
							mcF=glAccsumList[j].mcF;
							mdF=glAccsumList[j].mdF;
							
							nbS=glAccsumList[j].nbS;
							neS=glAccsumList[j].neS;
							ncS=glAccsumList[j].ncS;
							ndS=glAccsumList[j].ndS;
							
							break;
						}
					}
					
					$("#include").append('<tr  tid ="'+codes[i].id
							+'" ccode="'+codes[i].ccode
							+'" ccodeName="'+codes[i].ccodeName
							+'" bproperty="'+codes[i].bproperty
							+'" mcurrent="'+transFloat(mb)
							+'"style="background-color:#ffffff"  onclick = "selectRow(this)">'
							+'<td style="text-align:left;width:81px">'+grade+codes[i].ccode+'</td>'
							+'<td style="text-align:left;width:177px">'+grade+codes[i].ccodeName+'</td>'
							+'<td style="text-align:center;width:45px">'+bpropertyShow(bproperty)+'</td>'
							+'<td style="width:81px;background-color:#FFFBCA" onclick="selectTd(this)"></td>'
							+'<td style="background-color:#FFFBCA;text-align:right;width:81px" mar="0"  mark="mb" onclick="selectTd(this)" ccode="'+codes[i].ccode+'mb">'+donumswitch(transFloat(mb))+'</td>'
							+'<td ondblclick="doubleSelect(this);" mar="0" onclick="selectTd(this)" mark="md" name ="'+codes[i].ccode+'" ccode="'+codes[i].ccode+'md" style="text-align:right;width:81px">'+donumswitch(transFloat(md))+'</td>'
							+'<td ondblclick="doubleSelect(this);" mar="0" onclick="selectTd(this)" mark="mc" name ="'+codes[i].ccode+'" ccode="'+codes[i].ccode+'mc" style="text-align:right;width:80px">'+donumswitch(transFloat(mc))+'</td>'
							+'<td onclick="selectTd(this)" mar="0" mark="me" name_china="'+codes[i].ccodeName+'" name ="'+codes[i].ccode+'" ccode="'+codes[i].ccode+'"  style="text-align:right;width:65px;" >'+donumswitch(transFloat(me))+'</td>'
							+'</tr>');
					if(codes[i].cexchName!=null&&codes[i].cexchName!=""&&codes[i].cexchName!="null"){//判断是否添加外币行
						$("#include").append('<tr  tid ="'+codes[i].id
								+'" ccode="'+codes[i].ccode
								+'" ccodeName="'+codes[i].ccodeName
								+'" bproperty="'+codes[i].bproperty
								+'" mcurrent="'+transFloat(mbF)
								+'"style="background-color:#ffffff"  onclick = "selectRow(this)">'
								+'<td style="text-align:left;width:81px"></td>'
								+'<td style="text-align:left;width:177px"></td>'
								+'<td style="text-align:center;width:45px">'+bpropertyShow(bproperty)+'</td>'
								+'<td style="width:81px;background-color:#FFFBCA"" onclick="selectTd(this)">'+codes[i].cexchName+'</td>'
								+'<td style="background-color:#FFFBCA;text-align:right;width:81px" mar="1" mark="mbF" onclick="selectTd(this)" ccode="'+codes[i].ccode+'mbF">'+donumswitch(transFloat(mbF))+'</td>'
								+'<td ondblclick="doubleSelect(this);" mar="1" onclick="selectTd(this)" mark="mdF" name ="'+codes[i].ccode+'" ccode="'+codes[i].ccode+'mdF" style="text-align:right;width:81px">'+donumswitch(transFloat(mdF))+'</td>'
								+'<td ondblclick="doubleSelect(this);" mar="1" onclick="selectTd(this)" mark="mcF" name ="'+codes[i].ccode+'" ccode="'+codes[i].ccode+'mcF" style="text-align:right;width:80px">'+donumswitch(transFloat(mcF))+'</td>'
								+'<td onclick="selectTd(this)" mar="1" mark="meF" name_china="'+codes[i].ccodeName+'" name ="'+codes[i].ccode+'" ccode="'+codes[i].ccode+'"  style="text-align:right;width:65px;" >'+donumswitch(transFloat(meF))+'</td>'
								+'</tr>');
					}
					if(codes[i].cmeasure!=null&&codes[i].cmeasure!=""&&codes[i].cmeasure!="null"){//判断是否添加数量行
						$("#include").append('<tr  tid ="'+codes[i].id
								+'" ccode="'+codes[i].ccode
								+'" ccodeName="'+codes[i].ccodeName
								+'" bproperty="'+codes[i].bproperty
								+'" mcurrent="'+transFloat(nbS)
								+'"style="background-color:#ffffff"  onclick = "selectRow(this)">'
								+'<td style="text-align:left;width:81px"></td>'
								+'<td style="text-align:left;width:177px"></td>'
								+'<td style="text-align:center;width:45px">'+bpropertyShow(bproperty)+'</td>'
								+'<td style="width:81px;background-color:#FFFBCA"" onclick="selectTd(this)">'+codes[i].cmeasure+'</td>'
								+'<td style="background-color:#FFFBCA;text-align:right;width:81px" mar="2" mark="nbS" onclick="selectTd(this)" ccode="'+codes[i].ccode+'nbS">'+donumswitch(transFloat(nbS))+'</td>'
								+'<td ondblclick="doubleSelect(this);" mar="2" onclick="selectTd(this)" mark="ndS" name ="'+codes[i].ccode+'" ccode="'+codes[i].ccode+'ndS" style="text-align:right;width:81px">'+donumswitch(transFloat(ndS))+'</td>'
								+'<td ondblclick="doubleSelect(this);" mar="2" onclick="selectTd(this)" mark="ncS" name ="'+codes[i].ccode+'" ccode="'+codes[i].ccode+'ncS" style="text-align:right;width:80px">'+donumswitch(transFloat(ncS))+'</td>'
								+'<td onclick="selectTd(this)" mar="2" mark="neS" name_china="'+codes[i].ccodeName+'" name ="'+codes[i].ccode+'" ccode="'+codes[i].ccode+'"  style="text-align:right;width:65px;" >'+donumswitch(transFloat(neS))+'</td>'
								+'</tr>');
					}
					if((codes[i].cexchName!=null&&codes[i].cexchName!=""&&codes[i].cexchName!="null")&&(codes[i].cmeasure==null||codes[i].cmeasure==""||codes[i].cmeasure=="null")){
						$("td[ccode='"+codes[i].ccode+"']").attr("ntyp","1");
					}else if((codes[i].cmeasure!=null&&codes[i].cmeasure!=""&&codes[i].cmeasure!="null")&&(codes[i].cexchName==null||codes[i].cexchName==""||codes[i].cexchName=="null")){
						$("td[ccode='"+codes[i].ccode+"']").attr("ntyp","2");
					}else if((codes[i].cexchName!=null&&codes[i].cexchName!=""&&codes[i].cexchName!="null")&&(codes[i].cmeasure!=null&&codes[i].cmeasure!=""&&codes[i].cmeasure!="null")){
						$("td[ccode='"+codes[i].ccode+"']").attr("ntyp","3");
					}else{
						$("td[ccode='"+codes[i].ccode+"']").attr("ntyp","0");
					}
					if(codes[i].bend==0){
						$("td[name='"+codes[i].ccode+"']").css("background-color","#FFFBCA");
						$("td[name='"+codes[i].ccode+"']").each(function(){
							this.ondblclick=function(){
								
							};
						});
					}else{
						//个人往来核算//客户往来核算//供应商往来//部门//项目核算
						if (codes[i].bperson==1||codes[i].bcus==1||codes[i].bsup==1||codes[i].bdept==1||codes[i].bitem==1){
							var mar=codes[i].bperson+":"+codes[i].bcus+":"+codes[i].bsup+":"+codes[i].bdept+":"+codes[i].bitem;
							$("td[ccode='"+codes[i].ccode+"']").css("background-color","#80FFFF");
							$("td[ccode='"+codes[i].ccode+"']").attr("marvalue",mar);
							$("td[ccode='"+codes[i].ccode+"']").each(function(){
								this.onclick=function(){
									
								};
								this.ondblclick=function(){
									doubleAccAss(this,$(this).attr("marvalue"));
								};
							});
						}else{
							$("td[ccode='"+codes[i].ccode+"']").each(function(){
								this.ondblclick=function(){
									doubleSelect(this);
								};
							});
						}
					}
				}
				
			}
		}
	});
} 

/**
 * 查询当前账套的所有科目总账
 */
function queryAccsum(){
	$.ajax({
		url:"glInitial!queryglAccsumList.action",
		type:"post",
		datatype:"json",
		cache:false,
	    async:false,
		success:function(data,status){
			glAccsumList=data.glAccsumList;
			queryCodes();
		}
	});
	
}


/**
 * 双击当前td 进行修改
 * @param row
 */
function doubleSelect(cell){
	if(!iscanupdate){
		return;
	}
	mark=$(cell).attr("mark");
	type=$(cell).attr("mar");
	var inputCount = cell.getElementsByTagName("input").length;
	editId =$(cell.parentNode).attr("tid");
	if(inputCount==0){
		initvalue=cell.innerHTML.replaceAll(",","");
		var tempValue = cell.innerHTML.replaceAll(",","");
		cell.innerHTML="<input onblur='a(this)' type='text' style='height:12px;font-size:12px;border:none;width:90%' value='"+tempValue+"'/>";
		cell.getElementsByTagName("input")[0].focus();
		cell.getElementsByTagName("input")[0].select();
	}
}

/**
 * 双击当前td 弹出辅助科目总账
 * @param row
 */
function doubleAccAss(cell,mark){
	type=$(cell).attr("ntyp");
	//获得被点击的单元格封装参数弹出窗体
	var param = new Object();
	param.cell = cell;
	param.mark = mark;
	param.iscanupdate = iscanupdate;
	window.parent.openWindow("gl_set_midoperat","gl_set_midinitial",param);
	
}

/**
 * 失去焦点后返回所修改的值
 */
function a(input){
	var tempValue = input.value;
	if(tempValue=="" || tempValue==null||(tempValue-0)==0){
		input.parentNode.innerHTML="";
	}else{
		input.parentNode.innerHTML=donumswitch(transFloat(tempValue));
	}
	if(tempValue=="" || tempValue==null){
		tempValue=0.00;
	}
	if(initvalue=="" || initvalue==null){
		initvalue=0.00;
	}
	var add_mb=tempValue-initvalue;
	if(add_mb=="" || add_mb==null||add_mb==0){
		return false;
	}
	var initial="glAccsum.ccode.id="+editId+"&add_mb="+add_mb+"&mark="+mark;
	$.ajax({
		url: "glInitial!setmidAccsum",
		type: 'post',
		data: initial,
		dataType: "json",
		cache:false,
	    async:false,
		success: function(data){
			var resultList=data.resultList;
			for(var j=0;j<resultList.length;j++){
				var tempre=resultList[j].split(":");
				if(type=="0"){
					$("td[ccode='"+tempre[0]+"mb'][mar='"+type+"']").html(donumswitch(transFloat(tempre[1])));
					$("td[ccode='"+tempre[0]+"md'][mar='"+type+"']").html(donumswitch(transFloat(tempre[2])));
					$("td[ccode='"+tempre[0]+"mc'][mar='"+type+"']").html(donumswitch(transFloat(tempre[3])));
					$("td[ccode='"+tempre[0]+"'][mar='"+type+"']").html(donumswitch(transFloat(tempre[4])));
				}else if(type=="1"){
					$("td[ccode='"+tempre[0]+"mbF'][mar='"+type+"']").html(donumswitch(transFloat(tempre[1])));
					$("td[ccode='"+tempre[0]+"mdF'][mar='"+type+"']").html(donumswitch(transFloat(tempre[2])));
					$("td[ccode='"+tempre[0]+"mcF'][mar='"+type+"']").html(donumswitch(transFloat(tempre[3])));
					$("td[ccode='"+tempre[0]+"'][mar='"+type+"']").html(donumswitch(transFloat(tempre[4])));
				}else if(type=="2"){
					$("td[ccode='"+tempre[0]+"nbS'][mar='"+type+"']").html(donumswitch(transFloat(tempre[1])));
					$("td[ccode='"+tempre[0]+"ndS'][mar='"+type+"']").html(donumswitch(transFloat(tempre[2])));
					$("td[ccode='"+tempre[0]+"ncS'][mar='"+type+"']").html(donumswitch(transFloat(tempre[3])));
					$("td[ccode='"+tempre[0]+"'][mar='"+type+"']").html(donumswitch(transFloat(tempre[4])));
				}
			}
		},
		error:function(data){
			jAlert("期初余额保存失败！","提示");
		}
	});
}


/**
 * @returns 返回值为-1时，不符合编码规则；-2时满足编码格式第一级！；其他时返回的是：第几级+"*"+父节点！
 * @param keyword
 * @param invalue
 * @returns {String}
 */
function gradeselect(keyword,invalue){
	var result="";
	$.ajax({
	    url: "gradedefAction!gradedefContrue?keyword="+keyword,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	if(data.gradedef!=null){
	    		var codingrule=data.gradedef.codingrule;
		    	var code=0;
		    	var invallength=invalue.length;
	    			for(var i=0;i<codingrule.length;i++){
		    			code=code+(codingrule.substring(i,(i+1))-0);
		    			if(code==invallength){
		    				result=(i+1)+"*"+invalue.substring(0,(code-codingrule.substring(i,(i+1))));//返回其父节点
		    				return;
		    			}
			    	}
	    		}
	    		result="-1";//不符合编码级次格式
	    	}
	    
	});
	return result;
}









/**
 * 下面开始按钮操作
 */
/**
 * 方向
 */
function fangxiang() {
	//alert("本版本暂不开发！");
}

/**
 * 试算
 */
function shisuan() {
	//alert("本版本暂不开发！");
}

/**
 * 查找
 */
function find() {
	//alert("本版本暂不开发！");
}

/**
 * 对账
 */
function duizhang() {
	//alert("本版本暂不开发！");
}

/**
 * 清零
 */
function qingling() {
	//alert("本版本暂不开发！");
}

/**
 * 退出
 */
function exit() {
	window.parent.closeWindow('gl_set_midinitial');
}




/***
 * 查找时文本框敲回车处理
 */
function findcodeKeydown(){
	var evt = window.event || arguments[0];
	var keyCode=evt.keyCode;
	
	if(keyCode==13 || keyCode==108){
		dofind();
		evt.cancelBubble=true;
	}
}





