var userModelApp = angular.module('LmsUserModel');
userModelApp.service('UserModelService', ['$q', '$http', function ($q, $http) {
	var deferred = $q.defer(), userModelService;
	userModelService = {
		getUserAuthorization : function () {
			var promise = $http.get('/api/auth/current');
			promise.then(function (data) {
				deferred.resolve(data);
			}, function (error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}
	};

	return userModelService;
}]);