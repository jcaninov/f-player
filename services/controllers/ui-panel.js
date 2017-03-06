var Gpio = require('onoff').Gpio,
    http = require('http'),
    led = new Gpio(14, 'out'),
    button = new Gpio(4, 'in', 'both');

module.exports = function(mpdClient, eventEmitter){

button.watch(function (err, value) {
    if (err) {
        //throw err;
	console.trace(err);
    };
	mpdClient.next();

    led.writeSync(value);
});

process.on('SIGINT', function () {
    led.unexport();
    button.unexport();
});

};
