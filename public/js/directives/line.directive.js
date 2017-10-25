(function() {
  'use strict';
  angular.module('app')
    .directive('line', function(){
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


    } // end of controller

    function link(scope, element, iAttrs, controller, transcludeFn){
      controller.canvas = element[0].childNodes[0];
      controller.context = controller.canvas.getContext("2d");
      controller.context.fillStyle = "green";
      controller.context.setTransform(1, 0, 0, 1, 0, 0);
      controller.context.clearRect(0, 0, controller.canvas.width, controller.canvas.height);
      controller.context.translate(350, 350);


      controller.drawLine = function(context) {
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


      controller.stateUpdate = function(){
        controller.context.setTransform(1, 0, 0, 1, 0, 0);
        controller.context.clearRect(0, 0, controller.canvas.width, controller.canvas.height);
        controller.context.translate(350, 350);
        controller.context.rotate(controller.rotation);
        controller.drawLine(controller.context);
        controller.rotation = -((controller.helper.rotationTable[controller.i] * 0.01).toFixed(3));



  controller.rotation = -((rotationTable[k] * 0.01).toFixed(3));
  let gongTime3 = Math.floor(rotationTable.length / 2)
  if ( k > gongTime3 - rotationIncrement3 && k < gongTime3 + rotationIncrement3){
    gong3.triggerAttackRelease('C4', '8n')
    console.log("line")
    k += rotationIncrement3;
  }
  else if (k < rotationTable.length - (rotationIncrement3 + 1)){
    k += rotationIncrement3;
  }
  else {
      k = 0;
      gong3.triggerAttackRelease('E3', '8n')
      console.log("line")
    }
        window.requestAnimationFrame(controller.stateUpdate);
      }
      controller.stateUpdate();
    }// end of link
})();
