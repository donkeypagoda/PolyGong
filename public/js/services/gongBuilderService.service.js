(function() {
  'use strict';

  angular.module('app')
  .service('gongBuilderService', function(){
    const vm = this;

    vm.gongStack = [];

    vm.shapeInstantiate = function(urlData){
      switch(urlData.name){
        case 'circle':
          let circleShape = new Circle(urlData.size, urlData.speed, urlData.centArr);
          vm.gongStack.push(circleShape);
          return circleShape;

        case 'line':
          let lineShape = new Line(urlData.size, urlData.speed, urlData.centArr);
          vm.gongStack.push(lineShape);
          return lineShape;

        case 'triangle':
          let triangleShape = new Triangle(urlData.size, urlData.speed, urlData.centArr);
          vm.gongStack.push(triangleShape);
          return triangleShape;

        case 'square':
          let squareShape = new Square(urlData.size, urlData.speed, urlData.centArr);
          vm.gongStack.push(squareShape);
          return squareShape;

        case 'pentagon':
          let pentagonShape = new Pentagon(urlData.size, urlData.speed, urlData.centArr);
          vm.gongStack.push(pentagonShape);
          return pentagonShape;

        case 'hexagon':
          let hexagonShape = new Hexagon(urlData.size, urlData.speed, urlData.centArr);
          vm.gongStack.push(hexagonShape);
          return hexagonShape;

        case 'heptagon':
          let heptagonShape = new Heptagon(urlData.size, urlData.speed, urlData.centArr);
          vm.gongStack.push(heptagonShape);
          return heptagonShape;
        default: return;
      }// end of switch
    } //end of shapeInstantiate

    vm.rotateUpdate = (val, id) => {
      vm.gongStack[id].rotationIncrement = Math.PI / parseFloat(val);
      // console.log(vm.gongStack[id].speed);
      // console.log(vm.gongDirectives[id].rotationIncrement);
    }

    vm.volUpdate = (val, id) => {
      vm.gongStack[id].volume = parseFloat(val);
      // console.log(vm.gongStack[id].volume);
      // console.log(vm.gongDirectives[id].gong.volume.value);
    }
    vm.setScale = (val, obj) => {
      obj.setScale(val);
    }
    // vm.rotateSwitch = (id) => {
    //   // console.log(vm.gongDirectives[id].direction);
    //   vm.gongDirectives[id].direction = !vm.gongDirectives[id].direction;
    //   // console.log(vm.gongDirectives[id].direction);
    // }


  })

}());
