(function () {
	'use strict';


	angular.module('HomePage', ['AppConstants'])

		.controller(
			'HomePageController',
			[
				'$scope',
				'HomePageManager',
				function ($scope, HomePageManager) {
					$scope.manager = HomePageManager;
				}
			]
		);


})();