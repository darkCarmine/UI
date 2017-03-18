define(["router"], function (router) {
	router.state("app", "app/list.html", "app/list");

	return function (i18n) {
		router.menu("main", ["app"], "app", i18n.app);
		router.menu("main", ["app", "list"], "app", i18n.app);
		router.menu("main", ["app", "template"], "app.template", i18n.template);	
	}
});