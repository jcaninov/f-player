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
        var fparsed = fcontent.split(/(\n)/).reverse();
        for (var i = 0; i < fparsed.length; i++) {
            if (fparsed[i] != "" && fparsed[i] != "\n" && fparsed[i].indexOf('Rfid') == -1) {
                rfid = fparsed[i];
                break;
            }
        }
	    
        res.send(rfid);
    });
    
    function getRfid(fcontent) {
    }

	return router;
};
