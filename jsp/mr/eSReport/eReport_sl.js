$(function(){
	$('.keyword_menus>li').addClass('disabled');
	$('.keyword_dt').removeClass('disabled');
	
	$(document).on('click',function(){
		var obj=obj = event.srcElement ? event.srcElement : event.target;
		if($(obj).parent().hasClass('cell_focus')){
			$(obj).parent().addClass('focus_border');
		}else{
			$('.cell_focus').removeClass('focus_border');
		}
	});
	
	$('#nav a').click(function(){
		if($(this).parent().hasClass('disabled'))return;
		var menuText=$(this).text();
		if(menuText.indexOf('打开')>-1){
			$('#content .part2').show();
		}else if(menuText.indexOf('表页')>-1){
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
		$('.part1').hide();
		$('.part2').hide();
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
			$('.keyword_menus>li').addClass('disabled');
			$('.keyword_fm').removeClass('disabled');
			$('.cell_empty input').val('公式单元');
		}else{
			jConfirm('是否确定全表数据重算?', '提示', function(r) {
				if(r){
					$('.cell_empty input').val('');
					$('.keyword_menus>li').addClass('disabled');
					$('.keyword_dt').removeClass('disabled');
				}
			});
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

function set_keyword(){
	openWindow('set_keyword');
}

function input_keyword(){
	openWindow('input_keyword');
}

function confirm_recaldata(){
	jConfirm('是否重算第2页?', '提示', function(r) {
		if(r){
			//TODO
		}else{
			//TODO
		}
	});
}