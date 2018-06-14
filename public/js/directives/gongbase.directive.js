(function() {
  'use strict';
  angular.module('app')
    .directive('gongbase', function() {
      return {
        controller,
        controllerAs: '$ctrl',
        link: link,
        templateUrl: "templates/gongbase.template.html"
      }
    }) // end of directive
    controller.inject = ['gongBuilderService', 'urlService', '$state'];
    function controller(gongBuilderService, urlService, $state) {
      const vm = this;
      vm.builder = gongBuilderService;
      vm.url = urlService;

      //svgs for buttons
      vm.tri = document.getElementById("trianglePath")
      vm.square = document.getElementById("squarePath")
      vm.pent = document.getElementById("pentagonPath")
      vm.hex = document.getElementById("hexagonPath")
      vm.hept = document.getElementById("heptagonPath")
      svgPoints(3, 25, 25, 25, vm.tri);
      svgPoints(4, 25, 25, 25, vm.square);
      svgPoints(5, 25, 25, 25, vm.pent);
      svgPoints(6, 25, 25, 25, vm.hex);
      svgPoints(7, 25, 25, 25, vm.hept);

      vm.baseFreq = 200;
      vm.allTwelve = ["all", 16/15, 9/8, 6/5, 5/4, 4/3, 45/32, 3/2, 8/5, 5/3, 16/9, 15/8]
      vm.downTone = ["down", 16/9, 5/3, 8/5, 3/2, 45/32, 4/3, 5/4, 6/5, 9/8, 16/5, 1]
      vm.upTone = ["up", 4/3, 3/2, 5/3, 9/8, 4/3, 3/2, 5/3, 9/8, 4/3, 3/2, 5/3, 9/8]
      vm.toneChoice = vm.allTwelve;
      vm.masterLFO = makeLFO();
      vm.masterLFO.start();
      vm.drone = droneBuilder(vm.baseFreq)
      vm.drone.volume.value = -42.0;
      vm.drone.toMaster();
      vm.delay = makeDelay();
      vm.limiter = makeLimiter();
      Tone.Master.chain(vm.delay, vm.limiter)

      vm.width = window.innerWidth;
      vm.height = window.innerHeight
      vm.renderer = new THREE.WebGLRenderer();
      vm.renderer.setSize(vm.width, vm.height);
      vm.gongSpace = document.getElementById("gongSpace")
      vm.gongSpace.appendChild(vm.renderer.domElement);
      vm.cam = new THREE.PerspectiveCamera(45, vm.width / vm.height, 1, 100);
      vm.cam.position.set(0, 0, 50);
      vm.cam.lookAt(new THREE.Vector3(0, 0, 0));
      vm.scene = new THREE.Scene();

      vm.size = 3;
      vm.speed = 45;
      vm.droneInvoked = false;
      vm.delayInvoked = false;
      vm.shimmyInvoked = false;

      vm.circleAdd = () => {
        let circleShape = new Circle(vm.size, vm.speed, [0,0,0], 0.5, vm.baseFreq, vm.masterLFO, vm.drone, vm.delay, vm.toneChoice, vm.droneSlider, vm.shimmySlider, vm.bounceSlider)
        vm.masterLFO.connect(circleShape.gong.detune)
        circleShape.gong.toMaster();
        vm.scene.add(circleShape.group);
        vm.builder.gongStack.push(circleShape);
      }

      vm.lineAdd = () => {
        let lineShape = new Line(vm.size, vm.speed, [0,0,0], 0.5, vm.baseFreq, vm.masterLFO, vm.drone, vm.delay, vm.toneChoice, vm.droneSlider, vm.shimmySlider, vm.bounceSlider)
        vm.masterLFO.connect(lineShape.gong.detune)
        lineShape.gong.toMaster();
        vm.scene.add(lineShape.group);
        vm.builder.gongStack.push(lineShape);
      }

      vm.triangleAdd = () => {
        let triangleShape = new Triangle(vm.size, vm.speed, [0,0,0], 0.5, vm.baseFreq, vm.masterLFO, vm.drone, vm.delay, vm.toneChoice, vm.droneSlider, vm.shimmySlider, vm.bounceSlider)
        vm.masterLFO.connect(triangleShape.gong.detune)
        triangleShape.gong.toMaster();
        vm.scene.add(triangleShape.group);
        vm.builder.gongStack.push(triangleShape);
      }

      vm.squareAdd = () => {
        let squareShape = new Square(vm.size, vm.speed, [0,0,0], 0.5, vm.baseFreq, vm.masterLFO, vm.drone, vm.delay, vm.toneChoice, vm.droneSlider, vm.shimmySlider, vm.bounceSlider)
        vm.masterLFO.connect(squareShape.gong.detune)
        squareShape.gong.toMaster();
        vm.scene.add(squareShape.group);
        vm.builder.gongStack.push(squareShape);
      }

      vm.pentagonAdd = () => {
        let pentagonShape = new Pentagon(vm.size, vm.speed, [0,0,0], 0.5, vm.baseFreq, vm.masterLFO, vm.drone, vm.delay, vm.toneChoice, vm.droneSlider, vm.shimmySlider, vm.bounceSlider)
        vm.masterLFO.connect(pentagonShape.gong.detune)
        pentagonShape.gong.toMaster();
        vm.scene.add(pentagonShape.group);
        vm.builder.gongStack.push(pentagonShape);
      }

      vm.hexagonAdd = () => {
        let hexagonShape = new Hexagon(vm.size, vm.speed, [0,0,0], 0.5, vm.baseFreq, vm.masterLFO, vm.drone, vm.delay, vm.toneChoice, vm.droneSlider, vm.shimmySlider, vm.bounceSlider)
        vm.masterLFO.connect(hexagonShape.gong.detune)
        hexagonShape.gong.toMaster();
        vm.scene.add(hexagonShape.group);
        vm.builder.gongStack.push(hexagonShape);
      }


      vm.heptagonAdd = () => {
        let heptagonShape = new Heptagon(vm.size, vm.speed, [0,0,0], 0.5, vm.baseFreq, vm.masterLFO, vm.drone, vm.delay, vm.toneChoice, vm.droneSlider, vm.shimmySlider, vm.bounceSlider)
        vm.masterLFO.connect(heptagonShape.gong.detune)
        heptagonShape.gong.toMaster();
        vm.scene.add(heptagonShape.group);
        vm.builder.gongStack.push(heptagonShape);
      }

      vm.lastRemove = () => {
        vm.scene.children.pop()
        vm.builder.gongStack.pop()
      }

      // restore from url
      if ($state.params.url){
        vm.url.getState($state.params.url)
        .then((data)=>{
          vm.builder.gongStack = []
          vm.baseFreq = data[data.length - 1].baseFreq
          if (data[data.length - 1].droneSlider !== -36){
            vm.droneInvoked = true;
            vm.drone.volume.value = data[0].droneSlider
            vm.droneSlider = data[0].droneSlider
          }

          if (data[data.length - 1].shimmySlider !== 0.0){
            vm.shimmyInvoked = true;
            vm.masterLFO.max = data[0].shimmySlider
            vm.masterLFO.min = -data[0].shimmySlider
            vm.shimmySlider = data[0].shimmySlider
          }

          if (data[data.length - 1].bounceSlider !== 0.0){
            vm.delayInvoked = true;
            vm.delay.wet.value = data[0].bounceSlider;
            console.log(data[0].bounceSlider);
            vm.bounceSlider = data[0].bounceSlider
          }

          if (data[0].toneChoice[0] === "all"){
            vm.toneChoice = vm.allTwelve
          }
          if (data[0].toneChoice[0] === "down"){
            vm.toneChoice = vm.downTone
          }
          if (data[0].toneChoice[0] === "up"){
            vm.toneChoice = vm.upTone
          }
          
          for (let i = 0; i < data.length; i++){
            let shape = vm.builder.shapeInstantiate(data[i], vm.masterLFO)
            shape.group.scale.set(parseFloat(data[i].scale.x), parseFloat(data[i].scale.y), parseFloat(data[i].scale.z))
            let quat = new THREE.Quaternion();
            quat.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), data[i].currentPosition);
            shape.group.applyQuaternion(quat);
            vm.scene.add(shape.group)
          }
        })
      }
    } // end of controller

    function link(scope, element, iAttrs, controller, transcludeFn){
      controller.animate = function(){
        requestAnimationFrame(controller.animate);
        for(let i = 0; i < controller.scene.children.length; i++){
          controller.builder.gongStack[i].rotate(controller.baseFreq, controller.toneChoice);
        }

        controller.renderer.render(controller.scene, controller.cam);
      }
      controller.animate()

      controller.droneVolume = (val) => {
        if (controller.droneInvoked){
          controller.drone.volume.value = parseFloat(val);
        }
        else controller.droneInvoked = true;
      }

      controller.delayMix = (val) => {
        if (controller.delayInvoked){
          controller.delay.wet.value = (val).toFixed(3);
        }
        else controller.delayInvoked = true;
      }
      controller.shimmyMix = (val) => {
        if (controller.shimmyInvoked){
          for(let i = 0; i < controller.scene.children.length; i++){
            controller.masterLFO.min = -parseFloat(val)
            controller.masterLFO.max = parseFloat(val)
          }
        }
        else controller.shimmyInvoked = true;
      }
      controller.freqChoice = (val) => {
        controller.drone.frequency.value = (0.25 * val)
      }
      controller.toneChooser = (val) => {
      }
      controller.getUrl = () => {
        let state = {
          "directives": controller.builder.gongStack.map((e)=>{return e.save()})
        }
        controller.url.submitState(state)
      }
      controller.clipboard = new Clipboard('.btn');
      controller.clipboard.on('success', function(e) {
          console.log(e);
      });
      controller.clipboard.on('error', function(e) {
          console.log(e);
      });
    } // end of link
}());
