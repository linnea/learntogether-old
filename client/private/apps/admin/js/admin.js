(function() {
    var admin = angular.module('gemStore', []);

    admin.controller('DatabaseControl', ['$http', function($http) {
        var db = this;
        this.users = [];

        $http.get('ROUTE GOES HERE').success(function(data){
            db.users = data;
        });
    }]);
})();
