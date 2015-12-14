/**
 * Created by HJ-PC on 15/8/26.
 */
'use strict';
angular.module('logApp')
    .controller('newMessagesCtrl', ['$scope', '$http', '$filter', '$location', '$cookieStore', function ($scope, $http, $filter, $location, $cookieStore) {
        $scope.text = '这里显示新增消息的页面';


        //if sendType is timer,show the time input
        $scope.visible = false;
        $scope.show = function () {
            $scope.visible = true;
            $scope.time = new Date();
            var localtime = $filter('date')($scope.time, 'yyyy-MM-dd HH:mm:ss');
            $scope.startTime = {
                value: localtime
            };
        };
        $scope.hide = function () {
            $scope.visible = false;

        };


        function fetch_app_list() {
            $http.post(url + '/api/app/getAppList', {
                "limit": 100,
                "onLine": "true"

            }).success(function (data) {
                console.log('got success from server:', data);
                $scope.appList = data.instances.list;


            }).error(function (err) {
                console.log('got error from server:', err);
            });
        }

        fetch_app_list();

        $scope.title = {
            text: ''
        };

        $scope.content = {
            text: ''
        };

        $scope.sendType = {
            value: ''
        };
        $scope.startTime = {
            value: ''
        };

        $scope.ios = false;
        $scope.android = false;
        $scope.selected = '';

        //select a  App
        $scope.selectApp = function () {

            if ($scope.selected.systemType == 'ios') {
                $scope.ios = true;
                $scope.android = false;
                $('#ios').attr('disabled', 'disabled');
                $('#android').attr('disabled', 'disabled')
            } else if ($scope.selected.systemType == 'android') {
                $scope.ios = false;
                $scope.android = true;
                $('#ios').attr('disabled', 'disabled');
                $('#android').attr('disabled', 'disabled')
            } else if ($scope.selected.systemType == 'ios&android') {
                $scope.ios = true;
                $scope.android = true;
                $('#ios').removeAttr('disabled', 'disabled');
                $('#android').removeAttr('disabled', 'disabled')

            }
        };


        $scope.submit = function () {


            //get deviceType
            var deviceType;
            if ($scope.ios == true && $scope.android == true) {
                deviceType = 'ios&android';
            } else {
                deviceType = $scope.ios ? 'ios' : 'android';
            }


            var title = $scope.title.text;
            var content = $scope.content.text;
            var sendType = $scope.sendType.value;

            var startTime;
            var systemTime = new Date().getTime();
            if (sendType == 'timer') {
                startTime = get_time();
            } else {

                startTime = systemTime + 60000;   //一分钟后发送
            }
            function get_time() {
                var time = $('#startTime').val().replace(/-/g, '/');
                var date = new Date(time);
                var time_str = date.getTime();
                return time_str;

            }

            console.log('startTime', $('#startTime').val());
            console.log('startTime:', startTime);
            //get image
            var image_png = document.getElementById('image_png_input').files[0];
            console.log('image_png>>>>', image_png);

            // check messageExtra is json
            //
            //var Is_json;
            //if ($('#custom_json').val() != '') {
            //    try {
            //        var messageExtra = JSON.parse($('#custom_json').val());
            //        var isJson = function (obj) {
            //            var is_json = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
            //            return is_json;
            //        };
            //
            //        Is_json = isJson(messageExtra)
            //
            //
            //    } catch (e) {
            //        console.log(e);
            //        Is_json = false
            //    }
            //}


            if (!$scope.selected || $scope.selected == '') {
                alert('请选择目标应用!');
            } else if ($scope.title.text == '') {

                alert('消息标题不能为空!');
                $('#infoTitle').focus();
            } else if ($scope.content.text == '') {
                alert('消息内容不能为空!');
                $('#infoContent').focus();
            }  else if ($scope.ios == false && $scope.android == false) {
                alert('请选择设备类型!');
            } else if (sendType == '') {
                alert('请选择发送类型！');
            } else if (sendType == 'timer' && startTime < systemTime) {
                alert('定时发送的时间，不能小于当前时间！');
            } else {

                //$http.post(url+'/api/message/sendMessage', {
                //    "token": $cookieStore.get('token'),
                //    "appID": $scope.selected.appID,
                //    "name": title,
                //    "message": content,
                //    "image_png": image_png,
                //    "messageExtra": $scope.customJson,
                //    "sendType": sendType,
                //    "systemType": deviceType,
                //    "startTime": startTime
                //
                //})
                //    .success(function (data) {
                //        console.log('returned from server:', data);
                //        alert('添加成功！');
                //        window.location.href = '#/messagesList';
                //    })
                //    .error(function (err) {
                //        console.log('got error from server:', err);
                //        alert('添加失败！')
                //    });

                var FileController = url + '/api/message/sendMessage';
                var form = new FormData();
                form.append('token', $cookieStore.get('token'));
                form.append('appID', $scope.selected.appID);
                form.append('name', title);
                form.append('message', content);
                form.append('image_png', image_png);
                form.append('articleID', $scope.articleID);
                form.append('sendType', sendType);
                form.append('systemType', deviceType);
                form.append('startTime', startTime);


                var xhr = new XMLHttpRequest();
                xhr.open("post", FileController, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            var str = xhr.responseText;
                            var jsons = JSON.parse(xhr.responseText);
                            console.log("returned by server:", jsons);
                            if (jsons.code == 0) {
                                console.log("add new message success");
                                alert("添加成功！");
                                window.location.href = '#/messagesList';
                            } else {
                                console.log('error:', jsons);
                                alert(jsons.message);
                            }
                        }
                    }
                };
                xhr.send(form);

            }
        }
    }]);
