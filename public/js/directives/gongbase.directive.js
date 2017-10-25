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
      vm.rotationTable = Array.from(new Array(2512), (x, i) => (i * 0.25) + 0.25);



    } // end of controller

}());
