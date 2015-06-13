// Global variables
var express = require('express')
	fs = require('fs')
	app = express();
	apikey = 'c12920b8-d1f7-4fb0-b96c-bbfb0df79d6a'
	request = require('request')


// Setup
app.set('views',__dirname + '/views') // Use the views folder to hold html
app.set('bin',__dirname + '/backend/bin') // Use the views folder to hold html
app.engine('html', require('ejs').renderFile); // Use ejs as a render engine
app.use(express.static('views')) // Makes the static files available for get requests

// Listen for requests
var server = app.listen(3000, function {
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
			// Save data to a referenceable file
			fs.writeFile('/')
			// Convert the audio data (audio) to text
			request()
		})
	})
}
"https://api.idolondemand.com/1/api/sync/extractconcepts/v1?url=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FUnited_Kingdom&apikey=c12920b8-d1f7-4fb0-b96c-bbfb0df79d6a"
function convertToText (audio) {
	 
}

function saveToFile(data) {

}

function callAPI

onPostRequest()
