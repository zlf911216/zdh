function showMyImg() {
	$(".phone_message .img_mod").removeClass("my_choose");
	$(".right_window").addClass("show");
	$(".img_lib").show();
	$(".moduel_attr").hide();
	$(".window_kind li").css({
		background: "rgba(0,0,0,0.6)"
	});
	$(".window_kind .kind_img").css({
		background: "rgba(0,0,0,0.95)"
	});
}

function showMyModuel() {
	$(".phone_message .img_mod").removeClass("my_choose");
	$(".right_window").addClass("show");
	$(".img_lib").hide();
	$(".moduel_attr").show();
	$(".window_kind li").css({
		background: "rgba(0,0,0,0.6)"
	});
	$(".window_kind .kind_moduel").css({
		background: "rgba(0,0,0,0.95)"
	});
}
var build_kind = "null";

$(function() {
	$(".window_kind .kind_img").on('click', function(event) {
		event.stopPropagation();
		event.preventDefault();
		showMyImg();
	});
	$(".window_kind .kind_moduel").on('click', function(event) {
		event.stopPropagation();
		event.preventDefault();
		showMyModuel();
	});

	//添加图片
	$(".message .add_img").on('click', function(event) {
		event.stopPropagation();
		event.preventDefault();
		showMyImg();
		build_kind = "Img";
	});

	//添加背景
	$(".message .add_backImg").on('click', function(event) {
		event.stopPropagation();
		event.preventDefault();
		showMyImg();
		build_kind = "backImg";
	});

	// $("body").on('click', function(event) {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	$(".right_window").removeClass("show");
	// 	$(".phone_message .img_mod").removeClass("my_choose");
	// });

	$(".moduel_num").on('click', 'li', function(event) {
		event.preventDefault();
		event.stopPropagation();
		showMyModuel();
	});
	$(".introduced").on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		var introduced = $(".phone_message_box").html();
		console.log(introduced)
		$.ajax({
			type: 'POST',
			dataType: 'json',
			data:{message:introduced},
			url: '/index/introduced',
			success: function(data) {

			}
		})
	});
	$("#upload_img").on('click', function(event) {
		var data = new FormData()
		var files = $("#file")[0].files;
		if (files) {
			for (var i = 0; i < files.length; i++) {
				data.append("upload", files[i]);
			}　　　　　　　　　　　　　　
		}
		console.log(files)
		event.preventDefault();
		$.ajax({
			type: 'POST',
			dataType: 'json',
			processData: false,
			contentType: false,
			data: data,
			url: '/index/upload',
			success: function(data) {
				if (data.user) {
					for (var i = 0; i < data.user.length; i++) {
						var html = '<div class="imgBox"><img src=' + data.user[i] + '></div>';
						$(".myImg").append(html);
					}
				}
			},
		})
	});
});