var scoreArray=[];
function updateScore(type_,step_){
	if(scoreArray[type_]==null){
		scoreArray[type_]=[];
	}
	scoreArray[type_][step_]=getStepScore(type_,step_);
}

function getScore(type_){
	var totalScore=0;
	if(scoreArray[type_]!=null){
		$.each(scoreArray[type_], function(i, n){  
			if($.isNumeric(n)){
				totalScore+=n;
			}
		}); 
	}    
	return totalScore;
}

var rules=[{
	type:'1-1',//建立帐套
	score:[2,2,1,1,2,2]
},{
	type:'1-2',//审核收-0001号凭证
	score:[10]
},{
	type:'1-4',//销售发票核销
	score:[10]
},{
	type:'1-5',//明细到工资项目
	score:[2,4,4]
},{
	type:'2-1',//设置“工资管理、固定资产”模块的操作权限。
	score:[5,5]
}];

function getStepScore(type_,step_){
	for(var i=0;i<rules.length;i++){
		if(rules[i].type==type_){
			return rules[i].score[step_];
		}
	}
}