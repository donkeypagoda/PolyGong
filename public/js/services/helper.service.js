(function() {
  'use strict';
  angular.module('app')
    .service('helperService', service)

    function service(){
      const vm = this;

      vm.connectorLine = function(context, point1, point2){
        context.beginPath();
        context.moveTo(point1.x, point1.y);
        context.lineTo(point2.x, point2.y);
        context.lineWidth = 3;
        context.stroke();
      };

      vm.makeMallet = function(){
        this.r = 20;
        this.x = 0;
        this.y = 0;
      };

    }
}());
