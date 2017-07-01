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
const mainframe = () => (
    <div className="container ">
        <InfoBar />
        <div className="row">
            <ViewLeft />
            <Route path='/logicView/:id' component={ViewRight} />
            <Route path='/physicsView/:id' component={ViewRight} />
        </div>
    </div>
)
export default mainframe