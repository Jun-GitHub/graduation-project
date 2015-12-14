/**
 * Created by HJ-PC on 15/8/26.
 */
'use strict';
angular.module('logApp')
    .controller('operatorManageCtrl', ['$scope', '$http', '$cookieStore', '$location', function ($scope, $http, $cookieStore, $location) {

        $scope.isLoading = true;
        $scope.data_store = [];

        $scope.type = '_id';
        $scope.type_name = '用户id';

        $scope.searchParams = {
            limit: 0,
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

                fetch();
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

        /*get data from server*/
        function fetch() {
            $scope.isLoading = true;
            $http.post(url+'/api/operator/getOperatorList', {
                // skip: $scope.searchParams.begin,
                skip: $scope.searchParams.limit,
                page: $scope.searchParams.pageNum - 1
            })
                .success(function (data) {
                    $scope.isLoading = false;
                    console.log('fetch operator list from server success:', data);
                    $scope.data_store = data.instances.list;
                    $scope.operatorList = populate(data.instances.list);
                    for (var i = 0; i < data.instances.list.length; i++) {

                        if (data.instances.list[i].level == 0 || data.instances.list[i].level == '0') {
                            data.instances.list[i].level_zh = '管理员';
                        } else {
                            data.instances.list[i].level_zh = '普通用户';
                        }
                    }
                    $scope.searchParams.total = data.instances.pageNum;

                })
                .error(function (data) {
                    $scope.isLoading = false;
                    alert('Internal server error');
                    console.log('got error:', data);
                });
        }

        /*load data*/
        fetch();

        $scope.search = function () {

            if (!$scope.query) {
                //alert('请输入搜索内容');
                fetch()
            }else {
                if (!$scope.type) {
                    alert('请选择搜索条件');
                }

                var adapter = {
                    _id: '_id',
                    username: 'username',
                    level_zh: 'level_zh',
                    inviter: 'inviter'

                };

                $scope.operatorList = [];

                $scope.data_store.forEach(function (operator) {
                    if (operator[adapter[$scope.type]].indexOf($scope.query) !== -1) {
                        $scope.operatorList.push(operator);
                    }
                });
            }
        };

        function populateId(instances) {
            for (var i = 0; i < instances.length; i++) {
                instances[i].id = i;
            }
            return instances;
        }

        $scope.delete = function (id) {
            var c = confirm('确认要删除该应用吗？');
            if (c == true) {
                $http.post(url+'/api/operator/delete',
                    {
                        operatorID: id
                    }).
                    success(function (data) {
                        if (data.code == 0) {
                            alert('删除成功');
                            $scope.appList.splice(id, 1);
                            $scope.appList = populateId($scope.appList);
                            fetch();
                        } else {
                            alert('删除失败，请重新操作！');
                            console.log(data);
                            fetch();
                        }
                    }).
                    error(function (err) {
                        alert(err.message);
                        fetch();
                    });
            } else {
                console.log('取消了删除应用的操作');
            }
        };

        $scope.jumpToUrl = function (path) {

            $location.path(path);

        };


    }]);
