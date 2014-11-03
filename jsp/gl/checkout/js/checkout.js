/**
 * 
 * @DESCRIBE   月末结账界面js
 * @AUTHOR     王丙建
 * @DATE       2013-01-25
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */


  
//选择id、年份、会计期间
  var selId = "";
  var selYear = "";
  var selIid = "";
  //总账结账标志
  var selGlflag = "";
  var clickBz = true; //双击标志
  var curPeriod = "";

  /**
   * 页面初始化
   */
  $(document).ready(function(){
  	//会计期间初始化
	  $("#datatable_bodyer").html("");
	  $.ajax({
		    url: "foreigncurrency!queryUaPeriods.action",
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	var uaPeriodList = data.uaPeriods;
		    	showPeriodGrid(uaPeriodList);
		    }
	  });
	  cdp=1;
	  rowSelection();

	  //选中待结账月份
	  var tr = $("#datatable_bodyer").find("tr").eq(waitCheckOutMonth-1);
	  tr.css("background-color","#00f").css("color","#fff");
	  currentSeletedRow=tr[0];
	  currentSelectedMonth=waitCheckOutMonth;
	  selectTd(tr.children().eq(1)[0]);
	  clickBz = false;
	selGlflag = "0";
  });
  
  /**
   * 会计期间初始化
   * @param periodList 会计期间列表
   */
  var waitCheckOutMonth = null;
  function showPeriodGrid(periodList) {
	  var length = periodList.length;
	  //第一个允许月结账标志
	  var firstjzMonth = false;
	  
	  for (var i = 0; i<length; i++) {
			var uaPeriod = periodList[i];
			var cyear = uaPeriod.iyear;
			var ciid = "";
			if  (uaPeriod.iid<10)
				ciid = "0" + uaPeriod.iid;
			else
				ciid= uaPeriod.iid;
		
			//总账计算标准
			var glflag = uaPeriod.glflag;
			//总账字符串
			var strglflag = "";
			if (glflag=="2") {
				selGlflag = "2";
				strglflag = "Y";
			}else {//显示初始化的显示月份
				if (firstjzMonth==false) { 
					waitCheckOutMonth=ciid;
				var curPeriod = cyear + "年" + ciid + "月";
				
				
				
			  	 document.getElementById("jzrq").innerHTML = curPeriod ;
			  	 document.getElementById("date_2").innerHTML = curPeriod ;
			  	 document.getElementById("date_3").innerHTML = curPeriod ;
				//strglflag = "Y";
			     firstjzMonth = true;
				}
			}
			
				var strPeriod = cyear + "." + ciid;
			$("#datatable_bodyer").append('<tr id="' +uaPeriod.id  
					    +'" iyear="' + cyear
						+'" iid="' +  ciid			
						+'" glflag="' +  glflag			
						
					+'"  bgcolor="#ffffff">'
					+'<td width="70" >'+ strPeriod + '</td>'
					+'<td width="80">'+strglflag + '</td>'				
				+'</tr>');
			
		}
	  
	  
  }
  
  /**
   * 单击事件
   * @param td
   */
  function selectTd(td) {
	  clickBz = false;
	  selId = td.parentNode.getAttribute("id");
	  selYear = td.parentNode.getAttribute("iyear");
	  selIid = td.parentNode.getAttribute("iid");
	  selGlflag = td.parentNode.glflag;
	  if (selGlflag=="2") {
		  clickBz = true;
		  return;
	  }
     curPeriod = selYear + "年" + selIid + "月";
     
     
  	 document.getElementById("jzrq").innerHTML = curPeriod ;
  	 document.getElementById("date_2").innerHTML = curPeriod ;
  	 document.getElementById("date_3").innerHTML = curPeriod ;
  }
  
  
  
  

	//虚拟对账
	function virtualSuccess(){
		//1.点对账的时，显示“停止”、“上一步”、“对账”、“取消”并禁用“上一步”、“对账”、“取消”
		$("#btn_stop").show();
		
		$("#btn_prev").show();
		$("#btn_prev").attr("disabled","disabled");
		
		$("#btn_next").hide();
		
		$("#btn_check").show();
		$("#btn_check").attr("disabled","disabled");
		
		$("#btn_over").hide();
		
		$("#btn_cancel").show();
		$("#btn_cancel").attr("disabled","disabled");
		

		

		//情况对账情况
		for(var i=1;i<=6;i++){
			$("#panel_2_step_"+i).find("div").eq(0).html('');
		}
		$("#panel_2_step_info").html("");
		
		
		var info = $("#panel_2_step_1").find("span").eq(0).html();
		$("#panel_2_step_info").html(info+"...");
		
		var panel_2_step_index = 0;
		//每隔100毫秒，检查一次iframe是否已加载完，是，则清除循环检查并显示window
		var itv = setInterval(function(){

			panel_2_step_index++;
			var info = $("#panel_2_step_"+panel_2_step_index).find("span").eq(0).html();
			$("#panel_2_step_info").html(info+"...");
			if(panel_2_step_index>1){
				$("#panel_2_step_"+(panel_2_step_index-1)).find("div").eq(0).html('Y');
			}

			if(panel_2_step_index==7){
				
				clearInterval(itv);
				
				$("#panel_2_step_info").html("对账完毕...");
				//2.等待处理完成
				jAlert('对账完毕',"提示",function(){
					
					//3.如果对账完毕，显示“上一步”、“下一步”、“取消”按钮
					$("#btn_stop").hide();
					
					$("#btn_prev").show();
					$("#btn_prev").attr("disabled",false);
					
					$("#btn_next").show();
					
					$("#btn_check").hide();
					$("#btn_check").attr("disabled",false);
					
					$("#btn_over").hide();
					
					$("#btn_cancel").show();
					$("#btn_cancel").attr("disabled",false);
					
				});
				
			}
		},500);
		
		
		
		
	}
	
	
  
  
  
  /**
   * 开始结账
   */
  function closeAccount() {
	  var rtnBz = true;
	  if (selYear=="") {
		  jAlert("你还没有选择会计期间，不能进行结账！","提示");
		  return false;
	  }
	  var data = "period.iyear=" + selYear + "&period.iid=" + selIid + "&period.id=" + selId;
	  
	  //记账后才允许结账 总账模块标志glflag=1为已记账标志
	  //记账标志
	  var jzBz = true;
	  $.ajax({
		    url: "foreigncurrency!queryUaPeriodByPeriod.action?year=" + selYear + "&period=" + selIid ,
		    type: 'post',
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	var mark = data.mark;
		    	if(mark=="1"){
					jAlert("你选择的会计期间还没有记账，请记账后再进行结账！","提示");
					jzBz = false;
					changeFace(false);
					return false;
				}
		    }
	  });
	  if (jzBz==true) {
		  var isuniqueness = true;
		  //判断是否允许结账
		  $.ajax({
			    url: "glCloseAccount!isUniquenessCloseAccount.action",
			    type: 'post',
			    dataType: "json",
			    data:data,
			    async:false,
			    success: function(data){
			    	isuniqueness = data.isuniqueness;
			    	if(isuniqueness==false){
						jAlert("你选择的上一个期间还没有结账，本期间不允许结账！","提示");
						changeFace(false);
						return false;
					}
			    	var mark=data.mark;
			    	if(mark=="-1"){
			    		isuniqueness=false
			    		jAlert("该期间别的模块未结账，总账不允许结账","提示");
						changeFace(false);
						return false;
			    	}
			    }
		  });
		  //上月结账成功后，本月才允许结账
	      if (isuniqueness==true && jzBz==true) {
			  $.ajax({
				    url: "glCloseAccount!execGlCloseAccount.action",
				    type: 'post',
				    dataType: "json",
				    data:data,
				    async:false,
				    success: function(data){
				    	jAlert("你选择的月份数据结账成功！","提示");
						changeFace(true);
				    	rtnBz =  true;
				    }
			  });
	      }
	      
	  }
	  return rtnBz;
	  
  }
  
  
  
  
  

	//试算
	function shisuan(){
		
		
		$.ajax({
			url: "glSaleBautotran!querySsph.action?jzMonth="+currentSelectedMonth,
			type: 'post',
			dataType: "json",
			success: function(data){
				//008
				var ssphList = data.ssphList;

				var lt = document.getElementById("lt");//左边表
				var rt = document.getElementById("rt");//右边表
				
				var la = ssphList[0];//left array
				var ra = ssphList[1];//right array

				if(la.length>3){
					la.splice(3,la.length-3);
				}
				if(ra.length>3){
					ra.splice(3,ra.length-3);
				}
				
				var ls = 0;
				var rs = 0;

				//填充左表内容
				for(var i=0;i<la.length;i++){
					lt.rows[i].cells[0].innerHTML=la[i].className;
					lt.rows[i].cells[1].innerHTML="=";
					if(la[i].sumYe==0.0){
						lt.rows[i].cells[2].innerHTML="平";
					}else{
						lt.rows[i].cells[2].innerHTML="借";
						lt.rows[i].cells[3].innerHTML=la[i].sumYe.toFixed(2);
					}
					ls += parseFloat(la[i].sumYe.toFixed(2));
				}
				
				//填充右表内容
				for(var i=0;i<ra.length;i++){
					
					rt.rows[i].cells[0].innerHTML=ra[i].className;
					rt.rows[i].cells[1].innerHTML="=";
					if(ra[i].sumYe==0.0){
						rt.rows[i].cells[2].innerHTML="平";
					}else{
						
						if(ra[i].sumYe>0){
							rt.rows[i].cells[2].innerHTML="借";
						}else{
							rt.rows[i].cells[2].innerHTML="贷";
						}
						
						rt.rows[i].cells[3].innerHTML=Math.abs(ra[i].sumYe).toFixed(2);//取绝对值
					}
					rs += parseFloat(ra[i].sumYe.toFixed(2));
				}
				
				
				//填充底部内容
				var bt = document.getElementById("bt");//底部表格
				if(ls == 0){
					bt.rows[0].cells[2].innerHTML="平";
				}else{
					bt.rows[0].cells[2].innerHTML="借";
					bt.rows[0].cells[3].innerHTML=ls.toFixed(2);
				}
				
				if(rs == 0){
					bt.rows[0].cells[6].innerHTML="平";
				}else{
					bt.rows[0].cells[6].innerHTML="贷";
					bt.rows[0].cells[7].innerHTML=Math.abs(rs).toFixed(2);
				}
				
				ls = ls.toFixed(2);
				rs = rs.toFixed(2);
				
				//设置试算结果
				if(ls != Math.abs(rs)){
					$("#shisuanjieguo").css("color","red");
					$("#shisuanjieguo").html("试算结果不平衡");
					isOk=false;
				}else{
					$("#shisuanjieguo").css("color","blue");
					$("#shisuanjieguo").html("试算结果平衡");
					isOk=true;
				}
				
				
			}
		  });
	}
	
	function backcheckout(){
		if (selYear=="") {
			jAlert("请选择要反结账的期间","提示");
			return false;
		}
		var trs=$("#datatable_bodyer").find("tr[glflag='2']");
		if(trs.length==0){
			return false;
		}else{
			var t_iid=trs.last().attr("iid");
			if(t_iid!=selIid){
				jAlert("只能取消最后一个已结账月份的结账标志","提示");
				return false;
			}else{
				$.ajax({
					url: "glCloseAccount!backcheckout?period.id=" + selId,
					type: 'post',
					dataType: "json",
					success: function(data){
						//008
						var mark=data.mark;
						if(mark=="0"){
							jAlert("启用时间以前不能取消结账","提示");
							return false;
						}else if(mark=="1"){
							$(currentSeletedRow).attr("glflag","0");
							$(currentSeletedRow).children()[1].innerHTML="";
							selGlflag="0";
							var curPeriod=selYear + "年" + selIid + "月";
							
							
							document.getElementById("jzrq").innerHTML =curPeriod;
						  	document.getElementById("date_2").innerHTML = curPeriod ;
						  	document.getElementById("date_3").innerHTML = curPeriod ;
						  	clickBz=false;
						}
						
					}
				  });
			}
		}
	}
