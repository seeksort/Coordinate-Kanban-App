var 
    express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    LocalStrategy = require('passport-local').Strategy;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

require('./db')();
require('./api-auth')(router);
require('./api-project')(router);
require('./api-all-projects')(router);
require('./api-team')(router);

module.exports = router;
