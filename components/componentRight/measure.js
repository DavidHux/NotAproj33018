

import React from "react"
import ReactDOM from "react-dom"
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines'
import SoftwareDefineStore from '../../stores/softwareDefineStore'
import versionStore from '../../stores/versionStore'
import serviceStore from '../../stores/serviceStore'


export default class measure extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            serviceName: '',
            cpuL: [0, 0, 0, 0, 0, 0],
            meml: [0, 0, 0, 0, 0, 0],
            cpumax: 1,
            memmax: 1073741824,
            polling: null
        }
        this._onServiceChange = this._onServiceChange.bind(this)
    }
    componentDidMount(){
        versionStore.addServiceChangeListener(this._onServiceChange);
        this._onServiceChange()
    }
    componentWillUnmount() {
        versionStore.removeAll()
        clearInterval(this.state.polling)        
    }
    _onServiceChange() {
        clearInterval(this.state.polling)
        var serviceName1 = versionStore.getCurrentServiceName()
        this.setState({serviceName: serviceName1}, this.startPolling)
    }

    startPolling(){
        var that = this
        getMetric()
        this.state.polling = setInterval(getMetric, 2000)
        function getMetric(){
            var url = serviceStore.getServiceUrl(that.state.serviceName)
            if(url == -1){
                console.log('get measure failed', that.state.serviceName)
                return
            }
            $.ajax({
                url: '/metric/nap/' + url,
                type: 'GET',
                success: getData,
                error: function (e) {
                    console.log('get metric failed', e)
                }
            })

            function getData(json) {
                that.setState({cpuL: json.cpu_array, meml: json.mem_array, cpumax: json.cpu_total})
            }

        }
    }
    render(){
        return(

<div style={{overflow: "hidden", width: "100%", height: "calc(100% - 43px)"}}>
                <div id="Div1" style={{ float: "left",  width: '105%', height: "105%", overflow:"scroll" }}>
                <h4  style={{color: '#369', fontSize: '14px', marginTop: '5px', marginLeft: '18px'}}> {this.state.serviceName}</h4>

<div className="node-details-content">
<div className="node-details-content-section">

    <div className="node-details-content-section-header">Status</div>
    <div className="node-details-health" style={{"flexWrap": "nowrap", "justifyContent": "space-around"}}>
        <div className="node-details-health-wrapper">
            <div className="node-details-health-item">
                <div className="node-details-health-item-value"><span className="metric-formatted">
                    <span className="metric-value">{(this.state.cpuL[5] / this.state.cpumax * 100).toFixed(3)}</span><span className="metric-unit">%</span></span>
                </div>
                <div className="node-details-health-item-sparkline">
                    <div title={"Last 11 seconds, 6 samples, min: " + Math.min(...this.state.cpuL).toFixed(3) + ', max: ' + 
                        Math.max(...this.state.cpuL).toFixed(3)+ '.'}>
                        <div style={{height: '100px', width: '300px', margin:'0 auto'}}>
                        <Sparklines data={this.state.cpuL} limit={5} width={80} height={24} margin={5}>
                            <SparklinesLine style={{ fill: "none", stroke:"#7d7da8", strokeWidth:"0.5px"}} max={this.state.cpumax}/>
                            <SparklinesSpots />
                        </Sparklines>
                        </div>
                    </div>
                </div>
                <div className="node-details-health-item-label">CPU</div>
                <div className="node-details-health-item-label">total: {this.state.cpumax.toFixed(3)}</div>                
            </div>
            <div className="node-details-health-item">
                <div className="node-details-health-item-value"><span className="metric-formatted">
                    <span className="metric-value">{(this.state.meml[5] / 1024 / 1024).toFixed(1)}</span>
                    <span className="metric-unit">MB</span></span>
                </div>
                <div className="node-details-health-item-sparkline">
                    <div title={"Last 11 seconds, 6 samples, min: " + (Math.min(...this.state.meml) / 1024 / 1024).toFixed(1) + "MB, max: " +  
                     (Math.max(...this.state.meml) / 1024 / 1024).toFixed(1) + "MB."}>
                        <div style={{height: '100px', width: '300px', margin:'0 auto'}}>
                        <Sparklines data={this.state.meml} limit={5} width={80} height={24} margin={5} >
                            <SparklinesLine style={{ fill: "none", stroke:"#7d7da8", strokeWidth:"0.5px"}} max={this.state.memmax}/>
                            <SparklinesSpots />
                        </Sparklines>
                        </div>
                    </div>
                </div>
                <div className="node-details-health-item-label">Memory</div>
                <div className="node-details-health-item-label">total: 1024MB</div>
            </div>
        </div></div>
</div>
</div>
</div>
</div>
        )
    }
}