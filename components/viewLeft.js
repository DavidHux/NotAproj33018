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
        <li role="presentation" id='idd' ><Link to='/logicView/version'>right</Link></li>
      </ul>
    </nav>
  </header>
)
const ViewLogic = () => (
    <div>
        <GraphLogic />
        <br/>
        <ListLogic />
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
            <div className="col-md-6 col-sm-6 col-lg-6">
                <Header />
                <Redirect from='/' to='/logicView/version' />
                {/*<Redirect from='/physicsView' to='/physicsView/version' />*/}
                <Route path='/logicView' component={ViewLogic} />
                <Route path='/physicsView' component={ViewPhysics} />
            </div>
        )
    }
}
