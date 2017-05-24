
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('validQualifersService', validQualifersService);

    validQualifersService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function validQualifersService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var service = {
            dataQuilifers: dataQuilifers,
            assignmentTarClave: assignmentTarClave,
            assignmentTarDebito: assignmentTarDebito,
            assignmentFormalization: assignmentFormalization
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Servico que se encarga de obtener los datos del cliente.
         * 
         *	@param {Object} Json con la informacion del cliente para asiganar traer los datos del cliente.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function dataQuilifers(json) {


            return $http.post(PREFIX_URL.SERVICES + URL.DATE_QUILIFERS, json)
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
         *	Servico que se encarga de obtener los datos del cliente.
         * 
         *	@param {Object} Json con la informacion del cliente para asiganar traer los datos del cliente.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function assignmentTarClave(jsonClave) {


            return $http.post(PREFIX_URL.SERVICES + URL.ASSIGNMENT_CLAVES, jsonClave)
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
         *	Servico que se encarga de obtener los datos del cliente.
         * 
         *	@param {Object} Json con la informacion del cliente para asiganar traer los datos del cliente.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function assignmentTarDebito(jsonDebit) {


            return $http.post(PREFIX_URL.SERVICES + URL.ASSIGNMENT_DEBIT, jsonDebit)
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
         *	Servico que se encarga de obtener los datos del cliente.
         * 
         *	@param {Object} Json con la informacion del cliente para asiganar traer los datos del cliente.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function assignmentFormalization(jsonForm) {


            return $http.post(PREFIX_URL.SERVICES + URL.ASSIGNMENT_FORMALIZATION, jsonForm)
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
