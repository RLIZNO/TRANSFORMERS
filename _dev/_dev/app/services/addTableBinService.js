(function () {

    'use strict';

    angular
        .module('app')
        .service('addTableBinService', addTableBinService);

    addTableBinService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function addTableBinService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {

        var service = {
            updateMantenimentBin: updateMantenimentBin,
            InsertBin: InsertBin,
            insertRole: insertRole
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
        function updateMantenimentBin(json) {
            $http.post(PREFIX_URL.SERVICES + URL.UPDATE_TABLE_BIN, json)
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
         *	Actualiza los datos del cliente en siebel.
         * 
         *	@param {Object} objeto con la información de los datos del cliente a actualizar. 
         * 
         *
         *	@return {Object} array que devuelve los objetos con sus filas afectadas.
         */
        function InsertBin(json) {
            $http.post(PREFIX_URL.SERVICES + URL.INSERT_TABLE_BIN, json)
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
         *  @ngdoc method
         *  @description
         *  Actualiza los datos del cliente en siebel.
         * 
         *  @param {Object} objeto con la información de los datos del cliente a actualizar. 
         * 
         *
         *  @return {Object} array que devuelve los objetos con sus filas afectadas.
         */
        function insertRole(json) {
            $http.post(PREFIX_URL.SERVICES + URL.INSERT_TABLE_ROLE, json)
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