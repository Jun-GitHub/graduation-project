/**
 * Created by yuansc on 15/1/14.
 */

angular.module('logApp')
    .controller('RootCtrl', ['$scope', '$location', 'Auth', 'interFace', '$cookieStore', '$http', function ($scope, $location, Auth, interFace, $cookieStore, $http) {
        $scope.Math = window.Math;

        $scope.isSpecificPage = function () {
            var path = $location.path();
            return _.contains(["/login", "/pages/500", "/pages/login"], path);
        };
        $scope.logout = function () {
            Auth.logout();
        };
        //确认退出
        $scope.confirmLogout = function () {

            confirmln('真的要退出吗?', Auth.logout);
        };

        // 检索条件
           $scope.search_gameNameAndGameIds = [];


        // 编辑
            $scope.gameNameAndGameIds = [];


        $scope.pageBack = function () {
            history.go(-1);
        }

        $scope.version = '0.0.2.9';

        $scope.platforms = [
            {
                "platform": 1,
                "platformName": "IOS"
            },
            {
                "platform": 2,
                "platformName": "Android"
            },
            {
                "platform": 3,
                "platformName": "全部"
            },
            {
                "platform": 4,
                "platformName": "个人玩家"
            }
        ],
            $scope.serverUrl = {};

        $scope.payClassList = [];


        $scope.systemNickName = "中国网";
        $scope.logoURL = "../images/login_logo.png";

        $scope.updateStaticData = function () {

            var strParam=localStorage.getItem('loginData');
            if (strParam) {
                $scope.username = JSON.parse(strParam).username;
                console.log('username',$scope.username)
            }else{
                window.location.href="#/login"
            }

        };
        $scope.updateStaticData();

         $scope.appList = [];
        function checkIsAdmin() {
            if (!interFace.setSelectListTreeDataAble) {
                return;
            }
            var cookDataString = localStorage.getItem('loginData');
            var cookData = JSON.parse(cookDataString);
            //var cookData = $cookieStore.get('loginData');
            if (!cookData) {
                interFace.setSelectListTreeDataAble('用户列表', false);
                interFace.setSelectListTreeDataAble('新增用户', false);
                return;
            }
            if (interFace.setSelectListTreeDataAble) {
                if (cookData.level != 0) {
                    interFace.setSelectListTreeDataAble('用户列表', false);
                    interFace.setSelectListTreeDataAble('新增用户', false);
                } else {
                    interFace.setSelectListTreeDataAble('用户列表', true);
                    interFace.setSelectListTreeDataAble('新增用户', true);
                }
            }
        }

        $scope.cms_Select_Name = '';
        $scope.alignSelect = function (name) {
            if (interFace.alignSelect) {
                $scope.cms_Select_Name = name;
                return interFace.alignSelect(name);
            }
        };

        $scope.getTotalNumber = function (obj) {
            if (!obj) {
                return;
            }
            var total = 0;
            for (var i in obj) {
                total += parseInt(obj[i]);
            }
            return total;
        }

        $scope.getGameName = function (gameId) {
            for (var i = 0; i < $scope.gameNameAndGameIds.length; i++) {
                if ($scope.gameNameAndGameIds[i].gameAppId == gameId) {
                    return $scope.gameNameAndGameIds[i].gameName;
                }
            }
            return "未知游戏"
        };

        $scope.toMoneyType = function (money) {
            var re = /^[0-9]+.?[0-9]*$/;
            if (re.test(money)) {
                var strArray = (money + "").split('');
                var count = 0;
                var str = "";
                for (var i = strArray.length - 1; i >= 0; i--) {
                    if (count != 0 && count % 3 == 0) {
                        str = ',' + str;
                    }
                    str = strArray[i] + str;
                    count++;
                }
                return str;
            } else {
                return money;
            }
        }
        $scope.href = function (str) {
            console.log(str);
            window.location.href = str
        }


        $scope.markShow = function () {
            $(".ajaxLoading").show();
            $(".alertmask").show();
        };
        $scope.markHide = function (message) {
            $(".ajaxLoading").hide();
            if (message) {
                alertln(message);
            } else {
                $(".alertmask").hide();
            }
        };

        //日期转化
        $scope.getTime_ymd_hms = function (timeStamp) {
            if (!!!timeStamp) {
                return '';
            }
            if (!isNaN(timeStamp)) {
                if (timeStamp < 1000000000000) {
                    timeStamp = timeStamp * 1000;
                }
            }
            var date = new Date(timeStamp);
            if (date.toDateString() == 'Invalid Date') {
                if (timeStamp.indexOf('-') > 0) {
                    timeStamp = timeStamp.replace(/(\s\d{1,2})-(\d{1,2})-(\d{1,2})$/, "$1:$2:$3");
                    date = new Date(timeStamp);
                } else {
                    timeStamp = parseInt(timeStamp);
                    date = new Date(timeStamp);
                }
                if (date.toDateString() == 'Invalid Date') {
                    console.log(timeStamp);
                    return;
                }
            }
            return date.getFullYear() + '/' +
                (date.getMonth() + 1 < 10 ? '0' + new String(date.getMonth() + 1) : date.getMonth() + 1) + '/' +
                (date.getDate() < 10 ? '0' + new String(date.getDate()) : date.getDate()) + '  ' +
                (((date.getHours() % 12 == 0 ? date.getHours() + 12 : date.getHours())) < 10 ? '0' + ((date.getHours() % 12 == 0 ? date.getHours() + 12 : date.getHours())) : ((date.getHours() % 12 == 0 ? date.getHours() + 12 : date.getHours())) == 24 ? '00' : ((date.getHours() % 12 == 0 ? date.getHours() + 12 : date.getHours())) < 10 ? '0' + ((date.getHours() % 12 == 0 ? date.getHours() + 12 : date.getHours())) : ((date.getHours() % 12 == 0 ? date.getHours() + 12 : date.getHours()))) + ':' +
                (date.getMinutes() < 10 ? '0' + new String(date.getMinutes()) : date.getMinutes())
        };


        //http请求
        $scope.cmsHttp = function (type, url, param, succ) {
            if (!(typeof param == 'object')) {
                alertln("param数据类型错误");
            }
            if (typeof succ != 'function') {
                alertln("succ数据类型错误");
            }
            switch (type) {
                case 'post':
                    httpPost(url, param, succ);
                    break;
                case 'get':
                    httpGet(url, param, succ);
                    break;
                default :
                    alertln("请求type出错");
                    return;
            }
        };

        function httpPost(url, param, succ) {
            $('.lodingIcon18px').show();
            $http.post(url, param)
                .success(function (data, status, headers, config) {
                    $('.lodingIcon18px').hide();
                    if (status != '200') {
                        return alertln("error:" + status);
                    }
                    if (data.code != 0) {
                        return alertln(data.message);
                    }
                    succ(data, headers, config);
                })
                .error(function (data, status, headers, config) {
                    //    console.log(data);
                    alertln("error:" + status);
                })
        }

        function httpGet(url, param, succ) {
            var strParam = "";
            for (var name in param) {
                if (strParam != "") {
                    strParam += '&'
                }
                strParam += name + '=' + param[name];
            }
            url = url + strParam;
            $('.lodingIcon18px').show();
            $http.get(url)
                .success(function (data, status, headers, config) {
                    $('.lodingIcon18px').hide();
                    if (status != '200') {
                        return alertln("error:" + status);
                    }
                    if (data.code != 0) {
                        return alertln(data.message);
                    }
                    succ(data, headers, config);
                })
                .error(function (data, status, headers, config) {
                    //    console.log(data);
                    alertln("error:" + status);
                })
        }

        $scope.systemUpdateTime = "DEMO";




        $scope.show_sidebar=false;

        //show sidebar-wrapper
        $scope.sidebar_show=function(){
            $('#sidebar-wrapper').css('display','block');
            $('#page-content-wrapper').css('margin-left','170px');
            $scope.show_sidebar=false;


        };
        // hide sidebar-wrapper
        $scope.sidebar_hide=function(){

            $('#sidebar-wrapper').css('display','none');
            $('#page-content-wrapper').css('margin-left','1px');
            $scope.show_sidebar=true;



        }


    }]);
