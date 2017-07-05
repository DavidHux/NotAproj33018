import React from "react"
import ReactDOM from "react-dom"
import echarts from 'echarts'

import serviceStore from '../../stores/serviceStore'
import ServiceActions from '../../actions/ServiceActions'
var fdata = require('../../data/mydata')

var addindex = 0
var data1 = [
    [{
            "id": "广东水文",
            "group": 3,
            "color": "#d48265"
        },
        {
            "id": "福建水文",
            "group": 3,
            "color": "#d48265"
        }
    ],

    [{
            "id": "江西水文",
            "group": 3,
            "color": "#d48265"
        },
        {
            "id": "福建水文",
            "group": 3,
            "color": "#d48265"
        }

    ],
    [{
            "id": "浙江水文",
            "group": 3,
            "color": "#d48265"
        },
        {
            "id": "江西水文",
            "group": 3,
            "color": "#d48265"
        },
        {
            "id": "安徽水文",
            "group": 3,
            "color": "#d48265"
        }
    ],
    [{
            "id": "浙江水文",
            "group": 3,
            "color": "#d48265"
        },
        {
            "id": "安徽水文",
            "group": 3,
            "color": "#d48265"
        },
        {
            "id": "江苏水文",
            "group": 3,
            "color": "#d48265"
        },
        {
            "id": "上海水文",
            "group": 3,
            "color": "#d48265"
        }
    ],
    []
]
var timeo = [95000, 160000, 180000, 195000, 220000]
var data2 = [
    [{
            "source": "水文",
            "target": "广东水文",
            "value": 6
        },
        {
            "source": "水文",
            "target": "福建水文",
            "value": 6
        }
    ],
    [{
            "source": "水文",
            "target": "江西水文",
            "value": 6
        },
        {
            "source": "水文",
            "target": "福建水文",
            "value": 6
        }
    ],
    [{
            "source": "水文",
            "target": "浙江水文",
            "value": 6
        },
        {
            "source": "水文",
            "target": "安徽水文",
            "value": 6
        },
        {
            "source": "水文",
            "target": "江西水文",
            "value": 6
        },
    ],
    [{
            "source": "水文",
            "target": "浙江水文",
            "value": 6
        },
        {
            "source": "水文",
            "target": "安徽水文",
            "value": 6
        },

        {
            "source": "水文",
            "target": "江苏水文",
            "value": 6
        },
        {
            "source": "水文",
            "target": "上海水文",
            "value": 6
        }
    ],
    []
]
var myChart = null

export default class GraphLogic extends React.Component {
    constructor(props) {
        super(props)
    }
    eConsole(param) {
        console.log(param)
        if(param.dataType == 'node'){
            window.location.href = '/#/logicView/'+param.name
        }
    }

    modNode(node) {
        return {
            x: null,
            y: null,
            draggable: true,
            id: node.id,
            name: node.id,
            symbolSize: node.size | 10,
            itemStyle: {
                normal: {
                    color: node.color
                }
            }
        };
    }
    modLink(edge) {
        return {
            source: edge.source,
            target: edge.target
        };
    }

    componentDidMount() {
        var that = this
        myChart = echarts.init(document.getElementById('myChart0'));
        //npm dependences graph http://echarts.baidu.com/demo.html#graph-npm
        myChart.showLoading();
        $.getJSON('/data/asset/data/npmdepgraph.min10.json', function (json1) {
            var json = fdata
            ServiceActions.updateService(json)
            myChart.hideLoading();
            myChart.setOption({
                title: {
                    text: ''
                },
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                tooltip: {},

                series: [{
                    type: 'graph',
                    layout: 'force',
                    force: {
                        repulsion: 100
                    },
                    // progressiveThreshold: 700,
                    data: json.nodes.map(that.modNode),
                    links: json.links.map(that.modLink),
                    label: {
                        normal: {
                            show: true,
                            position: 'right'
                        }
                        // emphasis: {
                        //     show: true
                        // }
                    },
                    roam: true,
                    focusNodeAdjacency: true
                    // lineStyle: {
                    //     normal: {
                    //         width: 1,
                    //         curveness: 0.3,
                    //         opacity: 0.7
                    //     }
                    // }
                }]
            }, true);
        });
        myChart.on('click', this.eConsole)
            setTimeout(() => {
                var i = 0
                console.log(addindex)
                console.log(data1[i])
                var dataTnodes = fdata.nodes.concat(data1[i])
                var dataTlinks = fdata.links.concat(data2[i])
                console.log(dataTlinks, dataTnodes)
                myChart.setOption({
                    series: [{
                        data: dataTnodes.map(that.modNode),
                        links: dataTlinks.map(that.modLink)
                    }]
                });

            }, timeo[0])
            setTimeout(() => {
                var i = 1
                var dataTnodes = fdata.nodes.concat(data1[i])
                var dataTlinks = fdata.links.concat(data2[i])
                console.log(dataTlinks, dataTnodes)
                myChart.setOption({
                    series: [{
                        data: dataTnodes.map(that.modNode),
                        links: dataTlinks.map(that.modLink)
                    }]
                });

            }, timeo[1])
            setTimeout(() => {
                var i = 2
                var dataTnodes = fdata.nodes.concat(data1[i])
                var dataTlinks = fdata.links.concat(data2[i])
                console.log(dataTlinks, dataTnodes)
                myChart.setOption({
                    series: [{
                        data: dataTnodes.map(that.modNode),
                        links: dataTlinks.map(that.modLink)
                    }]
                });

            }, timeo[2])
            setTimeout(() => {
                var i = 3
                var dataTnodes = fdata.nodes.concat(data1[i])
                var dataTlinks = fdata.links.concat(data2[i])
                console.log(dataTlinks, dataTnodes)
                myChart.setOption({
                    series: [{
                        data: dataTnodes.map(that.modNode),
                        links: dataTlinks.map(that.modLink)
                    }]
                });

            }, timeo[3])
            setTimeout(() => {
                var i = 4
                var dataTnodes = fdata.nodes.concat(data1[i])
                var dataTlinks = fdata.links.concat(data2[i])
                console.log(dataTlinks, dataTnodes)
                myChart.setOption({
                    series: [{
                        data: dataTnodes.map(that.modNode),
                        links: dataTlinks.map(that.modLink)
                    }]
                });

            }, timeo[4])
        // setInterval(function () {

        //     if(addindex >= data1.length)
        //         return
        //     fdata.nodes.push(data1[addindex])
        //     fdata.links.push(data2[addindex])
        //     addindex++

        //     myChart.setOption({
        //         series: [{
        //             data: fdata.nodes.map(that.modNode),
        //             links: fdata.links.map(that.modLink)
        //         }]
        //     });
        // }, 5000);
    }

    render() {
        return (
             <div>
                <div id="myChart0" style={{ "width": "100%", "height": "400px"}}></div>
            </div>
        )
    }
}