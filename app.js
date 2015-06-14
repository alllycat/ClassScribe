// Global variables
var express = require('express')
	fs = require('fs')
	app = express();
	apikey = 'c12920b8-d1f7-4fb0-b96c-bbfb0df79d6a'
	request = require('request')


// Setup
app.set('views',__dirname + '.') // Use the views folder to hold html
app.engine('html', require('ejs').renderFile); // Use ejs as a render engine
app.use(express.static('.')) // Makes the static files available for get requests

// Listen for requests
var server = app.listen(3000, function () {
	console.log('The server has started on port 3000')
})



/*
	PROGRAM STRUCTURE (ARROWS REPRESENT CALLBACKS):
	onPostRequest -> convertToText
*/


function onPostRequest() {
	// When there is a post request 
	app.post('index.html', function (req, res) {
		console.log('Post request received')
		req.on('data', function (data) {
			// Save data to referenceable audio file
			var audiopath = __dirname + '/bin/audio'
			fs.writeFile(audiopath, data)
			// Convert the audio data (audio) to text
			convertToText(audiopath, res)
		})
	})
}
function convertToText (audiopath, res) {
	// Transcribe the audio into text
	var commandurl = 'https://api.idolondemand.com/1/api/sync/recognizespeech/v1' + '?file=' + audiopath + '&apikey=' + apikey
	request(commandurl, function (e, response, text) {
		// Save data to referencable text file
		var fulltextpath = __dirname + '/bin/fulltext.txt'
		fs.writeFile(fulltextpath, text)

		res.send(text)

	})
}

onPostRequest()
