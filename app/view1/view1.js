'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
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
    $http.get(host + '/api/matriculas').success(function (resp) {
      $scope.usuarios = resp;
      console.debug(resp);
    }).error(function (resp) {
      console.debug(resp);
    });
  };

  $scope.buscaUsuario = function() {
    $http.get(host + '/api/matriculas/23').success(function (resp) {
      $scope.usuario = resp;
      console.debug(resp);
    }).error(function (resp) {
      console.debug(resp);
    });
  };

  $scope.buscaTurmas = function () {
    $http.get(host + '/api/turmas').success(function (resp) {
      $scope.turmas = resp;
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