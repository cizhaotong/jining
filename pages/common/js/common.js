/**
 * 获取url参数
 * @param name: 参数名称
 */
var $c = {};//自定义插件库
$c.getUrlParam = function(name){
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
$c.encode = function(e){
	return encodeURIComponent(e || "");
}
/**
 * 字符串解码
 * @param e: 字符串
 */
$c.decode = function(e){
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

/**	charts库 begin */
$c.charts = {};
/**
 * 柱形图
 * @params id: 绑定id , 必须
 * @params datas: 数据列表,例: [{name: '柱名称', data: [1, 2, 3, ...]}, ...] , 必须
 * @params xLabels: x轴文字显示列表,例: ['文字1', '文字2', '文字3', ...] , 必须
 * @params colors: 柱颜色 , 例: ['#428EDA', '#87D568', ...] , 可选
 * */
$c.charts.zhu = function(id, datas, xLabels, colors) {
	datas = datas || [];
	xLabels = xLabels || [];
	colors = colors || ['#428EDA', '#87D568', '#FF696B', '#7F77E6', '#D8A7DE', '#FCCD57'];
	Highcharts.chart(id,{
		chart: {
			type: 'column',
			backgroundColor: 'none'
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			categories: xLabels,
			labels: {
				style: {
					color: '#fff'
				}
			},
			crosshair: true
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			},
			labels: {
				style: {
					color: '#fff'
				}
			},
			gridLineColor: 'rgba(255, 255, 255, 0.3)'
		},
		plotOptions: {
			column: {
				borderWidth: 0,
			}
		},
		legend: {
			enabled: false
		},
		series: datas,
		colors: colors
	});
	$('#'+ id +' .highcharts-credits').remove();
}
/**
 * 横向比例柱形图
 * @params v: 绑定元素 , 必须
 * @params datas: 数据列表 ,例: [{label: '样例一', num: '数量1'}, {label: '样例二', num: '数量2'}, ...], 必须
 * @params style: 样式控制 , 可选
 * @params style.maxNum: 设置比例最大值
 * @params style.fontColor: 字颜色
 * @params style.fontSize: 字大小
 * @params style.bgColor: 设置背景颜色,渐变颜色英文标点逗号隔开
 * @params style.borderColor: 设置边框颜色
 * @params style.zhuColor: 设置柱颜色,渐变颜色英文标点逗号隔开
 * */
$c.charts.zhuRow = function(v, datas, style) {
	datas = datas || [];
	style = style || {};
	let maxNum = style.maxNum || 0;
	let str = '';
	if(datas.length){
		str += '<div class="charts-zhu-row">';
		str += '	<table>';
		for(let i in datas) {
			let label = datas[i].label || '';
			let num = datas[i].num || 0;
			if(num > maxNum) maxNum = num;
			let zhuBgStyle = '';
			let zhuStyle = '';
			let fontStyle = ''
			if(style.bgColor){
				let bgColor = style.bgColor.split(',');
				if(bgColor.length > 1){
					zhuBgStyle += 'background: linear-gradient(to right, '+ bgColor[0] +', '+ bgColor[1] +');';
				}else{
					zhuBgStyle += 'background: '+ bgColor[0] +';';
				}
			}
			if(style.borderColor){
				zhuBgStyle += 'border-color: '+ style.borderColor +';';
			}
			if(style.zhuColor){
				let zhuColor = style.zhuColor.split(',');
				if(zhuColor.length > 1){
					zhuStyle += 'background: linear-gradient(to right, '+ zhuColor[0] +', '+ zhuColor[1] +');';
				}else{
					zhuStyle += 'background: '+ zhuColor[0] +';';
				}
			}
			if(style.fontColor){
				fontStyle += 'color: '+ style.fontColor +';';
			}
			if(style.fontSize){
				fontStyle += 'font-size: '+ style.fontSize +';';
			}
			str += '	<tr style="'+ fontStyle +'">';
			str += '		<td><span class="text-more">'+ label +'</span></td>';
			str += '		<td><b class="zhu-row" style="'+ zhuBgStyle +'"><i value="'+ num +'" style="'+ zhuStyle +'"></i></b></td>';
			str += '		<td><span class="text-more">'+ num +'</span></td>';
			str += '	</tr>';
		}
		str += '	</table>';
		str += '</div>';
	}
	$(v).html(str);
	if(maxNum > 0) {
		setTimeout(function(){
			$(v + ' .zhu-row i').each(function() {
				let width = parseInt($(this).attr('value')) / maxNum * 100;
				$(this).css('width', width + '%');
			});
		},100);
	}
}
/**	charts库 end */