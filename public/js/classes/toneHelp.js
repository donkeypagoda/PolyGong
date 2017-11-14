function makeGong(){
  let synth = new Tone.Synth
  synth.oscillator.type = "sine"
  synth.envelope.attack = 0.03;
  synth.envelope.decay = 0.08;
  synth.envelope.sustain = 0.06;
  synth.envelope.release = 2;
  return synth;
}

function droneBuilder(pitch){
  let drone = new Tone.Oscillator(pitch * 0.25)
  drone.start()
  return drone;
}

function makeDelay(){
  let delay = new Tone.PingPongDelay(0.2, 0.5);
  delay.wet.value = 0.0
  return delay;
}

function makeLFO(){
  let lfo = new Tone.LFO(7, -1, 1);
  return lfo;
}

function makeLimiter(){
  let limiter = new Tone.Limiter(-10);
  return limiter;
}
