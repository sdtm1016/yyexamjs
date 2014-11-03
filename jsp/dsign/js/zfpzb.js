
	var selectedDate = window.parent.valueMap.get("gl_dsign_zfpzb");

	function btnConfirm(){
		
		//得到所有选择的行
		var cells = $("#datarows").find("tr").find("td:eq(3)");
		
		
		var dsignAccvouchList = new Array();
		
		var pos = selectedDate.indexOf(".");
		
		var strYear = selectedDate.substring(0,pos);
		var strMonth = selectedDate.substring(pos+1);
		
		cells.each(function(i){
			if($(this).html()=="Y"){
				var r = $(this).parent();
				var o = new Object();
				o.dbillDate=r.attr("dbillDate");//制单日期
				o.inoId=r.attr("inoId");//凭证号
				o.csign=r.attr("csign");//凭证类字
				o.cbill=r.attr("cbill");//制单人
				o.iyear=strYear;
				o.iperiod=strMonth;
				dsignAccvouchList.push(o);
			}
		});
		
		
		var param = toUrlParam(dsignAccvouchList,'dsignAccvouchList');
		
		var url = "dsignAccvouch!deleteAbandonedGlAccvouch.action?";
		 $.ajax({
			url: url,
			type: 'post',
			async:false,
			data:param,
			dataType: "json",
			success: function(data){
				
		
				  
				jAlert("凭证整理完毕！","提示",function(){
					
					
					window.parent.closeWindow('gl_dsign_zfpzb');
					window.parent.getWindow('dsign').addDsign();
					window.parent.getWindow('dsign').showLastDsign();
					window.parent.getWindow('dsign').curDsignFlag = 0;//设置凭证作废状态为未作废
					
					window.parent.getWindow('dsign').document.getElementById("zuofeiDsignimg").style.display = "none";
					window.parent.getWindow('dsign').showLastDsign();
					
					
					//整理完毕，显示最后一张凭证
					//showLastDsign();
				});
			}
		});

	}

	//全选
	function allYes(){
		$("#datarows").find("tr").find("td:eq(3)").html("Y");
	}

	//全消
	function allNo(){
		$("#datarows").find("tr").find("td:eq(3)").html("");
	}


	$(document).ready(function(){
		//根据会计期间查询所有已作废的凭证
		$.ajax({
				url:"dsignAccvouch!findAllAbandonedGlAccvouchByPeriod.action?selectedDate=" + selectedDate,
				type:"post",
				dataType:"json",
		 		async:false,
				success: function(data){
					
					var dal = data.dsignAccvouchList;
					$("#datarows").html("");
					$(dal).each(function(i){
						var dbillDate = $(this)[0].dbillDate;
						dbillDate = dbillDate.substring(0,10);
						
						var inoId = $(this)[0].inoId+"";
						var tempInoId = "";
						for(var i=0;i<4-inoId.length;i++){
							tempInoId="0"+tempInoId;
						}
						tempInoId=tempInoId+inoId;
						var csign=$(this)[0].csign;
						var csignAndInoId=csign+"-"+tempInoId;
						var cbill = $(this)[0].cbill;
						$("#datarows").append("<tr dbillDate='"+dbillDate+"' inoId='"+inoId+"' csign='"+csign+"' cbill='"+cbill+"'><td width='106'>"+dbillDate+"</td><td width='106'>"+csignAndInoId+"</td><td width='95'>"+cbill+"</td><td width='46'></td></tr>");
						
					});
					
					
					

					//绑定行双击事件	
					$("#datarows").find("tr").bind("dblclick",function(e){
						var t = $(this).find("td").eq(3).html();
						if(t=="")
							$(this).find("td").eq(3).html("Y");
						else
							$(this).find("td").eq(3).html("");
					});
					
					
					
					
				}
			});
		
		
		
	});