/**
 * @returns 返回值为-1时，不符合编码规则；-2时满足编码格式第一级！；其他时返回的是：第几级+"*"+父节点！
 * @param keyword
 * @param invalue
 * @returns {String}
 */
function gradecontrue(keyword,invalue){
	var result="";
	$.ajax({
	    url: "gradedefAction!gradedefContrue?keyword="+keyword,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	if(data.gradedef!=null){
	    		var codingrule=data.gradedef.codingrule;
		    	var code=0;
		    	var invallength=invalue.length;
	    		if(invallength==codingrule.substring(0,1)){
	    			result="-2";//编码格式满足第一级
	    			return;
	    		}else{
	    			for(var i=0;i<codingrule.length;i++){
		    			code=code+(codingrule.substring(i,(i+1))-0);
		    			if(code==invallength){
		    				result=(i+1)+"*"+invalue.substring(0,(code-codingrule.substring(i,(i+1))));//返回其父节点
		    				return;
		    			}
			    	}
	    		}
	    		result="-1";//不符合编码级次格式
	    	}
	    }
	});
	return result;
}


/**
 * @returns 返回级次的数值
 * @param keyword
 * @param invalue
 * @returns {String}
 */
function grademarkValue(keyword){
	var result="";
	$.ajax({
	    url: "gradedefAction!gradedefContrue?keyword="+keyword,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	var codingrule=data.gradedef.codingrule;
	    	
	    	result = codingrule;
	    }
	});
	return result;
}


/**
 * @returns 返回值为空，就是未查到编码控制，否则返回值就是“*”;
 * @param keyword
 * @param invalue
 * @returns {String}
 */
function grademark(keyword){
	var result="";
	$.ajax({
	    url: "gradedefAction!gradedefContrue?keyword="+keyword,
	    type: 'post',
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	var codingrule=data.gradedef.codingrule;
	    	if(data.gradedef!=null){
	    		for(var i=0;i<codingrule.length;i++){
		    		var length=(codingrule.substring(i,(i+1))-0);
		    		for(var j=0;j<length;j++){
		    			result=result+"*";
		    		}
		    		result=result+" ";
			    }
	    	}
	    }
	});
	return result;
}