(function () {

    'use strict';

    angular
        .module('app')
        .service('updateSiebelDataService', updateSiebelDataService);

    updateSiebelDataService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function updateSiebelDataService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {

        var service = {
            putSiebelData: putSiebelData
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Actualiza los datos del cliente en siebel.
         * 
         *	@param {Object} objeto con la información de los datos del cliente a actualizar. 
         * 
         *
         *	@return {Object} array que devuelve los objetos con sus filas afectadas.
         */
        function putSiebelData(json) {
            $http.put(PREFIX_URL.SERVICES + URL.UPDATE_SIEBEL_DATA, json)
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
