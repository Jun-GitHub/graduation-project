/**
 * Created by HJ-PC on 15/10/8.
 */

'use strict';
angular.module('logApp')
    .controller('messageUserListCtrl', ['$scope', '$http', '$location', '$cookieStore', function ($scope, $http, $location, $cookieStore) {

        $scope.isLoading = true;
        $scope.data_store = [];


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


        /*get data from server*/
        function fetch() {
            $scope.isLoading = true;
            $http.post(url+'/api/messageUser/getMessageUserList', {
                // skip: $scope.searchParams.begin,
                skip: $scope.searchParams.limit,
                page: $scope.searchParams.pageNum - 1
            })
                .success(function (data) {
                    $scope.isLoading = false;
                    console.log('fetch MessageUserList from server success:', data);
                    $scope.data_store = data.instances.list;
                    $scope.MessageUserList = $scope.data_store;
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




    }]);