(function() {
  'use strict';
  angular.module('app')
    .directive('gongbase', function() {
      return {
        controller,
        controllerAs: '$ctrl',
        link: link,
        templateUrl: "templates/gongbase.template.html"
      }
    }) // end of directive
    controller.inject = ['helperService', 'gongBuilderService', 'toneService'];
    function controller(helperService, gongBuilderService, toneService) {
      const vm = this;
      vm.helper = helperService;
      vm.tone = toneService;
      vm.builder = gongBuilderService;
      vm.dronePitch = 60;
      vm.drone = vm.tone.droneBuilder(vm.dronePitch)
      vm.verb = vm.tone.makeVerb();
      vm.delay = vm.tone.makeDelay();


    } // end of controller
    function link(scope, element, iAttrs, controller, transcludeFn){
      controller.canvasBottom = element[0].getElementsByClassName("gongbase1")[0];
      // console.log(element[0].getElementsByClassName("gongbase1"));
      controller.contextBottom = controller.canvasBottom.getContext("2d");
      controller.contextBottom.setTransform(1, 0, 0, 1, 0, 0);
      controller.contextBottom.clearRect(0, 0, controller.canvasBottom.width, controller.canvasBottom.height);
      controller.contextBottom.translate(350, 350);
      controller.helper.gongBottomLine(controller.contextBottom, "yellow", 7);

      controller.canvasTop = element[0].getElementsByClassName("gongbase2")[0];
      controller.contextTop = controller.canvasTop.getContext("2d");
      controller.contextTop.setTransform(1, 0, 0, 1, 0, 0);
      controller.contextTop.clearRect(0, 0, controller.canvasTop.width, controller.canvasTop.height);
      controller.contextTop.translate(350, 350);
      controller.helper.gongTopLine(controller.contextTop, "blue", 5);

      controller.droneVolume = (val) => {
        console.log(val);
        controller.drone.volume.value = parseFloat(val);
      }
      controller.droneVolume = (val) => {
        console.log(val);
        controller.verb.wet.value = parseFloat(val);
      }
      controller.droneVolume = (val) => {
        console.log(val);
        controller.delay.wet.value = parseFloat(val);
      }
    } // end of link
}());
