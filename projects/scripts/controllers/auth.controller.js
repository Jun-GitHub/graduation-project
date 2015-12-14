/**
 * Created by yuansc on 15/1/14.
 */
'use strict';
angular.module('logApp')
    .controller('LoginCtrl', ['$scope', '$http', 'Auth', '$location', '$cookieStore', function ($scope, $http, Auth, $location, $cookieStore) {
        if (Auth.isLoggedIn()) {
            Auth.isLoggedInAsync(function (loggedIn) {
                if (loggedIn) {
                    $location.path('/');
                }
            });
        }
        $scope.loginForm = {};
        var cookieUserCode = localStorage.getItem('palycombLogin');
        if (cookieUserCode) {
            var uncode = unescape(cookieUserCode);
            if (typeof uncode == 'string') {
                var cookieUser = JSON.parse(uncode);
                if (cookieUser && cookieUser.remember) {
                    $scope.loginForm = cookieUser;
                }
            }
        }
        $scope.removeLoginInfo = function () {
            if (!$scope.loginForm.remember) {
                localStorage.removeItem('palycombLogin');
            }
        };
        $scope.login = function () {
            var user = $scope.loginForm;
            var rAuth = Auth.login(user);
            if (rAuth) {
                rAuth.then(function () {

                   // window.location.href = '#/appList';//本地测试添加,可删除
                   // Auth.reload();


                }).catch(function (e) {
                    console.log('-------------------', e);
                });
            }

        };

        $scope.enter = function (event) {
            if (event.keyCode == 13) {
                $scope.login();
            }
        };
        //$http.post("http://push.selcome.com/api/operator/login", $scope.loginForm)
        //  .success(function (data, status, headers, config) {
        //
        //    window.location = "/index.html#/list_notice"
        //  })
        //  .error(function (data, status, headers, config) {
        //  })

    }]);
