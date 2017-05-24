(function () {
    'use strict';

    angular
        .module('app')
        .service('catalogPreloadedService', catalogPreloadedService);

    catalogPreloadedService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL',
    ];

    function catalogPreloadedService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {
        var service = {
            getIdSelect: getIdSelect,
        };

        return service;


        /**
         * Servicio para obtener los id de los select según los valores obtenidos desde data credito
         * 
         * @param {any} birthCountry
         * @param {any} birthCity
         * @param {any} nacionality
         * @param {any} profession
         * @param {any} civilStatus
         * @param {any} countryResidence
         * @param {any} province
         * @param {any} town
         * @returns
         */
        function getIdSelect(birthCountry, birthCity, nacionality, profession, civilStatus, countryResidence, province, town) {
            return $http.get(PREFIX_URL.SERVICES + URL.PRELOADED_CATALOGS + '?birthCountry=' + birthCountry + '&birthCity=' + birthCity + '&nacionality=' + nacionality + '&profession=' + profession + '&civilStatus=' + civilStatus + '&countryResidence=' + countryResidence + '&province=' + province + '&town=' + town)
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
