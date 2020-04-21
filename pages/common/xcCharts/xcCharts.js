/**
 * @action charts自定义封装
 */
alert();
var $c = {};
$c.charts = {};
/**
 * 饼形图
 * @params v: 绑定元素id , 必须
 * @params datas: 数据列表,例: [{name: '个体访',y: 75}, ...] , 必须
 * @params style: 样式控制 , 可选
 * @params style.fontColor: 字颜色
 * @params style.fontSize: 字大小
 * @params style.pieColors: 扇形区域颜色,例: ['#128CD7', '#87D568', '#FF696B', '#7F77E6', '#D8A7DE', '#FBCE57'] , 可选
 * @params style.innerSize: 中间圆环百分比,默认0
 * */
$c.charts.pie = function(v, datas, style) {
    datas = datas || [];
    style = style || {};
    style.pieColors = style.pieColors || ['#128CD7', '#87D568', '#FF696B', '#7F77E6', '#D8A7DE', '#FBCE57'];
    style.innerSize = style.innerSize || 0;
    let bodyStr = '';
    let outerW = parseInt($('#' + v).width());
    let outerH = parseInt($('#' + v).height());
    if(outerW > outerH) {
        bodyStr += '<div id="'+ v +'_1" class="charts-pie-left" style="float: left;width: '+ outerH +'px;height: '+ outerH +'px;"></div>';
        bodyStr += '<div id="'+ v +'_2" class="charts-pie-right" style="float: left;width: '+ (outerW - outerH) +'px;height: '+ outerH +'px;""></div>';
    }else{
        bodyStr += '<div id="'+ v +'_1" class="charts-pie-left" style="width: '+ outerW +'px;height: '+ outerW +'px;"></div>';
        bodyStr += '<div id="'+ v +'_2" class="charts-pie-right" style="width: '+ outerW +'px;height: '+ (outerH - outerW) +'px;"></div>';
    }
    $('#' + v).html(bodyStr);
    Highcharts.chart(v + '_1', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: 'none'
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        legend: {
            enabled: false
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
    if(datas.length) {
        let rightH = $('#'+ v +'_2').height();
        let pieH = $('#'+ v +'_1 .highcharts-plot-background').height();
        let aveH = pieH / datas.length;
        let paddingTop = (rightH - pieH) / 2;
        $('#'+ v +'_2').css('padding-top', paddingTop + 'px');
        let _2Str = '';
        let fontStyle = '';
        if(style.fontColor){
            fontStyle += 'color: '+ style.fontColor +';';
        }
        if(style.fontSize){
            fontStyle += 'font-size: '+ style.fontSize +';';
        }
        for(let i in datas) {
            _2Str += '<div class="item" style="'+ fontStyle +'height: '+ aveH +'px;line-height: '+ aveH +'px;">';
            _2Str += '  <i style="background: '+ style.pieColors[i] +';"></i>';
            _2Str += '  <span>'+ datas[i].name +'：'+ datas[i].y +'</span>';
            _2Str += '</div>';
        }
        $('#'+ v +'_2').html(_2Str);
    }
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
        leftStr += '<div class="left">';
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
        rightStr += '<div class="right">';
        rightStr += '   <div class="items">';
        let rightLen = xLabel.length || 0;
        for(let i in datas) {
            if(datas[i].data && datas[i].data.length > rightLen) rightLen = datas[i].data.length;
        }
        for(let i = 0 ; i < rightLen ; i ++) {
            rightStr += '<div class="item">';
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
                if(datas[j].data && datas[j].data[i]) rightStr += '<i class="col-'+ j +'" style="'+ zhuStyle +'" value="'+ datas[j].data[i] +'"></i>';
            }
            rightStr += '</div>';
        }
        rightStr += '   </div>';
        rightStr += '   <div class="bg"><i></i><i></i><i></i><i></i><i></i></div>';
        rightStr += '</div>';
        str += rightStr;

        if(xLabel.length) {
            let bottomStr = '';
            bottomStr += '<div class="bottom">';
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
            $(v +' .charts-zhu-col .bottom span').each(function(){
                $(this).css('width', bootomAveW);
            });
        }
        if(rightLen > 0) {
            let rightAveW = parseInt(outerW / rightLen);
            $(v +' .charts-zhu-col .right .item').each(function(){
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
                $(v +' .charts-zhu-col .right .item i').each(function() {
                    let height = parseInt($(this).attr('value')) / maxNum * 100;
                    $(this).css('height', height + '%');
                });
            },100);
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
            str += '		<td><b class="zhu-row" style="'+ zhuBgStyle +'"><i value="'+ num +'" style="'+ zhuStyle +'"></i></b></td>';
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
                $(v + ' .zhu-row i').each(function() {
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