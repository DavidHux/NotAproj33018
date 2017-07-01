var React = require('react');
var ReactDOM = require('react-dom');

import { 
    HashRouter,
    Switch,
    Route,
    Link 
} from 'react-router-dom'

var Mainframe = require('./components/mainframe').default
// var BasicExample = require('./app')
var $ = require('jquery');
window.$ = window.jQuery = $;

ReactDOM.render(
  <HashRouter>
    <Mainframe />  
  </HashRouter>,
  document.querySelector('#example')
);