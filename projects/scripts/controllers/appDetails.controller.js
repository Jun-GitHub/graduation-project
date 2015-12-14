/**
 * Created by HJ-PC on 15/8/26.
 */
'use strict';
angular.module('logApp')
    .controller('appDetailsCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $scope.text = '这里显示app的详情';


        function fetch_app_info() {
            var id = $location.search().id;
            $http.post(url+'/api/app/getAppInfo', {appID: id}).
                success(function (data) {
                    console.log('fetch from server:', data);
                    $scope.app = data.instance;
                    $scope.appname = data.instance.appName;
                    $scope.appDescripe = data.instance.appDescription;


                    console.log('设备类型：', data.instance.systemType);
                    if (data.instance.systemType == 'android') {

                        $scope.androidCheckbox = true;

                    } else if (data.instance.systemType == 'ios') {
                        $scope.iosCheckbox = true;
                    } else {
                        $scope.iosCheckbox = true;
                        $scope.androidCheckbox = true;
                    }

                }).error(function (err) {
                    console.log('returned error:', err);
                    alert('Internal server error');
                })
        }

        fetch_app_info();


    }]);