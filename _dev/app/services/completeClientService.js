
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('completeClientService', completeClientService);

    completeClientService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function completeClientService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var service = {
            finalizeCreation : finalizeCreation
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Servicio que modifica el estado del cliente en base de datos como completado
         * 
         *	@param {String} documentNumber numero de identificación del cliente.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function finalizeCreation(documentNumber) {

            return $http.put(PREFIX_URL.SERVICES + URL.COMPLETE_CLIENTE_DATA + '?documentNumber=' + documentNumber)
                .then(
                    function (response) {
                    	return response.data;
                    },
                      function (errResponse) {
                        return $q.reject(errResponse);
                    }
                );

        }

    }

})();
