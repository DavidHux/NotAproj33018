

import React from "react"
import ReactDOM from "react-dom"
import SoftwareDefineStore from '../../stores/softwareDefineStore'
import versionStore from '../../stores/versionStore'


export default class measure extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            serviceName: ''
        }
        this._onServiceChange = this._onServiceChange.bind(this)
    }
    componentDidMount(){
        versionStore.addServiceChangeListener(this._onServiceChange);
        this._onServiceChange()
    }
    componentWillUnmount() {
        versionStore.removeAll()
    }
    _onServiceChange() {
        var serviceName1 = versionStore.getCurrentServiceName()
        this.setState({serviceName: serviceName1})
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
                <div className="node-details-health-item-value"><span className="metric-formatted"><span className="metric-value">10.69</span><span className="metric-unit">%</span></span>
                </div>
                <div className="node-details-health-item-sparkline">
                    <div title="Last 11 seconds, 12 samples, min: 6.50%, max: 11.62%, mean: 8.63%">
                        <svg width="80" height="24">
                            <path className="sparkline" fill="none" stroke="#7d7da8" strokeWidth="0.5px" d="M2,21.490154358627812L8.902181818181818,21.648605757477476L15.811272727272728,21.81355942715731L22.720363636363636,22L29.643272727272727,21.368033773142542L36.60072727272727,21.513283155261643L43.45454545454545,21.882840662278067L50.36363636363636,21.230166099014102L57.265818181818176,21.801268599286033L64.19563636363637,21.790028373327573L71.0909090909091,20.904295737697883L78,21.102736653207717"></path>
                            <circle className="sparkcircle" cx="78" cy="21.102736653207717" fill="#46466a" fillOpacity="0.6"
                                stroke="none" r="1.75"></circle>
                        </svg>
                    </div>
                </div>
                <div className="node-details-health-item-label">CPU</div>
            </div>
            <div className="node-details-health-item">
                <div className="node-details-health-item-value"><span className="metric-formatted"><span className="metric-value">17.3</span><span className="metric-unit">GB</span></span>
                </div>
                <div className="node-details-health-item-sparkline">
                    <div title="Last 11 seconds, 12 samples, min: 17.3GB, max: 17.3GB, mean: 17.3GB">
                        <svg width="80" height="24">
                            <path className="sparkline" fill="none" stroke="#7d7da8" strokeWidth="0.5px" d="M2,21.996203297472157L8.902181818181818,21.998407751446656L15.811272727272728,22L22.720363636363636,21.999017384576128L29.643272727272727,21.997857281025954L36.60072727272727,21.999374933120418L43.45454545454545,21.999377505412102L50.36363636363636,21.99958586103863L57.265818181818176,21.99888362540848L64.19563636363637,21.99886047478331L71.0909090909091,21.998086214985964L78,21.998587811864645"></path>
                            <circle className="sparkcircle" cx="78" cy="21.998587811864645" fill="#46466a" fillOpacity="0.6"
                                stroke="none" r="1.75"></circle>
                        </svg>
                    </div>
                </div>
                <div className="node-details-health-item-label">Memory</div>
            </div>
            <div className="node-details-health-item">
                <div className="node-details-health-item-value">3.19</div>
                <div className="node-details-health-item-sparkline">
                    <div title="Last 11 seconds, 12 samples, min: 2.75, max: 3.19, mean: 2.87">
                        <svg width="80" height="24">
                            <path className="sparkline" fill="none" stroke="#7d7da8" strokeWidth="0.5px" d="M2,22L8.902181818181818,22L15.811272727272728,22L22.720363636363636,22L29.643272727272727,21.09090909090909L36.60072727272727,21.09090909090909L43.45454545454545,21.09090909090909L50.36363636363636,21.09090909090909L57.265818181818176,21.09090909090909L64.19563636363637,2L71.0909090909091,2L78,2"></path>
                            <circle className="sparkcircle" cx="78" cy="2" fill="#46466a" fillOpacity="0.6" stroke="none"
                                r="1.75"></circle>
                        </svg>
                    </div>
                </div>
                <div className="node-details-health-item-label">Load (1m)</div>
            </div>
        </div><span></span></div>
</div>
</div>

</div>
</div>
        )
    }
}