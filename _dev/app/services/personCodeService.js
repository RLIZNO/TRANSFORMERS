
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('personCodeService', personCodeService);

    personCodeService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function personCodeService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var service = {
            generatePersonCode: generatePersonCode
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Se encarga de generar el cliente en siebel.
         * 
         *	@param {Object} json, con los datos del cliente para crearlo en core y siebel.
         *
         *	@return {Object} La respuesta del servicio, devolverá el codigo de persona.
         */
        function generatePersonCode(json) {

            return $http.post(PREFIX_URL.SERVICES + URL.GENERATE_PERSON_CODE, json)
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
