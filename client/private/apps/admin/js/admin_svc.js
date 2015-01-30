(function () {
    var admin_svc = angular.module('admin.services', []);

    admin_svc.service('UserService', function ($http) {
        this.getAll = function(callback) {
            $http.get('/api/v1/users').success(function (data) {
                callback(data);
            });
        };

        this.delete = function(id, callback) {
            $http.delete('/api/v1/users/' + id).success(function (data) {
                callback(data)
            });
        };

        // this should take a user object
        // how should we constrain this?
        this.add = function(user, callback) {
            $http.post('/api/v1/users', user).success(function (data) {
                callback(data);
            });
        };

        this.edit = function(id, user, callback) {
            $http.put('/api/v1/users/' + id, user).success(function (data) {
                callback(data);
            });
        };
    });
})();