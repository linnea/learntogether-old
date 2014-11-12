//this is currently the only app route. But in the future there will be many app routes
// This file will be renamed to ITSMODULENAME_route.js
angular.module('appRoutes', [])

	.config([
		'$routeProvider',
		'$locationProvider',
		function ($routeProvider, $locationProvider) {
			$routeProvider

				// user profile page
				.when('/profile', {
					templateUrl: 'views/UserProfile.html',
					controller: 'UserProfController'
				});

			$locationProvider.html5Mode(true);

		}
	]);