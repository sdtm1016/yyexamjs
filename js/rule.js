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
	type:'1-1',
	score:[2,1.5,1.5,1.5,1.5,2]
},{
	type:'1-2',
	score:[10]
},{
	type:'1-4',
	score:[10]
},{
	type:'1-5',
	score:[1,5,2,2]
},{
	type:'1-6',
	score:[2,3,3,2]
},{
	type:'2-1',
	score:[2,2,3,3]
}];

function getStepScore(type_,step_){
	for(var i=0;i<rules.length;i++){
		if(rules[i].type==type_){
			return rules[i].score[step_];
		}
	}
}