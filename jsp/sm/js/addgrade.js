
var account = window.parent.valueMap.get("addgrade");



var tempValue="";
$(document).ready(function(){
	$.ajax({
		url:"data/queryGradeList.json",
		type:"get",
		async:false,
		data:"accid="+account.accid,
		success:function(data,status){
			var list = data.list;
			$("#gradedef").html("");
			var str = "";
			$.each(list,function(index,i){
				//alert(i.gradeclsname);
				str = '<tr id="'+i.id + 
					'"><td style="background-color: #c0c0c0;width:110px;">' + i.gradeclsname +
					'</td><td style="background-color: #c0c0c0">' + i.lgrade +
					'</td><td style="background-color: #c0c0c0">' + i.lgradelen +
					'</td><td style="background-color: #c0c0c0">' + i.singlemaximum;
				if(i.isscale == "是"){
					str = str +'</td><td class="tdbg" flag="1">' + i.isscale + '</td>'; 
				}else{
					str = str +'</td><td class="tdbg" flag="0">' + i.isscale + '</td>';
				}
					
					
				var jc = (i.codingrule).split("");
				var maxGrade = 0;
				(i.presetMaxGrade == null)?maxGrade=0:maxGrade=i.presetMaxGrade;
				for(var j = 0; j < 9 ; j++){
					if(i.isscale == "否"){
						if(j <= i.presetMaxGrade && j < jc.length){
							//已预置不可改
							str = str+ '<td class="tdbg">' + jc[j] +'</td>';
						}else{
							str = str +'<td></td>';
						}
					}else{
						if(j < maxGrade && j <= jc.length && j < i.lgrade){
							//已预置不可改
							str = str+ '<td class="tdbg">' + jc[j] +'</td>';
						}else if(j >= maxGrade && j < jc.length && j < i.lgrade){
							//已预置可改
							str = str+ '<td class="tdkg">' + jc[j] +'</td>';
						}else if(j >= maxGrade && j >= jc.length && j < i.lgrade){
							//没预置可改
							str = str+ '<td class="tdkg"></td>';
						}else{
							//不可改
							str = str +'<td></td>';
						}
					}
				}
				str = str + '</tr>';
				$("#gradedef").append(str);
				$("#gradedef_header").show();

				
			});
			
		},
		dataType:"json"
	});
	$("td").each(function(i){
			if($(this).css("background-color")=="#e9e9d6"||$(this).css("background-color")=="#ffffc0"){
				$(this).css("border-right-color","#c0c0c0");
				$(this).css("border-bottom-color","#c0c0c0");
				$(this).css("border-style","solid");
			}
		});
		$("td").each(function (i){
		//if($(this).css("background-color")=="#ffffc0"){
		if($(this).attr("class") == 'tdkg'){
			$(this).click(function(){
				var temp=$(this).html()+"";
				if($(this).prev().html() != ""){
					if(!(temp.indexOf("INPUT") > -1)){
						tempValue=temp;
						$(this).html("<input type='text' onfocus='this.style.imeMode=\"disabled\";' value='"+tempValue+"' onblur='doblur(this)' onkeydown='return proccessChar(this,event);' style='font-size:12px;width:80%;height:12px;border:0;background-color:#00ffff' />");
						$(this).children().focus();
					}
				}
			});
		//}
		}
	});
});


function proccessChar(t,e){
	var keyCode = e.keyCode;
	//如果是1-9数字键则允许keydown事件走完，否则退出
	if((keyCode>48 && keyCode<58) || (keyCode>96 && keyCode<106) || keyCode==46 || keyCode==8){
		t.value="";
		return true;
	}else{
		return false;
	}
}





function doSave(){
	var grades="";
	$("tr").each(function (i){
		if(this.id!=null&&this.id!=""){
			var td=$(this).children();
			var grade=this.id+"*"+td[0].innerHTML+"*"+td[1].innerHTML+"*"+td[2].innerHTML+"*"+td[3].innerHTML+"*"+$(td[4]).attr("flag")+"*";
			
			for(i=5;i<td.length;i++){
				grade=grade+td[i].innerHTML;
			}
			grades=grades+grade+"#";
		}
	});
	
	grades=grades.substring(0,(grades.length-1));
	
	/*shulei*/
	var grs="4800367*科目编码级次*9*15*9*1*4222".split('*');
	if(grs[grs.length-1]=="4222"){
		window.parent.updateScore('1-1',4);
	}
	window.parent.closeWindow("addgrade");
	window.parent.openWindow("accuracy","addgrade",account);
	
	
	/*shulei
	
	$.ajax({
	    url: "gradedefAction!saveGradedef",
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	if(data.mark=="0"){
	    		window.parent.closeWindow("addgrade");
	    		window.parent.openWindow("accuracy","addgrade",account);
	    	}else{
	    		if(account.action == "add"){
	    			
	    			jAlert("保存失败","提示信息",function(){

	    	    		window.parent.closeWindow("addgrade");
	    			});

	    			
	    		}else if(account.action == "upd"){
	    			
	    			jAlert("修改失败","提示信息",function(){

	    	    		window.parent.closeWindow("addgrade");
	    			});

	    		}
	    	}
	    },
	    data:"grades="+grades
	});
	*/
}
function doquxiao(){
	window.parent.closeWindow("addgrade");
	window.parent.openWindow("accuracy","addgrade",account);
};