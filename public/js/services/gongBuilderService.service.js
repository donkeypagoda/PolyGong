(function() {
  'use strict';

  angular.module('app')
  .service('gongBuilderService', function(){
    const vm = this;

    vm.gongStack = [];

    vm.shapeInstantiate = function(urlData, masterLFO){
      switch(urlData.name){
        case 'circle':
          let circleShape = new Circle(urlData.size, urlData.speed, urlData.centArr, urlData.volume, urlData.baseFreq);
          masterLFO.connect(circleShape.gong.detune)
          circleShape.gong.toMaster();
          vm.gongStack.push(circleShape);
          return circleShape;

        case 'line':
          let lineShape = new Line(urlData.size, urlData.speed, urlData.centArr, urlData.volume, urlData.baseFreq);
          masterLFO.connect(lineShape.gong.detune)
          linehape.gong.toMaster();
          vm.gongStack.push(lineShape);
          return lineShape;

        case 'triangle':
          let triangleShape = new Triangle(urlData.size, urlData.speed, urlData.centArr, urlData.volume, urlData.baseFreq);
          masterLFO.connect(triangleShape.gong.detune)
          triangleShape.gong.toMaster();
          vm.gongStack.push(triangleShape);
          return triangleShape;

        case 'square':
          let squareShape = new Square(urlData.size, urlData.speed, urlData.centArr, urlData.volume, urlData.baseFreq);
          masterLFO.connect(squareShape.gong.detune)
          squareShape.gong.toMaster();
          vm.gongStack.push(squareShape);
          return squareShape;

        case 'pentagon':
          let pentagonShape = new Pentagon(urlData.size, urlData.speed, urlData.centArr, urlData.volume, urlData.baseFreq);
          masterLFO.connect(pentagonShape.gong.detune)
          pentagonShape.gong.toMaster();
          vm.gongStack.push(pentagonShape);
          return pentagonShape;

        case 'hexagon':
          let hexagonShape = new Hexagon(urlData.size, urlData.speed, urlData.centArr, urlData.volume, urlData.baseFreq);
          masterLFO.connect(hexagonShape.gong.detune)
          hexagonShape.gong.toMaster();
          vm.gongStack.push(hexagonShape);
          return hexagonShape;

        case 'heptagon':
          let heptagonShape = new Heptagon(urlData.size, urlData.speed, urlData.centArr, urlData.volume, urlData.baseFreq);
          masterLFO.connect(heptagonShape.gong.detune)
          heptagonShape.gong.toMaster();
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
