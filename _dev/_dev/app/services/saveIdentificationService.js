(function () {

    'use strict';

    angular
        .module('app')
        .service('saveIdentificationService', saveIdentificationService);

    saveIdentificationService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function saveIdentificationService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {

        var service = {
            postSaveIdentification: postSaveIdentification
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Guarda la identificación del cliente, una vez validado.
         * 
         *	@param {Object} json que la información del cliente a enviar. 
         * 
         *
         *	@return {Object} La respuesta del servicio.
         */
        function postSaveIdentification(json) {
            $http.post(PREFIX_URL.SERVICES + URL.SAVE_IDENTIFICATION_DATA, json)
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
