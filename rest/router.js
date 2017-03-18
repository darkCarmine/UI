var express = require("express");
var router = module.exports = express();
var config = require("../config/config").config;

router.all("*", function (req, res, next) {
	var http = require("http");
	var url = require("url");
	var router_URL = url.parse(config.router_URL || "http://localhost:8080");
	var options = {
		host: router_URL.hostname,
		port: router_URL.port,
		path: router_URL.pathname,
		method: req.method,
		headers: req.headers,
		rejectUnauthorized: false
	};

	var body = JSON.stringify(req.body);
	if (req.body && body != '{}') {
		options.headers["content-length"] = body.length;
	} else {
		options.headers["content-length"] = 0;
	}
	options.headers["content-type"] = "application/json;charset=UTF-8";

	var router_req = http.request(options, function (router_res) {
		// 不断更新数据
	   var body = '';
	   router_res.on('data', function(data) {
	      body += data;
	   });
	   
	   router_res.on('end', function() {
	      // 数据接收完成
	      //console.log(body);
	   });
	   router_res.pipe(res);
	});

	if (options.headers["content-length"] > 0) {
		router_req.write(body);
	}

	req.pipe(router_req);
});