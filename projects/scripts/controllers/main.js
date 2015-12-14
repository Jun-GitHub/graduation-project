'use strict';

/**
 * @ngdoc function
 * @name logApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the logApp
 */
angular.module('logApp')
  .controller('MainCtrl',[ '$scope',function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
