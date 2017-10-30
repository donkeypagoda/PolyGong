(function() {
  'use strict';
  angular.module('app')
    .service('toneService', service)

    function service(){
      const vm = this;

      vm.droneBuilder = (pitch) => {
        let drone = new Tone.FMSynth();
        drone.oscillator.type = "sine"
        drone.modulation.type = "square"
        drone.volume.value = -36;
        drone.toMaster();

        let droneModLFO = new Tone.LFO();
        droneModLFO.connect(drone.modulationIndex)
        droneModLFO.min = 0.1;
        droneModLFO.max = 110;
        droneModLFO.frequency.value = 0.12;
        droneModLFO.set()

        droneModLFO.start();
        drone.triggerAttack(30)

        return drone;
      }

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

      vm.makeDelay = () => {
        let delay = new Tone.PingPongDelay(0.2, 0.5);
        delay.wet.value = 0.5;
        return delay;
      }

      vm.makeVerb = () => {
        let verb = new Tone.Convolver("media/concert-crowd.ogg", () =>{
          verb.wet.value = 0.3
          return verb
        })
      }


    }
}());
