var express = require('express')
	, router = express.Router()
	, MPD = require("./lib/mpd.js")
    , events = require('events')
    , eventEmitter = new events.EventEmitter()
    , UiPanel = require('./ui-panel');

	var mpd_client = new MPD(6600, 'localhost');
	//mpd_client.enableLogging();
	//mpd_client.on('Connect', function (){
	//	mpd_client.updateDatabase();
	//});
	mpd_client.on('Event', function (state) {
		//console.log("->-> Evento: " + state.type);
	});

    mpd_client.on('SocketClosed', function(){
        console.log('SocketClosed -> new connection!')
        mpd_client = new MPD(6600, 'localhost');
    });

    var uiPanel = new UiPanel(mpd_client, eventEmitter);

	router.use('/', require('./search.js')(mpd_client, eventEmitter));
	router.use('/', require('./rfid.js')(mpd_client, eventEmitter));
	router.use('/player', require('./player.js')(mpd_client));
    
    router.get('/update-stream', function (req, res) {
        var sse = startSees(res);
        registerEvents();   

        function startSees() {
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            });
            res.write("\n");
        
            return function sendSse(name, data, id) {
                res.write("event: " + name + "\n");
                if (id) res.write("id: " + id + "\n");
                res.write("data: " + data + "\n\n");
            };
        }
        function sendSearchResults(datos) {
            sse("message", JSON.stringify(datos));
        }
        function registerEvents() {
            eventEmitter.on("searchResultsFound", sendSearchResults);
            //eventEmitter.on("rfidRead", sendRfidRead);
            req.once("end", function () {
                eventEmitter.removeListener("searchResultsFound", sendSearchResults);
                //eventEmitter.removeListener("rfidRead", sendRfidRead);
            });
        };
        function sendRfidRead(rfid) {
           // sse("rfidRead", JSON.stringify(rfid));
        };
    });

module.exports = router;
