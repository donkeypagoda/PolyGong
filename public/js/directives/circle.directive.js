(function() {
  'use strict';
  angular.module('app')
    .directive('circle', function(){
      return {
        controller: controller,
        link: link,
        template: `<canvas id="circle" width="700" height="700"></canvas>`
      };

    })

    controller.$inject = ['helperService']
    function controller(helperService){
      const vm = this;
      vm.helper = helperService;
      // vm.circleMallet;


    } // end of controller

    function link(scope, element, iAttrs, controller, transcludeFn){
      let canvas = element[0].childNodes[0];
      let context = canvas.getContext("2d");
      context.fillStyle = "yellow";
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, context.width, context.height);
      context.translate(350, 350);
      // console.log(context);

      controller.drawCircle = function(context) {
        // controller.circleMallet = controller.helper.makeMallet();
        // controller.circleMallet.x = 240;
        // controller.circleMallet.y = 0;

        context.beginPath();
        context.arc(0, 0, 240, 0, Math.PI * 2, false);
        context.lineWidth = 3;
        context.stroke();

        context.beginPath();
        context.arc(240, 0, 20, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();
      }
      controller.drawCircle(context);

    }// end of link
})();
