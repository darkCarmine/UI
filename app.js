var http = require("http");
var fs = require("fs");
var url = require("url");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use("/", express.static(__dirname + "/page"));

app.use(bodyParser.json({limit: '50mb'}));//json
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));//application/x-www-form-urlencoded

app.use(require(__dirname + "/rest/sso"));

app.use(require(__dirname + "/rest/app"));
app.use(require(__dirname+ "/rest/config"))

app.use(require(__dirname+ "/rest/router"));

app.listen(8080);

/*http.createServer(function (req, res) {
	var pathname = url.parse(req.url).pathname;

	fs.readFile("page/" + pathname.substr(1), function (err, data) {
		if (err) {
			console.log(err);
			res.writeHead(404, {'Content-Type': 'text/html'});
			res.end();
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});

			res.write(data.toString());
			res.end();
		}
	});
}).listen(8443);*/