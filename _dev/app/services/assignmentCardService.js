
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('assignmentCardService', assignmentCardService);

    assignmentCardService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function assignmentCardService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var service = {
            getKeyCard: getKeyCard
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Asiganción y activación de tarjeta de clave de un cliente
         * 
         *	@param {Object} Json con la información del cliente para siganar tarjeta de clave
         *
         *	@return {Object} La respuesta del servicio.
         */
        function getKeyCard(json) {
            return $http.post(PREFIX_URL.SERVICES + URL.KEY_CARD_ASSIGNMENT, json)
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
