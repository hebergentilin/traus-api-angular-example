'use strict';

angular.module('myApp.view1', ['ngRoute', 'ng-token-auth','ipCookie'])

.config(['$routeProvider', '$authProvider', function($routeProvider, $authProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });

  $authProvider.configure({
    apiUrl: 'http://localhost:3000/api/v1',
    tokenValidationPath: '/auth/validate_token',
    signOutUrl: '/auth/sign_out',
    confirmationSuccessUrl: window.location.href,
    emailSignInPath: '/auth/sign_in',
    storage: 'cookies',
    cookieOps: {
      path: "/",
      expires: 9999,
      expirationUnit: 'days',
      secure: false,
      domain: 'localhost'
    }
  });
}])

.controller('View1Ctrl', ['$scope', '$auth', '$http', '$rootScope', function($scope, $auth, $http, $rootScope) {
  $scope.doLogin = function () {
    $auth.submitLogin({
      email: $scope.username,
      password: $scope.password
    }).then(function (resp) {
      console.debug("Success!!!");
      console.debug(resp);
    }).catch(function(resp) {
      console.debug("ERR!!!");
      console.debug(resp);
    });
  };

  $scope.buscaUsuarios = function () {
    $http.get('http://localhost:3000/api/matriculas').success(function (resp) {
      console.debug(resp);
    }).error(function (resp) {
      console.debug(resp);
    });
  };

  $rootScope.$on('auth:login-success', function(ev, user) {
    console.debug('Welcome ' + user.email);
  });
  
  $scope.register = function() {
    $auth.submitRegistration({
      email:                 'teste@gmail.com',
      password:              '12345678',
      password_confirmation: '12345678'
    }).then(function(resp) {
      console.debug(resp);
    })
    .catch(function(resp) {
      console.debug(resp);
    });
  };

  $scope.signOut = function () {
    $auth.signOut().then(function(resp) {
      console.debug("Success!!!");
      console.debug(resp);
    }).catch(function(resp) {
      console.debug("ERR!!!");
      console.debug(resp);
    });
  };
}]);