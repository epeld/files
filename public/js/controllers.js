"use strict";

var dummyDirectory = [{"name":"git","path":".git","type":"directory"},{"name":".gitignore","path":".gitignore","type":"file"},{"name":"LICENSE","path":"LICENSE","type":"file"},{"name":"README.md","path":"README.md","type":"file"},{"name":"README.md~","path":"README.md~","type":"file"},{"name":"api.js","path":"api.js","type":"file"},{"name":"api","path":"api","type":"directory"}];

angular.module('files', [])

.controller('fsFileController', ['$scope', 'lsdir', function($scope, lsdir) {
    $scope.files = dummyDirectory;

    $scope.lsdir = lsdir;
    
    $scope.testFn = function(file) {
	console.log('You clicked', file);
    };
}])

.factory('lsdir', ['$http', function($http) {
    var result = {
	status: 'pending',
	files: []
    };

    var last;
    
    return function lsdir(file) {
	if(file && file.type !== 'directory') {
	    console.error('Not a directory', file);
	    return;
	}
	if(last === file) {
	    console.log('Returning cached');
	    return result;
	}

	// Reset result blob
	result.status = 'pending';
	result.files = [];

	$http({
	    url: '/api/ls',
	    method: 'GET',
	    params: {
		path: file === null ? '/' : file.path
	    }
	})
	.then(function(response) {
	    console.log('Response', response);
	    result.status = 'ok';
	    _.each(response.data, function(x) {
		result.files.push(x);
	    });
	}, function(err) {
	    result.status = 'error';
	});

	last = file;

	return result;
    }
}])

.directive('fsSimpleExplorer', [function() {
    return {
	replace: true,
	scope: {
	    getFilesInDirectory: '=fsLsdir'
	},
	templateUrl: '/partials/simple-explorer',
	link: function(scope, element, attrs) {
	    var files = scope.files = [];

	    scope.getCurrentFileList = function() {
		return scope.getFilesInDirectory(files.length ? files[files.length - 1] : null);
	    };

	    scope.fileClicked = function(file) {
		if(file.type === 'directory') {
		    files.push(file);
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
