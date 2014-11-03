
/***
 * 
 * 固定资产卡片 全局变量和函数
 * 
 * 说明：此JS定义了固定资产卡片里多个tab公用的变量和函数以及页面初始化程序
 * 
 */




//表格当前编辑的文本框变量
var entry_table_current_edit_textbox = null;
var iCardNumType="0";
/**
	页面初始化
*/
function doinit(){
	//userCode
	//var	userCode=getCookie("userCode");//登录名
	var	userName=getCookie("userName");//姓名
	var	operDate=getCookie("operDate");//登录时间
	$("#soperator").val(userName);
	$("#lrr").html(userName);
	$("#rq").html(operDate);
	$("#lrrq").html(operDate);
	$("#dinputdate").val(operDate);
	$("#entryDate").val(operDate);
	$.ajax({
		url: "faCards!doinit",
		type: 'post',
		async:false,
		cache:false,
		dataType:"json",
		success: function(data){
			$("#kpbh").html(data.scardnum);
			iCardNumType=data.iCardNumType;
		}
	});
}
/**
 *公共方法：数据序列化
 */
function doserial(parentid){
	var inner=$("#"+parentid).children().find("[tye='0']");
	var param="";
	var ins="";
	for(var i=0;i<inner.length;i++){
		var temp=inner[i];
		var str=temp.getAttribute("name")+"="+temp.innerHTML+"&";
		ins=ins+str;
	}
	var val=$("#"+parentid).children().find("[tye='1']");
	var vas="";
	for(var j=0;j<val.length;j++){
		var temp=val[j];
		var str=temp.getAttribute("name")+"="+temp.value+"&";
		vas=vas+str;
	}
	param=ins+vas;
	param=param.substring(0,param.length-1);
	return param;
}
/**
 * sheet数组序列话
 */
function sheetserial(){
	var param="";
	
	/*附属设备*/
	var mark2=$("#table_fssb").children();
	var len2=mark2.length;
	var asset="";//设备数组字符
	if(len2>1){
		var name2=$("#name2").children();
		for(var i=0;i<len2-1;i++){
			var temptr=mark2[i];
			var temptd=$(temptr).children();
			var tdlen=temptd.length;
			if(temptr.id!=""&&temptr.id!=null&&temptr.id!="null"){
				asset=asset+"faAssetattached["+i+"].id="+temptr.id+"&";
			}
			for(var j=0;j<tdlen;j++){
				asset=asset+"faAssetattached["+i+"]."+name2[j].getAttribute("name")+"="+temptd[j].innerHTML+"&";
			}
		}
	}
	/*sheet表*/
	var num=0;
	var sheet="";
	var mark=$("tbody[ssty='0']");
	for(var k=0;k<4;k++){
		var lsheetnum=mark[k].mark;
		var tempmark=$(mark[k]).children();
		var templen=tempmark.length;
		if(templen>1){
			var tempname=$("#name"+lsheetnum).children();
			for(var i=0;i<templen-1;i++){
				var temptr=tempmark[i];
				var temptd=$(temptr).children();
				var tdlen=temptd.length;
				sheet=sheet+"faCardssheets["+num+"].lsheetnum="+lsheetnum+"&";
				if(temptr.id!=""&&temptr.id!=null&&temptr.id!="null"){
					sheet=sheet+"faCardssheets["+num+"].id="+temptr.id+"&";
				}
				for(var j=0;j<tdlen;j++){
					sheet=sheet+"faCardssheets["+num+"]."+tempname[j].getAttribute("name")+"="+temptd[j].innerHTML+"&";
				}
				num++;
			}
		}
	}
	param=asset+sheet;
	param=param.substring(0,param.length-1);
	return param;
}
/**
 * function 平均年限法（一）
 * 功能描述: 
 * 月折旧率=(1-净残值率)/使用年限;
 * 月折旧额=(月初原值-月初累计减值准备金额+月初累计转回减值准备金额)*月折旧率
 */
/**
 * function 平均年限法（二）
 * 功能描述: 
 * 月折旧率=(1-净残值率)/使用年限;
 * 月折旧额=(月初原值-月初累计减值准备金额+月初累计转回减值准备金额-月初累计折旧-月初净残值)/(使用年限-已计提月份)
 */
function dopreciations(){
	var zjff=$("#zjff").html();
	if(zjff=="平均年限法(一)"){
		var yzjl=0.00;
		var yzje=0.00;
		var synx=$("#synx").html().replace("月","").split("年");
		var life=synx[0]*12+(synx[1]-0);//使用年限
		var jczl=$("#jczl").html()/100;
		if(life==0){
			$("#yzjl").html("0.00");
			$("#yzje").html("0.00");
			return;
		}
		yzjl=(1-jczl)/life;
		$("#yzjl").html(numberround(yzjl,3));
		var yz=$("#yz").html();//原值
		var dbldecprevaluet=$("#dbldecprevaluet").val();//月初累计减值准备金额
		var dblretdecprevaluet=$("#dblretdecprevaluet").val();//月初累计转回减值准备金额
		yzje=(yz-dbldecprevaluet+(dblretdecprevaluet-0))*yzjl;
		$("#yzje").html(numberround(yzje,2));
	}else if(zjff=="平均年限法(二)"){
		var yzjl=0.00;
		var yzje=0.00;
		var synx=$("#synx").html().replace("月","").split("年");
		var life=synx[0]*12+(synx[1]-0);//使用年限
		var jczl=$("#jczl").html()/100;
		if(life==0){
			$("#yzjl").html("0.00");
			$("#yzje").html("0.00");
			return;
		}
		var yjtyf=$("#yjtyf").html();
		yzjl=(1-jczl)/life;
		if(yjtyf>=life){
			$("#yzje").html("0.00");
			return;
		}
		$("#yzjl").html(numberround(yzjl,3));
		var yz=$("#yz").html();//原值
		var dbldecprevaluet=$("#dbldecprevaluet").val();//月初累计减值准备金额
		var dblretdecprevaluet=$("#dblretdecprevaluet").val();//月初累计转回减值准备金额
		var ljzj=$("#ljzj").html();//累计折旧
		var jcz=$("#jcz").html();//净残值
		yzje=(yz-dbldecprevaluet+(dblretdecprevaluet-0)-ljzj-jcz)/(life-yjtyf);
		$("#yzje").html(numberround(yzje,2));
	}else{
		$("#yzjl").html("0.00");
		$("#yzje").html("0.00");
	}
}


