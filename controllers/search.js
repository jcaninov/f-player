var express = require('express'),
	router = express.Router(), 
	events = require('events'), 
	eventEmitter = new events.EventEmitter();

module.exports = function(mpdClient){
	var datos = {};

	router.get('/search/:tag/:tagValue', function (req, res) {
		searchFiles(req.params.tag, req.params.tagValue);
		res.end();
	});

	router.get('/get-tags', function (req, res) {
		var tags = mpdClient.getTagTypes();
		res.json(tags);
	});

	router.post('/save-playlist', function (req, res) {
		var id = req.body.id;
		var items = req.body.items;

		var playlists = mpdClient.getPlaylists();
		if (playlists.indexOf(id) >= 0) {
			mpdClient.clearPlaylist(id);
		}
		items.forEach(function (song) {
			mpdClient.addSongToPlaylistByFile(id, song.file);
		});
		res.end();
	});

	router.get('/update-stream', function(req, res) {
		var sse = startSees(res);
		eventEmitter.on("searchResultsFound", sendChat);
		req.once("end", function () {
			eventEmitter.removeListener("searchResultsFound", sendChat);
		});
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
		function sendChat() {
			sse("message", JSON.stringify(datos));
		}
	});

	function searchFiles(tag, value)
	{
		var params = {};
		params[tag] = value;
		mpdClient.search(params, doSearchResults);
	}

	function doSearchResults(result) {
		var items = [];
		console.log("---------------- Search Results (" + result.length + ")--------------- ");
		result.forEach(function (song) {
			var artist = song.getArtist();
			var title = song.getTitle();
			var file = song.getPath();
			console.log(file + "\t" + artist);
			items.push({
				'artist' : artist,
				'title' : title,
				'file' : file
			});
		});
		datos = items;
		eventEmitter.emit('searchResultsFound');
	}

	return router;
};
