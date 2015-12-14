/**
 * Created by HJ-PC on 15/8/26.
 */
'use strict';
angular.module('logApp')
    .controller('messagesListCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $scope.isLoading = true;

        $scope.data_store = [];

        $scope.type = '_id';
        $scope.type_name = '消息id';


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
                if (instances[i]._id) {
                    if (instances[i]._id.length > 18) {
                        instances[i].title = instances[i]._id.substring(0, 18) + '...';
                    }
                }
            }
            return instances;
        }


        function refresh() {
            $scope.isLoading = true;
            $http.post(url+'/api/message/getMessageList', {
                skip: $scope.searchParams.begin,
                limit: $scope.searchParams.limit
            }).success(function (data) {
                $scope.isLoading = false;

                console.log('fetch message list from server success:', data);

                $scope.data_store = data.instances.list;
                $scope.infoList = populate(data.instances.list);

                for (var i = 0; i < data.instances.list.length; i++) {
                    if (data.instances.list[i].sendStatus == 'pending') {
                        data.instances.list[i].sendStatus_zh = '未发送';
                    } else if (data.instances.list[i].sendStatus == 'sending') {
                        data.instances.list[i].sendStatus_zh = '正在发送';
                    } else if (data.instances.list[i].sendStatus == 'finished') {
                        data.instances.list[i].sendStatus_zh = '已发送';
                    } else if (data.instances.list[i].sendStatus == 'canceled') {
                        data.instances.list[i].sendStatus_zh = '已取消发送';
                    } else if (data.instances.list[i].sendStatus == 'failed') {
                        data.instances.list[i].sendStatus_zh = '发送失败';
                    } else {
                        data.instances.list[i].sendStatus_zh = '未知'
                    }
                    if(data.instances.list[i].sendType == 'timer') {
                        data.instances.list[i].sendType_zh = '定时发送';
                    } else{
                        data.instances.list[i].sendType_zh = '立即发送';
                    }
                }


                $scope.searchParams.total = data.instances.pageNum;

                var time = new Date().getTime();
                $scope.localTime = {value: time};


            }).error(function (err) {
                $scope.isLoading = false;
                console.log('fetch message list from server failed:', err);
                alert('数据加载失败')
            })
        }

        $scope.search = function () {

            if (!$scope.query) {
               // alert('请输入搜索内容');
                refresh()
            }else {
                if (!$scope.type) {
                    alert('请选择搜索条件');
                }

                var adapter = {
                    _id: '_id',
                    name: 'name',
                    systemType: 'systemType',
                    sendType_zh: 'sendType_zh',
                    sendStatus: 'sendStatus',
                    appName: 'appName'

                };

                $scope.infoList = [];

                $scope.data_store.forEach(function (info) {
                    if (info[adapter[$scope.type]].indexOf($scope.query) !== -1) {
                        $scope.infoList.push(info);
                    }
                });
            }

        };

        function populateId(instances) {
            for (var i = 0; i < instances.length; i++) {
                instances[i].idNum = i;
            }
            return instances;
        }

        $scope.deleteMessage = function (id) {

            var c = confirm('确定要删除吗');
            if (c == true) {
                $http.post(url+'/api/message/delete', {
                    messageID: id

                }).success(function (data) {
                    if (data.code == 0) {
                        console.log('delete success:', data);
                        alert('删除成功!');
                        $scope.infoList.splice(id, 1);
                        $scope.infoList = populateId($scope.infoList);
                        refresh();
                    } else {
                        console.log('delete success failed:', data);
                        alert('删除失败，请重新操作！');
                        refresh();
                    }
                }).error(function (err) {
                    alert(err);
                    refresh();
                });
            } else {
                console.log('取消了删除应用的操作');
            }
        };

        $scope.isDisabled = false;
        $scope.canceled = function (id, content, idNum) {

            if (content == '未发送') {
                var c = confirm('确定要取消吗?');
                if (c == true) {
                    $http.post(url+'/api/message/updateMessageInfo', {
                        messageID: id,
                        sendStatus: 'canceled'

                    }).success(function (data) {
                        if (data.code == 0) {
                            console.log('cancel send success:', data);
                            alert('取消发送成功!');
                            refresh();
                        } else {
                            console.log('cancel send failed:', data);
                            alert(data.errorInfo + '\n取消发送失败，请重新操作!');
                            refresh();
                        }
                    }).error(function (err) {
                        alert(err);
                        refresh();
                    });
                } else {
                    console.log('取消了操作');
                }
            } else {
                if (content != '正在发送') {
                    $scope.infoList[idNum].isDisabled = true;
                    return false;
                }
            }
        };


        $scope.jumpToUrl = function (path) {

            $location.path(path);

        };


        refresh();


    }]);
