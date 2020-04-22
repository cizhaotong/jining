/**
 * @action charts自定义封装
 */
var $c = {};
$c.charts = {};
/**
 * 面积曲线图
 * @params v: 绑定元素id , 必须
 * @params datas: 数据列表,例: [{name: '名称', data: [1, 2, 3, ...]}, ...] , 必须
 * @params xLabels: x轴文字显示列表,例: ['文字1', '文字2', '文字3', ...] , 必须
 * @params colors: 柱颜色 , 例: ['#428EDA', '#87D568', ...] , 可选
 * */
$c.charts.areaSpline = function(v, datas, xLabels, colors) {
    datas = datas || [];
    xLabels = xLabels || [];
    colors = colors || ['#428EDA', '#87D568', '#FF696B', '#7F77E6', '#D8A7DE', '#FCCD57'];
    Highcharts.chart(v,{
        chart: {
            type: 'areaspline',
            backgroundColor: 'none'
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        xAxis: {
            categories: xLabels,
            labels: {
                style: {
                    color: '#fff'
                }
            },
        },
        yAxis: {
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
        tooltip: {
            shared: true
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        colors: colors,
        series: datas
    });
    $('#'+ v +' .highcharts-credits').remove();
}
/**
 * 地图
 * @params v: 绑定元素id , 必须
 * */
$c.charts.map = function(v) {
    let mapSize = [638, 477];
    let outerW = $('#' + v).width();
    let outerH = $('#' + v).height();

    let mapW = outerW;
    let mapH = outerW / mapSize[0] * mapSize[1];
    if(mapH > outerH) mapH = outerH;
    let mapTop = 0;
    if(outerH > mapH) mapTop = (outerH - mapH) / 2;

    let peX = mapW / mapSize[0];
    let peY = mapH / mapSize[1];

    let mapPoints = [{
        name: '小孟镇',
        point: [150, 56]
    },{
        name: '新驿镇',
        point: [138, 148]
    },{
        name: '漕河镇',
        point: [280, 68]
    },{
        name: '颜店镇',
        point: [230, 256]
    },{
        name: '兖州镇',
        point: [322, 216]
    },{
        name: '大安镇',
        point: [350, 120]
    },{
        name: '龙桥镇',
        point: [402, 282]
    },{
        name: '鼓楼街道',
        point: [450, 262]
    },{
        name: '酒仙桥街道',
        point: [496, 230]
    },{
        name: '兴隆庄街道',
        point: [530, 310]
    }];
    let mapStr = '';
    mapStr += '<div class="charts-map" style="width: '+ mapW +'px;height: '+ mapH +'px;top: '+ mapTop +'px;">';
    mapStr += ' <img class="c-map-bg" src="./common/img/map/map_bg.png" />';
    mapStr += ' <div class="c-map-points">';
    for(let i in mapPoints){
        let pointX = mapPoints[i].point[0] * peX;
        let pointY = mapPoints[i].point[1] * peY;
        mapStr += '     <div class="c-map-point" style="left: '+ pointX +'px;top: '+ pointY +'px;">';
        mapStr += '         <i></i><span>'+ mapPoints[i].name +'</span>';
        mapStr += '     </div>';
    }
    mapStr += ' </div>';
    mapStr += '</div>';


    mapStr += '';
    $('#' + v).html(mapStr).children('.charts-map').addClass('show');
}
/**
 * 圆环进度条
 * @params v: 绑定元素id , 必须
 * @params value: 圆环的百分比值, 范围0-100 , 必须
 * @params style: 圆环样式控制 , 可选
 * @params style.size: 圆环大小,圆环直径,默认容器宽、高小的值
 * @params style.fontColor: 圆环加载条宽度, 范围0-1, 默认0.2
 * @params style.speed: 圆环加载速度,毫秒, 默认 1000
 * @params style.color: 圆环进度条颜色, 默认 #118BD4, ( 提供了6 种系统颜色, 值: '_0' 到 '_5' )
 * @params style.bgColor: 圆环背景颜色, 默认 #013567
 * @params style.text: 圆环内部是否显示比例文字, 默认true
 * @params style.fontColor: 圆环内部文字颜色, 默认 #fff
 * */
$c.charts.ringSpeed = function(v, value, style) {
    value = value || 0;
    style = style || {};
    style.colors = ['#128CD7', '#87D568', '#FF696B', '#7F77E6', '#D8A7DE', '#FBCE57'];
    style.size = style.size || 0;
    let outerW = $("#" + v).width();
    let outerH = $("#" + v).height();
    let defaultSize = outerW;
    if(outerH < outerW) defaultSize = outerH;
    if(!style.size || style.size > defaultSize) style.size = defaultSize;
    style.speed = style.speed || 1000;
    style.color = style.color || '#118BD4';
    let colorNew = style.color.split('_');
    if(colorNew.length > 1 && style.colors.length > colorNew[1]) style.color = style.colors[colorNew[1]];
    style.bgColor = style.bgColor || '#013567';
    style.text = style.text || true;
    style.fontColor = style.fontColor || '#fff';
    style.width = style.width || 0.2;
    $("#" + v).css('color', style.fontColor);
    $("#" + v).circleChart({
        value: value,
        size: style.size,
        speed: style.speed,
        color: style.color,
        backgroundColor: style.bgColor,
        text: true,
        widthRatio: style.width,
        onDraw: function(el, circle) {
            circle.text(Math.round(circle.value) + '%');
        }
    });
}
/**
 * 饼形图
 * @params v: 绑定元素id , 必须
 * @params datas: 数据列表,例: [{name: '个体访',y: 75}, ...] , 必须
 * @params style: 样式控制 , 可选
 * @params style.fontColor: 字颜色
 * @params style.pieColors: 扇形区域颜色,例: ['#128CD7', '#87D568', '#FF696B', '#7F77E6', '#D8A7DE', '#FBCE57'] , 可选
 * @params style.innerSize: 中间圆环百分比,默认0
 * */
$c.charts.pie = function(v, datas, style) {
    datas = datas || [];
    style = style || {};
    style.pieColors = style.pieColors || ['#128CD7', '#87D568', '#FF696B', '#7F77E6', '#D8A7DE', '#FBCE57'];
    style.innerSize = style.innerSize || 0;
    style.fontColor = style.fontColor || '#fff';
    if(datas.length){
        let bodyH = $('#' + v).height();
        style.lineHeight = parseInt((bodyH / datas.length - 20) / 2);
    }
    Highcharts.chart(v, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: 'none',
            spacing: [0, 0, 0, 0]
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                borderWidth: 0,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical',
            squareSymbol: false,
            symbolHeight: 8,
            symbolWidth: 20,
            symbolPadding: 8,
            labelFormat: '{name}：{y}',
            itemMarginTop: style.lineHeight,
            itemMarginBottom: style.lineHeight,
            navigation: {
                enabled: false
            },
            itemStyle: {
                color: style.fontColor,
                fontWeight: 'normal',
                opacity: 0.9
            },
            itemHoverStyle: {
                color: style.fontColor,
            },
            itemHiddenStyle: {
                color: style.fontColor,
                opacity: 0.5
            },
            x: -10
        },
        colors: style.pieColors,
        series: [{
            name: '',
            colorByPoint: true,
            innerSize: style.innerSize,
            data: datas
        }]
    });
    $('#'+ v +' .highcharts-credits').remove();
}
/**
 * 竖向柱形图
 * @params v: 绑定元素 , 必须
 * @params datas: 数据列表,例: [{name: '柱名称', data: [1, 2, 3, ...]}, ...] , 必须
 * @params xLabel: x轴文字 , 必须 , 例; ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
 * @params style: 样式控制 , 可选
 * @params style.maxNum: 设置比例最大值
 * @params style.fontColor: 字颜色
 * @params style.fontSize: 字大小
 * @params style.zhuColor: 设置柱颜色,渐变颜色英文标点逗号隔开 ,例:['#5497E3,#1281D1', '#7CD05C,#569A3B', '#FBC94C,#9F823A', '#FC888D,#E36067']
 * */
$c.charts.zhuCol = function(v, datas, xLabel, style) {
    if(v && v.indexOf('#') == -1 && v.indexOf('.') == -1) v = '#' + v;
    datas = datas || [];
    xLabel = xLabel || [];
    style = style || {};
    style.zhuColor = style.zhuColor || ['#5497E3,#1281D1', '#7CD05C,#569A3B', '#FBC94C,#9F823A', '#FC888D,#E36067'];
    let maxNum = style.maxNum || 0;
    $(v).empty();
    if(datas.length) {
        let str = '';
        let fontStyle = '';
        if(style.fontColor){
            fontStyle += 'color: '+ style.fontColor +';';
        }
        if(style.fontSize){
            fontStyle += 'font-size: '+ style.fontSize +';';
        }
        str += '<div class="charts-zhu-col" style="'+ fontStyle +'">';
        for(let i in datas) {
            if(datas[i].data && datas[i].data.length) {
                for(let j in datas[i].data) {
                    if(datas[i].data[j] > maxNum) maxNum = datas[i].data[j];
                }
            }
        }

        let leftStr = '';
        leftStr += '<div class="c-left">';
        let leftLen = 5;
        let leftAveNum = parseInt(maxNum / leftLen);
        let maxNumNew = maxNum;
        for(let i = 0 ; i < 5 ; i ++) {
            leftStr += '<i class="text-more">'+ maxNumNew +'</i>';
            maxNumNew -= leftAveNum;
        }
        leftStr += '<i class="text-more">0</i>';
        leftStr += '</div>';
        str += leftStr;

        let rightStr = '';
        rightStr += '<div class="c-right">';
        rightStr += '   <div class="c-items">';
        let rightLen = xLabel.length || 0;
        for(let i in datas) {
            if(datas[i].data && datas[i].data.length > rightLen) rightLen = datas[i].data.length;
        }
        for(let i = 0 ; i < rightLen ; i ++) {
            rightStr += '<div class="c-item">';
            for(let j in datas){
                let zhuStyle = '';
                if(style.zhuColor){
                    let zhuColor = style.zhuColor[j].split(',');
                    if(zhuColor.length > 1){
                        zhuStyle += 'background: linear-gradient(to top, '+ zhuColor[0] +', '+ zhuColor[1] +');';
                    }else{
                        zhuStyle += 'background: '+ zhuColor[0] +';';
                    }
                }
                if(datas[j].data && datas[j].data[i]) rightStr += '<i class="c-col-'+ j +'" col="c-col-'+ j +'" style="'+ zhuStyle +'" value="'+ datas[j].data[i] +'"></i>';
            }
            rightStr += '</div>';
        }
        rightStr += '   </div>';
        rightStr += '   <div class="c-bg"><i></i><i></i><i></i><i></i><i></i></div>';
        rightStr += '</div>';
        str += rightStr;

        if(xLabel.length) {
            let bottomStr = '';
            bottomStr += '<div class="c-bottom">';
            for(let i in xLabel) {
                bottomStr += '<span class="text-more">'+ xLabel[i] +'</span>';
            }
            bottomStr += '</div>';
            str += bottomStr;
        }

        str += '</div>';
        $(v).html(str);

        let outerW = $(v +' .charts-zhu-col').width();
        if(xLabel.length){
            let bootomLen = xLabel.length;
            let bootomAveW = parseInt(outerW / bootomLen);
            $(v +' .charts-zhu-col .c-bottom span').each(function(){
                $(this).css('width', bootomAveW);
            });
        }
        if(rightLen > 0) {
            let rightAveW = parseInt(outerW / rightLen);
            $(v +' .charts-zhu-col .c-right .c-item').each(function(){
                $(this).css('width', rightAveW);
                let iLen = $(this).children('i').length;
                if(iLen) {
                    let iW = $(this).children('i').width();
                    let firstLeft = (0 - iLen / 2) * iW;
                    let marginW = 4;
                    let marginAll = (iLen - 1) * marginW;
                    firstLeft -= marginAll / 2;
                    for(let i = 0 ; i < iLen ; i ++) {
                        $(this).children('i').eq(i).css('margin-left', firstLeft);
                        firstLeft += iW + marginW;
                    }
                }
            });
            setTimeout(function(){
                $(v +' .charts-zhu-col .c-right .c-item i').each(function() {
                    let height = parseInt($(this).attr('value')) / maxNum * 100;
                    $(this).css('height', height + '%');
                });
            },100);
            $(v +' .charts-zhu-col .c-right .c-item i').hover(function(){
                $(this).parent().addClass('hover');
                let hoverItem = $(this).attr('col');
                $(v +' .charts-zhu-col .c-right .c-item i').each(function(){
                    if($(this).attr('col') != hoverItem) $(this).addClass('unHover');
                });
            },function(){
                $(this).parent().removeClass('hover');
                $(v +' .charts-zhu-col .c-right .c-item i').removeClass('unHover');
            });
        }

    }

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
    if(v && v.indexOf('#') == -1 && v.indexOf('.') == -1) v = '#' + v;
    datas = datas || [];
    style = style || {};
    $(v).empty();
    if(datas.length){
        let maxNum = style.maxNum || 0;
        let str = '';
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
            str += '		<td><b class="c-zhu-row" style="'+ zhuBgStyle +'"><i value="'+ num +'" style="'+ zhuStyle +'"></i></b></td>';
            str += '		<td><span class="text-more">'+ num +'</span></td>';
            str += '	</tr>';
        }
        str += '	</table>';
        str += '</div>';
        $(v).html(str);
        let outerH = $(v).height();
        var zhuH = $(v + ' td').height();
        if(outerH / datas.length > zhuH) $(v + ' td').css('height', parseInt(outerH / datas.length));
        if(maxNum > 0) {
            setTimeout(function(){
                $(v + ' .c-zhu-row i').each(function() {
                    let width = parseInt($(this).attr('value')) / maxNum * 100;
                    $(this).css('width', width + '%');
                });
            },100);
        }
    }
}

/**
 * 柱形图 highcharts
 * @params v: 绑定元素id , 必须
 * @params datas: 数据列表,例: [{name: '柱名称', data: [1, 2, 3, ...]}, ...] , 必须
 * @params xLabels: x轴文字显示列表,例: ['文字1', '文字2', '文字3', ...] , 必须
 * @params colors: 柱颜色 , 例: ['#428EDA', '#87D568', ...] , 可选
 * */
$c.charts.zhu = function(v, datas, xLabels, colors) {
    datas = datas || [];
    xLabels = xLabels || [];
    colors = colors || ['#428EDA', '#87D568', '#FF696B', '#7F77E6', '#D8A7DE', '#FCCD57'];
    Highcharts.chart(v,{
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
    $('#'+ v +' .highcharts-credits').remove();
}