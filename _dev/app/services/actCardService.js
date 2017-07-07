(function () {

    'use strict';

    angular
        .module('app')
        .service('actCardService', actCardService);

    actCardService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function actCardService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {

        var service = {
            activateCredCard: activateCredCard,
            getDisableCreditCard: getDisableCreditCard
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Actualiza los datos del cliente en siebel.
         * 
         *	@param {Object} objeto con la información de los datos del cliente a actualizar. 
         * 
         *
         *	@return {Object} array que devuelve los objetos con sus filas afectadas.
         */
        function activateCredCard(json) {

          return  $http.post(PREFIX_URL.SERVICES + URL.ACTIVATE_CARD, json)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        return $q.reject(errResponse);
                    }
                );
        }

        function getDisableCreditCard(id,user){

            var deferred = $q.defer(); 
            
            $http.get(PREFIX_URL.SERVICES + URL.DISABLED_CARD + '?documentNumber=' + id + '&user=' + user )
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
