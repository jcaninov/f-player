var http = require('http'),
    rc522 = require("rc522"), //require("rc522/build/Release/rc522")
    rfid = "XX1234XXTESTXX1234XX";


module.exports = function (eventEmitter) {
    rc522(function (rfidSerialNumber) {
        rfid = rfidSerialNumber;
        console.log(rfidSerialNumber);
        http.get({
            hostname: 'localhost',
            port: 3000,
            path: '/set-rfid/'+rfidSerialNumber,
            agent: false  // create a new agent just for this one request
        }, function(res) {
            // Do stuff with response
        });
    });
}