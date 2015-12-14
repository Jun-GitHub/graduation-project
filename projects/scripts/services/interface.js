/**
 * Created by iy7 on 2015/4/1.
 */


angular.module('logApp')
    .factory('interFace', ['$location', '$rootScope', '$http', 'User', '$cookieStore', '$q',function($location, $rootScope, $http, User, $cookieStore, $q) {
        var currentUser = {};
        if ($cookieStore.get('token')) {
            currentUser = User.get();
        }
        return {
            alignSelect:null,
            selectListKeyMap:[],
            setSelectListTreeDataAble:null
        };


    }]);
