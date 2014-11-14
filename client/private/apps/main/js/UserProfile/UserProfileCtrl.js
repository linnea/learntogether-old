var userProfileModule = angular.module('UserProfile', []);
userProfileModule.controller('UserProfileController', ['$scope', 'UserProfileManager', function ($scope, userProfileManager) {
	$scope.manager = userProfileManager;
	$scope.getUserId = function () {
		$scope.manager.getUserId();
	}
}]);