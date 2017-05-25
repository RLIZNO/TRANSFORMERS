(function () {

    'use strict';

    angular
        .module('app')
        .service('addTableAffliateService', addTableAffliateService);

    addTableAffliateService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function addTableAffliateService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {

        var service = {
            updateMantenimentAffiliate: updateMantenimentAffiliate,
            InsertAffiliate: InsertAffiliate,
            insertComerce: insertComerce
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
        function updateMantenimentAffiliate(json) {
            $http.post(PREFIX_URL.SERVICES + URL.UPDATE_TABLE_AFF, json)
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
        function InsertAffiliate(json) {
            $http.post(PREFIX_URL.SERVICES + URL.INSERT_TABLE_AFF, json)
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
        function insertComerce(json) {
            $http.post(PREFIX_URL.SERVICES + URL.INSERT_TABLE_COM, json)
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