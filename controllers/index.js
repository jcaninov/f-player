var express = require('express')
	, router = express.Router()
	, MPD = require("./lib/mpd.js");

	var mpd_client = new MPD(6600, 'localhost');
	mpd_client.enableLogging();
	mpd_client.on('Connect', function (){
		mpd_client.updateDatabase();
	});
	mpd_client.on('Event', function (state) {
		console.log("->-> Evento: " + state.type);
	});

	router.get('/', function (req, res) {
		res.end();
	});

	router.use('/', require('./search.js')(mpd_client));
	router.use('/', require('./rfid.js')());
	router.use('/player', require('./player.js')(mpd_client));


	//router.get('/', function(req, res) {
	//  res.render('index')
	//})

module.exports = router;