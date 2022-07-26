require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io');
const user = require('./models/user');
const { useSyncExternalStore } = require('react');
const { connect } = require('http2');
const io = new Server(server)
// const favicon = require('serve-favicon');

require('./config/database');

// Require controllers here


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

const users = []
io.on('connection', (socket) => {

	socket.on("message", (message) => {
		io.sockets.emit('message', message)
	})

	socket.on('convo', (conversation) => {
		io.sockets.emit('convo', conversation)
	})

	socket.on('user', (userId) => {
		const foundUser = users.find(user => user === userId)
		if(!foundUser){
			users.push(userId)
		}
		socket.userId = userId
		io.sockets.emit('users', users)
	})

	socket.on('disconnect', () => {
		const index = users.indexOf(socket.userId)
		console.log('disconnect')
		if(index !== -1){
			users.splice(index, 1)
		}
		io.sockets.emit('users', users)
	})
})

const port = process.env.PORT || 3001;

server.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});