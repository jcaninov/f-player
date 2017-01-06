var express = require('express'),
    router = express.Router(),
    rc522 = require("rc522"), //require("rc522/build/Release/rc522")
    rfid = "123213DEPRUEBA982093";


module.exports = function (eventEmitter){
    
    //rc522(function (rfidSerialNumber) {
    //    rfid = rfidSerialNumber;
    //    eventEmitter.emit("rfidRead",rfid);
    //});
    
    router.get('/set-rfid/:id', function (req, res) {
        rfid = req.params.id;
        //eventEmitter.emit("rfidRead", rfid);
    });

	router.get('/get-rfid', function (req, res) {
		res.send(rfid);
    });

	return router;
};
