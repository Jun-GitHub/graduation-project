'use strict';

/**
 * @ngdoc function
 * @name logApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the logApp
 */
angular.module('logApp')
  .controller('AboutCtrl',['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
