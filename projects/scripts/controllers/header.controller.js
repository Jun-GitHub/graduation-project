/**
 * Created by HJ-PC on 15/8/30.
 */
'use strict';
angular.module('logApp')
    .controller('headerCtrl', ['$scope', '$http', 'Auth', '$cookieStore', '$location', function ($scope, $http, Auth, $cookieStore, $location) {

            $scope.userName = {name: $cookieStore.get('username')};
            $scope.user_id = {text: $cookieStore.get('user_id')};




    }]);
