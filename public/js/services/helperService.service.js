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

      vm.gongLine = (context) =>{
        context.beginPath();
        context.moveTo(500, 0);
        context.lineTo(200, 0);
        context.lineWidth = 2;
        context.stroke();
      };

      vm.rotationTable = Array.from(new Array(2512), (x, i) => (i * 0.25) + 0.25);


    }
}());
