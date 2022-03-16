var MongoClient = require('mongodb').MongoClient
	, format = require('util').format;
MongoClient.connect('mongodb://129.49.255.67:27017/audiorecorder', function (err, db) {
	if (err) {
    	throw err;
	} else {
    	console.log("successfully connected to the database");
	}
	db.close();
});
