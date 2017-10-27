(function() {
  'use strict';
  angular.module('app')
  .directive('gongHolder', ['$compile', function($compile){
    return {
      scope:{
        gong: '@'
      },
      link: function(scope, element){
          $(element).html(`<${scope.gong}></${scope.gong}>`);
          $compile($(element).contents())(scope)
        }
    }
  }])
}());
