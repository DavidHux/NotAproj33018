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

var activeChange = (id) => {
    $('#idTabLogic').removeClass('active')
    $('#idTabPhysics').removeClass('active')
    $("#" + id).addClass('active')
//     $(".nav a").on("click", function(){
//    $(".nav").find(".active").removeClass("active");
//    $(this).parent().addClass("active");
// });
}

const Header = () => (
  <header>
    <nav>
      <ul className="nav nav-tabs">
        <li role="presentation" id='idTabLogic' onClick={() => activeChange('idTabLogic')} className="active"><Link to='/logicView/version'>逻辑视图</Link></li>
        <li role="presentation" id='idTabPhysics' onClick={() => activeChange('idTabPhysics')}><Link to='/physicsView/version'>物理视图</Link></li>
        {/*<li role="presentation" id='idd' ><Link to='/logicView/version'>right</Link></li>*/}
      </ul>
    </nav>
  </header>
)
const ViewLogic = () => (
    <div>
        <div className="col-md-2 col-sm-2 col-lg-2">
            <div className="panel panel-default" style={{height: '100%', marginTop: "0", marginBottom: '0'}}>
                <div className="panel-heading">
                    <p className="panel-title">服务列表</p>
                </div> 
                <div className="panel-body" style={{padding: 0}}> 
                    <ListTreeLogic />
                </div>
            </div>
        </div>
        <div className="col-md-5 col-sm-5 col-lg-5">
            <div className="panel panel-default" style={{height: '100%', marginTop: "0", marginBottom: '0'}}>     
                <div className="panel-heading">
                    <p className="panel-title">系统结构</p>
                </div> 
                <div className="panel-body" style={{padding: 0}}>        
                    <GraphLogic />
                </div>
        </div>
        </div>
    </div>
)
const ViewPhysics = () => (
    <div>
        <GraphPhysics />
        <ListPhysics />
        123
    </div>
)

export default class viewLeft extends React.Component {

    render() {
        return (
            <div >
                {/* <Header /> className="col-md-7 col-sm-7 col-lg-7" */ }
                {/* <Redirect from='/' to='/logicView/version' /> */}
                {/* <Route path='/logicView' component={ViewLogic} /> */}
                {/* <Route path='/physicsView' component={ViewPhysics} /> */}
                <ViewLogic />
            </div>
        )
    }
}
