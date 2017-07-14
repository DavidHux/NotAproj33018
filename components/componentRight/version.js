import React from "react"
import ReactDOM from "react-dom"
import echarts from 'echarts'
import myTemplate from "../others/myGitGraphTemplate"
import versionStore from "../../stores/versionStore"
// import '../../css/tooltip.css'

// const GraphLogic = () => (

// )
var data1 = require('../../data/commit1')
var data2 = require('../../data/commit2')
var data3 = require('../../data/commit3')
var data = []
data.push(data1)
data.push(data2)
data.push(data3)

var list = [
    ["监控预警系统"],
    ["水文", "天气", "台风", "信息发布"],
    ["暴雨预警", "雷电预警", "暴雪预警"]
]

export default class version extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gitGraph: null,
            previousID: null,
            nodeAt: 3,
            deployingNode: -1,
            deploying: false,
            commits: [],
            btnon: false,
            deployNodeColor: "#fac21b",
            serviceName: "监控预警系统"
        }
        global.window.onmousemove = this.movetooltip.bind(this)
        em.on('changeservice', function(name){
            this.setState({serviceName: name})
        }.bind(this))

    }
    

    componentDidMount() {
        // if (this.state.serviceName == 'version') return;   
        // console.log('mount')
        this.componentDidUpdate()
    }

    componentDidUpdate() {
        // var IDlast = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        // if (IDlast == 'version') return;

        console.log('update', this.state.serviceName)
        var that = this
        versionStore.getCurrentVersion(processGraph)

        function processGraph(id) {
            versionStore.getCurrentCommits(processJSON)

            function processJSON(json) {
                // console.log("process json", json)
                that.state.commits = json
                if (json == null)
                    return
                var nodeindex = versionStore.getCurrentNodeAt()
                if (nodeindex == -1) {
                    console.log('compute node index -1', that.state.commits, id)
                }
                that.state.nodeAt = nodeindex
                delete that.state.gitGraph
                that.state.gitGraph = new GitGraph({
                    template: myTemplate.template, // or blackarrow
                    orientation: "vertical-reverse",
                    author: "John Doe",
                    elementId: "gitGraph" + that.state.serviceName,
                    mode: "extended" // or compact if you don't want the messages
                })
                var branches = []
                var master = that.state.gitGraph.branch("master");
                for (var i = json.length - 1; i >= 0; i--) {
                    if (true) { //check json[i] type
                        myTemplate.commit(master, json[i], json.length - 1 - i, that)
                    }
                }

                that.state.gitGraph.canvas.addEventListener("commit:mouseover", function (e) {
                    this.style.cursor = "pointer";
                    that.showtooltip.bind(that)(e)
                })
                that.state.gitGraph.canvas.addEventListener("commit:mouseout", function (e) {
                    this.style.cursor = "auto";
                    that.hidetooltip.bind(that)(e)
                })
            }
        }
    }
    computeIndex(hash) {
        for (var i = 0; i < this.state.commits.length; i++) {
            if (this.state.commits[i].short_id == hash) {
                return this.state.commits.length - 1 - i
            }
        }
        return -1
    }  

    onNodeClick(param) {
        var i = this.computeIndex(param.sha1)
        if (i == -1) return
        if (i == this.state.nodeAt) return
        if (i == this.state.deployingNode) return
        if (this.state.deploying == true) return

        var that = this
        
        var yp = param.y / myTemplate.config.commit.spacingY
        var id = this.state.commits[this.state.commits.length - 1 - yp].short_id
        console.log('choose version ', id, yp, i)
        versionStore.changeVersion(id)
        this.state.deployingNode = yp
        this.setState({
            deploying: true
        })
        em.emit("deployNode", this.state.serviceName)
        versionStore.emitMessage("service " + this.state.serviceName + "is deploying version: " + id)
        // setTimeout(()=>{this.setState({ deploying : false, nodeAt : yp})}, 3000)
        setTimeout(getResponse, 8000)

        function getResponse() {
            $.ajax({
                type: 'GET',
                url: '/v2/apps/nap/ityphoon',
                dataType: 'json',
                success: processData1,
                error: function (e) {
                    console.log('get current version failed', e)
                }
                // beforeSend: setHeader
            });

            function processData1(json) {
                var image = json.app.container.docker.image
                var id = image.substring(image.lastIndexOf(":") + 1)
                // console.log("proccess callback", that.state.commits[that.state.commits.length - 1 - that.state.deployingNode].short_id, id)
                if (that.state.commits[that.state.commits.length - 1 - that.state.deployingNode].short_id == id) {
                    if (json.app.deployments.length == 0) {
                        that.setState({
                            deploying: false,
                            nodeAt: that.state.deployingNode
                        })
                        em.emit('deployEnd')
                        versionStore.emitMessage("service " + that.state.serviceName + "deployment finished.")
                    } else {
                        setTimeout(getResponse, 3000)
                    }
                } else {
                    console.log('change version wrong', json)
                }
            }
        }
        setTimeout(() => {
            depNodeColor("#979797", "#fac21b")
        }, 500)

        function depNodeColor(color1, color2) {
            that.setState({
                deployNodeColor: color1
            })
            if (that.state.deploying == true) {
                // console.log("dep node color", color1, color2)
                setTimeout(() => {
                    depNodeColor(color2, color1)
                }, 500)
            }
        }
    }
    componentWillUnmount() {
        this.state.deploying = false
    }
    showtooltip(e) {
        var i = this.computeIndex(e.data.sha1)
        if (i == -1) return
        if (i == this.state.nodeAt) return
        if (this.state.btnon == false) {
            // console.log('show tooltips ', e)
            this.state.btnon = true
            $(".bs-example-tooltip .tooltip").css("display", "block")
            if (i < this.state.nodeAt) {
                $(".tooltip-inner").text("click to roll back")
            } else {
                $(".tooltip-inner").text("click to update")
            }
        }
    }
    hidetooltip(e) {
        if (this.state.btnon == true) {
            this.state.btnon = false
            // console.log('hide tooltips', e)
            $(".bs-example-tooltip .tooltip").css("display", "none")
            // global.window.style.cursor = "auto";
        }
    }
    movetooltip(e) {
        if (this.state.btnon == false) return
        var x = e.clientX,
            y = e.clientY;
        $(".bs-example-tooltip .tooltip").css({
            top: y - 5,
            left: x + 15
        })
        // console.log('mouse move', e)
    }

    render() {
        // console.log('ppp;', this.state.serviceName)
        // if (this.state.serviceName == 'version') {
        //     return ( 
        //         <h3> select a node </h3>
        //     )
        // }
        // var index = window.location.href.lastIndexOf('/')
        // if(index != -1){
        //     var a = window.location.href.substring(index + 1)
        // }
        // console.log('windeow', a, window.location.href)
        // if(a == 'version' || a.length == 0){
        //     a = "监控预警系统"
        // }
        // this.state.serviceName = a
        return (
            <div>
                 <h4 style={{color: '#369', fontSize: '14px', marginBottom: '-5px', marginTop: '0', marginLeft: '18px'}}> &nbsp;&nbsp;&nbsp;  {'    ' + this.state.serviceName}</h4> 
                 <div>
                <div style={{overflow: "hidden", width: "100%", height: "100%"}}>
                <div id="Div1" style={{ float: "left",  width: '105%', height: "105%", overflow:"scroll" }}>
                    <canvas id = {"gitGraph" + this.state.serviceName}  style={{marginTop: "-30px"}}> </canvas>     
                </div>
                </div>
                </div>

                <div id='tooltips' className="bs-example bs-example-tooltip">
                    <div className="tooltip right" role="tooltip">
                        <div className="tooltip-arrow"></div>
                        <div className="tooltip-inner">
                            Tooltip on the right
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// } else {
//     delete that.state.gitGraph
//     that.state.gitGraph = new GitGraph({
//         template: myTemplate, // or blackarrow
//         orientation: "vertical-reverse",
//         author: "John Doe",
//         mode: "extended" // or compact if you don't want the messages
//     });
//     var master = that.state.gitGraph.branch("master");
//     that.state.gitGraph.commit("My first commit"); // 1 commit upon HEAD
//     var develop = that.state.gitGraph.branch("develop"); // New branch from HEAD
//     var myfeature = develop.branch("myfeature"); // New branch from develop
//     develop.commit("Develop a feature - part 1");
//     develop.commit("Develop a feature - part 2");

//     master.commit({
//         message: "Fast bugfix",
//         author: "John Fixer"
//     });
//     myfeature.commit({
//         message: "New cool feature",
//         author: "John Feature"
//     });

//     develop.merge(master);
//     myfeature.merge(master);
//     master.commit({
//         message: "Release of version 0.1",
//         tag: "0.1",
//         author: "John Releaser",
//         sha1: "abcdef0"//,
//         // onClick: function (commit) {
//         //     console.log(that.state.nodeAt)
//         //     that.onNodeClick(commit)
//         // }
//     });
//     // that.state.gitGraph.canvas.addEventListener("commit:mouseover", function (event) {
//     //     console.log("You're over a commit.", "Here is a bunch of data ->", event);
//     // });
// }