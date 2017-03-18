define([], function () {
	var ctrl = ["$scope", function ($scope) {
		var i18n = $scope.i18n;
		$scope.res = i18n.progress;
		$scope.p = {
			maxValue: 100,
			value: 40
		};
	}];

	return ctrl;
});