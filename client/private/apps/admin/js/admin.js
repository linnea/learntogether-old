(function() {
    var admin = angular.module('admin', ['ui.bootstrap']);

    //admin.controller('DatabaseController', ['$http', function($http) {
    admin.controller('DatabaseController', function ($http) {
        var db = this;
        this.users = [];
        //this.createData = {};

        this.getUsers = function() {
            $http.get('/api/users').success(function (res) {
                db.users = res.data.users;
                console.log(db.users);
            });
        };

        db.getUsers();

        this.deleteUser = function(id) {
            $http.delete('/api/users/' + id).success(function (res) {
                console.log(res.data.user);
                db.getUsers();
            });
        };
    });

    admin.controller('ModalController', function($modal, $log, $http) {
        var modal = this;
        //this.items = ['item', 'item2', 'item3'];
        this.newUser = {};

        this.addUser = function() {
            $http.post('/api/users', modal.newUser).success(function (res) {
                console.log(modal.newUser);
                console.log(res);
                location.reload();

                // Need to figure out how to call db.getUsers from here
                //getUsers();
            });
        };

        this.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'modalContent.html',
                controller: 'ModalInstanceController as mic',
                resolve: {
                    newUser: function() {
                        return modal.newUser;
                    }
                }
            });

            modalInstance.result.then(function (/*selectedItem*/ newUser) {
                modal.addUser(newUser);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    });

    admin.controller('ModalInstanceController', function ($modalInstance, /*items*/ newUser) {
        var modalInstance = this;
        //this.items = items;
        this.newUser = newUser;
        /*this.selected = {
            item: this.items[0]
        };*/

        this.ok = function () {
            $modalInstance.close(modalInstance.newUser);
        };

        this.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
})();
