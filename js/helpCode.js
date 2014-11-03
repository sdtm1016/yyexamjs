/**
 * 
 * @DESCRIBE   助记码js处理类
 * @AUTHOR     王丙建
 * @DATE       2012-12-18
 * @COMPANY    畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT    EXAM
 *
 */

  /**
   * 返回汉字的助记码
   */
  function getHelpCode(chnName) {
	  var helpCode = "aaa";
	  var param = "chnName="+chnName;
	  $.ajax({
		    url: "helpcode!queryHelpCode",
		    type: 'post',
		    data:param,
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	helpCode = data.helpCode;
		    }
		  });
	  return helpCode;
  }