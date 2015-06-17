// Global variables
var express = require('express')
	fs = require('fs')
	app = express()
	request = require('request')
	iod = require('iod-node')
	client = new iod.IODClient('http://api.idolondemand.com','c12920b8-d1f7-4fb0-b96c-bbfb0df79d6a')

// Setup
app.set('views',__dirname + '/frontend') // Use the views folder to hold html
app.engine('html', require('ejs').renderFile); // Use ejs as a render engine
app.use(express.static('frontend')) // Makes the static files available for get requests

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
	app.post('/upload.html', function (req, res) {
		req.setEncoding('utf8')
		console.log('Post request received')
		req.on('data', function (data) {
			console.log(data)
			// Save data to referenceable audio file
			var audiopath = __dirname + '/bin/audio1.mp3'
			fs.writeFile(audiopath, data)
			console.log('The audio file was created')
			// Convert the audio data (audio) to text
			convertToText(__dirname + '/bin/Untitled.m4a', res)
		})
	})
}
function convertToText (audiopath, res) {
	// Transcribe the audio into text
	client.call('recognizespeech', 'data', function (e, response, data) {
		console.log('Got job')
		var jobID = data['data']['jobID']
		// Get the result from jobID
		console.log('https://api.idolondemand.com/1/job/result/' + jobID +'?apikey=' + 'c12920b8-d1f7-4fb0-b96c-bbfb0df79d6a')
		request('https://api.idolondemand.com/1/job/result/' + jobID +'?apikey=' + 'c12920b8-d1f7-4fb0-b96c-bbfb0df79d6a', function (e1, response1, body1) {
			console.log('Got text')
			console.log(body1[0])
			// 
		})

		

	}, {'file':'bin/Untitled.m4a'}, true)
}

onPostRequest()
