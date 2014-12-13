var userProfileModule = angular.module('UserProfile', []);
userProfileModule.controller('UserProfileController', ['$scope', 'UserProfileManager', function ($scope, userProfileManager) {
	$scope.manager = userProfileManager;
	$scope.currentRoleForTesting = {
		"admin": 300,
		"user": 100,
		"leader": 200	
	};
	$scope.getUserId = function () {
		$scope.manager.getUserId();
	}
}]);