(function () {

    'use strict';

    angular
        .module('app')
        .service('updateLaborDataService', updateLaborDataService);

    updateLaborDataService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function updateLaborDataService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {

        var service = {
            putLaborData: putLaborData,
            putLaborDataSiebel: putLaborDataSiebel
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Actualiza los datos laborales del cliente.
         * 
         *	@param {Array} array con la información de los datos laborales del cliente a enviar. 
         * 
         *
         *	@return {Array} array que devuelve los objetos con sus filas afectadas
         */
        function putLaborData(array) {
            $http.put(PREFIX_URL.SERVICES + URL.UPDATE_LABOR_DATA, array)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        return $q.reject(errResponse);
                    }
                );
        }

        /**
         *	@ngdoc method
         *	@description
         *	Actualiza los datos laborales del cliente.
         * 
         *	@param {Array} array con la información de los datos laborales del cliente a enviar. 
         * 
         *
         *	@return {Array} array que devuelve los objetos con sus filas afectadas
         */
        function putLaborDataSiebel(array) {
            $http.put(PREFIX_URL.SERVICES + URL.UPDATE_LABOR_DATA_SIEBEL, array)
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
