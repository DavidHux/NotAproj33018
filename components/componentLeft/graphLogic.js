import React from "react"
import ReactDOM from "react-dom"
import echarts from 'echarts'

import serviceStore from '../../stores/serviceStore'
import ServiceActions from '../../actions/ServiceActions'
var fdata = require('../../data/forcedata')
// var ecConfig = echarts.config.EVENT

// const GraphLogic = () => (

// )

export default class GraphLogic extends React.Component {
    constructor(props) {
        super(props)
    }
    eConsole(param) {
        console.log(param)
    }

    componentDidMount() {
        var myChart = echarts.init(document.getElementById('myChart0'));
        //npm dependences graph http://echarts.baidu.com/demo.html#graph-npm
        myChart.showLoading();
        $.getJSON('/data/asset/data/npmdepgraph.min10.json', function (json1) {
            var json = fdata
            ServiceActions.updateService(json)
            myChart.hideLoading();
            myChart.setOption({
                title: {
                    text: 'NPM Dependencies'
                },
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [{
                    type: 'graph',
                    layout: 'force',
                    force: {
                    repulsion: 100
                    },
                    // progressiveThreshold: 700,
                    data: json.nodes.map(function (node) {
                        return {
                            x: null,
                            y: null,
                            draggable: true,
                            id: node.id,
                            name: node.id,
                            symbolSize: 10,
                            itemStyle: {
                                normal: {
                                    color: node.color
                                }
                            }
                        }; 
                    }),
                    links: json.links.map(function (edge) {
                        return {
                            source: edge.source,
                            target: edge.target
                        };
                    }),
                    label: {
                        emphasis: {
                            position: 'right',
                            show: true
                        }
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
    }

    render() {
        return (
            <div>
                <div id="myChart0" style={{ "width": "100%", "height": "400px"}}></div>
            </div>
        )
    }
}

// option = {
//         legend: [{
//             // selectedMode: 'single',
//             data: categories.map(function (a) {
//                 return a.name;
//             })
//         }],
//         animation: false,
//         series : [
//             {
//                 name: 'Les Miserables',
//                 type: 'graph',
//                 layout: 'force',
//                 data: graph.nodes,
//                 links: graph.links,
//                 categories: categories,
//                 roam: true,
//                 label: {
//                     normal: {
//                         position: 'right'
//                     }
//                 },
//                 force: {
//                     repulsion: 100
//                 }
//             }
//         ]
//     };