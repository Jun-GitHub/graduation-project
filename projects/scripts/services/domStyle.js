/**
 * Created by iy7 on 2015/4/20.
 */
angular.module('logApp')
    .factory('$domStyle', ['$location', '$rootScope', '$http', '$cookieStore', '$q', function ($location, $rootScope, $http, User, $cookieStore, $q) {
        var domFactory = function (domStr) {
            var div = document.createElement("div");
            div.innerHTML = domStr;
            return div.childNodes[0];
        };
        return {
            spanLine: function (title, value, ng) {
                var domStr = '<div class="childcross"><div class="input-group" >';
                domStr = domStr + '<span class="input-group-addon" style="width: 137px;">' + title + '</span>';
                domStr = domStr + '<span class="form-control ng-pristine ng-valid ng-touched "   style="width:250px;" ' + (ng ? ng : '') + '  >' + value + '</span>';
                domStr = domStr + '</div></div>';
                return domFactory(domStr);
            },
            spanLineFloatLeft: function (title, value, ng) {
                var domStr = '<div style="float: left;height: 40px;width: 255px;margin-left: 30px;"><div class="input-group" >';
                domStr = domStr + '<span class="input-group-addon" style="width: 137px;">' + title + '</span>';
                domStr = domStr + '<span class="form-control ng-pristine ng-valid ng-touched "   style="width:120px;" ' + (ng ? ng : '') + '  >' + value + '</span>';
                domStr = domStr + '</div></div>';
                return domFactory(domStr);
            },
            divBox: function (title, ng) {
                var domStr = '<div class="greyborder" style="min-height:130px;padding-bottom: 20px;"  ' + (ng ? ng : '') + '>' +
                    '<div class="greybar">' + title +
                    '</div></div>';
                return domFactory(domStr);
            },
            headDiv: function () {
                var domStr = '<div class="input-group" style="width: 100%"></div>'
                return domFactory(domStr);
            },
            headLoading: function () {
                var domStr = '<img src="../images/loading.gif" class="loadingImg lodingIcon18px"/>';
                return domFactory(domStr);
            },
            headSpan: function (text, ng, width) {
                var domStr = '<span class="input-group-addonln" style="width:' + (width ? width : '10%') + ';"  ' + (ng ? ng : '') + '  >' + text + '</span>';
                return domFactory(domStr);
            },
            select: function (ng) {
                var domStr = '<select class="form-control" style="width: 100%;height: 30px;margin-top:6px;"' + (ng ? ng : '') +
                    ' >' +
                    '</select>'
                return domFactory(domStr);
            },
            btn:function(text,fun){
                var domStr = '<div class="input-group-addonbox">'+
                   '<div class="divbtn largesize" ng-click="'+fun+'()">'+text+'</div>'+
               '</div>';
                return domFactory(domStr);
            },
            table:function(titleList,valueList){
                var domStr='<table class="table table-striped table-bordered">';
                domStr+= '<tbody>';
                domStr+='<tr>';
                for(var i in titleList){
                    domStr+='<th class="dark">'+titleList[i]+'</th>'
                }
                domStr+='</tr>';
                for(var i=0;i<valueList.length;i++){
                    domStr+='<tr height="40px" ng-repeat="info in listData" ng-model="listData">';
                    for(var c in titleList){
                        domStr+='<th>'+valueList[i][c]+'</th>'
                    }
                    domStr+='</tr>';
                }
                domStr+='</tbody> </table>';
                console.log(domStr);
                return domFactory(domStr);
            }
        };
    }]);