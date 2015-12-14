/**
 * Created by HJ-PC on 15/8/20.
 */

'use strict';
angular.module('logApp')
    .controller('appAddCtrl', ['$scope', '$http', '$location', '$cookieStore', function ($scope, $http, $location, $cookieStore) {

        $scope.ios = false;
        $scope.android = false;

        $scope.test_show = false;
        $scope.test_hide = true;
        $scope.testShow = function () {
            $scope.test_show = true;
            $scope.test_hide = true;
        };
        $scope.testHide = function () {
            $scope.test_show = false;
            $scope.test_hide = false;
        };

        //选择应用icon图片
        $("#get-appicon").change(function () {
            var objUrl = getObjectURL(this.files[0]);
            if (objUrl) {
                $("#appicon").attr("src", objUrl);
            }
        });

        //建立一个可存取到该file的url
        function getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }


        /*新的保存接口*/
        $scope.save_new = function () {

            var device_type;
            if ($scope.ios == true && $scope.android == false) {
                device_type = 'ios'
            } else if ($scope.android == true && $scope.ios == false) {
                device_type = 'android'
            } else if ($scope.android == true && $scope.ios == true) {
                device_type = 'ios&android'
            } else {
                device_type = 'unknown'
            }
            console.log('device_type:', device_type);

            /*for ios*/
            var appName = $scope.appName;
            var appDescription = $scope.appDescription;
            var production_ios = $scope.production_ios;


            /*for andriod*/
            var package_name = $scope.package;

            //console.log(
            //    'appName', appName, '\n',
            //    'appDescription', appDescription, '\n',
            //    'packageName', package_name, '\n',
            //    'production_ios', production_ios, '\n');

            if (!$scope.appName) {
                alert('应用名称不能为空！');
                $('#appName').focus();
            } else if ($scope.ios == false && $scope.android == false) {
                alert('请选择版本类型！');
            } else if ($scope.ios == true && !$scope.production_ios) {
                alert('请选择部署状态！');
            } else if (($scope.production_ios == 'false' || $scope.production_ios == false) && ($('#test_cert_pem_input').val() == '' || $('#test_key_pem_input').val() == '')) {
                alert('请上传开发证书！');
            } else if (($scope.production_ios == 'true' || $scope.production_ios == true) && ($('#cert_pem_input').val() == '' || $('#key_pem_input').val() == '')) {
                alert('请上传生产证书！');
            } else if ($scope.android == true && !$scope.package) {
                alert('请应用输入包名！');
            } else {
                if ($('#get-appicon').val() != '') {
                    var fileInfo = document.getElementById('get-appicon').files[0];
                    console.log('文件信息:', fileInfo);
                    console.log("file name:", fileInfo.name);
                    var name = fileInfo.name;
                    var point = name.lastIndexOf('.');
                    var type = name.substr(point);
                    if (type != '.png' && type != '.PNG' && type != '.jpg' && type != '.JPG' && type != '.jpeg' && type != '.JPEG') {
                        alert('请选择png/jpg/jpeg格式的图片');
                    }
                }
                if(type == '.png' || type == '.PNG' || type == '.jpg' || type == '.JPG' || type == '.jpeg' || type == '.JPEG'||$('#get-appicon').val() == ''){

                    var FileController = url+"/api/app/addApp";
                    var form = new FormData();
                    form.append('token', $cookieStore.get('token'));
                    form.append('isTop', true);
                    form.append('appID', Date.now().toString());
                    form.append('logo_png', fileInfo);
                    form.append('appName', appName);
                    form.append('appDescription', appDescription);
                    form.append('systemType', device_type);

                    var cert_pem = document.getElementById('cert_pem_input').files[0];
                    var test_cert_pem = document.getElementById('test_cert_pem_input').files[0];
                    var key_pem = document.getElementById('key_pem_input').files[0];
                    var test_key_pem = document.getElementById('test_key_pem_input').files[0];
                    //var ios_zip = document.getElementById('ios_zip_input').files[0];
                    //var ios_test_zip = document.getElementById('ios_test_zip_input').files[0];
                    //var android_zip = document.getElementById('android_zip_input').files[0];
                    //var android_test_zip = document.getElementById('android_test_zip_input').files[0];
                    if ($scope.device_type === 'ios') {

                        form.append('cert_pem', cert_pem);
                        form.append('test_cert_pem', test_cert_pem);
                        form.append('key_pem', key_pem);
                        form.append('test_key_pem', test_key_pem);
                        form.append('production_ios', production_ios);
                        //form.append('ios_zip', ios_zip);
                        //form.append('ios_test_zip', ios_test_zip);

                    } else if ($scope.device_type === 'android') {
                        form.append('packageName', package_name);
                        //form.append('android_zip', android_zip);
                        //form.append('android_test_zip', android_test_zip);
                    } else {
                        form.append('cert_pem', cert_pem);
                        form.append('test_cert_pem', test_cert_pem);
                        form.append('key_pem', key_pem);
                        form.append('test_key_pem', test_key_pem);
                        form.append('production_ios', production_ios);
                        //form.append('ios_zip', ios_zip);
                        //form.append('ios_test_zip', ios_test_zip);

                        form.append('packageName', package_name);
                        //form.append('android_zip', android_zip);
                        //form.append('android_test_zip', android_test_zip);
                    }

                    var xhr = new XMLHttpRequest();
                    xhr.open("post", FileController, true);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                var str = xhr.responseText;
                                var jsons = JSON.parse(xhr.responseText);
                                console.log("returned by server:", jsons);
                                    if (jsons.code == 0) {
                                        console.log("upload app success");
                                        alert("添加成功！");
                                        window.location.href = '#/appList';
                                    } else {
                                        console.log('error:', jsons);
                                        alert("添加失败！");
                                }
                            }
                        }
                    };
                    xhr.send(form);
                }
            }
        };


    }]);
