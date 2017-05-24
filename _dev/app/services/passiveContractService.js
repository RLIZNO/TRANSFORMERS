
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('passiveContractService', passiveContractService);

    passiveContractService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function passiveContractService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var service = {
            getContractPassive: getContractPassive
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Genera el contrato de cuentas pasivas en version PDF firmado digitalmente
         * 
         *	@param {Object} Json con los datos del cliente para crear el contrato.
         *
         *	@return {Objec} Json con la URL del documento pdf a visualizar.
         */
        function getContractPassive(json) {

            return $http.post(PREFIX_URL.SERVICES + URL.PASSIVE_CONTRACT, json)
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
