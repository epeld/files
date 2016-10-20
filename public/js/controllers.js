"use strict";

angular.module('files', [])


.directive('fsFileView', [function() {
    return {
	templateUrl: '/partials/file-view'
    };
}]);
