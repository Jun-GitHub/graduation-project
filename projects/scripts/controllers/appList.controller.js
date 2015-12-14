/**
 * Created by HJ-PC on 15/8/20.
 */
'use strict';
angular.module('logApp')
    .controller('appListCtrl', ['$scope', '$http', 'Auth', '$cookieStore', '$location', function ($scope, $http, Auth, $cookieStore, $location) {

        $scope.isLoading = true;

        $scope.data_store = [];


        $scope.userName = $cookieStore.get('username');
        console.log('username',$scope.userName);

        $scope.jumpToUrl = function (path) {

            $location.path(path);

        };
        $scope.type = 'name';
        $scope.type_name = '应用名称';

        $scope.searchParams = {
            limit: 10,
            begin: 0,
            pageNum: 1,
            total: 0
        };

        $scope.pageChange = function (pageNum) {
            if (pageNum < 1 || pageNum > $scope.searchParams.total) {
                return;
            } else {
                $scope.searchParams.pageNum = pageNum;
                $scope.searchParams.begin = (pageNum - 1) * $scope.searchParams.limit;
                refresh();
            }
        };
        function populate(instances) {
            for (var i = 0; i < instances.length; i++) {
                instances[i].idNum = i;
                if (instances[i].title) {
                    if (instances[i].title.length > 18) {
                        instances[i].title = instances[i].title.substring(0, 18) + '...';
                    }
                }
            }
            return instances;
        }


        function refresh() {
            $scope.isLoading = true;
            $http.post(url+'/api/app/getAppList', {
                skip: $scope.searchParams.begin,
                limit: $scope.searchParams.limit
            }).
                success(function (data) {
                    $scope.isLoading = false;
                    console.log('Get appList from server success:', data);
                    $scope.data_store = data.instances.list;
                    $scope.appList = populate(data.instances.list);
                    $scope.searchParams.total = data.instances.pageNum;

                    for (var i = 0; i < data.instances.list.length; i++) {
                        //onLine = true 显示可'下架'操作,false 显示可'上架'操作
                        if (data.instances.list[i].onLine == true || data.instances.list[i].onLine == 'true') {
                            data.instances.list[i].Status = '上架状态';
                            data.instances.list[i].Operate = '下架';
                            data.instances.list[i].Operate_app = '详情';
                        } else {
                            data.instances.list[i].Status = '下架状态';
                            data.instances.list[i].Operate = '上架';
                            data.instances.list[i].Operate_app = '编辑';
                        }
                    }
                }).error(function (err) {
                    console.log('Get appList from server failed:', err);
                    $scope.isLoading = false;
                    alert('数据加载失败')
                })

        }

        refresh();


        $scope.delete = function (id, content) {
            if (content == '上架状态') {
                alert('请先将应用下架！');
                refresh();
            } else {
                var c = confirm('确认要删除该应用吗？');
                if (c == true) {
                    $http.post(url+'/api/app/delete',
                        {appID: id}).
                        success(function (data) {
                            if (data.code == 0) {
                                alert('删除成功');
                                $scope.appList.splice(id, 1);
                                $scope.appList = populateId($scope.appList);
                                refresh();
                            } else {
                                alert('删除失败，请重新操作！');
                                console.log(data);
                                refresh();
                            }
                        }).
                        error(function (err) {
                            alert(err.message);
                            refresh();
                        });
                } else {
                    console.log('取消了删除应用的操作');
                }
            }
        };


        function populateId(instances) {
            for (var i = 0; i < instances.length; i++) {
                instances[i].idNum = i;
            }
            return instances;
        }

        $scope.setOnline = function (id, content, idNum) {

            if (content == '上架状态') {
                var C = confirm('确认要下架该应用吗？');
                if (C == true) {
                    $http.post(url+'/api/app/updateAppInfo', {
                        appID: id,
                        isTop: false,
                        onLine: false
                    }).success(function (data) {
                        if (data.code == 0) {
                            console.log('set Offline success:', data);
                            alert('下架成功');
                            $scope.appList[idNum].Status = '下架状态';
                            $('.download').css('color', 'red');
                            refresh();
                        } else {
                            console.log('set Offline failed:', data);
                            alert('下架失败');
                        }
                    }).error(function (err) {
                        console.log('set Offline failed:', err);
                        alert('下架失败');
                    })
                } else {
                    console.log('取消了下架应用的操作');
                }
            } else {
                var c = confirm('确认要上架该应用吗？');
                if (c == true) {
                    $http.post(url+'/api/app/updateAppInfo', {
                        appID: id,
                        isTop: true,
                        onLine: true
                    }).success(function (data) {
                        if (data.code == 0) {
                            console.log('set Online success:', data);
                            alert('上架成功');
                            $scope.appList[idNum].Status = '上架状态';
                            refresh();

                        } else {
                            console.log('set Online failed:', data);
                            alert('上架失败');
                        }
                    }).error(function (err) {
                        console.log('set Online failed:', err);
                        alert('上架失败');
                    })
                } else {
                    console.log('取消了上架应用的操作');
                }
            }
        };

        $scope.Operate_app = function (id, content) {

            if (content == '编辑') {
                $('.Operate_app').attr('href', '#/appEdited?id=' + id);
            } else if (content == '详情') {
                $('.Operate_app').attr('href', '#/appDetails?id=' + id);
            }


        };

        $scope.download = function (systemType) {
            console.log('systemType:', systemType);



           // if (Status == '上架状态') {
                var c = confirm('确认要下载该App的文件吗?');
                if (c == true) {
                    if (systemType == 'ios') {
                          $('.Operate').attr('href', url + "/public_files/sdk-ios.zip");
                        } else if (systemType == 'android') {
                          $('.Operate').attr('href', url + "/public_files/sdk-android.zip");
                        } else if (systemType == 'ios&android') {
                          $('.Operate').attr('href', url + "/public_files/sdk-ios&android.zip");
                        }else{
                        alert('下载出错，请重新下载！')
                    }

                }else {
                    console.log('取消了下载操作')
                }
            //} else if (Status == '下架状态') {
            //    alert('应用已经下架,无法下载!')



        };

        //$scope.Status = '';
        //$scope.android_zip = '';
        //$scope.android_test_zip = '';
        //$scope.downloadShow = false;
        //$scope.ios_zip_show = false;
        //$scope.android_zip_show = false;
        //$scope.ios_test_zip_show = false;
        //$scope.android_test_zip_show = false;
        //$scope.none_show = false;
        //
        //$scope.Download_show = function (Status, android_zip, android_test_zip, ios_zip, ios_test_zip) {
        //    console.log('ios_zip', ios_zip);
        //    console.log('ios_test_zip', ios_test_zip);
        //    console.log('android_zip', android_zip);
        //    console.log('android_test_zip', android_test_zip);
        //    $scope.downloadShow = true;
        //    $scope.Status = Status;
        //    $scope.android_zip = android_zip;
        //    $scope.android_test_zip = android_test_zip;
        //    $scope.ios_zip = ios_zip;
        //    $scope.ios_test_zip = ios_test_zip;
        //
        //    if (ios_zip == 'undefined' || ios_zip == null) {
        //        $scope.ios_zip_show = false
        //    } else {
        //        $scope.ios_zip_show = true
        //    }
        //    if (android_zip == 'undefined' || android_zip == null) {
        //        $scope.android_zip_show = false
        //    } else {
        //        $scope.android_zip_show = true
        //    }
        //    if (ios_test_zip == 'undefined' || ios_test_zip == null) {
        //        $scope.ios_test_zip_show = false
        //    } else {
        //        $scope.ios_test_zip_show = true
        //    }
        //    if (android_test_zip == 'undefined' || android_test_zip == null) {
        //        $scope.android_test_zip_show = false
        //    } else {
        //        $scope.android_test_zip_show = true
        //    }
        //
        //    if ($scope.ios_zip_show == false && $scope.android_zip_show == false && $scope.ios_test_zip_show == false
        //        && $scope.android_test_zip_show == false) {
        //        $scope.none_show = true;
        //    } else {
        //        $scope.none_show = false;
        //    }
        //};
        //$scope.Download_hide = function () {
        //    $scope.downloadShow = false;
        //    refresh();
        //};


        /**
         * add by kivi
         * 添加搜索方法
         */
        $scope.search = function () {

            if (!$scope.query) {
                // alert('请输入搜索内容');
                refresh();
            } else {

                if (!$scope.type) {
                    alert('请选择搜索条件');
                }

                var adapter = {
                    id: 'appID',
                    name: 'appName',
                    systemType: 'systemType'
                };

                $scope.appList = [];

                $scope.data_store.forEach(function (app) {

                    if (app[adapter[$scope.type]].indexOf($scope.query) !== -1) {
                        $scope.appList.push(app);
                    }
                });
            }
        };


    }]);
