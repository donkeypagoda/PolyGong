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
    controller.inject = ['helperService', 'gongBuilderService', 'toneService', 'urlService', '$state'];
    function controller(helperService, gongBuilderService, toneService, urlService, $state) {
      const vm = this;
      vm.tone = toneService;
      vm.builder = gongBuilderService;
      vm.url = urlService;

      vm.baseFreq = 250;
      vm.drone = vm.tone.droneBuilder(vm.baseFreq)
      vm.drone.volume.value = -36;
      vm.verb = vm.tone.makeVerb();
      vm.delay = vm.tone.makeDelay();
      vm.verb.wet.value = 0.0;
      vm.delay.wet.value = 0.0;
      Tone.Master.chain(vm.delay, vm.verb);

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
      vm.speed = 150;

      vm.circleAdd = () => {
        let circleShape = new Circle(vm.size, vm.speed, [0,0,0])
        vm.scene.add(circleShape.group);
        vm.builder.gongStack.push(circleShape);
        // console.log(vm.builder.gongStack);
      }

      vm.lineAdd = () => {
        let lineShape = new Line(vm.size, vm.speed, [0,0,0])
        vm.scene.add(lineShape.group);
        vm.builder.gongStack.push(lineShape);
      }

      vm.triangleAdd = () => {
        let triangleShape = new Triangle(vm.size, vm.speed, [0,0,0])
        vm.scene.add(triangleShape.group);
        vm.builder.gongStack.push(triangleShape);
      }

      vm.squareAdd = () => {
        let squareShape = new Square(vm.size, vm.speed, [0,0,0])
        vm.scene.add(squareShape.group);
        vm.builder.gongStack.push(squareShape);
      }

      vm.pentagonAdd = () => {
        let pentagonShape = new Pentagon(vm.size, vm.speed, [0,0,0])
        vm.scene.add(pentagonShape.group);
        vm.builder.gongStack.push(pentagonShape);
      }

      vm.hexagonAdd = () => {
        let hexagonShape = new Hexagon(vm.size, vm.speed, [0,0,0])
        vm.scene.add(hexagonShape.group);
        vm.builder.gongStack.push(hexagonShape);
      }


      vm.heptagonAdd = () => {
        let heptagonShape = new Heptagon(vm.size, vm.speed, [0,0,0])
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
          for (let i = 0; i < data.length; i++){
            let shape = vm.builder.shapeInstantiate(data[i])
            let quat = new THREE.Quaternion();
            quat.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), data[i].currentPosition);
            console.log(data[i].currentPosition);
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
      let verbInvoked = false;

      controller.droneVolume = (val) => {
        if (droneInvoked){
          controller.drone.volume.value = parseFloat(val);
          // console.log(controller.drone.volume.value);
        }
        else droneInvoked = true;
      }

      controller.delayMix = (val) => {
        if (delayInvoked){
          controller.delay.wet.value = parseFloat(val);
        }
        else delayInvoked = true;
      }
      controller.verbMix = (val) => {
        if (verbInvoked){
          controller.verb.wet.value = parseFloat(val);
        }
        else verbInvoked = true;
      }

      controller.getUrl = () => {
        let state = {
          "directives": controller.builder.gongStack.map((e)=>{return e.save()})
        }
        controller.url.submitState(state)
      }

    } // end of link
}());
