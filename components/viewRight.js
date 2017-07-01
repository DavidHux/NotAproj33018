'use strcit'

import React from "react"
import ReactDOM from "react-dom"
import { 
    HashRouter,
    Switch,
    Route,
    Link 
} from 'react-router-dom'
import Version from './componentRight/version'

const Header = ({match}) => (
  <header>
    <nav>
      <ul className="nav nav-tabs">
        <li role="presentation" className="active"><Link to={`${match.url}`}>版本</Link></li>
        <li role="presentation"><Link to={`${match.url}/softwareDefine`}>软件定义</Link></li>
        <li role="presentation"><Link to={`${match.url}/measure`}>度量</Link></li>
        <li role="presentation"><Link to='/'>
            <button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </Link>
        </li>
      </ul>
    </nav>
  </header>
)
const ViewVersion = () => (
    <Version versionID='123'/>
)
const ViewSoftwareDefine = () => (
    <div>
        123
    </div>
)

export default class viewRight extends React.Component {

    render() {
        var match = this.props.match
        console.log(match.params.id)
        return (
            <div className="col-md-6 col-sm-6 col-lg-6 ">
                <Header match={match}/>
                {/*<Switch>*/}
                    <Route exact path={match.url} component={ViewVersion}/>
                    <Route path={`${match.url}/softwareDefine`} component={ViewSoftwareDefine}/>
                    <Route path={`${match.url}/measure`} component={ViewSoftwareDefine}/>                    
                {/*</Switch>*/}
            </div>
        )
        // col-md-10 col-md-offset-2 main infoPanel
    }
}