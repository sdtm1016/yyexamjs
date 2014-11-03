//日期表格是否已填充
var DATE_TABLE_IS_FILLINGED=false;

//当前被双击的置灰的单元格
var CURRENT_DBLCLICKED_CELL=null;
//传值给创建账套窗体-------康榕元------
function submitPeriod(){
	var pram = "";
	$("#dateTable tr").each(function(index,element){
		if(index!=0){
			pram = pram+"iid="+$(this).children().eq(0).html()+"&";
			pram = pram+"dbegin="+$(this).children().eq(1).html()+"&";
			pram = pram+"dend="+$(this).children().eq(2).html()+"&";
			
			
			
		}
	});
	var yeartemp = $("#year").val();
	var monthtemp = $("#month").val();
	window.parent.document.getElementById("addAccount").getElementsByTagName("iframe")[0].contentWindow.accountPeriod = pram;
	window.parent.document.getElementById("addAccount").getElementsByTagName("iframe")[0].contentWindow.document.getElementById("iyear").value = yeartemp;
	window.parent.document.getElementById("addAccount").getElementsByTagName("iframe")[0].contentWindow.document.getElementById("imonth").value = monthtemp;
	
	window.parent.closeWindow('accountPeriod');
}

//注册带参数的函数的事件机制
//dom.onclick=fun(arg1,arg2,...);
Function.prototype.bind=function()
{
	var __method=this;
	var arg=arguments;
	return function(){
		__method.apply(window,arg);
	};
};

//年份递增函数（当点击年份递增按钮时调用此函数）
function yearIncrease(){
	var year = document.getElementById("year");
	year.value=parseInt(year.value)+1;
	refresh();
}

//年份递减函数（当点击年份递减按钮时调用此函数）
function yearDecrease(){
	var year = document.getElementById("year");
	year.value=parseInt(year.value)-1;
	refresh();
}

//月份递增函数（当点击月份递增按钮时调用此函数）
function monthIncrease(){
	var month = document.getElementById("month");
	var value=parseInt(month.value);
	if(value>11){
		month.value=12;
	}else{
		month.value=parseInt(month.value)+1;
	}
	refresh();
}

//月份递减函数（当点击月份递减按钮时调用此函数）
function monthDecrease(){
	var month = document.getElementById("month");
	var value=parseInt(month.value);
	if(value<2){
		month.value=1;
	}else{
		month.value=parseInt(month.value)-1;
	}
	refresh();
}

//现实日历选择器(当双击单元格时执行此函数)
function showDatePicker(){
	var evt=(window.event || event);//获得事件
	var evtsrc = (evt.srcElement || evt.target);
	CURRENT_DBLCLICKED_CELL = evtsrc;
	//var x = evt.clientX || evt.pageX;
	//var y = evt.clientY || evt.pageY;
	//如果是IE
	  if(document.all && document.getElementById && !window.opera){
	    x=document.body.scrollLeft-2;
	    y=document.body.scrollTop-2;
	  }//否则如果是FrieFox等
	  else if(!document.all && document.getElementById && !window.opera){
	    x=window.pageXOffset;
	    y=window.pageYOffset;
	  }else{
	    x=document.documentElement.scrollLeft;
	    y=document.documentElement.scrollTop;
	  }
	//x=x-160;
	//y=y-220;
	//为tempDate文本框控件设置被选中的单元格的日期值以便datePicker控件初始化
	document.getElementById("tempDate").value=evtsrc.innerHTML;
	WdatePicker({
		el:"tempDate",
		position:{left:x,top:y},
		onpicking:function(dp){
			var newSelectedDate=dp.cal.getNewDateStr();
			//调用日期调动函数
			setTableDate(newSelectedDate);
			//应该加上判断调用日期调动函数是否返回成功
			//否则应该让datePicker重新显示
			//主要是为了解决当处理失败时datePicker也消失了
		}
	});
}

/**
 *根据传入的年份和月份得到该月的天数
 *平年闰年2月份的天数是不同的
 */
function getDays(year,month){
	var days = null;
	if(month<8){
		//如果为2月
		if(month==2){
			//再判断平闰年
			//如果是闰年，2月份的天数为29天
			if(year%4==0 && year%100!=0 || year%400==0){
				days=29;
			}else{
				days=28;
			}
		}else{
			//判断是偶数月还是奇数月
			if(month%2==0){
				days=30;
			}else{
				days=31;
			}
		}
	}else{
		//8-12月份的奇数月是31天，偶数月是30天，与1-7月恰好相反
		if(month%2==0){
			days=31;
		}else{
			days=30;
		}
	}
	
	return days;
}

