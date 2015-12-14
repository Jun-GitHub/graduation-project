/**
 * Created by yuansc on 15/1/8.
 */
'use strict';
angular.module('logApp')
    .factory('Auth', ['$location', '$rootScope', '$http', 'User', '$cookieStore', '$q', 'interFace', function ($location, $rootScope, $http, User, $cookieStore, $q, interFace) {
        var currentUser = {};
        if ($cookieStore.get('token')) {
            currentUser = User.get();
        }
        return {
            /**
             * Authenticate user and save token
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            login: function (user, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();
                var self = this;
                $('.lodingIcon18px').show();
                if (!user.username || user.username == '' || !user.password || user.password == '') {
                    $('.lodingIcon18px').hide();
                    alertln('账号和密码不能为空');
                    return cb('login error');
                }
                $http.post(url+'/api/operator/login', {
                    username: user.username,
                    password: user.password
                }).
                    success(function (data) {
                        $('#sidebar-wrapper').show();
                        $('.lodingIcon18px').hide();
                        if (data.code != 0) {
                            alertln(data.message);
                            self.logout();
                            deferred.reject('login error');
                            return cb('login error');

                        }
                        localStorage.setItem('loginData', JSON.stringify(data.instance));
                        $rootScope.username = data.instance.username;
                        $cookieStore.put('loginData', data.instance);
                        if (interFace.setSelectListTreeDataAble) {
                            if (data.instance.level == 0) {
                                interFace.setSelectListTreeDataAble('用户列表', true);
                                interFace.setSelectListTreeDataAble('新增用户', true);
                            } else {
                                interFace.setSelectListTreeDataAble('用户列表', false);
                                interFace.setSelectListTreeDataAble('新增用户', false);
                            }
                        }
                        if (user.remember) {
                            var code = escape(JSON.stringify(user));
                            localStorage.setItem('palycombLogin', code);
                        }
                        $cookieStore.put('token', data.instance.token);
                        $cookieStore.put('username', data.instance.username);
                        $cookieStore.put('user_id', data.instance._id);
                        $cookieStore.put('userLevel', data.instance.level);

                        currentUser = User.get();
                        $location.path('/appList');
                        deferred.resolve(data);
                        return cb(undefined, data);

                    }).
                    error(function (err) {
                        self.logout();
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));
                return deferred.promise;
            },
            /**
             * Delete access token and user info
             *
             * @param  {Function}
             */
            logout: function () {
                $cookieStore.remove('token');
                $cookieStore.remove('username');
                $cookieStore.remove('user_id');
                $cookieStore.remove('userLevel');
                $http.post(url+'/api/operator/logout').success(function () {
                    $location.path('/login');
                    currentUser = {};
                });
            },
            /**
             * Create a new user
             *
             * @param  {Object}   user     - user info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            createUser: function (user, callback) {
                var cb = callback || angular.noop;

                return User.save(user,
                    function (data) {
                        $cookieStore.put('token', data.instance.token);
                        currentUser = User.get();
                        return cb(user);
                    },
                    function (err) {
                        this.logout();
                        return cb(err);
                    }.bind(this)).$promise;
            },

            /**
             * Change password
             *
             * @param  {String}   oldPassword
             * @param  {String}   newPassword
             * @param  {Function} callback    - optional
             * @return {Promise}
             */
            changePassword: function (oldPassword, newPassword, callback) {
                var cb = callback || angular.noop;

                return User.changePassword({token: currentUser.token}, {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }, function (user) {
                    return cb(user);
                }, function (err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Gets all available info on authenticated user
             *
             * @return {Object} user
             */
            getCurrentUser: function () {
                return currentUser;
            },

            /**
             * Check if a user is logged in
             *
             * @return {Boolean}
             */
            isLoggedIn: function () {
                return currentUser.hasOwnProperty('level') && $cookieStore.get('token');
            },

            /**
             * Waits for currentUser to resolve before checking if user is logged in
             */
            isLoggedInAsync: function (cb) {
                if (currentUser.hasOwnProperty('$promise')) {
                    currentUser.$promise.then(function () {
                        console.log('======129');
                        cb(true);
                    }).catch(function () {
                        console.log('======132');
                        cb(false);
                    });
                } else if (currentUser.hasOwnProperty('level')) {
                    console.log('======136');
                    cb(true);
                } else {
                    console.log('======139');
                    cb(false);
                }
            },

            /**
             * Check if a user is an admin
             * '0' for admin, '1' for user
             * @return {Boolean}
             */
            isAdmin: function () {
                return currentUser.level === '0';
            },

            /**
             * Get auth token
             */
            get_token: function () {
                return $cookieStore.get('token');
            },
            /**
             * Get username
             */
            get_username: function () {
                return $cookieStore.get('username');
            },
            /**
             * Get user_id
             */
            get_user_id: function () {
                return $cookieStore.get('user_id');
            },
            /**
             * Get user level
             *
             */
            get_level: function () {
                return $cookieStore.get('userLevel');
            },
            /**
             * reload
             */
            reload: function () {

                // window.location.href = window.location.href;
                window.location.reload();
            }
        };
    }]);
