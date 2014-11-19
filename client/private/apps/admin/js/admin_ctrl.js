(function() {
    var admin_ctrl = angular.module('admin.controllers', ['ui.bootstrap']);

    admin_ctrl.controller('AdminController', function ($http, $log, $modal, User) {
        var ac = this;
        this.users = [];
        this.newUser = {};

        (this.getAll = function () {
            User.getAll(function (data) {
                ac.users = data;
            });
        })();


        this.delete = function (id) {
            User.delete(id, function (data) {
                console.log("Successfully deleted user @ id="+id);
                ac.getAll();
            });
        };

        this.add = function(user) {
            User.add(user, function (data) {
                console.log("Successfully added user " + user.name);
                ac.getAll();
            });
            ac.newUser = {};
        };

        this.open = function () {
            var modalInstance = $modal.open({
                templateUrl: 'modalContent.html',
                controller: 'ModalController as mc',
                resolve: {
                    newUser: function() {
                        return ac.newUser;
                    }
                }
            });

            modalInstance.result.then(function (newUser) {
                ac.add(newUser);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    });

    admin_ctrl.controller('ModalController', function ($modalInstance, newUser) {
        var modalInstance = this;
        this.newUser = newUser;

        this.ok = function () {
            console.log(modalInstance.newUser);
            $modalInstance.close(modalInstance.newUser);
        };

        this.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
})();
