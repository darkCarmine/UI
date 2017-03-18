var express = require("express");
var router = module.exports = express();

router.get("/getLoginInfo", function (req, res) {
	var attributes = req.session && req.session.attributes;
	if (attributes) {
		res.json({
			user: attributes.user,
			password: attributes.password
		});
	} else {
		res.session = {
			attributes: {
				user: "login-user",
				password: "login-password"
			}
		};
		res.json({
			error: "500",
			user: "login-user",
			password: "login-password"
		});
	}
});

router.post("/token", function (req, res) {
	res.json({
		user: "login-user",
		password: "login-password"
	});
});

router.get("/logout", function (req, res) {
	res.redirect("/");
});