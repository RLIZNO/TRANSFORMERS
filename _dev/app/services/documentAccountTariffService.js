
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('documentAccountTariffService', documentAccountTariffService);

    documentAccountTariffService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function documentAccountTariffService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var service = {
            accountTariff: accountTariff
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Genera el documento del tarifario para poder visualizarlo
         * 
         *	@param {json} json con la información de la cuenta de ahorros 
         *
         *	@return {Object} La respuesta del servicio.
         */
        function accountTariff(json) {


            return $http.post(PREFIX_URL.SERVICES + URL.ACCOUNT_TARIFF, json)
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