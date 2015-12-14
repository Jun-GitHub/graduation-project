/**
 * Created by HJ-PC on 15/10/12.
 */
'use strict';
angular.module('logApp')
    .controller('updatePasswordCtrl', ['$scope', '$http', '$filter', '$location', '$cookieStore', function ($scope, $http, $filter, $location, $cookieStore) {

        $scope.update = function () {
            if (!$scope.password || $scope.password=='' ) {
                alert('请输入新密码,6到16位');
                $("#password").focus();
            } else if (!$scope.repeat||$scope.repeat == '') {
                alert('请确认密码');
                $("#repeatPassword").focus();
            } else if ($scope.password != $scope.repeat) {
                alert('两次输入不一致,请重新输入');
                $("#password").focus();
            } else {

                $http.post(url+'/api/operator/updateOperatorInfo', {
                    token: $cookieStore.get('token'),
                    operatorID: $cookieStore.get('user_id'),
                    password: $scope.password
                }).success(function (data) {
                    if (data.code == 0) {
                        alert('修改密码成功,请重新登录！');
                        window.location.href = "#/login";

                    } else {
                        console.log(data.message);
                        alert('修改密码失败，请重新操作！');

                    }

                }).
                    error(function (data) {
                        alert(data);
                    });
            }
        }
    }]);