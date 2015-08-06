var PORT = process.env.PORT || 3000;
var MONGOURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/dibs'
var express      = require('express'),
	server         = express(),
	ejs            = require('ejs'),
	bodyParser     = require('body-parser'),
	methodOverride = require('method-override'),
	expressLayouts = require('express-ejs-layouts'),
	morgan         = require('morgan'),
	mongoose       = require('mongoose'),
	session        = require('express-session'),
	bcrypt				 = require('bcrypt');

// Set
server.set('views', "./views");
server.set('view engine', 'ejs');
// Uses
server.use(session({
	secret:           "dibs",
	resave:            false,
	saveUninitialized: false
}));

server.use(bodyParser.urlencoded({extended:true}));
server.use(express.static('./public'));
server.use(methodOverride('_method'));
server.use(morgan('short'));
server.use(expressLayouts);

// Routes and Controllers

var userController = require('./controllers/users.js');
server.use('/users', userController);
// var commentsOnIdeasController = require('./controllers/commentsOnIdeas.js');
// server.use('ideas/:id/comments', commentsOnIdeasController);
var ideaController = require('./controllers/ideas.js');
server.use('/ideas', ideaController);
var commentController = require('./controllers/comments.js');
server.use('/comments', commentController);

// this is the "controller" for the routes below here, should we not hit one of the contollers above
server.use(function (req, res, next) {
	res.locals.controller = "main";
	next();
})

server.get('/', function(req, res){
  res.render('users/login');
});

//Catchall Routes
server.use(function(req, res){
  res.send("This page is under construction")
})

//Database Server Start
mongoose.connect(MONGOURI);
var db = mongoose.connection;

db.on('error', function(){
  console.log("ERROR OVERLOAD");
});

db.once('open', function(err){
  console.log("Ra has opened the database!");
  server.listen(PORT, function(){
    console.log("Horus has switched on the server!")
  });
});
