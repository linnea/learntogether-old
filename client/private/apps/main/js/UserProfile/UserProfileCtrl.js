(function () {

	var userProfileModule = angular.module('UserProfile', ["AppConstants"]);
	userProfileModule.controller('UserProfileController', ['$scope', 'UserProfileManager', 'UserRoles', function ($scope, userProfileManager,userRoles) {
		$scope.manager = userProfileManager;

		$scope.userRoles = userRoles.userRoles;
		$scope.getUserId = function () {
			$scope.manager.getUserId();
		}

		$scope.trialStepObject = {
			"stepperItem": [
		        {
		            "stepDetails": {
		                "stepNo": 1,
		                "stepName": "Title",
		                "stepComplete": true
		            }
		        },
		        {
		            "stepDetails": {
		                "stepNo": 2,
		                "stepName": "Description",
		                "stepComplete": true
		            }
		        },
		        {
		            "stepDetails": {
		                "stepNo": 3,
		                "stepName": "Methods",
		                "stepComplete": true
		            }
		        },
		        {
		            "stepDetails": {
		                "stepNo": 4,
		                "stepName": "Conclusions",
		                "stepComplete": false
		            }
		        },
		        {
		            "stepDetails": {
		                "stepNo": 5,
		                "stepName": "Bilbliography",
		                "stepComplete": false
		            }
		        },
		        {
		            "stepDetails": {
		                "stepNo": 6,
		                "stepName": "Other stuff",
		                "stepComplete": false
		            }
		        }
		    ],
		    "currentStep": 3
		};



	}]);

})();