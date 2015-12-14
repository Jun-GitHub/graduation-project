/**
 * Created by HJ-PC on 15/8/25.
 */


'use strict';
angular.module('logApp')
    .controller('addOperatorCtrl', ['$scope', '$http', '$location', '$cookieStore', function ($scope, $http, $location, $cookieStore) {
        $scope.text = '这里新增用户';


        $scope.userName = {
            "text": ""
        };
        $scope.password = {
            "text": ""
        };
        $scope.repeat = {
            "text": ""
        };
        //$scope.level = {
        //    value: ""
        //};


        $scope.save = function () {
            //var userName=$scope.userName.text;
            //var password=$scope.password.text;
            var level = $scope.level;

            //console.log(
            //    'userName', userName, '\n',
            //    'password', password, '\n',
            //    'level', level, '\n');

            if (!$scope.userName.text) {
                alert('用户名不能为空！');
                $("#useName").focus();
            } else if (!$scope.password.text) {
                alert('请输入新密码,6到16位');
                $("#newPw").focus();
            } else if (!$scope.repeat.text) {
                alert('请输入确认密码');
                $("#repeatPw").focus();
            } else if ($scope.password.text != $scope.repeat.text) {
                alert('两次输入不一致,请重新输入');
                $("#newPw").focus();
            } else if (level == "") {
                alert('请选择用户权限！')
            } else {
                $http.post(url+'/api/operator/addOperator', {
                    "token": $cookieStore.get('token'),
                    "username": $scope.userName.text,
                    "password": $scope.password.text,
                    "inviter": $cookieStore.get('username'),
                    "level": level
                })
                    //success(function (data) {
                    //    console.log('Add user success: ', data);
                    //    if (data.code == 0) {
                    //        console.log('Add user success: ', data);
                    //        alert('添加成功!');
                    //        window.location.href = "#/usermanage";
                    //    }else{
                    //        console.log('Add user failed: ', data);
                    //        alert("添加失败!");
                    //    }
                    //}).error(function (err) {
                    //    console.log('Add user failed: ', err);
                    //    alert("添加失败!");
                    //});

                    .success(function(data) {

                        if (data.code == 0) {
                            console.log('Add user success: ', data);
                            alert('添加成功!');
                            window.location.href = "#/operatorManage";
                        } else {
                            console.log('Add user failed: ', data);
                            alert(data.message);
                        }
                    })
                    .error(function(err){
                        console.log('Add user failed: ', err);
                        alert("添加失败");
                    }
                );


                //var updateController = "http://push.selcome.com/api/operator/updateOperatorInfo";
                //var form = new FormData();
                //form.append('token', $cookieStore.get('token'));
                //form.append('username',userName);
                //form.append('password', password);
                //form.append('inviter', $cookieStore.get('username'));
                //form.append('level', level);
                //
                //var xhr = new XMLHttpRequest();
                //xhr.open("post", updateController, true);
                //xhr.onreadystatechange = function () {
                //    if (xhr.readyState == 4) {
                //        if (xhr.status == 200) {
                //            var str = xhr.responseText;
                //            var jsons = JSON.parse(xhr.responseText);
                //            console.log("returned by server:", jsons);
                //
                //            if (jsons.code == 0) {
                //                console.log("upload app success");
                //                alert("添加成功！");
                //                window.location.href = '#/usermanage';
                //            } else {
                //                console.log('error:', jsons);
                //                alert("添加失败！");
                //
                //
                //            }
                //        } else {
                //            alert('xhr.status != 200');
                //            alert(xhr.responseText);
                //        }
                //    } else {
                //        alert('xhr.readyState != 4');
                //    }
                //};
                //xhr.send(form);


            }
        }

    }]);
