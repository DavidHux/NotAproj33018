import React from "react"
import ReactDOM from "react-dom"
import SoftwareDefineStore from '../../stores/softwareDefineStore'
import versionStore from '../../stores/versionStore'


export default class softwareDefine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            define: null,
            serviceName: ''
        }
        this._onServiceChange = this._onServiceChange.bind(this)
    }
    componentDidMount(){
        // console.log('add listener')
        versionStore.addServiceChangeListener(this._onServiceChange);
        this._onServiceChange()
    }
    componentWillUnmount() {
        // versionStore.removeServiceChangeListener(this._onServiceChange)
        versionStore.removeAll()
        this.state.deploying = false
    }
    componentDidUpdate(){
    }
    _onServiceChange() {
        // console.log('on service change')
        var serviceName1 = versionStore.getCurrentServiceName()
        SoftwareDefineStore.getDefine(serviceName1, this.getDefineCallback.bind(this))        
        this.state.serviceName = serviceName1
    }

    getDefineCallback(def){
        // console.log('define', def)
        if(def == -1){
            console.log('software define not exist')
            return
        }
        this.setState({define: def})
    }

    
    render() {
        // console.log('this.state.def', this.state.define)
        if(this.state.define == null){
            return(
                <div> </div>
            )
        }
        var general = this.state.define[0].map((item, index) => {
            return(
            <div className='node-details-info-field' key={index}>
                <div className='node-details-info-field-label truncate' title='Command'> {item[0]}</div>
                <div className='node-details-info-field-value truncate' title='command value'>
                    <span>{item[1]}</span>
                </div>
            </div>
            )
        })
        var network = this.state.define[1].map((item, index) => {
            return(
                <div className='node-details-info-field' key={index}>
                    <div className='node-details-info-field-label truncate' title='Command'> {item[0]}</div>
                    <div className='node-details-info-field-value truncate' title='command value'>
                        <span>{item[1]}</span>
                    </div>
                </div>
            )
        })
        return (
            <div style={{overflow: "hidden", width: "100%", height: "calc(100% - 43px)"}}>
                <div id="Div1" style={{ float: "left",  width: '105%', height: "105%", overflow:"scroll" }}>
                {/* <h3>  软件定义</h3>
                <img src="../../data/softdefine.png" />  */}
                <h4  style={{color: '#369', fontSize: '14px', marginTop: '5px', marginLeft: '18px'}}> {this.state.serviceName}</h4> 

                <div className='node-details-content'>
                    <div className='node-details-content-section'>
                        <div className='node-details-content-section-header'>General</div> 
                        <div className='node-details-info'>
                            {general}
                        </div>
                    </div>
                    <div className='node-details-content-section'>
                        <div className='node-details-content-section-header'>Network</div> 
                        <div className='node-details-info'>
                            {network}
                        </div>
                    </div>
                </div>  
                </div>               
            </div>
        )
    }
}