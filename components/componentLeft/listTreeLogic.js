import React from "react"
import serviceStore from '../../stores/serviceStore'
import versionStore from '../../stores/versionStore'
import VersionActions from '../../actions/VersionActions'

export default class ListLogic extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      servicelist: [],
      lastServiceList: [],
      deploying: false,
      serviceName: '监控预警系统'
    }
    // em.on('changeservice', function(name){
    //     this.setState({serviceName: name})
    // }.bind(this))
    em.on('deployNode', function(id){
            var that = this
            this.state.deploying = true
            // var obj = $('#treeli'+id)
            var coo = $('#treeli'+id).css('color')
            changeColor("#fac21b", coo, coo)

            function changeColor(color1, color2, color3){
                var obj = $('#treeli'+id)
                var colo = color1
                if(that.state.deploying == false) colo = color3
                obj.css('color', colo)
                if(that.state.deploying == false) return
                setTimeout(() => {changeColor(color2, color1, color3)}, 500)
            }
        }.bind(this))
        em.on('deployEnd', function(){
            this.state.deploying = false
        }.bind(this))
  }
  componentDidMount() {
    serviceStore.addServiceChangeListener(this._onChange.bind(this));
    versionStore.addServiceChangeListener(this.__onChangeServiceName.bind(this))
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
    versionStore.removeServiceChangeListener(this.__onChangeServiceName.bind(this))
}
_onChange() {
    this.state.lastServiceList = this.state.servicelist
    this.setState({servicelist: serviceStore.getServiceNameList()})
}
__onChangeServiceName(){
    console.log('change service name')
    this.setState({serviceName: versionStore.getCurrentServiceName()})
}
getLastIndex(id){
    // console.log(id, this.state.lastServiceList)
    if(this.state.lastServiceList.length == 0) return 0
    for(var i = 0;i < this.state.lastServiceList.length;i++){
        if(this.state.lastServiceList[i].label == id){
            return i
        }
    }
    return -1
}
render() {
    // console.log("window.location.href:", window.location.href)
    var that = this
    if(this.state.servicelist != []){
      var list = this.state.servicelist.map((node, k) => {
            var color = "#369"
          if(node.label == this.state.serviceName){
              color = "#ea4335"
          } else if(this.getLastIndex(node.label) == -1){
            color = "#fbbc05"
          }
        return (
            <li id={'treeLi' + node.label} key={k} style={{'color': color}} onClick={
                ()=>{ 
                    if(that.state.deploying == false){
                        VersionActions.updateService(node.label)}
                    }
                }><a href='javascript:void(0)'>{node.label}</a></li>
        )
      })
      return(
        <div style={{overflow: "hidden", width: "100%", height: "100%"}}>
        <div className="panel-body" style={{  width: "115%", overflowY:"scroll", height: '100%'}}>
            <ul className="treeview">
                <li><a href="javascript:void(0);">南京防汛防台风应急响应</a></li>
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

