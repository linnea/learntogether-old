(function () {
    var admin_mgr = angular.module('admin.managers', []);

    admin_mgr.factory('UserManager', function (UserService) {

        var userManager = {
            users   : {},
            newUser : {},

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

            add: function(user) {
                UserService.add(user, function (newUser) {
                    newUser = newUser.data.user;
                    userManager.users[newUser.id] = newUser;
                    console.log("Successfully added user " + user.firstName + " " + user.lastName);
                });
                userManager.newUser = {};
            },

            edit: function(id, user) {
                UserService.edit(id, user, function (newUser) {
                    newUser = newUser.data.user;
                    delete userManager.users[id];
                    userManager.users[newUser.id] = newUser;
                    console.log("Successfully modified user @ id=" + id);
                });
                userManager.newUser = {};
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