var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    rfid = '1234DEFAULTRFID1234',
    rfidOld = rfid,
    rfidFile = 'rfid.txt';


module.exports = function (mpdClient, eventEmitter){
   
    router.get('/set-rfid/:id', function (req, res) {
        rfid = req.params.id;
	    res.end();
    });

	router.get('/get-rfid', function (req, res) {
        res.send(rfid);
    });
    
    router.get('/load-playlist-from-rfid', function (req, res) { 
        play(rfid);
        res.end();
    });
    
    fs.watchFile(rfidFile, (curr, prev) => {
        var fcontent = fs.readFileSync(rfidFile, 'utf8');
        var fparsed = fcontent.split(/(\n)/).reverse().slice(0, 10);
        for (var i = 0; i < fparsed.length; i++) {
            if (fparsed[i] != "" && fparsed[i] != "\n") {
                notifyNewRfid(fparsed[i]);
                break;
            }
        }
                
    });

    function notifyNewRfid(newRfid) {
        if (newRfid != rfid){
            rfidOld = rfid;
            rfid = newRfid;
            eventEmitter.emit("rfidRead",rfid);
            play(rfid);
        }
    }

    function play(playlistId){
        mpdClient.loadPlaylistIntoQueue(playlistId);
        mpdClient.play();
    }

	return router;
};
