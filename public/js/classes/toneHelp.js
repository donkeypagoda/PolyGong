// freq ratios for scales, might replace this with arrpeggios
const allTwelve = [1, 16/15, 9/8, 6/5, 5/4, 4/3, 45/32, 3/2, 8/5, 5/3, 16/9, 15/8]

// // attack and relase arrays
const attackArr = [0.1, 0.08, 0.06 ,0.05, 0.04, 0.03];
const relArr = [6, 4, 3.5, 2.8, 2.2, 2, 1.9];

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
