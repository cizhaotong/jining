$(function(){
    zhuRow();
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
    $c.charts.zhuRow('#zhu0', datas);
}
/**
 * 竖向柱形图 样例
 */
function zhu(){

}