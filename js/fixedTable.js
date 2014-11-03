/**
  *固定表头js
 */

 $(function(){
    /***** 选中行代码开始（如果不需要这些功能，直接将下面代码移出即可）*******/

	$("#table_2_bodyer").find("tr").each(function(){
	    $(this).bind("click",function(e){
		    $(this).addClass("curBgColor").siblings().removeClass("curBgColor").addClass("otherBgColor");
		})
	})
 })
 
//控制表头横纵向滚动时固定不动
	function tableScroll(container){
	    var $scroll_left=$(container).scrollLeft();
		var $scroll_top=$(container).scrollTop();
		
		$('#table_1_header').css("margin-top",$scroll_top+"px");
		$('#table_1_bodyer').css("margin-top",-$scroll_top+"px");
		$('#table_2_header').css("margin-top",$scroll_top+"px");
		$('#table_2_bodyer').css("margin-top",-$scroll_top+"px");
		
		$('#left_table').css("margin-left",$scroll_left+"px");
	}