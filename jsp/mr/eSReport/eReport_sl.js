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
		$('.page2').show();
	});
	$('.part4 .close,.part2 .close').click(function(){
		$('.part4').hide();
	});
	
	$('.cell_edit').each(function(i,n){
		$(n).html($('<input type="text" class="cell_input"/>').val($(n).text()));
	});
	$('.action .model').click(function(){
		if($(this).text()=='数据'){
			$('.action .model').each(function(i,n){
				$(n).text('格式');
			});
		}else{
			$('.action .model').each(function(i,n){
				$(n).text('数据');
			});
		}
	});
	$('.page1').click(function(){
		$('.part5').hide();
		$('.part3').show();
		$('.page1').addClass('active');
		$('.page2').removeClass('active');
	});
	$('.page2').click(function(){
		$('.part3').hide();
		$('.part5').show();
		$('.page2').addClass('active');
		$('.page1').removeClass('active');
	});
});