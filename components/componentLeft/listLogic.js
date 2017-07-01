import React from "react"
import ReactDOM from "react-dom"
import serviceStore from '../../stores/serviceStore'

export default class ListLogic extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      servicelist: []
    }
  }
  componentDidMount() {
    serviceStore.addServiceChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    serviceStore.removeServiceChangeListener(this._onChange.bind(this));
  }
  _onChange() {
    this.setState({servicelist: serviceStore.getServiceNameList()}, () => {
      console.log('service list change', this.state.servicelist)
    })
  }
  render() {
    if(this.state.servicelist != []){
      var list = this.state.servicelist.map((node, k) => {
        return (
          <button type="button" className="list-group-item" key={k}>
            <span className="navbar-right" >> &nbsp;</span>
            {node.id}</button>
        )
      })
      return(
        <div className="list-group pre-scrollable">
          {list}
        </div>
      )
    }
    return (
      <div>
    <h3> this is logic list.</h3>  
  </div>
    )
  }
}