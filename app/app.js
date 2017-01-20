var React = require('react'),
    ReactDOM = require('react-dom');

var
    Router = require('react-router').Router,
    routes = require('./config/routes');

ReactDOM.render(routes, document.getElementById('app'));