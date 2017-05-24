
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
            getValidationEmail: getValidationEmail,
            getValidationEmailAccount: getValidationEmailAccount,
            getValidaClientPortal: getValidaClientPortal
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
        function getValidationClient(idValue, typeDocumentValue, userName) {

            var deferred = $q.defer();

            $http.get(PREFIX_URL.SERVICES + URL.VALIDATE_CLIENT + '?documentType=' + typeDocumentValue + '&documentNumber= ' + idValue + '&userName=' + userName)
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
         * Servicio para obtener el Email del cliente
         * 
         * @param {any} id
         * @returns
         */
        function getValidationEmail(id, email) {
            return $http.get(PREFIX_URL.SERVICES + URL.SEND_EMAIL + '?documentNumber=' + id + '&email=' + email)
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
         * Servicio para obtener el Email del cliente y enviar el correo electronico cuando es de creación de ahorros
         * 
         * @param {any} id
         * @returns
         */
        function getValidationEmailAccount(id, email) {
            return $http.get(PREFIX_URL.SERVICES + URL.SEND_EMAIL_ACCOUNT + '?documentNumber=' + id + '&email=' + email)
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

        return self;
        
    }

})();
