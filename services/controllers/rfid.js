var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    rfid = "1234DEFAULTRFID1234";


module.exports = function (mpdClient, eventEmitter){
   
    router.get('/set-rfid/:id', function (req, res) {
        rfid = req.params.id;
	    res.end();
    });

	router.get('/get-rfid', function (req, res) {
        var fcontent = fs.readFileSync('rfid.txt', 'utf8');
        var fparsed = fcontent.split(/(\n)/).reverse().slice(0, 10);
        //TODO: if (fcontent.lastupdated !=....) control de si se ha modificado
        for (var i = 0; i < fparsed.length; i++) {
            if (fparsed[i] != "" && fparsed[i] != "\n") {
                rfid = fparsed[i];
                break;
            }
        }	    
        res.send(rfid);
    });
    
    router.get('/load-playlist-from-rfid', function (req, res) { 
        mpdClient.loadPlaylistIntoQueue(rfid);
        mpdClient.play();
        res.end();
    });
    
    function getRfid(fcontent) {
    }

	return router;
};
