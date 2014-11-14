(function() {
    var admin = angular.module('admin', []);

    admin.controller('DatabaseController', ['$http', function($http) {
        var db = this;
        this.users = [];

        this.getUsers = function() {
            $http.get('/api/users').success(function (res) {
                db.users = res.data.users;
                console.log(db.users);
            });
        };

        db.getUsers();

        this.deleteUser = function(id) {
            $http.delete('/api/users/' + id).success(function (res) {
                console.log("clicky!");
                db.getUsers();
            });
        };

    }]);
})();
