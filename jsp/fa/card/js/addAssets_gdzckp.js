
/***
 * 
 * 固定资产卡片 第一个选项卡“固定资产卡片”相关JS代码
 * 
 */

var tagid="";//存放存储子窗体返回的id值的id
var tagname="";//存放存储子窗体返回的name值的id
var smark="";//卡片操作状态
var wrongid="0";//存储错误信息
var itemParam = {};//项目目录参数
//页面加载完后为entryDate文本框赋值，填入默认录入时间
var asstype="";//存储资产类原值 

function setEntryDate(){
	var date = new Date();
	var ds = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
	
	document.getElementById("entryDate").value=ds;
}

$(document).ready(function(){
	//setEntryDate();
	var t_param=window.parent.valueMap.get("fa_card_addAssets");
	smark=t_param.smark;
	var scardnum=t_param.scardnum;
	if(smark!="2"){
		if(smark=="0"){
			$("#saveid").attr("disabled","disabled");
			$("#updatebutton").attr("disabled",false);
		}
		var	operDate=getCookie("operDate");//登录时间
		$("#rq").html(operDate);
		$.ajax({
			url: "faCards!findfacardsByCardNum?scardnum="+scardnum,
			type: 'post',
			async:false,
			cache:false,
			dataType:"json",
			success: function(data){
				iCardNumType=data.iCardNumType;
				var facard=data.faCards;
				$("#cardid").val(facard.id);
				$("#soperator").val(facard.soperator);
				$("#lrr").html(facard.soperator);
				$("#lrrq").html(facard.dinputdate);
				$("#kpbh").html(facard.scardnum);
				$("#dinputdate").val(facard.dinputdate);
				$("#gdzcbh").html(facard.sassetnum);
				$("#gdzcmc").html(facard.sassetname);
				$("#lbbh").html(facard.stypenum.split(",")[0]);
				$("#lbmc").html(facard.stypenum.split(",")[1]);
				$("#ggxh").html(facard.sstyle);
				$("#sdeptnum").val(facard.sdeptnum);
				$("#bmmc").html(facard.sdeptnum.split(",")[1]);
				$("#sorgaddid").val(facard.sorgaddid);
				$("#zjfs").html(facard.sorgaddid.split(",")[1]);
				$("#cfdd").html(facard.ssite);
				$("#sstatusid").val(facard.sstatusid);
				$("#syzk").html(facard.sstatusid.split(",")[1]);
				$("#sprojectnum").val(facard.sprojectnum);
				$("#xm").html(facard.sprojectname);
				var llife=facard.llife-0;
				var year=llife/12;
				var yue=llife%12;
				$("#synx").html(year+"年"+yue+"月");
				$("#sdeprmethodid").val(facard.sdeprmethodid);
				$("#zjff").html(facard.sdeprmethodid.split(",")[1]);
				$("#kssyrq").html(facard.dstartdate);
				$("#yjtyf").html(facard.lusedmonths);
				$("#bz").html(facard.scurrency);
				$("#yz").html(numberround(facard.dblvalue,2));
				$("#jczl").html(numberround(facard.dblbvrate*100,2));
				$("#jcz").html(numberround(facard.dblbv,2));
				$("#ljzj").html(numberround(facard.dbltransindeprtcard,2));
				$("#yzje").html(numberround(facard.dbldepr,2));
				$("#yzjl").html(numberround(facard.dbldeprrate,3));
				var sdeprsubjectnum=facard.sdeprsubjectnum;
				var sdeprsubjectname=facard.sdeprsubjectname;
				if(sdeprsubjectnum!=null&&sdeprsubjectnum!=""){
					$("#dyzjkm").html(sdeprsubjectnum+","+sdeprsubjectname);
				}
				$("#kdkse").html(facard.dbloffsettax);
				$("#dbldecprevaluet").val(facard.dbldecprevaluet);
				$("#dblretdecprevaluet").val(facard.dblretdecprevaluet);
				$("#jz").html(facard.dblvalue-facard.dbltransindeprtcard);
				$("#jcz").html(facard.dblvalue*facard.dblbvrate);
				$("#syzk").attr("bneed","1");
				var faAssetattached=data.faAssetattached;
				if(faAssetattached!=null){
					var length=faAssetattached.length;
					var trs="";
					for(var i=0;i<length;i++){
						var temp=faAssetattached[i];
						trs=trs+"<tr id='"+temp.id+"'>";
						trs=trs+"<td style='text-align:center' width='68' mark='0' onclick='table_fssb_cell_click(event,this)'>"+nulltostring(temp.snum)+"</td>";
						trs=trs+"<td style='text-align:center' width='68' mark='1' onclick='table_fssb_cell_click(event,this)'>"+nulltostring(temp.sname)+"</td>";
						trs=trs+"<td style='text-align:center' width='68' mark='2' onclick='table_fssb_cell_click(event,this)'>"+nulltostring(temp.sstyle)+"</td>";
						trs=trs+"<td style='text-align:center' width='68' mark='3' onclick='table_fssb_cell_click(event,this)'>"+nulltostring(temp.lquantity)+"</td>";
						trs=trs+"<td style='text-align:center' width='68' mark='4' onclick='table_fssb_cell_click(event,this)'>"+nulltostring(temp.dblvalue)+"</td>";
						trs=trs+"<td style='text-align:center' width='68' mark='5' onclick='table_fssb_cell_click(event,this)'>"+nulltostring(temp.sunit)+"</td>";
						trs=trs+"<td style='text-align:center' width='68' mark='6' onclick='table_fssb_cell_click(event,this)'>"+nulltostring(temp.ddate)+"</td>";
						trs=trs+"<td style='text-align:center' width='68' mark='7' onclick='table_fssb_cell_click(event,this)'>"+nulltostring(temp.memremark)+"</td></tr>";
					}
					$("#table_fssb").append(trs);
				}
				var faCardssheets=data.faCardssheets;
				if(faCardssheets!=null){
					var leng=faCardssheets.length;
					for(var i=0;i<leng;i++){
						var temp=faCardssheets[i];
						var trs="";
						if(temp.lsheetnum==3){
							trs="<tr id='"+temp.id+"'>";
							trs=trs+"<td style='text-align:center' width='112' mark='0' onclick='table_dxljl_cell_click(this)'>"+nulltostring(temp.snum)+"</td>";
							trs=trs+"<td style='text-align:center' width='112' mark='1' onclick='table_dxljl_cell_click(this)'>"+nulltostring(temp.dstartdate)+"</td>";
							trs=trs+"<td style='text-align:center' width='112' mark='2' onclick='table_dxljl_cell_click(this)'>"+nulltostring(temp.denddate)+"</td>";
							trs=trs+"<td style='text-align:center' width='112' mark='3' onclick='table_dxljl_cell_click(this)'>"+nulltostring(temp.memreason)+"</td>";
							trs=trs+"<td style='text-align:center' width='112' mark='4' onclick='table_dxljl_cell_click(this)'>"+nulltostring(temp.memremark)+"</td></tr>";
							$("#table_dxljl").append(trs);
						}else if(temp.lsheetnum==4){
							trs="<tr id='"+temp.id+"'>";
							trs=trs+"<td style='text-align:center' width='112' mark='0' onclick='table_zczyjl_cell_click(this)'>"+nulltostring(temp.snum)+"</td>";
							trs=trs+"<td style='text-align:center' width='112' mark='1' onclick='table_zczyjl_cell_click(this)'>"+nulltostring(temp.dtransdate)+"</td>";
							trs=trs+"<td style='text-align:center' width='112' mark='2' onclick='table_zczyjl_cell_click(this)'>"+nulltostring(temp.sdeptname)+"</td>";
							trs=trs+"<td style='text-align:center' width='112' mark='3' onclick='table_zczyjl_cell_click(this)'>"+nulltostring(temp.memreason)+"</td>";
							trs=trs+"<td style='text-align:center' width='112' mark='4' onclick='table_zczyjl_cell_click(this)'>"+nulltostring(temp.memremark)+"</td></tr>";
							$("#table_zczyjl").append(trs);
						}else if(temp.lsheetnum==5){
							trs="<tr id='"+temp.id+"'>";
							trs=trs+"<td style='text-align:center' width='92' mark='0' onclick='table_tqyjl_cell_click(this)'>"+nulltostring(temp.snum)+"</td>";
							trs=trs+"<td style='text-align:center' width='92' mark='1' onclick='table_tqyjl_cell_click(this)'>"+nulltostring(temp.dtransdate)+"</td>";
							trs=trs+"<td style='text-align:center' width='92' mark='2' onclick='table_tqyjl_cell_click(this)'>"+nulltostring(temp.denddate)+"</td>";
							trs=trs+"<td style='text-align:center' width='92' mark='3' onclick='table_tqyjl_cell_click(this)'>"+nulltostring(temp.ldays)+"</td>";
							trs=trs+"<td style='text-align:center' width='92' mark='4' onclick='table_tqyjl_cell_click(this)'>"+nulltostring(temp.memreason)+"</td>";
							trs=trs+"<td style='text-align:center' width='92' mark='5' onclick='table_tqyjl_cell_click(this)'>"+nulltostring(temp.memremark)+"</td></tr>";
							$("#table_tqyjl").append(trs);
						}else if(temp.lsheetnum==6){
							trs="<tr id='"+temp.id+"'>";
							trs=trs+"<td style='text-align:center' width='92' mark='0' onclick='table_yzbd_cell_click(this)'>"+nulltostring(temp.snum)+"</td>";
							trs=trs+"<td style='text-align:center' width='92' mark='1' onclick='table_yzbd_cell_click(this)'>"+nulltostring(temp.dtransdate)+"</td>";
							trs=trs+"<td style='text-align:center' width='92' mark='2' onclick='table_yzbd_cell_click(this)'>"+nulltostring(temp.dbltransvalue)+"</td>";
							trs=trs+"<td style='text-align:center' width='92' mark='3' onclick='table_yzbd_cell_click(this)'>"+nulltostring(temp.dblaftervalue)+"</td>";
							trs=trs+"<td style='text-align:center' width='92' mark='4' onclick='table_yzbd_cell_click(this)'>"+nulltostring(temp.memreason)+"</td>";
							trs=trs+"<td style='text-align:center' width='92' mark='5' onclick='table_yzbd_cell_click(this)'>"+nulltostring(temp.memremark)+"</td></tr>";
							$("#table_yzbd").append(trs);
						}else if(temp.lsheetnum==7){
							trs="<tr id='"+temp.id+"'>";
							trs=trs+"<td style='text-align:center' width='78' mark='0' onclick='table_jsxx_cell_click(this)'>"+nulltostring(temp.dtransdate)+"</td>";
							trs=trs+"<td style='text-align:center' width='78' mark='1' onclick='table_jsxx_cell_click(this)'>"+nulltostring(facard.sorgdisposeid)+"</td>";
							trs=trs+"<td style='text-align:center' width='78' mark='2' onclick='table_jsxx_cell_click(this)'>"+nulltostring(temp.dblaftervalue)+"</td>";
							trs=trs+"<td style='text-align:center' width='78' mark='3' onclick='table_jsxx_cell_click(this)'>"+nulltostring(temp.dbltransvalue)+"</td>";
							trs=trs+"<td style='text-align:center' width='78' mark='4' onclick='table_jsxx_cell_click(this)'>"+nulltostring(facard.sdisposer)+"</td>";
							trs=trs+"<td style='text-align:center' width='78' mark='5' onclick='table_jsxx_cell_click(this)'>"+nulltostring(temp.memreason)+"</td>";
							trs=trs+"<td style='text-align:center' width='78' mark='6' onclick='table_jsxx_cell_click(this)'>"+nulltostring(temp.memremark)+"</td></tr>";
							$("#table_jsxx").append(trs);
						}
					}
				}
			}
		});
	}else{
		doinit();
		findAssettypes();
	}
});

