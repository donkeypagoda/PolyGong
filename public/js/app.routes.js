(function() {
  'use strict';

  angular.module('app', ['ui.router']).config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.html5Mode(true)

    $stateProvider
      .state({
        name: 'gongbase',
        url: '/',
        component: 'gongbase'
      })
      .state({
        name: 'box',
        url: '/:url',
        component: 'box'
      })

  }
})();
