/**
 * Created by HJ-PC on 15/8/26.
 */
'use strict';
angular.module('logApp')
    .controller('operatorInformationCtrl', ['$scope', '$http', '$location', '$cookieStore', function ($scope, $http, $location, $cookieStore) {
        $scope.text = '这里显示用户信息界面';

        function fetch_user_info() {

            $http.post(url+'/api/operator/getOperatorInfo', {
                token: $cookieStore.get('token'),
                operatorID: $cookieStore.get('user_id')
            }).
                success(function (data) {
                    console.log('operator info from server:', data);

                    $scope.operator = data.instance;

                }).
                error(function (err) {
                    console.log('fecth operator info failed', err);
                });
        }

        fetch_user_info();




    }]);