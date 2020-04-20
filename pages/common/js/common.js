/**
 * 获取url参数
 * @param name: 参数名称
 */
$.getUrlParam = function(name){
	try{
		var webUrl = window.location.href;
		if(webUrl.indexOf("?") == -1){
			return "";
		}
		var params = webUrl.split("?")[1];
		var strs = params.split("&");
		var param = {};
		for(var i = 0; i < strs.length; i ++) {
			param[strs[i].split("=")[0]] = strs[i].split("=")[1];
		}
		var resp = param[name] || "";
		return decodeURI(resp);
	}catch(e){
		return "";
	}
}
/**
 * 字符串编码
 * @param e: 字符串
 */
$.encode = function(e){
	return encodeURIComponent(e || "");
}
/**
 * 字符串解码
 * @param e: 字符串
 */
$.decode = function(e){
	return decodeURIComponent(e || "");
}
/**
 * 字符串解码
 * @param text: 弹出框内容
 * @param func: 可选,确认按钮执行方法
 */
var alert = function(text, func){
	if($(".alert-dialog").length == 0){
		var str = '';
		str += '<div class="alert-dialog">';
		str += '	<div class="alert-dialog-con">';
		str += '		<div class="con"></div>';
		str += '		<div class="alert-dialog-btn"></div>';
		str += '	</div>';
		str += '</div>';
		$("body").append(str);
		$(".alert-dialog-btn").unbind("click").click(function(){
			$(".alert-dialog").hide();
			$(".alert-dialog .con").empty();
			if(func) func();
		});
	}
	$(".alert-dialog .con").html(text);
	$(".alert-dialog").show();
	var bodyH = $(window).height() * 0.92;
	var thisH = $(".alert-dialog-con").height();
	var marginT = (bodyH - thisH) / 2;
	$(".alert-dialog-con").css("margin-top" , marginT + "px");
}
var confirm = function(text, func, cancelFunc) {
	if($(".confirm-dialog").length == 0){
		var str = '';
		str += '<div class="confirm-dialog">';
		str += '	<div class="confirm-dialog-con">';
		str += '		<div class="con"></div>';
		str += '		<div class="confirm-dialog-btn ok"></div>';
		str += '		<div class="confirm-dialog-btn cancel"></div>';
		str += '	</div>';
		str += '</div>';
		$("body").append(str);
		$(".confirm-dialog-btn").unbind("click").click(function(){
			$(".confirm-dialog").hide();
			$(".confirm-dialog .con").empty();
			var ok = $(this).hasClass('ok');
			if(ok && func) func();
			var cancel = $(this).hasClass('cancel');
			if(cancel && cancelFunc) cancelFunc();
		});
	}
	$(".confirm-dialog .con").html(text);
	$(".confirm-dialog").show();
	var bodyH = $(window).height() * 0.92;
	var thisH = $(".confirm-dialog-con").height();
	var marginT = (bodyH - thisH) / 2;
	$(".confirm-dialog-con").css("margin-top" , marginT + "px");
}

