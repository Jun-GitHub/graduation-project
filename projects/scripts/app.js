'use strict';

/**
 * @ngdoc overview
 * @name logApp
 * @description
 * # logApp
 *
 * Main module of the application.
 */
angular
  .module('logApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'angularTreeview',
    'angularBootstrapNavTree',
    'datePicker',
    "angular-bootbox",
    'ng.ueditor',
    'checklist-model',
    'angularFileUpload'
  ])
  .config(['$routeProvider', '$locationProvider', '$httpProvider',function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
    $httpProvider.interceptors.push('authInterceptor');
  }]).config(['$bootboxProvider',function ($bootboxProvider) {
    $bootboxProvider.setDefaults({locale: "es"});
  }])
  .factory('authInterceptor', ['$rootScope', '$q', '$cookieStore', '$location',function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to body
      request: function (config) {
       // config.headers = config.headers || {};
        config.params = config.params || {};
        config.params.token = $cookieStore.get('token');
        return config;

      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      },
      response: function (response) {
        console.log(response);
        if (response && response.data && response.data.code === 10001) {
          alert('身份验证已失效,请重新登录');
          $cookieStore.remove('token');
          $location.path('/login');
        }
        return response;
      }
    };
  }])
  .run(['$rootScope', '$location', 'Auth',function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function (loggedIn) {
        console.log(next.authenticate ,loggedIn);
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  }]);
