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
      vm.$onInit = () => {
        vm.circleAdd = document.querySelector("#circleAdd");
        vm.lineAdd = document.querySelector("#lineAdd");
        vm.triangleAdd = document.querySelector("#triangleAdd");
        vm.squareAdd = document.querySelector("#squareAdd");
        vm.pentagonAdd = document.querySelector("#pentagonAdd");
        vm.hexagonAdd = document.querySelector("#hexagonAdd");
        vm.heptagonAdd = document.querySelector("#heptagonAdd");
        vm.lastRemove = document.querySelector("#lastRemove");

        vm.helper = helperService;
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

        vm.renderer = new THREE.WebGLRenderer();
        vm.renderer.setSize(window.innerWidth, window.innerHeight);
        vm.gongSpace = document.getElementById("gongSpace")
        vm.gongSpace.appendChild(vm.renderer.domElement);
        vm.cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
        vm.cam.position.set(0, 0, 50);
        vm.cam.lookAt(new THREE.Vector3(0, 0, 0));
        vm.scene = new THREE.Scene();
        vm.polyArr = [];
        vm.size = 3;
        vm.speed = 150;

        // console.log(vm.drone.volume.value);
        // console.log(vm.delay.wet.value);
        // console.log(vm.verb.wet.value);

        Tone.Master.chain(vm.delay, vm.verb);
        // restore from url
        // if ($state.params.url){
        //   // console.log($state.params.url);
        //   vm.url.getState($state.params.url)
        //   .then(()=>{
        //     // console.log(vm.url.gongData)
        //     //should replace this next section with a .map function or some shit
        //     vm.builder.gongStack = []
        //     for (let i = 0; i < vm.url.gongData.length; i++){
        //       vm.builder.gongStack.push(vm.url.gongData[i].name)
        //       // here is where I need to build the crap to go in the directives
        //     }
        //   })
        // }
      }
    } // end of controller
    function link(scope, element, iAttrs, controller, transcludeFn){
      controller.circleAdd.onclick = () => {
        let circleShape = new Circle(controller.size, controller.speed, [0,0,0])
        controller.scene.add(circleShape.group);
        controller.polyArr.push(circleShape);
      }

      controller.lineAdd.onclick = () => {
        let lineShape = new Line(controller.size, controller.speed, [0,0,0])
        controller.scene.add(lineShape.group);
        controller.polyArr.push(lineShape);
      }

      controller.triangleAdd.onclick = () => {
        let triangleShape = new Triangle(controller.size, controller.speed, [0,0,0])
        controller.scene.add(triangleShape.group);
        controller.polyArr.push(triangleShape);
      }

      controller.squareAdd.onclick = () => {
        let squareShape = new Square(controller.size, controller.speed, [0,0,0])
        controller.scene.add(squareShape.group);
        controller.polyArr.push(squareShape);
      }

      controller.pentagonAdd.onclick = () => {
        let pentagonShape = new Pentagon(controller.size, controller.speed, [0,0,0])
        controller.scene.add(pentagonShape.group);
        controller.polyArr.push(pentagonShape);
      }

      controller.hexagonAdd.onclick = () => {
        let hexagonShape = new Hexagon(controller.size, controller.speed, [0,0,0])
        controller.scene.add(hexagonShape.group);
        controller.polyArr.push(hexagonShape);
      }


      controller.heptagonAdd.onclick = () => {
        let heptagonShape = new Heptagon(controller.size, controller.speed, [0,0,0])
        controller.scene.add(heptagonShape.group);
        controller.polyArr.push(heptagonShape);
      }

      controller.lastRemove.onclick = () => {
        controller.scene.children.pop()
        controller.polyArr.pop()
      }


      controller.animate = function(){
        requestAnimationFrame(controller.animate);
        for(let i = 0; i < controller.scene.children.length; i++){
          controller.polyArr[i].rotate();
        }

        controller.renderer.render(controller.scene, controller.cam);
      }
      controller.animate()

      // controller.canvasBottom = element[0].getElementsByClassName("gongbase1")[0];
      // // console.log(element[0].getElementsByClassName("gongbase1"));
      // controller.contextBottom = controller.canvasBottom.getContext("2d");
      // controller.contextBottom.setTransform(1, 0, 0, 1, 0, 0);
      // controller.contextBottom.clearRect(0, 0, controller.canvasBottom.width, controller.canvasBottom.height);
      // controller.contextBottom.translate(350, 350);
      // controller.helper.gongBottomLine(controller.contextBottom, "yellow", 7);
      //
      // controller.canvasTop = element[0].getElementsByClassName("gongbase2")[0];
      // controller.contextTop = controller.canvasTop.getContext("2d");
      // controller.contextTop.setTransform(1, 0, 0, 1, 0, 0);
      // controller.contextTop.clearRect(0, 0, controller.canvasTop.width, controller.canvasTop.height);
      // controller.contextTop.translate(350, 350);
      // controller.helper.gongTopLine(controller.contextTop, "blue", 5);
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
          // console.log(controller.delay.wet.value);
        }
        else delayInvoked = true;
      }
      controller.verbMix = (val) => {
        if (verbInvoked){
          controller.verb.wet.value = parseFloat(val);
          // console.log(controller.verb.wet.value);
        }
        else verbInvoked = true;
      }

      controller.getUrl = () => {
        let state = {
          "directives": controller.builder.gongDirectives.map((e)=>{return e.save()})
        }
        controller.url.submitState(state)
      }

    } // end of link
}());
