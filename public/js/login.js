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
	$("#login").on('click', function(event) {
		var id = $("#id").val();
		var password = $("#password").val();
		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: {
				userid: id,
				password: password
			},
			url: '/getin',
			success: function(data) {
				if (data) {
					location.href = "/index";
					addCookie("UserId", id, 1);
					addCookie("password", password, 1);
				}else{
					$(".alert_box").show('fast', function() {
						setTimeout(function(){
							$(".alert_box").hide()
						},600)
					});
				}
			},
		})
		event.preventDefault();
	});
});