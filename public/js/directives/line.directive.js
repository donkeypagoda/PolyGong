(function() {
  'use strict';
  angular.module('app')
    .directive('line', function(){
      return {
        controller: controller,
        link: link,
        template: `<canvas id="line" width="700" height="700"></canvas>`
      };

    })

    controller.inject = ['helperService', 'toneService']
    function controller(helperService, toneService){
      const vm = this;
      vm.helper = helperService;
      vm.tone = toneService;
      vm.i = 0;
      vm.rotation = 0.01;
      vm.rotationIncrement = 6;
      vm.gong = vm.tone.newGong();
      vm.gongPitchSet = [200, 240, 275];
      vm.gongDuration = 0.1;
      vm.size = 240;
      vm.active = true;
      vm.$onDestroy = () => {
        vm.active = false;
      }
      // vm.sides = 2;

    } // end of controller

    function link(scope, element, iAttrs, controller, transcludeFn){
      controller.canvas = element[0].childNodes[0];
      controller.context = controller.canvas.getContext("2d");
      controller.context.fillStyle = "green";
      controller.context.setTransform(1, 0, 0, 1, 0, 0);
      controller.context.clearRect(0, 0, controller.canvas.width, controller.canvas.height);
      controller.context.translate(350, 350);

      controller.drawLine = (context) => {
        controller.mallet1 = controller.helper.makeMallet(240, 0, 20);
        controller.mallet2 = controller.helper.makeMallet(-240, 0, 20);
        controller.helper.connectorLine(context, controller.mallet1, controller.mallet2);

        context.beginPath();
        context.arc(controller.mallet1.x, controller.mallet1.y, controller.mallet1.r, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();

        context.beginPath();
        context.arc(controller.mallet2.x, controller.mallet2.y, controller.mallet2.r, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();
      }

      controller.stateUpdate = () => {
        controller.context.setTransform(1, 0, 0, 1, 0, 0);
        controller.context.clearRect(0, 0, controller.canvas.width, controller.canvas.height);
        controller.context.translate(350, 350);
        controller.context.rotate(controller.rotation);
        controller.drawLine(controller.context);
        controller.rotation = -((controller.helper.rotationTable[controller.i] * 0.01).toFixed(3));

        controller.gongTime = Math.floor(controller.helper.rotationTable.length / 2)
        if ( controller.i > controller.gongTime - controller.rotationIncrement && controller.i < controller.gongTime + controller.rotationIncrement){
          controller.gong.triggerAttackRelease(controller.gongPitchSet, controller.gongDuration);
          console.log("line")
          controller.i += controller.rotationIncrement;
        }
        else if (controller.i < controller.helper.rotationTable.length - (controller.rotationIncrement + 1)){
          controller.i += controller.rotationIncrement;
        }
        else {
          controller.i = 0;
          controller.gong.triggerAttackRelease(controller.gongPitchSet, controller.gongDuration);
          console.log("line")
        }
        if (controller.active){
          window.requestAnimationFrame(controller.stateUpdate);
        }
        else return;
      }
      controller.stateUpdate();
    }// end of link
})();
