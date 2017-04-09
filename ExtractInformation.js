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

// Input: Base64 Encoded String for Image
// Output: JSON Array of profiles 
var extractInformation = async(function(encodedImage, callback) {
	var results = [];
	// Detect people in image
	app.models.predict("Pokedex", {base64:encodedImage}).then(
		function(response) {
			let {outputs} = response;
			var concepts = outputs[0].data.concepts;
			// console.log(util.inspect(concepts, {showHidden:false, depth:null}));

			var count = 0;

			await(concepts.forEach(async(function(concept) {
				var profileId = concept.id;
				console.log('Querying MongoDB for id \"' + profileId + '\"...');

				var db = MongoClient.connect(MONGO_URL, (err, db) => {
					if (err) {
						console.log(err.message);
					}

					var Profiles = db.collection('profiles');


					// Make MongoDB call to find profile
					var profile = await(Profiles.findOne({"_id": profileId}));

					console.log('Done querying MongoDB for id ' + profileId);
					console.log(util.inspect(profile, {showHidden:false, depth:null}));

					results.push(profile);
					count += 1;

					console.log('Added profile ' + profileId + ' to results');

					if (count >= concepts.length) {
						return callback(results);
					}
				});
			})));
		},
		function(err) {
			console.log(err.message);
		}
	);
});