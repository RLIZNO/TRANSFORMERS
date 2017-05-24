
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('assignDebitCardService', assignDebitCardService);

    assignDebitCardService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function assignDebitCardService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var service = {
            debitCardAssign: debitCardAssign
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Servico que se encarga de obtener el numero y el nombre de la tarjeta debito asignada.
         * 
         *	@param {Object} Json con la informacion del cliente para asiganar la tarjeta debito.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function debitCardAssign(json) {


            return $http.post(PREFIX_URL.SERVICES + URL.ASSIGN_DEBIT_CARD, json)
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
