import React from "react"
import ReactDOM from "react-dom"
import serviceStore from '../../stores/serviceStore'

export default class ListLogic extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      servicelist: [],
      lastServiceList: []
    }
  }
  componentDidMount() {
    serviceStore.addServiceChangeListener(this._onChange.bind(this));
    $.fn.extend({
	treeview:	function() {
		return this.each(function() {
			// Initialize the top levels;
			var tree = $(this);
			
			tree.addClass('treeview-tree');
			tree.find('li').each(function() {
				var stick = $(this);
			});
			tree.find('li').has("ul").each(function () {
				var branch = $(this); //li with children ul
				
				branch.prepend("<i class='tree-indicator glyphicon glyphicon-chevron-right'></i>");
				branch.addClass('tree-branch');
				branch.on('click', function (e) {
					if (this == e.target) {
						var icon = $(this).children('i:first');
						
						icon.toggleClass("glyphicon-chevron-down glyphicon-chevron-right");
						$(this).children().children().toggle();
					}
				})
				branch.children().children().toggle();
				
				branch.children('.tree-indicator, button, a').click(function(e) {
					branch.click();
					
					e.preventDefault();
				});
			});
		});
	            }
    });

    $('.treeview').each(function () {
		var tree = $(this);
		tree.treeview();
	})
  }

componentWillUnmount() {
    serviceStore.removeServiceChangeListener(this._onChange.bind(this));
}
_onChange() {
    this.state.lastServiceList = this.state.servicelist
    this.setState({servicelist: serviceStore.getServiceNameList()})
}
getLastIndex(id){
    // console.log(id, this.state.lastServiceList)
    if(this.state.lastServiceList.length == 0) return 0
    for(var i = 0;i < this.state.lastServiceList.length;i++){
        if(this.state.lastServiceList[i].id == id){
            return i
        }
    }
    return -1
}
render() {
    // console.log("window.location.href:", window.location.href)
    if(this.state.servicelist != []){
      var list = this.state.servicelist.map((node, k) => {
            var color = "#369"
          if(node.id == window.location.href.substring(window.location.href.lastIndexOf("/") + 1)){
              color = "#ea4335"
          } else if(this.getLastIndex(node.id) == -1){
            color = "#fbbc05"
          }
        return (
            <li key={k} style={{'color': color}}><a href={'/#/logicView/' + node.id}>{node.id}</a></li>
        )
      })
      return(
        <div style={{overflow: "hidden", width: "200px"}}>
        <div className="panel-body" style={{ height: "500px", width: "215px", overflowY:"scroll" }}>
            <ul className="treeview">
                <li><a href="javascript:void(0);">Branch</a></li>
                <ul>
                    {list}
            	</ul>
                </ul>
        </div>
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

