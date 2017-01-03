var express = require('express'),
	router = express.Router();

module.exports = function(){
	var rfid = "123213DEPRUEBA982093";

	router.get('/get-rfid', function (req, res) {
		res.send(rfid);
	});

	return router;
};
