'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$auth', '$http', '$rootScope', function($scope, $auth, $http, $rootScope) {
  $scope.medicao = {};
  $scope.salvarMedicao = function() {
    $http.post(host + '/api/medicoes', $scope.medicao).success(function (medicao) {
      $scope.medicaoCriada = medicao;
    }).error(function (resp) {
      console.debug(resp);
    });
  };

  $scope.doLogin = function () {
    $auth.submitLogin({
      email: $scope.username,
      password: $scope.password
    }).then(function (usuarioLogado) {
      $rootScope.usuarioLogado = usuarioLogado;
    }).catch(function(resp) {
      console.debug("ERR!!!");
      console.debug(resp);
    });
  };

  $scope.buscaMatriculas = function () {
    sendRequest(host + '/api/matriculas', 'matriculas');
  };

  $scope.buscaUsuario = function() {
    sendRequest(host + '/api/matriculas/'+$scope.id, 'matricula');
  };

  $scope.buscaTurmas = function () {
    sendRequest(host + '/api/turmas', 'turmas');
  };

  $scope.buscaIndicadores = function() {
    $scope.indices = [];
    sendRequest(host + '/api/indicadores', 'indicadores', function() {
      _.each($scope.indicadores[0].indices, function(indice) {
        _.each(indice.sub_indices, function(sub_indice){
          sub_indice.ancestry = indice.nome;
          $scope.indices.push(sub_indice);
        });
      });
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

  var sendRequest = function(url, model, callback) {
    $http.get(url).success(function (resp) {
      $scope[model] = resp;
      console.debug(resp);
      if (!!callback)
        callback();
    }).error(function (resp) {
      console.debug(resp);
    });
  };
}]);