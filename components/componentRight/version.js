import React from "react"
import ReactDOM from "react-dom"
import echarts from 'echarts'

// const GraphLogic = () => (

// )

export default class version extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        var gitgraph = new GitGraph({
            template: "metro", // or blackarrow
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

    render() {
        return ( 
            <canvas id = "gitGraph" style={{width: '300px'}}> </canvas>
        )
    }
}