$(function(){
    zhuCol();
    pie();
    area();
});
/**
 * 面积曲线图
 */
function area(){
    let datas = [{
        name: 'John',
        data: [3, 4, 3, 5, 4, 10, 12]
    }, {
        name: 'Jane',
        data: [1, 3, 4, 3, 3, 5, 4]
    }];
    let xLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $c.charts.areaSpline('area', datas, xLabels);
}
/**
 * 饼形图
 */
function pie() {
    let datas = [{
        name: '个体访',
        y: 75
    }, {
        name: '群体访',
        y: 10,
        sliced: true,
        selected: true
    }, {
        name: '超级访',
        y: 15
    }];
    $c.charts.pie('pie1', datas);

    let datas2 = [
        {
            name: '个体访',
            y: 45
        }, {
            name: '群体访',
            y: 10,
            sliced: true,
            selected: true
        }, {
            name: '超级访',
            y: 15
        },{
            name: '个体访',
            y: 75
        }, {
            name: '群体访',
            y: 10,
            sliced: true,
            selected: true
        }, {
            name: '超级访',
            y: 15
        }
    ];
    let style = {
        innerSize: '30%'
    }
    $c.charts.pie('pie2', datas2, style);
}
/**
 * 竖向柱形图 样例
 */
function zhuCol(){
    let datas2 = [{
        name: '样例一',
        data: [100,200,333,156,678,589, 100,200,550,233,678,685]
    },{
        name: '样例一',
        data: [678,685,156,678, 876,200,200,550,145, 333,589, 100]
    }];
    let xLabel2 = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    $c.charts.zhu('zhu3', datas2, xLabel2);
}