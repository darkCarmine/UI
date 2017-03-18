define(["router"], function (router) {
	var ctrl = ["$scope", "$state", function ($scope, $state) {
		$scope.menu = router.getMenu("main");

		$scope.subActive = function (m1) {
			if ($state.includes(m1.state)) {
				$scope.select_menu = m1;
				return true;
			}

			return false;
		};
		$scope.active = function (m1) {
			if ($state.includes(m1.state)) {
				return true;
			}

			return false;
		};

		$scope.logout = function () {
			window.location.href = "/logout";
		};
	}];
	return ctrl;
});