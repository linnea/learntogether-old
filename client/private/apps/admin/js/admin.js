(function() {
    var admin = angular.module('admin', []);

    admin.controller('DatabaseController', ['$http', function($http) {
        var db = this;
        this.users = [];

        function getUsers() {
            $http.get('/api/users').success(function (data) {
                db.users = data.data;
                console.log(db.users);
            });
        };

        getUsers();

        function deleteUser(id) {
            $http.delete('/api/users/' + id).success(function (data) {
                console.log("clicky!");
                getUsers();
            });
        };

    }]);
})();
