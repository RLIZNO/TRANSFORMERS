(function () {

    'use strict';

    angular
        .module('app')
        .service('actCardService', actCardService);

    actCardService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function actCardService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {

        var service = {
            activateCredCard: activateCredCard
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
        function activateCredCard(json) {
            $http.post(PREFIX_URL.SERVICES + URL.ACTIVATE_CARD, json)
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
