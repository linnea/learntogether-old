/* Learn Together minified JS file */var userProfileModule=angular.module("UserProfile",[]);userProfileModule.controller("UserProfileController",["$scope","UserProfileManager",function(a,b){a.manager=b,a.getUserId=function(){a.manager.getUserId()}}]);var userProfileModule=angular.module("UserProfile");userProfileModule.factory("UserProfileManager",["UserProfileService",function(a){var b;return b={userId:null,getUserId:function(){var b=this;a.getUserId().then(function(a){b.userId=a.data.data.email},function(a,c){b.userId="Error: "+c})}}}]);var userProfileModule=angular.module("UserProfile");userProfileModule.service("UserProfileService",["$q","$http",function(a,b){var c,d=a.defer();return c={getUserId:function(){var a=b.get("/api/users/current");return a.then(function(a){d.resolve(a)},function(a){d.reject(a.status)}),d.promise}}}]);var userProfileModule=angular.module("UserProfile",[]);userProfileModule.controller("UserProfileController",["$scope","UserProfileManager",function(a,b){a.manager=b,a.getUserId=function(){a.manager.getUserId()}}]);var userProfileModule=angular.module("UserProfile");userProfileModule.factory("UserProfileManager",["UserProfileService",function(a){var b;return b={userId:null,getUserId:function(){var b=this;a.getUserId().then(function(a){b.userId=a.data.data.email},function(a,c){b.userId="Error: "+c})}}}]);var userProfileModule=angular.module("UserProfile");userProfileModule.service("UserProfileService",["$q","$http",function(a,b){var c,d=a.defer();return c={getUserId:function(){var a=b.get("/api/users/current");return a.then(function(a){d.resolve(a)},function(a){d.reject(a.status)}),d.promise}}}]);var app=angular.module("LearnTogetherMainApp",["ngRoute","mainRoutes","UserProfile"]);angular.module("mainRoutes",[]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/user-profile",{templateUrl:"/static/private/apps/main/views/UserProfile.html",controller:"UserProfileController"}),b.html5Mode(!0)}]);var test="Test success!",app=angular.module("LearnTogetherMainApp",["ngRoute","mainRoutes","UserProfile"]);angular.module("mainRoutes",[]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/user-profile",{templateUrl:"/static/private/apps/main/views/UserProfile.html",controller:"UserProfileController"}),b.html5Mode(!0)}]);var test="Test success!";