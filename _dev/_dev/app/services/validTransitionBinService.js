
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('validTransitionBinService', validTransitionBinService);

    validTransitionBinService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function validTransitionBinService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var service = {
            getvalidaTransition: getvalidaTransition
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
        function getvalidaTransition(codeOrigin, transiCode, product) {

            var user = 'AM029969';

            return $http.get(PREFIX_URL.SERVICES + URL.VALIDATE_BIN + '?bin=' + codeOrigin + '&productCode=' + transiCode + '&productName=' + product)
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
