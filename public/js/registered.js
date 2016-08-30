function addCookie(name, value, expireHours) {
	var cookieString = name + "=" + escape(value);
	if (expireHours > 0) { //判断是否设置过期时间
		var date = new Date();
		date.setTime(date.getTime + expireHours * 3600 * 1000);
		cookieString = cookieString + "; expire=" + date.toGMTString();
	}
	document.cookie = cookieString;
}

$(function() {
	$("#register").on('click', function(event) {
		event.preventDefault();
		var id = $("#userid").val();
		var password = $("#password").val();
		var password2 = $("#password_two").val();
		if (id == "") {
			$(".alert").text("请输入账号")
			$(".alert_box").show(400, function() {
				setTimeout(function() {
					$(".alert_box").hide(400)
				}, 800)
			});
			return
		}
		if (password != password2 && password != "" && password2 != "") {
			$(".alert").text("第二次输入密码错误")
			$(".alert_box").show(400, function() {
				setTimeout(function() {
					$(".alert_box").hide(400)
				}, 800)
			});
		} else if (password == "" || password2 == "") {
			$(".alert").text("请输入密码")
			$(".alert_box").show(400, function() {
				setTimeout(function() {
					$(".alert_box").hide(400)
				}, 800)
			});
		} else {
			$.ajax({
				type: 'POST',
				dataType: 'json',
				data: {
					userid: id,
					password: password
				},
				url: '/loginin',
				success: function(data) {
					if (data == true) {
						location.href = "/index";
						addCookie("UserId",id,1);
						addCookie("password",password,1);
					}
				},
			})
		}
	});
});