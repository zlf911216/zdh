var phone_width=414,
	phone_height=736;
$(function() {
	function isNumber(value){
		return /^[(-?\d+\.\d+)|(-?\d+)|(-?\.\d+)]+$/.test(value + '');
	}
	var $message=$(".message");
	$("#choose_phone").change(function(event) {
		event.preventDefault();
		var phone_kind=$(".phone").find("option:selected").text();
		switch(phone_kind){
			case "iphone4":
				$message.css({
					width: '320px',
					height: '480px'
				});
				phone_width=320;
				phone_height=480;
				$(".my_width,.my_height,.make_true").css({visibility: 'hidden'});
				break;
			case "iphone6":
				$message.css({
					width: '414px',
					height: '736px'
				});
				$(".my_width,.my_height,.make_true").css({visibility: 'hidden'});
				break;
			case "自定义":
				$(".my_width,.my_height,.make_true").css({visibility: 'visible'});
				break;
		}
	});	
	$(".make_true button").on('click', function(event) {
		event.preventDefault();
		var width=$(".my_width input").val();
		var height=$(".my_height input").val();
		if(width!=""&&height!=""&&isNumber(width)&&isNumber(height)){
			$message.css({
				width: width,
				height: height
			});
			phone_width=width;
			phone_height=height;
		}
	});
	$(".all_page").on('selectstart',function(event) {
		event.preventDefault();
		return false
	});
});