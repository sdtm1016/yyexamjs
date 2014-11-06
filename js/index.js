var currentIndex = 1;
$(function() {
	// 填充第一题
	$(".Titlelist>textarea").val(questions[0][0]);
	$("#myModal").html(questions[0][1]);
	$(".loginL ul >li").each(function(e) {
		if ($(this).html() > questions.length) {
			$(this).html("&nbsp;");
		};
	})

	/* 切换题目 */
	$(".loginL ul >li").click(function() {

		if ($(this).html() <= questions.length) {
			$(".loginL ul >li").each(function(e) {
				if ($(this).attr("class") == "cur") {
					$(this).removeClass("cur");
				};
			})
			$(this).addClass("cur");
			currentIndex = $(this).html();
			gotoQuestion(currentIndex - 1);
		}

	});

	/* 上一题 ，下一题 */
	$(".down").click(function() {
		$(".loginL ul >li").each(function(e) {
			if ($(this).hasClass("cur")) {
				_this = $(this);
				return;
			};
		})

		if (currentIndex < questions.length) {
			$(_this).removeClass("cur");
			$(_this).next().eq(0).addClass("cur");
			currentIndex = $(_this).next().html();
		};
		gotoQuestion(currentIndex - 1);

	})
	$(".up").click(function() {
		$(".loginL ul >li").each(function(e) {
			if ($(this).hasClass("cur")) {
				_this = $(this);
				return;
			};
		})
		if (currentIndex > 1) {
			$(_this).removeClass("cur");
			$(_this).prev().eq(0).addClass("cur");
			currentIndex = $(_this).prev().html();
		};
		gotoQuestion(currentIndex - 1);

	})
	$("#dateField").val(getNowFormatDate());
	$(".gostart").click(function() {
		var loginResult = checkLogin();
		if (loginResult == "-1") {
			alert("登陆信息错误");
		} else {
			$("#rightiframe")[0].src=loginResult;
		}
	});
	$('#scoreBtn').click(function() {
		$('#score_area').text($("#rightiframe")[0].contentWindow
				.getScore(scoreTypes[currentIndex - 1]));
	});

})
/* 切换题目 */
function gotoQuestion(currentIndex) {
	$(".Titlelist>textarea").val(questions[currentIndex][0]);
	$("#myModal").html(questions[currentIndex][1]);
	$("#rightiframe").attr("src", "default.html");
}

function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1
			+ strDate;
	return currentdate;
}

function iFrameHeight() {
	var ifm = document.getElementById("rightiframe");
	var subWeb = ifm.contentDocument;
	if (ifm != null && subWeb != null) {
		ifm.height = subWeb.body.scrollHeight;
	}
}