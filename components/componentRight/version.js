import React from "react"
import ReactDOM from "react-dom"
import echarts from 'echarts'
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

function getarrindex(aaa){
    for(var i = 0;i < 3;i++){
        for(var j = 0;j< list[i].length;j++){
            if(list[i][j] == aaa){
                return i
            }
        }
    }
    return 3
}

var myTemplateConfig = {
    colors: ["#979797", "#008fb5", "#f1c109"], // branches colors, 1 per column
    branch: {
        lineWidth: 8,
        spacingX: 20,
        showLabel: false, // display branch names on graph
    },
    commit: {
        spacingY: -50,
        dot: {
            size: 12
        },
        message: {
            displayAuthor: true,
            displayBranch: true,
            displayHash: true,
            font: "normal 12pt Arial"
        },
        shouldDisplayTooltipsInCompactMode: false, // default = true
        tooltipHTMLFormatter: function (commit) {
            return "" + commit.sha1 + "" + ": " + commit.message;
        }
    }
};
var myTemplate = new GitGraph.Template(myTemplateConfig);


export default class version extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gitGraph: null,
            previousID: null,
            nodeAt: 3,
            deploying: false,
            commits: [],
            btnon: false
        }
        global.window.onmousemove = this.movetooltip.bind(this)

    }
    componentWillUpdate(){
        // if(this.state.previousID == null) return
        // var element = document.getElementById("gitGraph"+ this.state.previousID);
        // console.log('remove element', element)
        // if(element != null) element.parentNode.removeChild(element)
    }
    componentDidUpdate() {
        if (this.props.ID == 'version') return;
        // this.state.previousID = this.props.ID
        // if(this.state.gitGraph != null){
        // this.state.gitGraph.canvas.removeEventListener("commit:click", this.onNodeClick);
        // console.log(this.state.gitGraph.canvas)
        // $("#gitGraph").unbind()
        // console.log('remove listener')
        // }
        
        console.log('update')
        var that = this
        var num = getarrindex(this.props.ID)

        // if (this.state.num > 0) {
            if (num == 0) {
                $.ajax({
                    url: '/api/v4/projects/419/repository/commits',
                    type: 'GET',
                    dataType: 'json',
                    success: processJSON,
                    error: function (e) {
                        console.log(e), alert('boo!');
                    },
                    beforeSend: setHeader
                });
            } else {
                var datas = data[num - 1]
                processJSON(datas)
            }

            function setHeader(xhr) {
                xhr.setRequestHeader("PRIVATE-TOKEN", "czyDmRjcaEjmCVCHhZuy");
            }

            function processJSON(json) {
                // console.log(json)
                that.state.commits = json
                if (json == null)
                    return
                delete that.state.gitGraph
                that.state.gitGraph = new GitGraph({
                    template: myTemplate, // or blackarrow
                    orientation: "vertical-reverse",
                    author: "John Doe",
                    elementId : "gitGraph" + that.props.ID,
                    mode: "extended" // or compact if you don't want the messages
                })
                var branches = []
                var master = that.state.gitGraph.branch("master");
                for (var i = json.length - 1; i >= 0; i--) {
                    if (true) { //check json[i] type
                        that.commit(master, json[i], json.length - 1 - i)
                    }
                }
                       
                that.state.gitGraph.canvas.addEventListener("commit:mouseover", function(e){this.style.cursor = "pointer";that.showtooltip.bind(that)(e)})
                that.state.gitGraph.canvas.addEventListener("commit:mouseout", function(e){this.style.cursor = "auto";that.hidetooltip.bind(that)(e)})
                // that.state.gitGraph.canvas.addEventListener("commit:mousemove", that.movetooltip.bind(that))                
            }
        
    }
    computeIndex(hash){
        for(var i = 0;i < this.state.commits.length;i++){
            if(this.state.commits[i].short_id == hash){
                return this.state.commits.length - 1 -i
            }
        }
        return -1
    }

    onNodeClick(param) {
        var i = this.computeIndex(param.sha1)
        if(i == -1) return
        if(i == this.state.nodeAt) return

        var yp = -param.y / 50
        this.setState({nodeAt : yp, deploying: true})
        setTimeout(()=>{this.setState({ deploying : false})}, 3000)
        // this.showbtn()
        console.log('modified yp', param)
    }
    showtooltip(e){
        var i = this.computeIndex(e.data.sha1)
        if(i == -1) return
        if(i == this.state.nodeAt) return
        if(this.state.btnon == false){
            console.log('show tooltips ', e)
            this.state.btnon = true
            $("#tooltips").css("display", "block")
            if(i < this.state.nodeAt){
                $("#tooltips").text("rollback")
            } else {
                $("#tooltips").text("update")
            }
        }
    }
    hidetooltip(e){
        if(this.state.btnon == true){
            this.state.btnon = false
            console.log('hide tooltips', e)
            $("#tooltips").css("display", "none")
            // global.window.style.cursor = "auto";
        }
    }
    movetooltip(e){
        if(this.state.btnon == false) return
        var x = e.clientX,
            y = e.clientY;
        $("#tooltips").css({
            top: y - 5,
            left: x + 15
        })
        // console.log('mouse move', e)
    }

    componentDidMount() {
        // if (this.props.ID == 'version') return;   
        // console.log('mount')
    }
    commit(branch, o, i) {
        var that = this
        var tag = '',
            color = "white",
            clickFunc = () => {}
        if (i == that.state.nodeAt) {
            if(that.state.deploying == true){
                color = "#fac21b"
                tag = "Deploying"
            } else {
                color = "#34a853"
                tag = "Running"
            }
        } else {
            if(i < that.state.nodeAt){
                color = "#749f83"
            } else {
                color = "#008fb5"
            }
            clickFunc = (commit) => {
                that.onNodeClick(commit)
            }
        }
        branch.commit({
            lineWidth: 8,
            spacingX: 20,
            showLabel: true,
            dotColor: color,
            dotSize: 10,
            dotStrokeWidth: 10,
            sha1: o.short_id,
            message: o.title,
            author: o.author_name,
            tag: tag,
            onClick: clickFunc
        })
    }

    render() {
        // console.log('ppp;', this.props.ID)
        if (this.props.ID == 'version') {
            return ( 
                <h3> select a node </h3>
            )
        }
        return (
            <div>
                <h3> {this.props.ID }</h3>
                <div id="Div1" style={{ float: "left", height: "344px", overflowY:"scroll" }}>
                <canvas id = {"gitGraph" + this.props.ID}  > </canvas>     
                </div>
                <span id='tooltips'>
                    &nbsp;&nbsp;tools
                     
                </span>        
                  {/*<div  id='tooltips' className="tooltip tooltip-right" role='tooltip'>
                    <div id="aaaa" className="tooltip-inner">
                        Tooltip on the right
                        </div>
                        </div> */}
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