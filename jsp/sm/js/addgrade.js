
var account = window.parent.valueMap.get("addgrade");



var tempValue="";
$(document).ready(function(){
	/*$.ajax({
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
	});*/
	
	var data={"accid":4800197,"gradedef":null,"grades":null,"keyword":null,"list":[{"accid":4800197,"codingrule":"4","gradeclsname":"科目编码级次","id":4800367,"isscale":"是","keyword":"code","lgrade":9,"lgradelen":15,"presetMaxGrade":"1","singlemaximum":9},{"accid":4800197,"codingrule":"2","gradeclsname":"客户分类编码级次","id":4800368,"isscale":"否","keyword":"customerclass","lgrade":5,"lgradelen":12,"presetMaxGrade":null,"singlemaximum":9},{"accid":4800197,"codingrule":"12","gradeclsname":"部门编码级次","id":4800369,"isscale":"是","keyword":"department","lgrade":5,"lgradelen":12,"presetMaxGrade":null,"singlemaximum":9},{"accid":4800197,"codingrule":"234","gradeclsname":"地区分类编码级次","id":4800370,"isscale":"是","keyword":"districtclass","lgrade":5,"lgradelen":12,"presetMaxGrade":null,"singlemaximum":9},{"accid":4800197,"codingrule":"2","gradeclsname":"存货分类编码级次","id":4800371,"isscale":"否","keyword":"inventoryclass","lgrade":8,"lgradelen":12,"presetMaxGrade":null,"singlemaximum":9},{"accid":4800197,"codingrule":"11111111","gradeclsname":"货位编码级次","id":4800372,"isscale":"是","keyword":"positionclass","lgrade":8,"lgradelen":20,"presetMaxGrade":null,"singlemaximum":9},{"accid":4800197,"codingrule":"111","gradeclsname":"收发类别编码级次","id":4800373,"isscale":"是","keyword":"rd_style","lgrade":3,"lgradelen":5,"presetMaxGrade":null,"singlemaximum":5},{"accid":4800197,"codingrule":"12","gradeclsname":"结算方式编码级次","id":4800374,"isscale":"是","keyword":"settlestyle","lgrade":2,"lgradelen":3,"presetMaxGrade":null,"singlemaximum":3},{"accid":4800197,"codingrule":"2","gradeclsname":"供应商分类编码级次","id":4800375,"isscale":"否","keyword":"vendorclass","lgrade":5,"lgradelen":12,"presetMaxGrade":null,"singlemaximum":9}],"mark":""};
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
	if($('#gradedef>tr:eq(0)').text().substr(11)=='4222'){
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