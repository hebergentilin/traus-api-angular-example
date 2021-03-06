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
  $scope.medicaoParaAtualizar = {};
  $scope.medicoesParaAtualizar = [];
  $scope.tempos = [{}];

  $scope.addTempo = function() {
    $scope.tempos.push({});
  };

  $scope.addMedicao = function() {
    $scope.medicoesParaAtualizar.push(_.clone($scope.medicaoParaAtualizar));
  };

  $scope.atualizarMedicoes = function() {
    $http.put(host + '/api/medicoes', {medicoes: $scope.medicoesParaAtualizar}).success(function (resp) {
      $scope.retornoAtualizarMedicao = resp;
    }).error(function (resp) {
      console.debug(resp);
    });
  };

  $scope.salvarMedicao = function() {
    $scope.medicoes = [];
    _.each($scope.tempos, function(tempo) {
      var medicao = _.clone($scope.medicao);
      medicao.tempo = tempo.valor;
      $scope.medicoes.push(medicao);
    });

    $http.post(host + '/api/medicoes', {medicoes: $scope.medicoes}).success(function (medicao) {
      $scope.medicaoCriada = medicao;
    }).error(function (resp) {
      console.debug(resp);
    });
  };

  $scope.atualizaVersao = function() {
    $scope.versoes = [];
    _.each(['matriculas', 'indicadores', 'medicoes', 'turmas'], function(servico) {
      $http.get(host + '/api/'+servico+'/versao', $scope.medicao).success(function (versao) {
        $scope.versoes.push({servico: servico, versao: versao});
      }).error(function (resp) {
        console.debug(resp);
      });
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