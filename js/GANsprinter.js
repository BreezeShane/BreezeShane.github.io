// var popContent = '<div id="chart-print" style="width:100%;height:800px;"></div>' +
//     '<script src="https://cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js"></script>' +
//     '<script src="https://cdn.jsdelivr.net/npm/echarts-gl@1.1.1/dist/echarts-gl.min.js"></script>' +
//     '<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>';
// document.append(popContent);
var container = document.createElement('div');
var echarts_cdn = document.createElement('script');
var echarts_gl_cdn = document.createElement('script');
var jquery_cdn = document.createElement('script');

container.id = "chart-print";
container.style = "width:100%;height:800px;";
echarts_cdn.src = "https://cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js";
echarts_gl_cdn.src = "https://cdn.jsdelivr.net/npm/echarts-gl@1.1.1/dist/echarts-gl.min.js";
jquery_cdn.src = "https://code.jquery.com/jquery-3.6.0.min.js";
jquery_cdn.integrity = "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=";
jquery_cdn.crossOrigin = "anonymous"

var chartDom = document.getElementById('chart-print');
var myChart = echarts.init(chartDom);
var option;

var light_color = '#758a99';
var dark_color = '#758a99';
myChart.showLoading();

var print_echarts = function() {
    var page_status = document.body.attributes.class.value.search(/theme-light/) === 0 ? 'light' : 'dark';
    $.get('/json/' + 'GANs.json', function(data) {
        myChart.hideLoading();
        myChart.setOption(option = {
            backgroundColor: page_status === 'light' ? light_color : dark_color,
            textStyle: {
                color: '#fff',
                fontSize: 20
            },
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [{
                type: 'tree',
                data: [data],
                top: '0%',
                bottom: '0%',
                layout: 'radial',
                symbol: 'emptyCircle',
                symbolSize: 7,
                initialTreeDepth: 2,
                animationDurationUpdate: 750,
                emphasis: {
                    focus: 'descendant'
                }
            }]
        });
        myChart.on('dblclick', function(data) {
            //console.log(data);
            //console.log(data.data);
            //console.log(data.data.link);
            if (data.data.link != undefined) {
                window.open(data.data.link);
            }
        });
    });
}
print_echarts();