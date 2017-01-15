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
        rfid = fs.readFileSync('back/rfid.txt', 'utf8');
        res.send(rfid);
    });

	return router;
};
