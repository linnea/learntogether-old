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