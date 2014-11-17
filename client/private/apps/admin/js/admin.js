(function() {
    var admin = angular.module('admin', ['ui.bootstrap']);

    //admin.controller('DatabaseController', ['$http', function($http) {
    admin.controller('DatabaseController', function ($http) {
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
                console.log(res.data.user);
                db.getUsers();
            });
        };
    });

    admin.controller('ModalController', function($modal, $log) {
        var modal = this;
        this.items = ['item', 'item2', 'item3'];

        this.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceController as mic',
                size: size,
                resolve: {
                    items: function () {
                        return modal.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                modal.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    });

    admin.controller('ModalInstanceController', function ($modalInstance, items) {
        var modalInstance = this;
        this.items = items;
        this.selected = {
            item: this.items[0]
        };

        this.ok = function () {
            $modalInstance.close(modalInstance.selected.item);
        };

        this.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
})();
