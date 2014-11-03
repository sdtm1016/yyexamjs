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
	type:1,//��������
	score:[2,2,1,1,2,2]
},{
	type:2,//�����-0001��ƾ֤
	score:[10]
},{
	type:3,//���á����ʹ����̶��ʲ���ģ��Ĳ���Ȩ�ޡ�
	score:[5,5]
}];

function getStepScore(type_,step_){
	for(var i=0;i<rules.length;i++){
		if(rules[i].type==type_){
			return rules[i].score[step_];
		}
	}
}