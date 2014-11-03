
/***
 * 
 * 资产变动 相关JS代码
 * 
 */

//页面加载完后为entryDate文本框赋值，填入默认录入时间

/**
function setEntryDate(){
	var date = new Date();
	var ds = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
	
	document.getElementById("entryDate").value=ds;
}

$(document).ready(function(){
	setEntryDate();
});
*/




var currentEditingElement = null;

/*判断是否可编辑 三种状态：（0：可编辑，1：只读，2：样式无反应），注意：在指定状态为2时，必须同时清除文本框和按钮*/
function editerState(container){
	var editstate = $(container).attr("editstate")+"";
	var textbox = $(container.getElementsByTagName("input")[0]);
	if(editstate == "0"){
		textbox.css("background-color","#fff");
		if(textbox.attr("type")=="button"){
			textbox.attr("disabled",false);
		}else{
			textbox.attr("readonly",false);
		}
	}else if(editstate == "1"){
		textbox.css("background-color","#ccc");
		if(textbox.attr("type")=="button"){
			textbox.attr("disabled",true);
		}else{
			textbox.attr("readonly",true);
		}
	}
	
}
function faCardEdit(event,div){
	var editstate = null;
	try{
		editstate = $(div).attr("editstate")+"";
		if(editstate == "2"){
			return false;
		}
	}catch(e){
		return false;
	}
	//避免重复点击，重复往div里添加innerHTML内容产生混乱
	if(div.getElementsByTagName("input").length==0){
		
		//如果有其他单元正处于编辑状态，那么还需要将其他单元取消编辑状态
		if(currentEditingElement!=null){
			try{
				var inputs = currentEditingElement.getElementsByTagName("input");
				currentEditingElement.innerHTML=inputs[inputs.length-1].value;
				currentEditingElement=null;
			}catch(e){
				currentEditingElement=null;
			}
		}
		
		var componentId = div.id;
		//临时取得div的innerHTML
		var temp = div.innerHTML;
		
		//根据被点击的div的id来判定应该往里面放哪些控件。
		switch(componentId){
		
		/*原值增加开始*/
		//卡片编号
		case "add_kpbh":
			var component = "<input type='button' value='卡片编号' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick=\"window.parent.openWindow('fa_basic_ref_cr','fa_card_assetschange');\"/><input type='text' value='"+temp+"' onblur='' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[1].select();
			currentEditingElement=div;
			break;
		//日期
		case "add_rq":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//变动单编号
		case "add_bddbh":
			if(editstate == "0"){
				var component = "<input type='button' value='变动单编号' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick=\"window.parent.openWindow('fa_basic_ref_cfr','fa_card_assetschange');\"/><input type='text' value='"+temp+"' onblur='' style='height:14px;width:90px;margin-top:-4px;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[1].select();
				currentEditingElement=div;
				
			}else if(editstate == "1"){
				var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
			}
			
			break;
		//固定资产编号
		case "add_gdzcbh":
			var component = "<input type='button' value='固定资产编号' onclick=\"window.parent.openWindow('fa_basic_ref_cr','fa_card_assetschange');\" style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;'/><input type='text' value='"+temp+"' onblur='' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[1].select();
			currentEditingElement=div;
			break;
		//固定资产名称
		case "add_gdzcmc":
          var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:280px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//规格型号
		case "add_ggxh":
	     var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//开始使用日期
		case "add_kssyrq":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//币种
		case "add_bz":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//汇率
		case "add_hl":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//变动原因
		case "add_bdyy":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:474px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			
			editerState(div);
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//变动前原值
		case "add_bdcyz":
	        var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//变动后原值
		case "add_bdhyz":
	        var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:280px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;	
		//变动前净残值
		case "add_bdcjcz":
	        var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//变动后净残值
		case "add_bdhjcz":
	        var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:280px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;	
		//净残值率
		case "add_jczl":
			var component = "<input type='text' value='"+temp+"' currentValue='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			editerState(div);
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			$("#add_jczl :input").bind("keyup",function(){
				var currentValue = $.trim($(this).val());
				var checkcurrentValue = currentValue;
				currentValue = currentValue.replaceAll("%","");
				if(isNaN(currentValue)||checkcurrentValue.indexOf("%")!=checkcurrentValue.length-1){
					currentValue = $(this).attr("currentValue");
					$(this).val(currentValue);
				}
				currentValue = $.trim(currentValue);
				currentValue = currentValue.replaceAll("%","");
				var addmoney = parseInt($("#add_zjje").html());
				currentValue = currentValue*1;
				var jczl = currentValue/100;
				if(addmoney==0){
					jAlert("请填写增加金额！");
					$(this).val($(this).attr("currentValue"));
					return;
				}else if(currentValue>100){
					jAlert("净残值率不能大于等于100%");
					$(this).val($(this).attr("currentValue"));
				}else{
					$("#add_jcz").html(numberround(addmoney*jczl,2));
					$("#add_bdhjcz").html(numberround(($("#add_bdcjcz").html()*1+addmoney*jczl),2));
					currentValue=currentValue+"%";
					$(this).attr("currentValue",currentValue);
					if($(this).val().indexOf("%")==-1){
						$(this).val(currentValue);
					}
				}
			});
			break;
		//净残值
		case "add_jcz":
            var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:280px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			editerState(div);
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			$("#add_jcz :input").bind("keyup",function(){
				var addmoney = parseInt($("#add_zjje").html());
				if($("#add_zjje").html()==""||addmoney==0){
					jAlert("请填写增加金额！");
					$(this).val("0.00");
				}else{
					var jczvalue = $(this).val();
					if(addmoney<=jczvalue){
						jAlert("净残值率不能大于等于100%");
						$(this).val(jczvalue.substring(0,jczvalue.length-1));
					}else if(isNaN(jczvalue)){
						$(this).val("0.00");
					}else{
						jczvalue = jczvalue/addmoney;
						jczvalue = jczvalue*100;
						jczvalue = jczvalue.toFixed(2);
						jczvalue =jczvalue+"%";
						$("#add_jczl").html(jczvalue);
						$("#add_bdhjcz").html(numberround(($("#add_bdcjcz").html()*1+$(this).val()*1),2));
					}
				}
			});
			break;
		//增加金额
		case "add_zjje":
			
			var component = "<input type='text' value='"+temp+"' currentvalue='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			editerState(div);
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			$("#add_zjje :input").bind("keyup",function(){
				var addmoney = ie8trim($(this).val());
				if(isNaN(addmoney)){
					addmoney = $(this).attr("currentvalue");
					$(this).val(addmoney);
				}
				$(this).attr("currentvalue",addmoney);
				addmoney =parseFloat(addmoney);
				var changeRate = $("#add_jczl").html();
				changeRate = changeRate.substring(0, changeRate.indexOf("%"));
				var changevalue = addmoney*changeRate/100;
				changevalue = numberround(changevalue,2);
				if(!isNaN(changevalue)){
					//变动的净残值
					$("#add_jcz").html(changevalue);
				}else{
					$("#add_jcz").html("0.00");
				}
				//变动前原值
				var changeaftervalue = $("#add_bdcyz").html();
				if(!isNaN(addmoney)){
					changeaftervalue = parseFloat(changeaftervalue)+parseFloat(addmoney);
				}
				changeaftervalue = numberround(changeaftervalue,2);
				if(!isNaN(changeaftervalue)){
					//变动后原值
					$("#add_bdhyz").html(changeaftervalue);
				}else{
					$("#add_bdhyz").html("0.00");
				}
				/*变动前净残值*/
				var changebeforeval = $("#add_bdcjcz").html();
				//变动后净残值
				changebeforeval = parseFloat(changebeforeval)+changevalue;
				changebeforeval = numberround(changebeforeval,2);
				if(!isNaN(changebeforeval)){
					$("#add_bdhjcz").html(changebeforeval);
				}else{
					$("#add_bdhjcz").html($("#add_bdcjcz").html());
				}
				
			});

			break;
		//录入人
		case "add_lrr":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
        /*原值增加结束*/
		
			
			
			
			/*原值减少开始*/
			//卡片编号s
			case "reduce_kpbh":
				var component = "<input type='button' value='卡片编号' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick=\"window.parent.openWindow('fa_basic_ref_cr','fa_card_assetschange');\"/><input type='text' value='"+temp+"' onblur='' style='height:14px;width:90px;margin-top:-4px;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[1].select();
				currentEditingElement=div;
				
				break;
			//日期
			case "reduce_rq":
				var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				break;
			//变动单编号
			case "reduce_bddbh":
				if(editstate == "0"){
					var component = "<input type='button' value='变动单编号' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick=\"window.parent.openWindow('fa_basic_ref_cfr','fa_card_assetschange');\"/><input type='text' value='"+temp+"' onblur='' style='height:14px;width:90px;margin-top:-4px;'/>";
					div.innerHTML=component;
					div.getElementsByTagName("input")[1].select();
					currentEditingElement=div;
					
				}else if(editstate == "1"){
					var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
					div.innerHTML=component;
					div.getElementsByTagName("input")[0].select();
					currentEditingElement=div;
				}
				break;
			//固定资产编号
			case "reduce_gdzcbh":
				var component = "<input type='button' value='固定资产编号'      style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick=\"window.parent.openWindow('fa_basic_ref_cr','fa_card_assetschange');\"/><input type='text' value='"+temp+"' onblur='' style='height:14px;width:90px;margin-top:-4px;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[1].select();
				currentEditingElement=div;
				break;
			//固定资产名称
			case "reduce_gdzcmc":
	          var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:280px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				break;
			//规格型号
			case "reduce_ggxh":
		     var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				break;
			//开始使用日期
			case "reduce_kssyrq":
				var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				break;
			//币种
			case "reduce_bz":
				var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				break;
			//汇率
			case "reduce_hl":
				var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				break;
			//变动原因
			case "reduce_bdyy":
				var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:474px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				editerState(div);
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				break;
			//变动前原值
			case "reduce_bdcyz":
		        var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				break;
			//变动后原值
			case "reduce_bdhyz":
		        var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:280px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				break;	
			//变动前净残值
			case "reduce_bdcjcz":
		        var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				break;
			//变动后净残值
			case "reduce_bdhjcz":
		        var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:280px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				break;	
			//净残值率
			case "reduce_jczl":
				var component = "<input type='text' value='"+temp+"' currentValue='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				editerState(div);
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				$("#reduce_jczl :input").bind("keyup",function(){
					var currentValue = $.trim($(this).val());
					var checkcurrentValue = currentValue;
					currentValue = currentValue.replaceAll("%","");
					if(isNaN(currentValue)||checkcurrentValue.indexOf("%")!=checkcurrentValue.length-1){
						currentValue = $(this).attr("currentValue");
						$(this).val(currentValue);
					}
					currentValue = $.trim(currentValue);
					currentValue = currentValue.replaceAll("%","");
					var addmoney = parseInt($("#reduce_zjje").html());
					currentValue = currentValue*1;
					var jczl = currentValue/100;
					//变动后净残值
					var bdhjcz = numberround(($("#reduce_bdcjcz").html()*1-addmoney*jczl),2);
					if(addmoney==0){
						jAlert("请填写减少金额！");
						$(this).val($(this).attr("currentValue"));
						return;
					}else if(currentValue>100){
						jAlert("净残值率不能大于等于100%");
						$(this).val($(this).attr("currentValue"));
					}else if(bdhjcz<0){
						//$(this).val();
						var zhevalue = $(this).attr("currentValue");
						var thebdhjcz = $("#reduce_bdhjcz").html();
						$("#reduce_bdhjcz").html(bdhjcz);
						jAlert("净残值不能小于0!","提示信息",function(){
							$("#reduce_jczl :input").val(zhevalue);
							$("#reduce_bdhjcz").html(thebdhjcz);
						});
					}else{
						$("#reduce_jcz").html(numberround(addmoney*jczl,2));
						$("#reduce_bdhjcz").html(bdhjcz);
						currentValue=currentValue+"%";
						$(this).attr("currentValue",currentValue);
						if($(this).val().indexOf("%")==-1){
							$(this).val(currentValue);
						}
					}
				});
				break;
			//净残值
			case "reduce_jcz":
	            var component = "<input type='text' value='"+temp+"' currentvalue='"+temp+"' readonly='readonly' style='height:14px;width:280px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				editerState(div);
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				$("#reduce_jcz :input").bind("keyup",function(){
					var addmoney = parseInt($("#reduce_zjje").html());
					//var currentvalue = $.trim($(this).val());
					if($("#reduce_zjje").html()==""||addmoney==0){
						jAlert("请填写减少金额！");
						$(this).val($(this).attr("currentvalue"));
					}else{
						var jczvalue = $(this).val();
						//变动后净残值
						var bdhjcz = numberround(($("#reduce_bdcjcz").html()*1-$(this).val()*1),2);
						if(addmoney<=jczvalue){
							jAlert("净残值率不能大于等于100%");
							$(this).val(jczvalue.substring(0,jczvalue.length-1));
						}else if(isNaN(jczvalue)){
							$(this).val($(this).attr("currentvalue"));
						}else if(bdhjcz<0){
							var thevalue = $(this).attr("currentvalue");
							var thebdhjcz = $("#reduce_bdhjcz").html();
							$("#reduce_bdhjcz").html(bdhjcz);
							jAlert("净残值不能小于0!","提示信息",function(){
								$("#reduce_jcz :input").val(thevalue);
								$("#reduce_bdhjcz").html(thebdhjcz);
							});
						}else{
							$(this).attr("currentvalue",jczvalue);
							
							jczvalue = jczvalue/addmoney;
							jczvalue = jczvalue*100;
							jczvalue = jczvalue.toFixed(2);
							jczvalue =jczvalue+"%";
							$("#reduce_jczl").html(jczvalue);
							$("#reduce_bdhjcz").html(bdhjcz);
						}
					}
				});
				break;
			//减少金额
			case "reduce_zjje":
				var component = "<input type='text' value='"+temp+"' currentvalue='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				editerState(div);
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				$("#reduce_zjje :input").bind("keyup",function(){
					var addmoney = ie8trim($(this).val());
					if(isNaN(addmoney)){
						addmoney = $(this).attr("currentvalue");
						$(this).val(addmoney);
						return;
					}
					addmoney =parseFloat(addmoney); 
					var changeRate = $("#reduce_jczl").html();
					changeRate = changeRate.substring(0, changeRate.indexOf("%"));
					var changevalue = addmoney*changeRate/100;
					changevalue = numberround(changevalue,2);
					//之前的值
					var jcz = $("#reduce_jcz").html();
					var bdhyz = $("#reduce_bdhyz").html();
					if(!isNaN(changevalue)){
						//变动的净残值
						$("#reduce_jcz").html(changevalue);
					}else{
						$("#reduce_jcz").html("0.00");
					}
					//变动前原值
					var changeaftervalue = $("#reduce_bdcyz").html();
					if(!isNaN(addmoney)){
						changeaftervalue = parseFloat(changeaftervalue)-parseFloat(addmoney);
					}
					changeaftervalue = numberround(changeaftervalue,2);
					if(!isNaN(changeaftervalue)){
						//变动后原值
						$("#reduce_bdhyz").html(changeaftervalue);
					}else{
						$("#reduce_bdhyz").html("0.00");
					}
					/*变动前净残值*/
					var changebeforeval = $("#reduce_bdcjcz").html();
					//变动后净残值
					changebeforeval = parseFloat(changebeforeval)-changevalue;
					changebeforeval = numberround(changebeforeval,2);
					if(changebeforeval<0){
						var thevalue = $(this).attr("currentvalue");
						var thebdhjcz = $("#reduce_bdhjcz").html();
						
						$("#reduce_bdhjcz").html(changebeforeval);
						jAlert("净残值不能小于0!","提示信息",function(){
							$("#reduce_zjje :input").val(thevalue);
							$("#reduce_bdhjcz").html(thebdhjcz);
							
							$("#reduce_jcz").html(jcz);
							$("#reduce_bdhyz").html(bdhyz);
						});
					}else if(!isNaN(changebeforeval)){
						$(this).attr("currentvalue",addmoney);
						$("#reduce_bdhjcz").html(changebeforeval);
					}else{
						$("#reduce_bdhjcz").html($("#reduce_bdcjcz").html());
					}
					
				});
				break;
			//录入人
			case "reduce_lrr":
				var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
				break;
	        /*原值减少结束*/
			
				
			
			
			
			
			
			
		/*部门转移开始*/
		
		//卡片编号
		case "dept_kpbh":
			var component = "<input type='button' value='卡片编号' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick=\"window.parent.openWindow('fa_basic_ref_cr','fa_card_assetschange');\"/><input type='text' value='"+temp+"' onblur='' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[1].select();
			currentEditingElement=div;
			break;
		//日期
		case "dept_rq":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//变动单编号
		case "dept_bddbh":
			if(editstate == "0"){
				var component = "<input type='button' value='变动单编号' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick=\"window.parent.openWindow('fa_basic_ref_cfr','fa_card_assetschange');\"/><input type='text' value='"+temp+"' onblur='' style='height:14px;width:90px;margin-top:-4px;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[1].select();
				currentEditingElement=div;
				
			}else if(editstate == "1"){
				var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
			}
			break;
		//固定资产编号
		case "dept_gdzcbh":
			var component = "<input type='button' value='固定资产编号'      style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick=\"window.parent.openWindow('fa_basic_ref_cr','fa_card_assetschange');\"/><input type='text' value='"+temp+"' onblur='' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[1].select();
			currentEditingElement=div;
			break;
		//固定资产名称
		case "dept_gdzcmc":
          var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:280px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//规格型号
		case "dept_ggxh":
	     var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//开始使用日期
		case "dept_kssyrq":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//变动原因
		case "dept_bdyy":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:474px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			editerState(div);
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//变动前部门
		case "dept_bdqbm":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:185px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//变动后部门
		case "dept_bdhbm":
			var component = "<input type='button' value='变动后部门'      style='width:76px;height:20px;margin-left:-92px;margin-top:-4px;' onclick=\"window.parent.openWindow('fa_basic_ref_dr','fa_card_assetschange');\"/><input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:185px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			editerState(div);
			div.getElementsByTagName("input")[1].select();
			currentEditingElement=div;
			break;
		//存放地点
		case "dept_cfdd":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:185px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//新存放地点
		case "dept_xcfdd":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:185px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			editerState(div);
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//录入人
		case "dept_lrr":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		
		/*部门转移结束*/
			
			
			
			
			
			
			
			
		/*使用状况调整开始*/
		//卡片编号
		case "usestate_kpbh":
			var component = "<input type='button' value='卡片编号' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick=\"window.parent.openWindow('fa_basic_ref_cr','fa_card_assetschange');\"/><input type='text' value='"+temp+"' onblur='' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[1].select();
			currentEditingElement=div;
			break;
		//日期
		case "usestate_rq":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//变动单编号
		case "usestate_bddbh":
			if(editstate == "0"){
				var component = "<input type='button' value='变动单编号' style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick=\"window.parent.openWindow('fa_basic_ref_cfr','fa_card_assetschange');\"/><input type='text' value='"+temp+"' onblur='' style='height:14px;width:90px;margin-top:-4px;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[1].select();
				currentEditingElement=div;
				
			}else if(editstate == "1"){
				var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
				div.innerHTML=component;
				div.getElementsByTagName("input")[0].select();
				currentEditingElement=div;
			}
			break;
		//固定资产编号
		case "usestate_gdzcbh":
			var component = "<input type='button' value='固定资产编号'      style='width:88px;height:20px;margin-left:-92px;margin-top:-4px;' onclick=\"window.parent.openWindow('fa_basic_ref_cr','fa_card_assetschange');\"/><input type='text' value='"+temp+"' onblur='' style='height:14px;width:90px;margin-top:-4px;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[1].select();
			currentEditingElement=div;
			break;
		//固定资产名称
		case "usestate_gdzcmc":
          var component = "<input type='text' value='"+temp+"'  readonly='readonly' style='height:14px;width:280px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//规格型号
		case "usestate_ggxh":
	     var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//开始使用日期
		case "usestate_kssyrq":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//变动原因
		case "usestate_bdyy":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:474px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			editerState(div);
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//变动前使用状况
		case "usestate_bdqsyzk":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:185px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		//变动后使用状况
		case "usestate_bdhsyzk":
			var component = "<input type='button' value='变动后使用状况' style='width:100px;height:20px;margin-left:-93px;margin-top:-4px;' onclick=\"window.parent.openWindow('fa_basic_ref_usr','fa_card_assetschange');\"/><input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:170px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			editerState(div);
			div.getElementsByTagName("input")[1].select();
			currentEditingElement=div;
			break;
		//录入人
		case "usestate_lrr":
			var component = "<input type='text' value='"+temp+"' readonly='readonly' style='height:14px;width:90px;margin-top:-4px;background-color:#ccc;'/>";
			div.innerHTML=component;
			div.getElementsByTagName("input")[0].select();
			currentEditingElement=div;
			break;
		/*使用状况调整结束*/
			
		}
		
		if (event && event.stopPropagation){
			event.stopPropagation();
		}else{
	        window.event.cancelBubble=true;
	    }
		
		
	}else{
		$(div).find("input:text")[0].select();
		$(div).find("input:text")[0].focus();
	}
	
}





