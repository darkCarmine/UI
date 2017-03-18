define([], function () {
	var ctrl = ["$scope", "$rootScope", function ($scope, $rootScope) {
		var i18n = $rootScope.i18n,
			areas = [{
				id: "kvm",
				label: i18n.doublePlane
			}, {
				id: "fusionCompute",
				label: i18n.singlePlane
			}];
		$scope.area = areas[0];
		var name = {
			label: i18n.name,
			required: true,
			type: "textbox",
			value: "",
			show: true
		},
		cluster = {
			label: i18n.cluster,
			required: true,
			type: "textbox",
			value: "",
			show: true
		},
		desc = {
			label: i18n.desc,
			required: false,
			type: "textarea",
			value: "",
			show: true
		},
		pwd = {
			label: i18n.pwd,
			required: true,
			type: "password",
			value: "",
			show: true
		},
		area = {
			label: i18n.area,
			required: true,
			type: "select",
			show: true,
			options: areas,
			select: $scope.area
		};
		$scope.form = [
			name,
			pwd,
			cluster,
			desc,
			area
		];
	}];

	return ctrl;
});