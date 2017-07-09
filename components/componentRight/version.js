import React from "react"
import ReactDOM from "react-dom"
import echarts from 'echarts'

// const GraphLogic = () => (

// )
var data1 = require('../../data/commit1')
var data2 = require('../../data/commit2')
var data3 = require('../../data/commit3')
var data = []
data.push(data1)
data.push(data2)
data.push(data3)


export default class version extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0,
            gitGraph: null,
            nodeAt: 2,
            commits: []
        }
    }
    componentDidUpdate() {
        this.componentDidMount()
    }

    onNodeClick(param){
        var yp = param.y / 50
        if(yp == this.state.nodeAt){
            return
        }
        this.state.nodeAt = yp
        console.log('modified yp')
    }

    componentDidMount() {
        if (this.props.ID == 'version') return;
        var that = this
        this.state.num = ++this.state.num % 5
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
        if (this.state.num > 0) {
            if (this.state.num == 1) {
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
                var datas = data[this.state.num - 2]
                processJSON(datas)
            }

            function setHeader(xhr) {
                xhr.setRequestHeader("PRIVATE-TOKEN", "czyDmRjcaEjmCVCHhZuy");
            }

            function processJSON(json) {
                console.log(json)
                if (json == null)
                    return
                delete that.state.gitGraph
                that.state.gitGraph = new GitGraph({
                    template: myTemplate, // or blackarrow
                    orientation: "vertical",
                    author: "John Doe",
                    mode: "extended" // or compact if you don't want the messages
                })
                var branches = []
                var master = that.state.gitGraph.branch("master");
                for (var i = json.length - 1; i >= 0; i--) {
                    if (true) { //check json[i] type
                        that.commit(master, json[i], i)
                    }
                }

            }
        } else {
            delete that.state.gitGraph
            that.state.gitGraph = new GitGraph({
                template: myTemplate, // or blackarrow
                orientation: "vertical",
                author: "John Doe",
                mode: "extended" // or compact if you don't want the messages
            });
            var master = that.state.gitGraph.branch("master");
            that.state.gitGraph.commit("My first commit"); // 1 commit upon HEAD
            var develop = that.state.gitGraph.branch("develop"); // New branch from HEAD
            var myfeature = develop.branch("myfeature"); // New branch from develop
            develop.commit("Develop a feature - part 1");
            develop.commit("Develop a feature - part 2");

            master.commit({
                message: "Fast bugfix",
                author: "John Fixer"
            });
            myfeature.commit({
                message: "New cool feature",
                author: "John Feature"
            });

            develop.merge(master);
            myfeature.merge(master);
            master.commit({
                message: "Release of version 0.1",
                tag: "0.1",
                author: "John Releaser",
                sha1: "abcdef0",
                onClick: function (commit) {
                    console.log(that.state.nodeAt)
                    that.onNodeClick(commit)
                }
            });
        }
    }
    commit(branch, o, i) {
        var that = this
        var color = "white", clickFunc = () => {}
        if(i == that.state.nodeAt){
            color = "#34a853"
        } else {
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
            // tag: "a-super-tag",
            onClick: clickFunc
        })
    }

    render() {
        // console.log('ppp;', this.props.ID)
        if(this.props.ID == 'version'){
            return (
                <h3> select a node</h3>
            )
        }
        return (
            <div>
                <h3> {this.props.ID }</h3>
                <div id="Div1" style={{ float: "left", height: "344px", overflowY:"scroll" }}>
                <canvas id = "gitGraph" > </canvas>     
                </div>               
            </div>
        )
    }
}