/**
 *日期更新函数
 *业务逻辑：根据传入的被更新的单元格从单元格下一行开始更新起始日期和结束日期列的日期值
 */
function updateTableDate(referenceCell){
	var table = document.getElementById("dateTable");
	var cell = referenceCell;
	
	//下面两个变量用于整体调整结束日期时，取得参考日期
	var endDate = new Date(cell.innerHTML.replace(new RegExp("-","gm"),"/"));
	var endDateDate = endDate.getDate();
	
	//根据最后被调改的单元格，从下一行开始更新起始日期和结束日期
	for(var i=cell.parentNode.rowIndex+1;i<=12;i++){
		
		//起始日期为上一行的结束日期+1天
		//1.取得上一行结束日期列的日期
		var sd = new Date(table.rows[i-1].cells[2].innerHTML.replace(new RegExp("-","gm"),"/"));
		//+1天
		sd.setDate(sd.getDate()+1);
		var sdy = sd.getFullYear();//start date year
		var sdm = sd.getMonth()+1;//start date month
		var sdd = sd.getDate();//start date date
		
		//将月份和日期格式化成2位
		sdm=sdm.toString().length==1?"0"+sdm:sdm;
		sdd=sdd.toString().length==1?"0"+sdd:sdd;
		
		//拼装日期字符串2012-09-03
		sd = sdy+"-"+sdm+"-"+sdd;
		table.rows[i].cells[1].innerHTML=sd;
		//结束日期=起始日期+上一行结束日期的日-1（12期和2月除外，12期结束日期=(第一期年份-1)的日期-1天，当起始日期为1月时，如果日期大于当年2月的总天数，则结束日期为2月最后一天）
		
		var edy = "";//定义结束日期的年
		var edm = "";//定义结束日期的月
		var edd = "";//定义结束日期的日
		
		//结束日期是根据起始日期为参照来计算的，所以这里要获得起始日期及各项值
		sd = new Date(sd.replace(new RegExp("-","gm"),"/"));

		sdy = sd.getFullYear();
		sdm = sd.getMonth()+1;
		sdd = sd.getDate();

		/*当遇到2月时，结束日期是2月的最后一天*/
		
		//得到这年2月的总天数
		var febDays = getDays(sdy,2);
		//如果起始日期月份为1月并且日期大于当年2月份总天数
		if(sdm==1 && sdd>febDays){
			//则结束日期的月份=2；结束日期为2月最后一天
			edy = sd.getFullYear();
			edm = "02";
			edd = febDays;
		}
		
		//否则如果当前期间为12期，12期结束日期=(第一期年份-1)的日期-1天
		else if(i==12){
			
			//获得第一期年份 frafcd = firstRowAndFirstCellDate
			var frafcd = new Date(table.rows[1].cells[1].innerHTML.replace(new RegExp("-","gm"),"/"));
			
			var edy = frafcd.getFullYear()-1;
			var edm = frafcd.getMonth()+1;
			var edd = frafcd.getDate();
			
			var date = edy+"/"+edm+"/"+edd;
			date = new Date(date);
			date.setDate(date.getDate()-1);
			
			edy = date.getFullYear()+1;
			edm = date.getMonth()+1;
			edd = date.getDate();
			//TODO
		}
		//否则：结束日期=上一行结束日期的月份+1
		else{
			//获得上一行结束日期的日
			var prevRowDate = new Date(table.rows[i-1].cells[2].innerHTML.replace(new RegExp("-","gm"),"/"));
			//var days = prevRowDate.getDate();
			//alert(days);
			//将日期加上月份总天数得到结束日期
			//sd.setDate(sd.getDate()+(days));
			edy = prevRowDate.getFullYear();
			edm = prevRowDate.getMonth()+2;//月份+1
			if(edm>12){
				edy = edy+1;
				edm = 1;
			}
			edd = endDateDate;
		}
		//将月份和日期格式化成2位
		edm=edm.toString().length==1?"0"+edm:edm;
		edd=edd.toString().length==1?"0"+edd:edd;
		//拼装日期字符串2012-09-03
		var ed = edy+"-"+edm+"-"+edd;
		table.rows[i].cells[2].innerHTML=ed;
	}
}

