var rc522 = require("rc522/build/Release/rc522"),
//events = require("events"),
//emitter = new events.EventEmitter(),
rfid = "";

rc522(function (rfid) {
    if (rfid.indexOf("InitRc522") == -1) {
        console.log(rfid);
        //	emitter.emit('saveId',rfidSerialNumber);
    }
});

