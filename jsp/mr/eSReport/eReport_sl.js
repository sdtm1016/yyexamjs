$(function(){
	$('#nav a').click(function(){
		if($(this).text().indexOf('打开')>-1){
			$('#content .part2').show();
		}else if($(this).text().indexOf('表页')>-1){
			$('#content .part4').show();
		}
	});
	$('.part2 .select_ok').click(function(){
		$('.part2').hide();
		$('.part1').hide();
		$('.part3').show();
	});
	$('.part2 .close,.part2 .close').click(function(){
		$('.part2').hide();
	});
	$('.part4 .select_ok').click(function(){
		$('.part4').hide();
		$('.part3').hide();
		$('.part5').show();
	});
	$('.part4 .close,.part2 .close').click(function(){
		$('.part4').hide();
	});
});