'use strcit'

import React from "react"
import ReactDOM from "react-dom"
import { 
    HashRouter,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom'

import GraphLogic from './componentLeft/graphLogic'
import GraphLogicD3 from './componentLeft/graphLogicD3'
import GraphPhysics from './componentLeft/graphPhysics'
import ListLogic from './componentLeft/listLogic'
import ListPhysics from './componentLeft/listPhysics'
import ListTreeLogic from './componentLeft/listTreeLogic'

import ViewRight from './viewRight'




var onlylogical = false



export default class viewLeft extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tab:'tabLogicalView'
        }   
    }
    activeChange(id){
        $('#tabLogicalView').removeClass('active')
        $('#tabPhysicalView').removeClass('active')
        $("#" + id).addClass('active')
        this.setState({tab: id})
    }


    render() {
        var x
        if(!onlylogical){
            x = this.state.tab == 'tabLogicalView' ? <GraphLogic /> : <GraphPhysics />
        } else {
            x = <GraphLogic />
        }
        
        return (
        <div>
            <div className="col-md-2 col-sm-2 col-lg-2" style={{padding: "0 5px"}}>
                <div className="panel panel-default" style={{height: '100%', marginTop: "0", marginBottom: '0'}}>
                    <div className="panel-heading" style={{background: '#fff'}}>
                        <p className="panel-title">服务列表</p>
                    </div> 
                    <div className="panel-body" style={{padding: 0}}> 
                        <ListTreeLogic />
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6" style={{padding: "0 5px"}}>
                <div className="panel panel-default" style={{height: '100%', marginTop: "0", marginBottom: '0'}}>     
                    <ul className="nav nav-tabs" style={{marginLeft: '-1px', width: 'calc(100% + 2px)', height:'42px'}}>
                        <li id='tabLogicalView' onClick={()=>{this.activeChange.bind(this)('tabLogicalView')}} className="active"><a href="#" style={{fontSize: '16px'}}>逻辑视图</a></li>
                        <li id='tabPhysicalView' onClick={()=>{this.activeChange.bind(this)('tabPhysicalView')}}><a href="#" style={{fontSize: '16px'}}>物理视图</a></li>
                    </ul>
                    {x}
                </div>
            </div>
        </div>
        )
    }
}
