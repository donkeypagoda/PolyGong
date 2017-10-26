(function() {
  'use strict';
  angular.module('app')
    .service('toneService', service)

    function service(){
      const vm = this;
      this.gongMaker = () => {
        let gong = new Tone.MonoSynth()
        return gong;
      }


    }
}());
