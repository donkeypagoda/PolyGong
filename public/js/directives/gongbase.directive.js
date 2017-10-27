(function() {
  'use strict';
  angular.module('app')
    .directive('gongbase', function() {
      return {
        controller,
        controllerAs: '$ctrl',
        link: link,
        template: `<canvas id="gongbase1" width="700" height="700"></canvas><div class="col-3" ng-repeat="g in $ctrl.gongStack track by $index"><gong-holder unit="{{g}}"></gong-holder><canvas id="gongbase2" width="700" height="700"></canvas></div>`
      }
    }) // end of directive
    controller.inject = ['helperService'];
    function controller(helperService) {
      const vm = this;
      vm.helper = helperService;
      // list for test: <hexagon></hexagon><pentagon></pentagon><square></square><triangle></triangle><line></line><circle></circle><heptagon></heptagon>
      vm.gongStack = ["hexagon", "pentagon","square", "triangle", "line", "circle", "heptagon"];

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
