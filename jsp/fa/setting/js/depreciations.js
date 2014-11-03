/**
 * @Description 计提折旧
 * @time 2013-04-25
 * @author 李波 * 
 */
function doload(){
	var is=iscansubmit();
	if(!is){
		jAlert("由于互斥功能正在运行或者系统相关设置步骤未完成，此功能暂时不可用");
		return;
	}
	//计提折旧
	jConfirm("本操作将计提本月折旧，并花费一定时间，是否要继续？", "确认对话框", function(confirmflag){
		if(confirmflag){
			$.ajax({
			    url: "faCardDepreciation!facarddepre",
			    type: 'post',
			    dataType: "json",
			    cache:false,
			    async:false,
			    success: function(data){
			    	if(data.mark=="0"){
			    		jAlert("当前日期不可以计提折旧！");
			    		return;
			    	}else if(data.mark=="-1"){
			    		jAlert("没有可计提资产卡片！");
			    		return;
			    	}else if(data.mark=="-3"){
			    		jAlert("本月上一次计提折旧已制作了凭证，<br>请先删除此凭证后，才能进行计提折旧！");
			    		return;
			    	};
					jConfirm('是否查看折旧清单？', '确认对话框', function(islook){
						if(islook){//查看清单
				    		if(data.mark!=""&&data.mark!=null){
				    			openWindow('fa_operate_operateCurMonZheJiu','FA','2');
				    		}else{
				    			openWindow('fa_operate_operateCurMonZheJiu','FA','1');
				    		}
						}else{
							if(data.mark!=""&&data.mark!=null){
				    			openWindow('fa_operate_allotdepre','FA','2');
				    		}
						}
					});
			    }
			  });
		}
	});
}
function iscansubmit(){
	var res=false;
	$.ajax({
	    url: "faInitializa!iscansubmit",
	    type: 'post',
	    dataType: "json",
	    cache:false,
	    async:false,
	    success: function(data){
	    	var mark=data.mark;
	    	if(mark=="0"){
	    		res=true;
	    	}else{
	    		res=false;
	    	}
	    }
	 });
	return res;
}
function isCardReduce(){
	var is=iscansubmit();
	if(!is){
		jAlert("由于互斥功能正在运行或者系统相关设置步骤未完成，此功能暂时不可用");
		return;
	}
	$.ajax({
	    url: "faCardDepreciation!isTrueDepreciations",
	    type: 'post',
	    dataType: "json",
	    cache:false,
	    async:false,
	    success: function(data){
	    	var depreciationsFlag=data.depreciationsFlag;
	    	if(depreciationsFlag){
	    		openWindow("fa_reduce_assetsReduce");
	    	}else{
	    		jAlert("本账套需要进行计提折旧后，才能进行资产减少");
	    	}
	    }
	  });
}

/**
 * 
 * 原始卡片录入和新增资产进入前判断
 * 李波
 */
function to_card(mar){
	var is=iscansubmit();
	if(!is){
		jAlert("由于互斥功能正在运行或者系统相关设置步骤未完成，此功能暂时不可用");
		return;
	}
	openWindow('fa_basic_ref_t_acr','fa',{mark:mar});
}



