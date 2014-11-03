
	var isOk = false;
	//当前步骤 current displayed panel
	var cdp=1;
	
	//下一步按钮控制处理函数
	function next(){
		if (clickBz==true) {
			jAlert("请选择需要结账的月份后，再进行结账！","提示");
			return ;
		}
		if (selGlflag=="2") {
			jAlert("你选择的月份已经结账，不允许再进行结账！请选择没有结账的月份进行结账！","提示");
			return ;
		}
		//跳到下一步前：
		switch(cdp){
		
		//如果是步骤1：
		case 1:
			//根据上一步骤的操作结果进行跳转控制
			$("#btn_stop").hide();
			$("#btn_prev").show();
			$("#btn_next").hide();
			$("#btn_check").show();
			$("#btn_over").hide();
			$("#btn_cancel").show();
			snp();
			break;
			
		//如果是步骤2
		case 2:
			//根据上一步骤的操作结果进行跳转控制
			
			$("#btn_stop").hide();
			$("#btn_prev").show();
			$("#btn_next").show();
			$("#btn_check").hide();
			$("#btn_over").hide();
			$("#btn_cancel").show();
			//试算平衡
			shisuan();
			snp();
			break;
			
		//如果是步骤3
		case 3:
			//根据上一步骤的操作结果进行跳转控制
			
			//判断是否通过工作检查，如果通过则显示上一步、结账、取消按钮，否则，仅显示上一步、取消两个按钮
			
			if(isOk){
				$("#btn_stop").hide();
				$("#btn_prev").show();
				$("#btn_next").hide();
				$("#btn_check").hide();
				$("#btn_over").show();
				$("#btn_cancel").show();
				
				//设置文本内容为通过检查
				$("#statusimage").attr("src","../../../images/gl/glci2.jpg");
				$("#resultcontent").css("color","blue");
				$("#resultcontent").html("工作检查完成，上月已结账，本月可以结账！");
				$("date_4").html("2013年01月");
			}else{
				$("#btn_stop").hide();
				$("#btn_prev").show();
				$("#btn_next").hide();
				$("#btn_check").hide();
				$("#btn_over").hide();
				$("#btn_cancel").show();
				
				//设置文本内容为未通过检查，不能结账
				$("#statusimage").attr("src","../../../images/gl/glci1.jpg");
				$("#resultcontent").css("color","red");
				$("#resultcontent").html("未通过工作检查，不可以结账！");
				$("date_4").html("2013年01月");
			}
			
			snp();
			break;
		}
		
	}

	
	
	function changeFace(isOk){
		if(isOk){
			$("#btn_stop").hide();
			$("#btn_prev").show();
			$("#btn_next").hide();
			$("#btn_check").hide();
			$("#btn_over").show();
			$("#btn_cancel").show();
			
			//设置文本内容为通过检查
			$("#statusimage").attr("src","../../../images/gl/glci2.jpg");
			$("#resultcontent").css("color","blue");
			$("#resultcontent").html("工作检查完成，上月已结账，本月可以结账！");
			$("date_4").html("2013年01月");
		}else{
			$("#btn_stop").hide();
			$("#btn_prev").show();
			$("#btn_next").hide();
			$("#btn_check").hide();
			$("#btn_over").hide();
			$("#btn_cancel").show();
			
			//设置文本内容为未通过检查，不能结账
			$("#statusimage").attr("src","../../../images/gl/glci1.jpg");
			$("#resultcontent").css("color","red");
			$("#resultcontent").html("未通过工作检查，不可以结账！");
			$("date_4").html("2013年01月");
		}
		
	}
	
	
	
	
	
	//上一步按钮控制处理函数
	function prev(){
		

		//跳到上一步前：
		switch(cdp){
		
		//如果是步骤4
		case 4:
			//根据下一步骤的操作结果进行跳转控制
			$("#btn_stop").hide();
			$("#btn_prev").show();
			$("#btn_next").show();
			$("#btn_check").hide();
			$("#btn_over").hide();
			$("#btn_cancel").show();
			spp();
			break;
			
		//如果是步骤3
		case 3:
			//情况对账情况
			for(var i=1;i<=6;i++){
				$("#panel_2_step_"+i).find("div").eq(0).html('');
			}
			$("#panel_2_step_info").html("");
			//根据下一步骤的操作结果进行跳转控制
			$("#btn_stop").hide();
			$("#btn_prev").show();
			$("#btn_next").hide();
			$("#btn_check").show();
			$("#btn_over").hide();
			$("#btn_cancel").show();
			spp();
			break;
			
		//如果是步骤2
		case 2:
			//根据下一步骤的操作结果进行跳转控制
			$("#btn_stop").hide();
			$("#btn_prev").hide();
			$("#btn_next").show();
			$("#btn_check").hide();
			$("#btn_over").hide();
			$("#btn_cancel").show();
			spp();
			break;
		}
		
		
	}
	
	//显示下一步骤面板函数（用在next()函数里）
	function snp(){
		if(cdp<4){
			//隐藏当前步骤面板
			document.getElementById("panel_"+cdp).style.display="none";
			//更新步骤标识为下一步骤
			cdp++;
			//显示下一步骤面板
			document.getElementById("panel_"+cdp).style.display="block";
			
		}
		leftstep(cdp);
		
	}
	
	//显示上一步骤面板函数（用在next()函数里）
	function spp(){
		if(cdp>1){
			//隐藏当前步骤面板
			document.getElementById("panel_"+cdp).style.display="none";
			//更新步骤标识为上一步骤
			cdp--;
			//显示上一步骤面板
			document.getElementById("panel_"+cdp).style.display="block";
			leftstep(cdp);
		}
	}
	
	
	//左边标记控制函数
	function leftstep(step){
		for(var i=1;i<=4;i++){
			document.getElementById("steps_"+i).style.color="blue";
		}
		document.getElementById("steps_"+step).style.color="red";
		
	}
	
	
	
	//页面初始化.第三步表格第一列单元格背景颜色指定
	$(function(){
		
		$("#datatable_2_bodyer").children().each(function(index, element) {
		    $(this).find("td:first").css({borderTop:"1px solid #fff",borderLeft:"1px solid #fff",borderRight:"1px solid #000",borderBottom:"1px solid #000",backgroundColor:"#D4D0C8"});
		});

	
	});
	




	/**
	 * 快捷键事件处理
	 */
	document.onkeydown=function(){
		
		//ctrl+ shift + f6 并且当前业务步骤为1
		if(event.keyCode==117 && event.ctrlKey && event.shiftKey && cdp==1){
			
			//TODO ...
			backcheckout();
		}
		
	};










