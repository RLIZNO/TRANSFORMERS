 
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('validTransitionRuleService', validTransitionRuleService);

    validTransitionRuleService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function validTransitionRuleService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var service = {
            getTableRole: getTableRole
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
        function getTableRole(ruleType, producType, status) {

            var user = 'AM029969';

            return $http.get(PREFIX_URL.SERVICES + URL.VALIDATE_RULE + '?ruleType=' + ruleType + '&productType=' + producType + '&status=' + status)
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
