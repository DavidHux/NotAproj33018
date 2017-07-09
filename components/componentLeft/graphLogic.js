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
// var timeo = [95000, 160000, 180000, 195000, 220000]
var timeo = [47000, 111000, 125000, 137000, 149000]

// var timeo = [5000, 10000, 15000, 20000, 25000]

export default class GraphLogic extends React.Component {
    constructor(props) {
        super(props)
    }
    eConsole(param) {
        console.log(param)
        if (param.dataType == 'node') {
            window.location.href = '/#/logicView/' + param.name
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

    startPolling() {
        var that = this
        var timeoutindex = 0
        console.log('data14', data1[4])
        setTimeout(newdata, timeo[timeoutindex])

        function newdata() {
            var dataTnodes = fdata.nodes.concat(data1[timeoutindex])
            var dataTlinks = fdata.links.concat(data2[timeoutindex])
            var newdd = {nodes: dataTnodes, links: dataTlinks}
            ServiceActions.updateService(newdd)
            console.log(dataTlinks, dataTnodes)
            myChart.setOption({
                series: [{
                    data: dataTnodes.map(that.modNode),
                    links: dataTlinks.map(that.modLink)
                }]
            })
            if (timeoutindex < 4) {
                setTimeout(newdata, timeo[++timeoutindex])
            }
        }
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
                        repulsion: 300
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
        this.startPolling()
    }

    render() {
        return (
            <div >
                <div id="myChart0" style={{ "width": "100%", "height": "400px"}}></div>
            </div>
        )
    }
}