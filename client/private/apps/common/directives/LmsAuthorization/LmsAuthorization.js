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