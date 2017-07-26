import React from "react"
import ReactDOM from "react-dom"
import echarts from 'echarts'
import myTemplate from "../others/myGitGraphTemplate"
import versionStore from "../../stores/versionStore"
import serviceStore from "../../stores/serviceStore"
// import '../../css/tooltip.css'

// const GraphLogic = () => (

// )

var data3 = require('../../data/commit3')

var myChart = null

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
            serviceName: "监控预警系统",
            lastName: 'last'
        }
        global.window.onmousemove = this.movetooltip.bind(this)
        this.firstgGetService = this.firstgGetService.bind(this)
        this._onVersionServiceChange = this._onVersionServiceChange.bind(this)
        // em.on('firstgetservice', function(){
        //     console.log('get service')
        //     this.setState({ serviceName: versionStore.getCurrentServiceName()})
        // }.bind(this))

    }
    firstgGetService(){
        // console.log('get service')
        this.setState({ serviceName: versionStore.getCurrentServiceName()})
    }
    

    componentDidMount() {
        em.on('firstgetservice', this.firstgGetService)
        // if (this.state.serviceName == 'version') return;   
        // console.log('mount')
        myChart = echarts.init(document.getElementById('myChart1'));
        myChart.showLoading();
        versionStore.addServiceChangeListener(this._onVersionServiceChange);
        // this.componentDidUpdate()
        this._onVersionServiceChange()
    }

    componentWillUnmount() {
        em.removeListener('firstgetservice', this.firstgGetService)        
        // versionStore.removeServiceChangeListener(this._onVersionServiceChange)
        versionStore.removeAll()
        this.state.deploying = false
    }
    _onVersionServiceChange() {
        // this.state.lastServiceList = this.state.servicelist
        // console.log('version service change')
        this.setState({ serviceName: versionStore.getCurrentServiceName()})
    }
    componentDidUpdate() {
        // var IDlast = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        // if (IDlast == 'version') return;
        
        if(this.state.serviceName != this.state.lastName){
            $('#notexist').css('display', 'none')            
            $("#serviceGit").css('display', 'none')
            $('#show').css('display', 'block')
        }

        // console.log('update', this.state.serviceName)
        var that = this
                // console.log(that.state.serviceName, that.state.lastName)
        
        versionStore.getCurrentVersion(processGraph)

        function processGraph(id) {
            // console.log('get current version call back:', id)
         
            if(id == -1 || id == -2){
                // $('#servicename').text('App '+ that.state.serviceName + ' does not exist')
                // console.log('App '+ that.state.serviceName + ' does not exist')
                if (that.state.serviceName != that.state.lastName) {
                    // $("#gitGraph").css('display', 'none')
                    $('#show').css('display', 'none')
                    $('#notexist').css('display', 'block')
                    that.state.lastName = 'last'
                }
                return
            }
            versionStore.getCurrentCommits(ppp)
            function ppp(json){
                // console.log("process json", json)
                if(json == -1){
                    $('#show').css('display', 'none')
                    $('#notexist').css('display', 'block')
                    that.state.lastName = 'last'
                    return
                }
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
                    // elementId: "gitGraph" + that.state.serviceName,
                    mode: "extended" // or compact if you don't want the messages
                })
                var istop = that.state.serviceName == '监控预警系统' ? 2 : 0
                var master = that.state.gitGraph.branch("master");
                for (var i = json.length - 1; i >= istop; i--) {
                    if (true) { //check json[i] type
                        myTemplate.commit(master, json[i], json.length - 1 - i, that)
                    }
                }
                //new branch
                if(that.state.serviceName == '监控预警系统'){
                    var develop = that.state.gitGraph.branch("dev"); // New branch from HEAD
                    myTemplate.commit(develop, data3[i], data3.length - 1 - i, that)
                    myTemplate.commit(develop, data3[1], data3.length - 1 - 1, that)                    
                    myTemplate.commit(master, json[1], json.length - 1 - 1, that)
                    myTemplate.commit(develop, data3[0], data3.length - 1 - 0, that)                    
                    myTemplate.merge(master, develop, json[0], json.length - 1, that)
                }

                if (that.state.serviceName != that.state.lastName) {
                    $('#show').css('display', 'none')
                    $("#serviceGit").css('display', 'block')
                    that.state.lastName = that.state.serviceName
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
        if (this.state.serviceName == '监控预警系统') {
            if (yp == this.state.commits.length) {
                yp -= 2
            } else if (yp == this.state.commits.length + 2) {
                yp -= 3
            }
        }
        // console.log(yp)
        // return
        var id = this.state.commits[this.state.commits.length - 1 - yp].short_id
        // console.log('choose version ', id, yp, i)
        versionStore.changeVersion(id)
        this.state.deployingNode = yp
        this.setState({
            deploying: true
        })
        em.emit("deployNode", this.state.serviceName)
        em.emit("deployNode1", this.state.serviceName)
        versionStore.emitMessage(this.state.serviceName + "服务开始部署版本：" + id)
        // setTimeout(()=>{this.setState({ deploying : false, nodeAt : yp})}, 3000)
        var sss = that.state.serviceName + ''
        // console.log('sss',sss)
        setTimeout(()=>{getResponse(sss)}, 10000)

        function getResponse(serviceName) {
            // console.log('check service, servicename', serviceName)
            var url = serviceStore.getServiceUrl(serviceName)
            $.ajax({
                type: 'GET',
                url: '/v2/apps/nap/' + url,
                dataType: 'json',
                success: processData1,
                error: function (e) {
                    console.log('get current version failed', e)
                }
                // beforeSend: setHeader
            });

            function processData1(json) {
                // console.log(json)
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
                        em.emit('deployEnd1')
                        versionStore.emitMessage(that.state.serviceName  + "服务版本部署完毕")
                    } else {
                        setTimeout(()=>{getResponse(serviceName)}, RS)
                    }
                } else {
                    console.log('change version wrong', json)
                }
            }
        }
        setTimeout(() => {
            depNodeColor("#979797", "#fac21b")
        }, DE)

        function depNodeColor(color1, color2) {
            that.setState({
                deployNodeColor: color1
            })
            if (that.state.deploying == true) {
                // console.log("dep node color", color1, color2)
                setTimeout(() => {
                    depNodeColor(color2, color1)
                }, DE)
            }
        }
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
                $(".tooltip-inner").text("部署旧版本")
            } else {
                $(".tooltip-inner").text("部署新版本")
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
        // calc -25px : h4 height and html, body padding bottom both 5px title height 43px h4 margin top 5px
        return (
            <div>
                 <h4  style={{color: '#369', fontSize: '14px', marginTop: '5px', marginLeft: '18px'}}> {this.state.serviceName}</h4> 
                 <h4  id='notexist' style={{color: '#c33', fontSize: '14px', marginTop: '0', marginLeft: '18px', display: 'none'}}> 该服务不存在</h4>
                <div id='show'>
                <div id="myChart1" style={{ "width": "100%", "height": "300px"}}></div>
                </div>
                 <div>
                <div id='serviceGit' style={{overflow: "hidden", width: "100%", height: "calc(100% - 73px)" }}>
                 <div id="Div1" style={{ float: "left",  width: '105%', height: "105%", overflow:"scroll" }}> 
                    <canvas id = "gitGraph"  style={{marginTop: "-50px"}}> </canvas>     
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