const express = require('express')
const router = express.Router();
const Convo = require('../models/conversation')
const User = require('../models/user')
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const {IamAuthenticator} = require('ibm-watson/auth');
const languageTranslator = new LanguageTranslatorV3({
  	version: '2021-03-27',
  	authenticator: new IamAuthenticator({
  		apikey: process.env.LANGUAGE_TRANSLATOR_API_KEY,
  	}),
	serviceUrl: process.env.LANGUAGE_TRANSLATOR_URL,
});

function isAuthenticated(req, res, next){
	if(req.user || req.session.userId){
		next()
	} else {
		res.status(401).json({data: 'Not Authorized!'})
	}
}

// create a message
router.post('/:convo', isAuthenticated, async (req, res, next) => {
	try{
			const foundConvo = await Convo.findById(req.params.convo)
			const loggedUser = await User.findById(req.session.userId)
			const foundUsers = await User.find({'conversations': req.params.convo})
			let foundUser;
// this loop finds the user thats part of the conversation that is not the logged in user
			for(let i = 0; i < foundUsers.length; i++){
				if(foundUsers[i]._id.toString() === req.session.userId){
					foundUsers.splice([i], 1)
					foundUser = foundUsers
				}
			}
// this stops the translating if the users use the same language
			if(foundUser[0].language === loggedUser.language){
				foundConvo.messages.push({ ...req.body, 'user': loggedUser.id})
			    await foundConvo.save()
				res.json({
					status: 200,
					message: foundConvo.messages[foundConvo.messages.length -1]
				})
			}
			else{
				const translateParams = {
		  		text: req.body.text,
		  		modelId: `${loggedUser.language}-${foundUser[0].language}`
				};
				const translationResult = await languageTranslator.translate(translateParams);
				const messageDbEntry = {}
				messageDbEntry.text = req.body.text
				messageDbEntry.translatedText = translationResult.result.translations[0].translation
                foundConvo.messages.push({ ...messageDbEntry, 'user': loggedUser.id})
			  	await foundConvo.save()
				res.json({
					status: 200,
					message: foundConvo.messages[foundConvo.messages.length -1]
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

// delete a message
router.delete('/message/:id', async (req, res, next) => {
	try{
		await Convo.messages.findByIdAndDelete(req.params.id)
		res.json({
			status: 200,
			message: "message has been deleted"
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