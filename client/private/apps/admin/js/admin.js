// todo:
//     : Add proper error handling
//     : Improve logging
//     : admin.add constraints on user object

(function() {

    var admin = angular.module('admin', [
    	'admin.controllers',
        'admin.services',
        'admin.managers'
    ]);

	admin.filter('orderObjectBy', function() {
		return function(items, field, reverse) {
			var filtered = [];
			angular.forEach(items, function(item) {
				filtered.push(item);
			});
			filtered.sort(function (a, b) {
				return (a[field] > b[field] ? 1 : -1);
			});
			if(reverse) filtered.reverse();
			return filtered;
		};
	});


})();