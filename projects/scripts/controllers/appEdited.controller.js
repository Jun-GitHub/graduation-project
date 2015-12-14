/**
 * Created by HJ-PC on 15/8/26.
 *
 *
 */
'use strict';
angular.module('logApp')
    .controller('appEditedCtrl', ['$scope', '$http', '$location', '$cookieStore', function ($scope, $http, $location, $cookieStore) {
        $scope.text = '这里显示app的编辑页面';


        $scope.testShow=function(){
            $scope.test_show=true;
            $scope.test_hide=true;
        };
        $scope.testHide=function(){
            $scope.test_show=false;
            $scope.test_hide=false;
        };


        function fetch_app_info() {
            var id = $location.search().id;
            $http.post(url+'/api/app/getAppInfo', {appID: id}).
                success(function (data) {
                    console.log('fetch from server:', data);
                    $scope.app = data.instance;
                    $scope.appName = $scope.app.appName;
                    $scope.imageUrl = {text: $scope.app.imageUrl};
                    $scope.appDescription = $scope.app.appDescription;
                    $scope.device_type = $scope.app.systemType;
                    $scope.production_ios = {value: $scope.app.production_ios};
                    $scope.package = data.instance.packageName;

                    $scope.android_test = {
                        value: false
                    };
                    $scope.ios_test = {
                        value: false
                    };
                    console.log('设备类型：', $scope.app.systemType);
                    if ($scope.app.systemType == 'android') {

                        $scope.android_test = {
                            value: true
                        };

                        $scope.test_show=false;
                        $scope.test_hide=true;

                        $('#androidDiv').css('display', 'block');
                        $('#iosDiv').css('display', 'none');
                    } else if ($scope.app.systemType == 'ios') {
                        $scope.ios_test = {
                            value: true
                        };

                        $('#androidDiv').css('display', 'none');
                        $('#iosDiv').css('display', 'block');

                    } else {
                        $scope.ios_test = {
                            value: true
                        };
                        $scope.android_test = {
                            value: true
                        };
                        $('#androidDiv').css('display', 'block');
                        $('#iosDiv').css('display', 'block');
                    }

                    if(data.instance.cert_pem =='undefined'||data.instance.cert_pem==''||
                        data.instance.key_pem=='undefined'||data.instance.key_pem==''){
                        $scope.remind = {text: '证书未上传'};
                    }else{
                        $scope.remind = {text: '证书已上传，可更改'};
                    }
                    if(data.instance.test_cert_pem =='undefined'||data.instance.test_cert_pem==''||
                        data.instance.test_key_pem=='undefined'||data.instance.test_key_pem==''){
                        $scope.remind = {text: '证书未上传'};
                    }else{
                        $scope.remind = {text: '证书已上传，可更改'};
                    }

                    //identity production status
                    function get_identity() {
                        return $scope.app.production_ios ? 'true' : 'false'
                    }

                    console.log('production_ios:', get_identity());
                    $scope.production_ios = {
                        value: get_identity()
                    };
                    if($scope.app.production_ios=='true'||$scope.app.production_ios==true){
                        $scope.test_show=false;
                        $scope.test_hide=false;
                    }else{
                        $scope.test_show=true;
                        $scope.test_hide=true;
                    }


                }).
                error(function (err) {
                    console.log('returned error:', err);
                    alert('Internal server error');
                })
        }

        fetch_app_info();


        //选择应用icon图片
        $("#get-appicon").change(function () {
            var objUrl = getObjectURL(this.files[0]);
            console.log("objUrl = " + objUrl);
            if (objUrl) {
                $("#appicon").attr("src", objUrl);
            }
        });


        ////选择证书文件
        //$("#cert_pem_input").change(function() {
        //    var objUrl = getObjectURL(this.files[0]);
        //    var path = $("#cert_pem_input").val();
        //
        //    if (objUrl) {
        //        $("#cert_pem").attr("value", path);
        //    }
        //});
        //$("#key_pem_input").change(function() {
        //    var objUrl = getObjectURL(this.files[0]);
        //    var path = $("#key_pem_input").val();
        //    if (objUrl) {
        //        $("#key_pem").attr("value", path);
        //    }
        //});
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


        $scope.appDescription = '';
        $scope.save_edit = function () {


            if ($scope.ios_test.value == true && $scope.android_test.value == false) {
                $scope.device_type = 'ios';
            } else if ($scope.android_test.value == true && $scope.ios_test.value == false) {
                $scope.device_type = 'android';
            } else if ($scope.ios_test.value == true && $scope.android_test.value == true) {
                $scope.device_type = 'ios&android';
            }


            var device_type = $scope.device_type;
            var appDescription = $scope.appDescription;

            /*for ios*/

            var production_ios = $scope.production_ios.value;

            /*for andriod*/
            var package_name = $scope.package;

            console.log(
                'appDescription', appDescription, '\n',
                'systemType', device_type, '\n',
                'Package', package_name, '\n',
                'production_ios', production_ios, '\n'
            );
            if ($scope.ios_test.value == false && $scope.android_test.value == false) {
                alert('请选择版本类型！');
            }
            else {

                var fileInfo;
                var name;
                var point;
                var type;
                if (!$("#get-appicon").val()) {
                    fileInfo = $scope.imageUrl.text;
                    name = fileInfo;
                    point = name.lastIndexOf('.');
                    type = name.substr(point);
                } else {
                    fileInfo = document.getElementById('get-appicon').files[0];
                    name = fileInfo.name;
                    point = name.lastIndexOf('.');
                    type = name.substr(point);

                }

                console.log('文件信息:', fileInfo);
                //  console.log("file name:", fileInfo.name);


                if (type === '.png' || type === '.PNG'||type === '.jpg' || type === '.JPG') {
                    var FileController = url+"/api/app/updateAppInfo";
                    var form = new FormData();
                    form.append('appID', $location.search().id);
                    form.append('token', $cookieStore.get('token'));
                    form.append('appName', $scope.appName);
                    console.log('appName', $scope.appName);
                    form.append('logo_png', fileInfo);
                    form.append('appDescription', appDescription);
                    form.append('systemType', device_type);

                    var cert_pem = document.getElementById('cert_pem_input').files[0];
                    var test_cert_pem = document.getElementById('test_cert_pem_input').files[0];
                    var key_pem = document.getElementById('key_pem_input').files[0];
                    var test_key_pem = document.getElementById('test_key_pem_input').files[0];
                    //var ios_zip=document.getElementById('ios_zip_input').files[0];
                    //var ios_test_zip=document.getElementById('ios_test_zip_input').files[0];
                    //var android_zip=document.getElementById('android_zip_input').files[0];
                    //var android_test_zip=document.getElementById('android_test_zip_input').files[0];
                    console.log(
                        'cert_pem', cert_pem, '\n',
                        'test_cert_pem', test_cert_pem, '\n',
                        'key_pem', key_pem, '\n',
                        'test_key_pem', test_key_pem, '\n'
                        //'ios_zip', ios_zip, '\n',
                        //'ios_test_zip', ios_test_zip, '\n',
                        //'android_zip', android_zip, '\n',
                        //'android_test_zip', android_test_zip, '\n'
                    );
                    if ($scope.device_type === 'ios') {
                        form.append('production_ios', production_ios);
                        form.append('cert_pem', cert_pem);
                        form.append('test_cert_pem', test_cert_pem);
                        form.append('key_pem', key_pem);
                        form.append('test_key_pem', test_key_pem);
                        //form.append('ios_zip', ios_zip);
                        //form.append('ios_test_zip', ios_test_zip);


                    } else if ($scope.device_type === 'android') {
                        form.append('package', package_name);
                        //form.append('android_zip', android_zip);
                        //form.append('android_test_zip', android_test_zip);
                    } else {
                        form.append('production_ios', production_ios);
                        form.append('cert_pem', cert_pem);
                        form.append('test_cert_pem', test_cert_pem);
                        form.append('key_pem', key_pem);
                        form.append('test_key_pem', test_key_pem);
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
                                    console.log("update app success!");
                                    alert("更新成功！");
                                    window.location.href = '#/appList';
                                } else {
                                    console.log('error:', jsons);
                                    alert("更新失败！");

                                }
                            }
                        }
                    };
                    xhr.send(form);
                } else {
                    alert('请选择png/jpg格式的图片');
                }
            }

        };


    }]);
