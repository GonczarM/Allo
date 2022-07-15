require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
// const favicon = require('serve-favicon');

require('./config/database');

// Require controllers here

const app = express();

// add in when the app is ready to be deployed
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'build')));

// app.use(require('./config/auth')); // <- Step 5 in https://git.generalassemb.ly/SEI-CC/seir-11-29/blob/main/work/w11/d1/jwt-boilerplatec-code.md#flow-of-token-based-authentication
app.use('/users', require('./controllers/users'));
app.use('/convos', require('./controllers/conversations'));
app.use('/messages', require('./controllers/messages'));
// "catch all" route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});