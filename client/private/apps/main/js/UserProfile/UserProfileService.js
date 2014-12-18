(function () {

	var userProfileModule = angular.module('UserProfile');
	userProfileModule.service('UserProfileService', ['$q', '$http', function ($q, $http) {
		//$q helps resolve promises
		var deferred = $q.defer(), userProfileService;
		userProfileService = {
			getUserId : function () {
				var promise = $http.get("/api/auth/current");
				promise.then(function (data, status) {
					deferred.resolve(data);
				}, function (data) {
					deferred.reject(data.status);
				});
				return deferred.promise;
			}
		};
		return userProfileService;
	}]);

})();

