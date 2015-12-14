/**
 * Created by yuansc on 15/1/30.
 */
'use strict';
angular.module('logApp')
.controller('dialogController', ['$scope', '$modalInstance', 'items',function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);