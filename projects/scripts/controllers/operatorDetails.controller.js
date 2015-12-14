/**
 * Created by HJ-PC on 15/8/26.
 */
'use strict';
angular.module('logApp')
    .controller('operatorDetailsCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $scope.text = '这里显示user的信息详情';

        function fetch_user_info() {

            $http.post(url+'/api/operator/getOperatorInfo', {
                operatorID: $location.search().id
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