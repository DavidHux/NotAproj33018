import React from "react"
import ReactDOM from "react-dom"


export default class softwareDefine extends React.Component {
    constructor(props) {
        super(props)
    }

    
    render() {
        return (
            <div style={{overflow: "hidden", width: "100%", height: "calc(100% - 43px)"}}>
                <div id="Div1" style={{ float: "left",  width: '105%', height: "105%", overflow:"scroll" }}>
                <h3>  软件定义</h3>
                <img src="../../data/softdefine.png" />   
                </div>               
            </div>
        )
    }
}