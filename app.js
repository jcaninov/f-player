var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env.PORT || 3000

//var nfcReader = require('./back/nfc-reader.js');
//nfcReader();

//app.use(express.static('./web/app'));
app.use('/', express.static(__dirname + '/web/app'));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,POST'); // 'GET,POST,PUT,HEAD,DELETE,OPTIONS'
	res.header("Access-Control-Allow-Headers", "content-Type,X-Requested-With");
	next();
});

// Controllers
app.use(require('./services/controllers'))

//app.set('views', './web/app/views')
//app.engine('html', require('ejs').renderFile);

// application -------------------------------------------------------------
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/web/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


app.listen(port, function() {
  console.log('Listening on port ' + port)
})
