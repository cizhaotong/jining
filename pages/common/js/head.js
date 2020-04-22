var baseUrl = ".";
var v = new Date().getTime();
document.writeln('<meta http-equiv="cache-control" content="no-cache, no-store">');
document.writeln('<meta http-equiv="pragma" content="no-cache">');
document.writeln('<meta http-equiv="expires" content="0">');
document.writeln('<meta http-equiv="X-UA-Compatible" content="IE=edge">');
document.writeln('<link type="text/css" rel="stylesheet" media="all" href="'+ baseUrl +'/common/css/common.css?v='+ v +'" />');
document.writeln('<script type="text/javascript" src="'+ baseUrl +'/common/js/jquery-1.11.3.min.js"></script>');
document.writeln('<script type="text/javascript" src="'+ baseUrl +'/common/js/store.js"></script>');
document.writeln('<script type="text/javascript" src="'+ baseUrl +'/common/highchats/highcharts.js"></script>');
document.writeln('<link type="text/css" rel="stylesheet" media="all" href="'+ baseUrl +'/common/xcCharts/xcCharts.css?v='+ v +'" />');
document.writeln('<script type="text/javascript" src="'+ baseUrl +'/common/xcCharts/circleChart.min.js?v='+ v +'"></script>');
document.writeln('<script type="text/javascript" src="'+ baseUrl +'/common/xcCharts/xcCharts.js?v='+ v +'"></script>');
document.writeln('<script type="text/javascript" src="'+ baseUrl +'/common/json/json.js?v='+ v +'"></script>');
document.writeln('<script type="text/javascript" src="'+ baseUrl +'/common/js/common.js?v='+ v +'"></script>');

/**
 * 加载js
 */
function loadJS(url){
	document.writeln('<script type="text/javascript" src="'+ url +'?v='+ v +'"></script>');
}
/**
 * 加载css
 */
function loadCSS(url){
	document.writeln('<link type="text/css" rel="stylesheet" media="all" href="'+ url +'?v='+ v +'" />');
}
