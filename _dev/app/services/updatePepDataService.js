(function () {

    'use strict';

    angular
        .module('app')
        .service('updatePepDataService', updatePepDataService);

    updatePepDataService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function updatePepDataService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {

        var service = {
            putforeignCurrencyPepData: putforeignCurrencyPepData
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Actualiza los datos de moneda extranjera y PEP del cliente.
         * 
         *	@param {Object} json con la información de moneda extranjera y PEP del cliente a enviar. 
         * 
         *
         *	@return {Object} La respuesta del servicio.
         */
        function putforeignCurrencyPepData(json) {
            $http.put(PREFIX_URL.SERVICES + URL.UPDATE_FOREING_PEP_DATA, json)
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
