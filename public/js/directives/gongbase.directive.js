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
      // vm.tone = toneService;
      vm.builder = gongBuilderService;
      vm.url = urlService;

      vm.baseFreq = 200;
      vm.masterLFO = makeLFO();
      vm.masterLFO.start();
      vm.drone = droneBuilder(vm.baseFreq)
      vm.drone.volume.value = -36;
      vm.drone.toMaster();
      vm.delay = makeDelay();
      vm.limiter = makeLimiter();
      Tone.Master.chain(vm.delay, vm.limiter);

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

      vm.circleAdd = () => {
        let circleShape = new Circle(vm.size, vm.speed, [0,0,0], 0.5, vm.baseFreq, vm.masterLFO, vm.drone, vm.delay)
        vm.masterLFO.connect(circleShape.gong.detune)
        circleShape.gong.toMaster();
        vm.scene.add(circleShape.group);
        vm.builder.gongStack.push(circleShape);
      }

      vm.lineAdd = () => {
        let lineShape = new Line(vm.size, vm.speed, [0,0,0], 0.5, vm.baseFreq, vm.masterLFO, vm.drone, vm.delay)
        vm.masterLFO.connect(lineShape.gong.detune)
        lineShape.gong.toMaster();
        vm.scene.add(lineShape.group);
        vm.builder.gongStack.push(lineShape);
      }

      vm.triangleAdd = () => {
        let triangleShape = new Triangle(vm.size, vm.speed, [0,0,0], 0.5, vm.baseFreq, vm.masterLFO, vm.drone, vm.delay)
        vm.masterLFO.connect(triangleShape.gong.detune)
        triangleShape.gong.toMaster();
        vm.scene.add(triangleShape.group);
        vm.builder.gongStack.push(triangleShape);
      }

      vm.squareAdd = () => {
        let squareShape = new Square(vm.size, vm.speed, [0,0,0], 0.5, vm.baseFreq, vm.masterLFO, vm.drone, vm.delay)
        vm.masterLFO.connect(squareShape.gong.detune)
        squareShape.gong.toMaster();
        vm.scene.add(squareShape.group);
        vm.builder.gongStack.push(squareShape);
      }

      vm.pentagonAdd = () => {
        let pentagonShape = new Pentagon(vm.size, vm.speed, [0,0,0], 0.5, vm.baseFreq, vm.masterLFO, vm.drone, vm.delay)
        vm.masterLFO.connect(pentagonShape.gong.detune)
        pentagonShape.gong.toMaster();
        vm.scene.add(pentagonShape.group);
        vm.builder.gongStack.push(pentagonShape);
      }

      vm.hexagonAdd = () => {
        let hexagonShape = new Hexagon(vm.size, vm.speed, [0,0,0], 0.5, vm.baseFreq, vm.masterLFO, vm.drone, vm.delay)
        vm.masterLFO.connect(hexagonShape.gong.detune)
        hexagonShape.gong.toMaster();
        vm.scene.add(hexagonShape.group);
        vm.builder.gongStack.push(hexagonShape);
      }


      vm.heptagonAdd = () => {
        let heptagonShape = new Heptagon(vm.size, vm.speed, [0,0,0], 0.5, vm.baseFreq, vm.masterLFO, vm.drone, vm.delay)
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
          vm.masterLFO.max = data[0].lfoSize
          vm.masterLFO.min = -data[0].lfoSize
          vm.drone.volume.value = data[0].drone
          console.log(data[0].drone);
          vm.delay.wet.value = parseFloat(data[0].delay);
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
          controller.builder.gongStack[i].rotate();
        }

        controller.renderer.render(controller.scene, controller.cam);
      }
      controller.animate()

      let droneInvoked = false;
      let delayInvoked = false;
      let shimmyInvoked = false;

      controller.droneVolume = (val) => {
        if (droneInvoked){
          controller.drone.volume.value = parseFloat(val);
        }
        else droneInvoked = true;
      }

      controller.delayMix = (val) => {
        if (delayInvoked){
          controller.delay.wet.value = parseFloat(val);
        }
        else delayInvoked = true;
      }
      controller.shimmyMix = (val) => {
        if (shimmyInvoked){
          for(let i = 0; i < controller.scene.children.length; i++){
            controller.masterLFO.min = -parseFloat(val)
            controller.masterLFO.max = parseFloat(val)
            // console.log(controller.masterLFO.min);
            // console.log(controller.masterLFO.max);
          }
        }
        else shimmyInvoked = true;
      }

      controller.getUrl = () => {
        let state = {
          "directives": controller.builder.gongStack.map((e)=>{return e.save()})
        }
        controller.url.submitState(state)
      }

    } // end of link
}());
