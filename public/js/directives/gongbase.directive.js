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
    controller.inject = ['helperService', 'gongBuilderService', 'toneService', 'urlService', '$state'];
    function controller(helperService, gongBuilderService, toneService, urlService, $state) {
      const vm = this;
      vm.helper = helperService;
      vm.tone = toneService;
      vm.builder = gongBuilderService;
      vm.url = urlService;
      vm.dronePitch = 60;
      vm.drone = vm.tone.droneBuilder(vm.dronePitch)
      vm.verb = vm.tone.makeVerb();
      vm.delay = vm.tone.makeDelay();
      vm.verb.wet.value = 0.0;
      vm.delay.wet.value = 0.0;
      Tone.Master.chain(vm.delay, vm.verb);
      if ($state.params.url){
        // console.log($state.params.url);
        vm.url.getState($state.params.url)
        .then(()=>{
          console.log(vm.url.gongData)
          //should replace this next section with a .map function or some shit
          vm.builder.gongStack = []
          for (let i = 0; i < vm.url.gongData.length; i++){
            vm.builder.gongStack.push(vm.url.gongData[i].name)
          }

        })
      }


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
        controller.drone.volume.value = parseFloat(val);
        // console.log(controller.drone.volume.value);
      }
      controller.delayMix = (val) => {
        controller.delay.wet.value = parseFloat(val);
        // console.log(val);
      }
      controller.verbMix = (val) => {
        controller.verb.wet.value = parseFloat(val);
        // console.log(controller.verb.wet.value);
      }

      controller.getUrl = () => {
        let state = {
          "directives": controller.builder.gongDirectives.map((e)=>{return e.save()})
        }
        controller.url.submitState(state)
      }
      //drawer script



    } // end of link
}());
