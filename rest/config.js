var express = require("express");
var xlsx = require("node-xlsx");
var path = require("path");
var router = module.exports = express();

router.get("/i18n", function (req, res) {
	var i18nPath = path.resolve(process.execPath, "../config/i18n.xlsx");
	var obj = xlsx.parse(i18nPath);
	var lang = "zh-cn";
	var i18n = {};

	for (var i = 0 ; i < obj.length; i += 1) {
		var data = obj[i].data;
		var head = data[0];
		for (var key = head.length; key > 0 ; key -= 1) {
			if (head[key] == lang) {
				break;
			}
		}

		for (var j = 1; j < data.length; j += 1) {
			var e = data[j];
			i18n[e[0]] = e[key];
		}
	}
	res.jsonp(i18n);
});