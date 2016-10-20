"use strict";

var dummyDirectory = [{"name":"git","path":".git","type":"directory"},{"name":".gitignore","path":".gitignore","type":"file"},{"name":"LICENSE","path":"LICENSE","type":"file"},{"name":"README.md","path":"README.md","type":"file"},{"name":"README.md~","path":"README.md~","type":"file"},{"name":"api.js","path":"api.js","type":"file"},{"name":"api","path":"api","type":"directory"}];

angular.module('files', [])

.controller('fsFileController', ['$scope', function($scope) {
    $scope.files = dummyDirectory;
    
    $scope.testFn = function(file) {
	console.log("You clicked", file);
    };
}])

.directive('fsSimpleExplorer', [function() {
    return {
	template: '<div class="file-explorer"><div fs-file-view fs-files="getCurrentFileList()" click="fileClicked($file)"/></div>',
	link: function(scope, element, attrs) {
	    scope.getCurrentFileList = function() {
		return dummyDirectory;
	    };

	    scope.fileClicked = function(file) {
		console.log("AHA: ", file.path);
	    };
	}
    };
}])

.directive('fsFileView', [function() {
    return {
	scope: {
	    files: '=fsFiles',
	    click: '&fsClick'
	},
	templateUrl: '/partials/file-view',
	link: function(scope, element, attrs) {
	    scope.fileClicked = function(file) {
		scope.click({
		    $file: file
		});
	    }
	}
    };
}]);
