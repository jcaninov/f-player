var rc522 = require("rc522/build/Release/rc522"),
//events = require("events"),
//emitter = new events.EventEmitter(),
rfid = "";


fs.watchFile('rfid.txt', (curr, prev) => {
	emitter.emit('saveId',rfidSerialNumber);
});

rc522(function (rfid) {
    console.log(rfid);
});

