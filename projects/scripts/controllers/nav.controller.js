/**
 * Created by yuansc on 15/1/14.
 */
'use strict';
angular.module('logApp')
    .controller('AbnTestController', ['$scope', '$location', 'interFace', '$cookieStore', function ($scope, $location, interFace, $cookieStore) {
        var treeData = [
            {
                label: 'APP管理',
                able: true,
                children: [
                    {
                        label: '应用列表',
                        able: true,
                        data: {
                            description: 'appList'
                        }
                    },
                    {
                        label: '新增应用',
                        able: true,
                        data: {
                            description: 'appAdd'

                        }
                    }
                ]
            },
            {
                label: '消息管理',
                able: true,
                children: [
                    {
                        label: '消息列表',
                        able: true,
                        data: {
                            description: 'messagesList'
                        }
                    },
                    {

                        label: '新增消息',
                        able: true,
                        data: {
                            description: 'newMessages'
                        }
                    }
                ]
            },

            {

                label: '设备管理',
                able: true,
                children: [
                    {
                        label: 'user列表',
                        able: true,
                        data: {
                            description: 'userList'
                        }
                    },
                    {
                        label: '已发送消息',
                        able: true,
                        data: {
                            description: 'messageUserList'
                        }
                    }
                ]
            },
            {
                label: '用户管理',
                able: true,
                children: [
                    {
                        label: '用户列表',
                       // able: false,
                        data: {
                            description: 'operatorManage'
                        }
                    },
                    {
                        label: '新增用户',
                       // able: false,
                        data: {
                            description: 'addOperator'
                        }
                    },
                    {
                        label: '个人信息',
                        able: true,
                        data: {
                            description: 'operatorInformation'
                        }
                    },
                    {
                        label: '更改密码',
                        able: true,
                        data: {
                            description: 'updatePassword'
                        }
                    }
                ]
            }
        ];


        $scope.treeData = treeData;
        interFace.selectListKeyMap = {};
        function addKeyMap(obj) {
            if (obj instanceof Array) {
                for (var key in obj) {
                    var val = obj[key];
                    addKeyMap(val);
                }
            } else {
                if (obj.children && obj.children.length > 0) {
                    addKeyMap(obj.children);
                } else {
                    var key = obj.data.description.split('?')[0];
                    interFace.selectListKeyMap[obj.data.description] = obj.label;
                }
            }
        }

        addKeyMap(treeData);
        $scope.treeHandler = function (branch) {
            if (branch.data && branch.data.description) {
                $location.path('/' + branch.data.description);
                $location.url($location.path());
            }
        };

        function admin_show(obj) {
            var level = $cookieStore.get('userLevel');
            console.log('userLevel', level);
            if(level==0||level=='0'){
                obj[3].children[0].able=true;
                obj[3].children[1].able=true;
            }else if(level==1||level=='1'){
                obj[3].children[0].able=false;
                obj[3].children[1].able=false;
            }
        }
        admin_show(treeData);


        //$scope.hide_sidebar=true;
        //$scope.show_sidebar=false;
        //$scope.sidebar_show=function(){
        //    $scope.hide_sidebar=true;
        //    $scope.show_sidebar=false;
        //
        //};
        //$scope.sidebar_hide=function(){
        //
        //    $scope.show_sidebar=true;
        //    $scope.hide_sidebar=false
        //}
    }]);
