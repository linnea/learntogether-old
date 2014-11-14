//this is currently the only app route. But in the future there will be many app routes
// This file will be renamed to ITSMODULENAME_route.js
angular.module('appRoutes', [])

	.config([
		'$routeProvider',
		'$locationProvider',
		function ($routeProvider, $locationProvider) {
			$routeProvider

				// user profile page
				.when('/user-profile', {
					templateUrl: 'views/UserProfile.html',
					controller: 'UserProfileController'
				});

			$locationProvider.html5Mode(true);

		}
	]);