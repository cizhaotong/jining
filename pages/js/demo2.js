$(function(){
    zhuRow();
    zhuCol();
    circle();
    map();
});
/**
 * 地图
 */
function map(){
    let datas = [{
        id: 1001,
        event: {
            label: '多久啊斯柯达哈哈',
            desc: '的卡死了电卡还是口袋里哈刘德华打蜡卡仕达'
        }
    },{
        id: 1006,
        event: {
            label: '啊打算大多',
            desc: '特人非常V型'
        }
    }];
    $c.charts.map('map', datas);
}
/**
 * 圆环进度条
 */
function circle() {
    let style = {
        color: '_1'
    }
    $c.charts.ringSpeed('circle', 60, style);
    let style2 = {
        color: '_2'
    }
    $c.charts.ringSpeed('circle2', 30, style2);
}
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
        label: '测试(3333)',
        num: 2,
    }];
    let style = {
        maxNum: 50,
    }
    $c.charts.zhuRow('#zhu0', datas, style);
    let style2 = {
        maxNum: 50,
        fontPo: 'top',
        unit: '例',
        fontColor: '#ffeb00,#00ff08',
        fontSize: '16px,12px',
        fontSpecial: {
            split: '()',
            color: 'red'
        }
    }
    $c.charts.zhuRow('#zhu00', datas, style2);
}
/**
 * 竖向柱形图 样例
 */
function zhuCol(){
    let datas = [{
        name: '样例一',
        data: [100,200,333,156,678,589, 100,200,550,34,678,685]
    }];
    let xLabel = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    $c.charts.zhuCol('zhu1', datas, xLabel);

    let datas2 = [{
        name: '样例二',
        data: [100,200,333,156,678,589, 100,200,550,233,678,685]
    },{
        name: '样例三样例三',
        data: [678,685,156,678, 876,200,200,550,145, 333,589, 100]
    }];
    let style2 = {
        maxNum: 1000,
        unit: '个',
        legend: {
            po: 'left',
            in: true,
            inPo: 'top',
        }
    };
    let xLabel2 = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    $c.charts.zhuCol('zhu2', datas2, xLabel2, style2);
}