var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env.PORT || 3000

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,POST'); // 'GET,POST,PUT,HEAD,DELETE,OPTIONS'
	res.header("Access-Control-Allow-Headers", "content-Type,X-Requested-With");
	next();
});

// Controllers
app.use(require('./controllers'))

app.listen(port, function() {
  console.log('Listening on port ' + port)
})