//单元失去焦点，执行单元格取消编辑状态动作：
document.onmousedown=function(e){
	
	var evt=(window.event || e);//获得事件
	var evtsrc = (evt.srcElement || evt.target);
	//alert();
//	if(table_zczyjl_current_active_dpt_cell!=null && (evtsrc.tagName!="INPUT" || (evtsrc.tagName=="INPUT" &&  evtsrc.parentNode.parentNode.className=="group"))){
//		alert("ahaha");
//		var textbox = table_zczyjl_current_active_dpt_cell.getElementsByTagName("input")[1];
//		table_zczyjl_current_active_dpt_cell.innerHTML = textbox.value;
//		table_zczyjl_current_active_dpt_cell=null;
//	
//		
//	}
//	
	
	if(currentEditingElement!=null && evtsrc.parentNode!=currentEditingElement.parentNode){
		
		if(evtsrc.tagName!="INPUT" || (evtsrc.tagName=="INPUT" && evtsrc.parentNode.parentNode.className=="group")){
			var inputs = currentEditingElement.getElementsByTagName("input");
			var textbox = inputs[inputs.length-1];
			if(textbox!=undefined || textbox!=null){
				currentEditingElement.innerHTML=textbox.value;
			}
			currentEditingElement=null;
		}
	}
	
};

