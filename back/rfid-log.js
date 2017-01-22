var rc522 = require("rc522/build/Release/rc522"),
//events = require("events"),
//emitter = new events.EventEmitter(),
rfid = "";

rc522(function (rfidSerialNumber) {
    console.log(rfidSerialNumber);
//	emitter.emit('saveId',rfidSerialNumber);
});

