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
		"transclude": "true",
		"restrict": 'A',
   		"scope": {
   	  		"lmsVisibleToRole": "="
   		},
   		"link": function ($scope, $element, $attr, ctrl, $transclude) {
   		
   			$scope.$watch('lmsVisibleToRole', function(rolesList) {
   				if($element) {
   					if(requiredRoleAvailable(rolesList)) {
   						$element.css('display', 'inherit');
   					}
   				else {
   					$element.css('display', 'none');
   					}
   				}
   				
   			});

   		}

	};
	
}]);