function rateformat(data){
	var formatevalue;
	if(data==""||data==null){
		formatevalue="0.00%";	
	}else{
		formatevalue = data*100;
		formatevalue = numberround(formatevalue,2);
		formatevalue = formatevalue+"%";
	}
	return formatevalue;
}
//接收弹窗返回值函数
function deliverValue(param){
	
	//alert(paramObject);
	var componentId = currentEditingElement.id;
	var textbox = currentEditingElement.getElementsByTagName("input")[1];
	switch(componentId){
	
	case "dept_kpbh":
		set_value(param,textbox,3);
		break;
	case "dept_gdzcbh":
		set_value(param,textbox,3);
		break;
	case "add_kpbh":
		set_value(param,textbox,1);
		break;
	case "add_gdzcbh":
		set_value(param,textbox,1);
		break;
	case "reduce_kpbh":
		set_value(param,textbox,2);
		break;
	case "reduce_gdzcbh":
		set_value(param,textbox,2);
		break;
	case "usestate_kpbh":
		set_value(param,textbox,4);
		break;
	case "usestate_gdzcbh":
		set_value(param,textbox,4);
		break;
	case "dept_bdhbm":
		$("#dept_bdhbm").html(param.name).attr("code",param.code);
		break;
	case "usestate_bdhsyzk":
		$("#usestate_bdhsyzk").html(param.name).attr("code",param.code);
		break;
	case "add_bddbh":
		$($("#add_bddbh :input")[1]).val(param.cardCode);
		getFaVouchersBySnum(param.cardCode);
		break;
	case "reduce_bddbh":
		$($("#add_bddbh :input")[1]).val(param.cardCode);
		getFaVouchersBySnum(param.cardCode);
		break;
	case "dept_bddbh":
		$($("#dept_bddbh :input")[1]).val(param.cardCode);
		getFaVouchersBySnum(param.cardCode);
		break;
	case "usestate_bddbh":
		$($("#usestate_bddbh :input")[1]).val(param.cardCode);
		getFaVouchersBySnum(param.cardCode);
		break;
	}
		
}
function set_value(param,textbox,type){
	//设置卡片id
	$("#cardId").val(param.facards.id);
	//填充卡片编号
	$("#add_kpbh").html(param.facards.scardnum);
	$("#reduce_kpbh").html(param.facards.scardnum);
	$("#dept_kpbh").html(param.facards.scardnum);
	$("#usestate_kpbh").html(param.facards.scardnum);
	
	//当前操作人
	var	userName=getCookie("userName");//姓名
	if(type==1){

		$("#add_gdzcmc").html(param.facards.sassetname);
		//卡片型号
		$("#add_ggxh").html(param.facards.sstyle);
		$("#add_gdzcbh").html(param.facards.sassetnum);
		$("#add_kssyrq").html(param.facards.dstartdate);
		$("#add_bz").html(param.facards.scurrency);
		//param.facards.dblexchangerate  目前不支持外币，默认人民币，汇率为1
		$("#add_hl").html(1);
		var ratevalue = rateformat(param.facards.dblbvrate);
		$("#add_jczl").html(ratevalue);
		$("#add_bdcyz").html(param.facards.dblvalue.toFixed(2));
		$("#add_bdcjcz").html(param.facards.dblbv.toFixed(2));
		$("#add_bdhjcz").html(param.facards.dblbv);
		//$("#add_zjje").removeAttr("disabled");
		$("#add_zjje").text("0.00");
		$("#add_bdyy").text("");
		$("#add_jcz").text("0.00");
		$("#add_bdhyz").text("0.00");
		if(textbox!=null){
			textbox.value = param.cardCode;
			textbox.setAttribute("faCode",param.faCode);
			textbox.setAttribute("faName",param.faName);
		}
		//录入人
		$("#add_lrr").text(strNullProc(userName));
		/*设置可编辑状态*/
		$("#add_zjje").attr("editstate","0");
		$("#add_jczl").attr("editstate","0");
		$("#add_jcz").attr("editstate","0");
		$("#add_bdyy").attr("editstate","0");
	}else if(type==2){
		$("#reduce_gdzcmc").html(param.facards.sassetname);
		//卡片型号
		$("#reduce_ggxh").html(param.facards.sstyle);
		$("#reduce_gdzcbh").html(param.facards.sassetnum);
		$("#reduce_kssyrq").html(param.facards.dstartdate);
		$("#reduce_bz").html(param.facards.scurrency);
		//param.facards.dblexchangerate  目前不支持外币，默认人民币，汇率为1
		$("#reduce_hl").html(1);
		var ratevalue = rateformat(param.facards.dblbvrate);
		$("#reduce_jczl").html(ratevalue);
		$("#reduce_bdcyz").html(param.facards.dblvalue.toFixed(2));
		$("#reduce_bdcjcz").html(param.facards.dblbv.toFixed(2));
		$("#reduce_bdhjcz").html(param.facards.dblbv);
		 
		//$("#add_zjje").removeAttr("disabled");
		$("#reduce_zjje").text("0.00");
		$("#reduce_bdyy").text("");
		$("#reduce_jcz").text("0.00");
		$("#reduce_bdhyz").text("0.00");
		
		if(textbox!=null){
			textbox.value = param.cardCode;
			textbox.setAttribute("faCode",param.faCode);
			textbox.setAttribute("faName",param.faName);
		}
		//录入人
		$("#reduce_lrr").text(strNullProc(userName));
		/*设置可编辑状态*/
		$("#reduce_zjje").attr("editstate","0");
		$("#reduce_jczl").attr("editstate","0");
		$("#reduce_jcz").attr("editstate","0");
		$("#reduce_bdyy").attr("editstate","0");
	}else if(type==3){
		if(textbox!=null){
			textbox.value = param.cardCode;
		}
		$("#dept_gdzcmc").html(param.facards.sassetname);
		//卡片型号
		$("#dept_ggxh").html(param.facards.sstyle);
		$("#dept_gdzcbh").html(param.facards.sassetnum);
		$("#dept_kssyrq").html(param.facards.dstartdate);
		//录入人
		$("#dept_lrr").text(strNullProc(userName));
		if(param.facards.sdeptnum!=""&&param.facards.sdeptnum!=null){
			//部门编码
			//var dept = param.facards.sdeptnum.split(",");
			//var deptnum = dept[0];
			//var deptname = dept[1];
			//部门名称
			$("#dept_bdqbm").attr("code",param.facards.sdeptnum).html(param.facards.sdeptname);
		}else{
			$("#dept_bdqbm").removeAttr("code").html("");
		}
		$("#dept_bdhbm").removeAttr("code").html("");
		$("#dept_cfdd").html(param.facards.ssite);
		$("#dept_xcfdd").html(param.facards.ssite);
		$("#dept_bdyy").text("");
		
		$("#dept_bdhbm").attr("editstate","0");
		$("#dept_xcfdd").attr("editstate","0");
		$("#dept_bdyy").attr("editstate","0");
	}else if(type==4){
		if(textbox!=null){
			textbox.value = param.cardCode;
		}
		$("#usestate_gdzcmc").html(param.facards.sassetname);
		//卡片型号
		$("#usestate_ggxh").html(param.facards.sstyle);
		$("#usestate_gdzcbh").html(param.facards.sassetnum);
		$("#usestate_kssyrq").html(param.facards.dstartdate);
		//录入人
		$("#usestate_lrr").text(strNullProc(userName));
		if(param.facards.sstatusid!=""&&param.facards.sstatusid!=null){
			//var sstatus = param.facards.sstatusid.split(",");
			//var sstatusid = sstatus[0];
			//var sstatusname = sstatus[1];
			$("#usestate_bdqsyzk").attr("code",param.facards.sstatusid).html(param.facards.sstatusname);
		}else{
			$("#usestate_bdqsyzk").removeAttr("code").html("");
		}
		$("#usestate_bdhsyzk").removeAttr("code").html("");
		$("#usestate_bdyy").text("");
		
		$("#usestate_bdhsyzk").attr("editstate","0");
		$("#usestate_bdyy").attr("editstate","0");
	}else{
		jAlert("出现错误");
	}
}
//解决ie8没有trim的方法
function ie8trim(value){
	if(!value==""){
		value = value.replace(/(^\s*)|(\s*$)/g, "");
	}
	return value;
}



