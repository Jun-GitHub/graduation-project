/**
 * Created by iy7 on 2015/3/4.
 */

'use strict';
angular.module('logApp')
    .controller('testCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.text = 'Test页面';
    }]);