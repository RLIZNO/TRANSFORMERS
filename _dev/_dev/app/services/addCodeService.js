(function () {

    'use strict';

    angular
        .module('app')
        .service('addCodeService', addCodeService);

    addCodeService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function addCodeService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {

        var service = {
            addManteniment: addManteniment,
            allTable: allTable,
            updateManteniment: updateManteniment,
            updateRole: updateRole
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
        function addManteniment(json) {
            $http.post(PREFIX_URL.SERVICES + URL.ADD_CODE_PARAM, json)
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
        function updateRole(json) {
            $http.post(PREFIX_URL.SERVICES + URL.UPDATE_ROLE, json)
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
        function updateManteniment(json) {
            $http.post(PREFIX_URL.SERVICES + URL.UPDATE_CODE_PARAM, json)
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
         *	Consulta los datos desde sebeal.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function allTable() {

            var deferred = $q.defer();

            $http.get(PREFIX_URL.SERVICES + URL.ALL_CODE_PARAM)
                .then(
                    function (response) {
                            deferred.resolve(response.data);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }



    }

})();
