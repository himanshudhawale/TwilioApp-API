var path = require('path');
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var urlencoded = require('body-parser').urlencoded;
var config = require('./config');
var voice = require('./_helper/voice');
var message = require('./_helper/message');
var results = require('./_helper/results');
var Promise = require('bluebird');

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost:27017/survey');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded({ extended: true }));
app.use(morgan('combined'));

//Webhook
app.post('/voice', voice.interview);
app.post('/voice/:responseId/transcribe/:questionIndex', voice.transcription);
app.post('/message', message);

app.get('/results', results);

module.exports = app;
