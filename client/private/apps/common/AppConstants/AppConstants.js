(function () {

	var app = angular.module('AppConstants', []);

	app.constant('UserRoles', {
		"userRoles": {
			"admin": 300,
			"leader": 200,
			"user": 100
		}
	});

})();