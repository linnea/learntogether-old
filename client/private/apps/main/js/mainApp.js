(function () {

	var app = angular.module('LearnTogetherMainApp', [
		'ngRoute',
		'mainRoutes',
		'HomePage',
		'UserProfile',
		'LmsUserModel',
		'LmsAuthorizationModule',
		'LMSStepsCompleted'
	]);

})();