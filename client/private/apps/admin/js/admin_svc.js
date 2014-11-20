(function () {
    var admin_svc = angular.module('admin.services', []);

    admin_svc.service('UserService', function ($http) {
        this.getAll = function(callback) {
            $http.get('/api/users').success(function (data) {
                callback(data);
            });
        };

        this.delete = function(id, callback) {
            $http.delete('/api/users/' + id).success(function (data) {
                callback(data)
            });
        };

        // this should take a user object
        // how should we constrain this?
        this.add = function(user, callback) {
            $http.post('/api/users', user).success(function (data) {
                callback(data);
            });
        };

        this.edit = function(id, user, callback) {
            $http.put('/api/users/' + id, user).success(function (data) {
                callback(data);
            });
        };
    });
})();