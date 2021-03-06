	//程序入口
		$(document).ready(function(){
			//加载编码原则显示和编码级次
			var settlestyleStar=grademark('settlestyle');
			var gradeValue = grademarkValue('settlestyle'); 
			$("#bmgz").val(settlestyleStar).attr("gradeValue",gradeValue);
			//装载树节点
			querySettlestyleTree(null);
		});
		//树节点集合的全局变量
		var zNodes = [];
		//当前选中的树节点
		var currentTreeNode=null;
		//保存时状态的全局变量
		var action = null;
		//所有结算方式对象的集合
		var settleStyleList=null;
		//查询结算方式树
		function querySettlestyleTree(settlestyleCode){
			//ztree配置
			var setting = {
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					onClick: ZtreeClick,
					onDblClick: ZtreeDblClick
				}
			};
			//ztree加载树节点
			$.ajax({
				url:"settleStyle!querySettleStyle.action",
				type:"post",
				dataType:"json",
				async : false,   
				error: function () {
		            jAlert('请求失败');   
		        }, 
				success:function(jsonData){
					settleStyleList = jsonData.settleStyleList;
					zNodes = getSettleStyleNodes(settleStyleList);
					$.fn.zTree.init($("#settleStyleTree"), setting, zNodes);
					//默认选中节点(根节点)
					var zTree = $.fn.zTree.getZTreeObj("settleStyleTree");
					if(settlestyleCode==null){
						settlestyleCode = "JSGSTYPE";
					}
					var selNode = zTree.getNodeByParam("id", settlestyleCode);
        			zTree.selectNode(selNode);
        			//显示详细信息
        			showNodeInformation(selNode);
				}
			});	
		}
		//获取结算方式树节点的方法
		function getSettleStyleNodes(settleStyleList){
			zNodes = [];
			var gradeValue= $("#bmgz").attr("gradeValue");
			if(gradeValue==""){
				jAlert("编码规则不能为空!");
				return;
			}
			var node = "";
			var settleStyle;
			var nodeObj;
			//根节点
			node = "{id:'JSGSTYPE',name:'结算方式',open:true}";
			nodeObj =  eval('(' + node + ')') ;
        	zNodes.push(nodeObj);
			for(var i=0;i<settleStyleList.length;i++){
				settleStyle = settleStyleList[i];
				//本级次
				var issgrade = settleStyle.issgrade;
				//结算方式编码
				var csscode = settleStyle.csscode;
				//父节点id
				var parentid ;
				if(issgrade==1){
					parentid = "JSGSTYPE";
				}else{
					var rule = gradeValue.charAt(issgrade-1);
					var endindex = csscode.length-rule;
					parentid = csscode.substring(0,endindex);
				}
				node = "{" + "id:'" + csscode + "'," + "pId:'" + parentid + "',"
				+ "settleStyleId:'" + settleStyle.id + "',"
				+ "settleStyleName:'" + settleStyle.cssname + "',"
				+ "bssflag:'" + settleStyle.bssflag + "',"
				+ "bssend:'" + settleStyle.bssend + "',"
				+ "name:'(" +csscode+")"+ settleStyle.cssname + "'" + ",open:true" + "}";
				
				nodeObj =  eval('(' + node + ')') ;
            	zNodes.push(nodeObj);
			}
			return zNodes;
		}
		//ztree单击事件
		function ZtreeClick(event, treeId, treeNode, clickFlag){
			showNodeInformation(treeNode);
		}
		//ztee双击事件
		function ZtreeDblClick(event, treeId, treeNode){
			
		}
		
		//设置按钮的编辑状态 state:true 可编辑,state:false 不可编辑
		function setEditorState(state){
			if(state){
	  			//放弃,保存按钮设置成可用
	  			$("#giveupSettleStyle").attr("disabled",false);
	  			$("#saveSettleStyle").attr("disabled",false);
	  			//增加,修改,删除,按钮设置成不可用
	  			$("#addSettleStyle").attr("disabled",true);
	  			$("#updateSettleStyle").attr("disabled",true);
	  			$("#deleteSettleStyle").attr("disabled",true);
			}else{
	  			//放弃,保存按钮设置成不可用
	  			$("#giveupSettleStyle").attr("disabled",true);
	  			$("#saveSettleStyle").attr("disabled",true);
	  			//增加,修改,删除,按钮设置成可用
	  			$("#addSettleStyle").attr("disabled",false);
	  			$("#updateSettleStyle").attr("disabled",false);
	  			$("#deleteSettleStyle").attr("disabled",false);
			}
		}
		//添加按钮点击事件
		function addSettleStyle(){
			if(currentTreeNode!=null){
				//设置成可编辑状态
				setEditorState(true);
				$("#csscode").attr("readonly",false).css("background-color","#ffffff").css("background-color","#ffffff").focus();
				$("#cssname").attr("readonly",false).css("background-color","#ffffff").css("background-color","#ffffff").val("");
				action = "add";
			}
		} 
		//修改按钮点击事件
		function updateSettleStyle(){
			if(currentTreeNode!=null){
				if(currentTreeNode.id=="JSGSTYPE"){
					jAlert("请选择要修改的结算方式!");
					return;
				}
				//设置成可编辑状态
				setEditorState(true);
				$("#cssname").attr("readonly",false).css("background-color","#ffffff").focus();
				action = "update";
			}
		}
		//删除按钮点击事件
		function deleteSettleStyle(){
			if(currentTreeNode!=null){
				if(currentTreeNode.id=="JSGSTYPE"){
					jAlert("请选择要删除的结算方式!");
					return;
				}
				jConfirm("确定要删除选中的结算方式吗?", "确认对话框", function(confirmflag){
					if(confirmflag){
						if(currentTreeNode.bssend==0){
							jAlert("不能删除存在下级分类的分类!");
							return;
						}
						var id = currentTreeNode.settleStyleId;
						//js判断
						var sourceValue = 	$("#csscode").val();
						var sourceTable = 	"SETTLESTYLE";
						var sourceField = 	"CSSCODE";
						var isExits = isExitsTableRef(sourceValue, sourceTable, sourceField);
						if (isExits==true) {
							jAlert("该结算方式已经被使用，不能删除!");
						    return;			
						}
						//是否修改父节点的bssend字段
						var updateflag = true;
						//判读当前节点的父节点是否有其他子节点
						for(var i=0;i<zNodes.length;i++){
							var settleStyle = zNodes[i];
							if(settleStyle.pId==currentTreeNode.pId&&settleStyle.settleStyleId!=id){
								updateflag=false;
							}
						}
						//删除请求后台
						$.ajax({
							url: "settleStyle!delete.action?settleStyle.id="+id,
							type: 'post',
							data:{parentCode:currentTreeNode.pId,updateflag:updateflag},
							dataType: "json",
							async : false,
							error:function(){
								jAlert("请求失败!");
							},
							success: function(data){
								if(data.isdelete==true){
									querySettlestyleTree(currentTreeNode.pId);
								}else{
									jAlert("该结算方式已经被使用，不能删除!");
							   }
							}
						});
					}
				});
			}
		}
		//保存按钮店家事件
		function saveSettleStyle(){
			var flag = saveSettleStyleCheck();
			if(!flag){
				return;
			}else{
				//组织数据
				var settle="settleStyle.csscode="+$("#csscode").val()+"&settleStyle.cssname="+$("#cssname").val();
				if ($("#bssflag").attr("checked")){
					settle+="&settleStyle.bssflag=1";
				}else{
					settle+="&settleStyle.bssflag=0";
				}
				//请求地址
				var url="";
				if(action=="add"){
					settle+="&settleStyle.issgrade="+$("#igrade").val();
					settle+="&settleStyle.bssend="+1;//是末级节点
					settle+="&parentCode="+$("#bend").attr("parentcode");
					url="settleStyle!addSettleStyle.action";
				}else if(action=="update"){
					settle+="&settleStyle.issgrade="+currentTreeNode.bssflag;
					settle+="&settleStyle.bssend="+currentTreeNode.bssend;
					settle+="&settleStyle.id="+currentTreeNode.settleStyleId;
					url="settleStyle!updateSettleStyle.action";
				}
				//保存按钮设置成不可用
				$("#saveSettleStyle").attr("disabled",true);
				$.ajax({
					url: url,
					type: 'post',
					data:settle,
					dataType: "json",
					async : false,
					error:function(){
						jAlert("请求失败!");
					},
					success: function(data){
						//重新查询树
						querySettlestyleTree($("#csscode").val());
					}
				  });
			}
		}
		//放弃按钮点击事件
		function giveup(){
			showNodeInformation(currentTreeNode);
		}
		//保存结算方式时检查方法
		function saveSettleStyleCheck(){
			var flag = true;
			var csscode = $("#csscode").val();
			if (csscode=="") {
				jAlert("类别编码不允许为空！","提示信息",function(){
					$("#csscode").focus();
				});
				return false;
			}else if(csscode=="JSGSTYPE"){
				jAlert("类别编码不符合要求！","提示信息",function(){
					$("#csscode").focus();
				});
				return false;
			}
			if ($("#cssname").val()=="") {
				jAlert("类别名称不允许为空！","提示信息",function(){
					$("#cssname").focus();
				});
				return false;
			}
			//传到后台数据
			var settle="settleStyle.csscode="+$("#csscode").val();
			//添加时判断编码是否唯一
			if(action=="add"){
				$.ajax({
					url: "settleStyle!isUniquenessSettleStyleCode.action",
					type: 'post',
					data:settle,
					dataType: "json",
					async : false,
					error:function(){
						jAlert("请求失败!");
					},
					success: function(data){
						if(data.isuniqueness==false){
							jAlert("该类别编码已经被使用，请重新输入类别编码!","提示信息",function(){
								$("#csscode").focus();
							});
							flag = false;
						}
					}
				  });
				//编码规则
				var gradeValue= $("#bmgz").attr("gradeValue");
				//每一级的编码规则
				var gradeValueList = gradeValue.split("");
				//编码的长度
				var len = csscode.length;
				//查看是否符合规则的标志
				var fitflag =false;
				//判断是否符合编码规则
				var currentrule= null;
				for(var i=0;i<gradeValueList.length;i++){
					if(i==0){
						currentrule=gradeValueList[i];
					}else{
						currentrule=currentrule*1+gradeValueList[i]*1;
					}
					//判断是否符合编码规则
					if(len==currentrule){
						fitflag = true;
						//设置编码级次
						var issgrade = i+1;
						$("#igrade").val(issgrade);
						break;
					}
				}
				if(!fitflag){
					jAlert("此编码不符合分类编码原则,请重新编码!","提示信息",function(){
						$("#csscode").focus();
					});
					return false;
				}
				//编码级次
				var issgrade = $("#igrade").val();
				if(issgrade!=1){
					var rule = gradeValue.charAt(issgrade-1);
					var endindex = csscode.length-rule;
					var parentid = csscode.substring(0,endindex);
					//存储父节点的编码
					$("#bend").attr("parentcode",parentid);
					//设置标志
					fitflag = false;
					//判读是否有上级编码
					for(var i=0;i<settleStyleList.length;i++){
						var settleStyle = settleStyleList[i];
						//结算方式编码
						var csscode = settleStyle.csscode;
						if(parentid==csscode){
							fitflag = true;
						}
					}
					if(!fitflag){
						jAlert("不存在此分类的上级分类,请重新输入!","提示信息",function(){
							$("#csscode").focus();
						});
						flag = false;
					}
	
				}
			}
			return flag;
		}