var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/page-builder'
mongoose.connect(databaseURL);

app.set('views', './public');
app.use(express.static(__dirname + '/public'));

app.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
});

app.use(require('./controllers'));
app.listen(process.env.PORT || 3000);