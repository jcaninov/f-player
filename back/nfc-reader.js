var http = require('http');
 
var rc522 = require("rc522/build/Release/rc522"),
//http = require("http-debug").http,
events = require("events"),
emitter = new events.EventEmitter(),
rfid = "XX1234XXTESTXX1234XX";

http.debug = 2;

function saveId(id){

	http.get('http://localhost:3000/set-rfid/ss'+id, function(err,res) {
		if (err) console.trace(err);
	        console.log("Result: "+res.statusCode);
        });


/*
var options = {
	hostname: 'localhost',
	port:3000,
	path: '/set-rfid/id'+id,
	method: 'GET'
};
var req = http.request(options, function(res) {
	console.log("Status: "+res.statusCode);
	console.log("Headers: "+JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', function(chunk){ 
		console.log('BODY: '+chunk); 
		});
        });

req.on('error', function(err){ 
	console.log('ERROR: '+err.message);
	});
req.write('data\n');
req.write('data\n');
req.end();
*/
}
emitter.on('saveId', saveId);
//emitter.emit('saveId',"asdasdaiiiiii");


rc522(function (rfidSerialNumber) {
    rfid = rfidSerialNumber;
    console.log(rfidSerialNumber);
emitter.emit('saveId',rfidSerialNumber);

});

