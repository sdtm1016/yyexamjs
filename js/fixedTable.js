/**
  *�̶���ͷjs
 */

 $(function(){
    /***** ѡ���д��뿪ʼ���������Ҫ��Щ���ܣ�ֱ�ӽ���������Ƴ����ɣ�*******/

	$("#table_2_bodyer").find("tr").each(function(){
	    $(this).bind("click",function(e){
		    $(this).addClass("curBgColor").siblings().removeClass("curBgColor").addClass("otherBgColor");
		})
	})
 })
 
//���Ʊ�ͷ���������ʱ�̶�����
	function tableScroll(container){
	    var $scroll_left=$(container).scrollLeft();
		var $scroll_top=$(container).scrollTop();
		
		$('#table_1_header').css("margin-top",$scroll_top+"px");
		$('#table_1_bodyer').css("margin-top",-$scroll_top+"px");
		$('#table_2_header').css("margin-top",$scroll_top+"px");
		$('#table_2_bodyer').css("margin-top",-$scroll_top+"px");
		
		$('#left_table').css("margin-left",$scroll_left+"px");
	}