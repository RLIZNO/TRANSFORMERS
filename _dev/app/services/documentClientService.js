
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('documentClientService', documentClientService);

    documentClientService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function documentClientService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var service = {
            knowYourClient: knowYourClient
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Genera el documento conozca a su cliente, en ProDoctivity para visualizar
         * 
         *	@param {json} json con la información del cliente creado
         *
         *	@return {Object} La respuesta del servicio.
         */
        function knowYourClient(json) {


            return $http.post(PREFIX_URL.SERVICES + URL.DOCUMENT_CLIENT, json)
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
