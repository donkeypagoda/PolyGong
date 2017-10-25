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


    } // end of controller

    function link(scope, element, iAttrs, controller, transcludeFn){
      let canvas = element[0].childNodes[0];
      let context = canvas.getContext("2d");
      context.fillStyle = "yellow";
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, context.width, context.height);
      context.translate(350, 350);


      controller.drawCircle = function(context) {
        let circleMallet = controller.helper.makeMallet(240, 0, 20);

        context.beginPath();
        context.arc(0, 0, 240, 0, Math.PI * 2, false);
        context.lineWidth = 3;
        context.stroke();

        context.beginPath();
        context.arc(circleMallet.x, circleMallet.y, circleMallet.r, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();
      }
      context.rotate(controller.rotation);
      controller.drawCircle(context);
      controller.rotation = -((controller.helper.rotationTable[i] * 0.01).toFixed(3));
      if (i < controller.helper.rotationTable.length - 1){
        // i += rotationIncrement
        i++
      }
      else {
        i = 0;
        // gong2.triggerAttackRelease('C2', '4n')
        console.log("circle")
      }
      window.requestAnimationFrame(link);
    }// end of link
})();
