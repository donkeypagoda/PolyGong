(function() {
  'use strict';
  angular.module('app')
    .component('box', {
      controller: controller,
      template: `<h1>hello</h1>`
    })
    controller.inject = ['urlService', '$stateParams'];
    function controller (urlService, $stateParams){
      console.log($stateParams);

    }
}());
