const express = require('express')
const router = express.Router();
const User = require('../models/user')
const Conversation = require('../models/conversation')
const bcrypt = require('bcrypt')

function isAuthenticated(req, res, next){
	if(req.user || req.session.userId){
		next()
	} else {
		res.status(401).json({data: 'Not Authorized!'})
	}
}

//user info
router.get('/user/:id', async (req, res, next) => {
	try{
		const foundUser = await User.findById(req.params.id)
		.populate({
			path: 'conversations', options: { sort: { 'updated_at': -1}},
			populate: {path: 'users'}
		})
		res.json({
			status: 200,
			user: foundUser
		})
	}
	catch(error){
		console.log(next(error));
		res.json({
			status: 400,
			error: error
		})
	}
})

//logged in user info
router.get('/current', isAuthenticated, async (req, res, next) => {
	try{
			const currentUser = await User.findById(req.session.userId)
			.populate({
				path: 'conversations', options: { sort: { 'updated_at': -1}},
				populate: {path: 'users'}
			})
			res.json({
				status: 200,
				user: currentUser
			})
	}
	catch(error){
		console.log(next(error));
		res.json({
			status: 400,
			error: error
		})
	}	
})

// search through users by username
router.get('/search/:username', async (req, res, next) => {
	try{
		const searchedUser = await User.findOne({'username': req.params.username})
		if(!searchedUser){
			res.json({
				status: 401,
				message: 'user does not exist'
			})
		}
		else{
			res.json({
				status: 200,
				user: searchedUser
			})
		}
	}
	catch(error){
		console.log(next(error));
		res.json({
			status: 400,
			error: error
		})
	}	
})

// edit logged in user
router.put('/current', isAuthenticated, async (req, res, next) => {
	try{
			const updatedUser = await User.findByIdAndUpdate(req.session.userId, req.body, {new: true})
			res.json({
				status: 200,
				user: updatedUser
			})
	}
	catch(error){
		console.log(next(error));
		res.json({
			status: 400,
			error: error
		})
	}		
})

// create a user
router.post('/register', async (req, res, next) => {
	const password = req.body.password
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	const userDbEntry = {...req.body, 'password': passwordHash}
	try{
		const foundUsername = await User.findOne({'username': req.body.username})
		if(foundUsername){
			res.json({
				status: 401,
				message: "username already exists"
			})
		}
		else{
			const createdUser = await User.create(userDbEntry)
			req.session.loggedIn = true
			req.session.userId = createdUser._id
			res.json({
				status: 200,
				session: req.session,
				user: createdUser
			})
		}
	}
	catch(error){
		res.json({
			status: 400,
			error: error
		})
		console.log(next(error))
	}		
})

// login a user
router.post('/login', async (req, res, next) => {
	try{
		const foundUser = await User.findOneAndUpdate({'username': req.body.username}, {active: true}, {new: true})
        .populate({
            path: 'conversations',
            populate: {path: 'users'}
        })
		if(foundUser){
			if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
				req.session.loggedIn = true
				req.session.userId = foundUser._id
				res.json({
					status: 200,
					session: req.session,
					user: foundUser
				})
			}
			else{
				res.json({
					status: 401,
					message: 'Username or Password do not match' 
				})
			}
		}
		else{
			res.json({
				status: 402,
				message: 'Username or Password do not match'
			})
		}
	}
	catch(error){
		console.log(next(error));
		res.json({
			status: 400,
			error: error
		})
	}		
})

// logout of session
router.post('/logout', async (req, res, next) => {
	req.session.destroy((error) => {
		if(error){
			console.log(next(error));
			res.json({
				status: 400,
				error: error
			})
		}
		else{
			res.json({
				status: 200,
				message: 'You have been logged out'
			})
		}
	})
})

// delete account and conversations
router.delete('/current', isAuthenticated, async (req, res, next) => {
	try{
			const deletedUser = await User.findByIdAndDelete(req.session.userId)
			await Conversation.deleteMany({
				_id: { $in: deletedUser.conversations}
			})
			req.session.destroy((error) => {
				if(error){
					console.log(next(error));
					res.json({
						status: 401,
						error: error
					})
				}
				else{
					res.json({
						status: 200,
						message: 'Your account has been deleted'
					})
				}	
			})
	}
	catch(error){
		console.log(next(error));
		res.json({
			status: 400,
			error: error
		})
	}		
})

module.exports = router;