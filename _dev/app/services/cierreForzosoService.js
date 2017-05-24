
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('cierreForzosoService', cierreForzosoService);

    cierreForzosoService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function cierreForzosoService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {

      var service = {
            addCierreForzoso: addCierreForzoso,
            updateCierreForzoso: updateCierreForzoso,
            getCierreForzoso: getCierreForzoso
        };

        return service;

        /*INSERT CIERRE FORZOSO*/

        function addCierreForzoso(json){
            $http.post(PREFIX_URL.SERVICES + URL.ADD_CIERRE_FORZOSO, json)
              .then(
                  function(response) {
                      return response.data;
                  },
                  function(errResponse){
                      return $q.reject(errResponse);
                  }
              );
        }

        /*UPDATE CIERRE FORZOSO*/

        function updateCierreForzoso(json){
            $http.put(PREFIX_URL.SERVICES + URL.UPDATE_CIERRE_FORZOSO, json)
              .then(
                  function (response){
                      return response.data;
                  },
                  function (errResponse){
                      return $q.reject(errResponse);
                  }
              );
        }

        /*SELECT CIERRE FORZOSO*/

        function getCierreForzoso(docNumId){
            $http.get(PREFIX_URL.SERVICES + URL.GET_CIERRE_FORZOSO + '?documentType=2&documentNumber=' + docNumId )
              .then(
                  function (response){
                      deferred.resolve(response.data);
                  },
                  function (errResponse){
                      deferred.reject(errResponse);
                  }
              );
            return deferred.promise;
        }
    }

})();
