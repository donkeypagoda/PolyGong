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
      vm.tones = toneService;
      vm.builder = gongBuilderService;
      vm.removeLastAndRebuild = function(){
        vm.builder.removeLastGong();
      }

    } // end of controller
    function link(scope, element, iAttrs, controller, transcludeFn){
      controller.canvasBottom = element[0].childNodes[2];
      controller.contextBottom = controller.canvasBottom.getContext("2d");
      controller.contextBottom.setTransform(1, 0, 0, 1, 0, 0);
      controller.contextBottom.clearRect(0, 0, controller.canvasBottom.width, controller.canvasBottom.height);
      controller.contextBottom.translate(350, 350);
      controller.helper.gongBottomLine(controller.contextBottom, "yellow", 7);

      controller.canvasTop = element[0].childNodes[element[0].childNodes.length - 2];
      controller.contextTop = controller.canvasTop.getContext("2d");
      controller.contextTop.setTransform(1, 0, 0, 1, 0, 0);
      controller.contextTop.clearRect(0, 0, controller.canvasTop.width, controller.canvasTop.height);
      controller.contextTop.translate(350, 350);
      controller.helper.gongTopLine(controller.contextTop, "blue", 5);

    }
}());
