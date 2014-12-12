var userModelApp = angular.module('LmsUserModel', []);
userModelApp.service('UserModelManager', ['UserModelService', '$q', '$log', function (userModelService, $q, $log) {
  "use strict";
  /*
  *PRIVATE PROPERTIES
  */
  var loadingPromise;
  var userModel = {
    //need to set both to false. Temporarily true for testing
    "isLoaded": true,
    "isAuthenticated": true,
    "name": null,
    "email": null,
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
    if(!loadingPromise) {
        loadingPromise = userModelService.getUserAuthorization().then(function (authUser) {
          userModel.isLoaded = true;
          userModel.userRoles = ["Instructor"];
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
      if (_.indexOf(userModel.userRoles, role) >= 0) {
        return true;
      }
    }
    return false;
  };

  /**
    * Checks if current authenticated user is a superuser
    * @returns {boolean|undefined}
  */

  userModel.isUserSuperUser = function () {
    return userModel.hasRole('ADMIN');
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