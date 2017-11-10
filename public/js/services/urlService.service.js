(function() {
  'use strict';
  angular.module('app')
    .service('urlService', service)

    service.$inject = ["$http", "$stateParams", "$state"]
    function service($http, $stateParams, $state){
      const vm = this;
      vm.displayUrl = "";
      vm.gongData = [];

      this.getState = function (url){
        return $http.get(`/polygongs/${url}`)
        .then(function (state) {
          // console.log(state.data.polygong_data);
          vm.gongData = state.data.polygong_data;
          return vm.gongData;
        })
      }

      this.submitState = function(state){
        // console.log(state);
        return $http.post('/polygongs', state)
        .then(function (response) {
          vm.displayUrl = response.data
          // $state.reload('/', {url: vm.displayUrl})
          $state.transitionTo('gongbase', {url: vm.displayUrl}, {
              location: true,
              inherit: true,
              relative: $state.$current,
              notify: false
          })
          .then(function(tacos) {
            console.log(tacos);
          })
          .catch(function (tacos) {
            console.log(tacos);
          })
        })
      }
    }
}());
