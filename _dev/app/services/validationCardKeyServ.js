
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('validationCardKeyServ', validationCardKeyServ);

    validationCardKeyServ.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function validationCardKeyServ(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var service = {
            getPositionKeyCard : getPositionKeyCard,
            validationCardKey : validationCardKey,
            getCreditReques : getCreditReques,
            gettariff : gettariff
         };

        return service;


        /**
         *	@ngdoc method CREDIT_REQUES
         *	@description
         *	Generar posición para validar la tarjeta de clave
         * 
         *  @param {String} documentNumber Numero de documento del cliente.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function gettariff(prodoctuvuty, document) {

            return $http.get(PREFIX_URL.SERVICES + URL.PRODOCT_DOCUMENTS + '?prodoctivityDocumentType=' + prodoctuvuty + '&documentNumber=' + document)
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
         *	@ngdoc method CREDIT_REQUES
         *	@description
         *	Generar posición para validar la tarjeta de clave
         * 
         *  @param {String} documentNumber Numero de documento del cliente.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function getCreditReques(idFlow) {

            return $http.get(PREFIX_URL.SERVICES + URL.CREDIT_CARD_REQUEST + '?idCustomerStepFlow=' + idFlow)
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
         *	@ngdoc method CREDIT_REQUES
         *	@description
         *	Generar posición para validar la tarjeta de clave
         * 
         *  @param {String} documentNumber Numero de documento del cliente.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function getPositionKeyCard(documentNumber) {

            return $http.get(PREFIX_URL.SERVICES + URL.POSITION_KEY_CARD + '?documentNumber=' + documentNumber)
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
         *	@ngdoc method CREDIT_REQUES
         *	@description
         *	Generar posición para validar la tarjeta de clave
         * 
         *  @param {String} documentNumber Numero de documento del cliente.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function getPositionKeyCard(documentNumber) {

            return $http.get(PREFIX_URL.SERVICES + URL.POSITION_KEY_CARD + '?documentNumber=' + documentNumber)
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
         *	Generar posición para validar la tarjeta de clave
         * 
         *  @param {json} json con la posición y el valor de la posición de la tarjeta de clave a validar
         *
         *	@return {Object} La respuesta del servicio.
         */
        function validationCardKey(json) {

            return $http.post(PREFIX_URL.SERVICES + URL.VALIDATE_KEY_CARD, json)
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
