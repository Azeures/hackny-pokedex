const util = require('util')

var await = require('asyncawait/await');
var async = require('asyncawait/async');

var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var MONGO_URL = "mongodb://localhost:27017/pokedex";

var Clarifai = require('clarifai');
var app = new Clarifai.App(
    'j11TT5HBXj9OmLw0c7q0lh6efpr2EkdORYNA2aNB',
    'fOCItDmW0xPPHKB_xc4aS8nUCkJpD_ltgg5uMJep'
);

var detect = async(function(Profiles, encodedImage, callback) {
	var results = [];

	// Detect people in image
	app.models.predict("Pokedex", encodedImage).then(
		function(response) {
			let {outputs} = response;
			var concepts = outputs[0].data.concepts;
			// console.log(util.inspect(concepts, {showHidden:false, depth:null}));

			var count = 0;

			await(concepts.forEach(async(function(concept) {
				if (concept.value > 0) {
					var profileId = concept.id;
					console.log('Querying MongoDB for id \"' + profileId + '\"(' + concept.value + ')...');

					// Make MongoDB call to find profile
					var profile = await(Profiles.findOne({"_id": profileId}));

					// console.log('Done querying MongoDB for id ' + profileId);
					// console.log(util.inspect(profile, {showHidden:false, depth:null}));

					if (profile != null) {
						results.push(profile);
					}

					console.log('Added profile ' + profileId + ' to results');
				}

				count += 1;

				if (count >= concepts.length) {
					console.log('Count: ' + count + '/' + concepts.length);
					return callback(results);
				}
			})));
		},
		function(err) {
			console.log(err.message);
		}
	);
});

// Input: Base64 Encoded String for Image
// Output: JSON Array of profiles 
var extractInformation = async(function(encodedImage, callback) {
	var db = MongoClient.connect(MONGO_URL, (err, db) => {
		if (err) {
			console.log(err.message);
		}
		var Profiles = db.collection('profiles');
		return detect(Profiles, encodedImage, callback);
	});
});

extractInformation("https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/17855098_10154682235193049_4968611357689480948_o.jpg?oh=fcd9987f01d9a451856676370a6c4c92&oe=595395D4", function(response) {
	console.log(util.inspect(response, {showHidden:false, depth:null}));
})

module.exports = extractInformation;