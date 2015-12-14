/**
 * Created by HJ-PC on 15/8/27.
 */
'use strict';
angular.module('logApp')
    .controller('transmitDetailsCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $scope.text = '这里显示发送消息详情';

        function getMessageInfo() {
            $http.post(url+'/api/message/getMessageInfo', {
                messageID: $location.search().id
            }).
                success(function (data) {

                    console.log('fetch MessageInfo  from server:', data);
                    $scope.infoCount = data.instance;


                }).error(function (err) {
                    console.log('fail fetch MessageInfo from server:', err);
                    alert('数据加载失败')
                })
        }

        getMessageInfo();
    }]);