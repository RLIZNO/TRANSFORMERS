
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('creditListService', creditListService);

    creditListService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function creditListService(
        $http, 
        $q,
        PREFIX_URL,
        URL
        ) {
        
        var self = {
            getCreditListService: getCreditListService
        };

        /**
         * Servicio para la validación de la listas de control
         * 
         * @param {any} idValue
         * @param {any} typeDocumentValue
         * @returns
         */
        function getCreditListService(idValue, typeDocumentValue, userName) {

            var deferred = $q.defer();

            $http.get(PREFIX_URL.SERVICES + URL.CONTROL_LIST + '?typeDocument=' + typeDocumentValue + '&documentNumber= ' + idValue + '&user=' + userName)
                .then(
                    function (response) {
                        if(response.data.success) {
                            deferred.resolve(response.data.data);
                        } else {
                            deferred.reject(error);
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
