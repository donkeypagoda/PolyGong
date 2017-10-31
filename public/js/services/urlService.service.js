(function() {
  'use strict';
  angular.module('app')
    .service('urlService', service)

    service.$inject = ["$http", "$stateParams"]
    function service($http, $stateParams){
      const vm = this;

      this.getState = function (){
        return $http.get(`/polygongs/${$stateParams.id}`)
        .then(function (state) {
          return state.data
        })
      }

      this.submitState = function(state){
        console.log(state);
        return $http.post('/polygongs', state)
        .then(function (response) {
          return response.data

        })
      }



    }
}());
