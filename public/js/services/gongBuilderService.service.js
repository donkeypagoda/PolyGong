(function() {
  'use strict';

  angular.module('app')
  .service('gongBuilderService', function(){
    const vm = this;

    vm.gongStack = [];

    vm.shapeInstantiate = function(urlData){
      switch(urlData.name){
        case 'circle':
          let circleShape = new Circle(urlData.size, urlData.speed, urlData.centArr, urlData.volume);
          vm.gongStack.push(circleShape);
          return circleShape;

        case 'line':
          let lineShape = new Line(urlData.size, urlData.speed, urlData.centArr, urlData.volume);
          vm.gongStack.push(lineShape);
          return lineShape;

        case 'triangle':
          let triangleShape = new Triangle(urlData.size, urlData.speed, urlData.centArr, urlData.volume);
          vm.gongStack.push(triangleShape);
          return triangleShape;

        case 'square':
          let squareShape = new Square(urlData.size, urlData.speed, urlData.centArr, urlData.volume);
          vm.gongStack.push(squareShape);
          return squareShape;

        case 'pentagon':
          let pentagonShape = new Pentagon(urlData.size, urlData.speed, urlData.centArr, urlData.volume);
          vm.gongStack.push(pentagonShape);
          return pentagonShape;

        case 'hexagon':
          let hexagonShape = new Hexagon(urlData.size, urlData.speed, urlData.centArr, urlData.volume);
          vm.gongStack.push(hexagonShape);
          return hexagonShape;

        case 'heptagon':
          let heptagonShape = new Heptagon(urlData.size, urlData.speed, urlData.centArr, urlData.volume);
          vm.gongStack.push(heptagonShape);
          return heptagonShape;
        default: return;
      }// end of switch
    } //end of shapeInstantiate

    vm.rotateUpdate = (val, obj) => {
      obj.setSpeed(val);
    }

    vm.volUpdate = (val, obj) => {
      obj.setVol(val);
    }
    vm.setScale = (val, obj) => {
      obj.setScale(val);
    }

  })

}());
