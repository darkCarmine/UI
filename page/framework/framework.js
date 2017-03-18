define(["./routerConfig",
	"./module",
	"./directive",
	"portal/config"], function (router) {
	var denpency = [
		"ng",
		"ui.router"
	];
	var framework = angular.module("framework", denpency);
	return framework;
});