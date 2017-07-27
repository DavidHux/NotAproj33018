

import React from "react"
import ReactDOM from "react-dom"
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines'
import softwareDefineStore from '../../stores/softwareDefineStore'
import versionStore from '../../stores/versionStore'
import serviceStore from '../../stores/serviceStore'


export default class measure extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            serviceName: '',
            measure: null,
            cpuL: [0, 0, 0, 0, 0, 0],
            meml: [0, 0, 0, 0, 0, 0],
            cpuNow: 0,
            memNow: 0,
            cpumax: 1,
            memmax: 1073741824 * 2,
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
        // console.log('unmount', this.state.polling)   
    }
    _onServiceChange() {
        var that = this
        // console.log('service change', this.state.polling)           
        clearInterval(this.state.polling)
        var serviceName1 = versionStore.getCurrentServiceName()
        softwareDefineStore.getDefine(serviceName1, (def) => {
            if (def == -1) {
                that.setState({ serviceName: serviceName1, measure: null })
                return
            }
            if(def != null){
                that.state.memmax = def[0][3][1]
            }
            that.setState({serviceName: serviceName1, measure: 1}, that.startPolling.bind(that))
        })
    }

    startPolling(){
        var that = this
        getMetric()
        clearInterval(this.state.polling)
        this.state.polling = setInterval(getMetric, RS)
        function getMetric(){
            // console.log(that.state.serviceName, that.state.polling)
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
                that.setState({cpuL: json.cpu_array, meml: json.mem_array, cpumax: json.cpu_total, cpuNow: json.cpu, memNow: json.mem})
            }

        }
    }
    render(){
        if(this.state.measure == null){
            return(
                <div> 
                <h4  style={{color: '#369', fontSize: '14px', marginTop: '5px', marginLeft: '18px'}}> {this.state.serviceName}</h4>                     
                </div>
            )
        }
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
                    <span className="metric-value">{(this.state.cpuNow * 100).toFixed(3)}</span><span className="metric-unit">%</span></span>
                </div>
                <div className="node-details-health-item-sparkline">
                    <div title={"Last 100 seconds, "+ this.state.cpuL.length +" samples, min: " + (Math.min(...this.state.cpuL) * 100).toFixed(3) + '%, max: ' + 
                        (Math.max(...this.state.cpuL) * 100).toFixed(3)+ '%.'}>
                        <div style={{height: '100px', width: '300px', margin:'0 auto'}}>
                        <Sparklines data={this.state.cpuL} width={80} height={24} margin={5} max={1}>
                            <SparklinesLine style={{ fill: "none", stroke:"#7d7da8", strokeWidth:"0.5px"}} max={this.state.cpumax}/>
                            <SparklinesSpots />
                        </Sparklines>
                        </div>
                    </div>
                </div>
                <div className="node-details-health-item-label">CPU</div>
                <div className="node-details-health-item-label">Accumulation: {this.state.cpumax.toFixed(3)}</div>                
            </div>
            <div className="node-details-health-item">
                <div className="node-details-health-item-value"><span className="metric-formatted">
                    <span className="metric-value">{(this.state.memNow / 1024 / 1024).toFixed(1)}</span>
                    <span className="metric-unit">MB</span></span>
                </div>
                <div className="node-details-health-item-sparkline">
                    <div title={"Last 60 seconds, " + this.state.meml.length + " samples, min: " + (Math.min(...this.state.meml) / 1024 / 1024).toFixed(1) + "MB, max: " +  
                     (Math.max(...this.state.meml) / 1024 / 1024).toFixed(1) + "MB."}>
                        <div style={{height: '100px', width: '300px', margin:'0 auto'}}>
                        <Sparklines data={this.state.meml} width={80} height={24} margin={5} max={this.state.memmax}>
                            <SparklinesLine style={{ fill: "none", stroke:"#7d7da8", strokeWidth:"0.5px"}} />
                            <SparklinesSpots />
                        </Sparklines>
                        </div>
                    </div>
                </div>
                <div className="node-details-health-item-label">Memory</div>
                <div className="node-details-health-item-label">total: {this.state.memmax}MB</div>
            </div>
        </div></div>
</div>
</div>
</div>
</div>
        )
    }
}