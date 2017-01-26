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
    Main = require('./../components/Main'),
    Board = require('./../components/board/ProjBoard'),
    Login = require('./../components/login/Login'),
    Projects = require('./../components/projects/Projects'),
    TeamBoard = require('./../components/team/TeamBoard');

    
module.exports = (
    <Router history={hashHistory}>

        <Route path='/' component={Main}>

            <IndexRedirect to="/board" />

            <Route path='board' component={Board} />

            <Route path='login' component={Login} />

            <Route path='projects' component={Projects} />

            <Route path='team' component={TeamBoard} />

        </Route>

    </Router>
);