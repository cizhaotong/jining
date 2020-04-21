/**
 * @action charts自定义封装
 */
alert();
var $c = {};
$c.charts = {};
/**
 * 竖向柱形图
 * @params v: 绑定元素 , 必须
 * @params datas: 数据列表,例: [{name: '柱名称', data: [1, 2, 3, ...], label: ['label1', 'label2', 'label2', ...]}, ...] , 必须
 * */
$c.charts.zhuCol = function(v, datas, style) {
    datas = datas || [];
    style = style || {};

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
    $(v).empty();
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
        $(v).html(str);
        let outerH = $(v).height();
        var zhuH = $(v + ' td').height();
        if(outerH / datas.length > zhuH) $(v + ' td').css('height', outerH / datas.length - 1);
    }
    if(maxNum > 0) {
        setTimeout(function(){
            $(v + ' .zhu-row i').each(function() {
                let width = parseInt($(this).attr('value')) / maxNum * 100;
                $(this).css('width', width + '%');
            });
        },100);
    }
}