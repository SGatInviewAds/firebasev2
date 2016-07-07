(function() {
  'use strict';
  angular.module('app', ['ui.router', 'ngMaterial', 'ngFileUpload', 'ui.bootstrap', 'firebase'])
  .config(Config)
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('light-green')
    .accentPalette('grey');
  });
  Config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function Config($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider.state('Home', {
      url: '/',
      templateUrl: 'templates/main.html'
    })
    .state('Profile', {
      url: '/profile/:id',
      templateUrl: 'templates/profile.html',
      controller: 'ProfileController',
      controllerAs: 'vm'
    })

    $urlRouterProvider.otherwise('/');
  }
})();
