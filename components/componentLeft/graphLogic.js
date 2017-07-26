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
            deploying: false
        }
    }
    componentWillUnmount(){
        em.removeAllListeners('deployNode1')
        em.removeAllListeners('deployEnd1')
    }
    mounted(){
        em.on('deployNode1', function(id){
            var that = this
            // that.state.dataNodes[index].color = "#fac21b"
            this.state.deploying = true
            // console.log(that.state.dataNodes, id, index)
            var index1 = findID(id)
            console.log('deploying ', that.state, id)
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
                setTimeout(() => {changeColor( color2, color1, color3)}, DE)
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
            // console.log('click')
            // window.location.href = 'http://localhost:8080/#/logicView/' + param.name
            // em.emit('changeservice', param.name)
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
        if(polling == true){
            return
        }
        polling = true
        var that = this
        setInterval(() => {
            serviceStore.requestServiceList(getServiceList)
            function getServiceList(json){
                if(that.checkChanged.bind(that)(json)){
                    // console.log('service changed ')
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

    startPolling2() {
        var that = this
        var timeoutindex = 0
        // console.log('data14', data1[4])
        setTimeout(newdata, timeo[timeoutindex])

        function newdata() {
            var dataTnodes = fdata.nodes.concat(data1[timeoutindex])
            var dataTlinks = fdata.links.concat(data2[timeoutindex])
            var aaa = ''
            for(var i = 0;i < data1[timeoutindex].length;i++){
                aaa += data1[timeoutindex][i].label+' '
            }
            versionStore.emitMessage('服务依赖发生变化 ' + aaa)
            that.state.dataNodes = dataTnodes
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
        this.mounted()
        var that = this
        myChart = echarts.init(document.getElementById('myChart0'));
        //npm dependences graph http://echarts.baidu.com/demo.html#graph-npm
        myChart.showLoading();
        serviceStore.requestServiceList(getServiceList)
        function getServiceList(json1) {
            var json = json1
            if(testmode == true){
                json = fdata
            }
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
                    // lineStyle: {
                    //     normal: {
                    //         width: 1,
                    //         curveness: 0.3,
                    //         opacity: 0.7
                    //     }
                    // }
                }]
            }, true);
        }
        myChart.on('click', this.eConsole.bind(this))
        if(testmode == true){
            this.startPolling2()
        } else {
            this.startPolling()
        }
    }

    render() {
        return (
            // <div style={{overflow: "hidden", width: "100%", height: "100%"}}>
                <div id="myChart0" style={{ "width": "100%", "height": 'calc(100% - 43px)' }}></div>
            //  </div> 
        )
    }
}