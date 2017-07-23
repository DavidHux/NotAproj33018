import React from "react"
import _ from 'lodash';

import serviceStore from '../../stores/serviceStore'

import '../../css/style.less';
var {fdata, data1, data2, timeo} = require('../../data/mydata')

export default class GraphPhysics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataNodes: []
        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div style={{overflow: "hidden", width: "100%", height: "calc(100% - 43px)"}}>
                <div id="Div1" style={{ float: "left",  width: '105%', height: "105%", overflow:"scroll" }}>
                    <div id="app">
                         this is physical view.
                    </div>
                </div>
            </div>
        )
    }
}