/**
 *日期调动函数
 *业务逻辑：双击被置灰的日期选择新的结束日期后，将调用此函数进行日期区间验证以及重设表格日期排列
 *参数：table=日期表格，cell=被点击单元，newDate=新选择的日期
 *
 *结束日期调整动作思路：
 *根据被点击的结束日期得到它相应的起始日期，然后与获得新选择的日期比较
 *如果它们的差值大于等于20且小于等于40天，则将差值作为后面计算日期的基数变量，执行表格调整更新动作：
 *将被点击单元格的值改成新选择的日期，再逐个调整起始日期和结束日期往后推基数变量天。
 *日期调整完毕后，再执行日期置灰函数。
 */
 function setTableDate(newSelectedDate){
	
	var table=document.getElementById("dateTable");
	var cell=CURRENT_DBLCLICKED_CELL;
	
	//判断结束日期是否有修改，如果有的话才进行日期表调整
	if(cell.innerHTML!=newSelectedDate){
		//如果被修改的日期是第一期间起始日期，则第一期间结束日期=起始日期+起始日期月份的总天数
		if(cell.parentNode.rowIndex==1 && cell.cellIndex==1){
			//TODO 判断自然年度是否超过设定范文（不得大于和小于设定年2年）
			//TODO 待完善...
			cell.innerHTML=newSelectedDate;
			var sd = new Date(newSelectedDate.replace(new RegExp("-","gm"),"/"));
			//计算起始日期月份的总天数
			var days = getDays(sd.getFullYear(),sd.getMonth()+1);
			//将日期加上月份总天数得到结束日期
			sd.setDate(sd.getDate()+days);
			var edy = sd.getFullYear();
			var edm = sd.getMonth()+1;
			var edd = sd.getDate();
			//将月份和日期格式化成2位
			edm=edm.toString().length==1?"0"+edm:edm;
			edd=edd.toString().length==1?"0"+edd:edd;
			var ed = edy+"-"+edm+"-"+edd;
			//取得结束日期列，edc=EndDateCell
			var edc = table.rows[cell.parentNode.rowIndex].cells[cell.cellIndex+1];
			edc.innerHTML=ed;
			//TODO 执行日期更新：
			updateTableDate(edc);
		}
		//否则如果被修改的日期是结束日期则判断与起始日期的天数差是否在20-40天内，如果满足则执行更新日期动作（调用更新日期函数A）
		else if(cell.cellIndex==2){
			//根据被点击的结束日期得到它相应的起始日期
			var startDate = table.rows[cell.parentNode.rowIndex].cells[1].innerHTML;
			
			//进行相减的小日期（来自startDate的转换）
			var smallDate = new Date(startDate.replace(new RegExp("-","gm"),"/"));
			
			//进行相减的大日期（来自newSelectedDate的转换）
			var bigDate = new Date(newSelectedDate.replace(new RegExp("-","gm"),"/"));
			
			//计算被点击结束日期与其起始日期的天数差
			var differenceDay=((bigDate.getTime()-smallDate.getTime())/3600000/24);
			
			//由于起始日期也包含在范围之内所以要加1天
			differenceDay=differenceDay+1;
			
			//判断天数差是否满足大于等于20且小于等于40天
			if(differenceDay>=20 && differenceDay<=40){
				/*执行表格调整更新动作*/
				//将被点击单元格的值改成新选择的日期
				cell.innerHTML=newSelectedDate;
				//执行日期更新：
				updateTableDate(cell);
				
				//规则：以被修改的单元格为参照，如果被修改单元格是起始日期列（比如一月份是可以调整的），则结束日期列的值=起始列的日期+起始日期月的总天数
				
				/*
				//调整被点结束日期下面每行起始日期和结束日期，
				//规则：从调整的结束日期的下一行开始调整，起始日期为上一行的结束日期(newSelectedDate)+1天，结束日期为上一行的日期月份加1月，如果是12月则跳过不做任何处理
				for(var i=cell.parentNode.rowIndex+1;i<=12;i++){
					
					//1.设置起始日期
					var sd = new Date(table.rows[i-1].cells[2].innerHTML.replace(new RegExp("-","gm"),"/"));//start date
					
					//起始日期为上一行的结束日期(newSelectedDate)+1天
					sd.setDate(sd.getDate()+1);
					var sdy = sd.getFullYear();//start date year
					var sdm = sd.getMonth()+1;//start date month
					var sdd = sd.getDate();//start date date
					
					//将月份和日期格式化成2位
					sdm=sdm.toString().length==1?"0"+sdm:sdm;
					sdd=sdd.toString().length==1?"0"+sdd:sdd;
					
					//拼装日期字符串2012-09-03
					sd = sdy+"-"+sdm+"-"+sdd;//alert(sd);
					table.rows[i].cells[1].innerHTML=sd;
					
					//2.设置结束日期
					//TODO 注意！其实这里原则上应该是获得起始日期，在起始日期月份上+1，日期上-1
					
					var ed = new Date(table.rows[i-1].cells[2].innerHTML.replace(new RegExp("-","gm"),"/"));
					
					//结束日期为上一行的日期月份加1月
					ed.setMonth(ed.getMonth()+1);
					var edy = ed.getFullYear();
					var edm = ed.getMonth()+1;
					var edd = ed.getDate();
					
					//将月份和日期格式化成2位
					edm=edm.toString().length==1?"0"+edm:edm;
					edd=edd.toString().length==1?"0"+edd:edd;
					
					//如果是12月的“结束日期”，那么它只有一个值：xxxx-12-31
					if(i==12){
						edm = 12;
						edd = 31;
					}
					//拼装日期字符串2012-09-03
					ed = edy+"-"+edm+"-"+edd;
					table.rows[i].cells[2].innerHTML=ed;
					
				}
				*/
			}else{
				jAlert("每个会计期间必须在20~40天！");
			}
		}
	}
}

