'use strict';

var host = "http://localhost:3000";
// var host = "http://localhost:3000";

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'ng-token-auth',
    'ipCookie'
]).config(['$locationProvider', '$routeProvider', '$authProvider', '$httpProvider', function ($locationProvider, $routeProvider, $authProvider, $httpProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
    $httpProvider.defaults.headers.common['Accept'] = 'application/vnd.traus.com.br.v1';

    $authProvider.configure({
        apiUrl: host + '/api',
        // apiUrl: 'http://localhost:3000/api',
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
}]);
