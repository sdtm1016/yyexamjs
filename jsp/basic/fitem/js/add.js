/**
 * 
 * @DESCRIBE   项目目录：js逻辑控制
 * @AUTHOR     王丙建
 * @DATE       2012-12-24
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

//编码规则 
var crule = "";
//项目名称
var citemName = "";

//核算名称
var citem_text = "";

/**
 * 得到新建项目分类的级次值
 */
function  getRule() {
    
	//得到录入的项目每级级次值
	var r1 = $("#crule1").val();
	var r2 = $("#crule2").val();
	var r3 = $("#crule3").val();
	var r4 = $("#crule4").val();
	var r5 = $("#crule5").val();
	var r6 = $("#crule6").val();
	var r7 = $("#crule7").val();
	var r8 = $("#crule8").val();
	//通过依次判断输入的每级规则值，得到项目分类的级次值，判断依据：从1级开始依次判断值是否为0，为0时终止
	//1级不允许为0
    if (r1*1==0) {
    	jAlert("第1级级次值必须大于0");
    	return false;
    }
    if (r2*1==0) {
    	crule = r1;
    	return true;
    }
    if (r3*1==0) {
    	crule = r1 + r2;
    	return true;
    }
    if (r4*1==0) {
    	crule = r1 + r2+r3;
    	return true;
    }
    if (r5*1==0) {
    	crule = r1 + r2+r3+r4;
    	return true;
    }
    if (r6*1==0) {
    	crule = r1 + r2+r3+r4+r5;
    	return true;
    }
    if (r7*1==0) {
    	crule = r1 + r2+r3+r4+r5+r6;
    	return true;
    }
    if (r8*1==0) {
    	crule = r1 + r2+r3+r4+r5+r6+r7;
    	return true;
    }
    else {
    	crule = r1 + r2+r3+r4+r5+r6+r7+r8;
    	return true;
    }
   }
  
  /**
   * 得到项目结构数值
   */
  function getFitemStruData() {
	 var data = "";
	  var fitemDataList = getRowsValue();
	  if (fitemDataList==null) return;
	  var length = fitemDataList.length;
	  for (var i = 0; i<length; i++) {
		  var fitemData = fitemDataList[i];
		  var strTRow = fitemDataToStringArray(fitemData,i);
		  data = data + strTRow;
	  }
	  return data;
  }
  
  
  /**
   * 得到表格的数值
   */
  function getRowsValue() {
  	
  	var tb = document.getElementById("edittable_rows");
	var length = tb.rows.length;
	var fitemDataList = new Array(length);
	for(var i=0;i<length;i++){
		var cells= new Array(12);
  		cells[0] = citemName;
  		cells[1] = citem_text;
  		cells[2] = crule;
		//字段顺序号
		var citemsql = tb.rows[i].cells[0].innerHTML;
		cells[11] = citemsql;
		//项目名称
		var ctext = tb.rows[i].cells[1].innerHTML;
		cells[3] = ctext;
		//imode值
		if (i<=3)
			cells[4] = i*0+1;
		else
			cells[4] = 6;
		//数据类型
		var itype = tb.rows[i].cells[2].innerHTML;
		//数据长度
		var strlength = tb.rows[i].cells[3].innerHTML;
	    if (itype=="整数") {
		  cells[5] = 1;
		  cells[6] = strlength;
		  cells[7] = 0;
	    }
	    else if (itype=="实数"){
	    	cells[5] = 2;	
	    	var pos =strlength.indexOf(".");
			var ilength = strlength.substr(0,pos);
			var iscale = strlength.substr(pos+1);
			cells[6] = ilength;
			cells[7] = iscale;
	    }
	    else if (itype=="文本") {
	    	cells[5] = 3;
			cells[6] = strlength;
			cells[7] = 0;
		}
	    else if (itype=="日期") {
	    	cells[5] = 4;
			cells[6] = strlength;
			cells[7] = 0;
		}
	    else if (itype=="逻辑") {
	    	cells[5] = 5;
			cells[6] = strlength;
			cells[7] = 0;
		}
		cells[8] = 1;
		cells[9] = 0;
		cells[10] = 0;
		
		
		var fitemData = arrayToFitemData(cells);
		fitemDataList[i] = fitemData;
	}	
	return fitemDataList;
  	
  }
  

   /**
    * 增加项目大类
    */
  function addFitem() {
	  citemName =  $("#citemName").val();
	  citem_text = $("#citem_text").html();
	  getRule();
	  var data = getFitemStruData();
	  $.ajax({
			url: "fitem!create.action" ,
			type: 'post',
			data:data,
			dataType: "json",
			async:false,
			success: function(data){
				window.parent.getWindow("basic_fitem_item").queryFitem();
				//window.parent.getWindow("basic_fitem_item").loadFitemZtree();
				window.parent.closeWindow('basic_fitem_add');
			}
		  });
  }
  
  
  
