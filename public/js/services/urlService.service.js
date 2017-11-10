(function() {
  'use strict';
  angular.module('app')
    .service('urlService', service)

    service.$inject = ["$http", "$stateParams"]
    function service($http, $stateParams){
      const vm = this;
      vm.displayUrl = "";
      vm.gongData = [];

      this.getState = function (url){
        return $http.get(`/polygongs/${url}`)
        .then(function (state) {
          console.log(state.data.polygong_data);
          vm.gongData = state.data.polygong_data;
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
