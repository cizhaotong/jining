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
 * @params datas: 数据列表 , 可选
 * */
$c.charts.map = function(v, datas) {
    datas = datas || [];
    let mapSize = [617, 565];
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
        id: 1001,
        name: '小孟镇',
        point: [156, 52],
        high: './common/img/map/map_high_1.png',
        area: ['58,54','90,42','214,10','204,30','307,49','250,98','238,128','214,111','105,80','73,84']
    },{
        id: 1002,
        name: '新驿镇',
        point: [138, 148],
        high: './common/img/map/map_high_2.png',
        area: ['34,86','50,58','68,90','107,88','276,146','226,239','158,206','111,207','79,170','68,149','71,98']
    },{
        id: 1003,
        name: '漕河镇',
        point: [310, 80],
        high: './common/img/map/map_high_3.png',
        area: ['250,129','273,88','308,59','316,34','327,27','344,32','339,51','370,72','416,52','407,33','426,21','476,44','346,124','325,143','297,132','277,140']
    },{
        id: 1004,
        name: '颜店镇',
        point: [122, 280],
        high: './common/img/map/map_high_4.png',
        area: ['67,182','105,213','150,213','202,245','235,248','238,267','256,268','258,303','264,314','247,376','158,421','125,374','132,345','29,317','37,301','9,296','17,252','44,199']
    },{
        id: 1005,
        name: '新兖镇',
        point: [280, 220],
        high: './common/img/map/map_high_5.png',
        area: ['274,188','285,198','332,186','352,196','394,183','399,154','404,154','402,182','406,229','380,249','342,255','344,274','329,284','329,305','346,317','420,294','429,338','458,329','443,412','377,423','316,415','281,377','258,375','271,314','263,260','248,260','239,237','245,205','257,191']
    },{
        id: 1006,
        name: '大安镇',
        point: [420, 120],
        high: './common/img/map/map_high_6.png',
        area: ['324,152','483,50','557,61','515,96','493,88','483,111','526,123','494,151','493,190','500,205','472,225','413,217','411,152','395,147','388,177','352,188','336,176','289,190','279,172','287,147','298,141']
    },{
        id: 1007,
        name: '龙桥街道',
        point: [350, 278],
        high: './common/img/map/map_high_7.png',
        area: ['350,262','367,255','383,256','392,244','409,245','412,234','422,225','423,237','425,249','420,265','425,274','409,291','384,302','374,297','347,308','336,298','335,288','350,278']
    },{
        id: 1008,
        name: '鼓楼街道',
        point: [450, 260],
        high: './common/img/map/map_high_8.png',
        area: ['426,288','430,230','476,231','488,248','487,269','474,296','476,309','434,330','435,301']
    },{
        id: 1009,
        name: '酒仙桥街道',
        point: [502, 230],
        high: './common/img/map/map_high_9.png',
        area: ['484,229','502,211','525,232','523,259','535,266','523,280','530,285','526,299','513,298','515,306','480,303','493,262']
    },{
        id: 1010,
        name: '兴隆庄街道',
        point: [480, 410],
        high: './common/img/map/map_high_10.png',
        area: ['450,526','448,449','454,370','464,339','473,321','486,331','521,313','545,364','574,370','569,399','607,450','541,527','510,516','488,540','480,525']
    }];
    if(datas.length){
        for(let i in datas){
            for(let j in mapPoints) {
                if(mapPoints[j].id == datas[i].id){
                    for(let k in datas[i]){
                        mapPoints[j][k] = datas[i][k];
                    }
                    break;
                }
            }
        }
    }
    let mapStr = '';
    mapStr += '<div class="charts-map" style="width: '+ mapW +'px;height: '+ mapH +'px;top: '+ mapTop +'px;">';
    mapStr += ' <img class="c-map-bg" src="./common/img/map/map_bg.png" />';
    mapStr += ' <div class="c-map-points">';
    for(let i in mapPoints){
        let pointX = mapPoints[i].point[0] * peX;
        let pointY = mapPoints[i].point[1] * peY;
        let warn = '';
        if(mapPoints[i].event) warn = 'warn'
        mapStr += '     <div class="c-map-point" style="left: '+ pointX +'px;top: '+ pointY +'px;">';
        mapStr += '         <i class="'+ warn +'" value="'+ mapPoints[i].id +'"></i><span>'+ mapPoints[i].name +'</span>';
        mapStr += '     </div>';
    }
    mapStr += ' </div>';
    mapStr += ' <div class="c-map-hover">';
    mapStr += '     <svg width="100%" height="100%">';
    for(let i in mapPoints){
        let id = mapPoints[i].id;
        let area = mapPoints[i].area;
        let areaStr = '';
        if(area && area.length) {
            for(let j in area) {
                let point = area[j].split(',');
                if(j != 0) areaStr += ',';
                areaStr += point[0] * peX + ',' + point[1] * peY;
            }
        }
        mapStr += '     <polygon class="hover-area" value="'+ id +'" fill="rgba(255,255,255,0)" stroke="none" points="'+ areaStr +'"></polygon>';
    }
    mapStr += '     </svg>';
    mapStr += ' </div>';
    mapStr += ' <img class="c-map-high" />';
    mapStr += ' <div class="c-tip">';
    mapStr += '       <div class="c-tip-til"></div>';
    mapStr += '       <div class="c-tip-con"></div>';
    mapStr += ' </div>';
    mapStr += '</div>';
    $('#' + v).html(mapStr).children('.charts-map').addClass('show');

    $('#' + v + ' .charts-map .c-map-hover .hover-area, #' + v + ' .charts-map .c-map-points .c-map-point i').hover(function(){
        let id = $(this).attr('value');
        for(let i in mapPoints){
            if(id == mapPoints[i].id) {
                $('#' + v + ' .charts-map .c-map-high').attr('src', mapPoints[i].high).addClass('show');
                break;
            }
        }
    },function(){
        $('#' + v + ' .charts-map .c-map-high').removeAttr('src').removeClass('show');
    });
    let hideTime;
    $('#' + v + ' .charts-map .c-map-points .c-map-point i').hover(function(){
        let id = $(this).attr('value');
        for(let i in mapPoints){
            if(id == mapPoints[i].id && mapPoints[i].event) {
                if(mapPoints[i].event.label) $('#' + v +' .charts-map .c-tip .c-tip-til').html(mapPoints[i].event.label);
                if(mapPoints[i].event.desc) $('#' + v +' .charts-map .c-tip .c-tip-con').html(mapPoints[i].event.desc);
                $('#' + v +' .charts-map .c-tip').addClass('on').addClass('show');
                clearTimeout(hideTime);

                let parentOpTop = $(this).parents('.c-map-points').offset().top;
                let pointOpTop = $(this).offset().top;
                let tipH = $('#' + v +' .charts-map .c-tip').outerHeight();
                let opTop = pointOpTop - parentOpTop - tipH - 5;

                let parentOpLeft = $(this).parents('.c-map-points').offset().left;
                let pointOpLeft = $(this).offset().left;
                let tipW = $('#' + v +' .charts-map .c-tip').outerWidth();
                let opLeft = pointOpLeft - parentOpLeft - tipW / 2;
                $('#' + v +' .charts-map .c-tip').css({
                    left: opLeft,
                    top: opTop,
                    transition: 'left 0.2s ease-out,top 0.2s ease-out'
                });
                setTimeout(function(){
                    let tipH = $('#' + v +' .charts-map .c-tip').outerHeight();
                    let opTop = pointOpTop - parentOpTop - tipH - 5;

                    let tipW = $('#' + v +' .charts-map .c-tip').outerWidth();
                    let opLeft = pointOpLeft - parentOpLeft - tipW / 2;
                    $('#' + v +' .charts-map .c-tip').css({
                        left: opLeft,
                        top: opTop,
                        transition: 'left 0.2s ease-out,top 0.2s ease-out'
                    });
                },200);
                break;
            }
        }
    },function(){
        $('#' + v +' .charts-map .c-tip').removeClass('on');
        hideTime = setTimeout(function(){
            if(!$('#' + v +' .charts-map .c-tip').hasClass('on')) {
                $('#' + v +' .charts-map .c-tip').removeClass('show');
                $('#' + v +' .charts-map .c-tip .c-tip-til').empty();
                $('#' + v +' .charts-map .c-tip .c-tip-con').empty();
            }
        }, 400);
    });
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
 * @params style.legend: 图例控制
 * @params style.legend.enabled: 图例开关,默认true,可选false
 * @params style.legend.po: 图例位置,默认bottom,可选top, right, bottom, left
 * @params style.legend.ifLabelNum: 是否显示图例数值,默认false,可选true
 * @params style.legend.labelSplit: 显示图例数值分隔符,默认中文分号'：'
 * */
