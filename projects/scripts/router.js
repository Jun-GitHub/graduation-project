/**
 * Created by yuansc on 15/1/13.
 */
'use strict';
angular.module('logApp')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/appList.html',
                controller: 'appListCtrl',
                authenticate: true

            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                authenticate: true
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
                //authenticate: true
            })
            .when('/log', {
                templateUrl: 'views/log.html',
                controller: 'LogCtrl',
                authenticate: true
            })
            .when('/code', {
                templateUrl: 'views/code.html',
                controller: 'CodeCtrl',
                authenticate: true
            })
            .when('/userList', {
                templateUrl: 'views/userList.html',
                controller: 'userListCtrl'
                //authenticate:true

            })

            .when('/messageUserList', {
                templateUrl: 'views/messageUserList.html',
                controller: 'messageUserListCtrl'
                //authenticate:true

            })

            .when('/operatorInformation', {
                templateUrl: 'views/operatorInformation.html',
                controller: 'operatorInformationCtrl'
                //authenticate:true

            })
            .when('/operatorManage', {
                templateUrl: 'views/operatorManage.html',
                controller: 'operatorManageCtrl'
                //  authenticate:true

            })
            .when('/operatorDetails', {
                templateUrl: 'views/operatorDetails.html',
                controller: 'operatorDetailsCtrl'

            })
            .when('/operatorEdited', {
                templateUrl: 'views/operatorEdited.html',
                controller: 'operatorEditedCtrl'
                //  authenticate:true

            })
            .when('/addOperator', {
                templateUrl: 'views/addOperator.html',
                controller: 'addOperatorCtrl'
                // authenticate:true

            })
            .when('/appList', {
                templateUrl: 'views/appList.html',
                controller: 'appListCtrl'
                // authenticate:true

            })
            .when('/appAdd', {
                templateUrl: 'views/appAdd.html',
                controller: 'appAddCtrl'
                // authenticate:true

            })
            .when('/appEdited', {
                templateUrl: 'views/appedited.html',
                controller: 'appEditedCtrl'
                // authenticate:true

            })
            .when('/appDetails', {
                templateUrl: 'views/appDetails.html',
                controller: 'appDetailsCtrl'
                // authenticate:true

            })
            .when('/newMessages', {
                templateUrl: 'views/newMessages.html',
                controller: 'newMessagesCtrl'
                // authenticate:true

            })
            .when('/messagesList', {
                templateUrl: 'views/messagesList.html',
                controller: 'messagesListCtrl'
                //authenticate:true

            })
            .when('/transmitDetails', {
                templateUrl: 'views/transmitDetails.html',
                controller: 'transmitDetailsCtrl'
                // authenticate:true

            })
            .when('/updatePassword', {
                templateUrl: 'views/updatePassword.html',
                controller: 'updatePasswordCtrl'
                // authenticate:true

            })

            .otherwise({
                redirectTo: '/'
            });

    }]);
