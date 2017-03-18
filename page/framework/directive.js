define(["router"], function (router) {
	var mod = router;
	function getAttr (scope, attr) {
		return scope.$eval(attr);
	}
	function setAttr(scope, attr, val) {
		eval(["scope." + attr, '=', 'val'].join(""));
	}
	mod.directive("fmView", function ($controller, $compile) {
		return {
			restrict: "EA",
			scope: true,
			link: function (scope, iElement, iAttrs) {
				function loadView () {
					iElement.hide();
					var template = getAttr(scope, iAttrs.template),
					ctrl = getAttr(scope, iAttrs.ctrl)
					locals = {
						$scope: scope
					};

					function load () {
						if (!template) {
							return;
						}
						if (template.indexOf("<") == -1) {
							iElement.load(template, function () {
								$compile(iElement.contents())(scope);
								scope.$apply();
							});
						} else {
							iElement.html(template);
							$compile(iElement.contents())(scope);
						}
						
					}
					

					if (typeof ctrl === "string") {
						require([ctrl], function (ctrl) {
							var ctr =  $controller(ctrl, locals);
							load();
						})
					} else if (typeof ctlr === "function") {
						var ctr = $controller(ctrl, locals);
						load();
					} else {
						load();
					}
					iElement.show();
				}
				scope.$watch(function () {
					return [getAttr(scope, iAttrs.template), getAttr(scope, iAttrs.ctrl)].join();
				}, function (newVal, oldVal) {
					if (newVal !== oldVal) {
						loadView();
					}
				});
				if (iAttrs.show) {

				} else {
					loadView();
				}
			}
		}
	});

	mod.directive("fmTable", function () {
		var config = {
			restrict: "E",
			scope: {
				columns: "=",
				rowData: "=data",
				td: "=",
				tr: "="
			},
			templateUrl: "framework/template/table.html",
			link: function (scope, iElemnt, iAttrs) {
				scope.page = {
					list: [10, 20, 50],
					pageSize: 10,
					index: 1,
					pageList: []
				};
				scope.order = function () {
					//order
				};
				scope.filter = function () {
					scope.rowData = scope.orininalData;
					var i = 0,
						len = scope.columns.length;
					for (i; i < len; i += 1) {
						var column = scope.columns[i];
						if (column.filterKey) {
							scope.rowData = scope.rowData.filter(function (val, key) {
								return val[column.data].indexOf(column.filterKey) > -1;
							});
						}
					}
				};
				scope.paging = function () {
					scope.page.pageList = [];
					var page = Math.ceil(scope.total/scope.page.pageSize);
					for (var i = 0; i < page; i += 1) {
						scope.page.pageList.push(i + 1);
					}
				};
				scope.changePageSize = function () {
					//更改每页显示条数
				};
				scope.selectPage = function (p) {
					//跳到指定页码
					scope.page.index = p;
					scope.changePage();
				};

				scope.changePage = function () {
					scope.filter();
					scope.total = scope.rowData.length;
					scope.paging();
					var arr= scope.rowData;
					scope.rows = arr.slice((scope.page.index - 1) * scope.page.pageSize, 
						scope.page.index * scope.page.pageSize);
				}
				scope.$watch("rowData", function (newVal, oldVal) {
					if (!oldVal.length) {
						scope.orininalData = newVal;
						scope.changePage();
					}
				});
			}
		};

		return config;
	});

	mod.directive("fmDialog", function () {
		var config = {
			restrict: "EA",
			scope: {
				caption: "=",
				template: "=",
				ctrl: "=",
				show: "=",
				width: "=",
				height: "="
			},
			templateUrl: "framework/template/dialog.html",
			link: function (scope, iElement, iAttrs) {
				scope._close = function () {
					scope.show = false;
				}
				scope.$watch("show", function (newVal, oldVal) {
					if (newVal) {
						var option = {
							left: ($("body").width() - (scope.width || 480))/2,
							width: scope.width || 480,
							height: scope.height || 240
						};
						iElement.find(".dialog").css(option);
					}
				});
			}
		};

		return config;
	});

	mod.directive("fmDrag", function () {
		var config = {
			restrict: "EA",
			link: function (scope, iElement, iAttrs) {
				iElement.mousedown(function (e) {
					var parent = $(this).parent(),
						p = parent.position(),
						o = {left: e.pageX, top: e.pageY};
					parent.css({cursor: "move"});
					$("body").mousemove(function (e) {
						e.preventDefault();
						var css = {
							cursor: "move",
							left: p.left + e.pageX - o.left,
							top: p.top + e.pageY - o.top
						};
						parent.css(css);
					});

					function unbind (e) {
						parent.css({cursor: "auto"});
						$("body").unbind("mousemove");
					}
					iElement.mouseup(unbind);
				});
			}
		};

		return config;
	});

	mod.directive("fmTemplate", function () {
		var config = {
			restrict: "EA",
			link: function (scope, iElement, iAttrs) {
				iElement.hide();
				setAttr(scope, iAttrs.html, iElement.html());
			}
		};

		return config;
	});

	mod.directive("fmProgress", function () {
		var config = {
			restrict: "E",
			scope: {
				maxValue: "=",
				value: "="
			},
			templateUrl: "framework/template/progress.html",
			link: function (scope, iElement, iAttrs) {
				scope.percent = (scope.value/scope.maxValue)*100;
			}
		};

		return config;
	});

	mod.directive("fmForm", function () {
		var config = {
			restrict: "E",
			scope: {
				form: "="
			},
			templateUrl: "framework/template/form.html",
			link: function (scope, iElement, iAttrs) {
			}
		};

		return config;
	});

	return mod;
});