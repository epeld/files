"use strict";

angular.module('files', [])

.controller('fsFileController', ['$scope', function($scope) {
    $scope.files = [{"name":"git","path":".git","type":"directory"},{"name":".gitignore","path":".gitignore","type":"file"},{"name":"LICENSE","path":"LICENSE","type":"file"},{"name":"README.md","path":"README.md","type":"file"},{"name":"README.md~","path":"README.md~","type":"file"},{"name":"api.js","path":"api.js","type":"file"},{"name":"api.js~","path":"api.js~","type":"file"}];
}])

.directive('fsFileView', [function() {
    return {
	scope: {
	    files: '=fsFiles'
	},
	templateUrl: '/partials/file-view'
    };
}]);
