(function() {
  'use strict';

  angular.module('app')
  .service('gongBuilderService', function(){
    const vm = this;

    vm.availableGongs = ["circle", "line", "triangle", "square", "pentagon", "hexagon", "heptagon"]

    vm.gongStack = [];

    vm.gongDirectives = [];

    vm.addGongDirective = (gong) => {
      vm.gongDirectives.push(gong)
      // gong.rotationIncrement
    }

    vm.addGong = function(gong){
      vm.gongStack.push(gong);
    };
    vm.removeLastGong = function(){
      vm.gongStack = vm.gongStack.slice(0, vm.gongStack.length - 1);
    };
  })

}());
