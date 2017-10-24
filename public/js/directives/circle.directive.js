(function() {
  'use strict';
  angular.module('app')
    .directive('circle', function(){
      return {
        controller: controller,
        link: link,
        template: "<canvas id="canvas1" width="700" height="700"></canvas>"
      };

    })

    controller.$inject = ['helperService']
    function controller(helperService){
      const vm = this;
      vm.helper = helperService;

    } // end of controller

    function link(scope, iElement, iAttrs, controller, transcludeFn){
      const root = $(iElement)
      // have to build the event listeners in here

      // controller.time = root.find('#delayTime');
      // controller.feedbackSlider = root.find("#delayFeedback");
      // controller.delayWetDryMix = root.find("#delayWetDryMix");
      // controller.delayBypass = root.find("#delayBypass");
      // controller.delayInputBypass = root.find("#delayInputBypass");
      // controller.feedbackBypass = root.find("#feedbackBypass");
      // // console.log(controller.time);


    } // end of link
})();
