(function () {

	var userProfileModule = angular.module('UserProfile', ["AppConstants"]);
	userProfileModule.controller('UserProfileController', ['$scope', 'UserProfileManager', 'UserRoles', function ($scope, userProfileManager,userRoles) {
		$scope.manager = userProfileManager;

		$scope.userRoles = userRoles.userRoles;
		$scope.getUserId = function () {
			$scope.manager.getUserId();
		}
	}]);

})();