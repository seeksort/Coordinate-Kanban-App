var 
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    LocalStrategy = require('passport-local').Strategy;

// Need Mongoose ObjectId type in order to search for specific model's ID
var ObjectId = require('mongoose').Types.ObjectId,
    // Import Mongoose models for tables
    User = require('./../models/User.js');

module.exports = function (router) {

    // Passport.js passport-local-mongoose authentication
    router.use(session({
    secret: 'turn around bright eyes',
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
    }),
    resave: true,
    saveUninitialized: true,
    cookie: { 
        maxAge: 6000000,
        secure: false 
    }
    }));
    router.use(passport.initialize());
    router.use(passport.session());
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser(function(user, done){
        done(null, user.id);
    }));
    passport.deserializeUser(User.deserializeUser(function(id, done) {
        User.findOne({ _id: id }).then(function(user) {
            done(null, { id: user.id, username: user.username});
        })
    }));

    /* ======== User Account Actions ======== */
    // Create new account
    router.post('/newuser', function(req, res, next) {
        console.log(req.body);
        // Passport-Local Mongoose function; will create new user, hash the password (2nd argument) and store username, email, hashed pw, and pw salt in DB
        User.register(new User({
            username: req.body.username,
            email: req.body.email,
        }), req.body.password, function(error, userAccount) {
            if (error) {
                console.log('there was an error ' + error);
                if (error.name == 'UserExistsError') {
                    return res.json({ error: 'userExists', message : 'a user with that email already exists.'});
                }
                else {
                    return res.json({ message : error.message });       
                }
            }
            // After account created, authenticate user
            passport.authenticate('local')(req, res, function () {
                req.session.save(function(err) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/');
                })
            });
        });
    });

    // Log in - if fail redirect to login page
    router.post('/userlogin', function(req, res, next) {
        passport.authenticate('local', function(err, user) {
            if (err) { 
                return res.send({success: false, message: err }); 
            }
            if (!user) { 
                return res.send({success: false, message: "Invalid Login" }); 
            }
            req.logIn(user, function(err) {
                if (err) { 
                    return next(err); 
                }
                return res.send({success: true, message: "Login successful." }); 
            });
        })(req, res, next);
    });

    // Logout Route
    router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    res.send({success: true, message: "You have been logged out." });
    });

    /* ======== Require authentication on all routes ======== */
    // Middleware authentication will intercept unauth users and send 401 Not Auth error.
    router.all('*', function(req, res, next){
        if(req.isAuthenticated()){
            next();
        }
        else {
            return res.send({success: false, message: "Invalid Login" });
        }
    });

    // Route is for login check 
    router.get('/userlogin', function(req, res, next) {
        if(req.isAuthenticated()){
            return res.send({success: true, message: "Login successful." });
        }
        else {
            return res.send({success: false, message: "Invalid Login" });
        }
    });
};
