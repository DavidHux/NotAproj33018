import React from "react"
import ReactDOM from "react-dom"
import echarts from 'echarts'

// const GraphLogic = () => (

// )

export default class version extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidUpdate(){
        this.componentDidMount()
    }

    componentDidMount() {
        if(this.props.ID == 'version') return;
        var that = this
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

        function setHeader(xhr) {
            xhr.setRequestHeader("PRIVATE-TOKEN", "czyDmRjcaEjmCVCHhZuy");
        }

        function processJSON(json) {
            if (json == null)
                return
            var gitgraph = new GitGraph({
                template: "metro", // or blackarrow
                orientation: "vertical",
                // author: "John Doe",
                mode: "extended" // or compact if you don't want the messages
            });
            var branches = []
            var master = gitgraph.branch("master");
            for (var i = json.length - 1; i >= 0; i--) {
                if (true) { //check json[i] type
                    that.commit(master, json[i])
                }
            }
        }
        var myTemplateConfig = {
            colors: ["#F00", "#0F0", "#00F"], // branches colors, 1 per column
            branch: {
                lineWidth: 8,
                spacingX: 50,
                showLabel: true, // display branch names on graph
            },
            commit: {
                spacingY: -80,
                dot: {
                    size: 12
                },
                message: {
                    displayAuthor: true,
                    displayBranch: false,
                    displayHash: false,
                    font: "normal 12pt Arial"
                },
                shouldDisplayTooltipsInCompactMode: false, // default = true
                tooltipHTMLFormatter: function (commit) {
                    return "" + commit.sha1 + "" + ": " + commit.message;
                }
            }
        };
        var myTemplate = new GitGraph.Template(myTemplateConfig);
        // var master = gitgraph.branch("master");
        // gitgraph.commit("My first commit"); // 1 commit upon HEAD
        // var develop = gitgraph.branch("develop"); // New branch from HEAD
        // var myfeature = develop.branch("myfeature"); // New branch from develop
        // develop.commit("Develop a feature - part 1");
        // develop.commit("Develop a feature - part 2");

        // master.commit({
        //     message: "Fast bugfix",
        //     author: "John Fixer"
        // });
        // myfeature.commit({
        //     message: "New cool feature",
        //     author: "John Feature"
        // });

        // develop.merge(master);
        // myfeature.merge(master);
        // master.commit({
        //     message: "Release of version 0.1",
        //     tag: "0.1",
        //     author: "John Releaser",
        //     sha1: "abcdef0"
        // });
    }
    commit(branch, o) {
        branch.commit({
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
        // console.log('ppp;', this.props.ID)
        if(this.props.ID == 'version'){
            return (
                <h3> select a node</h3>
            )
        }
        return (
            <div>
                <h3> {this.props.ID } git graph.</h3>
                <canvas id = "gitGraph" style = {{ width: '300px' }} > </canvas>                    
            </div>
        )
    }
}