function findAssettypes(){//查询资产类别，初始化数据
	
	var par=window.parent.valueMap.get("fa_card_addAssets");
	var Assettypesid=par.code;
	$.ajax({
		url: "faAssettypes!selectByCode?s_snum="+Assettypesid,
		type: 'post',
		async:false,
		cache:false,
		dataType:"json",
		success: function(data){
			var assettype=data.assettypes;
			$("#gdzcmc").html(assettype.sname);
			$("#lbbh").html(assettype.snum);
			$("#lbmc").html(assettype.sname);
			var sdeprmethod=assettype.sdeprmethodnu;
			if(sdeprmethod!=""&&sdeprmethod!=null){
				var sdeprmets=sdeprmethod.split(",");
				$("#sdeprmethodid").val(sdeprmethod);
				$("#zjff").html(sdeprmets[1]);
			}
			$("#jczl").html(numberround(assettype.dblbvrate*100,2));
			if(assettype.ilife==null||assettype.ilife==""){
				$("#synx").html(0+"年"+0+"月");
			}else{
				$("#synx").html(assettype.ilife+"年"+0+"月");
			}
		}
	});
}



var currentEditingElement = null;
var currentEditingProperty = null;//当前编辑的属性为



function faCardEdit(event,div){
	
	if(smark=="0"){
		return;
	}
	//避免重复点击，重复往div里添加innerHTML内容产生混乱
	if(div.getElementsByTagName("input").length==0){
		//如果有其他单元正处于编辑状态，那么还需要将其他单元取消编辑状态
		if(currentEditingElement!=null){
			if(currentEditingProperty=="kssyrq"){
				dostartdate();
			}
			var inputs = currentEditingElement.getElementsByTagName("input");
			
			//如果是使用年限，则分别取年文本框和月文本框的值
			if(currentEditingProperty=="synx"){
				var str = inputs[0].value +"年"+ inputs[1].value +"月";
				currentEditingElement.innerHTML = str;
			}else{
				currentEditingElement.innerHTML=inputs[inputs.length-1].value;
				currentEditingElement=null;
			}
		}
		var componentId = div.id;
		
		//临时取得div的innerHTML
		var temp = div.innerHTML;
		

		currentEditingProperty = componentId;
		
		//根据被点击的div的id来判定应该往里面放哪些控件。
		switch(componentId){


		//卡片编号
		case "kpbh":

			var component = "<input type='text' value='"+temp+"' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			//将选中改为聚焦select()
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;


		//日期
		case "rq":

			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			break;

		
		
		//固定资产编号
		case "gdzcbh":
			var component ="";
			if(iCardNumType=="0"){
				component = "<input type='text' value='"+temp+"' style='height:14px;width:90px;margin-top:-4px;'/>";
			}else if(iCardNumType=="1"){
				component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			}
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;

		//固定资产名称
		case "gdzcmc":
	
			var component = "<input type='text' value='"+temp+"' style='height:14px;width:280px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			break;
			

		//类别编号
		case "lbbh":
			asstype=temp;
			var component = "<input type='button' value='类别编号' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick='window.parent.openWindow(\"fa_basic_ref_acr\",\"fa_card_addAssets\");tagid=\"zclbbm\";tagname=\"lbmc\"'/><input onfocus='dofocustoenter(\"FaAssettypes\",this,\"tagid\",\"zclbbm\",\"tagname\",\"lbmc\")' id='zclbbm' type='text' value='"+temp+"'  style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[1].select();
			//cursorToEnd(div.getElementsByTagName("input")[1]);
			currentEditingElement=div;
			
			break;
			
		
		//类别名称
		case "lbmc":
			asstype=temp;
			var component = "<input type='button' value='类别名称' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick='window.parent.openWindow(\"fa_basic_ref_acr\",\"fa_card_addAssets\");tagid=\"lbbh\";tagname=\"zclbmc\";'/><input onfocus='dofocustoenter(\"FaAssettypes\",this,\"tagid\",\"lbbh\",\"tagname\",\"zclbmc\")' id='zclbmc' type='text' value='"+temp+"'  style='height:14px;width:280px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[1].select();
			//cursorToEnd(div.getElementsByTagName("input")[1]);
			currentEditingElement=div;
			
			break;
			
			

		//规格型号
		case "ggxh":

			var component = "<input type='text' value='"+temp+"' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;

			
		//部门名称
		case "bmmc":
	
			var component = "<input type='button' value='部门名称' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick='window.parent.openWindow(\"fa_basic_ref_dr\",\"fa_card_addAssets\");tagid=\"sdeptnum\";tagname=\"re_depart\";'/><input onfocus='dofocustoenter(\"FaDepartments\",this,\"tagid\",\"sdeptnum\",\"tagname\",\"re_depart\")' id='re_depart' type='text' value='"+temp+"'  style='height:14px;width:280px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[1].select();
			//cursorToEnd(div.getElementsByTagName("input")[1]);
			currentEditingElement=div;
			
			break;
			
		
			
		//增加方式
		case "zjfs":
	
			var component = "<input type='button' value='增加方式' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick='window.parent.openWindow(\"fa_basic_ref_amr\",\"fa_card_addAssets\");tagid=\"sorgaddid\";tagname=\"re_am\";'/><input onfocus='dofocustoenter(\"FaOrigins\",this,\"tagid\",\"sorgaddid\",\"tagname\",\"re_am\")' id='re_am' type='text' value='"+temp+"'  style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[1].select();
			//cursorToEnd(div.getElementsByTagName("input")[1]);
			currentEditingElement=div;
			
			break;
			
		
		//存放地点
		case "cfdd":
	
			var component = "<input type='text' value='"+temp+"' onblur='' style='height:14px;width:280px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			break;
				
			

		//使用状况
		case "syzk":
	
			var component = "<input type='button' value='使用状况' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick='window.parent.openWindow(\"fa_basic_ref_usr\",\"fa_card_addAssets\");tagid=\"sstatusid\";tagname=\"re_usr\";'/><input onfocus='dofocustoenter(\"FaStatus\",this,\"tagid\",\"sstatusid\",\"tagname\",\"re_usr\")' id='re_usr' type='text' value='"+temp+"'  style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[1].select();
			//cursorToEnd(div.getElementsByTagName("input")[1]);
			currentEditingElement=div;
			
			break;
			
		//使用年限
		case "synx":

			var year = temp.split("年")[0];
			var ms = temp.split("年")[1];
			var month = ms.split("月")[0];
			
			var component = "<input type='text' value='"+year+"' style='height:14px;width:20px;margin-top:-4px;float:left;'/><span style='float:left'>年</span><input type='text' value='"+month+"' style='height:14px;width:20px;margin-top:-4px;float:left;'/><span style='float:left'>月</span>";
			div.innerHTML=component;
			currentEditingElement=div;
			break;
		
		
		//折旧方法
		case "zjff":
	
			var component = "<input type='button' value='折旧方法' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick='window.parent.openWindow(\"fa_basic_ref_dmr\",\"fa_card_addAssets\");tagid=\"sdeprmethodid\";tagname=\"re_dmr\";'/><input readonly='readonly' id='re_dmr' type='text' value='"+temp+"' onblur='' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[1].select();
			//cursorToEnd(div.getElementsByTagName("input")[1]);
			currentEditingElement=div;
			
			break;
			
			
		
			
		//开始使用日期
		case "kssyrq":
			//某些情况会挡住文本框，现在进行绝对定位,经过确认的。（我觉的不合理lichunhui）onclick='WdatePicker({onpicked:dostartdate,position:{left:100,top:50}});'
			var component = "<input id='my97DatePickerField'  type='text' value='"+temp+"' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			break;
		
			
			
		//已计提月份
		case "yjtyf":

			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;
			
			
		//币种
		case "bz":
	
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;
				
		
		//原值
		case "yz":

			var component = "<input type='text' onblur='doblue(this)' id='z_yz' value='"+temp+"' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;
			
			
		//净残值率
		case "jczl":

			var component = "<input type='text' onblur='doblue(this)' value='"+temp+"' id='z_jczl' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;
			
			
		//净残值
		case "jcz":

			var component = "<input type='text' onblur='doblue(this)' value='"+temp+"' id='z_jcz' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;
			
			
		//累计折旧
		case "ljzj":

			var component = "<input type='text' onblur='doblue(this)' value='"+temp+"' id='z_ljzj' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;
		
		
		//月折旧率
		case "yzjl":

			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;
			
		
		//月折旧额
		case "yzje":

			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;
			
			
		
		//净值
		case "jz":

			var component = "<input type='text' onblur='doblue(this)'  value='"+temp+"' id='z_jz' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;
			
			
		//对应折旧科目
		case "dyzjkm":
			div.style.overflow="";
			var component = "<input type='button' value='对应折旧科目' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick='window.parent.openWindow(\"dsign_subjectsreference\",\"fa_card_addAssets\");tagid=\"re_code\";tagname=\"re_code\";'/><input onfocus='dofocustoenter(\"code\",this,\"tagid\",\"re_code\",\"tagname\",\"re_code\")' id='re_code' type='text' value='"+temp+"' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[1].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;
					
			
		//项目
		case "xm":

			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			if($("#dyzjkm").html()!=""){
				var code_d=$("#dyzjkm").html().split(",");
				var cassItem="";
				$.ajax({
					url:"code!queryCodeByCode?ccode="+code_d[0],
					type:"post",
					dataType:"json",
					async : false,   
				    cache:false,   
					success:function(data){
						var code=data.code1;
						cassItem=code.cassItem;
					}
				});
				if(cassItem!=""&&cassItem!=null){
					itemParam.cassItem = cassItem;
					component = "<input type='button' value='项目' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick='window.parent.openWindow(\"basic_comref_fitemref\",\"fa_card_addAssets\",itemParam);tagid=\"sprojectnum\";tagname=\"re_sprojectname\";'/><input readonly='readonly'  id='re_sprojectname' type='text' value='"+temp+"' onblur='' style='height:14px;width:90px;margin-top:-4px;'/>";
					div.innerHTML=component;
					div.getElementsByTagName("input")[1].select();
					//cursorToEnd(div.getElementsByTagName("input")[1]);
					currentEditingElement=div;
				}else{
					div.innerHTML=component;
					div.getElementsByTagName("input")[0].select();
					//cursorToEnd(div.getElementsByTagName("input")[0]);
					currentEditingElement=div;
				}
			}else{
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				//cursorToEnd(div.getElementsByTagName("input")[0]);
				currentEditingElement=div;
			}
			
			break;
			
		
		
		//可抵扣税额
		case "kdkse":

			var component = "<input type='text' value='"+temp+"' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;
			
			
		
		//录入人
		case "lrr":

			var component = "<input type='text' value='"+temp+"' disabled='disabled' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;
			
			
		//录入日期
		case "lrrq":

			var component = "<input type='text' value='"+temp+"' disabled='disabled' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			//cursorToEnd(div.getElementsByTagName("input")[0]);
			currentEditingElement=div;
			
			break;
			
			
		}
		if (event && event.stopPropagation){
			event.stopPropagation();
		}else{
	        window.event.cancelBubble=true;
	    }
		
		
	}else{
		if(currentEditingProperty=="synx") return;
		//$(div).find("input:text")[0].select();
		//cursorToEnd($(div).find("input:text")[0]);
	}
	
}





