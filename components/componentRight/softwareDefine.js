import React from "react"
import ReactDOM from "react-dom"
import softwareDefineStore from '../../stores/softwareDefineStore'
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
    }
    componentDidUpdate(){
    }
    _onServiceChange() {
        var that = this
        var serviceName1 = versionStore.getCurrentServiceName()
        // console.log('on service change define view', serviceName1)
        softwareDefineStore.getDefine(serviceName1, (def) => {
            // console.log('define', def)
            if (def == -1) {
                that.setState({ serviceName: serviceName1, define: null })
                console.log('software define not exist')
                return
            }
            that.setState({ serviceName: serviceName1, define: def })
        })
    }

    render() {
        // console.log('this.state.def', this.state.define)
        if(this.state.define == null){
            return(
                <div> 
                <h4  style={{color: '#369', fontSize: '14px', marginTop: '5px', marginLeft: '18px'}}> {this.state.serviceName}</h4>                     
                </div>
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