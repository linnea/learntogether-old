var userModelApp = angular.module('LmsUserModel', []);
userModelApp.service('UserModelManager', ['UserModelService', '$q', '$log', function (userModelService, $q, $log) {
	"use strict";
	/*
	*PRIVATE PROPERTIES
	*/
	var loadingPromise;
	var userModel = {
		//need to set to false. Temporarily true for testing
		"isLoaded": true,
		"isAuthenticated": false,
	    "roles": []
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
    	if(userModel.isLoaded) {
    		//remove these lines when service is ready
    		userModel.userRoles = ["Instructor", "Assistant"];
    		return userModel;
    	}
    	else {
    		if(!loadingPromise) {
    			loadingPromise = userModelService.getAuthenticatedUser()
    			.then(function (authUser) {

    				return userModel;

    			}, function (error) {
    				$log.error('Could not authenticate the user because :' + JSON.stringify(cause));
    				userModel.isLoaded = true;
    				userModel.isAuthenticated = false;
    				userModel.failureCause = createMessageObj(cause);
    				return $q.reject(userModel.failureCause);

    			});
    		}
    	}
    	return loadingPromise;
    }

	// PUBLIC DATA & METHODS

	/**
 	* Provides array of all the roles assigned to current authenticated user
	* @returns {Array}
	*/
	userModel.getRoles = function () {
		if (userModel.isAuthenticated) {
    		return userModel.userRoles;
    	}
	};

	/**
  	*  Checks if current authenticated user has a role
  	* @param {string} role - role to be checked
   	* @returns {boolean|undefined}
   	*/
  	userModel.hasRole = function (role) {
	    if (userModel.isAuthenticated && angular.isArray(userModel.userRoles)) {
	      if (_.findWhere(userModel.userRoles, {name: role})) {
	        return true;
	      }
	    }

	    return false;
	};

	userModel.isUserSuperUser = function () {
    	return userModel.hasRole('ADMIN');
  	};

  	userModel.whenInitialized = function () {
    	if (userModel.isLoaded && !userModel.isAuthenticated) {
      		return $q.reject(userModel.failureCause);
    	} else {
    		return $q.when(init());
    	}
  	};

  	init();

  	return userModel;  
}]);