$c.charts.pie = function(v, datas, style) {
    datas = datas || [];
    style = style || {};
    style.pieColors = style.pieColors || ['#128CD7', '#87D568', '#FF696B', '#7F77E6', '#D8A7DE', '#FBCE57'];
    style.innerSize = style.innerSize || 0;
    style.fontColor = style.fontColor || '#fff';
    style.legend = style.legend || {};
    style.legend.enabled = style.legend.enabled !== false;
    style.legend.po = style.legend.po || 'bottom';
    style.legend.align = 'center';
    style.legend.layout = 'horizontal';
    style.legend.itemMargin = 0;
    if(style.legend.po == 'bottom') {
        style.legend.verticalAlign = 'bottom';
    }
    if(style.legend.po == 'top') {
        style.legend.verticalAlign = 'top';
    }
    if(style.legend.po == 'left') {
        style.legend.verticalAlign = 'middle';
        style.legend.align = 'left';
        style.legend.layout = 'vertical';
    }
    if(style.legend.po == 'right') {
        style.legend.verticalAlign = 'middle';
        style.legend.align = 'right';
        style.legend.layout = 'vertical';
    }
    if(datas.length && style.legend.po == 'left' || style.legend.po == 'right') {
        let outerH = $('#' + v).height();
        style.legend.itemMargin = parseInt((outerH / datas.length - 20) / 2);
    }
    style.legend.labelFormat = '{name}';
    style.legend.labelSplit = style.legend.labelSplit || '：';
    if(style.legend.ifLabelNum) style.legend.labelFormat += style.legend.labelSplit + '{y}';
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
            enabled: style.legend.enabled,
            align: style.legend.align,
            verticalAlign: style.legend.verticalAlign,
            layout: style.legend.layout,
            squareSymbol: false,
            symbolHeight: 8,
            symbolWidth: 20,
            symbolPadding: 8,
            labelFormat: style.legend.labelFormat,
            itemMarginTop: style.legend.itemMargin,
            itemMarginBottom: style.legend.itemMargin,
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
            }
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
 * @params style.unit: 设置单位
 * @params style.fontColor: 字颜色
 * @params style.fontSize: 字大小
 * @params style.zhuColor: 设置柱颜色,渐变颜色英文标点逗号隔开 ,例:['#5497E3,#1281D1', '#7CD05C,#569A3B', '#FBC94C,#9F823A', '#FC888D,#E36067']
 * */
