/**
 * Created by HJ-PC on 15/8/26.
 */
'use strict';
angular.module('logApp')
    .controller('operatorEditedCtrl', ['$scope', '$http', '$location', '$cookieStore', function ($scope, $http, $location, $cookieStore) {
        $scope.text = '这里显示user的编辑界面';

        $scope.password = {value: ''};
        $scope.repeat = {value: ''};
        //$scope.identity={value:''};

        function fetch_user_info() {
            $http.post(url + '/api/operator/getOperatorInfo', {
                operatorID: $location.search().id
            }).
                success(function (data) {
                    console.log('operator info from server:', data);
                    $scope.operator = data.instance;
                    $scope.password_old = {value: $scope.operator.password};


                    function get_identity() {
                        return $scope.operator.level == 0 ? '0' : '1';
                    }

                    $scope.identity = {
                        value: get_identity()
                    };
                }).
                error(function (err) {
                    console.log('fecth operator info failed', err);
                });
        }

        fetch_user_info();


        $scope.update = function () {
            var password;
            if ($scope.password.value == '' || $scope.password.value == null) {
                password = $scope.password_old.value;
            } else(
                password = $scope.password.value
            );

            if ($scope.password.value != $scope.repeat.value) {
                alert('两次输入不一致,请重新输入');
                $("#password").focus();
            } else {
                var c = confirm('确定要更改吗?');
                if (c == true) {
                    $http.post(url + '/api/operator/updateOperatorInfo', {
                        "token": $cookieStore.get('token'),
                        "operatorID": $location.search().id,
                        "password": password,
                        "level": $scope.identity.value
                    }).success(function (data) {
                        if (data.code == 0) {
                            console.log('update success:', data);
                            alert('修改成功');
                            window.location.href = '#/operatorManage';
                        }

                    }).error(function (err) {

                        console.log('update fail:', err);
                        alert("修改失败");

                    })
                } else {
                    console.log('取消了编辑用户操作');
                }
            }
        }


    }]);
