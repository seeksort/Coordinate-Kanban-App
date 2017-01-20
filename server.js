// import npm modules
var 
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    Promise = require('bluebird');

mongoose.Promise = Promise;

var app = express();
var PORT = process.env.PORT || 3000;


// start logger and make public files available
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// // Start Mongoose & test connection
// var ObjectId = require('mongoose').Types.ObjectId,
//     databaseUri = 'mongodb://localhost/nytreact',
//     db = mongoose.connection,
//     Article = require('./models/Article.js');

// if (process.env.MONGODB_URI) {
//     mongoose.connect(process.env.MONGODB_URI);
// } 
// else {
//     mongoose.connect(databaseUri);
// }

// db.on("error", function(error) {
//     console.log("Mongoose Error: ", error);
// });

// db.once("open", function() {
//     console.log("Mongoose connection successful.");
// });

app.get('/', function(req, res) {
    res.send('./public/index.html');
});

// // Get Saved articles
// app.get('/api/saved', function(req, res){
//     Article.find({}, function(err, docs) {
//         if (err) {
//             console.log(err);
//         } 
//         else {
//             res.json(docs);
//         }
//     });
// });

// // Save an article
// app.post('/api/saved', function(req, res){
//     var newSavedArticle = new Article({
//         title: req.body.title,
//         date: req.body.date,
//         url: req.body.url
//     });

//     Article.find({'title': newSavedArticle.title}, function(err, docs) {
//         if (docs.length === 0) {
//             console.log('new article obj: ' + newSavedArticle);
//             newSavedArticle.save(function(err, req) {
//                 if (err) {
//                     console.log(err);
//                 } 
//                 else {
//                     res.sendStatus(200);
//                 }
//             });
//         }
//         else {
//             res.sendStatus(200);
//         }
//     })

// });

// // Delete a saved article
// app.delete('/api/saved', function(req, res){
//     Article.findOneAndRemove({ 'title': req.body.title }, function(err, doc) {
//         if (err) {
//             console.log(err);
//         }
//         else if (doc === null) {
//             console.log('couldn\'t find a match.')
//         }
//         else {
//             console.log('doc removed: ' + doc)
//             res.sendStatus(200);
//         }
//     })
// });

app.listen(PORT, function() {
    console.log('Server now listening on port ' + PORT);
});