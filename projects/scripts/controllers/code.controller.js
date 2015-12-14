/**
 * Created by yuansc on 15/1/14.
 */
'use strict';
angular.module('logApp')
  .controller('CodeCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.text = '这里显示Code的内容';
  }]);
