class Heptagon {
  constructor (size, speed = 45, centArr, volume = 0.5, baseFreq, lfo, drone, delay, toneChoice, droneSlider, shimmySlider, bounceSlider) {
    this.name = "heptagon"
    this.size = size;
    this.speed = speed;
    this.volume = volume;
    this.centArr = centArr;
    this.baseFreq = baseFreq;
    this.lfo = lfo;
    this.drone = drone;
    this.delay = delay;
    this.toneChoice = toneChoice;
    this.droneSlider = droneSlider;
    this.shimmySlider = shimmySlider;
    this.bounceSlider = bounceSlider;
    this.numbSides = 7;
    this.malletColor = 0xffffff;
    this.malletMap = new THREE.TextureLoader().load('media/circle.png');
    this.malletMaterial =  new THREE.SpriteMaterial({map: this.malletMap, color: this.malletColor, alphaTest: 0.5, transparent: true});
    this.malletMaterial.color.setHSL( 1.0, 0.3, 0.7 );
    this.lineColor = 0x0000ff;
    this.lineMaterial = new THREE.LineBasicMaterial({ color: this.lineColor });

    //build the a group with lines and mallets
    this.group = helperPolygon(this.numbSides, this.size, this.centArr, this.malletMaterial, this.lineMaterial);
    this.rotationIncrement = Math.PI / (3000/this.speed);
    this.degreeIncrement = toDegree(this.rotationIncrement)
    this.quaternion = new THREE.Quaternion();
    this.currentPosition = 0;
    this.gongValue = 0;
    this.gong = makeGong();

    this.group.quaternion.onChange(() => {
      //color changes
      let h = ( 360 * ( 1.0 + Math.abs(this.group.quaternion.z) ) % 360 ) / 360;
      // note that if below children[1] is chosen, it changes the line instead of the mallet
      this.group.children[0].material.color.setHSL( h, 0.5, 0.5 );
    })

  } // end of constructor

  save(){
    let saveObj = {
      "name": this.name,
      "rotationIncrement": this.rotationIncrement,
      "volume": this.volume,
      "pitches": this.gongPitchSet,
      "size": this.size,
      "speed": this.speed,
      "centArr": this.centArr,
      "scale": this.group.scale,
      "currentPosition": this.currentPosition,
      "baseFreq": this.baseFreq,
      "lfoSize": this.lfo.max,
      "drone": this.drone,
      "delay": this.delay,
      "toneChoice": this.toneChoice,
      "droneSlider": this.droneSlider,
      "shimmySlider": this.shimmySlider,
      "bounceSlider": this.bounceSlider
    }
    console.log(saveObj);
    return saveObj;
  }
  setSpeed(val){
    this.rotationIncrement = Math.PI / (3000/parseFloat(val));
  }

  setScale(val){
    this.group.scale.set(parseFloat(val),parseFloat(val), parseFloat(val))
  }
  setVol(val){
    this.volume = val;
  }

  rotate(currentBase, toneChoice){
    this.baseFreq = currentBase;
    this.toneChoice = toneChoice;
    this.currentPosition += this.rotationIncrement;
    if (this.currentPosition > (2 * Math.PI)){
      this.currentPosition = 0;
      this.gongValue = 0;
    }
    if(this.currentPosition > this.gongValue ){
      this.gong.triggerAttackRelease(this.baseFreq * 2, this.volume * 0.02);
      const arc = (2 * Math.PI) / this.numbSides;
      this.gongValue = this.gongValue + arc;
    }
    // console.log(this.currentPosition);
    this.quaternion.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), this.rotationIncrement );
    this.group.applyQuaternion(this.quaternion);
  }
}
