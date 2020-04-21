$(function(){
    zhuRow();
    zhu();
});
/**
 * 横向比例柱形图 样例
 */
function zhuRow(){
    let datas = [{
        label: '测试1',
        num: 10,
    },{
        label: '测试2',
        num: 30,
    },{
        label: '测试3',
        num: 2,
    }];
    let style = {
        maxNum: 100,
    };
    $c.charts.zhuRow('#zhu0', datas, style);
}
/**
 * 柱形图 样例
 */
function zhu(){
    let datas1 = [{
        name: '东京',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }];
    let xLabels1 =  ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
    $c.charts.zhu('zhu1', datas1, xLabels1);

    let datas2 = [{
        name: '纽约',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
    }, {
        name: '伦敦',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
    }];
    let xLabels2 =  ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
    let colors2 = ['#FF696B', '#FCCD57'];
    $c.charts.zhu('zhu2', datas2, xLabels2, colors2);
}