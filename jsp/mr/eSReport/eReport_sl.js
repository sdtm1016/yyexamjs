var keyword={};
var edit1=false;
var file1Open=false;
$(function(){
	$('.keyword_menus>li').addClass('disabled');
	$('.keyword_dt').removeClass('disabled');
	
	$(document).on('click',function(){
		var obj = event.srcElement ? event.srcElement : event.target;
		if($(obj).parent().hasClass('cell_focus')){
			$(obj).parent().addClass('focus_border');
		}else{
			$('.cell_focus').removeClass('focus_border');
		}
	});
	$('input').click(function(){
		if($(this).hasClass('edit1')){
			edit1=true;
		}else{
			edit1=false;
		}
	});
	
	$('#nav a').click(function(){
		if($(this).parent().hasClass('disabled'))return;
		var menuText=$(this).text();
		if(menuText.indexOf('打开')>-1){
			$('#content .part2').show();
		}else if(menuText.indexOf('表页')>-1){
			window.parent.updateScore('1-3',0);
			$('#content .part4').show();
		}
	});
	$('.part2 .select_ok').click(function(){
		$('.part2').hide();
		$('.part1').hide();
		$('.part3').show();
		file1Open=true;
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
			$('.pages').hide();
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
			$('.pages').show();
		}
	});
	$('.page1').click(function(){
		$('.part5').hide();
		$('.part3').show();
		$('.page1').addClass('active');
		$('.page2').removeClass('active');
		selectedPage=1;
	});
	$('.page2').click(function(){
		$('.part3').hide();
		$('.part5').show();
		$('.page2').addClass('active');
		$('.page1').removeClass('active');
		selectedPage=2;
	});
	
	$('#cmdFileSave').click(function(){
		window.parent.updateScore('1-3',3);
	});
});
var selectedPage=1;

function set_keyword(obj){
	if(!file1Open)return;
	if($(obj).parents('li').hasClass('disabled'))return;
	openWindow('set_keyword');
}

function input_keyword(obj){
	if(!file1Open)return;
	if($(obj).parents('li').hasClass('disabled'))return;
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