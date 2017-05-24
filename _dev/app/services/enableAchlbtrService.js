
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('enableAchlbtrService', enableAchlbtrService);

    enableAchlbtrService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function enableAchlbtrService(
        $http, 
        $q,
        PREFIX_URL,
        URL) {
        
        var service = {
            enableAchlbtr: enableAchlbtr
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Asignar los habilitantes al Cliente ACH y LBTR 
         * 
         *	@param {Object} json con el 
         *
         *	@return {Object} La respuesta del servicio.
         */
        function enableAchlbtr(json) {


            return $http.post(PREFIX_URL.SERVICES + URL.ACHLBTR, json)
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
