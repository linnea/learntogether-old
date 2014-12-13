var userProfileModule = angular.module('UserProfile');
userProfileModule.factory('UserProfileManager', ['UserProfileService', function (userProfileService) {
	
	//Private Variables
	var managerInstance;

	//Manager definition
	managerInstance = {
		//Manager properties accessible using "this"
		userId : null,

		getUserId: function () {
			//promises will not hold "this" property. Copy into variable within function scope
			var manager = this;
			userProfileService.getUserId().then(function (data) {
				manager.userId = data.data.data.user.email;
			}, function (data, status) {
				manager.userId = "Error: " + status
			})
		}
	};
	//Return the entire manager
	return managerInstance;
}]);