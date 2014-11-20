(function() {
    var admin_ctrl = angular.module('admin.controllers', ['ui.bootstrap']);

    admin_ctrl.controller('AdminController', function ($http, $log, $modal, UserService, UserManager) {
        var ac = this;
        ac.um = UserManager;

        this.open = function (id) {
            if (id) {
                ac.um.newUser = ac.um.users[id];
            }

            var modalInstance = $modal.open({
                templateUrl: 'modalContent.html',
                controller: 'ModalController as mc',
                resolve: {
                    newUser: function() {
                        return ac.um.newUser;
                    }
                }
            });

            modalInstance.result.then(function (newUser) {
                if (newUser.id) {
                    ac.um.edit(newUser.id, newUser);
                } else {
                    ac.um.add(newUser);
                }
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
                ac.um.newUser = {};
            });
        };
    });

    admin_ctrl.controller('ModalController', function ($modalInstance, newUser) {
        var modalInstance = this;
        this.newUser = newUser;

        this.ok = function () {
            $modalInstance.close(modalInstance.newUser);
        };

        this.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
})();