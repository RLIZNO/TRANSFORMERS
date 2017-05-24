(function () {

    'use strict';

    angular
        .module('app')
        .service('printCardService', printCardService);

    printCardService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function printCardService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {

        var service = {
            printCard: printCard
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Imprime la tarjeta de credito
         * 
         */

        function printCard(json) {
            return $http.post(PREFIX_URL.SERVICES + URL.PRINT_CARD, json)
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
