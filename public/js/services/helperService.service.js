(function() {
  'use strict';
  angular.module('app')
    .service('helperService', service)

    function service(){
      const vm = this;

      vm.connectorLine = (context, point1, point2) =>{
        context.beginPath();
        context.moveTo(point1.x, point1.y);
        context.lineTo(point2.x, point2.y);
        context.lineWidth = 3;
        context.stroke();
      };

      vm.makeMallet = (x, y, r) =>{
        let mallet = {};
        mallet.x = x;
        mallet.y = y;
        mallet.r = r
        return mallet;
      };

      vm.gongBottomLine = (context, color, width) =>{
        context.beginPath();
        context.moveTo(500, 0);
        context.lineTo(200, 0);
        context.strokeStyle = color;
        context.lineWidth = width;
        context.stroke();
      };
      vm.gongTopLine = (context, color, width) =>{
        context.beginPath();
        context.moveTo(500, 50);
        context.lineTo(200, 50);
        context.strokeStyle = color;
        context.lineWidth = width;
        context.stroke();
      };

      vm.polyDraw = (context, sides, size, stroke) => {
        context.beginPath();
        context.moveTo (size * Math.cos(0), size *  Math.sin(0));

        for (let i = 1; i <= sides; i++) {
            context.lineTo (size * Math.cos(i * 2 * Math.PI / sides), size * Math.sin(i * 2 * Math.PI / sides));
        }
        context.strokeStyle = "#000000";
        context.lineWidth = stroke;
        context.stroke();
      }

      vm.rotationTable = Array.from(new Array(2512), (x, i) => (i * 0.25) + 0.25);


    }
}());
