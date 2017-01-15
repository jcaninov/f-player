var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    rfid = "1234DEFAULTRFID1234";


module.exports = function (eventEmitter){
   
    router.get('/set-rfid/:id', function (req, res) {
        rfid = req.params.id;
	    res.end();
    });

	router.get('/get-rfid', function (req, res) {
        var fcontent = fs.readFileSync('rfid.txt', 'utf8');
	var fparsed = fcontent.split(/(\n)/);
	rfid = fparsed[fparsed.length-1];
        res.send(rfid);
    });

	return router;
};
