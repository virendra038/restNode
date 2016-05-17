var express    = require('express');
var morgan 	   = require('morgan')
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');


var Poem   = require('./app/models/poem');
var secret = require('./app/config/secret');

mongoose.connect(secret.database,function(err){
	if(err){
		console.log(err);
	}else{
		console.log("connected to the database");
	}
});


//middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods","GET");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var mainRoutes = require('./app/routes/main');
var poemRoutes = require('./app/routes/poem');

app.use('/api',mainRoutes);
app.use('/api',poemRoutes);


app.listen(secret.port,function(err) {
	if(err) throw err;
	console.log("Server is Running on port" + secret.port);
});