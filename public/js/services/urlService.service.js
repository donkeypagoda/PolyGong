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
          vm.gongData = state.data.polygong_data;
          return vm.gongData;
        })
        .catch(function (error) {
        })
      }

      this.submitState = function(state){
        return $http.post('/polygongs', state)
        .then(function (response) {
          vm.displayUrl = response.data
          })
          .catch(function (error) {
          })
      }
    }
}());
