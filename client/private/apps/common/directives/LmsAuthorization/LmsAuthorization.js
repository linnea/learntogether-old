var userAuthorizationApp = angular.module('LmsAuthorizationModule', []);

userAuthorizationApp.directive("lmsShowForRole", ['UserModelManager', function (userModel) {
	
	function requiredRoleAvailable(roleList) {
	    var roleAvailable = false;
	    if (angular.isArray(roleList)){
	      roleList.forEach(function(role){
	        if (userModel.hasRole(role)) {
	        	roleAvailable = true;
	        }
	      });
	    }
	    return roleAvailable;
	  }

	return {
		"restrict": 'A',
   		"scope": {
   	  		"lmsVisibleToRole": "@"
   		},
   		"link": function link($scope, $element, $attr, ctrl, $transclude) {

   			$scope.$watch('lmsVisibleToRole', function(rolesList) {
   				if(requiredRoleAvailable(rolesList)) {
   					element.show();
   				}
   				else {
   					element.hide();
   				}
   			});

   		}

	}
	
})];