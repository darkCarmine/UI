define([], function () {
	var ctrl = ["$scope", "$http", function ($scope, $http) {
		$scope.appTable = {
			columns: [
				{
					title: "",
					data: "_head"
				}, {
					title: "id",
					data: "id"
				}, {
					title: "name",
					data: "name"
				}
			],
			data: [],
			template: {}
		};
		$scope.getApps = function () {
			$http.get("/app/list").then(function (data) {
				$scope.appTable.data = data.data;
			});
		};


		function init () {
			$scope.getApps();
		}
		init();
	}];

	return ctrl;
});