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

    controller.inject = ['helperService']
    function controller(helperService){
      const vm = this;
      vm.helper = helperService;
      vm.i = 0;
      vm.rotation = 0.01;
      vm.rotationIncrement = 7;
      vm.gong;
      vm.size = 240;
      // vm.sides = 1;

    } // end of controller

    function link(scope, element, iAttrs, controller, transcludeFn){
      controller.canvas = element[0].childNodes[0];
      controller.context = controller.canvas.getContext("2d");
      controller.context.fillStyle = "yellow";
      controller.context.setTransform(1, 0, 0, 1, 0, 0);
      controller.context.clearRect(0, 0, controller.canvas.width, controller.canvas.height);
      controller.context.translate(350, 350);


      controller.drawCircle = function(context) {
        controller.circleMallet = controller.helper.makeMallet(240, 0, 20);

        context.beginPath();
        context.arc(0, 0, 240, 0, Math.PI * 2, false);
        context.lineWidth = 3;
        context.stroke();

        context.beginPath();
        context.arc(controller.circleMallet.x, controller.circleMallet.y, controller.circleMallet.r, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();
      }

      controller.stateUpdate = function(){
        controller.context.setTransform(1, 0, 0, 1, 0, 0);
        controller.context.clearRect(0, 0, controller.canvas.width, controller.canvas.height);
        controller.context.translate(350, 350);
        controller.context.rotate(controller.rotation);
        controller.drawCircle(controller.context);
        controller.rotation = -((controller.helper.rotationTable[controller.i] * 0.01).toFixed(3));
        if (controller.i < controller.helper.rotationTable.length - 1){
          controller.i += controller.rotationIncrement
          // controller.i++
        }
        else {
          controller.i = 0;
          // gong2.triggerAttackRelease('C2', '4n')
          console.log("circle")
        }
        window.requestAnimationFrame(controller.stateUpdate);
      }
      controller.stateUpdate();
    }// end of link
})();
