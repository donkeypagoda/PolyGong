(function() {
  'use strict';

  angular.module('app')
  .service('gongBuilderService', function(){
    const vm = this;

    // vm.availableGongs = ["circle", "line", "triangle", "square", "pentagon", "hexagon", "heptagon"]

    vm.gongStack = [];

    vm.shapeInstantiate = function(urlData){
      switch(urlData.name){
        case 'circle':
          let circleShape = new Circle(urlData.size, urlData.speed, urlData.centArr);
          vm.gongStack.push(circleShape);
          return circleShape.group;

        case 'line':
          let lineShape = new Line(urlData.size, urlData.speed, urlData.centArr);
          vm.gongStack.push(lineShape);
          return lineShape.group;

        case 'triangle':
          let triangleShape = new Triangle(urlData.size, urlData.speed, urlData.centArr);
          vm.gongStack.push(triangleShape);
          return triangleShape.group;

        case 'square':
          let squareShape = new Square(urlData.size, urlData.speed, urlData.centArr);
          vm.gongStack.push(squareShape);
          return squareShape.group;

        case 'pentagon':
          let pentagonShape = new Pentagon(urlData.size, urlData.speed, urlData.centArr);
          vm.gongStack.push(pentagonShape);
          return pentagonShape.group;

        case 'hexagon':
          let hexagonShape = new Hexagon(urlData.size, urlData.speed, urlData.centArr);
          vm.gongStack.push(hexagonShape);
          return hexagonShape.group;

        case 'heptagon':
          let heptagonShape = new Heptagon(urlData.size, urlData.speed, urlData.centArr);
          vm.gongStack.push(heptagonShape);
          return heptagonShape.group;
        default: return;
      }// end of switch
    } //end of shapeInstantiate


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
    // vm.rotateSwitch = (id) => {
    //   // console.log(vm.gongDirectives[id].direction);
    //   vm.gongDirectives[id].direction = !vm.gongDirectives[id].direction;
    //   // console.log(vm.gongDirectives[id].direction);
    // }
    // vm.gongSize = (val,id) => {
    //   vm.gongStack[id].size = parseFloat(val);
    //   console.log(vm.gongStack[id]);
    // }

    // vm.addGong = function(gong){
    //   vm.gongStack.push(gong);
    // };

    // vm.removeLastGong = function(){
    //   vm.gongStack = vm.gongStack.slice(0, vm.gongStack.length - 1);
    //   vm.gongDirectives = vm.gongDirectives.slice(0, vm.gongDirectives.length - 1);
    // };
  })

}());
