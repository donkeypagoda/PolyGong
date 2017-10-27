(function() {
  'use strict';

  angular.module('app')
  .service('gongBuilderService', function(){
    const vm = this;

    vm.availableGongs = ["circle", "line", "triangle", "square", "pentagon", "hexagon", "heptagon"]

    vm.gongStack = ["hexagon", "pentagon", "square"];

    vm.addGong = function(gong){
      vm.gongStack.push(gong)
    }
    vm.removeLastGong = function(){
      vm.gongStack = vm.gongStack.slice(0, vm.gongStack.length - 1)
      console.log(vm.gongStack);
    }
  })

}());