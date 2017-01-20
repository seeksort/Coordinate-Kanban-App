var React = require('react'),
    router = require('react-router');

// import specific React Router components
var
    Router = router.Router,
    Route = router.Route,
    hashHistory = router.hashHistory,
    IndexRoute = router.IndexRoute,
    IndexRedirect = router.IndexRedirect;

// require components to be used as Routes
var 
    Board = require('./../components/board/ProjBoard'),
    List = require('./../components/board/list/List'),
    Task = require('./../components/board/list/task/Task'),
    Task = require('./../components/board/list/task/TaskModal'),
    TeamBoard = require('./../components/teams/TeamBoard'),
    TeamTitle = require('./../components/teams/TeamTitle');

    
module.exports = (
    <Router history={hashHistory}>

        <Route path='/' component={Board}>

        </Route>

    </Router>
);