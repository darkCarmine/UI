require.config({
	baseUrl: "./",
	map: {
		"*": {
		"router": "framework/routerConfig",
		}
	},
	paths: {
		"jquery": "lib/jquery-3.1.1",
		"angular": "lib/angular.min",
		"ui-router": "lib/angular-ui-router",
		"services": "portal/services"
	},
	shim: {
		"angular": {
			exports: "angular",
			deps: ["jquery"]
		},
		"ui-router": {
			exports: "ui-router",
			deps: ["angular"]
		}
	},
	priority: "angular"

});

require(["framework/framework", "angular", "jquery"], function (app, angular, $) {
	angular.bootstrap($("html"), [app.name]);
});