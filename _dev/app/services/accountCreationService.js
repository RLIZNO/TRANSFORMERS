
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('accountCreationService', accountCreationService);

    accountCreationService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function accountCreationService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var service = {
            getAccountNumber: getAccountNumber
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Consulta si el usuario tiene permisos para crear cliente y cuenta, trae la información basica del usuario.
         * 
         *	@param {Object} json con los datos del cliente para crear una ceunta de ahorro.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function getAccountNumber(json) {

            return $http.post(PREFIX_URL.SERVICES + URL.ACCOUNT_CREATION, json)
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
