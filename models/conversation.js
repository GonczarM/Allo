const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	text: String,
	translatedText: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
},  {
        timestamps: true
})


const conversationSchema = new mongoose.Schema({
	users:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
    messages: [messageSchema]
},  {
        timestamps: true
})

module.exports = mongoose.model('Conversation', conversationSchema);
