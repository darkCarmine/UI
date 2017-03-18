var express = require("express");
var router = module.exports = express();

router.get("/app/list", function (req, res) {
	res.status("200").json(
		[
			{
				id: "11111",
				name: "test"
			}, {
				id: "22222",
				name: "test2"
			}, {
				id: "33333",
				name: "test3"
			}, {
				id: "2aa",
				name: "test4"
			},{
				id: "11111",
				name: "test"
			}, {
				id: "22222",
				name: "test2"
			}, {
				id: "33333",
				name: "test3"
			}, {
				id: "2aa",
				name: "test4"
			},{
				id: "11111",
				name: "test"
			}, {
				id: "22222",
				name: "test2"
			}, {
				id: "33333",
				name: "test3"
			}, {
				id: "2aa",
				name: "test4"
			}
		]
	);
});