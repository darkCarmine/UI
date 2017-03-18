define(["router"], function (router) {
	router.state("res", "res/list.html", "res/list");

	return function (i18n) {
		router.menu("main", ["res"], "res", i18n.res);
		router.menu("main", ["res", "progress"], "res", i18n.progress);
		/*router.menu("main", ["app", "list"], "app.list", "应用");
		router.menu("main", ["app", "template"], "app.template", "模板");*/	
	}
});