$c.charts.zhuCol = function(v, datas, xLabel, style) {
    if(v && v.indexOf('#') == -1 && v.indexOf('.') == -1) v = '#' + v;
    datas = datas || [];
    xLabel = xLabel || [];
    style = style || {};
    style.unit = style.unit || '';
    style.fontColor = style.fontColor || '#fff';
    style.fontSize = style.fontSize || '12px';
    style.zhuColor = style.zhuColor || ['#5497E3,#1281D1', '#7CD05C,#569A3B', '#FBC94C,#9F823A', '#FC888D,#E36067'];
    let maxNum = style.maxNum || 0;
    $(v).empty();
    if(datas.length) {
        let str = '';
        let fontStyle = '';
        fontStyle += 'color: '+ style.fontColor +';';
        fontStyle += 'font-size: '+ style.fontSize +';';
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
                let zhuColor = style.zhuColor[j].split(',');
                if(zhuColor.length > 1){
                    zhuStyle += 'background: linear-gradient(to top, '+ zhuColor[0] +', '+ zhuColor[1] +');';
                }else{
                    zhuStyle += 'background: '+ zhuColor[0] +';';
                }
                if(datas[j].data && datas[j].data[i]) rightStr += '<i class="c-col-'+ j +'" col="c-col-'+ j +'" clabel="'+ datas[j].name +'" cnum="'+ datas[j].data[i] +'" style="'+ zhuStyle +'" value="'+ datas[j].data[i] +'"></i>';
            }
            rightStr += '</div>';
        }
        rightStr += '   </div>';
        rightStr += '   <div class="c-bg"><i></i><i></i><i></i><i></i><i></i></div>';
        rightStr += '   <div class="c-tip">';
        rightStr += '       <div class="c-tip-til"></div>';
        rightStr += '       <div class="c-tip-con"></div>';
        rightStr += '   </div>';
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
            let hideTime;
            $(v +' .charts-zhu-col .c-right .c-item').hover(function(e){
                let index = $(this).index();
                if(xLabel.length && xLabel[index]) $(v +' .charts-zhu-col .c-right .c-tip .c-tip-til').html(xLabel[index]);
                let str = '';
                $(this).children('i').each(function(i){
                    str += '<div class="c-tip-text-row"><b style="background: '+ style.zhuColor[i].split(',')[0] +';"></b>'+ $(this).attr("clabel") +'：'+ $(this).attr("cnum") + style.unit +'</div>';
                });
                $(v +' .charts-zhu-col .c-right .c-tip .c-tip-con').html(str);
                $(v +' .charts-zhu-col .c-right .c-tip').addClass('on').addClass('show');
                clearTimeout(hideTime);
                let parentOpTop = $(this).parent().offset().top;
                let firstOpTop = $(this).children('i').first().offset().top;
                let lastOpTop = $(this).children('i').last().offset().top;
                let tipH = $(v +' .charts-zhu-col .c-right .c-tip').outerHeight();
                let opTop = firstOpTop - parentOpTop - tipH / 2;

                let parentOpLeft = $(this).parent().offset().left;
                let firstOpLeft = $(this).children('i').first().offset().left;
                let lastOpLeft = $(this).children('i').last().offset().left;
                let lastW = $(this).children('i').last().width();
                let tipW = $(v +' .charts-zhu-col .c-right .c-tip').outerWidth();
                let opLeft = firstOpLeft - parentOpLeft - tipW;
                if(opLeft < 0) {
                    opLeft = lastOpLeft - parentOpLeft + lastW;
                    opTop = lastOpTop - parentOpTop - tipH / 2;
                }
                $(v +' .charts-zhu-col .c-right .c-tip').css({
                    left: opLeft,
                    top: opTop,
                    'border-color': style.zhuColor[0].split(',')[0],
                    transition: 'left 0.2s ease-out,top 0.2s ease-out'
                });
            },function(){
                $(v +' .charts-zhu-col .c-right .c-tip').removeClass('on');
                hideTime = setTimeout(function(){
                    if(!$(v +' .charts-zhu-col .c-right .c-tip').hasClass('on')) {
                        $(v +' .charts-zhu-col .c-right .c-tip').removeClass('show');
                        $(v +' .charts-zhu-col .c-right .c-tip .c-tip-til').empty();
                        $(v +' .charts-zhu-col .c-right .c-tip .c-tip-con').empty();
                    }
                }, 400);
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
 * @params style.unit: 设置单位
 * @params style.fontPo: 文字位置,默认normal,可选:top, normal
 * @params style.fontColor: 字颜色,若前后文字区分颜色英文逗号隔开
 * @params style.fontSize: 字大小,若前后文字区分大小英文逗号隔开
 * @params style.bgColor: 设置背景颜色,渐变颜色英文标点逗号隔开
 * @params style.fontSpecial: 设置文字特效, 可选
 * @params style.fontSpecial.split: 分隔成对符号,例:'()',若只有单符号会自动生成两个相同的符号, 必须
 * @params style.fontSpecial.ifSplit: 是否显示分隔符, 默认false,可选true
 * @params style.fontSpecial.color: 文字颜色
 * @params style.fontSpecial.ifSplitColor: 分隔符是否跟随文字颜色, 默认false,可选true
 * @params style.fontSpecial.size: 文字大小
 * @params style.fontSpecial.ifSplitSize: 文分隔符是否跟随文字大小, 默认false,可选true
 * @params style.borderColor: 设置边框颜色
 * @params style.zhuColor: 设置柱颜色,渐变颜色英文标点逗号隔开
 * */
$c.charts.zhuRow = function(v, datas, style) {
    if(v && v.indexOf('#') == -1 && v.indexOf('.') == -1) v = '#' + v;
    datas = datas || [];
    style = style || {};
    style.unit = style.unit || '';
    style.fontPo = style.fontPo || 'normal';
    style.fontColor = style.fontColor || '#fff';
    style.fontSize = style.fontSize || '12px';
    style.bgColor = style.bgColor || '#013567';
    style.borderColor = style.borderColor || '#01479C';
    style.zhuColor = style.zhuColor || 'linear-gradient(to right, #024164 , #118CD2)';
    style.fontSpecial = style.fontSpecial || {};
    style.fontSpecial.color = style.fontSpecial.color || 'inherit';
    style.fontSpecial.size = style.fontSpecial.size || 'inherit';
    $(v).empty();
    if(datas.length){
        let maxNum = style.maxNum || 0;
        let str = '';
        str += '<div class="charts-zhu-row">';
        str += '	<table>';
        for(let i in datas) {
            let label = datas[i].label || '';
            let num = datas[i].num || 0;
            if(style.fontSpecial.split){
                let split = [style.fontSpecial.split.substr(0, 1), style.fontSpecial.split.substr(-1)];
                let labelNew = label;
                if(labelNew.indexOf(split[0]) != -1) labelNew = labelNew.split(split[0])[1];
                if(labelNew.indexOf(split[1]) != -1)labelNew = labelNew.split(split[1])[0];
                let splitStr = '';
                if(style.fontSpecial.ifSplit) {
                    let splitStrStyle = '';
                    if(style.fontSpecial.ifSplitColor) splitStrStyle += 'color: '+ style.fontSpecial.color +';';
                    if(style.fontSpecial.ifSplitSize) splitStrStyle += 'font-size: '+ style.fontSpecial.size +';';
                    splitStr = '<font style="'+ splitStrStyle +'">'+ split[0] +'</font>&<font style="'+ splitStrStyle +'">'+ split[1] +'</font>'
                }
                let labelReplaceBefore = split[0] + labelNew + split[1];
                let labelReplaceAfter = '';
                labelReplaceAfter += splitStr.split('&')[0] || '';
                labelReplaceAfter += '<font style="color: '+ style.fontSpecial.color +';font-size: '+ style.fontSpecial.size +';">'+ labelNew +'</font>'
                labelReplaceAfter += splitStr.split('&')[1] || '';
                label = label.replace(labelReplaceBefore, labelReplaceAfter);
            }

            if(num > maxNum) maxNum = num;
            let zhuBgStyle = '';
            let zhuStyle = '';
            let fontStyle = ''
            let bgColor = style.bgColor.split(',');
            if(bgColor.length > 1){
                zhuBgStyle += 'background: linear-gradient(to right, '+ bgColor[0] +', '+ bgColor[1] +');';
            }else{
                zhuBgStyle += 'background: '+ bgColor[0] +';';
            }
            zhuBgStyle += 'border-color: '+ style.borderColor +';';
            let zhuColor = style.zhuColor.split(',');
            if(zhuColor.length > 1){
                zhuStyle += 'background: linear-gradient(to right, '+ zhuColor[0] +', '+ zhuColor[1] +');';
            }else{
                zhuStyle += 'background: '+ zhuColor[0] +';';
            }
            let fontColor = style.fontColor.split(',');
            let fontSize = style.fontSize.split(',');
            if(style.fontPo == 'top') {
                str += '	<tr style="'+ fontStyle +'">';
                str += '		<td>';
                str += '		    <div class="c-zhu-row-top">';
                str += '		        <span class="text-more" style="color: '+ fontColor[0] +';font-size: '+ fontSize[0] +';">'+ label +'</span>';
                str += '		        <span class="text-more" style="color: '+ (fontColor[1] || fontColor[0]) +';;font-size: '+ (fontSize[1] || fontSize[0]) +';">'+ num + style.unit +'</span>';
                str += '		    </div>';
                str += '		    <b class="c-zhu-row" style="'+ zhuBgStyle +'"><i value="'+ num +'" style="'+ zhuStyle +'"></i></b>';
                str += '		</td>';
                str += '	</tr>';
            }else {
                str += '	<tr style="'+ fontStyle +'">';
                str += '		<td><span class="text-more" style="color: '+ fontColor[0] +';font-size: '+ fontSize[0] +';">'+ label +'</span></td>';
                str += '		<td><b class="c-zhu-row" style="'+ zhuBgStyle +'"><i value="'+ num +'" style="'+ zhuStyle +'"></i></b></td>';
                str += '		<td><span class="text-more" style="color: '+ (fontColor[1] || fontColor[0]) +';;font-size: '+ (fontSize[1] || fontSize[0]) +';">'+ num + style.unit +'</span></td>';
                str += '	</tr>';
            }
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
        tooltip: {
            shared: true
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