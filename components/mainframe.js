'use strcit'

import React from "react"
import ReactDOM from "react-dom"
import { 
    Route,
    Link 
} from 'react-router-dom'

import InfoBar from './infoBar'
import ViewLeft from './viewLeft'
import ViewRight from './viewRight'

// import './less/frame.css'

// export default class mainframe extends React.Component {

//     render() {
//         return (
//             <div className="container-fluid" >
//                 <InfoBar />
//                 <div className="row">
//                     <ViewLeft />
//                     <ViewRight />
//                 </div>
//             </div>
//         )
//     }
// }
// {/* <InfoBar />
//     <div className="container ">
//         <div className="row">
//             <ViewLeft />
//             <Route path='/logicView/:id' component={ViewRight} />
//             <Route path='/physicsView/:id' component={ViewRight} />
//     // </div>
//         </div> */}  className="panel panel-primary" style={{height: '100%', marginTop: "0", marginBottom: '0'}}
const mainframe = () => (
        
        <div >
            {/* <div className="panel-heading">
                <h3 className="panel-title">iNAP</h3>
            </div> */}
            {/* <div className="panel-body"> */}
                <ViewLeft />
                <ViewRight />
            {/* </div> */}
        </div>
)
export default mainframe