//单元失去焦点，执行单元格取消编辑状态动作：
function documentClick(e){
	if(wrongid=="1"){
		return;
	}
	var evt=(window.event || e);//获得事件
	var evtsrc = (evt.srcElement || evt.target);
	if(currentEditingElement!=null){
		if(currentEditingElement.tagName=="TD" || (currentEditingElement.tagName!="TD" && evtsrc.parentNode!=currentEditingElement.parentNode)){
			if(evtsrc.tagName!="INPUT" || (evtsrc.tagName=="INPUT" && evtsrc.parentNode.parentNode.className=="group")){
				var inputs = currentEditingElement.getElementsByTagName("input");
				
				//如果是使用年限，则分别取年文本框和月文本框的值
				if(currentEditingProperty=="synx"){
					var year=inputs[0].value;
					if((year-0)!=year||(year-0)<0){
						inputs[0].value=0;
					}
					var yue=inputs[1].value;
					if((yue-0)!=yue||(yue-0)<0||(yue-0)>=12){
						inputs[1].value=0;
					}
					var str = inputs[0].value +"年"+ inputs[1].value +"月";
					currentEditingElement.innerHTML = str;
				}else if(currentEditingProperty=="dyzjkm"){
					currentEditingElement.style.overflow="hidden";
				}else if(currentEditingProperty=="kssyrq"){
					dostartdate();
				}
				
				var textbox = inputs[inputs.length-1];
				if(textbox!=undefined || textbox!=null){
					currentEditingElement.innerHTML=textbox.value;
				}
				if(currentEditingElement.tagName=="TD"){
					var row = currentEditingElement.parentNode;
					//判断是否增加新行
					if(row.rowIndex==row.parentNode.rows.length-1){
						var existsContent = false;
						for(var i=0;i<row.cells.length;i++){
							if(row.cells[i].innerHTML!=""){
								existsContent = true;
							}
						}
						if(existsContent){
							if(sheetlab=="1"){
								table_fssb_addRow();
							}else if(sheetlab=="2"){
								table_dxljl_addRow();
							}else if(sheetlab=="3"){
								table_zczyjl_addRow();
							}else if(sheetlab=="4"){
								table_tqyjl_addRow();
							}else if(sheetlab=="5"){
								table_yzbd_addRow();
							}
						}
					}
				}
				currentEditingElement=null;
			}
		}
	}
};






