(function() {
  'use strict';
  angular.module('app')
    .directive('triangle', function(){
      return {
        controller: controller,
        link: link,
        template: `<canvas id="triangle" width="700" height="700"></canvas>`
      };

    })

    controller.inject = ['helperService']
    function controller(helperService){
      const vm = this;
      vm.helper = helperService;
      vm.i = 0;
      vm.rotation = 0.01;
      vm.rotationIncrement = 2;
      vm.gong;


    } // end of controller

    function link(scope, element, iAttrs, controller, transcludeFn){
      controller.canvas = element[0].childNodes[0];
      controller.context = controller.canvas.getContext("2d");
      controller.context.fillStyle = "red";
      controller.context.setTransform(1, 0, 0, 1, 0, 0);
      controller.context.clearRect(0, 0, controller.canvas.width, controller.canvas.height);
      controller.context.translate(350, 350);

      controller.drawTriangle = (context) => {
        controller.mallet1 = controller.helper.makeMallet(240, 0, 20);
        controller.mallet2 = controller.helper.makeMallet(-120, 205, 20);
        controller.mallet3 = controller.helper.makeMallet(-120, -205, 20);
        controller.helper.connectorLine(controller.context, controller.mallet1, controller.mallet2);
        controller.helper.connectorLine(controller.context, controller.mallet2, controller.mallet3);
        controller.helper.connectorLine(controller.context, controller.mallet3, controller.mallet1);

        context.beginPath();
        context.arc(controller.mallet1.x, controller.mallet1.y, controller.mallet1.r, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();

        context.beginPath();
        context.arc(controller.mallet2.x, controller.mallet2.y, controller.mallet2.r, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();

        context.beginPath();
        context.arc(controller.mallet3.x, controller.mallet3.y, controller.mallet3.r, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();
      }

      controller.stateUpdate = () => {
        controller.context.setTransform(1, 0, 0, 1, 0, 0);
        controller.context.clearRect(0, 0, controller.canvas.width, controller.canvas.height);
        controller.context.translate(350, 350);
        controller.context.rotate(controller.rotation);
        controller.drawTriangle(controller.context);
        controller.rotation = -((controller.helper.rotationTable[controller.i] * 0.01).toFixed(3));


        controller.gongTime = Math.floor(controller.helper.rotationTable.length / 3)
        controller.rotation = -((controller.helper.rotationTable[controller.i] * 0.01).toFixed(3));

        if ( controller.i > controller.gongTime - controller.rotationIncrement && controller.i < controller.gongTime + controller.rotationIncrement){
          // controller.gong.triggerAttackRelease('E3', '8n')
          console.log("triangle")
          controller.i += controller.rotationIncrement;
        }
        else if ( controller.i > 2 * controller.gongTime - controller.rotationIncrement && controller.i < 2 * controller.gongTime + controller.rotationIncrement){
          // controller.gong.triggerAttackRelease('C3', '8n')
          console.log("triangle");
          controller.i += controller.rotationIncrement;
        }

        else if (controller.i < controller.helper.rotationTable.length - (controller.rotationIncrement +1)){
          controller.i += controller.rotationIncrement;
        }
        else {
            controller.i = 0;
            // controller.gong.triggerAttackRelease('G2', '8n');
            console.log("triangle");
          }
        window.requestAnimationFrame(controller.stateUpdate);
      }
      controller.stateUpdate();
    }// end of link
})();
