require('dotenv').config();
const express = require('express');
const { createServer } = require('http')
const { Server } = require('socket.io');
const app = express();
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const httpServer = createServer(app)
const io = new Server(httpServer, {
	pingTimeout: 60000,
	cors: {
		origin: "http://localhost:3000"
	}
})
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
app.use(express.static(path.join(__dirname, 'dist')));

// app.use(require('./config/auth')); // <- Step 5 in https://git.generalassemb.ly/SEI-CC/seir-11-29/blob/main/work/w11/d1/jwt-boilerplatec-code.md#flow-of-token-based-authentication
app.use('/users', require('./controllers/users'));
app.use('/convos', require('./controllers/conversations'));
app.use('/messages', require('./controllers/messages'));
// "catch all" route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// const users = []
io.on('connection', (socket) => {
	// console.log('user connected')

	socket.on('user', (user) => {
		if(user){
			console.log('socket user')
			console.log(user._id)
			socket.join(user._id)
			console.log(user.username)
			socket.emit('connected')
		}
	})

	socket.on('openConvo', (convoId, user) => {
		socket.join(convoId)
		console.log(convoId)
		console.log(user.username)
	})

	socket.on('messageReceived', (data) => {
		console.log('hello')
		if(data.convo){
			console.log('socket message')
			if(!data.convo.users) return console.log('no users')
			data.convo.users.forEach(user => {
				if(user !== data.message.user._id) {
					console.log(user + data.message)
					socket.to(data.convo._id).emit('messageSent', data.message)
				}
			})
		}
	})
	// socket.on("message", (message) => {
	// 	io.sockets.emit('message', message)
	// })

	// socket.on('convo', (conversation) => {
	// 	io.sockets.emit('convo', conversation)
	// })

	// socket.on('user', (userId) => {
	// 	const foundUser = users.find(user => user === userId)
	// 	if(!foundUser){
	// 		users.push(userId)
	// 	}
	// 	socket.userId = userId
	// 	io.sockets.emit('users', users)
	// })

	// socket.on('disconnect', () => {
	// 	const index = users.indexOf(socket.userId)
	// 	console.log('user disconnect')
	// 	if(index !== -1){
	// 		users.splice(index, 1)
	// 	}
	// 	io.sockets.emit('users', users)
	// })
})

const port = process.env.PORT || 3001;

httpServer.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});