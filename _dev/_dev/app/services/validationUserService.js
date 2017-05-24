
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('validationUserService', validationUserService);

    validationUserService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function validationUserService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var service = {
            getValidationUser: getValidationUser
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Consulta si el usuario tiene permisos para crear cliente y cuenta, trae la información basica del usuario.
         * 
         *	@param {String} userName nombre de usuario de red.
         *
         *	@return {Object} La respuesta del servicio.
         */
        function getValidationUser(userName) {

            var user = 'AM029969';

            return $http.get(PREFIX_URL.SERVICES + URL.VALIDATE_USER + '?userName=' + userName)
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
