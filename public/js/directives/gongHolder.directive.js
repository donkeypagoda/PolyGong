(function() {
  'use strict';
  angular.module('app')
  .directive('gongHolder', ['$compile', 'gongBuilderService', 'toneService', function($compile, gongBuilderService, toneService){
    return {
      scope:{
        gong: '@'
      },
      link: function(scope, element){
          $(element).html(`<${scope.gong}></${scope.gong}>`);
          $compile($(element).contents())(scope)
          for (let i = 0; i < gongBuilderService.gongDirectives.length; i++){
            gongBuilderService.gongDirectives[i].gong.send(toneService.fxArray[0], 12);
            gongBuilderService.gongDirectives[i].gong.send(toneService.fxArray[1], 12);
            console.log(toneService.fxArray[0]);

          }
        }
    }
  }])
}());
