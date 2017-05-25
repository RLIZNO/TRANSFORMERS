
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('validationClientService', validationClientService);

    validationClientService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function validationClientService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var self = {
            getValidationClient: getValidationClient,
            getvalidateClientCreditCard: getvalidateClientCreditCard,
            getSiebelCustomer: getSiebelCustomer,
            getValidaClientPortal: getValidaClientPortal,
            getValidaFico: getValidaFico
        };

        /**
         *	@ngdoc method
         *	@description
         *	Consulta si el usuario existe o no dentro de los clientes del banco.
         * 
         *	@param {String} idValue número de indentificacion del cliente.
         *	@param {String} typeDocumentValue Tipo de documento del cliente.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function getvalidateClientCreditCard(idValue, userName, typeDocumentValue, typeProducto) {

            var deferred = $q.defer();

            $http.get(PREFIX_URL.SERVICES + URL.VALIDATE_CREDIT_CARD + '?documentNumber=' + idValue + '&userName=' + userName + '&documentType=' + typeDocumentValue + '&bin=' + typeProducto)
                .then(
                    function (response) {
                    	if(response.data.success) {
                        	deferred.resolve(response.data.data);
                    	} else {
                    		deferred.reject(response.data.error);
                    	}
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }

        

        /**
         *	@ngdoc method
         *	@description
         *	Consulta si el usuario existe o no dentro de los clientes del banco.
         * 
         *	@param {String} idValue número de indentificacion del cliente.
         *	@param {String} typeDocumentValue Tipo de documento del cliente.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function getValidationClient(idValue, typeDocumentValue, userName) {

            var deferred = $q.defer();

            $http.get(PREFIX_URL.SERVICES + URL.VALIDATE_CLIENT + '?documentType=' + typeDocumentValue + '&documentNumber=' + idValue + '&userName=' + userName)
                .then(
                    function (response) {
                    	if(response.data.success) {
                        	deferred.resolve(response.data.data);
                    	} else {
                    		deferred.reject(response.data.error);
                    	}
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }

        /**
         *	@ngdoc method
         *	@description
         *	Consulta los datos desde sebeal.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function getSiebelCustomer(typeDocumentValue, idValue, userName) {

            var deferred = $q.defer();

            $http.get(PREFIX_URL.SERVICES + URL.VALIDD_CUSTOMER_SIEBEL + '?documentType=' + typeDocumentValue + '&documentNumber=' + idValue + '&userName=' + userName)
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

        /**
         * Servicio para obtener el Email del cliente y enviar el correo electronico cuando es de creación de ahorros
         * 
         * @param {any} id
         * @returns
         */
        function getValidaClientPortal(id, numberDocument, user) {
            return $http.get(PREFIX_URL.SERVICES + URL.VALID_CLIENT_PORTAL + '?documentType=' + id + '&documentNumber=' + numberDocument + '&userName=' + user)
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
         *  Consulta si el usuario existe o no dentro de los clientes del banco.
         * 
         *  @param {String} idValue número de indentificacion del cliente.
         *  @param {String} typeDocumentValue Tipo de documento del cliente.
         *
         *  @return {Object} La respuesta del servicio.
         */
        function getValidaFico(date, ducumenNumber, typeDocumentValue, typeHousing, housingTime, userName, income, typeProducto) {

            var deferred = $q.defer();

            $http.get(PREFIX_URL.SERVICES + URL.VALIDATE_FICO + '?contractDate=' + date + '&documentNumber=' + ducumenNumber + '&documentType=' + typeDocumentValue + '&housingType=' + typeHousing + '&housingTime=' + housingTime + '&userName=' + userName + '&customerIncome=' + income + '&bin=' + typeProducto)
                .then(
                    function (response) {
                        if(response.data.success) {
                            deferred.resolve(response.data.data);
                        } else {
                            deferred.reject(response.data.error);
                        }
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }


        return self;
        
    }

})();
