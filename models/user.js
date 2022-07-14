const mongoose = require('mongoose');
const Conversation = require('./conversation');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
        required: true
	}, 
	password: {
        type: String,
        required: true
    },
	language: {
        type: String,
        required: true
    },
	active: {
		type: Boolean,
		default: false
	},
	conversations:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Conversation'
	}]
});

module.exports = mongoose.model('User', userSchema);
