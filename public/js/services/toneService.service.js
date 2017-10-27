(function() {
  'use strict';
  angular.module('app')
    .service('toneService', service)

    function service(){
      const vm = this;

      vm.newGong = () =>{
        let gong = new Tone.PolySynth(3, Tone.MonoSynth).toMaster();
        gong.set({
          "frequency": 200,
          "detune": 0,
          "oscillator": {"type": "square7"},
          "filter": {
            "Q": 3,
            "type": "lowpass",
            "rolloff": -24
          },
          "envelope": {
            "attack": 0.003,
            "decay": 2,
            "sustain": 2,
            "release": 5
          },
          "filterEnvelope": {
            "attack": 0.06,
            "decay": 2,
            "sustain": 3,
            "release": 5,
            "baseFrequency": 500,
            "octaves": 3,
            "exponent": 1
          }
        })
        return gong;
      }



    }
}());
