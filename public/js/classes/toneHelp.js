// freq ratios for scales, might replace this with arrpeggios
const allTwelve = ["all", 16/15, 9/8, 6/5, 5/4, 4/3, 45/32, 3/2, 8/5, 5/3, 16/9, 15/8]
const downTone = ["down", 16/9, 5/3, 8/5, 3/2, 45/32, 4/3, 5/4, 6/5, 9/8, 16/5, 1]
const upTone = ["up", 4/3, 3/2, 5/3, 9/8, 4/3, 3/2, 5/3, 9/8, 4/3, 3/2, 5/3, 9/8]

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
