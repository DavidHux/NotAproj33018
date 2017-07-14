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
import SoftwareDefine from './componentRight/softwareDefine'

var id = ''

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
// const ViewVersion = () => (
//     <Version/>
// )
const ViewSoftwareDefine = () => (
    <SoftwareDefine ID={id} />
)

export default class viewRight extends React.Component {
    constructor(props){
        super(props)
        // id = props.match.params.id
    }

    render() {
        var match = this.props.match
        // console.log(match.params.id)
        return (
            <div className="col-md-5 col-sm-5 col-lg-5 ">
                {/* <Header match={match}/>
                <Switch>
                    <Route path={`${match.url}/softwareDefine`} component={ViewSoftwareDefine}/>
                    <Route path={`${match.url}/measure`} component={ViewSoftwareDefine}/>                    
                    <Route exact path={match.url} >
                        <Version ID={match.params.id} />
                    </Route>
                </Switch> */}
                <div className="panel panel-default" style={{height: '100%', marginTop: "0", marginBottom: '0', paddingTop: '20px'}}>
                <Version />
                </div>
            </div>
        )
        // col-md-10 col-md-offset-2 main infoPanel
    }
}