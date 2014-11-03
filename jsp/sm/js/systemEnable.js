var account = window.parent.valueMap.get("systemEnable");
var initdate="";//封装初始数据
var currentLoginedUaAccount;
//修改时调用此方法
if(account == null || account.iyear == undefined || account.imonth == undefined){
	currentLoginedUaAccount = window.parent.document.getElementById("register").getElementsByTagName("iframe")[0].contentWindow.uaAccount;
	account = {
		accid:currentLoginedUaAccount.id,
		caccId:currentLoginedUaAccount.caccId,
		caccName:currentLoginedUaAccount.caccName,
		iyear:currentLoginedUaAccount.iyear,
		imonth:currentLoginedUaAccount.imonth
	};
}
$(document).ready(function(){
	var str = "[" + account.caccId +"]"+ account.caccName + " 账套启用会计期间 "+ account.iyear +" 年 "+ account.imonth +" 月";
	$("#account").html(str);
	$.ajax({
		async:false,
		url: "data/queryModular.json",
		type: 'post',
		dataType: "json",
		data:'accid='+account.accid,
		success: function(data){
			var list = data.enableList;
			var str = "";
			$("#datatable_1_bodyer").html("");
			$.each(list,function(index,i){
				var val="";
				var valDate="";
				if(i.cvalue != null){
					val=i.cvalue.substring(0,7);
					valDate=i.cvalue;
					str = '<tr><td><input type="checkbox" checked="checked"';
				}else{
					str = '<tr><td><input type="checkbox" ';
				}
				initdate=initdate+"subId="+i.csubId+"&startDate="+valDate+"&";
				str = str + 'onclick="dateFunc(this)"/><span>' + i.csubId
					+ '</span></td><td>' + i.csubName
					+ '</td><td>'+ val
					+ '</td><td><input type="hidden" name="subId" value="' + i.csubId
					+ '"/><input type="hidden" id="'+ i.csubId
					+ '" name="startDate" value="' + valDate
					+ '"/></td></tr>';
				$("#datatable_1_bodyer").append(str);
			});
		}
	  });
	
	
	/***** 选中行代码开始（如果不需要这些功能，直接将下面代码移出即可）*******/

	//当前被点击选中的行全局变量
	var currentSeletedRow=null;

	var datatable_1 = document.getElementById("datatable_1_bodyer");
	for(var i=0;i<datatable_1.rows.length;i++){

		datatable_1.rows[i].onclick=function(e){
			
			var evt=(window.event || e);//获得事件
			var evtsrc = (evt.srcElement || evt.target);
			if(currentSeletedRow!=null && evtsrc.tagName=="TD"){
				currentSeletedRow.style.backgroundColor="#fff";
				currentSeletedRow.style.color="#000";
			}
			if(evtsrc.tagName=="TD"){
				evtsrc.parentNode.style.backgroundColor="#00f";
				evtsrc.parentNode.style.color="#fff";
				currentSeletedRow=evtsrc.parentNode;
			}
		};
	}


	/***** 选中行代码结束*******/
});
function dateFunc(date1){

	if(date1.checked==true){

		
		WdatePicker({
			el:'dateflag',
			position:{left:230,top:0},
			
			onpicking:function(dp){
				var newSelectedDate=dp.cal.getNewDateStr();
				//调用日期调动函数
				var td = date1.parentNode;
				var subid = $(td).find("span").eq(0).html();
				var glDateVal = $("#GL").val();
				var glDate = glDateVal==""?"":parseInt(glDateVal.substring(5,7));
				
				var currentYear = newSelectedDate.split("-")[0]-0;
				var crrentMonth = newSelectedDate.split("-")[1]-0;
				if(currentYear < parseInt(account.iyear)){
					
					jAlert("无法找到对应的会计启用年和月！","提示信息",function(){
						$(date1).attr("checked",false);
					});


					return;
				}
				if(crrentMonth< parseInt(account.imonth)){

					jAlert("系统启用会计期间必须大于等于账套启用会计期间","提示信息",function(){
						$(date1).attr("checked",false);
					});

					
				}else{
					if(glDate != ""){
						
						if(subid=='FA' && crrentMonth < glDate){
							
							jAlert("固定资产的启用月必须大于等于总账的未结账月：" + glDate + "月!","提示信息",function(){
								$(date1).attr("checked",false);
							});

							
						}else if(subid=='WA' && crrentMonth < glDate){
							

							jAlert("工资管理的启用月必须大于等于总账的未结账月：" + glDate + "月!","提示信息",function(){

								$(date1).attr("checked",false);
							});

						}else{
							setTableDate(newSelectedDate,td);
						}
					}else{
						setTableDate(newSelectedDate,td);
					}
				}
				
				//应该加上判断调用日期调动函数是否返回成功
				//否则应该让datePicker重新显示
				//主要是为了解决当处理失败时datePicker也消失了
			}
		});
	}else{
		var tr = date1.parentNode;
		$dp.hide();
		setTableDate("",tr);
	}
}

function setTableDate(newSelectedDate,td){
	var d;
	(newSelectedDate.length >= 7)?d=newSelectedDate.substring(0,7):d="";
	$(td).next().next().html(d);
	var subid = $(td).find("span").eq(0).html();
	$("#"+subid).val(newSelectedDate);
}
function exit(){
	window.parent.closeWindow('systemEnable');
}
function onWindowClose(){
	var newparam="";
	var param = $("#form1").serialize();
	var newdates=param.split("&");
	var olddates=initdate.split("&");
	for(var i=0;i<5;i++){
		if(newdates[i*2+1]!=olddates[i*2+1]){
			newparam=newparam+newdates[i*2]+"&"+newdates[i*2+1]+"&";
		}
	}
	if(newparam!=""){
		/*shulei
		$.ajax({
			async:false,
			url: "uaAccount!enableModular.action",
			type: 'post',
			dataType: "json",
			data:newparam+"uaAccount.id="+account.accid+"&uaAccount.iyear="+account.iyear,
			success: function(data){
				
			}
		});
		*/
	}
}

var currentClickedCheckbox = null;




$(document).bind("mouseup",function(e){

	var evtsrc = e.target;
	if((evtsrc.type=="checkbox" && evtsrc.checked==false) || evtsrc.type!="checkbox"){
		//遍历表格，将没有日期值的行复选框取消选中
		var trs = $("#datatable_1_bodyer").find("tr");
		trs.each(function(i){
			
			var v = $(this).find("td").eq(2).html();
			if(v==""){
				var cb = $(this).find("td").eq(0).find("input[type=checkbox]");
				if(cb!=evtsrc)
					cb.attr("checked",false);
			}
		});
		
	}
	
});


