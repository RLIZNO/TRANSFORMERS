(function () {
    'use strict';

    angular
        .module('app')
        .service('ciiuLevelsByOccupation', ciiuLevelsByOccupation);

    ciiuLevelsByOccupation.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function ciiuLevelsByOccupation(
        $http,
        $q,
        PREFIX_URL,
        URL
        ) {
        var service = {
        getCiiuLevelsByOccupation: getCiiuLevelsByOccupation,
    };

    return service;

    /**
     * Servicio para obtener los catalogos
     * 
     * @param {any} id
     * @returns
     */
    function getCiiuLevelsByOccupation(siebelId) {
        return $http.get(PREFIX_URL.SERVICES + URL.RETRIEVE_CIIU_LEVELS+'?siebelId='+siebelId, { cache: true })
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