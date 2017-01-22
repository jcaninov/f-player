var Gpio = require('onoff').Gpio,
    led = new Gpio(14, 'out'),
    button = new Gpio(4, 'in', 'both');

button.watch(function (err, value) {
    if (err) {
        throw err;
    }
    
    http.get('http://localhost:3000/load-playlist-from-rfid', function(err,res) {
    	    if (err) console.trace(err);
        });

    led.writeSync(value);
});

process.on('SIGINT', function () {
    led.unexport();
    button.unexport();
});