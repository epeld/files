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
	replace: true,
	scope: {
	    getFilesInDirectory: '=fsListDir'
	},
	templateUrl: '/partials/simple-explorer',
	//template: '<div class="file-explorer"><div fs-file-view fs-files="getCurrentFileList()" fs-click="fileClicked($file)"/></div>',
	link: function(scope, element, attrs) {
	    var empty = [];
	    var pathComponents = scope.pathComponents = [];

	    scope.getCurrentFileList = function() {
		console.log('Fetching', pathComponents.join('/'));
		if(!scope.getFilesInDirectory) {
		    console.warn('Can\'t fetch directory listing');
		    return dummyDirectory;
		}
		return scope.getFilesInDirectory(pathComponents);
	    };

	    scope.fileClicked = function(file) {
		if(file.type === 'directory') {
		    pathComponents.push(file.name);
		}
		else {
		    console.warn('Clicked on a file', 'TODO');
		}
	    };
	}
    };
}])

.directive('fsFileView', [function() {
    return {
	replace: true,
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