document.onclick=documentClick;

function deliverValue(param){
	if(tagid=="sprojectnum"){
		document.getElementById(tagid).value=param.gradecode;
		document.getElementById(tagname).value=param.gradename;		
		return;
	}
	var code=param.code;
	var d_name=param.name;
	if(tagid!=""){
		if(tagid=="lbbh"){
			if(asstype==d_name){
				return;
			}
			document.getElementById(tagid).innerHTML=code;
			$.ajax({
				url: "faAssettypes!selectByCode?s_snum="+code,
				type: 'post',
				async:false,
				cache:false,
				dataType:"json",
				success: function(data){
					var assettype=data.assettypes;
					if(assettype!=null&&assettype!=undefined){
						var sdeprmethod=assettype.sdeprmethodnu;
						if(sdeprmethod!=""&&sdeprmethod!=null){
							var sdeprmets=sdeprmethod.split(",");
							$("#sdeprmethodid").val(sdeprmethod);
							$("#zjff").html(sdeprmets[1]);
						}
						$("#jczl").html(numberround(assettype.dblbvrate*100,2));
						if(assettype.ilife==null||assettype.ilife==""){
							$("#synx").html(0+"年"+0+"月");
						}else{
							$("#synx").html(assettype.ilife+"年"+0+"月");
						}
					}else{
						$("#sdeprmethodid").val("");
						$("#zjff").html("");
						$("#jczl").html(0.0);
						$("#synx").html(0+"年"+0+"月");
					}
				}
			});
		}else if(tagid=="zclbbm"){
			if(asstype==code){
				return;
			}
			document.getElementById(tagid).value=code;
			$.ajax({
				url: "faAssettypes!selectByCode?s_snum="+code,
				type: 'post',
				async:false,
				cache:false,
				dataType:"json",
				success: function(data){
					var assettype=data.assettypes;
					if(assettype!=null&&assettype!=undefined){
						var sdeprmethod=assettype.sdeprmethodnu;
						if(sdeprmethod!=""&&sdeprmethod!=null){
							var sdeprmets=sdeprmethod.split(",");
							$("#sdeprmethodid").val(sdeprmethod);
							$("#zjff").html(sdeprmets[1]);
						}
						$("#jczl").html(numberround(assettype.dblbvrate*100,2));
						if(assettype.ilife==null||assettype.ilife==""){
							$("#synx").html(0+"年"+0+"月");
						}else{
							$("#synx").html(assettype.ilife+"年"+0+"月");
						}
					}else{
						$("#sdeprmethodid").val("");
						$("#zjff").html("");
						$("#jczl").html(0.0);
						$("#synx").html(0+"年"+0+"月");
					}
				}
			});
		}else{
			document.getElementById(tagid).value=code+","+d_name;;
		}
		
	}
	if(tagname!=""){
		if(tagname=="lbmc"){
			document.getElementById(tagname).innerHTML=d_name;
		}else{
			document.getElementById(tagname).value=d_name;
		}
		
	}
	if(tagid=="sdeptnum"){
		$("#dyzjkm").html(param.ssubject);
	}else if(tagid=="sstatusid"){
		$("#syzk").attr("bneed",param.bneeddepr);
	}
	if(tagid==tagname){
		var selKemuCode=param.selKemuCode;
		var selKemuName=param.selKemuName;
		document.getElementById(tagid).value=selKemuCode+","+selKemuName;
	}
}

