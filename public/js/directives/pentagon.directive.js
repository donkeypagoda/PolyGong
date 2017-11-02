(function() {
  'use strict';
  angular.module('app')
    .directive('pentagon', function(){
      return {
        controller: controller,
        link: link,
        template: `<canvas id="square" width="700" height="700"></canvas>`
      };

    })

    controller.inject = ['helperService', 'toneService', 'gongBuilderService']
    function controller(helperService, toneService, gongBuilderService){
      const vm = this;
      vm.name = "pentagon";
      vm.helper = helperService;
      vm.tone = toneService;
      vm.builder = gongBuilderService;
      vm.i = 0;
      vm.rotation = 0.01;
      vm.rotationIncrement = 1;
      vm.direction = true;
      vm.gong = vm.tone.newGong();
      vm.gong.volume.value = -6;
      vm.gongPitchSet = [260, 320, 340];
      vm.gongDuration = 0.04;
      vm.size = 240;
      vm.sides = 5;
      vm.active = true;
      vm.$onDestroy = () => {
        vm.active = false;
      }
      vm.builder.addGongDirective(this)
      vm.save = () => {
        let saveObj = {
          "name": vm.name,
          "rotationIncrement": vm.rotationIncrement,
          "volume": vm.gong.volume.value,
          "pitches": vm.gongPitchSet
        }
        return saveObj;
      }

    } // end of controller

    function link(scope, element, iAttrs, controller, transcludeFn){
      controller.canvas = element[0].childNodes[0];
      controller.context = controller.canvas.getContext("2d");
      controller.context.fillStyle = "pink";
      controller.context.setTransform(1, 0, 0, 1, 0, 0);
      controller.context.clearRect(0, 0, controller.canvas.width, controller.canvas.height);
      controller.context.translate(350, 350);

      controller.drawPent = (context) => {
        controller.mallet1 = controller.helper.makeMallet(controller.size * Math.cos(2 * Math.PI / controller.sides), controller.size * Math.sin(2 * Math.PI / controller.sides), 20);
        controller.mallet2 = controller.helper.makeMallet(controller.size * Math.cos(4 * Math.PI / controller.sides), controller.size * Math.sin(4 * Math.PI / controller.sides), 20);
        controller.mallet3 = controller.helper.makeMallet(controller.size * Math.cos(6 * Math.PI / controller.sides), controller.size * Math.sin(6 * Math.PI / controller.sides), 20);
        controller.mallet4 = controller.helper.makeMallet(controller.size * Math.cos(8 * Math.PI / controller.sides), controller.size * Math.sin(8 * Math.PI / controller.sides), 20);
        controller.mallet5 = controller.helper.makeMallet(controller.size * Math.cos(10 * Math.PI / controller.sides), controller.size * Math.sin(10 * Math.PI / controller.sides), 20);
        controller.helper.polyDraw(controller.context, controller.sides, controller.size, 3);

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

        context.beginPath();
        context.arc(controller.mallet4.x, controller.mallet4.y, controller.mallet4.r, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();

        context.beginPath();
        context.arc(controller.mallet5.x, controller.mallet5.y, controller.mallet5.r, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();
      }

      controller.stateUpdate = () => {
        controller.context.setTransform(1, 0, 0, 1, 0, 0);
        controller.context.clearRect(0, 0, controller.canvas.width, controller.canvas.height);
        controller.context.translate(350, 350);
        controller.context.rotate(controller.rotation);
        controller.drawPent(controller.context);
        controller.gongTime = Math.floor(controller.helper.rotationTable.length / controller.sides)
        if (controller.direction){
          controller.rotation = -((controller.helper.rotationTable[controller.i] * 0.01).toFixed(3));
        }
        else {
          controller.rotation = ((controller.helper.rotationTable[controller.i] * 0.01).toFixed(3));
        }


        if ( controller.i > controller.gongTime - controller.rotationIncrement && controller.i < controller.gongTime + controller.rotationIncrement){
          controller.gong.triggerAttackRelease(controller.gongPitchSet, controller.gongDuration);
          // console.log("pentagon")
          controller.i += controller.rotationIncrement;
        }
        else if ( controller.i > 2 * controller.gongTime - controller.rotationIncrement && controller.i < 2 * controller.gongTime + controller.rotationIncrement){
          controller.gong.triggerAttackRelease(controller.gongPitchSet, controller.gongDuration);
          // console.log("pentagon");
          controller.i += controller.rotationIncrement;
        }
        else if ( controller.i > 3 * controller.gongTime - controller.rotationIncrement && controller.i < 3 * controller.gongTime + controller.rotationIncrement){
          controller.gong.triggerAttackRelease(controller.gongPitchSet, controller.gongDuration);
          // console.log("pentagon");
          controller.i += controller.rotationIncrement;
        }
        else if ( controller.i > 4 * controller.gongTime - controller.rotationIncrement && controller.i < 4 * controller.gongTime + controller.rotationIncrement){
          controller.gong.triggerAttackRelease(controller.gongPitchSet, controller.gongDuration);
          // console.log("pentagon");
          controller.i += controller.rotationIncrement;
        }

        else if (controller.i < controller.helper.rotationTable.length - (controller.rotationIncrement +1)){
          controller.i += controller.rotationIncrement;
        }
        else {
            controller.i = 0;
            controller.gong.triggerAttackRelease(controller.gongPitchSet, controller.gongDuration);
            // console.log("pentagon");
          }
          if (controller.active){
            window.requestAnimationFrame(controller.stateUpdate);
          }
          else return;
        };
      controller.stateUpdate();
    }// end of link
})();
