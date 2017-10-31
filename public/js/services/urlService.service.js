(function() {
  'use strict';
  angular.module('app')
    .service('urlService', service)

    service.$inject = ["$http", "$stateParams"]
    function service($http, $stateParams){
      const vm = this;
      vm.displayUrl;

      this.getState = function (){
        return $http.get(`/polygongs/${$state.params}`)
        .then(function (state) {
          return state.data
        })
      }

      this.submitState = function(state){
        // console.log(state);
        return $http.post('/polygongs', state)
        .then(function (response) {
          // console.log(response.data)
          vm.displayUrl = response.data

        })
      }



    }
}());
