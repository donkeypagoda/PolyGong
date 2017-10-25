(function() {
  'use strict';
  angular.module('app')
    .directive('gongbase', function() {
      return {
        controller,
        controllerAs: '$ctrl',
        template: `<circle></circle>`
      }
    }) // end of directive

    controller.inject = [];
    function controller() {
      const vm = this
      vm.gongStack = [];




    } // end of controller

}());
