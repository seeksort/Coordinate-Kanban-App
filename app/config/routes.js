var React = require('react'),
    router = require('react-router'),
    helpers = require('./../components/utils/helpers');

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
    Board = require('./../components/board/projBoard'),
    Login = require('./../components/login/Login'),
    Projects = require('./../components/projects/Projects'),
    TeamBoard = require('./../components/team/TeamBoard');

// AJAX call to see if user has been authenticated before directing user to route
function requireAuth(nextState, replace, next) {
    helpers.loginCheck().then(function(data){
        if (!data) {
            replace({
              pathname: '/login',
              state: { nextPathname: nextState.location.pathname }
            })
        }
        next();
    })
}
    
module.exports = (

    <Router history={hashHistory}>

        <Route path='/' component={Main}>

            <IndexRedirect to="/board" />

            <Route path='login' component={Login} />

            <Route path='board' component={Board} onEnter={requireAuth} />

            <Route path='projects' component={Projects} onEnter={requireAuth} />

            <Route path='team' component={TeamBoard} onEnter={requireAuth} />

        </Route>

    </Router>
);