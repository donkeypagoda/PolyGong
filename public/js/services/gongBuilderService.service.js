(function() {
  'use strict';

  angular.module('app')
  .service('gongBuilderService', function(){
    const vm = this;

    // vm.availableGongs = ["circle", "line", "triangle", "square", "pentagon", "hexagon", "heptagon"]

    vm.gongStack = [];

    // vm.gongDirectives = [];
    //
    // vm.addGongDirective = (gong) => {
    //   vm.gongDirectives.push(gong)
    // }

    vm.rotateUpdate = (val, id) => {
      vm.gongStack[id].rotationIncrement = Math.PI / parseFloat(val);
      console.log(vm.gongStack[id].speed);
      // console.log(vm.gongDirectives[id].rotationIncrement);
    }

    vm.volUpdate = (val, id) => {
      vm.gongStack[id].volume = parseFloat(val);
      console.log(vm.gongStack[id].volume);
      // console.log(vm.gongDirectives[id].gong.volume.value);
    }
    vm.rotateSwitch = (id) => {
      // console.log(vm.gongDirectives[id].direction);
      vm.gongDirectives[id].direction = !vm.gongDirectives[id].direction;
      // console.log(vm.gongDirectives[id].direction);
    }

    // vm.addGong = function(gong){
    //   vm.gongStack.push(gong);
    // };

    // vm.removeLastGong = function(){
    //   vm.gongStack = vm.gongStack.slice(0, vm.gongStack.length - 1);
    //   vm.gongDirectives = vm.gongDirectives.slice(0, vm.gongDirectives.length - 1);
    // };
  })

}());
