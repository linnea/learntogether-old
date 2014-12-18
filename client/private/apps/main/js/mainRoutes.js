//this is currently the only app route. But in the future there will be many app routes
// This file will be renamed to ITSMODULENAME_route.js
angular.module('mainRoutes', [])

	.config([
		'$routeProvider',
		'$locationProvider',
		function ($routeProvider, $locationProvider) {
			$routeProvider

				// homepage
				.when('/', {
					templateUrl: '/static/private/apps/main/views/HomePage.html',
					controller: 'HomePageController'
				})

				// user profile page
				.when('/user-profile', {
					templateUrl: '/static/private/apps/main/views/UserProfile.html',
					controller: 'UserProfileController'
				});

			$locationProvider.html5Mode(true);

		}
	]);