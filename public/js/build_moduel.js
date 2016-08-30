function bulid_mode(num,kind,url){
	//模块外层div
	var module_box=document.createElement("div");
	module_box.setAttribute("class","img_mod my_choose");
	module_box.setAttribute("data-num",num);
	module_box.setAttribute("data-kind",kind);
	//组件列表
	var module_li=document.createElement("li"),
		module_li_i=document.createElement("i"),
		module_li_div1=document.createElement("div"),
		module_li_div2=document.createElement("div"),
		module_li_div3=document.createElement("div");
	module_li_div1.setAttribute("class","change_show");
	module_li_div2.setAttribute("class","moduel_num_message");
	module_li_div2.innerHTML="图片"+num;
	module_li_div3.setAttribute("class","close");
	module_li_div1.appendChild(module_li_i);
	module_li.appendChild(module_li_div1);
	module_li.appendChild(module_li_div2);
	module_li.appendChild(module_li_div3);
	$(".moduel_num").append(module_li);

	//控制元件
	var right_control=document.createElement("div");
	right_control.setAttribute("class","del RightMiddle");
	//创建图片
	var module_img=document.createElement("img");
	module_img.src=url;
	//加入页面
	module_box.appendChild(right_control);
	module_box.appendChild(module_img);
	$(".phone_message").append(module_box);

	//控制移动与大小
	var this_width,
		this_left,
		this_top,
		this_bottom,
		now_index,
		now_width=50,
		now_left=0,
		now_top=0,
		now_bottom=0,
		choose_tob=true,
		change_tob=false,
		allow_move=false,
		my_choose_move=false;

	right_control.addEventListener("mousedown",function(event){
		if(!module_box.classList.contains("my_choose")){
			return false;
		}
		event.stopPropagation();
		event.preventDefault();
		allow_move=true;
		var left=event.clientX;
		document.addEventListener("mousemove",function(event){
			if(allow_move){
				var move_lift=event.clientX-left;
				this_width=move_lift/phone_width*100+now_width;
				module_box.style.width=this_width+"%";
				$("#this_width").val(this_width);
			}
		});
		document.addEventListener("mouseup",function(event){
			now_width=this_width;
			allow_move=false;
			return false;
		})
	},false);
	module_box.addEventListener("mousedown",function(event){
		if(!module_box.classList.contains("my_choose")){
			return false;
		}
		event.stopPropagation();
		event.preventDefault();
		my_choose_move=true;
		var left=event.clientX;
		var top=event.clientY;
		document.addEventListener("mousemove",function(event){
			var move_lift=event.clientX-left;
			var move_top=event.clientY-top;		
			if(my_choose_move&&choose_tob){
				this_left=move_lift/phone_width*100+now_left;
				this_top=move_top/phone_height*100+now_top;
				module_box.style.left=this_left+"%";
				module_box.style.top=this_top+"%";
				$("#this_left").val(this_left);
				$("#choose_abs").val(this_top);
				change_tob=false;
			}else if(my_choose_move&&!choose_tob){
				this_left=move_lift/phone_width*100+now_left;
				this_bottom=-move_top/phone_height*100+now_bottom;
				module_box.style.left=this_left+"%";
				module_box.style.bottom=this_bottom+"%";
				$("#this_left").val(this_left);
				$("#choose_abs").val(this_bottom);
				change_tob=true;
			}
		})
		document.addEventListener("mouseup",function(event){
			now_left=this_left;
			now_top=this_top;
			if(change_tob){
				now_bottom=this_bottom;
			}
			my_choose_move=false;
			return false;
		})
	})

	//组件控制
	module_li_div1.addEventListener("click",function(event){
		event.stopPropagation();
		event.preventDefault();
		module_box.classList.toggle("hide");
		module_li_i.classList.toggle("hide_i");
	})
	module_li_div2.addEventListener("click",function(event){
		event.stopPropagation();
		event.preventDefault();
		$(".phone_message .img_mod").removeClass("my_choose");
		module_box.classList.add("my_choose");
	})
	module_li_div3.addEventListener("click",function(event){
		event.stopPropagation();
		event.preventDefault();
		module_box.parentNode.removeChild(module_box);
		module_li.parentNode.removeChild(module_li);
	});
	//组件属性
	if(module_box.classList.contains("my_choose")){
		$("#this_width").val(now_width);
		$("#this_left").val(now_left);
		$("#choose_abs").val(now_top);
	};
	module_box.addEventListener("click",function(event){
		$(".phone_message .img_mod").removeClass("my_choose");
		module_box.classList.add("my_choose");
		$("#this_width").val(now_width);
		$("#this_left").val(now_left);
		if(choose_tob){
			$("#choose_abs").val(now_top);
		}else{
			$("#choose_abs").val(now_bottom);
		}
		$("#this_index").val(now_index);
		
	});
	$(".choose_abs").on('change',function(event) {
		event.preventDefault();
		event.stopPropagation();
		if(module_box.classList.contains("my_choose")&&$(".choose_abs").val()=="下边距"){
			$("#choose_abs").val(now_bottom);
			module_box.style.top="auto";
			module_box.style.bottom=now_bottom+"%";
			choose_tob=false;
		}else if(module_box.classList.contains("my_choose")&&$(".choose_abs").val()=="上边距"){
			$("#choose_abs").val(now_top);
			module_box.style.bottom="auto";
			module_box.style.top=now_top+"%";
			choose_tob=true;
		}
	});
	$("#this_width,#this_left,#choose_abs,#this_index").on('focus',function(event) {
		event.stopPropagation();
		event.preventDefault();
		$("#this_width,#this_left,#choose_abs,#this_index").on('keyup',function(event) {
			event.preventDefault();
			event.stopPropagation();
			if(module_box.classList.contains("my_choose")&&$(this).val()!=""){
				if($(this).attr("data-kind")==1){
					var change_num=parseInt($(this).val());
					this_width=change_num;
					now_width=change_num;
					module_box.style.width=now_width+"%";
				}else if($(this).attr("data-kind")==2){
					var change_num=parseInt($(this).val());
					this_left=change_num;
					now_left=change_num;
					module_box.style.left=now_left+"%";
				}else if($(this).attr("data-kind")==3){
					if(choose_tob){
						var change_num=parseInt($(this).val());
						this_top=change_num;
						now_top=change_num;
						module_box.style.top=now_top+"%";
					}else{
						var change_num=parseInt($(this).val());
						this_bottom=change_num;
						now_bottom=change_num;
						module_box.style.bottom=now_bottom+"%";
					}
				}else if($(this).attr("data-kind")==4){
					var change_num=parseInt($(this).val());
					now_index=change_num;
					module_box.style.zIndex=now_index;
				}
			}

		});	
	});

}


var all_img_num=1;
$(function() {
	$(".myImg").on('click', '.imgBox', function(event) {
		event.stopPropagation();
		event.preventDefault();
		var url=$(this).children("img").attr("src");
		if(build_kind!="null"){
			if(build_kind=="Img"){
				showMyModuel();
				bulid_mode(all_img_num,build_kind,url)	
				all_img_num+=1;
			}
			else if(build_kind=="backImg"){
				$(".phone_message").css({backgroundImage:"url("+url+")"});
				$(".right_window").removeClass("show");
			}
		}
	});
});