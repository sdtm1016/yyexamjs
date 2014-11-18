var account = window.parent.valueMap.get("accuracy");
$(document).ready(function(){
	/*$.ajax({
		url:"data/queryAccuracy.json",
		type:"get",
		data:"accid="+account.accid,
		success:function(data,status){
		},
		dataType:'json'
	});*/
	var data={"accInfoList":[{"accid":4800197,"benable":0,"bvisible":0,"ccaption":"开票单价小数位","cdefault":"2","cid":"21","cname":"iBillPrice","csysid":"AA","ctype":"Long","cvalue":"2","id":4800694},{"accid":4800197,"benable":1,"bvisible":1,"ccaption":"换算率小数位数","cdefault":"2","cid":"43","cname":"iExchRateDecDgt","csysid":"AA","ctype":"Integer","cvalue":"2","id":4800467},{"accid":4800197,"benable":1,"bvisible":1,"ccaption":"件数小数位数","cdefault":"2","cid":"42","cname":"iNumDecDgt","csysid":"AA","ctype":"Integer","cvalue":"2","id":4800466},{"accid":4800197,"benable":0,"bvisible":0,"ccaption":"存货单价小数位","cdefault":"2","cid":"20","cname":"iStrsPriDecDgt","csysid":"AA","ctype":"Long","cvalue":"2","id":4800693},{"accid":4800197,"benable":0,"bvisible":0,"ccaption":"存货数量小数位","cdefault":"2","cid":"19","cname":"iStrsQuanDecDgt","csysid":"AA","ctype":"Long","cvalue":"2","id":4800681}],"accid":4800197,"accountBean":null,"enableList":null,"message":"1","startDate":null,"subId":null,"sysManagerId":null,"uaAccount":null,"uaAccountAboutData":null,"uaAccountList":null};
	var accInfoList = data.accInfoList;
	$.each(accInfoList,function(index,i){
		if(i.cname == 'iStrsQuanDecDgt'){
			$("#iStrsQuanDecDgt").val(i.cvalue);
			$("#iStrsQuanDecDgtId").val(i.id);
		}else if(i.cname == 'iStrsPriDecDgt'){
			$('#iStrsPriDecDgt').val(i.cvalue);
			$('#iStrsPriDecDgtId').val(i.id);
		}else if(i.cname == 'iBillPrice'){
			$('#iBillPrice').val(i.cvalue);
			$('#iBillPriceId').val(i.id);
		}else if(i.cname == 'iNumDecDgt'){
			$('#iNumDecDgt').val(i.cvalue);
			$('#iNumDecDgtId').val(i.id);
		}else if(i.cname == 'iExchRateDecDgt'){
			$('#iExchRateDecDgt').val(i.cvalue);
			$('#iExchRateDecDgtId').val(i.id);
		}
	});
		
});
//确认
function ok(){
	
	if(true){
		if(account.action == "add"){
			str = "创建账套：{"+ account.caccName +":["+ account.caccId +"]}成功";
			jAlert(str,'提示信息',function(){
				jConfirm("是否立即启用账套？","提示信息",function(flag){
					
					
					if(flag==true){
						/*shulei*/
						window.parent.updateScore('1-1',5);
						
						window.parent.closeWindow("accuracy");
						window.parent.openWindow("systemEnable","accuracy",account);
					}else{
						window.parent.closeWindow("accuracy");
					}

				});
			});

			
		}else if(account.action == "upd"){
			str = "修改账套：{"+ account.caccName +":["+ account.caccId +"]}成功";
			jAlert(str,'提示信息',function(){
				window.parent.closeWindow("updateAccount");
				window.parent.closeWindow("accuracy");
			});
		}
	}else{
		var accInfoList = $("#accuracyFrom").serialize();
		$.ajax({
			url:"uaAccount!updateAccuracy.action",
			type:"post",
			data:accInfoList,
			success:function(data,status){
				var success = data.message;
				if (success == '1') {
					
					if(account.action == "add"){
						str = "创建账套：{"+ account.caccName +":["+ account.caccId +"]}成功";
						jAlert(str,'提示信息',function(){
							jConfirm("是否立即启用账套？","提示信息",function(flag){
								
								
								if(flag==true){
									/*shulei*/
									window.parent.totalScore+=2;
									
									window.parent.closeWindow("accuracy");
									window.parent.openWindow("systemEnable","accuracy",account);
								}else{
									window.parent.closeWindow("accuracy");
								}

							});
						});

						
					}else if(account.action == "upd"){
						str = "修改账套：{"+ account.caccName +":["+ account.caccId +"]}成功";
						jAlert(str,'提示信息',function(){
							window.parent.closeWindow("updateAccount");
							window.parent.closeWindow("accuracy");
						});
					}
				}
			},
			dataType:'json'
		});
	}
}

//取消
function cancel(){
	if(account.action == "add"){
		str = "创建账套：{"+ account.caccName +":["+ account.caccId +"]}成功";
		jAlert(str,'提示信息',function(){
			
			jConfirm("是否立即启用账套？","确认信息",function(flag){
				if(flag==true){
					window.parent.openWindow("systemEnable","accuracy",account);
				}
				window.parent.closeWindow("accuracy");
			});			
		});
		
		
		
		
	}else if(account.action == "upd"){
		str = "修改账套：{"+ account.caccName +":["+ account.caccId +"]}成功";

		jAlert(str,'提示信息',function(){
			window.parent.closeWindow("updateAccount");
			window.parent.closeWindow("accuracy");
		});
		
	}
	
}