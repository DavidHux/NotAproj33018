import React from "react"
import ReactDOM from "react-dom"
import echarts from 'echarts'

import serviceStore from '../../stores/serviceStore'
import ServiceActions from '../../actions/ServiceActions'

// const GraphLogic = () => (

// )

export default class GraphLogic extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        var myChart = echarts.init(document.getElementById('myChart0'));
        //npm dependences graph http://echarts.baidu.com/demo.html#graph-npm
        myChart.showLoading();
        $.getJSON('/data/asset/data/npmdepgraph.min10.json', function (json) {
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
                    layout: 'none',
                    // progressiveThreshold: 700,
                    data: json.nodes.map(function (node) {
                        return {
                            x: node.x,
                            y: node.y,
                            id: node.id,
                            name: node.label,
                            symbolSize: 5,
                            itemStyle: {
                                normal: {
                                    color: node.color
                                }
                            }
                        };
                    }),
                    edges: json.edges.map(function (edge) {
                        return {
                            source: edge.sourceID,
                            target: edge.targetID
                        };
                    }),
                    label: {
                        emphasis: {
                            position: 'right',
                            show: true
                        }
                    },
                    roam: true,
                    focusNodeAdjacency: true,
                    lineStyle: {
                        normal: {
                            width: 1,
                            curveness: 0.3,
                            opacity: 0.7
                        }
                    }
                }]
            }, true);
        });
    }

    render() {
        return (
            <div>
                <div id="myChart0" style={{ "width": "100%", "height": "400px"}}></div>
            </div>
        )
    }
}