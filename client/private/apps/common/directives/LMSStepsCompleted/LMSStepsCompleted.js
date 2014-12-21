(function () {
	//Directive designed for this dummy object
	// {
	// 		"stepperItem": [
	// 	        {
	// 	            "stepDetails": {
	// 	                "stepNo": 1,
	// 	                "stepName": "Title",
	// 	                "stepComplete": true
	// 	            }
	// 	        },
	// 	        {
	// 	            "stepDetails": {
	// 	                "stepNo": 2,
	// 	                "stepName": "Description",
	// 	                "stepComplete": true
	// 	            }
	// 	        },
	// 	        {
	// 	            "stepDetails": {
	// 	                "stepNo": 3,
	// 	                "stepName": "Methods",
	// 	                "stepComplete": true
	// 	            }
	// 	        },
	// 	        {
	// 	            "stepDetails": {
	// 	                "stepNo": 4,
	// 	                "stepName": "Conclusions",
	// 	                "stepComplete": false
	// 	            }
	// 	        },
	// 	        {
	// 	            "stepDetails": {
	// 	                "stepNo": 5,
	// 	                "stepName": "Bilbliography",
	// 	                "stepComplete": false
	// 	            }
	// 	        },
	// 	        {
	// 	            "stepDetails": {
	// 	                "stepNo": 6,
	// 	                "stepName": "Other stuff",
	// 	                "stepComplete": false
	// 	            }
	// 	        }
	// 	    ],
	// 	    "currentStep": 3
	// 	};
	var stepsCompletedModule = angular.module("LMSStepsCompleted", []);
	stepsCompletedModule.directive('lmsStepsTracker', [function () {
		return {
			"restrict": 'A',
			"scope": {
				"stepObject": "="
			},
			"templateUrl": "/static/private/apps/common/PartialViews/StepsCompleted.html",
			"link": function ($scope, $element, $attr, ctrl, $transclude) {
				$scope.moveToStep = function (step) {
					if(step.stepDetails.stepComplete) {
						$scope.stepObject.currentStep = step.stepDetails.stepNo;	
					}
					
				}; 
				$scope.moveNextStep = function () {
					$scope.stepObject.currentStep++;
				};
				$scope.isCurrentStep = function (step) {
					if($scope.stepObject.currentStep === step.stepDetails.stepNo) {
						return true;
					}
					else {
						return false;
					}
				};
				$scope.isCompletedStep = function (step) {
					return step.stepDetails.stepComplete;
				};
			}
		};
	

	}]);
})();

