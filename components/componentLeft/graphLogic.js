import React from "react"
import echarts from 'echarts'

import serviceStore from '../../stores/serviceStore'
import ServiceActions from '../../actions/ServiceActions'
import versionStore from '../../stores/versionStore'
import VersionActions from '../../actions/VersionActions'
var {fdata, data1, data2, timeo} = require('../../data/mydata')

var testmode = false
var myChart = null

export default class GraphLogic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataNodes: [],
            dataLinks: [],
            deploying: false,
            interval: null,
            timeoutDeploy: null
        }
    }
    componentDidMount() {
        this.mounted()
        this.drawGraph()
        this.startPolling()
    }
    componentWillUnmount(){
        em.removeAllListeners('deployNode1')
        em.removeAllListeners('deployEnd1')
        clearInterval(this.state.interval)
        clearTimeout(this.state.timeoutDeploy)
    }
    mounted(){
        em.on('deployNode1', function(id){
            var that = this
            // that.state.dataNodes[index].color = "#fac21b"
            this.state.deploying = true
            var index1 = findID(id)
            // console.log(that.state.dataNodes, id, index1)
            // console.log('deploying ', that.state, id)
            changeColor("#fac21b", that.state.dataNodes[index1].color, that.state.dataNodes[index1].color)

            function changeColor( color1, color2, color3){
                var index = findID(id)
                that.state.dataNodes[index].color = color1
                if(that.state.deploying == false) that.state.dataNodes[index].color = color3
                myChart.setOption({
                    series: [{
                        data: that.state.dataNodes.map(that.modNode),
                    }]
                })
                if(that.state.deploying == false) return
                that.state.timeoutDeploy = setTimeout(() => {changeColor( color2, color1, color3)}, DE)
            }
            function findID(id){
                for(var i = 0;i < that.state.dataNodes.length;i++){
                    if(that.state.dataNodes[i].label == id){
                        return i
                    }
                }
                console.log("id not find: " + id)
                return -1
            }
        }.bind(this))
        em.on('deployEnd1', function(){
            this.state.deploying = false
        }.bind(this))
    }
    eConsole(param) {
        if(this.state.deploying == true){
            console.log('a service is deploying...')
            return
        }
        // console.log('ecole', param)
        if (param.dataType == 'node') {
            VersionActions.updateService(param.name)
        }
    }

    modNode(node) {
        return {
            x: null,
            y: null,
            draggable: true,
            id: node.label,
            name: node.label,
            symbolSize: (node.size | 10) * 1.5,
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
    checkChanged(json){
        if(json.nodes.length == this.state.dataNodes.length && json.links.length == this.state.dataLinks.length){
            l1:for(var i = 0;i < json.nodes.length;i++){
                for(var j = 0;j < this.state.dataNodes.length;j++){
                    if(this.state.dataNodes[j].label == json.nodes[i].label)
                        continue l1
                }
                return true
            }
            l2:for(var i = 0;i < json.links.length;i++){
                for(var j = 0;j < this.state.dataLinks.length;j++){
                    if(this.state.dataLinks[j].source == json.links[i].source && this.state.dataLinks[j].target == json.links[i].target)
                        continue l2
                }
                return true
            }
            return false
        }
        // console.log('length :', json, this.state.dataLinks, this.state.dataNodes)
        return true
    }

    startPolling() {
        var that = this
        this.state.interval = setInterval(() => {
            serviceStore.requestServiceList(getServiceList)
            function getServiceList(json){
                if(that.checkChanged.bind(that)(json)){
                    // console.log('service changed ', json)
                    that.state.dataNodes = json.nodes
                    that.state.dataLinks = json.links
                    myChart.setOption({
                        series: [{
                            data: json.nodes.map(that.modNode),
                            links: json.links.map(that.modLink)
                        }]
                    })
                }
            }
        }, RS)
    }

    drawGraph(){
        var that = this
        myChart = echarts.init(document.getElementById('myChart0'));
        myChart.showLoading();
        serviceStore.requestServiceList(getServiceList)
        function getServiceList(json1) {
            var json = json1
            that.state.dataNodes = json.nodes     
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
                        repulsion: 500
                    },
                    // progressiveThreshold: 700,
                    data: json.nodes.map(that.modNode),
                    links: json.links.map(that.modLink),
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            textStyle: {
                                fontSize: 14,
                                fontWeight: 'bold'
                                // fontFamily: '宋体'
                            }
                        }
                    },
                    roam: true,
                    focusNodeAdjacency: true
                }]
            }, true);
        }
        myChart.on('click', this.eConsole.bind(this))
    }

    render() {
        return (
            // <div style={{overflow: "hidden", width: "100%", height: "100%"}}>
                <div id="myChart0" style={{ "width": "100%", "height": 'calc(100% - 43px)' }}></div>
            //  </div> 
        )
    }
}