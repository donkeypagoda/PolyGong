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

      vm.makeDelay = () => {
        let delay = new Tone.PingPongDelay(0.2, 0.5);
        delay.wet.value = 0.0
        return delay;
      }

      vm.makeVerb = () => {
        let verb = new Tone.Convolver("media/concert-crowd.ogg")
        verb.wet.value = 0.0;
        return verb;
      }

    }
}());
