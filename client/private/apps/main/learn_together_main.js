var dynamicInjector = angular.module('DynamicStaticFileInjector', []);

var userModelApp = angular.module('LmsUserModel', []);
userModelApp.service('UserModelManager', ['UserModelService', '$q', '$log', function (userModelService, $q, $log) {
  "use strict";
  /*
  *PRIVATE PROPERTIES
  */
  var loadingPromise;
  var userModel = {
    //need to set both to false. Temporarily true for testing
    "isLoaded": false,
    "isApproved": false,
    "isAdmin": false,
    "firstName": null,
    "lastName": null,
    "email": null,
    "role": null
  };

  /*
  *PRIVATE METHODS
  */
  function createMessageObj(cause) {
      return {
        "messageCode": "NOT_AUTHENTICATED",
        "message": "Could not authenticate the user",
        "causeBy": cause,
        
      };
  }

  function init() {
    if(!loadingPromise) {
        loadingPromise = userModelService.getUserAuthorization().then(function (data) {
          var authUser = data.data.data.user;
          userModel.isLoaded = true;
          userModel.firstName = authUser.firstName;
          userModel.lastName = authUser.lastName;
          userModel.isApproved = authUser.isApproved;
          userModel.isAdmin = authUser.isAdmin;
          userModel.email =authUser.email;
          userModel.role = authUser.role;
          //Perform necessary data and business tuning here
          return userModel;
        }, function (error) {
          $log.error('Could not authenticate the user because :' + JSON.stringify(cause));
          userModel.isLoaded = true;
          userModel.failureCause = createMessageObj(cause);
          return $q.reject(userModel.failureCause);

        });
      }
        
  }

  // PUBLIC DATA & METHODS

  /**
  * Provides array of all the roles assigned to current authenticated user
  * @returns {Array}
  */
  userModel.getRoles = function () {
    if (userModel.isAuthenticated) {
        return userModel.role;
      }
  };

  /**
    *  Checks if current authenticated user has a role
    * @param {string} role - role to be checked
    * @returns {boolean|undefined}
  */
  userModel.hasRole = function (role) {
    if (angular.isArray(userModel.role)) {
      if (_.indexOf(userModel.role, role) >= 0) {
        return true;
      }
    }
    else if(angular.equals(userModel.role, role)) {
      return true;
    }
    return false;
  };


  /**
    *  Checks if current authenticated user has a role
    * @param {string} role - role to be checked
    * @returns {boolean|undefined}
  */
  userModel.hasAuthorization = function (role) {
    var isAuthorized = false;

    if (angular.isArray(userModel.role)) {
      userModel.role.forEach(function (userRole) {
        if(userRole >= role) {
          isAuthorized = true;
        }
      });
    }
    else if(userModel.role >= role) {
      isAuthorized = true;
    }
    return isAuthorized;
  }


  /**
    * Checks if current authenticated user is a superuser
    * @returns {boolean|undefined}
  */

  userModel.isUserSuperUser = function () {
    return userModel.hasRole(300);
  };

  /**
    * Checks if UserModel has been initialized - maintains singleton status
    * @returns {promise}
  */

  userModel.whenInitialized = function () {
    return loadingPromise;
  }

  init();

  return userModel;  
}]);
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
var userAuthorizationApp = angular.module('LmsAuthorizationModule', []);

userAuthorizationApp.directive("lmsShowForRole", ['UserModelManager', function (userModel) {
	
	function requiredRoleAvailable(roles) {
	    var roleAvailable = false;
	    if (angular.isArray(roles)){
	      roleList.forEach(function(role){
	        if (userModel.hasAuthorization(role)) {
	        	roleAvailable = true;
	        }
	      });
	    }
        else if(roles) {
            if(userModel.hasAuthorization(roles)) {
                roleAvailable = true;
            }
        }
	    return roleAvailable;
	  }

	return {
		"transclude": "true",
		"restrict": 'A',
   		"scope": {
   	  		"lmsVisibleToRole": "="
   		},
   		"link": function ($scope, $element, $attr, ctrl, $transclude) {
   		
   			$scope.$watch('lmsVisibleToRole', function(rolesList) {
   				userModel.whenInitialized().then(function () {
                    if($element) {
                        if(requiredRoleAvailable(rolesList)) {
                            $element.css('display', 'inherit');
                        }
                        else {
                            $element.css('display', 'none');
                        }
                    }                   

   				}, function (error) {});
   				
   				
   			});

   		}

	};
	
}]);
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
var app = angular.module('LearnTogetherMainApp', [
	'ngRoute',
	'mainRoutes',
	'UserProfile',
	'LmsUserModel',
	'LmsAuthorizationModule'
]);
//this is currently the only app route. But in the future there will be many app routes
// This file will be renamed to ITSMODULENAME_route.js
angular.module('mainRoutes', [])

	.config([
		'$routeProvider',
		'$locationProvider',
		function ($routeProvider, $locationProvider) {
			$routeProvider

				// user profile page
				.when('/user-profile', {
					templateUrl: '/static/private/apps/main/views/UserProfile.html',
					controller: 'UserProfileController'
				});

			$locationProvider.html5Mode(true);

		}
	]);