/**
 *默认表格日期填充函数
 *业务逻辑：根据传入的年份和月份，生成区间日期，将生成的日期内容填充进日期表格
 */
function defaultFilling(table,year,month){
	/*默认填充12个期间的日期区间，每个月一个期间。*/
	//循环为日期表格填充行，每行代表一个月度
	for(var i=1;i<=12;i++){
		//填充日期需要知道三个值：年、月、月末日期，年已经有了，月需要转换成2位格式，月末日期需要通过判断年、月来获得
		
		//1.得到当前月(i)的最后一天的日期值(月末日期)
		var monthLastDay = null;
		if(i<8){
			//如果为2月
			if(i==2){
				//再判断平闰年
				//如果是闰年，2月份的天数为29天
				if(year%4==0 && year%100!=0 || year%400==0){
					monthLastDay=29;
				}else{
					monthLastDay=28;
				}
			}else{
				//判断是偶数月还是奇数月
				if(i%2==0){
					monthLastDay=30;
				}else{
					monthLastDay=31;
				}
			}
		}else{
			//8-12月份的奇数月是31天，偶数月是30天，与1-7月恰好相反
			if(i%2==0){
				monthLastDay=31;
			}else{
				monthLastDay=30;
			}
		}
		//alert(year+"年"+month+"月有"+monthLastDay+"天！");
		
		//格式化月到2位数
		var month2 = i.toString().length==1?"0"+i:i;
		
		//2.动态向表格填充行：
		var row = table.insertRow(table.rows.length);
		
		//“期间”列
		var periodCell = row.insertCell(0);
		
		//“起始日期”列
		var startDateCell = row.insertCell(1);
		
		//“结束日期”列
		var endDateCell = row.insertCell(2);
		
		//初始化设置“期间”列
		periodCell.style.backgroundColor="#D4D0C8";
		periodCell.style.border="1px";
		periodCell.style.borderStyle="outset";
		periodCell.style.borderColor="#eee";
		periodCell.style.textAlign="center";
		periodCell.innerHTML=month2;
		
		//初始化设置“起始日期”列
		startDateCell.innerHTML=year+"-"+month2+"-01";
		startDateCell.style.backgroundColor="#B9FFFF";
		startDateCell.style.border="1px solid #B9FFFF";
		startDateCell.style.textAlign="center";
		
		//初始化设置“结束日期”列
		endDateCell.innerHTML=year+"-"+month2+"-"+monthLastDay;
		endDateCell.style.backgroundColor="#B9FFFF";
		endDateCell.style.border="1px solid #B9FFFF";
		endDateCell.style.textAlign="center";
	}
}

/**
 *“结束日期”列置灰函数
 *业务逻辑：根据月份值置灰月份（置灰表格第3列“结束日期”）到11月结束日期
 *此函数有待改进之处
 */
