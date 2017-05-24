(function () {

    'use strict';

    angular
        .module('app')
        .service('updateBasicDataService', updateBasicDataService);

    updateBasicDataService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function updateBasicDataService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {

        var service = {
            putBasicData: putBasicData,
            putBasicDataSiebel: putBasicDataSiebel
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Actualiza los datos basicos del cliente.
         * 
         *	@param {Object} json con la información basica del cliente a enviar. 
         * 
         *
         *	@return {Object} La respuesta del servicio.
         */
        function putBasicData(json) {
            $http.put(PREFIX_URL.SERVICES + URL.UPDATE_BASIC_DATA, json)
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
         *	Actualiza los datos basicos del cliente.
         * 
         *	@param {Object} json con la información basica del cliente a enviar a siebel. 
         * 
         *
         *	@return {Object} La respuesta del servicio.
         */
        function putBasicDataSiebel(json) {
            $http.put(PREFIX_URL.SERVICES + URL.SAVE_DATA_BASIC_SIEBEL, json)
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
