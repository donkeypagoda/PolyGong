(function() {
  'use strict';
  angular.module('app')
    .directive('gongbase', function() {
      return {
        controller,
        controllerAs: '$ctrl',
        link: link,
        template: `<canvas id="gongbase1" width="700" height="700"></canvas><square></square><circle></circle><triangle></triangle><line></line>`
      }
    }) // end of directive

    controller.inject = ['helperService'];
    function controller(helperService) {
      const vm = this;
      vm.helper = helperService;
      vm.gongStack = [];

    } // end of controller
    function link(scope, element, iAttrs, controller, transcludeFn){
      controller.canvas = element[0].childNodes[0];
      controller.context = controller.canvas.getContext("2d");
      controller.context.fillStyle = "black";
      controller.context.setTransform(1, 0, 0, 1, 0, 0);
      controller.context.clearRect(0, 0, controller.canvas.width, controller.canvas.height);
      controller.context.translate(350, 350);
      controller.helper.gongLine(controller.context);
    }
}());
