	var cgzgradenum = window.parent.parent.wa_currentWaAccount.cgzgradenum;
	function moveUp(){
		var s1 = document.getElementById("select_1");
		var s2 = document.getElementById("select_2");
		
		try{
			var so = s2.options[s2.selectedIndex];
			s1.options.add(new Option(so.text,so.value));
			s2.remove(s2.selectedIndex);
		}catch(e){}
	}

	function moveDown(){
	
		var s1 = document.getElementById("select_1");
		var s2 = document.getElementById("select_2");
		
		try{
			var so = s1.options[s1.selectedIndex];
			s2.options.add(new Option(so.text,so.value));
			s1.remove(s1.selectedIndex);
		}catch(e){}
	}
	function allMoveUp(){
	
		var s1 = document.getElementById("select_1");
		var s2 = document.getElementById("select_2");
		
		try{
			while(s2.options.length>0){
				s1.options.add(new Option(s2.options[0].text,s2.options[0].value));
				s2.remove(0);
			}
		}catch(e){}
		
	}

	function allMoveDown(){
	
		var s1 = document.getElementById("select_1");
		var s2 = document.getElementById("select_2");
		try{
			while(s1.options.length>0){
				s2.options.add(new Option(s1.options[0].text,s1.options[0].value));
				s1.remove(0);
			}
		}catch(e){}
		
	}
//
/**
 * 李月玲 2013-6-27
 * 加载工资项目 start
 */
    var status = window.parent.parent.wa_wageTypeId;//（1：已登录，0：未登录）
	var wa_isWageSets = window.parent.parent.wa_isWageSets;//(0：未建立;1:单工资；2：多工资)
	function loadItems(){
		$.ajax({
			url:"wageSetting!queryWageProject.action",
			data:"stauts=" + status + "&waAccount.cgzgradenum=" + cgzgradenum+"&wa_isWageSets="+wa_isWageSets,
			type:"post",
			dataType:"json",
			async:false,
			success:function(data){
				//工资项目
				var gzxmList = data.objList[0];
				var gzxmStr = "";
				$("#select_1").empty();
				for ( var i= 0; i <  gzxmList.length ; i++) {
					gzxmStr += "<option value='"+gzxmList[i].igzitemId+"'>"+gzxmList[i].csetgzitemname+"</option>";
				}	
				$("#select_1").append(gzxmStr);
			}
		});
	}
/* end */
function btnConfirm(){
	
	/*获取需要清零项目ID串 李月玲 2013-6-27 start*/
	//var itemIdStr="";
	//$("#select_2").find("option").each(function(){
		
		//var val=$(this).val();
		//itemIdStr+=val+",";
	//});
	
	//var itemIdStr="";
	var columnIds = "";
	$("#select_1").find("option").each(function(){
		columnIds+=","+$(this).val();
	});
	if(columnIds!=""){
		columnIds = columnIds.substring(1);
	}
	var parentwin = window.parent.getParentWindow("wa_change_gl");
	parentwin.hidecolumn(columnIds);
	window.parent.closeWindow("wa_change_gl");
}

//保存按钮
function btnSave(){
	
}

//删除按钮
function btnDelete(){
	
}


$(function(){
	//初始化工资项目
	loadItems();
});

function glchange(value){
	if(value==2){
		window.parent.openWindow('wa_change_gl',"wa_change_main");
		//alert("open window");
	}else{
		loadData();
		if($("#wageMoveTB").length>0){calculation();}
		
	}
	
	
}