function dateDisable(table,month){
	
	//根据月份值置灰月份（置灰表格第3列“结束日期”）到11月结束日期；
	//如果是12月，则表格全显；如果是1月，置灰1月的“起始日期”列
	if(month!=12){
		
		for(var i=1;i<=11;i++){
			
			//如果行月值等于或等于月份参数，即为置灰的单元
			if(i>=month){
				table.rows[i].cells[2].style.backgroundColor="#808080";
				table.rows[i].cells[2].style.border="1px solid #808080";
				table.rows[i].cells[2].style.textAlign="center";
				table.rows[i].cells[2].ondblclick=showDatePicker;
			}
			//否则即为高亮的单元
			else{
				table.rows[i].cells[2].style.backgroundColor="#B9FFFF";
				table.rows[i].cells[2].style.border="1px solid #B9FFFF";
				table.rows[i].cells[2].style.textAlign="center";
				table.rows[i].cells[2].ondblclick=null;
			}
			/*
			var dateString = table.rows[i].cells[2].innerHTML;
			var date = new Date(dateString.replace(new RegExp("-","gm"),"/"));
			date.getMonth()+1
			*/
		}
		//如果是1月，置灰1月的“起始日期”列
		if(month==1){
			table.rows[1].cells[1].style.backgroundColor="#808080";
			table.rows[1].cells[1].style.border="1px solid #808080";
			table.rows[1].cells[1].style.textAlign="center";
			table.rows[1].cells[1].ondblclick=showDatePicker;
		}else{
			table.rows[1].cells[1].style.backgroundColor="#B9FFFF";
			table.rows[1].cells[1].style.border="1px solid #B9FFFF";
			table.rows[1].cells[1].style.textAlign="center";
			table.rows[1].cells[1].ondblclick=null;
		}
	}else{
		table.rows[1].cells[1].style.backgroundColor="#B9FFFF";
		table.rows[1].cells[1].style.border="1px solid #B9FFFF";
		table.rows[1].cells[1].style.textAlign="center";
		table.rows[1].cells[1].ondblclick=null;
		for(var i=1;i<table.rows.length;i++){
			table.rows[i].cells[2].style.backgroundColor="#B9FFFF";
			table.rows[i].cells[2].style.border="1px solid #B9FFFF";
			table.rows[i].cells[2].style.textAlign="center";
			table.rows[i].cells[2].ondblclick=null;
		}
	}
}

/**
 *表格日期填充函数
 *业务逻辑：根据传入的年份和月份，生成区间日期，将生成的日期内容填充进日期表格
 */
function setDateList(year,month){
	var table = document.getElementById("dateTable");
	//#如果之前没有填充过，此为第一次填充：
	if(!DATE_TABLE_IS_FILLINGED){
		//执行默认填充函数
		defaultFilling(table,year,month);
		//执行“结束日期”列置灰函数
		dateDisable(table,month);
	}
	//#如果之前填充过：
	else{
		//判断年份值是否有变化（取表格起始日期第一行值的前四位跟传入的年份对比）
		var oldYear = table.rows[1].cells[1].innerHTML.substring(0,4);
		//如果是一个新的年份值，则执行执行默认填充函数和“结束日期”列置灰函数
		if(oldYear!=year){
			//清空表格数据行
			while(table.rows.length>1){
				table.deleteRow(table.rows.length-1);
			}
			//执行默认填充函数
			defaultFilling(table,year,month);
			//执行“结束日期”列置灰函数
			dateDisable(table,month);
		}
		//否则如果月份值发生了改变
		else{
			var oldMonth = table.rows[1].cells[1].innerHTML;
			//用一个循环读取“结束日期”列，判断单元格是否被置灰，如果被置灰，那么其月份即是改变之前的月份
			for(var i=0;i<12;i++){
				var cell = table.rows[i].cells[2];
				if(cell.style.backgroundColor=="#808080"){
					oldMonth = cell.innerHTML.substring(5,7);
					break;
				}
			}
			//判断如果月份值确实发生了改变
			if(month!=oldMonth){
				//则执行“结束日期”列置灰函数
				dateDisable(table,month);//TODO 这里有可能会有BUG，原则上应该先重置所有单元格后再设置置灰
			}
		}
	}
	//修改日期表格填充状态为已填充
	DATE_TABLE_IS_FILLINGED=true;
}

//刷新日期表，此函数用于年份月份文本框值发生改变时执行
function refresh(){
	var year = document.getElementById("year").value;
	var month = document.getElementById("month").value;
	setDateList(year,month);
}

//页面初始化：
(function(){
	//从父窗体页面获取年份和月份
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var ppy = window.parent.document.getElementById("addAccount").getElementsByTagName("iframe")[0].contentWindow.document.getElementById("iyear").value;
	var ppm = window.parent.document.getElementById("addAccount").getElementsByTagName("iframe")[0].contentWindow.document.getElementById("imonth").value;
	
	if(ppy!=null && ppy!=""){
		year = ppy;
		document.getElementById("year").value=ppy;
	}
	if(ppm!=null && ppm!=""){
		month = ppm;
		document.getElementById("month").value=ppm;
	}
	setDateList(year,month);
	
})();