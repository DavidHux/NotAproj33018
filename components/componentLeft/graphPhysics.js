import React from "react"
import _ from 'lodash'
import * as d3 from 'd3'

import provider from './imported/data-provider';
import { hasClass, removeClass, addClass, uuidRegExp } from './imported/helpers';
let MS = 5000

import serviceStore from '../../stores/serviceStore'

import '../../css/main.less'
import '../../css/style.less'
require('normalize.css');
require('animate.css/animate.css');

export default class GraphPhysics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataNodes: []
    }
  }

  componentDidMount() {
    var vis = d3.select('#app')
      .append('div')
      .attr('id', 'vis-physical');
    
    var wrapper = vis.append('div')
      .classed('wrapper', true);

    function removeVis() {
      cluster = wrapper.selectAll('.node-cluster')
      cluster.remove();
    }

    function render({root}) {
          console.log('render', root)

      var cluster, node, container, clusterEnter, nodeEnter;
      cluster = wrapper.selectAll('.node-cluster').data(root);

      clusterEnter = cluster
        .enter()
        .append('div')
        .classed('node-cluster', true)
        .classed('byon', (d) => d.uuid === 'BYON');

      clusterEnter
        .append('div')
        .classed('node-cluster-meta', true);

      clusterEnter
        .append('div')
        .classed('node-cluster-content', true);

      node = cluster
        .select('.node-cluster-content')
        .selectAll('.node').data((d) => d.children);

      nodeEnter = node.enter()
        .append('div')
        .classed('node', true)

      nodeEnter.append('div')
        .classed('node-meta', true);

      nodeEnter.append('div')
        .classed('node-content', true);

      container = node
        .select('.node-content')
        .selectAll('.mycontainer').data((d) => d.children);
    console.log(1)


      container.enter()
        .append('div')
        .classed('mycontainer', true);

      cluster
        .select('.node-cluster-meta')
        .html(({name,state = '', node_type = '', region = ''}) => {

          // This is a HORRIBLE hack
          // but I don't wanna fetch nodeTypes from the API as from now
          var displayType = node_type.split('/')[4] || ''; // horrible
          var displayRegion = region.split('/')[5] || ''; // horrible

          switch (displayType) {
            case 'digitalocean':
              displayType = 'Digital Ocean';
              break;
            case 'aws':
              displayType = 'AWS';
              break;
          }

          return `<span data-state='${_.kebabCase(state || "byon")}' class='name'>${name}</span>`;
        })
    console.log(12)

      node
        .select('.node-meta')
        .attr('name', (d) => _.kebabCase(d.name))
        .attr('data-state', (d) => _.kebabCase(d.state))
        .html((d) => d.name);


      container
        .classed('foreign', (d) => !d.state)
        .attr('tag', (d) => _.kebabCase(d.tag)).html((d) => d.tag)
        .attr('data-state', (d) => _.kebabCase(d.state))


      container.on('mouseenter', null);
      container.on('mouseleave', null);
      container.on('click', function () {
        console.log('onclick')
        // if (d3.select(this)[0][0].__data__.link) {
        //   showContainer(d3.select(this)[0][0].__data__.link)
        // }
      });


      cluster.exit().remove();
      container.exit().remove();
      node.exit().remove();
    }

    function reload(){
        provider.reload();
        setTimeout(reload, MS);
    }

    console.log("Polling refresh: " + MS);

    provider.on('infrastructure-data', render);
    provider.start();
    reload();
  }

  render() {
    return (
        <div style={{overflow: "hidden", width: "100%", height: "calc(100% - 43px)"}}>
                <div id="Div1" style={{ float: "left",  width: '105%', height: "105%", overflow:"scroll" }}>
                    <div id="app">
                    </div>
                </div>
            </div>
    )
  }
}