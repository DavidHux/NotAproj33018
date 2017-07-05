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
            num : 0
        }
    }
    componentDidUpdate(){
        this.componentDidMount()
    }

    componentDidMount() {
        if(this.props.ID == 'version') return;
        var that = this
        this.state.num = ++this.state.num % 5
        console.log('state', this.state.num)
        if(this.state.num > 0){
            if(this.state.num == 1){
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
                console.log(datas)
                processJSON(datas)
            }

        function setHeader(xhr) {
            xhr.setRequestHeader("PRIVATE-TOKEN", "czyDmRjcaEjmCVCHhZuy");
        }

        function processJSON(json) {
            console.log(json)
            if (json == null)
                return
            var gitgraph = new GitGraph({
            template: {
            colors: ["#979797", "#008fb5", "#f1c109"], // branches colors, 1 per column
            branch: {
                lineWidth: 8,
                spacingX: 20,
                showLabel: true, // display branch names on graph
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
            }, // or blackarrow
            orientation: "vertical",
            author: "John Doe",
            mode: "extended" // or compact if you don't want the messages
        });
            // new GitGraph({
                // template: myTemplate, // or blackarrow
                // orientation: "vertical",
                // // author: "John Doe",
                // mode: "extended" // or compact if you don't want the messages
            // });
            var branches = []
            var master = gitgraph.branch("master");
            for (var i = json.length - 1; i >= 0; i--) {
                if (true) { //check json[i] type
                    that.commit(master, json[i])
                }
            }
        
        var myTemplateConfig = {
            colors: ["#979797", "#008fb5", "#f1c109"], // branches colors, 1 per column
            branch: {
                lineWidth: 8,
                spacingX: 20,
                showLabel: true, // display branch names on graph
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
        }
        }else {
        var gitgraph = new GitGraph({
            template: {
            colors: ["#979797", "#008fb5", "#f1c109"], // branches colors, 1 per column
            branch: {
                lineWidth: 8,
                spacingX: 20,
                showLabel: true, // display branch names on graph
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
            }, // or blackarrow
            orientation: "vertical",
            author: "John Doe",
            mode: "extended" // or compact if you don't want the messages
        });
        var master = gitgraph.branch("master");
        gitgraph.commit("My first commit"); // 1 commit upon HEAD
        var develop = gitgraph.branch("develop"); // New branch from HEAD
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
            sha1: "abcdef0"
        });
        }
    }
    commit(branch, o) {
        branch.commit({
            lineWidth: 8,
            spacingX: 20,
            showLabel: true,
            dotColor: "white",
            dotSize: 10,
            dotStrokeWidth: 10,
            sha1: o.short_id,
            message: o.title,
            author: o.author_name,
            // tag: "a-super-tag",
            onClick: function (commit) {
                console.log("Oh, you clicked my commit?!", commit);
            }
        })
    }

    render() {
        console.log('ppp;', this.props.ID)
        if(this.props.ID == 'version'){
            return (
                <h3> select a node</h3>
            )
        }
        return (
            <div>
                <h3> {this.props.ID }</h3>
                <canvas id = "gitGraph" style = {{ width: '300px' }} > </canvas>                    
            </div>
        )
    }
}