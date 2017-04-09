const util = require('util')

var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var MONGO_URL = "mongodb://localhost:27017/pokedex";

var Clarifai = require('clarifai');
var app = new Clarifai.App(
    'j11TT5HBXj9OmLw0c7q0lh6efpr2EkdORYNA2aNB',
    'fOCItDmW0xPPHKB_xc4aS8nUCkJpD_ltgg5uMJep'
);

function countNumberOfFaces(encodedImage, callback) {
	app.models.predict("a403429f2ddf4b49b307e318f00e528b", encodedImage).then(
	function(response) {
		let {outputs} = response;
		var regions = outputs[0].data.regions;
		numFaces = regions.length;
		console.log(numFaces + ' faces detected.');		
		return callback(numFaces);
	},
	function(err) {
		console.log(err.message);
	});
}

// var detect = async(function(Profiles, encodedImage, callback) {
function detect(Profiles, encodedImage, callback) {
	var results = [];
	countNumberOfFaces(encodedImage, function(numFaces) {
		console.log(numFaces + ' faces detected.');

		// Detect people in image
		app.models.predict("Pokedex", encodedImage).then(response => {
				let {outputs} = response;
				var concepts = outputs[0].data.concepts;
				// console.log(util.inspect(concepts, {showHidden:false, depth:null}));

				var count = 0;

				concepts.forEach(concept => {
					if (count < numFaces) {
						var profileId = concept.id;
						console.log('Querying MongoDB for id \"' + profileId + '\"(' + concept.value + ')...');

						// Make MongoDB call to find profile
						Profiles.findOne({"_id": profileId}).then(profile => {
							if (profile != null && count < numFaces) {
								results.push(profile);
								console.log('Added profile ' + profile.name + ' to results');
								count += 1;
							}

							console.log('Count: ' + count + '/' + numFaces);
							console.log(count < numFaces);
						});

						// console.log('Done querying MongoDB for id ' + profileId);
						// console.log(util.inspect(profile, {showHidden:false, depth:null}));
					}
				});

				return callback(results);
			}, err => {
				console.log(err.message);
			});
	});
};
// });

// Input: Base64 Encoded String for Image
// Output: JSON Array of profiles 
function extractInformation(encodedImage, callback) {
	var db = MongoClient.connect(MONGO_URL, (err, db) => {
		if (err) {
			console.log(err.message);
		}
		var Profiles = db.collection('profiles');
		return detect(Profiles, encodedImage, callback);
	});
};

extractInformation("https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/17545367_10155225197032318_3055188002402293972_o.jpg?oh=2d89029b8928e4bec3d151ac7e99b383&oe=59912318", function(response) {
	console.log(util.inspect(response, {showHidden:false, depth:null}));
})

module.exports = extractInformation;