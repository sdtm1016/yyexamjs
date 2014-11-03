/**
 * 
 * @DESCRIBE   人员部门参照树：js逻辑控制
 * @AUTHOR     王丙建
 * @DATE       2012-11-19
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

 // 选中部门参照编码
 var selectCode = "";
 //选中部门参照名称
 var selectName ="";
 
 //选中节点
 var selNode ="";
 
 //项目分类编码
 var gradeCode="";
 /**
  * 项目档案参照
  */
 function loadDeptPersonZtree() {
	//初始化定义节点 
	 $("#datatable_bodyer").html("");
    var setting = {
		data: {
				simpleData: {
					enable: true
				}
		},
		callback: {
			onClick: onClick,
		},
		view: {
			selectedMulti: false,
			showIcon: true
		}
	};	 
	var treeNodes;   
	var zNodes = [];
	
	var data="fitemClass="+fitemClass+"&crule="+crule;
	$.ajax({
		 async : false,   
	     cache:false,   
		url:"ztree!loadFitemTree.action",
		type:"post",
		data:data,
		dataType:"json",
		error: function () {//请求失败处理函数   
            jAlert('请求失败');   
        }, 
		success:function(data,status){
			treeNodes = data.listTree;
            for (var i = 0; i<treeNodes.length; i++) {
            	var nodeObj =  eval('(' + treeNodes[i] + ')') ;
            	zNodes.push(nodeObj);
            }
            initFitemss();
            rowSelection();
		}
	});	

	
	$.fn.zTree.init($("#deptTree"), setting, zNodes);
	
	
 }
/*加载项目目录数据*/
function initFitemss(){
	var param="fitemClass="+fitemClass+"&gradeCode="+gradeCode;
	$.ajax({
		url:"fitem!getFitemsses.action",
		dataType:"json",
		type:"post",
		data:param,
		success:function(data){
			var fitemstructures=data.fitemstructures2;
			var fitemss=data.fitemss;
			$("datatable_header").empty();
			$("#datatable_bodyer").empty();
			var str="";
			var tbody="";
			str+="<tr>";
			for(var i=0;i<fitemstructures.length;i++){
				var fs=fitemstructures[i];
				var ctext=fs.ctext;
				str+="<td>"+ctext+"</td>";
				if(i==5){
					break;
				}
			}
			str+="</tr>";
			for(var j=0;j<fitemss.length;j++){
				var f=fitemss[j];
				tbody+="<tr ondblclick='returnSelected(this)' id='"+f.id+"'>";
				for(var i=0;i<fitemstructures.length;i++){
					var fs=fitemstructures[i];
					var cfieldName=fs.cfieldName;
					var value=f[cfieldName];
					if(cfieldName=="column3"){
						if(value==1){
							tbody+="<td>是</td>";		
						}else{
							tbody+="<td>否</td>";
						}
					}else{
						tbody+="<td>"+value+"</td>";
					}
				}
				tbody+="</tr>";
			}
			$("#datatable_header").html(str);
			$("#datatable_bodyer").html(tbody);
			document.getElementById("loadRecord").innerHTML = "已加载" + fitemss.length + "条记录";
			rowSelection();
		}
			});
}
  /**
   * 节点单击事件
   * @param event
   * @param treeId 树id
   * @param treeNode jied
   * @param clickFlag
   */
  function onClick(event, treeId, treeNode, clickFlag) {
	  var name=treeNode.name;
	  var gc=name.substring(name.indexOf("(")+1,name.indexOf(")"));
	  gradeCode=gc;
	  initFitemss();
	  
 }	

  
  
  

  /***** 选中行代码开始（如果不需要这些功能，直接将下面代码移出即可）*******/

  //当前被点击选中的行全局变量
  var currentSeletedRow=null;
  function rowSelection(){
  		
  	var datatable_1 = document.getElementById("datatable_bodyer");
  	for(var i=0;i<datatable_1.rows.length;i++){
  	
  		datatable_1.rows[i].onclick=function(){
  			var evt=(window.event || event);//获得事件
  			var evtsrc = (evt.srcElement || evt.target);
  			if(currentSeletedRow!=null && evtsrc.tagName=="TD"){
  				currentSeletedRow.style.backgroundColor="#fff";
  				currentSeletedRow.style.color="#000";
  			}
  			if(evtsrc.tagName=="TD"){
  				evtsrc.parentNode.style.backgroundColor="#00f";
  				evtsrc.parentNode.style.color="#fff";
  				currentSeletedRow=evtsrc.parentNode;
  				//修改底部状态栏“已选中n条记录”
  				//document.getElementById("selRecord").innerHTML="已选中1条记录";
  			}
  		}
  	}

  }

  /***** 选中行代码结束*******/
  
  