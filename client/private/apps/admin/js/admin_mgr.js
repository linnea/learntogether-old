(function () {
    var admin_mgr = angular.module('admin.managers', []);

    admin_mgr.factory('UserManager', function (UserService) {

        var userManager = {
            users   : {},
            newUser : {},
            editUser: {},

            getAll: function () {
                UserService.getAll(function (userData) {
                    userData = userData.data.users;

                    var usersAssoc = {};
                    userData.forEach(function (user) {
                        usersAssoc[user.id] = user;
                    });

                    userManager.users = usersAssoc;
                });
            },

            get: function() {

            },

            add: function(user) {
                UserService.add(user, function (newUser) {
                    newUser = newUser.data.user;
                    userManager.users[newUser.id] = newUser;
                    console.log("Successfully added user " + user.name);
                });
                userManager.newUser = {};
            },

            edit: function(id, user) {
                UserService.edit(id, user, function (editUser) {
                    editUser = editUser.data.user;
                    delete userManager.users[id];
                    userManager.users[editUser.id] = editUser;
                    console.log("Successfully modified user @ id=" + id);
                });
            },

            delete: function(id) {
                UserService.delete(id, function (data) {
                    delete userManager.users[id];
                    console.log("Successfully deleted user @ id=" + id);
                });
            }
        };

        userManager.getAll();
        return userManager;
    });
})();