function doblue(temp){//原值，净值，净残值率，累计折旧，净残值的换算
	var z_id=temp.id;
	var z_value=temp.value;
	if(z_value==""||(z_value-0)!=z_value||(z_value-0)<0){
		temp.value=0;
		z_value=0;
	}
	switch(z_id){
		case "z_yz":
			$("#jz").html(z_value-$("#ljzj").html());
			$("#jcz").html(numberround(z_value*$("#jczl").html()/100,2));
			var jz=$("#jz").html()-0;
			var jcz=$("#jcz").html()-0;
			if(($("#ljzj").html()-0)>z_value){
				wrongid="1";
				jAlert("累计折旧不能大于原值","提示信息",function(){
					temp.select();
					//cursorToEnd(temp);
				});
				return;
			}
			if(jcz>jz){
				wrongid="1";
				jAlert("净残值不能大于净值","提示信息",function(){
					temp.select();
					//cursorToEnd(temp);
				});
				return;
			}
			break;
		case "z_jz":
			$("#ljzj").html($("#yz").html()-z_value);
			var jcz=$("#jcz").html()-0;
			if(z_value>($("#yz").html()-0)){
				wrongid="1";
				jAlert("净值不能大于原值","提示信息",function(){
					temp.select();
					//cursorToEnd(temp);
				});
				return;
			}
			if(jcz>z_value){
				wrongid="1";
				jAlert("净残值不能大于净值","提示信息",function(){
					temp.select();
					//cursorToEnd(temp);
				});
				return;
			}
			break;
		case "z_ljzj":
			$("#jz").html($("#yz").html()-z_value);
			var jcz=$("#jcz").html()-0;
			if(z_value>($("#yz").html()-0)){
				wrongid="1";
				jAlert("累计折旧不能大于原值","提示信息",function(){
					temp.select();
					//cursorToEnd(temp);
				});
				return;
			}
			if(jcz>($("#jz").html()-0)){
				wrongid="1";
				jAlert("净残值不能大于净值","提示信息",function(){
					temp.select();
					//cursorToEnd(temp);
				});
				return;
			}
			break;
		case "z_jczl":
			if((z_value-0)>=100){
				z_value=99;
				temp.value=99;
			}
			$("#jcz").html(numberround($("#yz").html()*z_value/100,2));
			var jcz=$("#jcz").html()-0;
			if(jcz>($("#jz").html()-0)){
				wrongid="1";
				jAlert("净残值不能大于净值","提示信息",function(){
					temp.select();
					//cursorToEnd(temp);
				});
				return;
			}
			break;
		case "z_jcz":
			if(($("#yz").html()-0)!=0){
				$("#jczl").html(numberround(z_value/$("#yz").html()*100,2));
			}
			if(z_value>($("#yz").html()-0)){
				wrongid="1";
				jAlert("净残值不能大于原值","提示信息",function(){
					temp.select();
					//cursorToEnd(temp);
				});
				return;
			}
			if(z_value>($("#jz").html()-0)){
				wrongid="1";
				jAlert("净残值不能大于净值","提示信息",function(){
					temp.select();
					//cursorToEnd(temp);
				});
				return;
			}
			break;
	}
	wrongid="0";
}
function dosaveclick(){
	var inputs = currentEditingElement.getElementsByTagName("input");
	//如果是使用年限，则分别取年文本框和月文本框的值
	if(currentEditingProperty=="synx"){
		var year=inputs[0].value;
		if((year-0)!=year||(year-0)<0){
			inputs[0].value=0;
		}
		var yue=inputs[1].value;
		if((yue-0)!=yue||(yue-0)<0||(yue-0)>=12){
			inputs[1].value=0;
		}
		var str = inputs[0].value +"年"+ inputs[1].value +"月";
		currentEditingElement.innerHTML = str;
	}else if(currentEditingProperty=="kssyrq"){
		dostartdate();
	}else if(currentEditingProperty=="dyzjkm"){
		currentEditingElement.style.overflow="hidden";
	}
	var textbox = inputs[inputs.length-1];
	if(textbox!=undefined || textbox!=null){
		currentEditingElement.innerHTML=textbox.value;
	}
	if(currentEditingElement.tagName=="TD"){
		var row = currentEditingElement.parentNode;
		//判断是否增加新行
		if(row.rowIndex==row.parentNode.rows.length-1){
			var existsContent = false;
			for(var i=0;i<row.cells.length;i++){
				if(row.cells[i].innerHTML!=""){
					existsContent = true;
				}
			}
			if(existsContent){
				if(sheetlab=="1"){
					table_fssb_addRow();
				}else if(sheetlab=="2"){
					table_dxljl_addRow();
				}else if(sheetlab=="3"){
					table_zczyjl_addRow();
				}else if(sheetlab=="4"){
					table_tqyjl_addRow();
				}else if(sheetlab=="5"){
					table_yzbd_addRow();
				}
			}
		}
	}
	currentEditingElement=null;
}

/**
计算已计提月份
*/
function dostartdate(){
	var regExp = new RegExp(/^(((19|20)\d{2})-(0?[1-9]|1[012])-[3][0-1])|((((19|20)\d{2})-(0?[1-9]|1[012])-[12]\d{1})|(((19|20)\d{2})-(0?[1-9]|1[012])-0?[1-9]))$/);
	var starttimes = $("#my97DatePickerField").val();
	if(!starttimes.match(regExp)){
		jAlert("不符合日期格式！");
		$("#my97DatePickerField").val("");
		$("#yjtyf").html("0");
		return;
	}
	var starttime=$("#my97DatePickerField").val().split("-");
	var nowtime=$("#rq").html().split("-");
	if((nowtime[0]-0)!=(starttime[0]-0)||(nowtime[1]-0)!=(starttime[1]-0)){
		$("#my97DatePickerField").val("");
		$("#yjtyf").html("0");
		jAlert("新资产的开始使用日期必须在本月");
	}
}
function nulltostring(tempvalue){
	if(tempvalue==null||tempvalue==""||tempvalue=="null"){
		tempvalue="";
	}
	return tempvalue;
}
function doupdate(){
	smark="1";
	$("#saveid").attr("disabled",false);
}


