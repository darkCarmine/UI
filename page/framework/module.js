define(["router"], function (router) {
	var depency = [
		"app/config",
		"res/config"
	];
	for (var i in depency) {
		require([depency[i]], function (config) {	
		if (typeof config === "function") {
			config(router.i18n);
		}
		});
	}
});