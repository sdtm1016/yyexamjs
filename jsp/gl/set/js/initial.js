/**
 * 总账下的期初余额 
 * 各个功能按钮弹出的页面
 */
//页面初始化
var initvalue=0.00;//存储双击期初余额的原始值
var result;
var iscanupdate=true;

document.onkeyup=function(e){//回车事件
	var evt=(window.event || e);//获得事件
	if(evt.keyCode=="13"){
		if($(document).find("input:text[id!='findcode']").length==1){
//			var td=$(document).find("input:text[id!='findcode']").parent();
			$(document).find("input:text[id!='findcode']")[0].blur();
//			var cellindex=td[0].cellIndex;
//			var tr=td.parent();
//			var rowindex=tr[0].rowIndex;
//			tr.parent()[0].rows[rowindex+1].cells[cellindex].click();
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
var type=null;


/*
 * 填充值函数，用于弹出的期初设置窗体关闭退出时刷新本页面数据
 * 陈建宇 2013-04-02 14:30 加
 */
function setData(result){
	for(var j=0;j<result.length;j++){
		var tempre=result[j].split(":");
		if(type=="0"){
			$("td[ccode='"+tempre[0]+"'][mark='0']").html(donumswitch(transFloat(tempre[1])));
		}else if(type=="1"){
			$("td[ccode='"+tempre[0]+"'][mark='0']").html(donumswitch(transFloat(tempre[1])));
			$("td[ccode='"+tempre[0]+"'][mark='1']").html(donumswitch(transFloat(tempre[3])));
		}else if(type=="2"){
			$("td[ccode='"+tempre[0]+"'][mark='0']").html(donumswitch(transFloat(tempre[1])));
			$("td[ccode='"+tempre[0]+"'][mark='2']").html(donumswitch(transFloat(tempre[5])));
		}else if(type=="3"){
			$("td[ccode='"+tempre[0]+"'][mark='0']").html(donumswitch(transFloat(tempre[1])));
			$("td[ccode='"+tempre[0]+"'][mark='1']").html(donumswitch(transFloat(tempre[3])));
			$("td[ccode='"+tempre[0]+"'][mark='2']").html(donumswitch(transFloat(tempre[5])));
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
 * 试算平衡
 */
function btnShisuan(){
	var param = new Object();
	param.method="1";
	window.parent.openWindow('gl_set_shisuan','gl_set_initial',param);
	window.parent.setWindowTitle('gl_set_shisuan','期初试算平衡表');
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
					var mb=null;
					var grade = "";
					var mbF=null;
					var nbS=null;
					if(codes[i].igrade!=1){
						for(var k = 1;k<codes[i].igrade;k++){
							grade = grade+"&nbsp;&nbsp;";
						}
					}
					for(var j=0;j<glAccsumList.length;j++){
						if(glAccsumList[j].ccode.id==id){
							mb=glAccsumList[j].mb;
							mbF=glAccsumList[j].mbF;
							nbS=glAccsumList[j].nbS;
							break;
						}
					}
					var str='<tr  tid ="'+codes[i].id
					+'" ccode="'+codes[i].ccode
					+'" ccodeName="'+codes[i].ccodeName
					+'" bproperty="'+codes[i].bproperty
					+'" mcurrent="'+transFloat(mb)
					+'"style="background-color:#ffffff"  onclick = "selectRow(this)">'
					+'<td style="text-align:left;width:93px">'+grade+codes[i].ccode+'</td>'
					+'<td style="text-align:left;width:207px">'+grade+codes[i].ccodeName+'</td>'
					+'<td style="text-align:center;width:52px">'+bpropertyShow(bproperty)+'</td>'
					+'<td style="width:93px;background-color:#FFFBCA"></td>'
					+'<td onclick="selectTd(this)" mark="0" name_china="'+codes[i].ccodeName+'" ccode="'+codes[i].ccode+'"  style="text-align:right;width:77px" >'+donumswitch(transFloat(mb))+'</td>'
					+'</tr>';
					$("#include").append(str);
					if(codes[i].cexchName!=null&&codes[i].cexchName!=""&&codes[i].cexchName!="null"){
						var tempstr='<tr  tid ="'+codes[i].id
						+'" ccode="'+codes[i].ccode
						+'" ccodeName="'+codes[i].ccodeName
						+'" bproperty="'+codes[i].bproperty
						+'" mcurrent="'+transFloat(mbF)
						+'"style="background-color:#ffffff"  onclick = "selectRow(this)">'
						+'<td style="text-align:left;width:93px"></td>'
						+'<td style="text-align:left;width:207px"></td>'
						+'<td style="text-align:center;width:52px">'+bpropertyShow(bproperty)+'</td>'
						+'<td style="width:93px;background-color:#FFFBCA">'+codes[i].cexchName+'</td>'
						+'<td onclick="selectTd(this)" mark="1" name_china="'+codes[i].ccodeName+'" ccode="'+codes[i].ccode+'"   style="text-align:right;width:77px" >'+donumswitch(transFloat(mbF))+'</td>'
						+'</tr>';
						$("#include").append(tempstr);
					}
					if(codes[i].cmeasure!=null&&codes[i].cmeasure!=""&&codes[i].cmeasure!="null"){
						var nstr='<tr  tid ="'+codes[i].id
						+'" ccode="'+codes[i].ccode
						+'" ccodeName="'+codes[i].ccodeName
						+'" bproperty="'+codes[i].bproperty
						+'" mcurrent="'+transFloat(nbS)
						+'"style="background-color:#ffffff"  onclick = "selectRow(this)">'
						+'<td style="text-align:left;width:93px"></td>'
						+'<td style="text-align:left;width:207px"></td>'
						+'<td style="text-align:center;width:52px">'+bpropertyShow(bproperty)+'</td>'
						+'<td style="width:93px;background-color:#FFFBCA">'+codes[i].cmeasure+'</td>'
						+'<td onclick="selectTd(this)" mark="2" name_china="'+codes[i].ccodeName+'" ccode="'+codes[i].ccode+'"   style="text-align:right;width:77px" >'+donumswitch(transFloat(nbS))+'</td>'
						+'</tr>';
						$("#include").append(nstr);
					}
					if((codes[i].cexchName!=null&&codes[i].cexchName!="")&&(codes[i].cmeasure==null||codes[i].cmeasure=="")){
						$("td[ccode='"+codes[i].ccode+"']").attr("ntyp","1");
					}else if((codes[i].cmeasure!=null&&codes[i].cmeasure!="")&&(codes[i].cexchName==null||codes[i].cexchName=="")){
						$("td[ccode='"+codes[i].ccode+"']").attr("ntyp","2");
					}else if((codes[i].cexchName!=null&&codes[i].cexchName!="")&&(codes[i].cmeasure!=null&&codes[i].cmeasure!="")){
						$("td[ccode='"+codes[i].ccode+"']").attr("ntyp","3");
					}else{
						$("td[ccode='"+codes[i].ccode+"']").attr("ntyp","0");
					}
					if(codes[i].bend==0){
						$("td[ccode='"+codes[i].ccode+"']").css("background-color","#FFFBCA");
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
	var inputCount = cell.getElementsByTagName("input").length;
	editId =$(cell.parentNode).attr("tid");
	type=$(cell).attr("mark");
	if(inputCount==0){
		initvalue=cell.innerHTML.replaceAll(",","");
		var tempValue = cell.innerHTML.replaceAll(",","");
		cell.innerHTML="<input onblur='updateAccsum(this)' type='text' style='height:12px;font-size:12px;border:none;width:90%' value='"+tempValue+"'/>";
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
	window.parent.openWindow("gl_set_operat","gl_set_initial",param);
	 
}

/**
 * 失去焦点后时变更期初余额数据
 */
function updateAccsum(input){
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
	var initial="glAccsum.ccode.id="+editId+"&add_mb="+add_mb+"&type="+type;
	$.ajax({
		url: "glInitial!createAccsum",
		type: 'post',
		data: initial,
		dataType: "json",
		cache:false,
	    async:false,
		success: function(data){
			var resultList=data.resultList;
			for(var j=0;j<resultList.length;j++){
				var tempre=resultList[j].split(":");
				$("td[ccode='"+tempre[0]+"'][mark='"+type+"']").html(donumswitch(transFloat(tempre[1])));
			}
		},
		error:function(data){
			jAlert("期初余额保存失败！","提示");
		}
	});
}

/**
 * 下面开始按钮操作
 */
/**
 * 方向
 */
function fangxiang() {
}

/**
 * 试算
 */
function shisuan() {
}

/**
 * 查找
 */
function find() {
}

/**
 * 对账
 */
function duizhang() {
}

/**
 * 清零
 */
function qingling() {
}

/**
 * 退出
 */
function exit() {
	window.parent.closeWindow('gl_set_initial');
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
