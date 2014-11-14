(function() {
    var admin = angular.module('gemStore', []);

    admin.controller('DatabaseControl', ['$http', function($http) {
        var db = this;
        this.users = [];

        $http.get('/api/users').success(function(data){
            db.users = data;
        });
    }]);
})();
