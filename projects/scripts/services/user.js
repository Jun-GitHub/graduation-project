/**
 * Created by yuansc on 15/1/12.
 */

angular.module('logApp')
  .factory('User',['$resource', '$cookieStore',function ($resource, $cookieStore) {
    return $resource(url+'/api/operator/login', {
          token: $cookieStore.get('token'),
          username:$cookieStore.get('username')
      },
      {
        changePassword: {
          method: 'PUT',
          params: {
            controller:'password'
          }
        },
        get: {
          method: 'GET',
          params: {
            token:'me'
          }
        }
      });
  }]);
