(function() {
  'use strict';
  angular.module('app')
    .directive('gongbase', function() {
      return {
        controller,
        controllerAs: '$ctrl',
        link: link,
        template: `<canvas id="gongbase1" width="700" height="700"></canvas><div ng-repeat="g in $ctrl.builder.gongStack track by $index"><gong-holder gong="{{g}}"></gong-holder></div><canvas id="gongbase2" width="700" height="700"></canvas>`
      }
    }) // end of directive
    controller.inject = ['helperService', 'gongBuilderService', 'toneService'];
    function controller(helperService, gongBuilderService, toneService) {
      const vm = this;
      vm.helper = helperService;
      vm.tones = toneService;
      vm.builder = gongBuilderService;
      // list for test: <hexagon></hexagon><pentagon></pentagon><square></square><triangle></triangle><line></line><circle></circle><heptagon></heptagon>
      // vm.gongStack = ["hexagon", "pentagon"];
      // "hexagon", "pentagon", "square", "triangle", "line", "circle", "heptagon"
    } // end of controller
    function link(scope, element, iAttrs, controller, transcludeFn){
      controller.canvasBottom = element[0].childNodes[0];
      controller.contextBottom = controller.canvasBottom.getContext("2d");
      controller.contextBottom.fillStyle = "black";
      controller.contextBottom.setTransform(1, 0, 0, 1, 0, 0);
      controller.contextBottom.clearRect(0, 0, controller.canvasBottom.width, controller.canvasBottom.height);
      controller.contextBottom.translate(350, 350);
      controller.helper.gongBottomLine(controller.contextBottom);

      controller.canvasTop = element[0].childNodes[2];
      controller.contextTop = controller.canvasTop.getContext("2d");
      controller.contextTop.fillStyle = "blue";
      controller.contextTop.setTransform(1, 0, 0, 1, 0, 0);
      controller.contextTop.clearRect(0, 0, controller.canvasTop.width, controller.canvasTop.height);
      controller.contextTop.translate(350, 350);
      controller.helper.gongTopLine(controller.contextTop);

    }
}());
