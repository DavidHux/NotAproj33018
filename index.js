var React = require('react');
var ReactDOM = require('react-dom');

import { 
    HashRouter,
    Switch,
    Route,
    Link 
} from 'react-router-dom'

var Mainframe = require('./components/mainframe').default
var EventEmitter = require('events')
var em = new EventEmitter()
// var BasicExample = require('./app')
var $ = require('jquery');
window.$ = window.jQuery = $;
window.em = em
window.polling = false
window.MS = 5000
window.RS = 3000
window.DE = 500

ReactDOM.render(
  // <HashRouter>
    <Mainframe />,  
  // /* </HashRouter>, */
  document.querySelector('#example')
);